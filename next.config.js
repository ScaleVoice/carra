/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js')
const path = require('path')

const nextConfig = {
  i18n,
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    externalDir: true,
    outputFileTracingRoot: path.join(__dirname, '../')
  },
  images: {
    domains: ['baasdevstorageblob.blob.core.windows.net']
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // disable plugins
                      removeViewBox: false
                    }
                  }
                }
              ]
            },
            title: true
          }
        }
      ]
    })

    return config
  }
}

module.exports = nextConfig
