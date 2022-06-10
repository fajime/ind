
export default {
  name  : 'dl-comp-kit-demo-use',
  props : {
    /** the component itself */
    component : {
      type    : Object,
      default : () => ({})
    }
  },
  computed : {
    /**
     * Introduction of section
     *
     * @returns {String} text
     */
    intro() {
      let returnValue;
      const part1 = `Para poder utilizar este componente es necesario realizar su importación en el componente VUE donde se desee utilizar y añadir su etiqueta en el template HTML, con los manejadores de eventos y las propiedades deseadas `;
      const part2 = `y si se desea modificar las propiedades de CSS generando una nueva clase a partir de su mixin.`;
      returnValue = (this.component.nameScssDefaultClass) ? part1 + part2 : part1;
      returnValue = `${returnValue}.`;
      return returnValue;
    },
    /**
     * Html code
     *
     * @returns {String} text
     */
    HTML() {
      let events = '';
      let properties = '';
      let slots = '';
      if (this.component.events && this.component.events.length > 0) {
        events = ' ';
        for (let step = 0; step < Math.min(this.component.events.length, 3); step++) {
          events += `@${this.component.events[step].name}="${this.component.events[step].name}EventListener" `;
        }
        events += '...';
      }
      if (this.propArray.length > 0) {
        properties = ' ';
        for (let step = 0; step < Math.min(this.propArray.length, 3); step++) {
          properties += `:${this.propArray[step].name}="${this.propArray[step].name}" `;
        }
        properties += '...';
      }
      if (this.component.slots && this.component.slots.length > 0) {
        slots = `...[Slot${this.component.slots.length > 1 ? 's' : ''} HTML]...`;
      }
      return `<${this.component.name}${properties}${events}>${slots}</${this.component.name}>`;
    },
    /**
     * JS code
     *
     * @returns {String} text
     */
    JS() {
      return `import ${this.component.nameJS} from '@indra-dl/dl-fmwk-vue-comp-kit/src/components/${this.component.type}s/${this.component.name}'\n...\ncomponents : { '${this.component.name}' : ${this.component.nameJS} },\n...`;
    },
    /**
     * SCSS code
     *
     * @returns {String} text
     */
    SCSS() {
      let items = '';
      let returnValue = '';
      if (this.component.scss && this.component.scss.length > 0) {
        this.component.scss.forEach((element, index) => {
          let value = `\n    '${element.name}': ${element.default}`;
          if (index !== this.component.scss.length - 1) {
            value = `${value},`;
          }
          items = items + value;
        });
        returnValue = `@import '~@indra-dl/dl-fmwk-vue-comp-kit/src/components/${this.component.type}s/${this.component.name}/mixins/${this.component.nameScssMixinFile}'\n\n$config: (  ${items}\n);\n\n.component-class {\n  @include ${this.component.nameScssMixin}($config);\n}`;
      }

      return returnValue;
    },
    /**
     * Property array: generated easy-to-process array built from original compo's props
     * @returns {Array} props
     */
    propArray() {
      if (this.component.props) {
        return Object.keys(this.component.props)
          .map(key => ({
            name : key
          }));
      }
      return [];
    }
  }
};
