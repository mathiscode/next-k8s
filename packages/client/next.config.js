/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  sassOptions: {
    additionalData: `@import "styles/_variables.scss";`
  },

  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300
    return config
  },

  // async rewrites () {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://skaffold.local/:path*'
  //     }
  //   ]
  // }
}

module.exports = nextConfig
