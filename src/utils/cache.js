// 将数据存储localStorage
export const saveDataInLocalStorage = ({ key, value }) => {
  localStorage.setItem(key, value);
};

// 从localStorage获取数据
export const getDataFromLocalStorage = key => {
  return localStorage.getItem(key);
};
