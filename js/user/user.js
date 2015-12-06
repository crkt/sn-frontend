define(['api'], function(API) {
  
  function RegisterView() {
    var template = document.querySelector("#user-register");
    this.dom = document.importNode(template.content, true);
    this.form = this.dom.querySelector(".register");
    this.username = this.dom.querySelector(".username");
    this.email = this.dom.querySelector(".email");
    this.password = this.dom.querySelector(".password");
    this.repeat = this.dom.querySelector(".repeat");

    var self = this;
    this.form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (self.onRegister)
        self.onRegister(self.username.value,
                        self.email.value,
                        self.password.value,
                        self.repeat.value);
    }, false);
  }

  RegisterView.prototype.setUsername = function (name) {
    this.userName.value = name;
  }

  RegisterView.prototype.setEmail = function (email) {
    this.email.value = email;
  }

  RegisterView.prototype.setPassword = function (password) {
    this.password.value = password;
  }

  RegisterView.prototype.setRepeat = function (repeat) {
    this.repeat.value = repeat;
  }

  function LoginView() {

  }

  function ProfileView() {

  }


  function User(register,login,profile) {
    this.register = register || new RegisterView();
    this.login = login || new LoginView();
    this.profile = profile || new ProfileView();   

    this.register.onRegister = User.prototype.onRegister.bind(this);
    this.login.onLogin = User.prototype.onLogin.bind(this);
    this.profile.onLogout = User.prototype.onLogout.bind(this);
  }

  User.prototype.onError = function (type, errors) {
    if (type === "register") {
      console.log("Failed to register" + errors);
    }
  }

  User.prototype.onRegister = function (name, email, password, repeat) {
    var self = this;
    API.register({name: name, email: email, password: password},
                 function (r) {
                   if (self.onUserLoggedIn) {
                     self.onUserLoggedIn(true);
                   }
                 },
                 self.onError.bind(self, "register"));
  }

  User.prototype.onLogin = function (name, password) {

  }

  User.prototype.onLogout = function () {
    
  }

  return User;

});
