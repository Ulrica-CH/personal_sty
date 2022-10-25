/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:00:11
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-08-16 19:32:55
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { iconMap } from './iconMap';
import { config } from '../../common/config';

/**
 * icon的基本封装
 */
function Icon(props) {
  const { link, className = '', mini, large, type, style, ...others } = props;
  const classes = classnames(`${config.prefixCls}icon`, className, {
    mini,
    large
  });

  const resultLink = type ? iconMap[type] || link : link;

  return (
    <svg className={classes} {...others} style={style}>
      <use xlinkHref={resultLink} />   {/* link链接绑定 */}
    </svg>
  );
}

Icon.propTypes = {
  /** svg的路径 */
  link: PropTypes.string,
  /** 小尺寸 */
  mini: PropTypes.bool,
  /** 大尺寸 */
  large: PropTypes.bool,
  /** 默认类型 */
  type: PropTypes.string
};

Icon.defaultProps = {
  mini: false,
  large: false
};

export default Icon;
