define(['api','widget'], function (API, Widget) 
{

  var exports = {};

  function SortView() {
    var template = document.querySelector("#movie-sort");
    this.dom = document.importNode(template.content, true);
    this.rating = this.dom.querySelector(".rating");
    this.title = this.dom.querySelector(".title");
  }

  function MovieItemView() {
    var template = document.querySelector("#movie-item");
    this.dom = document.importNode(template.content, true);
    this.movie = this.dom.querySelector(".movie");
    this.title = this.dom.querySelector(".title");
    this.image = this.dom.querySelector(".image");
    this.avgRating = new Widget.Rating(this.dom.querySelector(".average-rating"));
    this.votes = this.dom.querySelector(".votes");
    this.userRating = new Widget.Rating(this.dom.querySelector(".user-rating"));
    this.rating = this.dom.querySelector(".rating");

    var self = this;
    this.dom.children[0].addEventListener("click", function (e) {
      if (self.clickMovie) {
        self.clickMovie(e);
      }
    },false);
  }

  MovieItemView.prototype.setId = function (id) {
    this.movie.id = "movie-" + id;
  }

  MovieItemView.prototype.setTitle = function (title) {
    this.title.textContent = title;
  }

  MovieItemView.prototype.setImage = function (url) {
    this.image.src = url;
  }

  MovieItemView.prototype.setAverageRating = function (rating) {
    this.avgRating.view.setRating(rating);
  }

  MovieItemView.prototype.setVotes = function (votes) {
    this.votes.textContent = votes;
  }

  MovieItemView.prototype.setUserRating = function (rating) {
    this.userRating.view.setRating(rating);
  }

  MovieItemView.prototype.setRating = function (rating) {
    // Zero indexed gotchas, 1 on 1...
    for (var i = 0; i < this.rating.children.length; ++i) {
      this.rating.children[i].classList.toggle('on', i + 1 <= rating);

      var self = this;
      this.rating.children[i].addEventListener("change", function (e) {
        if (self.rateMovie) {
          self.rateMovie(e.target.value);
        }
      }, false);
    }
  }


  function MovieItem (view) {
    this.view = view || new MovieItemView();
    
    // View events
    this.view.rateMovie = MovieItem.prototype.rateMovie.bind(this.view);
    this.view.clickMovie = MovieItem.prototype.clickMovie.bind(this);
  }

  MovieItem.prototype.setMovie = function (movie) {
    this.view.setId(movie.id);
    this.view.setTitle(movie.title);
    this.view.setImage(movie.picture);
    this.view.setRating(movie.rating.average);
    this.view.setAverageRating(movie.rating.rating);
    this.view.setVotes(movie.rating.nr_votes);
    // Have a look at this later...
    this.movie = movie;
  }

  MovieItem.prototype.rateMovie = function (rating) {
    // API calls go here, etc etc.
    // Make sure the user is logged in, etc.
    console.log("Movie to rate: " + this.title.textContent + " rating: " + rating);
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
    this.sort = this.dom.querySelector(".sorting");
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
  }
  
  MovieListing.prototype.addMovie = function(movie) {
    var item = new MovieItem();

    // Click on a movie event
    item.selectMovie = MovieListing.prototype.onMovieSelect.bind(this);
    // Rate a movie event
    item.onRateMovie = MovieListing.prototype.onRateMovie.bind(this);

    item.setMovie(movie);
    this.view.addMovieItem(item);
  }

  MovieListing.prototype.clear = function() {
    this.view.clear();
  }

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
  

  exports.Item = MovieItem;
  exports.List = MovieListing;
  return exports;
});
