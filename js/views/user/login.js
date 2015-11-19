define(['models/user', 
        'widgets/form', 
        'widgets/base'], function(User, FormWidget, Base) 
{
  var exports = {};

  function Register(callback, cancel) {
    Base.Base.call(this, "div");
    this.setAttribute("id", "register");
    
    this.callback = callback;
    this.cancel = cancel;

    this.form = new FormWidget.Form(this.onSubmit.bind(this));
    this.form.addClass("user-form");

    this.model = new User();

    this.email = new FormWidget.CompoundInput("email", 
                                              "Email", 
                                              "email",
                                              "Your email",
                                              this.onChange.bind(this, "email"));

    this.password = new FormWidget.CompoundInput("password", 
                                                 "Password", 
                                                 "password",
                                                 "Enter password", 
                                                 this.onChange.bind(this, "password"));

    this.repassword = new FormWidget.CompoundInput("password", 
                                                   "Confirm Password",
                                                   "password",
                                                   "Re-enter password", 
                                                   this.onChange.bind(this, "repassword"));
    this.submitButton = new Base.Button("submit", "Register");
    this.submitButton.setDisabled(true);

    this.cancelButton = new Base.Button("button", "Cancel", 
                                        this.onCancelClick.bind(this));

    this.form.addChild(this.email.element);
    this.form.addChild(this.password.element);
    this.form.addChild(this.repassword.element);
    this.form.addChild(this.submitButton.element);    
    this.form.addChild(this.cancelButton.element);
    this.addChild(this.form.element);
  }

  Register.prototype = Object.create(Base.Base.prototype);
  Register.prototype.constructor = Register;

  Register.prototype.onCancelClick = function (e) {
    this.cancel();
  }

  Register.prototype.isValid = function () {
    return (this.model.isValid() &&
            this.model.getPassword() == this.repassword.input.getValue());
  }

  Register.prototype.onChange = function (prop, value) {
    console.log("Value is: " + value);
    console.log("Property is: " + prop);
    console.log("Register field change");
    if (prop == "email") {
      this.model.setEmail(value);
    } else if (prop == "password") {
      this.model.setPassword(value);      
    } else if (prop == "repassword") {
      if (this.model.getPassword() != value) {
        console.log("Password doesn't match, do things here");
        this.submitButton.setDisabled(true);
      } else {
        this.submitButton.setDisabled(false);
      }
    }
    this.submitButton.setDisabled(!this.isValid());
  };

  Register.prototype.onSubmit = function (e) {
    console.log("Register submit");
    this.callback(this.model, e);
  }

  Register.prototype.onError = function (error) {   
    if (error.field == "email") {
      this.email.input.setInvalid();
    } else if (error.field = "password") {
      this.password.input.setInvalid();
    }
    console.log("On error register " + error);
  }

  Register.prototype.toggleActive = function (t) {
    this.toggleClass("active", t);
  }

  Register.prototype.toggleVisible = function (t) {
    this.toggleClass("active", t);
  }

  Register.prototype.reset = function () {
    this.model = new User();
    this.email.input.clear();
    this.password.input.clear();
    this.repassword.input.clear();
    this.submitButton.setDisabled(true);
  }

  function Login(callback, register) {
    Base.Base.call(this, "div");
    this.setAttribute("id", "login");

    this.register = register;
    this.callback = callback;

    this.form = new FormWidget.Form(this.onSubmit.bind(this));
    this.form.addClass("user-form");

    this.model = new User();

    this.email = new FormWidget.CompoundInput("text", 
                                              "Email",
                                              "email",
                                              "Your email",
                                              this.onChange.bind(this, "email"));

    this.password = new FormWidget.CompoundInput("password", 
                                                 "Password", 
                                                 "password",
                                                 "Enter password", 
                                                 this.onChange.bind(this, "password"));

    this.submitButton = new Base.Button("submit", "Login");
    this.submitButton.setDisabled(true);

    this.registerButton = new Base.Button("button", "Create user", this.onRegisterClick.bind(this));
    this.registerButton.setDisabled(false);

    this.form.addChild(this.email.element);
    this.form.addChild(this.password.element);
    this.form.addChild(this.submitButton.element);    
    this.form.addChild(this.registerButton.element);
    this.addChild(this.form.element);
  }

  Login.prototype = Object.create(Base.Base.prototype);
  Login.prototype.constructor = Login;

  Login.prototype.onRegisterClick = function (e) {
    console.log("Create user clicked");
    this.register();
  }

  Login.prototype.toggleActive = function (t) {
    this.toggleClass("active", t);
  }
  
  Login.prototype.toggleVisible = function (t) {
    this.toggleClass("active", t);    
  }

  Login.prototype.isValid = function () {
    return (this.model.isValid());
  }

  Login.prototype.onChange = function (prop, value) {
    if (prop == "email") {
      this.email.input.removeInvalid();
      this.model.setEmail(value);
    } else if (prop == "password") {
      this.password.input.removeInvalid();
      this.model.setPassword(value);
    }
    this.submitButton.setDisabled(!this.isValid());
  }

  Login.prototype.onError = function (error) {
    if (error.field == "email") {
      this.email.input.setInvalid();
    } else if (error.field = "password") {
      this.password.input.setInvalid();
    }
    console.log("On error register " + error); 
  }

  Login.prototype.onSubmit = function (e) {
    console.log("Login");
    this.callback(this.model, e);
  }


  function Profile() {
    Base.Base.call(this, "div");
    this.setAttribute("id", "user-profile");

    this.infoPanel = new Base.Base("div");
    this.info = new Base.Label("Logged in as: ");
    this.infoEmail = new Base.Label();

    this.infoPanel.addChild(this.info.element);
    this.infoPanel.addChild(this.infoEmail.element);

    this.addChild(this.infoPanel.element);
  }

  Profile.prototype = Object.create(Base.Base.prototype);
  Profile.prototype.constructor = Profile;

  Profile.prototype.toggleActive = function (t) {
    this.toggleClass("active", t);
  }

  Profile.prototype.toggleVisible = function (t) {
    this.toggleClass("active", t);
  }

  Profile.prototype.setUser = function (user) {
    this.user = user;
    this.infoEmail.setContent(user.email);
  }

  exports.Profile = Profile;
  exports.Register = Register;
  exports.Login = Login;
  
  return exports;
});
