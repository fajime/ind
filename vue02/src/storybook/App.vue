<template>
  <div class="storybook">
    <dl-comp-storybook-navbar>
      <dl-comp-storybook-menu :menuData="menu" />
      <div>
        <a
          title="Go to previous version"
          @click="goToPreviousVersion"
        >
          Go to previous version
        </a>
      </div>
    </dl-comp-storybook-navbar>
    <div class="storybook__content-wrapper">
      <router-view name="storybookBody" />
    </div>
    <dl-ui-icons-set />
    <dl-comp-storybook-icon-set />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

// require won't accept variables as arguments:
const atompaths = require.context('@/components/atoms', true, /index.vue/);
const moleculepaths = require.context('@/components/molecules', true, /index.vue/);
const organismpaths = require.context('@/components/organisms', true, /index.vue/);

export default {
  name       : 'Storybook',
  components : {
    DlUiIconsSet           : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icons-set" */ '@/components/atoms/dl-ui-icons-set')),
    DlCompStorybookMenu    : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-menu" */ '@/storybook/components/molecules/dl-comp-storybook-menu')),
    DlCompStorybookNavbar  : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-navbar" */ '@/storybook/components/molecules/dl-comp-storybook-navbar')),
    DlCompStorybookIconSet : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-icon-set" */ '@/storybook/components/atoms/dl-comp-storybook-icon-set'))
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      menu : [
        {
          path   : '/storybook-landing',
          title  : 'Inicio',
          active : true
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
              path   : '/storybook-typography',
              title  : 'Tipografía',
              active : false
            },
            {
              path   : '/storybook-iconography',
              title  : 'Iconografía',
              active : false
            },
            {
              path   : '/storybook-colors',
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
  mounted() {
    this.$router.push({ name : 'storybook-landing' });
  },
  methods : {
    /**
     * Redirecciona a la versión anterior del catálogo de componentes
     */
    goToPreviousVersion() {
      this.$router.push('/');
    },
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
          const pathName = `/storybook-${name}-use`;
          const route = {
            path   : pathName,
            title  : name.split('-').join(' '),
            active : false
          };
          children.push(route);
        }
      });
      return children;
    }
  }
};
</script>

<style lang="scss">
@import '@/storybook/sass/app';
</style>

