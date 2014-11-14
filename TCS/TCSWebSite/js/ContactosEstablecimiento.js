//---------------Variables
var xmlContactosEstablecimiento = '0';
var xmlContactoEstablecimientoSave = '0';
var tmpContactoEstablecimientoId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentContactoEstablecimiento;

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

    var txtEstablecimiento = document.getElementById("txtEstablecimiento").value;
    var txtContacto = document.getElementById("txtContacto").value;
    var txtDireccion = document.getElementById("txtDireccion").value;
    var txtTelefono = document.getElementById("txtTelefono").value;

    ContactosEstablecimiento.getContactosEstablecimiento(txtEstablecimiento, txtContacto, txtDireccion, txtTelefono, getContactosEstablecimiento_CallBack);
}

function getContactosEstablecimiento_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlContactosEstablecimiento = '-1';
        return;
    }
    xmlContactosEstablecimiento = response.value;
    if (xmlContactosEstablecimiento != '-1') {
        showContactosEstablecimiento_SearchResults();
    }
}

function showContactosEstablecimiento_SearchResults() {
    var xmlDoc = createDOM(xmlContactosEstablecimiento);

    var ContactosEstablecimiento = xmlDoc.getElementsByTagName("ContactosEstablecimiento")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < ContactosEstablecimiento.length; j++) {
        var row = fillHTMLRowWithContactosEstablecimientoHeader(ContactosEstablecimiento[j]);
        row.onclick = function () { onSearchResultRowClickContactosEstablecimiento(this); }
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

function fillHTMLRowWithContactosEstablecimientoHeader(xmlNode) {
    var tr = document.createElement('tr');

    // Codigo
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('id_establecimiento')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('id_establecimiento').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    // Ruta
    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('establecimiento')[0])) {
        td.innerHTML = xmlNode.selectSingleNode('establecimiento').childNodes[0].nodeValue;
        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //DescripcionContactoEstablecimiento
    if (validExistTag(xmlNode.getElementsByTagName('id_contacto')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('id_contacto').childNodes[0].nodeValue;
        td.width = "50px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('direccion_1')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('direccion_1').childNodes[0].nodeValue;
        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('telefono_1')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('telefono_1').childNodes[0].nodeValue;
        td.width = "100px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickContactosEstablecimiento(row) {

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
    document.getElementById('txtCurrentIdEstablecimiento').value = '';
    document.getElementById('txtCurrentEstablecimiento').value = '';
    document.getElementById('txtCurrentDireccion1').value = '';
    document.getElementById('txtCurrentDireccion2').value = '';
    document.getElementById('txtCurrentTelefono1').value = '';
    document.getElementById('txtCurrentTelefono2').value = '';
    document.getElementById('txtCurrentEmail').value = '';
    document.getElementById('txtCurrentObservaciones').value = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(establecimiento, contacto) {
    var xmlDoc = createDOM(xmlContactosEstablecimiento);
    var ContactosEstablecimiento = xmlDoc.documentElement.getElementsByTagName('ContactoEstablecimiento');

    for (var j = 0; j < ContactosEstablecimiento.length; j++) {

        if ((establecimiento == ContactosEstablecimiento[j].selectSingleNode('id_establecimiento').childNodes[0].nodeValue) && (contacto == ContactosEstablecimiento[j].selectSingleNode('id_contacto').childNodes[0].nodeValue)) {
            return ContactosEstablecimiento[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {

        document.getElementById('txtCurrentIdEstablecimiento').value = xmlNode.selectSingleNode("id_establecimiento").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEstablecimiento').value = xmlNode.selectSingleNode("establecimiento").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDireccion1').value = xmlNode.selectSingleNode("direccion_1").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDireccion2').value = xmlNode.selectSingleNode("direccion_2").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTelefono1').value = xmlNode.selectSingleNode("telefono_1").childNodes[0].nodeValue;
        document.getElementById('txtCurrentTelefono2').value = xmlNode.selectSingleNode("telefono_2").childNodes[0].nodeValue;
        document.getElementById('txtCurrentEmail').value = xmlNode.selectSingleNode("email").childNodes[0].nodeValue;
        document.getElementById('txtCurrentObservaciones').value = xmlNode.selectSingleNode("observaciones").childNodes[0].nodeValue;


        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentIdEstablecimiento", "txtCurrentEstablecimiento", "txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObservaciones"));
    disableElements(new Array("txtCurrentIdEstablecimiento", "txtCurrentEstablecimiento", "txtCurrentDireccion1", "txtCurrentDireccion2", "txtCurrentTelefono1", "txtCurrentTelefono2", "txtCurrentEmail", "txtCurrentObservaciones"));

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}