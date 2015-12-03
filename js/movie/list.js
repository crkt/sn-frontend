define(['api'], function (API) 
{

  var exports = {};

  function MovieItemView() {
    var template = document.querySelector("#movie-item");
    this.dom = document.importNode(template.content, true);
    this.title = this.dom.querySelector(".title");
    this.image = this.dom.querySelector(".image");
    this.rating = this.dom.querySelector(".rating");
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
    this.view.rateMovie = MovieItem.prototype.rateMovie.bind(this.view);
  }

  MovieItem.prototype.setMovie = function (movie) {
    this.view.setTitle(movie.title);
    this.view.setImage(movie.image);
    this.view.setRating(movie.rating);
  }

  MovieItem.prototype.rateMovie = function (rating) {
    // API calls go here, etc etc.
    // Make sure the user is logged in, etc.
    console.log("Movie to rate: " + this.title.textContent + " rating: " + rating);
  }

  function MovieListing(node) {
    this.node = node;
  }

  MovieListing.prototype.addMovie = function (movie) {
    var item = new MovieItem();
    item.setMovie(movie);
    this.node.appendChild(item.view.dom);
  }

  exports.Item = MovieItem;
  exports.List = MovieListing;
  return exports;
});
