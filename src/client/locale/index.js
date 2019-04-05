import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          'Pos.': 'Pos.',
          'Queue': 'Queue',
          'callers': 'callers',
          'Caller number': 'Caller number',
          'Duration': 'Duration',
          'Operators': 'Operators',
          'ops': 'ops',
          'reachable': 'reachable',
          'Operator': 'Operator',
          'Last Call': 'Last Call',
          'Status': 'Status',
          'Free': 'Free',
          'Busy': 'Busy',
          'Paused': 'Paused'
        }
      },
      ru: {
        translations: {
          'Pos.': 'Поз.',
          'Queue': 'Очередь',
          'callers': 'звонков',
          'Caller number': 'Номер абонента',
          'Duration': 'Время',
          'Operators': 'Операторы',
          'ops': 'всего',
          'reachable': 'доступно',
          'Operator': 'Оператор',
          'Last Call': 'Посл. звонок',
          'Status': 'Статус',
          'Free': 'Свободен',
          'Busy': 'Занят',
          'Paused': 'Пауза'
        }
      }
    },
    fallbackLng: 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
