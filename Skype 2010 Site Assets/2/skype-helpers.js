SKYPE.namespace("navigation");
SKYPE.namespace("util");
SKYPE.namespace("user");
SKYPE.namespace("helpers");

SKYPE.navigation.mouseOverTabs = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        var mainMenuItems = D.getElementsBy(function(el) { return el; }, 'li', 'mainNavigation');
        for (var i=0; i < mainMenuItems.length; i++)
        {
            if (!D.hasClass(mainMenuItems[i], "active"))
            {
                E.addListener(mainMenuItems[i], "mouseover", function() { D.addClass(this, "hover"); });
                E.addListener(mainMenuItems[i], "mouseout", function() { D.removeClass(this, "hover"); });
            }
        }
    });
}();

SKYPE.navigation.removeIEFlicker = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        if(SKYPE.util.Browser.isIE && !SKYPE.util.Browser.isIE7){
            try {
                document.execCommand("BackgroundImageCache", false, true);
            } catch(e) {
            
            }
        }
    });
}();

/* NOTE: Use SKYPE.util.smartDefaultTextFields instead! */
SKYPE.navigation.clearSearchInput = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        if(D.get("google-input")) {
            var searchField = D.get("google-input");
            var initialValue = searchField.value;
            E.addListener(searchField, "focus", function() { if(searchField.value == initialValue) { searchField.value = ""; } });
            E.addListener(searchField, "blur", function() { if(searchField.value == "") { searchField.value = initialValue; } });
        }
    });
}();

SKYPE.navigation.changeLanguage = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        E.addListener(D.get("userLanguage"), "change", function() {
            // replace [LC] in form action with language code from userLanguage selection
            var changeUrl = D.get("userPreferencesForm").action.replace(/(%5B|\[)LC(%5D|\])/g, D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value);
            
            SKYPE.user.Preferences.setLanguage(D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value);
            SKYPE.user.Preferences.save();

            // if not changing to light site then check if we can keep the page
            if(!D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value.match("(zh-Hans|cs|da|nl|et|fi|ko|no|hu|pt-pt|es-world|ar)") && !window.location.hostname.match("secure|search|share|support|about|jobs")) {
                // split window.location into urlArray - protocol+hostname, intl/XX-XXXXX, rest of the url
                var reg = new RegExp("(^"+window.location.protocol+"//"+window.location.hostname+"/)"+"(intl/[a-zA-Z-]{2,8})?/?(.*)");
                var urlArray = reg.exec(window.location);
                if(typeof urlArray[1] != undefined) {
                    var newLocation = urlArray[1];  
                    newLocation +=  "intl/" + D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value + "/";
                    if(typeof urlArray[3] != undefined) {
                        newLocation += urlArray[3];
                    }
                    changeUrl = newLocation;
                }
            }
            window.location = changeUrl;
        });
        E.addListener(window, "load", function() {
            if (typeof SKYPE.user.Preferences.getLanguage() != "undefined" && SKYPE.user.Preferences.getLanguage() == "") {
                SKYPE.user.Preferences.setLanguage(D.get("userLanguage").options[D.get("userLanguage").selectedIndex].value);
                SKYPE.user.Preferences.save();
            }
        });
    });
}();

SKYPE.navigation.buttonHovers = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function()
    {
        var buttonsOnPage = D.getElementsByClassName("button", "a");
        for (var i=0; i < buttonsOnPage.length; i++)
        {
                E.addListener(buttonsOnPage[i], "mouseover", function() { D.addClass(this, "buttonHover"); });
                E.addListener(buttonsOnPage[i], "mouseout", function() { D.removeClass(this, "buttonHover"); });
                E.addListener(buttonsOnPage[i], "mousedown", function() { D.addClass(this, "buttonActive"); });
        }
    });
}();

// Add image alpha for IE on pageload
SKYPE.loadImgPngAlpha = function() 
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.addListener(window, "load", function()
    {
        SKYPE.imgPngAlpha();
    });
}();

// So one can add image alpha separately from page load as well
SKYPE.imgPngAlpha = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    // if (navigator.platform == "Win32" && navigator.appName == "Microsoft Internet Explorer") {
    if (YAHOO.env.ua.ie && YAHOO.env.ua.ie < 7) {
        for (var i = 0; i < document.images.length; i++) {
            var img = document.images[i];
            var imgName = img.src.toUpperCase();
            if(imgName.substring(imgName.length-3, imgName.length) == "PNG" && img.className.indexOf("alphaPng",0) != -1) {
                var imgID = (img.id) ? "id='" + img.id + "' " : "";
                var imgClass = (img.className) ? "class='" + img.className + "' " : "";
                var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
                var imgStyle = "display:inline-block;" + img.style.cssText;
                if(img.align == "left") imgStyle = "float:left;" + imgStyle;
                if(img.align == "right") imgStyle = "float:right;" + imgStyle;
                if(img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
                var strNewHTML = "<span " + imgID + imgClass + imgTitle
                + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
                + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
                + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
                img.outerHTML = strNewHTML;
                i = i-1;
            }
        }
    }
};

/* Settings */

/* @legal: Cookie handling code from the book "JavaScript: The Definitive Guide" by David Flanagan published by O'Reilly. ISBN: 0-596-00048-0 */
SKYPE.util.Cookie = function(document, name, hours, path, domain, secure, fieldsep, valuesep)
{
    this.document = document;
    this.name = name;
    if (hours) {
        this.expiration = new Date((new Date()).getTime() + hours*3600000);
    } else {
        this.expiration = null;
    }
    this.path = path ? path : null;
    this.domain = domain ? domain : null;
    this.secure = secure ? true : false;
    this.fieldsep = fieldsep ? fieldsep : ':';
    this.valuesep = valuesep ? valuesep : '&';
    this.isSimpleValue = false;
    // Actual cookie data is held in this one
    this.data = {};
};
SKYPE.util.Cookie.prototype = {
    /**
     * Saves values set in cookie.
     */
    store: function (doSort) {
        var cookieval = "";
        var cookie = "";
        var keys = [];
        if (typeof this.data == "object")
        {
            for(var prop in this.data)
            {
                keys.push(prop);
            }
            if (doSort)
                keys.sort();
            for (var i=0; i < keys.length; i++)
            {
                if (cookieval != "") cookieval += this.fieldsep;
                cookieval += keys[i] + this.valuesep + escape(this.data[keys[i]]);
            }
        }
        else
        {
            cookieval = escape(this.data.toString());
        }
        cookie = this.name + '=' + cookieval;
        if (this.expiration)
            cookie += '; expires=' + this.expiration.toGMTString();
        if (this.path) cookie += '; path=' + this.path;
        if (this.domain) cookie += '; domain=' + this.domain;
        if (this.secure) cookie += '; secure';
        this.document.cookie = cookie;
    },
    
    /**
     * Loads values from cookie
     */
    load: function()
    {
        if (this.isSimpleValue && typeof this.data != "string")
            this.data = this.data.toString();
        var allcookies = this.document.cookie;
        if (allcookies == "") return false;
        var start = allcookies.indexOf(this.name + '=');
        if (start == -1) return false;
        start += this.name.length + 1;
        var end = allcookies.indexOf(';', start);
        if (end == -1) end = allcookies.length;
        var cookieval = allcookies.substring(start, end);
        if (!this.isSimpleValue)
        {
            var a = cookieval.split(this.fieldsep);
            for (var i=0; i < a.length; i++)
                a[i] = a[i].split(this.valuesep);
            for (var i = 0; i < a.length; i++)
                this.data[a[i][0]] = unescape(a[i][1]);
        } else {
            this.data = cookieval;
        }
        return true;
    },
    
    /**
     * Removes cookie if it was set.
     */
    remove: function()
    {
        var cookie = this.name + '=';
        if (this.path) cookie += '; path=' + this.path;
        if (this.domain) cookie += '; domain=' + this.domain;
        cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
        this.document.cookie = cookie;
    }
};

/**
 * Skype Preference Cookie Handling
 */
SKYPE.user.Preferences = function()
{
    var values = {
        'LC':''
        ,'CCY':''
        ,'CC':''
        ,'TZ':''
        ,'VER':''
        ,'TS':''
        ,'TM':''
        ,'VAT':''
        ,'UCP':''
        ,'ENV':''
    };
    
    var domain = null;
    var cookieName = "SC";
    var cookie = null;
    var path = "/";
    var secure = false;
    var expires = null;
    var _parsing = false;
    
    var platformNames = {
        '0':'windows'
        ,'1':'pocketpc'
        ,'2':'linux'
        ,'3':'osx'
    };
    
    return {
        init: function()
        {
            this.setDomain();
            expires = 365;
            this.parseCookie();
        },
        getCookie: function()
        {
            var c = new SKYPE.util.Cookie(document, cookieName, expires, path, domain, secure, ":", "=");
            c.load();
            return c;
        },
        scrubCookieValue: function(value)
        {
            return value.replace(/[\n\r]/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        setDomain: function(dom)
        {
            if (dom) {
                domain = dom;
            } else if (location && location.hostname) {
                var parts = location.hostname.split(".");
                var i = parts.length;
                if (i >= 2 && isNaN(parseInt(parts[i-1]))) {
                    domain = "."+parts[i-2]+"."+parts[i-1];
                }
            }
        },
        parseCookie: function()
        {
            cookie = this.getCookie();
            var knownSetters = {
                'LC': 'setLanguage'
                ,'CCY': 'setCurrency'
                ,'CC': 'setCountryCode'
                ,'TZ': 'setTimezone'
                ,'VER': 'setVersion'
                ,'TS': 'setTimeStamp'
                ,'TM': 'setTimeModified'
                ,'VAT': 'setVatEligible'
                ,'UCP': 'setClientProfile'
            };
            _parsing = true;
            for (var prop in cookie.data)
            {
                if (prop.search(/[A-Z]+/) != -1)
                {
                    if (knownSetters[prop])
                        this[knownSetters[prop]](cookie.data[prop]);
                    else
                        this.setValue(prop, cookie.data[prop]);
                }
            }
            _parsing = false;
            return true;
        },
        
        save: function()
        {
            for (var val in values)
            {
                cookie.data[val] = values[val];
            }
            cookie.store(true);
        },
        
        clear: function()
        {
            cookie.remove();
        },
        
        getValue: function(key, def)
        {
            if (typeof def == "undefined")
                def = "";
            if (values[key] && values[key] != null && values[key].length)
                return values[key];
            return def;
        },
        setValue: function(key, value)
        {
            values[key] = value.toString();
        },
        
        touchCookie: function()
        {
            var now = parseInt(new Date().getTime()/1000);
            if (_parsing)
                return false;
            if (!this.getTimeStamp().length)
                this.setValue("TS", now);
            this.setValue("TM", now);
            return true;
        },
        
        setLanguage: function(value)
        {
            /* TODO: Should do validation here before setting? */
            this.setValue("LC", value.replace(/_/g, "-"));
            this.touchCookie();
            return true;
        },
        getLanguage: function(def)
        {
            return this.getValue("LC", def);
        },
        
        setCurrency: function(value)
        {
            if (/^([A-Z]{3}|[0-9]{3})$/.test(value) == false)
                value = "";
            this.setValue("CCY", value);
            this.touchCookie();
            return true;
        },
        getCurrency: function(def)
        {
            return this.getValue("CCY", def);
        },
        
        setCountryCode: function(value)
        {
            if (/^([A-Z]{2,3}|[0-9]{3})$/.test(value) == false)
                value = "";
            this.setValue("CC", value);
            this.touchCookie();
            return true;
        },
        getCountryCode: function(def)
        {
            return this.getValue("CC", def);
        },
        
        formatDecimal: function(value)
        {
            if (value < 10)
                return "0" + value;
            return value;
        },
        
        setTimezone: function(value)
        {
            if (/^([-+]((0[0-9]|1[0-3]):[0-5][0-9]|14:00)|Z)$/.test(value) == false)
            {
                var matches = value.match(/^([-+]?)([0-9]{1,2})(\.[0-9])?$/);
                if (matches)
                {
                    var sign = matches[1] && matches[1].length ? matches[1] : '+';
                    var hours = parseInt(matches[2]);
                    var minutes = matches[3] && matches[3].length ? parseInt(60 * parseFloat(matches[3])) : 0;
                    if (hours > 14) hours = 14;
                    if (hours == 14) minutes = 0;
                    if (minutes > 59) minutes = 0;
                    value = sign+this.formatDecimal(hours)+":"+this.formatDecimal(minutes);
                }
            }
            this.setValue("TZ", value);
            this.touchCookie();
            return true;
        },
        getTimezone: function(def)
        {
            return this.getValue("TZ", def);
        },
        
        setVersion: function(value)
        {
            if (typeof value == "object")
            {
                var defaultValues = {
                    'platform':''
                    ,'platformname':''
                    ,'version':''
                    ,'campaign':''
                    ,'partner':''
                    ,'partnername':''
                };
                for (var prop in defaultValues)
                {
                    if (value[prop] == null)
                        value[prop] = defaultValues[prop];
                }
                var splitVer = value.version.split(".");
                
                value = value.platform+"/"+splitVer[0]+"."+splitVer[1]+"."+(value.partner.length ? value.partner : splitVer[2])+"."+splitVer[3]+"/"+value.campaign;
            }
            
            if (/^[0-9]?\/[0-9]{1,2}(\.[0-9]{1,3}){3}\/[0-9]*$/.test(value) == false)
                return false;
            
            this.setValue("VER", value);
            this.touchCookie();
            return true;
        },
        getVersion: function(def)
        {
            return this.getValue("VER", def);
        },
        getParsedVersion: function(def)
        {
            var result = {
                'platform':''
                ,'platformname':''
                ,'version':''
                ,'campaign':''
                ,'partner':''
                ,'partnername':''
            };
            var ver = this.getVersion(def);
            if (!ver.length)
                return result;
            var splitVer = ver.split("/");
            result.platform = splitVer[0];
            result.version = splitVer[1];
            result.campaign = splitVer[2];
            splitVer = result.version.split(".");
            result.partner = (splitVer.length > 2 && splitVer[2]) ? splitVer[2] : 0;
            return result;
        },
        
        setTimeStamp: function(value)
        {
            this.setValue("TS", value);
            this.touchCookie();
        },
        getTimeStamp: function(def)
        {
            return parseInt(this.getValue("TS", def));
        },
        
        setTimeModified: function(value)
        {
            if (_parsing)
            {
                this.setValue("TM", value);
            }
            this.touchCookie();
        },
        getTimeModified: function(def)
        {
            return parseInt(this.getValue("TM", def));
        },
        
        setClientProfile: function(value)
        {
            this.setValue("UCP", value);
            this.touchCookie();
        },
        getClientProfile: function(def)
        {
            return this.getValue("UCP", def);
        },
        
        setVatEligible: function(value)
        {
            var result = "";
            // If string was passed in, then only accept "true" and "false" as valid
            if (typeof value == "string")
            {
                if (value == "true") result = "true";
                else if (value == "false") result = "false";
                else result = "";
            }
            // Turn booleans into strings
            else if (typeof value == "boolean")
            {
                result = value ? "true" : "false";
            }
            // Accept only numbers 0 and 1, nothing else
            else if (typeof value == "number")
            {
                if (value == 1) result = "true";
                else if (value == 0) result = "false";
                else result = "";
            }
            this.setValue("VAT", result);
            this.touchCookie();
        },
        isVatEligible: function()
        {
            var val = this.getValue("VAT");
            if (val == "true") return true;
            else if (val == "false") return false;
            else return null;
        },
        
        setEnv: function(value)
        {
            value = value.replace(/\//g, "-");
            
            if (!this.getEnv(value))
            {
                var env = this.getValue("ENV");
                env = env.length ? env.split("/") : [];
                env.push(value);
                this.setValue("ENV", env.join("/"));
                this.touchCookie();
            }
        },
        getEnv: function(value)
        {
            value = value.replace(/\//g, "-");
            
            var env = this.getValue("ENV").split("/");
            for (var i = 0; i < env.length; i++)
            {
                if (env[i] === value) return true;
            }
            return false;
        },
        deleteEnv: function(value)
        {
            var env = this.getValue("ENV").split("/");
            for (var i=0; i < env.length; i++)
            {
                if (env[i] === value)
                {
                    env.splice(i, 1);
                }
            };
            this.setValue("ENV", env.join("/"));
            this.touchCookie();
        },
        clearEnv: function()
        {
            this.setValue("ENV", "");
            this.touchCookie();
        },
        
        debug: function()
        {
            var result = "";
            for (var key in values)
            {
                result = result + key + " = " + values[key] + "\n";
            }
            return result;
        }
    };
}();
SKYPE.user.Preferences.init();

SKYPE.findParentTag = function(el, tagName)
{
    tagName = tagName.toUpperCase();

    while (el.parentNode)
    {
        if (el.parentNode.tagName.toUpperCase() == tagName)
        {
            return el.parentNode;
        }
        el = el.parentNode;
    }

    return null;
};

/* Cancels default functionality for an element */

SKYPE.util.cancelDefault = function(e) {
    var E = YAHOO.util.Event;
    E.preventDefault(e);
};

/* changes form buttons on pages */

SKYPE.submitButtons = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    E.onDOMReady(function()
    {
        var formsOnPage = document.getElementsByTagName("form");
        for (var i=0; i < formsOnPage.length; i++) {
                var buttons = formsOnPage[i].getElementsByTagName("button");
                if(buttons[0] != undefined) {
                    var buttonsLength = buttons.length;
                    for (var k = buttonsLength - 1; k >= 0; k--) {
                        if(buttons[k].className.indexOf('submitButton') > -1 || buttons[k].className.indexOf('glassButton') > -1) {
                            var buttonclasses = buttons[k].className.split(" ");
                            var buttonvalue = buttons[k].innerHTML;
                            var wrapper = document.createElement("span");
                            var a = document.createElement("a");
                            var innerspan = document.createElement("span");
                            var defaultclass = true;
                            var colorclass, iconclass;
                            if(buttons[k].className.indexOf('big') > -1) {
                                D.addClass(wrapper, "button");
                            } else {
                                D.addClass(wrapper, "buttonSmall"); 
                            }
                            for (var j=0; j < buttonclasses.length; j++) {
                                if (buttonclasses[j] == "blue" || buttonclasses[j] == "green" || buttonclasses[j] == "yellow") {
                                    defaultclass = false;
                                    colorclass = buttonclasses[j];
                                } else if (buttonclasses[j].match("shop") || buttonclasses[j].match("skypeCredit") || buttonclasses[j].match("skypeOnlineNr") || buttonclasses[j].match("skypeVoicemail")) {
                                    iconclass = buttonclasses[j];
                                } else {
                                    D.addClass(wrapper, buttonclasses[j]);
                                }
                                if(buttonclasses[j] == "disabled") {
                                    D.addClass(a, "disabled");
                                }
                            }
                            if (defaultclass) {
                                D.addClass(a, "gray");
                            } else {
                                D.addClass(a, colorclass);
                            }
                            D.addClass(a, iconclass);
                            wrapper.appendChild(a);
                            var buttonId = "submitButton"+i;
                            if (buttons[k].id != "") {
                                buttonId = buttons[k].id;
                            }
                            wrapper.setAttribute("id", buttonId);
                            a.appendChild(innerspan);


                            if(buttons[k].className.indexOf('glassButton') > -1 && buttons[k].value.length > 0) {
                                a.setAttribute("href",buttons[k].value);
                            } else {
                                a.setAttribute("href","#");
                            }
                            innerspan.innerHTML = buttonvalue;
                            buttons[k].parentNode.appendChild(wrapper);

                            var buttonType = buttons[k].getAttribute('type');
                            if (buttonType == "submit") {
                                var submitbutton = D.get(buttonId);
                                E.addListener(a, "click", SKYPE.util.cancelDefault);
                                E.addListener(a, "click", function(e)
                                {
                                    if (D.hasClass(a, "disabled")) {
                                        YAHOO.util.Event.stopEvent(e);
                                        return false;
                                    }

                                    var frm = SKYPE.findParentTag(this,"form");
                                    if (typeof FIC_checkForm != "undefined") {
                                        var status = FIC_checkForm(e);
                                        if (!status) {
                                            YAHOO.util.Event.stopEvent(e);
                                            return false;
                                        }
                                    }
                                    frm.submit();
                                });
                            } else if (buttonType == "reset") {
                                var resetbutton = D.get(buttonId);
                                E.addListener(a, "click", SKYPE.util.cancelDefault);
                                E.addListener(a, "click", function()
                                {
                                    SKYPE.findParentTag(this,"form").reset();
                                });
                            } else if (buttonType == "button" && buttons[k].getAttribute('onclick')) {
                                a.setAttribute("onclick", buttons[k].getAttribute('onclick'));
                            }

                            var oldbutton = buttons[k].parentNode.removeChild(buttons[k]);
                        }
                        buttonclasses = buttonclasses.join(",");
                        if(buttonclasses.indexOf("submitButton") > -1) {
                            var submitbutton = D.get(buttonId);
                            E.addListener(submitbutton, "click", SKYPE.util.cancelDefault);
                            E.addListener(submitbutton, "click", function(e)
                            {
                                if (D.hasClass(a, "disabled")) {
                                    YAHOO.util.Event.stopEvent(e);
                                    return false;
                                }

                                var frm = SKYPE.findParentTag(this,"form");
                                if (typeof FIC_checkForm != "undefined") {
                                    var status = FIC_checkForm(e);
                                    if (!status) {
                                        YAHOO.util.Event.stopEvent(e);
                                        return false;
                                    }
                                }
                                frm.submit();
                            });
                        }
                    }
                }
            }
    });
}();


/**
 * Adds dummy text functionality to textfields based on title and value attributes
 */
SKYPE.util.smartDefaultTextFields = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    E.onDOMReady(function(){
        D.getElementsByClassName("defaultText", "", "", function() {
            if (this.value == "") {
                return;
            }
            if (this.value == "" && this.value != "") {
                this.value = this.title;
            }
            if (this.value != this.title) {
                D.removeClass(this, "defaultText");
            }
            E.addListener(this, "focus", function() {
                if (this.value == this.title) {
                    this.value = "";
                    D.removeClass(this, "defaultText");
                }
            });
            E.addListener(this, "blur", function() {
                if (this.value == "") {
                    this.value = this.title;
                    D.addClass(this, "defaultText");
                }
            });
        });
    });
}();


/* Load CSS with javascript help */

SKYPE.loadCss = function (filename) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
};

/* Filter for main and sub select box, depends on nested selectionsArray predefined */

SKYPE.subSelectBoxHandler = function(mainSelectId, subSelectId) {
    
    var addOption = function(el, optionText, optionValue) {

        var option = document.createElement("OPTION");                
        if (optionValue === false) {
            option.text = el.title;
        } else {
            option.text = optionText;            
            option.value = optionValue;    
        }
                
        try {
            el.add(option, null); // doesn't work in IE
        } catch(e) {
            el.add(option); // works in IE
        }
    };
    
    var addOptions = function(el, selectionsArray, indx) {
        for (var i = 1; i < selectionsArray.length; i++) {
            addOption(el, selectionsArray[i], indx);
        }
    };
    
    // add change handler for mainSelect
    E.addListener(D.get(mainSelectId), "change", function() {
        D.get(subSelectId).innerHTML = "";
        var selectedValue = this.options[this.selectedIndex].value;

        if (selectedValue != this.title) {
            addOptions(D.get(subSelectId), selectionsArray[selectedValue], true);
        } else {
            addOption(D.get(subSelectId), D.get(subSelectId).title, true);
        }
    });
    
    // build mainSelect
    for (var i = 0; i < selectionsArray.length; i++) {
        addOption(D.get(mainSelectId), selectionsArray[i][0], i);
    }
};


/**
 * Smooth scroll class
 *
 * Usage:
 * <a href="#target" class="smoothscroll">Scroll to #target</a>
 */
SKYPE.util.Scroll = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    var scroll = {
        _minStep: 100,
        _prevWin: {"x": -1, "y": -1},
        _delay: 19,
        getPos: function(el) {
            if (typeof el == "undefined") {

                var x1 = x2 = x3 = 0;
                var y1 = y2 = y3 = 0;

                if (document.documentElement) {
                    x1 = document.documentElement.scrollLeft || 0;
                    y1 = document.documentElement.scrollTop || 0;
                }

                if (document.body) {
                    x2 = document.body.scrollLeft || 0;
                    y2 = document.body.scrollTop || 0;
                }

                x3 = window.scrollX || 0;
                y3 = window.scrollY || 0;

                var x = Math.max(x1, Math.max(x2, x3));
                var y = Math.max(y1, Math.max(y2, y3));

            } else {
                var o = D.get(el);

                if (o) {
                    var x = o.offsetLeft;
                    var y = o.offsetTop;
                } else {
                    var x = null;
                    var y = null;
                }

            }


            return {"x": x, "y": y};
        },
        to: function(target) {
            if (typeof target == "undefined") {
                this.up();
            } else {
                var obj = this.getPos(target);
                if (obj.y != null) {
                    var win = this.getPos();
                    if (obj.y < win.y) {
                        this.up(target);
                    } else if (obj.y > win.y){
                        this.down(target);
                    }
                }
            }
        },
        up: function(target) {
            var obj = {};
            var win = this.getPos();
            if (typeof target != "undefined") {
                obj = this.getPos(target);
                obj.y = Math.max(0, obj.y - 8);
            }

            win.y = Math.max(win.y - (Math.max(this._minStep, Math.floor((win.y - obj.y) / 3))), obj.y);
            window.scrollTo(obj.x, win.y);

            if (win.y > obj.y) {
                window.setTimeout(
                    function(){
                        scroll.up(target);
                    }
                    ,this._delay
                );
            }
        },
        down: function(target) {
            var obj = {};
            var win = this.getPos();
            if (this._prevWin.y == win.y) {
                return true;
            }
            this._prevWin.y = win.y;

            if (typeof target != "undefined") {
                obj = this.getPos(target);
                obj.y = Math.max(0, obj.y - 8);
            }

            win.y = Math.min(win.y + (Math.max(this._minStep, Math.floor((obj.y - win.y) / 3))), obj.y);
            window.scrollTo(obj.x, win.y);

            if (win.y < obj.y && this._prevWin.y != win.y) {
                window.setTimeout(
                    function(){
                        scroll.down(target);
                    }
                    ,this._delay
                );
            }
        }
    };

    return {
        init: function() {
            E.onDOMReady(function(){
                D.getElementsByClassName("smoothscroll", "a", document, function() {
                    var uri = this.getAttribute("href").split("#");
                    if (uri[0] == document.location.href || uri[0] == "") {
                        anchor = true;
                    }
                    if (anchor) {
                        if (document.getElementById(uri[1])) {
                            E.addListener(this, "click", SKYPE.util.cancelDefault);
                            E.addListener(this, "click", function() {
                                scroll.to(uri[1]);
                            });
                        }
                    }
                });
            });
        }
    };
}();
SKYPE.util.Scroll.init();


/**
 * Add search field tweaks
 */
SKYPE.navigation.searchFieldTweaks = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    var _setDisabled = function(el) {
        if (typeof el == "undefined" || !el) {
            return;
        }

        if (el.tagName.toUpperCase() == "INPUT") {
            el.disabled = true;
        } else {
            D.addClass(el, "disabled");
        }
    };

    var _setEnabled = function(el) {
        if (typeof el == "undefined" || !el) {
            return;
        }

        if (el.tagName.toUpperCase() == "INPUT") {
            el.disabled = false;
        } else {
            D.removeClass(el, "disabled");
        }
    };

    E.onDOMReady(function()
    {
        D.getElementsByClassName("search", "input", document, function(){
            var initialValue = this.title;

            var frm = D.getAncestorByTagName(this, "FORM");
            var submitButton;

            var inputs = frm.getElementsByTagName("input");
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "submit") {
                    submitButton = inputs[i];
                    break;
                }
            }

            if (!submitButton) {
                var niceButton = D.getElementsByClassName("submitButton", "span", frm)[0];
                if (niceButton) {
                    submitButton = niceButton.getElementsByTagName("a")[0];
                }
            }

            if (SKYPE.util.Browser.isSafari) {
                this.setAttribute('type',      "search");
                this.setAttribute('accesskey', "s");
                this.setAttribute('autosave',  "com.skype."+this.id+"_history");
                this.setAttribute('results',   "5");
            }
            if (this.value == "") {
                this.value = initialValue;
            }
            if (this.value == initialValue) {
                this.style.color = "#666666";
                _setDisabled(submitButton);
            }
            E.addListener(this, "focus", function() {
                if(this.value == initialValue) {
                    this.style.color = "#000000";
                    this.value = "";
                    _setEnabled(submitButton);
                }
            });
            E.addListener(this, "blur", function() {
                if(this.value == "") {
                    this.style.color = "#666666";
                    this.value = initialValue;
                    _setDisabled(submitButton);
                }
            });
        });
    });
}();


/**
 * Add form.submit() funcionality to nice <a> buttons
 *
 * Adds submit() handler to links which have 'formSubmit' class. Triggers submit() event
 * on the parent form. If no form was found, no click handler will be added and link will
 * act as it should.
 */
SKYPE.navigation.formSubmitLinks = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function() {
        D.getElementsByClassName("formSubmit", "a", document, function(){
            var f = SKYPE.findParentTag(this, "form");
            if (f) {
                E.addListener(this, "click", cancelDefault);
                E.addListener(this, "click", function(){
                    f.submit();
                });
            }
        });
    });
}();

/**
 * Align elements to the center. Element parentNode must be wider than element
 */
SKYPE.util.alignElementToCenter = function(element) {
    if (typeof element != "undefined") {
        var elementParent = element.parentNode;
        var elementParentWidth = parseInt(elementParent.offsetWidth) - (parseInt(D.getStyle(elementParent, "padding-left")) + parseInt(D.getStyle(elementParent, "padding-right")));
        if (elementParentWidth > element.offsetWidth) {
            var leftMargin = (elementParentWidth - element.offsetWidth) / 2 + "px";   
            // set element to the center
            D.setStyle(element, "margin-left", leftMargin);        
        }
    }
};

/**
 * Fancy Tooltips
 *
 * Shows nice tooltip instead of generic browser `title` parameter.
 *
 * Usage:
 * <code>
 *  <a href="link.html" title="I'm a fancy tooltip" class="tooltip">hover me</a>
 * </code>
 *
 * Required: animation.js
 */
SKYPE.util.FancyTips = function() {
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    var A = YAHOO.util.Anim;

    E.onDOMReady(function(){
        
        if (typeof A == "undefined" || !A || !D.getElementsByClassName("tooltip")) {
            return;
        }
        
        // Create tooltip element if not present
        if (!D.get("fancyTip")) {
            var tip = document.createElement("div");
            tip.id = "fancyTip";
            tip.innerHTML = "<div class='pointer'></div><div class='tip'></div>";
            document.body.appendChild(tip);
        }

        // Define mouseover animation
        var animIn = new A(tip, {
            opacity: { to: 1},
            top: { by: -5 }
        }, 0.1);

        // Define mouseout animation
        var animOut = new A(tip, {
            opacity: { to: 0},
            top: { by: 5 }
        }, 0.08);
        animOut.onComplete.subscribe(function(){
            D.setXY(tip, [-100, -100]);
        });

        // Attach tooltips to elements with class="tooltip"
        D.getElementsByClassName("tooltip", "", document, function() {

            if (typeof this.title != "undefined" && this.title) {
                // Mouseover
                E.addListener(this, "mouseover", function() {
                    if (animOut.isAnimated()) {
                        animOut.stop();
                    }

                    var tipLoc = D.getXY(this);
                    D.setStyle(tip, 'opacity', 0);
                    var elementHeight = this.offsetHeight;
                    D.setXY(tip, [tipLoc[0] - 5, tipLoc[1] + elementHeight]);

                    var text = D.getElementsByClassName("tip", "", tip)[0];
                    text.innerHTML = this.title;
                    this.title = "";

                    animIn.animate();
                });

                // Mouseout
                E.addListener(this, "mouseout", function() {
                    if (animIn.isAnimated()) {
                        animIn.stop();
                    }

                    animOut.animate();
                    var text = D.getElementsByClassName("tip", "", tip)[0];
                    this.title = text.innerHTML;
                });
            }
        });

    });
}();

SKYPE.util.AbBlocksController = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    var blocks = 0;
    var currentBlock = 0;

    E.onDOMReady(function() {
        var blockElements = D.getElementsByClassName("abBlockContainer");
        blocks = blockElements.length;
        
        // adds ?ver=1 / ?ver=2 etc feature for debugging
        
        if (location.href.match(/[?&]ver=([^&]+)/)) {
            var blockVersion = location.href.match(/[?&]ver=([^&]+)/)[1];
            // case if user uses ?ver=a/A/b/B for debugging
            if (!parseInt(blockVersion)) {
               blockVersion = blockVersion.toUpperCase().charCodeAt(0) - 64;
            }
        } else {
            var blockVersion = false;
        }
        
        if (blockVersion) {
            if (blockVersion == 0 || blockVersion > blocks ) {
                blockVersion = 1;
            }
            _showBlock(blockVersion);
        }
        
        // define currentBlock
        for (var i = 0; i < blocks; i++) {
            if (!D.hasClass(blockElements[i], "hiddenBlock")) {
                currentBlock = i + 1;
            }
        }
        
    });

    var _showBlock = function(no) {
        var blockElements = D.getElementsByClassName("abBlockContainer");
        blockCount = blockElements.length;

        if (no < 0 || no > blockCount) {
            return;
        }

        if (blockCount > 1) {
            D.replaceClass(blockElements, "shownBlock", "hiddenBlock");
            D.replaceClass(blockElements[no - 1], "hiddenBlock", "shownBlock");
            
            currentBlock = no;
        }
          
    };

    return {
        count: function() {
            return blocks;
        },
        activate: function(no) {
            _showBlock(no);
        },
        current: function() {
            return currentBlock;
        }
    };
}();


/**
 * Triggers automatic downloads
 *
 * Searches for links with '.autodownload' class name and fires the request on them
 */
SKYPE.navigation.AutoDownload = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    E.on(window, "load", function() {
        D.getElementsByClassName('autodownload', 'A', '', function() {
            if (location.href.match(/author-/) == null) {
                location.href = this.href;
            }
        });
    });
}();


/* TODO: Make this pretty */

function hide(elem) {
    var item = document.getElementById(elem);
    if (item) {
        item.style.display = 'none';
    }
}
function show(elem) {
    var item = document.getElementById(elem);
    if (item) {
        item.style.display = '';
    }
}
function selecttab(tab) {
    var tabs = tab.parentNode.parentNode.childNodes;
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].tagName == "LI") {
            tabs[i].className = "";
        }
    }
    tab.parentNode.className = "selected";
}

/* Opens links with class="targetBlank" in new window */

SKYPE.util.targetBlank = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    E.onDOMReady(function() {
        var targetBlankLinks = D.getElementsByClassName("targetBlank", "a");
        for (i=0;i < targetBlankLinks.length; i++) {
            E.addListener(targetBlankLinks[i], "click", SKYPE.util.cancelDefault);
            E.addListener(targetBlankLinks[i], "click", function(){
                window.open(this.href);
                return false;
            });
        }
    });
}();


/* close or open block */
SKYPE.util.toggleBlock = function() {
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    
    E.onDOMReady(function() {
        D.getElementsByClassName('toggleBlock', 'div', '', function() {
            D.addClass(this, 'closed');
        });
        D.getElementsByClassName('toggleTitle', 'div', '', function() {
            D.setStyle(this, 'display', 'block');
        });
        
        var allLinks = D.getElementsByClassName('showContent', 'a');
        E.addListener(allLinks, 'click', SKYPE.util.cancelDefault);
        E.addListener(allLinks, 'click', function() {
            var ancestor = D.getAncestorByClassName(this, 'toggleBlock');
            if (D.hasClass(ancestor,'open')) {
                D.removeClass(ancestor, 'open');
                D.addClass(ancestor, 'closed');
            } else {
                D.removeClass(ancestor, 'closed');
                D.addClass(ancestor, 'open');
            }
        });
    });
}();

/* translations for download flow */
SKYPE.helpers.Translations = function(lang, string) {
    if (typeof lang == "undefined" || typeof string == "undefined") {
        return "";
    }
    var language = lang;
    var text = string;

    var translations = [
        ["AR",[
            ["register_and_download","تسجيل وتنزيل"]
        ]],
        ["BR",[
            ["register_and_download","Registrar-se e fazer o download"]
        ]],
        ["CS",[
            ["register_and_download","Registrovat se a stáhnout"]
        ]],
        ["DA",[
            ["register_and_download","Registrer dig og hent Skype"]
        ]],
        ["DE",[
            ["register_and_download","Registrieren und herunterladen"]
        ]],
        ["EN",[
            ["register_and_download","Register and download"]
        ]],
        ["ES",[
            ["register_and_download","Regístrate y descarga"]
        ]],
        ["ET",[
            ["register_and_download","Registreeru ja laadi alla"]
        ]],
        ["FI",[
            ["register_and_download","Rekisteröidy ja lataa"]
        ]],
        ["FR",[
            ["register_and_download","S’inscrire et télécharger"]
        ]],
        ["HU",[
            ["register_and_download","Regisztrálás és letöltés"]
        ]],
        ["HI",[
            ["register_and_download","रजिस्टर और डाउनलोड"]
        ]],
        ["IT",[
            ["register_and_download","Registrati e scarica"]
        ]],
        ["JA",[
            ["register_and_download","登録してダウンロード"]
        ]],
        ["KO",[
            ["register_and_download","등록 및 다운로드"]
        ]],
        ["NL",[
            ["register_and_download","Registreren en downloaden"]
        ]],
        ["NO",[
            ["register_and_download","Registrer deg og last ned"]
        ]],
        ["PL",[
            ["register_and_download","Zarejestruj się i pobierz"]
        ]],
        ["PT",[
            ["register_and_download","Fazer registo e descarregar"]
        ]],
        ["RU",[
            ["register_and_download","Pегистрироваться и загрузить"]
        ]],
        ["SV",[
            ["register_and_download","Gå med och ladda ner"]
        ]],
        ["ZH-S",[
            ["register_and_download","注册并下载"]
        ]],
        ["ZH-T",[
            ["register_and_download","註冊與下載"]
        ]],
        ["TR",[
            ["register_and_download","Kaydolun ve yükleyin"]
        ]]
    ];
    
    for (i=0;i<translations.length;i++) {
        if (translations[i][0] == lang) {
            lang = i;
            break;
        }
    }
    
    if (lang == language) {
        return "";
    }
    
    for (j=0;j<translations[lang][1].length;j++) {
        if (translations[lang][1][j][0] == string) {
            string = j;
            break;
        }
    }
    
    if (string == text) {
        return "";
    } else {
        return translations[lang][1][string][1];
    }
};

/* find and replace links */
SKYPE.helpers.UpdateLinks = function(className, client, noClient) {
    if (typeof className == "undefined" || typeof client == "undefined" || typeof noClient == "undefined") {
        return;
    }
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    var url = window.location.pathname;
    var lang = url.match(/intl\/([-a-zA-Z]+)\//)[1].toUpperCase();

    if (lang == "EN-GB" || lang == "EN-US") {
        lang = "EN";
    } if (lang == "ES-ES") {
        lang = "ES";
    } else if (lang == "PT-BR") {
        lang = "BR";
    } else if (lang == "ZH-HANS") {
        lang = "ZH-S";
    } else if (lang == "ZH-HANT") {
        lang = "ZH-T";
    }

    var text = SKYPE.helpers.Translations(lang,"register_and_download");

    E.onDOMReady(function() {

            D.getElementsByClassName("editFlow", "a", document, function() {
                D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","hidden");
            });

            var links = D.getElementsByClassName(className);

            if (typeof SKYPE.util.ClientDetection != "undefined") {
                SKYPE.util.ClientDetection.subscribe(
                    function() {
                        if (SKYPE.util.ClientDetection.getSessionUsername() == "") {
                            if (SKYPE.util.ClientDetection.isInstalled()) {
                                for (i=0;i<links.length;i++) {
                                    links[i].href = client + encodeURIComponent(links[i].href);
                                }
                            } else {
                                for (i=0;i<links.length;i++) {
                                    links[i].href = noClient + encodeURIComponent(links[i].href);
                                    if (text != "") {
                                        D.getChildren(links[i])[0].innerHTML = text;
                                    }
                                }
                            }
                            if (!SKYPE.util.Browser.isIE6 && D.get("downloadButtonWrapper") != null) {
                                SKYPE.util.alignElementToCenter(D.get("downloadButtonWrapper"));
                            }
                            if (!SKYPE.util.Browser.isIE6 && D.get("contentDownloadButtonWrapper") != null) {
                                SKYPE.util.alignElementToCenter(D.get("contentDownloadButtonWrapper"));
                            }
                        }
                        D.getElementsByClassName("editFlow", "a", document, function() {
                            D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","visible");
                        });
                    }
                    ,{}
                    ,false
                    ,function() {
                        SKYPE.log("Client detection failure");
                        D.getElementsByClassName("editFlow", "a", document, function() {
                            D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","visible");
                        });
                    }
                );
            } else {
                D.getElementsByClassName("editFlow", "a", document, function() {
                    D.setStyle(D.getAncestorByClassName(this, "button"),"visibility","visible");
                });
            }
    });
};

/**
 * Adds tooltip to all external links stating that you’re leaveing skype.com (legal requirement)
 */
SKYPE.getExternalLinks = function() {
	var D = YAHOO.util.Dom;
	var E = YAHOO.util.Event;
	var A = YAHOO.util.Anim;
	
	var addNote = function(el) {
		var message = D.get('externalLinkTip');
		var messageHeight = message.offsetHeight;
		
		E.addListener(el, 'mouseover', function() {
		    if (typeof A != "undefined") {
		        var animation = new A(message, { 'top': { from: D.getY(this)-messageHeight-8, to: D.getY(this)-messageHeight }}, 0.2);
    			D.setX(message, D.getX(this)-10);
    			animation.animate();
		    } else {
		        D.setX(message, D.getX(this)-10);
		        D.setY(message, D.getY(this)-messageHeight);
		    }
		});
		E.addListener(el, 'mouseout', function() {
			D.setXY(message, [-1000,-1000]);
		});
	};
	
	var imageCheck = function(list) {
		var x = false;
		for (i=0;i<list.length;i++) {
			if (list[i].tagName.toUpperCase() == "IMG") {
				x = true;
			}
		}
		return x;
	};

	E.onDOMReady(function() {
		var allLinks = document.getElementsByTagName('a');
		var i = allLinks.length;
		
		while (i--) {
			var linkValue = allLinks[i].href;
			if (linkValue && !linkValue.match(/\.(cognifide|skype)\.(com|net|test)/)) {
				
				if (imageCheck(D.getChildren(allLinks[i]))) {
					// D.setStyle(allLinks[i], "display", "inline-block");
				}
				addNote(allLinks[i]);
			};
		};
	});
}();

