define(['api'], function(API) {

  var exports = {};

  function GenreInputView () {
    var template = document.querySelector("#genre-input");
    this.dom = document.importNode(template.content, true);
    this.label = this.dom.querySelector(".label");
    this.input = this.dom.querySelector(".input");
  }

  GenreInputView.prototype.setGenre = function (label, value, id) {
    this.label.textContent = label;
    this.input.value = value;
  }

  // Do I need this...? Maybe not
  GenreInputView.prototype.onCheck = function (callback) {
    var self = this;
    this.input.addEventListener("change", function (e) {
      callback(self.input.value, self.input.dataset.id);
    });
  }

  function SearchView() {
    var template = document.querySelector("#search");
    this.dom = document.importNode(template.content, true);
    this.form = this.dom.querySelector(".search-form");
    this.title = this.dom.querySelector(".title");
    this.genres = this.dom.querySelector(".genres");
    this.random = this.dom.querySelector(".random");
  }

  SearchView.prototype.onSearch = function (callback) {
    var self = this;
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      callback(self.title.value);
    },false);
  }
  SearchView.prototype.onRandom = function (callback) {
    var self = this;
    this.random.addEventListener("click", function (e) {
      e.preventDefault();
      callback();
    },false); 
  }


  function Search (view) {
    this.view = view || new SearchView();
    this.searchResultCallback = null;
    this.randomResultCallback = null;

    var self = this;
    this.view.onSearch(function (title, genres) {
      if (self.searchResultCallback) {
        var attrs = {};
        attrs.title = title == "" ? undefined : title;
        attrs.genres = undefined;
        attrs.runtime = undefined;
        attrs.year = undefined;
        API.search(attrs,function (r) {
          self.searchResultCallback(r);
        });
      }
    });

    this.view.onRandom(function() {
      if (self.randomResultCallback) {
        API.random(function (movie) {
          self.randomResultCallback(movie);
        });
      }
    });
  }

  Search.prototype.addGenre = function (genre) {
    var item = new GenreInputView();
    
    item.setGenre(genre.genre, genre.genre, genre.id);
    this.view.genres.appendChild(item.dom);
  }

  return Search;

});
