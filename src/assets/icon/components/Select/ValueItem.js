/*
 * @LastEditTime: 2021-10-20 15:58:18
 * @LastEditors: jinxiaojian
 */
import React from 'react';
import cx from 'classnames';
import delIconCavity from './images/close-mini.svg';
import Icon from '../Icon';
import { config } from '../../common/config';
export default function ValueItem({
  value = {},
  valueColor,
  onRemove,
  disabled
}) {
  const classes = cx(`${config.prefixCls}multi-select-value`, {
    disabled: disabled || value.disabled
  });

  const color = disabled || value.disabled ? '#444' : valueColor;
  return (
    <div className={classes} style={{ background: color, borderColor: color }}>
      <span className="multi-item-text">{value.label || value.value}</span>
      <span
        onClick={e => {
          e.stopPropagation();
          onRemove(value);
        }}
        style={{ cursor: 'pointer' }}
      >
        <Icon className="multi-item-del-icon" link={delIconCavity} />
      </span>
    </div>
  );
}
