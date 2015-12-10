define(['utils'], function(Utils) {

  function SortView() {
    var template = document.querySelector("#movie-sort");
    this.dom = document.importNode(template.content, true);
    this.rating = this.dom.querySelector(".rating");
    this.title = this.dom.querySelector(".title");
    this.year = this.dom.querySelector(".year");
    this.runtime = this.dom.querySelector(".runtime")


    /** "rating.rating" refers to the property to sort on **/
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

    this.title.addEventListener("change", function (e) {
      if (self.onSortCallback) {
        self.onSortCallback("year", e.target.value);
      }
    }, false);

    this.title.addEventListener("change", function (e) {
      if (self.onSortCallback) {
        self.onSortCallback("runtime", e.target.value);
      }
    }, false);
  }  

  function Sort(view) {
    this.view = view || new SortView();
    this.sortCallback = null;

    this.view.onSortCallback = Sort.prototype.onSort.bind(this);
  }

  Sort.prototype.onSort = function (by, order) {
    var asc = order === "asc"; // change order to a boolean
    if (this.sortCallback) {
      if (by === "title") {        
        this.sortCallback(Sort.prototype.sortByProperty.bind(this, by, asc));
      } else if (by === "rating.rating") {
        this.sortCallback(Sort.prototype.sortByProperty.bind(this, by, asc));
      } else if (by === "year") {
        this.sortCallback(Sort.prototype.sortByProperty.bind(this, by, asc));
      }
    }
  }

  // Returns a sorted list. Sort by the propery given and in the order specified.
  Sort.prototype.sortByProperty = function (prop, ascending, lst) {
    return lst.sort(function (a,b) {
      a = Utils.accessProperty(a, prop);
      b = Utils.accessProperty(b, prop);
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
