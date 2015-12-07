define([], function () {

  /*
    Movie detail view
   */
  function DetailView() {
    var template = document.querySelector("#detail");
    this.dom = document.importNode(template.content, true);
    this.title = this.dom.querySelector(".title");
    this.plot = this.dom.querySelector(".plot");
    this.image = this.dom.querySelector(".image");
    this.rating = this.dom.querySelector(".rating");            
  }

  DetailView.prototype.setTitle = function (title) {
    this.title.textContent = title;
  }

  DetailView.prototype.setPlot = function (plot) {
    this.plot.textContent = plot;
  }

  DetailView.prototype.setImage = function (url) {
    this.image.src = url;
  }

  DetailView.prototype.setRating = function (rating) {
    for (var i = 0; i < this.rating.children.length; i++) {
      this.rating.children[i].classList.toggle('on', i + 1 <= rating);
      var self = this;

      this.rating.children[i].addEventListener("change", function (e) {
        if (self.rateMovie) {
          self.rateMovie(e.target.value);
        }
      }, false);
    }
  }

  /*
    Movie detail presenter
  */
  function Detail () {
    this.view = new DetailView();
  }

  Detail.prototype.setMovie = function (movie) {
    this.view.setTitle(movie.title);
    this.view.setPlot(movie.description);
    this.view.setImage(movie.picture);
    this.view.setRating(movie.rating.user_rating);
  }

  return Detail;

});
