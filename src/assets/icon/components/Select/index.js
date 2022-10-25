/*
 * @Author: wangweixin
 * @Date: 2018-01-18 17:52:04
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-10-22 13:59:26
 */
import React, { useState, useRef, useCallback, useMemo, Fragment } from 'react';
import classNames from 'classnames';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
// import lowerCase from 'lodash/lowerCase';

import Input from './Input';
import Options from './Options';
import PropTypes from 'prop-types';
import {
  useControlledInputs,
  useDefault,
  useDropdownPosition
} from '../../common/hooks';
import { nfn } from '../../common';
import { getDefaultPortalSelector } from '../../common/portalHelpers';
import { map } from 'lodash';
import { config } from '../../common/config';
import ContainerDimensions from 'react-container-dimensions';

// 设置默认显示的defaultValue
const mapDefaultToValue = (value, props) => {
  const { multi, options } = props;
  // 没传
  if (value === undefined) {
    return multi ? [] : '';
  }
  return multi
    ? options.filter(item => value.indexOf(item.value) >= 0)
    : options.filter(item => item.value === value)[0];
};
const mapValuetoValue = (value, props) => {
  const { multi } = props;
  return multi ? value.map(item => item.value) : value.value;
};
export default function Select({
  prefixCls,
  defaultValue: preDefaultValue,
  onChange: preOnChange,
  options: preOptitons,
  optionsMaxHeight,
  optionsZIndex,
  hasError: error,
  theme,
  label,
  multi,
  placeholder,
  disabled,
  mini,
  iconId,
  radius,
  inline,
  background,
  clearable,
  className,
  style,
  maxWidth,
  inputProps,
  onFocus,
  onBlur,
  valueColor,
  getContainer: customGetContainer,
  ItemRender,
  itemLabel,
  itemLabelType,
  emptyDesc,
  virtualList,
  editAble,
  selectAll,
  selectAllIsEmpty,
  group,
  groupRender,
  stopPressBack,
  defaultShowOption
}) {
  const [groupList, setGroupList] = useState({});
  if (itemLabelType) {
    console.warn(
      'Select itemLabelType目前已经不在使用，使用itemLabel(Boolean)代替'
    );
  }
  if (!itemLabel) itemLabel = !!itemLabelType;
  if (multi) clearable = multi;
  const options = useMemo(() => {
    if (isEmpty(preOptitons)) return [];
    if (group) {
      let keyMap = {};
      preOptitons.forEach(x => {
        if (x.group) keyMap[x.group] = true;
      });
      setGroupList(keyMap);
    }
    if (multi && selectAll) {
      return [{ label: '全部', value: 'tbfeSelectAll' }, ...preOptitons];
    }
    return preOptitons;
  }, [preOptitons]);
  const onChange = useMemo(() => {
    if (multi && selectAll) {
      return val => {
        if (selectAllIsEmpty && val.length === preOptitons.length)
          return preOnChange([]);
        preOnChange(filter(val, x => x !== 'tbfeSelectAll'));
      };
    }
    return preOnChange;
  }, [preOnChange]);
  const prefix = prefixCls || config.prefixCls;
  const defaultValue = useMemo(() => {
    return selectAllIsEmpty && multi && isEmpty(preDefaultValue)
      ? map(preOptitons, 'value')
      : preDefaultValue;
  }, [preDefaultValue]);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    mapValueWhenChange: false,
    props: {
      multi,
      options
    }
  });
  const [awayClass] = useState('awayClass' + Math.random());
  // 是否展示选项
  const [showOption, setShow] = useState(defaultShowOption);
  const [resultOptions, setOptions] = useDefault(options);
  // 输入的值, 在select中对应为filter
  const [filterItem, setFilter] = useState('');
  // 当前focus的选项，用户回车时，会选中该选项
  const [focusItem, setFocusItem] = useState(undefined);
  // 是否正在操控select
  const [isFocus, setFocus] = useState(false);

  const getContainer = customGetContainer || getDefaultPortalSelector();

  const ref = useRef();
  const overlayRef = useRef();
  const [position, updatePosition] = useDropdownPosition(
    ref,
    getContainer,
    overlayRef,
    null,
    { mgt: 5, mgb: 2 }
  );
  const setOptionShow = useCallback(show => {
    if (show) {
      updatePosition();
    }
    setShow(show);
  }, []);

  let isBlurKey = false;

  const onClickAway = useCallback(e => {
    let key = false;
    if (e.path) {
      map(e.path, dom => {
        if (dom && dom.className && typeof dom.className === 'string') {
          if (dom.className.indexOf(awayClass) > -1) {
            key = true;
            isBlurKey = true;
          }
        }
      });
    }
    if (key) return;
    setOptionShow(false);
    setFocus(false);

    if (isBlurKey) {
      isBlurKey = false;
      onBlur();
    }
  }, []);

  /**
   * 获取最新的options(会根据filter和多选的值改变)
   * @param {*} filterItem 当前的filter
   * @param {*} currentValue 针对于多选，会根据选中结果进行过滤
   */
  const getResultOptions = (filterItem = '', currentValue) => {
    // 去除过滤相同选项的功能
    // const resultOptions = multi
    //   ? filter(options, item => !includes(currentValue || value, item))
    //   : options;

    if (filterItem === '') {
      return options;
    }

    return filter(
      options,
      item =>
        // lodash 的lowerCase  大小写混写会有问题
        includes(item.label.toLowerCase(), filterItem.toLowerCase()) ||
        includes((item.value + '').toLowerCase(), filterItem.toLowerCase())
    );
  };

  /**
   * 展示下拉菜单
   * 会更新focusItem
   */
  const showOptionsWrap = () => {
    setFocusItem(undefined);
    setOptionShow(true);
    setFocus(true);
    onFocus();
  };

  /**
   * fitler改变的回调
   * 会更新options和focusItem
   */
  const handleFilterChange = (filterItem, currentValue) => {
    const resultOptions = getResultOptions(filterItem, currentValue);
    setFilter(filterItem);
    setOptions(resultOptions);
    // setFocusItem(resultOptions[0]);
  };

  // 选中值时的回调
  const handleSelectChange = (val, remove, hide = true) => {
    if (multi) {
      let resultVal = [];
      if (val.value === 'tbfeSelectAll') {
        resultVal = !remove ? [...preOptitons] : [];
      } else if (isEmpty(val)) {
        resultVal = [];
      } else if (remove) {
        resultVal = filter(value, item => !isEqual(val, item));
      } else {
        resultVal = [...value, val];
      }
      handleChange(resultVal);
      handleFilterChange('', resultVal);
    } else {
      handleChange(val);
      handleFilterChange('');
    }
    if (hide) {
      setOptionShow(false);
    }
  };

  /**
   * 敲击回车时，认定选中当前focus的值
   */
  const onPressEnter = () => {
    if (!showOption || focusItem === undefined) {
      if (editAble && filterItem) {
        if (multi) {
          let resultVal;
          resultVal = [...value, { label: filterItem, value: filterItem }];
          handleChange(resultVal);
          handleFilterChange('', resultVal);
        } else {
          handleChange({ label: filterItem, value: filterItem });
          handleFilterChange('');
        }
        setShow(false);
      }
      return;
    }
    if (focusItem.disabled) {
      return;
    }
    handleSelectChange(focusItem);
    setOptionShow(false);
  };

  /**
   * 敲击后退时，清空值
   */
  const onPressBack = () => {
    if (stopPressBack) return;
    // 单选时，清空
    if (!multi && !isEmpty(value)) {
      handleSelectChange({}, false, false);
    }
    if (multi && !isEmpty(value)) {
      handleSelectChange(last(value), true);
    }
  };

  const classes = classNames(`${prefix}select`, className, theme, {
    multi,
    error,
    disabled,
    mini,
    radius,
    background,
    'is-open': showOption,
    'has-value': get(value, 'length') || get(value, 'value') !== undefined
  });

  const getContainerWithRef = useCallback(() => {
    return (getContainer && getContainer(ref.current)) || document.body;
  }, [getContainer]);

  return (
    <div
      className={`${classes} ${awayClass}`}
      style={{ maxWidth: maxWidth, ...style }}
      ref={ref}
    >
      <Input
        disabled={disabled}
        label={label}
        multi={multi}
        clearable={clearable}
        options={options}
        currentValue={value}
        filter={filterItem}
        onChange={handleSelectChange}
        onInputChange={handleFilterChange}
        onFocus={showOptionsWrap}
        showOption={showOption}
        onPressEnter={onPressEnter}
        onPressBack={onPressBack}
        placeholder={placeholder}
        isFocus={isFocus}
        setShow={setOptionShow}
        setFocus={setFocus}
        inputProps={inputProps}
        valueColor={valueColor}
        mini={mini}
        ItemRender={ItemRender}
        itemLabel={itemLabel}
        itemLabelType={itemLabelType}
        iconId={iconId}
        prefix={prefix}
        selectAll={selectAll}
        fRef={ref}
      />
      <Options
        single
        position={position}
        mini={mini}
        inline={inline}
        value={value}
        options={resultOptions}
        optionsMaxHeight={optionsMaxHeight}
        optionsZIndex={optionsZIndex}
        show={showOption}
        multi={multi}
        handleItemClick={handleSelectChange}
        filterItem={filterItem}
        focusItem={focusItem}
        setFocusItem={setFocusItem}
        getContainer={getContainerWithRef}
        onClickAway={onClickAway}
        prefix={prefix}
        emptyDesc={emptyDesc}
        virtualList={virtualList}
        editAble={editAble}
        selectAll={selectAll}
        groupList={groupList}
        group={group}
        groupRender={groupRender}
        overlayRef={overlayRef}
      />
    </div>
  );
}
Select.defaultProps = {
  theme: 'default',
  clearable: true,
  mini: false,
  radius: true,
  background: false,
  valueColor: '',
  onChange: nfn,
  onFocus: nfn,
  onBlur: nfn,
  emptyDesc: '没有可选项',
  virtualList: false,
  defaultShowOption: false,
  selectAllIsEmpty: config.selectAllIsEmpty
};
Select.propTypes = {
  /** 是否是多选 */
  multi: PropTypes.bool,
  /** 是否默认展示浮层 */
  defaultShowOption: PropTypes.bool,
  /** 标签 */
  label: PropTypes.node,
  /** 选项 {label:'标签',value:'值'} */
  options: PropTypes.array,
  /** 选项组最高高度 */
  optionsMaxHeight: PropTypes.number,
  /** 选项组zIndex高度 */
  optionsZIndex: PropTypes.number,
  /** 错误状态 */
  hasError: PropTypes.bool,
  /** disabled状态 */
  disabled: PropTypes.bool,
  /** 是否可清空 */
  clearable: PropTypes.bool,
  /** 是否带背景颜色 */
  background: PropTypes.bool,
  /** 是否展示圆角 */
  radius: PropTypes.bool,
  /** 下拉箭头id */
  iconId: PropTypes.string,
  /** 默认值，必须是options中的value的值 */
  defaultValue: PropTypes.any,
  /** change回调 */
  onChange: PropTypes.func,
  /** 可选主题颜色 default, white */
  theme: PropTypes.string,
  /** 多选值的背景颜色 */
  valueColor: PropTypes.string,
  /** 小号 */
  mini: PropTypes.bool,
  /** 是否节点中显示 */
  inline: PropTypes.bool,
  /** 传给select中input的props */
  inputProps: PropTypes.object,
  /** 入焦回调 */
  onFocus: PropTypes.func,
  /** 出焦回调 */
  onBlur: PropTypes.func,
  /** 获取容器fun */
  getContainer: PropTypes.func,
  /** 选项框内自定义的选项结构 (中间删除部分需要设置data-delete) **/
  ItemRender: PropTypes.func,
  /** 是否将已选中显示为标签形态 **/
  itemLabel: PropTypes.bool,
  /** 选项为空时的展示 */
  emptyDesc: PropTypes.any,
  /**是否支持虚拟列表 */
  virtualList: PropTypes.bool,
  /**是否支持强制输入 */
  editAble: PropTypes.bool,
  /** 多选 选择全部 多选时有效 **/
  selectAll: PropTypes.bool,
  /** 多选 选择全部类型为空数组 多选时有效 **/
  selectAllIsEmpty: PropTypes.bool,
  /** 选项框最大宽度 */
  maxWidth: PropTypes.number,
  /** 是否开启分组 **/
  group: PropTypes.bool,
  /** 自定义分组标题结构(group,index) **/
  groupRender: PropTypes.func,
  /** 阻止删除键 **/
  stopPressBack: PropTypes.bool
};
