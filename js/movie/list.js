define(['api','widget'], function (API, Widget) 
{

  var exports = {};

  /*
    Movie Item View
   */
  function MovieItemView() {
    var template = document.querySelector("#movie-item");
    this.dom = document.importNode(template.content, true);
    this.movie = this.dom.querySelector(".movie");
    //this.title = this.dom.querySelector(".title");
    this.image = this.dom.querySelector(".image");
    this.avgRating = this.dom.querySelector(".average-rating");
      //new Widget.Rating(this.dom.querySelector(".average-rating"));
    this.votes = this.dom.querySelector(".votes");
    //this.userRating = new Widget.Rating(this.dom.querySelector(".user-rating"));

    var self = this;
    /*this.userRating.onRatingCallback = function (value) {
      if (self.rateMovie) {
        self.rateMovie(value);
      }
    }*/

    this.movie.addEventListener("click", function (e) {
      if (self.clickMovie) {
        self.clickMovie(e);
      }
    },false);

  }

  MovieItemView.prototype.setId = function (id) {
    this.movie.id = "movie-" + id;
  }

  MovieItemView.prototype.setTitle = function (title) {
    //this.title.textContent = title;
  }

  MovieItemView.prototype.setImage = function (url) {
    this.image.src = url;
  }

  MovieItemView.prototype.setAverageRating = function (rating) {
    //this.avgRating.view.setRating(rating);
    this.avgRating.textContent = rating;
  }

  MovieItemView.prototype.setVotes = function (votes) {
    this.votes.textContent = votes;
  }

  MovieItemView.prototype.setUserRating = function (rating) {
    //this.userRating.view.setRating(rating);
  }

  /*
    Movie Item Presenter
   */
  function MovieItem (view) {
    this.view = view || new MovieItemView();
    
    // View events
    this.view.rateMovie = MovieItem.prototype.rateMovie.bind(this);
    this.view.clickMovie = MovieItem.prototype.clickMovie.bind(this);
  }

  MovieItem.prototype.setMovie = function (movie) {
    this.view.setId(movie.id);
    this.view.setTitle(movie.title);
    this.view.setImage(movie.picture);
    this.view.setUserRating(movie.rating.user_rating);
    this.view.setAverageRating(movie.rating.rating);
    this.view.setVotes(movie.rating.nr_votes);
    this.movie = movie;
  }

  MovieItem.prototype.updateRating = function (rating) {
    this.view.setAverageRating(rating.rating);
    this.view.setVotes(rating.nr_votes);
  }

  MovieItem.prototype.rateMovie = function (rating) {
    if (this.onRateMovie) {
      this.onRateMovie(this.movie.id, rating);
    }
  }

  MovieItem.prototype.clickMovie = function (e) {
    if (this.selectMovie) {
      this.selectMovie(this.movie);
    }
  }  


  /*
   * Movie listing view
   */
  function MovieListingView() {
    var template = document.querySelector("#movie-listing");
    this.dom = document.importNode(template.content, true);
    this.list = this.dom.querySelector(".listing");
  }
  
  MovieListingView.prototype.addMovieItem = function(item) {
    this.list.appendChild(item.view.dom);
  }

  MovieListingView.prototype.clear = function () {   
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    } 
  }

  /*
   * Movie listing presenter
   */
  function MovieListing(view) {
    this.view = view || new MovieListingView();
    // Items array is so we can update a movie after the users gives it a new rating.
    this.items = [];
  }
  
  /**
     Adds a movie item to the list view
   **/
  MovieListing.prototype.addMovie = function(movie) {
    var item = new MovieItem();
    this.items.push(item);

    item.selectMovie = MovieListing.prototype.onMovieSelect.bind(this);
    item.onRateMovie = MovieListing.prototype.onRateMovie.bind(this);

    item.setMovie(movie);
    this.view.addMovieItem(item);
  }

  MovieListing.prototype.clear = function() {
    this.items = [];
    this.view.clear();
  }

  MovieListing.prototype.updateMovie = function (rating) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].movie.id === rating.movie_id) {
        this.items[i].updateRating(rating);
      }
    }
  }

  /** External callbacks **/
  MovieListing.prototype.onRateMovie = function (id, rating) {
    if (this.onMovieRated) {
      this.onMovieRated(id,rating);
    }
  }

  MovieListing.prototype.onMovieSelect = function (movie) {
    if (this.onMovieSelected) {
      this.onMovieSelected(movie);
    }
  }

  return MovieListing
});
