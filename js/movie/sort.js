define([], function() {

  function SortView() {
    var template = document.querySelector("#movie-sort");
    this.dom = document.importNode(template.content, true);
    this.rating = this.dom.querySelector(".rating");
    this.title = this.dom.querySelector(".title");
  }  


  function Sort(view) {
    this.view = view || new SortView();
  }


  return Sort;

});
