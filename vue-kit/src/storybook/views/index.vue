<template>
  <div ref="root" class="dl-ui-storybook-app">
    <transition name="dl-ui-transition-fade">
      <dl-comp-storybook-landing v-if="info" :info="info" />
    </transition>
  </div>
</template>
<script>
import DlCompStorybookLanding from '../components/molecules/dl-comp-storybook-landing/';

export default {
  components : {
    DlCompStorybookLanding
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      info : null
    };
  },
  /**
   * Override
   * @override
   */
  watch : {
    /**
   * Override
   * @override
   */
    '$route.params.id'() {
      this.loadContent();
    },   /**
   * Override
   * @override
   */
    '$route.params.component'() {
      this.loadContent();
    }
  },
  /**
   * Override
   * @override
   */
  created() {
    this.loadContent();
  },
  methods : {
    /**
   * Override
   * @override
   */
    loadContent() {
      const page = this.$route.params.id;
      let component = '';
      let folder = '';
      if (this.$route.params.component) {
        component = this.$route.params.component;
        folder = '/components';
      };

      this.info = null;
      setTimeout(() => {
        try {
          if (this.$refs.root) {
            this.$refs.root.parentNode.scrollTo({ top : 0, behavior : 'smooth' });
          }
          // eslint-disable-next-line global-require
          this.info = require(`../../assets/storybook/data${folder}/${page}.json`);
          if (component) {
            const title = `${ (component.split('-').map(e =>
              e[0].toUpperCase() + e.slice(1)
            ))
              .join(' ')}`;

            this.info.header.title = title;
          }
        }
        catch {
          this.info = null;
        }
      }, 500);

    }
  }
};
</script>
<style lang="scss" scoped>
.dl-ui-storybook-app {
  height: 100vh;
}
</style>
