//---------------Variables
var xmlContactos = '0';
var xmlContactoSave = '0';
var tmpContactoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentContacto;

function onFormLoad() {
    onSearchButtonClick();
    disableElements(new Array('btnSave', 'btnCancel'));
}

function onBtnEditClick() {
    unblockCurrent();
}

function unblockCurrent() {

    var txtCurrentIdApoderado = document.getElementById('txtCurrentIdApoderado').value;
    if (trim(txtCurrentIdApoderado) != '') {

        operation = 'edit';

        enableElements(new Array("txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObs"));
        unlockElements(new Array("txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObs"));
        
        //---Edit Button Settings---//
        editButtonSettings();
    }
}

function editButtonSettings() {
    enableElements(new Array('btnSave', 'btnCancel'));
    disableElements(new Array('btnEdit', 'btnSearchNewApoderado'));
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

    var txtApoderado = document.getElementById("txtApoderado").value;
    var txtContacto = document.getElementById("txtContacto").value;
    var txtDireccion = document.getElementById("txtDireccion").value;
    var txtTelefono = document.getElementById("txtTelefono").value;

    ContactosApoderado.getContactosApoderado(txtApoderado, txtContacto, txtDireccion, txtTelefono, getContactosApoderado_CallBack);
}

function getContactosApoderado_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlContactos = '-1';
        return;
    }
    xmlContactos = response.value;
    if (xmlContactos != '-1') {
        showContactos_SearchResults();
    }
}

function showContactos_SearchResults() {
    var xmlDoc = createDOM(xmlContactos);

    var Contactos = xmlDoc.getElementsByTagName("Contactos")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    //t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Contactos.length; j++) {
        var row = fillHTMLRowWithContactosHeader(Contactos[j]);
        row.onclick = function () { onSearchResultRowClickContactos(this); }
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

    //enableElements(new Array('btnNew'));
    //disableElements(new Array('btnEdit', 'btnSave', 'btnCancel', 'btnSearchNewApoderado'));

    showElements(new Array('divResultsTitle', 'divResults'));
}

function fillHTMLRowWithContactosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    td.style.display = 'none';
    if (validExistTag(xmlNode.getElementsByTagName('IdApoderado')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdApoderado').childNodes[0].nodeValue;
    }
    tr.appendChild(td.cloneNode(true));

    //Nombre
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('NombreCompletoAP')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('NombreCompletoAP').childNodes[0].nodeValue;
        td.width = "250px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    var td = document.createElement('td');
    td.style.display = 'none';
    if (validExistTag(xmlNode.getElementsByTagName('IdContacto')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdContacto').childNodes[0].nodeValue;
    }
    tr.appendChild(td.cloneNode(true));

    //Direccion
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Direccion1')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Direccion1').childNodes[0].nodeValue;
        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Direccion2
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Direccion2')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Direccion2').childNodes[0].nodeValue;
        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Telefono
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Telefono1')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Telefono1').childNodes[0].nodeValue;
        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Telefono
    var td = document.createElement('td');
    td.innerHTML = xmlNode.selectSingleNode('Telefono2').childNodes[0] != null? xmlNode.selectSingleNode('Telefono2').childNodes[0].nodeValue:'';
    td.width = "100px";
    td.align = "center";

    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickContactos(row) {

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
    document.getElementById('txtCurrentNombreApoderado').value = '';
    document.getElementById('txtCurrentDireccion1').value = '';
    document.getElementById('txtCurrentDireccion2').value = '';
    document.getElementById('txtCurrentTelefono1').value = '';
    document.getElementById('txtCurrentTelefono2').value = '';
    document.getElementById('txtCurrentEmail').value = '';
    document.getElementById('txtCurrentObs').value = '';

}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlContactos);
    var Contactos = xmlDoc.documentElement.getElementsByTagName('Contacto');

    for (var j = 0; j < Contactos.length; j++) {
        if (id == Contactos[j].selectSingleNode('IdApoderado').childNodes[0].nodeValue) {
            return Contactos[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentIdApoderado').value = xmlNode.selectSingleNode("IdApoderado").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombreApoderado').value = xmlNode.selectSingleNode("NombreCompletoAP").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDireccion1').value = xmlNode.selectSingleNode("Direccion1").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDireccion2').value = xmlNode.selectSingleNode("Direccion2").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTelefono1').value = xmlNode.selectSingleNode("Telefono1").childNodes[0].nodeValue;
        //xmlNode.selectSingleNode("TieneContrato").childNodes[0].nodeValue == 'S' ? document.getElementById('chkCurrentTieneContrato').checked = 'checked' : document.getElementById('chkCurrentTieneContrato').checked = '';
        xmlNode.selectSingleNode("Telefono2").childNodes[0] != null ? document.getElementById('txtCurrentTelefono2').value = xmlNode.selectSingleNode("Telefono2").childNodes[0].nodeValue : '';
        //document.getElementById('txtCurrentTelefono2').value = xmlNode.selectSingleNode("Telefono2").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEmail').value = xmlNode.selectSingleNode("Email").childNodes[0].nodeValue;
        document.getElementById('txtCurrentObs').value = xmlNode.selectSingleNode("Comentarios").childNodes[0] != null?xmlNode.selectSingleNode("Comentarios").childNodes[0].nodeValue:'';

        blockCurrent();
    }
}

function onBtnCancelClick() {
    blockCurrent();    
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdApoderado", "txtCurrentNombreApoderado", "txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObs"));

    disableElement('txtCurrentIdApoderado');
    disableElement('txtCurrentNombreApoderado');
    disableElement('txtCurrentDireccion1');
    disableElement('txtCurrentDireccion2');
    disableElement('txtCurrentTelefono1');
    disableElement('txtCurrentTelefono2');
    disableElement('txtCurrentEmail');
    disableElement('txtCurrentObs');

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

    resetCurrentPanel();

    enableElement('btnSave');
    enableElement('btnCancel');
    
    disableElement('btnEdit');
    disableElement('btnNew');

    unlockElements(new Array("txtCurrentNombreApoderado", "txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObs"));
    enableElements(new Array("txtCurrentNombreApoderado", "txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObs"));
    enableElement('btnSearchNewApoderado');

    document.getElementById('txtCurrentIdApoderado').focus;

}


/////////////////////////// NEW APODERADO POPUP ///////////////////////////////////

var xmlUsuariosPopup = '0';
var NewUsuariosPagePopup = 1;

var xmlEstudiantePopup = '0';
var NewEstudiantePagePopup = 1;

function onSearchNewApoderadoClick() {
    //Progress Bar
    parent.showProgressImg();
    ContactosApoderado.LoadApoderadosPopupPage('', '', '', LoadApoderadosPopupPage_CallBack);

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
    document.getElementById('txtCurrentNombreApoderado').value = row.getElementsByTagName('td')[2].innerHTML;
    closeModal();
}

function onBtnCloseSearchManufacturersPopUpClick() {
    closeModal();
}

///////////////////////////////////////////////
////////////////////////SAVE///////////////

var xmlValidSearchManufacturer = '0';

function onTxtManufacturerCodeKeyUp(e) {
    //e.value = e.value.toUpperCase();
    if (trim(e.value) == '') {
        document.getElementById('txtManufacturerName').value = '';
    }
}

function onTxtManufacturerCodeChange(object) {

    object.value = object.value.toUpperCase();
    if (trim(object.value) == '') {
        return;
    }
    //Progress Bar
    parent.showProgressImg();

    Manufacturer.LoadMakers(object.value, getValidSearchManufacturer_CallBack); ;
}

function getValidSearchManufacturer_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlValidSearchManufacturer = '-1';
        return;
    }
    xmlValidSearchManufacturer = response.value;

    if (xmlValidSearchManufacturer != '-1') {
        showValidSearchManufacturer_Results();
    }
}

function showValidSearchManufacturer_Results() {

    var xmlDoc = createDOM(xmlValidSearchManufacturer);
    var SearchManufacturers = xmlDoc.documentElement.getElementsByTagName('Maker');
    if (SearchManufacturers.length == 0) {
        parent.showMsgBoxAdv('Manufacturer not found.');

        document.getElementById('txtManufacturerCode').value = '';
        document.getElementById('txtManufacturerName').value = '';
        return;
    }
    if (SearchManufacturers.length > 0) {
        document.getElementById('txtManufacturerCode').value = SearchManufacturers[0].selectSingleNode('Id').childNodes[0].nodeValue;
        document.getElementById('txtManufacturerName').value = SearchManufacturers[0].selectSingleNode('Description').childNodes[0].nodeValue;
        return;
    }
}

////-----------------------------New Button Click
//function onNewButtonClick() {
//    operation = 'new';

//    document.getElementById("divCurrentTitle").style.display = 'block';
//    document.getElementById("divCurrentDetail").style.display = 'block';
//    hideElements(new Array('divResultsTitle', 'divResults'));

//    //showPanels();
//    if (document.getElementById('divCurrentDetail').clientHeight < 1) CollapseDivCurrentDetail();
//    if (document.getElementById('divSearchDetail').clientHeight > 1) CollapseDivSearchDetail();

//    enableElement('btnSave');
//    enableElement('btnCancel');

//    //enableElement('chkCurrentActive');

//    disableElement('btnEdit');
//    disableElement('btnNew');

//    resetCurrentPanel();

//    //unlockElements(new Array("txtCurrentRutApoderado", "txtCurrentNombresApoderado", "txtCurrentApellidosApoderado", "chkCurrentTieneContrato"));

//    //    unlockElements(new Array("txtCurrentManufacturerDescription", "chkCurrentActive"));
//    //    enableElements(new Array("chkCurrentActive"));
//    document.getElementById('txtCurrentIdApoderado').focus;

//}


function onBtnSaveClick() {

    if (true) {

        //Progress Bar
        parent.showProgressImg();

        //        xmlManufacturerSave = buildXmlManufacturer();

        //        var xmlManufacturerSaveResult = createDOM(xmlManufacturerSave.outerHTML);

        var txtCodigoAp = document.getElementById('txtCurrentIdApoderado').value
        var txtCurrentDireccion1 = document.getElementById('txtCurrentDireccion1').value
        var txtCurrentDireccion2 = document.getElementById('txtCurrentDireccion2').value
        var txtCurrentTelefono1 = document.getElementById('txtCurrentTelefono1').value
        var txtCurrentTelefono2 = document.getElementById('txtCurrentTelefono2').value
        var txtCurrentEmail = document.getElementById('txtCurrentEmail').value
        var txtCurrentObs = document.getElementById('txtCurrentObs').value


        if (operation == 'edit') {
            
            ContactosApoderado.UpdateContactosApoderado(txtCodigoAp, txtCurrentDireccion1, txtCurrentDireccion2, txtCurrentTelefono1, txtCurrentTelefono2, txtCurrentEmail, txtCurrentObs, saveContactosApoderado_CallBack);
        }
        if (operation == 'new') {
            ContactosApoderado.InsertContactosApoderado(txtCodigoAp, txtCurrentDireccion1, txtCurrentDireccion2, txtCurrentTelefono1, txtCurrentTelefono2, txtCurrentEmail, txtCurrentObs, saveContactosApoderado_CallBack);
        }
    }
}

function saveContactosApoderado_CallBack(response) {

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