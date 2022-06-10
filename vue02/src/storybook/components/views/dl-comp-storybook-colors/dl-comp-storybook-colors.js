import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-colors',
  components : {
    DlUiTab  : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tab" */ '@/components/atoms/dl-ui-tab')),
    DlUiTabs : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs" */ '@/components/molecules/dl-ui-tabs'))
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      tabs : [
        {
          title       : 'Indra',
          selected    : true,
          description : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit deleniti, maiores, sed ab maxime ipsum veritatis sapiente nostrum corporis molestiae ipsa minus veniam molestias consectetur, eveniet in? Fugiat, repellat id.',
          swatch      : [
            {
              title  : 'Color Primario',
              colors : [
                {
                  colorName  : '100',
                  colorValue : '#FAFEFF',
                  className  : 'primary-100'
                },
                {
                  colorName  : '200',
                  colorValue : '#F2FBFD',
                  className  : 'primary-200'
                },
                {
                  colorName  : '300',
                  colorValue : '#E5F6FA',
                  className  : 'primary-300'
                },
                {
                  colorName  : '400',
                  colorValue : '#048EAE',
                  className  : 'primary-400'
                },
                {
                  colorName  : '500',
                  colorValue : '#03657C',
                  className  : 'primary-500'
                },
                {
                  colorName  : '600',
                  colorValue : '#035D72',
                  className  : 'primary-600'
                },
                {
                  colorName  : '700',
                  colorValue : '#03566D',
                  className  : 'primary-700'
                },
                {
                  colorName  : '800',
                  colorValue : '#024454',
                  className  : 'primary-800'
                },
                {
                  colorName  : '900',
                  colorValue : '#001C24',
                  className  : 'primary-900'
                }
              ]
            },
            {
              title  : 'Color Neutral',
              colors : [
                {
                  colorName  : '100',
                  colorValue : '#FAFEFF',
                  className  : 'neutral-100'
                },
                {
                  colorName  : '200',
                  colorValue : '#F2FBFD',
                  className  : 'neutral-200'
                },
                {
                  colorName  : '300',
                  colorValue : '#E5F6FA',
                  className  : 'neutral-300'
                },
                {
                  colorName  : '400',
                  colorValue : '#048EAE',
                  className  : 'neutral-400'
                },
                {
                  colorName  : '500',
                  colorValue : '#03657C',
                  className  : 'neutral-500'
                },
                {
                  colorName  : '600',
                  colorValue : '#035D72',
                  className  : 'neutral-600'
                },
                {
                  colorName  : '700',
                  colorValue : '#03566D',
                  className  : 'neutral-700'
                },
                {
                  colorName  : '800',
                  colorValue : '#024454',
                  className  : 'neutral-800'
                },
                {
                  colorName  : '900',
                  colorValue : '#001C24',
                  className  : 'neutral-900'
                }
              ]
            },
            {
              title  : 'Type color',
              colors : [
                {
                  colorName  : 'primary',
                  colorValue : '#323130',
                  className  : 'type-primary'
                },
                {
                  colorName  : 'secondary',
                  colorValue : '#605E5C',
                  className  : 'type-secondary'
                },
                {
                  colorName  : 'disabled',
                  colorValue : '#A19F9D',
                  className  : 'type-disabled'
                },
                {
                  colorName  : 'white',
                  colorValue : '#FFFFFF',
                  className  : 'type-white'
                },
                {
                  colorName  : 'menu',
                  colorValue : '#8090A0',
                  className  : 'type-menu'
                },
                {
                  colorName  : 'link',
                  colorValue : '#006884',
                  className  : 'type-link'
                },
                {
                  colorName  : 'title',
                  colorValue : '#0A2B42',
                  className  : 'type-title'
                },
                {
                  colorName  : 'subtitle',
                  colorValue : '#44667F',
                  className  : 'type-subtitle'
                }
              ]
            },
            {
              title  : 'Background',
              colors : [
                {
                  colorName  : 'white',
                  colorValue : '#ffffff',
                  className  : 'background-white'
                },
                {
                  colorName  : 'primary',
                  colorValue : '#fcfcfc',
                  className  : 'background-primary'
                },
                {
                  colorName  : 'secondary',
                  colorValue : '#f7f8fa',
                  className  : 'background-secondary'
                },
                {
                  colorName  : 'tertiary',
                  colorValue : '#fafeff',
                  className  : 'background-tertiary'
                },
                {
                  colorName  : 'dark',
                  colorValue : '#024454',
                  className  : 'background-dark'
                }
              ]
            },
            {
              group : [
                {
                  title  : 'Danger',
                  colors : [
                    {
                      colorName  : '100',
                      colorValue : '#fcd4d2',
                      className  : 'danger-100'
                    },
                    {
                      colorName  : '500',
                      colorValue : '#a12721',
                      className  : 'danger-500'
                    },
                    {
                      colorName  : '900',
                      colorValue : '#66110d',
                      className  : 'danger-900'
                    }
                  ]
                },
                {
                  title  : 'Success',
                  colors : [
                    {
                      colorName  : '100',
                      colorValue : '#e9f7ec',
                      className  : 'success-100'
                    },
                    {
                      colorName  : '500',
                      colorValue : '#56c271',
                      className  : 'success-500'
                    },
                    {
                      colorName  : '900',
                      colorValue : '#32673f',
                      className  : 'success-900'
                    }
                  ]
                }
              ]
            },
            {
              group : [
                {
                  title  : 'Warning',
                  colors : [
                    {
                      colorName  : '100',
                      colorValue : '#fff3ec',
                      className  : 'warning-100'
                    },
                    {
                      colorName  : '500',
                      colorValue : '#ff9356',
                      className  : 'warning-500'
                    },
                    {
                      colorName  : '900',
                      colorValue : '#b84302',
                      className  : 'warning-900'
                    }
                  ]
                },
                {
                  title  : 'Info',
                  colors : [
                    {
                      colorName  : '100',
                      colorValue : '#e9f4fe',
                      className  : 'info-100'
                    },
                    {
                      colorName  : '500',
                      colorValue : '#4caade',
                      className  : 'info-500'
                    },
                    {
                      colorName  : '900',
                      colorValue : '#1363ae',
                      className  : 'info-900'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title       : 'Transporte',
          selected    : false,
          description : '',
          swatch      : []
        },
        {
          title       : 'Defensa',
          selected    : false,
          description : '',
          swatch      : []
        },
        {
          title       : 'ATM',
          selected    : false,
          description : '',
          swatch      : []
        }
      ]
    };
  }
};
