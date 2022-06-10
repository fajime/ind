<template>
  <header class="dl-hl-header">
    <div class="dl-hl-header__title">
      <div class="dl-hl-header__title-box">
        <span class="dl-hl-header__title-text">{{ $t('appName') }} </span>
      </div>
      <span class="dl-hl-header__title-text dl-hl-header__title-text--secondary">{{ $t('appNameSimple') }} </span>
    </div>
    <div class="dl-hl-header__center">
      <div class="dl-hl-header__mission-time">
        <span>{{ time }}</span>
      </div>
      <div class="dl-hl-header__mission-time-separator" />
      <div class="dl-hl-header__mission-date">
        <span>{{ date }}</span>
      </div>
    </div>
    <nav class="dl-hl-header__usernav">
      <div class="dl-hl-header__icon-box" @click.stop="toggleSettings">
        <dl-ui-icon class="dl-hl-header__icon" id="settings" />
      </div>
    </nav>
    <transition name="fade">
      <dl-hl-settings
        class="dl-hl-header__settings"
        v-if="$store.getters.showSettings"
        @close="toggleSettings"
        v-click-outside="closeAllConfigs"
      />
    </transition>
  </header>
</template>
<script>
import DhHlSettings from './dialogs/dl-hl-settings';
export default {
  name       : 'DlHlHeader',
  components : {
    'dl-hl-settings' : DhHlSettings
  },
  /**
   * override
   * @override
   */
  data() {
    return {
      time : '',
      date : ''
    };
  },
  /**
   * override
   * @override
   */
  created() {
    setInterval(this.updateClock, 1000);
    this.updateClock();
  },
  methods : {
    /** update clock */
    updateClock() {
      const today = new Date();
      /*
       *  this.time = `${(`0${today.getHours()}`).slice(-2)}:
       * ${(`0${today.getMinutes()}`).slice(-2)}:${(`0${today.getSeconds()}`).slice(-2)}`;
       */
      this.time = `${(`0${today.getHours()}`).slice(-2)}:${(`0${today.getMinutes()}`).slice(-2)}`;
      const options = { weekday : 'long', year : 'numeric', month : 'numeric', day : 'numeric' };
      this.date = today.toLocaleDateString(this.$i18n.locale, options);
    },

    /** toggle settings container */
    toggleSettings() {
      this.$store.commit('showSettings', !this.$store.getters.showSettings);
    },
    /** close all sttings container */
    closeAllConfigs() {
      this.$store.commit('showSettings', false);
    }
  }
};
</script>
<style lang="scss">
.dl-hl-header {
  height: 4rem;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  z-index: 2;
  box-shadow: $box-shadow-down;
  border-bottom: 1px solid $color-1;
  user-select: none;
  background-color: $color-11;

  & > * {
    padding: 0 2rem;
  }

  &__title {
    font-size: 2.4rem;
    font-family: $font-header;
    white-space: nowrap;
    display: flex;
    align-items: baseline;

    &-box {
      border-right: 1px solid $color-14;
      padding-right: 0.8rem;
      margin-right: 0.8rem;
    }
  }

  &__title-text {
    color: $color-6;

    &--secondary {
      font-size: 1.8rem;
      font-family: $font-default;
    }

    &--green {
      color: $color-1;
    }

    &--greenlite {
      color: $color-4;
      font-size: 1.8rem;
      font-family: $font-alt;

      &::before {
        content: '';
        border-left: 1px solid $color-6;
        margin-left: 1rem;
        padding-left: 1rem;
      }
    }
  }

  &__center {
    display: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__mission {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    &-icon {
      fill: $color-0;
      width: 21px;
      height: 21px;
      margin-right: 0.8rem;
    }

    &-name {
      font-size: 21px;
      margin-right: 2.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-status {
      border-radius: 100px;
      background-color: $color-1;
      color: $color-8;
      padding: 1px 10px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      padding-top: 1px;
      text-transform: capitalize;

      &--LOADED {
        border: 2px solid $color-5;
      }

      &--RUNNING {
        border: 2px solid $color-12;
      }

      &--PAUSED {
        border: 2px solid $color-19;
      }
    }

    &-time {
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-time-separator {
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid $color-0;
      height: 18px;
      margin: 0 0.5rem;
    }

    &-date {
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__usernav {
    align-self: stretch;
    display: flex;
    align-items: center;

    & > * {
      margin: 0 1rem;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }

  &__icon-box {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: $color-26;
    }
  }

  &__icon {
    height: 2.25rem;
    width: 2.25rem;
    fill: $color-0;
    transition: all 0.2s;
    flex: 1 1 auto;
  }

  &__notification {
    font-size: 0.8rem;
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 50%;
    background-color: $color-2;
    color: $color-1;
    position: absolute;
    bottom: 1.2rem;
    right: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &--new {
      animation: shake 0.5s;
      animation-iteration-count: infinite;
    }
  }

  &__nots {
    top: 65px;
    right: 3rem;
    width: 320px;
  }

  &__settings {
    top: 65px;
    right: 2rem;
    width: 270px;
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }

  20% {
    transform: translate(-3px, 0) rotate(1deg);
  }

  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }

  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
