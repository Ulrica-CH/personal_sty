/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:02:10
 * @Last Modified by: wangweixin
 * @Last Modified time: 2020-11-26 14:06:40
 */
import React, { cloneElement, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { nfn } from '../../common';
import filter from 'lodash/filter';
import map from 'lodash/map';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import { useControlledInputs } from '../../common/hooks';

/**
 * Checkbox组, 自动包含值，name,onchange等维护
 * 可针对form组件进行使用
 */
export default function CheckboxGroup({
  defaultValue,
  onChange,
  children,
  disabled,
  className
}) {
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: v => v
  });

  const onSelectChange = useCallback(
    (checked, v) => {
      if (checked) {
        handleChange([...value, v]);
      } else {
        const result = filter(value, item => !isEqual(item, v));
        handleChange([...result]);
      }
    },
    [value, handleChange]
  );

  const classes = classNames('checkbox-group', className, {
    disabled
  });

  return (
    <div className={classes}>
      {map(filter(children, Boolean), (child, index) =>
        cloneElement(child, {
          defaultChecked: includes(value, child.props.value),
          onChange: onSelectChange,
          key: 'checkbox-group' + child.props.value + child.props.label,
          disabled: child.props.disabled || disabled
        })
      )}
    </div>
  );
}

CheckboxGroup.defaultProps = {
  defaultValue: [],
  onChange: nfn
};
CheckboxGroup.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** onchange事件 */
  onChange: PropTypes.any,
  /** disabled状态 */
  disabled: PropTypes.bool,
  /** 子元素 */
  children: PropTypes.arrayOf(PropTypes.element),
  /** 自定义class */
  className: PropTypes.string
};
