/*global doc_uri, $, s, s_account, gotErrorPage, shopProductName, shopCategoryName,language_code*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2, regexp: false*/

var SKYPE = SKYPE || {};
SKYPE.wanalytics = SKYPE.wanalytics || {};

SKYPE.wanalytics.Static = (function () {

  var  getIntendedUsage = function (url) {
    return (url.match(/intended_usage=([^&]*)/) &&
            url.match(/intended_usage=([^&]*)/)[1]) || "";
  },

  trackDownloading = function (url_addr, url_param) {
    /* Check if we on download page */
    if (url_addr.indexOf("/get-skype/") === -1 &&
	url_addr.indexOf("/business/download") === -1) {
      return false;
    }
                                            
    var down_regex = {
      "Skype: Windows": /\/get-skype\/on-your-computer\/windows\/downloading/,
      "Skype: Business": /\/business\/download\/downloading/,
      "Skype: Mac": /\/get-skype\/on-your-computer\/macosx\/downloading/,
      "Skype: Linux": /\/get-skype\/on-your-computer\/linux\/downloading/,
      "Skype: Office Toolbar":
        /\/get-skype\/on-your-computer\/office-toolbar\/downloading\//,
      "Skype: Email Toolbar":
        /\/get-skype\/on-your-computer\/email-toolbar\/downloading\//,
      /* "Skype: iPhone":
         /\/get-skype\/on-your-mobile\/download\/iphone-for-skype\//, */
      "Skype: Blackberry":
        /\/get-skype\/on-your-mobile\/skype-mobile\/blackberry\//,
      "Skype: Android":
        /\/get-skype\/on-your-mobile\/skype-mobile\/android\//,
      "Skype: Symbian":
        /\/get-skype\/on-your-mobile\/download\/skype-for-symbian\//,
      "Skype: NokiaN900": /\/get-skype\/on-your-mobile\/builtin\/nokia-n900\//,
      "Skype: Windows 5-1":
        /\/get-skype\/on-your-computer\/windows\/5-1\/downloading/,
      "Skype: Windows 5-2":
        /\/get-skype\/on-your-computer\/windows\/5-2\/downloading/,
      "Skype: Windows Beta":
        /\/get-skype\/on-your-computer\/windows\/beta\/downloading/,
      "Skype: Telus":
        /\/intl\/en-us\/get-skype\/on-your-mobile\/skype-on-telus\//
    },
    the_key;
                                    
    for (the_key in down_regex) {
      if (location.pathname.match(down_regex[the_key])) {

        /* WEBAN-316 */
        if (the_key === "Skype: Telus" &&
            location.search.indexOf("status=200") === -1) {
          break;
        }
        
        s.products = ";" + the_key + ";";
        s.events = "event1";
        s.eVar16 = getIntendedUsage(location.search); /* SCOM-6623 */
        break;
      }
    }

    /* count failed light installs */
    if (s.products && s.events && s.products.indexOf("Skype: Windows") !== -1) {
      if (url_param.indexOf("source=lightinstaller") !== -1) {
        s.products = ";Skype: Windows FULL;";
      }
    }
  },

  getChannel = function (pname) {
    var path = pname.replace("static/", "").split("/");

    // get-skype, give 3rd back
    return (path[0] === "get-skype" &&
            typeof path[1] !== "undefined" &&
            path[1]) ||

      // if home || welcomeback then homepage
      ((path[0] === "home" ||
        path[0] === "welcomeback") &&
       "homepage") ||

      // default 2nd param
      path[0];
  };

  return {
    
    /* WEBAN-404 
       SKYPE.wanalytics.Static.reportWidgetSearch("widget", "value");
     */
    reportWidgetSearch: function (widget, value) {
      if ((typeof widget !== "string") ||
          (widget        === "")       || 
          (typeof value !== "string") ||
          (value        === "")) {
        throw "reportWidgetSearch require a widget and a value";
      }
      return SKYPE.wanalytics.trackAction("widgetSearch", function () {
        s.linkTrackVars   = "prop19,eVar20";
        s.linkTrackEvents = "None"; 
        s.prop19 = s.eVar20 = widget + ":" + value;
      });
    },

    /* WEBAN-403
       SKYPE.wanalytics.Static.reportTab("tab");
     */
    reportTab: function (tab) {
      return SKYPE.wanalytics.track({
        "site": "static",
        "hierarchy": SKYPE.wanalytics.getHierarchy(location.pathname) + "," + tab.replace(/\//g, ","),
        "channel": getChannel(SKYPE.wanalytics.getPageName()),
        "page": SKYPE.wanalytics.getPageName() + tab      
      }); 
    },

    /* WEBAN-404 
       SKYPE.wanalytics.Static.reportWidgetView("widget", "value");
     */
    reportWidgetView: function (widget, value) {
      if ((typeof widget !== "string") ||
          (widget        === "")       || 
          (typeof value !== "string") ||
          (value        === "")) {
        throw "reportWidgetView require a widget and a value";
      }
      return SKYPE.wanalytics.trackAction("widgetView", function () {
        s.linkTrackVars   = "prop29,eVar42";
        s.linkTrackEvents = "None"; 
        s.prop29 = s.eVar42 = widget + ":" + value;
      });
    },

    /* WEBAN-338
       SKYPE.wanalytics.Static.reportBuyStart("productName");
    */
    reportBuyStart: function (product) {
      if (typeof product !== "string" ||
                 product === "") {          
        return "reportBuyStart requires a productName";
      }
    
      return SKYPE.wanalytics.trackAction("buy", function () {
        s.linkTrackVars   = "events,products,channel,pageName";
        s.linkTrackEvents = "scAdd";
        s.events          = "scAdd";
        s.products        = product;
      });
    },

    //Hack requested on #SCOM-5631
    reportSubsMismatch: function () {
      if (typeof $ === "function") {
        $('li.quickFilterNone a').live('click', function () {
          var inVal = $('input#countrySelectorInput').val();
          if (typeof inVal === "string" && inVal !== "" && 
              inVal !== "Which country do you want to call?") {
            SKYPE.helpers.trackSelectValues("Mismatch2: " + inVal);     
          }
        });   
      }
    },
    
    report: function () {
      if ((typeof gotErrorPage !== "undefined") && gotErrorPage !== "") {
        SKYPE.wanalytics.track({
          "site": "static",
          "page": SKYPE.wanalytics.getPageName() + "[" + gotErrorPage + "]:" + 
            document.referrer,
          "func": function () {
            s.pageType = "errorPage";
          }
        });
      }
      else {        

        //exception for the biz tab tracking, WEBAN-25
        if (location.pathname.match(/\/business\//) && 
            location.hash.match(/^#t_/)) {
          return;
        }
        
        var nameAppend = "";
        if (location.pathname.match(/\/downloading/) && 
            typeof doc_uri !== "undefined") {          
          if (doc_uri.indexOf("-upgrading-") !== -1) {
            nameAppend = "upgrading";
          }
          if (doc_uri.indexOf("-new-") !== -1) {
            nameAppend = "new";
          }
        }
        SKYPE.wanalytics
          .track({
            "site": "static", 
            "page": SKYPE.wanalytics.getPageName() + nameAppend, 
            "channel": getChannel(SKYPE.wanalytics.getPageName() + nameAppend),
            "func": function () {

              /* Hack requested by ABrown to normalize new user index page */
              if (s.pageName === "static/index.html" || 
                  s.pageName === "static/home") { 
                s.pageName = "static/";
              }
              
              /* track the downloading */
              trackDownloading(location.pathname, location.search);
            }
          });
      }
    }
  };
}());

SKYPE.wanalytics.Static.report();

//hack requested on: #SCOM-5631
if (location.pathname.indexOf('/prices/pay-monthly') !== -1)
{
  SKYPE.wanalytics.Static.reportSubsMismatch();
}
