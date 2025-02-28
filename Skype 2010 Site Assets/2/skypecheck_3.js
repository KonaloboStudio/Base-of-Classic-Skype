YAHOO.util.Event.onDOMReady(function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    var AN = YAHOO.util.Anim;
            
    if (SKYPE.util.ClientDetection.isInstalled() || window.location.search.indexOf("debug=existing") > 0) {
        D.getElementsByClassName("dontHave", "p", "", function() {
            D.setStyle(this, "display", "block");
        });
    }
    
});