/*
 * cmdatatagutils.js
 *
 * Coremetrics Tag v4.0, 4/18/2004
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *
 */

// TAG GENERATING FUNCTIONS ---------------------------------------------------


/*
 * Calling this function points tags to the production database
 */
function cmSetProduction(){
	cm_HOST="site.skype.com/eluminate?";			// third party pilot implementation
}

/*
 * Creates a Tech Props tag.
 * pageID		: required. Page ID to set on this Pageview tag
 */
function cmCreateTechPropsTag(pageID, categoryID) {

	if(pageID == null) {
		pageID = cmGetDefaultPageID();
	}

	var cm=new _cm("tid", "6", "vn2", "e4.0");
	cm.pc="Y";
	cm.pi = pageID;
	cm.cg = categoryID;

	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}

	cm.addTP();
	cm.writeImg();
	
}
/*
 * Creates a Pageview tag with the given Page ID
 *
 * pageID	: required. Page ID to set on this Pageview tag
 * categoryID	: optional. Category ID to set on this Pageview tag
 * searchString	: optional. Internal search string enterred by user to reach
 *				  this page.
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreatePageviewTag(pageID, categoryID, searchString, searchResults) {
	if (pageID == null) {
		pageID = cmGetDefaultPageID();
	}

	var cm = new _cm("tid", "1", "vn2", "e4.0");
	cm.pi = pageID;
	if (searchString) {
		cm.se = searchString;
	}
	cm.sr = searchResults;
	if (categoryID) {
		cm.cg = categoryID;
	}

	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}

	cm.writeImg();
}

/*
 * Creates a Pageview tag with the default value for Page ID. 
 * Format of Page ID is "x/y/z/MyPage.asp"
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateDefaultPageviewTag(categoryID) {
	cmCreatePageviewTag(cmGetDefaultPageID(), categoryID, null);
}

/*
 * Creates a Productview Tag
 * Also creates a Pageview Tag by setting pc="Y"
 * Format of Page ID is "PRODUCT: <Product Name> (<Product ID>)"
 *
 * productID	: required. Product ID to set on this Productview tag
 * productName	: required. Product Name to set on this Productview tag
 * categoryID	: optional. Category ID to set on this Productview tag 
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateProductviewTag(productID, productName, categoryID) {
	var cm = new _cm("tid", "5", "vn2", "e4.0");

	if (productName == null) {
		productName = "";
	}

	// if available, override the referrer with the frameset referrer
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}

	cm.pr = productID;
	cm.pm = productName;
	cm.cg = categoryID;

	cm.pc = "Y";
	cm.pi = "PRODUCT: " + productName + " (" + productID + ")";

	cm.writeImg();
}

/*
 * Variables and Arrays to support Lineitem Aggregation
 */

var cmShopProducts = new Array();
var cmShopIds = new Array();
var cmShopCats = new Array();
var cmShopQtys = new Array();
var cmShopPrices = new Array();
var cmShopCounter = 0;
var cmShopOrderIds = new Array();
var cmShopCustomerIds = new Array();
var cmShopOrderPrices = new Array();
var cmShopSKUs = "";

/* Internal, to support aggregation */
function cmGetProductIndex(id){
	var i =0;
	for (i=0; i<cmShopCounter; i++)
	{
		if (id==cmShopIds[i])
		{
			return i;
		}
	}
	return -1;
}

/*
 * Creates a Shop tag with Action 5 (Shopping Cart)
 *
 * productID	: required. Product ID to set on this Shop tag
 * quantity	: required. Quantity to set on this Shop tag
 * productPrice	: required. Price of one unit of this product
 * categoryID	: optional. Category to set on this Shop tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateShopAction5Tag(productID, productName, productQuantity, productPrice, categoryID) {

	productID = productID.toUpperCase();

	var index = cmGetProductIndex(productID);
	if(index!=-1){
		var oldPrice = cmShopPrices[index];
		var oldQty = cmShopQtys[index];
		var newQty = oldQty + parseInt(productQuantity);
		var newPrice = (oldPrice*oldQty + parseInt(productQuantity)*parseFloat(productPrice))/(newQty);

		cmShopPrices[index] = newPrice;
		cmShopQtys[index] = newQty;
	} else {
		if (!categoryID) {
			categoryID = "";
		}

		cmShopProducts[cmShopCounter] = productName;
		cmShopIds[cmShopCounter] = productID;
		cmShopCats[cmShopCounter] = categoryID;
		cmShopQtys[cmShopCounter] = parseInt(productQuantity);
		cmShopPrices[cmShopCounter] = parseFloat(productPrice);
		cmShopCounter++;

	}

	cmShopSKUs = cmGetOSK();

}

/* render the aggregated cart lineitems with Shop 5 tags*/
function cmDisplayShop5s(){
	var i;
	for(i=0; i<cmShopCounter;i++){
		var cm = new _cm("tid", "4", "vn2", "e4.0");
		cm.at = "5";
		cm.pr = cmShopIds[i]; 
		cm.pm = cmShopProducts[i];
		cm.cg = cmShopCats[i];
		cm.qt = cmShopQtys[i] ;
		cm.bp = cmShopPrices[i];
		cm.pc = "N";
		cm.writeImg();
	}
	cmShopSKUs = cmGetOSK();

	cmShopCounter=0;
}

/*
 * Creates a Shop tag with Action 9 (Order Receipt / Confirmed)
 *
 * productID	: required. Product ID to set on this Shop tag
 * productName	: required. Product Name to set on this Shop tag
 * quantity	: required. Quantity to set on this Shop tag
 * productPrice	: required. Price of one unit of this product
 * customerID	: required. ID of customer making the purchase
 * orderID	: required. ID of order this lineitem belongs to
 * orderTotal	: required. Total price of order this lineitem belongs to
 * categoryID	: optional. Category to set on this Shop tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateShopAction9Tag(productID, productName, productQuantity,
				productPrice, customerID, orderID,
				orderTotal, categoryID) {

	productID = productID.toUpperCase();

	var index = cmGetProductIndex(productID);
	if(index!=-1){
		var oldPrice = cmShopPrices[index];
		var oldQty = cmShopQtys[index];
		var newQty = oldQty + parseInt(productQuantity);
		var newPrice = (oldPrice*oldQty + parseInt(productQuantity)*parseFloat(productPrice))/(newQty);

		cmShopPrices[index] = newPrice;
		cmShopQtys[index] = newQty;
	} else {
		if (!categoryID) {
			categoryID = "";
		}
		cmShopProducts[cmShopCounter] = productName;
		cmShopIds[cmShopCounter] = productID;			
		cmShopOrderIds[cmShopCounter] = orderID;
		cmShopOrderPrices[cmShopCounter] = orderTotal;
		cmShopCustomerIds[cmShopCounter] = customerID;
		cmShopCats[cmShopCounter] = categoryID;
		cmShopQtys[cmShopCounter] = parseInt(productQuantity);
		cmShopPrices[cmShopCounter] = parseFloat(productPrice);
		cmShopQtys[index] = newQty;
		cmShopCounter++;
	}
	cmShopSKUs = cmGetOSK();

}


/* render the aggregated order lineitems with Shop 9 tags*/
function cmDisplayShop9s(){
	var i;
	for(i=0; i<cmShopCounter;i++){
		var cm = new _cm("tid", "4", "vn2", "e4.0");
		cm.at = "9";
		cm.pr = cmShopIds[i]; 
		cm.pm = cmShopProducts[i];
		cm.cg = cmShopCats[i];
		cm.qt = cmShopQtys[i] ;
		cm.bp = cmShopPrices[i];
		cm.cd = cmShopCustomerIds[i];
		cm.on = cmShopOrderIds[i];
		cm.tr = cmShopOrderPrices[i];

		cm.pc = "N";
		cm.writeImg();

	}
	cmShopSKUs = cmGetOSK();

	cmShopCounter=0;
}

/*
 * Creates an Order tag
 *
 * orderID			: required. Order ID of this order
 * orderTotal		: required. Total of this order (minus tax and shipping)
 * orderShipping	: required. Shipping charge for this order
 * customerID		: required. Customer ID that placed this order
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 * customerCountry	: optional. Country of Customer that placed this order
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateOrderTag(orderID, orderTotal, orderShipping, customerID, 
			  customerCity, customerState, customerZIP, customerCountry) {
	
		var cm = new _cm("tid", "3", "vn2", "e4.0");
		cm.on = orderID;
		cm.tr = orderTotal;
		cm.osk = cmShopSKUs;
		cm.sg = orderShipping;
		cm.cd = customerID;
		cm.sa = customerState;
		cm.ct = customerCity;
		cm.zp = customerZIP;
		cm.cy = customerCountry;

		cm.writeImg();
	
}

function cmGetOSK() {
	var i =0;
	var result = "";
	for (i=0; i<cmShopCounter; i++)
	{
		result += "|" + cmShopIds[i] + "|" + cmShopPrices[i] + "|" + cmShopQtys[i] + "|";
	}
	return result;
}

/*
 * Creates a Registration tag and/or a Newsletter tag
 *
 * customerID		: required for Registration. ID of Customer to register.
 * customerEmail	: required for Newsletters. Optional for Registration.
 * customerCity		: optional. City of Customer that placed this order
 * customerState	: optional. State of Customer that placed this order
 * customerZIP		: optional. Zipcode of Customer that placed this order
 * country			: optional. Country of Customer that placed this order
 * newsletterName	: required for Newsletters. The name of the Newsletter.
 * subscribe		: required for Newsletters. Either "Y" or "N"
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateRegistrationTag(customerID, customerEmail, customerCity,
				customerState, customerZIP, country, newsletterName, 
				subscribe) {
	var cm = new _cm("tid", "2", "vn2", "e4.0");
	cm.cd = customerID;
	cm.em = customerEmail;
	cm.sa = customerState;
	cm.ct = customerCity;
	cm.zp = customerZIP;
	cm.cy = country;

	if (newsletterName && subscribe) {
		cm.nl = newsletterName;
		cm.sd = subscribe;
	}
	
	cm.writeImg();
}

/* Creates an Error Tag
 *
 * returns nothing, causes a document.write of an image request for this tag.
 */
function cmCreateErrorTag(pageID, categoryID) {
	var cm=new _cm("tid", "404", "vn2", "e4.0");  //DO NOT CHANGE THESE PARAMETERS
	
	// get the referrer from the frameset
	if (parent.cm_ref != null) {
		cm.rf = parent.cm_ref;
		parent.cm_ref = document.URL;
	}

	// if parent had mmc variables and this is the first pageview, add mmc to this url
	if(parent.cm_set_mmc) {
		cm.ul = document.location.href + 
				((document.location.href.indexOf("?") < 0) ? "?" : "&") + 
				parent.cm_mmc_params; 
		parent.cm_ref = cm.ul;
		parent.cm_set_mmc = false;
	}

	cm.pc = "Y";
	if(pageID == null) {
		cm.pi = cmGetDefaultPageID();
	} else {
		cm.pi = pageID;
	}
	cm.cg = categoryID;
	cm.writeImg();
}

// HELPER FUNCTIONS -----------------------------------------------------------
/* These functions are used by the tag-generating functions and/or may be used
 * in in general as convenience functions
 */

/*
 * Creates an acceptable default Page ID value to use for Pageview tags.
 * The default Page ID is based on the URL, and consists of the path and
 * filename (without the protocol, domain and query string).
 * 
 * example:
 * returns "x/y/MyPage.asp" for the URL http://www.mysite.com/x/y/MyPage.asp
 */
function cmGetDefaultPageID() { 
	var pageName = window.location.pathname; 

	// eliminates everything after "?" (for Opera browswers)
	var tempIndex1 = pageName.indexOf("?");
	if (tempIndex1 != -1) {
		pageName = pageName.substr(0, tempIndex1);
	}
	// eliminates everything after "#" (for Opera browswers)
	var tempIndex2 = pageName.indexOf("#");
	if (tempIndex2 != -1) {
		pageName = pageName.substr(0, tempIndex2);
	}
	// eliminates everything after ";"
	var tempIndex3 = pageName.indexOf(";");
	if (tempIndex3 != -1) {
		pageName = pageName.substr(0, tempIndex3);
	}

	var slashPos = pageName.lastIndexOf("/");
	if (slashPos == pageName.length - 1) {
		pageName = pageName + "index.html"; /****************** SET TO DEFAULT DOC NAME */
	}

	while (pageName.indexOf("/") == 0) {
		pageName = pageName.substr(1,pageName.length);
	}

	return(pageName); 
} 

if (defaultNormalize == null) { var defaultNormalize = null; }

function myNormalizeURL(url, isHref) {
    var newURL = url;
    // ... transform newURL here ...
    if (defaultNormalize != null) {
        newURL = defaultNormalize(newURL, isHref);
    }
    return newURL;
}

// install normalization
if (document.cmTagCtl != null) {
    var func = "" + document.cmTagCtl.normalizeURL;
    if (func.indexOf('myNormalizeURL') == -1) {
        defaultNormalize = document.cmTagCtl.normalizeURL;
        document.cmTagCtl.normalizeURL = myNormalizeURL;
    }
}

// a 16 digit random number generator, with a prefix of myRNG
function myRNG(){
	var foreverDate = new Date();
	var seed = foreverDate.getTime() % 1000;
	var rnd = Math.round( Math.random() * 9999999999999999 );
	return "myRNG" + (seed + rnd);
}

// gathers the information needed for the Skype download conversion
function cmCreateSkypeConversionTag( categoryID, productID, productName, quantity, unitPrice, orderShipping, orderID, customerID, city, state, zip, country ){

	if( customerID == 0 || customerID == null || customerID == '' )
		customerID = myRNG();
	if( orderID == 0 || orderID == null || orderID == '' )
		orderID = myRNG();

	var orderSubtotal = quantity * unitPrice;

	cmCreateShopAction9Tag( productID, productName, quantity, unitPrice, customerID, orderID, orderSubtotal, categoryID );
	cmDisplayShop9s();
	
	cmCreateOrderTag( orderID, orderSubtotal, orderShipping, customerID, city, state, zip, country );
}

//Manual link click tag to work with Flash
function cmCreateManualLinkClickTag(href, linkName) {

    if (cmHandleLinkClick == null && C9 != null) {
        var cmHandleLinkClick = C9;                  
    }

    if (cmHandleLinkClick != null) {
        var link = new Object();
        link.tagName = "A";
        link.name = linkName;
        link.href = href;
        cmHandleLinkClick(link);
    }
}

// ---- SKYPE MOD BELOW ----
var waPageNameValue = "";
var waCategoryValue = "";
var waSearchValue = "";
var waProdIDValue = "";
var waProdNameValue = "";
// Web analytics helper functions
function waPageName(defaultValue)
{
    var page = "";
    defaultValue = waClean(defaultValue);
    if (defaultValue.length)
        waPageNameValue = defaultValue;
    else
    {
        page = location.pathname;
        // Add index if ends with slash
        if (page.lastIndexOf('/') == page.length-1) page = page + "index.html";
        // Lets add site prefix to it starting slash
        waPageNameValue = waSitePrefix() + page;
        // If there is specific hash then use that too
        if (location.hash.length && location.hash.indexOf("#wa-") == 0)
        {
            waPageNameValue = waPageNameValue + "_" + location.hash.substring(4);
        }
        // Add country code if needed
        if (typeof waCountryEnabled != "undefined" && waCountryEnabled
            && typeof PREF_DEFAULT_CC != "undefined" && PREF_DEFAULT_CC.length)
        {
            waPageNameValue = waPageNameValue + "_CC=" + PREF_DEFAULT_CC;
        }
    }
    return waPageNameValue;
}
function waCategory(defaultValue, postFix)
{
    var langCode = "";
    defaultValue = waClean(defaultValue);
    if (defaultValue.length)
    {
        waCategoryValue = defaultValue;
        if (typeof(postFix) == "string" && postFix.length)
            waCategoryValue = waCategoryValue + "-" + postFix;
    }
    
    // Add WWW for public static site
    if (waSitePrefix() == "www")
    {
        // Only if it's not a known root
        if (waCategoryValue.search(/^(WWW|STORE)-/) == -1)
        {
            // Figure out the language
            langCode = location.pathname.replace(/^\/intl\/([^-\/]+)-?([^\/]*)\/.*/, "$1$2").toUpperCase();
            // And fall back to English if no lang was found
            if (!langCode.length || langCode.search(/[^A-Z]/) != -1)
                langCode = "ENUS";
            
            waCategoryValue = "WWW-" + langCode + (waCategoryValue.length ? "-" + waCategoryValue : "");
        }
    }
    
    return waCategoryValue.toUpperCase();
}
function waSearch(defaultValue)
{
    defaultValue = waClean(defaultValue);
    if (defaultValue.length)
        waSearchValue = defaultValue;
    else
        waSearchValue = null;
    
    return waSearchValue;
}
function waProdID(defaultValue)
{
    defaultValue = waClean(defaultValue);
    if (defaultValue.length)
        waProdIDValue = defaultValue;
    else
        waProdIDValue = null;
    
    return waProdIDValue;
}
function waProdName(defaultValue)
{
    defaultValue = waClean(defaultValue);
    if (defaultValue.length)
        waProdNameValue = defaultValue;
    else
        waProdNameValue = null;
    
    return waProdNameValue;
}
function waNull(defaultValue)
{
    if (typeof(defaultValue) == "string")
    {
        defaultValue = waClean(defaultValue);
        if (defaultValue.length) return defaultValue;
    }
    return null;
}
function waClean(str)
{
    return str.replace(/["']/g, "").replace(/[&quot;]/g, "");
}
function waSitePrefix(sitename)
{
    if (typeof sitename == "undefined" || !sitename.length)
        sitename = location.host;
    
    if (typeof waDefaultSitePrefix == "string")
        return waDefaultSitePrefix;
    
    if (location.protocol == "https:")
    {
        if (sitename.search(/^qawww\.skype\.(com|test|net)$/) != -1)
            return "www";
        if (sitename.search(/^(qastore|secure|staging)\.skype\.(com|test|net)$/) != -1)
            return "secure";
    }
    if (sitename.search(/^(www\.|staging\.)?skype\.(com|test|net)$/) != -1)
        return "www";
    if (sitename.search(/^(q?a?share)\.skype\.(com|test|net)$/) != -1)
        return "share";
    if (sitename.search(/^(q?a?forum)\.skype\.(com|test|net)$/) != -1)
        return "forum";
    if (sitename.search(/^(qaexternal|wiki)\.skype\.(com|test|net)$/) != -1)
        return "wiki";
    return "";
}

var PREF_DEFAULT_CC = '<!--#echo var="GEOIP_COUNTRY_CODE"-->';
// Override contry from debug cookie
if (document.cookie)
{
    var ccMatch = document.cookie.match(/debug-country=([A-Z]+)/);
    if (ccMatch)
    {
        PREF_DEFAULT_CC = ccMatch[1];
    }
}
if (location.search)
{
    var ccMatch = location.search.match(/debug-country=([A-Z]+)/);
    if (ccMatch)
    {
        PREF_DEFAULT_CC = ccMatch[1];
    }
}