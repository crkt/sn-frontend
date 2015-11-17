define(['models/user', 
        'views/widgets/form', 
        'views/widgets/base'], function(User, FormWidget, Base) 
{
  var exports = {};

  function Register(callback) {
    Base.Base.call(this, "div");
    this.addClass("active");
    this.setAttribute("id", "register");
    
    this.callback = callback;

    this.form = new FormWidget.Form("user-form", this.onSubmit.bind(this));
    this.form.addClass("user-form");

    this.model = new User();

    this.email = new FormWidget.CompoundInput("text", 
                                              "Email", 
                                              "Your email",
                                              this.onChange.bind(this, "email"));

    this.password = new FormWidget.CompoundInput("password", 
                                                 "Password", 
                                                 "Enter password", 
                                                 this.onChange.bind(this, "password"));

    this.repassword = new FormWidget.CompoundInput("password", 
                                                   "Confirm Password", 
                                                   "Re-enter password", 
                                                   this.onChange.bind(this, "repassword"));
    this.submitButton = new Base.Button("submit", "Register");

    this.form.addChild(this.email.element);
    this.form.addChild(this.password.element);
    this.form.addChild(this.repassword.element);
    this.form.addChild(this.submitButton.element);    
    this.addChild(this.form.element);
  }

  Register.prototype = Object.create(Base.Base.prototype);
  Register.prototype.constructor = Register;

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

  Register.prototype.reset = function () {
    this.model = new User();
    this.email.input.clear();
    this.password.input.clear();
    this.repassword.input.clear();
    this.submitButton.setDisabled(true);
  }

  function Login() {
    Base.Base.call(this, "div");
    this.setAttribute("id", "login");

    this.form = new FormWidget.Form();
    this.form.addClass("user-form");

    this.addChild(this.form.element);
  }

  Login.prototype = Object.create(Base.Base.prototype);
  Login.prototype.constructor = Login;


  exports.Register = Register;
  exports.Login = Login;
  
  return exports;
});
