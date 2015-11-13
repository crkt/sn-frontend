define([], function() {

  var User = function () {
    this.name = "";
    this.id = "";
    this.password = "";
  }

  User.prototype.validate = function(user) {
    return (this.name != "" && this.password != "");
  }

  return User;
});
