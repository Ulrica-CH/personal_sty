import React, { memo } from 'react';
import RangeBtn from './RangeBtn';
// import DateRange from './DateRangePicker'
import DateRange from './RangePicker';
import DatePicker from './DatePicker';
// 日期控件中文格式化
import moment from 'moment';
import 'moment/locale/zh-cn';
import { config } from '../../common/config';
moment.locale('zh-cn');

const RangePicker = memo(props => {
  if (config.RangePicker) {
    return <config.RangePicker {...props} />;
  }
  return <DateRange {...props} />;
});

export default {
  RangeBtn,
  DateRange: RangePicker,
  DatePicker,
  RangePicker
};
export {
  // RangeBtn,
  RangePicker as DateRange,
  DatePicker,
  RangePicker
};
