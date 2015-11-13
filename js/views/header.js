define([], function() {


  function Header() {
    this.content = document.querySelector("#header");    

    this.logoPane = document.createElement("div");
    this.logoPane.classList.add("logo-pane");
    this.logoPane.innerHTML = "SortNight";
    
    this.search = document.createElement("div");
    this.search.id = "search";

    this.userPane = document.createElement("div");
    this.userPane.classList.add("user-pane");
    this.userPane.innerHTML = "User pane";

    this.content.appendChild(this.logoPane);
    this.content.appendChild(this.search);
    this.content.appendChild(this.userPane);
  }


  return Header;
});
