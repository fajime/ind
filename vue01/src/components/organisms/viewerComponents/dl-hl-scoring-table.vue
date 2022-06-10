<template>
  <dl-hl-grid-item :title="title"
                   id="dh-hl-scoring-table"
                   icon="podium"
                   :layoutConfig="layoutConfig"
                   @action="gridItemAction($event)"
  >
    <div class="dh-hl-scoring-table" :class="{'dh-hl-scoring-table--small': isSmallSize}">
      <div class="dh-hl-scoring-table__wrapper">
        <div class="dh-hl-scoring-table__table">
          <div class="dh-hl-scoring-table__row">
            <div class="dh-hl-scoring-table__head dh-hl-scoring-table__head--not-visible"
                 :class="{'dh-hl-scoring-table__head--not-visible-xs': isSmallSize}"
            />
            <div class="dh-hl-scoring-table__head" v-for="team in $store.getters.getTeams" :key="team.id">
              <div class="dh-hl-scoring-table__head-team">
                <img :src="getFlag(team.teamInfo.teamCountry)" />
                {{ team.name }}
              </div>
            </div>
          </div>
          <div class="dh-hl-scoring-table__row" v-for="challenge in $store.getters.getTeamScore" :key="challenge.id">
            <div class="dh-hl-scoring-table__cell dh-hl-scoring-table__cell--challenge"
                 :class="{'dh-hl-scoring-table__cell--challenge-xs': isSmallSize}"
            >
              {{ challenge.title }}
            </div>
            <div class="dh-hl-scoring-table__cell" v-for="team in $store.getters.getTeams" :key="team.id">
              <div class="dh-hl-scoring-table__score">
                <div class="dh-hl-scoring-table__score-trophy"
                     :class="{'dh-hl-scoring-table__score-trophy-xs': isSmallSize}"
                >
                  <dl-ui-icon :id="getChallengeInfoForTeam(challenge.id, team.id).medal" />
                </div>
                <div class="dh-hl-scoring-table__score-points"
                     :class="{'dh-hl-scoring-table__score-points-xs': isSmallSize}"
                >
                  {{ getChallengeInfoForTeam(challenge.id, team.id).score }} pts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dl-hl-grid-item>
</template>
<script>
import GridItemMixin from '../../../mixins/gridItem';
import ResponsiveComponentMixin from '../../../mixins/responsiveComponent';
export default {
  name     : 'DlHlScoringTable',
  mixins   : [GridItemMixin, ResponsiveComponentMixin],
  computed : {
    /**
     * title of compo
     * @return {String} title of this component
     */
    title() {
      return this.$t('scoring.title');
    }
  },
  methods : {
    /**
     * get info from challenge and team
     * @param {Number} challengeId challenge id
     * @param {Number} teamId team id
     * @returns {Object} Info
     */
    getChallengeInfoForTeam(challengeId, teamId) {
      const challengeData = this.$store.getters.getTeamScore.find(challenge => (challenge.id === challengeId));
      const teamData = challengeData.teamsScore.find(challengeTeam => ( challengeTeam.id === teamId));
      return {
        medal : teamData.medal,
        score : teamData.score
      };
    },
    /**
     * get flag image of country
     * @param {String} country Country
     * @returns {String} path of img
     */
    getFlag(country) {
      const imagesContext = require.context('../../../assets/flags/', false, /\.png$/);
      return imagesContext(`./${country.toLowerCase()}.png`);
    }
  }
};
</script>

<style lang="scss">
.dh-hl-scoring-table {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  width: 100%;
  padding: 10px;

  &--small {
    font-size: 75%;
  }

  &__wrapper {
    flex: 0 0 auto;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  &__table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    position: relative;
    overflow: hidden;
    table-layout: fixed;
  }

  &__head {
    display: table-cell;
    font-weight: bold;
    padding: 0.5rem;
    border-bottom: #5bd0d5 2px solid;
    min-width: 70px;
    height: 19px;
    color: #b9c4cc;
    text-align: center;
    position: relative;

    &-team {
      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        display: inline-block;
        height: 14px;
        width: 14px;
        margin-right: 0.6rem;
      }
    }

    &--not-visible {
      opacity: 0;
      border: none;
      width: 180px;

      &-xs {
        width: 140px;
      }
    }
  }

  &__row {
    display: table-row;
    border-bottom: #67859e 1px solid;
    position: relative;
  }

  &__cell {
    display: table-cell;
    padding: 0.5rem;

    &--challenge {
      display: table-cell;
      height: 30px;
      padding: 4px 6px;
      border-radius: 2px;
      background-color: #5bd1d523;
      border-bottom: solid 1px #5bd0d5;
      color: #fff;
      width: 240px;

      &-xs {
        height: 24px;
      }
    }
  }

  &__score {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &-trophy {
      display: flex;
      flex: 1 1 auto;

      svg {
        height: 20px;
        width: 20px;
      }

      &-xs {
        height: 14px;
        width: 14px;
      }
    }

    &-points {
      display: flex;
      flex: 1 1 auto;
      margin-top: 6px;
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      color: #fff;

      &-xs {
        margin-top: 4px;
        font-size: 11px;
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-move {
  transition: transform 0.4s;
}

@keyframes newEventAnimation {
  from {
    border-left: 2px solid $color-9;
    background-color: $color-8;
  }

  to {
    border-left: 2px solid transparent;
    background-color: transparent;
  }
}
</style>
