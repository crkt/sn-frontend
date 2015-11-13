define(['models/user', 'views/register-widgets'], function(User, Widget) {

  var exports = {};

  function Login(element) {
    this.content = document.createElement("div");
    this.content.id = "login";

    this.form = document.createElement("form");
    this.form.classList.add("user-form");

    this.email = new Widget.formInput("text", "Email", "Your email");
    this.password = new Widget.formInput("password", "Password", "Enter password");

    this.submitbtn = document.createElement("button");
    this.submitbtn.type = "submit";    
    this.submitbtn.textContent = "Login";
    this.submitbtn.onclick = function (e) {
      e.preventDefault();
      console.log("Submit");
    }


    this.form.appendChild(this.email.content);
    this.form.appendChild(this.password.content);
    this.form.appendChild(this.submitbtn);
    this.content.appendChild(this.form);

    element.appendChild(this.content);
  }

  function Register(element) {
    this.content = document.createElement("div");
    this.content.id = "register";

    this.form = document.createElement("form");
    this.form.classList.add("user-form");

    this.email = new Widget.formInput("text", "Email", "Your email");
    this.password = new Widget.formInput("password", "Password", "Enter a password");
    
    this.submitbtn = document.createElement("button");
    this.submitbtn.type = "submit";    
    this.submitbtn.textContent = "Login";
    this.submitbtn.onclick = function (e) {
      e.preventDefault();
      console.log("Submit");
    }

    this.form.appendChild(this.email.content);
    this.form.appendChild(this.password.content);
    this.form.appendChild(this.submitbtn);
    this.content.appendChild(this.form);

    element.appendChild(this.content);
  }
  
  exports.Login = Login;
  exports.Register = Register;
  
  return exports;
});
