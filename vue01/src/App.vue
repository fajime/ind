<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <dl-ui-snack class="dl-hl-snack"
                 position="absolute"
                 :text="this.$store.getters.getSnackText"
                 :type="this.$store.getters.getSnackType"
                 :timeout="this.$store.getters.getSnackTimeout"
                 :show="this.$store.getters.showSnack"
                 @closed="$store.commit('hideSnack')"
    />
    <dl-ui-icons-set />
    <dl-hl-icons-set />
  </div>
</template>

<script>
import DLUiSnack from '@indra-dl/dl-fmwk-vue-comp-kit/src/components/molecules/dl-ui-snack';

export default {
  name       : 'App',
  components : {
    'dl-ui-snack' : DLUiSnack
  },
  /**
   * override
   * @override
   */
  data() {
    return {
    };
  }
};
</script>
<style lang="scss">
@import 'sass/app.scss';
</style>
