define(['views/user/login', 
        'app/request', 
        'models/user'], function(UserView, Request, UserModel) 
{
  
  function User(onLogin) {

    this.view = document.querySelector("#user");
  
    this.login = new UserView.Login(this.submit.bind(this, "login"),
                                   this.toggleRegisterLogin.bind(this));
    this.login.toggleVisible(true);

    this.register= new UserView.Register(this.submit.bind(this, "register"),
                                        this.toggleRegisterLogin.bind(this));
    this.register.toggleVisible(false);

    this.profile = new UserView.Profile();
    this.profile.toggleVisible(false);

    this.view.appendChild(this.login.element);
    this.view.appendChild(this.register.element);
    this.view.appendChild(this.profile.element);

    this.onLogin = onLogin
  }

  User.prototype.toggleRegisterLogin = function () {
    var active = this.view.querySelector(".active");
    if (active === this.login.element) {
      this.login.toggleActive(false);
      this.register.toggleActive(true);
    } else if (active == this.register.element) {
      this.register.toggleActive(false);
      this.login.toggleActive(true);
    }                  
  }

  User.prototype.userLoggedIn = function (user) {  
    this.register.toggleVisible(false);
    this.login.toggleVisible(false);
    this.profile.setUser(user);
    this.profile.toggleVisible(true);
  }

  User.prototype.onError = function (type, xhr, response) {    
    console.log(type + " " + xhr + " " + response);
    if (type === "register") {
      this.register.onError(response);
    } else if (type === "login") {
      this.login.onError(response);
    }
  }

  User.prototype.success = function (xhr, response) {
    // There be dragons here.
    this.onLogin(new UserModel(response.email, response.id));
    this.register.reset();
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
      Request.register("POST",
                       user,
                       "/user/register",
                       this.success.bind(this),
                       this.onError.bind(this, "register"),
                       this.failure.bind(this)
                      );
    } else if (type === "login") {
      Request.login("PUT",
                    user,
                    "/user/login",
                    this.success.bind(this),
                    this.onError.bind(this, "login"),
                    this.failure.bind(this)
                   );      
    }
  }

  return User;

});
