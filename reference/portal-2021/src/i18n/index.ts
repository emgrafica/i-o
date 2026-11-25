import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'i18n/en';
import de from 'i18n/generated/de';
import es from 'i18n/generated/es';
import fr from 'i18n/generated/fr';
import hu from 'i18n/generated/hu';
import it from 'i18n/generated/it';
import ja from 'i18n/generated/ja';
import ko from 'i18n/generated/ko';
import pl from 'i18n/generated/pl';
import pt from 'i18n/generated/pt';
import ru from 'i18n/generated/ru';
import zh from 'i18n/generated/zh-Hans';

const resources = {
  de,
  en,
  es,
  fr,
  hu,
  it,
  ja,
  ko,
  pl,
  pt,
  ru,
  'zh-Hans': zh,
};

/**
 * Callback to invoke when an i18n key is rendered but has no
 * value.
 */
const handleMissingKey = (lngs: string[], ns: string, key: string): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(
      `i18n: Missing value for ns: ${ns}, key: ${key}, lng: ${lngs}`,
    );
  }
};

/**
 * LocaleValue - Components of date and time formats
 * https://tc39.es/ecma402/#datetimeformat-objects
 */

type TimeZoneOptions = { [timeZone: string]: string };
type LocaleValue = 'narrow' | 'short' | 'long' | '2-digit' | 'numeric';
type LocaleOptions = { [property: string]: LocaleValue };

const timeZoneOptions: TimeZoneOptions = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};

const localeDateOptions: LocaleOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  ...timeZoneOptions,
};

const localeTimeOptions: LocaleOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  ...timeZoneOptions,
};

const localeDateTimeOptions: LocaleOptions = {
  ...localeDateOptions,
  ...localeTimeOptions,
};

/**
 * format - use this format function for all format challenges.
 * @param value the value of the raw data
 * @param format the format template that is supported by i18next
 * @param lng the ISO locale keyword
 *
 * Locale - Current {Date} is matched to support three types of predefined
 * locale transformation.
 * Todo -This could be swapped with a solution that would allow to pass in
 * user-defined formatter template.
 *
 */

const format = (
  value: any,
  format: string | undefined,
  lng: string | undefined,
) => {
  if (value instanceof Date) {
    if (format === 'DATE') {
      return value.toLocaleDateString(lng, localeDateOptions);
    }
    if (format === 'TIME') {
      return value.toLocaleTimeString(lng, localeTimeOptions);
    }
    return value.toLocaleString(lng, localeDateTimeOptions);
  }
  return value;
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  saveMissing: true,
  missingKeyHandler: handleMissingKey,
  interpolation: {
    escapeValue: false,
    format,
  },
});

export default i18n;
