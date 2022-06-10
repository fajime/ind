import classObserver from '../../../mixins/classObserver';
import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
import DlUiTabDefault from './com/dl-ui-tab-default';

export default {
  name       : 'dl-ui-tabs',
  components : {
    'dl-ui-icon'        : DlUiIcon,
    'dl-ui-tab-default' : DlUiTabDefault
  },
  mixins : [classObserver],
  emits  : ['tab-selected', 'tab-remove', 'tab-add'],
  props  : {
    /** tab index selected on start */
    initTabIndex : {
      type    : Number,
      default : 0,
      desc    : 'Indice de tab que aparece'
    },
    /** style mode [ default / window ] */
    mode : {
      type    : String,
      default : undefined,
      desc    : 'Estilo de tab'
    },
    /** closable button */
    allowAdd : {
      type    : Boolean,
      default : false,
      desc    : 'Botón para agregar tabs'
    }
  },
  /**
   * override
   * @override
   */
  provide() {
    return {
      onTabAdd    : this.onTabAdd,
      onTabRemove : this.onTabRemove
    };
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      keyAttribute : 'key',
      tabs         : [],
      tabActive    : 0,
      sizeMapped   : {
        options : {
          parentClass : 'dl-ui-tabs',
          parentRef   : 'root'
        },
        transform : [
          {
            parent   : 'default',
            children : [
              { name : 'icon', type : 'icon', size : 'medium' },
              { name : 'clear', type : 'icon', size : 'medium' }
            ]
          },
          {
            parent   : 'large',
            children : [
              { name : 'icon', type : 'icon', size : 'large' }
            ]
          },
          {
            parent   : 'small',
            children : [
              { name : 'icon', type : 'icon', size : 'small' }
            ]
          },
          {
            parent   : 'extra-small',
            children : [
              { name : 'icon', type : 'icon', size : 'small' },
              { name : 'clear', type : 'icon', size : 'small' }
            ]
          }
        ]
      }
    };
  },

  watch : {
    /**
     * Check tabActive value changes
     * @param {Number} newValue new value
     * @param {Number} oldValue old value
     * @emits tab-selected - Emits 'tab-selected' event
     */
    tabActive(newValue, oldValue) {
      if (this.tabs[oldValue]) {
        this.tabs[oldValue].tab.isActive = false;
      }

      if (this.tabs[newValue]) {
        this.tabs[newValue].tab.isActive = true;
        this.$emit('tab-selected', newValue);
      }

    },
    /**
     * Check tabs elements
     */
    tabs() {
      if (this.tabs.length > 0) {
        const maxIndex = this.tabs.length - 1;
        if (this.tabActive > maxIndex) {
          this.tabActive = maxIndex;
        }
        this.tabs[this.tabActive].tab.isActive = true;
      }
    }
  },
  computed : {
  /**
   * Override
   * @override
   */
    alltabs() {
      return this.tabs.filter(t => !t.removed);
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.componentsInSlot = this.$slots.default();
  },
  methods : {
    /**
     * get mode props
     * @returns {String} mode
     */
    getMode() {
      let mode = this.mode;
      if (!mode || mode === '') {
        mode = 'default';
      }
      return mode;
    },
    /**
     * set tab as selected
     * @param {Number} selectedTab Index tab number
     */
    selectTab(selectedTab) {
      this.tabActive = selectedTab;
    },
    /**
     * event to add a new tab
     * @param {Object} tab tab to add
     */
    onTabAdd(tab) {
      const index = this.tabs.length;
      const id = Math.ceil( Math.random() * 10000 );
      this.tabs.push({ tab, index, id, closable : tab.closable, removed : false });
      if (tab.selected) {
        this.tabActive = index;
      }

      this.setSelected();
    },
    /**
     * event to remove a tab
     * @param {Object} tab tab to add
     */
    onTabRemove(tab) {
      const index = this.tabs.findIndex(element => element.tab === tab);
      this.removeTab(index);
    },
    /**
     * action remove tab
     * @param {Number} index tab index position
     */
    removeTab(index) {
      this.tabs[index].removed = true;
      this.tabs[index].tab.isActive = false;

      const n = this.tabs.length;
      if (this.tabActive === index) {

        for (let i = index; i < n; i++) {
          if (!this.tabs[i].removed) {
            this.tabActive = i;
          }
        }

        if (this.tabActive === index) {
          for (let i = index; i > -1; i--) {
            if (!this.tabs[i].removed) {
              this.tabActive = i;
              i = -1;
            }
          }
        }

        if (this.tabActive === index) {
          this.tabActive = -1;
        }
      }
      this.setSelected();
    },
    /**
     * event to remove a tab
     * @param {Object} tabEvent { event, tab, index } tab to add
     */
    handleClear(tabEvent) {
      tabEvent.event.stopPropagation();
      this.$emit('tab-remove', tabEvent);
    },
    /**
     * event to remove a tab
     */
    setSelected() {
      const n = this.tabs.length;
      for (let i = 0; i < n; i++) {
        const tab = this.tabs[i];
        if (i === this.tabActive) {
          if (tab.tab) {
            tab.tab.setSelected();
            this.$emit('tab-selected', i);
          }
        }
        else {
          this.tabs[i].tab.isActive = false;
        }
      }
    },
    /**
     * get if need separator
     * @param {Number} index tab index visible
     * @param {Number} visibleIndex tab index visible
     * @returns {Boolean} true if need separator
     */
    hasSeparator(index, visibleIndex) {
      const tabActive = this.alltabs.findIndex(t => t.index === this.tabActive);
      let lastSeparator = true;
      if (!this.allowAdd) {
        lastSeparator = visibleIndex < this.alltabs.length - 1 && tabActive !== index;
      }
      return visibleIndex !== tabActive && visibleIndex !== tabActive - 1 && lastSeparator;
    }
  },
  // DEMO META DATA
  ...metadata
};
