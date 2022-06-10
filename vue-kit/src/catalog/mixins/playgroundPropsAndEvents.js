/**
 * mixin used in component demo, dl-ui-xxxxx/__DEMO/demo__dl-ui-xxxxx.js
 */
import { camelize, toHandlerKey } from '@vue/shared';

export default {
  props : {
    /** options of playground */
    customOptions : {
      type    : Object,
      default : () => ({
        showDescription : true,
        showUse         : true
      })
    }
  },
  computed : {
    /**
     * Creates an object of props, generated from playground array
     * @returns {Object} Understandable object of props inside component so they match
     */
    generatedProps() {
      const props = {};
      // Compute only for demo components
      this.playground.slots?.forEach(slot => {
        props[slot.label] = slot.value;
      });
      this.playground.props?.forEach(prop => {
        props[prop.label] = prop.value;
      });
      if (this.playground.value?.value) {
        props.value = this.playground.value.value;
      }
      this.playground.customOptions = this.customOptions;

      return props;
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      props             : {},
      componentDemoRefs : [],
      playground        : {
        props   : [],
        slots   : [],
        value   : {},
        style   : {},
        options : { }
      }
    };
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.props = this.generatedProps;
    this.checkEventsDocumentation();
    this.checkEventsListenedInDemo();

    this.checkOthersEventsInDemo();
  },
  /**
   * override
   * @override
   */
  beforeUpdate() {
    this.componentDemoRefs = [];
  },
  methods : {
    /**
     * Check if every event in component is documented and published in "emits" option
     */
    checkEventsDocumentation() {
      const arrEventMetadata = Array.from(this.component.events || [], element => element.name);

      arrEventMetadata.ma;
      let eventsPublished = [];

      // if emits config is type array of event names
      if (Array.isArray(this.component.emits)) {
        eventsPublished = this.component.emits;
      }
      else if (this.component.emits) {
        eventsPublished = Object.keys(this.component.emits);
      }
      // check if every published event is documented in metadata
      eventsPublished.forEach(eventPublish => {
        if (!arrEventMetadata.includes(eventPublish)) {
          // eslint-disable-next-line no-console
          console.error(`Event "${eventPublish}" is published in component emits option but is not documented in metadata`);
        }
      });
      // check if every documented event in metadata is published
      arrEventMetadata.forEach(eventMetadata => {
        if (!eventsPublished.includes(eventMetadata)) {
          // eslint-disable-next-line no-console
          console.error(`Event "${eventMetadata}" documented in metadata but is not published in component emits option `);
        }
      });
    },
    /**
     * Check if every event of component has a listener to "notifyComponentEvent" function
     */
    checkEventsListenedInDemo() {
      const functionDemoTraceName = 'notifyComponentEvent';
      const arrEventMetadata = Array.from(this.component.events || [], element => element.name);
      if (arrEventMetadata.length > 0 && Array.isArray(arrEventMetadata)) {
        if (this.componentDemoRefs[0]) {
          const runtimeComponentConfig = this.componentDemoRefs[0].$.vnode.props;
          arrEventMetadata.forEach(eventMetadata => {
            const handlerExpected = toHandlerKey(camelize(eventMetadata));
            if ((runtimeComponentConfig[handlerExpected] === undefined)) {
            // eslint-disable-next-line no-console
              console.error(`Event "${eventMetadata}" has no linked with specific listener in this demo component to raise "${functionDemoTraceName}" function`);
            }
            else if (!runtimeComponentConfig[handlerExpected].toString().includes(functionDemoTraceName)) {
            // eslint-disable-next-line no-console
              console.error(`Event "${eventMetadata}" has linked but no use "${functionDemoTraceName}" function to trace it in this demo`);
            }
          });
        }
      }
    },

    /**
     * Check listeners not in component
     * busco listeners indeseados: @click="notifyComponentEvent('update:modelValue', $event)"
     */
    checkOthersEventsInDemo() {
      const arrEventMetadata = Array.from(this.component.events || [], element => element.name);
      const runtimeComponentConfig = this.componentDemoRefs[0].$.vnode.props;
      // esto descubre ref() y no encuentra el update:modelValue (es un array de dos funciones)
      const compFuncNames = Object.keys(runtimeComponentConfig).filter(k => typeof runtimeComponentConfig[k] === 'function' && k !== 'ref');
      compFuncNames.map(fn => fn.substring(2))
        .map(fn => fn.charAt(0).toLowerCase() + fn.slice(1))
        .forEach(fn => {
          if (!arrEventMetadata.includes(fn)) {
            // eslint-disable-next-line no-console
            console.warn(`Event ${fn} is listened but not is component event`);
          }
        });
    },
    /**
     * catalog a button press event
     * @param {String} name Event name
     * @param {Object} payload Event payload
     */
    notifyComponentEvent(name, payload) {
      if (this.$refs.demo.$refs.playground) {
        this.$refs.demo.$refs.playground.notifyComponentEvent(name, payload);
      }
    },
    /**
     * Add ref to element
     * @param {Object} el element
     */
    setDemoRefs(el) {
      if (el) {
        this.componentDemoRefs.push(el);
      }
    }
  }
};

