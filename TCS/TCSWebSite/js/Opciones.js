//---------------Variables
var xmlOpciones = '0';
var xmlOpcionSave = '0';
var tmpOpcionId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentOpcion;

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
    clearElements(new Array('txtCodigoOpcionFilter', 'txtNombreOpcionFilter'));
    showElements(new Array('divSearchTitle', 'divScreenToolBar'));
}

function search() {

    //Progress Bar
    parent.showProgressImg();

    operation = 'none';

    var strCodigo = document.getElementById("txtCodigoOpcionFilter").value;
    var strNombre = document.getElementById("txtNombreOpcionFilter").value;

    Opciones.getOpciones(strCodigo, strNombre, getOpciones_CallBack);
}

function getOpciones_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlOpciones = '-1';
        return;
    }
    xmlOpciones = response.value;
    if (xmlOpciones != '-1') {
        showOpciones_SearchResults();
    }
}

function showOpciones_SearchResults() {
    var xmlDoc = createDOM(xmlOpciones);

    var Opciones = xmlDoc.getElementsByTagName("Opciones")[0].childNodes;

    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Opciones.length; j++) {
        var row = fillHTMLRowWithOpcionesHeader(Opciones[j]);
        row.onclick = function () { onSearchResultRowClickOpciones(this); }
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

function fillHTMLRowWithOpcionesHeader(xmlNode) {
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

    //Url
    if (validExistTag(xmlNode.getElementsByTagName('Url')[0])) {

        td.innerHTML = xmlNode.selectSingleNode('Url').childNodes[0].nodeValue;
        td.width = "150px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickOpciones(row) {

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
    document.getElementById('txtCurrentCodigoOpcion').value = '';
    document.getElementById('txtCurrentNombreOpcion').value = '';
    document.getElementById('txtCurrentUrl').value = '';
    document.getElementById('chkCurrentActivo').checked = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlOpciones);
    var Opciones = xmlDoc.documentElement.getElementsByTagName('Opcion');

    for (var j = 0; j < Opciones.length; j++) {
        if (id == Opciones[j].selectSingleNode('Codigo').childNodes[0].nodeValue) {
            return Opciones[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        document.getElementById('txtCurrentCodigoOpcion').value = xmlNode.selectSingleNode("Codigo").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombreOpcion').value = xmlNode.selectSingleNode("Nombre").childNodes[0].nodeValue;
        document.getElementById('txtCurrentUrl').value = xmlNode.selectSingleNode("Url").childNodes[0].nodeValue;
        document.getElementById('chkCurrentActivo').checked = 'checked';

        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentCodigoOpcion", "txtCurrentNombreOpcion", "txtCurrentUrl", "chkCurrentActivo"));

    disableElement('txtCurrentCodigoOpcion');
    disableElement('txtCurrentNombreOpcion');
    disableElement('txtCurrentUrl');
    disableElement('chkCurrentActivo');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}

/////////////////////////// PERFILES SEARCH POPUP ///////////////////////////////////

var xmlOpcionesPopup = '0';
var NewOpcionesPagePopup = 1;


function onBtnShowSearchOpcionesPopupClick() {
    //Progress Bar
    parent.showProgressImg();
    Opciones.LoadOpcionesPopupPage('', '', LoadOpcionesPopupPage_CallBack);

}

function LoadOpcionesPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlOpcionesPopup = '-1';
        return;
    }
    parent.xmlOpcionesPopup = response.value;

    if (parent.xmlOpcionesPopup != '-1') {
        showSearchOpcionesPopup_Results();
    }
}

function showSearchOpcionesPopup_Results() {

    var xmlDoc = createDOM(parent.xmlOpcionesPopup);
    var SearchOpciones = xmlDoc.documentElement.getElementsByTagName('Opcion');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchOpcionesPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchOpciones.length; j++) {
        var row = fillHTMLRowWithSearchOpcionesPopupHeader(SearchOpciones[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchOpcionesPopup(this);');

    document.getElementById('divSearchOpcionesPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divSearchOpcionesPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithSearchOpcionesPopupHeader(xmlNode) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Codigo')[0])) {

        if (xmlNode.selectSingleNode('Codigo').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Codigo').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "150px";
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

        td.width = "190px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Url')[0])) {

        if (xmlNode.selectSingleNode('Url').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Url').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "190px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchOpcionesPopup(row) {
    document.getElementById('txtCodigoOpcionFilter').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtNombreOpcionFilter').value = row.getElementsByTagName('td')[1].innerHTML;
    closeModal();
}

function onBtnCloseSearchPopUpClick() {
    closeModal();
}

function onTxtCodigoFilterPopupKeyUp(e) {
    e.value = e.value.toUpperCase();
    var xml = filterXML(parent.xmlOpcionesPopup, 'Codigo', e.value, true);

    var xmlDoc = createDOM(xml);
    var SearchOpciones = xmlDoc.documentElement.getElementsByTagName('Opcion');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchOpcionesPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchOpciones.length; j++) {
        var row = fillHTMLRowWithSearchOpcionesPopupHeader(SearchOpciones[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchOpcionesPopup(this);');

    parent.document.getElementById('divSearchOpcionesPopUpSearchResults').innerHTML = t.outerHTML;
}

function onTxtNombreFilterPopupKeyUp(e) {
    e.value = e.value.toUpperCase();
    var xml = filterXML(parent.xmlOpcionesPopup, 'Nombre', e.value, true);

    var xmlDoc = createDOM(xml);
    var SearchOpciones = xmlDoc.documentElement.getElementsByTagName('Opcion');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchOpcionesPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchOpciones.length; j++) {
        var row = fillHTMLRowWithSearchOpcionesPopupHeader(SearchOpciones[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchOpcionesPopup(this);');

    parent.document.getElementById('divSearchOpcionesPopUpSearchResults').innerHTML = t.outerHTML;
}