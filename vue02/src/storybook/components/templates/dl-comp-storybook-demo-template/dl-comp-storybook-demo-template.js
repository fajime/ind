import DlCompKitStorybookDemoSection from '@/storybook/components/molecules/dl-comp-kit-storybook-demo-section';
import DlCompKitStorybookDemoPlayground from '@/storybook/components/organisms/dl-comp-kit-storybook-demo-playground';
import DlCompKitStorybookDemoTable from '@/storybook/components/molecules/dl-comp-kit-storybook-demo-table';
import DlCompKitStorybookDemoUse from '@/storybook/components/molecules/dl-comp-kit-storybook-demo-use';
import DlUiTab from '@/components/atoms/dl-ui-tab';
import DlUiTabs from '@/components/molecules/dl-ui-tabs';

export default {
  name       : 'dl-comp-storybook-demo-template',
  components : {
    DlUiTab,
    DlUiTabs,
    DlCompKitStorybookDemoSection,
    DlCompKitStorybookDemoPlayground,
    DlCompKitStorybookDemoTable,
    DlCompKitStorybookDemoUse
  },
  props : {
    /** data of component */
    component : {
      type    : Object,
      default : () => undefined
    },
    /** data of playground */
    playground : {
      type    : Object,
      default : () => undefined
    }
  }
};
