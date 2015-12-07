define([], function() {
  
  var exports = {};

  function RatingView(node) {
    var template = document.querySelector("#rating");
    this.dom = document.importNode(template.content, true);
    this.rating = this.dom.querySelector(".rating");
    node.appendChild(this.rating);
  }

  RatingView.prototype.setRating = function (rating) {
    for (var i = 0; i < this.rating.children.length; i++) {
      this.rating.children[i].classList.toggle('on', i + 1 <= rating);
      var self = this;
      
      this.rating.children[i].addEventListener("change", function (e) {
        if (self.rateMovie) {
          self.rateMovie(parseInt(e.target.value));
        }
      }, false);
    }
  }

  /*
    Rating presenter, takes a node to present view in.
   */
  function Rating(node) {
    this.view = new RatingView(node);
    this.onRatingCallback = null;

    this.view.rateMovie = Rating.prototype.onRating.bind(this);
  }

  Rating.prototype.onRating = function (value) {
    if (this.onRatingCallback) {
      this.onRatingCallback(value);
    }
  }

  exports.Rating = Rating;

  return exports;
});
