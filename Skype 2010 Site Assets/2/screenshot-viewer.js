/**
 * Skype Screenshot Viewer
 * Dependences: yahoo-dom-event.js, animations.js
 */

var D = YAHOO.util.Dom;
var E = YAHOO.util.Event;

var screenShotViewer = function() {
    if (D.get("screenShotViewer")) {
        
        var screenShotViewerContainer = D.getElementsByClassName("screenShotViewerContainer", "div", "screenShotViewer")[0];
        var screenShotViewerContainerOpenHeight = parseInt(D.getStyle(screenShotViewerContainer, "height"));
        
        // add click handlers to thumbnails with class="thumbLink"
        D.getElementsByClassName("thumbLink", "a", "screenShotViewer", function() {
            if (window.location.hash == this.hash) {
                D.addClass(this, "selected");
            }
            E.addListener(this, "click", function(ev) {
                
                E.preventDefault(ev);                
                
                // remove "selected" class from previously selected thumbLinks, then add "selected" class to proper thumbLink
                D.getElementsByClassName("thumbLink", "a", "screenShotViewer", function() {
                    D.removeClass(this, "selected");
                });
                D.addClass(this, "selected");
                
                var screenshotId = this.hash.substr(1);
                var screenShot = D.get(screenshotId);
                
                var slideAttributes = { 
        	        scroll: { to: [0, screenShot.offsetTop] }
        	    }; 
        	    var slideAnim = new YAHOO.util.Scroll(screenShotViewerContainer, slideAttributes, 0.6, YAHOO.util.Easing.easeBothStrong);
        	    
        	    slideAnim.onComplete.subscribe(function(){
                    window.location.replace(window.location.href.split("#")[0] + "#" + screenshotId); 
                });
                
                if (D.hasClass(screenShotViewerContainer, "hiddenBlock")) {
                    D.removeClass(screenShotViewerContainer, "hiddenBlock");
                    var slideOpenAttributes = { 
            	        height: { from: 113, to: screenShotViewerContainerOpenHeight },
            	        opacity: { from: 0, to: 1 }
            	    };
                    var slideOpenAnim = new YAHOO.util.Anim(screenShotViewerContainer, slideOpenAttributes, 0.8, YAHOO.util.Easing.easeBothStrong);
                    slideOpenAnim.animate();
                }
        	    
                slideAnim.animate();
                
            });
        });
        
        // add close buttons to screenshots
        D.getElementsByClassName("screenShotBig","div","screenShotViewer", function() {
            var closeButton = document.createElement("a");
            D.addClass(closeButton, "closeScreenShot");
            closeButton.innerHTML = "Close";
            this.insertBefore(closeButton, this.firstChild);
            E.addListener(closeButton, "click", function(){
                var slideCloseAttributes = { 
        	        height: { to: 113 },
        	        opacity: { to: 0 }
        	    };
                var slideCloseAnim = new YAHOO.util.Anim(screenShotViewerContainer, slideCloseAttributes, 0.8, YAHOO.util.Easing.easeBothStrong);
                
                slideCloseAnim.onComplete.subscribe(function(){
                    D.addClass(screenShotViewerContainer, "hiddenBlock");
                    // remove selected arrow from thumb
                    D.getElementsByClassName("thumbLink", "a", "screenShotViewer", function() {
                        D.removeClass(this, "selected");
                    });                    
                });
                
                slideCloseAnim.animate();
            });
        });
            
        // hide screenshotViewerContainer by default
        if (window.location.hash.indexOf("uiShot") == -1) {
            D.addClass(screenShotViewerContainer, "hiddenBlock");
            D.setStyle(screenShotViewerContainer, "height", "113px");
            D.setStyle(screenShotViewerContainer, "opacity", 0);
        }
            
    }
    
};

E.onDOMReady(function() {
    screenShotViewer();
});