<!-- eslint-disable max-len -->
<template>
  <div id="catalog"
       class="catalog"
  >
    <header class="catalog__header">
      <div class="catalog__header-left">
        <div class="catalog__header-title">
          Digital Labs
        </div>
        <div class="catalog__header-subtitle">
          {{ $t('subtitle') }}
        </div>
      </div>
      <div class="catalog__header-right">
        <dl-ui-select v-model="$i18n.locale"
                      class="dl-ui-select catalog__header-right-lang"
                      :options="languages"
                      @update:modelValue="saveLanguage"
        />
        <dl-ui-select v-model="themeSelected"
                      style="width: 150px;"
                      class="dl-ui-select catalog__header-right-theme"
                      :options="themesOptions"
        />
        <router-link to="/howTo"
                     class="catalog__header-help"
        >
          <dl-ui-icon id="help"
                      class="dl-ui-icon"
          />
        </router-link>
        <div class="catalog__header-version">
          v.{{ version }}
        </div>
      </div>
    </header>
    <div class="catalog__main">
      <router-view />
    </div>
    <div class="app_footer">
      <dl-ui-footer />
    </div>
    <dl-comp-kit-icons-set />
  </div>
</template>

<script>
import DlUiFooter from '../components/molecules/dl-ui-footer';
import DlUiSelect from '../components/atoms/dl-ui-select';
import CatalogIconsSet from './components/atoms/dl-comp-kit-icons-set';
import DlUiIcon from '../components/atoms/dl-ui-icon';

export default {
  name       : 'Catalog',
  components : {
    'dl-ui-footer'          : DlUiFooter,
    'dl-ui-select'          : DlUiSelect,
    'dl-comp-kit-icons-set' : CatalogIconsSet,
    'dl-ui-icon'            : DlUiIcon
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
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
  },
  /**
   * Override
   * @override
   */
  beforeUnmount() {
  },
  methods : {
    /**
     * Selecciona el idioma
     *
     * @param {*} lang i18n a seleccionar
     */
    saveLanguage(lang) {
      this.$store.commit('changeLang', lang);
      window.localStorage.setItem('language', lang);
    }
  }
};
</script>
<style lang="scss">
  @import '@/catalog/sass/app';
</style>
