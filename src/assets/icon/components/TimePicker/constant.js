import moment from 'moment';
import { config } from '../../common/config';

const locale = {
  en_US: {
    TODAY: 'today',
    ONE_HOUR: '1 hour',
    TWENTY_FOUR_HOURS: '24 hours',
    SEVEN_DAYS: '7 days',
    THIRTY_DAYS: '30 days'
  },
  zh_CN: {
    TODAY: '今天',
    ONE_HOUR: '1小时',
    TWENTY_FOUR_HOURS: '24小时',
    SEVEN_DAYS: '7天',
    THIRTY_DAYS: '30天'
  }
};

export const timeRange = currentLocale => {
  const cur = locale[currentLocale];
  return [
    {
      name: cur.TODAY,
      value: 'today'
    },
    {
      name: cur.ONE_HOUR,
      value: 'one_hour'
    },
    {
      name: cur.TWENTY_FOUR_HOURS,
      value: 'twenty_four_hours'
    },
    {
      name: cur.SEVEN_DAYS,
      value: 'seven_days'
    },
    {
      name: cur.THIRTY_DAYS,
      value: 'thirty_days'
    }
  ];
};

export const btnTimeRange = (
  currentLocale,
  max7d = false,
  withToday = false
) => {
  let arr = timeRange(currentLocale).slice(2, max7d ? -1 : undefined);
  if (withToday) {
    arr.unshift(timeRange(currentLocale)[0]);
  }
  return arr.map(item => ({
    label: item.name,
    value: item.value
  }));
};

export const getStartAndEndTime = rangeType => {
  if (typeof config.timeRangeResolver === 'function') {
    return config.timeRangeResolver(rangeType);
  }
  const now = new Date();
  const curHour = now.getHours();
  const curMinute = now.getMinutes();
  const cur = moment({ hour: curHour });
  const start = cur.clone().add(1, 'hours');
  const nextHour = cur.clone().add(1, 'hours');
  switch (rangeType) {
    case 'one_hour':
      const nextMinute = moment({ hour: curHour, minute: curMinute }).add(
        1,
        'minutes'
      );
      return {
        start: new Date(nextMinute.clone().subtract(1, 'hours')),
        end: new Date(nextMinute)
      };
    case 'twenty_four_hours':
      return {
        start: new Date(start.subtract(1, 'days')),
        end: new Date(nextHour)
      };
    case 'today':
      return {
        start: new Date(
          cur
            .hour(0)
            .minute(0)
            .second(0)
        ),
        end: moment().endOf('day')
      };
    case 'seven_days':
      return {
        start: new Date(start.subtract(7, 'days')),
        end: new Date(nextHour)
      };
    case 'thirty_days':
      return {
        start: new Date(start.subtract(30, 'days')),
        end: new Date(nextHour)
      };

    default:
      return {};
  }
};

const wrapMoment = ({ start, end }) => {
  return [moment(start), moment(end)];
};
export const ranges = {
  '1小时': () => wrapMoment(getStartAndEndTime('one_hour')),
  '24小时': () => wrapMoment(getStartAndEndTime('twenty_four_hours')),
  今天: () => wrapMoment(getStartAndEndTime('today')),
  最近7天: () => wrapMoment(getStartAndEndTime('seven_days')),
  最近30天: () => wrapMoment(getStartAndEndTime('thirty_days'))
};
