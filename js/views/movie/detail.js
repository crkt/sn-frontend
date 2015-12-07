define(['widgets/base', 'widgets/input'],function(Base, Input)
{

	/*
	Make into a general widget.
	*/	
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

function DetailedMovie(ratingCallback) {
    Base.Base.call(this, "div");
    this.addClass("DetailedMovie");
    this.ratingCallback = ratingCallback;
}

	DetailedMovie.prototype = Object.create(Base.Base.prototype);
	DetailedMovie.prototype.constructor = DetailedMovie;

DetailedMovie.prototype.setModel = function (movie) {
	this.model = movie;
}

DetailedMovie.prototype.createFields = function() {
	for (var prop in this.model){
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
		var ratings = new Rating(5, this.onRatingChange.bind(this));
    	this.addChild(ratings.element);
  }
  
  	DetailedMovie.prototype.onRatingChange = function (rating) {
    	this.ratingCallback(this.model.id, rating);
  	}

	DetailedMovie.prototype.toggleVisible = function (t) {
    	this.toggleClass("active", t);
	}

return DetailedMovie;

});