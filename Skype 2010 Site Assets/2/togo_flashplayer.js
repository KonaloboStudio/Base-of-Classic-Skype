var conf = {
	main: {
		videoH264Url: "http://download.skype.com/share/videos/togo-video/skype_to_go.f4v",
		videoUrl: "http://download.skype.com/share/videos/togo-video/skype_to_go.flv",
		iphoneUrl: "http://download.skype.com/share/videos/togo-video/skype_to_go-iphone.mp4",
		playButtonVisible: "true",
		startFrameImage: ""+SKYPE.settings.assetsPath+"/i/images/backgrounds/skype-to-go-video-bg.png",
		endFrameImage: ""+SKYPE.settings.assetsPath+"/i/images/backgrounds/skype-to-go-video-bg-end.png"
	},
	paid: {
		videoH264Url: "http://download.skype.com/share/videos/togo-video/skype_to_go.f4v",
		videoUrl: "http://download.skype.com/share/videos/togo-video/skype_to_go.flv",
		iphoneUrl: "http://download.skype.com/share/videos/togo-video/skype_to_go-iphone.mp4",
		playButtonVisible: "true",
		startFrameImage: ""+SKYPE.settings.assetsPath+"/i/images/backgrounds/skype-to-go-paid-video-bg.png",
		endFrameImage: ""+SKYPE.settings.assetsPath+"/i/images/backgrounds/skype-to-go-paid-video-bg-end.png"
	}
};
SKYPE.flash.VideoPlayer.write("flashcontent", 670, 378, conf.main, "#00AFF0");
SKYPE.flash.VideoPlayer.write("togovideo-header", 554, 312, conf.paid, "#00AFF0");
