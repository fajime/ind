import theComponent from '@/components/organisms/dl-ui-accordion-list';
import mixinPlayground from '@/storybook/mixins/playgroundPropsAndEvents';
import DlCompStorybookDemoTemplate from '@/storybook/components/templates/dl-comp-storybook-demo-template';
import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-accordion-list-use',
  components : {
    theComponent,
    DlCompStorybookDemoTemplate,
    DlUiAccordionList : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-accordion-list"*/ '@/components/organisms/dl-ui-accordion-list'))
  },
  mixins : [mixinPlayground],
  /**
   * Override
   * @override
   */
  data() {
    return {
      playground : {
        props :
          [
            {
              label : 'disabled',
              type  : 'checkbox',
              value : false
            },
            {
              label : 'onlyOne',
              type  : 'checkbox',
              value : true
            },
            {
              label : 'accordions',
              type  : 'hidden',
              value : [
                {
                  title       : 'Title 1',
                  icon        : 'dl-ids-icon-user-single-outlined',
                  slot        : 'Accordion 1',
                  customClass : 'dl-ui-accordion dl-ui-custom-accordion',
                  show        : true
                },
                {
                  title       : 'Custom Title 2',
                  icon        : 'dl-ids-icon-calendar-default-filled',
                  slot        : 'Accordion 2',
                  customClass : 'dl-ui-accordion  dl-ui-custom-accordion',
                  show        : true
                },
                {
                  title       : 'Title 3',
                  icon        : 'dl-ui-icon-search',
                  customClass : 'dl-ui-accordion  dl-ui-custom-accordion',
                  slot        : 'Accordion 3',
                  show        : true
                },
                {
                  title       : 'Title 4',
                  description : 'Custom description',
                  icon        : 'dl-ids-icon-user-single-outlined',
                  slot        : 'Accordion 4',
                  customClass : 'dl-ui-accordion  dl-ui-custom-accordion',
                  show        : true
                },
                {
                  title : 'Title 5',
                  icon  : 'dl-ids-icon-calendar-default-filled',
                  slot  : 'Accordion 5',
                  show  : true
                }
              ]
            }
          ],
        events : {
        },
        style : {
          label   : 'estilo',
          type    : 'select',
          value   : 'dl-ui-accordion-list',
          options : [
            { name : 'Default', value : 'dl-ui-accordion-list' },
            { name : 'Custom', value : 'custom-accordion-list' }
          ]
        }
      },
      component : theComponent
    };
  }
};
