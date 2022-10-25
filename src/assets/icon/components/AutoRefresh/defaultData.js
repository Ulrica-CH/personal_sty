const defaultTimeRange = [
  {
    label: '最近15分钟',
    value: 'fifteen_minutes'
  },
  {
    label: '最近2小时',
    value: 'two_hours'
  },
  {
    label: '最近24小时',
    value: 'twenty_four_hours'
  },
  {
    label: '今天',
    value: 'today'
  },
  {
    label: '最近7天',
    value: 'seven_days'
  },
  {
    label: '最近30天',
    value: 'thirty_days'
  }
];

const defaultInterval = [
  {
    label: '5秒',
    value: 5
  },
  {
    label: '15秒',
    value: 15
  },
  {
    label: '1分钟',
    value: 60
  },
  {
    label: '5分钟',
    value: 300
  },
  {
    label: '1小时',
    value: 3600
  },
  {
    label: '关闭',
    value: -1
  }
];

export { defaultInterval, defaultTimeRange };
