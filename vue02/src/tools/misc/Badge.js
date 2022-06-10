/**
 * Generate tooltip in dom
 * @param {Object} el reference Element
 */
export default class Badge {

  /**
 * Generate tooltip in dom
 * @param {Object} el reference Element
 * @param {Object} options reference Element
 */
  init(el, options) {

    if (!options.position) {
      options.position = { top : 0, right : 0 };
    }
    const text = options.text;
    const size = options.size;
    const shape = options.shape;
    const type = options.type;

    if (this.wrapper) {
      this.badge.badge2.className = '';

    }
    else {
      const wrapper = document.createElement('div');

      const badge = document.createElement('div');
      const badge2 = document.createElement('div');

      badge.style.position = 'absolute';
      badge.style.zIndex = 1000;
      wrapper.appendChild(badge);
      wrapper.style.position = 'absolute';
      wrapper.style.top = '0';
      wrapper.style.left = '0';
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';

      el.style.display = 'inline-block';
      el.style.position = 'relative';
      badge.badge2 = badge2;
      badge.appendChild(badge2);
      el.appendChild(wrapper);
      // el.insertBefore(wrapper, el.firstChild);

      this.badge = badge;
      this.wrapper = wrapper;
    }

    this.badge.badge2.classList.add('dl-ui-badge');
    this.badge.badge2.classList.add(`dl-ui-badge--${shape}`);
    this.badge.badge2.classList.add(`dl-ui-badge--${type}-${size}`);

    if (shape === 'point') {
      this.badge.badge2.innerHTML = '';
    }
    else {
      this.badge.badge2.innerHTML = `<div>${text}</div>`;
    }

    if (text) {
      this.wrapper.style.display = 'unset';
    }
    else {
      this.wrapper.style.display = 'none';
    }
    const observer = new ResizeObserver(() => {
      this.position(el, options);
    });
    observer.observe(el);
  }

  /**
 * Set position badge
 * @param {Object} el reference Element
 * @param {Object} options reference Element
 */
  position(el, options) {

    const h1 = el.offsetHeight;
    const w1 = el.offsetWidth;

    const badge = this.badge;
    this.badge.style.top = 'unset';
    this.badge.style.left = 'unset';
    this.badge.style.bottom = 'unset';
    this.badge.style.right = 'unset';

    const position = options.position;
    if (position.angle) {

      this.badge.style.transform = 'translate(-50%, -50%)';
      const ratio = w1 / 2;
      const cx = w1 / 2; //  - w2;
      const cy = h1 / 2; //  - h2;

      const pi = Math.PI;

      const x1 = ratio * Math.cos( position.angle * pi / 180);
      const y1 = ratio * Math.sin( position.angle * pi / 180);

      const x2 = cx + x1;
      const y2 = cy + y1;

      badge.style.top = `${y2}px`;
      badge.style.left = `${x2}px`;

    }
    else {
      let tx = 0;
      let ty = 0;
      this.badge.style.transform = 'none';
      for (const [key, value] of Object.entries(position)) {
        badge.style[key] = value;

        if (key === 'right') {
          tx = '50%';
        }
        if (key === 'left') {
          tx = '-50%';
        }
        if (key === 'bottom') {
          ty = '50%';
        }
        if (key === 'top') {
          ty = '-50%';
        }
      }
      this.badge.style.transform = `translate(${tx}, ${ty})`;
    }

  }

};

