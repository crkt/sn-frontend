define(['models/user', 'views/input-widgets'], function(User, Widget) {

  var exports = {};

  function Login(element, onchange, that) {
    this.content = document.createElement("div");
    this.content.id = "login";

    this.model = new User();

    this.form = document.createElement("form");
    this.form.classList.add("user-form");

    this.email = new Widget.Input("text", "Email", "Your email");
    this.password = new Widget.Input("password", "Password", "Enter password");

    this.submitbtn = new Widget.Button("submit", "Login");
    this.submitbtn.content.classList.add("user-submit");


    this.form.onsubmit = onchange.bind(that, this.model);

    this.form.appendChild(this.email.content);
    this.form.appendChild(this.password.content);
    this.form.appendChild(this.submitbtn.content);
    this.content.appendChild(this.form);

    element.appendChild(this.content);
  }

  function Register(element, onchange, that) {
    this.content = document.createElement("div");
    this.content.id = "register";

    this.model = new User();

    this.form = document.createElement("form");
    this.form.classList.add("user-form");
    
    this.email = new Widget.Input("text", "Email", "Your email", function (e) {
      e.preventDefault();
      if (e.target.value == "") {
        this.model.setName(undefined);
      } else {
        this.model.setTitle(e.target.value);
      }
    });
                                  
    this.password = new Widget.Input("password", "Password", "Enter a password", function (e) {
      e.preventDefault();
      if (e.target.value == "") {
        this.model.setPassword(undefined);
      } else {
        this.model.setPassword(e.target.value);
      }
    });
                                     
    this.repassword = new Widget.Input("password", "Confirm Password", "Re-enter password", function (e) {
      e.preventDefault();
      if (e.target.value != this.model.getPassword()) {
        console.log("Password doesn't match");
      } else {
        this.model.setPassword(e.target.value);
      }
    });
    
    this.submitbtn = new Widget.Button("submit", "Register");
    this.submitbtn.content.classList.add("user-submit");
    
    this.form.onsubmit = onchange.bind(that, this.model);                       

    this.form.appendChild(this.email.content);
    this.form.appendChild(this.password.content);
    this.form.appendChild(this.repassword.content);
    this.form.appendChild(this.submitbtn.content);
    this.content.appendChild(this.form);

    element.appendChild(this.content);
  }
  
  exports.Login = Login;
  exports.Register = Register;
  
  return exports;
});
