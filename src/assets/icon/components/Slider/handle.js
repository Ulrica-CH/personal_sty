import React from 'react';
import RcSlider from 'rc-slider';
import Popover from '../Popover';

const handle = (props, otherProps) => {
  const Handle = RcSlider.Handle;
  const { value, dragging, index, ...restProps } = props;
  const { hideStepLabel, unit } = otherProps;
  return (
    <div>
      <Handle value={value} {...restProps} />
      {!hideStepLabel ? (
        <div className="slider-thumb-value" style={{ left: value + '%' }}>
          <div className="slider-thumb-arrow"></div>
          <div>
            {value}
            {unit ? unit : ''}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default handle;
