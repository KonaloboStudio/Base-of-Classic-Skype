var D = YAHOO.util.Dom;
var E = YAHOO.util.Event;
var BR = YAHOO.env.ua;
SKYPE.namespace("staticTabs");

//
/* Prevents default function (follow href for a link for example )*/
//
var cancelDefault = function(e) {
	E.preventDefault(e);
};

//
/* Detects page anchor */
//
function detectAnchor() {
	var strID = window.document.location.toString();
	var intLen = strID.indexOf('#');
	if (intLen > -1) {
		anchor = strID.substring(intLen + 1,strID.length - 3);
		return anchor;
	} else {
		return false;
	}
}

//
/* Shows correct tab, needs tab to activate id as parameter */
//
function showTab(activeTab, animOpen, animFade) {
	var divs = D.getElementsByClassName("tabContents");
	var tab = document.getElementById(activeTab);
	var currentlySelectedTab;
	var currentlySelectedTabHeight = 0;
	for (var i= 0; i < divs.length; i++) {
		if (divs[i].offsetHeight > 0) {
			currentlySelectedTab = divs[i];
			currentlySelectedTabHeight = divs[i].offsetHeight;
		}
	}
	for (var i= 0; i < divs.length; i++) {
		if (tab && divs[i] == tab) {
			divs[i].style.display = "block";
			if (tab != currentlySelectedTab) {
				if (BR.ie) {
					// alert(tab.id);
					// tab.style.display = "hidden";
				}
				if(animOpen) {
					var tabHeight = tab.scrollHeight;
					if (SKYPE.util.Browser.isSafari || SKYPE.util.Browser.isOpera) {
						tabHeight = tab.scrollHeight + 20;
					}
					var animOpenFx = new YAHOO.util.Anim(activeTab, { height: { from: 0, to: tabHeight } }, 0.5, YAHOO.util.Easing.easeOut);
					animOpenFx.animate();
				} else {
					divs[i].style.height = "auto";
				}
				if(animFade) {
					var animFadeFx = new YAHOO.util.Anim(activeTab, { opacity: {from: 0.5, to: 1 } }, 0.5, YAHOO.util.Easing.easeIn);
					animFadeFx.animate();
				}

				if (!parent.location.href.match(/^https?:\/\/author-/)) {
					parent.location.hash = activeTab + "Tab";
				}
			}
		} else {
			divs[i].style.height = "0";
			divs[i].style.display = "none";
		}
	}
}


//
/* Adds tab functionality to tabstrip */
//
SKYPE.staticTabs.addTabFunctionality = function(animOpen, animFade) {
	var tabSection = D.getElementsByClassName("tabs");
	if (tabSection.length > 0) {
		for (var i=0; i<tabSection.length; i++) {
			var eachTab = tabSection[i].getElementsByTagName("li");
			if (eachTab) {
				for (var j=0; j < eachTab.length; j++) {
					var link = eachTab[j].firstChild;
					var tabActions = function() {
						selecttab(this);
						showTab(this.id.substring(0,this.id.length-4),animOpen,animFade);
					};
					E.addListener(link, "click", tabActions);
					E.addListener(link, "click", cancelDefault);
				}
			}
		}
	}
};

//
/* Selects active tab according to page anchor */
//
SKYPE.staticTabs.selectTabsWithAnchor = function() {
	var page;
	if (detectAnchor() && document.getElementById(detectAnchor()+"Link")) {
		page = detectAnchor();
	} else {
		var possibleTabs = D.getElementsByClassName("tabContents");
		if (possibleTabs.length > 0) {
			page = possibleTabs[0].id;
		}
	}
	
	var tab = document.getElementById(page+"Link");
	if (page && document.getElementById(page)) {
		showTab(page);
	}
	if (tab) {
		selecttab(tab);
	}
};

SKYPE.staticTabs.openRandomTab = function() {
	var links = D.getElementsByClassName("switchTab");
	if (links.length > 0) {
		for (var i=0; i<links.length; i++) {
			E.addListener(links[i], "click", function() {
				showTab(this.getAttribute("rel"));
				selecttab(D.get(this.getAttribute("rel")+"Link"));
			});
		}
	}
};

E.onDOMReady(function() {
	SKYPE.staticTabs.selectTabsWithAnchor();
	SKYPE.staticTabs.addTabFunctionality(false,false);	// animOpen, animFade
	SKYPE.staticTabs.openRandomTab();
});