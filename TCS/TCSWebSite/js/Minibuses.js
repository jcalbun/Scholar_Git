//---------------Variables
var xmlMinibuses = '0';
var xmlMinibusSave = '0';
var tmpMinibusId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentMinibus;

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

    var txtId = document.getElementById("txtId").value;
    var txtPatente = document.getElementById("txtPatente").value;
    var txtMarca = document.getElementById("txtMarca").value;
    var txtModelo = document.getElementById("txtModelo").value;
    var txtAno = document.getElementById("txtAno").value;

    Minibuses.getMinibuses(txtId, txtPatente, txtMarca, txtModelo, txtAno, getMinibuses_CallBack);
}

function getMinibuses_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlMinibuses = '-1';
        return;
    }
    xmlMinibuses = response.value;
    if (xmlMinibuses != '-1') {
        showMinibuses_SearchResults();
    }
}

function showMinibuses_SearchResults() {
    var xmlDoc = createDOM(xmlMinibuses);

    var Minibuses = xmlDoc.getElementsByTagName("Minibuses")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Minibuses.length; j++) {
        var row = fillHTMLRowWithMinibusesHeader(Minibuses[j]);
        row.onclick = function () { onSearchResultRowClickMinibuses(this); }
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

function fillHTMLRowWithMinibusesHeader(xmlNode) {
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
    if (validExistTag(xmlNode.getElementsByTagName('Patente')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Patente').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Marca')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Marca').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Modelo')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Modelo').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickMinibuses(row) {

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
    document.getElementById('txtCurrentPatente').value = '';
    document.getElementById('txtCurrentMarca').value = '';
    document.getElementById('txtCurrentModelo').value = '';
    document.getElementById('txtCurrentAno').value = '';
    document.getElementById('txtCurrentKilometraje').value = '';
    document.getElementById('txtCurrentAnoActividad').value = '';
    document.getElementById('txtCurrentObs').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlMinibuses);
    var Minibuses = xmlDoc.documentElement.getElementsByTagName('Minibus');

    for (var j = 0; j < Minibuses.length; j++) {
        if (id == Minibuses[j].selectSingleNode('Id').childNodes[0].nodeValue) {
            return Minibuses[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentId').value = xmlNode.selectSingleNode("Id").childNodes[0].nodeValue;
        document.getElementById('txtCurrentPatente').value = xmlNode.selectSingleNode("Patente").childNodes[0].nodeValue;
        document.getElementById('txtCurrentMarca').value = xmlNode.selectSingleNode("Marca").childNodes[0].nodeValue;
        document.getElementById('txtCurrentModelo').value = xmlNode.selectSingleNode("Modelo").childNodes[0].nodeValue;
        document.getElementById('txtCurrentAno').value = xmlNode.selectSingleNode("Ano").childNodes[0].nodeValue;
        document.getElementById('txtCurrentKilometraje').value = xmlNode.selectSingleNode("Kilometraje").childNodes[0].nodeValue;
        document.getElementById('txtCurrentAnoActividad').value = xmlNode.selectSingleNode("AnoActividad").childNodes[0].nodeValue;
        document.getElementById('txtCurrentObs').value = xmlNode.selectSingleNode("Descripcion").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentId", "txtCurrentPatente", "txtCurrentMarca", "txtCurrentModelo", 'txtCurrentKilometraje', 'txtCurrentAno', 'txtCurrentAnoActividad', 'txtCurrentObs'));

    disableElement('txtCurrentId');
    disableElement('txtCurrentPatente');
    disableElement('txtCurrentMarca');
    disableElement('txtCurrentModelo');
    disableElement('txtCurrentKilometraje');
    disableElement('txtCurrentAnoActividad');
    disableElement('txtCurrentObs');
    disableElement('txtCurrentAno');
    //disableElement('ddlTipoCombustible');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}