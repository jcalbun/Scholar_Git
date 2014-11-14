<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Pagos.aspx.cs" Inherits="TCSWebSite.Pagos" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" >
    <head id="Head1" runat="server">
        <title>.: Sistema de Transporte Escolar :.</title>
        <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />

        <script src="js/Common.js" type="text/javascript"></script>
        <script src="js/Pagos.js" type="text/javascript"></script>
        
        </head>
<body onload="onFormLoad();">
    <form id="frmContratoes" runat="server" autocomplete="off">
    <cc1:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server"></cc1:ToolkitScriptManager> 
    
     <div style="height: 658px"> 
        <div id="divScreenTitle" style="width:100%" class="tdLikeMenu">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                        Pagos</td>
                </tr>
            </table>
        </div>

        <div id="divScreenToolBar" class="ToolBar">
            <table border="0px" cellpadding="0px" cellspacing="0px">
                <tr align="left">
                    <td class="LabelWhite" style="font-size:medium; padding:2px;">
                        <div id="btnNew" class="linkButton" onclick="onNewButtonClick();">
                            <label style="padding-right:3px;">Nuevo</label>
                        </div>
                    </td>
                    <td class="LabelWhite" style="font-size:medium; padding:2px;" >
                        <div id="Div4" class="linkButton" style="width:90px;" onclick="onSearchButtonClick();">
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
                        <table style="width:350px; margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr id="Tr1">
                                <td>
                                    <table>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="lblContrato" class="Label" >Id Pago:</label>
                                            </td>
                                            <td style="padding-left:5px">
                                                <input id="txtPagoId" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td style="display:none;">
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnShowSearchContrato" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>  
                                        </tr> 
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label3" class="Label" >Apoderado:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtApoderado" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>   
                                            <td style="display:none;">
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div9" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr style="display:none;">
                                            <td align="right" width="120px">
                                                <label id="Label5" class="Label" >Contrato:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtContrato" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td style="display:none;">
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div6" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>    
                                        </tr>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label1" class="Label" >Documento:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtDocumento" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>  
                                            <td>
                                                <%--<table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div8" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>--%>
                                            </td> 
                                        </tr> 
                                         <tr>
                                            <td align="right" width="120px">
                                                <label id="Label2" class="Label" >Fecha desde:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <%--<input id="txtFechaDesde" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" />--%>

                                                <asp:TextBox ID="txtFechaDesde" Width="180px" runat="server" CssClass="TextBoxWrite"></asp:TextBox>
                                                <cc1:CalendarExtender ID="CalendarExtender2" runat="server"
                                                    TargetControlID="txtFechaDesde" FirstDayOfWeek="Monday" Format="dd/MM/yyyy"/>
                                            </td>   
                                        </tr>
                                         <tr>
                                            <td align="right" width="120px">
                                                <label id="Label4" class="Label" >Fecha hasta:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <%--<input id="txtFechaHasta" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" />--%>

                                                <asp:TextBox ID="txtFechaHasta" Width="180px" runat="server" CssClass="TextBoxWrite"></asp:TextBox>
                                                <cc1:CalendarExtender ID="CalendarExtender3" runat="server"
                                                    TargetControlID="txtFechaHasta" FirstDayOfWeek="Monday" Format="dd/MM/yyyy"/>

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
        
        <div id="divResultsTitle" class="tdLikeMenu" style="display:none;width:100%;cursor:hand;" onclick="CollapseDivCurrentDetail();">
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
                                <label id="lblSRRut" runat="server">Id Pago</label>
                            </th>
                            <th align="center">
                                <label id="lblSRNombres" runat="server">Apoderado</label>
                            </th>
                            <th align="center">
                                <label id="lblSRContratoId" runat="server">Documento</label>
                            </th>
                            <th align="center">
                                <label id="Label12" runat="server">Monto</label>
                            </th>
                            <th align="center">
                                <label id="Label14" runat="server">Fecha</label>
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

        <div id="divCurrentTitle" class="tdLikeMenu" style="display:none;width:100%;cursor:hand;" onclick="CollapseResultsPanel();">
            <table border="0px" cellpadding="0px" cellspacing="0px" style=" width:100%">
                <tr>
                    <td align="left" style="width:15px">
                        <img alt="Collapse" id="CurrentCollapseImg" src="images/icons/collapse-up.jpg" />
                    </td>
                    <td align="left" class="LabelWhite" id="lblCurrentContratoTitle">
                        Pago Seleccionado
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
                            <div id="btnSave" class="linkButton" onclick="onBtnSaveClick();">
                                <label id="lblSave" style="padding-right:3px;">Guardar</label>
                            </div> 
                        </td>
                        <td style="padding:2px">
                            <div id="btnCancel" class="linkButton" onclick="">
                                <label id="lblCancel" style="padding-right:3px;">Cancelar</label>
                            </div>
                        </td>
                        <td style="padding:2px">
                            <asp:Button ID="btnInformePagos" runat="server" class="linkButton" 
                                Text="Informe" Height="20px" onclick="btnInformePagos_Click" />
                            <%--<div id="btnInformePagos" class="linkButton" onclick="">
                                <label id="Label25" style="padding-right:3px;">Informe</label>
                            </div>--%>
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
                                        <label id="Label7" class="Label" >Id Pago:</label>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentIdPago" type="text" class="TextBoxRead" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>
                                    <td>
                                        <%--<table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div6" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                </td>
                                            </tr>
                                        </table>--%>
                                    </td>  
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label8" class="Label" >Apoderado:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentIdApoderado" type="hidden" />
                                        <input id="txtCurrentApoderado" type="text" class="TextBoxRead" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>  
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div10" style="cursor:hand;" class="ButtonLupa" onclick="onSearchNewApoderadoClick();">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td> 
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label15" class="Label" >Contrato:</label>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentContratoId" type="hidden" />
                                        <input id="txtCurrentContrato" type="text" class="TextBoxRead" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div12" style="cursor:hand;" class="ButtonLupa" onclick="onSearchNewContratoClick();">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>  
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label9" class="Label" >Fecha Pago:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <%--<input id="txtCurrentFechaPago" type="text" class="TextBoxWrite" maxlength="10" style="width:180px"/>--%>
                                         <asp:TextBox ID="txtCurrentFechaPago" Width="180px" runat="server" CssClass="TextBoxWrite"></asp:TextBox>
                                        <cc1:CalendarExtender ID="CalendarExtender1" runat="server"
                                            TargetControlID="txtCurrentFechaPago" FirstDayOfWeek="Monday" Format="dd/MM/yyyy"/>
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label10" class="Label" >Año Cuota:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <%--<input id="txtCurrentAnoCuota" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>--%>
                                        <select id="ddlCurrentAnoCuota" class="DropDownListWrite" style="width:100px" onclick="">
                                            <option value="Select">Seleccionar</option>    
                                            <option value="2010">2010</option>    
                                            <option value="2011">2011</option>    
                                            <option value="2012">2012</option>    
                                            <option value="2013">2013</option>    
                                            <option value="2014" selected="selected">2014</option>    
                                            <option value="2015">2015</option>    
                                            <option value="2016">2016</option>    
                                        </select>
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label11" class="Label" >Mes Cuota:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <%--<input id="txtCurrentMesCuota" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>--%>
                                        <select id="ddlCurrentMesCuota" class="DropDownListWrite" style="width:100px" onclick="">
                                            <option value="Select">Seleccionar</option>    
                                            <option value="1">Enero</option>    
                                            <option value="2">Febrero</option>    
                                            <option value="3">Marzo</option>    
                                            <option value="4">Abril</option>    
                                            <option value="5">Mayo</option>    
                                            <option value="6">Junio</option>    
                                            <option value="7">Julio</option>    
                                            <option value="8">Agosto</option>    
                                            <option value="9">Septiembre</option>    
                                            <option value="10" selected="selected">Octubre</option>    
                                            <option value="11">Noviembre</option>    
                                            <option value="12">Diciembre</option>    
                                        </select>
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label17" class="Label" >Monto:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentMonto" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label18" class="Label" >Tipo Pago:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <select id="ddlCurrentTipoPago" style="width:180px" onclick="">
                                            <option value="Select">Seleccionar</option>    
                                            <option value="C" selected="selected">Completo</option>
                                            <option value="A">Abono</option>
                                        </select> 
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label24" class="Label" >Comprobante:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentComprobante" type="text" class="TextBoxWrite" maxlength="25" style="width:180px"/>
                                    </td>   
                                </tr>
                                <tr>
                                        <td align="right" width="120px">
                                            <label id="Label19" class="Label" >Observaciones:</label>
                                        </td> 
                                        <td style="padding-left:5px">
                                            <textarea id="txtCurrentObs" rows="4" cols="40" class="TextBoxWrite">
                                            </textarea> 
                                        
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
    <div id="divSearchPagosPopup" style="display:none; height:auto; width:auto; max-width: 550px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
            <table id= "tblContratoesPopup" border="0px" cellpadding="0px" cellspacing="0px">
                <tr>
                    <td>
                        <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                            <tr>
                                <td class="tdLikeMenu" align="center">
                                    <label class="LabelWhite" style="margin-left:3px">Busqueda Pagos</label>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
                <tr>
                    <td>

                        <div id="divSearchDetailContratoesPopup" class="panel" style="width:637px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="lblSearchRutFilter" class="Label" >Pago:</label>
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
                                                    <label id="lblSearchApellidosFilter" class="Label" >Apoderado:</label>
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
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <label id="Label13" class="Label" >Contrato:</label>
                                                </td>
                                                <td>
                                                    <input id="txtSearchNombresFilter" class="TextBoxWrite" type="text"  
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
                        <div id="divSearchContratoesPopUpSearchResults" style="max-height:150px; overflow:auto;">
                            <table class="GridTable">
                                <thead id="thSearchContratoesTableHeader">
                                    <tr>
                                        <th style="width:130px">
                                            Pago
                                        </th>
                                        <th style="width:250px">
                                            Apoderado
                                        </th>
                                        <th style="width:250px">
                                            Contrato
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
                                    <div id="BtnCloseSearchContratoesPopUp" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchManufacturersPopUpClick()">                                            
                                        Cerrar
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
            </table>
        </div>

    <div id="divSearchApoderadosPopup" style="display:none; height:auto; width:auto; max-width: 650px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
        <table id= "tblApoderadosPopup" border="0px" cellpadding="0px" cellspacing="0px">
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                        <tr>
                            <td class="tdLikeMenu" align="center">
                                <label class="LabelWhite" style="margin-left:3px">Busqueda Apoderados</label>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
            <tr>
                <td>

                    <div id="div1" class="panel" style="width:637px; height:65px; overflow:hidden" >
                        <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr>
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td >
                                                <label id="Label6" class="Label" >Rut:</label>
                                            </td>
                                            <td>
                                                <input id="Text1" class="TextBoxWrite" type="text"  
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
                                                <label id="Label16" class="Label" >Apellidos:</label>
                                            </td>
                                            <td>
                                                <input id="Text2" class="TextBoxWrite" type="text"  
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
                                                <label id="Label20" class="Label" >Nombres:</label>
                                            </td>
                                            <td>
                                                <input id="Text3" class="TextBoxWrite" type="text"  
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
                    <div id="divSearchApoderadosPopUpSearchResults" style="max-height:150px; overflow:auto;">
                        <table class="GridTable">
                            <thead id="thSearchApoderadosPopupTableHeader">
                                <tr>
                                    <th style="width:50px">
                                        Id
                                    </th>
                                    <th style="width:100px">
                                        Rut
                                    </th>
                                    <th style="width:200px">
                                        Nombre
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
                                <div id="Div2" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchManufacturersPopUpClick();">                                            
                                    Cerrar
                                </div>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
        </table>
    </div>

    <div id="divSearchContratosPopup" style="display:none; height:auto; width:auto; max-width: 650px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
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
                                <div id="Div7" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchContratosPopUpClick()">                                            
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
