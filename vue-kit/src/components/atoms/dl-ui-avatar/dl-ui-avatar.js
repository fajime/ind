import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-avatar',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  inject : {
    onAvatarAdd : {
      from    : 'onAvatarAdd',
      default : undefined
    },

    onAvatarRemove : {
      from    : 'onAvatarRemove',
      default : undefined
    },

    onAvatarActivated : {
      from    : 'onAvatarActivated',
      default : undefined
    }
  },
  props : {
    /**
     * Type of avatar
     */
    type : {
      type    : String,
      default : 'letter',
      desc    : 'Tipo de avatar (letter, icon, image)'
    },
    /**
     * Image source url
     */
    source : {
      type    : [String, Number],
      default : '',
      desc    : 'Url de la imagen'
    },
    /**
     * Shape type
     */
    shape : {
      type    : String,
      default : 'square',
      desc    : 'Forma (square, circle)'
    }
  },
  /**
   * Override
   * @override
   */
  data(props) {
    return {
      shapeValue : props.shape,
      show       : true
    };
  },
  /**
   * Override
   * @override
   */
  created() {
    if (this.onAvatarAdd) {
      this.onAvatarAdd(this);
    }
  },
  /**
   * override
   * @override
   */
  beforeDestroy() {
    if (this.onAvatarRemove) {
      this.onAvatarRemove(this);
    }
  },
  watch : {
    /**
   * Override
   * @override
   */
    shape() {
      this.shapeValue = this.shape;
    }
  },
  computed : {
    /**
     *  init component
     * @override
     */
    letters() {
      let letters = this.source;

      const n = this.source.length;
      if (n > 2) {
        const twoWords = this.source.split(' ');
        if (twoWords.length > 1) {
          letters = twoWords[0].substr(0, 1) + twoWords[1].substr(0, 1);
        }

        return letters.substr(0, 2).toUpperCase();
      }

      return letters;
    }
  },

  methods : {
  /**
   * set Shape
   * @override
   */
    setShape(value) {
      this.shapeValue = value;
    },
    /**
   * set Hide
   * @override
   */
    setHide() {
      this.show = false;
    }
  },
  ...metadata
};
