define(['app/movie/domain/search', 'app/request'], function(Search, Request) {

  var exports = {};

  var form = document.querySelector("#search-for-movie");

  var submitBtn = document.querySelector("#search-movie");

  var search = new Search();

  var genres = document.querySelector("#movie-genre-input");

  genres.onchange = function(e) {
    e.preventDefault();
    search.setGenres(e.target.value.split(","));
  }

// If the request fails
  var failure = function (e) {
    console.log(e.response);
  }
  
  /**
     If the request is a success, we clear the form.
   **/
  var success = function (xhr, args) {
    if (exports.onSearch) {
      exports.onSearch(args);
    } else {
      console.log(args);
    }
    genres.value = "";
    search = new Search();    
  }

  var submit = function (e) {
    e.preventDefault();
    console.log(search);
    Request.send("PUT",
                 search,
                 "/search/movie",
		 success,
		 failure
		);
  };
  var onSearch = function(data) {
    
  };

  // bind onsubmit to our own.
  form.onsubmit = submit;

  // when the form html has been loaded, reset the fields.
  form.onload = function (e) {
    genres.value = "";
    search = new Search();
  }

  // exports nothing right now.
  exports.onSearch = onSearch;
  return exports;

});
