define(['views/user/login', 'app/request'], function(UserView, Request) {
  
  function User(onLogin) {

    this.content = document.querySelector("#user");  
  
    this.login = new UserView.Login(this.content, this.login, this);
    this.register= new UserView.Register(this.content, this.register, this);

    this.onLogin = onLogin
  }

  User.prototype.success = function (xhr, response) {
    this.onLogin(response);
  }

  User.prototype.failure = function (xhr, response) {
    console.log("Failure to create user");
    console.log(response);
  }

  User.prototype.register = function (user, e) {
    e.preventDefault();
    console.log("User obj: " + user);
    console.log("Register a user");
    Request.send("POST",
                 user,
                 "/user/register",
                 this.success.bind(this),
                 this.failure.bind(this)
                 );
  }

  User.prototype.login = function (user, e) {
    e.preventDefault();
    console.log("User obj: " + user);
    console.log("Login with a user");
    Request.send("PUT",
                 user,
                 "/user/login",
                 this.success.bind(this),
                 this.faulure.bind(this)
                 );
  }

  return User;

});
