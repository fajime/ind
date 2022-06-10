import dlUiClosable from '../../../directives/dl-ui-closable';
import dlUiMenuGroup from '../../molecules/dl-ui-menu-group';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-context-menu',
  directives : { 'dl-ui-closable' : dlUiClosable },
  components : {
    'dl-ui-menu-group' : dlUiMenuGroup
  },
  emits : ['itemClicked'],
  props : {
    /**
     * config menu items
     */
    config : {
      type    : Array,
      default : undefined,
      desc    : 'Configuración del menú'
    },
    /**
     * determines if context menu is associated to page document
     */
    global : {
      type    : Boolean,
      default : false
    }
  },
  watch : {
    /**
     * watch over global property
     * @param {Boolean} value new value setted
     */
    global : {
      /** override
       * @override
       */
      handler(value) {
        if (value) {
          this.bindDocumentContextMenuListener();

        }
        else {
          this.unbindDocumentContextMenuListener();
        }
      },
      immediate : true
    }
  },
  /**
   *Override
   * @override
   */
  data() {
    return {
      resizeListener              : null,
      documentContextMenuListener : null,
      pageX                       : null,
      pageY                       : null,
      visible                     : false,
      showSense                   : 'topDown'
    };
  },
  /**
   * override
   * @override
   */
  beforeUnmount() {
    this.unbindResizeListener();
    this.unbindDocumentContextMenuListener();
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.bindResizeListener();
  },
  methods : {
    /**
     * action t procedure when item with action is clicked
     */
    onActionClick() {
      this.closeByEvent();
    },
    /**
     * Show context menu
     * @param {Object} event Pointer event
     */
    show(event) {
      this.pageX = event.pageX;
      this.pageY = event.pageY;
      if (this.visible) {
        this.getCursorPosition();
      }
      else {
        this.visible = true;
      }
      event.stopPropagation();
      event.preventDefault();
    },
    /**
     * close menu by event action
     * @param {Object} event event raised
     */
    closeByEvent(event) {
      if (event?.type !== 'contextmenu' || (event?.type === 'contextmenu' && !this.global)) {
        this.visible = false;
      }
    },
    /**
     * Event when context menu appear
     */
    onEnter() {
      this.getCursorPosition();
    },
    /**
     * get cursor position
     */
    getCursorPosition() {
      let left = this.pageX + 2;
      let top = this.pageY;
      const width = this.$refs.container.$el.offsetWidth;
      const height = this.$refs.container.$el.offsetHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth ||
        document.documentElement.getElementsByTagName('body')[0].clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight ||
        document.documentElement.getElementsByTagName('body')[0].clientHeight;
      // flip
      if (left + width - document.body.scrollLeft > viewportWidth) {
        left -= width;
      }
      /* TODO: falta hacer que el menu se vea hacia la derecha cuando no cabe
         flip */
      if (top + height - document.body.scrollTop > viewportHeight) {
        top -= height;
      }
      this.showSense = (top + height - document.body.scrollTop > viewportHeight) ? 'topDown' : 'downTop';
      // fit
      if (left < document.body.scrollLeft) {
        left = document.body.scrollLeft;
      }
      // fit
      if (top < document.body.scrollTop) {
        top = document.body.scrollTop;
      }
      this.$refs.container.$el.style.left = `${left }px`;
      this.$refs.container.$el.style.top = `${top }px`;
    },
    /**
     * bind listener to document resize
     */
    bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = () => {
          if (this.visible) {
            this.closeByEvent();
          }
        };
        window.addEventListener('resize', this.resizeListener);
      }
    },
    /**
     * unbind listener to document resize
     */
    unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    },
    /**
     * bind listener to document to show menu in any place
     */
    bindDocumentContextMenuListener() {
      if (!this.documentContextMenuListener) {
        this.documentContextMenuListener = event => {
          this.show(event);
        };
        document.addEventListener('contextmenu', this.documentContextMenuListener);
      }
    },
    /**
     * unbind listener to document to show menu in any place
     */
    unbindDocumentContextMenuListener() {
      if (this.documentContextMenuListener) {
        document.removeEventListener('contextmenu', this.documentContextMenuListener);
        this.documentContextMenuListener = null;
      }
    },
    /**
     * Manage click event on items.
     * Launch item function and/or route with parameters if apply
     * Fire event itemClicked to application
     *
     * @param {Object} item Menu item clicked
     */
    onItemClicked(item) {
      this.$emit('itemClicked', item);
    }
  },
  ...metadata
};
