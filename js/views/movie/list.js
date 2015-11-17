define(['views/widgets/base',
        'models/movie'], function(Base, Movie) 
{

  function CompoundLabel(prop,value) {
    Base.Base.call(this, "div");
    this.prop = prop;
    this.value = value;
    
    this.proplbl = new Base.Label(prop);
    this.proplbl.addClass("property");

    this.valuelbl = new Base.Label(value);
    this.valuelbl.addClass("value");

    this.addChild(this.proplbl.element);
    this.addChild(this.valuelbl.element);
  }

  CompoundLabel.prototype = Object.create(Base.Base.prototype);
  CompoundLabel.prototype.constructor = CompoundLabel;
  

  function ListItem(movie) {
    Base.Base.call(this, "li");

    for (var prop in movie) {
      var field = new CompoundLabel(prop,movie[prop]);   
      this.addChild(field.element);
    }
  }

  ListItem.prototype = Object.create(Base.Base.prototype);
  ListItem.prototype.constructor = ListItem;

  function List() {
    Base.Base.call(this, "ul");
    this.setAttribute("id", "movie-results");
  }

  List.prototype = Object.create(Base.Base.prototype);
  List.prototype.constructor = List;

  List.prototype.addMovies = function (movies) {
    for (var movie in movies) {
      var item = new ListItem(movie);
      this.addChild(item.element);
    }
  }

  List.prototype.addMovie = function (movie) {
    var item = new ListItem(movie);
    this.addChild(item.element);
  }

  List.prototype.clear = function () {
    while (this.element.hasChildNodes()) {
      for (var i = 0; i < this.element.childNodes.length; i++) {
        this.element.removeChild[i];
      }
    }
  }

  return List;

});
