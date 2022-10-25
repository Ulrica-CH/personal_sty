/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:02:29
 * @Last Modified by: wangweixin
 * @Last Modified time: 2020-05-14 16:00:22
 */
import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import iconChecked from './images/radio_active.svg';
import iconBase from './images/radio.svg';
import iconDisabled from './images/radio_disabled.svg';
import Icon from '../Icon';
import { nfn } from '../../common';
import { config } from '../../common/config';

/**
 * 对Radio进行简单的封装
 * 并没有进行样式的修改
 */
export default function Radio({
  defaultChecked,
  onChange,
  label,
  value,
  disabled,
  mini,
  className,
  prefixCls,
  color = '',
  ...others
}) {
  const classes = classNames(
    `${prefixCls || config.prefixCls}radio-label`,
    className,
    {
      disabled,
      mini,
      checked: defaultChecked
    }
  );
  const ref = useRef(null);
  const useSvg = useMemo(() => {
    if (!defaultChecked && disabled) {
      return iconDisabled;
    }
    if (defaultChecked) {
      return iconChecked;
    }
    return iconBase;
  }, [defaultChecked, disabled]);
  const onMouseEnter = !disabled
    ? e => {
        const svgEl = ref.current.querySelector('svg');
        if (svgEl) {
          svgEl.style.stroke = color || null;
          svgEl.style.fill = color || null;
        }
      }
    : null;
  const onMouseLeave = !disabled
    ? e => {
        const svgEl = ref.current.querySelector('svg');
        if (svgEl) {
          svgEl.style.stroke = null;
        }
      }
    : null;
  return (
    <label
      key={`radio-label-${value}`}
      ref={ref}
      className={classes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon
        className="radio-icon"
        style={{
          fill: color
        }}
        link={useSvg}
      />
      <input
        className={`${prefixCls || config.prefixCls}radio`}
        type="radio"
        checked={defaultChecked}
        value={value}
        disabled={disabled}
        onChange={e =>
          onChange(e.target.checked, value, { checked: e.target.checked })
        }
      />
      {label}
    </label>
  );
}
Radio.defaultProps = {
  onChange: nfn
};
Radio.propTypes = {
  /** radio标签描述 */
  label: PropTypes.string,
  /** 是否默认选中 */
  defaultChecked: PropTypes.bool,
  /** 该选项对应的值，会在onChange时传入回调 */
  value: PropTypes.any,
  /** 值更改时的回调 */
  onChange: PropTypes.func,
  /** 禁用状态 */
  disabled: PropTypes.bool
};
