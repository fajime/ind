import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-kit-demo-pagination',
  components : {
    DlUiIcon : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '../../../../components/atoms/dl-ui-icon'))
  },
  props : {
    /**
     * props total array of items.
     */
    items : {
      type     : Array,
      required : true
    },
    /**
     * props initial page or current page.
     */
    initialPage : {
      type    : Number,
      default : 1
    },
    /**
     * props page size.
     */
    pageSize : {
      type    : Number,
      default : 10
    },
    /**
     * props maximum number of pages.
     */
    maxPages : {
      type    : Number,
      default : 10
    }
  },
  /**
   * data object contains tableData
   * @returns {pager} pager
   */
  data() {
    return {
      pager : {}
    };
  },
  /**
   * Override
   * @override
   */
  created() {
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  },
  methods : {
    /**
     * Override
     * @override
     */
    paginate(
      totalItems,
      currentPage = 1,
      pageSize = 10,
      maxPages = 10
    ) {
    // calculate total pages
      const totalPages = Math.ceil(totalItems / pageSize);

      // ensure current page isn't out of range
      if (currentPage < 1) {
        currentPage = 1;
      }
      else if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      let startPage;
      let endPage;
      if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
      }
      else {
        // total pages more than max so calculate start and end pages
        const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
          // current page near the start
          startPage = 1;
          endPage = maxPages;
        }
        else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
          // current page near the end
          startPage = totalPages - maxPages + 1;
          endPage = totalPages;
        }
        else {
          // current page somewhere in the middle
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
        }
      }

      // calculate start and end item indexes
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages in the pager control
      const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

      // return object with all pager properties required by the view
      return {
        totalItems,
        currentPage,
        pageSize,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages
      };
    },
    /**
     * Override
     * @override
     */
    setPage(page) {
      const { items, pageSize, maxPages } = this;

      // get new pager object for specified page
      const pager = this.paginate(items.length, page, pageSize, maxPages);

      // get new page of items from items array
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // update pager
      this.pager = pager;

      // emit change page event to parent component
      this.$emit('changePage', pageOfItems);
    },
    /**
     * Override
     * @override
     */
    previousPage() {
      this.setPage(this.pager.currentPage - 1);
    },
    /**
     * Override
     * @override
     */
    nextPage() {
      this.setPage(this.pager.currentPage + 1);
    }
  }
};

