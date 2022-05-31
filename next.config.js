const path = require('path')
const { i18n } = require('./next-i18next.config')
// const withPlugins = require('next-compose-plugins')
module.exports = {
  reactStringMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  experimental: {
    // ssr and displayName are configured by default
    styledComponents: true
  },
  i18n,
  async headers() {
    return [
      {
        source: '/projects/video',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ]
      },
      {
        source: '/en/projects/video',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ]
      }
    ]
  }
}
