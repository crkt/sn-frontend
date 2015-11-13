define(['models/movie'], function(Movie) {

  function List(element) {
    this.content = document.createElement("div");
    this.content.id = "movie-results";
    
    element.appendChild(this.content);
  }

  List.prototype.addMovie = function (movie) {
    var el = document.createElement("div");
    el.innerHTML = movie;
    this.content.appendChild(el);
  }

  return List;

});
