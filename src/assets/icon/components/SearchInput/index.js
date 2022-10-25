/*
 * @Author: sunxiaoshen
 * @Date: 2019-08-06
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { nfn } from '../../common';
import { config } from '../../common/config';
import { useDefault } from '../../common/hooks';
import Button from '../Button';
import Icon from '../Icon';
import Input from '../Input';
import Item from '../Item';

function SearchInput({
  defaultValue = '',
  onChange,
  onSearch,
  placeholder,
  inputStyle,
  inputWidth,
  addon,
  mini,
  hasError,
  clearable,
  showSearchIcon,
  style,
  className,
  withButton,
  background,
  buttonType,
  disabled,
  prefixCls,
  inputType
}) {
  const [value, setValue] = useDefault(defaultValue);
  const onValueChange = val => {
    setValue(val);
    onChange(val);
  };

  const classes = classNames(
    `${prefixCls || config.prefixCls}search-input`,
    className,
    {
      mini
    }
  );

  return (
    <div className={classes} style={style}>
      <Input
        type={inputType}
        defaultValue={value}
        clearable={clearable}
        mini={mini}
        isSearch={mini && !withButton && showSearchIcon}
        hasError={hasError}
        onChange={onValueChange}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          width: inputWidth || inputStyle?.width
        }}
        disabled={disabled}
        background={background}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            onSearch && onSearch(value);
          }
        }}
      />
      {addon ? (
        <span onClick={() => onSearch(value)}>{addon}</span>
      ) : (
        <Item show={!mini || withButton}>
          <Button
            width="60"
            className="mgl5"
            type={buttonType}
            disabled={disabled}
            mini={mini}
            onClick={() => onSearch(value)}
          >
            <Icon fill="#fff" stroke="#fff" type="search" />
          </Button>
        </Item>
      )}
    </div>
  );
}
SearchInput.defaultProps = {
  clearable: true,
  onChange: nfn,
  mini: false,
  onSearch: nfn,
  inputStyle: {},
  withButton: false,
  background: false,
  buttonType: 'primary',
  showSearchIcon: true
};
SearchInput.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 是否是小型 */
  mini: PropTypes.bool,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 是否出错 */
  hasError: PropTypes.bool,
  /** 输入框的样式 */
  inputStyle: PropTypes.object,
  /** 是否带背景颜色 */
  background: PropTypes.bool,
  /** 输入框宽度 */
  inputWidth: PropTypes.number,
  /** change回调 */
  onChange: PropTypes.func,
  /** 搜索回调 */
  onSearch: PropTypes.func,
  /** 键入回调 */
  onKeyDown: PropTypes.func,
  /** 可清空 */
  clearable: PropTypes.bool,
  /** 用于mini下，添加带button选项 */
  withButton: PropTypes.bool,
  /** 可以控制搜索按钮的类型 例如buttonType = primary */
  buttonType: PropTypes.string,
  /** 是否展示搜索图标 */
  showSearchIcon: PropTypes.bool,
  /** 定制搜索部件 */
  addon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** input类型 如: 'number' */
  inputType: PropTypes.string
};
export default React.memo(SearchInput);
