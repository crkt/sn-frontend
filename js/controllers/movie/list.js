define(['views/movie/list',
        'views/movie/detail',
        'app/request'], function(ListView, DetailView, Request) 
{

  function ListController(ratingCallback) {    
    this.view = document.querySelector("#main-content");

    this.list = new ListView(this.clickMovie.bind(this), this.updateRating.bind(this));
    this.detail = new DetailView(this.updateRating.bind(this));

    this.view.appendChild(this.list.element);
    this.view.appendChild(this.detail.element);

    this.callback = ratingCallback;
  }

  ListController.prototype.addMovies = function (movies) {
    this.list.addMovies(movies);     
  }

  ListController.prototype.clear = function () {
    this.list.clear();
  }

  ListController.prototype.clickMovie = function (movie) {
    this.detail.setModel(movie);
    this.detail.createFields();
    console.log("SHOW DETAIL VIEW");
  }

  ListController.prototype.success = function (xhr, response) {
    // There be dragons here.
    console.log("Updated rating");
  }

  ListController.prototype.failure = function (xhr, response) {
    console.log("Failure to create user");
    console.log(response);
  }

  ListController.prototype.updateRating = function (id, value) {
    var ratingObj = {
      id: id,
      value: value,
      user_id: 1
    };
    
    console.log("MOVIE ID: " + id + " " + "Value: " + value);
    console.log("RATING SOMETGINF< ASDASdDS");

    Request.send("PUT",
                 ratingObj,
                 "/movie/rating",
                 this.success.bind(this),
                 this.failure.bind(this)
                 );
    
  }





  return ListController;
});
