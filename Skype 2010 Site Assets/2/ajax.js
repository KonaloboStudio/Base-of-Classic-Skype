// Collect all Ajax requests when they are run and abort them if needed
SKYPE.AjaxCalls = function() {
	var calls = {};
	return {
		add: function(call) {
			calls[call.xhrId] = call.request;
			return calls;
		},
		remove: function(call) {
			if (typeof call == "string" && call) {
				if (calls[call] && calls[call].readyState < 4) {
					calls[call].abort();
				}
				delete calls[call];

			} else if (typeof call == "object" && call != "") {
				if (call.request.readyState < 4) {
					call.request.abort();
				}
				delete calls[call.xhrId];

			} else if (call == "") {
				for (var i in calls) {
					calls[i].request.abort();
					delete calls[i];
				}
				return calls;

			} else {
				return null;
			}
		},
		list: function() {
			return calls;
		}
	};
}();


// Abort all Ajax calls when the page unloads
SKYPE.AjaxUnload = function() {
	$(window).bind("beforeunload", function() {
		SKYPE.AjaxCalls.remove();
	});
}();


// Generic AJAX handler
SKYPE.Ajax = function() {

	var _handleError = function(error) {
		SKYPE.log(error, "error");
	};

	return {
		post: function(url, data, successCallback, errorCallback, dataType) {
			var callId = "id" + new Date().getTime();
			var _xhrObect;
			var _xhr = $.ajax({
				type: "POST",
				url: url,
				data: data,
				dataType: (dataType ? dataType : "json"),
				reqId: callId,
				success: function(response, textStatus) {
					if (typeof successCallback == 'function') {
						successCallback(response, textStatus);
					} else {
						if (response.status >= 400) {
							var errorText = response.status + " - " + response.status_text;
							_handleError(errorText);
						}
					}
				},
				error: function(response, textStatus) {
					if (typeof errorCallback == 'function') {
						if (false === errorCallback(response, textStatus))  {
							return;
						}
					}

					var errorText = "Connection error!";
					_handleError(errorText);
				},
				complete: function(requestObject) {
					SKYPE.log("["+url+"] removing "+this.reqId, "info");
					SKYPE.AjaxCalls.remove(this.reqId);
				}
			});

			_xhrObject = { "request" : _xhr , "xhrId" : callId };
			SKYPE.log("["+url+"] adding "+_xhrObject.xhrId, "info");
			SKYPE.AjaxCalls.add(_xhrObject);
			
			return _xhrObject;
		}
	};
}();