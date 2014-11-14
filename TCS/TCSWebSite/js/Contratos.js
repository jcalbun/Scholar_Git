//---------------Variables
var xmlContratos = '0';
var xmlContratoSave = '0';
var tmpContratoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentContrato;

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

function onBtnPrintClick(){
    var nombre_tran = 'KLENNER CARCAMO JORGE';
    var rut_tran = '7.834.459-8';
    var fono_tran = '96428001';
    var domicilio_tran = 'LAS BANDURRIAS NRO 655 - RAHUE BAJO - OSORNO';
    var nombre_apo = document.getElementById('txtCurrentNombreApoderado').value;
    var rut_apo = document.getElementById('txtCurrentRutApoderado').value;
    var fono_apo = document.getElementById('txtCurrentFonoApoderado').value;
    var domicilio_apo = document.getElementById('txtCurrentDomicilioApoderado').value;
    var nombre_estab = document.getElementById('txtCurrentNombreEstablecimiento').value;
    var nombre_estudiante = document.getElementById('txtCurrentNombreEstudiante').value;
    var horario_trayecto = document.getElementById('txtCurrentHorarioTrayecto').value;
    var monto_numero = document.getElementById('txtCurrentMonto').value;
    var fecha_ini= document.getElementById('txtCurrentFechaInicio').value;
    var fecha_fin= document.getElementById('txtCurrentFechaFin').value;

    //window.open("Contrato_Print.aspx");
    var url = "Contrato_Print.aspx?nombre_tran=" + nombre_tran + "&rut_tran=" + rut_tran + "&fono_tran=" + fono_tran + "&domicilio_tran=" + domicilio_tran + "&nombre_apo=" + nombre_apo + "&rut_apo=" + rut_apo + "&fono_apo=" + fono_apo + "&domicilio_apo=" + domicilio_apo + "&nombre_estab=" + nombre_estab + "&nombre_estudiante=" + nombre_estudiante + "&horario_trayecto=" + horario_trayecto + "&monto_numero=" + monto_numero + "&fecha_ini=" + fecha_ini + "&fecha_fin=" + fecha_fin
    //alert(url);
    window.open(url)
   
//    Contratos.GenerateContract(nombre_tran, rut_tran, fono_tran, domicilio_tran, nombre_apo, rut_apo, fono_apo, domicilio_apo, nombre_estab, nombre_estudiante, horario_trayecto, monto_numero, fecha_ini, fecha_fin, onBtnPrintClick_CallBack);
}


function onBtnPrintClick_CallBack(response) {
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        return;
    }
    else {
        alert(response);
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

    var txtContratoId = document.getElementById("txtContratoId").value;
    var txtApoderado = document.getElementById("txtApoderado").value;
    var txtAnoContrato = document.getElementById("txtAnoContrato").value;
    var txtEstudiante = document.getElementById("txtEstudiante").value;
    var ddlFechaPago = '';


    Contratos.getContratos(txtContratoId, txtApoderado, txtEstudiante, txtAnoContrato, ddlFechaPago, getContratos_CallBack);
}

function getContratos_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlContratos = '-1';
        return;
    }
    xmlContratos = response.value;
    if (xmlContratos != '-1') {
        showContratos_SearchResults();
    }
}

function showContratos_SearchResults() {
    var xmlDoc = createDOM(xmlContratos);

    var Contratos = xmlDoc.getElementsByTagName("Contratos")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    //t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Contratos.length; j++) {
        var row = fillHTMLRowWithContratosHeader(Contratos[j]);
        row.onclick = function () { onSearchResultRowClickContratos(this); }
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

//    for (var i = 0; i < t.rows[0].cells.length; i++) {

//        var ancho = new String(t.rows[0].cells[i].width + "px");
//        document.getElementById('thResultsFixedHead').rows[0].cells[i].style.width = ancho;
//    }

    enableElements(new Array('btnNew'));
    disableElements(new Array('btnEdit', 'btnSave', 'btnCancel'));

    showElements(new Array('divResultsTitle', 'divResults'));
}

function fillHTMLRowWithContratosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // id_contrato
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('id_contrato')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('id_contrato').childNodes[0].nodeValue;
        td.width = "80px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //apoderado
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('apoderado')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('apoderado').childNodes[0].nodeValue;
        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //estudiante
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('estudiante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('estudiante').childNodes[0].nodeValue;
        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //ano_contrato
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('ano_contrato')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('ano_contrato').childNodes[0].nodeValue;
        td.width = "80px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

//    var td = document.createElement('td');
//    td.innerHTML = xmlNode.selectSingleNode('rut_apoderado').childNodes[0].nodeValue;
//    td.style.display = 'none';
//    tr.appendChild(td.cloneNode(true));

//    var td = document.createElement('td');
//    td.innerHTML = xmlNode.selectSingleNode('id_establecimiento').childNodes[0].nodeValue;
//    td.style.display = 'none';
//    tr.appendChild(td.cloneNode(true));

//    var td = document.createElement('td');
//    td.innerHTML = xmlNode.selectSingleNode('nombre_establecimiento').childNodes[0].nodeValue;
//    td.style.display = 'none';
//    tr.appendChild(td.cloneNode(true));

//    var td = document.createElement('td');
//    td.innerHTML = xmlNode.selectSingleNode('itinerario').childNodes[0].nodeValue;
//    td.style.display = 'none';
//    tr.appendChild(td.cloneNode(true));

//    var td = document.createElement('td');
//    td.innerHTML = xmlNode.selectSingleNode('direccion_apoderado').childNodes[0].nodeValue;
//    td.style.display = 'none';
//    tr.appendChild(td.cloneNode(true));

//    var td = document.createElement('td');
//    td.innerHTML = xmlNode.selectSingleNode('telefono_apoderado').childNodes[0].nodeValue;
//    td.style.display = 'none';
//    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickContratos(row) {

    enableElements(new Array('btnEdit', 'btnNew'));
    disableElements(new Array('btnSave', 'btnCancel'));

    HighLightTR(row, '#5b5a5a', 'cc3333');

    if (document.getElementById('divSearchDetail').clientHeight > 0) {
        CollapseDivSearchDetail();
    }

    resetCurrentPanel(); //Restore All values in Current Spare Div

    showCurrentPanel(); //Show Current Spare Div with Data charged from DB

    var xmlNode = getCurrentNode(row.getElementsByTagName('td')[0].innerHTML, row.getElementsByTagName('td')[2].innerHTML);

    displayCurrent(xmlNode);
}

function resetCurrentPanel() {
    clearElements(new Array('txtCurrentContrato', 'txtCurrentIdApoderado', 'txtCurrentNombreApoderado', 'txtCurrentIdEstudiante', 'txtCurrentNombreEstudiante', 'txtCurrentFechaInicio', 'txtCurrentFechaFin', 'txtCurrentMonto', 'txtCurrentObs', 'txtCurrentObs', 'txtCurrentIdEstablecimiento', 'txtCurrentNombreEstablecimiento'));
    document.getElementById('ddlCurrentAnoContrato').selectedIndex = 0;
    document.getElementById('ddlCurrentFechaPago').selectedIndex = 0;
    document.getElementById('chkCurrentActivo').checked = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id, id2) {
    var xmlDoc = createDOM(xmlContratos);
    var Contratos = xmlDoc.documentElement.getElementsByTagName('Contrato');

    for (var j = 0; j < Contratos.length; j++) {
        if (id == Contratos[j].selectSingleNode('id_contrato').childNodes[0].nodeValue && id2 == Contratos[j].selectSingleNode('estudiante').childNodes[0].nodeValue) {
            return Contratos[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentContrato').value = xmlNode.selectSingleNode("id_contrato").childNodes[0].nodeValue;
        document.getElementById('txtCurrentIdApoderado').value = xmlNode.selectSingleNode("id_apoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombreApoderado').value = xmlNode.selectSingleNode("apoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentIdEstudiante').value = xmlNode.selectSingleNode("id_estudiante").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombreEstudiante').value = xmlNode.selectSingleNode("estudiante").childNodes[0].nodeValue;

        document.getElementById('txtCurrentRutApoderado').value = xmlNode.selectSingleNode("rut_apoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDomicilioApoderado').value = xmlNode.selectSingleNode("direccion_apoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentFonoApoderado').value = xmlNode.selectSingleNode("telefono_apoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentIdEstablecimiento').value = xmlNode.selectSingleNode("id_establecimiento").childNodes[0].nodeValue;
        document.getElementById('txtCurrentHorarioTrayecto').value = xmlNode.selectSingleNode("itinerario").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombreEstablecimiento').value = xmlNode.selectSingleNode("nombre_establecimiento").childNodes[0].nodeValue;
        
        document.getElementById('txtCurrentFechaInicio').value = xmlNode.selectSingleNode("fecha_inicio").childNodes[0].nodeValue;
        document.getElementById('txtCurrentFechaFin').value = xmlNode.selectSingleNode("fecha_fin").childNodes[0].nodeValue;
        document.getElementById('txtCurrentMonto').value = xmlNode.selectSingleNode("monto_contrato").childNodes[0].nodeValue;

        ddlSetValue(document.getElementById('ddlCurrentFechaPago'), xmlNode.selectSingleNode("id_fecha_pago_contrato").childNodes[0].nodeValue);
        ddlSetValue(document.getElementById('ddlCurrentAnoContrato'), xmlNode.selectSingleNode("ano_contrato").childNodes[0].nodeValue);

        //document.getElementById('ddlCurrentFechaPago').value = xmlNode.selectSingleNode("IdAyudante").childNodes[0].nodeValue;

        document.getElementById('txtCurrentObs').value = xmlNode.selectSingleNode("observaciones").text;
        document.getElementById('chkCurrentActivo').checked = xmlNode.selectSingleNode("activo").text == 'Y' ? 'checked' : '';
        blockCurrent();
    }
}

function blockCurrent() {

    lockElements(new Array('txtCurrentContrato', 'txtCurrentIdApoderado', 'txtCurrentNombreApoderado', 'txtCurrentIdEstudiante', 'txtCurrentNombreEstudiante', 'txtCurrentFechaInicio', 'txtCurrentFechaFin', 'txtCurrentMonto', 'txtCurrentObs', 'txtCurrentObs', 'txtCurrentIdEstablecimiento', 'txtCurrentNombreEstablecimiento'));
    disableElements(new Array('txtCurrentContrato', 'txtCurrentIdApoderado', 'txtCurrentNombreApoderado', 'txtCurrentIdEstudiante', 'txtCurrentNombreEstudiante', 'txtCurrentFechaInicio', 'txtCurrentFechaFin', 'txtCurrentMonto', 'txtCurrentObs', 'txtCurrentObs', 'txtCurrentIdEstablecimiento', 'txtCurrentNombreEstablecimiento'));

    document.getElementById('ddlCurrentAnoContrato').disabled = true;
    document.getElementById('ddlCurrentFechaPago').disabled = true;
    document.getElementById('chkCurrentActivo').disabled = true;

    //    lockElements(new Array("txtCurrentContrato", "txtCurrentIdApoderado", "txtCurrentEstudiante", "txtCurrentAno", "txtCurrentFechaInicio", "txtCurrentFechaFin", "txtCurrentMonto", "txtCurrentObs"));
    //    disableElements(new Array("txtCurrentContrato", "txtCurrentIdApoderado", "txtCurrentEstudiante", "txtCurrentAno", "txtCurrentFechaInicio", "txtCurrentFechaFin", "txtCurrentMonto", "txtCurrentObs"));

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
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

    document.getElementById('ddlCurrentAnoContrato').disabled = false;
    document.getElementById('ddlCurrentFechaPago').disabled = false;
    document.getElementById('chkCurrentActivo').disabled = false;

    unlockElements(new Array('txtCurrentFechaInicio', 'txtCurrentFechaFin', 'txtCurrentMonto', 'txtCurrentObs'));
    enableElements(new Array('txtCurrentFechaInicio', 'txtCurrentFechaFin', 'txtCurrentMonto', 'txtCurrentObs'));


}

function validateSave() {
    var error_msg = '';
    if (trim(document.getElementById("txtCurrentIdApoderado").value) == '') { error_msg = error_msg + '<br />Error: Debe seleccionar un apoderado.' }
    if (trim(document.getElementById("txtCurrentIdEstudiante").value) == '') { error_msg = error_msg + '<br />Error: Debe seleccionar un estudiante.' }
    if (trim(document.getElementById("txtCurrentIdEstablecimiento").value) == '') { error_msg = error_msg + '<br />Error: Debe seleccionar un establecimiento.' }
    if (trim(document.getElementById("txtCurrentFechaInicio").value) == '') { error_msg = error_msg + '<br />Error: Debe ingresar una fecha de inicio de contrato.' }
    if (trim(document.getElementById("txtCurrentFechaFin").value) == '') { error_msg = error_msg + '<br />Error: Debe ingresar una fecha de fin de contrato.' }
    if (trim(document.getElementById("txtCurrentMonto").value) == '') { error_msg = error_msg + '<br />Error: Debe ingresar valor de cuota mensual.' }
    if (document.getElementById("ddlCurrentAnoContrato").selectedIndex == 0) { error_msg = error_msg + '<br />Error: Debe seleccionar un año de contrato.' }
    if (document.getElementById("ddlCurrentFechaPago").selectedIndex == 0) { error_msg = error_msg + '<br />Error: Debe seleccionar una fecha de pago.' }
    return error_msg;
}

function onBtnSaveClick() {

    var error_msg = validateSave();
    if (trim(error_msg) == '') {

        //Progress Bar
        parent.showProgressImg();

        var txtCurrentContrato = document.getElementById("txtCurrentContrato").value;
        var txtCurrentIdApoderado = document.getElementById("txtCurrentIdApoderado").value;
        var txtCurrentIdEstudiante = document.getElementById("txtCurrentIdEstudiante").value;
        var txtCurrentFechaInicio = document.getElementById("txtCurrentFechaInicio").value;
        var txtCurrentFechaFin = document.getElementById("txtCurrentFechaFin").value;
        var txtCurrentMonto = document.getElementById("txtCurrentMonto").value;
        var txtCurrentObs = document.getElementById("txtCurrentObs").value;

        var ddlCurrentAnoContrato = document.getElementById("ddlCurrentAnoContrato");
        var txtCurrentAnoContrato = ddlCurrentAnoContrato.options[ddlCurrentAnoContrato.selectedIndex].value;

        var ddlCurrentFechaPago = document.getElementById("ddlCurrentFechaPago");
        var txtCurrentFechaPago = ddlCurrentFechaPago.options[ddlCurrentFechaPago.selectedIndex].value;

        var chkActivo = document.getElementById("chkCurrentActivo").checked ? 'Y' : 'N';

        if (operation == 'edit') {
            Contratos.UpdateContratos(txtCurrentContrato, txtCurrentIdApoderado, txtCurrentIdEstudiante, txtCurrentAnoContrato, txtCurrentFechaInicio, txtCurrentFechaFin, txtCurrentMonto, txtCurrentFechaPago, txtCurrentObs, chkActivo, saveContrato_CallBack);
        }
        if (operation == 'new') {
            Contratos.InsertContratos(txtCurrentContrato, txtCurrentIdApoderado, txtCurrentIdEstudiante, txtCurrentAnoContrato, txtCurrentFechaInicio, txtCurrentFechaFin, txtCurrentMonto, txtCurrentFechaPago, txtCurrentObs, chkActivo, saveContrato_CallBack);

        }
    }
    else {
        alert(error_msg);

    }
}

function saveContrato_CallBack(response) {

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

function onBtnCurrentApoderadoClick() {
    //Progress Bar
    parent.showProgressImg();
    Contratos.LoadApoderadosPopupPage('', '', '', LoadApoderadosPopupPage_CallBack);

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

        td.width = "180px";
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

        td.width = "345px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    td.innerHTML = xmlNode.selectSingleNode('Direccion').childNodes[0] != null ? xmlNode.selectSingleNode('Direccion').childNodes[0].nodeValue : '';
    td.style.display = 'none';
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    td.innerHTML = xmlNode.selectSingleNode('Telefono').childNodes[0] != null ? xmlNode.selectSingleNode('Telefono').childNodes[0].nodeValue : '';
    td.style.display = 'none';
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchUsuariosPopup(row) {
    document.getElementById('txtCurrentIdApoderado').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentNombreApoderado').value = row.getElementsByTagName('td')[2].innerHTML;
    document.getElementById('txtCurrentRutApoderado').value = row.getElementsByTagName('td')[1].innerHTML;
    document.getElementById('txtCurrentDomicilioApoderado').value = row.getElementsByTagName('td')[3].innerHTML;
    document.getElementById('txtCurrentFonoApoderado').value = row.getElementsByTagName('td')[3].innerHTML;
    closeModal();
}

function onBtnCloseSearchManufacturersPopUpClick() {
    closeModal();
}

/////////////////////////// NEW ESTUDIANTE POPUP ///////////////////////////////////
var xmlEstudiantesPopup = '0';
var NewEstudiantePagePopup = 1;

function onBtnCurrentEstudianteClick() {
    //Progress Bar
    parent.showProgressImg();
    var id_apoderado = document.getElementById('txtCurrentIdApoderado').value
    Contratos.LoadEstudiantesPopupPage('', '', '', id_apoderado, LoadeEstudiantesPopupPage_CallBack);

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

        td.width = "180px";
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

        td.width = "345px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchEstudiantesPopup(row) {
    document.getElementById('txtCurrentIdEstudiante').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentNombreEstudiante').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchEstudiantesPopUpClick() {
    closeModal();
}


/////////////////////////// NEW ESTBALECIMIENTOS POPUP ///////////////////////////////////

var xmlNewEstablecimientosPopup = '0';
var NewEstablecimientosPagePopup = 1;

function onSearchNewEstablecimientosClick() {
    //Progress Bar
    parent.showProgressImg();
    var id_estudiante = document.getElementById('txtCurrentIdEstudiante').value;
    Contratos.LoadNewEstablecimientosPopupPage(id_estudiante, LoadeNewEstablecimientosPopupPage_CallBack);

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
    if (validExistTag(xmlNode.getElementsByTagName('Id_Establecimiento')[0])) {

        if (xmlNode.selectSingleNode('Id_Establecimiento').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Id_Establecimiento').childNodes[0].nodeValue;
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

    td = document.createElement('td');
    td.innerHTML = xmlNode.selectSingleNode('Itinerario').childNodes[0].nodeValue;
    td.style.display = 'none';
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onNewSearchResultRowClickSearchEstablecimientosPopup(row) {
    document.getElementById('txtCurrentIdEstablecimiento').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtCurrentNombreEstablecimiento').value = row.getElementsByTagName('td')[1].innerHTML;
    document.getElementById('txtCurrentHorarioTrayecto').value = row.getElementsByTagName('td')[3].innerHTML;
    closeModal();
}

function onBtnCloseNewSearchEstablecimientosPopUpClick() {
    closeModal();
}