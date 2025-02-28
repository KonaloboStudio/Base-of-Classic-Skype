var cmtag;
var itlink;
SKYPE.getCoreTag = function()
{
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    E.onDOMReady(function()
    {
        if (location.search.match(/cm_mmc=[^&]+/))
        {
            cmtag = location.search.match(/cm_mmc=[^&]+/);
        }
        if (location.search.match(/http:\/\/ad.it.doubleclick.net[^&]+/))
        {
            itlink = location.search.match(/http:\/\/ad.it.doubleclick.net[^&]+/);
        }
    });
}();

function purchaseNowFunction() {
    var radios = document.getElementsByName("paymentType");
    var paymentType = "notChecked";
    var country = document.getElementById("selectCountry");
    var urlToGo;
    for (var i= 0; i < radios.length; i++)
    {
        if (radios.item(i).checked)
        {
            paymentType = radios.item(i).value;
        }
    }
    if (country.value != "")
    {
        if (paymentType == "payAsYouGo")
        {
            switch(country.value)
            {
                case "GB":
                    urlToGo = "http://www.skype.com/go/shop.phones";
                    break;
                    
                default:
                    urlToGo = "http://www.skype.com/go/shop.phones";
                    break;
            }
        } else if (paymentType == "monthlyContract")
        {
            switch(country.value) {
                case "GB":
                    urlToGo = "http://threestore.three.co.uk/mixnmatchphone.aspx?skype=1";
                    break;
                                        
                default:
                    urlToGo = "http://threestore.three.co.uk/mixnmatchphone.aspx?skype=1";
                    break;
            }
        } else if (paymentType == "notChecked")
        {
            switch(country.value) {
                
                case "AU":
                    urlToGo = "http://www.threeskypephone.com.au/";
                    break;
                    
                case "AT":
                    urlToGo = "http://www.drei.at/portal/de/privat/aktionen/Skypephone.html";
                    break;
                
                case "DK":
                    urlToGo = "http://www.3webshop.dk/hi3g/product.dt?product=3skypephoneblue&category=Skype";
                    break;
                    
                case "HK":
                    urlToGo = "http://www.three.com.hk/website/template?pageid=43020&lang=chi";
                    break;
                
                case "IT":
                    if (itlink)
                    {
                        urlToGo = itlink;
                    } else
                    {
                        urlToGo = "http://ad.it.doubleclick.net/clk;155208324;21894533;e?http://www.tre.it/3foryou/Videofonini/index_12971_ITA_HTML.htm";
                    }
                    break;
                    
                case "IE":
                    urlToGo = "http://www.three.ie/handsets_new/handset-overview-2-31.htm";
                    break;
                    
                case "SE":
                    urlToGo = "http://www.tre.se/templates/MobilePage.aspx?id=30530&payment=prepaid&gad=CO297f4DEgjMocOFUI8yuhiPnMv9AyDFnIU8";
                    break;
                
                default:
                    urlToGo = "http://www.skype.com/go/shop.phones";
                    break;
            }
        }
    } else {
        alert("Please choose your country.");
    }
    if (urlToGo && urlToGo.length > 0) {
        if (cmtag) {
            if (urlToGo.indexOf("?") == -1)
            {
                urlToGo = urlToGo + "?" + cmtag;
            } else {
                urlToGo = urlToGo + "&" + cmtag;
            }
        }
        location.href = urlToGo;
    }
}
function switchRadios(dropdown) {
    switch(dropdown.value)
    {
        case "GB":
            document.getElementById("payAsYouGo").checked = "checked";
            document.getElementById("payAsYouGo").disabled = "";
            document.getElementById("monthlyContract").checked = "";
            document.getElementById("monthlyContract").disabled = "";
        break;
        default:
            document.getElementById("payAsYouGo").checked = "";
            document.getElementById("payAsYouGo").disabled = "disabled";
            document.getElementById("monthlyContract").checked = "";
            document.getElementById("monthlyContract").disabled = "disabled";

            break;
    }
}
SKYPE.addFlashOpen = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    var openFlash = D.get("openFlash");
    if (openFlash) {
        E.addListener(openFlash, "click", SKYPE.util.cancelDefault);
        E.addListener(openFlash, "click", function() { window.open(this.href,this.id,'left=100,top=100,height=495,width=645,centerscreen=yes,chrome=yes,menubar=no,toolbar=no,location=no,directories=no,personalbar=no,status=no,resizable=no,scrollbars=no,dependent=no,titlebar=no');
        });
        // 
    }
};
SKYPE.changeUrlForButtons = function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    
    var phoneSeePhones = D.get("phoneSeePhones");
    var phoneCountrySelector = D.get("phoneCountrySelector");
    var phoneSeePlans = D.get("phoneSeePlans");
    var phoneCountryPlanSelector = D.get("phoneCountryPlanSelector");
    
    if (phoneSeePhones) {
        E.addListener(phoneSeePhones, "click", SKYPE.util.cancelDefault);
    };
    if (phoneSeePlans) {
        E.addListener(phoneSeePlans, "click", SKYPE.util.cancelDefault);
    };
    if (phoneCountrySelector) {
        E.addListener(phoneCountrySelector, "change", function() {
            if (this.value.length > 0) {
                E.removeListener(phoneSeePhones, "click");
                D.removeClass(phoneSeePhones, "disabled");
                phoneSeePhones.href = this.value;
            } else {
                E.addListener(phoneSeePhones, "click", SKYPE.util.cancelDefault);
                D.addClass(phoneSeePhones, "disabled");
            }
        });
    }
    if (phoneCountryPlanSelector) {
        E.addListener(phoneCountryPlanSelector, "change", function() {
            if (this.value.length > 0) {
                E.removeListener(phoneSeePlans, "click");
                D.removeClass(phoneSeePlans, "disabled");
                phoneSeePlans.href = this.value;
            } else {
                E.addListener(phoneSeePlans, "click", SKYPE.util.cancelDefault);
                D.addClass(phoneSeePlans, "disabled");
            }
        });
    }
};
YAHOO.util.Event.onDOMReady(function() {
    SKYPE.addFlashOpen();
    SKYPE.changeUrlForButtons();
});