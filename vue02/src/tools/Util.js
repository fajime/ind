/**
 * General functions
 */

// eslint-disable-next-line require-jsdoc
function deepMerge(target, source) {
  Object.entries(source).forEach(([key, value]) => {
    if (value && typeof value === 'object') {
      deepMerge(target[key] = target[key] || {}, value);
      return;
    }
    target[key] = value;
  });
  return target;
}

/**
   * Merge two complex objects
   * @param {Object} target Object
   * @param {Object} source Object
   * @returns {Object} Merged
   */
export function deepMergeObjects(target, source) {

  deepMerge(target, source);
  return target;
}

