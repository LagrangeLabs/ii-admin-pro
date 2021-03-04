import React, { ReactNode } from 'react'
import './index.less'

interface IProps {
  prefixCls: string
  children: ReactNode
}

const ToolBar = (props: IProps) => {
  const { children, prefixCls } = props
  const toolBarPrefixCls = `${prefixCls}-toolbar`

  return (
    <div className={toolBarPrefixCls}>
      <div className={`${toolBarPrefixCls}__extra`}>
        <div className={`${toolBarPrefixCls}__extra-dynamic`}>{children}</div>
        {/* <div className={`${toolBarPrefixCls}__extra-normal`}></div> */}
      </div>
    </div>
  )
}

export default ToolBar
