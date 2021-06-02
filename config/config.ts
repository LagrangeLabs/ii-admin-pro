// https://umijs.org/config/
import { defineConfig } from 'umi'
import proxy from './proxy'
import routes from './routes'
import theme from './theme'
import SentryWebpackPlugin from '@sentry/webpack-plugin'

const { REACT_APP_ENV } = process.env

export default defineConfig({
  hash: true,
  antd: {},
  define: {
    // 当前运行环境
    'process.env.APP_ENV': REACT_APP_ENV,
  },
  devtool: 'source-map',
  dva: {
    hmr: true,
    skipModelValidate: true,
  },
  history: {
    type: 'browser',
  },
  locale: false,
  dynamicImport: {
    loading: '@/components/page-loading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme,
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'ii-admin-ui',
        libraryDirectory: 'lib/components',
      },
    ],
    [
      'import',
      {
        libraryName: 'ii-admin-base',
        libraryDirectory: 'lib',
      },
      'second',
    ],
    [
      'import',
      {
        libraryName: 'ii-admin-business',
        libraryDirectory: 'lib',
      },
      'third',
    ],
  ],
  chainWebpack: function (config, { webpack }) {
    if (process.env.REACT_APP_ENV === 'prod') {
      config.plugin('sentry').use(SentryWebpackPlugin, [
        {
          // sentry-cli configuration
          configFile: './sentryclirc',
          release: process.env.npm_package_name,

          // webpack specific configuration
          include: './dist',
          ignore: ['node_modules', 'config'],
          urlPrefix: '~/',
        },
      ])
    }
  },
})
