import { shallowRef } from 'vue';

import * as allComponents from '@/components/';
import * as allDemoComponents from '@/components/demos';

export default {
  name       : 'dl-comp-storybook-components-detail',
  components : {
    DlUiTab  : allComponents.DlUiTab,
    DlUiTabs : allComponents.DlUiTabs
  },
  props : {
    /**
   * Override
   * @override
   */
    data : {
      type    : Object,
      default : null
    }
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
      this.loadContent();
    },   /**
     * Override
     * @override
     */
    '$route.params.component'() {
      this.loadContent();
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      demoComponent : null
    };
  },
  /**
   * Override
   * @override
   */
  mounted() {

    const component = this.$route.params.component;
    this.componentName = component;

    const componentName = `DlUi${ (component.split('-').map(e =>
      e[0].toUpperCase() + e.slice(1)
    ))
      .join('')}`;

    this.demoComponent = shallowRef( allDemoComponents[`Demo${componentName}`] );

  },
  methods : {

    /**
   * Override
   * @override
   */
    loadContent() {
      this.demoComponent = null;
    }
  }

};
