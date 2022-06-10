/**
 * Drop-down verticalmenu
 */
import randomIdMixin from '../../../mixins/randomId';
import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
import dlUiRipple from '../../../directives/dl-ui-ripple';

export default {
  name       : 'dl-ui-vertical-menu',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  directives : { 'dl-ui-ripple' : dlUiRipple },
  inject     : {
    onVerticalMenuAdd : {
      from    : 'onVerticalMenuAdd',
      default : undefined
    },

    onVerticalMenuRemove : {
      from    : 'onVerticalMenuRemove',
      default : undefined
    },

    onVerticalMenuActivated : {
      from    : 'onVerticalMenuActivated',
      default : undefined
    }

  },
  emits  : ['toggle'],
  mixins : [randomIdMixin],

  props : {
    /**
     * Item param
     */
    item : {
      type    : Object,
      default : null,
      desc    : ''
    },
    /**
     * Content text.
     */
    content : {
      type    : String,
      default : 'Lorem ipsum',
      desc    : 'Texto del desplegable'
    },
    /**
     * Icon ID.
     */
    icon : {
      type    : String,
      default : '',
      desc    : 'Icono que se muestra en la parte izquierda del texto de manera opcional'
    },
    /**
     * Header title
     */
    title : {
      type    : String,
      default : 'Título',
      desc    : 'Título que se muestra en la cabecera del acordeón'
    },
    /**
     * maxHeight
     */
    maxHeight : {
      type    : String,
      default : '3000px'
    }
  },
  /**
   * Override
   * @override
   */
  data(props) {
    return {
      maxheight : props.maxHeight,
      loaded    : 0
    };
  },
  methods : {
    /**
   * Override
   * @override
   */
    init() {

      setTimeout(() => {
        this.loaded = 1;
        setTimeout(() => {
          this.loaded = 2;

          if (this.item.active) {

            setTimeout(() => {
              this.$refs.label.focus();
            }, 400);

          }
        }, 10);
      }, 10);

      let h2 = this.$refs.box.offsetHeight;
      if (h2 < this.maxHeight) {
        h2 = this.maxHeight;
      }

      this.maxheight = `${h2}px`;

    },
    /**
   * Override
   * @override
   */
    handleTrigger(event) {
      event.stopPropagation();

      this.item.expand = !this.item.expand;
      setTimeout(() => {
        this.$emit('toggle', this.item);
      }, 10);

    },
    /**
   * Override
   * @override
   */
    handleClick() {

      this.item.expand = true;
      this.$emit('toggle', this.item);

      if (!this.item.expand) {
        this.maxheight = `${this.$refs.box.offsetHeight}px`;

        if (this.onVerticalMenuActivated) {
          this.onVerticalMenuActivated(this);
        }

        this.maxheight = `3000px`;

        setTimeout(() => {
          let h2 = this.$refs.box.offsetHeight;
          if (h2 < this.maxHeight) {
            h2 = this.maxHeight;
          }

          this.maxheight = `${h2}px`;
        }, 500);

      }

    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    if (this.onVerticalMenuAdd) {
      this.onVerticalMenuAdd(this);
    }

    this.init();
  },
  computed : {
    /**
       * validator value function
       * @returns {Boolean} result of validation
       */
    varStyle() {
      return {
        '--vertical-menu-max-height' : this.maxheight
      };

    },
    /**
       * validator value function
       * @returns {Boolean} result of validation
       */
    calculateSpeed() {
      const time = 1;
      return `${time}s`;
    }
  },
  /**
   * override
   * @override
   */
  beforeDestroy() {
    if (this.onVerticalMenuRemove) {
      this.onVerticalMenuRemove(this);
    }
  },
  // DEMO META DATA
  ...metadata
};
