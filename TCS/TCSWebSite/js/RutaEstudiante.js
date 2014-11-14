//---------------Variables
var xmlRutaEstudiantes = '0';
var xmlRutaConductorSave = '0';
var tmpRutaConductorId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentRutaConductor;

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

    var txrRuta = document.getElementById("txtRuta").value;
    var txtTrayecto = document.getElementById("txtTrayecto").value;
    var txtEstudiante = document.getElementById("txtEstudiante").value;

    RutaEstudiante.getRutaEstudiantes(txrRuta, txtTrayecto, txtEstudiante, getRutaEstudiantes_CallBack);
}

function refresh_search() {
    operation = 'none';

    var txrRuta = document.getElementById("txtRuta").value;
    var txtTrayecto = document.getElementById("txtTrayecto").value;
    var txtEstudiante = document.getElementById("txtEstudiante").value;

    RutaEstudiante.getRutaEstudiantes(txrRuta, txtTrayecto, txtEstudiante, getRutaEstudiantes_CallBack);
}

function getRutaEstudiantes_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlRutaEstudiantes = '-1';
        return;
    }
    xmlRutaEstudiantes = response.value;
    if (xmlRutaEstudiantes != '-1') {
        showRutaEstudiantes_SearchResults();
    }
}

function showRutaEstudiantes_SearchResults() {
    var xmlDoc = createDOM(xmlRutaEstudiantes);

    var Rutas = xmlDoc.getElementsByTagName("Rutas")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';

    var body = document.createElement('tbody');
    for (var j = 0; j < Rutas.length; j++) {
        var row = fillHTMLRowWithRutaEstudiantesHeader(Rutas[j]);
        row.onclick = function () { onSearchResultRowClickRutaEstudiantes(this); }
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

    enableElements(new Array('btnNew'));
    //disableElements(new Array('btnEdit', 'btnSave', 'btnCancel'));
    disableElements(new Array('btnSave', 'btnCancel'));

    showElements(new Array('divResultsTitle', 'divResults'));
}

function fillHTMLRowWithRutaEstudiantesHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('IdRuta')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdRuta').childNodes[0].nodeValue;
        td.width = "30px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    // DescripcionRuta
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('DescripcionRuta')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('DescripcionRuta').childNodes[0].nodeValue;
        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Trayecto
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Trayecto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Trayecto').childNodes[0].nodeValue;
        td.width = "300px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Tipo trayecto
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('TipoTrayecto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('TipoTrayecto').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Estudiante
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Estudiante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Estudiante').childNodes[0].nodeValue;
        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    var td = document.createElement('td');
    td.innerHTML = xmlNode.selectSingleNode('IdTrayecto').childNodes[0].nodeValue;
    td.style.display = 'none';
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickRutaEstudiantes(row) {

    enableElements(new Array('btnNew', 'btnDelete'));
    disableElements(new Array('btnSave', 'btnCancel'));

    HighLightTR(row, '#5b5a5a', 'cc3333');

    if (document.getElementById('divSearchDetail').clientHeight > 0) {
        CollapseDivSearchDetail();
    }

    resetCurrentPanel(); //Restore All values in Current Spare Div

    showCurrentPanel(); //Show Current Spare Div with Data charged from DB

    //var xmlNode = getCurrentNode(row.getElementsByTagName('td')[0].innerHTML);
    var xmlNode = getCurrentNode(row.getElementsByTagName('td')[0].innerHTML, row.getElementsByTagName('td')[5].innerHTML);

    displayCurrent(xmlNode);
}

function getCurrentNode(id_ruta, id_trayecto) {
    var xmlDoc = createDOM(xmlRutaEstudiantes);
    var Rutas = xmlDoc.documentElement.getElementsByTagName('Ruta');

    for (var j = 0; j < Rutas.length; j++) {
        if ((id_ruta == Rutas[j].selectSingleNode('IdRuta').childNodes[0].nodeValue) && (id_trayecto == Rutas[j].selectSingleNode('IdTrayecto').childNodes[0].nodeValue)) {
            return Rutas[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentRutaId').value = xmlNode.selectSingleNode("IdRuta").childNodes[0].nodeValue;
        document.getElementById('txtCurrentRutaDescripcion').value = xmlNode.selectSingleNode("DescripcionRuta").childNodes[0].nodeValue;

        document.getElementById('txtCurrentEstudianteId').value = xmlNode.selectSingleNode("IdEstudiante").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEstudianteDescripcion').value = xmlNode.selectSingleNode("Estudiante").childNodes[0].nodeValue;

        document.getElementById('txtCurrentTrayectoId').value = xmlNode.selectSingleNode("IdTrayecto").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTrayectoDescripcion').value = xmlNode.selectSingleNode("Trayecto").childNodes[0].nodeValue;
        
        blockCurrent();
    }
}


function resetCurrentPanel() {
    clearElements(new Array('txtCurrentRutaId', 'txtCurrentRutaDescripcion', 'txtCurrentTrayectoId', 'txtCurrentTrayectoDescripcion', 'txtCurrentEstudianteId', 'txtCurrentEstudianteDescripcion'));
}    

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function blockCurrent() {
    lockElements(new Array("txtCurrentRutaId", "txtCurrentRutaDescripcion", "txtCurrentEstudianteId", "txtCurrentEstudianteDescripcion", "txtCurrentTrayectoId", "txtCurrentTrayectoDescripcion"));

    disableElement('btnSave');
    disableElement('btnCancel');
    //enableElement('btnEdit');
}


function unblockCurrent() {
    lockElements(new Array("txtCurrentRutaId", "txtCurrentRutaDescripcion", "txtCurrentEstudianteId", "txtCurrentEstudianteDescripcion", "txtCurrentTrayectoId", "txtCurrentTrayectoDescripcion"));

    enableElement('btnSave');
    enableElement('btnCancel');
    //disableElement('btnEdit');
    disableElement('btnDelete');
}

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

    //disableElement('btnEdit');
    disableElement('btnNew');

    resetCurrentPanel();

    lockElements(new Array('txtCurrentRutaId', 'txtCurrentRutaDescripcion', 'txtCurrentTrayectoId', 'txtCurrentTrayectoDescripcion', 'txtCurrentEstudianteId', 'txtCurrentEstudianteDescripcion'));
    disableElements(new Array('txtCurrentRutaId', 'txtCurrentRutaDescripcion', 'txtCurrentTrayectoId', 'txtCurrentTrayectoDescripcion', 'txtCurrentEstudianteId', 'txtCurrentEstudianteDescripcion'));

}

function onBtnDeleteClick() {

    if (true) {

        //Progress Bar
        parent.showProgressImg();

        var txtCurrentRutaId = document.getElementById('txtCurrentRutaId').value;
        var txtCurrentEstudianteId = document.getElementById('txtCurrentEstudianteId').value;
        var txtCurrentTrayectoId = document.getElementById('txtCurrentTrayectoId').value;

        if ((trim(txtCurrentRutaId) != '') && (trim(txtCurrentTrayectoId) != '')) {
            RutaEstudiante.Delete(txtCurrentRutaId, txtCurrentEstudianteId, txtCurrentTrayectoId, deleteRutaEstudiante_CallBack);
        }
        else
            alert("Debe seleccionar RUTA - ESTUDIANTE - TRAYECTO para poder eliminar!");
    }
}

function deleteRutaEstudiante_CallBack(response) {

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
        disableElements(new Array('btnSave', 'btnCancel', 'btnDelete'));

        parent.showMsgBoxAdv('Operation exitosa');


    }
    else {


        resetCurrentPanel();
        blockCurrent();
        enableElements(new Array('btnNew'));
        disableElements(new Array('btnSave', 'btnCancel', 'btnDelete'));

        parent.showMsgBoxAdv('Operacion erronea');
    }
}

function onBtnEditClick() {
    operation = 'new';;
    unblockCurrent();
}

function onBtnCancelClick() {
    resetCurrentPanel();
    blockCurrent();    
}

function onBtnSaveClick() {

    if (true) {

        //Progress Bar
        parent.showProgressImg();

        var txtCurrentRutaId = document.getElementById('txtCurrentRutaId').value;
        var txtCurrentEstudianteId = document.getElementById('txtCurrentEstudianteId').value;
        var txtCurrentTrayectoId = document.getElementById('txtCurrentTrayectoId').value;

        if (operation == 'edit') {
            RutaEstudiante.Update(txtCurrentRutaId, txtCurrentEstudianteId, txtCurrentTrayectoId, saveRutaEstudiante_CallBack);
        }
        if (operation == 'new') {
            RutaEstudiante.Insert(txtCurrentRutaId, txtCurrentEstudianteId, txtCurrentTrayectoId, saveRutaEstudiante_CallBack);
        }
    }
}

function saveRutaEstudiante_CallBack(response) {

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
        disableElements(new Array('btnSave', 'btnCancel', 'btnDelete'));

        parent.showMsgBoxAdv('Operation exitosa');


    }
    else {


        resetCurrentPanel();
        blockCurrent();
        enableElements(new Array('btnNew'));
        disableElements(new Array('btnSave', 'btnCancel', 'btnDelete'));

        parent.showMsgBoxAdv('Operacion erronea');
    }
}
/////////////////////////// RUTAS POPUP ///////////////////////////////////

var xmlRutasPopup = '0';
var NewRutaPagePopup = 1;

function onBtnCurrentRutaClick() {
    //Progress Bar
    parent.showProgressImg();
    RutaEstudiante.LoadRutasPopupPage('', '', LoadeRutasPopupPage_CallBack);

}

function LoadeRutasPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlRutasPopup = '-1';
        return;
    }
    parent.xmlRutasPopup = response.value;

    if (parent.xmlRutasPopup != '-1') {
        showSearchRutasPopup_Results();
    }
}

function showSearchRutasPopup_Results() {

    var xmlDoc = createDOM(parent.xmlRutasPopup);
    var Rutas = xmlDoc.documentElement.getElementsByTagName('Ruta');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchRutasTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < Rutas.length; j++) {
        var row = fillHTMLRowWithSearchRutasPopupHeader(Rutas[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchRutasPopup(this);');

    document.getElementById('divSearchRutasPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divSearchRutasPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithSearchRutasPopupHeader(xmlNode) {
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
    if (validExistTag(xmlNode.getElementsByTagName('Descripcion')[0])) {

        if (xmlNode.selectSingleNode('Descripcion').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Descripcion').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "292px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchRutasPopup(row) {
    document.getElementById('txtCurrentRutaId').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentRutaDescripcion').value = row.getElementsByTagName('td')[1].innerHTML;
    closeModal();
}

function onBtnCloseSearchRutasPopUpClick() {
    closeModal();
}

/////////////////////////// NEW ESTUDIANTE POPUP ///////////////////////////////////

var xmlEstudiantesPopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchNewEstudianteClick() {
    //Progress Bar
    parent.showProgressImg();
    RutaEstudiante.LoadEstudiantesPopupPage('', '', '', LoadeEstudiantesPopupPage_CallBack);

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
    document.getElementById('txtCurrentEstudianteDescripcion').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchEstudiantesPopUpClick() {
    closeModal();
}

/////////////////////////// NEW TRAYECTO POPUP ///////////////////////////////////
var xmlTrayectosPopup = '0';

function onBtnCurrentTrayectoClick() {
    //Progress Bar
    parent.showProgressImg();
    var estudiante_id = document.getElementById('txtCurrentEstudianteId').value;
    RutaEstudiante.LoadTrayectosPopupPage(estudiante_id, LoadTrayectosPopupPage_CallBack);
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

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Tipo')[0])) {

        if (xmlNode.selectSingleNode('Tipo').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Tipo').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchTrayectoPopup(row) {
    document.getElementById('txtCurrentTrayectoId').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentTrayectoDescripcion').value = row.getElementsByTagName('td')[1].innerHTML + ' - ' + row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchTrayectoPopUpClick() {
    closeModal();
}