define(['widget'], function (Widgets) {

  /*
    Movie detail view
   */
  function DetailView() {
    var template = document.querySelector("#detail");
    this.dom = document.importNode(template.content, true);
    this.pane = this.dom.querySelector(".pane");
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
    this.random = this.dom.querySelector(".random");

    // This needs a fix...
    this.rating.onRatingCallback = this.onRating;

    this.randomCallback = null;

    this.pane.classList.add("hidden");
    
    var self = this;
    this.pane.addEventListener("blur", function(e) {
      self.pane.classList.add("hidden");
    });

    this.pane.addEventListener("focus", function(e) {
      self.pane.classList.remove("hidden");
    });
    //
    this.random.addEventListener("click", function(e) {
      e.preventDefault();
      if (self.randomCallback) {
        self.randomCallback();
      }
    },false); 
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

  DetailView.prototype.hide = function () {
    this.pane.classList.add("hidden");
  }

  DetailView.prototype.show = function () {
    this.pane.classList.remove("hidden");
  }


  /*
    Movie detail presenter
  */
  function Detail () {
    this.view = new DetailView();
    this.view.onRating = Detail.prototype.onRating.bind(this);
    this.view.randomCallback = Detail.prototype.onRandom.bind(this);  

    this.onRatingCallback = null;
    this.onRandomCallback = null;
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
    this.view.pane.classList.remove("hidden");
    this.view.pane.focus();

  }

  Detail.prototype.updateRating = function (rating) {
    this.view.setRating(rating.rating);
  }

  /** External callbacks **/
  Detail.prototype.onRandom = function () {
    if (this.onRandomCallback) {
      this.onRandomCallback();
    }
  }

  Detail.prototype.onRating = function (value) {
    if (this.onRatingCallback) {
      this.onRatingCallback(this.movie.id, value);
    }
  }

  return Detail;

});
