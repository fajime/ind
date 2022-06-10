import Ripple from '../tools/misc/Ripple';

const dlUiRipple = {
  /**
   * override
   * @override
   */
  beforeMount(el, binding) {
    const ripple = new Ripple();
    const color = binding.value;
    ripple.init(el, color);
    el.ripple = ripple;
  },
  /**
   * override
   * @override
   */
  updated(el, binding) {
    const color = binding.value;
    const ripple = el.ripple;
    ripple.color = color;
  }

};
export default dlUiRipple;
