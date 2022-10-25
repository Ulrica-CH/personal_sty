/*
 * @LastEditTime: 2020-06-17 10:58:21
 * @LastEditors: jinxiaojian
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import iconEmpty from './images/data_empty.svg';
import iconNet from './images/data_net.svg';
import iconAuth from './images/data_auth.svg';
import iconError from './images/data_error.svg';
import { config } from '../../common/config';

const typeMap = {
  net: iconNet,
  empty: iconEmpty,
  auth: iconAuth,
  error: iconError
};

export default function NoResult(props) {
  const { desc, className, mini, style, type, icon } = props;
  const cls = classNames(`${config.prefixCls}no-result`, className, {
    mini
  });

  const resultIcon = icon || typeMap[type] || iconError;

  return (
    <div className={cls} style={style}>
      <Icon className={'no-result-icon'} link={resultIcon} />
      <p>{desc}</p>
    </div>
  );
}
NoResult.propTypes = {
  /** 无数据时的描述 */
  desc: PropTypes.string,
  /** 提供四种默认类型的图标,分别对应暂无数据、网络连接错误、无权限、出错了 */
  type: PropTypes.oneOf(['empty', 'net', 'auth', 'error']),
  /** 是否迷你 */
  mini: PropTypes.bool
};
NoResult.defaultProps = {
  desc: '暂无数据',
  type: 'empty',
  mini: false
};
