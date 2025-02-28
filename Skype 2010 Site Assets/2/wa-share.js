/*global SKYPE, pageTracker, s_gi, sc_custom_local, s, s_account,gotErrorPage*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2*/

/* Init SKYPE.wanalytics namespace */
if (typeof SKYPE.wanalytics === "undefined" || !SKYPE.account) {
  SKYPE.namespace("wanalytics");
}

SKYPE.wanalytics.Share = (function () {

  var W = SKYPE.wanalytics;
    
  return {
    
    /* Page Report */           
    report: function ()
    {
      if ((typeof gotErrorPage !== "undefined") && gotErrorPage !== "")
      {
        W.track({
          "site": "share",
          "page": W.getPageName(location.pathname) + "[" + gotErrorPage + "]:" + document.referrer,
          "func": function () {
            s.pageType = "errorPage";
          }
        });
      }
      else 
      {
        var chan = "",
            site = "share";
        try {          
          site = chan = location.hostname.split('.')[0];          
        } catch (e) {}
        W.track({"site": site, "channel": chan});
      }
    }
  };
}());

SKYPE.wanalytics.Share.report();