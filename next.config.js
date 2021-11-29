const path = require('path')
module.exports = {
  reactStringMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true
  }
}
