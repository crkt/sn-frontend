define(['api','utils'], function(API, Utils) {

  /** 
      Search

      This file contains all of the search related things. 
      And the genre input buttons.
   **/

  var exports = {};

  /**
     Genre view
  **/
  function GenreInputView () {
    var template = document.querySelector("#genre-input");
    this.dom = document.importNode(template.content, true);
    this.input = this.dom.querySelector(".input");

    var self = this;
    this.input.addEventListener("click", function (e) {
      if (self.onGenreChanged) {
        e.target.classList.toggle("selected");
        self.onGenreChanged(parseInt(e.target.dataset.id));
      }
    }, false);
  }

  GenreInputView.prototype.setLabel = function (label) {
    this.input.value = Utils.capitalizeString(label);
  }

  GenreInputView.prototype.setGenre = function (value) {
    this.input.dataset.id = value;
  }

  function GenreInput (view) {
    this.view = view || new GenreInputView();
    this.genreChangedCallback = null;

    this.view.onGenreChanged = GenreInput.prototype.onGenreChanged.bind(this);
  }

  GenreInput.prototype.setGenre = function (genre) {
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
    this.yearMin = this.dom.querySelector(".year-min");
    this.yearMax = this.dom.querySelector(".year-max");
    this.runtimeMin = this.dom.querySelector(".runtime-min");
    this.runtimeMax = this.dom.querySelector(".runtime-max");    
    this.genres = this.dom.querySelector(".genres");
    this.random = this.dom.querySelector(".random");

    var self = this;
    this.title.addEventListener("change", function (e) {
      if (self.titleChange)
        self.titleChange(e.target.value);
    }, false);
    
    this.yearMin.addEventListener("change", function (e) {
      if (self.yearMinChange)
        self.yearMinChange(e.target.value);
    }, false);
    this.yearMax.addEventListener("change", function (e) {
      if (self.yearMaxChange)
        self.yearMaxChange(e.target.value);
    }, false);

    this.runtimeMin.addEventListener("change", function (e) {
      if (self.runtimeMinChange)
        self.runtimeMinChange(e.target.value);
    }, false);
    this.runtimeMax.addEventListener("change", function (e) {
      if (self.runtimeMaxChange)
        self.runtimeMaxChange(e.target.value);
    }, false);
  }

  SearchView.prototype.addGenreInput = function (item) {
    this.genres.appendChild(item.view.dom);
  }

  SearchView.prototype.onSearch = function (callback) {
    var self = this;
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      callback();
    }, false);
  }

  SearchView.prototype.onRandom = function (callback) {
    var self = this;
    this.random.addEventListener("click", function (e) {
      e.preventDefault();
      callback();
    },false); 
  }

  /*
    Search model
   */
  function SearchModel () {
    this.title = undefined;
    this.genres = undefined;
    this.runtime = {min:0, max:800};
    this.year = {min:1800, max:2016};
    this.user = undefined;
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

  SearchModel.prototype.setRuntimeMin = function (runtime) {
    this.runtime.min = runtime;
  }

  SearchModel.prototype.setRuntimeMax = function (runtime) {
    this.runtime.max = runtime;
  }

  SearchModel.prototype.setYearMin = function (year) {
    this.year.min = year
  }

  SearchModel.prototype.setYearMax = function (year) {
    this.year.max = year
  }

  SearchModel.prototype.setUser = function (user) {
    this.user = user;
  }

  /*
    Search presenter
   */
  function Search (view) {
    this.view = view || new SearchView();
    this.searchResultCallback = null;
    this.randomResultCallback = null;

    this.view.onSearch(Search.prototype.search.bind(this));
    this.view.onRandom(Search.prototype.random.bind(this));
    this.view.titleChange = Search.prototype.setTitle.bind(this);
    this.view.yearMinChange = Search.prototype.setYearMin.bind(this);
    this.view.yearMaxChange = Search.prototype.setYearMax.bind(this);
    this.view.runtimeMinChange = Search.prototype.setRuntimeMin.bind(this);
    this.view.runtimeMaxChange = Search.prototype.setRuntimeMax.bind(this);

    this.model = new SearchModel();

  }

  Search.prototype.setGenre = function (id) {
    this.model.setGenre(id);
  }

  Search.prototype.setTitle = function (title) {
    this.model.setTitle(title);
  }

  Search.prototype.setYearMin = function (year) {
    this.model.setYearMin(year);
  }

  Search.prototype.setYearMax = function (year) {
    this.model.setYearMax(year);
  }

  Search.prototype.setRuntimeMin = function (runtime) {
    this.model.setRuntimeMin(runtime);
  }

  Search.prototype.setRuntimeMax = function (runtime) {
    this.model.setRuntimeMax(runtime);
  } 

  Search.prototype.addGenre = function (genre) {
    var item = new GenreInput();    
    item.genreChangedCallback = Search.prototype.setGenre.bind(this);
    item.setGenre(genre);
    this.view.addGenreInput(item);
  }


  /**
     This will use the API search function and then callback to
     who ever has created the callback. Check main.js
     user is a user id
   **/
  Search.prototype.search = function () {
    var self = this;
    if (this.searchResultCallback) {
      // The user thing here, check into alternatives...
      var user = localStorage.getItem("user"); // ALternatvies?
      if (user) {
        self.model.setUser(user);
        API.searchWithUser(self.model, function (r) {
          self.searchResultCallback(r);
        });
      } else {
        self.model.setUser(undefined);
        API.search(self.model, function (r) {
          self.searchResultCallback(r);
        });
      }
    }
  }

  Search.prototype.random = function () {
    var self = this;
    if (this.randomResultCallback) {
      API.random(function (movie) {
        self.randomResultCallback(movie);
      });
    }
  }

  return Search;

});
