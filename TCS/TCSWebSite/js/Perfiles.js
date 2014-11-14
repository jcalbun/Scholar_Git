//---------------Variables
var xmlPerfiles = '0';
var xmlPerfilSave = '0';
var tmpPerfilId = '';
var order = 'ASC';
var column = 'codigo';
var lastClickedRow = '-1';
var operation = '-1'
var currentPerfil;

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
    clearElements(new Array('txtCodigoFilter', 'txtNombreFilter'));
    showElements(new Array('divSearchTitle', 'divScreenToolBar'));
}

function search() {

    //Progress Bar
    parent.showProgressImg();

    operation = 'none';

    var strCodigo = document.getElementById("txtCodigoFilter").value;
    var strNombre = document.getElementById("txtNombreFilter").value;

    Perfiles.getPerfiles(strCodigo, strNombre, getPerfiles_CallBack);
}

function getPerfiles_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        xmlPerfiles = '-1';
        return;
    }
    xmlPerfiles = response.value;
    if (xmlPerfiles != '-1') {
        showPerfiles_SearchResults();
    }
}

function showPerfiles_SearchResults() {
    var xmlDoc = createDOM(xmlPerfiles);

    var Perfiles = xmlDoc.getElementsByTagName("Perfiles")[0].childNodes;
    
    var t = document.createElement('table');
    t.className = 'GridTable';
    t.id = 'tblResults';
    t.width = '700px';

    var body = document.createElement('tbody');
    for (var j = 0; j < Perfiles.length; j++) {
        var row = fillHTMLRowWithPerfilesHeader(Perfiles[j]);
        row.onclick = function () { onSearchResultRowClickPerfiles(this); }
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


function fillHTMLRowWithPerfilesHeader(xmlNode) {
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

    return tr;
}

function onSearchResultRowClickPerfiles(row) {

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
    document.getElementById('txtCurrentCodigo').value = '';
    document.getElementById('txtCurrentNombre').value = '';
    document.getElementById('txtCurrentDescripcion').value = '';
    document.getElementById('chkCurrentActivo').checked = '';
}

function showCurrentPanel() {
    showElements(new Array('divCurrentTitle', 'divCurrentDetail'));
}

function getCurrentNode(id) {
    var xmlDoc = createDOM(xmlPerfiles);
    var Perfiles = xmlDoc.documentElement.getElementsByTagName('Perfil');

    for (var j = 0; j < Perfiles.length; j++) {
        if (id == Perfiles[j].selectSingleNode('Codigo').childNodes[0].nodeValue) {
            return Perfiles[j];
        }
    }
    return null;
}

function displayCurrent(xmlNode) {
    if (xmlNode != null) {
        document.getElementById('txtCurrentCodigo').value = xmlNode.selectSingleNode("Codigo").childNodes[0].nodeValue;
        document.getElementById('txtCurrentNombre').value = xmlNode.selectSingleNode("Nombre").childNodes[0].nodeValue;
        document.getElementById('txtCurrentDescripcion').value = xmlNode.selectSingleNode("Nombre").childNodes[0].nodeValue;
        document.getElementById('chkCurrentActivo').checked = 'checked';
        
        blockCurrent();
    }
}

function blockCurrent() {
    lockElements(new Array("txtCurrentCodigo", "txtCurrentNombre", "txtCurrentDescripcion", "chkCurrentActivo"));

    disableElement('txtCurrentCodigo');
    disableElement('txtCurrentNombre');
    disableElement('txtCurrentDescripcion');
    disableElement('chkCurrentActivo');

    disableElement('btnSave');
    disableElement('btnCancel');
    enableElement('btnEdit');
}

/////////////////////////// PERFILES SEARCH POPUP ///////////////////////////////////

var xmlPerfilesPopup = '0';
var NewPerfilesPagePopup = 1;


function onBtnShowSearchPerfilesPopupClick() {
    //Progress Bar
    parent.showProgressImg();
    Perfiles.LoadPerfilesPopupPage('', '', LoadPerfilesPopupPage_CallBack);

}

function LoadPerfilesPopupPage_CallBack(response) {
    // close Progress Bar
    parent.closeProgressImg();

    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        parent.xmlPerfilesPopup = '-1';
        return;
    }
    parent.xmlPerfilesPopup = response.value;

    if (parent.xmlPerfilesPopup != '-1') {
        showSearchPerfilesPopup_Results();
    }
}

function showSearchPerfilesPopup_Results() {

    var xmlDoc = createDOM(parent.xmlPerfilesPopup);
    var SearchPerfiles = xmlDoc.documentElement.getElementsByTagName('Perfil');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchPerfilesPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchPerfiles.length; j++) {
        var row = fillHTMLRowWithSearchPerfilesPopupHeader(SearchPerfiles[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchPerfilesPopup(this);');

    document.getElementById('divSearchPerfilesPopUpSearchResults').innerHTML = t.outerHTML;
    var e = document.getElementById('divSearchPerfilesPopup');

    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function fillHTMLRowWithSearchPerfilesPopupHeader(xmlNode) {
    var tr = document.createElement('tr');

    var td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Codigo')[0])) {

        if (xmlNode.selectSingleNode('Codigo').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Codigo').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "130px";
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

        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    td = document.createElement('td');
    if (validExistTag(xmlNode.getElementsByTagName('Descripcion')[0])) {

        if (xmlNode.selectSingleNode('Descripcion').childNodes[0] != null) {
            td.innerHTML = xmlNode.selectSingleNode('Descripcion').childNodes[0].nodeValue;
        }
        else {
            td.innerHTML = '';
        }

        td.width = "200px";
        td.align = "center";
    }
    tr.appendChild(td.cloneNode(true));

    return tr;
}

function onSearchResultRowClickSearchPerfilesPopup(row) {
    document.getElementById('txtCodigoFilter').value = row.getElementsByTagName('td')[0].innerHTML;
    document.getElementById('txtNombreFilter').value = row.getElementsByTagName('td')[1].innerHTML;
    closeModal();
}

function onBtnCloseSearchPopUpClick() {
    closeModal();
}

function onTxtCodigoFilterPopupKeyUp(e) {
    e.value = e.value.toUpperCase();
    var xml = filterXML(parent.xmlPerfilesPopup, 'Codigo', e.value, true);

    var xmlDoc = createDOM(xml);
    var SearchPerfiles = xmlDoc.documentElement.getElementsByTagName('Perfil');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchPerfilesPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchPerfiles.length; j++) {
        var row = fillHTMLRowWithSearchPerfilesPopupHeader(SearchPerfiles[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchPerfilesPopup(this);');

    parent.document.getElementById('divSearchPerfilesPopUpSearchResults').innerHTML = t.outerHTML;
}

function onTxtNombreFilterPopupKeyUp(e) {
    e.value = e.value.toUpperCase();
    var xml = filterXML(parent.xmlPerfilesPopup, 'Nombre', e.value, true);

    var xmlDoc = createDOM(xml);
    var SearchPerfiles = xmlDoc.documentElement.getElementsByTagName('Perfil');
    var t = document.createElement('table');
    t.className = 'GridTable';
    var th = document.getElementById('thSearchPerfilesPopupTableHeader').cloneNode(true);
    t.appendChild(th);
    var body = document.createElement('tbody');
    for (var j = 0; j < SearchPerfiles.length; j++) {
        var row = fillHTMLRowWithSearchPerfilesPopupHeader(SearchPerfiles[j]);
        body.appendChild(row);
    }
    t.appendChild(body);

    t = addOnClickFunctionToTableRowsPopup(t, 'window.frames.iframeContent.onSearchResultRowClickSearchPerfilesPopup(this);');

    parent.document.getElementById('divSearchPerfilesPopUpSearchResults').innerHTML = t.outerHTML;
}
