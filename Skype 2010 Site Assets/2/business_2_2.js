YAHOO.util.Event.onAvailable('email', function()
{
	if (!this.value.length) this.value = this.title;
	
	YAHOO.util.Event.addListener(this, 'focus', function()
	{
		if(this.value == this.title) this.value = "";
	});
	
	YAHOO.util.Event.addListener(this, 'blur', function()
	{
		if(!this.value.length) this.value = this.title;
	});
});

function submitForm(id) {
	var D = YAHOO.util.Dom;
	if(subscribeCheckEmail(D.get('email').value)) {
		D.get(id).submit();	
	}
}

function emailFieldEmpty(field) {
	var D = YAHOO.util.Dom;
	var field = D.get(field);
    if (field.value == "Enter your e-mail address") {
		field.value = "";
    }
	console.log(field.value);
}
function emailFieldFill(field)
{
    if (!document.getElementById(field).value.length)
    {
        document.getElementById(field).value = "Enter your e-mail address";
    }
}

function subscribeCheckEmail(email)
{
    var emailRE = /^['_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.(([a-z]{2,3})|(aero|coop|info|museum|name))$/i;
    if (!emailRE.test(email))
    {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

// For the boss page (/business/convinceboss/)
if (typeof YAHOO != "undefined" && typeof YAHOO.util.Event != "undefined"
    && typeof SKYPE != "undefined" && typeof SKYPE.util.Clipboard != "undefined")
{
    if (typeof _trim != "function")
    {
        // From qForms lib
        function _trim(s){ return _rtrim(_ltrim(s)); }
        function _ltrim(s){
        	var w = " \r\n\t\f";
        	// remove all beginning white space
        	while( w.indexOf(s.charAt(0)) != -1 && s.length != 0 ) s = s.substring(1);
        	return s;
        }
        function _rtrim(s){
        	var w = " \r\n\t\f";
        	// remove all ending white space
        	while( w.indexOf(s.charAt(s.length-1)) != -1 && s.length != 0 ) s = s.substring(0, s.length-1);
        	return s;
        }
    }

    /*
    YAHOO.util.Event.onAvailable("business-clipboard-copy", function() {
        // Lets add special onclick handler
        YAHOO.util.Event.addListener("business-clipboard-copy", "click", function()
        {
            var txtDiv = document.getElementById('sendmailContent');
            if (!txtDiv || typeof txtDiv.innerText == "undefined")
                return;
            var txt = txtDiv.innerText.split("\n");
            
            // Now lets ltrim the text
            for (var i=0; i < txt.length; i++)
            {
                txt[i] = _ltrim(txt[i]);
            }
            txt = txt.join("\n");
            
            // And add the link
            txt = _trim(txt) + " - http://www.skype.biz/\n";
            
            try {
                // And now try to copy it to clipboard
                SKYPE.util.Clipboard.set(txt);
            } catch (e) {
                SKYPE.log("Could not set the business text in clipboard.");
            }
        });
    });
    */
}

YAHOO.util.Event.onDOMReady(function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    D.getElementsByClassName("supportCountrySelector", "select", "", function(node) {
        E.addListener(node, "change", function() {
            D.getAncestorByTagName(this, "form").submit();
        });
    });
});