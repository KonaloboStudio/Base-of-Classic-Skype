/*global swfobject, container, makeContainerDiv, document, console, aCustomTrackable*/
/*jslint bitwise: true, browser: true, eqeqeq: true, immed: true, newcap: true, nomen: true, onevar: true, plusplus: true, white: true, widget: true, undef: true, indent: 2, regexp: false*/

var SKYPE = SKYPE || {};
SKYPE.inclient = SKYPE.inclient || {};

SKYPE.inclient.Trackable = (function () { 
  
  var createCookie = function (name, value, days) {
  
    var expires = "", 
        host = "",
        dom = "",
        date;

    try {
      host = location.host.split(".");
      if (host.length === 3) {
        dom = "; domain=" + "." + host[1] + "." + host[2];
      }
    }
    catch (err) {}

    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    
    document.cookie = name + "=" + value + expires + "; path=/" + dom;
  },

  readCookie = function (name) {
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

  isAlreadyTagged = function ()
  {
    return ((readCookie("channel_source") !== null) || 
            (readCookie("channel")        !== null));
  },

  eraseCookie = function (name) {
    createCookie(name, "", -1);
  },

  /*********************
   * Trackable Channels  
   *********************/
  
  trackableNatural = function (referrer, url, param) {

    if ((typeof referrer === "undefined") || 
        referrer === ""                   ||
        (param.indexOf("cm_mmc=") !== -1) || /* exclude when cm_mmc= */ 
        (param.indexOf("source=") !== -1)) {
      return false;
    }
    
    var segment = { cookie: "", cookie_time: 90 },
    
    sengs   = [ /* Order matters, because it stops eval when match */
      { regex: /google\..*(\?q=|&q=)([^&]+).*/,                    cookie: "259" },
      { regex: /yahoo\.co.*(\?p=|&p=)([^&]+).*/,                   cookie: "260" },
      { regex: /bing\..*(\?q=|&q=)([^&]+).*/,                      cookie: "261" },
      { regex: /msn\..*(\?q=|&q=)([^&]+).*/,                       cookie: "261" },
      { regex: /^http:\/\/search\.live\.com.*(\?q=|&q=)([^&]+).*/, cookie: "261" },
      { regex: /yandex\.ru\/.*([\?|&]text=)([^&]+).*/,             cookie: "353" }
    ],

    tkey;
    
    for (tkey in sengs) {
      if (referrer.match(sengs[tkey].regex)) {
        segment.cookie = sengs[tkey].cookie;
        return segment;
      }
    }   
  },

  trackableTagger = function (referrer, url, param) {
    
    var tags = {
      "cm_mmc=paids|":                      { cookie: "225", cookie_time: 90 },
      "cm_mmc=afcj|":                       { cookie: "211", cookie_time: 90 },
      "cm_mmc=hp-_-promo-_-client-_-08":    { cookie: "161", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-ctaf": { cookie: "212", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-wtaf": { cookie: "213", cookie_time: 90 },
      "cm_mmc=acceleration-_-email-_-ftaf": { cookie: "374", cookie_time: 90 },
      "cm_mmc=banna|sg":                    { cookie: "223", cookie_time: 90 },

      "cm_mmc=banap|paidart-_-apac|jp|ja-_-paidart-_-txtfree": { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|travel|au|en-_-wego-_-bonus1":             { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|travel|au|en-_-wego-_-bonus2":             { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|creditcard-_-apac|jp|ja-_-jcb-_-txtfree":  { cookie: "345", cookie_time: 90 },
      "cm_mmc=banap|travel-_-apac|jp|ja-_-network-_-bnr300":   { cookie: "345", cookie_time: 90 }
    },
    tag = "";
    
    for (tag in tags) {
      if (param.indexOf(tag) !== -1) {
        return tags[tag];
      }
    }
    
  },

  trackableTransparent = function (referrer, url, param) {    

    if (param.indexOf("cm_mmc=") === -1) {
      return false;
    }

    var segment = {cookie: "", cookie_time: 90},
        tagvals = param.split("-_-");

    if ((tagvals.length          ===  3) &&  /* should contain 3 parts */ 
        (tagvals[1].indexOf("z") ===  0) &&  /* 2rd param should start with Z */ 
        (tagvals[0].indexOf("|") !== -1)) {  /* 1st param should contain a | */ 
      segment.cookie = tagvals[1].replace("z", "");
      return segment;
    } 
  },


  /* ******** */

  getAllSegmentMethods = function () { 
    return [trackableNatural,
            trackableTagger,
            trackableTransparent];
  };
  
  return {

    segment: function (referrer, url, search) {
      
      if (isAlreadyTagged()) {
        return false;
      }

      var f_referrer  = (referrer || "").toLowerCase(),
      f_url           = (url || "").toLowerCase(),
      f_param         = decodeURIComponent(search || "").toLowerCase(),

      all_segment     = getAllSegmentMethods(),
      segment         = null,
      i;

      for (i = 0; i < all_segment.length; i = i + 1) { 
        segment = all_segment[i](f_referrer, f_url, f_param);
        if ((typeof segment !== "undefined") && segment && 
            (typeof segment.cookie_time === "number") &&
            (typeof segment.cookie === "string") && segment.cookie !== "") {
          createCookie("channel", segment.cookie, segment.cookie_time);
          return ("channel:" + segment.cookie + ":" + segment.cookie_time);
        }
      }
    }
  };
}());


SKYPE.inclient.Trackable
  .segment(document.referrer, location.pathname, location.search);
