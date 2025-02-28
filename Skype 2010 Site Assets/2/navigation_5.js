SKYPE.namespace("navigation");

SKYPE.navigation.ExplorerTweaks = function() {
	BR = $.browser;
	if (BR.msie) {
		if (BR.version < 7) {
			// button state fix
			$("#globalNav > nav ul li a").bind("mouseup", function() {
				$(this).blur();
			});
			// nav hover fix
			$("#globalNav > nav ul li").bind("mouseover",function() {
				$(".sub",$(this)).show();
				$(".pointer",$(this)).show();
			});
			$("#globalNav > nav ul li").bind("mouseout",function() {
				$(".sub",$(this)).hide();
				$(".pointer",$(this)).hide();
			});
			if($('.heroWrapper').length > 0) {

				$("#globalNav li").css("position", "relative");
				$("#globalNav li .pointer").css({
					"margin": "0",
					"padding": "0",
					"position": "absolute",
					"left": "0",
					"right": "0",
					"width": "auto"
				})

				$("#globalNav li .pointer").each(function () {
					
					var parentPosition = $(this).parent("li").position();
					var parentWidth = $(this).parent().width();

					$(this).css("width", parentWidth);
					$(this).css({"position" : "absolute", "left" : 0 });
					
				});
				$("#globalNav li.fourColumns:eq(2) .sub").each(function () {

					var thisWidth = $(this).width();
					var thisParentWidth = $(this).parent().width();
					var positionWidth = thisWidth - thisParentWidth*3;	

					$(this).css({
									"position" : "absolute",
									"left" : "-" + positionWidth + "px"
								});
				});				
			}

		} else if (BR.version >= 7 && BR.version < 8) {
			// button state fix
			$("#globalNav > nav ul li a").bind("mouseup", function() {
				$(this).blur();
			});
		}
	}
}();

SKYPE.register('navigation', SKYPE.navigation, {version: "1.0", build: "1"});