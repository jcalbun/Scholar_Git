<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RutaMinibus.aspx.cs" Inherits="TCSWebSite.RutaMinibus" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" >
    <head id="Head1" runat="server">
        <title>.: Sistema de Transporte Escolar :.</title>
        <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />

        <script src="js/Common.js" type="text/javascript"></script>
        <script src="js/RutaMinibus.js" type="text/javascript"></script>
        
        <style type="text/css">
            .style4
            {
                width: 286px;
            }
            .style5
            {
                width: 346px;
            }
            .style6
            {
                width: 641px;
            }
        </style>
    </head>
<body onload="onFormLoad();">
    <form id="frmMinibuses" runat="server" autocomplete="off">
    <cc1:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server"></cc1:ToolkitScriptManager> 
    
     <div style="height: 400px"> 
        <div id="divScreenTitle" style="width:100%" class="tdLikeMenu">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                        Ruta Minibus</td>
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
                        <div id="Div4" class="linkButton" style="width:90px;"  onclick="onSearchButtonClick();">
                            <label style="padding-right:3px;">Busqueda</label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="padLine"></div>

        <div id="divSearchTitle" style="width:100%;cursor:hand;" class="tdLikeMenu" onclick="CollapseDivSearchDetail();">
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
                        <table style="width:200px; margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr id="Tr1">
                                <td>
                                    <table>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label6" class="Label" >Ruta:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtRuta" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnRutaPopup" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>     
                                        </tr>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label4" class="Label" >Trayecto:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtTrayecto" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div9" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>     
                                        </tr>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label1" class="Label" >Minibus:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtMinibus" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div8" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>     
                                        </tr> 
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label2" class="Label" >Estudiante:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtEstudiante" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div10" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>     
                                        </tr>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label5" class="Label" >Conductor:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtConductor" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div13" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
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
                        <div id="btnFind" align="center"  class="linkButton" style="width:40px; height:15px;" onclick="search();">
                            Buscar
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        
        <div class="padLine"></div>
        
        <div id="divResultsTitle" class="tdLikeMenu" style="display:none;width:100%;cursor:hand;" onclick="CollapseResultsPanel();">
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

        <div id="divResults" class="panel" style="display:none;height:auto; width:100%; max-height:170px;">
            <div id="divSearchResultsTableTitles" style="width:auto;height:auto;">  
                    
                <table class="GridTable" style="width:700px;">
                    <thead id="thResultsFixedHead">
                        <tr>
                            <th align="center">
                                <label id="Label3" runat="server">Id</label>
                            </th>
                            <th align="center">
                                <label id="lblSRConductorId" runat="server">Ruta</label>
                            </th>
                            <th align="center">
                                <label id="Label10" runat="server">Trayecto</label>
                            </th>
                            <th align="center">
                                <label id="lblSRRut" runat="server">Minibus</label>
                            </th>
                        </tr>
                    </thead>
                </table>
                    
            </div> 
            <div id="divSearchResultsTableContainer" style="overflow:auto;width:auto;max-height:145px">
                <table id = "tblResults" class="GridTable" style="width:700px;">
                    <tbody>
                    </tbody>
                </table>

            </div>
        </div>

        <div class="padLine"></div>

        <div id="divCurrentTitle" class="tdLikeMenu" style="display:none;width:100%;cursor:hand;" onclick="CollapseDivCurrentDetail();">
            <table border="0px" cellpadding="0px" cellspacing="0px" style=" width:100%">
                <tr>
                    <td align="left" style="width:15px">
                        <img alt="Collapse" id="CurrentCollapseImg" src="images/icons/collapse-up.jpg" />
                    </td>
                    <td align="left" class="LabelWhite" id="lblCurrentMinibusTitle">
                        Ruta Minibus Seleccionado
                    </td>
                    <td align="right">
                        <label id="lblCurrentShowHide" class="LabelWhite" style="padding-right:5px; font-size:11px">(Ocultar detalles...)</label>
                    </td>
                </tr>
            </table>
        </div>

        <div id="divCurrentDetail" class="panel" style="display:none;width:100%; height:auto; overflow:hidden;">
            <div id="divCurrentToolBar" class="ToolBar">
                <table border="0px" cellpadding="0px" cellspacing="0px">
                    <tr align="left">
                        <td style="padding:2px">
                            <div id="btnEdit" class="linkButton" onclick="">
                                <label id="lblEdit" style="padding-right:3px;">Editar</label>
                            </div>
                        </td>
                        <td style="padding:2px">        
                            <div id="btnSave" class="linkButton" onclick="">
                                <label id="lblSave" style="padding-right:3px;">Guardar</label>
                            </div> 
                        </td>
                        <td style="padding:2px">
                            <div id="btnCancel" class="linkButton" onclick="">
                                <label id="lblCancel" style="padding-right:3px;">Cancelar</label>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="panel" style="width:100%; height:auto; overflow:hidden;">
                <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label7" class="Label" >Ruta:</label>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentRuta" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>
                                    <td style="width:5px; padding-left:0px;" align="left">&nbsp;</td>  
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div12" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label8" class="Label" >Trayecto:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentTrayecto" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td> 
                                    <td style="width:5px;  padding-left:0px;" align="left">&nbsp;</td>   
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div11" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td> 
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label9" class="Label" >Minibus:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentMinibus" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>   
                                    <td style="width:5px;  padding-left:0px;" align="left">&nbsp;</td>  
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="btnCurrentMinibusPopup" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <%--popup--%>
    <div id="divSearchMinibusesPopup" style="display:none; height:auto; width:auto; max-width: 550px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
           <table id= "tblMinibusesPopup" border="0px" cellpadding="0px" cellspacing="0px">
                <tr>
                    <td class="style6">
                        <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                            <tr>
                                <td class="tdLikeMenu" align="center">
                                    <label class="LabelWhite" style="margin-left:3px">Busqueda Ruta Minibus</label>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
                <tr>
                    <td class="style6">

                        <div id="divSearchDetailMinibusesPopup" class="panel" style="width:637px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="lblSearchRutFilter" class="Label" >Ruta:</label>
                                                </td>
                                                <td>
                                                    <input id="txtSearchRutFilter" class="TextBoxWrite" type="text"  
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
                                                    <label id="lblSearchApellidosFilter" class="Label" >Minibus:</label>
                                                </td>
                                                <td>
                                                    <input id="txtSearchApellidosFilter" class="TextBoxWrite" type="text"  
                                                        style="width:160px" maxlength="25"  onkeyup=""/>
                                                        <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerDescriptionFilterKeyUp(this)"/>--%>
                                                       
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width:15px; padding-left:0px;" align="left">&nbsp;</td>
                                </tr>
                            </table>
                        </div>  
               
                    </td>
                </tr>
                
                <tr>
                    <td class="style6">
                        <div id="divSearchMinibusesPopUpSearchResults" style="max-height:150px; overflow:auto;">
                            <table class="GridTable">
                                <thead id="thSearchMinibusesTableHeader">
                                    <tr>
                                        <th class="style4">
                                            Ruta
                                        </th>
                                        <th class="style5">
                                            Minibus
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
                    <td class="style6">
                        <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                            <tr align="center">
                                <td style="padding-top:4px; padding-right:17px;padding-bottom:4px;">
                                    <div id="BtnCloseSearchMinibusesPopUp" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchManufacturersPopUpClick()">                                            
                                        Cerrar
                                    </div>
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
