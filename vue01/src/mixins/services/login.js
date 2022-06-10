import LoginService from '../../api/services/login';
import TokenData from '../../models/oauth/Tokendata';

/**
 * Mixin for the management of services related to login
 */
export default {
  methods : {
    /**
     * Do login
     *
     * @param {String} email user email
     * @param {String} pass user pass
     * @return {Promise} response Json
     */
    login(email, pass) {
      const basePath = this.apiHostCyber;
      const locale = this.$i18n.locale;

      return LoginService.login(basePath, email, pass, locale)
        .then(response => {
          if (response.code === 412 || (response.status && response.status.code === 412)) {
            throw new Error('412');
          }
          const tokenData = new TokenData(response.data.token, response.data.expireDate, response.data.questionSet);
          this.$store.commit('setTokenData', tokenData );
          document.cookie = `token=${response.data.token};${response.data.expireDate};path=/;expires=${tokenData.expireDate}`;
        })
        .catch(error => {
          this.$store.commit('showSnack', { text : this.$t('login.error.notCorrect'), type : 'error' });
          throw error;
        });
    }
  }
};
