import DlUiIcon from '../dl-ui-icon';
import metadata from './_metadata';

export default {
  name       : 'dl-ui-breadcrumb',
  components : {
    'dl-ui-icon' : DlUiIcon
  },
  emits : ['itemClicked'],
  props : {
    /**
     * Init value.
     */
    config : {
      type    : Array,
      default : () => [{
        // home
        icon : 'dl-ids-icon-home-filled',
        fn   : () => {
          // eslint-disable-next-line no-console
          console.log('Trace "Home"');
        }
      }, {
        label : 'Page A',
        fn    : () => {
        // eslint-disable-next-line no-console
          console.log('Trace "Page A"');
        }
      }, {
        label : 'Page B',
        fn    : () => {
        // eslint-disable-next-line no-console
          console.log('Trace "Page B"');
        },
        route       : 'breadcrumb',
        routeParams : { 'option' : 'Page B' }
      },
      {
        label    : 'Page C',
        disabled : true
      }],
      desc : 'Configuración de items del breadcrumb'
    },
    /**
     * Separator element for menu items.
     */
    separator : {
      type    : String,
      default : '/',
      desc    : 'Element used to separate each menu option'
    }
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      linkActive : undefined
    };
  },
  methods : {

    /**
     * Manage click event on items, Fire 'select' event upwards
     * @param {Number} index index position
       */
    onClickItem(index) {
      const config = this.config[index];
      if (!config.disabled) {
        this.linkActive = index;
        if (config.fn) {
          config.fn(...(config.fnParams ? config.fnParams : []));
        }
        if (config.route) {
          this.$router.push({
            name   : config.route,
            params : config.routeParams ? config.routeParams : {}
          });
        }
        this.$emit('itemClicked', config);
      }
    }
  },
  // DEMO META DATA
  ...metadata
};
