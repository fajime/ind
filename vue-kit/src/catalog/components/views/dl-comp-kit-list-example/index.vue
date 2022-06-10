<!-- eslint-disable max-len -->
<template>
  <!--
    <br />
  Ripple fx:
  <br />
  <div style="padding: 30px; max-width: 300px; background: #999; position: relative;">
    <div

      style="width: 100%; height: 100%; position: absolute;  top: 0; left: 0;"
    >
      <div v-dl-ui-ripple style="width: 100%; height: 100%;" />
    </div>

    <button style="background: #ccc; border-radius: 8px; padding: 20px 20px; position: relative;  overflow: hidden;">
      <div

        style="width: 100%; height: 100%; position: absolute;  top: 0; left: 0;"
      >
        <div v-dl-ui-ripple="'#44c8'" style="width: 100%; height: 100%;" />
      </div>
      <span style=" position: relative;">HOLA PROBANDO</span>
    </button>
  </div>
-->
  <dl-comp-kit-icons-set />
  <div style="padding: 50px; max-width: 600px;"
       class="theme-wireframe"
  >
    <br />

    <input style="border: 1px solid #111;" />
    <br />

    <br />

    <div style="width: 200px;">
      <dl-ui-multiselect v-model="multiselection"
                         label="Probando"
                         help="Debes escribir algo"
                         :multiple="false"
                         :showClear="true"
                         :options="options"
                         class="dl-ui-multiselect--large"
      />
    </div>

    <br />
    <dl-ui-autocomplete v-model="selections"
                        label="Probando"
                        help="Debes escribir algo"
                        :multiple="false"
                        :showClear="true"
                        :options="options2"
                        :loading="loading"
                        class="dl-ui-select--small"
                        @complete="handleComplete"
    />

    <br />

    <br />
    <dl-ui-listbox
      v-model="multiselection"
      style="width: 50%;"
      label="Probando"
      help="Debes escribir algo"
      :multiple="true"
      :showClear="true"
      :options="options1"
      :visibleItems="7"
      class="dl-ui-treebox--large"
      @update:modelValue="handleChange"
    />

    <br />

    <div style="display: flex; flex-direction: row; width: 100%;">
      <dl-ui-treebox v-model="selection"
                     style="width: 70%; margin-right: 10px;"
                     label="Probando"
                     help="Debes escribir algo"
                     :multiple="false"
                     :showClear="true"
                     :options="options"
                     :visibleItems="8"
                     class="dl-ui-treebox--large"
      />
    </div>
  </div>
</template>

<script>
import CatalogIconsSet from '@/catalog/components/atoms/dl-comp-kit-icons-set';

import DlUiAutocomplete from '@/components/atoms/dl-ui-autocomplete';
import DlUiMultiselect from '@/components/atoms/dl-ui-multiselect';
import DlUiTreebox from '@/components/molecules/dl-ui-treebox';
import DlUiListbox from '@/components/atoms/dl-ui-listbox';
import dlUiRipple from '@/directives/dl-ui-ripple';

export default {
  name       : 'List',
  components : {
    'dl-comp-kit-icons-set' : CatalogIconsSet,
    'dl-ui-autocomplete'    : DlUiAutocomplete,
    'dl-ui-treebox'         : DlUiTreebox,
    'dl-ui-listbox'         : DlUiListbox,
    'dl-ui-multiselect'     : DlUiMultiselect
  },
  directives : { 'dl-ui-ripple' : dlUiRipple },
  /**
   * Override
   * @override
   */
  data() {
    return {
      loading        : false,
      options2       : [],
      multiselection : ['value 2'],
      selections     : 'value 3',
      selection      : ['value ss7'],
      scrollHeight   : '150px',
      options1       : [
        { name : 'name 1', value : 'value 1', disabled : true },
        { name : 'name 2', value : 'value 2' },
        { name : 'ssub 1', value : 'value ss1' },
        {
          name     : 'sub item 2',
          value    : 'value s2',
          leftIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'name 5', value : 'value 5' },
        { name : 'ssssub 64', value : 'value ssss64' },
        { name : 'name 9', value : 'value 9' },
        { name : 'name 10', value : 'value 10' }
      ],
      options : [
        { name : 'name 1', value : 'value 1', disabled : true },
        {
          name     : 'name 2',
          value    : 'value 2',
          leftIcon : 'dl-ids-icon-user-single-outlined',
          options  : [
            { name : 'sub item 1', value : 'value s1' },
            {
              name     : 'sub item 2',
              value    : 'value s2',
              leftIcon : 'dl-ids-icon-user-single-outlined'
            },
            {
              name      : 'sub item 3',
              value     : 'value s3',
              rightIcon : 'dl-ids-icon-user-single-outlined',
              options   : [
                { name : 'ssub 1', value : 'value ss1' },
                { name : 'ssub 2', value : 'value ss2' },
                { name : 'ssub 3', value : 'value ss3' },
                { name : 'ssub 4', value : 'value ss4' },
                { name : 'ssub 5', value : 'value ss5' },
                { name : 'ssub 6', value : 'value ss6' },
                { name : 'ssub 7', value : 'value ss7' },
                { name : 'ssub 8', value : 'value ss8' }
              ]
            }
          ]
        },
        {
          name      : 'name 3',
          value     : 'value 3',
          rightIcon : 'dl-ids-icon-user-single-outlined'
        },
        { name : 'name 4', value : 'value 4', disabled : true },
        { name : 'name 5', value : 'value 5' },
        {
          name    : 'name 6', value   : 'value 6',
          options : [
            { name : 'ssub 61', value : 'value ss61' },
            { name : 'ssub 62', value : 'value ss62' },
            {
              name    : 'ssub 63', value   : 'value ss63',
              options : [
                {
                  name    : 'sssub 61', value   : 'value sss61',
                  options : [
                    { name : 'ssssub 61', value : 'value ssss61' },
                    { name : 'ssssub 62', value : 'value ssss62' },
                    { name : 'ssssub 63', value : 'value ssss63' },
                    { name : 'ssssub 64', value : 'value ssss64' }
                  ]
                },
                { name : 'sssub 62', value : 'value sss62' },
                { name : 'sssub 63', value : 'value sss63' },
                { name : 'sssub 64', value : 'value sss64' }
              ]
            },
            { name : 'ssub 64', value : 'value ss64' }
          ]
        },
        { name : 'name 7', value : 'value 7' },
        { name : 'name 8', value : 'value 8' },
        { name : 'name 9', value : 'value 9' },
        { name : 'name 10', value : 'value 10' }
      ],
      version       : this.$store.getters.getAppVersion,
      themeSelected : 'IDS',
      themesOptions : [
        { name : 'IDS', value : 'IDS', 'leftIcon' : 'custom-icon-palette' },
        { name : 'defense', value : 'defense', 'leftIcon' : 'custom-icon-palette' },
        { name : 'transports', value : 'transports', 'leftIcon' : 'custom-icon-palette' },
        { name : 'ATM', value : 'ATM', 'leftIcon' : 'custom-icon-palette' },
        { name : 'Wireframe', value : 'wireframe', 'leftIcon' : 'custom-icon-palette' },
        { name : 'iNM', value : 'iNM', 'leftIcon' : 'custom-icon-palette' },
        { name : 'SIGLE', value : 'SIGLE', 'leftIcon' : 'custom-icon-palette' }
      ],
      languages : [
        {
          'name'     : 'Español',
          'value'    : 'es-ES',
          'leftIcon' : 'custom-icon-es-ES'
        },
        {
          'name'     : 'Inglés',
          'value'    : 'en-GB',
          'leftIcon' : 'custom-icon-en-GB'
        }
      ]
    };
  },
  watch : {
    themeSelected : {
      immediate : true,
      /**
       * detects change in theme selected
       * @param {String} newValue New value
       * @param {String} oldValue Old Value
       */
      handler(newValue, oldValue) {
        document.body.classList.remove(`theme-${oldValue}`);
        document.body.classList.add(`theme-${newValue}`);
      }
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.options2 = this.options;
  },
  /**
   * Override
   * @override
   */
  beforeUnmount() {
  },
  methods : {
    /**
     * Model input handler
     * @param {Object} keyword event
     */
    handleComplete(keyword) {
      this.options2 = [];

      // loading: true
      this.loading = true;

      let options = this.options;
      if (keyword !== '' && options) {
        options = options.filter(e => {
          keyword = String(keyword).toLowerCase();
          const name = String(e.name).toLocaleLowerCase();
          const value = String(e.value).toLocaleLowerCase();

          return name.includes(keyword) || value.includes(keyword);
        });
      }
      setTimeout(() => {
        // loading: false
        this.loading = false;
        // refresh options filtered
        this.options2 = options;
      }, 400);
    },
    /**
     * test
     */
    test() {

      this.options = [
        { name : 'name 1', value : 'value 1' }
      ];
    },
    /**
     * Cambio datos
     * @param {Object} _event change data
     */
    handleChange() {
      const n = this.multiselection.length;
      if (n > 0) {
        this.selection = [this.multiselection[n - 1]];
      }
      else {
        this.selection = [];
      }
    }
  }
};
</script>
<style lang="scss">
@import '@/catalog/sass/app';
</style>
