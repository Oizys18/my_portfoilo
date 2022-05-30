module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['en', 'ko'],
    localeDetection: false,
    fallbackLocales: {
      default: 'ko'
    },
    domains: [
      {
        domain: 'oizys18.vercel.app',
        defaultLocale: 'ko'
      },
      {
        domain: 'oizys18.vercel.app',
        defaultLocale: 'en'
      }
    ]
  }
}
