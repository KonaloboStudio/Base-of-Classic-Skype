/*global pageTracker, s_gi, s, s_account, language_code*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2, regexp: false*/

var SKYPE = SKYPE || {};
SKYPE.wanalytics = SKYPE.wanalytics || {};

SKYPE.settings        = SKYPE.settings || {};
SKYPE.settings.geoIP  = SKYPE.settings.geoIP || ""; /* default ROW */
SKYPE.settings.waMode = SKYPE.settings.waMode || "production"; /* default PROD */

SKYPE.wanalytics = (function () {
  
  /* remove empty elements from Array */
  var removeEmpties = function (arr) {
    return SKYPE.wanalytics.filter(arr, function (a) {
      return !(a.match(/^$/));
    });
  },
  
  /* Expects string */
  transformPath = function (path, joinfunc) {
    if (typeof path !== "string") {
      throw "transformPath requires path";
    }
    
    var r_path = removeEmpties(path.split("/")),
    result = "";
    
    /* cleans the: http: & www.skype.com/ */
    if (path.match(/http:/)) {
      r_path.shift();
      r_path.shift();
    }
    
    /* cleans the intl/en */
    if (path.match(/intl/)) {
      r_path.shift();
      r_path.shift();
    }
    
    return joinfunc(r_path);
  },
  
  isOmnitureAvailable = function () {
    return (typeof s_gi !== "undefined");
  };
  
  return {

    /* SKYPE.wanalytics.settings */
    settings: SKYPE.wanalytics.settings || {},

    /* As we have to support js 1.5, defining my own filter */
    filter: function (arr, fun) {
      var res = [],
      i = 0,
      val;
      
      if (typeof fun !== "function") {
        throw "filter requires a function to apply to array";
      }
      
      for (i = 0; i < arr.length; i = i + 1) {
        if (i in arr)  { /* boundary check */
          val = arr[i]; /* in case fun mutates this */
          if (fun(val)) {
            res.push(val);
          }
        }
      }
      return res;
    },
   
    getCookie: function (name) {
      var nameEQ  = name + "=",
      ca          = document.cookie.split(';'),
      i, c;
      
      for (i = 0; i < ca.length; i = i + 1) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    },

    getSite: function (loc) {
      /* settings */
      return ((typeof SKYPE.wanalytics.settings.site === "string") &&
              SKYPE.wanalytics.settings.site) ||

      /* on www.skype.com */
      (typeof loc.hostname !== "undefined" &&
        loc.hostname === "www.skype.com"   &&
       typeof loc.pathname !== "undefined" &&
       transformPath(loc.pathname, function (a) {
          return a[0];
        })) ||

      /* domain */
      (typeof loc.hostname !== "undefined" &&
       loc.hostname.replace(".skype.com", "").replace(".skype.net", ""));
    },

    getChannel: function (loc) {
      /* settings */
      return ((typeof SKYPE.wanalytics.settings.channel === "string") &&
              SKYPE.wanalytics.settings.channel) || null;
    },
    
    getPageName: function (path) {
      
      var p = path;
      if (typeof p !== "string") {
        p = location.pathname;
      }

      if (typeof SKYPE.wanalytics.settings.pagename === "string") {
        return SKYPE.wanalytics.settings.pagename;
      }

      /* from path, clean up when static */
      return transformPath(p, function (c_path) {
        var pname = c_path.join("/");
        /* if is without html and without php, then add a forward slash */
        if ((pname.indexOf(".html") === -1) &&
            (pname.indexOf(".php")  === -1)) {
          pname += "/";
        }
        return pname;
      });
    },
    
    getProtocol: function (loc) {
      return ((typeof SKYPE.wanalytics.settings.protocol === "string") &&
              SKYPE.wanalytics.settings.protocol) ||
        loc.protocol;
    },

    /* hierarchy */
    getHierarchy: function (path) {
      
      if (typeof SKYPE.wanalytics.settings.hierarchy === "string") {
        return SKYPE.wanalytics.settings.hierarchy;
      }
  
      /* from path, clean up when static */
      return transformPath(path, function (c_path) {
        var catg = c_path;
        /* filters out the html and php endings*/
        catg = SKYPE.wanalytics.filter(c_path, function (a) {
          return !(a.match(/.html$|.php$/));
        });
        return (catg.join(",").replace(/-/g, ""));
      });
    },
    
    /* live vs development */
    getEnvironment: function () {
      /* settings */
      return  ((typeof SKYPE.wanalytics.settings.environment === "string") &&
               SKYPE.wanalytics.settings.environment) ||
      
      /* default, defined on the page */
      SKYPE.settings.waMode;
    },

    /* localization */
    getLanguage: function (path) {
      /* settings */
      return ((typeof SKYPE.wanalytics.settings.language === "string") &&
              SKYPE.wanalytics.settings.language) ||
      
      /* from intl */
      ((typeof path === "string") &&
       (path.indexOf("intl") !== -1) &&
       path.replace(/^\/intl\/([^\/]*)\/.*/, "$1")) ||
      
      /* nothing found returns empty */
      "";
    },
    
    /* user country code */
    getCountry: function (loc) {
      /* url debug param */
      return (typeof loc !== "undefined" &&
              typeof loc.search === "string" &&
              loc.search.match(/debug-country=([A-Z]+)/) &&
              loc.search.match(/debug-country=([A-Z]+)/)[1]) ||

      /* settings */
      ((typeof SKYPE.wanalytics.settings.country === "string") &&
       SKYPE.wanalytics.settings.country) ||
      
      /* from intl */
      SKYPE.settings.geoIP ||
        
      /* nothing found returns empty */
      "";
    },
    
    /****************
     * TRACKING API
     ****************/

    /********
     * Page
     ********/
    track: function (arg) {

      /* check if omniture tracking is available */
      if (!isOmnitureAvailable()) {
        throw "reportPage requires s_code.js";
      }
      
      var site = ((typeof arg !== "undefined") && arg.site) ||
        SKYPE.wanalytics.getSite(location),
      page = ((typeof arg !== "undefined") && arg.page) ||
        SKYPE.wanalytics.getPageName(location.pathname),
      cat = ((typeof arg !== "undefined") && arg.hierarchy) ||
        SKYPE.wanalytics.getHierarchy(location.pathname),
      lang = ((typeof arg !== "undefined") && arg.language) ||
        SKYPE.wanalytics.getLanguage(location.pathname),
      func = ((typeof arg !== "undefined") && arg.func) || null,
      pagename = site + "/" + page,
      category = site + "," + cat;

      /* Sets channel */
      s.channel = ((typeof arg !== "undefined") && arg.channel) ||
        SKYPE.wanalytics.getChannel(location) || site;
      
      /*REQ1.7. Pass URL without domain as the page name,
        prefixed by the application and forward slash. */
      /* does not allows empty pagename */
      if (typeof pagename === "string" && pagename !== "") {
        s.pageName = pagename;
      }
      else { /* raises error */
        throw "reportPage requires a pagename";
      }
      s.pageName = s.pageName.replace(/\/\/+/g, "/"); /* cleans //+ */
      /* s.pageName = s.pageName.replace(/\/$/, ""); cleans last / */
      s.pageName = s.pageName.replace(/^\//, ""); /* cleans first / */

      /* REQ1.3. Pass on hierarchy (s.hier1) data with the URL
         path where directories are separated by commas and the
         entire string prefixed by the application name and comma. */
      /* allows empty category */
      if (typeof category === "string") {
        s.hier1 = category;
      }
      else { /* raises error */
        throw "reportPage requires a categoryname";
      }
      s.hier1 = s.hier1.replace(/,,+/g, ","); /* Clean out multiple , */
      s.hier1 = s.hier1.replace(/,$/, ""); /* Clean out last ',' */
      s.hier1 = s.hier1.replace(/^,/, ""); /* Clean out first ',' */
      
      /* REQ1.9, language */
      s.eVar5 = s.prop5 = lang;

      /* executes the function of the option */
      if (typeof func === "function") {
        func();
      }
      
      s.eVar7 = s.pageName; /*capture v7 in all pages*/

      /* Aborts if it looks wrong, if finds a "native code" */
      if (s.pageName.indexOf("[native code]") !== -1) {
        return false;
      }
      
      /* report */
      s.t();
      
      return true;
    },
    
    /*********
     * Action
     *********/
    trackAction: function (event, func) {
      
      if (!isOmnitureAvailable()) {
        throw "trackAction requires s_code.js";
      }

      if (typeof event !== "string" || event === "") {
        throw "trackAction requires an event name";
      }

      if (typeof func === "function") {
        func();
      }

      /* WEBAN-343 */
      s.linkTrackVars = s.linkTrackVars + ",eVar7";
      s.eVar7 = s.pageName;

      /* following vars have to be populated */
      if ((typeof s.linkTrackVars === "undefined") ||
          s.linkTrackVars   === "" ||
          (typeof s.linkTrackEvents === "undefined") ||
          s.linkTrackEvents === "") {
        return false;
      }

      /* report */
      s.tl(this, 'o', event);

      /* clean up */
      s.linkTrackVars   = "None";
      s.linkTrackEvents = "None";
      s.events   = "";
      s.products = "";

      return true;
    }
  };
}());

/*global s, console, sc_custom_pagename, sc_custom_hier1, sc_custom_enviroment, sc_custom_local, sc_custom_country*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: false, white: true, widget: true, undef: true, indent: 2*/

/****************************
 * Deprecated code
 *   backwards compatibility
 ****************************/

var SKYPE = SKYPE || {};
SKYPE.wanalytics = SKYPE.wanalytics || {};

SKYPE.wanalytics.warn = function (message) {
  if ((typeof console !== "undefined" && console !== null) && 
      (typeof console.log === "function")) { 
    console.log("[SKYPE.wanalytics] " + message);
  }
};

/* sc_custom */
(function () {
  SKYPE.wanalytics.settings = SKYPE.wanalytics.settings || {};
  if (typeof sc_custom_pagename === "string") {
    SKYPE.wanalytics.settings.pagename = sc_custom_pagename;
  }
  if (typeof sc_custom_hier1 === "string") {
    SKYPE.wanalytics.settings.hierarchy = sc_custom_hier1;
  }
  if (typeof sc_custom_enviroment === "string" && sc_custom_enviroment) {
    SKYPE.wanalytics.settings.environment = sc_custom_enviroment;
  }
  if (typeof sc_custom_local === "string" && sc_custom_local) {
    SKYPE.wanalytics.settings.language = sc_custom_local;
  }
  if (typeof sc_custom_country === "string" && sc_custom_country) {
    SKYPE.wanalytics.settings.country = sc_custom_country;
  }
}());

/* page */
SKYPE.wanalytics.trackPage = function (site, func) {
  SKYPE.wanalytics.warn("trackPage is deprecated, use track instead");
  return SKYPE.wanalytics.track({"site": site, "func": func});
};

SKYPE.wanalytics.trackPageSC = function (site, pagename, category, func) {
  SKYPE.wanalytics.warn("trackPageSC is deprecated, use track instead");
  return SKYPE.wanalytics
    .track({"site": site, "page": pagename, "hierarchy": category, "func": func});
};

SKYPE.wanalytics.trackPageOmniture = function (pagename, category, func) {
  SKYPE.wanalytics.warn("trackPageOmniture is deprecated, use track instead");
  return SKYPE.wanalytics
    .track({"page": pagename, "hierarchy": category, "func": func});
};

/* error */
SKYPE.wanalytics.trackError = function (arg) {
  SKYPE.wanalytics.warn("trackError is deprecated, use track instead");
  var site = ((typeof arg !== "undefined") && arg.site) || 
    SKYPE.wanalytics.getSite(location),  
  page = ((typeof arg !== "undefined") && arg.page) ||
    SKYPE.wanalytics.getPageName(location.pathname), 
  error = ((typeof arg !== "undefined") && arg.error) || "",
  func  = ((typeof arg !== "undefined") && arg.func) || null;
  
  if (error === "") {
    throw "trackError requires 'error' name ";
  }

  s.pageType = "errorPage";
  s.channel  = site; 

  return SKYPE.wanalytics
    .track({"page": error + ": " + site + "/" + page, "func": func});
};

SKYPE.wanalytics.trackErrorPage = function (site, errorname, func) {
  SKYPE.wanalytics.warn("trackErrorPage is deprecated, use track instead");
  return SKYPE.wanalytics
    .trackError({"site": site, "error": errorname, "func": func});
};

SKYPE.wanalytics.trackErrorPageSC = function (site, pagename, errorname, func) {
  SKYPE.wanalytics.warn("trackErrorPageSC is deprecated, use track instead");
  return SKYPE.wanalytics
    .trackError({"site": site, "page": pagename, 
                 "error": errorname, "func": func});
};

/* action */
SKYPE.wanalytics.trackEvent = function (event, category, func) {
  SKYPE.wanalytics.warn("trackEvent is deprecated, use trackAction instead");
  return SKYPE.wanalytics.trackAction(event, func);
};
    
SKYPE.wanalytics.trackValue = function (arg, func) {
  SKYPE.wanalytics.warn("trackValue is deprecated, use trackAction instead");

  var site = ((typeof arg !== "undefined") && arg.site) || 
    SKYPE.wanalytics.getSite(location),  
    action = ((typeof arg !== "undefined") && arg.action) || "", 
    value = ((typeof arg !== "undefined") && arg.value)  || ""; 
  
  if (action === "" || value === "") {
    throw "trackValue requires 'action' and a 'value'";
  }
  
  s.linkTrackVars     = "prop18,eVar19";
  s.linkTrackEvents   = "None"; 
  s.prop18 = s.eVar19 = site + ":" + action + ":" + value;
  
  return SKYPE.wanalytics
    .trackAction(site + "/" + action, func);      
};

SKYPE.wanalytics.trackActionValue = function (site, action, value, func) {
  SKYPE.wanalytics.warn("trackActionValue is deprecated, use trackAction instead");
  return SKYPE.wanalytics
    .trackValue({"site": site, "action": action, "value": value}, func); 
};

/* deprecated namespace */
SKYPE.wanalytics.Core = SKYPE.wanalytics;

