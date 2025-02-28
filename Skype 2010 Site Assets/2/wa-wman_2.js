/*global SKYPE, pageTracker, s_gi, sc_custom_local, s, s_account,gotErrorPage*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2*/

/* Init SKYPE.wanalytics namespace */
if (typeof SKYPE.wanalytics === "undefined" || !SKYPE.account) {
  SKYPE.namespace("wanalytics");
}

SKYPE.wanalytics.WMan = (function () {
  
  var W = SKYPE.wanalytics;
  
  return {

    /* Page Report */               
    report: function ()
    {
      if ((typeof gotErrorPage !== "undefined") && gotErrorPage !== "")
      {
        W.trackErrorPageSC("wman", W.getPageName(location.pathname), gotErrorPage);
      }
      else 
      {
        W.trackPageSC("wman", W.getPageName(location.pathname), 
                      W.getHierarchy(location.pathname));
      }
    }
  };
}());

SKYPE.wanalytics.WMan.report();