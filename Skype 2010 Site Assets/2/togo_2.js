SKYPE.namespace("togo");

SKYPE.togo.first = function () {
	var D = YAHOO.util.Dom;
	
	D.getElementsByClassName("tabs", "div", "", function() {
		this.style.display = "block";
	});
	D.get("checkCallRates").style.display = "block";
	
	var callToSelector = D.get("callToSelector");
	var callToSelectorDiv = D.get("callToSelectorDiv");
	
	if (callToSelector) {
        E.removeListener(callToSelector);        
        if (ratesDestinations) {
            var options = "";
            callToSelectorDiv.innerHTML = "";
            var select = "<select name=\"callToSelector\" id=\"callToSelector\">";
            for (var i = 0; i < ratesDestinations.length; i++) {
				if (ratesDestinations[i][0] == "USA") {
                	options += "<option value=\""+i+"\" selected=\"selected\">"+ratesDestinations[i][0]+"</option>\n";
				} else if (ratesDestinations[i][0].match(/China|Egypt|Morocco|Nigeria|Vietnam/gi)) {
					// Used to exclude listed destinations
				} else {
					options += "<option value=\""+i+"\">"+ratesDestinations[i][0]+"</option>\n";
				}
            }
            select += options+"</select>";
            callToSelectorDiv.innerHTML = select;
        }
        E.addListener(D.get("callToSelector"), "change", SKYPE.togo.callTo);
    };
	
	E.addListener(D.get("callFromSelector"), "change", SKYPE.togo.callFrom);
	
	E.addListener(D.get("callToSelector"), "change", SKYPE.togo.callTo);
};

SKYPE.togo.callFrom = function() {
	var D = YAHOO.util.Dom;
	
	var callFromSelector = D.get("callFromSelector");
	var callFromFlagImage = D.get("callFromFlagImage");
	
	if (callFromSelector.value != "") {
		callFromFlagImage.src = ""+SKYPE.settings.assetsPath+"/i/images/flags/"+ callFromSelector.value +".png";
	} else {
		callFromFlagImage.src = ""+SKYPE.settings.assetsPath+"/i/images/flags/empty.png";
	}
};

SKYPE.togo.callTo = function() {
	var D = YAHOO.util.Dom;
	
	var callToSelector = D.get("callToSelector");
	var callToFlagImage = D.get("callToFlagImage");
	var pricePerMinute = D.get("pricePerMinute");
	var pricePerMinuteVat = D.get("pricePerMinuteVat");
	var priceHalfHourVat = D.get("priceHalfHourVat");
	var priceFullHourVat = D.get("priceFullHourVat");
	
	if (callToSelector.value != "") {
		if (typeof(countryCodes) != "undefined") {
            callToFlagImage.src = ""+SKYPE.settings.assetsPath+"/i/images/flags/"+countryCodes[ratesDestinations[callToSelector.value][0]]+".png";
			
			if (pricePerMinute) {
				pricePerMinute.innerHTML = ratesDestinations[callToSelector.value][1];
			} else if (pricePerMinuteVat) {
				pricePerMinuteVat.innerHTML = ratesDestinations[callToSelector.value][2];
			}
			// priceHalfHourVat.innerHTML = Math.round(ratesDestinations[callToSelector.value][2] * 30 * 1000)/1000;
			// priceFullHourVat.innerHTML = Math.round(ratesDestinations[callToSelector.value][2] * 60 * 1000)/1000;
        } else {
            callToFlagImage.src = ""+SKYPE.settings.assetsPath+"/i/images/flags/empty.png";
        }
	} else {
		
	}
};

YAHOO.util.Event.onDOMReady(function() {
	SKYPE.togo.first();
	SKYPE.togo.callFrom();
	SKYPE.togo.callTo();
});