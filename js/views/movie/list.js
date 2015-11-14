define(['models/movie'], function(Movie) {

  function List(element) {
    this.content = document.createElement("div");
    this.content.id = "movie-results";
    
    element.appendChild(this.content);
  }

  List.prototype.addMovie = function (movie) {
    var content = document.createElement("div");
    content.classList.add("movie-item");
    
    for (var prop in movie) {
      var text = document.createElement("label");
      text.classList.add("info");
      text.textContent = prop + ": " + movie[prop];
      content.appendChild(text);
    }


    this.content.appendChild(content);
  }

  return List;

});
