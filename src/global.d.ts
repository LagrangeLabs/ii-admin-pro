/** 分页参数 */
declare interface IPage {
  current: number
  size: number
}

/** ajax 返回信息 */
declare namespace Ajax {
  interface Response<T = any> {
    code: number
    data: T
    msg: string | null
  }
}

/** 下拉框options */
declare interface ISelectOption {
  label: string | number
  value: string | number
}

/** dva model */
interface DvaModel<S = any, E = any, R = any> {
  namespace: string
  state: S
  effects: E
  reducers: R
}

/** dva reducer */
type DvaReducer<T, P> = (state: T, { payload }: { payload: P }) => T
