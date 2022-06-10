import theComponent from '@/components/organisms/dl-ui-datagrid';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-datagrid-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiDatagrid : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-datagrid"*/ '@/components/organisms/dl-ui-datagrid'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        slots : [],
        props : [
          {
            label : 'data',
            type  : 'hidden',
            value : {
              columns : [
                {
                  text       : 'COL1 (sticky)',
                  id         : 'col1',
                  textAlign  : 'center',
                  order      : 'asc',
                  desc       : 'Columna 1',
                  sticky     : true,
                  footerData : {
                    title : 'Contiene B?',
                    func  : arr => arr.indexOf('B') !== -1
                  }
                },
                {
                  text       : 'COL2 (sticky)',
                  id         : 'col2',
                  textAlign  : 'left',
                  order      : 'desc',
                  desc       : 'Columna 2',
                  sticky     : true,
                  footerData : {
                    title : 'Suma',
                    func  : arr => {
                      let value = 0;
                      arr.forEach(n => {
                        const numbered = Number(n);
                        if (!isNaN(numbered)) {
                          value += numbered;
                        }
                      });
                      return value;
                    }
                  }
                },
                {
                  text       : 'COL3 (editable)',
                  id         : 'col3',
                  textAlign  : 'right',
                  desc       : 'Columna 3',
                  editable   : true,
                  footerData : {
                    title : 'Mayores de 10',
                    func  : arr => {
                      let cont = 0;
                      arr.forEach(n => {
                        const numbered = Number(n);
                        if (!isNaN(numbered)) {
                          numbered > 10 && cont++;
                        }
                      });
                      return cont;
                    }
                  }
                },
                {
                  text       : 'COL4 (editable)',
                  id         : 'col4',
                  editable   : true,
                  footerData : {
                    title : 'Total reg.',
                    func  : arr => arr.length
                  }
                },
                {
                  text : 'COL 5',
                  id   : 'col5'
                },
                {
                  text : 'COL6',
                  id   : 'col6'
                },
                {
                  text      : 'Fecha',
                  id        : 'col7',
                  textAlign : 'center',
                  order     : 'asc'
                }
              ],
              data : new Array(33).fill()
                .map((_, index) => {
                  const i = index + 1;
                  const date = new Intl.DateTimeFormat('es', {
                    year  : 'numeric',
                    month : '2-digit',
                    day   : '2-digit'
                  }).format(new Date(Date.UTC(2021, 1, i + 1)));
                  return [`${String.fromCharCode(65 + i)}`, 2 * i, `${3 * i}`, `Longer filling text with appropiate length ${4 * i}`, `Longer filling text with appropiate length ${5 * i}`, `${6 * i}`, date];
                })
            }
          },
          {
            label   : 'selection',
            type    : 'select',
            value   : 'none',
            options : [
              { name : 'none', value : 'none' },
              { name : 'single', value : 'single' },
              { name : 'multiple', value : 'multiple' }
            ]
          },
          {
            label : 'filter',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'sort',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'closable',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'resize',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'contextualMenu',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'dragDrop',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'pagination',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'headerTooltip',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'cellTooltip',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'cellTooltipConfig',
            type  : 'hidden',
            value : {
              2  : 'Celda con valor 2',
              3  : 'Celda con valor 3',
              4  : 'Celda con valor 4',
              6  : 'Texto cualquiera con 6',
              8  : 'Ojito con el 8',
              10 : 'Pues este es un 10'
            }
          },
          {
            label : 'stickyHeader',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'funcFooter',
            type  : 'checkbox',
            value : false
          },
          {
            label : 'showExportButtons',
            type  : 'checkbox',
            value : false
          }
        ],
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-datagrid',
          options : [
            { name : 'Default', value : 'dl-ui-datagrid' },
            { name : 'Custom', value : 'custom-datagrid' }
          ]
        }
      },
      component : theComponent
    };
  }
};
