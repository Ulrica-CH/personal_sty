import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useControlledInputs } from '../../common/hooks';
import find from 'lodash/find';
import { nfn } from '../../common';
import { config } from '../../common/config';
import SelectWrap from '../SelectWrap';

const mapDefaultToValue = (defaultValue, props) => {
  const { listItems } = props;
  const item = find(listItems, { value: defaultValue });
  return item ? item.value : '';
};
const mapValuetoValue = value => value;

function Overlay(props) {
  const {
    listItems,
    contentClassName,
    changeValue,
    value,
    handleChange,
    mini,
    prefix,
    onClose
  } = props;
  const classes = classNames(
    { [`${prefix}dropdown-list-content`]: true },
    contentClassName
  );

  return (
    <div className={`dropdown-list-overlay ${prefix}dropdown-list-wrap`}>
      <ul className={classes}>
        {listItems
          .filter(item => !changeValue || item.value !== value)
          .map((item, index) => {
            const classes = classNames({
              'text-overflow': true,
              'dropdown-list-item': true,
              'dropdown-list-item-mini': mini,
              'dropdown-list-item-active': item.value === value,
              disabled: item.disabled
            });
            return (
              <li
                className={classes}
                key={`label-${index}`}
                onClick={() =>
                  item.disabled ? nfn : (handleChange(item.value), onClose())
                }
              >
                <div className="text-box">{item.label}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

/**
 * 在Dropdown组件上封装的list组件
 */
function DropdownList(props) {
  const {
    trigger,
    defaultValue,
    afterChange,
    changeValue,
    onChange,
    onVisibleChange,
    disabled,
    listItems,
    style,
    className,
    contentClassName,
    children,
    inline,
    stopPropagation,
    mini,
    getContainer,
    prefixCls,
    align
  } = props;

  if (afterChange) {
    console.warn('afterChange目前已经不在使用，使用changeValue代替');
  }
  const prefix = prefixCls || config.prefixCls;

  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    props
  });

  const item = find(listItems, item => item.value === value);
  const label = changeValue ? (item ? item.label : children) : children;
  const classes = classNames(
    {
      [`${prefix}dropdown-list`]: true
    },
    className
  );
  const handleItemClick = useCallback(
    value => {
      handleChange(value);
    },
    [handleChange]
  );
  return (
    <SelectWrap
      onVisibleChange={onVisibleChange}
      trigger={trigger}
      className={classes}
      disabled={disabled}
      style={{
        width: 'auto',
        ...style
      }}
      inline={inline}
      mini={mini}
      defaultValue={label}
      getContainer={getContainer}
      stopPropagation={stopPropagation}
      align={align}
      overlay={
        <Overlay
          prefix={prefix}
          listItems={listItems}
          changeValue={changeValue}
          value={value}
          contentClassName={contentClassName}
          mini={mini}
          handleChange={handleItemClick}
        />
      }
    ></SelectWrap>
  );
}

DropdownList.propTypes = {
  /** 触发展示的方式 */
  trigger: PropTypes.oneOf(['click', 'hover']),
  /** 列表内容 */
  listItems: PropTypes.array,
  /** 点击内容的回调事件 */
  onChange: PropTypes.func,
  /** 自定义class */
  className: PropTypes.string,
  /** 下拉内容自定义class */
  contentClassName: PropTypes.string,
  /** 值改变时，是否改变点击按钮的内容 */
  changeValue: PropTypes.bool,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** overlay不使用createPortal */
  inline: PropTypes.bool,
  /** 自定义样式 */
  style: PropTypes.object,
  /** 下拉定位参照物 */
  getContainer: PropTypes.func,
  /** 阻止点击冒泡 */
  stopPropagation: PropTypes.bool,
  /** 是否mini */
  mini: PropTypes.bool,
  /** 下拉内容对齐方式，默认左对齐 */
  align: PropTypes.string
};

DropdownList.defaultProps = {
  onChange: nfn,
  mini: false,
  changeValue: false
};

export default DropdownList;
