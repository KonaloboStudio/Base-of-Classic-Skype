/*global SKYPE, s, s_gi, s_account*/
/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: false, newcap: true, immed: true, indent: 2 */

var SUBS2 = SUBS2 || {};

SUBS2.WAnalytics = (function () {
  return {    
    /* SUBS2.WAnalytics.reportEvent("view-button", "View: EE"); */
    reportEvent: function (source, detail) {
      if ((typeof source !== "string") ||
          (source        === "")       || 
          (typeof detail !== "string") ||
          (detail        === "")) {
        throw new TypeError("reportEvent requires a course and detail");
      }
      if (detail.indexOf("Search:") !== -1) {
        return SKYPE.wanalytics.Static
          .reportWidgetSearch("subswidget:subs2", detail.replace("Search: ", ""));
      } else {
        return SKYPE.wanalytics.Static
          .reportWidgetView("subswidget:subs2", detail.replace("View: ", ""));
      }
    }
  };
}());
