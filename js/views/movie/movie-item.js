define(['widgets/base', 'widgets/input'],function(Base, Input)
{

  function Rating(range, callback) {
    Base.Base.call(this, "span");

    this.addClass("rating");

    for (var i = range + 1; i > 1; i--) {
      var input = new Input.Radio("rating", i - 1, this.onChange.bind(this));
      this.addChild(input.element);
    }

    if (callback) {
      this.callback = callback;
    }
    
  }

  Rating.prototype = Object.create(Base.Base.prototype);
  Rating.prototype.constructor = Rating;

  Rating.prototype.onChange = function (value) {
    if (this.callback) {
      this.callback(value);
    }
  }

  function Movie(movie, click, ratingCallback) {
    Base.Base.call(this, "div");
    this.addClass("movie");
    this.callback = click;
    this.ratingCallback = ratingCallback;
    
    this.model = movie;

    //this.setEvent("onclick", this.onClick.bind(this));
    this.createFields();
  }

  Movie.prototype = Object.create(Base.Base.prototype);
  Movie.prototype.constructor = Movie;

  Movie.prototype.onClick = function (e) {
    e.preventDefault();
    console.log("Clicked on a movie");
  }

  Movie.prototype.createFields = function() {
    for (var prop in this.model) {
      var content = new Base.Base("div");
      content.addClass("fields");
      var proplbl = new Base.Label(prop);
      proplbl.addClass("property");
      var valuelbl = new Base.Label(this.model[prop]);
      valuelbl.addClass("value");
      content.addChild(proplbl.element);
      content.addChild(valuelbl.element);
      this.addChild(content.element);
    }
    
    // Change this, into a more general function...
    var ratings = new Rating(5, this.onRatingChange.bind(this));
    this.addChild(ratings.element);
  }
  
  Movie.prototype.onRatingChange = function (rating) {
    this.ratingCallback(this.model.id, rating);
  }

  return Movie;

});
