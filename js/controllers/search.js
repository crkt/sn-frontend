define(['views/search', 'app/request'], function(SearchView, Request) {

  function Search(listener) {
    this.view = new SearchView(document.querySelector("#search"), this.submit, this);   
    this.listener = listener;
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
    this.listener.addMovies(movies);
  }

  return Search;

});
