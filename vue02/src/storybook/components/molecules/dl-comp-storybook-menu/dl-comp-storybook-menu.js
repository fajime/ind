import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-menu',
  components : {
    DlUiIcon : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon'))
  },
  props : {
    /**
     * props contains menuData
     */
    menuData : {
      type    : Array,
      default : () => []
    }
  },
  methods : {
    /**
     * Capture the `click` event and emit the event itself.
     *
     * @param {Number} menuIndex number.
     * @param {Number} childIndex number.
     * activate currently selected
     */
    selectMenu(menuIndex, childIndex) {
      // change the active state
      this.menuData.forEach(menuItem => {
        menuItem.active = false;
        if (menuItem.children) {
          // change the child active state to false
          menuItem.children.forEach(childItem => {
            childItem.active = false;
          });
        }
      });
      if (typeof childIndex === 'undefined') {
        this.menuData[menuIndex].active = true;
        // redirect to the page
        this.$router.push(this.menuData[menuIndex].path);
      }
      else {
        this.menuData[menuIndex].children[childIndex].active = true;
        // parentPath + childPath
        const path = this.menuData[menuIndex].children[childIndex].path;
        // redirect to the path
        this.$router.push(path);
      }
    },
    /**
     * Capture the `click` event and emit the event itself.
     *
     * @param {Number} menuIndex number.
     * check if there is any children then preventDefault and toggle
     */
    toggleSubMenu(menuIndex) {
      this.menuData[menuIndex].expanded = !this.menuData[menuIndex].expanded;
    }
  }
};
