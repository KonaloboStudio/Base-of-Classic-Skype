var castsTimeout;

function hide(elem) {
	var item = document.getElementById(elem);
	if (item) {
		item.style.display = 'none';
	}
}
function show(elem) {
	var item = document.getElementById(elem);
	if (item) {
		item.style.display = '';
	}
}
function selecttab(tab) {
	var tabs = tab.parentNode.parentNode.childNodes;
	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].tagName == "LI") {
			tabs[i].className = "";
		}
	}
	tab.parentNode.className = "selected";
}
function loader(listdiv) {
	/* var div = document.getElementById(listdiv);
	killElement("skypecastsscript");
	div.innerHTML = "";
	div.className = "spinner";
	var randomnumber=Math.floor(Math.random()*99999);

	loadScript("http://skypecasts.skype.com/skypecasts/webservice/get.js?key=" + listdiv + "&limit=6&lang="+localised_language+"&rnd="+randomnumber+"","skypecastsscript");
	castsTimeout = window.setTimeout("tryAgain('" + listdiv + "')", 1000); */
}
function tryAgain(listdiv) {
	if (typeof(Skypecasts) != "undefined") {
		displaySkypecasts(listdiv);
	}
}
function displaySkypecasts(key) {
	
	var casts = Skypecasts[key];
	var div = document.getElementById(key);
	
	
	if (!casts || !div) return;

	var node, html, cast;
	var clearer;
	
	for (i in casts) {
		cast = casts[i];
		node = document.createElement("DIV");
		clearer = document.createElement("DIV");
		clearer.className = "clearer";
		
		html= '<img src="' + cast.image + '" alt="' + cast.title + '" class="floatl cast-image" width="74" height="74" />';
		html+= '<div class="cast-content floatr">';
		if (cast.title.length > 50) {
			cast.title = cast.title.substring(0,50) + "&hellip";
		}
		html+= '<h3><a href="' + cast.url_info + '">' + cast.title + '</a> <span class="cast-hosted">' + _("text_skypecast_hosted_by") +' <a href="skype:' + cast.host_name + '?userinfo">' + cast.host_name + '</a></span></h3>';
		html+= '<span>';
		for (var t = 0; t < cast.tags.length; t++) {
			html+= '<a href="https://skypecasts.skype.com/skypecasts/skypecast/search.html?searchtag=' + cast.tags[t] + '">' + cast.tags[t] + '</a> ';
		}
		if (cast.tags.length > 0) {
		html+= '<br />';
		}
		html+= '<span class="cast-time">' + cast.start_time_hint + '</span></span>';
		html+= '<a href="'+ cast.url_info +'" class="call-button floatl"><span>' + _("btn_talk_listen") + '</span></a>';
		/*		
		if (cast.url_join) {
			html+= '<a href="' + cast.url_join + '">Join</a>';
		}
		*/
		html+= '</div>';
		node.innerHTML = html;
		node.className = "skypecast";
		div.appendChild(node);
		if (isEven(i) == false) {
			div.appendChild(clearer);
		}
	}
	div.className = "";
	
	// div.style.height = "auto";
	
	window.clearTimeout(castsTimeout);
}
function isEven(value){
	if (value%2 == 0) {
		return true;
	} else {
		return false;
	}
}

function killElement(scriptId) {
	var e = document.getElementById(scriptId);	
	if (e) {
		document.body.removeChild(e);
	}
}

function loadScript(url,scriptId) {
	var e = document.createElement("script");
	e.setAttribute("src", url);
	e.setAttribute("id", scriptId);
	e.type="text/javascript";
	var elementOlemas = document.body.appendChild(e);
	if (elementOlemas) {
		return true;
	} else {
		return false;
	}
}

/* Tellafriend part */

function submitForm(id) {
	var D = YAHOO.util.Dom;
	if(D.get('friend_1').value == D.get('friend_1_confirm').value) {
		D.get(id).submit();
	}
}


YAHOO.util.Event.onDOMReady(function(){
	var E = YAHOO.util.Event;
	var D = YAHOO.util.Dom;

	// Share index #submitButton
	if (document.getElementById("submitButton")) {
		E.addListener('submitButton', 'click', SKYPE.util.cancelDefault);
		E.addListener('submitButton', 'click', function() {
			if(FIC_checkForm('shareform'))
			{
				document.getElementById('shareform').submit();
			}
		});
	}

	/*
	 * Share index #previewButton
	 *
	 * Copies information from the real form to hidden form to submit it to the preview page.
	 */ 
	if (document.getElementById("previewButton")) {
		if (document.getElementById("shareform") && document.getElementById("previewform")) {
			E.addListener('previewButton', 'click', SKYPE.util.cancelDefault);
			E.addListener('previewButton', 'click', function() {
				if(FIC_checkForm('shareform'))
				{
					var inputs = document.getElementById("shareform").getElementsByTagName("input");
					for (var i in inputs) {
						if (inputs[i].id) {
							var previewField = document.getElementById('preview_' + inputs[i].id);
							if (previewField && previewField.tagName.toUpperCase() == "INPUT") {
								previewField.value = inputs[i].value;
							}
						}
					}
					document.getElementById('previewform').submit();
				}
			});
		}
	}


	/*
	 * Tell-a-friend index add friend button
	 *
	 * Adds a new frind, based on the hidden template within the #shareFriendList
	 */
	var addFriendButton  = D.get("addFriendButton");
	var shareFriendList = D.get("shareFriendList");

	if (addFriendButton) {
		E.addListener(addFriendButton, "click", SKYPE.util.cancelDefault);

		if (shareFriendList) {
			E.addListener(addFriendButton, "click", function() {
				var friends = (shareFriendList.getElementsByTagName("input").length - 2) / 2;

				if (friends < 10) {
					var addedRow = D.getElementsByClassName("friendSample", "div", shareFriendList)[0].cloneNode(true);

					addedRow.innerHTML = addedRow.innerHTML.replace(/FRIENDNO/g, friends + 1);
					D.removeClass(addedRow, "hidden");
					shareFriendList.appendChild(addedRow);

					D.get("friend_"+(friends + 1)+"_name").focus();

					if (friends == 9) {
						D.addClass("addFriendButton", "hidden");
					}
				}
			});
		}
	}

	// More generic link class .submitForm
	D.getElementsByClassName("submitForm", "a", "paddedContent", function() {
		if (this.getAttribute('rel')) {
			if (document.forms[this.getAttribute('rel')]) {
				E.addListener(this, 'click', SKYPE.util.cancelDefault);
				if (D.hasClass(this, "doSend")) {
					E.addListener(this, 'click', function(){
						D.getElementsByClassName("taskField", "input", document.forms[this.getAttribute('rel')])[0].value = "send";
						if (typeof FIC_checkForm != "undefined") {
							if (FIC_checkForm(this.getAttribute('rel'))) {
								document.forms[this.getAttribute('rel')].submit();
							}
						} else {
							document.forms[this.getAttribute('rel')].submit();
						}
					});
				} else if (D.hasClass(this, "doPreview")) {
					E.addListener(this, 'click', function(){
						D.getElementsByClassName("taskField", "input", document.forms[this.getAttribute('rel')])[0].value = "preview";
						if (typeof FIC_checkForm != "undefined") {
							if (FIC_checkForm(this.getAttribute('rel'))) {
								document.forms[this.getAttribute('rel')].submit();
							}
						} else {
							document.forms[this.getAttribute('rel')].submit();
						}
					});
				} else {
					E.addListener(this, 'click', function(){
						if (typeof FIC_checkForm != "undefined") {
							if (FIC_checkForm(this.getAttribute('rel'))) {
								document.forms[this.getAttribute('rel')].submit();
							}
						} else {
							document.forms[this.getAttribute('rel')].submit();
						}
					});
				}
			}
		}
	});
});
