/* eslint-disable no-invalid-this */
import _debounce from './debounce.js';
import TapDetector from './TapDetector';
import DlUiActionButton from '../../atoms/dl-ui-action-button';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-image-viewer',
  components : {
    'dl-ui-action-button' : DlUiActionButton
  },
  emits : ['scale'],
  props : {
    /** minScale */
    minScale : {
      type    : Number,
      default : 1,
      desc    : 'Escala mímina que se permite de la imagen'
    },
    /** maxScale */
    maxScale : {
      type    : Number,
      default : 5,
      desc    : 'Escala máxima que se permite de la imagen'
    },
    /** hideControls */
    hideControls : {
      type    : Boolean,
      default : true,
      desc    : 'Oculta los controles pasados unos segundos'
    },
    /** hideControls */
    hideControlsTime : {
      type    : Number,
      default : 1500,
      desc    : 'Tiempo en ms para ocultar los controles cuando el ratón se aleja'
    },
    /** hideControls */
    showPreview : {
      type    : Boolean,
      default : true,
      desc    : 'Muestra unpequeño recuadro con la previsualización de la imagen, la posición y tamaño de la imagen'
    },
    /** backgroundColor */
    backgroundColor : {
      type    : String,
      default : 'transparent',
      desc    : 'Color de fondo de la imagen cuando la imagen es transparente o no cuadra con la proporción del contenedor'
    },
    /** pivot */
    pivot : {
      type    : String,
      default : 'cursor',
      /**
       * override
       * @override
       */
      validator(value) {
        // value must be single o range
        return ['cursor', 'center'].indexOf(value) !== -1;
      },
      desc : 'punto sobre el cual realizar el zoom y el ajuste'
    },
    /** zoomingElastic */
    zoomingElastic : {
      type    : Boolean,
      default : true,
      desc    : 'permite realizar el zoom de forma suave'
    },
    /** limitTranslation */
    limitTranslation : {
      type    : Boolean,
      default : true,
      desc    : 'limita la traslación de la imagen'
    },
    /** doubleClickToZoom */
    doubleClickToZoom : {
      type    : Boolean,
      default : true,
      desc    : 'Permitir hacer zoom con doble click del ratón'
    },
    /** mouseWheelToZoom */
    mouseWheelToZoom : {
      type    : Boolean,
      default : true,
      desc    : 'Permitir hacer zoom con la rueda del ratón'
    }
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      /* Container sizes, used to set the initial zoom container size.
         Need to reactive to window resizing. */
      containerWidth     : 1, // width of container
      containerHeight    : 1, // height of container
      containerLeft      : 0, // position on x of container
      containerTop       : 0, // position on y of container
      containerCenterX   : 0, // position of center of container on x
      containerCenterY   : 0, // position of center of container on y
      /* Store values: Interactions will at last change these values.
         After rotation or resize, these values will keep still.
         These three values are all relative to the container size. */
      translateX         : 0,
      animTranslateX     : 0,
      translateY         : 0,
      animTranslateY     : 0,
      scale              : 1,
      animScale          : 1,
      // Mouse states
      lastFullWheelTime  : 0,
      lastWheelTime      : 0,
      lastWheelDirection : 'y',
      isPointerDown      : false,
      pointerPosX        : -1,
      pointerPosY        : -1,
      twoFingerInitDist  : 0,
      panLocked          : true,
      mouseIn            : false,
      mouseOutTimer      : undefined,
      // Others
      pivotType          : undefined,
      reqAnimFrame       : null,
      tapDetector        : null
    };
  },
  computed : {
    /**
     * get stryle string to aplly in wrapper image
     * @returns {String}  stryle
     */
    wrapperStyle() {
      const translateX = this.containerWidth * this.animTranslateX;
      const translateY = this.containerHeight * this.animTranslateY;
      return {
        transform : [
          `translate(${translateX}px, ${translateY}px)`,
          `scale(${this.animScale})`
        ].join(' ')
      };
    },
    /**
     * get style string to apply in wrapper image
     * @returns {String}  style
     */
    previewStyle() {
      let previewHeight = 0;
      let previewWidth = 0;
      if (this.$refs.preview) {
        previewHeight = this.$refs.preview.getBoundingClientRect().height;
        previewWidth = this.$refs.preview.getBoundingClientRect().width;
      }
      const maxTranslatePreviewX = (previewWidth / this.animScale) * 2;
      const minTranslatePreviewX = -1 * (previewWidth / this.animScale) * 2;
      let translatePreviewX =
        previewWidth * (this.translateX / this.animScale) * -1;
      translatePreviewX = Math.max(translatePreviewX, minTranslatePreviewX);
      translatePreviewX = Math.min(translatePreviewX, maxTranslatePreviewX);

      const maxTranslatePreviewY = (previewHeight / this.animScale) * 2;
      const minTranslatePreviewY = -1 * (previewHeight / this.animScale) * 2;
      let translatePreviewY =
        previewHeight * (this.translateY / this.animScale) * -1;
      translatePreviewY = Math.max(translatePreviewY, minTranslatePreviewY);
      translatePreviewY = Math.min(translatePreviewY, maxTranslatePreviewY);

      const scale = Math.min(1 / this.animScale, 1);
      return {
        transform : [
          `translate(${translatePreviewX}px, ${translatePreviewY}px)`,
          `scale(${scale})`
        ].join(' ')
      };
    },
    /**
     * get flag to show or hide controls
     * @returns {Boolean} flag
     */
    showControls() {
      return !this.hideControls || this.mouseIn;
    }
  },
  watch : {
    /**
     * watch over scale
     * @param {Number} val  new value
     */
    scale(val) {
      if (val !== 1) {
        this.panLocked = false;
      }
      this.$emit('scale', val);
    },
    /**
     * watch over pivot
     * @param {Number} val  new value
     */
    pivot(val) {
      this.pivotType = val;
    }
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.pivotType = this.pivot;
    this.tapDetector = new TapDetector();
    this.tapDetector.attach(this.$el);
    if (this.doubleClickToZoom) {
      this.tapDetector.onDoubleTap(this.onDoubleTap);
    }
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize();
    this.refreshContainerPos();
    this.loop();
  },
  /**
   * override
   * @override
   */
  destroyed() {
    this.tapDetector.detach(this.$el);
    window.removeEventListener('resize', this.onWindowResize);
    window.cancelAnimationFrame(this.reqAnimFrame);
  },
  methods : {
    /**
     * reset component
     */
    reset() {
      this.scale = 1;
      this.panLocked = true;
      this.translateX = 0;
      this.translateY = 0;
    },
    /**
     * Do zoom in
     * @param {Number} scale  new scale, default 2
     */
    zoomIn(scale = 2) {
      this.pivotType = 'center';
      this.tryToScale(scale);
      this.onInteractionEnd();
      this.pivotType = 'cursor';
    },
    /**
     * Do zoom out
     * @param {Number} scale  new scale, default 0.5
     */
    zoomOut(scale = 0.5) {
      this.pivotType = 'center';
      this.tryToScale(scale);
      this.onInteractionEnd();
      this.pivotType = 'cursor';
    },
    /**
     * Main Logic --------------------------------------------------------------
     * scale
     * Zoom the image with the point at the pointer(mouse or pinch center) pinned.
     * Simplify: This can be regard as vector pointer to old-image-center scaling.
     * @param {Number} scaleDelta  new scale delta to apply
     */
    tryToScale(scaleDelta) {
      let newScale = this.scale * scaleDelta;
      if (this.zoomingElastic) {
        // damping
        if (newScale < this.minScale || newScale > this.maxScale) {
          let log = Math.log2(scaleDelta);
          log *= 0.2;
          scaleDelta = Math.pow(2, log);
          newScale = this.scale * scaleDelta;
        }
      }
      else if (newScale < this.minScale) {
        newScale = this.minScale;
      }
      else if (newScale > this.maxScale) {
        newScale = this.maxScale;
      }
      scaleDelta = newScale / this.scale;
      this.scale = newScale;
      if (this.pivotType !== 'center') {
        const normMousePosX =
          (this.pointerPosX - this.containerLeft) / this.containerWidth;
        const normMousePosY =
          (this.pointerPosY - this.containerTop) / this.containerHeight;
        this.translateX =
          (0.5 + this.translateX - normMousePosX) * scaleDelta +
          normMousePosX -
          0.5;
        this.translateY =
          (0.5 + this.translateY - normMousePosY) * scaleDelta +
          normMousePosY -
          0.5;
      }
    },
    /**
     * set pointer values in the middle of the image
     */
    setPointerPosCenter() {
      this.pointerPosX = this.containerLeft + this.containerWidth / 2;
      this.pointerPosY = this.containerTop + this.containerHeight / 2;
    },
    /**
     * event when mouse pinter moves
     * @param {Number} newMousePosX  new position in X axle
     * @param {Number} newMousePosY  new position in Y axle
     */
    onPointerMove(newMousePosX, newMousePosY) {
      if (this.isPointerDown) {
        const pixelDeltaX = newMousePosX - this.pointerPosX;
        const pixelDeltaY = newMousePosY - this.pointerPosY;
        if (!this.panLocked) {
          this.translateX += pixelDeltaX / this.containerWidth;
          this.translateY += pixelDeltaY / this.containerHeight;
        }
      }
      this.pointerPosX = newMousePosX;
      this.pointerPosY = newMousePosY;
    },
    onInteractionEnd : _debounce(function () {
      this.limit();
      this.panLocked = this.scale === 1;
    }, 100),
    /** limit the scale between max and min and the translate within the viewport */
    limit() {
      // scale
      if (this.scale < this.minScale) {
        this.scale = this.minScale;
        /* FIXME this sometimes will not reset when pinching in
           this.tryToScale(this.minScale / this.scale) */
      }
      else if (this.scale > this.maxScale) {
        this.tryToScale(this.maxScale / this.scale);
      }
      // translate
      if (this.limitTranslation) {
        const translateLimit = this.calcTranslateLimit();
        if (Math.abs(this.translateX) > translateLimit.x) {
          this.translateX *= translateLimit.x / Math.abs(this.translateX);
        }
        if (Math.abs(this.translateY) > translateLimit.y) {
          this.translateY *= translateLimit.y / Math.abs(this.translateY);
        }
      }
    },
    /**
     * calculate limit of translate
     * @returns {Object} coordinates
     */
    calcTranslateLimit() {
      if (this.getMarginDirection() === 'y') {
        const imageToContainerRatio1 =
          parseFloat(this.containerWidth) / parseFloat(this.containerHeight);
        let translateLimitY = (this.scale * imageToContainerRatio1 - 1) / 2;
        if (translateLimitY < 0) {
          translateLimitY = 0;
        }
        return {
          x : (this.scale - 1) / 2,
          y : translateLimitY
        };
      }
      else {
        const imageToContainerRatio2 =
          parseFloat(this.containerHeight) / parseFloat(this.containerWidth);
        let translateLimitX = (this.scale * imageToContainerRatio2 - 1) / 2;
        if (translateLimitX < 0) {
          translateLimitX = 0;
        }
        return {
          x : translateLimitX,
          y : (this.scale - 1) / 2
        };
      }
    },
    /**
     * get margin direction
     * @returns {String} coordinate
     */
    getMarginDirection() {
      const containerRatio = this.containerWidth / this.containerHeight;
      return containerRatio > 1 ? 'x' : 'y';
    },
    /**
     * event when user do double tap
     * @param {Object} ev  event
     */
    onDoubleTap(ev) {
      if (this.scale === 1) {
        if (ev.clientX > 0) {
          this.pointerPosX = ev.clientX;
          this.pointerPosY = ev.clientY;
        }
        this.tryToScale(Math.min(3, this.maxScale));
      }
      else {
        this.reset();
      }
      this.onInteractionEnd();
    },
    /**
     * event when user change window size
     * @param {Number} newMousePosX  new position in X axle
     * @param {Number} newMousePosY  new position in Y axle
     */
    onWindowResize() {
      const styles = window.getComputedStyle(this.$el);
      this.containerWidth = parseFloat(styles.width);
      this.containerHeight = parseFloat(styles.height);
      this.containerCenterX = this.containerLeft + this.containerWidth / 2;
      this.containerCenterY = this.containerTop + this.containerHeight / 2;
      this.setPointerPosCenter();
      this.limit();
    },
    /** update container positions */
    refreshContainerPos() {
      const rect = this.$el.getBoundingClientRect();
      this.containerLeft = rect.left;
      this.containerTop = rect.top;
      this.containerCenterX = this.containerLeft + this.containerWidth / 2;
      this.containerCenterY = this.containerTop + this.containerHeight / 2;
    },
    /**
     * loop over request animation frame
     */
    loop() {
      this.animScale = this.gainOn(this.animScale, this.scale);
      this.animTranslateX = this.gainOn(this.animTranslateX, this.translateX);
      this.animTranslateY = this.gainOn(this.animTranslateY, this.translateY);
      this.reqAnimFrame = window.requestAnimationFrame(this.loop);
    },
    /**
     * do increment
     * @param {Number} from from value
     * @param {Number} to to value
     * @returns {Number} new value
     */
    gainOn(from, to) {
      const delta = (to - from) * 0.3;
      if (Math.abs(delta) > 1e-5) {
        return from + delta;
      }
      else {
        return to;
      }
    },
    /**
     * Mouse Events ------------------------------------------------------------
     * Mouse wheel scroll,  TrackPad pinch or TrackPad scroll
     * @param {Object} ev native event
     */
    onMouseWheel(ev) {
      if (!this.mouseWheelToZoom) {
        return;
      }
      // prevent is used to stop the page scroll elastic effects
      ev.preventDefault();
      if (ev.detail) {
        ev.wheelDelta = ev.detail * -10;
      }
      const currTime = Date.now();
      if (Math.abs(ev.wheelDelta) === 120) {
        // Throttle the TouchPad pinch on Mac, or it will be too sensitive
        if (currTime - this.lastFullWheelTime > 50) {
          this.onMouseWheelDo(ev.wheelDelta);
          this.lastFullWheelTime = currTime;
        }
      }
      else {
        if (
          currTime - this.lastWheelTime > 50 &&
          typeof ev.deltaX === 'number'
        ) {
          this.lastWheelDirection =
            ev.detail === 0 && Math.abs(ev.deltaX) > Math.abs(ev.deltaY)
              ? 'x'
              : 'y';
        }
        if (this.lastWheelDirection === 'y') {
          this.onMouseWheelDo(ev.wheelDelta);
        }
      }
      this.lastWheelTime = currTime;
    },
    /**
     * action to perform when mouse wheel change
     * @param {Number} wheelDelta wheel change
     */
    onMouseWheelDo(wheelDelta) {
      // Value basis: One mouse wheel (wheelDelta=+-120) means 1.25/0.8 scale.
      const scaleDelta = Math.pow(1.25, wheelDelta / 120);
      this.tryToScale(scaleDelta);
      this.onInteractionEnd();
    },
    /**
     * listener to mouse down
     * @param {Object} ev native event
     */
    onMouseDown(ev) {
      this.refreshContainerPos();
      this.isPointerDown = true;
      /* Open the context menu then click other place will skip the mousemove events.
         This will cause the pointerPosX/Y NOT sync, then we will need to fix it on mousedown event. */
      this.pointerPosX = ev.clientX;
      this.pointerPosY = ev.clientY;
    },
    /**
     * listener to mouse up
     */
    onMouseUp() {
      this.isPointerDown = false;
      this.onInteractionEnd();
    },
    /**
     * listener to mouse move
     * @param {Object} ev native event
     */
    onMouseMove(ev) {
      this.onPointerMove(ev.clientX, ev.clientY);
    },
    /**
     * listener to mouse move
     * @param {Object} ev native event
     */
    onMouseOut(ev) {
      this.onMouseMove(ev);
    },
    /**
     * listener to mouse move in of container
     * @param {Object} ev native event
     */
    onMouseInContainer() {
      this.mouseIn = true;
      clearTimeout(this.mouseOutTimer);
    },
    /**
     * listener to mouse move out of container
     * @param {Object} ev native event
     */
    onMouseOutContainer() {
      this.mouseOutTimer = setTimeout(() => {
        this.mouseIn = false;
      }, this.hideControlsTime);
    },
    /**
     * listener to touch start event
     * @param {Object} ev native event
     */
    onTouchStart(ev) {
      if (ev.touches.length === 1) {
        this.refreshContainerPos();
        this.pointerPosX = ev.touches[0].clientX;
        this.pointerPosY = ev.touches[0].clientY;
        this.isPointerDown = true;
      }
      else if (ev.touches.length === 2) {
        this.isPointerDown = true;
        // pos
        this.pointerPosX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
        this.pointerPosY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
        // dist
        const distX = ev.touches[0].clientX - ev.touches[1].clientX;
        const distY = ev.touches[0].clientY - ev.touches[1].clientY;
        this.twoFingerInitDist = Math.sqrt(distX * distX + distY * distY);
      }
    },
    /**
     * listener to touch end event
     * @param {Object} ev native event
     */
    onTouchEnd(ev) {
      if (ev.touches.length === 0) {
        this.isPointerDown = false;
        // Near 1 to set 1
        if (Math.abs(this.scale - 1) < 0.1) {
          this.scale = 1;
        }
        this.onInteractionEnd();
      }
      else if (ev.touches.length === 1) {
        this.pointerPosX = ev.touches[0].clientX;
        this.pointerPosY = ev.touches[0].clientY;
      }
    },
    /**
     * listener to touch move event
     * @param {Object} ev native event
     */
    onTouchMove(ev) {
      if (ev.touches.length === 1) {
        this.onPointerMove(ev.touches[0].clientX, ev.touches[0].clientY);
      }
      else if (ev.touches.length === 2) {
        // pos
        const newMousePosX =
          (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
        const newMousePosY =
          (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
        this.onPointerMove(newMousePosX, newMousePosY);
        this.pointerPosX = newMousePosX;
        this.pointerPosY = newMousePosY;
        // dist
        const distX = ev.touches[0].clientX - ev.touches[1].clientX;
        const distY = ev.touches[0].clientY - ev.touches[1].clientY;
        const newTwoFingerDist = Math.sqrt(distX * distX + distY * distY);
        this.tryToScale(newTwoFingerDist / this.twoFingerInitDist);
        this.twoFingerInitDist = newTwoFingerDist;
      }
    }
  },
  // DEMO META DATA
  ...metadata
};
