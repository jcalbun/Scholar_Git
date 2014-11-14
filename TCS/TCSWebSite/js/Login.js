
document.onkeydown = function()
{ 
   if ((event.which && event.which == 13) ||  (event.keyCode && event.keyCode == 13))
   {
      LogIn();
      return false;
   } 
   else 
      return true;
}

function onLoad()
{

}

function onPageLoad()
{
     
}

function LogIn() {

    
   parent._userId        = document.getElementById('txtUserName').value;
   parent._pwd = document.getElementById('txtPwd').value;
   parent.LogIn();
}


