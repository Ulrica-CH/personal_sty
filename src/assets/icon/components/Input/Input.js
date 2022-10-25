/*
 * @Author: wangweixin
 * @Date: 2018-01-18 17:50:52
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-10-12 19:06:24
 */
import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import searchIcon from './images/search.svg';
import clearIcon from './images/clear.svg';
import Item from '../Item';
import { isEmpty, omit, trim } from 'lodash';
import { config } from '../../common/config';

export default function Input(props) {
  const {
    value,
    handleChange,
    isSearch,
    clearable,
    type,
    mini,
    radius,
    background,
    hasError: error,
    className,
    onFocus,
    onBlur,
    disabled,
    prefixCls,
    numMax,
    numMin,
    isInteger,
    ...others
  } = props;

  const [focus, setFocus] = useState(false);

  const onChange = e => handleChange(handleValue(e.target.value));
  const inputRef = useRef();

  const onClear = useCallback(() => {
    if (disabled) return;
    handleChange('');
    inputRef.current && inputRef.current.focus();
  }, [handleChange]);

  const handleFocus = useCallback(e => {
    setFocus(true);
    onFocus(e);
  }, []);

  const handleBlur = useCallback(e => {
    setFocus(false);
    onBlur(e);
  }, []);

  const handleValue = useCallback(value => {
    if (type !== 'number') {
      return value;
    } else {
      const handledNumber = isInteger ? Math.trunc(value) : Number(value);
      let res = handledNumber || 0;
      if (res > numMax) return numMax;
      if (res < numMin) return numMin;
      return res;
    }
  });

  const textarea = type === 'textarea';

  let classes = classNames(className, {
    [`${prefixCls || config.prefixCls}input`]: true,
    [`${prefixCls || config.prefixCls}textarea`]: textarea,
    mini,
    radius,
    background,
    error
  });

  if (textarea) {
    return (
      <textarea
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={classes}
        type={type}
        onFocus={onFocus}
        onBlur={onBlur}
        {...others}
      />
    );
  }

  if (isSearch || clearable) {
    const cls = classNames(className, {
      [`${prefixCls || config.prefixCls}input`]: true,
      [`${prefixCls || config.prefixCls}textarea`]: textarea,
      [`${prefixCls || config.prefixCls}input-wrapper`]: true,
      mini,
      search: isSearch,
      clearable,
      focus,
      radius,
      background,
      error,
      disabled
    });
    classes = `${prefixCls || config.prefixCls}input-inner`;
    return (
      <div className={cls} style={others.style}>
        <input
          ref={inputRef}
          value={handleValue(value)}
          onChange={onChange}
          className={classes}
          placeholder={isSearch ? '搜索相关内容' : ''}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          {...omit(others, ['style'])}
        />
        <Item show={isSearch}>
          <Icon className="search-icon icon-stroke-default" link={searchIcon} />
        </Item>
        <Item show={clearable && trim(value) !== ''}>
          <Icon
            onClick={onClear}
            className="icon-fill-default clear-icon"
            link={clearIcon}
          />
        </Item>
      </div>
    );
  }
  return (
    <input
      value={handleValue(value)}
      onChange={onChange}
      className={classes}
      type={type}
      disabled={disabled}
      {...others}
    />
  );
}
