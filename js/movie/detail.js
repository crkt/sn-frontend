define(['widget'], function (Widgets) {

  /*
    Movie detail view
   */
  function DetailView() {
    var template = document.querySelector("#detail");
    this.dom = document.importNode(template.content, true);
    this.title = this.dom.querySelector(".title");
    this.plot = this.dom.querySelector(".plot");
    this.image = this.dom.querySelector(".image");
    this.rating = new Widgets.Rating(this.dom.querySelector(".rating"));
    this.votes = this.dom.querySelector(".votes");
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
    this.rating.view.setRating(rating);
    this.rating.onRatingCallback = this.onRating;     
  }

  DetailView.prototype.setVotes = function (votes) {
    this.votes.textContent = votes;
  }

  /*
    Movie detail presenter
  */
  function Detail () {
    this.view = new DetailView();
    this.view.onRating = Detail.prototype.onRating.bind(this);

    this.onRatingCallback = null;
  }

  Detail.prototype.setMovie = function (movie) {
    this.movie = movie;
    this.view.setTitle(movie.title);
    this.view.setPlot(movie.description);
    this.view.setImage(movie.picture);
    this.view.setRating(movie.rating.rating);
    this.view.setVotes(movie.rating.nr_votes);
  }

  Detail.prototype.updateRating = function (rating) {
    this.view.setRating(rating.rating);
  }

  Detail.prototype.onRating = function (value) {
    if (this.onRatingCallback) {
      this.onRatingCallback(this.movie.id, value);
    }
  }

  return Detail;

});
