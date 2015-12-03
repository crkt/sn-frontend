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
    this.rating.textContent = rating;
  }

  /*
    Movie detail presenter
  */
  function Detail () {
    this.view = new DetailView();
  }

  Detail.prototype.setMovie = function (movie) {
    this.view.setTitle(movie.title);
    this.view.setPlot(movie.plot);
    this.view.setImage(movie.image);
    this.view.setRating(movie.rating);
  }

  return Detail;

});
