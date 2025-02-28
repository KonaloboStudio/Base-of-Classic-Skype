var D = YAHOO.util.Dom;
var E = YAHOO.util.Event;

var currencyChange = function () {
    E.addListener("ccy-change", "change", function(){
        if (this.options[this.selectedIndex].value.length) {
            D.get("ccy-change-form").action = window.location.hash;
            D.get("ccy-change-form").submit();
        }
    });
};

E.onDOMReady(function() {
    currencyChange();
    D.setStyle(D.get("tabContents"), "height", 0);
});