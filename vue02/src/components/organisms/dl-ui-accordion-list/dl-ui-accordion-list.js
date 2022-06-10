import DlUiAccordion from '../../molecules/dl-ui-accordion';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-accordion-list',
  components : {
    'dl-ui-accordion' : DlUiAccordion
  },
  emits : ['toggle'],
  /**
   * Override
   * @override
   */
  data() {
    return {
      accordions : [],
      selected   : null

    };
  },
  props : {
    /**
     * Allows to show only one accordion
     */
    onlyOne : {
      type    : Boolean,
      default : false,
      desc    : 'Solo permite abrir un acordeón a la vez'
    }
  },
  /**
   * override
   * @override
   */
  provide() {
    return {
      onAccordionAdd       : this.onAccordionAdd,
      onAccordionRemove    : this.onAccordionRemove,
      onAccordionActivated : this.onAccordionActivated
    };
  },
  methods : {
    /**
     * event to add a new accordion
     * @param {Object} accordion to add
     */
    onAccordionAdd(accordion) {

      if (this.onlyOne) {
        if (this.selected) {
          if (accordion) {
            accordion.setHide();
          }
        }
        else if (accordion.show) {
          this.selected = accordion;
        }
      }
      this.accordions.push(accordion);
    },
    /**
     * event to remove a accordion
     * @param {Object} accordion to add
     */
    onAccordionRemove(accordion) {
      this.accordions = this.accordions.filter(element => element !== accordion);
    },
    /**
     * event to remove a accordion
     * @param {Object} accordion to add
     */
    onAccordionActivated(accordion) {
      if (this.selected !== accordion) {
        if (this.onlyOne && this.selected) {
          this.selected.setHide();
        }
      }
      this.selected = accordion;
    }

  },
  watch : {
    /**
     * onlyOne change
     */
    onlyOne() {

      if (this.onlyOne) {
        this.selected = null;
        this.accordions.forEach(accordion => {

          if (this.selected && accordion) {
            accordion.setHide();
          }
          else if (accordion.innerShow ) {
            this.selected = accordion;
          }

        });
      }
    }

  },
  /**
   * Override
   * @override
   */
  mounted() {
  },
  // DEMO META DATA
  ...metadata
};
