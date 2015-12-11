define([], function() {
  
  function HeaderView () {
    var template = document.querySelector("#header-temp");
    this.dom = document.importNode(template.content, true);
  }

  function Header(view) {
    this.view = view || new HeaderView();
  }

  return Header;

});
