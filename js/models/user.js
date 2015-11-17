define([], function() {

  var User = function (email, id, password) {
    this.email = email || undefined;
    this.id = id || undefined;
    this.password = password || undefined;
  }

  User.prototype.setEmail = function (x) {
    if (x === "") {
      this.email = undefined;
    } else {
      this.email = x;
    }
  }

  User.prototype.getEmail = function () {
    return this.email;
  }

  User.prototype.setId = function (x) {
    if (x === "") {
      this.id = undefined;
    } else {
      this.id = x;
    }
  }
  
  User.prototype.getId = function () {
    return this.id;
  }
  
  User.prototype.setPassword = function (x) {
    if (x === "") {
      this.password = undefined;
    } else {
      this.password = x;
    }
  }

  User.prototype.getPassword = function () {
    return this.password;
  }

  User.prototype.isValid = function() {
    return !(this.email == "" || this.email == undefined && 
            this.password == "" || this.password == undefined);
  }

  return User;
});
