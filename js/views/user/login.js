define(['models/user', 'views/register-widgets', 'views/base-widgets'], function(User, FormWidget, Base) {
          
  var exports = {};

  function Form(id, onsubmit) {
    Base.Base.call(this, "div");
    this.setAttribute("id", id);
    
    this.form = new Base.Base("form");
    this.form.addClass("user-form");
    
    this.form.setEvent("onsubmit", this.onSubmit.bind(this));
  }

  Form.prototype.onSubmit = function (e) {
    console.log("form submit yo");
  }

  Form.prototype = Object.create(Base.Base.prototype);
  Form.prototype.constructor = Form;
  

  function Register(onsubmit, that) {
    Form.call(this, "register", onsubmit.bind(that));
    
    this.email = new FormWidget.CompoundInput("text", "Email", "Your email");
    this.password = new FormWidget.CompoundInput("password", "Password", "Enter password");
    this.repassword = new FormWidget.CompountInput("password", "Confirm Password", "Re-enter password");

    this.submitButton = new Base.Button("submit","Register");
    
    this.addChild(this.email.element);
    this.addChild(this.password.element);
    this.addChild(this.repassword.element);
    this.addChild(this.submitButton.element);
  }

  Register.prototype = Object.create(Form.prototype);
  Register.prototype.constructor = Register;

  
  function Login(onsubmit) {
    Form.call(this, "login", onsubmit.bind(that));
  }

  Login.prototype = Object.create(Form.prototype);
  Login.prototype.constructor = Login;
  exports.Register = Register;
  
  return exports;
});
