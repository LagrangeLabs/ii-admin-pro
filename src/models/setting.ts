import { Reducer } from 'redux';
import defaultSettings, { DefaultSettings } from '../../config/defaultSettings';

export interface SettingModelType {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {
    getSetting: Reducer<DefaultSettings>;
    changeSetting: Reducer<DefaultSettings>;
  };
}

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    getSetting(state = defaultSettings) {
      const setting: Partial<DefaultSettings> = {};
      const urlParams = new URL(window.location.href);

      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      return {
        ...state,
        ...setting,
      };
    },
    changeSetting(state = defaultSettings, { payload }) {
      const urlParams = new URL(window.location.href);

      Object.keys(defaultSettings).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          urlParams.searchParams.delete(key);
        }
      });

      Object.keys(payload).forEach(key => {
        if (key === 'collapse') {
          return;
        }
        let value = payload[key];
        if (value === true) {
          value = 1;
        }
        if (defaultSettings[key] !== value) {
          urlParams.searchParams.set(key, value);
        }
      });
      const { contentWidth } = payload;

      if (state.contentWidth !== contentWidth && window.dispatchEvent) {
        window.dispatchEvent(new Event('resize'));
      }
      window.history.replaceState(null, 'setting', urlParams.href);
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default SettingModel;
