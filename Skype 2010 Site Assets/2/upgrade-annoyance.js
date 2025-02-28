/**
 * Show upgrade suggestions to specific browsers
 * Copyright (c) 2008, Skype Technologies S.A. All rights reserved.
 * Version: 1.0 rewritten to jQuery
*/

var counter = 0;
SKYPE.util.showUpgradeDimmer = function() {
	$(document).ready(function() {
	    var $body = $("body");
	    var bodyHeight = $body.height();
	    var $header = $("#header");
	    var $upgradeLayer = $("#upgradeLayer");
		var cookies = false;
	
		if (SKYPE.user.Preferences.getEnv("cookieCheck")) {
			cookies = true;
		}
		
		// set browserVersion variable
		var browserVersion = $.browser.version;
		if (browserVersion) {
			var browserVersionSplit = browserVersion.split(".");
			if (browserVersionSplit[0]) {
				browserVersion = browserVersionSplit[0];
			}
			if (browserVersionSplit[1]) {
				browserVersion += "." + browserVersionSplit[1];
			}
		} else {
			browserVersion = false;
		}

	    SKYPE.user.Preferences.setEnv("cookieCheck");
	    SKYPE.user.Preferences.save();
		if (!SKYPE.user.Preferences.getEnv("hideUpgradeLayer") &&
		SKYPE.user.Preferences.getParsedVersion().version.length > 1 &&
		SKYPE.user.Preferences.getClientProfile() == "existing" &&
		(($.browser.msie && browserVersion < 7) || ($.browser.mozilla && browserVersion < 1.9)) &&
		!document.location.pathname.match(/get-skype/) && cookies)
		{
			// Create the upgrade element, position it before the header
			if ($upgradeLayer.length <= 0) {
				var upgradeLayerContent = "<div id=\"upgradeLayer\"><div id=\"bodyDimmer\"></div><div id=\"contentDimmer\"></div><div id=\"pleaseUpgrade\"><a href=\".\" id=\"dontUpgrade\">"+upgradeObject.dontUpgrade+"</a><h1>"+upgradeObject.title+"</h1><p>"+upgradeObject.explanation+"</p><p>"+upgradeObject.download+"</p><p class=\"downloadBrowsers\"><a href=\"http://www.getfirefox.com/\" id=\"downloadFirefox\" class=\"downloadBrowserLink\">Mozilla Firefox</a><a href=\"http://www.microsoft.com/windows/internet-explorer/\" id=\"downloadIE\" class=\"downloadBrowserLink\">Microsoft Internet Explorer</a><a href=\"http://www.opera.com/download/\" id=\"downloadOpera\" class=\"downloadBrowserLink\">Opera</a><a href=\"http://www.google.com/chrome\" id=\"downloadChrome\" class=\"downloadBrowserLink\">Google Chrome</a></p></div></div>";
				$header.before(upgradeLayerContent);
				$("#upgradeLayer").css("height", bodyHeight + "px");
				$("#bodyDimmer").css("height", bodyHeight + "px");
				var restOfIt = bodyHeight - ($("#header").height() + $("#footer").height() + 35);
				$("#contentDimmer").css("height", restOfIt + "px");
				// hide all form elements
				$("select, object, embed").addClass("upgradeHidden");
            
	            var closeLayer = function() {
					$("select, object, embed").removeClass("upgradeHidden");
					SKYPE.user.Preferences.setEnv("hideUpgradeLayer");
					SKYPE.user.Preferences.save();
					$("#upgradeLayer").remove();
	            };

	            // Add listeners for closing the layer without the links
				$("#dontUpgrade").click(function(ev){
					ev.preventDefault();
					closeLayer();
					window.location = this.href;
				});
            
	            // Add listeners to local site links inside the bar to local site (flag + textual link) which close the bar and switch to local site
				$("#upgradeLayer a.downloadBrowserLink").click(function(ev){
					ev.preventDefault();
					closeLayer();
					window.location = this.href;
				});
	        }
	    }
	});
}();