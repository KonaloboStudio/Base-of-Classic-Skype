SKYPE.namespace("www");
SKYPE.www.PairedInviteSharedObject = function() {

	var flashUrl = "http://www.skype.com/i/flash/paired-invite.swf";
	
	    if (location.href.match(/[?&]username=([^&]+)/)) {
	        var skypename = location.href.match(/[?&]username=([^&]+)/)[1];
	        
	        var fullnameMatch = location.href.match(/[?&]fullname=([^&]+)/);
	        var fullname = fullnameMatch ? fullnameMatch[1] : "";
	
	        writeFlash(skypename, fullname);
	    }
	
	        
	function writeFlash(skypename, fullname) {
	      var params = {
	          wmode: "transparent"
	      };
	      var flashvars = {
	          skypename: skypename,
	          fullname: fullname
	      };
	
	      var divId = makeContainerDiv("pairedInviteFlashDiv").id;
	      swfobject.embedSWF(flashUrl, divId, 3, 3, "9.0.0", null, flashvars, params, {id: "pairedInviteFlash", bgcolor:"#FFFFFF"});
	}
	
	function makeContainerDiv(divId){
	    var container = document.createElement("DIV");
	    container.id = divId;
	    $('#divId').css({
		   position : 'absolute',
		   width : '3px',
		   height : '3px',
		   font : '1px monospace',
		   top : '0px',
		   left : '0px'
		});
	    document.body.appendChild(container);
	    return container;
	}

}();