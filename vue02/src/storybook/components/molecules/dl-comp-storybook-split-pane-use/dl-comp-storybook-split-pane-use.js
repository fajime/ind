import theComponent from '@/components/atoms/dl-ui-split-pane';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';

export default {
  name       : 'dl-comp-storybook-split-pane-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      component : theComponent
    };
  }
};
