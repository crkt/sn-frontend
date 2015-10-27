define(['app/movie/model', 'app/request'], function(Movie, Request) {
  
  var exports = {};

  // The form is defined in the html.
  // We then select it with document.querySelector.
  // Using the id of the html element.
  var form = document.querySelector("#new-movie");

  var submitBtn = document.querySelector("#post-movie");

  
  var movie = new Movie();

  var title = document.querySelector("#movie-title-input");

  // Bind the onChange event to our custom function.
  // E.g when someone enters some text.
  title.onChange = function (e) {
    e.preventDefault(); //Stop the event from propagating. (Bubbling)
    movie.setTitle(e.target.value); // Set the title of the movie.
  }

  var year = document.querySelector("#movie-year-input");

  year.onChange = function (e) {
    e.preventDefault();
    movie.setYear(e.target.value);
  }

  var runtime = document.querySelector("#movie-runtime-input");

  runtime.onChange = function (e) {
    e.preventDefault();
    movie.setRuntime(e.target.value);
  }

  var genres = document.querySelector("#movie-genre-input");
  
  genres.onChange = function (e) {
    e.preventDefault();
    /**
       Splits the string on , this will yeild an
       array of the genres, [Action, Drama]
     **/
    var g = e.target.value.split(","); // Split the string on comma
    movie.setGenre(g);
  }


  // If the request fails
  var failure = function (e) {
    console.log(e.response);
  }
  
  /**
     If the request is a success, we clear the form.
   **/
  var success = function (xhr, args) {
    title.value = "";
    year.value = "";
    runtime.value = "";
    genres.value = "";
    movie = new Movie();
  }

  var submit = function (e) {
    e.preventDefault();
    console.log(movie);
    Request.post(movie,
                 "/movie",
		 success,
		 failure
		);
  };

  // bind onsubmit to our own.
  form.onsubmit = submit;

  // when the form html has been loaded, reset the fields.
  form.onload = function (e) {
    title.value = "";
    year.value = "";
    runtime.value = "";
    genres.value = "";
    movie = new Movie();
  }

  // exports nothing right now.
  return exports;
});
