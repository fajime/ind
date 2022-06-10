import classObserver from '../../../mixins/classObserver';
import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-badge',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  mixins : [classObserver],
  props  : {
    /**
     * Text
     */
    text : {
      type    : String,
      default : '',
      desc    : 'Texto del badge'
    },
    /**
     * Shape type
     */
    shape : {
      type    : String,
      default : 'square',
      desc    : 'Forma (square, circle)'
    },
    /**
     * Badge position
     */
    position : {
      type    : Object,
      default : () => ({ top : 0, right : 0 }),
      desc    : 'Ajuste de posición del badge, pude utilizarse también con parámetro angle (en grados sexagesimales)'
    }
  },
  /**
   * Override
   * @override
   */
  data(props) {
    return {
      shapeValue : props.shape,
      show       : true,
      sizeMapped : {
        options : {
          parentClass : 'dl-ui-badge',
          parentRef   : 'root'
        }
      }
    };
  },
  watch : {
    /**
   * Override
   * @override
   */
    text() {
      this.setPosition();
    },

    /**
   * Override
   * @override
   */
    shape() {
      this.shapeValue = this.shape;
      this.setPosition();
    }

  },
  /**
   * Override
   * @override
   */
  mounted() {

    this.setPosition();
  },
  methods : {
    /**
   * Get dynamic size class
   * @param {Object} _classAttrValue value
   */
    onClassChange() {
      this.setPosition();
    },
    /**
   * Override
   * @override
   */
    setPosition() {

      const position = this.position;
      const box = this.$refs.box;
      const wrapper = this.$refs.wrapper;

      if (this.box) {
        wrapper.style.position = 'unset';
        box.style.position = 'unset';
        box.style.top = 'unset';
        box.style.left = 'unset';
        box.style.bottom = 'unset';
        box.style.right = 'unset';
      }

      if (this.$slots.default && box) {

        box.style.position = 'absolute';
        wrapper.style.position = 'absolute';

        if (position.angle) {
          this.setPositionAngle();
        }
        else {
          this.setPositionAbsolute();
        }
      }

    },

    /**
   * Override
   * @override
   */
    setPositionAbsolute() {
      const position = this.position;
      const box = this.$refs.box;
      const badge = this.$refs.badge;

      let tx = 0;
      let ty = 0;
      box.style.transform = 'none';

      for (const [key, value] of Object.entries(position)) {
        box.style[key] = value;

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
      badge.style.transform = `translate(${tx}, ${ty})`;
    },
    /**
   * Override
   * @override
   */
    setPositionAngle() {
      const position = this.position;
      const box = this.$refs.box;
      const wrapper = this.$refs.wrapper;
      const badge = this.$refs.badge;

      const h1 = wrapper.offsetHeight;
      const w1 = wrapper.offsetWidth;
      badge.style.transform = 'translate(-50%, -50%)';
      const ratio = w1 / 2;
      const cx = w1 / 2; //  - w2;
      const cy = h1 / 2; //  - h2;

      const pi = Math.PI;

      const x1 = ratio * Math.cos( position.angle * pi / 180);
      const y1 = ratio * Math.sin( position.angle * pi / 180);

      const x2 = cx + x1;
      const y2 = cy + y1;

      box.style.top = `${y2}px`;
      box.style.left = `${x2}px`;
    }
  },
  // DEMO META DATA
  ...metadata
};
