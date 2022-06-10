<template>
  <div class="login-container">
    <div class="login">
      <div class="login__title">
        <span>{{ $t('appName') }}</span>
      </div>
      <div class="login__subtitle">
        <span>{{ $t('appNameSimple') }}</span>
      </div>

      <div class="login__form-group">
        <div
          class="login__form-group-control"
          :class="{'login__form-group-control--error':emailError}"
        >
          <label class="login__form-group-label">{{ $t('login.user') }}</label>
          <input
            type="text"
            name="userName"
            v-model="emailValue"
            @input="verifyEmail()"
            @keyup="checkEnterKeyPressed"
            :disabled="disableInputs"
          />
          <span class="login__form-group-validation" v-if="emailError">{{ emailErrorText }}</span>
        </div>

        <div class="login__form-group-control" :class="{'login__form-group-control--error':passError}">
          <label class="login__form-group-label">{{ $t('login.pass') }}</label>
          <input
            type="password"
            name="userPassword"
            v-model="passValue"
            @input="verifyPass()"
            @keyup="checkEnterKeyPressed"
            :disabled="disableInputs"
          />
          <span class="login__form-group-validation" v-if="passError">{{ $t('login.error.pass.required') }}</span>
        </div>

        <div class="layout-inline">
          <dl-ui-checkbox ref="rememberMeCheck" class="dl-hl-checkbox" v-model="rememberMe" :disabled="disableInputs" />
          <label ref="rememberMeLabel" class="login__form-group-label">{{ $t('login.remember') }}</label>
        </div>

        <div class="login__form-group-control"
             style="margin-top: 2rem; margin-bottom: 2rem; justify-content: flex-end; flex-direction: row;"
        />

        <div class="login__form-group-action">
          <dl-ui-button
            @clicked="doLogin"
            class="dl-hl-button--primary dl-hl-button--primary--large"
            :disabled="disableInputs"
          >
            <dl-ui-icon id="loading" class="login__loading-icon" v-if="loading" />
            {{ $t('login.action') }}
          </dl-ui-button>
        </div>

        <div class="external__validation" v-if="loginCallError">
          <dl-ui-icon id="warning" />
          <span>{{ loginCallError }}.</span>
        </div>
      </div>
    </div>
    <div class="login-background" />
    <dl-ui-footer class="dl-hl-footer">
      <div class="dl-hl-footer__container">
        {{ $t('disclaimer', [$store.getters.getAppVersion]) }}
      </div>
    </dl-ui-footer>
  </div>
</template>

<script>
import DlUiFooter from '@indra-dl/dl-fmwk-vue-comp-kit/src/components/molecules/dl-ui-footer';
import MixinServiceLogin from '../mixins/services/login';
import MixinServiceMissions from '../mixins/services/missions';

export default {
  name       : 'Login',
  mixins     : [MixinServiceLogin, MixinServiceMissions],
  components : {
    'dl-ui-footer' : DlUiFooter
  },
  /**
   * Override
   * @override
   */
  data() {
    return {
      firstVerifDone : false,
      loading        : false,
      disableInputs  : false,
      emailValue     : '',
      emailError     : false,
      emailErrorText : undefined,
      passValue      : '',
      passError      : false,
      rememberMe     : true,
      loginCallError : undefined
    };
  },
  /**
   * Override
   * @override
   */
  mounted() {
    this.$refs.rememberMeLabel.setAttribute('for', this.$refs.rememberMeCheck.randomId);
    const rememberUser = window.localStorage.getItem('remember');
    if (rememberUser) {
      this.emailValue = rememberUser;
    }
  },
  methods : {
    /**
     * Do login
     */
    doLogin() {
      this.loginCallError = undefined;
      if (this.checkFields()) {
        this.disableInputs = true;
        this.loading = true;
        this.login(this.emailValue, this.passValue)
          .then(() => {
            if (this.rememberMe) {
              window.localStorage.setItem('remember', this.emailValue);
            }
            else {
              window.localStorage.removeItem('remember');
            }
            this.$router.push('main/viewer');
          })
          .catch(error => {
            const text = this.$i18n.t('login.error.notCorrect');
            this.$store.commit('showSnack', { text, type : 'error' });
            throw error;
          })
          .finally(() => {
            this.loading = false;
            this.disableInputs = false;
          });
      }
    },
    /**
     * Check if enter key is pressed
     * @param {Object} e event
     */
    checkEnterKeyPressed(e) {
      if (this.emailValue !== '' && this.passValue !== '' && e.keyCode === 13) {
        this.login();
      }
    },
    /**
     * Check form fields to avoid bad data login
     * @returns {Boolean} Indicates if all fields are correct
     */
    checkFields() {
      this.firstVerifDone = true;
      const returnValue = this.verifyEmail() && this.verifyPass();
      return returnValue;
    },
    /**
     * Check email field
     * @returns {Boolean} Indicates if all fields are correct
     */
    verifyEmail() {
      if (!this.firstVerifDone) {
        return true;
      }
      if (this.emailValue.trim() === '') {
        this.emailErrorText = this.$t('login.error.user.required');
        this.emailError = true;
        return false;
      }
      this.emailError = false;
      this.emailErrorText = undefined;
      return true;
    },
    /**
     * Check pass field
     * @returns {Boolean} Indicates if all fields are correct
     */
    verifyPass() {
      if (!this.firstVerifDone) {
        return true;
      }
      const returnValue = (this.passValue !== '');
      this.passError = !returnValue;
      return returnValue;
    }
  }
};
</script>

<style lang="scss">
.login-container {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  overflow-y: auto;
}

.login-background {
  flex: 1 1 auto;
  background: url('~@/assets/img/world.png') no-repeat;
  background-size: cover;
  background-position: center;
}

.login {
  position: absolute;
  top: 30%;
  right: 20%;
  padding: 32px;
  background-color: $color-2;
  border-radius: 8px;
  border: 1px solid $color-22;
  width: 444px;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  box-shadow: 1px 1px 10px 5px rgb(0 0 0 / 17%), inset 0 -1px 0 0 rgb(255 255 255 / 8%);

  &__title {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      flex: 1 1 auto;
      color: $color-0;
      font-size: 34pt;
      line-height: normal;
      font-family: $font-header;
    }
  }

  &__subtitle {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      flex: 1 1 auto;
      color: $color-3;
      font-size: 17pt;
      line-height: normal;
      font-family: $font-alt;
    }
  }

  &__loading-icon {
    width: 19px !important;
    height: 19px !important;
    stroke: $color-0;
    margin-left: -25px !important;
  }

  // Form group
  &__form-group {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-direction: column;

    // label
    &-label {
      display: flex;
      flex: 1 1 auto;
      color: $color-6;
      font-size: 14px;
      margin-top: 10px;
    }

    // Control (surrounding inputs)
    &-control {
      flex: 1 1 auto;
      display: flex;
      color: $color-0;
      font-size: 14px;
      flex-direction: column;
      position: relative;

      // Form control: Input
      > input {
        width: 100%;
      }

      // State: Error
      &--error {
        > input {
          border: 1px solid $color-10;
        }
      }
    }

    // Links
    &-link {
      color: $color-4;
      font-size: 14px;
      text-decoration: none;
      flex: 1 1 auto;
      display: flex;
      justify-content: flex-end;

      &:hover {
        text-decoration: underline;
      }
    }
    // Form validation
    &-validation {
      font-size: 12px;
      color: $color-10;
      position: absolute;
      bottom: -8px;
      left: 9px;
    }

    // Form action
    &-action {
      display: flex;
      justify-content: flex-end;
    }

    // Layout: Ad-hock
    .layout-inline {
      margin-top: 2rem;
      display: flex;
      align-items: center;

      .dl-hl-checkbox + label {
        padding-left: 12px;
        margin: revert;
        cursor: pointer;
      }

      a {
        text-align: right;
      }
    }
  }
}
</style>
