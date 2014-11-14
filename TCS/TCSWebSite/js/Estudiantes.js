//---------------Variables
var xmlEstudiantes = '0';
var xmlEstudianteSave = '0';
var tmpEstudianteId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentEstudiante;

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

function onTxtCurrentRutEstudianteBlur(obj) {

    if (obj.value.toString().trim() != '') {

        if (VerificaRut(obj.value)) {
            //alert("Rut correcto");
            Estudiantes.existsRut(obj.value, existsRut_CallBack);

        }
        else {
            //alert("Rut incorrecto");

            document.getElementById('txtCurrentRutEstudiante').value = '';
            document.getElementById('txtCurrentRutEstudiante').focus();
            alert('Rut no valido!');
        }
    }
}

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
            document.getElementById('txtCurrentRutEstudiante').value = '';
            document.getElementById('txtCurrentRutEstudiante').focus();
            alert('Rut registrado a otro estudiante!');
            return;
        }

    }
}

function validateSaveEstudiante() {

    if (document.getElementById('txtCurrentRutEstudiante').value == '') {
        parent.showMsgBoxAdv('Favor verificar Rut');
        return false;
    }
    if (document.getElementById('txtCurrentNombres').value == '') {
        parent.showMsgBoxAdv('Favor verificar Nombres');

        return false;
    }

    if (document.getElementById('txtCurrentApellidos').value == '') {
        parent.showMsgBoxAdv('Favor verificar Apellidos');

        return false;
    }

    return true;
}

function onBtnSaveClick() {

    if (validateSaveEstudiante()) {

        //Progress Bar
        parent.showProgressImg();

        //        xmlManufacturerSave = buildXmlManufacturer();

        //        var xmlManufacturerSaveResult = createDOM(xmlManufacturerSave.outerHTML);

        var txtCurrentIdEstudiante = document.getElementById('txtCurrentIdEstudiante').value
        var txtCurrentRutEstudiante = document.getElementById('txtCurrentRutEstudiante').value
        var txtCurrentNombres = document.getElementById('txtCurrentNombres').value
        var txtCurrentApellidos = document.getElementById('txtCurrentApellidos').value
        var txtCurrentObs = document.getElementById('txtCurrentObs').value

        if (operation == 'edit') {
            Estudiantes.UpdateEstudiante(txtCurrentIdEstudiante, txtCurrentRutEstudiante, txtCurrentNombres, txtCurrentApellidos, txtCurrentObs, saveEstudiante_CallBack);
        }
        if (operation == 'new') {
            Estudiantes.InsertEstudiante(txtCurrentRutEstudiante, txtCurrentNombres, txtCurrentApellidos, txtCurrentObs, saveEstudiante_CallBack);
        }
    }
}

function saveEstudiante_CallBack(response) {

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

function refresh_search() {
    operation = 'none';
    var _id_Estudiante = document.getElementById("txtEstudianteId").value;
    var _rut_Estudiante = document.getElementById("txtRut").value;
    var _nombres_Estudiante = document.getElementById("txtNombres").value;
    var _apellidos_Estudiante = document.getElementById("txtApellidos").value;
    var _nombre_apoderado = document.getElementById("txtApoderado").value;
    var _nombre_establecimiento = document.getElementById("txtEstablecimiento").value;
    var _contacto = document.getElementById("txtContacto").value;

    Estudiantes.getEstudiantes(_id_Estudiante, _rut_Estudiante, _nombres_Estudiante, _apellidos_Estudiante, _nombre_apoderado, _nombre_establecimiento, _contacto, getEstudiantes_CallBack);


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

    unlockElements(new Array("txtCurrentRutEstudiante", "txtCurrentNombres", "txtCurrentApellidos", "txtCurrentObs"));
    enableElements(new Array("txtCurrentRutEstudiante", "txtCurrentNombres", "txtCurrentApellidos", "txtCurrentObs"));
    lockElements(new Array("txtCurrentIdEstudiante"));

    document.getElementById('txtCurrentRutEstudiante').focus;

}


function onBtnEditClick() {
    unblockCurrent();
}

function unblockCurrent() {

    var txtCurrentIdEstudiante = document.getElementById('txtCurrentIdEstudiante').value;
    if (trim(txtCurrentIdEstudiante) != '') {

        operation = 'edit';

        unlockElements(new Array("txtCurrentRutEstudiante", "txtCurrentNombres", "txtCurrentApellidos", "txtCurrentObs"));
        enableElements(new Array("txtCurrentRutEstudiante", "txtCurrentNombres", "txtCurrentApellidos", "txtCurrentObs"));

        //---Edit Button Settings---//
        editButtonSettings();
    }
}

function editButtonSettings() {
    enableElements(new Array('btnSave', 'btnCancel'));
    disableElements(new Array('btnEdit'));
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

    var _id_Estudiante = document.getElementById("txtEstudianteId").value;
    var _rut_Estudiante = document.getElementById("txtRut").value;
    var _nombres_Estudiante = document.getElementById("txtNombres").value;
    var _apellidos_Estudiante = document.getElementById("txtApellidos").value;
    var _nombre_apoderado = document.getElementById("txtApoderado").value;
    var _nombre_establecimiento = document.getElementById("txtEstablecimiento").value;
    var _contacto = document.getElementById("txtContacto").value;

    Estudiantes.getEstudiantes(_id_Estudiante, _rut_Estudiante, _nombres_Estudiante, _apellidos_Estudiante, _nombre_apoderado, _nombre_establecimiento, _contacto, getEstudiantes_CallBack);
}

function getEstudiantes_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlEstudiantes = '-1';
        return;
    }
    xmlEstudiantes = response.value;
    if (xmlEstudiantes != '-1') {
        showEstudiantes_SearchResults();
    }
}

function showEstudiantes_SearchResults() {
    var xmlDoc = createDOM(xmlEstudiantes);

    var Estudiantes = xmlDoc.getElementsByTagName("Estudiantes")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Estudiantes.length; j++) {
        var row = fillHTMLRowWithEstudiantesHeader(Estudiantes[j]);
        row.onclick = function () { onSearchResultRowClickEstudiantes(this); }
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

function fillHTMLRowWithEstudiantesHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Id')[0])) {
        td.innerHTML = xmlNode.getElementsByTagName('Id')[0].text;
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

        td.innerHTML = xmlNode.getElementsByTagName('Apellidos')[0].text;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Nombres')[0])) {

        td.innerHTML = xmlNode.getElementsByTagName('Nombres')[0].text;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickEstudiantes(row) {

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
    document.getElementById('txtCurrentIdEstudiante').value = '';
    document.getElementById('txtCurrentRutEstudiante').value = '';
    document.getElementById('txtCurrentNombres').value = '';
    document.getElementById('txtCurrentApellidos').value = '';
    document.getElementById('txtCurrentObs').value = '';
    

}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlEstudiantes);
    var Estudiantes = xmlDoc.documentElement.getElementsByTagName('Estudiante');

    for (var j = 0; j < Estudiantes.length; j++) {
        if (id == Estudiantes[j].selectSingleNode('Id').childNodes[0].nodeValue) {
            return Estudiantes[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentIdEstudiante').value = xmlNode.getElementsByTagName('Id')[0].text; //xmlNode.selectSingleNode("Id").childNodes[0].nodeValue;
        document.getElementById('txtCurrentRutEstudiante').value = xmlNode.getElementsByTagName('Rut')[0].text; //selectSingleNode("Rut").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombres').value = xmlNode.getElementsByTagName('Nombres')[0].text; //selectSingleNode("Nombres").childNodes[0].nodeValue;
        document.getElementById('txtCurrentApellidos').value = xmlNode.getElementsByTagName('Apellidos')[0].text; //selectSingleNode("Apellidos").childNodes[0].nodeValue;
        document.getElementById('txtCurrentObs').value = xmlNode.getElementsByTagName('Observaciones')[0].text; //selectSingleNode("Observaciones").childNodes[0].nodeValue; 

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdEstudiante", "txtCurrentRutEstudiante", "txtCurrentNombres", "txtCurrentApellidos", "txtCurrentObs"));

    disableElement('txtCurrentIdEstudiante');
    disableElement('txtCurrentRutEstudiante');
    disableElement('txtCurrentNombres');
    disableElement('txtCurrentApellidos');
    disableElement('txtCurrentObs');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}

/////////////////////////// NEW ESTUDIANTE POPUP ///////////////////////////////////

var xmlEstudiantesPopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchEstudianteClick() {
    //Progress Bar
    parent.showProgressImg();
    Estudiantes.LoadEstudiantesPopupPage('', '', '', LoadeEstudiantesPopupPage_CallBack);

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
    if (validExistTag(xmlNode.getElementsByTagName('Rut')[0])) {

        if (xmlNode.selectSingleNode('Rut').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Rut').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));


    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Apellido')[0])) {

        if (xmlNode.selectSingleNode('Apellido').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Apellido').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "300px";
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
    if (validExistTag(xmlNode.getElementsByTagName('Id')[0])) {

        if (xmlNode.selectSingleNode('Id').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Id').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "20px";
        td.align = "center";
        td.style.display = "none";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchEstudiantesPopup(row) {
    document.getElementById('txtEstudianteId').value = row.getElementsByTagName('td')[3].innerHTML;
    //document.getElementById('txtCurrentEstudiante').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchEstudiantesPopUpClick() {
    closeModal();
}

///////////////////////////////////////////////