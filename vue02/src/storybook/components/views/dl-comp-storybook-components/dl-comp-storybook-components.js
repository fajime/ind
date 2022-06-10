import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-components',
  components : {
    DlCompStorybookHeader   : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-header" */ '@/storybook/components/molecules/dl-comp-storybook-header')),
    DlCompStorybookCard     : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-card" */ '@/storybook/components/molecules/dl-comp-storybook-card')),
    DlCompStorybookUpdates  : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-updates"*/ '@/storybook/components/molecules/dl-comp-storybook-updates')),
    DlUiActionButton        : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-action-button"*/ '@/components/atoms/dl-ui-action-button')),
    DlUiListbox             : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-listbox"*/ '@/components/atoms/dl-ui-listbox')),
    DlUiTooltip             : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tooltip"*/ '@/components/atoms/dl-ui-tooltip')),
    DlUiAccordion           : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-accordion"*/ '@/components/molecules/dl-ui-accordion')),
    DlUiCheckbox            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-checkbox"*/ '@/components/atoms/dl-ui-checkbox')),
    DlUiBreadcrumb          : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-breadcrumb"*/ '@/components/atoms/dl-ui-breadcrumb')),
    DlUiProgressCircle      : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-progress-circle"*/ '@/components/atoms/dl-ui-progress-circle')),
    DlUiInput               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-input"*/ '@/components/atoms/dl-ui-input')),
    DlUiSelect              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-select"*/ '@/components/atoms/dl-ui-select')),
    DlUiChip                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-chip"*/ '@/components/atoms/dl-ui-tag')),
    DlUiIcon                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon"*/ '@/components/atoms/dl-ui-icon')),
    DlUiIconsSet            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icons-set"*/ '@/components/atoms/dl-ui-icons-set')),
    DlUiMultiselect         : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-updates"*/ '@/components/atoms/dl-ui-multiselect')),
    DlUiNumber              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-updates"*/ '@/components/atoms/dl-ui-number')),
    DlUiPassword            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-password"*/ '@/components/atoms/dl-ui-password')),
    DlUiProgressBar         : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-progress-bar"*/ '@/components/atoms/dl-ui-progress-bar')),
    DlUiRadio               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-radio"*/ '@/components/atoms/dl-ui-radio')),
    DlUiRange               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-range"*/ '@/components/atoms/dl-ui-range')),
    DlUiSwitch              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-switch"*/ '@/components/atoms/dl-ui-switch')),
    DlUiTextarea            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-textarea"*/ '@/components/atoms/dl-ui-textarea')),
    DlUiToggleButton        : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-toggle-button"*/ '@/components/atoms/dl-ui-toggle-button')),
    DlUiCheckboxGroup       : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-checkbox-group"*/ '@/components/molecules/dl-ui-checkbox-group')),
    DlUiFooter              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-footer"*/ '@/components/molecules/dl-ui-footer')),
    DlUiRating              : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-rating"*/ '@/components/molecules/dl-ui-rating')),
    DlUiSnack               : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-snack"*/ '@/components/molecules/dl-ui-snack')),
    DlUiStepper             : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-stepper"*/ '@/components/molecules/dl-ui-stepper')),
    DlUiMenuBlocks          : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-menu-blocks"*/ '@/components/molecules/dl-ui-menu-blocks')),
    DlUiTabs                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs"*/ '@/components/molecules/dl-ui-tabs')),
    DlUiSplitButton         : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-split-button"*/ '@/components/molecules/dl-ui-split-button')),
    DlUiTab                 : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs"*/ '@/components/atoms/dl-ui-tab')),
    DlCompKitDemoPagination : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-kit-demo-pagination"*/ '@/catalog/components/atoms/dl-comp-kit-demo-pagination')),
    DlUiMenu                : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs"*/ '@/components/molecules/dl-ui-menu')),
    DlUiDatepicker          : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-datepicker"*/ '@/components/molecules/dl-ui-datepicker')),
    DlUiAccordionList       : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-accordion-list"*/ '@/components/organisms/dl-ui-accordion-list'))
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      header : {
        number      : '04',
        title       : 'Components',
        subtitle    : '',
        description : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae ab tempora fugit amet molestiae molestias animi ipsam, eum quia vel optio porro architecto nihil nemo, nisi, enim doloremque eveniet nam.'
      },
      documentation : [
        {
          icon : {
            type  : 'dl-ui-icon-figma',
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
      ],
      components : [
        {
          title     : 'Action Button',
          name      : 'dl-ui-action-button',
          className : 'action-button',
          props     : {
            'class' : 'dl-ui-action-button',
            icon    : 'dl-ids-icon-user-single-outlined'
          },
          slots : [],
          path  : 'storybook-action-button-use'
        },
        {
          title     : 'Breadcrumb',
          name      : 'dl-ui-breadcrumb',
          className : 'breadcrumb',
          props     : {
            'class'        : 'dl-ui-breadcrumb',
            homeIconConfig : {
              'icon' : 'dl-ui-icon-home',
              'to'   : '/'
            },
            model : [
              {
                'to'   : '#',
                'item' : 'Active'
              },
              {
                'to'   : '#',
                'item' : 'Inactive'
              },
              {
                'to'   : '#',
                'item' : 'Inactive'
              }
            ],
            separator : '/'
          },
          slots : [],
          path  : 'storybook-breadcrumb-use'
        },
        {
          title     : 'Button',
          name      : 'dl-ui-button',
          className : 'button',
          props     : {
            'class' : 'dl-ui-button'
          },
          slots : [],
          text  : 'Default',
          path  : 'storybook-button-use'
        },
        {
          title    : 'Checkbox',
          multiple : [
            {
              name      : 'dl-ui-checkbox',
              className : 'checkbox',
              props     : {
                'class' : 'dl-ui-checkbox',
                value   : false,
                name    : 'unchecked'
              },
              slots : [],
              span  : {
                position  : 'after',
                className : 'label',
                text      : 'Label'
              }
            },
            {
              name      : 'dl-ui-checkbox',
              className : 'checkbox',
              props     : {
                'class' : 'dl-ui-checkbox',
                value   : true,
                name    : 'checked'
              },
              slots : [],
              span  : {
                position  : 'after',
                className : 'label',
                text      : 'Label'
              }
            },
            {
              name      : 'dl-ui-checkbox',
              className : 'checkbox',
              props     : {
                'class'       : 'dl-ui-checkbox',
                indeterminate : true,
                value         : true,
                icon          : 'dl-ui-icon-check-mix',
                name          : 'indeterminate'
              },
              slots : [],
              span  : {
                position  : 'after',
                className : 'label',
                text      : 'Label'
              }
            }
          ],
          path : 'storybook-checkbox-use'
        },
        {
          title     : 'Chip',
          name      : 'dl-ui-chip',
          className : 'chip',
          props     : {
            'class' : 'dl-ui-chip',
            icon    : 'dl-ui-icon-user',
            text    : 'chip-text',
            value   : 'value',
            stroke  : true
          },
          slots : [],
          path  : 'storybook-chip-use'
        },
        {
          title     : 'Icon',
          name      : 'dl-ui-icon',
          className : 'icon',
          props     : {
            'class' : 'dl-ui-icon',
            id      : 'dl-ids-icon-user-single-outlined'
          },
          slots : [],
          path  : 'storybook-icon-use'
        },
        {
          title    : 'Icons Set',
          multiple : [
            {
              name      : 'dl-ui-icon',
              className : 'icon',
              props     : {
                'class' : 'dl-ui-icon',
                id      : 'dl-ids-icon-user-single-outlined'
              },
              slots : []
            },
            {
              name      : 'dl-ui-icon',
              className : 'icon',
              props     : {
                'class' : 'dl-ui-icon',
                id      : 'dl-ids-icon-alerts-circle-filled'
              },
              slots : []
            },
            {
              name      : 'dl-ui-icon',
              className : 'icon',
              props     : {
                'class' : 'dl-ui-icon',
                id      : 'dl-ids-icon-arrow_up_and_down-filled'
              },
              slots : []
            }
          ],
          path : 'storybook-icons-set-use'
        },
        {
          title    : 'Input',
          multiple : [
            {
              name      : 'dl-ui-input',
              className : 'input',
              props     : {
                'class'     : 'dl-ui-input',
                label       : 'Label',
                rightIcon   : 'dl-ui-icon-user',
                placeholder : 'Placeholder',
                disabled    : true
              },
              slots : []
            },
            {
              name      : 'dl-ui-input',
              className : 'input',
              props     : {
                'class'     : 'dl-ui-input',
                label       : 'Label',
                rightIcon   : 'dl-ui-icon-user',
                placeholder : 'Placeholder'
              },
              slots : []
            }
          ],
          path : 'storybook-input-use'
        },
        {
          title     : 'Listbox',
          name      : 'dl-ui-listbox',
          className : 'listbox',
          props     : {
            'class'      : 'dl-ui-listbox',
            visibleItems : 3
          },
          slots : [],
          path  : 'storybook-listbox-use'
        },
        {
          title     : 'Multi Select',
          name      : 'dl-ui-multiselect',
          className : 'multiselect',
          props     : {
            'class' : 'dl-ui-multiselect',
            label   : 'label',
            help    : 'help text',
            options : [
              {
                'name'     : 'name 1',
                'value'    : 'value 1',
                'leftIcon' : 'dl-ui-icon-user'
              },
              {
                'name'     : 'name 2',
                'value'    : 'value 2',
                'disabled' : true
              }
            ],
            value        : [],
            scrollHeight : '250px'
          },
          slots : [],
          path  : 'storybook-multiselect-use'
        },
        {
          title     : 'Number',
          name      : 'dl-ui-number',
          className : 'number',
          props     : {
            'class'     : 'dl-ui-number',
            label       : 'label',
            help        : 'help text',
            placeholder : 'Placeholder..',
            min         : 1,
            max         : 100,
            step        : 2
          },
          slots : [],
          path  : 'storybook-number-use'
        },
        {
          title     : 'Password',
          name      : 'dl-ui-password',
          className : 'password',
          props     : {
            'class' : 'dl-ui-password',
            label   : 'label',
            help    : 'help text',
            value   : 'password'
          },
          slots : [],
          path  : 'storybook-password-use'
        },
        {
          title     : 'Progress Bar',
          name      : 'dl-ui-progress-bar',
          className : 'progress-bar',
          props     : {
            'class' : 'dl-ui-progress-bar',
            min     : 1,
            max     : 100,
            value   : 60
          },
          slots : [],
          path  : 'storybook-progress-bar-use'
        },
        {
          title     : 'Progress Circle',
          name      : 'dl-ui-progress-circle',
          className : 'progress',
          props     : {
            'class' : 'dl-ui-progress-circle',
            min     : '0',
            max     : '100',
            value   : '50'
          },
          slots : [],
          span  : {
            position  : 'after',
            className : 'text',
            text      : 'Por favor, espere..'
          },
          path : 'storybook-progress-circle-use'
        },
        {
          title     : 'Radio',
          name      : 'dl-ui-radio',
          className : 'radio',
          props     : {
            'class'    : 'dl-ui-radio',
            value      : 'value',
            modelValue : 'value'
          },
          slots : [],
          span  : {
            position  : 'after',
            className : 'label',
            text      : 'value'
          },
          path : 'storybook-radio-use'
        },
        {
          title     : 'Range',
          name      : 'dl-ui-range',
          className : 'range',
          props     : {
            'class' : 'dl-ui-range',
            min     : 0,
            max     : 100,
            value   : 60,
            step    : 1
          },
          slots : [],
          path  : 'storybook-range-use'
        },
        {
          title     : 'Select',
          name      : 'dl-ui-select',
          className : 'dropdown',
          props     : {
            'class' : 'dl-ui-select',
            value   : 'Default',
            options : [
              {
                'name'  : 'Default',
                'value' : 'default'
              },
              {
                'name'  : 'Hover',
                'value' : 'hover'
              }
            ],
            label : 'label'
          },
          slots : [],
          path  : 'storybook-select-use'
        },
        {
          title     : 'Split Pane',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-split-panes.png',
          path      : 'storybook-split-pane-use'
        },
        {
          title     : 'Switch',
          name      : 'dl-ui-switch',
          className : 'switch',
          props     : {
            'class' : 'dl-ui-switch',
            value   : true
          },
          slots : [],
          path  : 'storybook-switch-use'
        },
        {
          title     : 'Tab',
          name      : 'dl-ui-tabs',
          className : 'tabs',
          props     : {
            // eslint-disable-next-line strict-vue/require-jsdoc
            'class' : 'dl-ui-tabs'
          },
          components : [
            {
              name      : 'dl-ui-tab',
              className : 'tab',
              props     : {
                title    : 'Tab 1',
                selected : true,
                'class'  : 'dl-ui-tab'
              },
              content : 'tab 1 content'
            }
          ],
          slots : [],
          path  : 'storybook-tabs-use'
        },
        {
          title     : 'Textarea',
          name      : 'dl-ui-textarea',
          className : 'textarea',
          props     : {
            'class'   : 'dl-ui-textarea',
            resizable : true,
            label     : 'label',
            help      : 'help text',
            value     : 'value',
            rows      : 5,
            cols      : 30
          },
          slots : [],
          path  : 'storybook-textarea-use'
        },
        {
          title     : 'Toggle Button',
          name      : 'dl-ui-toggle-button',
          className : 'toggle',
          props     : {
            'class' : 'dl-ui-toggle-button',
            content : 'content',
            value   : true
          },
          slots : [{
            name    : 'default',
            content : 'Toggle Content'
          }],
          path : 'storybook-toggle-button-use'
        },
        {
          title     : 'Tooltip',
          name      : 'dl-ui-tooltip',
          className : 'tooltip',
          props     : {
            'class'  : 'dl-ui-tooltip',
            position : 'top',
            text     : 'Hover me!'
          },
          slots : [],
          path  : 'storybook-tooltip-use'
        },
        {
          title     : 'Accordion',
          name      : 'dl-ui-accordion',
          className : 'accordion',
          props     : {
            'class'         : 'dl-ui-accordion',
            show            : true,
            headerClickable : true
          },
          slots : [
            {
              name    : 'title',
              content : 'Transporte'
            },
            {
              name    : 'content',
              content : 'Content'
            }
          ],
          path : 'storybook-accordion-use'
        },
        {
          title     : 'Card',
          name      : 'dl-comp-storybook-card',
          className : 'card',
          props     : {
            'class' : 'dl-comp-storybook-card'
          },
          slots : [
            {
              name    : 'default',
              content : 'Contenido de la tarjeta'
            },
            {
              name  : 'title',
              usage : 'Contenido de la parte superior'
            }
          ],
          path : 'storybook-card-use'
        },
        {
          title     : 'Checkbox Group',
          name      : 'dl-ui-checkbox-group',
          className : 'checkbox-group',
          props     : {
            'class'    : 'dl-ui-checkbox-group',
            checkboxes : [
              { name : 'Checkbox 1', value : true, label : 'Checkbox 1' },
              { name : 'Checkbox 2', value : true, label : 'Checkbox 2' },
              { name : 'Checkbox 3', value : false, label : 'Checkbox 3' }
            ],
            collapsible : true,
            collapsed   : false
          },
          slots : [],
          path  : 'storybook-checkbox-group-use'
        },
        {
          title     : 'Datepicker',
          name      : 'dl-ui-datepicker',
          className : 'datepicker',
          props     : {
            'class' : 'dl-ui-datepicker',
            label   : 'Label',
            help    : 'Help text'
          },
          slots : [],
          path  : 'storybook-datepicker-use'
        },
        {
          title     : 'Footer',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-footer.png',
          path      : 'storybook-footer-use'
        },
        {
          title     : 'Header',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-header.png',
          path      : 'storybook-header-use'
        },
        {
          title     : 'Image Viewer',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-image-viewer.png',
          path      : 'storybook-image-viewer-use'
        },
        {
          title     : 'Menu Blocks',
          name      : 'dl-ui-menu-blocks',
          className : 'menu-blocks',
          props     : {
            'class' : 'dl-ui-menu-blocks',
            config  : [
              {
                id   : 'id1',
                text : 'Elemento 1 (con enlace)',
                icon : 'dl-ui-icon-check',
                fn   : () => {
                  window.open('https://www.google.es');
                },
                section : []
              },
              {
                id   : 'id2',
                text : 'Elemento 2 (con traza)',
                icon : 'dl-ids-icon-calendar-default-filled',
                fn   : () => {
                  // eslint-disable-next-line no-console
                  console.log('Traza de "Elemento 2"');
                },
                section : []
              }
            ]
          },
          slots : [],
          path  : 'storybook-menu-blocks-use'
        },
        {
          title     : 'Menu',
          name      : 'dl-ui-menu',
          className : 'menu',
          props     : {
            'class' : 'dl-ui-menu',
            menu    : {
              label    : 'ROOT',
              children : [
                { label : 'File', leftIcon : 'dl-ids-icon-user-single-outlined' },
                { label : 'Edit', leftIcon : 'dl-ids-icon-user-single-outlined' },
                { label : 'Object', disabled : true }
              ]
            }
          },
          slots : [],
          path  : 'storybook-menu-use'
        },
        {
          title     : 'Rating',
          name      : 'dl-ui-rating',
          className : 'rating',
          props     : {
            'class'    : 'dl-ui-rating',
            stars      : 5,
            value      : 3,
            showCancel : false
          },
          slots : [],
          path  : 'storybook-rating-use'
        },
        {
          title     : 'Snack',
          name      : 'dl-ui-snack',
          className : 'snack',
          props     : {
            'class'  : 'dl-ui-snack',
            position : 'relative',
            type     : 'error',
            show     : true,
            text     : [
              'A line of text',
              'An alternative line of text'
            ]
          },
          slots : [],
          path  : 'storybook-snack-use'
        },
        {
          title     : 'Split Button',
          name      : 'dl-ui-split-button',
          className : 'split-button',
          props     : {
            'class'            : 'dl-ui-split-button',
            'actionButtonIcon' : 'dl-ids-icon-arrows-down-single-no_circle-outlined'
          },
          slots : [],
          path  : 'storybook-split-button-use'
        },
        {
          title     : 'Split Panes',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-split-panes.png',
          path      : 'storybook-split-panes-use'
        },
        {
          title     : 'Stepper',
          name      : 'dl-ui-stepper',
          className : 'stepper',
          props     : {
            'class'             : 'dl-ui-stepper',
            startPointCompleted : false,
            steps               : 4,
            value               : 2
          },
          slots : [],
          path  : 'storybook-stepper-use'
        },
        {
          title     : 'Tabs',
          name      : 'dl-ui-tabs',
          className : 'tabs',
          props     : {
            // eslint-disable-next-line strict-vue/require-jsdoc
            'class' : 'dl-ui-tabs'
          },
          components : [
            {
              name      : 'dl-ui-tab',
              className : 'tab',
              props     : {
                title    : 'Tab 1',
                selected : true,
                'class'  : 'dl-ui-tab'
              },
              content : 'tab 1 content'
            },
            {
              name      : 'dl-ui-tab',
              className : 'tab',
              props     : {
                title    : 'Tab 2',
                selected : false,
                'class'  : 'dl-ui-tab'
              },
              content : 'tab 2 content'
            }
          ],
          slots : [],
          path  : 'storybook-tabs-use'
        },
        {
          title     : 'Accordion List',
          name      : 'dl-ui-accordion-list',
          className : 'accordion-list',
          props     : {
            'class'    : 'dl-ui-accordion-list',
            accordions : [
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
                show        : false
              }
            ]
          },
          slots : [],
          path  : 'storybook-accordion-list-use'
        },
        {
          title     : 'Cesium Map',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-cesium-map.png',
          path      : 'storybook-cesium-map-use'
        },
        {
          title     : 'Datagrid',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-datagrid.png',
          path      : 'storybook-datagrid-use'
        },
        {
          title     : 'Leaflet Map',
          name      : 'image',
          className : 'img',
          imageName : 'dl-ui-leaflet-map.png',
          path      : 'storybook-leaflet-map-use'
        }
      ],
      currentComponents : []
    };
  },
  methods : {
    /**
     * Override
     * @override
     */
    onPageChange(currentItems) {
      this.currentComponents = currentItems;
    },
    /**
     * Override
     * @override
     */
    goToComponent(compPath) {
      this.$router.push(compPath);
    }
  }
};
