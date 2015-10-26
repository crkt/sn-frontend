define([], function() {

    var exports = {};

    var registerRequest = function(data, success, failure) {
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/stores", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Accept", "application/json");

	xhr.ontimeout = function () {
	    failure();
	};
	
	xhr.onload = function () {
	    if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		    success(xhr, xhr.response);
		} else {
		    failure(xhr, xhr.response);
		}
	    }
	};

	xhr.onerror = function (e) {
	    console.log("FAILED TO SUBMIT");
	    failure(xhr.statusText);
	}
	

	xhr.send(JSON.stringify(data));
    };

    var searchMovies = function (success,failure) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/movies", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.setRequestHeader("Accept", "application/json");

	xhr.onload = function () {
	    if (xhr.readyState === 4) {
		if (xhr.status === 200) {
		    success(xhr,JSON.parse(xhr.response));
		} else {
		    failure(xhr, xhr.response);
		}
	    }
	}

	xhr.send();
    }


    exports.register = registerRequest;
    exports.index = storesIndex;

    return exports;
});
