define([], function() {

  var User = function () {
    this.name = undefined;
    this.id = undefined;
    this.password = undefined;
  }

  User.prototype.validate = function() {
    return (this.name != "" && this.password != "");
  }

  return User;
});
