export function getOptionFromObj(optionObj: any) {
  const result: any[] = []
  Object.keys(optionObj).map((key: string) => {
    const value = optionObj[key]
    result.push({
      value: /^[0-9]+$/.test(key) ? parseInt(key, 10) : key, // 全为数字是key转化为数字
      key: value,
    })
    return key
  })
  return result
}
export function getOptionFromArray(optionsArray: any, transKey: any) {
  if (optionsArray instanceof Array) {
    return optionsArray.map((item) => {
      if (typeof item === 'object') {
        if (transKey.children) {
          // 级联选择器
          let children: any = null
          if (item[transKey.children] && item[transKey.children].length > 0) {
            children = getOptionFromArray(item[transKey.children], transKey)
          }
          return {
            label: item[transKey.key],
            value: item[transKey.value],
            children,
          }
        }
        return {
          value: item[transKey.value],
          key: item[transKey.key],
        }
      }
      return {
        value: item,
        key: item,
      }
    })
  }
  return getOptionFromObj(optionsArray)
}
