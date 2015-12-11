define(['movie/detail','api', 'utils'], function(Detail, API, Utils) {
  
  var movie_id = parseInt(Utils.getQueryStringValue("id"));

  var detail = new Detail();
  document.querySelector("#moviez-detail").appendChild(detail.view.dom);

  API.fetchMovieSummary(movie_id, function (r) {
    detail.setMovie(r);
  })
  
  

});
