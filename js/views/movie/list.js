define(['widgets/base',
        'views/movie/movie-item',
        'models/movie'], function(Base, MovieItem, Movie) 
{

  var opts = [
    {label: "Rating", options: [
      {name: "rating", value: "descending",label: "High to low", type: "rating"},
      {name: "rating", value: "ascending",label: "Low to high", type: "rating"}
    ]},
     {label: "Title", options: [
       {name: "title", value: "descending", label: "A-Z", type: "title"},
       {name: "title", value: "ascending", label: "Z-A", type: "title"}
     ]}
  ];
  
  function SortSelect(label, options) {
    Base.Base.call(this, "select");
    this.element.textContent = label;

    var def = document.createElement("option");
    def.value = "";
    def.disabled = true;
    def.textContent = "Select";
    def.selected = true;
    
    this.addChild(def);

    options.forEach(function (x) {
      var opt = document.createElement("option");
      opt.name = x.name;
      opt.value = x.value;
      opt.textContent = x.label;
      opt.dataset.type = x.type;
      this.addChild(opt);
    }, this);
    
    
    var self = this;
    this.element.addEventListener("change", function (e) {
      if (self.onSortChange) {
        var opt = e.target.selectedOptions[0];
        self.onSortChange(opt.value, opt.dataset.type);
      }
    }, false);
  }

  SortSelect.prototype = Object.create(Base.Base.prototype);
  SortSelect.prototype.constructor = SortSelect;
  

  function Sort() {
    Base.Base.call(this, "div");
    this.addClass("sort");
    
    // Rating High to Low
    // Title A-Z
    // Votes HIgh to Low
    // Runtime High to Low

    opts.forEach(function (x) {
      var select = new SortSelect(x.label, x.options);
      select.onSortChange = Sort.prototype.onSortSelect.bind(this);
      this.addChild(select.element);
    }, this);
    
  }

  Sort.prototype = Object.create(Base.Base.prototype);
  Sort.prototype.constructor = Sort;

  Sort.prototype.onSortSelect = function (value, type) {
    if (this.onChange) {
      this.onChange(value, type);
    }
    console.log("Selected new sort : " + value + " " + type);
  }

  function ListItem(movie, callback) {
    Base.Base.call(this, "li");
    
    var field = new MovieItem(movie, 
                              this.onClick.bind(this),
                              this.onRating.bind(this));
    this.addChild(field.element);

    this.callback = callback;
    this.click = click;
  }

  ListItem.prototype = Object.create(Base.Base.prototype);
  ListItem.prototype.constructor = ListItem;

  ListItem.prototype.onClick = function (movie) {
    this.click(movie);
  }

  ListItem.prototype.onRating = function (id, value) {
    console.log("Rated a movie: " + id + " " + value);
    this.callback(id, value);
  }

  function List(click, ratingCallback) {
    Base.Base.call(this, "ul");
    this.setAttribute("id", "movie-results");

    this.ratingCallback = ratingCallback;
    this.clickCallback = click;

    this.sort = new Sort();
    this.sort.onChange = List.prototype.onSortChange.bind(this);
    this.addChild(this.sort.element);
   
    this.movies = [];
  }

  List.prototype = Object.create(Base.Base.prototype);
  List.prototype.constructor = List;

  List.prototype.addMovies = function (movies) {
    this.movies = movies;
    for (var i = 0; i < movies.length; i++) {
      this.addMovie(movies[i]);
    }    
  }

  List.prototype.addMovie = function (movie) {
    var item = new ListItem(movie, this.callback);
    this.addChild(item.element);
  }

  List.prototype.onSortChange = function (value, type) {
    function ascending(a,b) {
      if (a.title < b.title)
        return 1;
      if (a.title > b.title)
        return -1;
      return 0;
    }

    function descending(a,b) {
      if (a.title < b.title)
        return -1;
      if (a.title > b.title)
        return 1;
      return 0;
    }

    if (type === "title") {
      if (value === "ascending")
        this.movies.sort(ascending);
      if (value === "descending") 
        this.movies.sort(descending);
    }

    this.clear();
    this.addMovies(this.movies);
  }

  List.prototype.clear = function () {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.addChild(this.sort.element);
  }

  List.prototype.onMovieClick = function (movie) {
    this.clickCallback(movie);
  }

  List.prototype.onMovieRating = function (id, value) {
    this.ratingCallback(id, value);
  }

  return List;

});
