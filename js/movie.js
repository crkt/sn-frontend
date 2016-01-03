define(['movie/detail','api', 'utils'], function(Detail, API, Utils) {
  
  var movie_id = parseInt(Utils.getQueryStringValue("id"));

  var currentUser = localStorage.getItem("user");
  var loggedIn = currentUser ? true : false;

  var detail = new Detail();
  document.querySelector("#moviez-detail").appendChild(detail.view.dom);

  if (currentUser) {
    API.fetchMovieSummaryUser(movie_id, currentUser, function (r) {
      detail.setMovie(r);
    });
  } else {
    API.fetchMovieSummary(movie_id, function (r) {
      detail.setMovie(r);
    });
  }

  detail.onRandomCallback = function () {
    API.random(function (movie)	{
      window.location = "movie" + "?id=" + movie.id;
    })
  }

  detail.onRatingCallback = function (id, rating) {
    if (loggedIn) {
      API.rate(id,rating,currentUser, function (r) {
        detail.updateRating(r);
      });
    } else {
      window.location = "/login";
    }
  }
  
});




