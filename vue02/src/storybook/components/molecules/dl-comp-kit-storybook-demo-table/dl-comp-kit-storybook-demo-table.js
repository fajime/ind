
export default {
  name  : 'dl-comp-kit-storybook-demo-table',
  props : {
    /** Td header titles */
    headers : {
      type    : Array,
      default : () => ([])
    },
    /** Td column array keys */
    columnKeys : {
      type    : Array,
      default : () => ([])
    },
    /** Array of rows */
    rows : {
      type    : [Array, Object],
      default : () => ({})
    }
  },
  computed : {
    /**
     * Row array: generates array when 'rows' is an object
     * @returns {Array} rows
     */
    rowArray() {
      if (!Array.isArray(this.rows)) {
        return Object.keys(this.rows)
          .map(key => {
            // Get type names from values
            let propType = '';
            if (Array.isArray(this.rows[key].type)) {
              this.rows[key].type.forEach(atype => {
                propType += `${atype.name} `;
              });
            }
            else {
              propType = this.rows[key].type.name;
            }
            // Get defaults properly
            let propDefault;
            if (this.rows[key].default === undefined) {
              propDefault = 'undefined';
            }
            else if (this.rows[key].default === null) {
              propDefault = 'null';
            }
            else if (typeof this.rows[key].default === 'function') {
              propDefault = this.rows[key].default();
            }
            else {
              propDefault = this.rows[key].default;
            }
            return {
              name    : key,
              type    : propType,
              default : propDefault,
              desc    : this.rows[key].desc
            };
          });
      }
      return this.rows;
    }
  }
};
