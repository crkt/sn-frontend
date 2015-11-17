define(['views/widgets/base'], function(Base) {
  
  var exports = {};

  function Form(callback) {
    Base.Base.call(this, "form");
    this.callback = callback;
    this.setEvent("onsubmit", this.onSubmit.bind(this));    
  }

  Form.prototype = Object.create(Base.Base.prototype);
  Form.prototype.constructor = Form;

  Form.prototype.onSubmit = function (e) {
    e.preventDefault();
    this.callback(e);
  };

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
    this.callback(value);
  }

  exports.CompoundInput = CompoundInput;
  exports.Form = Form;

  return exports;

});
