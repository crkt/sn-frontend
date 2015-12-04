define([], function() {
  
  function RegisterView() {
    var template = document.querySelector("#user-register");
    this.dom = document.importNode(template.content, true);
  }

});
