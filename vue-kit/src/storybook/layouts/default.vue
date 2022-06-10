<!-- eslint-disable max-len -->
<template>
  <div id="storybook"
       class="catalog"
  >
    <dl-ui-layout>
      <template #sidebar>
        <div class="storybook__menu">
          <div>
            <img alt="logo" class="storybook-menu__logo" src="~@/storybook/assets/img/logo.png" />
          </div>

          <dl-ui-scrollpanel scrollHeight="calc(100% - 136px)" class="storybook-scrollpanel__sidebar">
            <dl-storybook-menu />
          </dl-ui-scrollpanel>
        </div>
      </template>
      <template #content>
        <dl-ui-scrollpanel ref="menuPanel" scrollHeight="calc(100% - 32px)" class="storybook-scrollpanel__content">
          <router-view />
        </dl-ui-scrollpanel>
        <dl-ui-footer />
      </template>
    </dl-ui-layout>
  </div>
  <dl-comp-kit-icons-set />
  <dl-comp-storybook-icon-set />
</template>

<script>
import DlUiFooter from '@/components/molecules/dl-ui-footer';
import DlUiScrollPanel from '@/components/atoms/dl-ui-scrollpanel';
import CatalogIconsSet from '@/catalog/components/atoms/dl-comp-kit-icons-set';
import DlCompStorybookIconSet from '@/storybook/components/atoms/dl-comp-storybook-icon-set';

import DlStorybookMenu from '../components/molecules/dl-storybook-menu/';
import DlUiLayout from '../components/atoms/dl-ui-layout/';

// import DlUiIcon from '@/components/atoms/dl-ui-icon';

export default {
  name       : 'Default',
  components : {
    'dl-ui-footer'               : DlUiFooter,
    'dl-ui-scrollpanel'          : DlUiScrollPanel,
    'dl-comp-kit-icons-set'      : CatalogIconsSet,
    'dl-comp-storybook-icon-set' : DlCompStorybookIconSet,
    'dl-ui-layout'               : DlUiLayout,
    'dl-storybook-menu'          : DlStorybookMenu
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      version       : this.$store.getters.getAppVersion,
      themeSelected : 'IDS'

    };
  },
  methods : {

    /**
     * Selecciona el idioma
     *
     * @param {*} lang i18n a seleccionar
     */
    saveLanguage(lang) {
      window.localStorage.setItem('language', lang);
    },

    /**
     * Redirecciona a la versión anterior del catálogo de componentes
     */
    goToPreviousVersion() {
      this.$router.push('/');
    }
  }

};
</script>
<style lang="scss">
@import '@/catalog/sass/app';

.storybook__content {
  flex: 1;
}

.storybook__menu {
  background-color: $color-surface-01k;
  border-right: 1px solid $color-surface-05;
  height: 100%;
  width: 100%;
}

.storybook-scrollpanel__sidebar {
  padding: 16px 32px;
}

.storybook-scrollpanel__content {
  overflow-x: visible;
}

</style>
