
const highlightJS = require('highlight.js');

const highlight = {
  deep : true,
  /**
   * Bind function
   *
   * @param {Object} el element to bind
   * @param {Object} binding Binding object
   */
  beforeMount(el, binding) {
    // on first bind, highlight all targets
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      /* if a value is directly assigned to the directive, use this
         instead of the element content. */
      if (binding.value) {
        target.innerHTML = binding.value;
      }
      highlightJS.highlightElement(target);
    });
  },
  /**
   * binding function on component update
   *
   * @param {Object} el element to bind
   * @param {Object} binding Binding object
   */
  updated(el, binding) {
    // after an update, re-fill the content and then highlight
    const targets = el.querySelectorAll('code');
    targets.forEach(target => {
      if (binding.value) {
        target.innerHTML = binding.value;
        highlightJS.highlightElement(target);
      }
    });
  }
};

export default highlight;
