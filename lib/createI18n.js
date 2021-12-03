import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import languages from '../public/locales'

const { en, ko } = languages
const createI18n = ({ locale }) => {
  i18n.use(initReactI18next).init({
    resources: { en, ko },
    lng: locale,
    fallbackLng: ko,
    interpolation: { escapeValue: false }
  })
  return i18n
}

export default createI18n
