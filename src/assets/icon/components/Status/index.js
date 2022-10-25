/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:00:11
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-06-09 15:58:10
 */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import { iconMap } from './iconMap';
import { typeMap, typeMapArr } from './typeMap';
import { config } from '../../common/config';

// [{ label: '', value: '', icon: '',color:'' }]
/**
 * Status的基本封装
 */
function Status(props) {
  const {
    labelHasColor,
    noLabel,
    svgLink,
    mini,
    column,

    type,
    value,
    iconType,

    options,
    trans,

    label,
    color,
    className,
    style,
    iconClassName
  } = props;
  const classes = classnames(`${config.prefixCls}status`, className, type, {
    column
  });
  const result =
    (options || typeMapArr[trans ? trans[type] : type]).filter(
      x => String(x.value) === String(value)
    )[0] || {};
  const size = mini ? { width: 19, height: 19 } : { width: 24, height: 24 };
  return (
    <div className={classes}>
      {iconType === 'icon' ? (
        <Icon
          link={result.icon}
          fill={result.color}
          className={iconClassName}
          style={{ ...size, ...style }}
        />
      ) : (
        <div className="point" style={{ background: result.color }}></div>
      )}
      {!noLabel ? (
        <div
          className="label"
          style={{ color: labelHasColor ? result.color : undefined }}
        >
          {result.label}
        </div>
      ) : null}
    </div>
  );
}

Status.propTypes = {
  /** svg的路径 */
  svgLink: PropTypes.string,
  /** 文字包含颜色 */
  labelHasColor: PropTypes.bool,
  /** 不显示文字 */
  noLabel: PropTypes.bool,
  /** 要显示的文本 */
  label: PropTypes.string,
  /** 是否缩略形式 */
  mini: PropTypes.bool,
  /** 颜色 */
  color: PropTypes.string,
  /** 状态类型 : operation,event,threat,host */
  type: PropTypes.string,
  /** 图标模式以及圆点模式icon,point,默认icon*/
  iconType: PropTypes.string,
  /** 状态数: 0,1,2,3 */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 竖置展示 */
  column: PropTypes.bool,
  /** 键值对应 */
  trans: PropTypes.object,
  /** 定义新字典 */
  options: PropTypes.array
};

Status.defaultProps = {
  mini: false,
  noLabel: false,
  column: false,
  iconType: 'icon'
};

export default Status;
