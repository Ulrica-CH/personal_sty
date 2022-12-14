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
  /** ????????? */
  defaultValue: PropTypes.any,
  /** ??????????????? */
  mini: PropTypes.bool,
  /** ???????????? */
  disabled: PropTypes.bool,
  /** ???????????? */
  hasError: PropTypes.bool,
  /** ?????????????????? */
  inputStyle: PropTypes.object,
  /** ????????????????????? */
  background: PropTypes.bool,
  /** ??????????????? */
  inputWidth: PropTypes.number,
  /** change?????? */
  onChange: PropTypes.func,
  /** ???????????? */
  onSearch: PropTypes.func,
  /** ???????????? */
  onKeyDown: PropTypes.func,
  /** ????????? */
  clearable: PropTypes.bool,
  /** ??????mini???????????????button?????? */
  withButton: PropTypes.bool,
  /** ????????????????????????????????? ??????buttonType = primary */
  buttonType: PropTypes.string,
  /** ???????????????????????? */
  showSearchIcon: PropTypes.bool,
  /** ?????????????????? */
  addon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** input?????? ???: 'number' */
  inputType: PropTypes.string
};
export default React.memo(SearchInput);
