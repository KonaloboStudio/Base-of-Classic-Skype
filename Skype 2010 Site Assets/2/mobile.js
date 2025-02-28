SKYPE.namespace("mobile");

/* User Skype via SMS fetcher */
SKYPE.mobile.MobileNumberAjaxFetch = function() {
	
	var strpos = function(haystack, needle, offset) {
		var i = (haystack+"").indexOf(needle, (offset || 0));
		return i === -1 ? false : i;
	};
	
	$(document).ready(function() {
		if ($(".mobileAjaxFetch").length) {
			var _sendSms = function($frm) {
				var $fields = $("input", $frm);
				var targetPath = $(".mobileAjaxFetch").attr("action");
				var postInfo = "";

				for (i=0; i<$fields.length; i++) {
					postInfo += $($fields[i]).attr("name")+"="+encodeURIComponent($($fields[i]).val());
					postInfo += "&";
				}

				_lastXhrRequest = SKYPE.Ajax.post(
					targetPath
					,postInfo
					,function(response) {
						_displayContent(response.status);
						delete _lastXhrRequest;
					}
					,function(response) {
						SKYPE.log("Connection failed!: " + response);
						delete _lastXhrRequest;
					}
					,"json");
			};

			var _displayContent = function(myStatus) {

				$(".status").hide();

				if (myStatus == 0) {
					$(".stat-0").show();
				} else if (myStatus == 200) {
					$(".stat-200").show();
				} else if (myStatus == 401) {
					$(".stat-401").show();
				} else if (myStatus == 402) {
					$(".stat-402").show();
				} else if (myStatus == 403) {
					$(".stat-403").show();
				} else {
					$(".stat-500").show();
				}
				
				$bubble = $(".stat-" +myStatus).closest("div.helpBubble");
				$link = $("a.fieldAction[rel=#" + $bubble.attr("id") + "]");
				var pos = $link.position();
				var $offsetParent = $link.offsetParent();
				var offsetPos = {
					top: $offsetParent.position().top
				};
				
				while ($offsetParent[0].tagName.toUpperCase() != "BODY") {
					$offsetParent = $offsetParent.offsetParent();
					offsetPos.top += $offsetParent.position().top;
				};

				pos.top += offsetPos.top + $link.outerHeight(true) - $bubble.outerHeight(true) + 14;
				
				$bubble.animate({
					top: pos.top + "px"
				});
			};

			var $submit = $("button[type=submit]", $(".mobileAjaxFetch"));

			$(".mobileAjaxFetch").attr("autocomplete", "off");

			/* Disable ajax posting for now
			$submit.click(function(ev) {
				ev.preventDefault();
				var $frm = $(this).closest("form");
				_sendSms($frm);
			});

			$("form.mobileAjaxFetch.mobileDownload").bind("submit", function(ev) {
				ev.preventDefault();
				_sendSms($(this));
			});
			*/

			$("a.tryAgain").click(function(ev) {
				ev.preventDefault();
				_displayContent(0);
			});

			$(".status:not(.stat-0)").hide();
			
			$("#downloadLink").removeClass("hidden");

			if (location.search.match(/cm_mmc=[^&]+/)) {
				var fullString = location.search.match(/cm_mmc=[^&]+/)[0].split("=")[1];
				var findMe = "-_-m";
				var pos = strpos(fullString, findMe, 0);
				var coreMetric1 = fullString.substr(pos+3, 4);
				var coreMetric2 = fullString.substr(0, 4);

				if (coreMetric1.substr(0, 2) != "m0" && coreMetric1.substr(0, 2) != "m1" ) {	
					coreMetric1 = "";
				}
				if (coreMetric2.substr(0, 2) != "m0" && coreMetric2.substr(0, 2) != "m1" ) {	
					coreMetric2 = "";
				}
				coreMetric = coreMetric1+coreMetric2;
				$("form.mobileDownload").append("<input type=\"hidden\" name=\"cm_mmc\" id=\"cm_mmc\" value=\""+coreMetric+"\" />");
	        }
		}
	});
}();