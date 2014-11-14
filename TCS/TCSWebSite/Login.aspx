<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="TCSWebSite.Login" %>

<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Login</title>
    <script src="js/Login.js" type="text/javascript"></script>   
    <link href="css/Login.css" rel="stylesheet" type="text/css" />    
</head>
<body onload="onPageLoad()">
    <form id="frmFrame" runat="server">
        <div id="divFrame"; style="width:100%; height:100%">
            <table id="LoginContentTable" cellspacing="0px" cellpadding="0px" style="width:100%; height:100%;vertical-align:middle;text-align:center">
                <tr>
                    <td align="center">
                        <table id="tblLoginCurrent" cellspacing="0px" cellpadding="0px" style="width:745px; color: White; background-color:#011b4c">
                            <tr id="trLoginCurrentTitle" style="height: 80px;">
                                <td>
                                    <table>
                                        <tr>
                                            <td align="left" style="width: 450px; font-size: 28px" >
                                                <div>
                                                    <img alt="" src="images/logo_TCS_top.gif" width="100px" height="50px" /></div>
                                            </td>
                                            <td  align="right" style="width: 295px; color: White;"> 
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                          <td  align="right" style="color: White;"> 
                                                            <label class="lblUserAccount">STE</label> 
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                         <td  align="right" style="color: White;"> 
                                                          <label class="LoginLabels">Sistema de Transporte Escolar</label></td>
                                                    </tr>

                                                </table>
                                               
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td  align="right" style="color: White;"> 
                                               
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr class="trMap">
                                <td>                                  
                                    <table>
                                    <tr id="trLoginCurrentBody"; style="height:283px"; >
                                <td>
                                    <table cellspacing="0px" cellpadding="0px" style="padding-top:4px;text-align:center">
                                        <tr>
                                            <td style="width:540px" align="center">
                                                <div style="padding-top:10px;margin-left:15px;margin-right:20px; width:250px;">
                                                    <table id="frmSquare" cellspacing="0px" cellpadding="0px" >                                                        
                                                        <tr>
                                                            <td>
                                                                <table style="text-align:right">
                                                                    <tr>
                                                                        <td class="LoginLabels" style="width:72px">
                                                                            <label id="lblUsername">Usuario:</label>
                                                                        </td>
                                                                        <td style="width:150px">
                                                                            <input id="txtUserName" type="text" class="LoginTextboxes" maxlength="15"/>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="LoginLabels">
                                                                            <label id="lblPwd">Contraseña:</label>
                                                                        </td>
                                                                        <td>
                                                                            <input id="txtPwd" type="password" class="LoginTextboxes" maxlength="15"/>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                        </td>
                                                                        <td align="right">
                                                                            <div id="divBtnLogin" onclick="LogIn()" style="cursor:pointer">
                                                                                <!--<label id="btnLogin">Log In</label>-->
                                                                                <img src="images/b_ok.gif" />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>                                                                                                            
                                                    </table>
                                                </div>
                                            </td>
                                            <td style="width:200px;">
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <img src="images/i_tcs_furgones.jpg" alt=""/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img src="images/i_tcs_mundo.jpg" alt=""/>
                                                        </td>
                                                    </tr>
                                                </table> 
                                            </td>
                                        </tr>                                        
                                        <tr>
                                            <td colspan="2" valign="bottom" style="text-align: center; color: White; font-size: 10px;
                                                padding-top: 10px;">
                                                Sitio optimizado para resolución 1024 * 768 con Microsoft Internet Explorer 8.0
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                                    </table>
                                </td>
                            </tr>                            
                        </table> 
                        <table id="tblLogos" cellspacing="0px" cellpadding="0px" style="width: 745px; color: White;">
                            <tr>
                                <td>
                                    <img src="images/i_tcs_logos.jpg" alt=""/>
                                </td>
                            </tr>
                        </table>                    
                    </td> 
                </tr>
            </table>
        </div>                              
    </form>
</body>
</html>