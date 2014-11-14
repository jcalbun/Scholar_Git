//---------------Variables
var xmlEstablecimientos = '0';
var xmlEstablecimientoSave = '0';
var tmpEstablecimientoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentEstablecimiento;

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
    clearElements(new Array('txtCodigoEstablecimientoFilter', 'txtNombreEstablecimientoFilter'));
    showElements(new Array('divSearchTitle', 'divScreenToolBar'));
}

function search() {

    //Progress Bar
    parent.showProgressImg();

    operation = 'none';

    var strCodigo = document.getElementById("txtCodigoEstablecimientoFilter").value;
    var strNombre = document.getElementById("txtNombreEstablecimientoFilter").value;

    Establecimientos.getEstablecimientos(strCodigo, strNombre, getEstablecimientos_CallBack);
}

function getEstablecimientos_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlEstablecimientos = '-1';
        return;
    }
    xmlEstablecimientos = response.value;
    if (xmlEstablecimientos != '-1') {
        showEstablecimientos_SearchResults();
    }
}

function showEstablecimientos_SearchResults() {
    var xmlDoc = createDOM(xmlEstablecimientos);

    var Establecimientos = xmlDoc.getElementsByTagName("Establecimientos")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Establecimientos.length; j++) {
        var row = fillHTMLRowWithEstablecimientosHeader(Establecimientos[j]);
        row.onclick = function () { onSearchResultRowClickEstablecimientos(this); }
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

function fillHTMLRowWithEstablecimientosHeader(xmlNode) {
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
    if (validExistTag(xmlNode.getElementsByTagName('Descripcion')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Descripcion').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Direccion')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Direccion').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickEstablecimientos(row) {

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
    document.getElementById('txtCurrentDescripcion').value = '';
    document.getElementById('txtCurrentDireccion').value = '';
    document.getElementById('txtCurrentTelefono').value = '';
    document.getElementById('txtCurrentEmail').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlEstablecimientos);
    var Establecimientos = xmlDoc.documentElement.getElementsByTagName('Establecimiento');

    for (var j = 0; j < Establecimientos.length; j++) {
        if (id == Establecimientos[j].selectSingleNode('Id').childNodes[0].nodeValue) {
            return Establecimientos[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentId').value = xmlNode.selectSingleNode("Id").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDescripcion').value = xmlNode.selectSingleNode("Descripcion").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDireccion').value = xmlNode.selectSingleNode("Direccion").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTelefono').value = xmlNode.selectSingleNode("Telefono").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEmail').value = xmlNode.selectSingleNode("Email").childNodes[0].nodeValue;


        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentId", "txtCurrentDescripcion", "txtCurrentDireccion", "txtCurrentTelefono", "txtCurrentEmail"));

    disableElement('txtCurrentId');
    disableElement('txtCurrentDescripcion');
    disableElement('txtCurrentDireccion');
    disableElement('txtCurrentTelefono');
    disableElement('txtCurrentEmail');
    disableElement('ddlCurrentTipo');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}