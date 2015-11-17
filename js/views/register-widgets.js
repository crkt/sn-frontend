define(['views/base-widgets'], function(Base) {
  
  var exports = {};

  function CompoundInput(type, placeholder, label, callback) {
    Base.Base.call(this, "div");
    this.addClass("form-input");
    
    this.callback = callback;
    
    this.label = new Base.Label(label);
    this.label.addClass("form-input-label");

    this.input = new Base.Input(type, placeholder, this.onChange.bind(this));
    this.input.addClass("form-input-input");

    this.addChild(this.label.element);
    this.addChild(this.input.element);
  }

  CompoundInput.prototype = Object.create(Base.Base.prototype);
  CompoundInput.prototype.constructor = CompoundInput;

  CompoundInput.prototype.onChange = function (value) {
    console.log("Reg-widget on change");
    this.callback(value
  }

  exports.CompoundInput = CompoundInput;

  return exports;

});
