define([], function() {
  
  // The javascript object to return to requirejs.
  // e.g what will be exported to other modules.
  var exports = {};

  /**
     Sends a POST request to with data and to the destination specified.
     Only sends with JSON.
     From https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
   **/
  var send = function(type, data, dest, success, failure) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, dest, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    
    // If the request timeouts.
    xhr.ontimeout = function () {
      failure();
    };
    
    // If things go as planned, run the success function that was
    // supplied.  if not, the failure function.
    xhr.onload = function () {
      if (xhr.readyState === 4) {
	if (xhr.status === 200) {
	  success(xhr, JSON.parse(xhr.response));
	} else {
	  failure(xhr, xhr.response);
	}
      }
    };
    
    // If shit goes wrong, we want to know and why.
    xhr.onerror = function (e) {
      console.log("Post request failed.");
      failure(xhr.statusText);
    }
    
    // Sends the data as a JSON object.
    console.log(JSON.stringify(data));
    xhr.send(JSON.stringify(data));
  };

  var register = function(type, data, dest, success, failure) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, dest, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    xhr.ontimeout = function () {
      console.log("xhr ontime");
      failure();
    }

    xhr.onerror = function (e) {
      console.log("xhr onerror");
      failure(xhr.statusText);
    }

    xhr.onload = function () {
      console.log("xhr load");
      if (xhr.readyState === 4) {
        if (xhr.status === 201) {
          success(xhr, JSON.parse(xhr.response));
        } else if (xhr.status === 400) {     
          console.log("400");
        } else {
          failure(xhr, xhr.response);
        }
      }
    }
    xhr.send(JSON.stringify(data));
  }

  var login = function(type, data, dest, success, onerror, failure) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, dest, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");

    xhr.ontimeout = function () {
      console.log("xhr ontime");
      failure();
    }

    xhr.onerror = function (e) {
      console.log("xhr onerror");
      failure(xhr.statusText);
    }

    xhr.onload = function () {
      console.log("xhr load");
      if (xhr.readyState === 4) {
        if (xhr.status === 202) {
          success(xhr, JSON.parse(xhr.response));
        } else if (xhr.status === 400) {     
          onerror(xhr, JSON.parse(xhr.response));
        } else {
          failure(xhr, xhr.response);
        }
      }
    }
    xhr.send(JSON.stringify(data));
  }

  // The functions to export.
  exports.send = send;
  exports.register = register;
  exports.login = login;
  
  return exports;
});
