import metadata from './_metadata';
import DlUiIcon from '../../atoms/dl-ui-icon';
import DlUiInput from '../../atoms/dl-ui-input';

export default {
  name       : 'dl-ui-timepicker',
  emits      : ['update:modelValue', 'selected'],
  components : {
    'dl-ui-icon'  : DlUiIcon,
    'dl-ui-input' : DlUiInput
  },
  props : {
    /**
     * Value.
     */
    modelValue : {
      type    : String,
      default : '',
      desc    : 'Valor del input text'
    },
    /**
     * Disables the whole box time
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Desactiva el evento del botón y aplica la clase <span class="demo__md--syntax">--disabled</span>'
    },

    /**
     * Separator symbol
     */
    timeSeparator : {
      type    : String,
      default : ':',
      desc    : `Separador utilizado para mostrar el tiempo`
    },
    /**
     * Hour formatting string returned
     */
    timeFormat : {
      type    : String,
      default : '24hour',
      desc    : `Formato para respresentar e interpretar el tiempo en la caja de texto.`
    },

    /**
     * max time available
     */
    maxTime : {
      type    : Date,
      default : () => new Date('July 21, 1983 23:55:00'),
      desc    : 'Tiempo máximo seleccionable'
    },
    /**
     * min time available
     */
    minTime : {
      type    : Date,
      default : () => new Date('July 21, 1983 00:00:00'),
      desc    : 'Tiempo mínimo seleccionable'
    },
    /**
     * Increase or decrease
     */
    intervalMinutes : {
      type    : Number,
      default : 5,
      desc    : 'Intervalo para incrementar o decrementar los minutos'
    }

  },
  /**
   * override
   * @override
   */
  data() {
    return {
      internalError       : false,
      interval            : false,
      hourTimeReference   : new Date('July 21, 1983 00:00:00').getHours(),
      minuteTimeReference : new Date('July 21, 1983 00:00:00').getMinutes(),
      timeSelected        : undefined,
      inputValue          : undefined,
      textInputValue      : undefined
    };
  },

  methods : {
    /**
     * override
     */
    increaseHour() {
      if (this.hourTimeReference < 23 &&
        this.hourTimeReference < this.maxTime.getHours()) {
        this.hourTimeReference++;
      }
      else {
        this.hourTimeReference = this.minTime.getHours();
      }

    },
    /**
     * override
     */
    decreaseHour() {
      if (this.hourTimeReference > 0 &&
        this.hourTimeReference > this.minTime.getHours()) {
        this.hourTimeReference -= 1;
      }
      else {
        this.hourTimeReference = this.maxTime.getHours();
      }
    },
    /**
     * override
     * @returns {String|undefined} - flag in string
     */
    increaseMinute() {
      if (this.minuteTimeReference < 60 - this.intervalMinutes) {
        this.minuteTimeReference += this.intervalMinutes;
      }
      else {
        this.minuteTimeReference = this.minTime.getMinutes();
        this.increaseHour();
        return 'remove recursion';
      }
      return undefined;
    },
    /**
     * override
     */
    decreaseMinute() {
      if (this.minuteTimeReference > this.minTime.getMinutes()) {
        this.minuteTimeReference -= this.intervalMinutes;
      }
      else {
        this.minuteTimeReference = 60 - this.intervalMinutes;
      }

    },
    /**
     * override
     *  @param {function} method - increase or decrease
     */
    longMouseDownStart(method) {
      /**
       * override
       */
      const rr = method();
      if (rr === 'remove recursion') {
        this.decreaseHour();
      }
      else {
        this.interval = setInterval(() => {
          method();
        }, 200);
      }
    },
    /**
     * override
     */
    longMouseDownStop() {
      clearInterval(this.interval);
    },
    /**
     * format to hour type
     * @param {Number} number hours or minutes
     * @return {Number} number to display
     */
    formatHourType(number) {
      let type = 'AM';
      if (number > 11) {
        type = 'PM';
      }
      return type;
    },
    /**
     * format to hour format
     * @param {Number} number hours or minutes
     * @return {Number} number to display
     */
    formatHour(number) {
      let formated = number;
      if (this.timeFormat === '12hour') {
        formated = number % 12;
      }
      return this.formatNumber(formated);
    },
    /**
     * format to display
     * @param {Number} number hours or minutes
     * @return {Number} number to display
     */
    formatNumber(number) {
      if (number < 10) {
        return `0${ number}`;
      }
      return number;
    },
    /**
     * generate time format
     * @param {String} time - pass hour or minute
     * @return {String} - format time to display
     */
    formatTime(time) {
      if (this.timeFormat === '24hour') {
        time = `${this.formatNumber(this.hourTimeReference) } ${this.timeSeparator} ${ this.formatNumber(this.minuteTimeReference)}`;
      }
      else {
        time = `${this.formatHour(this.hourTimeReference) } ${this.timeSeparator} ${this.formatNumber(this.minuteTimeReference)} ${this.formatHourType(this.hourTimeReference)}`;
      }
      return time;
    },
    /**
     * check if a hour is disabled by config
     * @param {Date} time date to check
     * @returns {Boolean} value if this date has to be disabled
     */
    isDisabledHour() {
      return (
        this.hourTimeReference < this.minTime.getHours() ||
        this.hourTimeReference > this.maxTime.getHours()
      );
    },
    /**
     * disable minute
     * @param {Date} time - minute passed per parameter to compare
     * @return {Boolean} - value if this date has to ve disabled
     */
    isDisabledMinute() {
      return (
        this.minuteTimeReference < this.minTime.getMinutes() ||
        this.minuteTimeReference > this.maxTime.getMinutes()
      );

    },
    /**
     * listener for click in hour
     * @param {String} hourSelected hour selected
     */
    hourSelected(hourSelected) {
      if (this.hourTimeReference > this.maxTime.getHours() || this.hourTimeReference < this.minTime.getHours()) {
        this.timeSelected = null;
        this.textInputValue = null;
      }
      else {
        this.timeSelected = this.formatTime(hourSelected);
        this.textInputValue = this.timeSelected;
        this.$emit('update:modelValue', this.textInputValue);
      }
    },
    /**
     * listener for click in minute
     * @param {String} minuteSelected minute selected
     */
    minuteSelected(minuteSelected) {
      if (this.hourTimeReference > this.maxTime.getHours() || this.hourTimeReference < this.minTime.getHours()) {
        this.timeSelected = null;
        this.textInputValue = null;
      }
      else {
        this.timeSelected = minuteSelected;
        this.textInputValue = this.formatTime(minuteSelected);
        this.$emit('update:modelValue', this.textInputValue);
      }
    },
    /**
     * validate value texted on input
     * @param {String} text text input
     * @param {Boolean} userInteract true when is execute by user interaction
     * @param {Boolean} firstLoad true when is execute by mounted hook
     */
    validateTimeInput(text, userInteract = true, firstLoad = false) {
      if (text === '') {
        this.timeValue = undefined;
        this.timeSelected = undefined;
      }
      this.timeValue = this.parseTimeInput(text);

      if (this.timeFormat === '12hour') {
        userInteract = true;
      }
      if (this.timeValue) {
        this.hourTimeReference = this.timeValue.getHours();
        this.minuteTimeReference = this.timeValue.getMinutes();
        this.timeSelected = this.timeValue;
        userInteract
          ? this.$emit('update:modelValue', text)
          : firstLoad
            ? undefined
            : this.$emit('selected', this.timeSelected);
      }
      else {
        this.timeValue = undefined;
        this.timeSelected = undefined;
      }
    },
    /**
     * parse text to date using dateformat
     * @param {String} text text to parse
     * @returns {Date} Date parsed
     */
    parseTimeInput(text) {
      let returnTime;
      try {
        if (text !== '') {
          if (this.timeFormat === '24hour') {
            const parts = text.split(this.timeSeparator);
            if (parts.length !== 2) {
              throw new Error(
                `Date has not the correct format (${this.timeFormat})`
              );
            }
            const hour = parseInt(parts[0], 10);
            if (hour < 0 || hour > 23) {
              throw new Error(`hour must be between 0 and 23`);
            }
            const minute = parseInt(parts[1], 10);
            if (minute < 0 || minute > 59) {
              throw new Error(`hour must be between 0 and 59`);
            }

            if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59 ) {
              const today = new Date();
              const aux = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, 0);
              returnTime = aux;
            }
          }
          else {

            const parts = text.split(' ');
            const timeParts = parts[0].split(this.timeSeparator);
            if (timeParts.length !== 2) {
              throw new Error(
                `Date has not the correct format (${this.timeFormat})`
              );
            }
            let hour = parseInt(timeParts[0], 10);
            if (hour < 0 || hour > 23) {
              throw new Error(`hour must be between 0 and 23`);
            }
            const minute = parseInt(timeParts[1], 10);
            if (minute < 0 || minute > 59) {
              throw new Error(`hour must be between 0 and 59`);
            }
            hour = parts[1] === 'PM' ? hour + 12 : hour;
            const today = new Date();
            const aux = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute, 0);
            returnTime = aux;
          }

        }
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error while parse date. ${error}`);
        returnTime = undefined;
      }
      return returnTime;
    },
    /**
     * Set or remove class disabled
     *
     */
    setDisabledClass() {
      if (this.disabled) {
        Array.from(this.$refs.box.classList).forEach(classElement => {
          this.$refs.box.classList.add(`${classElement}--disabled`);
        });
      }
      else {
        const classToRemove = Array.from(this.$refs.box.classList).filter(
          classElement => classElement.includes('--disabled')
        );
        classToRemove.forEach(classElement => {
          this.$refs.box.classList.remove(classElement);
        });
      }
    }
  },

  watch : {

    /**
     * Override
     * @override
     */
    disabled() {
      this.setDisabledClass();
    },
    /**
     * detects when value change
     * @param {String} newValue new value
     */
    modelValue(newValue) {
      this.textInputValue = newValue;
      this.validateTimeInput(this.textInputValue, false);
    },
    /**
     * detects when value change
     */
    selectionMode() {
      this.textInputValue = '';
      this.timeValue = undefined;
      this.timeSelected = undefined;
    }
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.setDisabledClass();
    this.textInputValue = this.modelValue;
    this.validateTimeInput(this.textInputValue, false, true);
  },

  /** To unbind click outside of the event @see close */
  beforeDestroy() {
    window.removeEventListener('click', this.close);
  },
  // DEMO META DATA
  ...metadata

};
