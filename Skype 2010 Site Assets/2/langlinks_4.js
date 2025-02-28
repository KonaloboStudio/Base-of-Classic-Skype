langLinkTitles = new Object();
langLinkTitles['bg'] = "Препратка към страница на английски";
langLinkTitles['da'] = "Linket fører til en web side på engelsk.";
langLinkTitles['de'] = "Dieser Link führt zu einer englischsprachigen Seite.";
langLinkTitles['en'] = "This link goes to a page in English.";
langLinkTitles['es'] = "Este pagina solo existe en ingles.";
langLinkTitles['et'] = "Lingitud leht on inglise keeles";
langLinkTitles['fi'] = "Tämä linkki johtaa englanninkieliselle sivulle.";
langLinkTitles['fr'] = "Ce lien renvoie uniquement à des pages en Anglais.";
langLinkTitles['he'] = "דף זה זמין באנגלית בלבד.";
langLinkTitles['hu'] = "Ez az oldal csak angolul érhető el.";
langLinkTitles['ja'] = "英語";
langLinkTitles['it'] = "Questo link porta ad una pagina in Inglese.";
langLinkTitles['ko'] = "This link goes to a page in English.";
langLinkTitles['lt'] = "Šis puslapis yra tik anglų kalba.";
langLinkTitles['lv'] = "Šī lapa ir pieejama tikai angļu valodā.";
langLinkTitles['nl'] = "Deze link verwijst naar een pagina in het Engels.";
langLinkTitles['no'] = "Denne siden er bare tilgjengelig på engelsk.";
langLinkTitles['po'] = "Ten link przekieruje cię na stronę po angielsku.";
langLinkTitles['pt'] = "This link goes to a page in English.";
langLinkTitles['ru'] = "Эта страница только на английском.";
langLinkTitles['sv'] = "Denna länk går till en engelsk websida.";
langLinkTitles['tr'] = "Bu sayfa'nın sadece İngilizcesi mevcuttur.";
langLinkTitles['zh-Hans'] = "该链接转向一个英文页面。";
langLinkTitles['zh-Hant'] = "點此連結到英文(English)頁面";

// General cookie handling code.
//
// From the book "JavaScript: The Definitive Guide" by David Flanagan
// published by O'Reilly. ISBN: 0-596-00048-0
//
function Cookie(document, name, hours, path, domain, secure, fieldsep, valuesep)
{
	this.$document = document;
	this.$name = name;
	if (hours)
		this.$expiration = new Date((new Date()).getTime() + hours*3600000);
	else this.$expiration = null;
	if (path) this.$path = path; else this.$path = null;
	if (domain) this.$domain = domain; else this.$domain = null;
	if (secure) this.$secure = true; else this.$secure = false;
	if (fieldsep) this.$fieldsep = fieldsep; else this.$fieldsep = ':';
	if (valuesep) this.$valuesep = valuesep; else this.$valuesep = '&';
}
Cookie.prototype.store = function (doSort) {
	var cookieval = "";
	var keys = [];
	for(var prop in this) {
		if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) 
			continue;
		keys.push(prop);
	}
	if (doSort)
		keys.sort();
	for (var i=0; i < keys.length; i++) {
		if (cookieval != "") cookieval += this.$fieldsep;
		cookieval += keys[i] + this.$valuesep + escape(this[keys[i]]);
	}
	var cookie = this.$name + '=' + cookieval;
	if (this.$expiration)
		cookie += '; expires=' + this.$expiration.toGMTString();
	if (this.$path) cookie += '; path=' + this.$path;
	if (this.$domain) cookie += '; domain=' + this.$domain;
	if (this.$secure) cookie += '; secure';
	this.$document.cookie = cookie;
}
Cookie.prototype.load = function() { 
	var allcookies = this.$document.cookie;
	if (allcookies == "") return false;
	var start = allcookies.indexOf(this.$name + '=');
	if (start == -1) return false;
	start += this.$name.length + 1;
	var end = allcookies.indexOf(';', start);
	if (end == -1) end = allcookies.length;
	var cookieval = allcookies.substring(start, end);
	var a = cookieval.split(this.$fieldsep);
	for(var i=0; i < a.length; i++)
		a[i] = a[i].split(this.$valuesep);
	for(var i = 0; i < a.length; i++)
		this[a[i][0]] = unescape(a[i][1]);
	return true;
}
Cookie.prototype.remove = function() {
	var cookie;
	cookie = this.$name + '=';
	if (this.$path) cookie += '; path=' + this.$path;
	if (this.$domain) cookie += '; domain=' + this.$domain;
	cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
	this.$document.cookie = cookie;
}

function SetLangLinkTitles()
{
	var lang = "en";
	var langTitle = "";
	var aLinks = "";
	var i = 0;
	
	if (!document.getElementsByTagName)
		return;
	
	if (location.pathname && location.pathname.indexOf("/intl/") != -1)
		lang = location.pathname.split("/")[2];
	
	if (langLinkTitles[lang])
		langTitle = langLinkTitles[lang];
	else
		langTitle = langLinkTitles['en'];
	
	aLinks = document.getElementsByTagName("a");
	for (i=0; i < aLinks.length; i++)
	{
		if (aLinks[i].className == "en")
			aLinks[i].title = langTitle;
	}
}

/**
* Skype Preference Cookie Handling
*/
function SkypeUserPref()
{
	this.values = {
		'LC':''
		,'CCY':''
		,'CC':''
		,'TZ':''
		,'VER':''
		,'TS':''
		,'TM':''
	};
	
	this.domain = null;
	this.cookieName = "SC";
	this.cookie = null;
	this.path = "/";
	this.secure = false;
	this.expires = null;
	this._parsing = false;
	
	this.platformNames = {
		'0':'windows'
		,'1':'pocketpc'
		,'2':'linux'
		,'3':'osx'
	};
	
	this.init = function()
	{
		this.setDomain();
		this.expires = 365;
		this.parseCookie();
	}
	
	this.getCookie = function()
	{
		var c = new Cookie(document, this.cookieName, this.expires, this.path, this.domain, this.secure, ":", "=");
		c.load();
		return c;
	}
	
	this.scrubCookieValue = function(value)
	{
		return value.replace(/[\n\r]/g, "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}
	
	this.setDomain = function(dom)
	{
		if (dom) {
			this.domain = dom;
		} else if (location && location.hostname) {
			var parts = location.hostname.split(".");
			var i = parts.length;
			if (i >= 2 && isNaN(parseInt(parts[i-1]))) {
				this.domain = "."+parts[i-2]+"."+parts[i-1];
			}
		}
	}
	
	this.parseCookie = function()
	{
		this.cookie = this.getCookie();
		var knownSetters = {
			'LC': 'setLanguage'
			,'CCY': 'setCurrency'
			,'CC': 'setCountryCode'
			,'TZ': 'setTimezone'
			,'VER': 'setVersion'
			,'TS': 'setTimeStamp'
			,'TM': 'setTimeModified'
		};
		this._parsing = true;
		for (var prop in this.cookie)
		{
			if (prop.search(/[A-Z]+/) != -1)
			{
				if (knownSetters[prop])
					this[knownSetters[prop]](this.cookie[prop]);
				else
					this.setValue(prop, this.cookie[prop]);
			}
		}
		this._parsing = false;
		return true;
	}
	
	this.sendCookie = function()
	{
		for (var val in this.values)
		{
			this.cookie[val] = this.values[val];
		}
		this.cookie.store(true);
	}
	
	this.clearCookie = function()
	{
		this.cookie.remove();
	}
	
	this.getValue = function(key, def)
	{
		if (typeof def == "undefined")
			def = "";
		if (this.values[key] && this.values[key] != null && this.values[key].length)
			return this.values[key];
		return def;
	}
	this.setValue = function(key, value)
	{
		this.values[key] = value;
	}
	
	this.touchCookie = function()
	{
		var now = parseInt(new Date().getTime()/1000);
		if (this._parsing)
			return false;
		if (!this.getTimeStamp().length)
			this.setValue("TS", now);
		this.setValue("TM", now)
		return true;
	}
	
	this.setLanguage = function(value)
	{
		// TODO: Should do validation here before setting?
		this.setValue("LC", value.replace(/_/g, "-"))
		this.touchCookie();
		return true;
	}
	this.getLanguage = function(def)
	{
		return this.getValue("LC", def);
	}
	
	this.setCurrency = function(value)
	{
		if (/^([A-Z]{3}|[0-9]{3})$/.test(value) == false)
			value = "";
		this.setValue("CCY", value);
		this.touchCookie();
		return true;
	}
	this.getCurrency = function(def)
	{
		return this.getValue("CCY", def);
	}
	
	this.setCountryCode = function(value)
	{
		if (/^([A-Z]{2,3}|[0-9]{3})$/.test(value) == false)
			value = "";
		this.setValue("CC", value);
		this.touchCookie();
		return true;
	}
	this.getCountryCode = function(def)
	{
		return this.getValue("CC", def);
	}
	
	this.formatDecimal = function(value)
	{
		if (value < 10)
			return "0" + value;
		return value;
	}
	
	this.setTimezone = function(value)
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
	}
	this.getTimezone = function(def)
	{
		return this.getValue("TZ", def);
	}
	
	this.setVersion = function(value)
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
			}
			for (var prop in defaultValues)
			{
				if (value[prop] == null)
					value[prop] = defaultValues[prop];
			}
			var splitVer = value.version.split(".")
			
			value = value.platform+"/"+splitVer[0]+"."+splitVer[1]+"."+(value.partner.length ? value.partner : splitVer[2])+"."+splitVer[3]+"/"+value.campaign;
		}
		
		if (/^[0-9]?\/[0-9]{1,2}(\.[0-9]{1,3}){3}\/[0-9]*$/.test(value) == false)
			return false;
		
		this.setValue("VER", value);
		this.touchCookie();
		return true;
	}
	this.getVersion = function(def)
	{
		return this.getValue("VER", def);
	}
	this.getParsedVersion = function(def)
	{
		var result = {
			'platform':''
			,'platformname':''
			,'version':''
			,'campaign':''
			,'partner':''
			,'partnername':''
		}
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
	}
	
	this.setTimeStamp = function(value)
	{
		this.setValue("TS", value);
		this.touchCookie();
	}
	this.getTimeStamp = function(def)
	{
		return this.getValue("TS", def);
	}
	
	this.setTimeModified = function(value)
	{
		if (this._parsing)
			this.setValue("TM", value);
		this.touchCookie();
	}
	this.getTimeModified = function(def)
	{
		return this.getValue("TM", def);
	}
	
	this.init();
}
var userPref = new SkypeUserPref();

function SetLanguageCookie(lang) {
	userPref.setLanguage(lang);
	userPref.sendCookie();
}