import React from 'react'
import './index.less'

export type IPageHeaderProps = {
  title: string | React.ReactNode
  style?: React.CSSProperties
  children?: React.ReactNode
  extra?: React.ReactNode
  className?: string
  buoyColor?: string
  buoySpace?: number
}

const perfixCls = `ii-title`

// 渲染title
const renderTitle = (
  tPerfixCls: string,
  title: string | React.ReactNode,
  buoyColor?: string,
  buoySpace?: number,
  extra?: React.ReactNode,
) => {
  return (
    <div className={`${tPerfixCls}`}>
      <p className={`${tPerfixCls}__text`}>
        {title}
        <span
          className={`${tPerfixCls}__buoy`}
          style={{ backgroundColor: buoyColor, right: `${buoySpace}px` }}
        />
      </p>
      <div className={`${tPerfixCls}__extra`}>{extra}</div>
    </div>
  )
}

// 渲染内容
const renderContent = (cPerfixCls: string, children?: React.ReactNode) => {
  return <div className={`${cPerfixCls}`}>{children}</div>
}

const IPageHeader = (props: IPageHeaderProps) => {
  const { title, style = {}, children, extra, className = '', buoyColor, buoySpace } = props

  return (
    <div className={`${perfixCls} ${className}`} style={style}>
      {renderTitle(`${perfixCls}-head`, title, buoyColor, buoySpace, extra)}
      {renderContent(`${perfixCls}-content`, children)}
    </div>
  )
}

export default IPageHeader
