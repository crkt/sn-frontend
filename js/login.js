define(['api','user/login'], function (API, Login) {
  
  var login = new Login();
  document.querySelector("#user").appendChild(login.view.dom);

  login.loginCallback = function (user) {
    localStorage.setItem("user", user.id);
    // Go back to main page with the user
    window.location = "/";
  }
  
});
