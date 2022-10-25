import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import calendarIcon from './images/calendar.svg';
import { DatePicker as BaseDatePicker, ConfigProvider } from 'antd';
import moment from 'moment';
import { ranges, getStartAndEndTime } from './constant';
import zhCN from 'antd/lib/locale/zh_CN';
import { nfn } from '../../common';
import { useControlledInputs } from '../../common/hooks';
import { getDefaultPortalSelector } from '../../common/portalHelpers';
import isString from 'lodash/isString';
import cx from 'classnames';

const { RangePicker: BaseRangePicker } = BaseDatePicker;
const mapDefaultToValue = (defaultValue = 'seven_days') => {
  if (Array.isArray(defaultValue)) {
    return defaultValue;
  }
  const ret = isString(defaultValue)
    ? getStartAndEndTime(defaultValue)
    : defaultValue;
  return [
    ret && ret.start ? moment(ret.start) : moment(new Date()),
    ret && ret.end ? moment(ret.end) : moment(new Date())
  ];
};
const mapValuetoValue = value => ({
  start: +value[0],
  end: +value[1]
});

/**
 * 日期区间选择器
 * 可以通过setConfig来自定义使用的组件
 * 示例：setConfig({setRangePicker: () => TimePicker.TimeRange})
 */
function RangePicker(props) {
  const {
    defaultValue,
    style,
    onChange,
    onOk,
    mini,
    placeholder,
    showTime,
    format,
    timeFormat,
    className,
    background,
    getContainer = getDefaultPortalSelector,
    ...others
  } = props;

  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    mapValueWhenChange: false
  });
  const handleOk = value => {
    const v = mapValuetoValue(value);
    setTimeout(() => {
      onOk && onOk(v);
    }, 0);
  };
  const cls = cx(className, {
    mini,
    background
  });

  return (
    <ConfigProvider locale={zhCN}>
      <BaseRangePicker
        allowClear={false}
        ranges={ranges}
        showTime={
          showTime
            ? {
                format: timeFormat
              }
            : false
        }
        style={{
          ...style,
          width: style.width
        }}
        className={cls}
        value={value}
        format={format}
        onChange={val => {
          handleChange(val);
          handleOk(val);
        }}
        suffixIcon={<Icon link={calendarIcon} fill="currentColor" />}
        getPopupContainer={getContainer()}
        {...others}
      />
    </ConfigProvider>
  );
}

RangePicker.defaultProps = {
  onChange: nfn,
  onOk: nfn,
  showTime: true,
  format: 'YYYY/MM/DD HH:mm',
  style: {},
  background: false,
  timeFormat: 'HH:mm'
};
RangePicker.propTypes = {
  /**
   * 两种方式的默认值
   * 1: string : [
   *   "one_hour",
   *   "twenty\_four_hours",
   *   "today",
   *   "seven_days",
   *   "thirty_days"
   * ]中的一种,
   * 2: {
   *   start, //时间戳
   *   end //时间戳
   * }
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.oneOf([
      'one_hour',
      'twenty_four_hours',
      'today',
      'seven_days',
      'thirty_days'
    ]),
    PropTypes.shape({
      start: PropTypes.number,
      end: PropTypes.number
    })
  ]),
  /** 回调，传入的值{ start, end } */
  onChange: PropTypes.func,
  /** 小时，分钟，秒时间的格式化 YYYY/MM/DD HH:mm */
  timeFormat: PropTypes.string
};

export default RangePicker;
