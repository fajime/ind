<template>
  <ul v-if="menuData">
    <dl-ui-vertical-menu
      v-for="item,index in menuData"
      :key="index"
      v-model:show="item.show"
      :item="item"
      class="storybook-dl-ui-vertical-menu"
      :class="{ 'dl-ui-vertical-menu--active': item.active }"
      @toggle="handleToggle({ parent, item })"
    >
      <li>{{ item.title }}</li>
      <template v-if="item.children" #content>
        <div class="submenu">
          <dl-ui-treemenu :parent="item" :menuData="item.children" @change="handleToggle2" />
        </div>
      </template>
    </dl-ui-vertical-menu>
  </ul>
</template>
<script>
import DlUiVerticalMenu from '@/components/molecules/dl-ui-vertical-menu';
export default {
  name       : 'DlUiTreemenu',
  components : {
    'dl-ui-vertical-menu' : DlUiVerticalMenu
  },
  emits : ['change'],
  props : {
    /**
     * props contains menuData
     */
    menuData : {
      type    : Array,
      default : null
    },
    /**
     * props contains menuData
     */
    parent : {
      type    : Object,
      default : null
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      itemActive : null
    };
  },

  methods : {
  /**
   * Override
   * @override
   */
    handleToggle({ parent, item }) {
      this.$emit('change', { parent, item });
    },
    /**
   * Override
   * @override
   */
    handleToggle2({ parent, item }) {
      this.$emit('change', { parent, item });
    }
  }

};
</script>
<style lang="scss" scoped>
li {
  padding: 10px 8px;
  flex: 1;

  @include font-body-medium-regular();
}

.submenu {
  li {
    padding-left: 32px;
  }
}

.storybook-dl-ui-vertical-menu {
  margin: 4px auto;
}

</style>
