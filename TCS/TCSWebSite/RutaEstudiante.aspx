<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RutaEstudiante.aspx.cs" Inherits="TCSWebSite.RutaEstudiante" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" >
    <head id="Head1" runat="server">
        <title>.: Sistema de Transporte Escolar :.</title>
        <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />

        <script src="js/Common.js" type="text/javascript"></script>
        <script src="js/RutaEstudiante.js" type="text/javascript"></script>
        
    </head>
<body onload="onFormLoad();">
    <form id="frmConductores" runat="server" autocomplete="off">
    <cc1:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server"></cc1:ToolkitScriptManager> 
    
     <div style="height: 400px"> 
        <div id="divScreenTitle" style="width:100%" class="tdLikeMenu">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                        Ruta Estudiante</td>
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
                        <table style="width:200px; margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                            <tr id="Tr1">
                                <td>
                                    <table>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="lblConductor" class="Label" >Ruta:</label>
                                            </td>
                                            <td style="padding-left:5px">
                                                <input id="txtRuta" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <%--<td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="btnShowSearchConductor" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>--%>  
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
                                           <%-- <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div9" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td> --%>    
                                        </tr>
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label1" class="Label" >Estudiante:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtEstudiante" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <%--<td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td>
                                                            <div id="Div8" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>--%>
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
                    
                <table class="GridTable">
                    <thead id="thResultsFixedHead">
                        <tr>
                            <th align="center" style="width:30px;">
                                Id
                            </th>
                            <th align="center" style="width:200px;">
                                Ruta
                            </th>
                            <th align="center" style="width:300px;">
                               Trayecto
                            </th>
                            <th align="center" style="width:50px;">
                                Tipo
                            </th>
                            <th align="center" style="width:250px;">
                                Estudiante
                            </th>
                            
                        </tr>
                    </thead>
                </table>
                    
            </div> 
            <div id="divSearchResultsTableContainer" style="overflow:auto;width:auto;max-height:145px">
                <table id = "tblResults" class="GridTable">
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
                    <td align="left" class="LabelWhite" id="lblCurrentConductorTitle">
                        Ruta Estudiante Seleccionado
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
                        <%--<td style="padding:2px">
                            <div id="btnEdit" class="linkButton" onclick="">
                                <label id="lblEdit" style="padding-right:3px;">Editar</label>
                            </div>
                        </td>--%>
                        <td style="padding:2px">        
                            <div id="btnSave" class="linkButton" onclick="onBtnSaveClick();">
                                <label id="lblSave" style="padding-right:3px;">Guardar</label>
                            </div> 
                        </td>
                        <td style="padding:2px">        
                            <div id="btnDelete" class="linkButton" onclick="onBtnDeleteClick();">
                                <label id="Label2" style="padding-right:3px;">Eliminar</label>
                            </div> 
                        </td>
                        <td style="padding:2px">
                            <div id="btnCancel" class="linkButton" onclick="onBtnCancelClick();">
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
                                    <input id="txtCurrentRutaId" type="text" class="TextBoxWrite" style="width:100px" 
                                        onkeyup  = ""
                                        onchange = ""/>
                                </td>
                                <td style="width:5px; padding-left:0px;" align="left">&nbsp;</td>  
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td>
                                                <div id="Div12" style="cursor:hand;" class="ButtonLupa" onclick="onBtnCurrentRutaClick();">...</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="padding-left:5px">
                                    <input id="txtCurrentRutaDescripcion" type="text" class="TextBoxRead" style="width:250px" 
                                        onkeyup  = ""
                                        onchange = ""/>
                                </td>
                                                                                                                       
                            </tr> 
                            <tr>
                                <td align="right" width="120px">
                                    <label id="Label9" class="Label" >Estudiante:</label>
                                </td> 
                                <td style="padding-left:5px">
                                    <input id="txtCurrentEstudianteId" type="text" class="TextBoxWrite" style="width:100px" 
                                        onkeyup  = ""
                                        onchange = ""/>
                                </td>   
                                <td style="width:5px;  padding-left:0px;" align="left">&nbsp;</td>  
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td>
                                                <div id="Div6" style="cursor:hand;" class="ButtonLupa" onclick="onSearchNewEstudianteClick();">...</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="padding-left:5px">
                                    <input id="txtCurrentEstudianteDescripcion" type="text" class="TextBoxRead" style="width:250px" 
                                        onkeyup  = ""
                                        onchange = ""/>
                                </td> 
                            </tr>               
                            <tr>
                                <td align="right" width="120px">
                                    <label id="Label8" class="Label" >Trayecto:</label>
                                </td> 
                                <td style="padding-left:5px">
                                    <input id="txtCurrentTrayectoId" type="text" class="TextBoxWrite" style="width:100px" 
                                        onkeyup  = ""
                                        onchange = ""/>
                                </td> 
                                <td style="width:5px;  padding-left:0px;" align="left">&nbsp;</td>   
                                <td>
                                    <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                        <tr>
                                            <td>
                                                <div id="Div11" style="cursor:hand;" class="ButtonLupa" onclick="onBtnCurrentTrayectoClick();">...</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="padding-left:5px">
                                    <input id="txtCurrentTrayectoDescripcion" type="text" class="TextBoxRead" maxlength="10" style="width:250px" 
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
    <%--POPUP RUTAS DE TRANSPORTE--%>
    <div id="divSearchRutasPopup" style="display:none;height:auto; width:400px; max-width: 400px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
        <table id= "tblRutasPopup" border="0px" cellpadding="0px" cellspacing="0px">
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 400px;">
                        <tr>
                            <td class="tdLikeMenu" align="center">
                                <label class="LabelWhite" style="margin-left:3px">Busqueda Rutas Transporte</label>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
            <tr>
                <td>

                    <div id="divSearchDetailRutasPopup" class="panel" style="width:398px; height:65px; overflow:hidden" >
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
                                                <label id="Label16" class="Label" >Descripcion:</label>
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
                    <div id="divSearchRutasPopUpSearchResults" style="max-height:150px; overflow:auto;">
                        <table class="GridTable">
                            <thead id="thSearchRutasTableHeader">
                                <tr>
                                    <th style="width:100px">
                                        Id
                                    </th>
                                    <th style="width:292px">
                                        Descripcion
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
                                <div id="Div2" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchRutasPopUpClick();">                                            
                                    Cerrar
                                </div>
                            </td>
                        </tr>
                    </table>
                </td> 
            </tr>
        </table>
    </div>
    <%--POPUP ESTUDIANTE--%>
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
                                                <label id="Label3" class="Label" >Rut:</label>
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
    <%--POPUP TRAYECTOS--%>
    <div id="divNewSearchTrayectoPopup" style="display:none;height:auto; width:600px; max-width: 600px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
        <table id= "tblTrayectoPopup" border="0px" cellpadding="0px" cellspacing="0px">
            <tr>
                <td>
                    <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                        <tr>
                            <td class="tdLikeMenu" align="center">
                                <label class="LabelWhite" style="margin-left:3px">Busqueda Trayecto</label>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
                <tr>
                    <td>

                        <div id="divNewSearchDetailTrayectoPopup" class="panel" style="width:598px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="Label15" class="Label" >Id:</label>
                                                </td>
                                                <td>
                                                    <input id="txtPopupIdTrayecto" class="TextBoxWrite" type="text"  
                                                        style="width:60px" maxlength="5"  onkeyup=""/>
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
                                                    <label id="Label17" class="Label" >Origen:</label>
                                                </td>
                                                <td>
                                                    <input id="txtPopupOrigenTrayecto" class="TextBoxWrite" type="text"  
                                                        style="width:130px" maxlength="25"  onkeyup=""/>
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
                                                    <label id="Label5" class="Label" >Destino:</label>
                                                </td>
                                                <td>
                                                    <input id="Text5" class="TextBoxWrite" type="text"  
                                                        style="width:130px" maxlength="25"  onkeyup=""/>
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
                        <div id="divNewSearchTrayectoPopUpSearchResults" style="max-height:150px; overflow:auto;">
                            <table class="GridTable">
                                <thead id="thNewSearchTrayectoTableHeader">
                                    <tr>
                                        <th style="width:100px">
                                            Id
                                        </th>
                                        <th style="width:200px">
                                           Origen
                                        </th>
                                        <th style="width:200px">
                                           Destino
                                        </th>
                                        <th style="width:100px">
                                           Tipo
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
                                    <div id="Div3" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchTrayectoPopUpClick();">                                            
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
