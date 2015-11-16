define([], function() {

  var User = function (email, id, password) {
    this.email = email || undefined;
    this.id = id || undefined;
    this.password = password || undefined;
  }

  User.prototype.setEmail = function (x) {
    this.email = x;
  }

  User.prototype.getEmail = function () {
    return this.email;
  }

  User.prototype.setId = function (x) {
    this.id = x;
  }
  
  User.prototype.getId = function () {
    return this.id;
  }
  
  User.prototype.setPassword = function (x) {
    this.password = x;
  }

  User.prototype.getPassword = function () {
    return this.password;
  }

  User.prototype.validate = function() {
    return (this.name != "" && this.password != "");
  }

  return User;
});
