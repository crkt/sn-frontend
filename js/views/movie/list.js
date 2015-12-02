define(['widgets/base',
        'views/movie/movie-item',
        'models/movie'], function(Base, MovieItem, Movie) 
{

  function ListItem(movie, callback) {
    Base.Base.call(this, "li");
    
    var field = new MovieItem(movie, 
                              this.onClick.bind(this),
                              this.onRating.bind(this));
    this.addChild(field.element);

    this.callback = callback;
  }

  ListItem.prototype = Object.create(Base.Base.prototype);
  ListItem.prototype.constructor = ListItem;

  ListItem.prototype.onClick = function (e) {
    console.log("Clicked list item");
  }

  ListItem.prototype.onRating = function (id, value) {
    console.log("Rated a movie: " + id + " " + value);
    this.callback(id, value);
  }

  function List(callback) {
    Base.Base.call(this, "ul");
    this.setAttribute("id", "movie-results");

    this.callback = callback;
  }

  List.prototype = Object.create(Base.Base.prototype);
  List.prototype.constructor = List;

  List.prototype.addMovies = function (movies) {
    for (var movie in movies) {
      var item = new ListItem(movie, undefined, this.onMovieRating.bind(this));
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

  List.prototype.onMovieRating = function (id, value) {
    this.callback(id, value);
  }

  return List;

});
