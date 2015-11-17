define(['views/input-widgets', 'models/search'], function(InputWidget, Model) {

  var model = new Model();

  function Search(element, onchange, that) {
    this.content = document.createElement("div");
    this.content.id = "search-pane";

    this.queryForm = document.createElement("form");
    this.queryForm.classList.add("query");
    
    this.title = new InputWidget.Input("text", "Movie title", "Movie title", 
                                       function (e) {
                                         e.preventDefault();
                                         if (e.target.value == "") {
                                           model.setTitle(undefined);
                                         } else {
                                           model.setTitle(e.target.value);
                                         }
                                         
                                       });
    
    this.runtime = new InputWidget.Input("number", "Runtime in minutes", "Movie runtime", function (e) {
      e.preventDefault();
      if (e.target.value == "") {
        model.setRuntime(undefined);
      } else {
        model.setRuntime(parseInt(e.target.value));
      }
    });
    
    this.year = new InputWidget.Input("number", "1993", "Movie release year", function (e) {
      e.preventDefault();
      if (e.target.value == "") {
        model.setYear(undefined);
      } else {
        model.setYear(parseInt(e.target.value));
      }
    });
    
    this.genres = new InputWidget.Input("text", "action, comedy", "Movie genres", function (e) {
      e.preventDefault();
      if (e.target.value == "") {
        model.setGenres(undefined);
      } else {
        model.setGenres(e.target.value.split(","));
      }
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
