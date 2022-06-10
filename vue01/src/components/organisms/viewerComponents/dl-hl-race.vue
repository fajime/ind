<template>
  <dl-hl-grid-item :title="title"
                   id="dl-hl-race"
                   icon="podium"
                   :layoutConfig="layoutConfig"
                   @action="gridItemAction($event)"
  >
    <div class="dl-hl-race">
      <DlHlBarChartRace ref="chart" />
    </div>
  </dl-hl-grid-item>
</template>
<script>
import GridItemMixin from '../../../mixins/gridItem';
import ResponsiveComponentMixin from '../../../mixins/responsiveComponent';
import DlHlBarChartRace from '../dl-hl-bar-chart-race.vue';
export default {
  name       : 'DlHlRace',
  mixins     : [GridItemMixin, ResponsiveComponentMixin],
  components : {
    DlHlBarChartRace
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
    };
  },
  computed : {
    /**
     * title of compo
     * @return {String} title of this component
     */
    title() {
      return this.$t('race.title');
    }
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.callbackResize = size => {
      this.$refs.chart.updateSize(size);
    };
  }
};
</script>

<style lang="scss">
  .dl-hl-race {
    display: flex;
    flex: 1 1 auto;
    font-size: 30px;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
