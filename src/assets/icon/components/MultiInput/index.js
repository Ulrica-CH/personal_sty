/*
 * @Author: wangweixin
 * @Date: 2018-01-18 17:52:04
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-10-12 19:24:03
 */
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';
import map from 'lodash/map';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import toString from 'lodash/toString';

import Input from '../Select/Input';
import { useControlledInputs, useDropdownPosition } from '../../common/hooks';
import { nfn } from '../../common';
import Item from '../Item';
import { config } from '../../common/config';
import { getDefaultPortalSelector } from '../../common/portalHelpers';

// 设置默认显示的defaultValue
const mapDefaultToValue = (defaultValue = []) => defaultValue.map(toString);
const mapValuetoValue = value => value;

export default function MultiInput({
  defaultValue,
  onChange,
  onInput,
  hasError: error,
  disabled,
  className,
  background,
  style,
  radius,
  mini,
  placeholder,
  hintTip,
  hintContent,
  clearable,
  prefixCls,
  itemLabelType,
  ItemRender,
  getContainer: customGetContainer,
  space = { mgt: 5, mgb: 5 },
  contentRenderFn
}) {
  const prefix = prefixCls || config.prefixCls;
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue
  });
  // 展示提示
  const [showTip, setShowTip] = useState(false);
  // 输入的值, 在select中对应为filter
  const [filterItem, setFilter] = useState('');
  // 是否正在操控select
  const [isFocus, setFocus] = useState(false);
  const ref = useRef();
  const overlayRef = useRef();
  const getContainer = customGetContainer || getDefaultPortalSelector();
  console.log(space, '===');
  const [position, updatePosition] = useDropdownPosition(
    ref,
    getContainer,
    overlayRef,
    '',
    space
  );

  const setTipShow = show => {
    if (show) {
      updatePosition();
    }
    setShowTip(show);
  };

  const onWindowClick = () => {
    setTipShow(false);
    setFocus(false);
  };
  useEffect(() => {
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, []);

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);

  /**
   * fitler改变的回调
   */
  const handleFilterChange = filterItem => {
    onInput && onInput(filterItem);
    setFilter(filterItem);
    if (isEmpty(filterItem)) {
      return setTipShow(false);
    }
    // 当前的值不包含输入的值时，才提示可以按回车进行确定
    if (!includes(value, filterItem)) {
      setTipShow(true);
    } else {
      setTipShow(false);
    }
  };

  // 值更改时的回调
  const handleSelectChange = (val, remove) => {
    let resultVal;
    // val为空时，将内容清空
    if (val === undefined) {
      resultVal = [];
    } else if (remove) {
      // 移除元素
      resultVal = filter(value, item => !isEqual(val, item));
    } else {
      resultVal = [...value, val];
    }
    handleChange(resultVal);
    handleFilterChange('', resultVal);
  };

  /**
   * 敲击回车时，认定选中当前focus的值
   */
  const onPressEnter = () => {
    if (includes(value, filterItem)) return;
    if (filterItem === '' || filterItem === undefined || !filterItem.trim())
      return;
    handleSelectChange(filterItem.trim());
    setTipShow(false);
  };

  /**
   * 敲击后退时，清空值
   */
  const onPressBack = () => {
    handleSelectChange(last(value), true);
  };

  const onValueChange = (value, remove) => {
    handleSelectChange(get(value, 'value'), remove);
  };

  const classes = classNames(`${prefix}select`, 'no-arrow', className, {
    error,
    disabled,
    mini,
    background,
    radius,
    'is-open': isFocus,
    'has-value': get(value, 'length')
  });

  return (
    <div className={classes} style={style} ref={ref}>
      <Input
        multi
        disabled={disabled}
        clearable={clearable}
        currentValue={map(value, item => ({
          label: item,
          value: item
        }))}
        inputMatch
        placeholder={placeholder}
        filter={filterItem}
        onChange={onValueChange}
        onInputChange={handleFilterChange}
        onFocus={onFocus}
        showOption={showTip}
        onPressEnter={onPressEnter}
        onPressBack={onPressBack}
        isFocus={isFocus}
        inputProps={{ onBlur }}
        itemLabelType={itemLabelType}
        ItemRender={ItemRender}
        contentRenderFn={contentRenderFn}
      />
      {createPortal(
        <Item show={showTip && hintTip}>
          <div style={position} className="multi-input-tip" ref={overlayRef}>
            {hintContent}
          </div>
        </Item>,
        document.body
      )}
    </div>
  );
}
MultiInput.defaultProps = {
  onChange: nfn,
  background: false,
  radius: true,
  clearable: true,
  mini: false,
  hintTip: true,
  hintContent: '逗号或回车确定',
  placeholder: '请输入按回车确定'
};
MultiInput.propTypes = {
  /** 错误状态 */
  hasError: PropTypes.bool,
  /** 是否可以清空 */
  clearable: PropTypes.bool,
  /** disabled状态 */
  disabled: PropTypes.bool,
  /** 默认值，必须是options中的value的值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func,
  /** 是否带背景颜色 */
  background: PropTypes.bool,
  /** 是否展示圆角 */
  radius: PropTypes.bool,
  /** 小号 */
  mini: PropTypes.bool,
  /** 是否开启输入提示 */
  hintTip: PropTypes.bool,
  /** 输入提示内容 */
  hintContent: PropTypes.string,
  /** 开启label模式,并选择需要的type类型,需参考label的type */
  itemLabelType: PropTypes.string,
  /** 选项框内自定义的选项结构 **/
  ItemRender: PropTypes.func,
  /** 输入时回调 */
  onInput: PropTypes.func,
  /** 选项框内完全自定义的渲染结构 */
  contentRenderFn: PropTypes.func
};
