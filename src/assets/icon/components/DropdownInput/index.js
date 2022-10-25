import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input';
import DropDown from '../Dropdown';
import Button from '../Button';
import { nfn } from '../../common';

import Icon from '../Icon';
import closeIcon from './images/close.svg';
import { config } from '../../common/config';

const Overlay = ({ prefix, title, onChange, close, onEnsure, value, mini }) => (
  <div className={`${prefix}dropdown-input-content`}>
    <h3 className="checkbox-select-content-title">{title}</h3>
    <Input defaultValue={value} onChange={onChange} mini={mini} />
    <div className={`${prefix}dropdown-input-button-wrap`}>
      <Button mini type="white" className="mgr10" onClick={close}>
        关闭
      </Button>
      <Button mini type="primary" onClick={onEnsure}>
        确定
      </Button>
    </div>
  </div>
);

/**
 * 下拉输入框
 */
export default function DropdownInput(props) {
  const {
    defaultValue,
    defaultOpen,
    onChange,
    title,
    onDelete,
    disabled,
    trigger,
    className,
    style,
    mini,
    inline,
    getContainer,
    prefixCls,
    align,
    space = { mgt: 5, mgb: 5 }
  } = props;

  const prefix = prefixCls || config.prefixCls;
  const [value, setValue] = useState(defaultValue);
  const [result, setResult] = useState(defaultValue);
  const [visible, setVisible] = useState(defaultOpen);

  useEffect(() => {
    if (value !== defaultValue) {
      setValue(defaultValue);
      setResult(defaultValue);
    }
  }, [defaultValue]);

  const handleValueChange = useCallback(v => setValue(v), []);

  const handleEnsure = useCallback(() => {
    onChange(value);
    setResult(value);
    setVisible(false);
  }, [onChange, value]);

  const handleClear = () => {
    setValue('');
    if (onDelete) {
      onDelete();
    }
  };

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const classes = classNames(
    'checkbox-select-wrap',
    {
      'can-delete': onDelete
    },
    className
  );
  const selectClasses = classNames(`${prefix}dropdown-input-trigger`, {
    mini: mini
  });

  return (
    <DropDown
      visible={visible}
      onVisibleChange={setVisible}
      trigger={trigger}
      className={classes}
      disabled={disabled}
      inline={inline}
      style={style}
      getContainer={getContainer}
      align={align}
      space={space}
      overlay={
        <Overlay
          prefix={prefix}
          title={title}
          mini={mini}
          close={handleClose}
          onChange={handleValueChange}
          onEnsure={handleEnsure}
          value={value}
        />
      }
    >
      <div className={selectClasses}>
        <span className={`${prefix}dropdown-input-label`}>{title}</span>
        <p className={`${prefix}dropdown-input-value`} title={result}>
          {result}
        </p>
        {onDelete ? (
          <Icon className="close-icon" link={closeIcon} onClick={handleClear} />
        ) : (
          ''
        )}
      </div>
    </DropDown>
  );
}

DropdownInput.defaultProps = {
  onChange: nfn,
  defaultOpen: false,
  mini: false,
  clearable: true
};

DropdownInput.propTypes = {
  /** 是否默认打开 */
  defaultOpen: PropTypes.bool,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 是否mini */
  mini: PropTypes.bool,
  /** 触发显示的方式 */
  trigger: PropTypes.oneOf(['click', 'hover']),
  /** 标题 */
  title: PropTypes.string,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 更改值时的回调 */
  onChange: PropTypes.func,
  onDelete: PropTypes.oneOfType([PropTypes.func]),
  /** 输入区域对齐方式，默认左对齐 */
  align: PropTypes.string
};
