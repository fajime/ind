/* eslint-disable max-statements */
const appearTimeout = 300;
let __timeout;

/**
 * Generate a unique ID
 * @returns {String} Unique id string
 */
function makeId() {
  return `dl-ui-tooltip-${Date.now()}${Math.floor(Math.random() * 100000)}`;
}

/**
 * clear timeout of appear
 */
function clearTimeOut() {
  if (__timeout) {
    clearTimeout(__timeout);
    __timeout = null;
  }
}

/**
 * find XIndex value of parent element recursively
 * @param {Object} element element to analyze
 * @returns {Number} ZIndex Value
 */
function findParentZIndex(element) {
  let zIndex;
  if (element && element.tagName !== 'BODY') {
    zIndex = document.defaultView
      .getComputedStyle(element)
      .getPropertyValue('z-index');
    if (zIndex === 'auto' || zIndex === '') {
      zIndex = findParentZIndex(element.parentElement);
    }
  }
  return zIndex;
}

/**
 * add stylee config to show the element
 * @param {Object} element element to show
 */
function addShowCssStatus(element) {
  element.style.visibility = 'visible';
  element.style.opacity = '1';
}

/**
 * add stylee config to hide the element
 * @param {Object} element element to hide
 */
function addHideCssStatus(element) {
  element.style.visibility = 'hidden';
  element.style.opacity = '0';
}

/**
 * Generate tooltip in dom
 * @param {Object} el reference Element
 * @param {Object} binding binding values
 */
function createTooltip(el, binding) {
  binding.oldArg = binding.arg;
  const tooltipBox = document.createElement('div');
  const tooltipArrow = document.createElement('div');
  const tooltipText = document.createElement('span');
  const tooltipBody = document.createElement('div');
  const tooltipComponent = document.createElement('div');

  tooltipText.classList.add('tooltip-text');
  tooltipText.style.fontFamily = 'Roboto-regular';
  tooltipText.style.fontSize = '12px';
  tooltipText.style.fontWeight = '400';
  tooltipText.style.fontStyle = 'normal';
  // tooltipText.style.lineHeight = '14px';

  tooltipText.innerHTML = binding.value;

  let zIndex = findParentZIndex(el);
  if (!zIndex || zIndex === 'auto' || zIndex === '') {
    zIndex = '10';
  }
  zIndex = parseInt(zIndex, 10);
  zIndex += 10;
  zIndex = zIndex.toString();

  tooltipBox.type = 'box';
  // tooltipBox.style.wordBreak = 'break-word';
  tooltipBox.style.position = 'absolute';
  tooltipBox.style.zIndex = zIndex;
  tooltipBox.style.backgroundColor = 'var(--color-emphasis-05)';
  tooltipBox.style.color = 'var(--color-base-contrast)';
  tooltipBox.style.borderRadius = '4px';
  tooltipBox.style.minWidth = '65px';
  tooltipBox.style.width = 'fit-content';
  tooltipBox.style.textAlign = 'center';
  // tooltipBox.style.transition = 'visibility 0s, opacity 0.3s linear';

  tooltipArrow.type = 'arrow';
  tooltipArrow.style.content = '';
  tooltipArrow.style.position = 'absolute';
  tooltipArrow.style.zIndex = zIndex;
  tooltipArrow.style.borderWidth = '5px';
  tooltipArrow.style.borderStyle = 'solid';
  // tooltipArrow.style.transition = 'visibility 0s, opacity 0.3s linear';

  tooltipBox.appendChild(tooltipText);
  const idClass = makeId();
  tooltipBox.classList.add(idClass);
  tooltipArrow.classList.add(idClass);
  tooltipBody.classList.add(idClass);
  tooltipComponent.classList.add(idClass);

  el.tooltip = idClass;

  tooltipBody.style.position = 'relative';
  tooltipBody.appendChild(tooltipBox);
  tooltipBody.appendChild(tooltipArrow);
  tooltipBox.style.padding = '4px';

  tooltipComponent.style.position = 'absolute';
  tooltipComponent.style.zIndex = zIndex;

  tooltipComponent.style.width = '100%';
  tooltipComponent.style.maxWidth = '180px';
  tooltipComponent.style.transition = 'all 0s, opacity 0.3s linear';

  tooltipComponent.appendChild(tooltipBody);
  addHideCssStatus(tooltipComponent);

  const body = document.getElementsByTagName('body')[0];
  /* body.appendChild(tooltipBox);
     body.appendChild(tooltipArrow); */
  body.appendChild(tooltipComponent);

  const margin = 4;

  /**
   * Set position tooltip
   * @param {String} position tooltip position
   */
  function setPosition(position) {
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const rectArrow = tooltipArrow.getBoundingClientRect();
    const rectBox = tooltipBox.getBoundingClientRect();
    const rectEl = el.getBoundingClientRect();

    tooltipArrow.style.visibility = 'unset';
    switch (position) {
      case 'bottom':
        tooltipComponent.style.left = `${rectEl.left - rectBox.width / 2 + rectEl.width / 2 + scrollLeft}px`;
        tooltipComponent.style.top = `${rectEl.top + rectEl.height + rectArrow.height / 2 + scrollTop + margin}px`;

        tooltipArrow.style.left = `${rectBox.width / 2}px`;
        tooltipArrow.style.top = `${-rectArrow.height}px`;

        tooltipArrow.style.borderColor =
        'transparent transparent var(--color-action-primary-default) transparent';
        tooltipArrow.style.marginLeft = '-5px';
        tooltipArrow.style.marginTop = 0;
        break;
      case 'right':
        tooltipComponent.style.left = `${rectEl.left + rectEl.width + rectArrow.width / 2 + scrollLeft + margin}px`;
        tooltipComponent.style.top = `${rectEl.top - rectBox.height / 2 + rectEl.height / 2 + scrollTop}px`;

        tooltipArrow.style.left = `${-rectArrow.width}px`;
        tooltipArrow.style.top = `${rectBox.height / 2}px`;

        tooltipArrow.style.borderColor =
          'transparent var(--color-action-primary-default) transparent transparent';
        tooltipArrow.style.marginTop = '-5px';
        tooltipArrow.style.marginLeft = 0;
        break;
      case 'left':
        tooltipComponent.style.left = `${rectEl.left - rectBox.width - rectArrow.width / 2 + scrollLeft - margin}px`;
        tooltipComponent.style.top = `${rectEl.top - rectBox.height / 2 + rectEl.height / 2 + scrollTop}px`;

        tooltipArrow.style.left = `${rectBox.width}px`;
        tooltipArrow.style.top = `${rectBox.height / 2}px`;

        tooltipArrow.style.borderColor =
          'transparent transparent transparent var(--color-action-primary-default)';
        tooltipArrow.style.marginLeft = 0;
        tooltipArrow.style.marginTop = '-5px';
        break;
      case 'top-left':
        tooltipComponent.style.left = `${rectEl.left - rectBox.width - rectArrow.width / 2 + scrollLeft - margin}px`;
        tooltipComponent.style.top = `${rectEl.top - rectBox.height - rectArrow.height / 2 + scrollTop - margin}px`;

        tooltipArrow.style.left = `${rectBox.width / 2}px`;
        tooltipArrow.style.top = `${rectBox.height}px`;

        tooltipArrow.style.visibility = 'hidden';
        break;
      case 'top-right':
        tooltipComponent.style.left = `${rectEl.left + rectEl.width + rectArrow.width / 2 + scrollLeft + margin}px`;
        tooltipComponent.style.top = `${rectEl.top - rectBox.height - rectArrow.height / 2 + scrollTop - margin}px`;

        tooltipArrow.style.left = `${rectBox.width / 2}px`;
        tooltipArrow.style.top = `${rectBox.height}px`;

        tooltipArrow.style.visibility = 'hidden';
        break;
      case 'bottom-left':
        tooltipComponent.style.left = `${rectEl.left - rectBox.width - rectArrow.width / 2 + scrollLeft - margin}px`;
        tooltipComponent.style.top = `${rectEl.top + rectEl.height + rectArrow.height / 2 + scrollTop + margin}px`;

        tooltipArrow.style.left = `${rectBox.width / 2}px`;
        tooltipArrow.style.top = `${rectBox.height}px`;

        tooltipArrow.style.visibility = 'hidden';
        break;
      case 'bottom-right':
        tooltipComponent.style.left = `${rectEl.left + rectEl.width + rectArrow.width / 2 + scrollLeft + margin}px`;
        tooltipComponent.style.top = `${rectEl.top + rectEl.height + rectArrow.height / 2 + scrollTop + margin}px`;

        tooltipArrow.style.left = `${rectBox.width / 2}px`;
        tooltipArrow.style.top = `${rectBox.height}px`;

        tooltipArrow.style.visibility = 'hidden';
        break;
      case 'top':
        tooltipComponent.style.left = `${rectEl.left - rectBox.width / 2 + rectEl.width / 2 + scrollLeft}px`;
        tooltipComponent.style.top = `${rectEl.top - rectBox.height - rectArrow.height / 2 + scrollTop - margin}px`;

        tooltipArrow.style.left = `${rectBox.width / 2}px`;
        tooltipArrow.style.top = `${rectBox.height}px`;

        tooltipArrow.style.borderColor =
            'var(--color-action-primary-default) transparent transparent transparent';
        tooltipArrow.style.marginLeft = '-5px';
        tooltipArrow.style.marginTop = 0;
        break;
      default:

        break;
    }
    clearTimeOut();
    __timeout = setTimeout(() => {
      addShowCssStatus(tooltipComponent);
    }, appearTimeout);
  }

  ;

  let show = false;
  el.onmousemove = function (event) {

    const rectStage = el.getBoundingClientRect();
    const w1 = rectStage.width;
    const h1 = rectStage.height;

    const x1 = event.offsetX;
    const y1 = event.offsetY;
    let posY = 'top';
    let posX = 'left';

    if (y1 > h1 / 3 ) {
      posY = '';
    }
    if (y1 > h1 / 3 * 2) {
      posY = 'bottom';
    }
    if (x1 > w1 / 3 ) {
      posX = '';
    }
    if (x1 > w1 / 3 * 2) {
      posX = 'right';
    }

    let sep = '';
    if (posX !== '' && posY !== '') {
      sep = '-';
    }
    let position = binding.arg;
    if (position === 'auto') {
      position = posY + sep + posX;
    }
    if (show) {

      setPosition(position);
    }
  };
  el.onmouseover = function () {
    show = true;
  };
  el.onmouseleave = function () {
    show = false;
    addHideCssStatus(tooltipComponent);
    clearTimeOut();

  };

}

/**
 * Remove tooltip from dom
 * @param {Object} el reference element
 */
function removeTooltip(el) {
  const oldTooltipElements = document.getElementsByClassName(el.tooltip);
  [...oldTooltipElements].forEach(e => e.remove());
}

const dlUiTooltip = {
  /**
   * override
   * @override
   */
  beforeMount(el, binding) {
    if (binding.value && binding.value !== '') {
      createTooltip(el, binding);
    }
  },
  /**
   * override
   * @override
   */
  mounted(el) {
    // Update z-Index
    if (el.tooltip) {
      let zIndex = findParentZIndex(el);
      if (!zIndex || zIndex === 'auto' || zIndex === '') {
        zIndex = '10';
      }
      zIndex = parseInt(zIndex, 10);
      zIndex += 10;
      zIndex = zIndex.toString();
      const oldTooltipElements = document.getElementsByClassName(el.tooltip);
      for (let i = 0; i < oldTooltipElements.length; i++) {
        oldTooltipElements[i].style.zIndex = zIndex;
      }
    }
  },
  /**
   * override
   * @override
   */
  unmounted(el) {
    removeTooltip(el);
  },
  /**
   * override
   * @override
   */
  updated(el, binding) {
    /* const oldTooltipElements = document.getElementsByClassName(el.tooltip);
       if (binding.arg === binding.oldArg) {
       // Position did not change, just update innerHTML
       const tooltipText = [...oldTooltipElements].find(e => e.type === 'box').getElementsByClassName('tooltip-text');
       tooltipText[0].innerHTML = binding.value;
       }
       else {
       // When position changes, we render it all again */
    removeTooltip(el);
    if (binding.value && binding.value !== '') {
      createTooltip(el, binding);
    }
    // }
  }
};

export default dlUiTooltip;
