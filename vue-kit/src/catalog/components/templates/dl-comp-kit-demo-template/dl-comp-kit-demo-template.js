import DlCompKitDemoSection from '../../molecules/dl-comp-kit-demo-section';
import DlCompKitDemoPlayground from '../../organisms/dl-comp-kit-demo-playground';
import DlCompKitDemoUse from '../../molecules/dl-comp-kit-demo-use';
import DlCompKitDemoTable from '../../molecules/dl-comp-kit-demo-table';

export default {
  name       : 'dl-comp-kit-demo-template',
  components : {
    'dl-comp-kit-demo-section'    : DlCompKitDemoSection,
    'dl-comp-kit-demo-playground' : DlCompKitDemoPlayground,
    'dl-comp-kit-demo-use'        : DlCompKitDemoUse,
    'dl-comp-kit-demo-table'      : DlCompKitDemoTable
  },
  props : {
    /** data of component */
    component : {
      type    : Object,
      default : () => (undefined)
    },
    /** data of playground */
    playground : {
      type    : Object,
      default : () => (undefined)
    }
  },
  methods : {
    /**
   * Override
   * @override
   */
    showTitle() {
      let show = true;
      if (this.playground) {
        if (this.playground.customOptions) {
          if (this.playground.customOptions.showTitle !== undefined) {
            show = this.playground.customOptions.showTitle;
          }
        }
      }
      return show;
    },
    /**
   * Override
   * @override
   */
    showSection(sectionName) {
      let show = true;
      if (this.playground) {
        if (this.playground.customOptions) {
          if (this.playground.customOptions[`show${ sectionName}`] !== undefined) {
            show = this.playground.customOptions[`show${ sectionName}`];
          }
        }
      }
      return show;
    }
  }
};
