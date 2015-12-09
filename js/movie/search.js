define(['api'], function(API) {

  var exports = {};

  var capitalizeString = function (s) {
    return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
  }

  function GenreInputView () {
    var template = document.querySelector("#genre-input");
    this.dom = document.importNode(template.content, true);
    this.label = this.dom.querySelector(".label");
    this.input = this.dom.querySelector(".input");

    var self = this;
    this.input.addEventListener("change", function (e) {
      if (self.onGenreChanged) {
        self.onGenreChanged(parseInt(e.target.value));
      }
    }, false);
  }

  GenreInputView.prototype.setLabel = function (label) {
    this.label.textContent = capitalizeString(label);
  }

  GenreInputView.prototype.setGenre = function (value) {
    this.input.value = value;
  }

  function GenreInput (view) {
    this.view = view || new GenreInputView();
    this.genreChangedCallback = null;

    this.view.onGenreChanged = GenreInput.prototype.onGenreChanged.bind(this);
  }

  GenreInput.prototype.setGenre = function (genre) {
    this.genre = genre;
    this.view.setLabel(genre.genre);
    this.view.setGenre(genre.id);
  }

  GenreInput.prototype.onGenreChanged = function (id) {
    if (this.genreChangedCallback) {
      this.genreChangedCallback(id);
    }
  }

  /*
    Search view
   */
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
      callback();
    },false);
  }

  SearchView.prototype.onRandom = function (callback) {
    var self = this;
    this.random.addEventListener("click", function (e) {
      e.preventDefault();
      callback();
    },false); 
  }

  /*
    Search model values
   */
  function SearchModel () {
    this.title = undefined;
    this.genres = undefined;
    this.runtime = undefined;
    this.year = undefined;
  }

  SearchModel.prototype.setTitle = function (title) {
    this.title = title === "" ? undefined : title;
  }

  SearchModel.prototype.setGenre = function (id) {
    if (this.genres) {
      if (this.genres.indexOf(id) === -1) {
        this.genres.push(id);
      } else if (this.genres.indexOf(id) > -1) {
        this.genres.splice(this.genres.indexOf(id), 1);
      }
      if (this.genres.length === 0) {
        this.genres = undefined;
      }
    } else {
      this.genres = [];
      this.genres.push(id);
    }
  }

  /*
    Search presenter
   */
  function Search (view) {
    this.view = view || new SearchView();
    this.searchResultCallback = null;
    this.randomResultCallback = null;

    this.model = new SearchModel();

    var self = this;
    this.view.onSearch(function () {
      console.log("Searching" + self.model);
      if (self.searchResultCallback) {
        API.search(self.model,function (r) {
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

  Search.prototype.setGenre = function (id) {
    this.model.setGenre(id);
  }

  Search.prototype.setTitle = function (title) {
    this.model.setTitle(title);
  }

  Search.prototype.addGenre = function (genre) {
    var item = new GenreInput();
    

    item.genreChangedCallback = Search.prototype.setGenre.bind(this);

    item.setGenre(genre);
    this.view.addGenreInput(item);
  }

  return Search;

});
