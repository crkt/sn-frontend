define(['widgets/base', 
        'widgets/form', 
        'models/search'], function(Base, FormWidget, Model) 
{

  function Search(onSearch) {
    Base.Base.call(this, "div");
    this.addClass("search-pane");

    this.callback = onSearch;

    this.form = new FormWidget.Form(this.onSearch.bind(this));
    this.form.addClass("query");

    this.model = new Model();

    this.title = new FormWidget.CompoundInput("text",
                                              "Movie Title",
                                              "Movie Title",
                                              this.onChange.bind(this, "title"));

    this.runtime = new FormWidget.CompoundInput("number",
                                                "Runtime in minutes",
                                                "Movie runtime",
                                                this.onChange.bind(this, "runtime"));

    this.year = new FormWidget.CompoundInput("number",
                                             "1993",
                                             "Movie release year",
                                             this.onChange.bind(this, "year"));

    this.genres = new FormWidget.CompoundInput("text",
                                               "action, comedy",
                                               "Movie genres",
                                               this.onChange.bind(this, "genres"));

    this.submitButton = new Base.Button("submit", "Search");

    this.form.addChild(this.title.element);
    this.form.addChild(this.runtime.element);
    this.form.addChild(this.year.element);
    this.form.addChild(this.genres.element);
    this.form.addChild(this.submitButton.element);
    this.addChild(this.form.element);
  }

  Search.prototype = Object.create(Base.Base.prototype);
  Search.prototype.constructor = Search;

  Search.prototype.onChange = function (prop, value) {
    console.log("Search value: " + value);
    console.log("Search propery: " + prop);
    if (prop == "title") {
      this.model.setTitle(value);
    } else if (prop == "runtime") {
      this.model.setRuntime(value);
    } else if (prop == "year") {
      this.model.setYear(value);
    } else if (prop == "genres") {
      this.model.setGenres(value.split(","));
    }
  }

  Search.prototype.onSearch = function (e) {
    console.log("Search with: " + this.model);
    this.callback(this.model, e);
  }

  return Search;

});
