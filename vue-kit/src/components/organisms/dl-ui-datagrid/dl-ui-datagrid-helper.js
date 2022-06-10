export const helper = {
  /**
   * Copy data to clipboard
   * @param {String} data Data to copy
   */
  copyClipboard : data => {
    navigator.clipboard.writeText(data);
  },
  /**
   * Data filter in the table
   * @param {Object} payload config to do the filter
   * @returns {Array} Filter data
   */
  dataFilter : ({ data: rows, filter, columns }) => [
    ...rows.filter(cell => {
      const filteredColumns = Object.entries(filter).map(
        ([columnId, value]) => ({
          columnIndex : columns.findIndex(({ id }) => id === columnId),
          value
        })
      );
      return (
        filteredColumns.filter(
          ({ columnIndex, value }) =>
            cell.data[columnIndex].toString().indexOf(value) >= 0
        ).length === Object.values(filter).length
      );
    })
  ],
  /**
   * Order by column
   * @param {Object} payload config to do the filter
   * @returns {Array} Ordered columns
   */
  orderColumn : ({
    evt, selection, data, dataCol, el
  }) => {

    const { currentTarget: { dataset: { columnId: id } } } = evt;
    const isAsc = dataCol.find(column => column.id === id).order === 'asc';
    dataCol.find(column => column.id === id).order = isAsc ? 'desc' : 'asc';
    const col = el.querySelector(`th[data-column-id=${id}`);
    const idx = selection === 'multiple' ? col.cellIndex - 1 : col.cellIndex;
    return data.sort(({ data: dataA }, { data: dataB }) => {
      const vA = dataA[idx];
      const vB = dataB[idx];
      const valueA = helper.isDate(vA)
        ? vA
        : helper.isNumber(vA)
          ? parseFloat(vA)
          : vA;
      const valueB = helper.isDate(vB)
        ? vB
        : helper.isNumber(vB)
          ? parseFloat(vB)
          : vB;
      const order = valueA > valueB ? 1 : valueB > valueA ? -1 : 0;
      return order * (isAsc ? -1 : 1);
    });
  },
  /**
   * Convert date from a country to JS
   * @param {Date} value Date to transform
   * @param {String} country Country entry date format
   * @returns {Boolean} response
   */
  formatDateJS : (value, country = 'es') => {
    const [v1 = null, v2 = null, v3 = null] = value.split('/');
    if (!v1 || !v2 || !v3) {
      return false;
    }
    const countries = {
      es : [parseFloat(v3), parseFloat(v2), parseFloat(v1)],
      en : [parseFloat(v1), parseFloat(v2), parseFloat(v3)]
    };
    return new Date(countries[country]);
  },
  /**
   * Date validation by country
   * @param {String} value Value to check
   * @param {String} country Country
   * @returns {Boolean} response
   */
  isDate : (value, country = 'es') => {
    const [v1 = null, v2 = null, v3 = null] = value?.split
      ? value.split('/')
      : [];
    if (!v1 || !v2 || !v3) {
      return false;
    }
    const countries = {
      es : [31, 12, 9999],
      en : [12, 31, 9999]
    };
    const day = v1 > 0 && v1 <= countries[country][0];
    const month = v2 > 0 && v2 <= countries[country][1];
    const year = v3 > 0 && v3 <= countries[country][2];
    return day && month && year;
  },
  /**
   * Check is number
   * @param {*} value Value to check
   * @returns {Boolean} response
   */
  isNumber  : value => !isNaN(value),
  /**
   * Create new div to the resize
   * @param {Number} height Height
   * @returns {Object} new value
   */
  createDiv : () => {
    const div = document.createElement('div');
    div.style.top = 0;
    div.style.right = 0;
    div.style.width = '5px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    div.style.height = '100%';
    return div;
  },
  /**
   * Calculate value style
   * @param {Obj} elm html element
   * @param {String} css css props
   * @returns {String}styles
   */
  getStyleVal : (elm, css) =>
    window.getComputedStyle(elm, null).getPropertyValue(css),
  /**
   * Add padding in resize
   * @param {Object} col column
   * @returns {Number} value
   */
  paddingDiff : col => {
    if (helper.getStyleVal(col, 'box-sizing') === 'border-box') {
      return 0;
    }
    const padLeft = helper.getStyleVal(col, 'padding-left');
    const padRight = helper.getStyleVal(col, 'padding-right');
    return parseInt(padLeft, 10) + parseInt(padRight, 10);
  },
  /**
   * Effect drag
   * @param {Obejct} evt Drag event
   * @param {Boolean} status Fx
   */
  dragFx(evt, status = true) {
    const el = evt.target.parentElement.parentElement;
    el.tagName === 'TH' && el.classList[status ? 'add' : 'remove']('drag');
  },
  /**
   * Table resize
   * @param {Object} table Reference to the table
   * @param {String} selection Type of selection
   */
  resizeTable(table, selection) {
    const row = table.getElementsByTagName('tr')[0];
    const cols = row ? row.children : undefined;
    if (!cols) {
      return;
    }
    // table.style.overflow = 'hidden';
    const colsLen = cols.length;
    for (
      let colIndex = selection === 'multiple' ? 1 : 0;
      colIndex < colsLen;
      colIndex++
    ) {
      const div = helper.createDiv();
      cols[colIndex].appendChild(div);
      if (
        !cols[colIndex].classList.contains('sticky-col') &&
        !cols[colIndex].classList.contains('sticky-header')
      ) {
        cols[colIndex].style.position = 'relative';
      }
      helper.listenerResize.call(this, div);
    }
    helper.setStickyColSpace();
  },
  /**
   * Table resize
   * @param {Object} div value
   */
  listenerResize(div) {
    let pageX = null;
    let curCol = null;
    let nxtCol = null;
    let curColWidth = null;
    let nxtColWidth = null;

    const localMousedown = status =>
      (status
        ? evt => {
          curCol = evt.target.parentElement;
          nxtCol = curCol.nextElementSibling;
          pageX = evt.pageX;
          const padding = helper.paddingDiff(curCol);
          curColWidth = curCol.offsetWidth - padding;
          if (nxtCol) {
            nxtColWidth = nxtCol.offsetWidth - padding;
          }
        }
        : () => {});
    const localMouseover = status =>
      (status
        ? evt => {
          evt.target.style.cursor = 'col-resize';
          evt.target.style.borderRight = '2px solid #bbbbbb';
        }
        : evt => {
          evt.target.style.cursor = 'default';
          return {};
        });

    const localMouseout = status =>
      (status
        ? evt => {
          evt.target.style.borderRight = '';
        }
        : () => {});

    const globalMousemove = status =>
      (status
        ? evt => {
          if (curCol) {
            const diffX = evt.pageX - pageX;
            if (nxtCol) {
              nxtCol.style.width = `${nxtColWidth - diffX}px`;
            }
            curCol.style.width = `${curColWidth + diffX}px`;
            helper.setStickyColSpace();
          }
        }
        : () => {});
    const globalMouseup = status =>
      (status
        ? () => {
          curCol = null;
          nxtCol = null;
          pageX = null;
          nxtColWidth = null;
          curColWidth = null;
        }
        : () => {});

    div.addEventListener('mousedown', evt =>
      localMousedown(this.resize)(evt)
    );
    div.addEventListener('mouseover', evt =>
      localMouseover(this.resize)(evt)
    );
    div.addEventListener('mouseout', evt => localMouseout(this.resize)(evt));
    document.addEventListener('mousemove', evt =>
      globalMousemove(this.resize)(evt)
    );
    document.addEventListener('mouseup', () => globalMouseup(this.resize)());
  },
  /**
   * Sticky cols adjustment
   * @param {Object} table table
   */
  setStickyColSpace(table) {
    table && (this.table = table);
    const stickyCols = [
      ...this.table.querySelectorAll('.sticky-col[data-id]:not([data-id="0"]'),
      ...this.table.querySelectorAll(
        '.sticky-col[data-td-body-id]:not([data-td-body-id="0"]'
      )
    ];
    stickyCols.forEach(element => {
      const colIndex =
        element.getAttribute('data-id') ||
        element.getAttribute('data-td-body-id');
      let space = 0;
      for (let index = 0; index < colIndex; index++) {
        const cellWidth = this.table.querySelector(
          `th[data-id="${index}"]`
        ).offsetWidth;
        space += cellWidth;
      }
      element.style.left = `${space}px`;
    });
  },
  /**
   * Select a row
   * @param {Object} payload config to do the filter
   * @returns {Object} Filter data
   */
  selectedRow({ evt, selection }) {
    const selectedAction = (elem, status) => {
      // parent.rowIndex - 1 ... Necesitamos restar 1 ya que el header de momento esta fijo
      let index = elem.rowIndex - 1;
      this.filter && index--;
      this.iDataComputed[index].selected = status;
    };
    const selectionFn = ({ parent, actionClasslist, isSelected }) => {
      if (selection === 'single') {
        const currentTable = parent.parentElement.parentElement;
        Array.from(currentTable.querySelectorAll('.selected')).forEach(
          item => {
            selectedAction(item, false);
            item.classList.remove('selected');
          }
        );
      }
      parent.classList[actionClasslist]('selected');
      selectedAction(parent, !isSelected);
      return true;
    };
    let { parentElement: parent } = evt.currentTarget;
    const isInputcheckbox = parent.tagName === 'SPAN';
    parent = isInputcheckbox
      ? parent.parentElement.parentElement.parentElement
      : parent;
    const isSelected = Array.from(parent.classList).includes('selected');
    const actionClasslist = isSelected ? 'remove' : 'add';
    const payload = { row : parent, selected : !isSelected };
    let emit = false;
    emit = selectionFn({ parent, actionClasslist, isSelected });
    return { emit, payload };
  },
  /**
   * Show contextual menu
   * @param {Object} evt implicit object
   */
  showContextualMenu({ evt, ref }) {
    /**
     * TODO Behaviour in context menu
     */
    ref.style.display = 'none';
    setTimeout(() => {
      ref.style.display = 'block';
      ref.style.left = `${evt.pageX + 3}px`;
      ref.style.top = `${evt.pageY + 3}px`;
      ref.style.height = 'auto';
      ref.style.opacity = 1;
      ref.style.zIndex = 10;
    }, 0);
  },
  /**
   * Text align in header
   * @param {Object} column Column properties
   * @return {String} Class to apply
   */
  calcTextAlign(column) {
    return `text-${column?.textAlign || 'left'}`;
  },
  /**
   * Execute a function from string
   * @param {Array} args Array with the arguments to injection in thefunction
   * @param {Object} data Data to convert to a function
   * @return {*} Result of function execution
   */
  executeFunction(args, data) {
    const fn = new Function(data.arg.join(', '), data.fn);
    return fn(args);
  }
};
