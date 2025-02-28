function selectCountry(curSymbol) {
    if(typeof(curSymbol) == "undefined") { var curSymbol = "&euro;"; }
    var selectedCountryPrice = document.getElementById("country").value;
    var callPrice = document.getElementById("callPrice");
    
    if(selectedCountryPrice == "Free") {
        callPrice.innerHTML = selectedCountryPrice;
        return true;
    }
    
    if(selectedCountryPrice != "") {
        selectedCountryPriceVAT = selectedCountryPrice * 1.15;
        selectedCountryPriceVAT = (Math.round(selectedCountryPriceVAT*Math.pow(10,3)))/Math.pow(10,3)
        callPrice.innerHTML = curSymbol + "" + selectedCountryPrice + " <small style=\"font-weight: normal;\">(" + curSymbol + " " + selectedCountryPriceVAT + " incl. VAT)</small>";
    } else {
        callPrice.innerHTML = "";
    }
}