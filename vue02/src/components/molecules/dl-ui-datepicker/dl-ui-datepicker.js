/* eslint-disable max-lines */
import { nextTick } from 'vue';
import DlUiInput from '../../atoms/dl-ui-input';
import DlUiIcon from '../../atoms/dl-ui-icon';
import metadata from './_metadata';
export default {
  name       : 'dl-ui-datepicker',
  components : {
    'dl-ui-input' : DlUiInput,
    'dl-ui-icon'  : DlUiIcon
  },
  emits : ['update:modelValue', 'selected'],
  props : {
    /**
     * Value.
     */
    modelValue : {
      type    : String,
      default : '',
      desc    : 'Valor del input text'
    },
    /** date format */
    dateFormat : {
      type    : String,
      default : 'dd/mm/yyyy',
      desc    : `<p>Se trata de una amplia biblioteca JavaScript que abarca desde efectos dinámicos, hasta menús, calendarios, etc. En concreto, el componente Datepicker nos proporciona un calendario totalmente personalizable, en el que podremos realizar selecciones de fechas y asociarlo a elementos HTML, como entradas de formularios.</p>
      Formato para respresentar e interpretar la fecha en la caja de texto. Se contemplan los siguiente patrones:
          dd - dia del mes  (dos dígitos)
          mm - me del año  (dos dígitos)
          yy - year (four digit)`
    },
    /** date separator */
    dateSeparator : {
      type    : String,
      default : '/',
      desc    : `Separador utilizado para fecha`
    },
    /** range separator */
    rangeSeparator : {
      type    : String,
      default : ' - ',
      desc    : `Separador utilizado para mostrar rango`
    },
    /** multiple separator */
    multipleSeparator : {
      type    : String,
      default : ' - ',
      desc    : `Separador utilizado para mostrar multiples valores`
    },
    /**
     * Disables input behavior.
     */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo disabled del input.'
    },
    /**
     * Error style
     */
    error : {
      type    : Boolean,
      default : false,
      desc    : 'Show error style'
    },
    /**
     * Requires input.
     */
    required : {
      type    : Boolean,
      default : false,
      desc    : 'Activa el modo required del input, en un form.'
    },
    /**
     * Label
     */
    label : {
      type    : String,
      default : undefined,
      desc    : 'Etiqueta superior'
    },
    /**
     * Underline help text
     */
    help : {
      type    : String,
      default : undefined,
      desc    : 'Texto de ayuda bajo el campo'
    },
    /**
     * Locale
     */
    locale : {
      type    : String,
      default : 'en-GB',
      desc    : 'Locale por defecto a utilizar para pintar nombres y formatos'
    },
    /**
     * translation object
     */
    lang : {
      type    : Object,
      default : () => ({ goToToday : 'Today' }),
      desc    : 'Translation object'
    },
    /**
     * selection mode
     */
    selectionMode : {
      type    : String,
      default : 'single',
      desc    : 'Tipo de selección de fecha (single / range / multiple), simple o rango',
      /**
       * validator value function
       * @param {String} value value to test
       * @returns {Boolean} result of validation
       */
      validator(value) {
        // value must be single o range
        return ['single', 'multiple', 'range'].indexOf(value) !== -1;
      }
    },
    /**
     * max date available
     */
    maxDate : {
      type    : Date,
      default : () => new Date(8640000000000000),
      desc    : 'Fecha máxima seleccionable'
    },
    /**
     * min date available
     */
    minDate : {
      type    : Date,
      default : () => new Date(-8640000000000000),
      desc    : 'Fecha mínima seleccionable'
    }
  },
  watch : {
    /**
     * watch over shoOverlay value to take actions
     * @param {Boolean} newValue new valua
     */
    showOverlay(newValue) {
      if (newValue) {
        nextTick(() => {
          // function to control overlay position
          const allocateOverlay = (htmlElementRef, htmlElementOverlay) => {
            // get data from overlay layer
            const overlayRect = htmlElementOverlay.getClientRects()[0];
            const overlayHeight = overlayRect.height;
            const overlayBottom = overlayRect.bottom;
            // get data from reference element
            const referenceRect = htmlElementRef.getClientRects()[0];
            const referenceHeight = referenceRect.height;
            const referenceTop = referenceRect.top;
            // get height of screen
            const windowHeight = window.innerHeight;
            // margin to avoid window border collide
            const securityMargin = 30;
            // if it does not fit below the reference it is placed on top of it
            if (
              windowHeight < overlayBottom + securityMargin &&
              referenceTop - overlayHeight > securityMargin
            ) {
              this.$refs.overlay.style.bottom = `${referenceHeight}px`;
            }
            else {
              this.$refs.overlay.style.bottom = '';
            }
          };
          allocateOverlay(this.$refs.input.$refs.input, this.$refs.overlay);
        });
      }
    },
    /**
     * detects when value change
     * @param {String} newValue new value
     */
    modelValue(newValue) {
      this.textInputValue = newValue;
      this.validateDateInput(this.textInputValue, false);
    },
    /**
     * detects when value change
     */
    selectionMode() {
      this.textInputValue = '';
      this.dateValue = undefined;
      this.dateSelected = undefined;
      this.multipleValue = { values : [] };
      this.multipleSelected = [];
      this.rangeValue = { start : undefined, end : undefined };
      this.rangeSelected = { start : undefined, end : undefined };
      this.internalError = false;
    }
  },
  computed : {
    /**
     * get text placeholder for input
     * @returns {String} placeholder
     */
    placeholder() {
      let value;
      if (
        this.selectionMode === 'single' ||
        this.selectionMode === 'multiple'
      ) {
        value = this.dateFormat;
      }
      if (this.selectionMode === 'range') {
        value = `${this.dateFormat}${this.rangeSeparator}${this.dateFormat}`;
      }
      return value;
    },
    /**
     * get array with days of week
     * @returns {Array} Days name of week
     */
    weekDays() {
      // 1st november of 2021 was monday
      let auxDate = new Date(2021, 10, 1);
      const weekDays = [];
      for (let i = 0; i < 7; i++) {
        weekDays.push(
          auxDate.toLocaleDateString(this.locale, { weekday : 'short' })
        );
        auxDate = new Date(auxDate.setDate(auxDate.getDate() + 1));
      }
      return weekDays;
    },

    /**
     * get array with months
     * @returns {Array} months of the year
     */
    months() {
      const auxDate = new Date();
      const months = [];
      for (let i = 0; i < 12; i++) {
        const firstDayMonth = new Date(auxDate.getFullYear(), i, 1);
        months.push(
          firstDayMonth.toLocaleDateString(this.locale, { month : 'short' })
        );
      }
      return months;
    },
    /**
     * get the Number of week in a month
     *
     * @returns {Number} Number of weeks
     */
    weeksCountInMonthReferenced() {
      const year = this.yearDateReference;
      const month = this.monthDateReference;
      const date = new Date(year, month, 1);
      const daysToFill = (date.getDay() + 6) % 7;
      const numDaysInMonth = new Date(year, month + 1, 0).getDate();
      return Math.ceil((numDaysInMonth + daysToFill) / 7);
    },
    /**
     * get the Number of week in a month
     * @returns {Array} Matrix of days Number
     */
    daysInMonthBoxReferenced() {
      const year = this.yearDateReference;
      const month = this.monthDateReference;
      const dateFirstDay = new Date(year, month, 1);
      const dayOfWeekFirstDay = (dateFirstDay.getDay() + 6) % 7;
      const value = [];
      const totalDaysInBox = this.weeksCountInMonthReferenced * 7;
      for (let x = 0; x < totalDaysInBox; x++) {
        const dataDay = new Date(year, month, x - dayOfWeekFirstDay + 1);
        value.push(dataDay);
      }
      return value;
    },
    /**
     * get the Number of months in a year
     * @returns {Array} Matrix of days Number
     */
    monthsInYearBoxReferenced() {
      const year = this.yearDateReference;
      const value = [];
      for (let x = 0; x < 12; x++) {
        const dataMonth = new Date(year, x, 1);
        value.push(dataMonth);
      }
      return value;
    },
    /**
     * get the Number of years in a decade
     * @returns {Array} Matrix of days Number
     */
    yearsInDecadeBoxReferenced() {
      const year = this.yearDateReference;
      const initDecade = Math.floor(year / 10) * 10;
      const endDecade = Math.floor(year / 10) * 10 + 10;
      const value = [];
      for (let x = initDecade; x < endDecade; x++) {
        const dataYear = new Date(x, 0, 1);
        value.push(dataYear);
      }
      this.initDecade = initDecade;
      this.endDecade = endDecade;
      return value;
    },
    /**
     * text to sho in context
     * @returns {String} Value
     */
    contextText() {
      let value;
      if (this.viewType === 'days') {
        value = `${this.months[this.monthDateReference]} ${
          this.yearDateReference
        }`;
      }
      else if (this.viewType === 'months') {
        value = this.yearDateReference;
      }
      else if (this.viewType === 'years') {
        value = `${this.initDecade} - ${this.endDecade}`;
      }
      return value;
    },
    /**
     * flag to indicates if is necessary show the action "go to today"
     * @returns {String} Value
     */
    showGoToToday() {
      return (
        this.todayDate.getFullYear() !== this.yearDateReference ||
        this.todayDate.getMonth() !== this.monthDateReference
      );
    }
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.textInputValue = this.modelValue;
    this.validateDateInput(this.textInputValue, false, true);
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      internalError       : false,
      dateValue           : undefined,
      multipleValue       : { values : [] },
      rangeValue          : { start : undefined, end : undefined },
      inputValue          : undefined,
      textInputValue      : undefined,
      showOverlay         : false,
      yearDateReference   : new Date().getFullYear(),
      monthDateReference  : new Date().getMonth(),
      dayDateReference    : new Date().getDate(),
      hourDateReference   : new Date().getHours(),
      minuteDateReference : new Date().getMinutes(),
      viewType            : 'days',
      dateSelected        : undefined,
      multipleSelected    : [],
      rangeSelected       : undefined,
      todayDate           : new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        0
      ),
      initDecade : Math.floor(new Date().getFullYear() / 10) * 10,
      endDecade  : Math.floor(new Date().getFullYear() / 10) * 10 + 10
    };
  },
  /**
   * override
   * @override
   */
  created() {
    document.body.addEventListener('click', this.clickEventListener);
  },
  /**
   * override
   * @override
   */
  destroyed() {
    document.body.removeEventListener('click', this.clickEventListener);
  },
  methods : {
    /** event listener on input focus */
    onFocus() {
      this.showOverlay = true;
      this.viewType = 'days';
    },
    /**
     * listener for click window event
     * @param {Object} event click event detected
     */
    clickEventListener(event) {
      const el = this.$refs.datepicker;
      if (el && el !== event.target && !el.contains(event.target)) {
        this.showOverlay = false;
      }
    },
    /**
     * listener for click in conetxt text
     * @param {String} source source of click
     */
    contextClicked() {
      if (this.viewType === 'days') {
        this.viewType = 'months';
      }
      else if (this.viewType === 'months') {
        this.viewType = 'years';
      }
    },
    /**
     * listener for click in navigation button
     * @param {String} source source of click
     */
    navigationButtonClicked(source) {
      if (this.viewType === 'days') {
        if (source === 'left') {
          this.subtractMonthToReferenceDate();
        }
        else {
          this.addMonthToReferenceDate();
        }
      }
      else if (this.viewType === 'months') {
        if (source === 'left') {
          this.subtractYearToReferenceDate();
        }
        else {
          this.addYearToReferenceDate();
        }
      }
      else if (this.viewType === 'years') {
        if (source === 'left') {
          this.subtractDecadeToReferenceDate();
        }
        else {
          this.addDecadeToReferenceDate();
        }
      }
    },
    /** add a month to date reference */
    addMonthToReferenceDate() {
      this.monthDateReference++;
      if (this.monthDateReference >= 12) {
        this.monthDateReference = 0;
        this.yearDateReference++;
      }
    },

    /** subtract a month to date reference */
    subtractMonthToReferenceDate() {
      this.monthDateReference--;
      if (this.monthDateReference < 0) {
        this.monthDateReference = 11;
        this.yearDateReference--;
      }
    },
    /** add a year to date reference */
    addYearToReferenceDate() {
      this.yearDateReference++;
    },

    /** subtract a year to date reference */
    subtractYearToReferenceDate() {
      this.yearDateReference--;
    },
    /** add a decade to date reference */
    addDecadeToReferenceDate() {
      this.yearDateReference += 10;
    },

    /** subtract a decade to date reference */
    subtractDecadeToReferenceDate() {
      this.yearDateReference -= 10;
    },
    /**
     * check if date object is in array
     * @param {Array} array array of date objects
     * @param {Date} value date to check
     * @returns {Boolean} flag
     */
    isDateInArrayDates(array, value) {
      return !!array.find(item => item.getTime() === value.getTime());
    },
    /**
     * listener for click in day
     * @param {String} daySelected day selected
     */
    daySelected(daySelected) {
      if (this.selectionMode === 'single') {
        this.dateSelected = daySelected;
        this.textInputValue = this.formatDate(daySelected);
        this.showOverlay = false;
        this.$emit('update:modelValue', this.textInputValue);
      }
      else if (this.selectionMode === 'multiple') {
        /* if existe date , remove, otherwise add */
        if (this.isDateInArrayDates(this.multipleSelected, daySelected)) {
          this.multipleSelected = this.multipleSelected.filter(
            item => item.valueOf() !== daySelected.valueOf()
          );
        }
        else {
          this.multipleSelected.push(daySelected);
        }
        this.multipleSelected = this.multipleSelected.sort((a, b) => a - b);
        this.textInputValue = this.formatMultiple(this.multipleSelected);
        this.showOverlay = false;
        this.$emit('update:modelValue', this.textInputValue);
      }
      else if (this.selectionMode === 'range') {
        if (this.rangeValue.start === undefined || this.rangeValue.end) {
          this.rangeValue.start = daySelected;
          this.rangeValue.end = undefined;
          this.textInputValue = `${this.formatDate(this.rangeValue.start)}${
            this.rangeSeparator
          }`;
        }
        else {
          this.rangeValue.end = daySelected;
          if (this.rangeValue.end < this.rangeValue.start) {
            const aux = this.rangeValue.start;
            this.rangeValue.start = this.rangeValue.end;
            this.rangeValue.end = aux;
          }
          this.textInputValue = this.formatRange(this.rangeValue);
          this.showOverlay = false;
          this.rangeSelected = this.rangeValue;
          this.$emit('update:modelValue', this.textInputValue);
        }
      }
    },
    /**
     * listener for click in month
     * @param {String} monthIndexSelected day selected
     */
    monthSelected(monthIndexSelected) {
      this.monthDateReference = monthIndexSelected;
      this.viewType = 'days';
    },
    /**
     * listener for click in year
     * @param {String} yearSelected day selected
     */
    yearSelected(yearSelected) {
      this.yearDateReference = yearSelected.getFullYear();
      this.viewType = 'months';
    },
    /**
     * listener for click in go to today
     * @param {String} daySelected day selected
     */
    goToToday() {
      this.yearDateReference = this.todayDate.getFullYear();
      this.monthDateReference = this.todayDate.getMonth();
      this.dayDateReference = this.todayDate.getDate();
      this.viewType = 'days';
    },
    /**
     * validate value texted on input
     * @param {String} text text input
     * @param {Boolean} userInteract true when is execute by user interaction
     * @param {Boolean} firstLoad true when is execute by mounted hook
     */
    validateDateInput(text, userInteract = true, firstLoad = false) {
      if (text === '') {
        this.dateValue = undefined;
        this.dateSelected = undefined;
        this.multipleValue = { values : [] };
        this.multipleSelected = [];
        this.rangeValue = { start : undefined, end : undefined };
        this.rangeSelected = { start : undefined, end : undefined };
        this.internalError = false;
      }
      else if (this.selectionMode === 'single') {
        this.dateValue = this.parseDateInput(text);
        if (!this.dateValue || this.isDisableDay(this.dateValue, false)) {
          this.dateValue = undefined;
          this.dateSelected = undefined;
          this.internalError = true;
        }
        else {
          this.yearDateReference = this.dateValue.getFullYear();
          this.monthDateReference = this.dateValue.getMonth();
          this.dayDateReference = this.dateValue.getDate();
          this.dateSelected = this.dateValue;
          this.internalError = false;
          userInteract
            ? this.$emit('update:modelValue', text)
            : firstLoad
              ? undefined
              : this.$emit('selected', this.dateSelected);
        }
      }
      else if (this.selectionMode === 'multiple') {
        this.multipleValue = this.parseMultipleInput(text);
        let innerError = this.multipleValue.error !== undefined;
        this.multipleValue.values.forEach(date => {
          if (this.isDisableDay(date, false)) {
            innerError = true;
          }
        });
        if (innerError) {
          this.multipleSelected = this.multipleValue.values;
          this.internalError = true;
        }
        else {
          const lastDate =
            this.multipleValue.values[this.multipleValue.values.length - 1];
          if (lastDate) {
            this.yearDateReference = lastDate.getFullYear();
            this.monthDateReference = lastDate.getMonth();
            this.dayDateReference = lastDate.getDate();
          }
          this.multipleSelected = this.multipleValue.values;
          this.internalError = false;
          userInteract
            ? this.$emit(
              'update:modelValue',
              this.formatMultiple(this.multipleValue.values)
            )
            : firstLoad
              ? undefined
              : this.$emit('selected', this.multipleSelected);
        }
      }
      else if (this.selectionMode === 'range') {
        let errorDetected = false;
        this.rangeValue = this.parseRangeInput(text);
        if (
          !this.rangeValue.start ||
          this.isDisableDay(this.rangeValue.start, false)
        ) {
          this.rangeValue.start = undefined;
          errorDetected = true;
        }
        if (
          !this.rangeValue.end ||
          this.isDisableDay(this.rangeValue.end, false)
        ) {
          this.rangeValue.end = undefined;
          errorDetected = true;
        }
        if (errorDetected) {
          this.rangeSelected = undefined;
          this.internalError = true;
        }
        else {
          this.yearDateReference = this.rangeValue.end.getFullYear();
          this.monthDateReference = this.rangeValue.end.getMonth();
          this.dayDateReference = this.rangeValue.end.getDate();
          this.internalError = false;
          userInteract
            ? this.$emit('update:modelValue', this.formatRange(this.rangeValue))
            : firstLoad
              ? undefined
              : this.$emit('selected', this.rangeValue);
        }
      }
    },
    /**
     * parse text to date using dateformat
     * @param {String} text text to parse
     * @returns {Date} Date parsed
     */
    parseDateInput(text) {
      let returnDate;
      try {
        if (text !== '') {
          const patternParts = this.dateFormat.split(this.dateSeparator);
          const yearPos = patternParts.findIndex(x => x === 'yyyy');
          const monthPos = patternParts.findIndex(x => x === 'mm');
          const dayPos = patternParts.findIndex(x => x === 'dd');
          const parts = text.split(this.dateSeparator);
          if (parts.length !== 3) {
            throw new Error(
              `Date has not the correct format (${this.dateFormat})`
            );
          }
          const year = parseInt(parts[yearPos], 10);
          if (year < 1900) {
            throw new Error(`Year cannot be less than 1900`);
          }
          const month = parseInt(parts[monthPos], 10) - 1;
          if (month < 0 || month > 11) {
            throw new Error(`Month must be between 01 and 12`);
          }
          const day = parseInt(parts[dayPos], 10);
          if (day < 1 || day > 31) {
            throw new Error(`Day must be between 01 and 31`);
          }
          if (year >= 1900 && month >= 0 && month < 12 && day > 0 && day < 32) {
            const aux = new Date(year, month, day);
            if (aux.getMonth() !== month) {
              throw new Error(`This day of the month does not exist`);
            }
            returnDate = aux;
          }
        }
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error while parse date. ${error}`);
        returnDate = undefined;
      }
      return returnDate;
    },
    /**
     * parse text to date using dateformat
     * @param {String} text text to parse
     * @returns {Object} Date parsed
     */
    parseMultipleInput(text) {
      const returnMultiple = { values : [] };
      try {
        if (text !== '') {
          const parts = text.split(this.multipleSeparator);
          parts.forEach(part => {
            const date = this.parseDateInput(part);
            if (date) {
              returnMultiple.values.push(date);
            }
            else {
              returnMultiple.error = `Date format is not correct`;
            }
          });
          returnMultiple.values = returnMultiple.values.sort((a, b) => a - b);
        }
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error while parse range. ${error}`);
        returnMultiple.error = error;
      }
      return returnMultiple;
    },
    /**
     * parse range text to dates using dateformat
     * @param {String} text text to parse
     * @returns {Date} Date parsed
     */
    parseRangeInput(text) {
      const returnRange = { start : undefined, end : undefined };
      try {
        if (text !== '') {
          const parts = text.split(this.rangeSeparator);
          if (parts.length !== 2) {
            throw new Error(
              `Range has not the correct format (${this.dateFormat}${this.rangeSeparator}${this.dateFormat})`
            );
          }
          const initDateText = parts[0];
          const endDateText = parts[1];
          returnRange.start = this.parseDateInput(initDateText);
          returnRange.end = this.parseDateInput(endDateText);
          if (returnRange.start > returnRange.end) {
            const aux = returnRange.start;
            returnRange.start = returnRange.end;
            returnRange.end = aux;
          }
        }
      }
      catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error while parse range. ${error}`);
      }
      return returnRange;
    },
    /**
     * format date to text using dateformat
     * @param {Date} date date to format
     * @returns {String} text formatted
     */
    formatDate(date) {
      const patternParts = this.dateFormat.split(this.dateSeparator);
      const yearPos = patternParts.findIndex(x => x === 'yyyy');
      const monthPos = patternParts.findIndex(x => x === 'mm');
      const dayPos = patternParts.findIndex(x => x === 'dd');
      const stringResultArray = [];
      stringResultArray[yearPos] = `${date.getFullYear()}`;
      stringResultArray[monthPos] = `${`0${date.getMonth() + 1}`.slice(-2)}`;
      stringResultArray[dayPos] = `${`0${date.getDate()}`.slice(-2)}`;
      return stringResultArray.join(this.dateSeparator);
    },
    /**
     * format range to text using dateformat
     * @param {Object} range range to format
     * @returns {String} text formatted
     */
    formatRange(range) {
      return `${this.formatDate(range.start)}${
        this.rangeSeparator
      }${this.formatDate(range.end)}`;
    },
    /**
     * format range to text using dateformat
     * @param {Array} multiple array of dates to format
     * @returns {String} text formatted
     */
    formatMultiple(multiple) {
      let value = '';
      for (let index = 0; index < multiple.length; index++) {
        value = `${value}${this.formatDate(multiple[index])}`;
        if (index + 1 < multiple.length) {
          value = `${value}${this.multipleSeparator}`;
        }
      }
      return value;
    },
    /**
     * check if a day is disabled by config
     * @param {Date} date date to check
     * @param {Boolean} onlyInMonthDateReference do check only in month reference
     * @returns {Boolean} value if this date has to be disabled
     */
    isDisableDay(date, onlyInMonthDateReference) {
      let disabled = true;
      if (
        date.getFullYear() > this.minDate.getFullYear() &&
        date.getFullYear() < this.maxDate.getFullYear()
      ) {
        disabled = false;
      }
      else {
        if (
          date.getFullYear() === this.minDate.getFullYear() &&
          date.getMonth() >= this.minDate.getMonth() &&
          date.getDate() >= this.minDate.getDate()
        ) {
          disabled = false;
        }
        if (
          date.getFullYear() === this.maxDate.getFullYear() &&
          date.getMonth() <= this.maxDate.getMonth() &&
          date.getDate() <= this.maxDate.getDate()
        ) {
          disabled = false;
        }
      }
      if (
        !disabled &&
        onlyInMonthDateReference &&
        (date.getFullYear() !== this.yearDateReference ||
          date.getMonth() !== this.monthDateReference)
      ) {
        disabled = true;
      }
      return disabled;
    },
    /**
     * check if a day is active
     * @param {Date} date date to check
     * @returns {Boolean} value if this date has to be active
     */
    isSelectedDay(date) {
      let value = false;
      if (this.selectionMode === 'single') {
        value =
          this.dateSelected &&
          this.dateSelected.getFullYear() === date.getFullYear() &&
          this.dateSelected.getMonth() === date.getMonth() &&
          this.dateSelected.getDate() === date.getDate();
      }
      else if (this.selectionMode === 'multiple') {
        value = !!this.multipleSelected.find(
          element =>
            element.getFullYear() === date.getFullYear() &&
            element.getMonth() === date.getMonth() &&
            element.getDate() === date.getDate()
        );
      }
      else if (this.selectionMode === 'range') {
        value =
          (this.rangeValue.start &&
            this.rangeValue.start.getFullYear() === date.getFullYear() &&
            this.rangeValue.start.getMonth() === date.getMonth() &&
            this.rangeValue.start.getDate() === date.getDate()) ||
          (this.rangeValue.end &&
            this.rangeValue.end.getFullYear() === date.getFullYear() &&
            this.rangeValue.end.getMonth() === date.getMonth() &&
            this.rangeValue.end.getDate() === date.getDate());
      }
      return value;
    },
    /**
     * check if a day is today
     * @param {Date} date date to check
     * @returns {Boolean} value if this date has to be today
     */
    isTodayDay(date) {
      return (
        this.todayDate.getFullYear() === date.getFullYear() &&
        this.todayDate.getMonth() === date.getMonth() &&
        this.todayDate.getDate() === date.getDate()
      );
    },
    /**
     * check if a day is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this date in in range
     */
    isInRangeDay(date) {
      let value = false;
      if (this.selectionMode === 'range') {
        if (
          this.rangeValue.start &&
          this.rangeValue.end &&
          this.rangeValue.start <= this.rangeValue.end &&
          date >= this.rangeValue.start &&
          date <= this.rangeValue.end
        ) {
          value = true;
        }
      }
      return value;
    },
    /**
     * check if a day is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this date in in range
     */
    isInRangeGrowLeftDay(date) {
      // if has in range and is not monday
      return (
        this.isInRangeDay(date) &&
        date.getDay() !== 1 &&
        date.valueOf() !== this.rangeValue.start.valueOf()
      );
    },
    /**
     * check if a day is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this date in in range
     */
    isInRangeGrowRightDay(date) {
      // if has in range and is not sunday
      return (
        this.isInRangeDay(date) &&
        date.getDay() !== 0 &&
        date.valueOf() !== this.rangeValue.end.valueOf()
      );
    },
    /**
     * check if a day is disabled by config
     * @param {Date} date modatenth
     * @returns {Boolean} value if this date has to be disabled
     */
    isDisableMonth(date) {
      let value = true;
      if (
        date.getFullYear() > this.minDate.getFullYear() &&
        date.getFullYear() < this.maxDate.getFullYear()
      ) {
        value = false;
      }
      else {
        if (
          date.getFullYear() === this.minDate.getFullYear() &&
          date.getMonth() >= this.minDate.getMonth()
        ) {
          value = false;
        }
        if (
          date.getFullYear() === this.maxDate.getFullYear() &&
          date.getMonth() <= this.maxDate.getMonth()
        ) {
          value = false;
        }
      }
      return value;
    },
    /**
     * check if a day is selected
     * @param {Date} date date
     * @returns {Boolean} value if this date has to be selected
     */
    isSelectedMonth(date) {
      let value = false;
      if (this.selectionMode === 'single') {
        value =
          this.dateSelected &&
          this.dateSelected.getFullYear() === date.getFullYear() &&
          this.dateSelected.getMonth() === date.getMonth();
      }
      else if (this.selectionMode === 'multiple') {
        value = !!this.multipleSelected.find(
          element =>
            element.getFullYear() === date.getFullYear() &&
            element.getMonth() === date.getMonth()
        );
      }
      else if (this.selectionMode === 'range') {
        value =
          (this.rangeValue.start &&
            this.rangeValue.start.getFullYear() === date.getFullYear() &&
            this.rangeValue.start.getMonth() === date.getMonth()) ||
          (this.rangeValue.end &&
            this.rangeValue.end.getFullYear() === date.getFullYear() &&
            this.rangeValue.end.getMonth() === date.getMonth());
      }
      return value;
    },
    /**
     * check if a day is today
     * @param {Date} date month
     * @returns {Boolean} value if this date has to be today
     */
    isTodayMonth(date) {
      return (
        this.todayDate.getFullYear() === date.getFullYear() &&
        this.todayDate.getMonth() === date.getMonth()
      );
    },
    /**
     * check if a month is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this date in in range
     */
    isInRangeMonth(date) {
      let value = false;
      if (this.selectionMode === 'range') {
        if (
          this.rangeValue.start &&
          this.rangeValue.end &&
          this.rangeValue.start <= this.rangeValue.end
        ) {
          const firstDayStartMonth = new Date(
            this.rangeValue.start.getFullYear(),
            this.rangeValue.start.getMonth(),
            1
          );
          const lastDayEndMonth = new Date(
            this.rangeValue.end.getFullYear(),
            this.rangeValue.end.getMonth() + 1,
            0
          );
          if (firstDayStartMonth <= date && lastDayEndMonth >= date) {
            value = true;
          }
        }
      }
      return value;
    },
    /**
     * Check if date is in month
     * @param {Date} date date to check
     * @param {Date} monthDate Month to compare
     * @returns {Boolean} flag
     */
    dateInMonth(date, monthDate) {
      const initMonth = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        1
      );
      const endMonth = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        0
      );
      return initMonth <= date && date <= endMonth;
    },
    /**
     * check if a day is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this date in in range
     */
    isInRangeGrowLeftMonth(date) {
      // if has in range and is not in the first column
      return (
        this.isInRangeMonth(date) &&
        date.getMonth() % 3 !== 0 &&
        !this.dateInMonth(date, this.rangeValue.start)
      );
    },
    /**
     * check if a day is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this date in in range
     */
    isInRangeGrowRightMonth(date) {
      // if has in range and is not in the last column
      return (
        this.isInRangeMonth(date) &&
        date.getMonth() % 3 !== 2 &&
        !this.dateInMonth(date, this.rangeValue.end)
      );
    },
    /**
     * check if a Year is disabled by config
     * @param {Date} date date to check
     * @returns {Boolean} value if this date has to be disabled
     */
    isDisableYear(date) {
      return (
        date.getFullYear() < this.minDate.getFullYear() ||
        date.getFullYear() > this.maxDate.getFullYear()
      );
    },
    /**
     * check if a year is active
     * @param {Date} date date to check
     * @returns {Boolean} value if this date has to be active
     */
    isSelectedYear(date) {
      let value = false;
      if (this.selectionMode === 'single') {
        value =
          this.dateSelected &&
          this.dateSelected.getFullYear() === date.getFullYear();
      }
      else if (this.selectionMode === 'multiple') {
        value = !!this.multipleSelected.find(
          element => element.getFullYear() === date.getFullYear()
        );
      }
      else if (this.selectionMode === 'range') {
        value =
          (this.rangeValue.start &&
            this.rangeValue.start.getFullYear() === date.getFullYear()) ||
          (this.rangeValue.end &&
            this.rangeValue.end.getFullYear() === date.getFullYear());
      }
      return value;
    },
    /**
     * check if a day is today
     * @param {Date} date date to check
     * @returns {Boolean} value if this date has to be today
     */
    isTodayYear(date) {
      return this.todayDate.getFullYear() === date.getFullYear();
    },

    /**
     * check if a year is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this date in in range
     */
    isInRangeYear(date) {
      let value = false;
      if (this.selectionMode === 'range') {
        if (
          this.rangeValue.start &&
          this.rangeValue.end &&
          this.rangeValue.start <= this.rangeValue.end
        ) {
          const firstDayStartYear = new Date(
            this.rangeValue.start.getFullYear(),
            0,
            1
          );
          const lastDayEndYear = new Date(
            this.rangeValue.end.getFullYear() + 1,
            0,
            0
          );
          if (firstDayStartYear <= date && lastDayEndYear >= date) {
            value = true;
          }
        }
      }
      return value;
    },
    /**
     * Check if date is in year
     * @param {Date} date date to check
     * @param {Date} yearDate year to compare
     * @returns {Boolean} flag
     */
    dateInYear(date, yearDate) {
      const initYear = new Date(yearDate.getFullYear(), 0, 1);
      const endMYear = new Date(yearDate.getFullYear() + 1, 0, 0);
      return initYear <= date && date <= endMYear;
    },
    /**
     * check if a year is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this year in in range
     */
    isInRangeGrowLeftYear(date) {
      // if has in range and is not in the first column
      return (
        this.isInRangeYear(date) &&
        (date.getFullYear() % 10) % 3 !== 0 &&
        !this.dateInYear(date, this.rangeValue.start)
      );
    },
    /**
     * check if a year is in range
     * @param {Date} date date to check
     * @returns {Boolean} value if this year in in range
     */
    isInRangeGrowRightYear(date) {
      // if has in range and is not in the last column
      return (
        this.isInRangeYear(date) &&
        (date.getFullYear() % 10) % 3 !== 2 &&
        date.getFullYear() % 10 !== 9 &&
        !this.dateInYear(date, this.rangeValue.end)
      );
    },
    /**
     * converts a date to String
     * @param {Date} date date
     * @returns {String} date in string
     */
    dateToString(date) {
      let value;
      if (date instanceof Array) {
        value = '';
        date.forEach(element => {
          value += `${this.dateToString(element)}, `;
        });
        value = value.slice(0, -2);
      }
      else if (date instanceof Date) {
        value = `${date.getFullYear()}${this.dateSeparator}${`0${
          date.getMonth() + 1
        }`.slice(-2)}${this.dateSeparator}${`0${date.getDate()}`.slice(-2)}`;
      }
      return value;
    }
  },
  ...metadata
};
