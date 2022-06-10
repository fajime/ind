import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-updates',
  components : {
    DlUiIcon : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon')),
    DlUiChip : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-chip" */ '@/components/atoms/dl-ui-tag'))
  },
  props : {
    /**
     * data object contains tableData
     * @returns {Array} data
     */
    data : {
      type    : Array,
      default : () => []
    },
    /**
     * title string
     * @returns {String} title
     */
    title : {
      type    : String,
      default : ''
    }
  }
};
