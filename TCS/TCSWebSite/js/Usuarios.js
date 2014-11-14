//---------------Variables
var xmlUsuarios = '0';
var xmlUsuarioSave = '0';
var tmpUserId = '';
var order = 'ASC';
var column = 'codigo_usuario';
var lastClickedRow = '-1';
var operation = '-1'
var currentUsuario;

function onTxtSearchUsuarioFilterKeyUp(e) {
    e.value = e.value.toUpperCase();
    var xml = filterXML(parent.xmlUsuariosPopup, 'Codigo', e.value, true);

    var xmlDoc = createDOM(xml);
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('TcsUser');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchUsuariosPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithSearchUsuariosPopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchUsuariosPopup(this);');

    parent.document.getElementById('divSearchUsuariosPopUpSearchResults').innerHTML = t.outerHTML;
}

function onTxtSearchNombreFilterKeyUp(e) {
    e.value = e.value.toUpperCase();
    var xml = filterXML(parent.xmlUsuariosPopup, 'Nombre', e.value, true);

    var xmlDoc = createDOM(xml);
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('TcsUser');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchUsuariosPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithSearchUsuariosPopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchUsuariosPopup(this);');

    parent.document.getElementById('divSearchUsuariosPopUpSearchResults').innerHTML = t.outerHTML;
}

function search() {

    //Progress Bar
    parent.showProgressImg();

    operation = 'none';

    var strUsuario = document.getElementById("txtUsuarioFilter").value;
    var strNombre = document.getElementById("txtNombreFilter").value;

    Usuarios.getUsuarios(strUsuario, strNombre, getUsuarios_CallBack);
}

function getUsuarios_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlUsuarios = '-1';
        return;
    }
    xmlUsuarios = response.value;
    if (xmlUsuarios != '-1') {
        showUsuarios_SearchResults();
    }
}

function showUsuarios_SearchResults() {
    var xmlDoc = createDOM(xmlUsuarios);

    var Usuarios = xmlDoc.getElementsByTagName("Usuarios")[0].childNodes;
    //var Templates = xmlDoc.documentElement.getElementsByTagName('Template');

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Usuarios.length; j++) {
        var row = fillHTMLRowWithUsuariosHeader(Usuarios[j]);
        row.onclick = function () { onSearchResultRowClickUsuarios(this); }
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

function fillHTMLRowWithUsuariosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Codigo')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('Codigo').childNodes[0].nodeValue;
        td.width = "90px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Nombre
    if (validExistTag(xmlNode.getElementsByTagName('Nombre')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Nombre').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Perfil
    if (validExistTag(xmlNode.getElementsByTagName('Perfil')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Perfil').childNodes[0].nodeValue;
        td.width = "60px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Activo
    if (validExistTag(xmlNode.getElementsByTagName('Activo')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Activo').childNodes[0].nodeValue;
        td.width = "60px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickUsuarios(row) {

    enableElements(new Array('btnEdit', 'btnNew'));
    disableElements(new Array('btnSave', 'btnCancel'));

    HighLightTR(row, '#5b5a5a', 'cc3333');

    if (document.getElementById('divSearchDetail').clientHeight > 0) {
        CollapseDivSearchDetail();
    }

    //document.getElementById('lblCurrentTitle').innerText = "Current Manufacturer";

    resetCurrentPanel(); //Restore All values in Current Spare Div

    showCurrentPanel(); //Show Current Spare Div with Data charged from DB

    var xmlNode = getCurrentNode(row.getElementsByTagName('td')[0].innerHTML);

    displayCurrent(xmlNode);
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlUsuarios);
    var Usuarios = xmlDoc.documentElement.getElementsByTagName('Usuario');

    for (var j = 0; j < Usuarios.length; j++) {
        if (id == Usuarios[j].selectSingleNode('Codigo').childNodes[0].nodeValue) {
            return Usuarios[j];
        }
    }
    return null;
}


function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        document.getElementById('txtCurrentCodigoUsuario').value = xmlNode.selectSingleNode("Codigo").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombreUsuario').value = xmlNode.selectSingleNode("Nombre").childNodes[0].nodeValue;
        document.getElementById('txtCurrentPassword').value = xmlNode.selectSingleNode("Password").childNodes[0].nodeValue;
        document.getElementById('txtCurrentFechaValidez').value = xmlNode.selectSingleNode("FechaValidez").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEmail').value = xmlNode.selectSingleNode("Email").childNodes[0].nodeValue;
        document.getElementById('chkCurrentActivo').checked = 'checked';
        document.getElementById('chkCurrentCaduca').checked = '';

        blockCurrent();
    }
}

function resetCurrentPanel() {
    document.getElementById('txtCurrentCodigoUsuario').value = '';
    document.getElementById('txtCurrentNombreUsuario').value = '';
    document.getElementById('chkCurrentActivo').checked = '';
    document.getElementById('txtCurrentPassword').value = '';
    document.getElementById('chkCurrentCaduca').checked = '';
    document.getElementById('txtCurrentFechaValidez').value = '';
    document.getElementById('txtCurrentEmail').value = '';
}

function blockCurrent() {
    lockElements(new Array("txtCurrentCodigoUsuario", "txtCurrentNombreUsuario", "chkCurrentActivo", "txtCurrentPassword", "chkCurrentCaduca", "txtCurrentEmail", "txtCurrentFechaValidez"));
    disableElement('txtCurrentCodigoUsuario');
    disableElement('txtCurrentEmail');
    disableElement('txtCurrentNombreUsuario');
    disableElement('txtCurrentPassword');
    disableElement('ddlCurrentPerfil');
    disableElement('chkCurrentActivo');
    disableElement('chkCurrentCaduca');
    disableElement('txtCurrentFechaValidez');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}

//*********************
var preEl;
var orgBColor;
var orgTColor;
function HighLightTR(el, backColor, textColor) {
    if (typeof (preEl) != 'undefined') {
        preEl.bgColor = orgBColor;
        try { ChangeTextColor(preEl, orgTColor); } catch (e) { ; }
    }
    orgBColor = el.bgColor;
    orgTColor = el.style.color;
    el.bgColor = backColor;

    try { ChangeTextColor(el, textColor); } catch (e) { ; }
    preEl = el;
}


function ChangeTextColor(a_obj, a_color) {

    for (i = 0; i < a_obj.cells.length; i++)
        a_obj.cells(i).style.color = a_color;
}
//**********************



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

/////////////////////////// USUARIOS POPUP ///////////////////////////////////

var xmlUsuariosPopup = '0';
var NewUsuariosPagePopup = 1;


function onBtnShowSearchUsuariosPopupClick() {
    //Progress Bar
    parent.showProgressImg();
    Usuarios.LoadUsuariosPopupPage('', '', LoadUsuariosPopupPage_CallBack);

}

function LoadUsuariosPopupPage_CallBack(response) {
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
    var SearchUsuarios = xmlDoc.documentElement.getElementsByTagName('TcsUser');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchUsuariosPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchUsuarios.length; j++) {
        var row = fillHTMLRowWithSearchUsuariosPopupHeader(SearchUsuarios[j]);
        body.appendChild(row);
    }
    t.appendChild(body);
    
    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchUsuariosPopup(this);');

    document.getElementById('divSearchUsuariosPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divSearchUsuariosPopup');

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
    if (validExistTag(xmlNode.getElementsByTagName('Codigo')[0])) {

        if (xmlNode.selectSingleNode('Codigo').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Codigo').childNodes[0].nodeValue;
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

        td.width = "329px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchUsuariosPopup(row) {
    document.getElementById('txtUsuarioFilter').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtNombreFilter').value = row.getElementsByTagName('td')[1].innerHTML;
    closeModal();
}

function onBtnCloseSearchManufacturersPopUpClick() {
    closeModal();
}

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
