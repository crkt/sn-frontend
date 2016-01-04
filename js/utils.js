define([], function() {
  
  /**
     Utils
     
     Contains all of the common utilites that are used in the page.
  **/

  var utils = {};
  
  utils.capitalizeString = function (s) {
    return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
  }

  /** Access an objects properties, expected prop to be a dot notated string **/
  utils.accessProperty = function (obj, prop) {
    var index = prop.indexOf('.');

    if(index > -1) {
      return utils.accessProperty(obj[prop.substring(0, index)], prop.substr(index+1));
    }   
    return obj[prop];
  }

  utils.getQueryStringValue = function (key) {  
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
  }
  

  return utils;

});
