import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-design-principles',
  components : {
    DlCompStorybookHeader : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-header" */ '@/storybook/components/molecules/dl-comp-storybook-header')),
    DlCompStorybookCard   : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-card" */ '@/storybook/components/molecules/dl-comp-storybook-card')),
    DlUiIcon              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon'))

  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      header : {
        number      : '02',
        title       : 'Principios de diseño',
        subtitle    : '',
        description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
      },
      cards : [
        {
          icon    : 'dl-ui-icon-angular',
          header  : 'Principio 1',
          content : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
        },
        {
          icon    : 'dl-ui-icon-angular',
          header  : 'Principio 2',
          content : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
        },
        {
          icon    : 'dl-ui-icon-angular',
          header  : 'Principio 3',
          content : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
        }, {
          icon    : 'dl-ui-icon-angular',
          header  : 'Principio 4',
          content : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
        },
        {
          icon    : 'dl-ui-icon-angular',
          header  : 'Principio 5',
          content : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
        }
      ]
    };
  }
};
