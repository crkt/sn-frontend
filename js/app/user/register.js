define(['app/request'], function(Request){

	var exports = {};

	var login = document.querySelector("#user-form");

	var register = document.querySelector("#register-form");

	var loginEmail = document.querySelector("#loginEmail");

	var loginPW = document.querySelector("#loginPW");

	var registerEmail = document.querySelector("#registerEmail");

	var registerPW = document.querySelector("#registerPW");



	var user = {
		email: "",
		password:  ""
	};


	loginEmail.onchange = function(e) {
		e.preventDefault();
		console.log(e);
		console.log(e.target);
		console.log(e.target.value);
		user.email = e.target.value;
		console.log(user);
	}

	loginPW.onchange = function(e) {
		e.preventDefault();
		console.log(e);
		console.log(e.target);
		console.log(e.target.value);
		user.password = e.target.value;
		console.log(user);	
	}

	registerEmail.onchange = function(e) {
		e.preventDefault();
		console.log(e);
		console.log(e.target);
		console.log(e.target.value);
		user.email = e.target.value;
		console.log(user);
	}
	registerPW.onchange = function(e) {
		e.preventDefault();
		console.log(e);
		console.log(e.target);
		console.log(e.target.value);
		user.password = e.target.value;
		console.log(user);
	}

	var success = function (xhr, args) {
		console.log(xhr, args);
	}

	var failure = function (xhr) {
		console.log(xhr.response);
	}

	var loginSubmit = function (e) {
    e.preventDefault();
    console.log(user);
    Request.send("PUT",
                 user,
                 "/user/login",
		 		success,
		 		failure
		);
  	};

	var registerSubmit = function (e) {
    e.preventDefault();
    console.log(user);
    Request.send("POST",
                 user,
                 "/user/register",
			 	success,
		 		failure
		);
  	};


	register.onsubmit = registerSubmit;
	login.onsubmit = loginSubmit;




	return exports;

});