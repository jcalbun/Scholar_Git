//---------------Variables
var xmlApoderadoEstudiantes = '0';
var xmlApoderadoEstudianteSave = '0';
var tmpApoderadoEstudianteId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentApoderadoEstudiante;

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

    var txtApoderado = document.getElementById("txtApoderado").value;
    var txtEstudiante = document.getElementById("txtEstudiante").value;

    ApoderadoEstudiante.getApoderadoEstudiantes(txtApoderado, txtEstudiante, getApoderadoEstudiantes_CallBack);
}

function getApoderadoEstudiantes_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlApoderadoEstudiantes = '-1';
        return;
    }
    xmlApoderadoEstudiantes = response.value;
    if (xmlApoderadoEstudiantes != '-1') {
        showApoderadoEstudiantes_SearchResults();
    }
}

function showApoderadoEstudiantes_SearchResults() {
    var xmlDoc = createDOM(xmlApoderadoEstudiantes);

    var ApoderadoEstudiantes = xmlDoc.getElementsByTagName("ApoderadoEstudiantes")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < ApoderadoEstudiantes.length; j++) {
        var row = fillHTMLRowWithApoderadoEstudiantesHeader(ApoderadoEstudiantes[j]);
        row.onclick = function () { onSearchResultRowClickApoderadoEstudiantes(this); }
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

function fillHTMLRowWithApoderadoEstudiantesHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('IdApoderado')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdApoderado').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    // Ruta
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Apoderado')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('Apoderado').childNodes[0].nodeValue;
        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //DescripcionApoderadoEstudiante
    if (validExistTag(xmlNode.getElementsByTagName('IdEstudiante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('IdEstudiante').childNodes[0].nodeValue;
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

function onSearchResultRowClickApoderadoEstudiantes(row) {

    enableElements(new Array('btnEdit', 'btnNew'));
    disableElements(new Array('btnSave', 'btnCancel'));

    HighLightTR(row, '#5b5a5a', 'cc3333');

    if (document.getElementById('divSearchDetail').clientHeight > 0) {
        CollapseDivSearchDetail();
    }

    resetCurrentPanel(); //Restore All values in Current Spare Div

    showCurrentPanel(); //Show Current Spare Div with Data charged from DB

    //var xmlNode = getCurrentNode(row.getElementsByTagName('td')[0].innerHTML);
    var xmlNode = getCurrentNode(row.getElementsByTagName('td')[0].innerHTML, row.getElementsByTagName('td')[2].innerHTML);

    displayCurrent(xmlNode);
}

function resetCurrentPanel() {
    document.getElementById('txtCurrentIdApoderado').value = '';
    document.getElementById('txtCurrentApoderado').value = '';
    document.getElementById('txtCurrentIdEstudiante').value = '';
    document.getElementById('txtCurrentEstudiante').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id, trayecto) {
    var xmlDoc = createDOM(xmlApoderadoEstudiantes);
    var ApoderadoEstudiantes = xmlDoc.documentElement.getElementsByTagName('ApoderadoEstudiante');

    for (var j = 0; j < ApoderadoEstudiantes.length; j++) {

        if ((id == ApoderadoEstudiantes[j].selectSingleNode('IdApoderado').childNodes[0].nodeValue) && (trayecto == ApoderadoEstudiantes[j].selectSingleNode('IdEstudiante').childNodes[0].nodeValue)) {
            return ApoderadoEstudiantes[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        document.getElementById('txtCurrentIdApoderado').value = xmlNode.selectSingleNode("IdApoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentApoderado').value = xmlNode.selectSingleNode("Apoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentIdEstudiante').value = xmlNode.selectSingleNode("IdEstudiante").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEstudiante').value = xmlNode.selectSingleNode("Estudiante").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdApoderado", "txtCurrentApoderado", "txtCurrentIdEstudiante", "txtCurrentEstudiante"));
    disableElements(new Array("txtCurrentIdApoderado", "txtCurrentApoderado", "txtCurrentIdEstudiante", "txtCurrentEstudiante"));

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}



/////////////////////////// NEW APODERADO POPUP ///////////////////////////////////

var xmlUsuariosPopup = '0';
var NewUsuariosPagePopup = 1;

var xmlEstudiantePopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchNewApoderadoClick() {
    //Progress Bar
    parent.showProgressImg();
    ApoderadoEstudiante.LoadApoderadosPopupPage('', '', '', LoadApoderadosPopupPage_CallBack);

}

function LoadApoderadosPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlUsuariosPopup = '-1';
        return;
    }
    parent.xmlUsuariosPopup = response.value;

    if (parent.xmlUsuariosPopup != '-1') {
        showSearchUsuariosPopup_Results();
    }
}

function showSearchUsuariosPopup_Results() {

    var xmlDoc = createDOM(parent.xmlUsuariosPopup);
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('Apoderado');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchApoderadosPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithSearchUsuariosPopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);
    
    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchUsuariosPopup(this);');

    document.getElementById('divSearchApoderadosPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divSearchApoderadosPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithSearchUsuariosPopupHeader(xmlNode) {
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

        td.width = "200px";
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

        td.width = "300px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchUsuariosPopup(row) {
    document.getElementById('txtCurrentIdApoderado').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentApoderado').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchManufacturersPopUpClick() {
    closeModal();
}


/////////////////////////// NEW ESTUDIANTE POPUP ///////////////////////////////////

var xmlEstudiantesPopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchNewEstudianteClick() {
    //Progress Bar
    parent.showProgressImg();
    ApoderadoEstudiante.LoadEstudiantesPopupPage('', '', '', LoadeEstudiantesPopupPage_CallBack);

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

        td.width = "300px";
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

        td.width = "300px";
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

///////////////////////////////////////////////
////////////////////////SAVE///////////////

var xmlValidSearchManufacturer = '0';

function onTxtManufacturerCodeKeyUp(e) {
    //e.value = e.value.toUpperCase();
    if (trim(e.value) == '') {
        document.getElementById('txtManufacturerName').value = '';
    }
}

function onTxtManufacturerCodeChange(object) {

    object.value = object.value.toUpperCase();
    if (trim(object.value) == '') {
        return;
    }
    //Progress Bar
    parent.showProgressImg();

    Manufacturer.LoadMakers(object.value, getValidSearchManufacturer_CallBack); ;
}

function getValidSearchManufacturer_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlValidSearchManufacturer = '-1';
        return;
    }
    xmlValidSearchManufacturer = response.value;

    if (xmlValidSearchManufacturer != '-1') {
        showValidSearchManufacturer_Results();
    }
}

function showValidSearchManufacturer_Results() {

    var xmlDoc = createDOM(xmlValidSearchManufacturer);
    var SearchManufacturers = xmlDoc.documentElement.getElementsByTagName('Maker');
    if (SearchManufacturers.length == 0) {
        parent.showMsgBoxAdv('Manufacturer not found.');

        document.getElementById('txtManufacturerCode').value = '';
        document.getElementById('txtManufacturerName').value = '';
        return;
    }
    if (SearchManufacturers.length > 0) {
        document.getElementById('txtManufacturerCode').value = SearchManufacturers[0].selectSingleNode('Id').childNodes[0].nodeValue;
        document.getElementById('txtManufacturerName').value = SearchManufacturers[0].selectSingleNode('Description').childNodes[0].nodeValue;
        return;
    }
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

    //unlockElements(new Array("txtCurrentRutApoderado", "txtCurrentNombresApoderado", "txtCurrentApellidosApoderado", "chkCurrentTieneContrato"));

    //    unlockElements(new Array("txtCurrentManufacturerDescription", "chkCurrentActive"));
    //    enableElements(new Array("chkCurrentActive"));
    document.getElementById('txtCurrentIdApoderado').focus;

}


function onBtnSaveClick() {

    if (true) {

        //Progress Bar
        parent.showProgressImg();

        //        xmlManufacturerSave = buildXmlManufacturer();

        //        var xmlManufacturerSaveResult = createDOM(xmlManufacturerSave.outerHTML);

        var txtCodigoAp = document.getElementById('txtCurrentIdApoderado').value
        var txtCodigoEst = document.getElementById('txtCurrentIdEstudiante').value
        

        if (operation == 'edit') {txtCodigoAp
            ApoderadoEstudiante.UpdateApoderadoEstudiante(txtCodigoAp, txtCodigoEst, saveApoderadoEstudiante_CallBack);
        }
        if (operation == 'new') {
            ApoderadoEstudiante.InsertApoderadoEstudiante(txtCodigoAp, txtCodigoEst, saveApoderadoEstudiante_CallBack);
        }
    }
}

function saveApoderadoEstudiante_CallBack(response) {

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
        enableElement('btnNew');

        parent.showMsgBoxAdv('Operation exitosa');


    }
    else {


        resetCurrentPanel();
        blockCurrent();
        enableElement('btnNew');

        parent.showMsgBoxAdv('Operacion erronea');
    }
}