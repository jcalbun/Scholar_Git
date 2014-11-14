<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ChangePassword.aspx.cs" Inherits="TCSWebSite.ChangePassword" %>

<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

   <head id="Head1" runat="server">
      <title>.: Tender Contribution Simulator :.</title>
      <link href="CSS/CSAV.css" rel="stylesheet" type="text/css" />
      <link href="CSS/Common.css" rel="stylesheet" type="text/css" />
      <script src="js/Common.js" type="text/javascript"></script>
      <script src="js/ChangePwd.js" type="text/javascript"></script>
   </head>
   <body  onload="onLoad();">
      <form id="frmChangePassword" runat="server" >
         <asp:ScriptManager ID="ScriptManager1" runat="server" > 
         </asp:ScriptManager>
         
         <div style="width:100%; height: 500px; overflow:auto"> 
             <div id="TitleDiv" style="width:100%" class="tdLikeMenu">
                <table border="0px" cellpadding="0px" cellspacing="0px" style="width:100%">
                    <tr>
                        <td align="left" class="LabelWhite" style="font-size:medium; border:solid 1px #000000;">
                            Change Password
                        </td>
                    </tr>
                </table>
             </div>

             
             <div id="pnlNewPE" style="width:46px;" class="ToolBar">
                <table border="0px" cellpadding="0px" cellspacing="0px">
                        <tr align="left">
                            <td class="LabelWhite" style="font-size:medium; padding:2px;" >
                                <div id="btnSearch" class="linkButton" onclick="onChangePwdClick();">
                                    <label style="padding-right:3px;">Save</label>
                                </div>
                            </td>
                            <td class="LabelWhite" style="font-size:medium; padding:2px;" >
                                <div id="btnCancel" class="linkButton" onclick="onCancelClick();">
                                    <label style="padding-right:3px;">Cancel</label>
                                </div>
                            </td>
                        </tr>
                    </table>
            </div>
            
             <div id="SearchPanel" class="panel" style="width:80%; height:auto; overflow:hidden" >
                <table border="0px"  cellpadding="0px"  cellspacing="0px" style="margin:5px" >
                    <tr>
                        <td style="padding-left:5px;">
                            <label class="Label">User Name:</label>
                        </td>
                        <td style="padding-left:5px;">
                            <input id="txtUserName" type="text" class="TextBoxWrite" disabled="disabled" />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left:5px;">
                            <label class="Label">Current Password:</label>
                        </td>
                        <td style="padding-left:5px;">
                            <input id="txtCurrentPassword" type="password" class="TextBoxWrite"/>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left:5px;">
                            <label class="Label">New Password:</label>
                        </td>
                        <td style="padding-left:5px;">
                            <input id="txtNewPassword" type="password" class="TextBoxWrite"/>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-left:5px;">
                            <label class="Label">Confirm New Password:</label>
                        </td>
                        <td style="padding-left:5px;">
                            <input id="txtConfirmNewPassword" type="password" class="TextBoxWrite"/>
                        </td>
                    </tr>
                
                </table>
            </div>
        </div>
        
        <%--Progress Bar--%> 
        <div id="divProgressBar" style="width:120px;height:35px;display:none;overflow:hidden">
            <table>
                <tr align="center">
                    <td style="width:30px">
                        <img alt="LoadingScr" src="images/icons/8-1.gif" id="imgStandBy" style="width:30px;height:30px"/>
                    </td>
                    <td align="center">
                        <label id="lblPleaseWait" class="Label">Please Wait...</label>
                    </td>
                </tr>
            </table>
        </div>
      </form>
   </body>
</html>
