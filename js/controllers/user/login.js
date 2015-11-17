define(['views/user/login', 
        'app/request', 
        'models/user'], function(UserView, Request, UserModel) {
  
  function User(onLogin) {

    this.view = document.querySelector("#user");  
  
    this.login = new UserView.Login();
    this.register= new UserView.Register(this.submit.bind(this, "register"));

    this.view.appendChild(this.login.element);
    this.view.appendChild(this.register.element);

    this.onLogin = onLogin
  }

  User.prototype.success = function (xhr, response) {
    // There be dragons here.
    this.onLogin(new UserModel(response.email, response.id));
    this.register.clear();
  }

  User.prototype.failure = function (xhr, response) {
    console.log("Failure to create user");
    console.log(response);
  }

  User.prototype.submit = function (type, user, e) {
    e.preventDefault();
    console.log("User obj: " + user);
    console.log("Type: " + type);
    if (type === "register") {
      Request.send("POST",
                   user,
                   "/user/register",
                   this.success.bind(this),
                   this.failure.bind(this)
                  );
    } else if (type === "login") {
      Request.send("PUT",
                   user,
                   "/user/login",
                   this.success.bind(this),
                   this.faulure.bind(this)
                  );      
    }
  }

  return User;

});
