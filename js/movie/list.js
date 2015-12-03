define(['api'], function (API) 
{

  var exports = {};

  function MovieItemView() {
    var template = document.querySelector("#movie-item");
    this.dom = document.importNode(template.content, true);
    this.title = this.dom.querySelector(".title");
    this.image = this.dom.querySelector(".image");
    this.rating = this.dom.querySelector(".rating");

    var self = this;
    this.dom.children[0].addEventListener("click", function (e) {
      if (self.clickMovie) {
        self.clickMovie(self.movie);
      }
    },false);
  }

  MovieItemView.prototype.setMovie = function (movie) {
    this.movie = movie;
  }

  MovieItemView.prototype.setTitle = function (title) {
    this.title.textContent = title;
  }

  MovieItemView.prototype.setImage = function (url) {
    this.image.src = url;
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
    this.view.setMovie(movie);
    this.view.setTitle(movie.title);
    this.view.setImage(movie.image);
    this.view.setRating(movie.rating);
  }

  MovieItem.prototype.rateMovie = function (rating) {
    // API calls go here, etc etc.
    // Make sure the user is logged in, etc.
    console.log("Movie to rate: " + this.title.textContent + " rating: " + rating);
  }

  MovieItem.prototype.clickMovie = function (movie) {
    if (this.selectMovie) {
      this.selectMovie(movie);
    }
  }


  /*
   * Movie listing view
   */
  function MovieListingView() {
    var template = document.querySelector("#movie-listing");
    this.dom = document.importNode(template.content, true);
    this.list = this.dom.querySelector('.listing');
  }
  
  MovieListingView.prototype.addMovieItem = function(item) {
    this.list.appendChild(item.view.dom);
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
    item.setMovie(movie);
    this.view.addMovieItem(item);
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
