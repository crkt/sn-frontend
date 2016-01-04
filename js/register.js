define(['api','user/register'], function(API, Register) {
  
  /**
     Register

     The main file of the register a user page
  **/

  var register = new Register();
  document.querySelector("#user").appendChild(register.view.dom);

  register.registerCallback = function (user) {
    localStorage.setItem("user", user.id);
    localStorage.setItem("username", user.username);
    // Go back to the main page with the user
    window.location = "/";
  }

});
