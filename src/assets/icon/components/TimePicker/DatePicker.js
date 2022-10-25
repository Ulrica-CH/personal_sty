import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';
import calendarIcon from './images/calendar.svg';
import { DatePicker as BaseDatePicker, ConfigProvider } from 'antd';
import moment from 'moment';
import zhCN from 'antd/lib/locale/zh_CN';
import { nfn } from '../../common';
import { useControlledInputs } from '../../common/hooks';
import { getDefaultPortalSelector } from '../../common/portalHelpers';

const mapDefaultToValue = defaultValue => {
  return defaultValue ? moment(defaultValue) : null;
};
const mapValuetoValue = value => +value;

/**
 * 日期选择器,
 * 修改了默认值和onChange。
 * 其他的props见文档
 * @see https://ant.design/components/date-picker-cn/
 */
function DatePicker(props) {
  const {
    defaultValue,
    onChange,
    format,
    background,
    mini,
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
  return (
    <ConfigProvider locale={zhCN}>
      <BaseDatePicker
        className={cx({ mini, background })}
        value={value}
        format={format || 'YYYY-MM-DD'}
        onChange={handleChange}
        suffixIcon={<Icon link={calendarIcon} fill="currentColor" />}
        getPopupContainer={getContainer()}
        {...others}
      />
    </ConfigProvider>
  );
}

DatePicker.defaultProps = {
  onChange: nfn
};

DatePicker.propTypes = {
  /** 默认值，时间戳 */
  defaultValue: PropTypes.number,
  /** 回调，传入的值为时间戳 */
  onChange: PropTypes.func
};

export default DatePicker;
