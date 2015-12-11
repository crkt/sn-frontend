define(['api','user/register'], function(API, Register) {
  
  var register = new Register();
  document.querySelector("#user").appendChild(register.view.dom);

  register.registerCallback = function (user) {
    localStorage.setItem("user", user.id);
    // Go back to the main page with the user
    window.location = "/";
  }

});
