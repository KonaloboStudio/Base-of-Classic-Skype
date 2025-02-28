SKYPE.util.Tweaks = function() {

	/**
	 * Expandable area controls
	 */		

	$(".expandableComponent").each(function () {

		var controlButton = $(".expandableComponent a.button2");
		var buttonPosition = controlButton.position();
		var thisArea = $(this);
				
		$(controlButton).css({"position" : "absolute", "left" : buttonPosition.left });
		$("a.textControl", $(this)).css({
			"position" : "absolute", 
			"left" : buttonPosition.left + 30, 
			"top" : 2
		});

		$(".closeToggle", $(this)).hide();
		$(".body", $(this)).hide();
		$(".openToggle", $(this)).show();

		$(".textControl, .button2", $(this)).mouseenter(function () {
			$(".textControl, .button2", $(this).parent()).addClass("hover");
		});
		$(".textControl, .button2", $(this)).mousedown(function () {
			$(".textControl, .button2", $(this).parent()).addClass("active");
		});				
		$(".textControl, .button2", $(this)).mouseleave(function () {
			$(".textControl, .button2", $(this).parent()).removeClass("hover");
		});			
		$(".textControl, .button2", $(this)).mouseup(function () {
			$(".textControl, .button2", $(this).parent()).removeClass("active");
		});				

		$(".textControl, .button2", $(this)).click(function () {
			if ($(this).parent().hasClass("openToggle")) {
				$(this).parent().removeClass("openToggle").addClass("closeToggle");
				$(".body", thisArea).slideDown("slow");
				$("a.openToggle", thisArea).fadeOut("fast");
				$("a.closeToggle", thisArea).fadeIn();
				$(".button2", thisArea).removeClass("arrowDown").addClass("arrowUp");
				$(".bottomShadowCollapsed", thisArea).fadeIn("slow");
				$(this).blur();
			}
			else {
				$(this).parent().removeClass("closeToggle").addClass("openToggle");
				$(".body", thisArea).slideUp("slow");
				$("a.closeToggle", thisArea).fadeOut("fast");
				$("a.openToggle", thisArea).fadeIn();
				$(".button2", thisArea).removeClass("arrowUp").addClass("arrowDown");
				$(".bottomShadowCollapsed", thisArea).fadeOut("slow");
				$(this).blur();
			}
			return false;
		});

	});		

	/**
	 * Comparisontable tooltip positioning
	 */		

	$(".comparisonTableRemade .wrapper a:first-child").each(function () {

		var linkWidth = $(this).width();

		$(this).next().css("left", linkWidth + 25);

	});	

	/**
	 * Makes backToTop animation smooth.
	 */	

	$("a.backToTop").click(function(){
		$("html, body").animate({scrollTop:0}, 'slow');
		return false;
	});
	
	/**
	 * Replace number of downloads and number of users online with values from API
	 */
	
	$(function() {
		if ($('span.onlineUsers, span.skypeDownloads').length > 0) {
		/*	var animateNumbers = function($el, nr) {
				current = 0;
				step = parseInt(nr/30);
				setInterval(function() {
					if (current < nr) {
						current=current+step;
						$el.html(current);
					}
				}, 50);
			};*/
			
			var _updater = function() {
				if (SKYPE.settings.statisticsPath == "") {
					return false;
				}
				$.ajax({
					type: 'get',
					cache: true,
					dataType: 'json',
					url: '/apps/includes/userstats/userstats.php',
					success: function(data, responseString) {
						if (data && responseString == 'success') {
							$('span.onlineUsers').addClass('done').html(data.online['formatted']);
							$('span.skypeDownloads').addClass('done').html(data.downloads['formatted']);
						}
					},
					error: function() {
						// Fail silently
					}
				});
			};
			_updater();
			window.setInterval(function() {
				_updater();
			}, 300000);
		}
	});


	/**
	 * Page takeover component
	 */
	$(function() {
		if (!$('body').hasClass('takeover') || !$('#takeover').length) {
			return;
		}

		if (SKYPE.util.Browser.isIE && SKYPE.util.Browser.ieVer < 9) {
			$('#takeover .badge').addClass('ie');
		}


		$('#takeover').height($(document).height());
	});

	SKYPE.env.Loader.windowLoad(function() {
		if (!$('body').hasClass('takeover') || !$('#takeover').length) {
			return;
		}

		var _fadeout = function() {
			$('body.takeover').removeClass('takeover');
			if (SKYPE.env.getVersion('carousel')) {
				SKYPE.components.hero.play();
			}
		};

		var _interval = setInterval(function() {
			if ($('span.onlineUsers','#takeover').length < 1 || $('span.onlineUsers','#takeover').hasClass('done')) {
				clearInterval(_interval);

				if (!SKYPE.util.Browser.isIE || SKYPE.util.Browser.ieVer > 8) {
					$('.heading','#takeover').animate({
						opacity: 1
					}, 400);
				}

				var _timeout = setTimeout(function() {
					$('#takeover').fadeOut(_fadeout());
				}, 7000);

				$('#takeover').bind('click', function() {
					clearTimeout(_timeout);
					$('#takeover').fadeOut(_fadeout());
				});
			}
		}, 300);

		$('#takeover').bind('click', function() {
			$('#takeover').fadeOut(_fadeout());
		});
	});	
	
	/**
	 * Triggers automatic download
	 */
	var autoDownload = function () {
		SKYPE.env.Loader.windowLoad(function () {
			$('a#autoDownload, a.autodownload:first').each(function() {
				// check if user came from lightinstaller
				if (location.href.match(/source=lightinstaller/) != null &&
					$(this).attr('href').match(/getskype-full/) == null &&
					$(this).attr('href').match(/getskype-beta-full/) == null
				) {
					var newHref = $(this).attr('href').replace('getskype', 'getskype-full');
					if (newHref.indexOf('?') > -1) {
						newHref = newHref + window.location.search.replace('?','&');
					} else {
						newHref = newHref + window.location.search;
					}
					$(this).attr('href', newHref); 
				}
				
			
				if (location.href.match(/author/) == null) {
					location.href = this.href;
				}	
	    	});
		});
	};
	
	if(SKYPE.settings) {
		if(!SKYPE.settings.noDownload) {
			autoDownload(); 
		}
	}
		
	
	/**
	 * Makes message close button work
	 */
	
	$(".message .close").click(function(){
		$(this).parent(".message").fadeOut('fast');
	});
	
	/**
	 * webreg step 2 radio buttons
	 */
	$("#webregStep4 #purchaseForm input:radio").click(function () {
		if(this.value == 'buy')
		{
			$("#webregStep4 #purchaseForm #download-button").hide();
			$("#webregStep4 #purchaseForm #buy-button").show();
		}else{
			$("#webregStep4 #purchaseForm #buy-button").hide();
			$("#webregStep4 #purchaseForm #download-button").show();
		}
	});

	/* #buyCreditStep radio buttons */
	$('#buyCreditStep #purchaseForm input:radio').click(function() {
		$('#buyCreditStep #purchaseForm .buttonContainer a.button').hide();
		$('#buyCreditStep #purchaseForm .buttonContainer a#'+this.value+'-button').css('display','inline-block');
	});

	$('#buyCreditStep #purchaseForm .buttonContainer a.button:first-child').css('display','inline-block');

	/**
	 * Old Mac message box
	 */
	$("#msgMacOsRequired").each(function(i, message) {
		if ( SKYPE.util.Browser.isMacOld && !$(message).hasClass("newerAvailable") ) {
			$(message).show();
		} else if ( !SKYPE.util.Browser.isMacOld && $(message).hasClass("newerAvailable") ) {
			$(message).show();
		}
	});
	
	/**
	 * Special Offers page, make offer images clickable
	 */
	 
	/*
$("div.offerBox").hover(function(){
		$(this).css('cursor','pointer');
	});	
	
	
	$("div.offerBox").click(function(){
		if($(this).children('a:first').attr('href'))  { 
		var goOffer = $(this).children('a:first').attr('href'); 		
		window.location = goOffer;
		}
	});
*/
	
	return {autoDownload: autoDownload};

}();
