var patron = new Array(2, 2, 4)

var isNS = (navigator.appName == "Netscape") ? 1 : 0;
  if(navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
  function mischandler(){
   return false;
 }
  function mousehandler(e){
 	var myevent = (isNS) ? e : event;
 	var eventbutton = (isNS) ? myevent.which : myevent.button;
    if((eventbutton==2)||(eventbutton==3)) return false;
 }
 document.oncontextmenu = mischandler;
 document.onmousedown = mousehandler;
 document.onmouseup = mousehandler;

 document.onkeydown = function() {
     //alert(window.event.keyCode)
     if (window.event.keyCode == 8) {
         if (document.activeElement.tagName != 'INPUT')
             return false;
         else
             return true;
     }
 }

 function VerificaRut(rut) {
     if (rut.toString().trim() != '' && rut.toString().indexOf('-') > 0) {
         var caracteres = new Array();
         var serie = new Array(2, 3, 4, 5, 6, 7);
         var dig = rut.toString().substr(rut.toString().length - 1, 1);
         rut = rut.toString().substr(0, rut.toString().length - 2);

         for (var i = 0; i < rut.length; i++) {
             caracteres[i] = parseInt(rut.charAt((rut.length - (i + 1))));
         }

         var sumatoria = 0;
         var k = 0;
         var resto = 0;

         for (var j = 0; j < caracteres.length; j++) {
             if (k == 6) {
                 k = 0;
             }
             sumatoria += parseInt(caracteres[j]) * parseInt(serie[k]);
             k++;
         }

         resto = sumatoria % 11;
         dv = 11 - resto;

         if (dv == 10) {
             dv = "K";
         }
         else if (dv == 11) {
             dv = 0;
         }

         if (dv.toString().trim().toUpperCase() == dig.toString().trim().toUpperCase())
             return true;
         else
             return false;
     }
     else {
         return false;
     }
 }

 function ddlSetValue(m_ddl, value_g) {

     for (r = 0; r < m_ddl.options.length; r++) {

         if (trim(m_ddl.options[r].value) == value_g) {
             m_ddl.options[r].selected = true;
         }

     }

 }

 //onkeyup="mascara(this,'/',patron,true)" 
function mascara(d, sep, pat, nums) {
if (d.valant != d.value) {
         val = d.value
         largo = val.length
         val = val.split(sep)
         val2 = ''
         for (r = 0; r < val.length; r++) {
             val2 += val[r]
         }
         if (nums) {
             for (z = 0; z < val2.length; z++) {
                 if (isNaN(val2.charAt(z))) {
                     letra = new RegExp(val2.charAt(z), "g")
                     val2 = val2.replace(letra, "")
                 }
             }
         }
         val = ''
         val3 = new Array()
         for (s = 0; s < pat.length; s++) {
             val3[s] = val2.substring(0, pat[s])
             val2 = val2.substr(pat[s])
         }
         for (q = 0; q < val3.length; q++) {
             if (q == 0) {
                 val = val3[q]
             }
             else {
                 if (val3[q] != "") {
                     val += sep + val3[q]
                 }
             }
         }
         d.value = val
         d.valant = val
     }
 }

 function openWindows(Windows, Style) {
     window.open(Windows, "ventana1", Style);
 }

 function windowOpener(windowHeight, windowWidth, windowName, windowUri) {
     var centerWidth = (window.screen.width - windowWidth) / 2;
     var centerHeight = (window.screen.height - windowHeight) / 2;

     newWindow = window.open(windowUri, windowName, 'resizable=0,width=' + windowWidth +
        ',height=' + windowHeight +
        ',left=' + centerWidth +
        ',top=' + centerHeight);

     newWindow.focus();
     return newWindow.name;
 }


// Nuevas funcionaes proyecto Enigma

function addRowTextToTable(table,text)
{
    var body = table.getElementsByTagName("TBODY");
    var tr = document.createElement('TR');
    var td = document.createElement('TD');
    td.innerHTML = text;
    tr.appendChild(td);
    body(0).appendChild(tr);
}

// Add an onClick function to each row in a table
function addOnClickFunctionToTableRowsPopup(t, strFunctionName) {
    var rows = t.getElementsByTagName('tr');
    for (i = 1; i < rows.length; i++) {
        //rows[i].onclick = strFunctionName;
        rows[i].setAttribute('onclick', strFunctionName);
    }

    return t;
}

//*********************
var preEl;
var orgBColor;
var orgTColor;
function HighLightTR(el, backColor, textColor) {
    if (typeof (preEl) != 'undefined') {
        preEl.bgColor = orgBColor;
        try { ChangeTextColor(preEl, orgTColor); } catch (e) { ; }
    }
    orgBColor = el.bgColor;
    orgTColor = el.style.color;
    el.bgColor = backColor;

    try { ChangeTextColor(el, textColor); } catch (e) { ; }
    preEl = el;
}


function ChangeTextColor(a_obj, a_color) {

    for (i = 0; i < a_obj.cells.length; i++)
        a_obj.cells(i).style.color = a_color;
}
//**********************

 
///////////// COMMON FUNCTIONS

function InitLogOffCountDown(){
    // Set up the timer. 
    parent.logOffTimer = window.setInterval("Logout()", parent._TimeIntervalActivityCheck);
}

function Logout(){

    parent.window.location.href = 'Default.aspx';
}

function Delay(){
   // Delay the logout
   clearInterval(parent.logOffTimer);
   InitLogOffCountDown();
}



function RightStr(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}


function setUserAccessOptions(xmlOptions, optionCode){
    if (xmlOptions!=null){
        xmlUserOptions = createDOM(xmlOptions);
        var tags = xmlUserOptions.documentElement.getElementsByTagName('Option');        
        for (var i=0; i<tags.length; i++){
           if (tags[i].getElementsByTagName('Id')[0].text==optionCode){
              if (tags[i].getElementsByTagName('Approve')[0].text=='Y'){flgApprove = true;}else{flgApprove = false;};
              if (tags[i].getElementsByTagName('Delete')[0].text =='Y'){flgDelete = true;}else{flgDelete = false;};
              if (tags[i].getElementsByTagName('Read')[0].text =='Y'){flgRead = true;}else{flgRead = false;};
              if (tags[i].getElementsByTagName('Reject')[0].text =='Y'){flgReject = true;}else{flgReject = false;};
              if (tags[i].getElementsByTagName('Write')[0].text =='Y'){flgWrite = true;}else{flgWrite = false;};
                        
           }
        }
    }
}    

function toUpCase(E){
    //Convert LowerCase to UpperCase
    E = E.toUpperCase();
    return E;
}

function OnlyNumbers(e){
    //Only Accept Numbers
//    tecla = (document.all) ? e.keyCode : e.which;
//    if (tecla==8) return true;
//    patron = /\d/; 
//    te = String.fromCharCode(tecla);
    //    return patron.test(te);
    
  tecla = (document.all) ? e.keyCode : e.which;
  if (tecla==8) return true;
  if (tecla==44) return false; // si recibe una coma
  if (tecla==46) return true; // si recibe un punto
  if (isNaN(parseInt(String.fromCharCode(tecla)))){
     return false;
  }else{
     return true;
  }
}

function OnlyOnlyNumbers(e) {
    //Only Number and nothing mooooore
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    if (tecla == 44) return false; // si recibe una coma
    if (tecla == 46) return false; // si recibe un punto
    if (isNaN(parseInt(String.fromCharCode(tecla)))) {
        return false;
    } else {
        return true;
    }
}

function NoSpecialChar(e){
    // Only Accept Chars and Numbers
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8) return true;//Return Key Allowed
    patron =/^[^0-9a-zA-Z]*$/;
    te = String.fromCharCode(tecla);
    return !patron.test(te);
}

function OnlyChar(e){
    //Only Accept Chars
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8) return true;//Return Key Allowed
    patron =/^[^a-zA-Z]*$/;
    te = String.fromCharCode(tecla);
    return !patron.test(te);
}

function GetIntValue(strValue){
    var x = strValue.split('px'); 
    var y = strValue.split('%'); 
    return parseInt(x[0]) + parseInt(y[0]);
}

// Accordeon functionality

function CollapseAccordion(panel_id, height, image_id, showHide_id) {
    var e = document.getElementById(panel_id);
    var img = document.getElementById(image_id);
    var sh = document.getElementById(showHide_id);
    var i = e.clientHeight;
    var frames = 20;
    var step = Math.floor(height/frames);
    var rest = height%frames;
    if (i<5) {i=0; step = -step, rest = -rest};
    if (i > 0) {
        img.src = 'images/icons/collapse-down.jpg';
        img.alt = 'Expand';
        sh.innerHTML = '(Mostrar detalles...)'
    }
    else {
        img.src = 'images/icons/collapse-up.jpg';
        img.alt = 'Collapse';
        sh.innerHTML = '(Ocultar detalles...)'
    }  
    for (var j=0; j < frames; j++) {
        setTimeout('ResizePanel("' + panel_id + '",'+ -step + ')' , 5 + (j*5));
        if (j+1 >= frames) setTimeout('ResizePanel("' + panel_id + '",'+ -rest + ')' , 5 + ((j+1)*5));
    }
     
}

function ResizePanel(panelId, step){
    var e = document.getElementById(panelId);
    var s = e.style.height;
    s = s.split('px'); 
    var i = parseInt(s[0]) + step;
    if (i > 0)
        e.style.height = i + 'px'
    else
        e.style.height = "0px";
}

//////////// Enabling/Disabling controls functionality
// True if a string field is empty
function isEmpty(id) {
    if (document.getElementById(id).value == '') return true; else return false;
}

function clearElement(id){
    var e = document.getElementById(id);
    e.value = '';
}

function clearElements(group){
    var element;
    for (element in group) {
        clearElement(group[element]);
    }      
}


function clearElementCurrency(id){
    var e = document.getElementById(id);
    e.value = '0.00';
}

function clearElementsCurrency(group){
    var element;
    for (element in group) {
        clearElementCurrency(group[element]);
    }      
}



function enableElement(id){
    var e = document.getElementById(id);
    if (id.substring(0,3) == 'txt') {
        e.disabled = false;
        e.className = 'TextBoxWrite';
    }
    else if (id.substring(0,3) == 'lbl') {
        e.className = 'Label';
    }
    else if (id.substring(0,2) == 'rb') {
        e.disabled = false;
        e.className = 'RadioButtonWrite';
    }
    else if(id.substring(0,3) == 'chk') {
        e.disabled = false;
    }
     else if(id.substring(0,3) == 'btn') { 
        e.disabled = false;
        //e.className = 'linkButton';
    }
    else if(id.substring(0,3) == 'ddl') {
        e.disabled = false;
    }
    else if(id.substring(0,2) == 'td') {
        e.style.display = 'block';
    }
    else if(id.substring(0,3) == 'tar'){
        e.disabled = false;
        e.className = 'TextBoxWrite';            
    }
}

function disableElement(id){
    var e = document.getElementById(id);
    if (id.substring(0, 3) == 'txt') {
        e.disabled = true;
        e.className = 'TextBoxRead';
    }
    else if (id.substring(0, 3) == 'lbl') {
        e.className = 'LabelDisabled';
    }
    else if (id.substring(0, 2) == 'rb') {
        e.disabled = true;
        e.className = 'RadioButtonWrite';
    }
    else if (id.substring(0, 3) == 'chk') {
        e.disabled = true;
    }
    else if (id.substring(0, 3) == 'btn') {
        e.disabled = true;
        //e.className = 'linkButtonDisabled';
    }
    else if (id.substring(0, 3) == 'ddl') {
        e.disabled = true;
    }
    else if (id.substring(0, 2) == 'td') {
        e.style.display = 'none';
    }
    else if (id.substring(0, 3) == 'tab') {
    e.disabled = true;
    }
    else if (id.substring(0, 3) == 'btn') {
        e.disabled = true;
    }
    else if (id.substring(0, 3) == 'tar') {
    e.disabled = true;
    e.className = 'TextBoxRead';
    }
}


function disableTabPanelElement(id,tabIndex) {
    var e = document.getElementById(id);

  /*  e.childNodes[0].childNodes[tabIndex].disabled = true;*/
    e.childNodes[1].childNodes[tabIndex].disabled = true;


}

function enableTabPanelElement(id, tabIndex) {
    var e = document.getElementById(id);

/*    e.childNodes[0].childNodes[tabIndex].disabled = false;*/
    e.childNodes[1].childNodes[tabIndex].disabled = false;


}

function showTabPanelElement(tabControl, tabNumber) {

        var ctrl = $find(tabControl);
        ctrl.set_activeTab(ctrl.get_tabs()[tabNumber]);
}






function lockElement(id){
    var e = document.getElementById(id);
    if (id.substring(0,3) == 'txt') {
        e.readOnly = 'readonly' ;
        e.tabindex = -1;
        e.className = 'TextBoxRead';
    }
    else if (id.substring(0,3) == 'lbl') {
        e.className = 'Label';
    }
    else if (id.substring(0,2) == 'rb') {
        e.readOnly = 'readonly';
        e.tabindex = -1;
        e.className = 'RadioButtonRead';
    }
    else if(id.substring(0,3) == 'chk') {
        e.readOnly = 'readonly';
        e.tabindex = -1;
    }
     else if(id.substring(0,3) == 'btn') {
        e.readOnly = 'readonly';
        e.tabindex = -1;
        e.className = 'linkButton';
    }
    else if(id.substring(0,3) == 'ddl') {
        e.readOnly = 'readonly';
        e.tabindex = -1;
    }
}

function unlockElement(id){
    var e = document.getElementById(id);
    if (id.substring(0,3) == 'txt') {
        e.readOnly = false;
        e.tabindex = -1;
        e.className = 'TextBoxWrite';
    }
    else if (id.substring(0,3) == 'lbl') {
        e.className = 'Label';
    }
    else if (id.substring(0,2) == 'rb') {
        e.readOnly = false;
        e.tabindex = -1;
        e.className = 'RadioButtonWrite';
    }
    else if(id.substring(0,3) == 'chk') {
        e.readOnly = false;
        e.tabindex = -1;
    }
     else if(id.substring(0,3) == 'btn') {
        e.readOnly = false;
        e.tabindex = -1;
        e.className = 'linkButton';
    }
    else if(id.substring(0,3) == 'ddl') {
        e.readOnly = false;
        e.tabindex = -1;
    }
}

function lockElements(group){
    var element;
    for (element in group) {
        lockElement(group[element]);
    }      
}

function unlockElements(group){
    var element;
    for (element in group) {
        unlockElement(group[element]);
    }
}



function enableElements(group){
    var element;
    for (element in group) {
        enableElement(group[element]);
    }      
}

function disableElements(group){
    var element;
    for (element in group) {
        disableElement(group[element]);
    }
}

//////////// Checkboxes game

// Check/Uncheck a Checkbox
function checkOne(id, val) {
    var e = document.getElementById(id);
    e.checked = val;
}

// Check/Uncheck a group of Checkboxes
function checkGroup(group, val){
    var element;    
    for (element in group) {
        checkOne(group[element], val);
    }
}

//////////// Hidding-Showing elements

// Hide an HTML element
function hideElement(element){
    var e = document.getElementById(element);
    e.style.display = 'none';
}

// Hide a group of HTML elements
function hideElements(elementArray){
    var element;
    for (element in elementArray){
        hideElement(elementArray[element]);
    }
}

// Show an HTML element
function showElement(element){
    var e = document.getElementById(element);
    e.style.display='block';
    e.style.visibility = 'visible';
}

// Show a group of HTML elements
function showElements(elementArray){
    var element;
    for(element in elementArray){
        showElement(elementArray[element]);
    }
}



//Create a generic XML Object (for all browsers)

function createDOM1(xml){
    var xmlDoc;
    var parser;
if (window.DOMParser) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml, "text/xml");
}
else // Internet Explorer
{
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async = false;
    xmlDoc.loadXML(xml);
}
return xmlDoc;

}

function createDOM(xml){
    try //Internet Explorer
          {
          xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async="false";
          xmlDoc.loadXML(xml);
          }
    catch(e){
        try { //Opera, Firefox, etc.
              parser=new DOMParser();
              xmlDoc = parser.parseFromString(xml, "text/xml");
              
        }
        catch(e){
          alert(e.message);
          return;
        }
    }
    return xmlDoc;
}

// Convert XML to HTML table
function createTableFromXML(xml){
    var xmlDoc = createDOM(xml);
    var t = document.createElement('table');
    var thisNode;
    var rootNode = xmlDoc.firstChild;
    if (rootNode != null) 
    {
        for (var i=0; i < rootNode.childNodes.length; i++) {
            t.appendChild(document.createElement('tr'));
            thisNode = rootNode.childNodes[i];
            for (j = 0; j < thisNode.childNodes.length; j++) {
                thisElement = thisNode.childNodes[j];
                var td = document.createElement('td');
                td.align = 'left';
                t.childNodes[i].appendChild(td);
                t.childNodes[i].className = 'TextBoxRead';
                try {
                    var nodo = thisElement.firstChild;
                   if (nodo != null)
                        t.childNodes[i].childNodes[j].innerHTML = nodo.nodeValue;
                   else
                    t.childNodes[i].childNodes[j].innerHTML = " "
                }
                catch (e){
                return;
                }
            }
        }
    }    
    return t;
}

// Convert XML to HTML table
function createTableFromXML2columns(xml) {
    var xmlDoc = createDOM(xml);
    var t = document.createElement('table');
    var thisNode;
    var rootNode = xmlDoc.firstChild;
    if (rootNode != null) {
        for (var i = 0; i < rootNode.childNodes.length; i++) {
            t.appendChild(document.createElement('tr'));
            thisNode = rootNode.childNodes[i];
            for (j = 0; j < 2; j++) {
                thisElement = thisNode.childNodes[j];
                var td = document.createElement('td');
                td.align = 'left';
                t.childNodes[i].appendChild(td);
                t.childNodes[i].className = 'TextBoxRead';
                try {
                    var nodo = thisElement.firstChild;
                    if (nodo != null)
                        t.childNodes[i].childNodes[j].innerHTML = nodo.nodeValue;
                    else
                        t.childNodes[i].childNodes[j].innerHTML = " "
                }
                catch (e) {
                    return;
                }
            }
        }
    }
    return t;
}

// Add an onClick function to each row in a table
function addOnClickFunctionToTableRows(t, strFunctionName){
    var rows = t.getElementsByTagName('tr');
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = strFunctionName;
    }
    return t;
}

// Add an onClick function to each TD in a table
function addOnClickFunctionToHTMLTableCols(t, strFunctionName){
    var cols = t.getElementsByTagName('td');
    for (i = 0; i < cols.length; i++) {
        if (cols[i]!= null) cols[i].onclick = strFunctionName;
    }
    return t;
}

// Change the onClick event to the last column in a HTML table
function addOnClickFunctionToHTMLTableCol(t, n,  script) {
    var rows = t.getElementsByTagName('tr');
    for (i = 0; i < rows.length; i++) {
        var cols = rows[i].getElementsByTagName('td');
        if (cols[n]!= null) cols[n].onclick = script;
    }
    return t;
}

//Add an onClick function ONLY to checkboxes
function addOnClickFunctionToCheckboxes(t, strFunctionName){
    var inputRows = t.getElementsByTagName('input');
    for (i = 0; i < inputRows.length; i++) {
        inputRows[i].onclick = strFunctionName + '(this);';
    }
    return t;
}

// Removes from the xml every Node that doesn't match the value for the TagName
function filterXML(xml, tagName, value, exactMatch){
    var xmlDoc = createDOM(xml);
    var thisNode;
    var rootNode = xmlDoc.documentElement;
    var str;
    if (xmlDoc.documentElement != null) 
    {
        for (var i=0; i < rootNode.childNodes.length; i++) {
            thisNode = rootNode.childNodes[i];
            for (j = 0; j < thisNode.childNodes.length; j++) {
                thisElement = thisNode.childNodes[j];
                str = thisElement.text.toUpperCase();
                if  (   (thisElement.tagName == tagName) 
                        && 
                        (
                             (exactMatch && (str.substr(0,value.length) != value)) 
                            ||
                            (!exactMatch && (str.match(value) == null)) 
                        )
                    )
                { 
                    rootNode.removeChild(rootNode.childNodes[i]);
                    i--;
                }
               
            }        
        }
    }
    return xmlDoc.xml;
}

function filterXMLBlank(xml, tagName, kitNumber) {
    var xmlDoc = createDOM(xml);
    var thisNode;
    var rootNode = xmlDoc.documentElement;
    var str;
    var m_kitNumber;
    if (xmlDoc.documentElement != null) {
        for (var i = 0; i < rootNode.childNodes.length; i++) {
            thisNode = rootNode.childNodes[i];
            m_kitNumber = thisNode.getElementsByTagName('KitNumber')[0].text;
            for (j = 0; j < thisNode.childNodes.length; j++) {
                thisElement = thisNode.childNodes[j];
                str = thisElement.text.toUpperCase();
                if ( ((thisElement.tagName == tagName) && (str != '')) || (m_kitNumber != kitNumber) ) {
                    rootNode.removeChild(rootNode.childNodes[i]);
                    i--;
                }

            }
        }
    }
    return xmlDoc.xml;
}


// Remove from the XML the nodes with such TagName
function removeXMLNodes(xml, tagName) {
    var xmlDoc = createDOM(xml);
    var thisNode;
    var rootNode = xmlDoc.documentElement;
    for (var i=0; i < rootNode.childNodes.length; i++) {
        thisNode = rootNode.childNodes[i];
        for (j = 0; j < thisNode.childNodes.length; j++) {
            thisElement = thisNode.childNodes[j];
            if  (thisElement.tagName == tagName) { 
                thisNode.removeChild(thisElement);
                i--;
            }
        }        
    }
    return xmlDoc.xml;
}


function getXMLFirstValue(xml, tagName) {
    var xmlDoc = createDOM(xml);
    var tags = xmlDoc.documentElement.getElementsByTagName(tagName);
    if (tags.length > 0) {
        return tags[0].text;
    }
    return '';
}

// Retrieve only the XML Node containing the element matching the specified "value" for the "tag"
function getXMLNode(xml, tagName, value){
    var xmlDoc = createDOM(xml);
    var tags = xmlDoc.documentElement.getElementsByTagName(tagName);
    for (var i=0; i < tags.length; i++) {
        if (tags[i].childNodes[0].nodeValue == value)
            return tags[i].parentNode;    
    }
    return null;
}

//// Retrieve every XML Node matching any of the specified "value" for the "tag"
//function filterXMLNodes(xmlDoc, tagName, values){
//    for (var i=0; i < nodes.length; i++) {
//        var value = nodes[i].getElementsByTagName(tagName)[0].childNodes[0].nodeValue;        
//        var remove = true;
//        for (var j=0; j < values.length; k++)
//            if (value == values[k]) 
//                remove = false;
//        if (remove) {
//            nodes.removeChild(rootNode.childNodes[i]);
//            i--;
//        }
//        }        
//    }
//    return xmlNode;
//}

// Filter XMl Collecting Entity for tag "Used"
function filterXMLCEUsed(xml, tagName, value, exactMatch){
    var xmlDoc = createDOM(xml);
    var str;
    var thisNode;
    var tagNameRemove = "inUsed";
    for (var i=0; i < xmlDoc.childNodes.length; i++) {
        thisNode = xmlDoc.childNodes[i];
        for (j = 0; j < thisNode.childNodes.length; j++) {
            thisElement = thisNode.childNodes[j];
            for (z = 0; z < thisElement.childNodes.length; z++) {
                thisElement2 = thisElement.childNodes[z];
                if (thisElement2.tagName == tagNameRemove)                   
                { 
                    thisElement.removeChild(thisElement.childNodes[z]);
                    z--;
                }    
                else
                {
                    for (q = 0; q < thisElement2.childNodes.length; q++) 
                    {
                        thisElement3 = thisElement2.childNodes[q];
                        for (p = 0; p < thisElement3.childNodes.length; p++) 
                        {
                            thisElement4 = thisElement3.childNodes[p];
                            str = thisElement4.text.toUpperCase();
                            if  (   (thisElement4.tagName == tagName) 
                                && 
                                (
                                    (exactMatch && (str.substr(0,value.length) != value)) 
                                    ||
                                    (!exactMatch && (str.match(value) == null))
                                )
                                )
                            { 
                                thisElement2.removeChild(thisElement2.childNodes[q]);
                                q--;
                                
                            }
                        }                
                    }
                
                }
           }        
        }        
    }
    
    var rootNode = createDOM(xmlDoc.xml).getElementsByTagName('CollectingEntity');
    return rootNode
}


// Filter XMl Collecting Entity for tag "Valid"
function filterXMLCEValid(xml, tagName, value, exactMatch){
    var xmlDoc = createDOM(xml);
    var str;
    var thisNode;
    var tagNameRemove = "inValid";
    for (var i=0; i < xmlDoc.childNodes.length; i++) {
        thisNode = xmlDoc.childNodes[i];
        for (j = 0; j < thisNode.childNodes.length; j++) {
            thisElement = thisNode.childNodes[j];
            if (thisElement.tagName == tagNameRemove)                   
            { 
                    thisNode.removeChild(thisNode.childNodes[j]);
                    j--;
            } 
            else   
            {
                for (z = 0; z < thisElement.childNodes.length; z++) {
                thisElement2 = thisElement.childNodes[z];
              
                    for (q = 0; q < thisElement2.childNodes.length; q++) 
                    {
                        thisElement3 = thisElement2.childNodes[q];
                        for (p = 0; p < thisElement3.childNodes.length; p++) 
                        {
                            thisElement4 = thisElement3.childNodes[p];
                            str = thisElement4.text.toUpperCase();
                            if  (   (thisElement4.tagName == tagName) 
                                && 
                                (
                                    (exactMatch && (str.substr(0,value.length) != value)) 
                                    ||
                                    (!exactMatch && (str.match(value) == null))
                                )
                                )
                            { 
                                thisElement2.removeChild(thisElement2.childNodes[q]);
                                q--;
                                
                            }
                        }                
                    }
                
                
             }
           }        
        }        
    }
    
    var rootNode = createDOM(xmlDoc.xml).getElementsByTagName('CollectingEntity');
    return rootNode
}



//Get first <Tag> Node from xml
function getXMLSubNode(xmlNode, tag){
    var xmlSubNode = xmlNode.getElementsByTagName(tag)[0];
    return xmlSubNode;
}

//Get <Services> Node from xml Carriers
function getServices(xml){
    var xmlDoc = createDOM(xml);
    var thisNode;
    var rootNode = xmlDoc.documentElement;
    xmlDoc.documentElement = rootNode.getElementsByTagName('Services')[0];
    return xmlDoc.xml;
}

//Add Checkbox to a Table
function addCheckboxToTableRows(t){
    var rows = t.getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
        var Row = document.createElement('td');
        Row.appendChild(document.createElement("<input id='"+j+"' type='checkbox' onfocus='this.blur()'/>"));
        rows[j].insertBefore(Row,rows[j].childNodes[0]);//Insert Textboxes Row at Beginning of the Table 
    }   
    return t;
}

//Add Checkbox to a Table without onfocus event
function addCheckboxToHTMLTableRows(t){
    var rows = t.getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
        var td = document.createElement('td');
        var chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.style.height = '10px';
        chk.onclick = 'changeCheckboxHTMLValue(this);';
        td.appendChild(chk);
        rows[j].insertBefore(td , rows[j].childNodes[0]);
    }   
    return t;
}

//Add Checkbox to a Table without onfocus event
function addCheckboxToHTMLTableRowsAtEndBlock(t){
    var rows = t.getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
        var Row = document.createElement('td');
        Row.appendChild(document.createElement("<input id='"+j+"' type='checkbox' onfocus='this.blur()' DISABLED/>"));
        rows[j].insertBefore(Row);
    }   
    return t;
}

// Exchange the checkbox value to the opposite state
function changeCheckboxHTMLValue(chk) {
    if (chk.outerHTML.match('CHECKED')) {
        chk.checked = false;
        chk.outerHTML.replace('CHECKED','');
    }
    else {
        chk.checked = true;
        chk.outerHTML.replace('>', ' CHECKED>');
    }
}

// Set CHECKED or UNCHECKED
function setCheckboxHTMLValue(chk, bool) {
    if (bool){
        if (!chk.outerHTML.match('CHECKED')) {
            chk.outerHTML.replace('>', ' CHECKED>');
            chk.checked = true;
        }
    }else{  
        if (chk.outerHTML.match('CHECKED')) {
            chk.outerHTML.replace('CHECKED','');
            chk.checked = false;
        }
    }    
}

//Add a "Delete button" image to a HTML row
function addDeleteImageToHTMLTableRows(t, onClickFunc){
    var rows = t.getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
        var td = document.createElement('td');
        td.onclick = onClickFunc;
        var div = document.createElement('div');
        div.style.height = '16px';
        div.style.width = div.style.height;
        div.className = 'deleteRowButton';
        td.appendChild(div);
        td.valign = 'middle';
        td.align = 'center';
        rows[j].appendChild(td , rows[j].childNodes[0]); 
    }   
    return t;
}

// Hide column number "n" in a HTML table "t" (n: 0 .. cols-1)
function hideHTMLTableCol(t , n) {
    var rows = t.getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
        var td = rows[j].getElementsByTagName('td')[n];
        if (typeof td != 'undefined') td.style.display = 'none';
        var th = rows[j].getElementsByTagName('th')[n];
        if (typeof th != 'undefined') th.style.display = 'none';
    }   
    return t;
}

// Show column number "n" in a HTML table "t" (n: 0 .. cols-1)
function showHTMLTableCol(t , n) {
    var rows = t.getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
        var td = rows[j].getElementsByTagName('td')[n];
        if (typeof td != 'undefined') td.style.display = 'inline';
        var th = rows[j].getElementsByTagName('th')[n];
        if (typeof th != 'undefined') th.style.display = 'inline';
    }   
    return t;
}

// Show/Hide unchecked rows in an HTML table
function showUncheckedHTMLTableRows(t, bool) {
    var chks = t.getElementsByTagName('input');
    for (var j = 0; j < chks.length; j++) 
        if (!chks[j].outerHTML.match('CHECKED'))
            if (bool)
                chks[j].parentElement.parentElement.style.display = 'block';
            else    
                chks[j].parentElement.parentElement.style.display = 'none'; 
        else
            chks[j].parentElement.parentElement.style.display = 'block';
    return t;
}

// Insert a row in an HTML table, without duplicates in the "n" column values
function insertUniqueHTMLRow(n, r, t) {
    var rows = t.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    if(rows.length != 0)
        for (var j = 0; j < rows.length; j++) {
            if (rows[j].getElementsByTagName('td')[n].innerHTML == r.getElementsByTagName('td')[n].innerHTML) return t;
        }          
    t.getElementsByTagName('tbody')[0].appendChild(r);
    return t;
}

// Remove from an HTML table the Rows matching the value on a specified column.
function removeHTMLRow(v, c, t) {
    var rows = t.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (var j = 0; j < rows.length; j++) {
        if (rows[j].getElementsByTagName('td')[c].innerHTML == v) {
            t.getElementsByTagName('tbody')[0].removeChild(rows[j]);
            }
    }   
    return t;
}

function removeHTMLTableRows(t) {
    var rows = t.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    while (rows.length > 0) {
        t.getElementsByTagName('tbody')[0].removeChild(rows[0]);
    }   
    return t;
}


///// POP UP

// Pass the "e" element to the parent window, and show it as Modal PopUp. "e" is a <div> panel containing HTML, tables, controls ...
function showModal(e) {
    parent.document.getElementById('modalBack').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    setPopUpPosition(e);
}


function showModal2(e) {
    parent.document.getElementById('modalBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'block';
    parent.document.getElementById('divDefaultPopUpSlot').style.visibility = 'visible';
    setPopUpPosition(e);
}

function setPopUpPosition(e) {
    var popup = parent.document.getElementById('divDefaultPopUpSlot');
    popup.style.display = 'block';
    var y = (parent.document.body.clientHeight / 2) - (popup.clientHeight  / 2);
    var x = (parent.document.body.clientWidth / 2) - (popup.clientWidth / 2);
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    
}


function closeModal() {
    parent.document.getElementById('divDefaultPopUpSlot').style.display = 'none';
    parent.document.getElementById('modalBack').style.display = 'none';
}

function showModalProgress(e) {
    parent.document.getElementById('modalProgressBack').style.display = 'block';
    e.style.display = 'block';
    parent.document.getElementById('divDefaultProgressImg').innerHTML = e.outerHTML;
    e.style.display = 'none';
    parent.document.getElementById('divDefaultProgressImg').style.display = 'block';
    setProgressPosition(e);
}

function closeModalProgress() {
    parent.document.getElementById('divDefaultProgressImg').style.display = 'none';
    parent.document.getElementById('modalProgressBack').style.display = 'none';
}

function setProgressPosition(e) {
    var popup = parent.document.getElementById('divDefaultProgressImg');
    popup.style.display = 'block';
    var y = (parent.document.body.clientHeight / 2) - (popup.clientHeight  / 2);
    var x = (parent.document.body.clientWidth / 2) - (popup.clientWidth / 2);
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    
}


//Help Button JS
function onHelpButtonClick(){
    //var helpWindows = window.open("manual.htm","","menubar=none scrollbars=yes");
    var helpWindows = window.open("Help.aspx","","menubar=none scrollbars=yes");
    helpWindows.focus();
}

// String.Right(str, n) implementation
function Right(str, n)
{
    var iLen = String(str).length;
    if (n <= 0)
        return '';
    else if (n > iLen)
        return str;
    else
        return String(str).substring(iLen, iLen - n);
}

function getXMLElementValue(node,tagName)
{
    var tag = getXMSingleNode(node,tagName)
    if (tag != null)
    {
        return tag.childNodes[0].nodeValue;
    }
    else
    {
        return " ";
    }
}

function getXMSingleNode(node,tagName)
{
    if (node != null)
        return node.selectSingleNode(tagName);
    else
       return null;
}

function getStatusName(statusId)
{
    switch(statusId)
    {
        case 'U':
            return 'Unvaluated';
            break;    
        case 'P':
            return 'To Conciliate';
            break;    
        case 'A':
            return 'Approved';
            break;    
        case 'R':
            return 'Rejected';
            break;    
        case 'I':
            return 'In Court';
            break;    
        case 'O':
            return 'Out Court';
            break;    
        case 'C':
            return 'Collected';
            break;    
        case 'N':
            return 'Not Affection';
            break;    
        case 'L':
            return 'Liquidated';
            break;    
        default:
            return 'Invalid Status';
            break;    
    }
}    

function IsInternalStatus(statusName)
{
    if ((statusName == 'Collected') || (statusName == 'Unvaluated') || (statusName == 'Not Affection') || (statusName == 'Liquidated'))
        return true;
    else
        return false;
}        

function getTimeString() 
{
    var now = new Date();
    return Right('0' + now.getHours().toString(),2) + ':' + 
           Right('0' + now.getMinutes().toString(),2) + ':' +
           Right('0' + now.getSeconds().toString(),2);
}

function trim(myString)
{
    return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}


function loadSelectFromXML(xml, select, ddlDSelect) {
    var xmlDoc = createDOM(xml);
    var thisNode;
    var rootNode = xmlDoc.childNodes[1];
    var nOption = document.createElement('option');
    nOption.setAttribute('value', '');
    var option = document.createTextNode(ddlDSelect);
    nOption.appendChild(option);
    select.appendChild(nOption);
    for (var i = 0; i < rootNode.childNodes.length; i++) {
        thisNode = rootNode.childNodes[i];
        for (j = 1; j < thisNode.childNodes.length; j++) {
            thisElement = thisNode.childNodes[j];
            try {
                nOption = document.createElement('option');
                nOption.setAttribute('value', thisElement.firstChild.nodeValue);
                j += 1;
                thisElement = thisNode.childNodes[j];
                option = document.createTextNode(thisElement.firstChild.nodeValue);
                nOption.appendChild(option);
                select.appendChild(nOption);
            }
            catch (e) {
                return;
            }
        }
    }
}

function loadSelectFromXML1(xml, select, ddlDSelect) {
   
    var xmlDoc = createDOM(xml);
    var thisNode = xmlDoc.childNodes[0];
    var nOption = document.createElement('option');
    nOption.setAttribute('value', '');
    var option = document.createTextNode(ddlDSelect);
    nOption.appendChild(option);
    select.appendChild(nOption);
    for (j = 0; j < thisNode.childNodes.length; j++) {
            thisElement = thisNode.childNodes[j];
            try {
                nOption = document.createElement('option');
                nOption.setAttribute('value', thisElement.childNodes[0].text);
                option = document.createTextNode(thisElement.childNodes[1].text);
                nOption.appendChild(option);
                select.appendChild(nOption);
            }
            catch (e) {
                return;
            }
     }
    
}

function imposeMaxLength(Object, MaxLen) {
    return (Object.value.length <= MaxLen);
}

function ddlSetValue(m_ddl, value_g) {

    for (r = 0; r < m_ddl.options.length; r++) {

        if (trim(m_ddl.options[r].value) == value_g) {
            m_ddl.options[r].selected = true;
        }
        
    }

}

function isSelectedDll(e) {


    var strUser = e.options[e.selectedIndex].value;
    if (trim(strUser) == '') {
        return false;
    }
    return true;

}

function dateCompare(fecha, fecha2) {
    var fechaIni = fecha.split("/");
    var fechaFin = fecha2.split("/");

    if (parseInt(fechaIni[2], 10) > parseInt(fechaFin[2], 10)) {
        return (true);
    } else {
        if (parseInt(fechaIni[2], 10) == parseInt(fechaFin[2], 10)) {
            if (parseInt(fechaIni[0], 10) > parseInt(fechaFin[0], 10)) {
                return (true);
            }
            if (parseInt(fechaIni[0], 10) == parseInt(fechaFin[0], 10)) {
                if (parseInt(fechaIni[1], 10) > parseInt(fechaFin[1], 10)) {
                    return (true);
                } else {
                    return (false);
                }
            } else {
                return (false);
            }
        } else {
            return (false);
        }
    }
}