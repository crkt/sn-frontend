define(['user/login'], function (Login) {
  
  /**
     Login
     
     The main file for Login.k
  **/

  var login = new Login();
  document.querySelector("#user").appendChild(login.view.dom);

  login.loginCallback = function (user) {
    localStorage.setItem("user", user.id);
    localStorage.setItem("username", user.username);
    // Go back to main page with the user
    window.location = "/";
  }
  
});
