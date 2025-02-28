/*global SKYPE, pageTracker, s_gi, sc_custom_local, s, s_account,gotErrorPage*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2*/

/* Init SKYPE.wanalytics namespace */
if (typeof SKYPE.wanalytics === "undefined" || !SKYPE.account) {
  SKYPE.namespace("wanalytics");
}

SKYPE.wanalytics.Blogs = (function () {

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
        W.track({"site":    "share", 
                 "channel": "blogs"});
      }
    }
  };
}());

SKYPE.wanalytics.Blogs.report();