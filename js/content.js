var DOMNavigator = DOMNavigator || {};

var granularityOptions = [
		"character",
		"word",
		"sentence",
		"paragraph",
		"heading",
		"forms",
		"table",
		"list"
	],
	currentElement = 4,
	activeDOMElement,
	dom;

// Header Navigation object, with 2 variables: headerMarker marks the current h in the headerList of the page
DOMNavigator.headerNavigator = (function() {
	var headerMarker = 0,
		headerList = [];

	return {
		init: function() {
			headerMarker = 0;
			headerList = $(":header");
			if (currentElement == 4) {
				$(headerList[0]).addClass("activeSpeakElement");
			}
			console.log(headerList);
		},
		next: function() {
			if (headerMarker < headerList.length) {
				if ($(headerList[headerMarker]).hasClass("activeSpeakElement")) {
					$(headerList[headerMarker]).removeClass("activeSpeakElement");
				}
				headerMarker++;
			}
			console.log("[NEXT] In header #" + headerMarker + " of a total of " + headerList.length + " in the page.");
			$(headerList[headerMarker]).addClass("activeSpeakElement");
			return headerList[headerMarker];
		},
		previous: function() {
			if (headerMarker > 0) {
				if ($(headerList[headerMarker]).hasClass("activeSpeakElement")) {
					$(headerList[headerMarker]).removeClass("activeSpeakElement");
				}
				headerMarker--;
			}
			$(headerList[headerMarker]).addClass("activeSpeakElement");
			return headerList[headerMarker];
		}
	}
})(); 


$(document).ready(function() {
	console.log("SCREEN READER IS ACTIVE");
	DOMNavigator.headerNavigator.init();
});

/*  cases is an object that stores the functions that will be called 
	when pressing a key */
var cases = {
	// Arrow right -> Next element (depending on the granularity)
	39: speakNext,
	// Arrow left -> Previous element (depending on the granularity)
	37: speakPrevious,
	// Arrow up -> next granularity option
	38: optionNext,
	// Arrow down -> previous granularity option
	40: optionPrevious,
	// Space bar -> activate interactive element
	32: activateInteractiveElement,
	// Esc -> stop editing interactive element
	27: exitInteractiveElement,
	// 'F' -> Go to first element (depending on the granularity)
	70: gotoFirstElement
};

/* object containing functions that move to the first element depending on the granularity level */
var moveToFirstElement  =  {
	character: function() {

	},
	word: function() {

	},
	sentence: function() {

	},
	paragraph: function() {

	},
	heading: function() {
		DOMNavigator.headerNavigator.init();
	},
	form: function() {

	},
	table: function() {
		var numTables = $("li").length;
		console.log("There are " + numTables + " tables in this webpage");
	},
	list: function() {
		var numberLists = $("ul").length;
		console.log("there are " + numberLists + " lists in this document");
		$("ul:first").addClass("currentReading");
	}
};

/* object containing functions that moves to the next element, depending on its granularity */
var moveToNextElement  =  {
	character: function() {

	},
	word: function() {

	},
	sentence: function() {

	},
	paragraph: function() {

	},
	heading: function() {
		console.log(DOMNavigator.headerNavigator.next());
	},
	form: function() {

	},
	table: function() {

	},
	list: function() {
	}
};

/* object containing functions that moves to the next element, depending on its granularity */
var moveToPreviousElement  =  {
	character: function() {

	},
	word: function() {

	},
	sentence: function() {

	},
	paragraph: function() {

	},
	heading: function() {
		console.log(DOMNavigator.headerNavigator.previous());
	},
	form: function() {

	},
	table: function() {

	},
	list: function() {
	}
};

function speakNext() {
	console.log("Say next element");
	moveToNextElement[granularityOptions[currentElement]]();
}

function speakPrevious() {
	console.log("Say previous element");
	moveToPreviousElement[granularityOptions[currentElement]]();

}

function optionNext() {
	console.log("choose next option");
	if (currentElement < 7) {
		currentElement++;
		console.log(granularityOptions[currentElement]);
	}
	chrome.runtime.sendMessage({action: "speak", utterance: granularityOptions[currentElement]});
}

function optionPrevious() {
	console.log("choose previous version");
	if (currentElement > 0) {
		currentElement--;
		console.log(granularityOptions[currentElement]);
	}
	chrome.runtime.sendMessage({action: "speak", utterance: granularityOptions[currentElement]});
}

function activateInteractiveElement() {
	console.log("activate Interactive Element");
}

function exitInteractiveElement() {
	console.log("exit interactive element");
}

function gotoFirstElement() {
	moveToFirstElement[granularityOptions[currentElement]];
}

/* key down event */
$(window).keydown(function(event) {
	event.stopPropagation();
	event.preventDefault();
	console.log("KEY CODE: " + event.keyCode)
	if (!(typeof cases[event.keyCode] === "function")) {
		console.log("error");
	} else {
		cases[event.keyCode](event.keyCode);
	}
});


// heading Navigation