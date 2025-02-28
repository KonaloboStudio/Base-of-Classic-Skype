function NiftyCheck(){
if(!document.getElementById || !document.createElement)
    return(false);
var b=navigator.userAgent.toLowerCase();
if(b.indexOf("msie 5")>0 && b.indexOf("opera")==-1)
    return(false);
return(true);
}

function Rounded(selector,bk,color,size){
var i;
var v=getElementsBySelector(selector);
var l=v.length;
for(i=0;i<l;i++){
    AddTop(v[i],bk,color,size);
    AddBottom(v[i],bk,color,size);
    }
}

function RoundedTop(selector,bk,color,size){
var i;
var v=getElementsBySelector(selector);
for(i=0;i<v.length;i++)
    AddTop(v[i],bk,color,size);
}

function RoundedBottom(selector,bk,color,size){
var i;
var v=getElementsBySelector(selector);
for(i=0;i<v.length;i++)
    AddBottom(v[i],bk,color,size);
}

function AddTop(el,bk,color,size){
var i;
var d=document.createElement("b");
var cn="r";
var lim=4;
if(size && size=="small"){ cn="rs"; lim=2}
d.className="rtop";
d.style.backgroundColor=bk;
if(document.all)
    d.style.width = getStyle() + "px";
for(i=1;i<=lim;i++){
    var x=document.createElement("b");
    x.className=cn + i;
    x.style.backgroundColor=color;
    d.appendChild(x);
    }
el.insertBefore(d,el.firstChild);
}

function AddBottom(el,bk,color,size){
var i;
var d=document.createElement("b");
var cn="r";
var lim=4;
if(size && size=="small"){ cn="rs"; lim=2}
d.className="rbottom";
d.style.backgroundColor=bk;
if(document.all)
    d.style.width = getStyle() + "px";
for(i=lim;i>0;i--){
    var x=document.createElement("b");
    x.className=cn + i;
    x.style.backgroundColor=color;
    d.appendChild(x);
    }
el.appendChild(d,el.firstChild);
}

function getElementsBySelector(selector){
var i;
var s=[];
var selid="";
var selclass="";
var tag=selector;
var objlist=[];
if(selector.indexOf(" ")>0){  //descendant selector like "tag#id tag"
    s=selector.split(" ");
    var fs=s[0].split("#");
    if(fs.length==1) return(objlist);
    return(document.getElementById(fs[1]).getElementsByTagName(s[1]));
    }
if(selector.indexOf("#")>0){ //id selector like "tag#id"
    s=selector.split("#");
    tag=s[0];
    selid=s[1];
    }
if(selid!=""){
    objlist.push(document.getElementById(selid));
    return(objlist);
    }
if(selector.indexOf(".")>0){  //class selector like "tag.class"
    s=selector.split(".");
    tag=s[0];
    selclass=s[1];
    }
var v=document.getElementsByTagName(tag);  // tag selector like "tag"
if(selclass=="")
    return(v);
for(i=0;i<v.length;i++){
    var myid = v[i].id;
    if(v[i].className==selclass && myid.indexOf("gnav") != "-1"){
        objlist.push(v[i]);
        }
    }
return(objlist);
}

function getStyle() {
    var z = getElementsBySelector('li.selected');
    divname = z[0].id;
	var x = document.getElementById(divname);
	if(x.currentStyle) {
		var y = x.offsetWidth;
        return y;
    }
}

function toggleLogin() {
    var expanded = document.getElementById("login-panel");
    
    if(expanded.style.display == "none" || !expanded.style.display) {
        expanded.style.display = "block";
        document.getElementById('skype-name').focus();
    }
    else if(expanded.style.display == "block") {
        expanded.style.display = "none";
    }

    return false;
}

function ieHover() {
	if(!document.all)
		return false;
		
	var elements = Array('nav-download','nav-skypeout','nav-share','nav-shop','nav-help','nav-aboutus','nav-partners','nav-blogs','nav-forums','nav-business','languages-container');
    for(var i = 0; i < elements.length; i++) {
        var element = document.getElementById(elements[i]);
        if(!element) {
	    } else {
            element.onmouseover = function () {
                myClassname = this.className;
                this.className = myClassname + " hover";
            }
            element.onmouseout = function () {
                myClassname = this.className;
                myClassname = myClassname.replace(/hover/,"")
                this.className = myClassname;
            }
        }
	}
}

function roundedCorners(){
    if(!NiftyCheck()) {
        return;
    } else {
        Rounded("li.selected","white","#00AFF0","small");
    }
    
    if(document.all && document.getElementById('nav-download')) {
        ieHover();
    }
    
    if(document.cookie.indexOf("loggedin") == "-1")
        return false;
    
    var skypeNameElement = document.getElementById('skypeName');
    var loggedinElement = document.getElementById('logged-in');
    var loggedoutElement = document.getElementById('logged-out');
    
    if(!skypeNameElement || !loggedinElement || !loggedoutElement)
        return false;

    var skypeName = skypeNameElement.innerHTML;
    if(skypeName.length != 0){
    } else {
        var cookie = document.cookie.split(';');
        for(var i=0;i < cookie.length;i++) {
            var c = cookie[i];
            if(c.indexOf("username") != "-1") {
                c = c.replace(/username=/,"");
                c = c.replace(/[^-_,.a-zA-Z0-9]/g,"");
                c = c.substring(0,32);
                skypeNameElement.innerHTML = escape(c);
                loggedoutElement.style.display = "none";
                loggedinElement.style.display = "block";
            }
        }
    }
}

if(typeof window.addEventListener != 'undefined') {
	window.addEventListener('load', roundedCorners, false);
} else if(typeof window.attachEvent != 'undefined') {
	window.attachEvent('onload', roundedCorners);
}

function passwordReminder(link) {
    if(document.getElementById("skype-name") && document.getElementById("skype-name").value.length) {
        link.href += '?username='+escape(document.forms[0].username.value);
    }
}

function changeBalance(newbalance) {
    var userbalance = document.getElementById('userbalance');
    userbalance.innerHTML = escape(newbalance);
}


function inidDownload(downloadLink, redirectLink) {
    var isIe = (window.navigator.userAgent.toUpperCase().indexOf('MSIE') != -1);
    var isOpera = (window.navigator.userAgent.toUpperCase().indexOf('OPERA') != -1);
	if(!downloadLink || !redirectLink) {
		var downloadLink = location.href.indexOf("beta") != -1 ? "/go/getskype-beta" : "/go/getskype";
		var redirectLink = location.href.indexOf("beta") != -1 ? "downloading_beta.html" : "downloading.html";
	}
	if(isIe && !isOpera) {
		dlWindow = window.open(downloadLink, '_blank','toolbar=0,location=no,directories=0,status=0,scrollbars=no,resizable=0,width=10,height=10,top=0,left=0');
	}
	document.location = redirectLink;
	return false;
}

function inidMobileDownload(downloadLink, redirectLink) {
	if(!downloadLink || !redirectLink) {
		var downloadLink = "/go/getskype-pocketpc-beta";
		var redirectLink = "downloading.html"
	}
	
	dlWindow = window.open(downloadLink, '_blank','toolbar=0,location=no,directories=0,status=0,scrollbars=no,resizable=0,width=10,height=10,top=0,left=0');
	
	document.location = redirectLink;
	return false;
}