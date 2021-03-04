// https://umijs.org/config/
import { defineConfig } from 'umi'
import proxy from './proxy'
import routes from './routes'
import theme from './theme'

const { REACT_APP_ENV } = process.env

export default defineConfig({
  hash: true,
  antd: {},
  define: {
    // 当前运行环境
    'process.env.APP_ENV': REACT_APP_ENV,
  },
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
})
