import Checkbox from '../../atoms/dl-ui-checkbox';
import MixinId from '../../../mixins/randomId';
import metadata from './_metadata';
import { nextTick } from 'vue';
export default {
  name       : 'dl-ui-checkbox-group',
  mixins     : [MixinId],
  components : {
    'dl-ui-checkbox' : Checkbox
  },
  emits : ['input', 'group'],
  props : {
    /** array of checkbox object {input, label} to show */
    checkboxes : {
      type    : Array,
      default : () => [],
      desc    : 'Array compuesto por objetos <span class="demo__md--syntax">{name, value, label}</span> de tipo <span class="demo__md--syntax">{String, Boolean, String}</span> que contine la información de los checkboxes hijo a pintar'
    },
    /** disabled checkboxes and group */
    disabled : {
      type    : Boolean,
      default : false,
      desc    : 'Cuando está presente, indica que el componente se encuentra en estado deshabilitado.'
    },
    /** collapsible child checkboxes */
    collapsible : {
      type    : Boolean,
      default : true,
      desc    : 'Cuando está presente, indica si el grupo que contiene los checkbox hijos se puede contraer o no.'
    },
    /** collapsed child checkboxes */
    collapsed : {
      type    : Boolean,
      default : false,
      desc    : 'Cuando está presente, indica si el grupo que contiene los checkbox hijos se encuentra contraido al iniciarse.'
    }
  },
  watch : {
    /**
     * Watch over collapse prop
     *
     * @param {Boolean} newValue New value of the property
     */
    collapsed(newValue) {
      this.collapsedAux = newValue;
    }
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      groupValue    : false,
      indeterminate : false,
      collapsedAux  : undefined
    };
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.init();
  },
  methods : {
    /** Init component */
    init() {
      this.collapsedAux = this.collapsed;
      this.setForAttributes();
      this.checkGroupValues();
    },
    /** Set "for" attribute for checkbox-label pair */
    setForAttributes() {
      // set "for" attribute from checkbox parent
      this.$refs.checkboxParentLabel.setAttribute('for', this.$refs.checkboxParent.randomId);
      // set "for" attribute from checkboxes children
      if (this.$refs.checkboxChildLabel) {
        this.$refs.checkboxChildLabel.forEach((checkboxChildLabel, index) => {
          checkboxChildLabel.setAttribute('for', this.$refs.checkboxChild[index].randomId);
        });
      }
    },
    /**
     * Detects when child checkboxes changes and configure group checkbox
     * @param {Boolean} value New value
     */
    changeAllValues(value) {
      this.checkboxes.forEach(checkboxChild => {
        checkboxChild.value = value;
        this.$emit('input', { name : checkboxChild.name, value });
      });
      this.indeterminate = false;
      this.$emit('group', `${value}`);
    },
    /**
     * Detects when child checkboxes changes and configure group checkbox
     */
    checkGroupValues() {
      let checkedCnt = 0;
      this.checkboxes.forEach(checkboxChild => {
        checkedCnt += checkboxChild.value ? 1 : 0;
      });
      const oldIndeterminate = this.indeterminate;
      const oldGroupValue = this.groupValue;
      this.indeterminate = checkedCnt > 0 && checkedCnt < this.checkboxes.length;
      this.groupValue = checkedCnt > 0;
      /* only emit event when root value changes */
      if (oldIndeterminate !== this.indeterminate || oldGroupValue !== this.groupValue) {
        this.$emit('group', this.indeterminate ? 'indeterminate' : `${this.groupValue}`);
      }
    },
    /**
     * Performs actions when a checkbox is clicked
     * @param {Boolean} value Value emitted
     * @param {String} name Name of the checkbox clicked
     */
    checkboxClicked(value, name) {
      this.$emit('input', { name, value });
      nextTick(() => {
        this.checkGroupValues();
      });
    }
  },
  // DEMO META DATA
  ...metadata
};
