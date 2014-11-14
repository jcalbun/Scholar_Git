function onLoad() {

    setTimeout("document.getElementById('txtCurrentPassword').focus()", 100);
    document.getElementById('txtUserName').value = parent._userId;
    if (parent._firstLogin == '1') {
        parent.showMsgBoxAdv('First login you must change the password before to continue.');
    }

}

function onCancelClick() {
    parent.top.frames['iframeContent'].location.href = 'Main.aspx';
}

function onChangePwdClick() {
    
    if (searchDuplicatedCharacter(trim(document.getElementById('txtNewPassword').value))) {
        parent.showMsgBoxAdv('The password can not have consecutive identical characters. Try again');
        return
    }
    if (isEmpty('txtUserName')) {
        parent.showMsgBoxAdv('You must specify the user.');
    }
    else if ( (isEmpty('txtNewPassword')) && (parent._firstLogin != '1')) {
        parent.showMsgBoxAdv('You must specify the new password');
    }
    else if (checkSpaceBlank() > 0) {
        parent.showMsgBoxAdv('whitespace is not allowed in the new password'); 
    }
    else if (trim(document.getElementById('txtNewPassword').value).length < 7) {
        parent.showMsgBoxAdv('The password must have a minimum of 7 characters');
    }
    else if (toUpCase(trim(document.getElementById('txtUserName').value)) == toUpCase(trim(document.getElementById('txtNewPassword').value))) {
        parent.showMsgBoxAdv('The password can not be equal to username. Try again');
    }
    else if (document.getElementById('txtNewPassword').value != document.getElementById('txtConfirmNewPassword').value) {
        parent.showMsgBoxAdv('Passwords do not match');
    }
    else
        ChangePassword.ChangePwd(document.getElementById('txtUserName').value, document.getElementById('txtCurrentPassword').value, document.getElementById('txtNewPassword').value, parent._applicationId, ChangePwd_Callback);
    return;
}


function checkSpaceBlank() {

    var strText = document.getElementById('txtNewPassword').value;
    var count = 0;

    if (strText.length > 0) {
        for (var i = 0; i < strText.length; i++) {
            if (strText.charAt(i) == " ") {
                count++;
            }
        }
    }
    return count;
}



function searchDuplicatedCharacter(pString) {
    for (i = 0; i < pString.length; i++) {
        charLeft = pString.charAt(i)
        charRight = pString.charAt(i + 1)
        if (charLeft == charRight) return true;
    }
    return false

}

function ChangePwd_Callback(response) {
    if (response.error != null) {
        parent.showMsgBoxAdv(response.error);
        return;
    }
    else {
        xmlUser = response.value;
        docXml = createDOM(xmlUser);
        var status = docXml.getElementsByTagName('status')[0].text;
        if (status == 'OK') {
            if (parent._firstLogin == 1) {
                parent.firstlogin = '';
                parent.GetMenu(parent._userId, parent._applicationId);
                parent.top.frames['iframeContent'].location.href = 'Main.aspx';
            }
            parent.showMsgBoxAdv('Your password has been successfully modified');
            document.getElementById('txtCurrentPassword').value = '';
            document.getElementById('txtNewPassword').value = '';
            document.getElementById('txtConfirmNewPassword').value = '';
        }
        else {
            if (status == 'WARNING1') {
                parent.showMsgBoxAdv('The password you gave is incorrect');
            }
            else {
                var message = docXml.getElementsByTagName('message')[0].text;
                parent.showMsgBoxAdv(message);
            }
        }
    }
}