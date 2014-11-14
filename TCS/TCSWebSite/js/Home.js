//---------------Variables

var _xmlOptions       = '0';
var _userId           = '';
var _pwd = '';
var _firstLogin = '';
var _userName = '';
var _perfil = '';
var _applicationId    = 'TCS';
var _applicationName  = 'Sistema de Transporte Escolar';
var _applicationTitle = 'STE - ' + _applicationName;
var _copyright        = 'Copyright 2014 - Todos los derechos reservados.'
var _version = '';
var _TimeIntervalActivityCheck = 1200000;
var _logOffTimer = 0;


function showBlur(ev) {
    // Use timeout to delay examination of activeElement until after blur/focus 
    // events have been processed.
    setTimeout(function() {
        var target = document.activeElement;
        document.getElementById("focused").value =
      target ? target.id || target.tagName || target : '';
    }, 3000);
}



function onPageLoad() {
    document.getElementById('divMenuSideBar').style.height = 600;
    document.getElementById('iframeContent').style.height = 500;
}

function LogIn() {

    showProgressImg();
    Home.LogIn(_userId, _pwd, _applicationId, LogIn_CallBack);

}

function LogIn_CallBack(response) {
    
    closeProgressImg();
    if(response.error != null)
    {
        path = null;
        return;
    }
    else {
      
       xmlUser = response.value;
       docXml = createDOM(xmlUser);
       var status = docXml.getElementsByTagName('status')[0].text;
       //var status = docXml.getElementsByTagName('dc_User')[0].getElementsByTagName('status')[0].firstChild.nodeValue; 
       if ((status == 'OK') || (status == 'CHPWD')) {
           //_userName = docXml.getElementsByTagName('usuario')[0].text;
           _userName = docXml.getElementsByTagName('dc_User')[0].getElementsByTagName('usuario')[0].firstChild.nodeValue
           var frame = document.getElementById('divContent');
           frame.style.display = 'none';

           if (status == 'OK') {
               top.frames['iframeContent'].location.href = 'Main.aspx';

               //var changeFrame = document.getElementById('iframeContent'); //Valido para Ffox-IE7-IE8
               //changeFrame.src = 'Main.aspx';

               GetMenu(_userId, _applicationId);
    
           }
           else {
               _firstLogin = '1';
               top.frames['iframeContent'].location.href = 'ChangePassword.aspx';

               //var changeFrame = document.getElementById('iframeContent'); //Valido para Ffox-IE7-IE8
               //changeFrame.src = 'ChangePassword.aspx';

               frame.style.display = 'block';
           }
           //LoadData();
           
           document.getElementById('divMenuSideBar').style.display = 'block';
           document.getElementById('lblApplicationId').innerHTML = _applicationName;
           document.getElementById('lblUserName').innerHTML = _userName;

           var now = new Date();
           document.getElementById('lblDate').innerHTML = dateFormat(now, "d-mmm-yyyy"); 
           
           document.getElementById('divHeader').style.display = 'block';
           document.getElementById('divFooter').innerHTML      = _copyright;
           document.getElementById('divFooter').style.display = 'block';

           
           
       }
       else {

           var message = docXml.getElementsByTagName('message')[0].text;
           
           //var message = docXml.getElementsByTagName('dc_User')[0].getElementsByTagName('message')[0].firstChild.nodeValue
           showMsgBoxAdv(message);

       }
    }
}

function LoadData() {
    
}

function GetMenu(_userId, _applicationId) {
 
    Home.GetMenu(_userId, _applicationId, GetMenu_CallBack);
}

function GetMenu_CallBack(response)
{
    closeProgressImg();
    
    if(response.error != null)
    {
        path = null;
        return;
    }
    else {

        _xmlOptions = response.value;
        
       PaintMenu(_xmlOptions);
    }
}


function onBtnLogoutClick() {
    location.href = 'Default.aspx';
}

function onBtnChangePassword() {
    var frame = document.getElementById('divContent');
    top.frames['iframeContent'].location.href = 'ChangePassword.aspx';
    frame.style.display = 'block';
}

function onBtnAboutClick() {
    showModal2(document.getElementById('divAbout'));
}

function PaintMenu(xmlOptions)
{
    docXml = createDOM(xmlOptions);

    //_perfil = docXml.getElementsByTagName('code')[0].text;

    _perfil = docXml.getElementsByTagName('dc_Profile')[0].getElementsByTagName('code')[0].firstChild.nodeValue; //Ffox - IE
    
    var table = document.getElementById("tabMenuSideBarOptions");
    

    var arrayOptions = docXml.getElementsByTagName('dc_Option');
    var i = 0;

    var level = 0;
    var posicion = 1;
    var accion = ''; 
    var padre = '';
    var subBody = '';
    var subPosicion = 10;

    var m_node = getXMLNode(xmlOptions, 'levelId', posicion.toString());

    
    while (m_node != null) {

        //var m_parent = getXMLNode(xmlOptions, 'menuOptionId', m_node.getElementsByTagName('menuOptionId')[0].text);
        var m_parent = getXMLNode(xmlOptions, 'menuOptionId', m_node.getElementsByTagName('menuOptionId')[0].firstChild.nodeValue); //Ffox - IE

        //accion = m_parent.getElementsByTagName('menuOptionAccess')[0].text;
        accion = m_parent.getElementsByTagName('menuOptionAccess')[0].firstChild.nodeValue; //Ffox - IE
        
        if (accion.substring(0, 1) == 'Y') {
            var row = document.createElement('TR');
            var col = document.createElement('TD');
            var subTable = document.createElement('TABLE');
                subTable.style.width = '100%';
                subTable.cellSpacing = '0px';
                subTable.cellPadding = '0px';
                subBody = document.createElement('TBODY');
                var j = 0;
                addOptionToMenu(subBody, m_parent, 0);
                subPosicion = posicion * 100;
                var m_subNode = getXMLNode(xmlOptions, 'levelId', subPosicion.toString());
                while (m_subNode != null) {
                    //m_parentSub = getXMLNode(xmlOptions, 'menuOptionId', m_subNode.getElementsByTagName('menuOptionId')[0].text);
                    m_parentSub = getXMLNode(xmlOptions, 'menuOptionId', m_subNode.getElementsByTagName('menuOptionId')[0].firstChild.nodeValue);

                    //if (m_parentSub.getElementsByTagName('optionApplication')[0].getElementsByTagName('masterOptionId')[0].text == m_parent.getElementsByTagName('menuOptionId')[0].text) {
                    if (m_parentSub.getElementsByTagName('optionApplication')[0].getElementsByTagName('masterOptionId')[0].firstChild.nodeValue == m_parent.getElementsByTagName('menuOptionId')[0].firstChild.nodeValue) {
                        
                        //accion = m_parentSub.getElementsByTagName('menuOptionAccess')[0].text;
                        accion = m_parentSub.getElementsByTagName('menuOptionAccess')[0].firstChild.nodeValue;
                        
                        if (accion.substring(0, 1) == 'Y') {
                            addOptionToMenu(subBody, m_parentSub, 1);
                        }
                    }
                    subPosicion++;
                    m_subNode = getXMLNode(xmlOptions, 'levelId', subPosicion.toString());
                }
               
                subTable.appendChild(subBody);
                col.appendChild(subTable);
                row.appendChild(col);

                document.getElementById("tabMenuSideBarOptions").getElementsByTagName("TBODY")[0].appendChild(row);
                
                //table.appendChild(row);    
            }
            posicion++;
            m_node = getXMLNode(xmlOptions, 'levelId', posicion.toString()); 
        }
    
}

function addOptionToMenu(subBody,option,level)
{
    var tr = document.createElement('TR');
    var td = document.createElement('TD');
    //optionName = option.getElementsByTagName('optionApplication')[0].getElementsByTagName('description')[0].text;
    optionName = option.getElementsByTagName('optionApplication')[0].getElementsByTagName('description')[0].firstChild.nodeValue;
    
    td.innerHTML = optionName;
    if (level == 0) {
        td.className = 'MenuListItem';
    }
    else {
        td.className = 'SubMenuListItem';
    }
    padding = level * 10;
    td.style.paddingLeft = padding + 'px';
    //id = option.getElementsByTagName('menuOptionId')[0].text;
    id = option.getElementsByTagName('menuOptionId')[0].firstChild.nodeValue;

    td.id = id;
    if (level > 0) 
    {
        td.setAttribute("onclick","onProfilesClick()");
        td['onclick'] = new Function('changeIFrame(this)');
        
        //HtmlPage = option.getElementsByTagName('optionApplication')[0].getElementsByTagName('pageUrl')[0].text;
        HtmlPage = option.getElementsByTagName('optionApplication')[0].getElementsByTagName('pageUrl')[0].firstChild.nodeValue;

        td.setAttribute('page', HtmlPage);
    }
    tr.appendChild(td);
    subBody.appendChild(tr);
}

function HideMenu() 
{
    if (document.getElementById('collapse').src = 'images/CollapseLeft.jpg') 
     {
       for (var i=0; i<5; i++) {
            setTimeout('ResizeMenu(-30)', 20 + (i*20));
        }
        document.getElementById('tabMenuSideBarOptions').style.display = 'none';
        document.getElementById('imgMenuSideBarCollapse').align = 'left';
        document.getElementById('imgMenuSideBarCollapse').innerHTML = '<img alt="" id="collapse" src="images/icons/collapse-right.jpg" onclick="ShowMenu();">';
    }
}

function ShowMenu() 
{
    if (document.getElementById('collapse').src = 'images/CollapseRight.jpg') 
    {
        for (var i=0; i<5; i++) {
            setTimeout('ResizeMenu(30)', 20 + (i*20));
        }
        document.getElementById('tabMenuSideBarOptions').style.display = 'block';
        document.getElementById('imgMenuSideBarCollapse').align = 'right';
        document.getElementById('imgMenuSideBarCollapse').innerHTML = '<img alt="" id="collapse" src="images/icons/collapse-left.jpg" onclick="HideMenu();">';
    }
}

function ResizeMenu(d) {
    var i = 0;
    i = document.getElementById('divMenuSideBar').style.width;
    var x = i.split('px');
    var j = parseInt(x[0]) + d;
    if (j < 15) j = 15; else if (j > 160) j = 160;
    //if (j<15) j=15; else if (j>155) j=155;
    document.getElementById('divMenuSideBar').style.width = j + 'px';
}

function changeIFrame(objeto)
{
    var frame = document.getElementById('iframeContent');
    page = objeto.getAttribute('page');
    frame.src = page;
    var div = document.getElementById('divContent');
    div.style.display = 'block';
}

function showMsgBoxAdv(message) {
    document.getElementById('lblMsgAdvDescription').innerHTML=message;
    showModalProgress(document.getElementById('divMsgAdv'));
}   

function showMsgBoxWait(paraMessage) {
    document.getElementById('lblMsgDescription').innerHTML=paraMessage;
    document.getElementById('divMsgBox2').style.display='block';
    showModalProgress(document.getElementById('divMsgBox2'));
}   

function showMsgBoxQuestion(paraMessage) {
    document.getElementById('lblMsgDescription').innerHTML=paraMessage;
    document.getElementById('divMsgBox2').style.display='block';
    showModalProgress(document.getElementById('divMsgBox2'));
}   

function closeMsgBox(){
    closeModalProgress();
} 

function closeModal() {
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'none';
    parent.document.getElementById('modalBack').style.display = 'none';
}

function showModalProgress(e) {
    parent.document.getElementById('modalProgressBack').style.display = 'block';
    parent.document.getElementById('divDefaultProgressImg').innerHTML = e.outerHTML;
    parent.document.getElementById('divDefaultProgressImg').style.display = 'block';
    setProgressPosition(e);
}

function closeModalProgress() {
    parent.document.getElementById('divDefaultProgressImg').style.display = 'none';
    parent.document.getElementById('modalProgressBack').style.display = 'none';
}

function setProgressPosition(e) {
    var popup = parent.document.getElementById('divDefaultProgressImg');
    popup.style.display = 'block';
    var y = (parent.document.body.clientHeight / 2) - (popup.clientHeight  / 2);
    var x = (parent.document.body.clientWidth / 2) - (popup.clientWidth / 2);
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    
}

function showProgressImg() {
    document.getElementById('divMsgBox').style.display = 'block';
    showModalProgress(document.getElementById('divMsgBox'));
}

function closeProgressImg() {
    closeModalProgress();
}        




  


   

   

  

   function IsNumeric(expression)
{
	return (String(expression).search(/^\d+$/) != -1);
}
