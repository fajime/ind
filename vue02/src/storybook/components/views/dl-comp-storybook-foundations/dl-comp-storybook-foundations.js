import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-foundations',
  components : {
    DlCompStorybookHeader  : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-header" */ '@/storybook/components/molecules/dl-comp-storybook-header')),
    DlCompStorybookCard    : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-card" */ '@/storybook/components/molecules/dl-comp-storybook-card')),
    DlCompStorybookUpdates : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-updates"*/ '@/storybook/components/molecules/dl-comp-storybook-updates')),
    DlUiIcon               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon'))

  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      updateData : [
        {
          icon    : 'dl-ui-icon-figma',
          name    : 'Foundations',
          date    : '18/12/2020',
          version : 'v.0.3.1'
        },
        {
          icon    : 'dl-ui-icon-figma',
          name    : 'Components',
          date    : '18/12/2020',
          version : 'v.0.3.0'
        },
        {
          icon    : 'dl-ui-icon-angular',
          name    : 'Foundations',
          date    : '18/12/2020',
          version : 'v.0.3.0'
        }
      ],
      header : {
        number      : '03',
        title       : 'Foundations',
        subtitle    : '',
        description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae ab tempora fugit amet molestiae molestias animi ipsam, eum quia vel optio porro architecto nihil nemo, nisi, enim doloremque eveniet nam.'
      },
      cards : {
        header : [
          {
            icon : {
              type  : 'dl-ui-icon-angular',
              align : 'left'
            },
            header : '',
            body   : '',
            action : {
              text : 'Tipografía',
              link : ''
            }
          },
          {
            icon : {
              type  : 'dl-ui-icon-angular',
              align : 'left'
            },
            header : '',
            body   : '',
            action : {
              text : 'Color',
              link : ''
            }
          },
          {
            icon : {
              type  : 'dl-ui-icon-angular',
              align : 'left'
            },
            header : '',
            body   : '',
            action : {
              text : 'Iconografía',
              link : ''
            }
          }
        ]
      }
    };
  }
};
