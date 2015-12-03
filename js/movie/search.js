define(['api'], function(API) {

  var exports = {};

  function SearchView() {
    var template = document.querySelector("#search");
    this.dom = document.importNode(template.content, true);
    this.form = this.dom.querySelector("#sn-query");
    this.title = this.dom.querySelector("data[property=title]");
    this.genre = this.dom.querySelector(".genres");
  }

  SearchView.prototype.setTitle = function (title) {
    this.title.value = title;

    var self = this;
    this.title.addEventListener("change", function (e) {
      if (self.changeTitle) {
        self.changeTitle(e.target.value);
      }
    }, false);
  }

  SearchView.prototype.setGenres = function (genres) {
    for (var i = 0; i < genres.length; i++) {
      var template = document.querySelector("#genres");
      var dom = document.importNode(template.content, true);
      var label = dom.querySelector(".check-label");
      var checkbox = dom.querySelector(".check-input");
      
      label.for = genres[i].id;
      label.textContent = genres[i].genre;

      checkbox.value = genres[i].genre;
      checkbox.dataset.id = genres[i].id;

      var self = this;
      checkbox.addEventListener("change", function (e) {
        if (self.changeGenre)
          self.changeGenre(e.target.value, e.target.dataset.id);
      }, true);

      this.genre.appendChild(label);
      this.genre.appendChild(checkbox);
    }
  }

  function Search (node) {
    this.node = node;
    this.view = new SearchView();
    this.view.changeTitle = Search.prototype.changeTitle.bind(this);
    this.view.changeGenre = Search.prototype.changeGenre.bind(this);
    this.view.setGenres(API.genres);
    this.attributes = {};
    this.attributes.genres = [];

    this.node.appendChild(this.view.dom);
  }

  Search.prototype.changeTitle = function (title) {
    this.attributes.title = title;
    console.log(this.attributes);
  }

  Search.prototype.changeGenre = function (genre, id) {
    var g = {genre: genre, id: id};
    var index = this.attributes.genres.indexOf(g);
    if (index === -1) {
      this.attributes.genres.push(g);
    } else if (index > -1) {
      this.attributes.genres.remove(index);
    }
    console.log(this.attributes.genres);
  }

  Search.prototype.search = function () {
    // Call to API with the attributes that it has.
  }

  return Search;

});
