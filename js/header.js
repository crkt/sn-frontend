define([], function() {
  
  function HeaderView () {
    var template = document.querySelector("#header-temp");
    this.dom = document.importNode(template.content, true);
    
    this.signIn = this.dom.querySelector(".sign-in");
    this.register = this.dom.querySelector(".register");
    this.registerMovie = this.dom.querySelector(".register-movie");
  }

  function Header(view) {
    this.view = view || new HeaderView();
  }

  Header.prototype.toggleVisibility = function (t) {

  };

  

  return Header;

});
