//---------------Variables
var xmlEgresos = '0';
var xmlEgresoSave = '0';
var tmpEgresoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentEgreso;

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

    var txtEgreso = document.getElementById("txtEgreso").value;
    var txtDocumento = document.getElementById("txtDocumento").value;
    var ddlTipoEgreso = ''; // document.getElementById("ddlTipoEgreso").value;
    var txtFechaDesde = document.getElementById("txtFechaDesde").value;
    var txtFechaHasta = document.getElementById("txtFechaHasta").value;

    Egresos.getEgresos(txtEgreso, txtDocumento, ddlTipoEgreso, txtFechaDesde, txtFechaHasta, getEgresos_CallBack);
}

function getEgresos_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlEgresos = '-1';
        return;
    }
    xmlEgresos = response.value;
    if (xmlEgresos != '-1') {
        showEgresos_SearchResults();
    }
}

function showEgresos_SearchResults() {
    var xmlDoc = createDOM(xmlEgresos);

    var Egresos = xmlDoc.getElementsByTagName("Egresos")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Egresos.length; j++) {
        var row = fillHTMLRowWithEgresosHeader(Egresos[j]);
        row.onclick = function () { onSearchResultRowClickEgresos(this); }
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

function fillHTMLRowWithEgresosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // id_contrato
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('numero_documento')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('numero_documento').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //apoderado
    if (validExistTag(xmlNode.getElementsByTagName('tipo_egreso')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('tipo_egreso').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //estudiante
    if (validExistTag(xmlNode.getElementsByTagName('monto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('monto').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //ano_contrato
    if (validExistTag(xmlNode.getElementsByTagName('fecha')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('fecha').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickEgresos(row) {

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
    document.getElementById('txtCurrentEgreso').value = '';
    document.getElementById('txtCurrentDocumento').value = '';
    //document.getElementById('ddlCurrentTipoEgreso').value = '';
    document.getElementById('txtCurrentFecha').value = '';
    document.getElementById('txtCurrentAno').value = '';
    document.getElementById('txtCurrentMes').value = '';
    document.getElementById('txtCurrentMonto').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlEgresos);
    var Egresos = xmlDoc.documentElement.getElementsByTagName('Egreso');

    for (var j = 0; j < Egresos.length; j++) {
        if (id == Egresos[j].selectSingleNode('numero_documento').childNodes[0].nodeValue) {
            return Egresos[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentEgreso').value = xmlNode.selectSingleNode("id_egreso").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDocumento').value = xmlNode.selectSingleNode("numero_documento").childNodes[0].nodeValue;
        //document.getElementById('ddlCurrentTipoEgreso').value = xmlNode.selectSingleNode("id_pago").childNodes[0].nodeValue;
        document.getElementById('txtCurrentFecha').value = xmlNode.selectSingleNode("fecha").childNodes[0].nodeValue;
        document.getElementById('txtCurrentAno').value = xmlNode.selectSingleNode("ano_egreso").childNodes[0].nodeValue;
        document.getElementById('txtCurrentMes').value = xmlNode.selectSingleNode("mes_egreso").childNodes[0].nodeValue;
        document.getElementById('txtCurrentMonto').value = xmlNode.selectSingleNode("monto").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentEgreso", "txtCurrentDocumento", "ddlCurrentTipoEgreso", "txtCurrentFecha", "txtCurrentAno", "txtCurrentMes", "txtCurrentMonto"));
    disableElements(new Array("txtCurrentEgreso", "txtCurrentDocumento", "ddlCurrentTipoEgreso", "txtCurrentFecha", "txtCurrentAno", "txtCurrentMes", "txtCurrentMonto"))

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}