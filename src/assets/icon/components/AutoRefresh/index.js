import React, { useState, memo, useCallback, Fragment } from 'react';
import moment from 'moment';
import Popover from '../Popover';
import PropTypes from 'prop-types';
import Tab from '../Tab';
import TimePicker from '../TimePicker';
import Button from '../Button';
import LabelSelect from '../LabelSelect';
import arrowIconMini from '../Select/images/arrow-down-mini.svg';

import { defaultInterval, defaultTimeRange } from './defaultData';
import { useUpdateEffect } from '../../common/hooks';
import { config } from '../../common/config';
import Icon from '../Icon';

const { RangePicker } = TimePicker;
const { TabPanel } = Tab;

const timeFormatFn = (time, timeFormat) => (
  <Fragment>
    <span className="mgr5">{moment(time).format('YYYY/MM/DD')}</span>
    <span>{moment(time).format(timeFormat)}</span>
  </Fragment>
);

function AutoRefresh({
  onChange,
  interval: refresh,
  timeRange: timeRangeProp,
  timeFrom,
  timeTo,
  intervalOption,
  timeRangeOption,
  className,
  format,
  timeFormat
}) {
  const [timeRange, setTimeRange] = useState(timeRangeProp);
  const [time, setTime] = useState({ timeFrom, timeTo });
  const [interval, setInterval] = useState(refresh);
  const [overlayShow, setOverlayShow] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [tabVal, setTabVal] = useState('auto');

  const prefixCls = `${config.prefixCls}auto-refresh`;

  // 根据传入参数初始化控件时间
  const initTime = useCallback(() => {
    setInterval(refresh);
    setTimeRange(timeRangeProp);
    setTime({
      timeFrom,
      timeTo
    });
    if (!timeRangeProp) {
      setTabVal('exact');
    } else {
      setTabVal('auto');
    }
  }, [refresh, timeRangeProp, timeFrom, timeTo]);

  useUpdateEffect(() => {
    initTime();
  }, [initTime]);

  const updateTime = useCallback(val => {
    setTime({
      timeFrom: Math.round(val.start / 1000),
      timeTo: Math.round(val.end / 1000)
    });
    setTimeOpen(false);
  });

  const onOk = useCallback(val => {
    setOverlayShow(false);
    if (tabVal === 'auto' && timeRange) {
      onChange({
        timeRange,
        interval
      });
    } else {
      if (tabVal === 'auto' && !timeRange) {
        setTabVal('exact');
      }
      setTimeRange(null);
      if (time) {
        onChange({
          timeFrom: time.timeFrom,
          timeTo: time.timeTo,
          timeRange: null
        });
      }
    }
  });

  const renderOverlay = useCallback(() => (
    <div className={`${prefixCls}-overlay`} style={{ width: 500 }}>
      <Tab onChange={setTabVal} defaultActiveKey={tabVal} theme="title">
        <TabPanel header="自动刷新" keys="auto">
          <div className="option">
            <div className="option-label">时间范围</div>
            <div className="option-list">
              <LabelSelect
                mini
                showAll={false}
                onChange={setTimeRange}
                defaultValue={timeRange}
                options={timeRangeOption}
              />
            </div>
          </div>
          <div className="option">
            <div className="option-label">刷新频率</div>
            <div className="option-list">
              <LabelSelect
                mini
                showAll={false}
                disabled={!timeRange}
                onChange={value => {
                  if (timeRange) {
                    setInterval(value);
                  }
                }}
                defaultValue={interval}
                options={intervalOption}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel header="精确时间" keys="exact">
          <div className="range-wrapper">
            <RangePicker
              open={timeOpen}
              onOpenChange={setTimeOpen}
              defaultValue={{
                start: time.timeFrom * 1000,
                end: time.timeTo * 1000
              }}
              format={format}
              timeFormat={timeFormat}
              onOk={updateTime}
            />
          </div>
        </TabPanel>
      </Tab>
      <div className="footer">
        <Button
          className="mgr10"
          type="white"
          mini
          onClick={() => {
            initTime();
            setOverlayShow(false);
          }}
        >
          取消
        </Button>
        <Button type="dark" mini onClick={onOk}>
          确定
        </Button>
      </div>
    </div>
  ));

  const renderTimeRange = useCallback(() => {
    if (timeRange) {
      return (
        <span>
          <span className={`${prefixCls}-value-label`}>时间范围：</span>
          <span className={`${prefixCls}-value-value`}>
            {timeRangeOption.filter(i => i.value === timeRange)[0].label}
          </span>
        </span>
      );
    }
    return (
      <span>
        <span className={`${prefixCls}-value-label`}>时间范围：</span>
        <span className={`${prefixCls}-value-value`}>
          {timeFormatFn(time.timeFrom * 1000, timeFormat)}-
          {timeFormatFn(time.timeTo * 1000, timeFormat)}
        </span>
      </span>
    );
  });

  const onVisibleChange = useCallback(
    val => {
      if (timeOpen) return false;
      initTime();
      setOverlayShow(val);
    },
    [timeOpen, initTime]
  );

  return (
    <Popover
      content={renderOverlay()}
      trigger="click"
      position="bottom"
      withArrow={false}
      visible={overlayShow}
      overlayClassName={`${prefixCls}-content`}
      onVisibleChange={onVisibleChange}
      className={className}
    >
      <div className={`${prefixCls}-value-str`}>
        {renderTimeRange()}
        <span className="mgl10">
          <span className={`${prefixCls}-value-label`}>刷新频率：</span>
          <span className={`${prefixCls}-value-value`}>
            {intervalOption.filter(i => i.value === interval)[0].label}
          </span>
        </span>
        <span className={`${prefixCls}-value-icon-zone`}>
          <Icon link={arrowIconMini} className={`${prefixCls}-value-icon`} />
        </span>
      </div>
    </Popover>
  );
}

AutoRefresh.defaultProps = {
  className: '',
  intervalOption: defaultInterval,
  timeRangeOption: defaultTimeRange,
  timeFormat: 'HH:mm'
};

AutoRefresh.propTypes = {
  /** 刷新间隔 */
  interval: PropTypes.number,
  /** 刷新间隔选项 */
  intervalOption: PropTypes.array,
  /** 所选时间段 */
  timeRange: PropTypes.string,
  /** 时间段选项 */
  timeRangeOption: PropTypes.array,
  /** 开始时间,与timeRange互斥 */
  timeFrom: PropTypes.number,
  /** 结束时间,与timeRange互斥 */
  timeTo: PropTypes.number,
  /** 用于格式化时间,例如HH:mm:ss */
  timeFormat: PropTypes.string,
  /** 用于格式化整体时间，例如YYYY/MM/DD HH:mm */
  format: PropTypes.string,
  /** 自定义class */
  className: PropTypes.string,
  /** 修改回调函数 */
  onChange: PropTypes.func
};

export default memo(AutoRefresh);
