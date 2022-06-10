import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-colors',
  components : {
    DlUiTab  : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tab" */ '@/components/atoms/dl-ui-tab')),
    DlUiTabs : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-tabs" */ '@/components/molecules/dl-ui-tabs'))
  },
  props : {
    /**
   * Override
   * @override
   */
    data : {
      type    : Object,
      default : null
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      varStyles : {}
    };
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.varStyles = getComputedStyle(document.body, '.theme-wireframe');

  },
  methods : {

    /**
   * Override
   * @override
   */
    getColor(item, refName) {

      let color = item.color;

      if (item.varColor) {

        if (this.$refs[refName]) {

          const element = this.$refs[refName][0];
          const myDivObjBgColor = window.getComputedStyle(element).backgroundColor;

          const componentToHex = c => {

            const hex = Number(c).toString(16);
            return (hex.length === 1 ? `0${ hex}` : hex).toUpperCase();
          };

          const rgbToHex = (r, g, b) => `#${ componentToHex(r) }${componentToHex(g) }${componentToHex(b)}`;

          const myDivObjBgColorRGB = myDivObjBgColor.split('(')[1].split(')')[0].split(',');

          color = rgbToHex(myDivObjBgColorRGB[0], myDivObjBgColorRGB[1], myDivObjBgColorRGB[2]);
        }

      }
      return color;

    },
    /**
   * Override
   * @override
   */
    getClassSample(item, colors) {

      let classes = '';
      if (Array.isArray(item.options)) {
        const options = item.options.map( e => `dl-comp-storybook-colors__sample--${e}`);
        classes = options.join(' ');
      }

      if (colors.size) {
        classes += ` dl-comp-storybook-colors__sample--${colors.size}`;
      }
      return classes;
    },
    /**
   * Override
   * @override
   */
    getStyleSample(item) {
      const styles = [];
      if (item.varColor && this.varStyles) {
        // const color = this.varStyles.getPropertyValue(`--${item.varColor}`);
        styles.push( `background-color: var(--${item.varColor})` );
      }
      else {
        styles.push(`background-color: ${item.color}`);
      }

      return styles.join('; ');
    }
  }

};
