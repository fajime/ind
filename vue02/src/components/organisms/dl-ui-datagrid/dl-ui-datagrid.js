import { helper } from './dl-ui-datagrid-helper';
import dlUiTooltip from '../../../directives/dl-ui-tooltip';
import dlUiCheckbox from '../../atoms/dl-ui-checkbox';
import dlUiInput from '../../atoms/dl-ui-input';
import dlUiButton from '../../atoms/dl-ui-button';
import dlUiSelect from '../../atoms/dl-ui-select';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-datagrid',
  directives : { 'dl-ui-tooltip' : dlUiTooltip },
  components : {
    dlUiCheckbox,
    dlUiInput,
    dlUiButton,
    dlUiSelect
  },
  emits : [
    'onSelectedRow',
    'onOrderColumn',
    'onToggleColumn',
    'onDrop',
    'onCopyClipboard',
    'tableupdated',
    'exporting',
    'onChangePageSize',
    'onChangePage',
    'onDataFilter'
  ],
  props : {
    /**
     * Table config
     */
    data : {
      type    : Object,
      default : () => {},
      desc    : 'Main property with the content of the table (columns, rows). See notes.'
    },
    /**
     * Selecction type
     */
    selection : {
      type    : String,
      default : 'none',
      /**
       * Property validation
       * @param {String} value value of the property
       * @returns {Boolean} true
       */
      validator(value) {
        const validOptions = ['none', 'single', 'multiple'];
        if (!validOptions.includes(value)) {
          throw new Error(
            `The "selection" property only accept these values: "${validOptions.join(
              ', '
            )}"`
          );
        }
        return true;
      },
      desc : 'Type of row selection allowed: none, single row, multiple row.'
    },
    /**
     * Remote mode
     */
    remote : {
      type    : Boolean,
      default : false,
      desc    : 'Enable remote mode'
    },
    /**
     * Table filter
     */
    filter : {
      type    : Boolean,
      default : false,
      desc    : 'Enable filtering functionality'
    },
    /**
     * Order columns
     */
    sort : {
      type    : Boolean,
      default : false,
      desc    : 'Enable sorting functionality'
    },
    /**
     * Closable columns
     */
    closable : {
      type    : Boolean,
      default : false,
      desc    : 'Enable column-closing functionality'
    },
    /**
     * Resize columns
     */
    resize : {
      type    : Boolean,
      default : false,
      desc    : 'Enable column-resize functionality'
    },
    /**
     * Contextual menu
     */
    contextualMenu : {
      type    : Boolean,
      default : false,
      desc    : 'Enable context-menu functionality'
    },
    /**
     * Dragp & drop columns
     */
    dragDrop : {
      type    : Boolean,
      default : false,
      desc    : 'Enable drag and drop of columns, to change order'
    },
    /**
     * Table pagination
     */
    pagination : {
      type    : Boolean,
      default : false,
      desc    : 'Enable pagination functionality'
    },
    /**
     * Table page size
     */
    pageSize : {
      type    : Array,
      default : () => [
        { name : '5 líneas por página', value : 5 },
        { name : '10 líneas por página', value : 10 },
        { name : '20 líneas por página', value : 20 },
        { name : '50 líneas por página', value : 50 }
      ],
      desc : 'Page size selector options'
    },
    /**
     * Show header tooltip
     */
    headerTooltip : {
      type    : Boolean,
      default : true,
      desc    : 'Enable header tooltips (with texts described in data.columns prop)'
    },
    /**
     * Show cell tooltip
     */
    cellTooltip : {
      type    : Boolean,
      default : false,
      desc    : 'Enable cell tooltips (with texts described in cellTooltipConfig prop)'
    },
    /**
     * Cell tooltip map
     */
    cellTooltipConfig : {
      type    : Object,
      default : () => {},
      desc    : 'Config for showing tooltips for selected cell values'
    },
    /**
     * Static header
     */
    stickyHeader : {
      type    : Boolean,
      default : false,
      desc    : 'Keep header visible'
    },
    /**
     * Show cell footer
     */
    funcFooter : {
      type    : Boolean,
      default : false,
      desc    : 'Enable column functions in footer (as described in data.columns prop)'
    },
    /**
     * Show cell footer
     */
    showExportButtons : {
      type    : Boolean,
      default : false,
      desc    : 'Enable header function buttons for export, save etc'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      iData            : [],
      iColumns         : [],
      iFilter          : {},
      iDataComputed    : [],
      iDataPagination  : [],
      setModalPosition : false,
      colDragAndDrop   : null,
      configPagination : {
        register : {
          from  : 0,
          to    : 0,
          total : 0
        },
        page : {
          from : 0,
          to   : 0
        },
        pageSizeSelected : 10
      },
      hiddenCols    : [],
      helper,
      recoverButton : false,
      resetButton   : false,
      statusFilter  : {
        before : 0,
        after  : 0
      },
      allRowsSelected : false
    };
  },
  computed : {
    /**
     * Enable cell editing
     * @returns {Boolean} value
     */
    editionEnabled() {
      return true;
    },
    /**
     * Check if multiple selecction
     * @returns {Boolean} list of classes for main container
     */
    showSelectionCheckbox() {
      return this.selection === 'multiple';
    },
    /**
     * Get updated data
     * @returns {Array} updated data
     */
    getUpdatedData() {
      if (this.pagination) {
        if (this.filter || this.sort) {
          let pageSize = parseInt(this.configPagination.pageSizeSelected, 10);
          const totalReg = parseInt(this.iDataComputed.length, 10);
          if (pageSize > totalReg) {
            this.pageSize.every((item, index) => {
              if (item > totalReg) {
                const i = index - 1 < 0 ? 0 : index - 1;
                this.configPagination.pageSizeSelected = this.pageSize[i];
                this.configPagination.register.to = this.pageSize[i];
                pageSize = this.pageSize[i];
                return false;
              }
              return true;
            });
          }
          const totalPages = Math.abs(
            parseFloat(this.iDataComputed.length / pageSize)
          );
          const endPage = parseInt(totalPages, 10);
          const total =
            parseInt(totalPages, 10) +
            parseInt(totalPages - endPage > 0 ? 1 : 0, 10);
          const offset = this.configPagination.page.from > 1 ? 0 : -1;
          this.configPagination.register.total = this.iDataComputed.length;
          this.configPagination.page.to = total;
          const { from, to } = this.configPagination.register;
          return this.iDataComputed.slice(from + offset, to);
        }
        else {
          return this.iDataPagination;
        }
      }
      else {
        this.iDataComputed.forEach(itemRow => {
          const original = [...itemRow.data]; // No deepCopy needed since children are primitives
          itemRow.previousColumns.forEach((itemColumn, index) => {
            if (itemColumn.id !== this.iColumns[index].id) {
              const moveTo = this.iColumns.findIndex(
                item => item.id === itemColumn.id
              );
              if (this.statusFilter.before < this.statusFilter.after) {
                const a = itemRow.data[moveTo];
                const b = original[index];
                itemRow.data[moveTo] = b;
                original[index] = a;
              }
            }
          });
          itemRow.previousColumns = this.deepCopy(this.iColumns);
        });
        if (!this.filter) {
          this.data.data = [...this.iDataComputed];
          this.iData = [...this.iDataComputed];
        }
        return this.iDataComputed;
      }
    }
  },
  watch : {
    data : {
      immediate : true,
      /**
       * Process data when is modifying
       */
      handler() {
        this.processData();
      }
    },
    resize : {
      immediate : true,
      /**
       * When resize is enable
       * @param {Boolean} value Enable or disable
       */
      handler(value) {
        value &&
          this.$refs.table &&
          helper.resizeTable.call(this, this.$refs.table, this.selection);
      }
    },
    pagination : {
      immediate : true,
      /**
       * When pagination is enable
       * @param {Boolean} value Enable or disable
       */
      handler(value) {
        value && this.onChangePageSize();
      }
    },
    /**
     * When filter is enable
     * @param {Boolean} value Enable or disable
     */
    filter(value) {
      if (value && this.dragDrop) {
        throw new Error(
          'The filter property and drag and drop property cannot be used at the same time'
        );
      }
      if (!value) {
        Object.values(
          this.$refs.table.querySelectorAll('thead tr input')
        ).forEach(item => {
          item.value = '';
        });
        const payload = {
          data    : this.iData,
          filter  : {},
          columns : this.iColumns
        };
        this.iDataComputed = helper.dataFilter(payload);
      }
    },
    /**
     * When selection is enable
     * @param {Boolean} value Enable or disable
     */
    selection(value) {
      if (value === 'multiple' && this.dragDrop) {
        throw new Error(
          'The multiple selection property and drag and drop property cannot be used at the same time'
        );
      }
      this.iData.forEach(item => (item.selected = false));
      this.iDataComputed.forEach(item => {
        item.selected = false;
      });
      Array.from(this.$refs.table.querySelectorAll('.selected')).forEach(
        item => item.classList.remove('selected')
      );
    },
    closable : {
      immediate : true,
      /**
       * When closable is enable
       * @param {Boolean} value Enable or disable
       */
      handler(value) {
        if (value && this.dragDrop) {
          throw new Error(
            'The closable property and drag and drop property cannot be used at the same time'
          );
        }
      }
    },
    dragDrop : {
      immediate : true,
      /**
       * When drag and drop is enable
       * @param {Boolean} value Enable or disable
       */
      handler(value) {
        if (value && this.closable) {
          throw new Error(
            'The drag and drop property and closable property cannot be used at the same time'
          );
        }
        if (value && this.filter) {
          throw new Error(
            'The drag and drop property and filter property cannot be used at the same time'
          );
        }
        if (value && this.selection === 'multiple') {
          throw new Error(
            'The drag and drop property and multiple selecction property cannot be used at the same time'
          );
        }
      }
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.init();
  },
  methods : {
    /**
     * Enable the cell edition
     * @param {Number} row Row to edit
     * @param {Number} cell Cell to edit
     */
    onEnableEdition(row, cell) {
      const newArrayValues = new Array(this.iColumns.length)
        .fill(false)
        .map((_, index) => index === cell && this.iColumns[cell].editable);
      this.iDataComputed[row - 1].editable = newArrayValues;
      this.iData[row - 1].editable = newArrayValues;
    },
    /**
     * Update page size
     */
    onChangePageSize() {
      const pageSize = parseInt(this.configPagination.pageSizeSelected, 10);
      const totalPages = Math.abs(
        parseFloat(this.iDataComputed.length / pageSize)
      );
      const endPage = parseInt(totalPages, 10);
      const total =
        parseInt(totalPages, 10) +
        parseInt(totalPages - endPage > 0 ? 1 : 0, 10);
      this.iDataPagination = this.iDataComputed.slice(0, pageSize);
      Object.assign(this.configPagination.register, {
        from : 1,
        to   :
          pageSize > this.iDataPagination.length
            ? this.iDataPagination.length
            : pageSize,
        total : this.iDataComputed.length
      });
      Object.assign(this.configPagination.page, { from : 1, to : total });
      this.configPagination.pageSizeSelected = pageSize;
      this.$nextTick(() => {
        this.$refs.table && helper.setStickyColSpace();
      });
      this.$emit('onChangePageSize', {
        configPagination : this.configPagination
      });
    },
    /**
     * Change page
     * @param {String} which button
     */
    onChangePage(which) {
      const currentStatus = {
        first : 1,
        last  : this.configPagination.page.to
      };
      if (which === 'first') {
        this.configPagination.page.from = currentStatus.first;
      }
      if (which === 'prev') {
        this.configPagination.page.from--;
        if (this.configPagination.page.from < currentStatus.first) {
          this.configPagination.page.from = currentStatus.first;
        }
      }
      if (which === 'next') {
        this.configPagination.page.from++;
        if (this.configPagination.page.from > currentStatus.last) {
          this.configPagination.page.from = currentStatus.last;
        }
      }
      if (which === 'last') {
        this.configPagination.page.from = currentStatus.last;
      }
      const pageSize = parseInt(this.configPagination.pageSizeSelected, 10);
      const from = (this.configPagination.page.from - 1) * pageSize;
      const toLimit = from + pageSize > this.configPagination.register.total;
      this.configPagination.register.from = from === 0 ? 1 : from;
      this.configPagination.register.to = toLimit
        ? this.configPagination.register.total
        : from + pageSize;
      if (this.filter) {
        this.iDataComputed = this.deepCopy(this.iDataComputed);
      }
      else {
        this.iDataPagination = this.iData.slice(from, from + pageSize);
      }
      this.$emit('onChangePage', {
        configPagination : this.configPagination,
        data             : this.iDataComputed
      });
    },
    /**
     * Show contextual menuconfigPagination
     * @param {Object} evt implicit object
     */
    onContextualMenu(evt) {
      if (this.contextualMenu) {
        const refContextmenu = this.$refs['contextual-menu'];
        if (!this.setModalPosition) {
          refContextmenu.style.left = `${evt.clientX}px`;
          refContextmenu.style.top = `${evt.clientY}px`;
        }
        /**
         * TODO Behaviour in context menu
         */
        if (evt.type === 'mouseout') {
          refContextmenu.style.height = '0';
          refContextmenu.style.opacity = 0;
          refContextmenu.style.zIndex = -1;
        }
        evt.target.classList[evt.type === 'mouseover' ? 'add' : 'remove'](
          'hover'
        );
      }
    },
    /**
     * Data filter in the table
     * param {Object} val input value
     * param {Object} id col id
     */
    onDataFilter() {
      /* VUE3 HTML changed :value to v-model this.iFilter
         this.iFilter[id] = val; */
      const payload = {
        data    : this.iData,
        filter  : this.iFilter,
        columns : this.iColumns
      };
      this.statusFilter.before = this.iDataComputed.length;
      this.iDataComputed = helper.dataFilter(payload);
      this.statusFilter.after = this.iDataComputed.length;
      this.$emit('onDataFilter', { data : this.iDataComputed });
    },
    /**
     * Select row in the table
     * @param {Boolean} _checked value
     * @param {Object} evt implicit object
     */
    onSelectedRowFromCheckbox(_checked, evt) {
      this.onSelectedRow(evt);
    },
    /**
     * Select row in the table
     * @param {Object} evt implicit object
     */
    onSelectedRow(evt) {
      const payload = {
        evt,
        selection : this.selection.toLowerCase()
      };
      if (this.selection !== 'none') {
        const {
          emit,
          payload: { row, selected }
        } = helper.selectedRow.call(this, payload);
        emit && this.$emit('onSelectedRow', row, selected, evt);
      }
      const tdSelected = evt.target.closest('td');
      const moreCellsSelected =
        this.$refs.table.querySelectorAll('td.cell-selected');
      if (moreCellsSelected.length > 0) {
        moreCellsSelected.forEach(cell =>
          cell.classList.remove('cell-selected')
        );
      }
      tdSelected.classList.add('cell-selected');
    },
    /**
     * Select all rows
     * @param {Object} evt config to do the filter
     */
    onSelectedAllRows(evt) {
      this.iDataComputed.forEach(element => {
        element.selected = evt;
      });
    },
    /**
     * Order by column
     * @param {Object} evt config to do the filter
     */
    onOrderColumn(evt) {
      if (this.sort) {
        const data =
          this.iDataComputed.length === this.iData.length
            ? this.iData
            : this.iDataComputed;
        const payload = {
          evt,
          data,
          dataCol   : this.iColumns,
          selection : this.selection,
          el        : this.$refs.table
        };
        this.iDataComputed = helper.orderColumn(payload);
        this.$emit('onOrderColumn', { data : this.iDataComputed });
      }
    },
    /**
     * Close column
     * @param {Object} evt config to do the filter
     * @param {Boolean} show show or hide
     * @param {Number} colNumber col number
     */
    toggleColumn(evt, show, colNumber) {
      const rows = this.$refs.table.rows;
      colNumber = Number(colNumber);
      for (let row = 0; row < rows.length; row++) {
        const cols = rows[row].cells;
        if (colNumber >= 0 && colNumber < cols.length) {
          cols[
            this.showSelectionCheckbox ? colNumber + 1 : colNumber
          ].style.display = show ? '' : 'none';
        }
      }
      if (show) {
        this.hiddenCols = this.hiddenCols.filter(
          item => item.id !== colNumber
        );
      }
      else {
        this.hiddenCols.push({
          name :
            evt.target.parentNode.parentNode.firstElementChild.innerText ||
            `Column ${colNumber + 1}`,
          id : colNumber
        });
      }
      helper.setStickyColSpace();
      this.$emit('onToggleColumn', { hiddenColums : this.hiddenCols });
    },
    /**
     * Drag start event (Start drag)
     * @param {Object} evt Implict data
     */
    onDragstart(evt) {
      this.colDragAndDrop = evt.target;
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', evt.target.cellIndex);
    },
    /**
     * Drag over event (While drag and is on element)
     * @param {Object} evt Implict data
     */
    onDragover(evt) {
      evt.preventDefault();
      helper.dragFx(evt, true);
    },
    /**
     * Drag enter event (While drag)
     * @param {Object} evt Implict data
     */
    onDragenter(evt) {
      evt.preventDefault();
      helper.dragFx(evt, true);
    },
    /**
     * Drag leave event
     * @param {Object} evt Implicit data
     */
    onDragleave(evt) {
      helper.dragFx(evt, false);
    },
    /**
     * Drop event
     * @param {Object} evt Implicit data
     */
    onDrop(evt) {
      evt.stopPropagation();
      const el = evt.target.parentElement.parentElement;
      if (evt.toElement.offsetParent.classList.contains('sticky-col')) {
        el.classList.remove('drag');
        return;
      }
      if (el.tagName === 'TH') {
        const tr = el.parentElement;
        const currCol = this.colDragAndDrop;
        const colOffset =
          el.cellIndex === 0 ? 0 : currCol.cellIndex > el.cellIndex ? 0 : 1;
        el.classList.remove('drag');
        tr.insertBefore(currCol, tr.children[el.cellIndex + colOffset]);
        const currIndex = currCol.cellIndex;
        const sourceCellindex =
          parseInt(evt.dataTransfer.getData('text/plain'), 10) ?? currIndex;
        const [moveHead] = this.iColumns.splice(sourceCellindex, 1);
        const fn =
          moveHead.footerData && moveHead.footerData.func
            ? moveHead.footerData.func
            : null;
        this.iColumns.splice(
          currIndex,
          0,
          JSON.parse(JSON.stringify(moveHead))
        );
        fn !== null && (this.iColumns[currIndex].footerData.func = fn);
        this.iDataComputed = this.iDataComputed.map(item => {
          const [moveBody] = item.data.splice(sourceCellindex, 1);
          item.data.splice(currIndex, 0, moveBody);
          return item;
        });
        this.$emit('onDrop', { data : this.iDataComputed });
      }
    },
    /**
     * Listener to the table
     * @param {Object} evt Implict data
     */
    onKeydownTable({ ctrlKey, metaKey, key }) {
      if ((ctrlKey || metaKey) && key.toLowerCase() === 'c') {
        // ctrl + c or command + c (mac): comprueba filas seleccionadas
        const copyRowsSelected = this.iData.filter(item => item.selected);
        if (copyRowsSelected.length > 0) {
          const dataCopy = copyRowsSelected
            .map(row => `${row.data.map(cell => `${cell}\t`)}\n`)
            .toString();
          helper.copyClipboard(dataCopy);
          this.$emit('onCopyClipboard', { data : dataCopy });
        }
      }
    },
    /**
     * Listener to the table
     */
    onCellInput() {
      this.$emit('tableupdated', this.data.data); // this.iData will also include drag and sort changes but with a different format
    },
    /**
     * Cell tooltip maker
     * @param {String} value value
     * @returns {String} tooltip
     */
    makeTooltip(value) {
      return this.cellTooltipConfig[value] || '';
    },
    /**
     * make column array for footer funcs
     * @param {Number} index column index
     * @returns {Array} column array
     */
    getColumnArray(index) {
      const result =
        this.iDataComputed.length < this.data.data.length
          ? this.iDataComputed
          : this.data.data;
      return result.map(item =>
        // REVIEW version VUE2
        (item.data ? item.data[index] : item[index])
      );
    },
    /**
     * dep copy of arrays with no primitives inside
     * @param {Object} aObject object
     * @returns {Object} copy
     */
    deepCopy(aObject) {
      if (!aObject) {
        return aObject;
      }
      let v;
      const bObject = Array.isArray(aObject) ? [] : {};
      // eslint-disable-next-line guard-for-in
      for (const k in aObject) {
        v = aObject[k];
        bObject[k] = typeof v === 'object' ? this.deepCopy(v) : v;
      }
      return bObject;
    },
    /**
     * Save updated data in localStorage for possible recovery
     */
    doSave() {
      const saveObject = {};
      saveObject.columns = this.deepCopy(this.iColumns);
      saveObject.columns.forEach(col => {
        if (col.footerData && col.footerData.func) {
          col.footerData.func = col.footerData.func.toString();
        }
      });
      saveObject.data = this.iDataComputed;
      localStorage.setItem('dl-ui-datagrid-data', JSON.stringify(saveObject));
      this.recoverButton = true;
    },
    /**
     * Recover storage table state and apply
     */
    doRecover() {
      const state = JSON.parse(localStorage.getItem('dl-ui-datagrid-data'));
      state.columns.forEach(col => {
        if (col.footerData && col.footerData.func) {
          // eslint-disable-next-line no-eval
          col.footerData.func = eval(`(${col.footerData.func})`);
        }
      });
      this.recoveredState = true;
      this.resetButton = true;

      /* VUE 2
         this.$set(this, "iColumns", state.columns);
         this.$set(this, "iDataComputed", state.data);
         REVIEW VUE 3 */
      this.iColumns = state.columns;
      this.iDataComputed = state.data;
    },
    /**
     * Reset table to original state
     */
    doReset() {
      this.processData();
      this.resetButton = false;
    },
    /**
     * Emit updated data for exporting purposes
     */
    doExport() {
      const exportable = {};
      const arr = [];
      this.iDataComputed.forEach(row => {
        arr.push(row.data);
      });
      exportable.columns = this.iColumns;
      exportable.data = arr;
      this.$emit('exporting', exportable);
    },
    /**
     * Data init
     */
    processData() {
      this.iColumns = this.deepCopy(this.data.columns);
      this.iData = this.data.data.map((item, index) => ({
        data            : item?.data || item,
        selected        : false,
        iId             : index + 1,
        previousColumns : this.deepCopy(this.iColumns),
        editable        : new Array(this.iColumns.length).fill(false)
      }));
      this.iDataComputed = this.deepCopy(this.iData);
    },
    /**
     * Compo init
     */
    init() {
      /**
       * TODO Behaviour in context menu
       */
      this.$el.addEventListener(
        'contextmenu',
        evt => {
          evt.preventDefault();
          this.setModalPosition = true;
          this.contextualMenu &&
            helper.showContextualMenu({
              evt,
              ref : this.$refs['contextual-menu']
            });
        },
        false
      );
      if (localStorage.getItem('dl-ui-datagrid-data')) {
        this.recoverButton = true;
      }
      helper.setStickyColSpace(this.$refs.table);
    },
    /**
     * get footer data from column
     * @param {Object} column data
     * @param {Number} index column
     * @returns {String} value func
     */
    funcFooterValue(column, index) {
      let value = 'None';
      if (
        column.footerData &&
        column.footerData.func &&
        typeof column.footerData.func === 'function'
      ) {
        const columnArray = this.getColumnArray(index);
        if (column.footerData) {
          value = column.footerData.func(columnArray);
        }
      }
      return value;
    }
  },
  // DEMO META DATA
  ...metadata
};
