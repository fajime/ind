<template>
  <div class="dl-hl-viewer-toolbar">
    <div class="dl-hl-viewer-toolbar__title">
      <dl-ui-icon class="dl-hl-viewer-toolbar__icon" id="layout" />
      <span>{{ $t('viewerToolbar.teams') }}</span>
    </div>
    <div class="dl-hl-viewer-toolbar__teams">
      <transition-group name="list-complete" tag="ul">
        <li class="dl-hl-viewer-toolbar__team" v-for="team in $store.getters.getTeamRanking" :key="team.name">
          <div class="dl-hl-viewer-toolbar__team-title">
            <img :src="getFlag(team.teamInfo.teamCountry)" class="dl-hl-viewer-toolbar__team-flag" />
            {{ team.name }}
            <div class="dl-hl-viewer-toolbar__team-score">
              {{ team.score }} {{ $t('viewerToolbar.points') }}
            </div>
          </div>
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  name    : 'DlHlViewerToolbar',
  methods : {
    /**
     * get flag image of country
     * @param {String} country Country
     * @returns {String} path of img
     */
    getFlag(country) {
      const imagesContext = require.context('../../assets/flags/', false, /\.png$/);
      return imagesContext(`./${country.toLowerCase()}.png`);
    }
  }
};
</script>
<style lang="scss">

.dl-hl-viewer-toolbar {
  box-shadow: $box-shadow-down;
  background-color: $color-26;
  border-bottom: 1px solid $color-25;
  user-select: none;
  display: flex;
  height: 50px;

  &__title {
    margin: 0 1rem 0 2rem;
    display: flex;
    align-items: center;
    flex: 0 0 90px;
  }

  &__icon {
    height: 2rem;
    width: 2rem;
    fill: $color-6;
    margin-right: 0.5rem;
  }

  &__teams {
    flex: 1 1 auto;
    display: flex;
    overflow: auto;
    width: calc(100vw - 160px);

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: nowrap;
    }
  }

  &__team {
    float: left;
    flex: 0 0 auto;
    margin: 0 1rem;
    min-width: 145px;
    background-color: $color-2;
    border-left: 2px solid #4ece3d;
    display: flex;
    height: 30px;
    align-items: center;
    outline: 0;
    padding: 0 1rem;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    justify-content: space-between;
    transition: all 1s ease;

    &-title {
      display: flex;
      align-items: baseline;
      justify-content: center;
    }

    &-flag {
      display: inline-block;
      height: 14px;
      width: 14px;
      margin-right: 0.6rem;
    }

    &-score {
      margin-left: 0.6rem;
      display: inline-block;
      font-size: 10px;
    }
  }
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
