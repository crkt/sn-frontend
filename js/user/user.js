define(['api'], function(API) {
  
  function RegisterView() {
    var template = document.querySelector("#user-register");
    this.dom = document.importNode(template.content, true);
    this.form = this.dom.querySelector(".register");
    this.userName = this.dom.querySelector(".username");
    this.email = this.dom.querySelector(".email");
    this.password = this.dom.querySelector(".password");
    this.repeat = this.dom.querySelector(".repeat");

    var self = this;
    this.form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (self.onRegister) {
        self.onRegister(self.userName.value,
                        self.email.value,
                        self.password.value,
                        self.repeat.value);
      }
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

  RegisterView.prototype.hide = function () {
    this.form.classList.add("hidden");
  }

  RegisterView.prototype.show = function () {
    this.form.classList.remove("hidden");
  }

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

  LoginView.prototype.hide = function () {
    this.form.classList.add("hidden");
  }

  LoginView.prototype.show = function () {
    this.form.classList.add("hidden");
  }

  function ProfileView() {
    var template = document.querySelector("#user-profile");
    this.dom = document.importNode(template.content, true);
    this.userName = this.dom.querySelector(".username");    
  }

  ProfileView.prototype.setUsername = function (username) {
    this.userName.textContent = username;
  }


  function User(register,login,profile) {
    this.register = register || new RegisterView();
    this.login = login || new LoginView();
    this.profile = profile || new ProfileView();

    this.register.onRegister = User.prototype.onRegister.bind(this);
    this.login.onLogin = User.prototype.onLogin.bind(this);
    this.profile.onLogout = User.prototype.onLogout.bind(this);
  }

  User.prototype.getUser = function () {
    return this.user;
  }

  User.prototype.setUser = function (user) {
    this.user = user;
    this.profile.setUsername(user.username);
  }

  User.prototype.onError = function (type, errors) {
    if (type === "register") {
      console.log("Failed to register" + errors);
    } else if (type === "login") {
      console.log("Failed to login" + errors);
    }
  }

  User.prototype.onRegister = function (name, email, password, repeat) {
    var self = this;
    API.register({username: name, email: email, password: password},
                 function (r) {
                   if (self.onUserLoggedIn) {
                     self.onUserLoggedIn(true, r);
                   }
                 },
                 self.onError.bind(self, "register"));
  }

  User.prototype.onLogin = function (name, password) {
    var self = this;
    API.login({username: name, password: password},
              function (r) {
                if (self.onUserLoggedIn) {
                  self.onUserLoggedIn(true, r);
                }
              },
              function (error) {
                self.onError.call(self, "login", error);
              });
  }

  User.prototype.onLogout = function () {
    
  }

  return User;

});
