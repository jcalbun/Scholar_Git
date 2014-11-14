<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Trayecto.aspx.cs" Inherits="TCSWebSite.Trayecto" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
    <head id="Head1" runat="server">
        <title>.: Sistema de Transporte Escolar :.</title>
        <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />

        <script src="js/Common.js" type="text/javascript"></script>
        <script src="js/Trayecto.js" type="text/javascript"></script>
        
        <style type="text/css">
            .style4
            {
                width: 151px;
            }
            .style5
            {
                width: 379px;
            }
            .style6
            {
                width: 200px;
            }
        </style>
    </head>
<body onload="onFormLoad();">
    <form id="frmTrayectos" runat="server" autocomplete="off">
    <cc1:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server"></cc1:ToolkitScriptManager> 
    <div style="height: 400px"> 
        <div id="divScreenTitle" style="width:100%" class="tdLikeMenu">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                        Trayectos
                    </td>
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
                        <table style="width:300px; margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr id="Tr1">
                                <td>
                                    <table>
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="Label5" class="Label" >Estudiante:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtEstudiante" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>  
                                           <%-- <td>
                                                <table style="margin:0px; height: 17px;" border="0px" align="left" 
                                                    cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div8" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>--%>   
                                        </tr>
                                        <tr style="display:none">
                                            <td align="right" width="220px">
                                                <label id="lblApoderado" class="Label" >Trayecto:</label>
                                            </td>
                                            <td style="padding-left:5px">
                                                <input id="txtIdTrayecto" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px; height: 17px;" border="0px" align="left" 
                                                    cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnShowSearchTrayecto" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>  
                                        </tr> 
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="Label1" class="Label" >Origen:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtOrigen" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>  
                                            <%--<td>
                                                <table style="margin:0px; height: 17px;" border="0px" align="left" 
                                                    cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div6" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>--%>   
                                        </tr> 
                                        <tr>
                                            <td align="right" width="220px">
                                                <label id="Label2" class="Label" >Destino:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtDestino" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>   
                                            <%--<td>
                                                <table style="margin:0px; height: 17px;" border="0px" align="left" 
                                                    cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div7" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td> --%> 
                                        </tr>
                                       <%-- <tr>
                                            <td align="right" width="220px">
                                                <label id="Label4" class="Label" >Tipo:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <select id="ddlTipoTrayecto" style="width:180px" onclick="">
                                                    <option value="Select"></option>    
                                                </select> 
                                            </td>   
                                        </tr> --%>
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

        <div class="padLine"></div>

        <div id="divResults" class="panel" style="display:none;height:auto; width:100%; max-height:170px;">
            <div id="divSearchResultsTableTitles" style="width:auto;height:auto;">  
                    
                <table class="GridTable" style="width:700px;">
                    <thead id="thResultsFixedHead">
                        <tr>
                            <th align="center">
                                <label id="lblSRIdTrayecto" runat="server">Trayecto</label>
                            </th>
                            <th align="center">
                                <label id="lblSROrigen" runat="server">Origen</label>
                            </th>
                            <th align="center" class="style6">
                                <label id="lblSRDestino" runat="server">Destino</label>
                            </th>
                            <th align="center">
                                <label id="Label20" runat="server">Tipo</label>
                            </th>
                            <th align="center">
                                <label id="Label18" runat="server">Estudiante</label>
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
                    <td align="left" class="LabelWhite" id="lblCurrentEstudianteTitle">
                        Trayecto Seleccionado
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
                            <div id="btnSave" class="linkButton" onclick="onBtnSaveClick()">
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
                                        <label id="Label3" class="Label" >Trayecto:</label>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentId" type="text" class="TextBoxRead" maxlength="10" style="width:100px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>
                                    <td>
                                                
                                    </td>  
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label6" class="Label" >Estudiante:</label>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentIdEstudiante" type="text" class="TextBoxRead" maxlength="10" style="width:100px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div1" style="cursor:hand;" class="ButtonLupa" onclick="onSearchNewEstudianteClick()">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentEstudiante" type="text" class="TextBoxRead" maxlength="10" style="width:250px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>
                                </tr> 
                                
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label7" class="Label" >Origen:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentOrigen" type="text" class="TextBoxRead" maxlength="10" style="width:100px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>  
                                    <td>
                                        <table style="margin:0px; height: 17px;" border="0px" align="left" 
                                            cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div9" style="cursor:hand;" class="ButtonLupa" onclick="onSearchNewEstablecimientosClick();">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentOrigenDir" type="text" class="TextBoxRead" maxlength="10" style="width:250px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>  
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label8" class="Label" >Destino:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="hidCurrentIdApoderado" type="hidden" />
                                        <input id="hidCurrentIdEstablecimiento" type="hidden" />
                                        <input id="txtCurrentDestino" type="text" class="TextBoxRead" maxlength="10" style="width:100px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>   
                                    <td>
                                        <table style="margin:0px; height: 17px;" border="0px" align="left" 
                                            cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div10" style="cursor:hand;" class="ButtonLupa" onclick="onSearchNewEstablecimientos2Click();">...</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td> 
                                     <td style="padding-left:5px">
                                        <input id="txtCurrentDestinoDir" type="text" class="TextBoxRead" maxlength="10" style="width:250px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>  
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label9" class="Label" >Tipo:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <select id="ddlCurrentTipo" style="width:105px" onclick="">
                                            <option value="S">Seleccionar</option>    
                                            <option value="I" selected="selected">Ida</option>    
                                            <option value="R">Regreso</option>
                                        </select> 
                                    </td>   
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label10" class="Label" >Días Semana:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentLunes" type="checkbox" tabindex="3"/> <label id="Label13" class="Label" >Lunes</label>
                                    </td>  
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentMartes" type="checkbox" tabindex="3"/> <label id="Label21" class="Label" >Martes</label>
                                    </td>    
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                                
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentMiercoles" type="checkbox" tabindex="3"/> <label id="Label22" class="Label" >Miercoles</label>
                                    </td>   
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentJueves" type="checkbox" tabindex="3"/> <label id="Label23" class="Label" >Jueves</label>
                                    </td>  
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                                
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentViernes" type="checkbox" tabindex="3"/> <label id="Label24" class="Label" >Viernes</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentSabado" type="checkbox" tabindex="3"/> <label id="Label25" class="Label" >Sabado</label>
                                    </td>     
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                                
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="chkCurrentDomingo" type="checkbox" tabindex="3"/> <label id="Label26" class="Label" >Domingo</label>
                                    </td>   
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label27" class="Label" >Horario Origen:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentHoraOrigen" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>  
                                </tr> 
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label28" class="Label" >Horario Destino:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentHoraDestino" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
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
    <div id="divSearchApoderadosPopup" style="display:none; height:auto; width:350px; max-width: 350px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
            <table id= "tblTrayectosPopup" border="0px" cellpadding="0px" cellspacing="0px">
                <tr>
                    <td>
                        <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 350px;">
                            <tr>
                                <td class="tdLikeMenu" align="center">
                                    <label class="LabelWhite" style="margin-left:3px">Busqueda Trayectos</label>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
                <tr>
                    <td>

                        <div id="divSearchDetailTrayectosPopup" class="panel" style="width:350px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="lblSearchRutFilter" class="Label" >Estudiante:</label>
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
                                                    <label id="lblSearchApellidosFilter" class="Label" >Trayecto:</label>
                                                </td>
                                                <td>
                                                    <input id="txtSearchApellidosFilter" class="TextBoxWrite" type="text"  
                                                        style="width:160px" maxlength="25"  onkeyup=""/>
                                                        <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerDescriptionFilterKeyUp(this)"/>--%>
                                                       
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>  
               
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <div id="divSearchTrayectosPopUpSearchResults" style="max-height:150px; overflow:auto;">
                            <table class="GridTable">
                                <thead id="thSearchTrayectosTableHeader">
                                    <tr>
                                        <th class="style4">
                                            Estudiante
                                        </th>
                                        <th class="style5">
                                            Trayecto
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
                                    <div id="BtnCloseSearchApoderadosPopUp" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchApoderadosPopUpClick()">                                            
                                        Cerrar
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
            </table>
        </div>
    
    <div id="divSearchEstudiantesPopup" style="display:none; height:auto; width:610px; max-width: 610px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
            <table id= "tblEstudiantesPopup" border="0px" cellpadding="0px" cellspacing="0px">
                <tr>
                    <td>
                        <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 610px">
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

                        <div id="divSearchDetailEstudiantesPopup" class="panel" style="width:608px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="Label4" class="Label" >Rut:</label>
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
                                                    <label id="Label11" class="Label" >Apellidos:</label>
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
                                                    <label id="Label12" class="Label" >Nombres:</label>
                                                </td>
                                                <td>
                                                    <input id="Text3" class="TextBoxWrite" type="text"  
                                                        style="width:160px" maxlength="25"  onkeyup=""/>
                                                        <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerDescriptionFilterKeyUp(this)"/>--%>
                                                       
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="bottom" align="right" style=" width:2px; height:50px; " >
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
                                        <th style="width:150px">
                                            Rut
                                        </th>
                                        <th style="width:340px">
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

    <div id="divNewSearchEstablecimientosPopup" style="display:none;height:auto; width:400px; max-width: 400px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
            <table id= "tblEstablecimientosPopup" border="0px" cellpadding="0px" cellspacing="0px">
                <tr>
                    <td>
                        <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 400px;">
                            <tr>
                                <td class="tdLikeMenu" align="center">
                                    <label class="LabelWhite" style="margin-left:3px">Busqueda Origen</label>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
                <tr>
                    <td>

                        <div id="divNewSearchDetailEstablecimientosPopup" class="panel" style="width:398px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="Label14" class="Label" >Id:</label>
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
                                                    <label id="Label16" class="Label" >Direccion:</label>
                                                </td>
                                                <td>
                                                    <input id="txtSearchNombresFilter" class="TextBoxWrite" type="text"  
                                                        style="width:160px" maxlength="25"  onkeyup=""/>
                                                        <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerDescriptionFilterKeyUp(this)"/>--%>
                                                       
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="bottom" align="right" style=" width:1px; height:50px;" >
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
                                        <th style="width:100px">
                                            Id
                                        </th>
                                        <th style="width:292px">
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
                                    <div id="Div2" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseNewSearchEstablecimientosPopUpClick();">                                            
                                        Cerrar
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
            </table>
        </div>

    <div id="divNewSearchEstablecimientos2Popup" style="display:none; height:auto; width:400px; max-width: 400px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
        <table id= "tblEstablecimientos2Popup" border="0px" cellpadding="0px" cellspacing="0px">
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                        <tr>
                            <td class="tdLikeMenu" align="center">
                                <label class="LabelWhite" style="margin-left:3px">Busqueda Destino</label>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
                <tr>
                    <td>

                        <div id="divNewSearchDetailEstablecimientos2Popup" class="panel" style="width:398px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="Label15" class="Label" >Id:</label>
                                                </td>
                                                <td>
                                                    <input id="Text5" class="TextBoxWrite" type="text"  
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
                                                    <label id="Label17" class="Label" >Direccion:</label>
                                                </td>
                                                <td>
                                                    <input id="Text6" class="TextBoxWrite" type="text"  
                                                        style="width:160px" maxlength="25"  onkeyup=""/>
                                                        <%--onkeyup="window.frames.iframeContent.onTxtSearchManufacturerDescriptionFilterKeyUp(this)"/>--%>
                                                       
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                    <td valign="bottom" align="right" style=" width:1px; height:50px;" >
                                    </td>
                                </tr>
                            </table>
                        </div>  
               
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <div id="divNewSearchEstablecimientos2PopUpSearchResults" style="max-height:150px; overflow:auto;">
                            <table class="GridTable">
                                <thead id="thNewSearchEstablecimientos2TableHeader">
                                    <tr>
                                        <th style="width:100px">
                                            Id
                                        </th>
                                        <th style="width:292px">
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
                                    <div id="Div3" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseNewSearchEstablecimientos2PopUpClick();">                                            
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
