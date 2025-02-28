/*global $, s, s_gi, s_account*/
/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true, indent: 2 */

var SKYPE = SKYPE || {};
SKYPE.wanalytics = SKYPE.wanalytics || {};

SKYPE.wanalytics.TopNav = (function () {

  return {

    trackMenuClick: function (detail) {
      if ((typeof detail !== "string") || (detail === "")) {
        throw new TypeError("trackMenuClick requires a link name");
      }
      return SKYPE.wanalytics
        .trackAction("TopNav:" + detail, function () {
          s.linkTrackVars   = "prop18,eVar19,eVar7,events";
          s.linkTrackEvents = "event35";       
          s.prop18          = "TopNav:" + detail;
          s.eVar19          = "TopNav:" + detail;
          s.eVar7           = s.pageName;
          s.events          = "event35";
        });    
    }
  };
}());

SKYPE.wanalytics.TopNav.init = function () {  
  if (typeof $ !== "undefined") {
    /* tracking a menu click */
    $("#globalNav > nav ul li a").bind("mouseup", function () {
      SKYPE.wanalytics.TopNav.trackMenuClick($(this).text());
    });
  }
};

if (typeof SKYPE.register === "function") {
  SKYPE.register("TopNav", SKYPE.wanalytics.TopNav, {version: "1.0", build: "1"});
}
