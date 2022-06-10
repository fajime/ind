<template>
  <dl-hl-generic-dialog :title="$t('settings.title')" @close="$emit('close')">
    <div class="dl-hl-settings__item" @click="toggleLangSelection">
      <div class="dl-hl-settings__item--left">
        {{ $t('settings.lang.title') }}
      </div>
      <div class="dl-hl-settings__item--right" style="padding-left: 1rem;">
        {{ this.$i18n.locale === 'es-ES'? $t('settings.lang.spanish'): $t('settings.lang.english') }}
      </div>
    </div>
    <div class="dl-hl-settings__item">
      <div class="dl-hl-settings__item--left">
        {{ $t('settings.mission') }}
      </div>
      <div class="dl-hl-settings__item--right">
        <input type="text" style="width: 42px; display: inline-block;" v-model="missionId" />
        <dl-ui-button class="dl-hl-button--primary"
                      :class="{'dl-hl-button--secondary': $store.getters.isMissionConnected}"
                      style="width: 80px; font-size: 11px; flex: 0 0; height: 42px;"
                      @clicked="missionAction"
                      :disabled="isMissionLoading"
        >
          {{ missionButtonText }}
        </dl-ui-button>
      </div>
    </div>
    <div class="dl-hl-settings__item">
      <div class="dl-hl-settings__item--left">
        {{ $t('settings.catalog') }}
      </div>
      <div class="dl-hl-settings__item--right">
        <input type="text" style="width: 42px; display: inline-block;" v-model="catalogId" />
        <dl-ui-button class="dl-hl-button--primary"
                      style="width: 80px; font-size: 11px; flex: 0 0; height: 42px;"
                      @clicked="saveCatalogId"
                      :disabled="Number(this.catalogId) === this.$store.getters.getCatalogId"
        >
          {{ $t('settings.save') }}
        </dl-ui-button>
      </div>
    </div>
    <template slot="extra">
      <transition name="fade">
        <div class="dl-hl-settings__langContainer" v-if="showLangContainer">
          <div class="dl-hl-settings__langContainer-item"
               :class="{ 'dl-hl-settings__langContainer-item--active': this.$i18n.locale === 'en-GB'}"
               @click="langSelected('en-GB')"
          >
            {{ $t('settings.lang.english') }}
          </div>
          <div class="dl-hl-settings__langContainer-item"
               :class="{ 'dl-hl-settings__langContainer-item--active': this.$i18n.locale === 'es-ES'}"
               @click="langSelected('es-ES')"
          >
            {{ $t('settings.lang.spanish') }}
          </div>
        </div>
      </transition>
    </template>
  </dl-hl-generic-dialog>
</template>
<script>
import GenericDialog from './dl-hl-generic-dialog';
import missionsMixin from '../../../mixins/services/missions';
export default {
  name       : 'DlHlSettings',
  mixins     : [missionsMixin],
  components : {
    'dl-hl-generic-dialog' : GenericDialog
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      showLangContainer : false,
      missions          : [],
      missionSelected   : undefined,
      missionId         : 11,
      isMissionLoading  : false,
      missionButtonText : this.$store.getters.isMissionConnected ? this.$t('settings.disconnected') : this.$t('settings.conect'),
      catalogId         : 0,
      serverId          : undefined,
      userId            : `FEINDEF-user`
    };
  },
  /**
   * override
   * @override
   */
  mounted() {
    this.catalogId = this.$store.getters.getCatalogId;
  },
  methods : {
    /**
     * Show layer to select language
     *
     */
    toggleLangSelection() {
      this.showLangContainer = !this.showLangContainer;
    },
    /**
     * Set language of the app
     *
     * @param {String} value Value to set
     */
    langSelected(value) {
      this.$i18n.locale = value;
      localStorage.setItem('lang', value);
      this.toggleLangSelection();
    },
    /**
     * MissionAction
     *
     */
    missionAction() {
      this.missionButtonText = this.$t('settings.conecting');
      this.isMissionLoading = true;
      if (this.$store.getters.isMissionConnected) {
        this.disconnect().then(() => {
          this.missionButtonText = this.$t('settings.conect');
          this.$store.commit('isMissionConnected', false);
        })
          .catch(() => {
            this.missionButtonText = this.$t('settings.disconnected');
          })
          .finally(() => {
            this.isMissionLoading = false;
          });
      }
      else {
        this.loadMission()
          .then(() => {
            this.missionButtonText = this.$t('settings.disconnected');
            this.$store.commit('isMissionConnected', true);
          })
          .catch(() => {
            this.missionButtonText = this.$t('settings.conect');
          })
          .finally(() => {
            this.isMissionLoading = false;
          });
      }
    },
    /**
     * load mission
     * @return {Promise} response
     */
    loadMission() {
      return this.getMissionList()
        .then(missions => {
          this.missions = missions;
          // eslint-disable-next-line eqeqeq
          this.missionSelected = this.missions.find(mission => mission.id == this.missionId);
          this.serverId = this.missionSelected.serverId;
          // eslint-disable-next-line no-console
          console.log(`missionSelected: ${JSON.stringify(this.missionSelected, null, 4)}`);
          if (this.missionSelected.instances.length > 0) {
            // eslint-disable-next-line no-console
            console.log(`serverId: ${this.serverId}`);
            // eslint-disable-next-line no-console
            console.log(`connectionId: ${this.missionSelected.connectionId}`);
            return this.joinMission(this.missionSelected.serverId, this.userId, this.missionSelected.name)
              .then(() => this.getMissionStatus(this.serverId)
                .then(() => this.getMissionEntities(this.serverId)
                  // eslint-disable-next-line max-nested-callbacks
                  .then(() => this.updateEntityEvents(this.serverId).then(() => {
                    if (this.missionSelected.status === 'MISSIONLOADED') {
                      // eslint-disable-next-line no-console
                      console.log(`Mission en estado: "MISSIONLOADED" -> se lanza el START`);
                      this.setMissionStatus(this.serverId, 'START');
                    }
                    // eslint-disable-next-line no-console
                    console.log(`CONECTADO CON EXITO A DT - Join mission!!!`);
                  }))));
          }
          else {
            return this.createMission()
              .then(data => {
                this.serverId = data.serverId;
                // eslint-disable-next-line no-console
                console.log(`serverId: ${this.serverId}`);
                // eslint-disable-next-line no-console
                console.log(`connectionId: ${data.connectionId}`);
                return this.setMission(this.serverId, this.missionSelected.id)
                  .then(() => this.joinMission(this.serverId, `FEINDEF-${Math.random()}`, this.missionSelected.name)
                    .then(() => this.getMissionStatus(this.serverId)
                    // eslint-disable-next-line max-nested-callbacks
                      .then(status => {
                        if (['INITIALIZED', 'MISSIONLOADED'].includes(status)) {
                          return this.setMissionStatus(this.serverId, 'START')
                          // eslint-disable-next-line max-nested-callbacks
                            .then(() => {
                            // eslint-disable-next-line no-console
                              console.log(`CONECTADO CON EXITO A DT!!! - Create mission!!!`);
                            })
                          // eslint-disable-next-line max-nested-callbacks
                            .catch(() =>
                              this.$store.commit('showSnack', { text : this.$t('demoControl.error.pause'), type : 'error' }));
                        }
                        else if (['PAUSED'].includes(status)) {
                          this.$store.commit('showSnack', { text : this.$i18n.t('error.type.missionPaused'), type : 'warning' });
                        }
                        return undefined;
                      })));
              })
              .catch(error => {
                const text = this.$i18n.t('error.type.connect');
                this.$store.commit('showSnack', { text, type : 'error' });
                throw error;
              });
          }
        })
        .catch(error => {
          const text = this.$i18n.t('error.type.missions');
          this.$store.commit('showSnack', { text, type : 'error' });
          throw error;
        });
    },
    /**
     * disconnect
     * @return {Promise} response
     *
     */
    disconnect() {
      return this.setMissionStatus(this.serverId, 'STOP')
        .then(() => this.exitMission(this.serverId, this.userId)
          .then(() => {
            // eslint-disable-next-line no-console
            console.log(`DESCONECTADO CON EXITO DE DT!!!`);
          }))
        .catch(error => {
          const text = this.$i18n.t('error.disconnect');
          this.$store.commit('showSnack', { text, type : 'error' });
          throw error;
        });
    },
    /**
     * Save Catalog id
     *
     */
    saveCatalogId() {
      this.$store.commit('setCatalogId', Number(this.catalogId) );
    }
  }
};
</script>
<style lang="scss">
.dl-hl-settings {
  &__item {
    flex: 1 1 auto;
    display: flex;
    text-align: left;
    width: 100%;
    min-height: 40px;
    align-items: center;

    &:hover {
      background-color: $color-2;
      cursor: pointer;
    }

    &--left {
      color: $color-6;
      font-size: 14px;
      padding-left: 16px;
      width: 100px;
    }

    &--right {
      color: $color-8;
      font-size: 14px;
      flex: 1 1 auto;
      display: flex;
      align-items: center;
    }
  }

  &__langContainer {
    display: flex;
    position: absolute;
    top: 80px;
    right: 0;
    border-radius: 4px;
    border: 1px solid $color-22;
    background-color: $color-2;
    box-shadow: 0 1px 5px 0 rgba(23, 24, 25, 0.6);
    flex-direction: column;
    align-items: center;
    width: 123px;
    padding: 1rem 0 !important;
    z-index: 9999;
    text-align: left;
    color: $color-6;

    &-item {
      flex: 1 1 auto;
      display: flex;
      padding: 0.5rem 0 0.5rem 16px;
      text-align: left;
      font-size: 14px;
      width: 100%;
      transition: all 0.2s linear;
      border-left: 2px solid transparent;

      &:not(.dl-hl-settings__langContainer-item--active):hover {
        border-left: 2px solid $color-8;
        background-color: $color-22;
        cursor: pointer;
      }

      &--active {
        border-left: 2px solid $color-9;
        background-color: $color-1;
      }
    }
  }
}
</style>
