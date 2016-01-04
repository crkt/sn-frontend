define([], function() {

  /**
     Header
     The headers controller and view.
     It can hide and show links in its header tag.
  **/


  /*
    HeaderView
   */
  function HeaderView () {
    var template = document.querySelector("#header-temp");
    this.dom = document.importNode(template.content, true);
    
    this.profile = this.dom.querySelector(".profile");
    this.signIn = this.dom.querySelector(".sign-in");
    this.signOut = this.dom.querySelector(".sign-out");
    this.register = this.dom.querySelector(".register");
    this.registerMovie = this.dom.querySelector(".register-movie");
  }

  HeaderView.prototype.hideLinks = function () {
    this.profile.classList.add("hidden");
    this.signOut.classList.add("hidden");
    this.signIn.classList.remove("hidden");
    this.register.classList.remove("hidden");
  }

  HeaderView.prototype.showLinks = function () {
    this.profile.classList.remove("hidden");
    this.signOut.classList.remove("hidden");
    this.signIn.classList.add("hidden");
    this.register.classList.add("hidden");
  }

  /*
    Header presenter
   */
  function Header(view) {
    this.view = view || new HeaderView();
    this.onSignOut = null;

    var self = this;
    this.view.signOut.addEventListener("click", function(e) {
      if (self.onSignOut) {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        self.onSignOut();
      }        
    }, false);
  }

  Header.prototype.userLoggedOut = function () {
    this.view.hideLinks();
  }

  Header.prototype.userLoggedIn = function () {
    this.view.showLinks();
  }

  Header.prototype.toggleVisibility = function (t) {

  };

  

  return Header;

});
