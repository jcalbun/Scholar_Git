//---------------Variables
var xmlRutaConductores = '0';
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
    var txtConductor = document.getElementById("txtConductor").value;

    RutaConductor.getRutaConductores(txrRuta, txtTrayecto, txtConductor, getRutaConductores_CallBack);
}

function getRutaConductores_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlRutaConductores = '-1';
        return;
    }
    xmlRutaConductores = response.value;
    if (xmlRutaConductores != '-1') {
        showRutaConductores_SearchResults();
    }
}

function showRutaConductores_SearchResults() {
    var xmlDoc = createDOM(xmlRutaConductores);

    var RutaConductores = xmlDoc.getElementsByTagName("RutaConductores")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < RutaConductores.length; j++) {
        var row = fillHTMLRowWithRutaConductoresHeader(RutaConductores[j]);
        row.onclick = function () { onSearchResultRowClickRutaConductores(this); }
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

function fillHTMLRowWithRutaConductoresHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('IdRuta')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdRuta').childNodes[0].nodeValue;
        td.width = "90px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    // Ruta
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Ruta')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('Ruta').childNodes[0].nodeValue;
        td.width = "90px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //DescripcionRutaConductor
    if (validExistTag(xmlNode.getElementsByTagName('Trayecto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Trayecto').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Conductor')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Conductor').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickRutaConductores(row) {

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
    document.getElementById('txtCurrentRuta').value = '';
    document.getElementById('txtCurrentTrayecto').value = '';
    document.getElementById('txtCurrentConductor').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id, trayecto) {
    var xmlDoc = createDOM(xmlRutaConductores);
    var RutaConductores = xmlDoc.documentElement.getElementsByTagName('RutaConductor');

    for (var j = 0; j < RutaConductores.length; j++) {

        if ((id == RutaConductores[j].selectSingleNode('IdRuta').childNodes[0].nodeValue) && (trayecto == RutaConductores[j].selectSingleNode('Trayecto').childNodes[0].nodeValue)) {
            return RutaConductores[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        document.getElementById('txtCurrentRuta').value = xmlNode.selectSingleNode("Ruta").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTrayecto').value = xmlNode.selectSingleNode("Trayecto").childNodes[0].nodeValue;
        document.getElementById('txtCurrentConductor').value = xmlNode.selectSingleNode("Conductor").childNodes[0].nodeValue;
        
        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentRuta", "txtCurrentTrayecto", "txtCurrentConductor"));

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}