import React, { memo } from 'react'
import type { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import cx from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'warning'
interface IButtonProps {
  //  尺寸
  btnSize?: ButtonSize
  //  类型
  btnType?: ButtonType
  children: React.ReactNode
  classNames?: string
  disabled?: boolean
  restProps?: { [key: string]: any }
  href?: string
}
// 其他内置属性 交叉类型& 拓展button a 其他的属性
type NativeButtonProps = IButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = IButtonProps & AnchorHTMLAttributes<HTMLElement>
//  Partial 变为可选类型
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = ({ classNames = '', disabled = false, btnType = 'primary', btnSize, href = '#', children, ...restProps }) => {
  const className = cx('btn', classNames, { [`btn-${btnType}`]: btnType, [`btn-${btnSize}`]: btnSize, 'disabled': (btnType === 'link') && disabled })
  // if (btnType === 'link' && href) {
  //   return (
  //     <a
  //       className={className}
  //       href={href}
  //       {...restProps}
  //     >
  //       {children}
  //     </a>
  //   )
  // } else {
  //   return (
  //     <button
  //       className={className}
  //       disabled={disabled}
  //       {...restProps}
  //     >
  //       {children}
  //     </button>
  //   )
  // }

  return btnType === 'link' && href
    ? <a className={className} href={href} {...restProps}> {children} </a>
    : <button className={className} disabled={disabled} {...restProps}> {children} </button>

  //  丑化
  return (<T extends string, U extends string>({ ele, href }: { ele: T, href?: U }) => React.createElement(ele, { className, disabled, href, ...restProps }, children))
    (btnType === 'link' ? ({ ele: 'a', href }) : ({ ele: 'button' }))
}
export default memo(Button)

/*
  Button需求分析
    1、大小：lg sm normal
    2、样式：primary success danger waring link
    3、状态：disabled
    4、更多扩展
  思路
    1、确定样式
    2、判断是否是link按钮 需要属性href
  其他类型
    1、button a等其他属性如果依次添加会很麻烦
    2、可以使用react提供的内置类型
 */

