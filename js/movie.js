define(['movie/detail','api', 'utils'], function(Detail, API, Utils) {
  
  var movie_id = parseInt(Utils.getQueryStringValue("id"));

  var detail = new Detail();
  document.querySelector("#moviez-detail").appendChild(detail.view.dom);

  API.fetchMovieSummary(movie_id, function (r) {
    detail.setMovie(r);
  });

  detail.onRandomCallback = function () {
    API.random(function (movie)	{
      // Fix that we set the id in the location instead.
      detail.setMovie(movie);
    })
  }
  
});




