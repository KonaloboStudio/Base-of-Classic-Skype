SKYPE.namespace("subscriptions");

SKYPE.subscriptions.init = function() {
    
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    var C = YAHOO.util.Connect;
        
    var tabStrips = D.getElementsByClassName("tabs", "div", "", function() {
        this.style.display = "block";
    });    
    D.getElementsByClassName("countrySelectorSubmit", "input", "", function() {
        this.style.display = "none";
    });
    D.getElementsByClassName("countrySelector", "select", "", function() {
        E.addListener(this, "change", function() {
            D.getAncestorByTagName(this, "form").submit();
        });
    });
    D.getElementsByClassName("singlePackageSignUp", "a", "", function() {
        if (this.href.indexOf("noGo") > 0) {
            E.addListener(this, "click", SKYPE.util.cancelDefault);
            E.addListener(this, "click", function() {
                alert(countryError);
            });
        }
    });
    var regionSelector = D.get("regionSelector");
    var regionSelectSubmit = D.get("regionSelectSubmit");
    
        if (regionSelector) {
            E.addListener(regionSelector, "change", function() {
                if (this.value != "") {
                    D.getAncestorByTagName(this, "form").submit();
                }
            });
        }
        if (regionSelectSubmit) {
            regionSelectSubmit.style.display = "none";
        }
    
    var ratesCountry = D.get("ratesCountry");
    var skypeRatesSwitch = D.get("skypeRatesSwitch");
    var ratesDisplayForm = D.get("ratesDisplayForm");
    if (ratesDisplayForm) {
        ratesDisplayForm.style.display= "block";
    }
    
    if (ratesCountry) {
        E.removeListener(ratesCountry);        
        if (ratesDestinations) {
            var options = ratesCountry.innerHTML;
            skypeRatesSwitch.innerHTML = "";
            var select = "<select name=\"ratesCountry\" id=\"ratesCountry\">";
            for (var i = 0; i < ratesDestinations.length; i++) {
                options += "<option value=\""+i+"\">"+ratesDestinations[i][0]+"</option>\n";
            }
            select += options+"</select>";
            skypeRatesSwitch.innerHTML = select;
        }
        var ratesCountry = D.get("ratesCountry");
        E.addListener(ratesCountry, "change", SKYPE.subscriptions.showRateData);
    }
};

SKYPE.subscriptions.showRateData = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    var ratesFlagImage = D.get("ratesFlagImage");
    var ratesCountryName = D.get("ratesCountryName");
    var ratesRate = D.get("ratesRate");
    var ratesRateVat = D.get("ratesRateVat");
    var ratesCountry = D.get("ratesCountry");
    var skypeRatesDisplayInfo = D.get("skypeRatesDisplayInfo");
    if (ratesCountry.value != "") {
        if (typeof(countryCodes) != "undefined") {
            ratesFlagImage.src = ""+SKYPE.settings.assetsPath+"/i/images/flags/lightblue/"+countryCodes[ratesDestinations[ratesCountry.value][0]]+".png";
        } else {
            ratesFlagImage.src = ""+SKYPE.settings.assetsPath+"/i/images/flags/lightblue/empty.png";
        }
        ratesCountryName.innerHTML = ratesDestinations[ratesCountry.value][0];
        ratesRate.innerHTML = ratesDestinations[ratesCountry.value][1];
        if (ratesRateVat) {
            ratesRateVat.innerHTML = ratesDestinations[ratesCountry.value][2];
        }
        skypeRatesDisplayInfo.style.display = "block";
    } else{
        skypeRatesDisplayInfo.style.display = "none";
        ratesCountryName.innerHTML = "";
        ratesRate.innerHTML = "";
        ratesRateVat.innerHTML = "";
    }
};

SKYPE.subscriptions.PackageBlocksController = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    var blocks = 0;

    E.onDOMReady(function() {
        var blockElements = D.getElementsByClassName("packageContainer");
        blocks = blockElements.length;
        if (blocks > 1) {
            for (var i = 1; i < blocks; i++) {
                blockElements[i].style.display = "none";
            }
        }
    });

    var _showBlock = function(no) {
        var blockElements = D.getElementsByClassName("packageContainer");
        blockCount = blockElements.length;

        if (no < 0 || no > blockCount) {
            return;
        }

        if (blockCount > 1) {
            D.setStyle(blockElements, "display", "none");

            blockElements[no - 1].style.display = "block";

            // Detect if tab switching is needed (first block is world block)
            var tabContainer = D.getElementsByClassName("tabs", "DIV")[0];
            if (tabContainer) {
                var tabs = tabContainer.getElementsByTagName("LI");
    
                if (tabs.length == 2) {
                    var blocks = D.getElementsByClassName("packageBlock", "DIV", blockElements[no - 1]);
                    if (blocks[0] && D.hasClass(blocks[0], "fullPackage")) {
                        var a = tabs[1].getElementsByTagName("A")[0];
                        selecttab(a);
                        showTab(a.id.substring(0, a.id.length - 4));
                    } else {
                        var a = tabs[0].getElementsByTagName("A")[0];
                        selecttab(a);
                        showTab(a.id.substring(0, a.id.length - 4));
                    }
                }
            }
        }
    };

    return {
        count: function() {
            return blocks;
        },
        activate: function(no) {
            _showBlock(no);
        }
    };
}();

/* This has some bug in it.. In some weird case the function is applied only to the first element */
SKYPE.subscriptions.countrySplitter = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    D.getElementsByClassName("countryList", "ul", "", function() {
        if (!D.hasClass(this, "largeFlags")) {
            var countries = this.getElementsByTagName("li");
            var totalCount = countries.length;

            var set = Math.ceil(totalCount / 3);
            var secondCol = document.createElement("ul");
            var thirdCol = document.createElement("ul");
            D.addClass(secondCol, "countryListDynamic");
            D.addClass(thirdCol, "countryListDynamic");
            var removeArray = new Array();
        
            thirdCol = this.parentNode.insertBefore(thirdCol, this.nextSibling);
            secondCol = this.parentNode.insertBefore(secondCol, this.nextSibling);
        
            for (var i = set; i < (2*set); i++) {
                var item = countries[i].cloneNode(true);
                secondCol.appendChild(item);
            }
            for (var i = (set*2); i < totalCount; i++) {
                var item = countries[i].cloneNode(true);
                thirdCol.appendChild(item);
            }
            for (var i = set; i < totalCount; i++) {
                removeArray.push(countries[i]);
            }
            for (var i = 0; i < removeArray.length; i++) {
                this.removeChild(removeArray[i]);
            }
        }
    });
};

SKYPE.subscriptions.countrySplitterAlt = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;

    E.onDOMReady(function() {        
        var lists = D.getElementsByClassName("countryList", "ul");
        for (var l in lists) {
            var list = lists[l];

            if (!D.hasClass(list, "largeFlags")) {
                var countries = list.getElementsByTagName("li");
                var totalCount = countries.length;

                var set = Math.ceil(totalCount / 3);
                var secondCol = document.createElement("ul");
                var thirdCol = document.createElement("ul");
                D.addClass(secondCol, "countryListDynamic");
                D.addClass(thirdCol, "countryListDynamic");
                var removeArray = new Array();
        
                thirdCol = list.parentNode.insertBefore(thirdCol, list.nextSibling);
                secondCol = list.parentNode.insertBefore(secondCol, list.nextSibling);
        
                for (var i = set; i < (2*set); i++) {
                    var item = countries[i].cloneNode(true);
                    secondCol.appendChild(item);
                }
                for (var i = (set*2); i < totalCount; i++) {
                    var item = countries[i].cloneNode(true);
                    thirdCol.appendChild(item);
                }
                for (var i = set; i < totalCount; i++) {
                    removeArray.push(countries[i]);
                }
                for (var i = 0; i < removeArray.length; i++) {
                    list.removeChild(removeArray[i]);
                }
            }
        }
    });
}();

YAHOO.util.Event.onDOMReady(function() {
    var E = YAHOO.util.Event;
    var D = YAHOO.util.Dom;
    
    SKYPE.subscriptions.init();
    E.addListener(window, "load", function() {
        // It doesn't iterate past 1st element on some pages... Not sure why
        // SKYPE.subscriptions.countrySplitter();
        if (YAHOO.env.ua.ie) {
            D.getElementsByClassName("alternative", "div", D.get("sidebar"), function(o) {
                var old = o.style.display;
                o.style.display = "inline";
                o.style.display = old;
            });
        }
    });
});