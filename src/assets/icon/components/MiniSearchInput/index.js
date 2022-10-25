/*
 * @Author: sunxiaoshen
 * @Date: 2019-08-06
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import miniDelIcon from './images/miniDel.svg';
import magnifierIcon from './images/magnifier.svg';
import { useDefault } from '../../common/hooks';
import { nfn } from '../../common';

function MiniSearchInput({
  defaultValue = '',
  onChange,
  onSearch,
  placeholder,
  inputStyle,
  className
}) {
  const [value, setValue] = useDefault(defaultValue);
  const [isFocus, setIsFocus] = useState(false);

  const onValueChange = evt => {
    setValue(evt.target.value);
    onChange(evt.target.value);
  };

  const classes = classNames('mini-search-input', className);

  return (
    <div className={classes}>
      {isFocus ? (
        <Icon
          onClick={() => {
            onSearch(value);
          }}
          className="magnifier-icon-active"
          link={magnifierIcon}
        />
      ) : (
        <Icon
          onClick={() => {
            onSearch(value);
          }}
          className="magnifier-icon"
          link={magnifierIcon}
        />
      )}
      <input
        value={value}
        onChange={onValueChange}
        placeholder={placeholder}
        style={inputStyle}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            onSearch && onSearch(value);
          }
        }}
        onFocus={e => setIsFocus(true)}
        onBlur={e => setIsFocus(false)}
      />
      {value.trim().length > 0 ? (
        <Icon
          onClick={() => {
            setValue('');
            onChange('');
          }}
          className="mini-del-icon"
          link={miniDelIcon}
        />
      ) : null}
    </div>
  );
}
MiniSearchInput.defaultProps = {
  clearable: true,
  onChange: nfn
};
MiniSearchInput.propTypes = {
  /** 默认值，必须是options中的value的值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func,
  /** 搜索回调 */
  onSearch: PropTypes.func
};
export default React.memo(MiniSearchInput);
