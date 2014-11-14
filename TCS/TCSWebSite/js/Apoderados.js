function existsRut_CallBack(response) {
    var xmlResponse = 0;

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlResponse = '-1';
        return;
    }

    xmlResponse = response.value;
    if (xmlResponse != '-1') {
        
        if (xmlResponse == true) {
            document.getElementById('txtCurrentRutApoderado').value = '';
            document.getElementById('txtCurrentRutApoderado').focus();
            alert('Rut registrado a otro apoderado!');
            return;
        }

    }
}

function onTxtCurrentRutApoderadoBlur(obj) {

    if (obj.value.toString().trim() != '') {
        
        if (VerificaRut(obj.value)) {
            //alert("Rut correcto");
            Apoderados.existsRut(obj.value, existsRut_CallBack);

        }
        else {
            //alert("Rut incorrecto");

            document.getElementById('txtCurrentRutApoderado').value = '';
            document.getElementById('txtCurrentRutApoderado').focus();
            alert('Rut no valido!');
        }
    }
}

function VerificaRut(rut) {
    if (rut.toString().trim() != '' && rut.toString().indexOf('-') > 0) {
        var caracteres = new Array();
        var serie = new Array(2, 3, 4, 5, 6, 7);
        var dig = rut.toString().substr(rut.toString().length - 1, 1);
        rut = rut.toString().substr(0, rut.toString().length - 2);

        for (var i = 0; i < rut.length; i++) {
            caracteres[i] = parseInt(rut.charAt((rut.length - (i + 1))));
        }

        var sumatoria = 0;
        var k = 0;
        var resto = 0;

        for (var j = 0; j < caracteres.length; j++) {
            if (k == 6) {
                k = 0;
            }
            sumatoria += parseInt(caracteres[j]) * parseInt(serie[k]);
            k++;
        }

        resto = sumatoria % 11;
        dv = 11 - resto;

        if (dv == 10) {
            dv = "K";
        }
        else if (dv == 11) {
            dv = 0;
        }

        if (dv.toString().trim().toUpperCase() == dig.toString().trim().toUpperCase())
            return true;
        else
            return false;
    }
    else {
        return false;
    }
}

//---------------Variables
var xmlApoderados = '0';
var xmlApoderadoSave = '0';
var tmpApoderadoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentApoderado;

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

    var _id_apoderado= document.getElementById("txtApoderadoId").value;
    var _rut_apoderado= document.getElementById("txtRut").value;
    var _nombres_apoderado= document.getElementById("txtNombres").value;
    var _apellidos_apoderado= document.getElementById("txtApellidos").value;
    var _nombre_estudiante= document.getElementById("txtEstudiante").value;
    var _nombre_establecimiento= document.getElementById("txtEstablecimiento").value;
    var _contacto= document.getElementById("txtContacto").value;

    Apoderados.getApoderados(_id_apoderado, _rut_apoderado, _nombres_apoderado, _apellidos_apoderado,  _nombre_estudiante, _nombre_establecimiento, _contacto, getApoderados_CallBack);
}

function getApoderados_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlApoderados = '-1';
        return;
    }
    xmlApoderados = response.value;
    if (xmlApoderados != '-1') {
        showApoderados_SearchResults();
    }
}

function showApoderados_SearchResults() {
    var xmlDoc = createDOM(xmlApoderados);

    var Apoderados = xmlDoc.getElementsByTagName("Apoderados")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Apoderados.length; j++) {
        var row = fillHTMLRowWithApoderadosHeader(Apoderados[j]);
        row.onclick = function () { onSearchResultRowClickApoderados(this); }
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

function fillHTMLRowWithApoderadosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Id')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('Id').childNodes[0].nodeValue;
        td.width = "50px";
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

function onSearchResultRowClickApoderados(row) {

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
    document.getElementById('txtCurrentIdApoderado').value = '';
    document.getElementById('txtCurrentRutApoderado').value = '';
    document.getElementById('txtCurrentNombresApoderado').value = '';
    document.getElementById('txtCurrentApellidosApoderado').value = '';
    document.getElementById('chkCurrentTieneContrato').checked = '';
    document.getElementById('ddlParentesco').selectedIndex =0;
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlApoderados);
    var Apoderados = xmlDoc.documentElement.getElementsByTagName('Apoderado');

    for (var j = 0; j < Apoderados.length; j++) {
        if (id == Apoderados[j].selectSingleNode('Id').childNodes[0].nodeValue) {
            return Apoderados[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentIdApoderado').value = xmlNode.selectSingleNode("Id").childNodes[0].nodeValue;
        document.getElementById('txtCurrentRutApoderado').value = xmlNode.selectSingleNode("Rut").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombresApoderado').value = xmlNode.selectSingleNode("Nombres").childNodes[0].nodeValue;
        document.getElementById('txtCurrentApellidosApoderado').value = xmlNode.selectSingleNode("Apellidos").childNodes[0].nodeValue;

        xmlNode.selectSingleNode("TieneContrato").childNodes[0].nodeValue == 'S' ? document.getElementById('chkCurrentTieneContrato').checked = 'checked' : document.getElementById('chkCurrentTieneContrato').checked = '';

        //document.getElementById('chkCurrentTieneContrato').checked = 'checked';
        //document.getElementById('ddlParentesco')

        ddlSetValue(document.getElementById('ddlParentesco'), xmlNode.selectSingleNode("TipoParentezco").childNodes[0].nodeValue);

//        var sel = document.getElementById('ddlParentesco');
//        var val = xmlNode.selectSingleNode("TipoParentezco").childNodes[0].nodeValue;
//        
//        for(var i = 0, j = sel.options.length; i < j; ++i) {
//            if(sel.options[i].innerHTML === val) {
//               sel.selectedIndex = i;
//               break;
//            }
//        }

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdApoderado", "txtCurrentRutApoderado", "txtCurrentNombresApoderado", "txtCurrentApellidosApoderado", "chkCurrentTieneContrato", "ddlParentesco"));

    disableElement('txtCurrentIdApoderado');
    disableElement('txtCurrentRutApoderado');
    disableElement('txtCurrentNombresApoderado');
    disableElement('txtCurrentApellidosApoderado');
    disableElement('chkCurrentTieneContrato');
    disableElement('ddlParentesco');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}

function onBtnEditClick() {
    unblockCurrent();
}

function unblockCurrent() {

    var txtCurrentIdApoderado = document.getElementById('txtCurrentIdApoderado').value;
    if (trim(txtCurrentIdApoderado) != '') {

        operation = 'edit';

        enableElements(new Array("txtCurrentRutApoderado", "txtCurrentNombresApoderado", "txtCurrentApellidosApoderado", "chkCurrentTieneContrato", "ddlParentesco"));
        enableElements(new Array());

        //---Edit Button Settings---//
        editButtonSettings();
    }
}

function editButtonSettings() {
    enableElements(new Array('btnSave', 'btnCancel'));
    disableElements(new Array('btnEdit'));
}

function onBtnCancelClick() {

    enableElement('btnEdit');
    disableElements(new Array('btnCancel', 'btnSave'));

    resetCurrentPanel();

    blockCurrent();
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

    unlockElements(new Array("txtCurrentRutApoderado", "txtCurrentNombresApoderado", "txtCurrentApellidosApoderado", "chkCurrentTieneContrato"));
    
//    unlockElements(new Array("txtCurrentManufacturerDescription", "chkCurrentActive"));
//    enableElements(new Array("chkCurrentActive"));
    document.getElementById('txtCurrentRutApoderado').focus;

}

function validateSaveApoderado() {

    if (document.getElementById('txtCurrentRutApoderado').value == '') {
        //alert('Please verify Manufacturer Code');
        parent.showMsgBoxAdv('Favor verificar Rut');
        return false;
    }
    if (document.getElementById('txtCurrentNombresApoderado').value == '') {
        parent.showMsgBoxAdv('Favor verificar Nombres');

        return false;
    }

    if (document.getElementById('txtCurrentApellidosApoderado').value == '') {
        parent.showMsgBoxAdv('Favor verificar Apellidos');

        return false;
    }

    return true;
}

function onBtnSaveClick() {

    if (validateSaveApoderado()) {

        //Progress Bar
        parent.showProgressImg();

        //        xmlManufacturerSave = buildXmlManufacturer();

        //        var xmlManufacturerSaveResult = createDOM(xmlManufacturerSave.outerHTML);

        var txtCodigo = document.getElementById('txtCurrentIdApoderado').value
        var txtRut = document.getElementById('txtCurrentRutApoderado').value
        var txtNombre = document.getElementById('txtCurrentNombresApoderado').value
        var txtApellidos = document.getElementById('txtCurrentApellidosApoderado').value

        if (document.getElementById('chkCurrentTieneContrato').checked) {
            var txtTieneContrato = 'S'
        }
        else {
            var txtTieneContrato = 'N'
        }

        var ddlParentesco = document.getElementById("ddlParentesco");
        var txtParentesco = ddlParentesco.options[ddlParentesco.selectedIndex].value;



        if (operation == 'edit') {
            Apoderados.UpdateApoderado(txtCodigo, txtRut, txtNombre, txtApellidos, txtTieneContrato, txtParentesco, saveApoderado_CallBack);
        }
        if (operation == 'new') {
            Apoderados.InsertApoderado(txtCodigo, txtRut, txtNombre, txtApellidos, txtTieneContrato, txtParentesco, saveApoderado_CallBack);
        }
    }
}

function refresh_search() {
    operation = 'none';
    var _id_apoderado = document.getElementById("txtApoderadoId").value;
    var _rut_apoderado = document.getElementById("txtRut").value;
    var _nombres_apoderado = document.getElementById("txtNombres").value;
    var _apellidos_apoderado = document.getElementById("txtApellidos").value;
    var _nombre_estudiante = document.getElementById("txtEstudiante").value;
    var _nombre_establecimiento = document.getElementById("txtEstablecimiento").value;
    var _contacto = document.getElementById("txtContacto").value;

    Apoderados.getApoderados(_id_apoderado, _rut_apoderado, _nombres_apoderado, _apellidos_apoderado, _nombre_estudiante, _nombre_establecimiento, _contacto, getApoderados_CallBack);

}

function saveApoderado_CallBack(response) {

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
            parent.showMsgBoxAdv('Operation exitosa');
            refresh_search();
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

