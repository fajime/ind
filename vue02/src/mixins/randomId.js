/**
 * Mixin with generic utils for components
 */
export default {
  /**
   * Override
   * @override
   */
  data() {
    return {
      randomId : this.createRandomId()
    };
  },
  methods : {
    /**
     * Generate a numeric random ID preffix by component name to avoid collisions about id naming
     * @return {String} Id generated.
     */
    createRandomId() {
      return `${this.$options.name}-${Date.now()}${Math.floor(
        Math.random() * 100000
      )}`;
    }
  }
};
