define(['movie/detail','api'], function(Detail, API) {
  
  function getQueryStringValue (key) {  
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
  }

  var movie_id = parseInt(getQueryStringValue("id"));

  var detail = new Detail();
  document.querySelector("#moviez-detail").appendChild(detail.view.dom);

  API.fetchMovieSummary(movie_id, function (r) {
    detail.setMovie(r);
  })
  
  

});
