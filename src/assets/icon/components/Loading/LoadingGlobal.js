/*
 * @LastEditTime: 2021-11-01 19:11:04
 * @LastEditors: lujing
 */
import React from 'react';
import classNames from 'classnames';
import LoadingBox from './LoadingBox';
import { config } from '../../common/config';

export default function LoadingGlobal({
  className,
  style,
  prefixCls,
  children = '正在提交中...',
  ...others
}) {
  const prefix = prefixCls || config.prefixCls;
  const classes = classNames(`${prefix}loading-global`, className);
  return (
    <div className={classes} style={style}>
      <LoadingBox {...others} children={children} />
    </div>
  );
}
