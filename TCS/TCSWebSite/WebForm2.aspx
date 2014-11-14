<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="TCSWebSite.WebForm2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div id="divSearchContratosPopup" style="height:auto; width:auto; max-width: 550px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
        <table id= "Table1" border="0px" cellpadding="0px" cellspacing="0px">
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                        <tr>
                            <td class="tdLikeMenu" align="center">
                                <label class="LabelWhite" style="margin-left:3px">Busqueda Contratos</label>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
            <tr>
                <td>

                    <div id="div3" class="panel" style="width:637px; height:65px; overflow:hidden" >
                        <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr>
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td >
                                                <label id="Label21" class="Label" >Contrato:</label>
                                            </td>
                                            <td>
                                                <input id="Text4" class="TextBoxWrite" type="text"  
                                                    style="width:120px" maxlength="5"  onkeyup=""/>
                                                    <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerCodeFilterKeyUp(this)"/>--%>
                                                       
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width:15px; padding-left:0px;" align="left">&nbsp;</td>
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td>
                                                <label id="Label22" class="Label" >Apoderado:</label>
                                            </td>
                                            <td>
                                                <input id="Text5" class="TextBoxWrite" type="text"  
                                                    style="width:160px" maxlength="25"  onkeyup=""/>
                                                    <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerDescriptionFilterKeyUp(this)"/>--%>
                                                       
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="width:15px; padding-left:0px;" align="left">&nbsp;</td>
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td>
                                                <label id="Label23" class="Label" >Estudiante:</label>
                                            </td>
                                            <td>
                                                <input id="Text6" class="TextBoxWrite" type="text"  
                                                    style="width:160px" maxlength="25"  onkeyup=""/>
                                                    <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerDescriptionFilterKeyUp(this)"/>--%>
                                                       
                                            </td>
                                        </tr>
                                    </table>
                                </td>

                                <td valign="bottom" align="right" style=" width:5px; height:50px; padding-right:17px" >
                                </td>
                            </tr>
                        </table>
                    </div>  
               
                </td>
            </tr>
                
            <tr>
                <td>
                    <div id="divSearchContratosPopUpSearchResults" style="max-height:150px; overflow:auto;">
                        <table class="GridTable">
                            <thead id="thSearchContratosPopupTableHeader">
                                <tr>
                                        <th style="width:80px">
                                            Contrato
                                        </th>
                                        <th style="width:50px">
                                            Año
                                        </th>
                                    <th style="width:250px">
                                        Apoderado
                                    </th>
                                    <th style="width:250px">
                                        Estudiante
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                        <tr align="center">
                            <td style="padding-top:4px; padding-right:17px;padding-bottom:4px;">
                                <div id="Div7" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchManufacturersPopUpClick()">                                            
                                    Cerrar
                                </div>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
        </table>
    </div>
    
    </div>
    </form>
</body>
</html>
