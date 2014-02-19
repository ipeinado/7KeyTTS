var speakOptions = {
	lang: "en-US",
	gender: "female",
	rate: 1,
	volume: 1.0,
	pitch: 1
}

$(document).ready(function() {
	var myVoices = [];
	chrome.tts.getVoices(
		function(voices) {
			for (var i = 0; i < voices.length; i++) {
				console.log('Voice ' + i + ':');
				console.log(' name: ' + voices[i].voiceName);
				console.log(' lang: ' + voices[i].lang);
				console.log(' gender: ' + voices[i].gender);
				console.log(' extension id: ' + voices[i].extensionId);
				console.log(' event types: ' + voices[i].eventTypes); 
				myVoices.push(voices[i]);
			}
		}
	);
});



chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("MESSAGE RECEIVED");
		if (request.action == "speak") {
			if (request.hasOwnProperty("utterance") && request["utterance"] != "") {
				chrome.tts.speak(request.utterance);
				return;
			}

			if (request.hasOwnProperty("granularity")) {
				if (request.granularity == "character") {

				} else if (request.granularity == "word") {
					chrome.tts.speak("Hi how are you",
						{
							onEvent: function(event) {
								if (event.type == "word") {
									console.log("word event");
									return;
								}
							}
						}
					);

				} else if (request.granularity == "sentence") {

				}
			}
		}
	}
);

