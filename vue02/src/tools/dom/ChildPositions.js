
/**
 * Observe classlist from refElement
 */
export default class ChildPositions {

  /**
     * calculate child position
     * @param {Object} groupElement ref group element
     * @returns {String} Style string computed
    */
  getParentContainer(groupElement) {

    let parentElement = document.documentElement.getElementsByTagName('body')[0];

    /**
     * calculate child position
     * @param {Object} childElement ref group element
    */
    function getParentElement(childElement) {

      const parent = childElement.parentElement;
      if (parent && parent.tagName !== 'HTML') {

        const overflowYStyle = window.getComputedStyle(parent).overflowY;

        if (overflowYStyle === 'auto') {
          parentElement = parent;
        }
        else {
          getParentElement(parent);
        }
      }

    }

    getParentElement(groupElement.parentElement);

    return parentElement;
  }

  /**
     * calculate child position
     * @param {Object} groupElement ref group element
     * @param {Object} parentElement ref parent container element
     * @return {Number} left position
    */
  getChildLeftPosition(groupElement, parentElement) {

    // detects if next group has sufficient space to paint on right position
    const positionInfo = groupElement.getBoundingClientRect();
    const xPosition = positionInfo.left;
    const width = positionInfo.width;

    /*  window.innerWidth || document.documentElement.clientWidth ||
     const viewportWidth = parentElement.clientWidth; */

    const childWidth = xPosition + (2 * width) - parentElement.scrollLeft;

    const xParent = parentElement.offsetLeft;
    const wParent = parentElement.clientWidth;
    const xLimit = xParent + wParent;

    if (childWidth > xLimit) {
      return -width;
    }
    else {
      return width;
    }
  }

};

