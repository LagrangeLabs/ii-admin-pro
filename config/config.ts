import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
    skipModelValidate: true, // 由于 model 写法很动态，导致不能识别出来
  },
  targets: {
    ie: 11,
  },
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy,
  manifest: {
    basePath: '/',
  },
  publicPath: process.env.CI === 'true' ? 'ii-admin-pro/' : '/',
});
