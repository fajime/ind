
import DlCompKitDemoSection from '@/catalog/components/molecules/dl-comp-kit-demo-section';
import DlUiIcon from '@/components/atoms/dl-ui-icon';
import DlUiInput from '@/components/atoms/dl-ui-input';
import DlUiSelect from '@/components/atoms/dl-ui-select';

export default {
  name       : 'dl-comp-kit-how-to',
  components : {
    'dl-comp-kit-demo-section' : DlCompKitDemoSection,
    'dl-ui-icon'               : DlUiIcon,
    'dl-ui-input'              : DlUiInput,
    'dl-ui-select'             : DlUiSelect
  },
  computed : {
    /**
     * Name of component normalized
     * @returns {String} name normalized
     */
    componentNameNormalized() {
      return this.normalizeName(this.componentName);
    },
    /**
     * Template html of demo
     * @returns {String} template
     */
    demoTemplate() {
      return `&lt;dl-comp-kit-demo-template :component="component" :playground="playground" ref="demo"&gt;
      &lt;div class="demo__dl-ui-${this.componentNameNormalized}__wrapper"&gt;
          &lt;dl-ui-${this.componentNameNormalized}/&gt;
      &lt;/div&gt;
  &lt;/dl-comp-kit-demo-template&gt;`;
    },
    /**
     * Template of js of demo
     * @returns {String} template
     */
    demoJS() {
      return `import ${this.camelize(`dl-ui-${this.componentNameNormalized}`)} from '../';
      import DlCompKitDemoDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
      import desc from './data/demo__dl-ui-${this.componentNameNormalized}_desc';
      import properties from './data/demo__${this.componentNameNormalized}_properties';
      import slots from './data/demo__dl-ui-${this.componentNameNormalized}_slots';
      import events from './data/demo__dl-ui-${this.componentNameNormalized}_events';
      import scss from './data/demo__dl-ui-${this.componentNameNormalized}_scss';
      import mixinDemoEvents from '@/mixins/demoEvents';
      
      export default {
        name       : 'dl-ui-view-__DEMO-${this.componentNameNormalized}',
        components : {
          'dl-ui-${this.componentNameNormalized}'           : DlUiAccordion,
          'dl-comp-kit-demo-template' : DlCompKitDemoDemoTemplate
        },
        mixins : [mixinDemoEvents],
        /**
         * Override
         * @override
         */
        data() {
          return {
            playground : {
              labels : ['Cabecera:', 'Cuerpo:', 'estilo:'],
              inputs : [
                {
                  type        : 'text',
                  value       : 'Título',
                  placeholder : 'Contenido cabecera...'
                },
                {
                  type        : 'text',
                  value       : 'Contenido',
                  placeholder : 'Contenido cuerpo...'
                },
                {
                  type    : 'select',
                  value   : '${this.componentNameNormalized}',
                  options : [
                    { name : '${this.componentNameNormalized}', value : '${this.componentNameNormalized}' },
                    { name : 'Demo (${this.componentNameNormalized})', value : 'custom-${this.componentNameNormalized}' }
                  ]
                }
              ]
            },
            component : {
              description          : desc,
              titleName            : '${this.componentName}',
              name                 : 'dl-ui-${this.componentNameNormalized}',
              nameJS               : '${this.camelize(`dl-ui-${this.componentNameNormalized}`)}',
              type                 : '${this.componentType}',
              nameScssMixin        : '${this.componentNameNormalized}-style-config',
              nameScssDefaultClass : 'dl-ui-${this.componentNameNormalized}',
              nameScssMixinFile    : '_dl-ui-${this.componentNameNormalized}',
              properties,
              slots,
              events,
              scss
            }
          };
        }
      };`;
    },
    /**
     * Template of SCSS of demo
     * @returns {String} template
     */
    demoSCSS() {
      return `@import '~@/components/molecules/dl-ui-${this.componentNameNormalized}/mixins/dl-ui-${this.componentNameNormalized}';
      
      $config: (
        'header::background': #123456,
        'header::hover::background': #654321,
        'header::chevron::color': #FFFFFF,
        'header::active::border-bottom': #333333,
        'content::background': #FFFFFF
      );
      
      .demo__dl-ui-${this.componentNameNormalized}__wrapper {
          width: 50%;
      }
      
      .custom-dl-ui-${this.componentNameNormalized} {      
        @include dl-ui-${this.componentNameNormalized}-style-config($config);
      }`;
    },
    /**
     * Template of demo data desc
     * @returns {String} template
     */
    demoDataDesc() {
      return `export default \`&lt;p&gt;Descripción del componente dl-ui-${this.componentNameNormalized}.&lt;/p&gt;\``;
    },
    /**
     * Template of demo data Events
     * @returns {String} template
     */
    demoDataEvents() {
      return `export default [{
        name      : 'NombreDelEvento',
        condition : 'Condición de disparo',
        payload   : 'Objeto o valor asociado al evento'
      } ];`;
    },
    /**
     * Template of demo data Properties
     * @returns {String} template
     */
    demoDataProperties() {
      return `export default [
        {
          name    : 'NombreDeLaPropiedad',
          type    : 'Tipo de objeo (Number, String, Boolean,...)',
          default : 'Valor por defecto',
          desc    : 'Descripción de la propiedad'
        }];`;
    },
    /**
     * Template of demo data Scss
     * @returns {String} template
     */
    demoDataScss() {
      return `export default [{
        name    : 'NombreDeLaVariableSCSS',
        default : 'Valor por defecto',
        desc    : 'Descripción de la variable'
      }];`;
    },
    /**
     * Template of demo data slots
     * @returns {String} template
     */
    demoDataSlots() {
      return `export default [{
        name  : 'NombreDelSlot',
        usage : 'Descripción del slot'
      }];`;
    },
    /**
     * Template of demo data notes
     * @returns {String} template
     */
    demoDataNotes() {
      return `export default \`&lt;p&gt;Texto auxiliar para explicar aclaraciones del componente dl-ui-${this.componentNameNormalized}.&lt;/p&gt;\``;

    }
  },
  /**
   * Override
   * @Override
   */
  data() {
    return {
      componentName : '',
      componentType : 'atom'
    };
  },
  methods : {
    /**
     * Get a name normalized
     *
     * @param {String} name name to normalize
     * @returns {String} name normalized
     */
    normalizeName(name) {
      let value = name.replace(/ /g, '-');
      value = value.replace(/_/g, '-');
      // eslint-disable-next-line no-useless-escape
      value = value.replace(/[^A-Za-z\-]/gi, '');
      if (value !== '') {
        value = this.kebabCase(value);
      }
      return value;
    },
    /**
     * Get kebap case representation
     *
     * @param {String} str String to convert
     * @returns {String}  String converted
     */
    kebabCase(str) {
      const result = str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, match => `-${match.toLowerCase()}`);
      return (str[0] === str[0].toUpperCase()) ? result.substring(1) : result;
    },
    /**
     * Get camel case representation
     *
     * @param {String} str String to convert
     * @returns {String}  String converted
     */
    camelize(str) {
      const arr = str.split('-');
      let capital = arr.map((item, index) => (index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item));
      capital = capital.join('');
      return capital.charAt(0).toUpperCase() + capital.slice(1);
    }
  }
};
