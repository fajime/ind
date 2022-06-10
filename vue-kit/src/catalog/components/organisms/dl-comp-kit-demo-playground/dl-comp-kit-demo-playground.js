/* eslint-disable max-depth */
import DlCompKitPlaygroundInput from '../../../components/atoms/dl-comp-kit-demo-playground-input';
import DlUiIcon from '@/components/atoms/dl-ui-icon';
export default {
  name       : 'dl-comp-kit-demo-playground',
  components : {
    'dl-ui-icon'                        : DlUiIcon,
    'dl-comp-kit-demo-playground-input' : DlCompKitPlaygroundInput
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
      const milliseconds = date.getMilliseconds() > 9 ? date.getMilliseconds() > 99 ? date.getMilliseconds() : `0${date.getMilliseconds()}` : `00${date.getMilliseconds()}`;
      const time = `${hours}:${minutes}:${seconds}.${milliseconds}`;
      let payloadHtml;
      if (payload !== undefined) {
        let valuePayload;
        if (typeof (payload) === 'object') {
          if (Object.getPrototypeOf(payload).constructor.name === 'Object') {
            const objValues = [];
            // eslint-disable-next-line guard-for-in
            for (const key in payload) {

              try {
                if (Object.getPrototypeOf(payload[key]).constructor.name === 'Function') {
                  objValues.push(`<span class="dl-comp-kit-demo-playground__output-item-value-name">${key}</span><span class="dl-comp-kit-demo-playground__output-item-arrow">→</span>${payload[key].name}`);
                }
                else {
                  objValues.push(`<span class="dl-comp-kit-demo-playground__output-item-value-name">${key}</span><span class="dl-comp-kit-demo-playground__output-item-arrow">→</span>${JSON.stringify(payload[key], null, 4)}`);
                }
              }
              catch (e) {
                objValues.push(`<span class="dl-comp-kit-demo-playground__output-item-value-name">${key}</span><span class="dl-comp-kit-demo-playground__output-item-arrow">→</span>${payload[key]}`);
              }
            }
            valuePayload = objValues.join('\n');
          }
          else if (Object.getPrototypeOf(payload).constructor.name === 'Array') {
            valuePayload = `[${payload.join(', ')}]`;
          }
          else if (Object.getPrototypeOf(payload).constructor.name === 'Date') {
            valuePayload = `${payload}`;
          }
          else {
            valuePayload = `${Object.getPrototypeOf(payload).constructor.name}`;
          }
        }
        else {
          valuePayload = `${payload}`;
        }
        payloadHtml = `<pre class="dl-comp-kit-demo-playground__output-item-value">${valuePayload}</pre>`;
      }
      const eventNameHtml = `<div class="dl-comp-kit-demo-playground__output-item-name">
          <span class="dl-comp-kit-demo-playground__output-item-time">${time}</span> 
          ${eventName}
        </div>`;
      const valueHtml = `<div class="dl-comp-kit-demo-playground__output-item">${eventNameHtml}${payloadHtml}</div>`;
      this.$refs.output.innerHTML = `${valueHtml} ${this.$refs.output.innerHTML}`;
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
