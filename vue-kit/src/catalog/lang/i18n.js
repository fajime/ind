import enGB from './en-GB';
import esES from './es-ES';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale                : window.navigator.language || 'es-ES',
  silentTranslationWarn : true,
  fallbackLocale        : 'en-GB',
  messages              : {
    'es-ES' : esES,
    'en-GB' : enGB
  }
});

export default i18n;

