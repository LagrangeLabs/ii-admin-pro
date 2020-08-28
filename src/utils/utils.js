import moment from 'moment';
import React from 'react';
import { parse, stringify } from 'qs';
import { FILE_TYPE, IMG_TYPE, PREVIEW_PREFIX } from '@/utils/validator';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export const PHONE_REGULAR = /^[1][1-9][0-9]{9}$/;
export const PHONE_SHOW_REG = /(\d{3})\d{4}(\d{4})/;
export const PHOEN_ERR = '请输入11位手机号';
export const DATE_FORMAT = 'YYYY-MM-DD';

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(
        moment(
          `${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`,
        ).valueOf() - 1000,
      ),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path,
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(
      route => route !== item && getRelation(route, item) === 1,
    );
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatWan(val) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

function isIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true;
  } else {
    return false;
  }
}

/**
 * 下载文件
 *
 * @param {*} response 数据流
 * @param {string} fileName 文件名称
 */
export function downloadFile(response, fileName) {
  const blob = new Blob([response]);
  const url = window.URL.createObjectURL(blob);

  // 非IE下载
  if ('download' in document.createElement('a')) {
    // AJAX 本身并不会唤起浏览器的下载行为，只有 a 标签具有下载特性
    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = url;
    document.body.appendChild(elink);
    elink.click();

    // 释放URL对象
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  } else {
    // IE10、IE11 通过navigator.msSaveBlob可以将File或Blob对象保存到本地磁盘
    navigator.msSaveBlob(blob, fileName);
  }
}

/**
 *
 * @param {name} 文件名称
 * @param {url} 文件地址
 *
 * @returns {
 *  src: url,
    type: 'image' | 'pdf'
 * }
 */
export function getPreviewInfo({ name, url }) {
  const lastIndex = name.lastIndexOf('.');
  let type = '';
  if (lastIndex !== -1) {
    type = name.substring(lastIndex + 1).toLowerCase();
  }

  const matches = type.match(FILE_TYPE);
  let typeMatch = '';
  let isImg = false;
  if (matches && matches.length > 1) {
    typeMatch = matches[1];
    isImg = IMG_TYPE.test(typeMatch);
  }
  if (isImg || typeMatch === 'pdf') {
    return {
      src: url,
      type: isImg ? 'image' : 'pdf',
    };
  }
  window.open(PREVIEW_PREFIX + url);
  return null;
}
/**
 *
 * @param {string} url 文件地址
 * @param {string} name 文件名称
 */
export function download(url, name) {
  if (isIE()) {
    // IE
    window.open(url, '_blank');
  } else {
    // const aLink = document.createElement('a');
    // document.body.appendChild(aLink);
    // aLink.style.display = 'none';
    // aLink.href = url;
    // aLink.download = name;
    // aLink.click();
    // document.body.removeChild(aLink);

    // 大文件不能保证下载成功

    let a = document.createElement('a'); // 创建a标签
    let e = document.createEvent('MouseEvents'); // 创建鼠标事件对象
    e.initEvent('click', false, false); // 初始化事件对象
    a.href = url; // 设置下载地址
    if (url.indexOf('.pdf') !== -1) {
      a.target = '_blank';
    }
    a.download = name; // 设置下载文件名
    a.dispatchEvent(e);

    return false;

    // 大文件不能保证下载成功; 1s内部保证可以下载完，并且还要考虑pdf 的情况，因为pdf 需要点击打印才会下载
    const removeDelay = 1000;
    const triggerDelay = 100;
    //动态添加iframe，设置src，然后删除
    setTimeout(function() {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);
      if (url.indexOf('.pdf') !== -1) {
        console.log('??????/');
        iframe.onload = function(e) {
          var ifDoc = iframe.contentDocument || {};
          var ifTitle = ifDoc.title || '';

          if (ifTitle.indexOf('404') >= 0 || ifTitle.indexOf('错误') >= 0) {
          } else {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          }
        };
      }

      setTimeout(function() {
        document.body.removeChild(iframe);
      }, removeDelay);
    }, triggerDelay);
  }
}

export function getRateData(data, valueKey = 'value') {
  let total = 0;
  for (let index = 0, len = data.length; index < len; index++) {
    const element = data[index];
    total += element[valueKey];
  }
  const newData = data.map(item => {
    item.rate = Number((item[valueKey] / total).toFixed(3));
    return item;
  });
  return newData;
}

export function getDataFromMap(data, mapObject = null) {
  const result = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      const name = mapObject ? mapObject[key] : key;
      if (name) {
        result.push({
          name,
          count: Number(element),
        });
      }
    }
  }
  return result;
}

export function getTotalPercent(result, countkey) {
  let total = 0;
  result.forEach(element => {
    total += element[countkey];
  });
  const resultCal = result.map(item => {
    item.percent = item[countkey]
      ? ((item[countkey] / total) * 100).toFixed(1)
      : 0;
    return item;
  });
  return {
    total,
    result: resultCal,
  };
}

// 检查按钮权限
export function checkBtnPermission(permissions = [], permissionFlag) {
  const index = permissions.findIndex(
    item => item.permissionValue === permissionFlag,
  );

  if (index > -1) {
    return true;
  } else {
    return false;
  }
}

// 格式化form表单中的日期值
export function formatDateFromFormvalues(values, tagsArray) {
  tagsArray.forEach(item => {
    if (item.type === 'INPUT_DATE') {
      const value = values[item.key];
      if (value) {
        values[item.key] =
          typeof value === 'string' ? value : value.format(DATE_FORMAT);
      }
    }
  });
  return values;
}

/**
 * 打开新窗口
 */
export const openNewWindow = url => {
  const origin = window.location.origin;

  return window.open(origin + url);
};
