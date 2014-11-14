//---------------Variables
var xmlRutas = '0';
var xmlRutaSave = '0';
var tmpRutaId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentRuta;

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

function onBtnPrintClick() {
    var nombre_tran = 'KLENNER CARCAMO JORGE';
    var nombre_ruta = document.getElementById('txtCurrentDescripcion').value + ' ' + document.getElementById('txtCurrentObs').value;
    var nombre_ayudante = 'MONDACA OYARZO JULIO';
    var descripcion_vehiculo = 'KIA BESTA KJ2344 AÑO 2007';
    var codigo_ruta = document.getElementById('txtCurrentIdRuta').value;

    Rutas.GetReporteRuta(nombre_tran, nombre_ruta, nombre_ayudante, descripcion_vehiculo, codigo_ruta, onBtnPrintClick_CallBack);
}

var _xmlPrintRuta = null;

function onBtnPrintClick_CallBack(response) {
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        _xmlPrintRuta = '-1';
        return;
    }
    _xmlPrintRuta = response.value;
    if (_xmlPrintRuta != '-1') {
        Imprimir_Rutas();
    }
}

function Imprimir_Rutas() {

    var nombre_transportista = 'KLENNER CARCAMO JORGE';
    var nombre_ruta = document.getElementById('txtCurrentDescripcion').value;
    var nombre_ayudante = 'VARGAS TRONCOSO ABELINO';
    var nombre_vehiculo = 'KIA BESTA 2012 CSXS36';

    var url = "Print_Ruta.aspx?nombre_transportista=" + nombre_transportista + "&nombre_ruta=" + nombre_ruta + "&nombre_ayudante=" + nombre_ayudante + "&nombre_vehiculo=" + nombre_vehiculo;
    //alert(url);
    window.open(url)
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

    var txtIdRuta = document.getElementById("txtIdRuta").value;
    var txtEstudianteId = document.getElementById("txtEstudianteId").value;

    Rutas.getRutas(txtIdRuta, txtEstudianteId, getRutas_CallBack);
}

function getRutas_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlRutas = '-1';
        return;
    }
    xmlRutas = response.value;
    if (xmlRutas != '-1') {
        showRutas_SearchResults();
    }
}

function showRutas_SearchResults() {
    var xmlDoc = createDOM(xmlRutas);

    var Rutas = xmlDoc.getElementsByTagName("Rutas")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    //t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Rutas.length; j++) {
        var row = fillHTMLRowWithRutasHeader(Rutas[j]);
        row.onclick = function () { onSearchResultRowClickRutas(this); }
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
        tr.width = '600px';
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

function fillHTMLRowWithRutasHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('IdRuta')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdRuta').childNodes[0].nodeValue;
        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //DescripcionRuta
    if (validExistTag(xmlNode.getElementsByTagName('DescripcionRuta')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('DescripcionRuta').childNodes[0].nodeValue;
        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('ObsRutas')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('ObsRutas').childNodes[0].nodeValue;
        td.width = "300px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));


    return tr;
}

function onSearchResultRowClickRutas(row) {

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
    document.getElementById('txtCurrentIdRuta').value = '';
    document.getElementById('txtCurrentDescripcion').value = '';
    document.getElementById('txtCurrentObs').value = '';
//    document.getElementById('txtCurrentEstudianteId').value = '';
//    document.getElementById('txtCurrentEstudianteName').value = '';
//    document.getElementById('txtCurrentTrayectoId').value = '';
//    document.getElementById('txtCurrentTrayectoName').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id, estudiante) {
    var xmlDoc = createDOM(xmlRutas);
    var Rutas = xmlDoc.documentElement.getElementsByTagName('Ruta');

    for (var j = 0; j < Rutas.length; j++) {

        if (id == Rutas[j].selectSingleNode('IdRuta').childNodes[0].nodeValue)
        
        {
            return Rutas[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        document.getElementById('txtCurrentIdRuta').value = xmlNode.selectSingleNode("IdRuta").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDescripcion').value = xmlNode.selectSingleNode("DescripcionRuta").childNodes[0].nodeValue;
        document.getElementById('txtCurrentObs').value = xmlNode.selectSingleNode("ObsRutas").childNodes[0].nodeValue;
//        document.getElementById('txtCurrentEstudiante').value = xmlNode.selectSingleNode("Estudiante").childNodes[0].nodeValue;
//        document.getElementById('txtCurrentTrayecto').value = xmlNode.selectSingleNode("Trayecto").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function onBtnEditClick() {
    operation = "edit";
    unblockCurrent();
}

function unblockCurrent() {
    lockElements(new Array("txtCurrentIdRuta"));
    unlockElements(new Array( "txtCurrentDescripcion", "txtCurrentObs"));

    disableElements(new Array("txtCurrentIdRuta"));
    enableElements(new Array("txtCurrentDescripcion", "txtCurrentObs"));


    enableElement('btnSave');
    enableElement('btnCancel');
    disableElement('btnEdit');
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdRuta", "txtCurrentDescripcion", "txtCurrentObs"));

    disableElements(new Array("txtCurrentIdRuta", "txtCurrentDescripcion", "txtCurrentObs"));


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

    lockElements(new Array("txtCurrentIdRuta"));
    disableElements(new Array("txtCurrentIdRuta"));

    unlockElements(new Array("txtCurrentDescripcion", "txtCurrentObs"));
    enableElements(new Array("txtCurrentDescripcion", "txtCurrentObs"));

}

function onBtnSaveClick() {

    if (true) {

        //Progress Bar
        parent.showProgressImg();

        var txtCurrentIdRuta = document.getElementById('txtCurrentIdRuta').value;
        var txtCurrentDescripcion = document.getElementById('txtCurrentDescripcion').value;
        var txtCurrentObs = document.getElementById('txtCurrentObs').value;

        if (operation == 'edit') {
            Rutas.UpdateRuta(txtCurrentIdRuta, txtCurrentDescripcion, txtCurrentObs, saveRutas_CallBack);
        }
        if (operation == 'new') {
            Rutas.InsertRuta(txtCurrentIdRuta, txtCurrentDescripcion, txtCurrentObs, saveRutas_CallBack);
        }
    }
}

function saveRutas_CallBack(response) {

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

function refresh_search() {
    operation = 'none';
    
    var txtIdRuta = document.getElementById("txtIdRuta").value;
    var txtEstudianteId = document.getElementById("txtEstudianteId").value;

    Rutas.getRutas(txtIdRuta, txtEstudianteId, getRutas_CallBack);
}



//ESTUDIANTES POPUP

function onSearchNewEstudianteClick() {
    //Progress Bar
    parent.showProgressImg();
    Rutas.LoadEstudiantesPopupPage('', '', '', LoadeEstudiantesPopupPage_CallBack);
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
    document.getElementById('txtCurrentEstudianteId').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentEstudianteName').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchEstudiantesPopUpClick() {
    closeModal();
}


//TRAYECTOS POPUP
var xmlTrayectosPopup = '0';

function onSearchNewTrayectoClick() {
    //Progress Bar
    parent.showProgressImg();
    var estudiante_id = document.getElementById('txtCurrentEstudianteId').value;
    Rutas.LoadTrayectosPopupPage(estudiante_id, LoadTrayectosPopupPage_CallBack);
}

function LoadTrayectosPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlTrayectosPopup = '-1';
        return;
    }
    parent.xmlTrayectosPopup = response.value;

    if (parent.xmlTrayectosPopup != '-1') {
        showSearchTrayectoPopup_Results();
    }
}

function showSearchTrayectoPopup_Results() {

    var xmlDoc = createDOM(parent.xmlTrayectosPopup);
    var Trayectos = xmlDoc.documentElement.getElementsByTagName('Trayecto');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thNewSearchTrayectoTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < Trayectos.length; j++) {
        var row = fillHTMLRowWithSearchTrayectoPopupHeader(Trayectos[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchTrayectoPopup(this);');

    document.getElementById('divNewSearchTrayectoPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divNewSearchTrayectoPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithSearchTrayectoPopupHeader(xmlNode) {
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
    if (validExistTag(xmlNode.getElementsByTagName('Origen')[0])) {

        if (xmlNode.selectSingleNode('Origen').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Origen').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Destino')[0])) {

        if (xmlNode.selectSingleNode('Destino').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Destino').childNodes[0].nodeValue;
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

function onSearchResultRowClickSearchTrayectoPopup(row) {
    document.getElementById('txtCurrentTrayectoId').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentTrayectoName').value = row.getElementsByTagName('td')[1].innerHTML + ' - ' + row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchTrayectoPopUpClick() {
    closeModal();
}