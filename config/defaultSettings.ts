import { Settings as ProSettings } from '@ant-design/pro-layout'

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean
}

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ii Admin Pro',
  pwa: false,
  iconfontUrl: '',
  splitMenus: false,
}

export type { DefaultSettings }

export default proSettings
