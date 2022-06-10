import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-landing',
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
        number      : '01',
        title       : 'IDS',
        subtitle    : 'Indra Design System',
        description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae ab tempora fugit amet molestiae molestias animi ipsam, eum quia vel optio porro architecto nihil nemo, nisi, enim doloremque eveniet nam.'
      },
      cards : {
        header : [
          {
            icon : {
              type  : 'dl-ui-icon-angular',
              align : 'left'
            },
            header : 'Header',
            body   : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
            action : {
              text : 'Principios de diseño',
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
              text : 'Foundations',
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
              text : 'Componentes',
              link : ''
            }
          }
        ],
        documentation : [
          {
            icon : {
              type  : 'dl-ui-icon-angular',
              align : 'right'
            },
            header : 'Librerías de diseño',
            body   : '',
            action : {
              text : 'Descargar',
              link : ''
            }
          },
          {
            icon : {
              type  : 'dl-ui-icon-angular',
              align : 'right'
            },
            header : 'Librerías de desarrollo',
            body   : '',
            action : {
              text : 'Descargar',
              link : ''
            }
          }
        ]
      }
    };
  }
};
