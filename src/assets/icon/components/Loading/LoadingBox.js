/*
 * @LastEditTime: 2021-07-25 18:39:04
 * @LastEditors: jinxiaojian
 */
import React from 'react';
import classNames from 'classnames';
import Loading from './Loading';
import { config } from '../../common/config';

export default function LoadingBox({
  className,
  children,
  style,
  prefixCls,
  ...others
}) {
  const prefix = prefixCls || config.prefixCls;
  const classes = classNames(`${prefix}loading-box`, className);
  return (
    <div className={classes} style={style}>
      <Loading
        {...others}
        className="loading-box-icon"
        align="horizontal"
        showTip={false}
        showLabel={false}
      />
      {children}
    </div>
  );
}
