var D = YAHOO.util.Dom;
var E = YAHOO.util.Event;

function addPlayer() {
	
	var flashLang;
	var useLang;
	var useSubtitles;
	var useAutoPlay;
	
	D.getElementsByClassName('noFlashMessage', '', '', function() {
		flashLang = D.get(this).id;
	});
	
	if (document.location.href.indexOf("autoplay") > 0) {
		useAutoPlay = "true";
	} else {
		useAutoPlay = "false";	
	}
		
	if (flashLang != "") {
			
		useLang = flashLang.slice(0,2);
		useSubtitles = flashLang.slice(-2);
		
		var conf = {
			lang: useLang,
			videoH264Url: "http://download.skype.com/share/videos/business/case-study-maxim.f4v",
			videoUrl: "http://download.skype.com/share/videos/business/case-study-maxim.flv",
			autoPlay: useAutoPlay,
			startFrameImage: ""+SKYPE.settings.assetsPath+"/i/images/backgrounds/atwork_video_image.png",
			//chaptersFolder: location.href.split('/').slice(0,-1).join('/')+'/',
			//chapters: useLang,
			//subtitles: useSubtitles,
			tracking: true
		};
		
	} else {
		var conf = {
			videoH264Url: "http://download.skype.com/share/videos/business/case-study-maxim.f4v",
			videoUrl: "http://download.skype.com/share/videos/business/case-study-maxim.flv",
			autoPlay: useAutoPlay,
			startFrameImage: ""+SKYPE.settings.assetsPath+"/i/images/backgrounds/atwork_video_image.png",
			tracking: true
		};
	}
	
	SKYPE.flash.BusinessVideoPlayer.write("videoHolder", 460, 260, conf, "#FFFFFF");
}

E.onDOMReady(function () {

	addPlayer();

});