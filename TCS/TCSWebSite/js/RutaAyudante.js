//---------------Variables
var xmlRutaAyudantes = '0';
var xmlRutaAyudanteSave = '0';
var tmpRutaAyudanteId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentRutaAyudante;

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

    var txtRuta = document.getElementById("txtRuta").value;
    var txtTrayecto = document.getElementById("txtTrayecto").value;
    var txtAyudante = document.getElementById("txtAyudante").value;
    var txtEstudiante = document.getElementById("txtEstudiante").value;

    RutaAyudante.getRutaAyudantes(txtRuta, txtTrayecto, txtAyudante, txtEstudiante, getRutaAyudantes_CallBack);
}

function getRutaAyudantes_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlRutaAyudantes = '-1';
        return;
    }
    xmlRutaAyudantes = response.value;
    if (xmlRutaAyudantes != '-1') {
        showRutaAyudantes_SearchResults();
    }
}

function showRutaAyudantes_SearchResults() {
    var xmlDoc = createDOM(xmlRutaAyudantes);

    var RutaAyudantes = xmlDoc.getElementsByTagName("RutaAyudantes")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < RutaAyudantes.length; j++) {
        var row = fillHTMLRowWithRutaAyudantesHeader(RutaAyudantes[j]);
        row.onclick = function () { onSearchResultRowClickRutaAyudantes(this); }
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

function fillHTMLRowWithRutaAyudantesHeader(xmlNode) {
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

    //DescripcionRutaAyudante
    if (validExistTag(xmlNode.getElementsByTagName('Trayecto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Trayecto').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Ayudante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Ayudante').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickRutaAyudantes(row) {

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
    document.getElementById('txtCurrentAyudante').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id, trayecto) {
    var xmlDoc = createDOM(xmlRutaAyudantes);
    var RutaAyudantes = xmlDoc.documentElement.getElementsByTagName('RutaAyudante');

    for (var j = 0; j < RutaAyudantes.length; j++) {

        if ((id == RutaAyudantes[j].selectSingleNode('IdRuta').childNodes[0].nodeValue) && (trayecto == RutaAyudantes[j].selectSingleNode('Trayecto').childNodes[0].nodeValue)) {
            return RutaAyudantes[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        document.getElementById('txtCurrentRuta').value = xmlNode.selectSingleNode("Ruta").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTrayecto').value = xmlNode.selectSingleNode("Trayecto").childNodes[0].nodeValue;
        document.getElementById('txtCurrentAyudante').value = xmlNode.selectSingleNode("Ayudante").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentRuta", "txtCurrentTrayecto", "txtCurrentAyudante"));

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}