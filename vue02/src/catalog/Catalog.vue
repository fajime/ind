<!-- eslint-disable max-len -->
<template>
  <div id="catalog"
       class="catalog"
  >
    <header class="catalog__header">
      <div class="catalog__header-left">
        <div class="catalog__header-title">
          SIGLE
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
      version   : this.$store.getters.getAppVersion,
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
