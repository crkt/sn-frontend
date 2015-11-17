define(['models/user', 
        'views/register-widgets', 
        'views/base-widgets'], function(User, FormWidget, Base) 
{
          
  var exports = {};

  function Form(onsubmit) {
    Base.Base.call(this, "form");
    this.addClass("user-form");
    
    if (onsubmit) {
      this.setEvent("onsubmit", onsubmit);
    } else {
      this.setEvent("onsubmit", this.onSubmit.bind(this));
    }
  }

  Form.prototype = Object.create(Base.Base.prototype);
  Form.prototype.constructor = Form;

  Form.prototype.onSubmit = function (e) {
    e.preventDefault();
    console.log("form submit yo");
  };


  

  function Register(callback) {
    Base.Base.call(this, "div");
    this.addClass("active");
    this.setAttribute("id", "register");
    
    this.callback = callback;

    this.form = new Form(this.onSubmit.bind(this));

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

  Register.prototype = Object.create(Form.prototype);
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

  function Login() {
    Base.Base.call(this, "div");
    this.setAttribute("id", "login");

    this.form = new Form();

    this.addChild(this.form.element);
  }

  Login.prototype = Object.create(Form.prototype);
  Login.prototype.constructor = Login;


  exports.Register = Register;
  exports.Login = Login;
  
  return exports;
});
