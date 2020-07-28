/**
 *  验证手机号
 * @param {number} phone
 */
const _validatePhone = phone => {
  return /^[1][1-9][0-9]{9}$/.test(phone);
};

export const validatePhone = (rule, value, callback) => {
  try {
    if (value === '' || value === undefined) callback();

    if (_validatePhone(value)) {
      callback();
    } else {
      throw new Error('请输入正确的手机格式');
    }
  } catch (err) {
    callback(err);
  }
};

// 验证长度
export const validateLength = (name, len) => (rule, value, callback) => {
  try {
    if (value === '' || value === undefined) callback();

    if (value.toString().length > len - 1) {
      callback();
    } else {
      throw new Error(`${name}长度不能少于${len}位`);
    }
  } catch (err) {
    callback(err);
  }
};

/**
 * 验证数字
 *
 * 格式：
 *
 * + 22
 * + 22.22
 * + 0.22
 */
export const validateNumber = (rule, value, callback) => {
  try {
    if (value === '' || value === undefined) callback();

    const numberRule = new RegExp(/^([0-9])*(.)?[0-9]*$/);
    if (numberRule.test(value)) {
      callback();
    } else {
      throw new Error(`请填写正确的数字格式`);
    }
  } catch (err) {
    callback(err);
  }
};

export const FILE_TYPE = /(jpg|png|gif|jpeg|heic|doc|docx|xls|xlsx|pdf)/;

export const IMG_TYPE = /jpg|png|gif|jpeg|heic/;

export const PREVIEW_PREFIX = 'https://view.officeapps.live.com/op/view.aspx?src=';
