//---------------Variables
var xmlTrayectos = '0';
var xmlTrayectoSave = '0';
var tmpTrayectoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentTrayecto;

function onFormLoad() {
    onSearchButtonClick();
    disableElements(new Array('btnSave', 'btnCancel'));
}

//---------------Validate Exists Tag
function validExistTag(tagName) {
    if (tagName == null) {
        return false;
    }
    else {
        return true;
    }
}

//------------------ Paneles Colapsables ------------------------------------------
function CollapseDivSearchDetail() {
    var h = document.getElementById('divSearchDetail').clientHeight;
    if (h > 0) { searchPanelHeight = h };
    CollapseAccordion('divSearchDetail', searchPanelHeight, 'SearchCollapseImg', 'lblSearchShowHide');
}

function CollapseDivResultDetail() {
    var h = document.getElementById('divResultDetail').clientHeight;
    if (h > 0) { resultsPanelHeight = h };
    CollapseAccordion('divResultDetail', 190, 'ResultsCollapseImg', 'lblResultsShowHide');
}

function CollapseDivCurrentDetail() {
    var h = document.getElementById('divCurrentDetail').clientHeight;
    if (h > 0) { currentPanelHeight = h };
    CollapseAccordion('divCurrentDetail', currentPanelHeight, 'CurrentCollapseImg', 'lblCurrentShowHide');
}

function CollapseResultsPanel() {
    var h = document.getElementById('divResults').clientHeight;
    if (h > 0) { resultsPanelHeight = h };
    CollapseAccordion('divResults', resultsPanelHeight, 'ResultsCollapseImg', 'lblResultsShowHide');

    if (document.getElementById('divSearchResultsTableContainer').style.display == 'none') {
        document.getElementById('divSearchResultsTableTitles').style.display = 'block';
        document.getElementById('divSearchResultsTableContainer').style.display = 'block';
    } else {
        document.getElementById('divSearchResultsTableContainer').style.display = 'none';
        document.getElementById('divSearchResultsTableTitles').style.display = 'none';
    }
}

//-----------------------------Search Button Click
function onSearchButtonClick() {

    hideElements(new Array('divResultsTitle', 'divResults',
                            'divCurrentTitle', 'divCurrentDetail'));
    if (document.getElementById('divSearchDetail').clientHeight < 1) {
        CollapseDivSearchDetail();
    }
    //clearElements(new Array('txtSpareCode', 'txtSpareName', 'txtMakerCode', 'txtMakerName'));
    showElements(new Array('divSearchTitle', 'divScreenToolBar'));
}


function search() {

    //Progress Bar
    parent.showProgressImg();

    operation = 'none';

    var txtEstudiante = document.getElementById("txtEstudiante").value;
    var txtIdTrayecto = document.getElementById("txtIdTrayecto").value;
    var txtDestino = document.getElementById("txtDestino").value;
    var txtOrigen = document.getElementById("txtOrigen").value;

    Trayecto.getTrayectos(txtEstudiante, txtIdTrayecto, txtOrigen, txtDestino, getTrayectos_CallBack);
}

function getTrayectos_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlTrayectos = '-1';
        return;
    }
    xmlTrayectos = response.value;
    if (xmlTrayectos != '-1') {
        showTrayectos_SearchResults();
    }
}

function showTrayectos_SearchResults() {
    var xmlDoc = createDOM(xmlTrayectos);

    var Trayectos = xmlDoc.getElementsByTagName("Trayectos")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Trayectos.length; j++) {
        var row = fillHTMLRowWithTrayectosHeader(Trayectos[j]);
        row.onclick = function () { onSearchResultRowClickTrayectos(this); }
        body.appendChild(row);
    }
    t.appendChild(body);

    //t = addOnClickFunctionToTableRows(t, 'onSearchResultRowClickTemplatesGroup(this);');

    if (t.rows.length == 0) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.colspan = "4";
        td.align = "center";
        td.appendChild(document.createTextNode('No Data Found'));
        tr.appendChild(td);
        t.insertBefore(tr, t.firstChild);
    }
    //var th = document.getElementById('thSearchResults').cloneNode(true);
    //t.insertBefore(th, t.firstChild);

    //document.getElementById('divSearchResultsTableContainer').innerHTML = t.outerHTML;

    var grid = document.getElementById('tblResults');
    grid.parentNode.replaceChild(t, grid);

    for (var i = 0; i < t.rows[0].cells.length; i++) {

        var ancho = new String(t.rows[0].cells[i].width + "px");
        document.getElementById('thResultsFixedHead').rows[0].cells[i].style.width = ancho;
    }

    enableElements(new Array('btnNew'));
    disableElements(new Array('btnEdit', 'btnSave', 'btnCancel'));

    showElements(new Array('divResultsTitle', 'divResults'));
}

function fillHTMLRowWithTrayectosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('IdTrayecto')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdTrayecto').childNodes[0].nodeValue;
        td.width = "70px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Nombre
    if (validExistTag(xmlNode.getElementsByTagName('Origen')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Origen').childNodes[0].nodeValue;
        td.width = "130px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Destino')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Destino').childNodes[0].nodeValue;
        td.width = "130px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('TipoTrayecto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('TipoTrayecto').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Estudiante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Estudiante').childNodes[0].nodeValue;
        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickTrayectos(row) {

    enableElements(new Array('btnEdit', 'btnNew'));
    disableElements(new Array('btnSave', 'btnCancel'));

    HighLightTR(row, '#5b5a5a', 'cc3333');

    if (document.getElementById('divSearchDetail').clientHeight > 0) {
        CollapseDivSearchDetail();
    }

    resetCurrentPanel(); //Restore All values in Current Spare Div

    showCurrentPanel(); //Show Current Spare Div with Data charged from DB

    var xmlNode = getCurrentNode(row.getElementsByTagName('td')[0].innerHTML);

    displayCurrent(xmlNode);
}

function resetCurrentPanel() {

    clearElements(new Array("txtCurrentIdEstudiante","txtCurrentEstudiante", "txtCurrentId", "txtCurrentOrigen", "txtCurrentOrigenDir", "txtCurrentDestinoDir", "txtCurrentDestino", 'txtCurrentHoraOrigen', 'txtCurrentHoraDestino'));
//    document.getElementById('txtCurrentIdEstudiante').value = '';
//    document.getElementById('txtCurrentId').value = '';
//    document.getElementById('txtCurrentOrigen').value = '';
//    document.getElementById('txtCurrentDestino').value = '';
    
    document.getElementById('ddlCurrentTipo').selectedIndex = 0;
    document.getElementById('chkCurrentLunes').checked = '';
    document.getElementById('chkCurrentMartes').checked = '';
    document.getElementById('chkCurrentMiercoles').checked = '';
    document.getElementById('chkCurrentJueves').checked = '';
    document.getElementById('chkCurrentViernes').checked = '';
    document.getElementById('chkCurrentSabado').checked = '';
    document.getElementById('chkCurrentDomingo').checked = '';
    document.getElementById('txtCurrentHoraOrigen').value = '';
    document.getElementById('txtCurrentHoraDestino').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlTrayectos);
    var Trayectos = xmlDoc.documentElement.getElementsByTagName('Trayecto');

    for (var j = 0; j < Trayectos.length; j++) {
        if (id == Trayectos[j].selectSingleNode('IdTrayecto').childNodes[0].nodeValue) {
            return Trayectos[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        var semana = xmlNode.selectSingleNode("DiasSemana").childNodes[0].nodeValue;
        var lunes = semana.substr(0, 1);
        var martes = semana.substr(1, 1);
        var miercoles = semana.substr(2, 1);
        var jueves = semana.substr(3, 1);
        var viernes = semana.substr(4, 1);
        var sabado = semana.substr(5, 1);
        var domingo = semana.substr(6, 1);

        document.getElementById('txtCurrentIdEstudiante').value = xmlNode.selectSingleNode("IdEstudiante").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEstudiante').value = xmlNode.selectSingleNode("Estudiante").childNodes[0].nodeValue;
        
        document.getElementById('txtCurrentId').value = xmlNode.selectSingleNode("IdTrayecto").childNodes[0].nodeValue;
        document.getElementById('txtCurrentOrigen').value = xmlNode.selectSingleNode("IdOrigen").childNodes[0].nodeValue;
        document.getElementById('txtCurrentOrigenDir').value = xmlNode.selectSingleNode("Origen").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDestino').value = xmlNode.selectSingleNode("IdDestino").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDestinoDir').value = xmlNode.selectSingleNode("Destino").childNodes[0].nodeValue;

        ddlSetValue(document.getElementById('ddlCurrentTipo'), xmlNode.selectSingleNode("IdTipoTrayecto").childNodes[0].nodeValue);
        
        document.getElementById('chkCurrentLunes').checked = ((lunes == 'Y') ? 'checked' : '');
        document.getElementById('chkCurrentMartes').checked = ((martes == 'Y') ? 'checked' : '');
        document.getElementById('chkCurrentMiercoles').checked = ((miercoles == 'Y') ? 'checked' : '');
        document.getElementById('chkCurrentJueves').checked = ((jueves == 'Y') ? 'checked' : '');
        document.getElementById('chkCurrentViernes').checked = ((viernes == 'Y') ? 'checked' : '');
        document.getElementById('chkCurrentSabado').checked = ((sabado == 'Y') ? 'checked' : '');
        document.getElementById('chkCurrentDomingo').checked = ((domingo == 'Y') ? 'checked' : '');
        document.getElementById('txtCurrentHoraOrigen').value = xmlNode.selectSingleNode("HoraOrigen").childNodes[0].nodeValue;
        document.getElementById('txtCurrentHoraDestino').value = xmlNode.selectSingleNode("HoraDestino").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdEstudiante","txtCurrentEstudiante", "txtCurrentId", "txtCurrentOrigen", "txtCurrentOrigenDir", "txtCurrentDestinoDir", "txtCurrentDestino", 'txtCurrentHoraOrigen', 'txtCurrentHoraDestino'));
    
    disableElements(new Array("txtCurrentEstudiante", "txtCurrentId", "txtCurrentOrigen", "txtCurrentDestino", 'txtCurrentHoraOrigen', 'txtCurrentHoraDestino'));
    disableElements(new Array("chkCurrentLunes", "chkCurrentMartes", "chkCurrentMiercoles", "chkCurrentJueves", 'chkCurrentViernes', 'chkCurrentSabado', 'chkCurrentDomingo'));


    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}

//-----------------------------New Button Click
function onNewButtonClick() {
    operation = 'new';

    document.getElementById("divCurrentTitle").style.display = 'block';
    document.getElementById("divCurrentDetail").style.display = 'block';
    hideElements(new Array('divResultsTitle', 'divResults'));

    //showPanels();
    if (document.getElementById('divCurrentDetail').clientHeight < 1) CollapseDivCurrentDetail();
    if (document.getElementById('divSearchDetail').clientHeight > 1) CollapseDivSearchDetail();

    enableElement('btnSave');
    enableElement('btnCancel');

    //enableElement('chkCurrentActive');

    disableElement('btnEdit');
    disableElement('btnNew');

    resetCurrentPanel();

    lockElements(new Array("txtCurrentId", "txtCurrentIdEstudiante", "txtCurrentEstudiante", "txtCurrentOrigen", "txtCurrentOrigenDir", "txtCurrentDestino", "txtCurrentDestinoDir"));
    disableElements(new Array("txtCurrentId", "txtCurrentIdEstudiante", "txtCurrentEstudiante", "txtCurrentOrigen", "txtCurrentOrigenDir", "txtCurrentDestino", "txtCurrentDestinoDir"));

    enableElements(new Array('ddlCurrentTipo'));
    enableElements(new Array('txtCurrentHoraOrigen', 'txtCurrentHoraDestino'));
    unlockElements(new Array('txtCurrentHoraOrigen', 'txtCurrentHoraDestino'));
    enableElements(new Array("chkCurrentLunes", "chkCurrentMartes", "chkCurrentMiercoles", "chkCurrentJueves", 'chkCurrentViernes', 'chkCurrentSabado', 'chkCurrentDomingo'));
    
    document.getElementById('txtCurrentIdEstudiante').focus;

}


/////////////////////////// NEW ESTUDIANTE POPUP ///////////////////////////////////

var xmlEstudiantesPopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchNewEstudianteClick() {
    //Progress Bar
    parent.showProgressImg();
    Trayecto.LoadEstudiantesPopupPage('', '', '', LoadeEstudiantesPopupPage_CallBack);

}

function LoadeEstudiantesPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlEstudiantesPopup = '-1';
        return;
    }
    parent.xmlEstudiantesPopup = response.value;

    if (parent.xmlEstudiantesPopup != '-1') {
        showSearchEstudiantesPopup_Results();
    }
}

function showSearchEstudiantesPopup_Results() {

    var xmlDoc = createDOM(parent.xmlEstudiantesPopup);
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('Estudiante');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchEstudiantesTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithSearchEstudiantesPopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchEstudiantesPopup(this);');

    document.getElementById('divSearchEstudiantesPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divSearchEstudiantesPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithSearchEstudiantesPopupHeader(xmlNode) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Id')[0])) {

        if (xmlNode.selectSingleNode('Id').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Id').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));


    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Rut')[0])) {

        if (xmlNode.selectSingleNode('Rut').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Rut').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Nombre')[0])) {

        if (xmlNode.selectSingleNode('Nombre').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Nombre').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "340px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchEstudiantesPopup(row) {
    document.getElementById('txtCurrentIdEstudiante').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentEstudiante').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchEstudiantesPopUpClick() {
    closeModal();
}

/////////////////////////// NEW ESTBALECIMIENTOS POPUP ///////////////////////////////////

var xmlNewEstablecimientosPopup = '0';
var NewEstablecimientosPagePopup = 1;

function onSearchNewEstablecimientosClick() {
    //Progress Bar
    parent.showProgressImg();
    Trayecto.LoadNewEstablecimientosPopupPage(document.getElementById('txtCurrentIdEstudiante').value, LoadeNewEstablecimientosPopupPage_CallBack);

}

function LoadeNewEstablecimientosPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlNewEstablecimientosPopup = '-1';
        return;
    }
    parent.xmlNewEstablecimientosPopup = response.value;

    if (parent.xmlNewEstablecimientosPopup != '-1') {
        showSearchNewEstablecimientosPopup_Results();
    }
}

function showSearchNewEstablecimientosPopup_Results() {

    var xmlDoc = createDOM(parent.xmlNewEstablecimientosPopup);
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('Contacto');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thNewSearchEstablecimientosTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithNewSearchEstablecimientosPopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onNewSearchResultRowClickSearchEstablecimientosPopup(this);');

    document.getElementById('divNewSearchEstablecimientosPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divNewSearchEstablecimientosPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithNewSearchEstablecimientosPopupHeader(xmlNode) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Id')[0])) {

        if (xmlNode.selectSingleNode('Id').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Id').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));


    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Direccion')[0])) {

        if (xmlNode.selectSingleNode('Direccion').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Direccion').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onNewSearchResultRowClickSearchEstablecimientosPopup(row) {
    document.getElementById('txtCurrentOrigen').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentOrigenDir').value = row.getElementsByTagName('td')[1].innerHTML;
    closeModal();
}

function onBtnCloseNewSearchEstablecimientosPopUpClick() {
    closeModal();
}


/////////////////////////// NEW ESTBALECIMIENTOS2 POPUP ///////////////////////////////////

var xmlNewEstablecimientos2Popup = '0';
var NewEstablecimientos2PagePopup = 1;

function onSearchNewEstablecimientos2Click() {
    //Progress Bar
    parent.showProgressImg();
    Trayecto.LoadNewEstablecimientos2PopupPage(document.getElementById('txtCurrentIdEstudiante').value, LoadeNewEstablecimientos2PopupPage_CallBack);

}

function LoadeNewEstablecimientos2PopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlNewEstablecimientos2Popup = '-1';
        return;
    }
    parent.xmlNewEstablecimientos2Popup = response.value;

    if (parent.xmlNewEstablecimientos2Popup != '-1') {
        showSearchNewEstablecimientos2Popup_Results();
    }
}

function showSearchNewEstablecimientos2Popup_Results() {

    var xmlDoc = createDOM(parent.xmlNewEstablecimientos2Popup);
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('Contacto');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thNewSearchEstablecimientos2TableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithNewSearchEstablecimientos2PopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onNewSearchResultRowClickSearchEstablecimientos2Popup(this);');

    document.getElementById('divNewSearchEstablecimientos2PopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divNewSearchEstablecimientos2Popup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithNewSearchEstablecimientos2PopupHeader(xmlNode) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Id')[0])) {

        if (xmlNode.selectSingleNode('Id').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Id').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));


    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Direccion')[0])) {

        if (xmlNode.selectSingleNode('Direccion').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Direccion').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    var td = document.createElement('td');
    td.innerHTML = xmlNode.selectSingleNode('Id_Apoderado').childNodes[0].nodeValue;
    td.width = "10px";
    td.style.display = 'none';
    tr.appendChild(td.cloneNode(true));

    var td = document.createElement('td');
    td.innerHTML = xmlNode.selectSingleNode('Id_Establecimiento').childNodes[0].nodeValue;
    td.width = "10px";
    td.style.display = 'none';
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onNewSearchResultRowClickSearchEstablecimientos2Popup(row) {
    document.getElementById('txtCurrentDestino').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentDestinoDir').value = row.getElementsByTagName('td')[1].innerHTML;
    document.getElementById('hidCurrentIdApoderado').value = row.getElementsByTagName('td')[2].innerHTML;
    document.getElementById('hidCurrentIdEstablecimiento').value = row.getElementsByTagName('td')[3].innerHTML;
    closeModal();
}

function onBtnCloseNewSearchEstablecimientos2PopUpClick() {
    closeModal();
}


function onBtnSaveClick() {

    if (true) {

        //Progress Bar
        parent.showProgressImg();

        //        xmlManufacturerSave = buildXmlManufacturer();

        //        var xmlManufacturerSaveResult = createDOM(xmlManufacturerSave.outerHTML);

        var txtCurrentIdEstudiante = document.getElementById('txtCurrentIdEstudiante').value;
        var txtCurrentOrigen = document.getElementById('txtCurrentOrigen').value;
        var txtCurrentDestino = document.getElementById('txtCurrentDestino').value;
        var ddlCurrentTipo = document.getElementById("ddlCurrentTipo");
        var txtCurrentTipo = ddlCurrentTipo.options[ddlCurrentTipo.selectedIndex].value;

        var hidCurrentIdApoderado = document.getElementById('hidCurrentIdApoderado').value;
        var hidCurrentIdEstablecimiento = document.getElementById('hidCurrentIdEstablecimiento').value;

        if (document.getElementById('chkCurrentLunes').checked) {
            var chkCurrentLunes = 'Y';
        }
        else {
            var chkCurrentLunes = 'N';
        }

         if (document.getElementById('chkCurrentMartes').checked) {
            var chkCurrentMartes = 'Y';
        }
        else {
            var chkCurrentMartes = 'N';
        }

         if (document.getElementById('chkCurrentMiercoles').checked) {
            var chkCurrentMiercoles = 'Y';
        }
        else {
            var chkCurrentMiercoles = 'N';
        }

         if (document.getElementById('chkCurrentJueves').checked) {
            var chkCurrentJueves = 'Y';
        }
        else {
            var chkCurrentJueves = 'N';
        }

        if (document.getElementById('chkCurrentViernes').checked) {
            var chkCurrentViernes = 'Y';
        }
        else {
            var chkCurrentViernes = 'N';
        }

         if (document.getElementById('chkCurrentSabado').checked) {
            var chkCurrentSabado = 'Y';
        }
        else {
            var chkCurrentSabado = 'N';
        }

         if (document.getElementById('chkCurrentDomingo').checked) {
            var chkCurrentDomingo = 'Y';
        }
        else {
            var chkCurrentDomingo = 'N';
        }

        var txtCurrentHoraOrigen = document.getElementById('txtCurrentHoraOrigen').value;
        var txtCurrentHoraDestino = document.getElementById('txtCurrentHoraDestino').value;
 
        if (operation == 'edit') {
            Trayecto.UpdateTrayecto(txtCurrentIdEstudiante, txtCurrentOrigen, txtCurrentDestino, txtCurrentTipo, chkCurrentLunes, chkCurrentMartes, chkCurrentMiercoles, chkCurrentJueves, chkCurrentViernes, chkCurrentSabado, chkCurrentDomingo, txtCurrentHoraOrigen, txtCurrentHoraDestino, hidCurrentIdApoderado, hidCurrentIdEstablecimiento, saveTrayecto_CallBack);
        }
        if (operation == 'new') {
            Trayecto.InsertTrayecto(txtCurrentIdEstudiante, txtCurrentOrigen, txtCurrentDestino, txtCurrentTipo, chkCurrentLunes, chkCurrentMartes, chkCurrentMiercoles, chkCurrentJueves, chkCurrentViernes, chkCurrentSabado, chkCurrentDomingo, txtCurrentHoraOrigen, txtCurrentHoraDestino, hidCurrentIdApoderado, hidCurrentIdEstablecimiento, saveTrayecto_CallBack);
        }
    }
}

function saveTrayecto_CallBack(response) {

    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {

        parent.showMsgBoxAdv(response.error);

        return;
    }
    xmlResult = response.value;

    var xmlDoc = createDOM(xmlResult);
    var Status = xmlDoc.documentElement.childNodes[0].nodeValue;

    if (Status == 'true') {

        if (document.getElementById('divResults').clientHeight > 0) {

            refresh_search();
        }

        resetCurrentPanel();
        blockCurrent();
        enableElements(new Array('btnNew'));
        disableElements(new Array('btnSave', 'btnCancel', 'btnEdit'));

        parent.showMsgBoxAdv('Operation exitosa');


    }
    else {


        resetCurrentPanel();
        blockCurrent();
        enableElements(new Array('btnNew'));
        disableElements(new Array('btnSave', 'btnCancel', 'btnEdit'));

        parent.showMsgBoxAdv('Operacion erronea');
    }
}