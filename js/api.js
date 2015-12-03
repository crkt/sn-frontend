define([],function() 
{
  var api = {};

  var moviez = [
    {title: "Under Siege", 
     plot: "Bla bla bla",
     image: "https://upload.wikimedia.org/wikipedia/en/3/3d/StevenSeagalUnderSiege_cover.jpg", 
     rating: 5},
    {title: "No Where To Run",
     plot: "Bla bla bla",
     image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/18/Nowhere_to_Run.jpg/220px-Nowhere_to_Run.jpg", 
     rating: 4}
  ];
  
  var genres = [
    {id: 1, genre: "action"},
    {id: 2, genre: "crime"}    
  ];

  api.moviez = moviez;
  api.genres = genres;

  return api;
});
