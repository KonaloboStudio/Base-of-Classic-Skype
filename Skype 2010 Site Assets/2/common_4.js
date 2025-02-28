var runOnLoad = new Array();
function OnLoad() {
	var func;
	for (var i=0; i < runOnLoad.length; i++) {
		func = runOnLoad[i];
		func();
	}
	return true;
}
function setTimezoneCookie() {
	if (document.cookie.indexOf('timezone=') == -1)
		document.cookie = "timezone=" + (new Date()).getTimezoneOffset() / 60;
}
function NotYet() {
	alert('Not yet implemented.');
	return false;
}

/* Window opener */
function OpenWin(windowURL, windowWidth, windowHeight, windowName, windowFeatures, noPopup) {
	
	if (typeof(this.href) != "undefined")
		windowURL = this.href;
	
	// Add popup flag to querystring
	if (typeof(noPopup) == "undefined") {
		if (windowURL.lastIndexOf("?") >= 0)
			windowURL = windowURL + "&popup=true";
		//else if (windowURL.substr(windowURL.length-1, 1) != "/")
		//	windowURL = windowURL + "/?popup=true";
		else
			windowURL = windowURL + "?popup=true";
	}

	// Default window sizes
	if (typeof(windowWidth) == "undefined" || windowWidth == "default")
		windowWidth = "730";
	if (typeof(windowHeight) == "undefined" || windowHeight == "default")
		windowHeight = "470";

	// Default window name
	if (typeof(windowName) == "undefined" || windowName == "default")
		windowName = "popup";

	// Default window features
	if (typeof(windowFeatures) == "undefined" || windowFeatures == 'default')
		windowFeatures = "top=50,left=50,toolbar=no,location=no,menubar=no,scrollbars=yes,status=no,resizable=yes";

	// Open and focus
	popupWindow = window.open(windowURL, windowName, windowFeatures + ',width=' + windowWidth + ',height=' + windowHeight);
	if (popupWindow) popupWindow.focus();

	return false;
}

function trim(s) {
	return rtrim(ltrim(s));
}
function ltrim(s) {
	var w = " \n\t\f";
	while (w.indexOf(s.charAt(0)) != -1 && s.length != 0)
		s = s.substring(1);
	return s;
}
function rtrim(s) {
	var w = " \n\t\f";
	while (w.indexOf(s.charAt(s.length-1)) != -1 && s.length != 0)
		s = s.substring(0, s.length-1);
	return s;
}

function MapOnClickHandlers(relValue, functionName) {
	if (!document.getElementsByTagName)
		return;
	var links = document.getElementsByTagName("a");
	for (var i=0; i < links.length; i++) {
		if (links[i].rel == relValue)
			links[i].onclick = functionName;
	}
}

function highlightErrors() {
	if (typeof(errorIDs) == "undefined")
		return;
	
	if (errorIDs.length && document.getElementsByTagName && document.getElementById) {
		var aLabels = document.getElementsByTagName("LABEL");
		/*for (var i=0; i < errorIDs.length; i++) {
			var errElem = document.getElementById(errorIDs[i]);
			if (errElem) {
				if (errElem.className.length)
					errElem.className += " error";
				else
					errElem.className = "error";
			}
		}*/
		for (var i=0; i < aLabels.length; i++) {
			for (var j=0; j < errorIDs.length; j++) {
				if (aLabels[i].htmlFor == errorIDs[j]) {
					if (aLabels[i].className.length)
						aLabels[i].className += " error";
					else
						aLabels[i].className = "error";
				}
			}
		}
	}
}

// Original by Andreas Karlsson
function createCallbackManager(callbacks)
{
    // If called without "new", create object and return it's invoke method.
    if (!this.isObject)
    {
        return (new createCallbackManager(arguments)).invoke;
    }
    
    var listenerArray = new Array(); // Hashmap of callback functions.
    
    // If callbacks were included at object creation, add them!
    for (var i = 0; i < callbacks.length; i++)
    {
        listenerArray[callbacks[i].toString()] = callbacks[i];
    }
    
    // Call all the callbacks.
    this.invoke = function(e)
    {
        e = e ? e : window.event;
        e.properThis = this;
        for (fName in listenerArray)
        {
            listenerArray[fName](e);
        }
    }
    
    this.invoke.addCallback = function(callback)
    {
        listenerArray[callback.toString()] = callback;
    }
    
    this.invoke.removeCallback = function(callback)
    {
        delete listenerArray[callback.toString()];
    }
}
createCallbackManager.prototype.isObject = true; // Only used to test if in construction or not.

var doTrace = false;
// Enable tracing on staging and testing or if cookie says so
if (typeof(location) != "undefined" && (location.host.search(/staging|test/) != -1 || document.cookie.indexOf("trace=true") != -1))
    doTrace = true;
// Disable tracing if cookie says so
if (document.cookie.indexOf("trace=false") != -1)
    doTrace = false;

function trace(msg)
{
    if (!doTrace)
        return false;
    if (typeof(opera) != "undefined" && opera.postError)
        opera.postError("TRACE: " + msg);
    else
        alert("TRACE: " + msg);
    return true;
}