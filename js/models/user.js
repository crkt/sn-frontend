define([], function() {

  function User(email, id, password, name) {
    this.email = email || undefined;
    this.id = id || undefined;
    this.password = password || undefined;
    this.name = name || undefined;
  }

User.prototype.setName = function (x) {
    if (x === "") {
      this.name = undefined;
    } else {
      this.name = x;
    }
   } 

  User.prototype.getName = function () {
    return this.name;
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
