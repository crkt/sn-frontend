define(['views/base-widgets'], function(Base) {
  
  var exports = {};

  function CompoundInput(type, placeholder, label) {
    Base.Base.call(this, "div");
    this.addClass("form-input");
    
    this.label = new Base.Label(label);
    this.label.addClass("form-input-label");

    this.input = new Base.Input(type, placeholder, this.onChange.bind(this));
    this.input.addClass("form-input-input");

    this.addChild(this.label.element);
    this.addChild(this.input.element);
  }

  CompoundInput.prototype.onChange = function (e) {
    conesole.log("Reg-widget on change");
    console.log(e.target.value);
  }

  CompoundInput.prototype = Object.create(Base.Base.prototype);
  CompoundInput.prototype.constructor = CompoundInput;
  

  exports.CompundInput = CompoundInput;

  return exports;

});
