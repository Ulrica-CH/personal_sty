import React, { memo, useCallback, useEffect, useState } from 'react';
import Range from '../Slider/range';
const step = 4;
function Duration({ onChange, valueObj }) {
  const { begin_duration, end_duration } = valueObj;
  const [rangeVal, setRangeVal] = useState([
    begin_duration * step,
    end_duration * step
  ]);
  useEffect(() => {
    setRangeVal([begin_duration * step, end_duration * step]);
  }, [valueObj]);
  const onRangeChange = useCallback(
    val => {
      let [begin, end] = val;
      if (begin < step) {
        begin = 0;
      } else if (begin > 24 * step) {
        begin = 24 * step;
      }
      if (end > 24 * step) {
        end = 100;
      } else if (end < step) {
        end = step;
      }
      setRangeVal([begin, end]);
      onChange('duration', {
        begin_duration: begin / step,
        end_duration: end / step
      });
    },
    [setRangeVal, onChange]
  );
  const onReset = useCallback(() => {
    onRangeChange([begin_duration * step, end_duration * step]);
  }, []);
  return (
    <div className="quick-filter-comp-group">
      <div className="group-title">
        持续时间
        <div>
          <span className="all" onClick={onReset}>
            重置
          </span>
        </div>
      </div>
      <div>
        {rangeVal[0] / step} 小时 至{' '}
        {rangeVal[1] > 96 ? '>24' : rangeVal[1] / step} 小时
      </div>
      <Range
        defaultValue={[begin_duration * step, end_duration * step]}
        value={rangeVal}
        step={step}
        hideStepLabel={true}
        pushable={true}
        onChange={onRangeChange}
      />
      <div className="duration-footer">
        <div>0小时</div>
        <div>>24小时</div>
      </div>
    </div>
  );
}

export default memo(Duration);
