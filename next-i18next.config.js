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
        domain: 'oizys18.netlify.com',
        defaultLocale: 'ko'
      },
      {
        domain: 'oizys18.netlify.com',
        defaultLocale: 'en'
      }
    ]
  }
}
