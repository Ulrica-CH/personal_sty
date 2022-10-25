import React, { useState, Fragment, useCallback, memo } from 'react';
import Radio from '../Radio';
import Dropdown from '../Dropdown';
import PropTypes from 'prop-types';
import Button from '../Button';
import CheckboxFilter from './CheckboxFilter';
import Duration from './Duration';
import Icon from '../Icon';
import { filter } from 'lodash';

import filterOptions, { OptionLabel } from './FilterOptions';
import filterIcon from './images/quick-filter-icon.svg';

const { RadioGroup } = Radio;

function getFilterItemName(option, value) {
  let filterArr = option.filter(item => value.includes(item.value));
  if (
    filterArr.length === 0 ||
    (option.length > 1 && filterArr.length === option.length)
  ) {
    return '';
  } else {
    return filterArr.map(i => i.label).join(',');
  }
}

function Overlay(props) {
  const {
    options,
    onReset,
    valueObj,
    optionConfig,
    onChangeItem,
    optionFilters,
    customOptions,
    customOptionsPos,
    submit
  } = props;
  const { time_range } = valueObj;

  return (
    <div className="quick-filter-comp-overlay">
      {customOptionsPos === 'prepend' ? (
        <Fragment>
          {customOptions.map((item, index) => {
            return (
              <div key={index}>
                <div className="quick-filter-comp-group">
                  <div className="group-title">
                    <div className="title">{item.label}</div>
                  </div>
                  <div>{item.render()}</div>
                </div>
              </div>
            );
          })}
        </Fragment>
      ) : null}
      {options.map(item => {
        if (item === 'time_range') {
          return (
            <div className="time-group" key={item}>
              <div className="time-group-title">时间</div>
              <RadioGroup
                defaultValue={time_range}
                onChange={val => onChangeItem('time_range', val)}
              >
                {filterOptions.time_range.map((item, index) => (
                  <Radio
                    key={index}
                    label={item.label}
                    value={item.value}
                    defaultChecked={time_range === item.value}
                  />
                ))}
              </RadioGroup>
            </div>
          );
        } else if (item === 'duration') {
          return (
            <Duration onChange={onChangeItem} valueObj={valueObj.duration} />
          );
        } else {
          const options = filterOptions[item];

          const filterFn = filter(optionFilters, d => d.type === item)[0] || {
            fn: d => true
          };

          const resultOptions = options.filter(d => filterFn.fn(d));

          return (
            <CheckboxFilter
              key={item}
              defaultValue={valueObj[item]}
              options={resultOptions}
              dataKey={item}
              config={optionConfig[item]}
              onChange={onChangeItem}
              label={OptionLabel[item]}
            />
          );
        }
      })}
      {customOptionsPos === 'append' ? (
        <Fragment>
          {customOptions.map(item => {
            return (
              <div key={item.label}>
                <div className="quick-filter-comp-group">
                  <div className="group-title">
                    <div className="title">{item.label}</div>
                  </div>
                  <div>{item.render()}</div>
                </div>
              </div>
            );
          })}
        </Fragment>
      ) : null}
      <div className="filter-diag-oper">
        <Button type="white" className="mini" onClick={onReset}>
          重置
        </Button>
        <Button type="primary" className="mini" onClick={submit}>
          提交
        </Button>
      </div>
    </div>
  );
}

function QuickFilter(props) {
  const [showDropDown, setShowDropDown] = useState(false);
  const {
    valueObj,
    options,
    onSubmit,
    customOptions,
    customOptionsSelectedFn,
    optionFilters,
    align
  } = props;
  const isDefaultFilter = () => {
    let isDefault = true;
    for (var i = 0; i < options.length; i++) {
      let key = options[i];
      if (key === 'time_range') {
        if (valueObj[key] !== 'seven_days') {
          isDefault = false;
          break;
        }
      } else {
        if (valueObj[key].length !== 0) {
          isDefault = false;
          break;
        }
      }
    }
    return isDefault;
  };

  const submit = useCallback(() => {
    setShowDropDown(false);
    onSubmit();
  }, [onSubmit]);
  const getFilterName = () => {
    let optionNameList = options
      .filter(i => i !== 'time_range')
      .map(item => {
        const options = filterOptions[item];
        const filterFn = filter(
          optionFilters,
          item => item.type === item
        )[0] || { fn: d => true };

        return {
          option: options.filter(filterFn.fn),
          value: valueObj[item]
        };
      })
      .map(item => getFilterItemName(item.option, item.value))
      .filter(i => i !== '');

    let customOptionsSelectedList;
    let appendStr;
    if (customOptions.length > 0) {
      customOptionsSelectedList = customOptionsSelectedFn(valueObj);
      appendStr =
        optionNameList.concat(customOptionsSelectedList).join('-') || '全部';
    } else {
      appendStr = optionNameList.join('-') || '全部';
    }

    if (options.includes('time_range')) {
      appendStr =
        filterOptions['time_range'].filter(
          item => item.value === valueObj['time_range']
        )[0].label +
        '-' +
        appendStr;
    }
    if (options.includes('duration')) {
      const { duration } = valueObj;
      const { begin_duration, end_duration } = duration;
      appendStr =
        begin_duration +
        '小时至' +
        (end_duration > 24 ? '>24' : end_duration) +
        '小时-' +
        appendStr;
    }
    return appendStr;
  };
  console.log(filterIcon);

  return (
    <div className="quick-filter-comp">
      <Dropdown
        overlay={<Overlay submit={submit} {...props} />}
        visible={showDropDown}
        onVisibleChange={setShowDropDown}
        trigger="hover"
        overlayClassName="quick-filter-comp-overlay"
        className="dropdown"
        align={align}
      >
        <a className="dropdown-filter radius">
          {isDefaultFilter() ? (
            <Icon className="icon-filter" link={filterIcon} fill="#666666" />
          ) : (
            <Icon
              className="icon-filter"
              link={filterIcon}
              fill="$primary-color"
            />
          )}
          筛选:
          {getFilterName()}
        </a>
      </Dropdown>
    </div>
  );
}

QuickFilter.propTypes = {
  /** 筛选项, 内置设备类型[machine_type], 严重级别[severity], 黑客等级[attack_skill_level], 威胁类型[direction], 攻击阶段[phase], 攻击结果[result], 处置状态[status], 时间范围[time_range], 持续时间[duration] */
  options: PropTypes.array,
  /** 自定义筛选项 */
  customOptions: PropTypes.array,
  /** 自定义筛选项位置 */
  customOptionsPos: PropTypes.oneOf(['prepend', 'append']),
  /** 自定义筛选项选中后渲染逻辑*/
  customOptionsSelectedFn: PropTypes.func,
  /** 点击筛选项的回调事件 */
  onChangeItem: PropTypes.func,
  /** 点击重置的回调事件 */
  onReset: PropTypes.func,
  /** 点击提交的回调事件 */
  onSubmit: PropTypes.func,
  /** 选项配置, 威胁类型显示子类型、严重级别支持双列布局 {direction: {showChildren: true}, severity: {doubleColumn: true}} */
  optionConfig: PropTypes.any,
  /** 选项默认值 */
  valueObj: PropTypes.any,
  /** 选项过滤器，用于排除一些选项 */
  optionFilters: PropTypes.array
};

QuickFilter.defaultProps = {
  onChangeItem: () => {},
  optionConfig: {},
  customOptions: [],
  optionFilters: [],
  customOptionsPos: 'append',
  customOptionsSelectedFn: () => {}
};

export default memo(QuickFilter);
