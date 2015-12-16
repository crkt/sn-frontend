define(['api'], function(API) {
  
  function LoginView() {
    var template = document.querySelector("#user-login");
    this.dom = document.importNode(template.content, true);
    this.form = this.dom.querySelector(".login");
    this.username = this.dom.querySelector(".username");
    this.password = this.dom.querySelector(".password");

    var self = this;
    this.form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (self.onLogin) {
        self.onLogin(self.username.value,
                     self.password.value);
      }
    }, false);
  }

  LoginView.prototype.setUsername = function (username) {
    this.userName.value = username;
  }

  LoginView.prototype.setPassword = function (password) {
    this.password.value = password;
  }

  function Login(view) {
    this.view = view || new LoginView();
    
    this.loginCallback = null;

    this.view.onLogin = Login.prototype.onLogin.bind(this);
  }

  Login.prototype.onError = function (e) {
    console.log("Error login");
  }

  Login.prototype.onLogin = function (name, password) {
    var self = this;
    if (self.loginCallback) {
      API.login({username: name, password: password},
                function (r) {
                  self.loginCallback(r);
                },
                self.onError.bind(self));
    }
  }

  return Login;

});
