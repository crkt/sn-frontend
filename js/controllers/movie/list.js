define(['views/movie/list'], function(ListView) {

  function ListController() {    
    this.view = new ListView(document.querySelector("#main-content"));
    
  }

  ListController.prototype.addMovies = function (movies) {
    for (var x in movies) {
      this.view.addMovie(x);
    }
  }

  return ListController;
});
