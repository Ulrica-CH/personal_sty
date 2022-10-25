/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:02:00
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-07-07 19:58:49
 */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { nfn } from '../../common';
import { useUpdateEffect } from '../../common/hooks';
import Icon from '../Icon/index';
import iconChecked from './images/checkbox_active.svg';
import iconSafeChecked from './images/checkbox_safe_active.svg';
import iconDangerChecked from './images/checkbox_danger_active.svg';
import halfIcon from './images/half_open.svg';
import { config } from '../../common/config';

const iconMap = {
  normal: iconChecked,
  safe: iconSafeChecked,
  danger: iconDangerChecked
};

export default function Checkbox({
  defaultChecked,
  onChange,
  label,
  type,
  value,
  mini,
  indeterminate,
  disabled,
  className,
  prefixCls,
  style
}) {
  const inputRef = useRef(null);
  // 重置为controlled input
  const [checked, setChecked] = useState(defaultChecked);
  useUpdateEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);
  // 半开状态
  const [halfOpen, setHalfOpen] = useState(indeterminate || false);
  useUpdateEffect(() => {
    inputRef.current.indeterminate = indeterminate;
    setHalfOpen(indeterminate);
  }, [indeterminate]);

  const handleClick = e => {
    e.stopPropagation();
    if (disabled) return;
    // 半开状态 点击变成开
    if (halfOpen) {
      inputRef.current.indeterminate = false;
      const checked = true;
      setHalfOpen(false);
      setChecked(checked);
      onChange(checked, value, { checked });
      e.preventDefault();
    }
  };
  const handleChange = e => {
    const checked = e.target.checked;
    setChecked(checked);
    onChange(checked, value, { checked });
  };

  const classes = classNames(
    `${prefixCls || config.prefixCls}checkbox-label`,
    className,
    {
      disabled,
      checked: checked || halfOpen,
      mini
    }
  );

  const checkedIcon = iconMap[type];
  let icon = null;
  if (checked) {
    icon = checkedIcon;
  } else if (halfOpen) {
    icon = halfIcon;
  } else {
    icon = checkedIcon;
  }

  return (
    <label
      unselectable="false"
      onClick={handleClick}
      className={classes}
      style={style}
    >
      <Icon className="checkbox-icon" link={icon} />
      <input
        ref={inputRef}
        className="checkbox"
        type="checkbox"
        checked={checked}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <span title={typeof label === 'string' ? label : ''}>{label}</span>
    </label>
  );
}
Checkbox.defaultProps = {
  onChange: nfn,
  type: 'normal',
  defaultChecked: false
};
Checkbox.propTypes = {
  /** checkbox标签描述 */
  label: PropTypes.any,
  /** 是否半选 */
  indeterminate: PropTypes.bool,
  /** 类型: 绿和蓝和红 **/
  type: PropTypes.oneOf(['safe', 'normal', 'danger']),
  /** 是否默认选中 */
  defaultChecked: PropTypes.bool,
  /** 该选项对应的值，会在onChange时传入回调 */
  value: PropTypes.any,
  /** 是否mini样式 */
  mini: PropTypes.bool,
  /** 值更改时的回调 */
  onChange: PropTypes.func,
  /** 禁用状态 */
  disabled: PropTypes.bool,
  /** 自定义class */
  className: PropTypes.string,
  /** 自定义style */
  style: PropTypes.object
};
