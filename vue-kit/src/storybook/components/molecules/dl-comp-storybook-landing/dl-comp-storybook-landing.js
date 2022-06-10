import { defineAsyncComponent } from 'vue';
import DlUiIcon from '@/components/atoms/dl-ui-icon';
import DlCompStorybookHeader from '../../atoms/dl-comp-storybook-header/';
import DlCompStorybookCards from '../../molecules/dl-comp-storybook-cards/';
import DlCompStorybookComponents from '../../molecules/dl-comp-storybook-components/';
import DlCompStorybookUpdates from '../../molecules/dl-comp-storybook-updates';
import DlCompStorybookTable from '../../molecules/dl-comp-storybook-table';
import DlCompStorybookHtml from '../../atoms/dl-comp-storybook-html';
import DlCompStorybookIcons from '../../atoms/dl-comp-storybook-icons';
import DlCompStorybookColors from '../../molecules/dl-comp-storybook-colors';
import DlCompStorybookComponentsDetail from '../../molecules/dl-comp-storybook-components-detail';

export default {
  name       : 'dl-comp-storybook-landing',
  components : {
    DlCompStorybookCard : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-card" */ '@/storybook/components/molecules/dl-comp-storybook-card')),
    DlUiIcon,
    DlCompStorybookCards,
    DlCompStorybookComponents,
    DlCompStorybookHeader,
    DlCompStorybookUpdates,
    DlCompStorybookTable,
    DlCompStorybookHtml,
    DlCompStorybookIcons,
    DlCompStorybookColors,
    DlCompStorybookComponentsDetail
  },
  props : {
    /**
   * Override
   * @override
   */
    info : {
      type    : Object,
      default : null
    }
  }
};
