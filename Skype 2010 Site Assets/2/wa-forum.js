/*global SKYPE, pageTracker, s_gi, sc_custom_local, s, s_account,gotErrorPage,language_code*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2*/

/* Init SKYPE.wanalytics namespace */
if (typeof SKYPE.wanalytics === "undefined" || !SKYPE.account) {
  SKYPE.namespace("wanalytics");
}

SKYPE.wanalytics.Forum = (function () {

  /* Tracking APPNAME */
  var W = SKYPE.wanalytics,
  
  getForumPageName = function (path, search)
  {
    var the_search = search.replace("?", "").replace(/&/g, "/");
    the_search = (W.filter(the_search.split("/"), function (a) { 
      return !(a.match(/s=/));
    }));
    the_search = the_search.join("/");
    
    return SKYPE.wanalytics.getPageName(path) + "/" + the_search;
  };
    
  return {
    
    /* Page Report */   
    report: function () { 

      if ((typeof gotErrorPage !== "undefined") && gotErrorPage !== "")
      {
        W.track({
          "site": "forum",
          "page": getForumPageName(location.pathname, location.search) + "[" + gotErrorPage + "]:" + document.referrer,
          "func": function () {
            s.pageType = "errorPage";
          }
        });
      }
      else {
        W.track({"site": "forum", 
                 "page": getForumPageName(location.pathname, location.search)});
      }
    }
  };
}());

SKYPE.wanalytics.Forum.report();