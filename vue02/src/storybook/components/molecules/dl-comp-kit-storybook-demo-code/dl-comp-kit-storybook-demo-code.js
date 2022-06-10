export default {
  name  : 'dl-comp-kit-storybook-demo-code',
  props : {
    /** display scss*/
    showSCSS : {
      type    : Boolean,
      default : true
    }
  },
  methods : {
    /**
     * Override
     * @override
     */
    highlightHTML() {
      let htmlCode = this.$refs.html.innerHTML;
      htmlCode = htmlCode.replace(/"(.*?)"/g, '<span class="dl-comp-kit-storybook-demo-code__html--str">&quot;$1&quot;</span>');
      htmlCode = htmlCode.replace(/&lt;(.*?)&gt;/g, '<span class="dl-comp-kit-storybook-demo-code__html--elem">&lt;$1&gt;</span>');
      this.$refs.html.innerHTML = htmlCode;
    },
    /**
     * Override
     * @override
     */
    highlightJS() {
      let jsCode = this.$refs.js.innerHTML;
      jsCode = jsCode.replace(/;/g, ';<br/>');
      jsCode = jsCode.replace(/'(.*?)'/g, '<span class="dl-comp-kit-storybook-demo-code__js--str">&quot;$1&quot;</span>');
      this.$refs.js.innerHTML = jsCode;
    },
    /**
     * Override
     * @override
     */
    highlightSCSS() {
      let scssCode = this.$refs.scss.innerHTML;
      // detect ,
      scssCode = scssCode.replace(/,/g, ',<br/>');
      // detect ;
      scssCode = scssCode.replace(/;/g, ';<br/>');
      // detect {
      scssCode = scssCode.replace(/{/g, '{<br/>');
      // detect {}
      scssCode = scssCode.replace(/{([^}]+)}/g, '&#123;<span class="dl-comp-kit-storybook-demo-code__scss--braces">$1</span>&#125;');
      // detect strings ''
      scssCode = scssCode.replace(/'(.*?)'/g, '<span class="dl-comp-kit-storybook-demo-code__scss--str">&quot;$1&quot;</span>');
      // detect variables $
      scssCode = scssCode.replace(/\$(.*?):/g, '<span class="dl-comp-kit-storybook-demo-code__scss--variable">&#36;$1</span>&#58;');
      scssCode = scssCode.replace(/\$(.*?),/g, '<span class="dl-comp-kit-storybook-demo-code__scss--variable">&#36;$1</span>&#44;');
      scssCode = scssCode.replace(/\$(.*?)\)/g, '<span class="dl-comp-kit-storybook-demo-code__scss--variable">&#36;$1</span>&#41;');
      this.$refs.scss.innerHTML = scssCode;
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.highlightHTML();
    this.highlightJS();
    this.highlightSCSS();
  }
};
