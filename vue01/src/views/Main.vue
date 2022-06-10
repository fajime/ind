<template>
  <div class="app_wrap">
    <dl-hl-header />
    <div class="content">
      <dl-hl-menubar />
      <main class="router_view">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </main>
    </div>
    <dl-ui-footer class="dl-hl-footer">
      <div class="dl-hl-footer__container">
        {{ $t('disclaimer', [$store.getters.getAppVersion]) }}
      </div>
    </dl-ui-footer>
  </div>
</template>

<script>
import DlHlHeader from '@/components/molecules/dl-hl-header';
import DlHlMenuBar from '@/components/molecules/dl-hl-menubar';
import DlUiFooter from '@indra-dl/dl-fmwk-vue-comp-kit/src/components/molecules/dl-ui-footer';

export default {
  name       : 'MainView',
  components : {
    'dl-hl-header'  : DlHlHeader,
    'dl-ui-footer'  : DlUiFooter,
    'dl-hl-menubar' : DlHlMenuBar
  }
};

</script>
