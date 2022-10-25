/*
 * @Author: wangweixin
 * @Date: 2018-01-18 17:51:18
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-02-22 16:45:31
 */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useControlledInputs } from '../../common/hooks';
import { config } from '../../common/config';
import { omit } from 'lodash';

export default function Textarea(props) {
  const {
    defaultValue,
    onChange,
    max,
    radius,
    className,
    hasError: error,
    disabled,
    style,
    mini,
    placeholder,
    background,
    prefixCls,
    ...others
  } = props;
  const [focus, setFocus] = useState(false);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue: v => v,
    mapValuetoValue: e => e.target.innerText
  });
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl && !focus && (inputEl.current.innerText = value);
  }, [defaultValue, focus]);

  const classes = classNames(
    `${prefixCls || config.prefixCls}input`,
    `${prefixCls || config.prefixCls}textarea`,
    `${prefixCls || config.prefixCls}textarea-wrap`,
    className,
    {
      error,
      'is-disabled': disabled,
      focus,
      mini,
      radius,
      background
    }
  );
  return (
    <div className={classes} {...omit(others, ['clearable'])}>
      <div
        style={style}
        contentEditable={disabled ? 'false' : 'true'}
        className="textarea-content"
        onInput={handleChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        ref={inputEl}
      />
      <span className="max">
        <i>{value.length}</i>/{max}
      </span>
    </div>
  );
}
