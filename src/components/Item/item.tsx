import React, { Fragment, memo } from 'react'
import type { FC } from 'react'
import { isEmpty, isString, map, isArray } from 'lodash'

//  JSX.Element 约等于  React.ReactElement 小于 React.ReactNode
interface IItemProps extends Record<string,any>{
    children?: React.ReactNode | []
    show?: boolean
    defaultValue?: JSX.Element | null
    others?: { [key: string]: any }
}
const Item: FC<IItemProps> = ({ show, children, defaultValue = null, ...others }) => {
    // 渲染DOM string直接渲染 非string使用React.cloneElement
    const renderDom = <T extends JSX.Element | string, U extends React.Key | null | undefined>(e: T, key?: U) => isString(e) ? <>{e}</> : <Fragment key={key}>{React.cloneElement(e, others)}</Fragment>
    // 多个children遍历渲染 单个children直接渲染
    return isEmpty(others)
        ? <>{show ? children : defaultValue}</> : show && children ? isArray(children) && children.length > 1 ? <> {map(children, renderDom)} </> : renderDom(children as JSX.Element) : defaultValue
}


export default memo(Item)