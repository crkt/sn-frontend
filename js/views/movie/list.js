define(['widgets/base',
        'views/movie/movie-item',
        'models/movie'], function(Base, MovieItem, Movie) 
{

  function ListItem(movie, click, callback) {
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
  }

  List.prototype = Object.create(Base.Base.prototype);
  List.prototype.constructor = List;

  List.prototype.addMovies = function (movies) {
    for (var movie in movies) {
      var item = new ListItem(movie, this.onMovieClick.bind(this), this.onMovieRating.bind(this));
      this.addChild(item.element);
    }
  }

  List.prototype.addMovie = function (movie) {
    var item = new ListItem(movie, this.callback);
    this.addChild(item.element);
  }

  List.prototype.clear = function () {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  }

  List.prototype.onMovieClick = function (movie) {
    this.clickCallback(movie);
  }

  List.prototype.onMovieRating = function (id, value) {
    this.ratingCallback(id, value);
  }

  return List;

});
