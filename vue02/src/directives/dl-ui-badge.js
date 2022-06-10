import Badge from '../tools/misc/Badge';

const dlUiBadge = {
  /**
   * override
   * @override
   */
  beforeMount(el, binding) {
    const badge = new Badge();
    badge.init(el, binding.value);
    el.badge = badge;
  },
  /**
   * override
   * @override
   */
  updated(el, binding) {
    el.badge.init(el, binding.value);
  }

};
export default dlUiBadge;
