define(['views/movie/list'], function(ListView) {

  function ListController() {    
    this.view = new ListView(document.querySelector("#main-content"));
    
  }

  ListController.prototype.addMovies = function (movies) {
    console.log("adding movies");
    for (var i = 0; i < movies.length; i++) {
      var movie = movies[i];
      this.view.addMovie(movie);     
    }
  }

  return ListController;
});
