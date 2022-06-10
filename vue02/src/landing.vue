<template>
  <router-link to="/welcome">
    Catálogo
  </router-link> |
  <router-link to="/storybook">
    Storybook
  </router-link>
</template>

<script>

export default {
  name : 'Landing',
  /**
   * Override
   * @override
   */
  mounted() {
    // this.$router.push('/welcome');
  }
};
</script>
<style lang="scss">
.landing {
  @include font-h2();
}
</style>

