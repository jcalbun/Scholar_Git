var isNS = (navigator.appName == "Netscape") ? 1 : 0;

if(navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);

document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;

function mischandler()
{
   return false;
}

function mousehandler(e)
{
   var myevent = (isNS) ? e : event;
   var eventbutton = (isNS) ? myevent.which : myevent.button;
   if((eventbutton==2)||(eventbutton==3)) return false;
}
 
function onFormLoad()
{
    f_open_window_max('Home.aspx', 'Home');
}

function f_open_window_max(aURL, aWinName) {
    var wOpen;
    var sOptions;
    

    sOptions = 'status=yes,menubar=no,scrollbars=yes,resizable=yes,toolbar=no';
    sOptions = sOptions + ',width=1024';
    sOptions = sOptions + ',height=740';
    sOptions = sOptions + ',screenX=0,screenY=0,left=0,top=0';

    wOpen = window.open('', aWinName, sOptions);
    wOpen.location = aURL;
    wOpen.focus();
    wOpen.resizeTo(1024, 740);
    return wOpen;
}