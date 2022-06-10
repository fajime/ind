import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-tag',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['tag-selected', 'tag-close'],
  props : {
    /** icon to shoe in tag */
    icon : {
      type    : String,
      default : undefined,
      desc    : 'icono prinicpal del tag'
    },
    /** icon to show in tag */
    text : {
      type    : String,
      default : '#tag-name',
      desc    : 'texto conetenido dentro del tag'
    },
    /** Internal value of tag */
    value : {
      type    : [String, Object],
      default : undefined,
      desc    : 'valor que representa el tag'
    },
    /** internal id of tag */
    id : {
      type    : String,
      default : undefined,
      desc    : 'identificador asociado al tag, utilizado para identificar sus eventos'
    },
    /** flag to show button close */
    closeButton : {
      type    : Boolean,
      default : false,
      desc    : 'Indica si es necesario mostrar el botón cerrar'
    },
    /** flag to show tag stroked */
    stroke : {
      type    : Boolean,
      default : false,
      desc    : 'Indica si se dibuja un borde en el tag'
    },
    /** flag to allow select the tag */
    selectable : {
      type    : Boolean,
      default : false,
      desc    : 'Indica si se pertime hacer click sobre el tag'
    }
  },
  computed : {
    /**
     * Class calculation
     * @returns {Array} list of classes for main container
     */
    containerClass() {
      return [
        {
          'dl-ui-tag--stroke'      : this.stroke,
          'dl-ui-tag--selectable'  : this.selectable,
          'dl-ui-tag--closeButton' : this.closeButton
        }
      ];
    }
  },
  methods : {
    /**
     * Emits tag-selected event
     */
    tagSelected() {
      const payload = {
        id    : this.id,
        text  : this.text,
        value : this.value,
        icon  : this.icon
      };
      if (this.selectable) {
        this.$emit('tag-selected', payload);
      }
    },
    /**
     * Emits tag-close event
     */
    closeTag() {
      const payload = {
        id    : this.id,
        text  : this.text,
        value : this.value,
        icon  : this.icon
      };
      this.$emit('tag-close', payload);
    }
  },
  // DEMO META DATA
  ...metadata
};
