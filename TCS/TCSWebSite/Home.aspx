<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="TCSWebSite.Home" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server" >
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title> 
        <%-- Definido dinámicamente en Home.js --%>
    </title>
    <script src="js/Home.js" type="text/javascript"></script>
    <script src="js/Common.js" type="text/javascript"></script>
    <script src="js/DateFormat.js" type="text/javascript"></script>
    
    <link href="css/TCS.css" rel="stylesheet" type="text/css" />
    <link href="css/Common.css" rel="stylesheet" type="text/css" />
    <link href="css/Home.css" rel="stylesheet" type="text/css" />        
</head>
<body onload="onPageLoad();" onclick="Delay();" onmousemove="Delay();" onkeypress="Delay();">
    <form id="frmHome" runat="server">
    <div id="divHeader"; style="display:none; height:69px; width:100%" >
        <table style="height: 100%; width:100%">
            <tr>
                <td style="text-align:center">
                    <table id="tbMainHeaderButtons" style="margin-bottom:2px; vertical-align:bottom; width:100%; text-align:center">
                        <tr>
                            <td style="width:100px">
                                <img alt="" id="imgLogo" src="images/i_tcs_logo_stretch.jpg"  />
                            </td>
                            <td style="height:40px; vertical-align:bottom;">
                                <div class="linkButtonTitle" onclick="top.frames['iframeContent'].location.href = 'Main.aspx';">
                                    <label>Inicio</label>
                                </div>
                            </td>
                            <td style="height:40px; vertical-align:bottom;">
                                <div class="linkButtonTitle" onclick="onBtnAboutClick()">
                                    <label>Acerca de</label>
                                </div>
                            </td>
                             <td style="height:40px; vertical-align:bottom;">
                                <div class="linkButtonTitle" onclick="onBtnChangePassword()">
                                    <label>Contraseña</label>
                                </div>
                            </td>
                            <td style="height:40px; vertical-align:bottom;">
                                <div class="linkButtonTitle" onclick="onBtnLogoutClick()">
                                    <label>Salir</label>
                                </div>
                            </td>
                        </tr>
                    </table>

                </td>
                <td style="text-align:right; ">
                    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse; border:0; padding:0">
                        <tr align="right">
                            <td>
                                <label class ="labelHeader" id="lblApplicationId">
                                   <%-- Definido dinámicamente en Home.js --%>
                                </label>
                            </td>
                        </tr>
                        <tr align="right">
                            <td>
                               <label class ="labelHeader" id="lblUserName">
                                   <%-- Definido dinámicamente en Home.js --%>
                                </label>
                            </td>
                        </tr>
                        <tr align="right">
                            <td>
                                <label class ="labelHeader" id="lblDate">
                                   <%-- Definido dinámicamente en Home.js --%>
                                </label>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <!-- display: none; !-->
    <div id="divMenuSideBar" style="display: none;width:160px;  ">
        <table id="tabMenuSideBar" cellpadding="0px" cellspacing="0px" border="0px">
            <tr>
                <td>
                    <table id="tabMenuSideBarOptions" cellpadding="0px" cellspacing="0px"   style="width:145px">
                        <tbody></tbody>
                    </table>
                </td>
                <td>
                    <table id="tabMenuSideBarCollapse" cellpadding="0" cellspacing="1" style="width:15px">
                        <tr>
                            <td id="imgMenuSideBarCollapse" align="right" >
                                <img alt="" id="collapse" src="images/CollapseLeft.jpg" onclick="HideMenu();" />
                            </td>                                                       
                        </tr>
                    </table>
                </td>                
            </tr>
        </table>
    </div>
    <div id="divContent" style="height:768px;">
        <iframe ID="iframeContent" runat="server" src="Login.aspx" frameborder="0" style="text-align:center; display:block; width:100%; height:740px;overflow:auto;border:0" align="middle"  ></iframe> 
        
    </div>
    <div id="divFooter" style="display:none; width:100% ">
        <%-- Definido dinámicamente en Home.js --%>
    </div>
    
    
    <div id="divDefaultPopUpSlot" class="modalWindow" style="display:none; height:auto; width:auto;"></div>
    <div id="modalBack" class="modalBackground" style="display:none"></div>
    <div id="divDefaultProgressImg" class="modalWindow" style="display:none;z-index:41; height:auto; width:auto;"></div>
    <div id="modalProgressBack" class="modalProgressBackground" style="display:none;"></div>    

    <div id="divAbout" style="display:none; width:395px; height:280px; color: #00007f; background-image:url('images/splash.jpg'); background-size:100%;">
        <table>
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width:385px;">
                        <tr>
                            <td class="tdLikeMenu">
                                <label class="LabelWhite" style="margin-left:3px">Acerca de</label>
                            </td>
                            <td style="width:16px" align="right">
                                <div class="closeButton" onclick="closeModal();" style="width:13px; height:13px"></div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding:5px; padding-left:55px; padding-top:35px;" >
                    <label style="font-size:26px">Sistema de Tranporte Escolar</label>
                </td>
            </tr>
            <tr>
                <td style="padding:5px; padding-left:115px;" >
                    <label style="font-size:16px">Version Actual: </label><label id="lblCurrentRelease">1.00.00.0</label>
                </td>
            </tr>                        
            <tr>
                <td style="padding:5px; padding-left:115px;" >
                    <label style="font-size:16px">Ultima Actualización: </label><label id="lblLastUpdated">28-Ene-2014</label>
                </td>
            </tr>
            <tr>
                <td style="padding:5px; padding-left:65px;" >
                    <label style="font-size:10px">Copyright © Todos los Derechos Reservados</label>
                </td>
            </tr>
        </table>
    </div>

    <div id="divMsgWait" class="msgBox" style="width:300px;display:none;max-height:150px" align="center" >
         <table>
            <tr align="center">
                <td style="width:30px">
                    <img alt="LoadingScr" src="../images/icons/8-1.gif" id="imgStandBy" style="width:30px;height:30px"/>
                </td>
                <td align="center">
                    <label id="lblPleaseWait" class="Label">Favor espere...</label>
                </td>
            </tr>
         </table>
    </div>        

    <div id="divMsgAdv" class="msgBox" style="width:300px;display:none;max-height:150px" align="center">
        <table align="center" style="width:100%">
            <thead class="ratesHeader" align="center">
                <tr>
                    <th>
                        <label id='lblMsgAdvTitle' class="Label">Message</label>
                    </th>
                </tr>
            </thead>
            <tbody style="overflow:auto">
                <tr>
                    <td align="center">
                        <label id="lblMsgAdvDescription" class="Label">Test Message</label>
                    </td>
                </tr>
                <tr align="center">
                    <td style="padding-top:4px; padding-right:17px;padding-bottom:4px;">
                        <div id="DivOK" class="linkButton" style="display:inline;margin-right:5px;width:40px" onclick="closeMsgBox()">
                            <label id="lblOK" class="Label" style="width:40px">Ok</label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>     

    <div id="divMsgQuestion" class="msgBox" style="width:300px;display:none;max-height:150px" align="center">
        <table align="center" style="width:100%">
            <thead class="ratesHeader" align="center">
                <tr>
                    <th>
                        <label id='Label1' class="Label">Message</label>
                    </th>
                </tr>
            </thead>
            <tbody style="overflow:auto">
                <tr>
                    <td align="center">
                        <label id="Label2" class="Label">Test Message</label>
                    </td>
                </tr>
                <tr align="center">
                    <td style="padding-top:4px; padding-right:17px;padding-bottom:4px;">
                        <div id="Div2" class="linkButton" style="display:inline;margin-right:5px;width:40px" onclick="closeMsgBox()">
                            <label id="Label3" class="Label" style="width:40px">Ok</label>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div> 
    <%--Message Div--%>
    <div id="divMsgBox" class="panel" style="width:300px;display:none;max-height:150px" align="center" >
         <table>
            <tr align="center">
                <td style="width:30px">
                    <img alt="LoadingScr" src="images/icons/8-1.gif" id="img1" style="width:30px;height:30px"/>
                </td>
                <td align="center">
                    <label id="Label4" class="Label">Favor espere...</label>
                </td>
            </tr>
         </table>
    </div>  

</form>
</body>
</html>