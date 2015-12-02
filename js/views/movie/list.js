define(['views/movie-item'], function (MovieItem)
{

  /*
    <template id="movie-preview">
    <div class="movie-preview">
    <img class="main-image"></img>
    <h1 class="title"></h1>
    <p class="plot">
    </p>
    <div class="thumb-images">
    </div>
    <a class="imdb-link">IMDB</a>
    </div>
    </template>
   */
  // Default Movie list view
  // This is where one uses handlebars, jQuery or whatever
  function MovieListView() {
    this.dom = document.importNode(document.querySelector("#movie-results").content, true);
    this.list = this.dom.querySelector(".list");
  }
  
  MovieListView.prototype.setList(movies) {
    
  }
  
  // Movie preview presenter
  // Implements all logic
  function MoviePreview(view) {
    this.view = view || new MoviePreviewView();
    this.view.onPreviewClick = MoviePreviewView.prototype.setMainImage.bind(this.view);
  }

  MoviePreview.prototype.fetch = function(id) {
    MovieAPI.fetchMovie(id)
      .onSuccess(MoviePreview.prototype.showMovie.bind(this))
      .onError(function(reason) {
	//Do something smart here...
      });
  }
  
  MoviePreview.prototype.showMovie = function(movie) {
    var view = this.view;
    
    view.setTitle(movie.title);
    view.setPlot(movie.plot);
    view.setIMDBLink(movie.imdbLink);
    view.setMainImage(movie.mainImage);
    
    view.clearImages();
    movie.images.forEach(function (url) {
      view.addImage(url);
    });
  }
  
  return MoviePreview;
});

});
