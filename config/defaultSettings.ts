import { MenuTheme } from 'antd/es/menu/MenuContext';

export type ContentWidth = 'Fluid' | 'Fixed';

export interface DefaultSettings {
  navTheme: MenuTheme;
  primaryColor: string;
  layout: 'sidemenu' | 'topmenu';
  contentWidth: ContentWidth;
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSiderbar: boolean;
  menu: { locale: boolean };
  title: string;
  pwa: boolean;
  iconfontUrl: string;
}

export default {
  navTheme: 'dark',
  primaryColor: '#3B69EB',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  menu: {
    locale: true,
  },
  title: '统一后台模板系统',
  pwa: false,
  iconfontUrl: '',
} as DefaultSettings;
