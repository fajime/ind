
/**
 * Generate tooltip in dom
 * @param {Object} el reference Element
 */
export default class Ripple {

  /**
 * Generate tooltip in dom
 * @param {Object} el reference Element
 * @param {String} color reference Element
 */
  init(el, color = '#E9FCFF') {
    this.color = color;
    el.onmousedown = event => {
      this.resetElement();

      const posx = event.offsetX;
      const posy = event.offsetY;
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      this.viewRipple({ posx, posy, width, height });

    };

    this.ripple = this.addElement(el);
    this.resetElement();
  }

  /**
 * Generate tooltip in dom
 * @param {Object} element reference Element
* @returns {Object} ripple to show
 */
  addElement(element) {
    const ripple1 = document.createElement('div');

    element.insertBefore(ripple1, element.firstChild);
    element.style.overflow = 'hidden';
    element.style.position = 'relative';

    ripple1.style.pointerEvents = 'none';

    return ripple1;
  }

  /**
* Generate tooltip in dom
* @param {Object} arguments reference Element
*/
  viewRipple({ posx, posy, width, height }) {
    const size = Math.sqrt(width * width + height * height);

    this.ripple.style.width = '0px';
    this.ripple.style.height = '0px';

    this.ripple.style.width = `${size * 2 }px`;
    this.ripple.style.height = `${size * 2 }px`;
    this.ripple.style.left = `${posx }px`;
    this.ripple.style.top = `${posy }px`;
    this.ripple.className = 'ripple active';

    this.ripple.style.backgroundColor = this.color;
  }

  /**
* Generate tooltip in dom
*/
  resetElement() {
    this.ripple.className = 'ripple';
    this.ripple.style.width = '0px';
    this.ripple.style.height = '0px';
  }

};

