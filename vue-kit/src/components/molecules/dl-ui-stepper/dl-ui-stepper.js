import randomIdMixin from '../../../mixins/randomId';
import DlUiProgressBar from '../../atoms/dl-ui-progress-bar';
import DlUiStep from '../../atoms/dl-ui-step';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-stepper',
  components : {
    'dl-ui-progress-bar' : DlUiProgressBar,
    'dl-ui-step'         : DlUiStep
  },
  mixins : [randomIdMixin],
  emits  : ['update:modelValue'],
  props  : {
    /**
     * Value.
     */
    modelValue : {
      type    : Number,
      default : 0,
      desc    : 'Indica el step seleccionado'
    },
    /** TODO: clickable/disabled como propertie para que sea el stepper en encargado y no cada step... */

    /** step mode */
    mode : {
      type    : String,
      default : 'dot',
      desc    : 'Formato del step, ("dot"|"icon"|"numeric")',
      // eslint-disable-next-line require-jsdoc
      validator(value) {
        return ['icon', 'numeric', 'dot'].includes(value);
      }
    },
    /**  smooth transitions */
    timingSyncOffset : {
      type    : Number,
      default : 40,
      desc    : 'ms offset to smooth the timing of the animations between the bar and the steps'
    },
    /**
     * Steps represented
     */
    steps : {
      type    : Array,
      default : () => [3],
      desc    : 'Número de pasos a completar'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      prevCurr       : 0,
      barAvgDuration : 0,
      pbar           : null
    };
  },
  // eslint-disable-next-line require-jsdoc
  mounted() {

    this.steps[this.modelValue].current = true;

    let pbarConfigDuration = 0;
    const pbarWrapper = this.$el.getElementsByClassName('dl-ui-stepper__progress-wrapper')[0];
    this.pbarEl = pbarWrapper.getElementsByClassName('dl-ui-progress-bar')[0];
    const stl = getComputedStyle(this.pbarEl);
    pbarConfigDuration = parseInt(stl.getPropertyValue('--pbar-config-duration').match( /\d+/g )[0], 10);

    this.$el.style.setProperty('--num-steps', this.steps.length);
    this.$el.style.setProperty('--curr-step', this.curr);
    this.barAvgDuration = pbarConfigDuration / ( this.steps.length - 1 );
    this.$el.style.setProperty('--bar-avg-duration', this.barAvgDuration);

  },
  computed : {
    /**
     * Current step index
     * TODO: review for using modelValue, so discard this computed
     * @returns {Number} index
     */
    curr() {
      const currStep = this.steps.findIndex(s => s.current);
      this.prevCurr = currStep;
      return currStep;
    },
    /**
     * Steps to paint in compo
     * @returns {Array} Steps to paint
     *
     */
    stepsToPaint() {
      const stepsHidrated = this.steps.map((s, idx) => {
        s.label = s.label || `Step ${idx}`;
        s.mode = this.mode;
        s.current = idx === 0;
        return s;
      });

      return stepsHidrated;
    }
    /**
     * Step active
     * @returns {Number} Steps active to determinate status
     *
     */

  },
  watch : {
    // eslint-disable-next-line require-jsdoc
    modelValue(newVal) {
      /* reset steps*/
      this.steps.forEach((s, idx) => {
        s.complete = idx < newVal;
        s.current = idx === newVal;
      });
      const newCurrent = newVal;
      const salto = Math.abs(newCurrent - this.prevCurr);
      const barDuration = salto * this.barAvgDuration;
      const stepIniDelay = this.timingSyncOffset;
      let interSalto = 0;
      if (this.prevCurr < newCurrent) {
        let del = 0;
        for (let x = this.prevCurr; x <= newCurrent; x++) {
          this.setStepCssVariables(x, del);
          del = (++interSalto * this.barAvgDuration ) - this.timingSyncOffset;
        }
      }
      else {
        let del = stepIniDelay;
        for (let x = this.prevCurr; x >= newCurrent; x--) {
          this.setStepCssVariables(x, del);
          del = (++interSalto * this.barAvgDuration ) - this.timingSyncOffset;
        }
      }

      // const bar = this.$el.children[1].children[0];
      this.pbarEl.style.setProperty('--bar-duration', `${barDuration}ms` );
    }
  },
  methods : {
    /**
     * emit 'select' event whit current step index
     * @param {Number} stepIndex current step index
     */
    onStepClicked(stepIndex) {
      // this.$emit('select', stepIndex);
      this.$emit('update:modelValue', stepIndex);
    },
    /**
     * Set css variable in step
     * @param {Number} stepIndex step index
     * @param {Number} delay delay in ms
     */
    setStepCssVariables(stepIndex, delay) {
      const stepContent = this.$refs[`step${stepIndex}`][0].$el.children[0];
      const stepLabel = this.$refs[`step${stepIndex}`][0].$el.children[1];
      stepContent.style.setProperty('--step-delay', `${delay}ms` );
      stepLabel.style.setProperty('--step-delay', `${delay}ms` );
    }
  },
  // DEMO META DATA
  ...metadata
};
