import { history } from 'umi';
import { message } from 'antd';
import { parse, stringify } from 'qs';

/**
 * 获取当前页面的 Query 参数
 */
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

let handler = 0;

/**
 * 处理 Token 失效
 *
 * @param {string} path Token 失效后要跳转的 URL 路径
 * @param {string} tips 错误消息提示
 */
export const handleTokenInvalid = (
  path = '/user/login',
  tips = '登陆失效，请重新登陆',
) => {
  const { redirect } = getPageQuery();

  clearTimeout(handler);
  if (window.location.pathname !== path && !redirect) {
    history.replace({
      pathname: path,
      search: stringify({ redirect: window.location.href }),
    });
  }

  // 节流，防止错误消息批量提示
  handler = setTimeout(() => {
    message.error(tips);
  }, 500);
};
