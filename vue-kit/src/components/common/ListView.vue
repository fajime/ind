<template>
  <div class="dl-ui-list__items-wrapper">
    <ul ref="list" class="dl-ui-list__items">
      <li
        v-for="(option, index) of treeOptions"
        :key="index"
        :tabindex="!option.disabled ? tabindex : undefined"
        :class="[
          'dl-ui-list__item',
          {
            'dl-ui-list__item--highlight': isSelected(option),
            'dl-ui-list__item--disabled': option.disabled
          }
        ]"
        @click="$emit('change', option)"
        @keydown.down="focusChange($event,1)"
        @keydown.up="focusChange($event,-1)"
        @keydown.enter="$emit('change', option)"
        @focus="$emit('focused', { focus: true, index})"
        @blur="$emit('focused', { focus: false, index})"
        @keydown.left="$emit('trigger', { event: $event, option})"
        @keydown.right="$emit('trigger', { event: $event, option})"
      >
        <slot :option="option" />
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  emits : ['loaded', 'change', 'focused', 'trigger'],
  props : {
    /**
     * v-model bound value
     */
    modelValue : {
      type    : Array,
      default : () => [],
      desc    : 'Value del componente'
    },
    /**
     * select options
     */
    options : {
      type    : Array,
      default : () => [
        { name : 'name 1', value : 'value 1' },
        {
          name     : 'name 2',
          value    : 'value 2',
          leftIcon : 'dl-ids-icon-user-single-outlined'
        },
        {
          name      : 'name 3',
          value     : 'value 3',
          rightIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'name 4', value : 'value 4', disabled : true }
      ],
      desc : 'Array de items seleccionados a mostrar como variable options'
    },
    /**
     * tabindex
     */
    tabindex : {
      type    : Number,
      default : 0,
      desc    : 'Tab index'
    }

  },
  computed : {
    /**
     * Tree to plain options
     * @return {Array} top position
     */
    treeOptions() {
      const options = this.buildOptions();
      return options;
    }
  },
  watch : {
    /**
     * Watch props options
     */
    options() {
      this.init();
    }

  },
  /**
   * Mounted component
   */
  mounted() {
    this.init();

  },
  methods : {
    /**
     * Init component
     */
    init() {
      if (this.options.length > 0) {
        this.$emit('loaded');
      }
    },
    /**
     * Focused next and prev element
     * @param {Object} event from actual focus element
     * @param {Number} delta go to delta index
     */
    focusChange(event, delta = 1) {
      event.preventDefault();
      const elem = event.target;
      const list = this.$refs.list;
      if (list) {
        const tabFocus = ':not([tabindex="-1"])';
        const focussableElements = `a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled])${tabFocus}`;
        const listCollection = list.querySelectorAll(focussableElements);

        const currentIndex = Array.from(listCollection).indexOf(elem);

        let toIndex = currentIndex + delta;
        if (toIndex < 0) {
          toIndex = 0;
        }

        if (toIndex > listCollection.length - 1 ) {
          toIndex = listCollection.length - 1;
        }

        // console.log('focus: ', listCollection[toIndex]);
        listCollection[toIndex].focus({ preventScroll : false });

      }
    },

    /**
     * Focused index
     * @param {Number} toIndex go to index
     */
    setFocus(toIndex) {

      let focussableElements = 'li';
      if (toIndex === -1) {
        toIndex = 0;
        const tabFocus = ':not([tabindex="-1"])';
        focussableElements = `a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled])${tabFocus}`; // :not([tabindex="-1"])
      }
      const list = this.$refs.list;
      setTimeout(() => {
        if (list) {
          const listCollection = list.querySelectorAll(focussableElements);
          if (this.tabindex > -1) {
            listCollection[toIndex].focus({ preventScroll : false });
          }
        }
      }, 1);
    },
    /**
     * Focused next and prev element
     * @param {Number} index go to delta index
     * @return {Number} top position
     */
    getElementTopPosition(index) {

      const list = this.$refs.list;
      const listCollection = list.querySelectorAll('li');

      let h1 = 0;
      if (index < listCollection.length && index > -1) {
        const target = listCollection[index];
        const rect1 = target.getBoundingClientRect();
        const offsetTop = rect1.height * index;
        h1 = offsetTop || target.offsetTop;
      }
      return h1;
    },
    /**
     * Focused next and prev element
     * @param {Number} index go to delta index
     * @return {Number} top position
     */
    getElementPosition(index) {

      const list = this.$refs.list;
      const listCollection = list.querySelectorAll('li');

      let h1 = 0;
      if (index < listCollection.length) {
        h1 = this.getElementTopPosition(index + 1);
      }
      return h1;
    },
    /**
     * Checks if option selected
     * @param {Object} option option
     * @return {Bool} true if selected
     */
    isSelected(option) {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.some(val => val === option.value);
      }
      return false;
    },
    /**
     * Build tree to plain options
     * @return {Array} top position
     */
    buildOptions() {

      const plainOptions = [];

      const treeToPlain = (options, level) => {
        options.forEach(element => {
          element.level = level;

          plainOptions.push(element);
          if (element.options && element.open) {
            treeToPlain(element.options, level + 1);
          }
        });
      };

      treeToPlain(this.options, 0);
      return plainOptions;
    }
  }
};
</script>
