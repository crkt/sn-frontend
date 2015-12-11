define([],function() 
{
  var api = {};

  var fetch = function(dest, success, error, failure) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dest, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    
    // If the request timeouts.
    xhr.ontimeout = failure.bind(xhr, xhr);
    
    // If things go as planned, run the success function that was
    // supplied.  if not, the failure function.
    xhr.onload = success.bind(xhr, xhr);
    
    // If shit goes wrong, we want to know and why.
    xhr.onerror = error.bind(xhr, xhr);
    
    // Fetch the data
    xhr.send(null);
  }

  var send = function(type,dest, data, success, error, failure) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, dest, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    
    // If the request timeouts.
    xhr.ontimeout = failure.bind(xhr, xhr);
    
    // If things go as planned, run the success function that was
    // supplied.  if not, the failure function.
    xhr.onload = success.bind(xhr, xhr);
    
    // If shit goes wrong, we want to know and why.
    xhr.onerror = error.bind(xhr, xhr);
    
    // Sends the data as a JSON object.
    xhr.send(JSON.stringify(data));
  };

  var register = function(data, success, error, failure) {
    send("POST",
         "/user/register",
         data,
         function (xhr) {
           if (xhr.readyState === 4) {
             if (xhr.status === 201) {
               success(xhr, JSON.parse(xhr.response));
             } else if (xhr.status === 400) {
               error(JSON.parse(xhr.response));
             } else {
               failure(xhr, xhr.response);
             }
           }
         },
         function (xhr) {
           console.log("Error on registering user");
           error(xhr.statusText);
         },
         function (xhr) {
           console.log("Failed to register user");
         });
  }

  var login = function (data, success, error, failure) {
    send("PUT",
         "/user/login",
         data,
         function (xhr) {
           if (xhr.readyState === 4) {
             if (xhr.status === 202) {
               success(JSON.parse(xhr.response));
             } else if (xhr.status === 400) {     
               error(JSON.parse(xhr.response));
             } else {
               failure(xhr, xhr.response);
             }
           }
         },
         function (xhr) {
           console.log("Error on login");
           error(xhr.statusText);
         },
         function (xhr) {
           console.log("Failed to login");
         });
  }

  var search = function (dest, data, success, error, failure) {
    send("PUT",
         dest,
         data,
         function (xhr) {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
               success(JSON.parse(xhr.response));
             } else if (xhr.status === 400) {     
               error(JSON.parse(xhr.response));
             } else {
               failure(xhr.response);
             }
           }
         },
         function (xhr) {
           console.log("Error on search");
           error(xhr.statusText);
         },
         function (xhr) {
           console.log("Failed to search");
         });
  }

  /**
     SearchWithUser : function, data, user id -> Movies
     Expects a search function and a user Id to add to the search
     Add the id to the data model
   **/
  var searchWithUser = function (f, data, user) {
    data.user = user;
    f(data);
  };
  
  var register = function (data, success, error, failure) {
    send("POST",
         "/user/register",
         data,
         function (xhr) {
           if (xhr.readyState === 4) {
             if (xhr.status === 201) {
               success(JSON.parse(xhr.response));
             } else if (xhr.status === 400) {     
               error(JSON.parse(xhr.response));
             } else {
               failure(xhr.response);
             }
           }
         },
         error,
         failure);
  }
  var random = function (success) {
    fetch("/search/random",
          function (xhr) {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                success(JSON.parse(xhr.response));
              }
            }
          },
          function (xhr) {
            console.log("Failed to get random");
          },
          function (xhr) {
            console.log("Failed to get random");
          });
  }
  
  var rate = function (id,rating,user,success) {
    send("PUT",
         "/movie/rating",
         {user_id: user, rating: rating, movie: id},
         function (xhr) {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
               success(JSON.parse(xhr.response));
             } 
           }
         },
         function (xhr) {
           console.log("Error" + xhr);
         },
         function (xhr) {
           console.log("Failure" + xhr);
         });
  }

  var fetchGenres = function (success) {
    fetch("/movie/genres", 
          function (xhr) {
            if (xhr.readyState === 4) {
             if (xhr.status === 200) {
               success(JSON.parse(xhr.response));
             }
            }
          },
          function (xhr) {
            console.log("Failed to get genres");
          },
          function (xhr) {
            console.log("Failed to get genres");
          });
  }

  var fetchMovieId = function (id, success) {
    var req = {movie: id};
    send("PUT",
         "/movie/id",
         req,
         function (xhr) {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
               success(JSON.parse(xhr.response));
             }
           }
         },
          function (xhr) {
            console.log("Failed to get genres");
          },
         function (xhr) {
           console.log("Failed to get genres");
         });
  }

  var searchWithAttributes = function (attrs, success) {
    search("/search/movie",
           attrs,
           success,
           function (xhr) {
             console.log("Failed to search");
           },
           function (xhr) {
             console.log("Failed to search");
           });
  }

  var registerUser = function (user, success, error) {
    register(user,
             success,
             error,
             function (xhr) {
               console.log("Failed to create user");
             });
  }
  
  var loginUser = function (user, success, error) {
    login(user,
          success,
          error,
          function (xhr) {
            console.log("Failed to login");
          });
  }

  var rateMovie = function (movie_id, rating, user_id, success, error) {
    rate(movie_id,rating,user_id,
         success,
         error,
         function (xhr) {
           console.log("Faield to rate movie");
         });
  }

  api.rate = rate;
  api.random = random;
  api.login = loginUser;
  api.register = registerUser;
  api.search = searchWithAttributes;
  api.fetchGenres = fetchGenres;
  api.fetchMovieId = fetchMovieId;
  api.fetchMovieSummary = fetchMovieId;
  api.searchWithUser = searchWithUser;

  return api;
});
