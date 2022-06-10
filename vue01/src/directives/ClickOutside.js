let handleOutsideClick;
export default {
  name : 'ClickOutside',
  /**
   * Bind of click outside
   * @param {*} el element
   * @param {*} binding binding method
   * @param {*} vnode node
   */
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();
      /*
       * We check to see if the clicked element is not
       * the dialog element and not excluded
       */
      if (!el.contains(e.target)) {
        /*
         * If the clicked element is outside the dialog
         * and not the button, then call the outside-click handler
         * from the same component this directive is used in
         */
        vnode.context[binding.expression](e);
      }
    };
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick);
  },
  /**
   * Unbind of click outside
   */
  unbind() {
    document.removeEventListener('click', handleOutsideClick);
  }
};
