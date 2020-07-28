// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
    skipModelValidate: true, // 由于 model 写法很动态，导致不能识别出来
  },
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   antd: true,
  //   baseNavigator: true,
  // },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: {
    '/api_v1': {
      // target: 'http://smart-letters-web.dev.ii-ai.tech/letters/',
      target: 'http://192.168.0.91:9200/',
      changeOrigin: true,
      pathRewrite: { '^/api_v1': '' },
    },
  },
  manifest: {
    basePath: '/',
  },
});
