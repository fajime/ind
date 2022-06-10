<template>
  <DlUiTreemenu :menuData="menu" @change="handleChangeMenu" />
</template>
<script>

import DlUiTreemenu from '../../atoms/dl-ui-treemenu/';

// require won't accept variables as arguments:
const atompaths = require.context('@/components/atoms', true, /index.vue/);
const moleculepaths = require.context('@/components/molecules', true, /index.vue/);
const organismpaths = require.context('@/components/organisms', true, /index.vue/);

const mainRoute = 'storybook';
const componentsRoute = 'storybook-components';

export default {
  components : {
    DlUiTreemenu
  },
  emits : ['refresh'],
  /**
   * Override
   * @override
   */
  data() {
    return {
      itemActive : null,
      menu       : [
        {
          path   : '/storybook-landing',
          title  : 'Inicio',
          active : false
        },
        {
          path   : '/storybook-design-principles',
          title  : 'Principios de diseño',
          active : false
        },
        {
          path     : '/storybook-foundations',
          title    : 'Foundations',
          active   : false,
          expanded : false,
          children : [
            {
              path   : '/storybook-foundations-typography',
              title  : 'Tipografía',
              active : false
            },
            {
              path   : '/storybook-foundations-iconography',
              title  : 'Iconografía',
              active : false
            },
            {
              path   : '/storybook-foundations-colors',
              title  : 'Color',
              active : false
            }
          ]
        },
        {
          path     : '/storybook-components',
          title    : 'Components',
          active   : false,
          expanded : false,
          children : [
            ...this.makeChildrenPaths(atompaths),
            ...this.makeChildrenPaths(moleculepaths),
            ...this.makeChildrenPaths(organismpaths)
          ]
        }
      ]

    };
  },

  /**
   * Override
   * @override
   */
  watch : {
    /**
   * Override
   * @override
   */
    '$route.params.id'() {
      setTimeout(() => {
        this.findActiveItem();
        this.$emit('refresh');
      }, 200);
    },
    /**
   * Override
   * @override
   */
    '$route.params.component'() {
      setTimeout(() => {
        this.findActiveItem();
        this.$emit('refresh');
      }, 200);
    }
  },
  /**
   * Override
   * @override
   */
  created() {
    this.findActiveItem();
  },

  methods : {

    /**
     * Generate dynamically an array with all routes for an atomic model
     * @param {Array} paths atomic model folder
     * @returns {Array} children Array with the branch children
     */
    makeChildrenPaths(paths) {
      const children = [];
      paths.keys().forEach(fileName => {
        if (fileName.includes('__DEMO')) {
        // try to avoid this line by changing regexp
          const path = fileName.replace('/__DEMO/index.vue', '').replace('.', '');
          const name = path.replace('/dl-ui-', '');
          const pathName = `/${componentsRoute}/${name}`;
          const route = {
            path   : pathName,
            title  : name.split('-').join(' '),
            active : false
          };
          children.push(route);
        }
      });
      return children;
    },
    /**
   * Override
   * @override
   */
    findActiveItem() {
      if (this.menu.length > 0) {
        let item = null;
        let parent = null;

        const findItem = (parentItems, items) => {

          const finditem = items.find(e => {
            if (e.children) {
              findItem(e, e.children);
            }

            e.active = false;
            const active = e.path === `/${this.$route.params.id}` && !this.$route.params.component ||
            e.path === `/${this.$route.params.id}/${this.$route.params.component}`;

            e.active = active;

            return active;
          } );

          if (finditem) {

            if (parentItems) {
              parentItems.active = parentItems.path === `/${this.$route.params.id}`;
            }

            parent = parentItems;
            item = finditem;
          }
        };

        findItem(null, this.menu);

        if (!item) {
          item = this.menu[0];
          this.$router.push(`/${mainRoute}${item.path}`);
        }
        this.itemActive = { parent, item };
        if (parent) {
          parent.expand = true;
        }

        this.itemActive.item.active = true;
        this.itemActive.item.expand = true;

      }

    },
    /**
   * Override
   * @override
   */
    handleChangeMenu({ parent, item }) {

      if (this.itemActive.item !== item) {

        if (parent !== this.itemActive.item || !parent) {
          this.itemActive.item.expand = false;
        }

        if (this.itemActive.parent !== parent && this.itemActive.parent && parent) {

          if (this.itemActive.item !== item && this.itemActive.parent !== item) {
            this.itemActive.parent.expand = false;
          }
        }

        this.itemActive.item.active = false;
        item.active = true;
        this.itemActive.item = item;
        this.itemActive.parent = parent;

        this.$router.push(`/${mainRoute}${item.path}`);

      }
    }

  }
};
</script>
