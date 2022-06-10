import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-kit-storybook-demo-use',
  components : {
    DlCompKitStorybookDemoCode : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-kit-storybook-demo-code"*/ '@/storybook/components/molecules/dl-comp-kit-storybook-demo-code'))
  },
  props : {
    /** the component itself */
    component : {
      type    : Object,
      default : () => ({})
    }
  },
  computed : {
    /**
     * Html code
     *
     * @returns {String} text
     */
    HTML() {
      let events = '';
      let properties = '';
      let slots = '';
      let className = '';
      if (this.component.events && this.component.events.length > 0) {
        events = ' ';
        const eventLength = Math.min(this.component.events.length, 3);
        for (let step = 0; step < eventLength; step++) {
          events += `@${this.component.events[step].name}="${this.component.events[step].name}EventListener" `;
        }
        events += '...';
      }
      if (this.propArray.length > 0) {
        properties = ' ';
        const propLength = Math.min(this.propArray.length, 3);
        for (let step = 0; step < propLength; step++) {
          properties += `:${this.propArray[step].name}="${this.propArray[step].name}" `;
        }
        properties += '...';
      }
      if (this.component.slots && this.component.slots.length > 0) {
        slots = `...[Slot${this.component.slots.length > 1 ? 's' : ''} HTML]...`;
      }
      if (this.component.nameScssDefaultClass) {
        className = ` class="${this.component.nameScssDefaultClass}"`;
      }
      return `<${this.component.name}${className}${properties}${events}>${slots}</${this.component.name}>`;
    },
    /**
     * JS code
     *
     * @returns {String} text
     */
    JS() {
      return `import ${this.component.nameJS} from '@sigle/dl-fmwk-vue-comp-kit/src/components/${this.component.type}s/${this.component.name}';\n...\ncomponents : { '${this.component.name}' : ${this.component.nameJS} },\n...`;
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
        returnValue = `@import '~@sigle/dl-fmwk-vue-comp-kit/src/components/${this.component.type}s/${this.component.name}/mixins/${this.component.nameScssMixinFile}';\n\n$config: (  ${items}\n);\n\n.component-class {\n  @include ${this.component.nameScssMixin}($config);\n}`;
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
