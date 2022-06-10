import { routes } from '@/catalog/router';
// import { eventBus } from '../../../../main';
import DlUiInput from '@/components/atoms/dl-ui-input';
import DlUiIcon from '@/components/atoms/dl-ui-icon';
import DlUiButton from '@/components/atoms/dl-ui-button';
export default {
  name       : 'dl-comp-kit-index',
  components : {
    'dl-ui-icon'   : DlUiIcon,
    'dl-ui-input'  : DlUiInput,
    'dl-ui-button' : DlUiButton
  },
  computed : {
    /**
     * Fit the component tree generated from `route` using` search`
     * @return {Array} Array with the filter result
     */
    filteredItems() {
      const result = [];
      const catalogRoutes = this.routes.filter(route => route.name.toLowerCase() === 'catalog');
      let catalogRoutesCompos = catalogRoutes[0].children.filter(route => route.name.toLowerCase() !== 'home');
      catalogRoutesCompos = catalogRoutesCompos.filter(({ children }) => (!!((children && children.length > 0))));
      catalogRoutesCompos.forEach(type => {
        const groupName = type.name;
        let components = type.children;
        components = components.filter(({ name: iName }) => iName.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        if (components.length > 0) {
          result.push({
            name     : groupName,
            children : components,
            opened   : true
          });
        }
      });
      return result;
    }
  },
  watch : {
    /**
   * Override
   * @override
   */
    $route() {
      if (this.$refs.section !== undefined) {
        setTimeout(() => {
          this.$refs.section.scrollTo({ top : 0, behavior : 'smooth' });
        }, 100);

      }
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    if (this.$router.currentRoute.path === '/') {
      this.$router.push('welcome');
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      routes,
      search : ''
    };
  },
  methods : {
    /**
     * Cierra o abre una carpeta del arbol de componentes
     * @param {Event} e Evento click
     */
    toggleBranchStatus(e) {
      e.target.classList.toggle('dl-comp-kit-index__branch--active');
    },
    /**
     * Redirecciona al nuevo catálogo de componentes
     */
    goToStorybook() {
      // eventBus.$emit('evt-bus-storybook', { show : true });
    },
    /**
     * Redirecciona a bitbucket
     */
    goToBitbucket() {
      window.open('https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/', '_blank');
    }
  }
};
