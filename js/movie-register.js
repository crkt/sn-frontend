define(['api','movie/register'], function(API, Register) {
  
  var register = new Register();
  document.querySelector("#movie").appendChild(register.view.dom);

  register.registerCallback = function (id) {
    // Go back to the main page with the user
    window.search.id = id;
	window.location = "/movie";
  }

});