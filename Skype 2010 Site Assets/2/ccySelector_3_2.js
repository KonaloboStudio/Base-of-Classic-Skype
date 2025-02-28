SKYPE.namespace('ccySelector');

// Final ccy is set according to the last ccy selector on the page

SKYPE.ccySelector = function(){
	return {
		setNew: function(ccy) {
			// Create new event and store ccy data in body
			$('body').data('ccy',ccy).trigger('ccyChange', [ ccy ]);
		},
		getCurrency: function() {
			return $('body').data('ccy');
		},
		createCcySelectors: function(opts) {
			var $el = $('#' + opts.id),
				container = $('<div>').addClass('ccySelectorContainer').prependTo('body'),
				selected =  $('<a>').addClass('ccySelectorSelected').attr('href','#').html(opts.ccySelected.toUpperCase()).appendTo(container),
				options = $('<div>').addClass('ccySelectorOptions').appendTo(container),
				right = $('<div>').addClass('rightBlock').appendTo(options),
				left = $('<div>').addClass('leftBlock').appendTo(options),
				half;

			if (opts.ccyOptions.length%2 == 0) {
				half = parseInt(opts.ccyOptions.length/2, 10);
			} else {
				half = parseInt(opts.ccyOptions.length/2, 10) + 1;
			}

			for (var i = 0; i < opts.ccyOptions.length; i++) {
				var option = $('<a>').html(opts.ccyOptions[i].title)
					.attr({
						'href': '#'+opts.ccyOptions[i].name,
						'data-ccy': opts.ccyOptions[i].name
					})	
					// Set ccy body
					.bind('click',function(ev) {
						ev.preventDefault();
						SKYPE.ccySelector.setNew($(this).attr('data-ccy'));
					});

				if (i < half) {
					option.appendTo(left);
				} else {
					option.appendTo(right);
				}
			}
			
			var _positionSelector = function() {
				container.css({
					top: $el.offset().top,
					left: $el.offset().left
				});
			};


			// Listen body ccy change and adjust active ccy according to that
			$('body').bind('ccyChange',function(ev, ccy) {
				var ccySelectorContainer = $('.ccySelectorContainer');
				
				ccySelectorContainer.find('.ccySelectorSelected').html(ccy.toUpperCase());
				ccySelectorContainer.find('a.active').removeClass('active');
				
				$('a[data-ccy=' + ccy + ']', ccySelectorContainer).addClass('active');
			});
			
			$(window).resize(function(){
				_positionSelector();
			});
			
			SKYPE.ccySelector.setNew(opts.ccySelected);
			_positionSelector();
		}
	};
}();

SKYPE.ccySelector.init = function(options) {
	for (var i in options) {
		new SKYPE.ccySelector.createCcySelectors(options[i]);
	}
};


SKYPE.register("ccySelector", SKYPE.ccySelector, {version: "1.0", build: "1"});