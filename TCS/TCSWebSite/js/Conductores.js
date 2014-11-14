//---------------Variables
var xmlConductores = '0';
var xmlConductorSave = '0';
var tmpConductorId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentConductor;

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

    var strCodigo = document.getElementById("txtConductorId").value;
    var strRut = document.getElementById("txtRut").value;
    var strNombre = document.getElementById("txtNombres").value;
    var strApellido = document.getElementById("txtApellidos").value;

    Conductor.getConductores(strCodigo, strRut, strNombre, strApellido, getConductores_CallBack);
}

function getConductores_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlConductores = '-1';
        return;
    }
    xmlConductores = response.value;
    if (xmlConductores != '-1') {
        showConductores_SearchResults();
    }
}

function showConductores_SearchResults() {
    var xmlDoc = createDOM(xmlConductores);

    var Conductores = xmlDoc.getElementsByTagName("Conductores")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Conductores.length; j++) {
        var row = fillHTMLRowWithConductoresHeader(Conductores[j]);
        row.onclick = function () { onSearchResultRowClickConductores(this); }
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

function fillHTMLRowWithConductoresHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Id')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('Id').childNodes[0].nodeValue;
        td.width = "90px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Nombre
    if (validExistTag(xmlNode.getElementsByTagName('Rut')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Rut').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Apellidos')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Apellidos').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Nombres')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Nombres').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickConductores(row) {

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
    document.getElementById('txtCurrentId').value = '';
    document.getElementById('txtCurrentRut').value = '';
    document.getElementById('txtCurrentNombres').value = '';
    document.getElementById('txtCurrentApellidos').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlConductores);
    var Conductores = xmlDoc.documentElement.getElementsByTagName('Conductor');

    for (var j = 0; j < Conductores.length; j++) {
        if (id == Conductores[j].selectSingleNode('Id').childNodes[0].nodeValue) {
            return Conductores[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentId').value = xmlNode.selectSingleNode("Id").childNodes[0].nodeValue;
        document.getElementById('txtCurrentRut').value = xmlNode.selectSingleNode("Rut").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombres').value = xmlNode.selectSingleNode("Nombres").childNodes[0].nodeValue;
        document.getElementById('txtCurrentApellidos').value = xmlNode.selectSingleNode("Apellidos").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentId", "txtCurrentRut", "txtCurrentNombres", "txtCurrentApellidos"));

    disableElement('txtCurrentId');
    disableElement('txtCurrentRut');
    disableElement('txtCurrentNombres');
    disableElement('txtCurrentApellidos');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}