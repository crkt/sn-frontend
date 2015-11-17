define(['widgets/base',
        'views/movie/movie-item',
        'models/movie'], function(Base, MovieItem, Movie) 
{

  function ListItem(movie) {
    Base.Base.call(this, "li");
    
    var field = new MovieItem(movie, this.onClick.bind(this));
    this.addChild(field.element);
  }

  ListItem.prototype = Object.create(Base.Base.prototype);
  ListItem.prototype.constructor = ListItem;

  ListItem.prototype.onClick = function (e) {
    console.log("Clicked list item");
  }

  function List() {
    Base.Base.call(this, "ul");
    this.setAttribute("id", "movie-results");
  }

  List.prototype = Object.create(Base.Base.prototype);
  List.prototype.constructor = List;

  List.prototype.addMovies = function (movies) {
    for (var movie in movies) {
      var item = new ListItem(movie);
      this.addChild(item.element);
    }
  }

  List.prototype.addMovie = function (movie) {
    var item = new ListItem(movie);
    this.addChild(item.element);
  }

  List.prototype.clear = function () {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  }

  return List;

});
