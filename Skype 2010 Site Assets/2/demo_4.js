var demoLang = "";
var demoOS = "windows";
var demoText = new Object();
var demoTitle = new Object();
demoText['windows'] = new Array(
	'Your home base gives your a handy overview over your contacts and if they\'re online or not. The little panels tell you if you missed a call or received a voicemail.'
	,'To call someone on Skype, just find that person in your Contact list, and click the big, green button.'
	,'Calls to other people on Skype are crystal-clear &mdash; some people say it feels like the person is right next to you!  When you don&rsquo;t feel like talking any more, just click the red button to hang up.'
	,'Talking on Skype is more than just 1-on-1. You can make conference calls with up to four other people, and you can all talk to each other at the same time.'
	,'With Skype, you can call other people even if they don&rsquo;t have a computer. It&rsquo;s called SkypeOut, and lets you call any phone number in the world <a href="/go/prices">at pretty low rates</a>.'
	,'Need to send an important document to your colleague? Downloaded a cool picture from the web that you want your friends to see? Just send it over with Skype file transfer. It&rsquo;s secure and encrypted like the rest of Skype, and handles files of any size.'
	,'You can type in addition to talking and you can invite up to 48 other friends to join in and make it a group chat. Chat is great for sharing gossip or organizing your next party!'
    ,'Smile, wave or say hello to anyone, anywhere in the world with free one-to-one video conversations.'
);
demoText['linux'] = new Array(
	'This is your home base; see any missed calls, missed chats etc. You&rsquo;ll get a quick overview of how many friends you have online and you can see the status of services you subscribe to.'
	,demoText['windows'][1]
	,demoText['windows'][2]
	,demoText['windows'][3]
	,demoText['windows'][4]
	,demoText['windows'][5]
	,demoText['windows'][6]
);
demoText['pocketpc'] = new Array(
	demoText['linux'][0]
	,demoText['windows'][1]
	,demoText['windows'][2]
	,'Want to check the profile of your contact during call? Want to add her to your Contacts or mute the microphone for a second? Just tap on the screen and a handy big-icon menu appears. Then, just tap with your finger on the thing you want to do.'
	,demoText['windows'][4]
	,'Entering SkypeOut numbers is handy. No need to open up that keyboard view or rely on the handwriting recognition if you\'re sitting in a bumpy car. Just open the Dialpad and tap on the numbers you want to dial.'
	,'Did you miss a call while wandering around? Want to see who you\'ve been talking to recently? All your calls are recorded in the handy Call List.'
	,'Sometimes talking on Skype isn\'t possible when the person you\'re trying to call is offline or busy. That\'s why we have Skype Voicemail.'
);
demoText['macosx'] = new Array(
	'This is your home base; see any missed calls, missed chats etc. You&rsquo;ll get a quick overview of how many friends you have online and you can see the status of services you subscribe to.'
	,'To call someone with Skype, just find that person in your Contact list, and click the big call button.'
	,'Calls to other Skype users are crystal-clear - many users have said it feels like the person is right next to you!  When you don&rsquo;t feel like talking any more, just click the hang up button to hang up.'
	,'Want to see who you\'ve been talking to recently? It\'s all handily available in the Call List, showing who you\'ve been talking to and for how long. And if you feel like talking to that person again, just click on the name in the call list, and the call is placed.'
	,demoText['windows'][4]
	,demoText['windows'][5]
	,demoText['windows'][6]
);
demoTitle['windows'] = new Array(
	'Contacts &amp; events'
	,'Making a call'
	,'Talking'
	,'Conference call'
	,'Call regular phones'
	,'File transfer'
	,'Chat'
    ,'Video call'
);
demoTitle['linux'] = new Array(
	'Start tab'
	,demoTitle['windows'][1]
	,demoTitle['windows'][2]
	,demoTitle['windows'][3]
	,demoTitle['windows'][4]
    ,demoTitle['windows'][5]
    ,demoTitle['windows'][6]
);
demoTitle['pocketpc'] = new Array(
	demoTitle['linux'][0]
	,demoTitle['windows'][1]
	,demoTitle['windows'][2]
	,'Call-time functions'
	,demoTitle['windows'][4]
	,'Dialpad'
	,'Call list'
	,'Voicemail'
);
//demoTitle['macosx'] = demoTitle['windows'];
demoTitle['macosx'] = new Array(
	'Contacts &amp; events'
	,'Making a call'
	,'Talking'
	,'Call list'
	,'Call regular phones'
	,'File transfer'
	,'Chat'
);

function demoStep(step) {
	if (!document.getElementById) return true;
	
	var img = document.getElementById('screenshot-img');
	var steps = new Array(
		document.getElementById('step1')
		,document.getElementById('step2')
		,document.getElementById('step3')
		,document.getElementById('step4')
		,document.getElementById('step5')
		,document.getElementById('step6')
		,document.getElementById('step7')
        ,document.getElementById('step8')
	);
    
    videoStep = document.getElementById('step8');
    
    if(!videoStep) { stepslength = steps.length - 1; } else { stepslength = steps.length; }
    
	for (var i=0; i < stepslength; i++) {
        var curstep = step-1;
		steps[i].className = (i==curstep ? 'step current' : 'step');
	}
	// Use language specific screenshots only for windows
	if (demoLang && demoLang.length && demoOS == 'windows')
		img.src = "/i_preairlift/screenshots/step"+step+"_"+demoOS+demoLang+".png";
	else
		img.src = "/i_preairlift/screenshots/step"+step+"_"+demoOS+".png";
	return false;
}
function demoSwitch(os) {
	if (!document.getElementById) return true;
	
	demoOS = os;
	
	var newStep = document.getElementById('step-new');
	if(newStep) { newStep.style.display = (demoOS == "windows") ? 'inline' : 'none'; }
        
    videoStep = document.getElementById('step8');
    if(videoStep) { videoStep.style.display = (demoOS == "windows") ? 'block' : 'none'; }
    
	var stepTexts = new Array(
		document.getElementById('step1txt')
		,document.getElementById('step2txt')
		,document.getElementById('step3txt')
		,document.getElementById('step4txt')
		,document.getElementById('step5txt')
		,document.getElementById('step6txt')
		,document.getElementById('step7txt')
        ,document.getElementById('step8txt')
	);
	var stepTitles = new Array(
		document.getElementById('step1hdr')
		,document.getElementById('step2hdr')
		,document.getElementById('step3hdr')
		,document.getElementById('step4hdr')
		,document.getElementById('step5hdr')
		,document.getElementById('step6hdr')
		,document.getElementById('step7hdr')
        ,document.getElementById('step8hdr')
	);
    if(!videoStep) { len = stepTexts.length - 1; } else { len = stepTexts.length; }
	for (var i=0; i < len; i++) {
		stepTexts[i].innerHTML = demoText[demoOS][i];
		stepTitles[i].innerHTML = demoTitle[demoOS][i];
	}
	demoStep(1);
	return false;
}