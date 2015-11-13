define([], function() {
  
  var exports = {};
  
  function formInput(type, placeholder, label) {
    this.content = document.createElement("div");
    this.content.classList.add("form-input");
    
    this.label = document.createElement("label");
    this.label.textContent = label;
    this.label.classList.add("form-input-label");

    this.input = document.createElement("input");
    this.input.type = type;
    this.input.placeholder = placeholder;
    this.input.classList.add("form-input-input");

    this.input.onchange = this.onChange;

    this.content.appendChild(this.label);
    this.content.appendChild(this.input);
  }

  formInput.prototype.onChange = function (e) {
    console.log(e.target.value);
  }

  exports.formInput = formInput;

  return exports;

});
