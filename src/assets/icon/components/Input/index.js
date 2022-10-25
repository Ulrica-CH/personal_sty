/*
 * @LastEditTime: 2020-06-17 19:08:36
 * @LastEditors: jinxiaojian
 */

import React from 'react';
import PropTypes from 'prop-types';
import Base from './Input';
import TextAreaWithMax from './TextareaWithMax';
import { useControlledInputs } from '../../common/hooks';
import { nfn } from '../../common';
import { omit } from 'lodash';

export default function Input(props) {
  const { defaultValue, onChange, type, max, ...others } = props;
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: v => v
  });

  if (type === 'textarea' && max) {
    return (
      <TextAreaWithMax
        type={type}
        max={max}
        defaultValue={defaultValue}
        onChange={onChange}
        {...omit(others, ['isSearch'])}
      />
    );
  } else {
    return (
      <Base type={type} value={value} handleChange={handleChange} {...others} />
    );
  }
}

Input.defaultProps = {
  type: 'text',
  defaultValue: '',
  isSearch: false,
  mini: false,
  radius: true,
  background: false,
  clearable: true,
  onChange: nfn,
  onFocus: nfn,
  onBlur: nfn
};

Input.propTypes = {
  /** 输入内容改变时的回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.string,
  /** 小size的 */
  mini: PropTypes.bool,
  /** 是否圆角 */
  radius: PropTypes.bool,
  /** 是否深色背景 */
  background: PropTypes.bool,
  /** 是否显示搜索图标 */
  isSearch: PropTypes.bool,
  /** 是否可清除 */
  clearable: PropTypes.bool,
  /** 主动修改组件值时候的值， @see controled input */
  value: PropTypes.string,
  /** 类型 */
  type: PropTypes.oneOf(['text', 'textarea', 'password', 'number']),
  /** 是否Error, 自带error样式 */
  hasError: PropTypes.bool,
  /** 当type为textarea时，设置max,则会显示当前输入的字数 */
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** 提示语句 */
  placeholder: PropTypes.string,
  /** 当type为number时的数字最大值 */
  numMax: PropTypes.number,
  /** 当type为number时的数字最小值 */
  numMin: PropTypes.number,
  /** 当type为number时是否限制输入为整数 */
  isInteger: PropTypes.bool
};
