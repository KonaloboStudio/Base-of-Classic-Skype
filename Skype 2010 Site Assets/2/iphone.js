YAHOO.util.Event.onDOMReady(function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    var AN = YAHOO.util.Anim;
    
    E.addListener(window, "load", function() { 
        var imagePath = "/i/images/screenshots/";
        var imageArray = ["iphone_1.png", "iphone_2.png", "iphone_3.png", "iphone_4.png","iphone_5.png", "iphone_0.png"];
        var h = 230;
        if (D.hasClass(D.get("shotContainer"), "welcomeBack")) {
            var imageArray = ["iphone_wb_1.png", "iphone_wb_2.png", "iphone_wb_3.png", "iphone_wb_4.png","iphone_wb_5.png","iphone_wb_6.png", "iphone_wb_0.png"];
            h = 203;
        }
        var slot = D.get("animateShotTop");
        var image = D.get("animateShotImageTop");

        if (D.get("animateShotBase") && D.get("animateShotTop") && D.get("animateShotImageBase") && D.get("animateShotImageTop")) {
            var i = 0;
            setInterval(function() {
                if (i == imageArray.length) {
                    i = 0;
                }
                image.src = imagePath+imageArray[i];

                if (slot.offsetHeight > 100) {
                    var size = { from: h, to: 0 };
                    image = D.get("animateShotImageTop");
                } else {
                    var size = { from: 0, to: h };
                    image = D.get("animateShotImageBase");
                }


                var slide = new AN(slot, { height: size }, 0.5, YAHOO.util.Easing.easeOut);

                setTimeout(function() {
                    slide.animate();
                }, 100);
                i++;

            }, 3000);
        }
    });    
});