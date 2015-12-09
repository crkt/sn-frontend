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

  function GenreInput (view) {
    this.view = view || new GenreInputView();
  }

  GenreInput.prototype.setGenre = function (genre) {
    this.genre = genre;
    this.view.setGenre(genre.genre, genre.genre, genre.id);
  }

  function SearchView() {
    var template = document.querySelector("#search");
    this.dom = document.importNode(template.content, true);
    this.form = this.dom.querySelector(".search-form");
    this.title = this.dom.querySelector(".title");
    this.genres = this.dom.querySelector(".genres");
    this.random = this.dom.querySelector(".random");
  }

  SearchView.prototype.addGenreInput = function (item) {
    this.genres.appendChild(item.view.dom);
  }

  SearchView.prototype.getGenres = function () {
    var genres = [];
    for (var i = 0; i < this.genres.children.length; i++) {
      if (this.genres.children[i].selected) {
        genres.push(this.genres.children[i].value);
      }
    }
    return genres;
  }

  SearchView.prototype.onSearch = function (callback) {
    var self = this;
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      callback(self.title.value, self.getGenres());
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
        attrs.genres = genres || undefined;
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
    var item = new GenreInput();
    
    //item.selectGenre = Search.prototype.onGenreSelected.bind(this);

    item.setGenre(genre);
    this.view.addGenreInput(item);
  }

  return Search;

});
