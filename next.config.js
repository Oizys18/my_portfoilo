const path = require('path')
const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStringMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true
  },
  i18n
}
