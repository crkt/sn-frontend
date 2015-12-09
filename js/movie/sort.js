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

  Sort.prototype.sortByTitle = function (lst, ascending) {
    var sort = undefined;
    if (ascending) {
      sort = function (a,b) {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        }
        return 0;
      }
    } else {
      sort = function (a,b) {
        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        }
        return 0;
      }
    }
    return lst.sort(sort);
  }

  Sort.prototype.sortByRating = function (lst, ascending) {
    var sort = undefined;
    if (ascending) {
      sort = function (a,b) {
        if (a.rating.rating > b.rating.rating) {
          return 1;
        } else if (a.rating.rating < b.rating.rating) {
          return -1;
        }
        return 0;
      }
    } else {
      sort = function (a,b) {
        if (a.rating.rating > b.rating.rating) {
          return -1;
        } else if (a.rating.rating < b.rating.rating) {
          return 1;
        }
        return 0;
      }
    }
    return lst.sort(sort);
  }



  return Sort;


});
