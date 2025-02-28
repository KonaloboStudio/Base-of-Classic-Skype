/**
 * Available Skype core modules
 */
SKYPE.env.Loader.addModules({
	'jquery':        { 
		'src': 'i/js/jquery/jquery-1.4.4.min.js',
	    'loadcheck': function() { return (typeof jQuery != "undefined"); }
	},
	'jqueryui-core': { 
		'src': 'i/js/jquery/jquery-ui-1.8.13/jquery-ui.core.js',
		'requires': { 'jquery': true }
	},
	'player':        { 'src': 'i/js/jquery/player.js',              'requires': { 'jquery': true, 'videoplayer': { 'condition': !SKYPE.util.Browser.isHtmlVideoMp4 } } },
	'swfobject':     { 'src': 'i/js/swfobject2.js' },
	'json2':         { 'src': 'i/js/json2.js' },
	'videoplayer':   { 'src': 'i/js/videoplayer.js',                'requires': { 'jquery': true, 'swfobject': true } },
	'carousel':      { 'src': 'i/js/jquery/carousel.js',            'requires': { 'jquery': true } },
	'carousel-sidebar':{ 'src': 'i/js/jquery/carousel-sidebar.js',  'requires': { 'jquery': true } },
	'variablewidths':{ 'src': 'i/js/jquery/jquery.variablewidths.js','requires': { 'jquery': true } },
	'cookies'       :{ 'src': 'i/js/jquery/jquery.cookies.2.2.0.min.js','requires': { 'jquery': true, 'json2': true } },
	'userguides':    { 'src': 'i/js/jquery/userguides.js',          'requires': { 'jquery': true, 'variablewidths': true, 'cookies': true } },
	'toggle':        { 'src': 'i/js/jquery/toggle.js',              'requires': { 'jquery': true } },
	'navigation':    { 'src': 'i/js/jquery/navigation.js',          'requires': { 'jquery': true } },
	'autocomplete':  { 'src': 'i/js/jquery/jquery.autocomplete.js', 'requires': { 'jquery': true } },
	'detection':     { 'src': 'i/js/detection.js',                  'requires': { 'swfobject': true } },
	'conditional':   { 'src': 'i/js/jquery/conditional.content.js', 'requires': { 'jquery': true, 'detection': true } },
	'rates':         { 'src': 'i/js/jquery/rates.js',               'requires': { 'jquery': true, 'autocomplete': true } },
	'gvc':           { 'src': 'i/js/skype-gvc-campaign.js',         'requires': { 'jquery': true } },
	'premium':       { 'src': 'i/js/skype-premium.js',              'requires': { 'jquery': true } },
	'sharing':       { 'src': 'i/js/jquery/sharing.js',             'requires': { 'jquery': true } },
	'placements':    { 'src': 'i/js/jquery/placements.js',          'requires': { 'jquery': true } },
	'supportsearch': { 'src': 'i/js/jquery/support-search.js',      'requires': { 'jquery': true } },
	'sitesearch':    { 'src': 'i/js/jquery/support-search.js',      'requires': { 'jquery': true } },
	'columncomponents': { 'src': 'i/js/jquery/columncomponents.js', 'requires': { 'jquery': true } },
	'layoutcontrol': { 'src': 'i/js/jquery/layout.control.js',		'requires': { 'jquery': true } },
	'tracking':		 { 'src': 'i/js/jquery/tracking.js',			'requires': { 'jquery': true } },
	'formvalidation':{ 'src': 'i/js/jquery/form.validation.js',		'requires': { 'jquery': true } },
	'prices':        { 'src': 'i/js/jquery/prices2.js',             'requires': { 'jquery': true, 'autocomplete': true } }
});