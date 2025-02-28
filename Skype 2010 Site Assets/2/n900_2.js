

YAHOO.util.Event.onDOMReady(function() {
    var D = YAHOO.util.Dom;
    var E = YAHOO.util.Event;
    var AN = YAHOO.util.Anim;

	var imagePath = "/i/images/screenshots/";
    var imageArray = ["n900_1.png", "n900_2.png", "n900_3.png", "n900_4.png", "n900_0.png"];
    var h = 190;
    var slot = D.get("animateShotTop");
    var image = D.get("animateShotImageTop");

	if (document.images) {
		for (var i = 0; i < imageArray.length; i++) {
			var pic = new Image(311,190);
			pic.src = imagePath+imageArray[i];
		}
	}

    
    E.addListener(window, "load", function() { 
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
                }, 250);
                i++;

            }, 4000);
        }
    });    
});