define(['widgets/base'],function(Base)
{

  function Movie(movie, click) {
    Base.Base.call(this, "div");
    this.addClass("movie");
    this.callback = click;
    
    this.model = movie;

    this.setEvent("onclick", this.onClick.bind(this));
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
  }

  return Movie;

});
