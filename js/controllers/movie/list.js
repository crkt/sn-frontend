define(['views/movie/list'], function(ListView) {

  function ListController() {    
    this.view = document.querySelector("#main-content");

    this.list = new ListView();

    this.view.appendChild(this.list.element);
  }

  ListController.prototype.addMovies = function (movies) {
    console.log("adding movies");
    for (var i = 0; i < movies.length; i++) {
      var movie = movies[i];
      this.list.addMovie(movie);     
    }
  }

  return ListController;
});
