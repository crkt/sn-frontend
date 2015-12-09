define([], function() {

  function SortView() {
    var template = document.querySelector("#movie-sort");
    this.dom = document.importNode(template.content, true);
    this.rating = this.dom.querySelector(".rating");
    this.title = this.dom.querySelector(".title");

    var self = this;
    this.rating.addEventListener("change", function (e) {
      if (self.onSortCallback) {
        self.onSortCallback("rating.rating", e.target.value);
      }
    },false);

    this.title.addEventListener("change", function (e) {
      if (self.onSortCallback) {
        self.onSortCallback("title", e.target.value);
      }
    }, false);
  }  

  function Sort(view) {
    this.view = view || new SortView();
    this.sortCallback = null;

    this.view.onSortCallback = Sort.prototype.onSort.bind(this);
  }

  Sort.prototype.onSort = function (by, order) {
    var asc = order === "asc";
    if (this.sortCallback) {
      if (by === "title") {        
        this.sortCallback(Sort.prototype.sortByProperty.bind(this, by, asc));
      } else if (by === "rating.rating") {
        this.sortCallback(Sort.prototype.sortByProperty.bind(this, by, asc));
      }
    }
  }

  Sort.prototype.accessProperty = function (prop, obj) {
    var prop = prop.split(".");
    return obj[prop];
  }


  // Recurseivly access a property in an object.
  // Expects the prop to be = "prop.prop.prop" or just "prop".
  var accessProperty = function (obj, prop) {
    var index = prop.indexOf('.');

    if(index > -1) {
      return accessProperty(obj[prop.substring(0, index)], prop.substr(index+1));
    }   
    return obj[prop];
  }

  // Returns a sorted list. Sort by the propery given and in the order specified.
  Sort.prototype.sortByProperty = function (prop, ascending, lst) {
    return lst.sort(function (a,b) {
      a = accessProperty(a, prop);
      b = accessProperty(b, prop);
      if (a > b) {
        return ascending ? 1 : -1;
      } else if (a < b) {
        return ascending ? -1 : 1;
      }
      return 0;
    });
  }

  return Sort;


});
