define(['views/search', 'app/request'], function(SearchView, Request) {

  function Search() {
    this.view = new SearchView(document.querySelector("#search"), this.submit, this);    
  }

  Search.prototype.success = function (xhr, args) {
    console.log("SEARCH IS OK");
    console.log(xhr.response);
  };

  Search.prototype.failure = function (xhr, args) {
    console.log("FAILED SEARCH");
    console.log(xhr.response);
  }

  Search.prototype.submit = function(model,e) {
    e.preventDefault();
    Request.send("PUT",
                 model,
                 this.sucess,
                 this.failure
                 );
    console.log(e);
    console.log(model);
  }

  return Search;

});
