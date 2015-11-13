define(['views/input-widgets', 'models/search'], function(InputWidget, Model) {

  var model = new Model();

  function Search(element, onchange, that) {
    this.content = document.createElement("div");
    this.content.id = "search-pane";

    this.queryForm = document.createElement("form");
    this.queryForm.classList.add("query");
    
    this.title = new InputWidget.search("text", "Movie title", "Movie title", 
                                        function (e) {
                                          model.setTitle(e.target.value);
                                        });

    this.runtime = new InputWidget.search("number", "Runtime in minutes", "Movie runtime", function (e) {
      model.setRuntime(e.target.value);
    });
    
    this.year = new InputWidget.search("number", "1993", "Movie release year", function (e) {
      model.setYear(e.target.value);
    });
    
    this.genres = new InputWidget.search("text", "action, comedy", "Movie genres", function (e) {
      model.setGenres(e.target.value);
    });

    this.submitbtn = new InputWidget.Button("submit", "Search");

    
    this.queryForm.appendChild(this.title.content);
    this.queryForm.appendChild(this.runtime.content);
    this.queryForm.appendChild(this.year.content);
    this.queryForm.appendChild(this.genres.content);
    this.queryForm.appendChild(this.submitbtn.content);


    this.queryForm.onsubmit = onchange.bind(that, model);;

    this.content.appendChild(this.queryForm); 
    element.appendChild(this.content);
  }

  return Search;

});
