SKYPE.namespace('conditional');

SKYPE.conditional.Content = function() {
	var _getRoot = function() {
		var root = '';
		// Top root / or /intl/xx/ root
		var rootRE = /^(\/|\/intl\/[^\/]+\/)(home|welcomeback\/)?$/;
		
		// Check if we are on root page
		var result = location.pathname.match(rootRE);
		if (result) {
			root = result[1];
		}
		return root;
	};
	var _options;
	
	return {
		run: function() {
			SKYPE.conditional.Content.cookify();
			SKYPE.conditional.Content.toggleUsername();
		},
		cookify: function() {
			var installed = SkypeDetection.installed;
			var age = SkypeDetection.internal.profileAge;
		
			// Set the profile value in SC cookie
			var modTime = SKYPE.user.Preferences.getTimeModified();
		
			SKYPE.log('Checking if should cookify user, installed: '+installed+', modtime: '+modTime, 'info');
		
			if (installed) {
				var modify = false;
				// 24 hours delay is for new user check
				if (isNaN(modTime) || modTime < (new Date()).getTime() / 1000 - 60*60*24) {
					SKYPE.log('Modification time is more than a day ago, checking profile', 'info');
					if (age && age > 14) {
						SKYPE.log('Setting cookie profile to: existing', 'info');
						SKYPE.user.Preferences.setClientProfile('existing', 'info');
					} else {
						SKYPE.log('Setting cookie profile to: 14days', 'info');
						SKYPE.user.Preferences.setClientProfile('14days');
					}
					modify = true;
				}
			
				// Check wether client version has been updated
				var skypeVer = SKYPE.conditional.Content.getPlatformID()+'/'+SkypeDetection.version+'/';
			
				// Ignore when source=installer etc is on URL
				if (skypeVer != SKYPE.user.Preferences.getVersion() && location.search.indexOf('source=') == -1) {
					SKYPE.log('Setting installed version to '+skypeVer, 'info');
					SKYPE.user.Preferences.setVersion(skypeVer);
					modify = true;
				}

				// Only update cookie if needed
				if (modify) {
					SKYPE.log('Updating cookie with client profile info', 'info');
					SKYPE.user.Preferences.save();
				}
			}
		},
		getPlatformID: function() {		
			switch (SkypeDetection.platform) {
				case 'windows': return 0;
				case 'macosx': return 3;
				case 'mac': return 3;
				case 'linux': return 2;
			}
			return '';
		},
		toggleUsername: function() {
			var username = SkypeDetection.internal.username;
			if (typeof _options != 'undefined' && typeof username == 'string' && username.length) {
				var _default = _options.loginDetails['default'];
				var _loggedIn = _options.loginDetails['loggedIn'];
				
				$(_loggedIn).removeClass('hidden').find('span.username').html(username.replace(/[<>]/, ''));
				$(_default).addClass('hidden');
			}
		},
		init: function(options) {
			if (typeof SkypeDetection != 'undefined') {
				_options = options[0];
				SkypeDetection.detect(SKYPE.conditional.Content.run);
			}
		}
	};
}();

SKYPE.conditional.init = function(options) {
	SKYPE.conditional.Content.init(options);
};

SKYPE.register('conditional', SKYPE.conditional, {version: '1.0', build: '1'});