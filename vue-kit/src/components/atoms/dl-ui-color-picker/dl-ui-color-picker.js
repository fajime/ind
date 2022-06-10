import randomIdMixin from '../../../mixins/randomId';
import DlUiButton from '../../atoms/dl-ui-button';

import metadata from './_metadata';
/**
 * checkbox to use in forms
 */
export default {
  name       : 'dl-ui-color-picker',
  components : { 'dl-ui-button' : DlUiButton },
  emits      : ['update:modelValue'],
  mixins     : [randomIdMixin],
  props      : {
    /**
     * Set init value.
     */
    modelValue : {
      type    : String,
      default : '',
      desc    : 'Propiedad que representa el valor del color seleccionado'
    },
    /**
     * Set init value.
     */
    size : {
      type    : Number,
      default : 300,
      desc    : 'Propiedad que representa las dimensiones del selector'
    },
    /**
     * Set init value.
     */
    inLine : {
      type    : Boolean,
      default : false,
      desc    : ''
    },
    /**
     * Set init color format.
     */
    format : {
      type    : String,
      default : 'rgba',
      desc    : 'Formato del color',
      // eslint-disable-next-line require-jsdoc
      validator(value) {
        return ['rgba', 'hsla', 'hex'].includes(value);
      }
    },
    /**
     * Atribbute for translations
     */
    lang : {
      type    : Object,
      default : () => ({
        'colorSelected' : 'Selected color'
      }),
      desc : 'Translation object'
    }
  },

  /**
   * Override
   * @override
   */
  data() {
    return {
      colorBlockWidth  : 0,
      colorBlockHeight : 0,
      colorStripHeight : 0,
      colorStripWidth  : 30,
      drag             : false,
      x                : 0,
      y                : 0,
      rgbaColor        : 'rgba(255,0,0,1)',
      hslaColor        : '0,100,50,1',
      hexColor         : 'ff0000',
      labelText        : '',
      colorFormat      : ''
    };
  },

  computed : {
    /**
     * Container style
     * @returns {Array} height and width
     */
    dimensionsCanvasContainer() {
      return {
        height : `${this.size}px`,
        width  : `${this.size}px`
      };
    },
    /**
     * Color canvas
     * @returns {Array} Ref to color canvas
     */
    colorBlock() {
      return this.$refs.colorBlock;
    },
    /**
     * Canvas context
     * @returns {Array} color canvas context
     */
    ctxColorBlock() {
      return this.colorBlock.getContext('2d');
    },
    // /**
    //  * Strip canvas
    //  * @returns {Array} strip canvas context
    //  */
    // colorStrip() {
    //   return this.$refs.colorStrip;
    // },
    /**
     * Canvas context
     * @returns {Array} strip canvas context
     */
    ctxColorStrip() {
      return this.$refs.colorStrip.getContext('2d');
    },
    /**
     * Color selector slider
     * @returns {Array} ref to range
     */
    colorRange() {
      return this.$refs.colorRange;
    },
    /**
     * Tranparency selector slider
     * @returns {Array} ref to range
     */
    alphaRange() {
      return this.$refs.alphaRange;
    },
    /**
     * Selected color box
     * @returns {Array} ref to div
     */
    colorBox() {
      return this.$refs.colorBox;
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.colorBlockWidth = this.colorBlock.width;
    this.colorBlockHeight = this.colorBlock.height;
    this.colorStripHeight = this.colorBlock.width;
    this.$el.style.setProperty('--size', `${this.size}px`);
    this.init();
  },

  methods : {
    /**
     * init - fill color block & color strip
     */
    init() {
      this.ctxColorBlock.rect(0, 0, this.colorBlockWidth, this.colorBlockHeight);
      this.ctxColorStrip.rect(0, 0, this.colorStripWidth, this.colorStripHeight);
      this.fillGradient();
      this.fillStrip();
    },
    /**
     * Fill gradient B&W block
     */
    fillGradient() {
      this.ctxColorBlock.fillStyle = this.rgbaColor;
      this.ctxColorBlock.fillRect(0, 0, this.colorBlockWidth, this.colorBlockHeight);

      const grdWhite = this.ctxColorStrip.createLinearGradient(0, 0, this.colorBlockWidth, 0);
      grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
      grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
      this.ctxColorBlock.fillStyle = grdWhite;
      this.ctxColorBlock.fillRect(0, 0, this.colorBlockWidth, this.colorBlockHeight);

      const grdBlack = this.ctxColorStrip.createLinearGradient(0, 0, 0, this.colorBlockHeight);
      grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
      grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
      this.ctxColorBlock.fillStyle = grdBlack;
      this.ctxColorBlock.fillRect(0, 0, this.colorBlockWidth, this.colorBlockHeight);
    },
    /**
     * Fill gradient color strip
     */
    fillStrip() {
      const grd1 = this.ctxColorStrip.createLinearGradient(0, 0, 0, this.colorBlockHeight);
      grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
      grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
      grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
      grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
      grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
      grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
      grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
      this.ctxColorStrip.fillStyle = grd1;
      this.ctxColorStrip.fill();
    },
    // /**
    //  * Click
    //  * @param {Event} e click event
    //  */
    // click(e) {
    //   this.x = e.offsetX;
    //   this.y = e.offsetY;
    //   /* For every pixel in an ImageData object there are four pieces of information, the RGBA values */
    //   const imageData = this.ctxColorStrip.getImageData(this.x, this.y, 1, 1).data;
    //   this.rgbaColor = `rgba(${ imageData[0] },${ imageData[1] },${ imageData[2] },${imageData[3]})`;
    //   this.hslaColor = this.rgbaToHsla(imageData[0], imageData[1], imageData[2], imageData[3]);
    //   this.hexColor = this.rgbaToHex(imageData[0], imageData[1], imageData[2], imageData[3]);
    //   this.fillGradient();
    // },
    /**
     * Forced click
     * @param {String} y position y
     * @param {Boolean} renderGradient wether to render or not the gradient again
     */
    clickForced(y, renderGradient) {
      const x = 1;
      const imageData = this.ctxColorStrip.getImageData(x, y, 1, 1).data;
      this.rgbaColor = `rgba(${ imageData[0] },${ imageData[1] },${ imageData[2] }, ${this.alphaRange.value})`;
      this.hslaColor = this.rgbaToHsla(imageData[0], imageData[1], imageData[2], this.alphaRange.value);
      this.hexColor = this.rgbaToHex(imageData[0], imageData[1], imageData[2], this.alphaRange.value);
      if (renderGradient) {
        this.fillGradient();
      }
    },
    /**
     * Change color
     * @param {Event} e event
     */
    changeColor(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      const imageData = this.ctxColorBlock.getImageData(this.x, this.y, 1, 1).data;
      this.rgbaColor = `rgba(${ imageData[0] },${ imageData[1] },${ imageData[2] },${this.alphaRange.value})`;
      this.hslaColor = this.rgbaToHsla(imageData[0], imageData[1], imageData[2], this.alphaRange.value);
      this.hexColor = this.rgbaToHex(imageData[0], imageData[1], imageData[2], this.alphaRange.value);
      this.updateLabel();
      this.$emit('update:modelValue', this.colorFormat);
    },
    /**
     * Mouse down
     * @param {Event} e  event
     */
    mousedown(e) {
      this.drag = true;
      this.changeColor(e);
    },
    /**
     * Mouse move
     * @param {Event} e  event
     */
    mousemove(e) {
      if (this.drag) {
        this.changeColor(e);
      }
    },
    /**
     * Mouse up
     * @param {Event} e  event
     */
    mouseup() {
      this.drag = false;
    },
    /**
     * Capture the input event on input range and emit the event itself.
     * @param {event} event The native input event.
     */
    onInputColorRange(event) {
      // This assigns the strength of the color to a CSS variable, which will in turn style the slider.
      this.colorRange.style.setProperty( '--thumb-color', `hsla(${this.colorRange.value},100%,50%,1)`);
      const hue = event.target.value;
      const y = hue * this.colorStripHeight / 360;
      this.onInputAlphaRange(event);
      this.updateLabel();
      this.clickForced(y, true);
      this.$emit('update:modelValue', this.colorFormat);
    },
    /**
     * Capture the input event on input range and emit the event itself.
     * @param {event} event The native input event.
     */
    onInputAlphaRange(event) {
      this.alphaRange.style.setProperty('--thumb-alpha', `hsla(${this.colorRange.value},100%,50%,${this.alphaRange.value})`);
      this.alphaRange.style.setProperty('--alpha-g1', `hsla(${this.colorRange.value},100%,50%,0)`);
      this.alphaRange.style.setProperty('--alpha-g2', `hsla(${this.colorRange.value},100%,50%,1)`);
      const hue = event.target.value;
      const y = hue * this.colorStripHeight / 360;
      this.rgbaColor = this.hslaToRgba(this.colorRange.value, 100, 50, this.alphaRange.value);
      this.hslaColor = `hsla(${this.colorRange.value},100%,50%,${this.alphaRange.value})`;
      this.hexColor = this.hslaToHex(this.colorRange.value, 100, 50, this.alphaRange.value);
      this.updateLabel();
      this.clickForced(y, false);
      this.$emit('update:modelValue', this.colorFormat);
    },

    /**
     * Update color selected label and box.
     */
    updateLabel() {
      this.colorBox.style.backgroundColor = this.rgbaColor;
      if (this.format === 'hsla') {
        // this.hslaColor = this.rgbaToHsla(this.rgbaColor);
        this.labelText = this.hslaColor;
        this.colorFormat = this.hslaColor;
      }
      else if (this.format === 'hex') {
        // this.hexColor = this.rgbaToHex(this.rgbaColor);
        this.labelText = this.hexColor;
        this.colorFormat = this.hexColor;
      }
      else {
        this.labelText = this.rgbaColor;
        this.colorFormat = this.rgbaColor;
      }
    },

    /**
     * rgba to hsla
     * @param {String} r red
     * @param {String} g green
     * @param {String} b blue
     * @param {String} a transparency
     * @returns {String} hsla color
    */
    rgbaToHsla(r, g, b, a) {
      // Make r, g, and b fractions of 1
      r /= 255;
      g /= 255;
      b /= 255;
      // Find greatest and smallest channel values
      const cmin = Math.min(r, g, b);
      const cmax = Math.max(r, g, b);
      const delta = cmax - cmin;
      let h = 0;
      let s = 0;
      let l = 0;
      /* Calculate hue
          No difference */
      if (delta === 0) {
        h = 0;
      }
      // Red is max
      else if (cmax === r) {
        h = ((g - b) / delta) % 6;
      }
      // Green is max
      else if (cmax === g) {
        h = (b - r) / delta + 2;
      }
      // Blue is max
      else {
        h = (r - g) / delta + 4;
      }
      h = Math.round(h * 60);
      // Make negative hues positive behind 360°
      if (h < 0) {
        h += 360;
      }
      // Calculate lightness
      l = (cmax + cmin) / 2;
      // Calculate saturation
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      // Multiply l and s by 100
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);

      return `hsla(${ h },${ s }%,${ l }%,${ a })`;
    },

    /**
     *  hsla to rgba
     * @param {String} h hue
     * @param {String} s saturation
     * @param {String} l lightness
     * @param {String} a transparency
     * @returns {String} hsla color
    */
    hslaToRgba(h, s, l, a) {
      /* Must be fractions of 1 */
      s /= 100;
      l /= 100;

      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0;
      let g = 0;
      let b = 0;

      if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
      }
      else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
      }
      else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
      }
      else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
      }
      else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
      }
      else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);

      return `rgba(${ r },${ g },${ b },${ a })`;
    },

    /**
     *  hsla to hex
     * @param {String} h hue
     * @param {String} s saturation
     * @param {String} l lightness
     * @param {String} a transparency
     * @returns {String} hex color
    */
    hslaToHex(h, s, l, a) {
      s /= 100;
      l /= 100;

      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h / 60) % 2 - 1));
      const m = l - c / 2;
      let r = 0;
      let g = 0;
      let b = 0;

      if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
      }
      else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
      }
      else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
      }
      else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
      }
      else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
      }
      else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      // Having obtained RGB, convert channels to hex
      r = Math.round((r + m) * 255).toString(16);
      g = Math.round((g + m) * 255).toString(16);
      b = Math.round((b + m) * 255).toString(16);
      a = Math.round(a * 255).toString(16);

      if (r.length === 1) {
        r = `0${ r}`;
      }
      if (g.length === 1) {
        g = `0${ g}`;
      }
      if (b.length === 1) {
        b = `0${ b}`;
      }
      if (a.length === 1) {
        a = `0${ a}`;
      }
      return `#${ r }${g }${b }`;
    },

    /**
     * rgba to hex
     *  @param {String} r red
     * @param {String} g green
     * @param {String} b blue
     * @param {String} a transparency
     * @returns {String} hex color
    */
    rgbaToHex(r, g, b, a) {
      r = r.toString(16);
      g = g.toString(16);
      b = b.toString(16);
      a = Math.round(a * 255).toString(16);

      if (r.length === 1) {
        r = `0${r}`;
      }
      if (g.length === 1) {
        g = `0${g}`;
      }
      if (b.length === 1) {
        b = `0${b}`;
      }
      if (a.length === 1) {
        a = `0${a}`;
      }
      return `#${r}${g}${b}`;
    }

  },
  // DEMO META DATA
  ...metadata
};
