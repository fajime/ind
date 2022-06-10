import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-kit-storybook-demo-playground',
  components : {
    DlUiIcon                     : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon')),
    DlCompKitDemoPlaygroundInput : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-kit-demo-playground-input"*/ '@/storybook/components/atoms/dl-comp-kit-demo-playground-input'))
  },
  computed : {
    /**
     * get all input to paint in screen
     * @return {Array} Array with all inputs
     */
    allInputs() {
      const result = [];
      if (this.inputs?.slots?.length > 0) {
        result.push(...this.inputs.slots);
      }
      if (this.inputs?.props?.length > 0) {
        result.push(...this.inputs.props);
      }
      if (this.inputs?.value && Object.keys(this.inputs?.value).length > 0 ) {
        result.push(this.inputs.value);
      }
      if (this.inputs?.style && Object.keys(this.inputs?.style).length > 0 ) {
        result.push(this.inputs.style);
      }
      return result;
    }
  },
  props : {
    /** inputs to show in control */
    inputs : {
      type    : Object,
      default : () => ({})
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      outputEmpty : true
    };
  },
  methods : {
    /**
     * detects events and write add new line to opuput
     *
     * @param {String} eventName line to add
     * @param {String} payload payload
     */
    notifyComponentEvent(eventName, payload) {
      const date = new Date();
      const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      const millis = date.getMilliseconds() > 9 ? date.getMilliseconds() > 99 ? date.getMilliseconds() : `0${date.getMilliseconds()}` : `00${date.getMilliseconds()}`;
      const time = `${hours}:${minutes}:${seconds}.${millis}`;
      let event = `<span style="color:#44667F; font-size: 14px;">${time} <i>${eventName}</i></span>`;
      if (payload !== undefined) {
        if (typeof (payload) === 'object') {
          if (Object.getPrototypeOf(payload).constructor.name === 'Object') {
            // eslint-disable-next-line guard-for-in
            for (const key in payload) {
              event += `\n    <i style="color:#baccdb; font-size: 14px;">${key} → ${payload[key]}</i>`;
            }
          }
          else {
            event += `\n    <i style="color:#baccdb; font-size: 14px;">${Object.getPrototypeOf(payload).constructor.name}</i>`;
          }
        }
        else {
          event += `\n    <i style="color:#baccdb; font-size: 14px;">${payload}</i>`;
        }
      }
      this.$refs.output.innerHTML = `<div style="border-bottom: 1px solid #baccdb; padding: 4px">${event}</div>${this.$refs.output.innerHTML}`;
      this.outputEmpty = false;
    },
    /**
     * Clear content of output
     *
     */
    clearOutput() {
      this.$refs.output.innerHTML = '';
      this.outputEmpty = true;
    }
  }
};
