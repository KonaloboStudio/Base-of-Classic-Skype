// ButtonGenerator 2.0

var parser;
var domDoc;

var button_xml = '<rootnode><button action="call" statusenabled="no" color="blue" bg="transparent" size="small" theme="classic" buttoncontent="icon" lang="en"><filename>call_blue_transparent_34x34.png</filename><width>34</width><height>34</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="blue" bg="transparent" size="small" theme="classic" lang="en"><filename>call_blue_transparent_70x23.png</filename><width>70</width><height>23</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="blue" bg="white" size="large" theme="classic" lang="en"><filename>call_blue_white_124x52.png</filename><width>124</width><height>52</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="blue" bg="white" size="large" theme="bubble" lang="en"><filename>call_blue_white_153x63.png</filename><width>153</width><height>63</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="blue" bg="white" size="large" theme="bubble" buttoncontent="icon" lang="en"><filename>call_blue_white_92x82.png</filename><width>92</width><height>82</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="green" bg="transparent" size="small" theme="classic" buttoncontent="icon" lang="en"><filename>call_green_transparent_34x34.png</filename><width>34</width><height>34</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="green" bg="transparent" size="small" theme="classic" lang="en"><filename>call_green_transparent_70x23.png</filename><width>70</width><height>23</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="green" bg="white" size="large" theme="classic" lang="en"><filename>call_green_white_124x52.png</filename><width>124</width><height>52</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="green" bg="white" size="large" theme="bubble" lang="en"><filename>call_green_white_153x63.png</filename><width>153</width><height>63</height><alt>Skype Me™!</alt></button><button action="call" statusenabled="no" color="green" bg="white" size="large" theme="bubble" buttoncontent="icon" lang="en"><filename>call_green_white_92x82.png</filename><width>92</width><height>82</height><alt>Skype Me™!</alt></button><button action="add" statusenabled="no" color="blue" bg="transparent" size="small" theme="classic" lang="en"><filename>add_blue_transparent_118x23.png</filename><width>118</width><height>23</height><alt>Add me to Skype</alt></button><button action="add" statusenabled="no" color="blue" bg="white" size="large" theme="classic" lang="en"><filename>add_blue_white_194x52.png</filename><width>194</width><height>52</height><alt>Add me to Skype</alt></button><button action="add" statusenabled="no" color="blue" bg="white" size="large" theme="bubble" lang="en"><filename>add_blue_white_195x63.png</filename><width>195</width><height>63</height><alt>Add me to Skype</alt></button><button action="add" statusenabled="no" color="green" bg="transparent" size="small" theme="classic" lang="en"><filename>add_green_transparent_118x23.png</filename><width>118</width><height>23</height><alt>Add me to Skype</alt></button><button action="add" statusenabled="no" color="green" bg="white" size="large" theme="classic" lang="en"><filename>add_green_white_194x52.png</filename><width>194</width><height>52</height><alt>Add me to Skype</alt></button><button action="add" statusenabled="no" color="green" bg="white" size="large" theme="bubble" lang="en"><filename>add_green_white_195x63.png</filename><width>195</width><height>63</height><alt>Add me to Skype</alt></button><button action="chat" statusenabled="no" color="blue" bg="transparent" size="small" theme="classic" lang="en"><filename>chat_blue_transparent_97x23.png</filename><width>97</width><height>23</height><alt>Chat with me</alt></button><button action="chat" statusenabled="no" color="blue" bg="white" size="large" theme="classic" lang="en"><filename>chat_blue_white_164x52.png</filename><width>164</width><height>52</height><alt>Chat with me</alt></button><button action="chat" statusenabled="no" color="green" bg="transparent" size="small" theme="classic" lang="en"><filename>chat_green_transparent_97x23.png</filename><width>97</width><height>23</height><alt>Chat with me</alt></button><button action="chat" statusenabled="no" color="green" bg="white" size="large" theme="classic" lang="en"><filename>chat_green_white_164x52.png</filename><width>164</width><height>52</height><alt>Chat with me</alt></button><button action="userinfo" statusenabled="no" color="blue" bg="transparent" size="small" theme="classic" lang="en"><filename>userinfo_blue_transparent_108x23.png</filename><width>108</width><height>23</height><alt>View my profile</alt></button><button action="userinfo" statusenabled="no" color="blue" bg="white" size="large" theme="classic" lang="en"><filename>userinfo_blue_white_180x52.png</filename><width>180</width><height>52</height><alt>View my profile</alt></button><button action="userinfo" statusenabled="no" color="green" bg="transparent" size="small" theme="classic" lang="en"><filename>userinfo_green_transparent_108x23.png</filename><width>108</width><height>23</height><alt>View my profile</alt></button><button action="userinfo" statusenabled="no" color="green" bg="white" size="large" theme="classic" lang="en"><filename>userinfo_green_white_180x52.png</filename><width>180</width><height>52</height><alt>View my profile</alt></button><button action="voicemail" statusenabled="no" color="blue" bg="transparent" size="small" theme="classic" lang="en"><filename>voicemail_blue_transparent_129x23.png</filename><width>129</width><height>23</height><alt>Leave me voicemail</alt></button><button action="voicemail" statusenabled="no" color="blue" bg="white" size="large" theme="classic" lang="en"><filename>voicemail_blue_white_213x52.png</filename><width>213</width><height>52</height><alt>Leave me voicemail</alt></button><button action="voicemail" statusenabled="no" color="green" bg="transparent" size="small" theme="classic" lang="en"><filename>voicemail_green_transparent_129x23.png</filename><width>129</width><height>23</height><alt>Leave me voicemail</alt></button><button action="voicemail" statusenabled="no" color="green" bg="white" size="large" theme="classic" lang="en"><filename>voicemail_green_white_213x52.png</filename><width>213</width><height>52</height><alt>Leave me voicemail</alt></button><button action="sendfile" statusenabled="no" color="blue" bg="transparent" size="small" theme="classic" lang="en"><filename>sendfile_blue_transparent_98x23.png</filename><width>98</width><height>23</height><alt>Send me a file</alt></button><button action="sendfile" statusenabled="no" color="blue" bg="white" size="large" theme="classic" lang="en"><filename>sendfile_blue_white_164x52.png</filename><width>164</width><height>52</height><alt>Send me a file</alt></button><button action="sendfile" statusenabled="no" color="green" bg="transparent" size="small" theme="classic" lang="en"><filename>sendfile_green_transparent_98x23.png</filename><width>98</width><height>23</height><alt>Send me a file</alt></button><button action="sendfile" statusenabled="no" color="green" bg="white" size="large" theme="classic" lang="en"><filename>sendfile_green_white_164x52.png</filename><width>164</width><height>52</height><alt>Send me a file</alt></button><button action="status" statusenabled="yes" color="-" bg="white" size="large" theme="bubble" lang="en"><filename>/balloon</filename><width>150</width><height>60</height><alt>My status</alt></button><button action="status" statusenabled="yes" color="-" bg="transparent" size="small" theme="classic" lang="en"><filename>/smallclassic</filename><width>114</width><height>20</height><alt>My status</alt></button><button action="status" statusenabled="yes" color="-" bg="white" size="large" theme="classic" lang="en"><filename>/bigclassic</filename><width>182</width><height>44</height><alt>My status</alt></button><button action="status" statusenabled="yes" color="-" bg="transparent" size="small" theme="classic" buttoncontent="icon" lang="en"><filename>/smallicon</filename><width>16</width><height>16</height><alt>My status</alt></button><button action="status" statusenabled="yes" color="-" bg="white" size="large" theme="classic" buttoncontent="icon" lang="en"><filename>/mediumicon</filename><width>26</width><height>26</height><alt>My status</alt></button></rootnode>';

function findNode(xpathExpression){
    var xpathNodeSet = domDoc.selectNodeSet(xpathExpression);
    
    var intLoop;
    var intCount = xpathNodeSet.getLength();
    
    var myxml_return = "";
    for (intLoop = 0; intLoop < intCount; intLoop++) {
        var node = xpathNodeSet.item(intLoop);
        var nodexml = node.toString();
        if(trim(nodexml, true, true) == "") {
        } else {
            myxml_return += nodexml + "|";
            myxml_return = myxml_return.substring(0,myxml_return.lastIndexOf("|"));
        }
    }
    return(myxml_return);
}

function init(){
	 parser = new DOMImplementation();
     parser.preserveWhiteSpace = true;
     domDoc = parser.loadXML(button_xml);
}

init();

function blinkPreview(isClear) {
    var preview = document.getElementById("preview-head");
    if(isClear == "true") {
        /* preview.style.background = "white url(<!--#echo var="BASE_URL_CACHE"-->/i_preairlift/share_new/buttons/step_3.png) left top no-repeat"; */
		/*preview.style.background = "white url(/i_preairlift/share_new/buttons/step_3.png) left top no-repeat";
        return false;*/
    } else {
        /* preview.style.background = "white url(<!--#echo var="BASE_URL_CACHE"-->/i_preairlift/share_new/buttons/step_3_active.png) left top no-repeat"; */
		/*preview.style.background = "white url(/i_preairlift/share_new/buttons/step_3_active.png) left top no-repeat";*/
        timer = setTimeout("blinkPreview('true')", 500);
    }
}

var codetype = "web";
var skypename = "echo123";
var buttonfunction = "call";
var buttonstatus = "no";
var buttoncolor = "green";
var buttonbg = "white";
var buttonsize = "large";
var buttontheme = "bubble";
var buttonlang = "en";
var buttoncontent = "text";

var isWizard = (location.href.indexOf('wizard') != -1);

function changeStyle(changes, target) {
    var changes_array = changes.split(",");
    for(i=0; i < changes_array.length; i++) {
        change_parts = changes_array[i].split("->");
        property = change_parts[0];
        value = change_parts[1];
        eval(""+property+" = \""+value+"\";");
    }
    if(target) {
        target_array = target.id.split("-");
        eval("document.getElementById(\""+target_array[0]+"\").checked = true;");
        if(!document.all) { return false; }
    }
    
    skypenameWeb = skypename.replace('.', '%2E');
    
    if(buttonstatus == "yes") {
        doStatusCheck();
    } else {
        var status_reply = document.getElementById("status-reply");
        status_reply.style.display = "none";
    }

    if(isWizard) {
        var forwarding_div = document.getElementById("forwarding");
        var voicemail_div = document.getElementById("voicemail");
        
        if(buttonfunction == "call") {
            forwarding_div.style.display = "block";
        } else {
            forwarding_div.style.display = "none";
        }
        
        if(buttonfunction == "voicemail") {
            voicemail_div.style.display = "block";
        } else {
            voicemail_div.style.display = "none";
        }
    }
    
    
    
    var btnBgWhite = document.getElementById("btnBgWhite");
    var btnBgTransparent = document.getElementById("btnBgTransparent");
    var btnContentText = document.getElementById("btnContentText");
    var btnContentIcon = document.getElementById("btnContentIcon");
    var btnStyleBaloon = document.getElementById("btnStyleBaloon");
    var btnStyleButton = document.getElementById("btnStyleButton");
    var btnColorGreen = document.getElementById("btnColorGreen");
    var btnColorBlue = document.getElementById("btnColorBlue");
    
    if(isWizard && buttonstatus == "yes") {
        btnColorGreen.disabled = true;
        btnColorBlue.disabled = true;
        buttoncolor = "green";
        
        btnContentIcon.disabled = false;
        btnContentText.disabled = false;

        if(buttonsize == "small") {
            btnBgWhite.disabled = true;
            btnBgWhite.checked = false;
            btnBgTransparent.checked = true;
            btnBgTransparent.disabled = false;
            
            btnStyleBaloon.disabled = true;
            btnStyleBaloon.checked = false;
            btnStyleButton.disabled = false;
            btnStyleButton.checked = true;
            
            buttonbg = "transparent";
            buttontheme = "classic";
        } else {
            btnBgWhite.disabled = false;
            btnBgWhite.checked = true;
            btnBgTransparent.checked = false;
            btnBgTransparent.disabled = true;
            
            btnStyleBaloon.disabled = false;
            btnStyleButton.disabled = false;
            
            buttonbg = "white";
        }
        
        if(buttoncontent == "icon") {
            btnStyleBaloon.disabled = true;
            btnStyleBaloon.checked = false;
            btnStyleButton.checked = true;
            btnStyleButton.disabled = false;
            
            buttontheme = "classic";
        } else {
            btnStyleBaloon.disabled = false;
            btnStyleButton.disabled = false;
        }
        
        if(buttonsize == "small" || buttoncontent == "icon") {
            btnStyleBaloon.disabled = true;
        } else {
            btnStyleBaloon.disabled = false;
        }

    } else if(isWizard && buttonstatus != "yes") {
        btnColorGreen.disabled = false;
        btnColorBlue.disabled = false;
    
        if(buttonsize == "small") { buttonbg = "transparent"; buttontheme = "classic"; } else { buttonbg = "white"; }
        
        if(buttonfunction == "call" || buttonfunction == "add") {
            btnStyleBaloon.disabled = false;
            btnStyleButton.disabled = false;
            btnContentIcon.disabled = false;
            btnContentText.disabled = false;
            btnBgTransparent.disabled = false;
            btnBgWhite.disabled = false;
            
            if(buttoncontent == "icon" && buttonsize == "small" && buttonfunction != "add") {
                btnStyleBaloon.disabled = true;
                btnStyleBaloon.checked = false;
                btnStyleButton.checked = true;
                btnStyleButton.disabled = false;
                
                buttontheme = "classic";
            }

            if(buttoncontent == "icon" && buttonsize == "large" && buttonfunction != "add") {
                btnStyleBaloon.disabled = false;
                btnStyleBaloon.checked = true;
                btnStyleButton.checked = false;
                btnStyleButton.disabled = true;
                
                buttontheme = "bubble";
            }
            
            if(buttonfunction == "add") {
                btnContentIcon.disabled = true;
                btnContentText.checked = true;
            }
            if(buttonfunction == "add" && buttoncontent == "icon") {
                btnContentText.checked = true;
                buttoncontent = "text";
            }
            
            if(buttoncontent == "text" && buttonsize == "small") {
                btnStyleBaloon.disabled = true;
                btnStyleBaloon.checked = false;
                btnStyleButton.checked = true;
                btnStyleButton.disabled = false;
            }

            if(buttonsize == "small") {
                btnBgWhite.disabled = true;
                btnBgWhite.checked = false;
                btnBgTransparent.checked = true;
                btnBgTransparent.disabled = false;
            }
            
            if(buttonsize == "large") {
                btnBgWhite.disabled = false;
                btnBgWhite.checked = true;
                btnBgTransparent.checked = false;
                btnBgTransparent.disabled = true;
            }
        } else {
            btnStyleBaloon.disabled = true;
            btnStyleButton.checked = true;
            btnStyleButton.disabled = false;
            btnContentIcon.disabled = true;
            btnContentText.checked = true;
            
            buttontheme = "classic";
            buttoncontent = "text";
            
            if(buttonsize == "small") {
                btnBgWhite.disabled = true;
                btnBgWhite.checked = false;
                btnBgTransparent.checked = true;
                btnBgTransparent.disabled = false;
            } else {
                btnBgWhite.disabled = false;
                btnBgWhite.checked = true;
                btnBgTransparent.checked = false;
                btnBgTransparent.disabled = true;
            }
        }
    }
    
    generateCode();
    blinkPreview();
    return false;
}

function generateCode() {
    var createdNodePath;
    
    var dropdown_preview = document.getElementById("dropdown-preview");
    dropdown_preview.style.display = "none";
    
    var button_preview = document.getElementById("button-preview");
    button_preview.style.display = "block";
    
    createdNodePath = "";

    if(buttonstatus == "yes") {
        createdNodePath = createdNodePath
        +"//button[@action=\"status\"]";
    } else {
        createdNodePath = createdNodePath
        +"//button[@action=\""+buttonfunction+"\"]";
    }
    
    createdNodePath = createdNodePath
    +"[@statusenabled=\""+buttonstatus+"\"]";

    if(buttonstatus == "yes") {
        createdNodePath = createdNodePath
        +"[@color=\"-\"]";
    } else {
        createdNodePath = createdNodePath
        +"[@color=\""+buttoncolor+"\"]";
    }

    createdNodePath = createdNodePath
    +"[@bg=\""+buttonbg+"\"]"
    +"[@size=\""+buttonsize+"\"]"
    +"[@theme=\""+buttontheme+"\"]";
    
    if(buttoncontent == "icon") {
        createdNodePath = createdNodePath
        +"[@buttoncontent=\""+buttoncontent+"\"]";
    } else {
        createdNodePath = createdNodePath
        +"[not(@buttoncontent=\"icon\")]";
    }
    
    createdNodePath = createdNodePath
    +"[@lang=\""+buttonlang+"\"]";
    
    createdNodePathNode = createdNodePath
    +"/node()";
    
    // alert(createdNodePathNode);

/*
    createdNodePathFilename = createdNodePath
    +"/filename/text()";
    
    createdNodePathWidth = createdNodePath
    +"/width/text()";

    createdNodePathHeight = createdNodePath
    +"/height/text()";
    
    createdNodePathAlt = createdNodePath
    +"/alt/text()";
    
    var buttonFilename = findNode(createdNodePathFilename);
    var buttonWidth = findNode(createdNodePathWidth);
    var buttonHeight = findNode(createdNodePathHeight);
    var buttonAlt = findNode(createdNodePathAlt);
*/
    
    var buttonNode = findNode(createdNodePathNode);
    
    var buttonNode_array = buttonNode.split("><");
    
    buttonFilename = buttonNode_array[0].replace('<filename>', '')
    buttonFilename = buttonFilename.replace('</filename', '')
    
    buttonWidth = buttonNode_array[1].replace('width>', '')
    buttonWidth = buttonWidth.replace('</width', '')
    
    buttonHeight = buttonNode_array[2].replace('height>', '')
    buttonHeight = buttonHeight.replace('</height', '')
    
    buttonAlt = buttonNode_array[3].replace('alt>', '')
    buttonAlt = buttonAlt.replace('</alt>', '')
    
    var detectionScript = "http://download.skype.com/share/skypebuttons/js/skypeCheck.js";
    var comment_text = "<!--\nSkype '"+buttonAlt+"' button\nhttp://www.skype.com/go/skypebuttons\n-->";
    var js_tag = "<script type=\"text\/javascript\" src=\""+detectionScript+"\"><\/script>";
    
    if(buttonfunction == "transparent-dropdown" || buttonfunction == "white-dropdown") {
    
    } else {
        // here we do preview
    
        if(buttonstatus == "yes") {
            var previewCode = "<a href=\"skype:"+skypename+"?"+buttonfunction+"\"><img src=\"http://mystatus.skype.com"+buttonFilename+"/"+skypenameWeb+"\" style=\"border: none;\" width=\""+buttonWidth+"\" height=\""+buttonHeight+"\" alt=\""+buttonAlt+"\" \/><\/a>\n";
        } else {
            var previewCode = "<a href=\"skype:"+skypename+"?"+buttonfunction+"\"><img src=\"http://download.skype.com/share/skypebuttons/buttons/"+buttonFilename+"\" style=\"border: none;\" width=\""+buttonWidth+"\" height=\""+buttonHeight+"\" alt=\""+buttonAlt+"\" \/><\/a>\n";
        }

        if(codetype == "email")
            previewCode = previewCode + '<br /><a href="http://www.skype.com/go/download">Get Skype</a> and call me for free.<br /><br />';
    
        button_preview.innerHTML = previewCode;
        
        // here we do final code
        
        var button_finalcode = document.getElementById("btn-finalcode");
        
        if(buttonstatus == "yes") {
            if(!isWizard) { buttonfunction = "call"; }
            var link_tag = "<a href=\"skype:"+skypename+"?"+buttonfunction+"\"><img src=\"http://mystatus.skype.com"+buttonFilename+"/"+skypenameWeb+"\" style=\"border: none;\" width=\""+buttonWidth+"\" height=\""+buttonHeight+"\" alt=\""+buttonAlt+"\" \/><\/a>\n";
        } else {
            var link_tag = "<a href=\"skype:"+skypename+"?"+buttonfunction+"\"><img src=\"http://download.skype.com/share/skypebuttons/buttons/"+buttonFilename+"\" style=\"border: none;\" width=\""+buttonWidth+"\" height=\""+buttonHeight+"\" alt=\""+buttonAlt+"\" \/><\/a>\n";
        }
        
        switch(codetype) {
            case 'web':
                if(skypename == "echo123" || skypename == "") {
                    button_finalcode.value = "Please fill in your Skype Name in field (1)";
                } else {
                    button_finalcode.value = comment_text+"\n"+js_tag+"\n"+link_tag;
                }
                break;
            case 'email':
                link_tag += "<br /><a href=\"http://www.skype.com/go/download\">Get Skype<\/a> and call me for free.<br \/><br \/>";
                if(skypename == "echo123" || skypename == "") {
                    button_finalcode.value = "Please fill in your Skype Name in field (1)";
                } else {
                    button_finalcode.value = link_tag;
                }
                break;
            default:
                break;
        }
    }
}


var request;
function doStatusCheck() {
    url = "status.php?skypename="+skypename+""
    if(window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        request.onreadystatechange = updateStatus;
        request.open("GET", url, true);
        request.send(null);
    } else if(window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
        if(request) {
            request.onreadystatechange = updateStatus;
            request.open("GET", url, true);
            request.send();
        }
    }
}

function updateStatus() {
    if(request.readyState == 4) {
        if(request.status == 200) {
            response = request.responseText;
            var status_reply = document.getElementById("status-reply");
            if(response == 0) {
                status_reply.style.display = "block";
            } else {
                status_reply.style.display = "none";
            }
        } else {
        }
    }
}

function saveFile() {
    var myForm = document.getElementById("saveForm");
    myForm.submit();
    return false;
}