<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ResultadoMensual.aspx.cs" Inherits="TCSWebSite.ResultadoMensual" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

    <head id="Head1" runat="server">
        <title>.: Sistema de Transporte Escolar :.</title>
        <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />

        <script src="js/Common.js" type="text/javascript"></script>
        <script src="js/ResultadoMensual2.js" type="text/javascript"></script>
        
        <style type="text/css">
            .style4
            {
                width: 151px;
            }
            .style5
            {
                width: 379px;
            }
        </style>
    </head>

    <body onload="onFormLoad();">
    <form id="frmResultadoMensual" runat="server" autocomplete="off">
    <cc1:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server"></cc1:ToolkitScriptManager> 
    <div style="height: 400px"> 
        <div id="divScreenTitle" style="width:100%" class="tdLikeMenu">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                        Resultado Mensual</td>
                </tr>
            </table>
        </div>

        <div id="divScreenToolBar" class="ToolBar">
            <table border="0px" cellpadding="0px" cellspacing="0px">
                <tr align="left">
                    <td class="LabelWhite" style="font-size:medium; padding:2px;">
                        <div id="btnNew" class="linkButton" onclick="">
                            <label style="padding-right:3px;">Nuevo</label>
                        </div>
                    </td>
                    <td class="LabelWhite" style="font-size:medium; padding:2px;" >
                        <div id="Div4" class="linkButton" style="width:90px;" onclick="">
                            <label style="padding-right:3px;">Busqueda</label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="padLine"></div>

        <div id="divSearchTitle" style="width:100%;cursor:hand;" class="tdLikeMenu" onclick="">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" style="width:15px">
                        <img alt="Collapse" id="SearchCollapseImg" src="images/icons/collapse-up.jpg" />
                    </td>
                    <td align="left" class="LabelWhite">
                        Busqueda
                    </td>
                    <td align="right">
                        <label id="lblSearchShowHide" class="LabelWhite" style="padding-right:5px; font-size:11px">(Ocultar detalles...)</label>
                    </td>
                </tr>
            </table>
        </div>

        <div id="divSearchDetail" class="panel" style="width:100%; height:auto; overflow:hidden; vertical-align:middle" >
            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                <tr>
                    <td>
                        <table style="width:300px; margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr id="Tr1">
                                <td>
                                    <table>
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="lblApoderado" class="Label" >Fecha Desde:</label>
                                            </td>
                                            <td style="padding-left:5px">
                                                <input id="txtIdEstablecimiento" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" value="dd/mm/aaaa" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                           <%-- <div id="btnShowSearchEstablecimiento" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>--%>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>  
                                        </tr> 
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="Label1" class="Label" >Fecha Hasta:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtDescripcion" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" value="dd/mm/aaaa" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>   
                                        </tr> 
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="Label2" class="Label" >Ruta:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtDireccion" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td> 
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnShowSearablecimiento" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>    
                                        </tr>
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="Label4" class="Label" >Estudiante:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="Text6" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>   
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnShowSearchEsta" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>  
                                        </tr>
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="Label5" class="Label" >Apoderado:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="Text7" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td> 
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnShowSearchEstablecimien" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>    
                                        </tr>

                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="width:5px; height:45px; padding-left:0px;" align="left">&nbsp;</td>  
                    <td>
                        <div id="btnFind" align="center"  class="linkButton" style="width:40px; height:15px;" onclick="">
                            Buscar
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="padLine"></div>

        <div id="divResultsTitle" class="tdLikeMenu" style="display:none;width:100%;cursor:hand;" onclick="">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" style="width:15px">
                        <img alt="Collapse" id="ResultsCollapseImg" src="images/icons/collapse-up.jpg" />
                    </td>

                    <td align="left" class="LabelWhite">
                        Resultados Busqueda
                    </td> 
                    <td align="right">
                        <label id="lblResultsShowHide" class="LabelWhite" style="padding-right:5px; font-size:11px">(Ocultar detalles...)</label>
                    </td>
                </tr>
            </table>
        </div>
       

        <div class="padLine"></div>

         <div id="divResults" class="panel" style="display:none;height:auto; width:100%; max-height:160px;">
             <div id="divResultsToolbar" class="ToolBar">
                <table border="0px" cellpadding="0px" cellspacing="0px">
                    <tr align="left">
                        <td class="LabelWhite" style="font-size:medium; padding:2px;">
                            <div id="btnPrintResults" class="linkButton" onclick="">
                                <label style="padding-right:3px;">Imprimir</label>
                            </div>
                        </td>
                        <td class="LabelWhite" style="font-size:medium; padding:2px;" >
                            <div id="btnExportResults" class="linkButton" style="width:90px;" onclick="">
                                <label style="padding-right:3px;">Exportar</label>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="divSearchResultsTableTitles" style="width:auto;height:auto;">  
                    
                <table class="GridTable" style="width:700px;">
                    <thead id="thEstablecimientoFixedHead">
                        <tr>
                            <th align="center">
                                <label id="lblSRIdEstablecimiento" runat="server">Ruta</label>
                            </th>
                            <th align="center">
                                <label id="lblSRDescripcion" runat="server">Trayecto</label>
                            </th>
                            <th align="center">
                                <label id="lblSRDireccion" runat="server">Estudiante</label>
                            </th>
                            <th align="center">
                                <label id="Label6" runat="server">Apoderado</label>
                            </th>
                            <th align="center">
                                <label id="Label16" runat="server">Ingreso</label>
                            </th>
                            <th align="center">
                                <label id="Label17" runat="server">Egreso</label>
                            </th>
                            <th align="center">
                                <label id="Label18" runat="server">Saldo</label>
                            </th>
                        </tr>
                    </thead>
                </table>
                    
            </div> 
            <div id="divSearchResultsTableContainer" style="overflow:auto;width:auto;max-height:145px">
                <table id = "tblDireccionResults" class="GridTable" style="width:700px;">
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="padLine"></div>

        <%--<div id="divCurrentTitle" class="tdLikeMenu" style="display:none;width:100%;cursor:hand;" onclick="">--%>

    </div>
    </form>
</body>

</html>