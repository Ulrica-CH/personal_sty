import React, { Component } from 'react';
import { Range as RcRange } from 'rc-slider';
import handle from './handle';
import { config } from '../../common/config';
import cx from 'classnames';

import PropTypes from 'prop-types';

export default class Range extends Component {
  render() {
    const {
      defaultValue,
      value,
      pushable,
      onChange,
      marks,
      step,
      unit,
      hideStepLabel,
      style,
      trackStyle,
      railStyle,
      activeDotStyle,
      handleStyle,
      draggableTrack,
      onAfterChange,
      min,
      max,
      ...others
    } = this.props;

    const classnames = cx(`${config.prefixCls}slider-wrapper`);
    return (
      <div className={classnames} style={style}>
        <RcRange
          trackStyle={trackStyle}
          railStyle={railStyle}
          dotStyle={activeDotStyle}
          marks={marks}
          handle={props =>
            handle(props, { unit: unit, hideStepLabel: hideStepLabel })
          }
          onChange={onChange}
          onAfterChange={onAfterChange}
          defaultValue={defaultValue}
          allowCross={false}
          pushable={pushable}
          value={value}
          step={step}
          max={max}
          min={min}
          draggableTrack={draggableTrack}
          handleStyle={handleStyle}
          {...others}
        />
      </div>
    );
  }
}

Range.defaultProps = {
  defaultValue: [0, 0],
  pushable: 10,
  unit: '%',
  step: 1,
  hideStepLabel: false,
  draggableTrack: false,
  style: {},
  trackStyle: [
    { backgroundColor: '#ea3a3a', height: 3 },
    { backgroundColor: '#ea3a3a', height: 3 }
  ],
  railStyle: { backgroundColor: '#d6dce7', height: 3 },
  activeDotStyle: { borderColor: '#ea3a3a' },
  handleStyle: [
    {
      borderColor: '#ea3a3a',
      height: 14,
      width: 14,
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0)'
    },
    {
      borderColor: '#ea3a3a',
      height: 14,
      width: 14,
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0)'
    }
  ],
  onChange: () => {}
};

Range.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  /** 当前值 */
  value: PropTypes.arrayOf(PropTypes.number),
  /** 使用的单位 */
  unit: PropTypes.string.isRequired,
  /** 触发事件 */
  onChange: PropTypes.func.isRequired,
  /** 是否隐藏label值 */
  hideStepLabel: PropTypes.bool.isRequired,
  /** 设定标记 */
  marks: PropTypes.object,
  /** 每次移动的距离  */
  step: PropTypes.number,
  /** slider外层盒子的样式 */
  style: PropTypes.object,
  /** 是否可滑动 */
  pushable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /** 设置圆点左侧轨道样式 */
  trackStyle: PropTypes.arrayOf(PropTypes.object),
  /** 设置圆点右侧轨道样式 */
  railStyle: PropTypes.object,
  /** 设置标记的样式 */
  activeDotStyle: PropTypes.object,
  /** 设置滑动圆点的样式 */
  handleStyle: PropTypes.arrayOf(PropTypes.object)
};
