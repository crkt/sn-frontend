define(['views/search', 'app/request'], function(SearchView, Request) {

  function Search(onSearch) {
    this.container = document.querySelector("#search");
    this.view = new SearchView(this.submit.bind(this));

    this.callback = onSearch;
    
    this.container.appendChild(this.view.element);
  }

  Search.prototype.success = function (xhr, response) {
    this.onSuccess(response);
  };

  Search.prototype.failure = function (xhr, response) {
    console.log(response);
  }

  Search.prototype.submit = function(model,e) {
    e.preventDefault();
    Request.send("PUT",
                 model,
                 "/search/movie",
                 this.success.bind(this),
                 this.failure.bind(this)
                 );
  }

  Search.prototype.onSuccess = function (movies) {
    console.log("Search was a success");
    this.callback(movies);
  }

  return Search;

});
