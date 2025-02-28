var D = YAHOO.util.Dom;
var E = YAHOO.util.Event;

var checkSmsNumberField = function(element) {
	if (!D.get("sendSmsButton")) { return true;};
    if (element.value.length > 0 && element.value != element.title) {
        D.removeClass(D.get("sendSmsButton").getElementsByTagName("span")[0], "disabled");
        D.get("sendSmsButton").disabled = false;
    } else {
        D.addClass(D.get("sendSmsButton").getElementsByTagName("span")[0], "disabled");
        D.get("sendSmsButton").disabled = true;
    }    
};

var sendSmsButtonHandler = function() {
    if(D.get("send_to_number") && D.get("sendSmsButton")) {
        E.addListener(D.get("send_to_number"), "keyup", function() {
            checkSmsNumberField(this);
        });
    }
};

var SMSfieldCheck = function() {
	
	D.get("send_to_number");
	E.addListener(D.getElementsByClassName("sendtoNumber"),'focus',function() {
		if (this.value == this.title) {
            this.value='';
		}
	});
		
	E.addListener(D.getElementsByClassName("sendtoNumber"),'blur',function() {
		if (this.value == '') {
            this.value=this.title;
		} 		
	});
	
};

var toggleDevicesOverlay = function(devicesOverlay, state) {
    if (devicesOverlay) {
        switch (state) {
            case 'show':
    	        var xy = D.getXY(D.getElementsByClassName("illustrativeMobile", "img", devicesOverlay.parentNode)[0]);
        	    if (D.hasClass(devicesOverlay, "openRight")) {
        	        xy[0] = xy[0] + 100;
        	    }

        	    if (D.hasClass(devicesOverlay, "openLeft")) {
        	        var devicesOverlayWidth = devicesOverlay.offsetWidth;
        	        xy[0] = xy[0] - devicesOverlayWidth;
        	    }

                D.setXY(devicesOverlay, xy);
                
                // hide all devicesOverlays before opening new one
                var devicesOverlays = D.getElementsByClassName("devicesOverlay");

            	if (devicesOverlays.length > 0) {
            		for (var i = 0; devicesOverlays.length > i; i++) {
            		    if (D.getStyle(devicesOverlays[i], "opacity") > 0) {
            		        var currentDevicesOverlay = devicesOverlays[i];
                			var fadeOtherOverlayOut = new YAHOO.util.Anim(currentDevicesOverlay, {opacity: {from:1, to:0}}, 0.1);
                            
                			fadeOtherOverlayOut.onComplete.subscribe(function(){
                                D.setXY(currentDevicesOverlay, ['-30000','600']);            	
                            });
                            fadeOtherOverlayOut.animate();
            		    }
            		}
            	}
                
                var fadeOverlayIn = new YAHOO.util.Anim(devicesOverlay, {opacity: {from:0, to:1}}, 0.1);
            	fadeOverlayIn.animate();
                break;
            case 'hide':
                var fadeOverlayOut = new YAHOO.util.Anim(devicesOverlay, {opacity: {from:1, to:0}}, 0.1);
                fadeOverlayOut.onComplete.subscribe(function(){
                    D.setXY(devicesOverlay, ['-30000','600']);            	
                });
            	fadeOverlayOut.animate();
                break;
        }
    }
};

var viewAllLinkHandler = function() {
	E.addListener(D.getElementsByClassName("viewAllLink"), "click", function(e) {
        E.preventDefault(e);
	    var devicesOverlay = D.getElementsByClassName("devicesOverlay", "div", this.parentNode);
	    if (devicesOverlay.length > 0) {
	        devicesOverlay = devicesOverlay[0];
	        toggleDevicesOverlay(devicesOverlay, 'show');
	    }
	});
};


var devicesOverlayHandler = function() {
    viewAllLinkHandler();
    // make close buttons work
    E.addListener(D.getElementsByClassName("closeButton", "span"), "click", function(){
        toggleDevicesOverlay(this.parentNode, 'hide');
    });
};

var mobileCMTags = function() {
	var strpos = function(haystack, needle, offset) {
		var i = (haystack+"").indexOf(needle, (offset || 0));
		return i === -1 ? false : i;
	};
	
	if (location.search.match(/cm_mmc=[^&]+/)) {
		var fullString = location.search.match(/cm_mmc=[^&]+/)[0].split("=")[1];
		var findMe = "-_-m";
		var pos = strpos(fullString, findMe, 0);
		var coreMetric1 = fullString.substr(pos+3, 4);
		var coreMetric2 = fullString.substr(0, 4);

		if (coreMetric1.substr(0, 2) != "m0" && coreMetric1.substr(0, 2) != "m1" ) {	
			coreMetric1 = "";
		}
		if (coreMetric2.substr(0, 2) != "m0" && coreMetric2.substr(0, 2) != "m1" ) {	
			coreMetric2 = "";
		}
		coreMetric = coreMetric1+coreMetric2;
		var splash = document.getElementById("splashContent");
		var mobileForms = splash.getElementsByTagName("FORM");
		for (var i = 0; i < mobileForms.length; i++) {
			var cmNode = document.createElement("input");
			cmNode.type = "hidden";
			cmNode.name = "cm_mmc";
			cmNode.id = "cm_mmc";
			cmNode.value = coreMetric;
			mobileForms[i].appendChild(cmNode);
		}
    }
};


E.onDOMReady(function() {
    sendSmsButtonHandler();
    SMSfieldCheck();
    checkSmsNumberField(D.get("send_to_number"));
    devicesOverlayHandler();
	mobileCMTags();
});
