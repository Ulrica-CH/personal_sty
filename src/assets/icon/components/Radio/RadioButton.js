import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useControlledInputs } from '../../common/hooks';
import { nfn } from '../../common';
import { map, isString } from 'lodash';
import { config } from '../../common/config';

const mapDefaultToValue = (defaultValue, { options = [] }) => {
  if (defaultValue === undefined) {
    return options[0] ? options[0].value : defaultValue;
  }
  return defaultValue;
};
const mapValuetoValue = item => item.value;

/**
 * 按钮式Radio
 */
export default function RadioButton({
  defaultValue,
  onChange,
  options,
  disabled,
  role,
  theme,
  radius,
  mini,
  className,
  style,
  prefixCls
}) {
  const classes = classNames(
    `${prefixCls || config.prefixCls}radio-btn`,
    {
      disabled,
      radius
    },
    { dark: theme === 'dark' },
    { green: theme === 'green' },
    { mini: mini },
    className
  );
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    props: { options }
  });

  const handleClick = item => {
    if (item.disabled || disabled) {
      return;
    }
    handleChange(item);
  };

  return (
    <div className={classes} style={style}>
      {map(options, item => {
        const itemClasses = classNames('radio-btn-item', {
          active: item.value === value,
          disabled: item.disabled
        });
        return (
          <span
            key={`radio-btn-${isString(item.value) ? item.value : item.label}`}
            className={itemClasses}
            role={role}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item.label}
          </span>
        );
      })}
    </div>
  );
}

RadioButton.defaultProps = {
  onChange: nfn,
  role: 'radio',
  radius: true,
  mini: false,
  theme: 'default'
};
RadioButton.propTypes = {
  /** 选项列表，遵循各选项格式 包含label,value字段 */
  options: PropTypes.array,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func,
  /** 是否圆角 */
  radius: PropTypes.bool,
  /** 是否mini,mini不设置最小宽度 高度为24px */
  mini: PropTypes.bool,
  /** 元素扮演的角色，为盲人提供更好的可读性 */
  role: PropTypes.string,
  /** 自定义class */
  className: PropTypes.string,
  /** 自定义样式 */
  style: PropTypes.object,
  /** 主题 */
  theme: PropTypes.oneOf(['default', 'dark', 'green'])
};
