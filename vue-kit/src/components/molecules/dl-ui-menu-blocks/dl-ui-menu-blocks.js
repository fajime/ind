import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
import dlUiClosable from '../../../directives/dl-ui-closable.js';
export default {
  name       : 'dl-ui-menu-blocks',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits      : ['mainEntryClicked', 'linkEntryClicked'],
  directives : { 'dl-ui-closable' : dlUiClosable },
  props      : {
    /** configuration of menu */
    config : {
      type    : Array,
      default : () => [],
      desc    : `Objeto de configuración de los items a mostrar`
    }
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      showContent      : false,
      entrySelected    : undefined,
      contentMaxHeight : 0,
      safeMargin       : 20
    };
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.init();
  },

  methods : {
    /** init component */
    init() {
      this.getContentMaxHeight();
    },
    /** listener for resize window event */
    resizeEventListener() {
      this.getContentMaxHeight();
    },
    /**
     * close menu
     */
    close() {
      this.showContent = false;
    },
    /**
     * get max height of content menu to not overflow page
     */
    getContentMaxHeight() {
      const screenHeight = document.body.getClientRects()[0]?.height;
      const menuHeight = this.$refs.menu.getClientRects()[0]?.height;
      const menuPosY = this.$refs.menu.getClientRects()[0]?.top;
      this.contentMaxHeight =
          screenHeight - menuPosY - menuHeight - this.safeMargin;
    },
    /**
     * event listener on main entry clicked
     * @param {Object} entry Entry config
     */
    mainEntryClicked(entry) {
      this.getContentMaxHeight();
      this.entrySelected = entry;
      if (entry.fn === undefined) {
        this.showContent = true;
      }
      else {
        entry.fn();
        this.showContent = false;
      }
      this.$emit('mainEntryClicked', entry);
    },
    /**
     * event listener on link entry clicked
     * @param {Object} entry Entry config
     */
    linkEntryClicked(entry) {
      if (entry.fn) {
        entry.fn();
      }
      else {
        // eslint-disable-next-line no-console
        console.warn(
          'The function associated with this link is not included in the node information',
          entry
        );
      }
      this.showContent = false;
      this.$emit('linkEntryClicked', entry);
    }
  },
  // DEMO META DATA
  ...metadata
};
