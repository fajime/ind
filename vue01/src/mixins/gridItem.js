
import DlHlGridItem from '../components/organisms/viewerComponents/dl-hl-grid-item';
export default {
  components : {
    'dl-hl-grid-item' : DlHlGridItem
  },
  props : {
    /** layout Config */
    layoutConfig : {
      type    : Object,
      default : () => {}
    }
  },
  methods : {
    /**
     * EventListener of action event from gridItem
     *  @param {Object} event event object
     */
    gridItemAction(event) {
      this.$emit('action', event);
    }
  }
};
