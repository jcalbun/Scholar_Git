//---------------Variables
var xmlPagos = '0';
var xmlPagoSave = '0';
var tmpPagoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentPago;

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

    var txtPagoId = document.getElementById("txtPagoId").value;
    var txtApoderado = document.getElementById("txtApoderado").value;
    var txtContrato = document.getElementById("txtContrato").value;
    var txtDocumento = document.getElementById("txtDocumento").value;
    var txtFechaDesde = document.getElementById("txtFechaDesde").value;
    var txtFechaHasta = document.getElementById("txtFechaHasta").value;

    Pagos.getPagos(txtPagoId, txtApoderado, txtContrato, txtDocumento, txtFechaDesde, txtFechaHasta, getPagos_CallBack);
}

function getPagos_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlPagos = '-1';
        return;
    }
    xmlPagos = response.value;
    if (xmlPagos != '-1') {
        showPagos_SearchResults();
    }
}

function showPagos_SearchResults() {
    var xmlDoc = createDOM(xmlPagos);

    var Pagos = xmlDoc.getElementsByTagName("Pagos")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Pagos.length; j++) {
        var row = fillHTMLRowWithPagosHeader(Pagos[j]);
        row.onclick = function () { onSearchResultRowClickPagos(this); }
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

function fillHTMLRowWithPagosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // id_contrato
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('id_pago')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('id_pago').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //apoderado
    if (validExistTag(xmlNode.getElementsByTagName('apoderado')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('apoderado').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //estudiante
    if (validExistTag(xmlNode.getElementsByTagName('numero_documento')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('numero_documento').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //ano_contrato
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

function onSearchResultRowClickPagos(row) {

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
    document.getElementById('txtCurrentIdPago').value = '';
    document.getElementById('txtCurrentApoderado').value = '';
    document.getElementById('txtCurrentContrato').value = '';
    document.getElementById('txtCurrentFechaPago').value = '';
    document.getElementById('txtCurrentComprobante').value = '';
//    document.getElementById('txtCurrentMesCuota').value = '';
    document.getElementById('txtCurrentMonto').value = '';
    //ddlCurrentTipoPago
    document.getElementById('txtCurrentObs').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlPagos);
    var Pagos = xmlDoc.documentElement.getElementsByTagName('Pago');

    for (var j = 0; j < Pagos.length; j++) {
        if (id == Pagos[j].selectSingleNode('id_pago').childNodes[0].nodeValue) {
            return Pagos[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentIdPago').value = xmlNode.selectSingleNode("id_pago").childNodes[0].nodeValue;
        document.getElementById('txtCurrentApoderado').value = xmlNode.selectSingleNode("apoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentContrato').value = xmlNode.selectSingleNode("id_contrato").childNodes[0].nodeValue;
        document.getElementById('txtCurrentFechaPago').value = xmlNode.selectSingleNode("fecha").childNodes[0].nodeValue;

        ddlSetValue(document.getElementById('ddlCurrentAnoCuota'), xmlNode.selectSingleNode("ano_cuota").childNodes[0].nodeValue);
        ddlSetValue(document.getElementById('ddlCurrentMesCuota'), xmlNode.selectSingleNode("mes_cuota").childNodes[0].nodeValue);

//        document.getElementById('txtCurrentAnoCuota').value = xmlNode.selectSingleNode("ano_cuota").childNodes[0].nodeValue;
//        document.getElementById('txtCurrentMesCuota').value = xmlNode.selectSingleNode("mes_cuota").childNodes[0].nodeValue;
        
        document.getElementById('txtCurrentMonto').value = xmlNode.selectSingleNode("monto").childNodes[0].nodeValue;
        document.getElementById('txtCurrentComprobante').value = xmlNode.selectSingleNode("numero_documento").childNodes[0].nodeValue;

        ddlSetValue(document.getElementById('ddlCurrentTipoPago'), xmlNode.selectSingleNode("tipo_pago").childNodes[0].nodeValue);

        document.getElementById('txtCurrentObs').value = xmlNode.getElementsByTagName("observaciones")[0].text;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdPago", "txtCurrentApoderado", "txtCurrentContrato", "txtCurrentFechaPago", "txtCurrentMonto", "txtCurrentComprobante", "txtCurrentObs"));
    disableElements(new Array("txtCurrentIdPago", "txtCurrentApoderado", "txtCurrentContrato", "txtCurrentFechaPago", "txtCurrentMonto", "txtCurrentComprobante", "txtCurrentObs"));

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

    lockElements(new Array("txtCurrentIdPago"));
    unlockElements(new Array("txtCurrentApoderado", "txtCurrentContrato", "txtCurrentFechaPago", 'txtCurrentMonto', 'txtCurrentComprobante', 'txtCurrentObs'));
    enableElements(new Array("txtCurrentApoderado", "txtCurrentContrato", "txtCurrentFechaPago", 'txtCurrentMonto', 'txtCurrentComprobante', 'txtCurrentObs'));

    //    unlockElements(new Array("txtCurrentManufacturerDescription", "chkCurrentActive"));
    //    enableElements(new Array("chkCurrentActive"));
    document.getElementById('txtCurrentApoderado').focus;

}

function onBtnSaveClick() {


    //Progress Bar
    parent.showProgressImg();

    var txtCurrentIdPago = document.getElementById('txtCurrentIdPago').value
    var txtCurrentIdApoderado = document.getElementById('txtCurrentIdApoderado').value
    var txtCurrentContratoId = document.getElementById('txtCurrentContratoId').value
    var txtCurrentFechaPago = document.getElementById('txtCurrentFechaPago').value

    var ddlCurrentAnoCuota = document.getElementById("ddlCurrentAnoCuota");
    var txtCurrentAnoCuota = ddlCurrentAnoCuota.options[ddlCurrentAnoCuota.selectedIndex].value;

    var ddlCurrentMesCuota = document.getElementById("ddlCurrentMesCuota");
    var txtCurrentMesCuota = ddlCurrentMesCuota.options[ddlCurrentMesCuota.selectedIndex].value;

    var txtCurrentMonto = document.getElementById('txtCurrentMonto').value

    var ddlCurrentTipoPago = document.getElementById("ddlCurrentTipoPago");
    var txtCurrentTipoPago = ddlCurrentTipoPago.options[ddlCurrentTipoPago.selectedIndex].value;

    var txtCurrentComprobante = document.getElementById('txtCurrentComprobante').value
    var txtCurrentObs = document.getElementById('txtCurrentObs').value

    if (operation == 'edit') {
        Pagos.UpdatePago(txtCurrentIdPago, txtCurrentIdApoderado, txtCurrentContratoId, txtCurrentFechaPago, txtCurrentAnoCuota, txtCurrentMesCuota, txtCurrentMonto, txtCurrentTipoPago, txtCurrentComprobante, txtCurrentObs, savePagos_CallBack);
    }
    if (operation == 'new') {
        Pagos.InsertPago(txtCurrentIdPago, txtCurrentIdApoderado, txtCurrentContratoId, txtCurrentFechaPago, txtCurrentAnoCuota, txtCurrentMesCuota, txtCurrentMonto, txtCurrentTipoPago, txtCurrentComprobante, txtCurrentObs, savePagos_CallBack);
    }

}

function savePagos_CallBack(response) {

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

            //refresh_search();
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


/////////////////////////// NEW APODERADO POPUP ///////////////////////////////////

var xmlUsuariosPopup = '0';
var NewUsuariosPagePopup = 1;

var xmlEstudiantePopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchNewApoderadoClick() {
    //Progress Bar
    parent.showProgressImg();
    Pagos.LoadApoderadosPopupPage('', '', '', LoadApoderadosPopupPage_CallBack);

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


//////////////////////NEW SEARCH CONTRATOS////////////////


var xmlContratosPopup = '0';

function onSearchNewContratoClick() {
    //Progress Bar
    parent.showProgressImg();
    var apoderado_id = document.getElementById('txtCurrentIdApoderado').value;
    Pagos.LoadContratosPopupPage(apoderado_id, LoadContratosPopupPage_CallBack);

}

function LoadContratosPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlContratosPopup = '-1';
        return;
    }
    parent.xmlContratosPopup = response.value;

    if (parent.xmlContratosPopup != '-1') {
        showSearchContratosPopup_Results();
    }
}

function showSearchContratosPopup_Results() {

    var xmlDoc = createDOM(parent.xmlContratosPopup);
    var Contratos = xmlDoc.documentElement.getElementsByTagName('Contrato');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchContratosPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < Contratos.length; j++) {
        var row = fillHTMLRowWithSearchContratosPopupHeader(Contratos[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchContratosPopup(this);');

    document.getElementById('divSearchContratosPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divSearchContratosPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithSearchContratosPopupHeader(xmlNode) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('id_contrato')[0])) {

        if (xmlNode.selectSingleNode('id_contrato').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('id_contrato').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "80px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('ano_contrato')[0])) {

        if (xmlNode.selectSingleNode('ano_contrato').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('ano_contrato').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('apoderado')[0])) {

        if (xmlNode.selectSingleNode('apoderado').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('apoderado').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('estudiante')[0])) {

        if (xmlNode.selectSingleNode('estudiante').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('estudiante').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchContratosPopup(row) {
    document.getElementById('txtCurrentContratoId').value = row.getElementsByTagName('td')[0].innerHTML
    document.getElementById('txtCurrentContrato').value = row.getElementsByTagName('td')[0].innerHTML + '-' + row.getElementsByTagName('td')[1].innerHTML;
    closeModal();
}

function onBtnCloseSearchContratosPopUpClick() {
    closeModal();
}