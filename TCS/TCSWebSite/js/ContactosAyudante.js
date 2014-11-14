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

    var txtAyudante = document.getElementById("txtAyudante").value;
    var txtContacto = document.getElementById("txtContacto").value;
    var txtDireccion = document.getElementById("txtDireccion").value;
    var txtTelefono = document.getElementById("txtTelefono").value;

    ContactosAyudante.getContactosAyudante(txtAyudante, txtContacto, txtDireccion, txtTelefono, getContactosAyudante_CallBack);
}

function getContactosAyudante_CallBack(response) {
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
    t.width = '700px';

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

    for (var i = 0; i < t.rows[0].cells.length; i++) {

        var ancho = new String(t.rows[0].cells[i].width + "px");
        document.getElementById('thResultsFixedHead').rows[0].cells[i].style.width = ancho;
    }

    enableElements(new Array('btnNew'));
    disableElements(new Array('btnEdit', 'btnSave', 'btnCancel'));

    showElements(new Array('divResultsTitle', 'divResults'));
}

function fillHTMLRowWithContactosHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('IdAyudante')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('IdAyudante').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Nombre
    if (validExistTag(xmlNode.getElementsByTagName('Ayudante')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Ayudante').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('IdContacto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('IdContacto').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Direccion
    if (validExistTag(xmlNode.getElementsByTagName('Direccion1')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Direccion1').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Telefono
    if (validExistTag(xmlNode.getElementsByTagName('Telefono1')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Telefono1').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
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
    document.getElementById('txtCurrentIdAyudante').value = '';
    document.getElementById('txtCurrentAyudante').value = '';
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
        if (id == Contactos[j].selectSingleNode('IdAyudante').childNodes[0].nodeValue) {
            return Contactos[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentIdAyudante').value = xmlNode.selectSingleNode("IdAyudante").childNodes[0].nodeValue;
        document.getElementById('txtCurrentAyudante').value = xmlNode.selectSingleNode("Ayudante").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDireccion1').value = xmlNode.selectSingleNode("Direccion1").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDireccion2').value = xmlNode.selectSingleNode("Direccion2").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTelefono1').value = xmlNode.selectSingleNode("Telefono1").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTelefono2').value = xmlNode.selectSingleNode("Telefono2").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEmail').value = xmlNode.selectSingleNode("Email").childNodes[0].nodeValue;
        document.getElementById('txtCurrentObs').value = xmlNode.selectSingleNode("Comentarios").childNodes[0].nodeValue;

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdAyudante", "txtCurrentAyudante", "txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObs"));

    disableElement('txtCurrentIdAyudante');
    disableElement('txtCurrentAyudante');
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
