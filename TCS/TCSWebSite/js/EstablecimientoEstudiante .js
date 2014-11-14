//---------------Variables
var xmlEstablecimientoEstudiantes = '0';
var xmlEstablecimientoEstudianteSave = '0';
var tmpEstablecimientoEstudianteId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentEstablecimientoEstudiante;

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

    var txtEstablecimiento = document.getElementById("txtEstablecimiento").value;
    var txtEstudiante = document.getElementById("txtEstudiante").value;

    EstablecimientoEstudiante.getEstablecimientoEstudiantes(txtEstablecimiento, txtEstudiante, getEstablecimientoEstudiantes_CallBack);
}

function getEstablecimientoEstudiantes_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlEstablecimientoEstudiantes = '-1';
        return;
    }
    xmlEstablecimientoEstudiantes = response.value;
    if (xmlEstablecimientoEstudiantes != '-1') {
        showEstablecimientoEstudiantes_SearchResults();
    }
}

function showEstablecimientoEstudiantes_SearchResults() {
    var xmlDoc = createDOM(xmlEstablecimientoEstudiantes);

    var EstablecimientoEstudiantes = xmlDoc.getElementsByTagName("EstablecimientoEstudiantes")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    //t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < EstablecimientoEstudiantes.length; j++) {
        var row = fillHTMLRowWithEstablecimientoEstudiantesHeader(EstablecimientoEstudiantes[j]);
        row.onclick = function () { onSearchResultRowClickEstablecimientoEstudiantes(this); }
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

function fillHTMLRowWithEstablecimientoEstudiantesHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('id_establecimiento')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('id_establecimiento').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    // Ruta
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('establecimiento')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('establecimiento').childNodes[0].nodeValue;
        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //DescripcionEstablecimientoEstudiante
    if (validExistTag(xmlNode.getElementsByTagName('id_estudiante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('id_estudiante').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Rut Estudiante
    if (validExistTag(xmlNode.getElementsByTagName('rut_estudiante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('rut_estudiante').childNodes[0].nodeValue;
        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('estudiante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('estudiante').childNodes[0].nodeValue;
        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickEstablecimientoEstudiantes(row) {

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
    document.getElementById('txtCurrentIdEstablecimiento').value = '';
    document.getElementById('txtCurrentEstablecimiento').value = '';
    document.getElementById('txtCurrentEstudianteId').value = '';
    document.getElementById('txtCurrentEstudiante').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(establecimiento, estudiante) {
    var xmlDoc = createDOM(xmlEstablecimientoEstudiantes);
    var EstablecimientoEstudiantes = xmlDoc.documentElement.getElementsByTagName('EstablecimientoEstudiante');

    for (var j = 0; j < EstablecimientoEstudiantes.length; j++) {

        if ((establecimiento == EstablecimientoEstudiantes[j].selectSingleNode('id_establecimiento').childNodes[0].nodeValue) && (estudiante == EstablecimientoEstudiantes[j].selectSingleNode('id_estudiante').childNodes[0].nodeValue)) {
            return EstablecimientoEstudiantes[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentIdEstablecimiento').value = xmlNode.selectSingleNode("id_establecimiento").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEstablecimiento').value = xmlNode.selectSingleNode("establecimiento").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEstudianteId').value = xmlNode.selectSingleNode("id_estudiante").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEstudiante').value = xmlNode.selectSingleNode("estudiante").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdEstablecimiento", "txtCurrentEstablecimiento", "txtCurrentEstudianteId", "txtCurrentEstudiante"));
    disableElements(new Array("txtCurrentIdEstablecimiento", "txtCurrentEstablecimiento", "txtCurrentEstudianteId", "txtCurrentEstudiante"));

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

    //unlockElements(new Array("txtCurrentRutApoderado", "txtCurrentNombresApoderado", "txtCurrentApellidosApoderado", "chkCurrentTieneContrato"));

    //    unlockElements(new Array("txtCurrentManufacturerDescription", "chkCurrentActive"));
    //    enableElements(new Array("chkCurrentActive"));
    document.getElementById('txtCurrentIdEstablecimiento').focus;

}

/////////////////////////// NEW ESTUDIANTE POPUP ///////////////////////////////////

var xmlNewEstudiantesPopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchNewEstudianteClick() {
    //Progress Bar
    parent.showProgressImg();
   EstablecimientoEstudiante.LoadNewEstudiantesPopupPage('', '', '', LoadeNewEstudiantesPopupPage_CallBack);

}

function LoadeNewEstudiantesPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlNewEstudiantesPopup = '-1';
        return;
    }
    parent.xmlNewEstudiantesPopup = response.value;

    if (parent.xmlNewEstudiantesPopup != '-1') {
        showSearchNewEstudiantesPopup_Results();
    }
}

function showSearchNewEstudiantesPopup_Results() {

    var xmlDoc = createDOM(parent.xmlNewEstudiantesPopup);
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('Estudiante');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thNewSearchEstudiantesTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithNewSearchEstudiantesPopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onNewSearchResultRowClickSearchEstudiantesPopup(this);');

    document.getElementById('divNewSearchEstudiantesPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divNewSearchEstudiantesPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithNewSearchEstudiantesPopupHeader(xmlNode) {
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

        td.width = "170px";
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

        td.width = "350px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onNewSearchResultRowClickSearchEstudiantesPopup(row) {
    document.getElementById('txtCurrentEstudianteId').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentEstudiante').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseNewSearchEstudiantesPopUpClick() {
    closeModal();
}


/////////////////////////// NEW ESTBALECIMIENTOS POPUP ///////////////////////////////////

var xmlNewEstablecimientosPopup = '0';
var NewEstablecimientosPagePopup = 1;

function onSearchNewEstablecimientosClick() {
    //Progress Bar
    parent.showProgressImg();
    EstablecimientoEstudiante.LoadNewEstablecimientosPopupPage('', '', LoadeNewEstablecimientosPopupPage_CallBack);

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
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('Establecimiento');
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

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Direccion')[0])) {

        if (xmlNode.selectSingleNode('Direccion').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Direccion').childNodes[0].nodeValue;
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

function onNewSearchResultRowClickSearchEstablecimientosPopup(row) {
    document.getElementById('txtCurrentIdEstablecimiento').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentEstablecimiento').value = row.getElementsByTagName('td')[1].innerHTML;
    closeModal();
}

function onBtnCloseNewSearchEstablecimientosPopUpClick() {
    closeModal();
}

function onBtnSaveClick() {

    if (true) {

        //Progress Bar
        parent.showProgressImg();

        //        xmlManufacturerSave = buildXmlManufacturer();

        //        var xmlManufacturerSaveResult = createDOM(xmlManufacturerSave.outerHTML);

        var txtCodigoEst = document.getElementById('txtCurrentEstudianteId').value
        var txtCodigoEstabl = document.getElementById('txtCurrentIdEstablecimiento').value


        if (operation == 'edit') {
            EstablecimientoEstudiante.UpdateEstablecimientoEstudiante(txtCodigoEst, txtCodigoEstabl, saveEstablecimientoEstudiante_CallBack);
        }
        if (operation == 'new') {
            EstablecimientoEstudiante.InsertEstablecimientoEstudiante(txtCodigoEst, txtCodigoEstabl, saveEstablecimientoEstudiante_CallBack);
        }
    }
}

function saveEstablecimientoEstudiante_CallBack(response) {

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