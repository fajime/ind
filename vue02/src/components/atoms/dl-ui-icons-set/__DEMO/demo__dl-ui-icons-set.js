// A generic import name will ease next developments
import { nextTick } from 'vue';
import theComponent from '../';
import DlUiIcon from '@/components/atoms/dl-ui-icon';
import DlCompKitDemoTemplate from '@/catalog/components/templates/dl-comp-kit-demo-template';
import mixinPlayground from '@/catalog/mixins/playgroundPropsAndEvents';

export default {
  name       : 'dl-ui-view-__DEMO-dl-ui-icons-set',
  components : {
    DlUiIcon,
    theComponent,
    DlCompKitDemoTemplate
  },
  mixins : [mixinPlayground],

  /**
   * override
   * @override
   */
  mounted() {
    nextTick(() => {
      // load icon set from icon set
      const icons = Array.from(
        document.querySelectorAll('.demo__dl-ui-icons-set__wrapper #dl-ui-icons-set symbol')
      ).map(node => node.id);
      icons.forEach(icon => {
        this.idsicons.push({ name : icon, value : icon });
      });

      const cicons = Array.from(
        document.querySelectorAll('#custom-icons-set symbol')
      ).map(node => node.id);
      cicons.forEach(icon => {
        this.appicons.push({ name : icon, value : icon });
      });
    });
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      idsicons   : [],
      appicons   : [],
      playground : {
        props : [

        ],
        style : {

        }
      },
      component : theComponent
    };
  }
};
