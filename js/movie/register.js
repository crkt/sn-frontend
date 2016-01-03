define(['api'], function(API) {
  
  function RegisterView() {
    var template = document.querySelector("#movie-register");
    this.dom = document.importNode(template.content, true);
    this.form = this.dom.querySelector(".register");
    this.title = this.dom.querySelector(".title");
    this.plot = this.dom.querySelector(".plot");
    this.year = this.dom.querySelector(".year");
    this.picture = this.dom.querySelector(".picture");
    this.genres = this.dom.querySelector(".genres");
    this.characters = this.dom.querySelector(".characters");
    this.runtime = this.dom.querySelector(".runtime");
    this.mature = this.dom.querySelector(".mature");
    this.directors = this.dom.querySelector(".directors");
    this.stars = this.dom.querySelector(".stars");
    this.writers = this.dom.querySelector(".writers");
    


    var self = this;
    this.form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (self.onRegister) {
        self.onRegister(self.title.value,
                        self.plot.value,
                        self.year.value,
                        self.picture.value,
			self.genres.value.split(","),
			self.characters.value,
			self.runtime.value,
			self.mature.value,
			self.directors.value,
			self.stars.value,
			self.writers.value);
      }
    }, false);
  }

  RegisterView.prototype.setTitle = function (title) {
    this.title.value = title;
  }
  
  RegisterView.prototype.setPlot = function (plot) {
    this.plot.value = plot;
  }
  
  RegisterView.prototype.setYear = function (year) {
    this.year.value = year;
  }
  
  RegisterView.prototype.setPicture = function (picture) {
    this.picture.value = picture;
  }
  
  RegisterView.prototype.setGenres = function (genres) {
    this.genres.value = genres;
  }

  RegisterView.prototype.setCharacters = function (characters) {
    this.characters.value = characters;
  }
  
  RegisterView.prototype.setRuntime = function (runtime) {
    this.runtime.value = runtime;
  }
  
  RegisterView.prototype.setMature = function (mature) {
    this.mature.value = mature;
  }
  
  RegisterView.prototype.setDirectors = function (directors) {
    this.directors.value = directors;
  }
  
  RegisterView.prototype.setStars = function (stars) {
    this.stars.value = stars;
  }
  
  RegisterView.prototype.setWriters = function (writers) {
    this.writers.value = writers;
  }

  function Register (view) {
    this.view = view || new RegisterView();

    this.registerCallback = null;

    this.view.onRegister = Register.prototype.onRegister.bind(this);
  }

  Register.prototype.onError = function (e) {
    if (e.field == "email") {
      this.view.email.classList.add("invalid");
    }
    if (e.field == "user") {
      this.view.user.classList.add("invalid");
    }
    console.log("On error in register" + e);
  }

  Register.prototype.onRegister = function (title,
					    plot,
					    year,
					    picture,
					    genres,
					    characters,
					    runtime,
					    mature,
					    directors,
					    stars,
					    writers) {
    var self = this;
    if (self.registerCallback) {
      var movie = {
	title: title,
	plot: plot,
	year: year,
	picture: picture,
	genres: genres,
	characters: characters,
	runtime: runtime,
	mature: mature,
	directors: directors,
	stars: stars,
	writers: writers 
      };
      API.registerMovie(movie,
                        function (r) {
                          self.registerCallback(r);
                        },
                        self.onError.bind(self));
    }
  }

  
  return Register;
  
});  


