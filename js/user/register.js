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

    this.email.addEventListener("change", function (e) {
      e.target.classList.remove("invalid");
    });
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

  function Register (view) {
    this.view = view || new RegisterView();

    this.registerCallback = null;

    this.view.onRegister = Register.prototype.onRegister.bind(this);
  }

  Register.prototype.onError = function (e) {
    alert("User already exists");
  }

  Register.prototype.onRegister = function (name, email, password, repeat) {
    var self = this;
    if (self.registerCallback) {
      API.register({username: name, password: password, email: email},
                   function (r) {
                     self.registerCallback(r);
                   },
                   self.onError.bind(self));
    }
  }

  
  return Register;
  
});  
