// Deprecated file as per: #WEBAN-283, should not be included anymore

/*global jQuery, $, document, YAHOO, SKYPE, SkypeDetection, s, s_gi, s_account, location*/
/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true, indent: 2 */

var SKYPEWANALYTICS = SKYPEWANALYTICS || {};

SKYPEWANALYTICS.runDetection = function () {
  SKYPEWANALYTICS.ClientDetection = (function () {

    var isOmnitureAvailable = function ()
    {
      return (typeof s_gi !== "undefined" &&
      typeof s !== "undefined" &&
      typeof s.tl !== "undefined");
    },

    /*Micro-Tracking, use when page content changes less than 50%*/
    track = function (state) {

      /* check if omniture tracking is available */
      if (!isOmnitureAvailable()) {
        throw new ReferenceError("SC is not available");
      }

      if (typeof state !== "string" || state === "") {
        throw new TypeError("incorrect argument, should be either 'new' or 'user'");
      }

      s.linkTrackVars = "prop21,eVar18";
      s.eVar18 = s.prop21 = state;
      s.tl(this, 'o', "clientdetection");
      s.linkTrackVars = "";
      s.eVar18 = s.prop21 = "";
    };

    return {

      report: function () {

        var userSegment,
        isInstalled,
        setStatus;

        if (typeof SkypeDetection !== "undefined") {
          userSegment = SkypeDetection.internal.segment || "";
          isInstalled = SkypeDetection.installed;
          setStatus = SkypeDetection.internal.setUserSegment;
        } else if (typeof SKYPE.util.ClientDetection !== "undefined") {
          userSegment = SKYPE.util.ClientDetection.getUserSegment() || "";
          isInstalled = SKYPE.util.ClientDetection.isInstalled();
          setStatus = SKYPE.util.ClientDetection.setUserSegment;
        } else {
          return;
        }

        if (userSegment === "user") {
          return;
          //does not needs to check anything else
        } else if (isInstalled) {
          //client installed
          setStatus('user');
          track('user');
          return;
        }

        if (userSegment === "") {
          setStatus('new');
          track('new');
        }
      }
    };
  }());

  if (typeof SkypeDetection !== "undefined") {
    SkypeDetection.detect(SKYPEWANALYTICS.ClientDetection.report);
  } else if (typeof SKYPE.util.ClientDetection !== "undefined") {
    SKYPE.util.ClientDetection.subscribe(
    SKYPEWANALYTICS.ClientDetection.report, {},
    false);
  }
};

SKYPEWANALYTICS.init = function () {
  if (typeof jQuery !== "undefined") {
    $(document).ready(function () {
      SKYPEWANALYTICS.runDetection();
    });
  } else if (typeof YAHOO !== "undefined" && typeof jQuery === "undefined") {
    YAHOO.util.Event.onDOMReady(function () {
      SKYPEWANALYTICS.runDetection();
    });
  } 
};

if (typeof SKYPE.register === "function") {
  SKYPE.register("UserDetection", SKYPEWANALYTICS, {version: "1.0", build: "1"});
}