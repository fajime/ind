import { defineAsyncComponent } from 'vue';
import mixinMenuItem from '../mixins/menu-item-interface';
import DlUiIcon from '../../../atoms/dl-ui-icon';
const DlUiMenuGroup = defineAsyncComponent(() => import('../../dl-ui-menu-group/index.vue'));

export default {
  name       : 'dl-ui-menu-item',
  components : {
    'dl-ui-icon'       : DlUiIcon,
    'dl-ui-menu-group' : DlUiMenuGroup
  },
  mixins  : [mixinMenuItem],
  emits   : ['branchOpened'],
  methods : {
    /**
     * Manage click event on items, Fire 'select' event upwards
       */
    onClickItem() {
      if (this.config.disabled) {
        return;
      }
      if (this.hasChildren) {
        this.showChildren = !this.showChildren;
        this.$emit('branchOpened', { index : [this.index], level : this.level });
      }
      else {
        if (this.config.fn) {
          this.config.fn(...(this.config.fnParams ? this.config.fnParams : []));
        }
        if (this.config.route) {
          this.$router.push({
            name   : this.config.route,
            params : this.config.routeParams ? this.config.routeParams : {}
          });
        }
        this.$emit('itemClicked', { index : [this.index], level : this.level });
      }
    },
    /**
     * item group clicked listener
     * @param {Object} itemConfig Item config clicked
     */
    onItemGroupClicked(itemConfig) {
      itemConfig.index.unshift(this.index);
      this.$emit('itemClicked', { index : [...itemConfig.index], level : itemConfig.level });
    }
  }
};
