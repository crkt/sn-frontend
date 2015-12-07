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
    
    var field = new MovieItem(movie, 
                              this.onClick.bind(this),
                              this.onRating.bind(this));
    this.addChild(field.element);

    this.callback = callback;
    this.click = click;
  }
  
  return MoviePreview;
});

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
