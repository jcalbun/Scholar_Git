﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Perfiles.aspx.cs" Inherits="TCSWebSite.Perfiles" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml" >
    <head id="Head1" runat="server">
        <title>.: Sistema de Transporte Escolar :.</title>
        <link href="css/TCS.css" rel="stylesheet" type="text/css" />
        <link href="CSS/Common.css" rel="stylesheet" type="text/css" />

        <script src="js/Common.js" type="text/javascript"></script>
        <script src="js/Perfiles.js" type="text/javascript"></script>
        
        </head>
<body onload="onFormLoad();">
    <form id="frmPerfiles" runat="server" autocomplete="off">
    <cc1:ToolkitScriptManager ID="ToolkitScriptManager1" runat="server"></cc1:ToolkitScriptManager> 
    
     <div style="height: 338px"> 
        <div id="divScreenTitle" style="width:100%" class="tdLikeMenu">
            <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                <tr>
                    <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                        Perfiles</td>
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
                                                <label id="lblPerfil" class="Label" >Perfil:</label>
                                            </td>
                                            <td style="padding-left:5px">
                                                <input id="txtCodigoFilter" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                                    onkeyup  = ""
                                                    onchange = ""/>
                                            </td>
                                            <td>
                                                <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                                    <tr>
                                                        <td style="cursor:hand;">
                                                            <div id="btnShowSearchPerfil" style="cursor:hand;" class="ButtonLupa" onclick="onBtnShowSearchPerfilesPopupClick();">...</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>  
                                        </tr> 
                                        <tr>
                                            <td align="right" width="120px">
                                                <label id="Label1" class="Label" >Nombre:</label>
                                            </td> 
                                            <td style="padding-left:5px">
                                                <input id="txtNombreFilter" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
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

        <div id="divResults" class="panel" style="display:none;height:auto; width:100%; max-height:160px;">
            <div id="divSearchResultsTableTitles" style="width:auto;height:auto;">  
                    
                <table class="GridTable" style="width:700px;">
                    <thead id="thResultsFixedHead">
                        <tr>
                            <th align="center">
                                <label id="lblSRPerfilId" runat="server">Perfil</label>
                            </th>
                            <th align="center">
                                <label id="lblSRRut" runat="server">Nombre</label>
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
                    <td align="left" class="LabelWhite" id="lblCurrentPerfilTitle">
                        Perfil Seleccionado
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
                                        <label id="Label7" class="Label" >Perfil:</label>
                                    </td>
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentCodigo" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
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
                                        <label id="Label8" class="Label" >Nombre:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentNombre" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>  
                                    <td>
                                        <%--<table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <div id="Div10" style="cursor:hand;" class="ButtonLupa" onclick="">...</div>
                                                </td>
                                            </tr>
                                        </table>--%>
                                    </td> 
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label2" class="Label" >Descripcion:</label>
                                    </td> 
                                    <td style="padding-left:5px">
                                        <input id="txtCurrentDescripcion" type="text" class="TextBoxWrite" maxlength="10" style="width:180px" 
                                            onkeyup  = ""
                                            onchange = ""/>
                                    </td>   
                                </tr>
                                <tr>
                                    <td align="right" width="120px">
                                        <label id="Label12" class="Label" >Activo:</label>
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
    <div id="divSearchPerfilesPopup" style="display:none; height:auto; width:auto; max-width: 550px; max-height:400px; min-height:50px; overflow:hidden; margin:5px;">
            <table id= "tblPerfilesPopup" border="0px" cellpadding="0px" cellspacing="0px">
                <tr>
                    <td>
                        <table border="0px" cellpadding="0px" cellspacing="0px" style="width: 100%">
                            <tr>
                                <td class="tdLikeMenu" align="center">
                                    <label class="LabelWhite" style="margin-left:3px">Busqueda Perfiles</label>
                                </td>
                            </tr>
                        </table>
                    </td> 
                </tr>
                <tr>
                    <td>

                        <div id="divSearchDetailPerfilesPopup" class="panel" style="width:637px; height:65px; overflow:hidden" >
                            <table style="width:auto; margin:5px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                <tr>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td >
                                                    <label id="lblSearchRutFilter" class="Label" >Perfil:</label>
                                                </td>
                                                <td>
                                                    <input id="txtCodigoFilterPopup" class="TextBoxWrite" type="text"  
                                                        style="width:120px" maxlength="5"  
                                                        onkeyup="window.frames.iframeContent.onTxtCodigoFilterPopupKeyUp(this)"/>
                                                       
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td style="width:15px; padding-left:0px;" align="left">&nbsp;</td>
                                    <td>
                                        <table style="margin:0px" border="0px" align="left" cellpadding="0px" cellspacing="0px" >
                                            <tr>
                                                <td>
                                                    <label id="lblSearchApellidosFilter" class="Label" >Nombre:</label>
                                                </td>
                                                <td>
                                                    <input id="txtNombreFilterPopup" class="TextBoxWrite" type="text"  
                                                        style="width:160px" maxlength="25"  
                                                        onkeyup="window.frames.iframeContent.onTxtNombreFilterPopupKeyUp(this)"/>
                                                       
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
                    <td>
                        <div id="divSearchPerfilesPopUpSearchResults" style="max-height:150px; overflow:auto;">
                            <table class="GridTable">
                                <thead id="thSearchPerfilesPopupTableHeader">
                                    <tr>
                                        <th style="width:130px">
                                            Perfil
                                        </th>
                                        <th style="width:200px">
                                            Nombre
                                        </th>
                                        <th style="width:200px">
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
                                    <div id="BtnCloseSearchPerfilesPopUp" class="linkButton" style="display:inline; margin-left: 5px;" onclick="window.frames.iframeContent.onBtnCloseSearchPopUpClick()">                                            
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
