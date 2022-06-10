import { defineAsyncComponent } from 'vue';

export default {
  name       : 'dl-comp-storybook-iconography',
  components : {
    DlCompStorybookCard : defineAsyncComponent(() => import(/* webpackChunkName: "dl-comp-storybook-card" */ '@/storybook/components/molecules/dl-comp-storybook-card')),
    DlUiInput           : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-input"*/ '@/components/atoms/dl-ui-input')),
    DlUiSwitch          : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-switch"*/ '@/components/atoms/dl-ui-switch')),
    DlUiIcon            : defineAsyncComponent(() => import(/* webpackChunkName: "dl-ui-icon" */ '@/components/atoms/dl-ui-icon'))

  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      filled      : false,
      searchValue : '',
      resources   : [
        {
          icon : {
            type  : 'dl-ui-icon-figma',
            align : 'right'
          },
          header : 'Librerías de diseño',
          body   : '',
          action : {
            text : 'Descargar',
            link : ''
          }
        }
      ],
      icons       : [],
      normalIcons : [
        {
          type : 'dl-ids-icon-home-filled',
          name : 'Home'
        },
        {
          type : 'dl-ui-icon-lab',
          name : 'Lab'
        },
        {
          type : 'dl-ids-icon-user-single-outlined',
          name : 'User'
        },
        {
          type : 'dl-ui-icon-star',
          name : 'Star'
        },
        {
          type : 'dl-ui-icon-forbidden',
          name : 'Forbidden'
        },
        {
          type : 'dl-ui-icon-check',
          name : 'Check'
        },
        {
          type : 'dl-ui-icon-eye',
          name : 'Eye'
        },
        {
          type : 'dl-ui-icon-eye-closed',
          name : 'Eye Closed'
        },
        {
          type : 'dl-ui-icon-arrow-down',
          name : 'Arrow Down'
        },
        {
          type : 'dl-ui-icon-loading',
          name : 'Loading'
        },
        {
          type : 'dl-ui-icon-check-mix',
          name : 'Check Mix'
        },
        {
          type : 'dl-ui-icon-check-select',
          name : 'Check Select'
        },
        {
          type : 'dl-ui-icon-search',
          name : 'Search'
        },
        {
          type : 'dl-ui-icon-cancel',
          name : 'Cancel'
        },
        {
          type : 'dl-ui-icon-dot',
          name : 'Dot'
        },
        {
          type : 'dl-leaflet-wc-dot',
          name : 'Wc Dot'
        },
        {
          type : 'dl-leaflet-wc-add',
          name : 'Wc Add'
        },
        {
          type : 'dl-leaflet-wc-edit',
          name : 'Wc Edit'
        },
        {
          type : 'dl-leaflet-wc-delete',
          name : 'Wc Delete'
        },
        {
          type : 'dl-leaflet-wc-circle',
          name : 'Wc Circle'
        },
        {
          type : 'dl-leaflet-wc-polygon',
          name : 'Wc Polygon'
        },
        {
          type : 'dl-leaflet-wc-corridor',
          name : 'Wc Corridor'
        },
        {
          type : 'dl-leaflet-wc-cancel',
          name : 'Wc Cancel'
        },
        {
          type : 'dl-leaflet-wc-confirm',
          name : 'Wc Confirm'
        },
        {
          type : 'dl-leaflet-wc-2confirm',
          name : 'Wc 2Confirm'
        },
        {
          type : 'dl-leaflet-wc-undo',
          name : 'Wc Undo'
        },
        {
          type : 'dl-ui-icon-delete-outline',
          name : 'Delete'
        }
      ],
      filledIcons : [
        {
          type : 'dl-ui-icon-delete-filled',
          name : 'Delete'
        }
      ]
    };
  },
  /**
   * Override
   * @override
   */
  created() {
    this.icons = this.normalIcons;
  },
  methods : {
    /**
     * Override
     * @override
     */
    toggleFilled() {
      this.filled = !this.filled;

      if (this.filled) {
        this.icons = this.filledIcons;
      }
      else {
        this.icons = this.normalIcons;
      }
      this.searchIcons(this.searchValue);
    },
    /**
     * Override
     * @override
     */
    searchIcons(text) {
      this.searchValue = text;
      if (text === '') {
        this.icons = this.filled ? this.filledIcons : this.normalIcons;
      }
      else if (this.filled) {
        this.icons = this.filledIcons.filter(ic => ic.type.includes(text));
      }
      else {
        this.icons = this.normalIcons.filter(ic => ic.type.includes(text));
      }
    }
  }
};
