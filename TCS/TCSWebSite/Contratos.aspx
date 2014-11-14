<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Contratos.aspx.cs" Inherits="TCSWebSite.Contratos" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" >
    <head id="Head1" runat="server">
        <title>.: Sistema de Transporte Escolar :.</title>
        <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />

        <script src="js/Common.js" type="text/javascript"></script>
        <script src="js/Contratos.js" type="text/javascript"></script>
        
        </head>
<body onload="onFormLoad();">
    <form id="frmContratoes" runat="server" autocomplete="off">
    <cc1:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server"></cc1:ToolkitScriptManager> 
    
     <div style="height: 615px"> 
        <div id="divScreenTitle" style="width:100%" class="tdLikeMenu">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                        Contratos</td>
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
                                                <label id="lblContrato" class="Label" >Contrato:</label>
                                            </td>
                                            <td style="padding-left:5px">
                                                <input id="txtContratoId" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <%--<table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnShowSearchContrato" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>--%>
                                            </td>  
                                        </tr> 
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label1" class="Label" >Apoderado:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtApoderado" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
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
                                                <label id="Label3" class="Label" >Estudiante:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtEstudiante" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>   
                                            <td>
                                                <%--<table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div9" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>--%>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label5" class="Label" >Año Contrato:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtAnoContrato" type="text" class="TextBoxWrite" maxlength="4" style="width:80px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>   
                                        </tr>
                                        <%--<tr>
                                            <td align="right" width="120px">
                                                <label id="Label12" class="Label" >Fecha Pago Mensual:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <select id="ddlFechaPago" style="width:180px" onclick="">
                                                    <option value="Select" selected="selected">Seleccionar</option>    
                                                    <option value="1">5</option>    
                                                    <option value="2">15</option>    
                                                    <option value="3">30</option>    
                                                </select> 
                                            </td> 
                                        </tr>--%>
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

        <div id="divResults" class="panel" style="display:none;height:auto; width:100%; max-height:160px;">
            <div id="divSearchResultsTableTitles" style="width:auto;height:auto;">  
                    
                <table class="GridTable">
                    <thead id="thResultsFixedHead">
                        <tr>
                            <th align="center" style="width:80px">
                               Contrato
                            </th>
                            <th align="center" style="width:250px">
                                Apoderado
                            </th>
                            <th align="center" style="width:250px">
                                Estudiante
                            </th>
                            <th align="center" style="width:80px">
                                Año Contrato
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
                        Contrato Seleccionado
                    </td>
                    <td align="right">
                        <label id="lblCurrentShowHide" class="LabelWhite" style="padding-right:5px; font-size:11px">(Ocultar detalles...)</label>
                    </td>
                </tr>
            </table>
        </div>

        <div id="divCurrentDetail" class="panel" style="width:100%; height:auto; overflow:hidden;">
            <div id="divCurrentToolBar" class="ToolBar">
                <table border="0px" cellpadding="0px" cellspacing="0px">
                    <tr align="left">
                        <td style="padding:2px">
                            <div id="btnEdit" class="linkButton" onclick="onBtnEditClick();">
                                <label id="lblEdit" style="padding-right:3px;">Editar</label>
                            </div>
                        </td>
                        <td style="padding:2px">        
                            <div id="btnSave" class="linkButton" onclick="onBtnSaveClick();">
                                <label id="lblSave" style="padding-right:3px;">Guardar</label>
                            </div> 
                        </td>
                        <td style="padding:2px">
                            <div id="btnCancel" class="linkButton" onclick="onBtnCancelClick();">
                                <label id="lblCancel" style="padding-right:3px;">Cancelar</label>
                            </div>
                        </td>
                        <td style="padding:2px">
                            <div id="btnPrint" class="linkButton" onclick="onBtnPrintClick();">
                                <label id="Label21" style="padding-right:3px;">Imprimir</label>
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
                                        <label id="Label7" class="Label" >Contrato:</label>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentContrato" type="text" 
                                            class="TextBoxRead"
                                            readonly="readonly"
                                            style="width:50px" 
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
                                        <input id="txtCurrentIdApoderado" type="text" class="TextBoxRead" maxlength="10" style="width:50px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>  
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="btnCurrentApoderado" style="cursor:hand;" class="ButtonLupa" onclick="onBtnCurrentApoderadoClick();">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentRutApoderado" type="hidden"/>
                                        <input id="txtCurrentDomicilioApoderado" type="hidden"/>
                                        <input id="txtCurrentFonoApoderado" type="hidden"/>
                                        <input id="txtCurrentNombreApoderado" type="text" class="TextBoxRead" style="width:250px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td> 
                                    
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label9" class="Label" >Estudiante:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentIdEstudiante" type="text" class="TextBoxRead" maxlength="10" style="width:50px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>   
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="btnCurrentEstudiante" style="cursor:hand;" class="ButtonLupa" onclick="onBtnCurrentEstudianteClick();">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td style="padding-left:5px">
                                        <input id="txtCurrentNombreEstudiante" type="text" class="TextBoxRead" style="width:250px"/>
                                    </td> 
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label22" class="Label" >Establecimiento:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentIdEstablecimiento" type="text" class="TextBoxRead" maxlength="10" style="width:50px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>   
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="btnCurrentEstablecimiento" style="cursor:hand;" class="ButtonLupa" onclick="onSearchNewEstablecimientosClick();">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td style="padding-left:5px">
                                        <input id="txtCurrentHorarioTrayecto" type="hidden"/>
                                        <input id="txtCurrentNombreEstablecimiento" type="text" class="TextBoxRead" style="width:250px"/>
                                    </td> 
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label10" class="Label" >Año Contrato:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <%--<input id="txtCurrentAno" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>--%>
                                        <select id="ddlCurrentAnoContrato" class="DropDownListWrite" style="width:100px" onclick="">
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
                            </table>
                            <table>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label11" class="Label" >Fecha Inicio:</label>
                                    </td>
                                    <td style="padding-left:5px"> 
                                        <asp:TextBox ID="txtCurrentFechaInicio" Width="100px" runat="server" CssClass="TextBoxWrite"></asp:TextBox>
                                        <cc1:CalendarExtender ID="txtDateFilterCalendarExtender" runat="server"
                                        TargetControlID="txtCurrentFechaInicio" FirstDayOfWeek="Monday" Format="dd/MM/yyyy"/>
                                    </td>   
                                   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label16" class="Label" >Fecha Fin:</label>
                                    </td> 
                                    <td style="padding-left:5px"> 
                                        <asp:TextBox ID="txtCurrentFechaFin" Width="100px" runat="server" CssClass="TextBoxWrite"></asp:TextBox>
                                        <cc1:CalendarExtender ID="CalendarExtender1" runat="server"
                                        TargetControlID="txtCurrentFechaFin" FirstDayOfWeek="Monday" Format="dd/MM/yyyy"/>
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label17" class="Label" >Cuota Mensual:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentMonto" type="text" class="TextBoxWrite" maxlength="10" style="width:100px" 
                                            onkeypress='return OnlyNumbers(event)'
                                            onchange = ""/>
                                       
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label18" class="Label" >Fecha Pago Mensual:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <select id="ddlCurrentFechaPago" class="DropDownListWrite" style="width:100px" onclick="">
                                            <option value="Select">Seleccionar</option>    
                                            <option value="1">5</option>    
                                            <option value="2">15</option>    
                                            <option value="3">25</option>    
                                        </select> 
                                    </td>   
                                </tr>
                                <tr>
                                        <td align="right" width="120px">
                                        <label id="Label19" class="Label" >Observaciones:</label>
                                        </td> 
                                        <td style="padding-left:5px">
                                             <textarea id="txtCurrentObs" rows="4" cols="40" class="TextBoxWrite">
                                            </textarea> 
                                            <%--<input id="txtCurrentObs" type="text" class="TextBoxWrite" maxlength="10" style="width:180px;height:60px"/>--%>
                                        </td>
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label20" class="Label" >Activo:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentActivo" type="checkbox" tabindex="3"/>
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
    <div id="divSearchContratoesPopup" style="display:none; height:auto; width:auto; max-width: 550px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
            <table id= "tblContratoesPopup" border="0px" cellpadding="0px" cellspacing="0px">
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

                        <div id="divSearchDetailContratoesPopup" class="panel" style="width:637px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="lblSearchRutFilter" class="Label" >Contrato:</label>
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
                                                    <label id="Label13" class="Label" >Estudiante:</label>
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
                                            Contrato
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

    <%--POPUP APODERADOS--%>
    <div id="divSearchApoderadosPopup" style="display:none;height:auto; width:auto; max-width: 650px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
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
                                                <label id="Label2" class="Label" >Rut:</label>
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
                                                <label id="Label4" class="Label" >Apellidos:</label>
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
                                                <label id="Label6" class="Label" >Nombres:</label>
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
                                    <th style="width:100px">
                                        Id
                                    </th>
                                    <th style="width:180px">
                                        Rut
                                    </th>
                                    <th style="width:345px">
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

    <%--POPUP ESTUDIANTES--%>
    <div id="divSearchEstudiantesPopup" style="display:none;height:auto; width:auto; max-width: 6550px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
        <table id= "tblEstudiantesPopup" border="0px" cellpadding="0px" cellspacing="0px">
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                        <tr>
                            <td class="tdLikeMenu" align="center">
                                <label class="LabelWhite" style="margin-left:3px">Busqueda Estudiantes</label>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
            <tr>
                <td>

                    <div id="divSearchDetailEstudiantesPopup" class="panel" style="width:637px; height:65px; overflow:hidden" >
                        <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr>
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td >
                                                <label id="Label12" class="Label" >Rut:</label>
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
                                                <label id="Label14" class="Label" >Apellidos:</label>
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
                                                <label id="Label15" class="Label" >Nombres:</label>
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
                    <div id="divSearchEstudiantesPopUpSearchResults" style="max-height:150px; overflow:auto;">
                        <table class="GridTable">
                            <thead id="thSearchEstudiantesTableHeader">
                                <tr>
                                    <th style="width:100px">
                                        Id 
                                    </th>
                                    <th style="width:180px">
                                        Rut
                                    </th>
                                    <th style="width:345px">
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
                                <div id="BtnCloseSearchEstudiantesPopUp" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchEstudiantesPopUpClick()">                                            
                                    Cerrar
                                </div>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
        </table>
    </div>

    <%--POPUP ESTABLECIMIENTOS--%>
    <div id="divNewSearchEstablecimientosPopup" style="display:none; height:auto; width:auto; max-width: 650px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
        <table id= "tblEstablecimientosPopup" border="0px" cellpadding="0px" cellspacing="0px">
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                        <tr>
                            <td class="tdLikeMenu" align="center">
                                <label class="LabelWhite" style="margin-left:3px">Busqueda Establecimientos</label>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
            <tr>
                <td>

                    <div id="divNewSearchDetailEstablecimientosPopup" class="panel" style="width:637px; height:65px; overflow:hidden" >
                        <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr>
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td >
                                                <label id="Label23" class="Label" >Id:</label>
                                            </td>
                                            <td>
                                                <input id="Text7" class="TextBoxWrite" type="text"  
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
                                                <label id="Label24" class="Label" >Nombre:</label>
                                            </td>
                                            <td>
                                                <input id="Text8" class="TextBoxWrite" type="text"  
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
                                                <label id="Label25" class="Label" >Direccion:</label>
                                            </td>
                                            <td>
                                                <input id="Text9" class="TextBoxWrite" type="text"  
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
                    <div id="divNewSearchEstablecimientosPopUpSearchResults" style="max-height:150px; overflow:auto;">
                        <table class="GridTable">
                            <thead id="thNewSearchEstablecimientosTableHeader">
                                <tr>
                                    <th style="width:50px">
                                        Id
                                    </th>
                                    <th style="width:100px">
                                        Nombre
                                    </th>
                                    <th style="width:200px">
                                        Direccion
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
                                <div id="Div3" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseNewSearchEstablecimientosPopUpClick();">                                            
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