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
    this.year = this.dom.querySelector(".year");
    this.character = this.dom.querySelector(".character");
    this.runtime = this.dom.querySelector(".runtime");
    this.matureRating = this.dom.querySelector(".matureRating");
    this.director = this.dom.querySelector(".director");
    this.writer = this.dom.querySelector(".writer");
    this.stars = this.dom.querySelector(".stars");

    this.rating.onRatingCallback = this.onRating;
  }

  DetailView.prototype.setTitle = function (title) {
    this.title.textContent = title;
  }

  DetailView.prototype.setDirector = function (director) {
    this.director.textContent = director;
  }

  DetailView.prototype.setStars = function (stars) {
    this.stars.textContent = stars;
  }

  DetailView.prototype.setMatureRating = function (matureRating) {
    this.matureRating.textContent = matureRating;
  }

  DetailView.prototype.setYear = function (year) {
    this.year.textContent = year;
  }

  DetailView.prototype.setWriter = function (writer) {
    this.writer.textContent = writer;
  }

  DetailView.prototype.setRuntime = function (runtime) {
    this.runtime.textContent = runtime + " " + "min";
  }

  DetailView.prototype.setCharacter = function (character) {
    this.character.textContent = character;

  }

  DetailView.prototype.setPlot = function (plot) {
    this.plot.textContent = plot;
  }

  DetailView.prototype.setImage = function (url) {
    this.image.src = url;
  }

  DetailView.prototype.setRating = function (rating) {
    this.rating.view.setRating(rating);

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
    this.view.setPlot(movie.plot);
    this.view.setImage(movie.picture);
    this.view.setRating(movie.rating.rating);
    this.view.setVotes(movie.rating.nr_votes);
    this.view.setYear(movie.year);
    this.view.setCharacter(movie.characters);
    this.view.setRuntime(movie.runtime);
    this.view.setMatureRating(movie.matureRating);
    this.view.setDirector(movie.directors);
    this.view.setWriter(movie.writers);
    this.view.setStars(movie.stars);
  }

  Detail.prototype.updateRating = function (rating) {
    this.view.setRating(rating.rating);
  }

  /** External callbacks **/

  Detail.prototype.onRating = function (value) {
    if (this.onRatingCallback) {
      this.onRatingCallback(this.movie.id, value);
    }
  }

  return Detail;

});
