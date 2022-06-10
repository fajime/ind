import theComponent from '@/components/molecules/dl-ui-menu-blocks';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-menu-blocks-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiMenuBlocks : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-menu-blocks"*/ '@/components/molecules/dl-ui-menu-blocks'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props : [
          {
            label : 'config',
            type  : 'hidden',
            value : [
              {
                id      : 'id1',
                text    : 'Elemento 1 (sin enlace)',
                section : [
                  {
                    id    : 'id1',
                    title : 'Lorem Ipsum',
                    link  : [
                      {
                        text : 'Enlace para disparar función (traza)',
                        fn   : () => {
                          // eslint-disable-next-line no-console
                          console.log('Traza de link "Neque porro quisquam" ');
                        }
                      },
                      {
                        text : 'Enlace para abrir otra pestaña',
                        fn   : () => {
                          window.open('https://www.google.es');
                        }
                      },
                      {
                        text : 'Loren ipsum',
                        fn   : undefined
                      },
                      {
                        text : 'Dolor sit amet',
                        fn   : undefined
                      }
                    ],
                    subSection : [
                      {
                        title : 'Consectetur adipiscing elit,',
                        link  : [
                          {
                            text : 'Sed do eiusmod tempor',
                            fn   : undefined
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id    : 'id2',
                    title : 'Incididunt ut labore',
                    link  : [
                      {
                        text : 'Et dolore magna aliqua',
                        fn   : undefined
                      },
                      {
                        text : 'Ut enim ad minim veniam',
                        fn   : undefined
                      },
                      {
                        text : 'Quis nostrud exercitation',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id3',
                    title : 'Nisi ut aliquip ex ea',
                    link  : [
                      {
                        text : 'Commodo consequat',
                        fn   : undefined
                      },
                      {
                        text : 'Duis aute irure dolor',
                        fn   : undefined
                      },
                      {
                        text : 'Ullamco laboris',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id11',
                    title : 'In reprehenderit in voluptate',
                    link  : [
                      {
                        text : 'Velit esse cillum',
                        fn   : undefined
                      },
                      {
                        text : 'Dolore eu fugiat nulla pariatur',
                        fn   : undefined
                      },
                      {
                        text : 'Excepteur sint occaecat',
                        fn   : undefined
                      },
                      {
                        text : 'Cupidatat non proident',
                        fn   : undefined
                      },
                      {
                        text : 'Sunt in culpa qui officia',
                        fn   : undefined
                      },
                      {
                        text : 'Deserunt mollit',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id4',
                    title : 'Talleres',
                    link  : [
                      {
                        text : 'Ejecutar y finalizar',
                        fn   : undefined
                      },
                      {
                        text : 'Cierre peticiones',
                        fn   : undefined
                      },
                      {
                        text : 'Configuración real',
                        fn   : undefined
                      },
                      {
                        text : 'Anim id est laborum',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id5',
                    title : 'Sed ut perspiciatis unde',
                    link  : [
                      {
                        text : 'Omnis iste natus',
                        fn   : undefined
                      },
                      {
                        text : 'Error sit voluptatem accusantium',
                        fn   : undefined
                      },
                      {
                        text : 'Doloremque laudantium',
                        fn   : undefined
                      }
                    ],
                    subSection : [
                      {
                        title : 'Totam rem aperiam',
                        link  : [
                          {
                            text : 'Eaque ipsa quae ab',
                            fn   : undefined
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id    : 'id6',
                    title : 'Illo inventore veritatis',
                    link  : [
                      {
                        text : 'Et quasi architecto beatae',
                        fn   : undefined
                      },
                      {
                        text : 'Vitae dicta sunt explicabo',
                        fn   : undefined
                      },
                      {
                        text : 'Nemo voluptatem quia voluptas',
                        fn   : undefined
                      }
                    ],
                    subSection : [
                      {
                        title : 'Sed quia consequuntur',
                        link  : [
                          {
                            text : 'Magni dolores eos qui ratione',
                            fn   : undefined
                          },
                          {
                            text : 'Neque porro quisquam est',
                            fn   : undefined
                          },
                          {
                            text : 'Qui dolorem ipsum quia ',
                            fn   : undefined
                          },
                          {
                            text : 'Dolor sit amet, consectetur',
                            fn   : undefined
                          }
                        ]
                      },
                      {
                        title : 'Sdipisci velit',
                        link  : [
                          {
                            text : 'Sed quia non numquam',
                            fn   : undefined
                          }
                        ]
                      },
                      {
                        title : 'Eius modi tempora',
                        link  : [
                          {
                            text : 'Incidunt ut',
                            fn   : undefined
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id      : 'id2',
                text    : 'Elemento 2 (sin enlace)',
                icon    : 'dl-ids-icon-user-single-outlined',
                fn      : undefined,
                section : [
                  {
                    id    : 'id1',
                    title : 'Labore et dolore magnam',
                    link  : [
                      {
                        text : 'Aliquam quaerat',
                        fn   : undefined
                      },
                      {
                        text : 'Voluptatem',
                        fn   : undefined
                      },
                      {
                        text : 'Ut enim ad minima veniam',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id2',
                    title : 'Quis nostrum exercitationem',
                    link  : [
                      {
                        text : 'Ullam corporis suscipit',
                        fn   : undefined
                      },
                      {
                        text : 'Laboriosam',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id3',
                    title : 'Peticiones',
                    link  : [
                      {
                        text : 'Generar masivamente pet. preventivas',
                        fn   : undefined
                      },
                      {
                        text : 'Peticiones de mantenimiento',
                        fn   : undefined
                      },
                      {
                        text : 'Informes/Ficheros',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id4',
                    title : 'Nisi ut aliquid',
                    link  : [
                      {
                        text : 'Ex ea commodi consequatur?',
                        fn   : undefined
                      },
                      {
                        text : 'Quis autem vel eum',
                        fn   : undefined
                      }
                    ],
                    subSection : [
                      {
                        title : 'Iure reprehenderit qui',
                        link  : [
                          {
                            text : 'In ea voluptate velit ',
                            fn   : undefined
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id    : 'id5',
                    title : 'Esse quam nihil molestiae',
                    link  : [
                      {
                        text : 'Vel illum qui dolorem',
                        fn   : undefined
                      },
                      {
                        text : 'Consequatur',
                        fn   : undefined
                      },
                      {
                        text : 'Eum fugiat quo',
                        fn   : undefined
                      },
                      {
                        text : 'voluptas nulla pariatur?',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id6',
                    title : 'Talleres',
                    link  : [
                      {
                        text : 'Ejecutar y finalizar',
                        fn   : undefined
                      },
                      {
                        text : 'Cierre peticiones',
                        fn   : undefined
                      },
                      {
                        text : 'Configuración real',
                        fn   : undefined
                      },
                      {
                        text : 'Ficheros',
                        fn   : undefined
                      }
                    ]
                  },
                  {
                    id    : 'id7',
                    title : 'At vero eos et accusamus',
                    link  : [
                      {
                        text : 'Et iusto odio dignissimos',
                        fn   : undefined
                      },
                      {
                        text : 'Ducimus qui blanditiis',
                        fn   : undefined
                      },
                      {
                        text : 'Praesentium voluptatum',
                        fn   : undefined
                      }
                    ],
                    subSection : [
                      {
                        title : 'Deleniti atque corrupti',
                        link  : [
                          {
                            text : 'Quos dolores et quas molestias',
                            fn   : undefined
                          },
                          {
                            text : 'Excepturi sint',
                            fn   : undefined
                          },
                          {
                            text : 'Occaecati cupiditate non',
                            fn   : undefined
                          },
                          {
                            text : 'Provident',
                            fn   : undefined
                          }
                        ]
                      },
                      {
                        title : 'Similique sunt in culpa',
                        link  : [
                          {
                            text : 'Qui officia deserunt',
                            fn   : undefined
                          }
                        ]
                      },
                      {
                        title : 'Ficmollitia animi',
                        link  : [
                          {
                            text : 'Fid est laborum et dolorum fuga',
                            fn   : undefined
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id   : 'id3',
                text : 'Elemento 3 (con enlace)',
                icon : 'dl-ui-icon-check',
                fn   : () => {
                  window.open('https://www.google.es');
                },
                section : []
              },
              {
                id   : 'id4',
                text : 'Elemento 4 (con traza)',
                icon : 'dl-ids-icon-calendar-default-filled',
                fn   : () => {
                  // eslint-disable-next-line no-console
                  console.log('Traza de "Elemento 4"');
                },
                section : []
              }
            ]
          }
        ],
        slots : []
      },
      component : theComponent
    };
  }
};
