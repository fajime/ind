
/**
 * Observe classlist from refElement
 */
export default class ClassObserve {
/**
     * Generate a observe to watch class change
     * @param {Object} refElement ref element to observe
     * @param {Function} callback function on detect change
     */
  constructor(refElement, callback) {
    this.observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        const newValue = m.target.getAttribute(m.attributeName);

        callback(newValue, m.oldValue);

      }
    });

    this.observer.observe(refElement, {
      attributes        : true,
      attributeOldValue : true,
      attributeFilter   : ['class']
    });

  }

  /**
     * Destroy observe
     */
  destroy() {
    this.observer.disconnect();
  }

};

