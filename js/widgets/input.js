define(['widgets/base'], function(Base) {

  var widgets = {};

  function Radio(name, value, callback) {
    Base.Input.call(this, "radio", "", "movie-rating", callback);
    
    this.element.name = name;
    this.element.value = value;
  }

  Radio.prototype = Object.create(Base.Input.prototype);
  Radio.prototype.constructor = Radio;

  widgets.Radio = Radio;

  return widgets;

})
