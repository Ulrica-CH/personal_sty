import React, { Component } from 'react';
import RcSlider from 'rc-slider';
import Range from './range';
import handle from './handle';
import cx from 'classnames';
import { config } from '../../common/config';

import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';

export default class Slider extends Component {
  render() {
    const {
      defaultValue,
      value,
      onChange,
      marks,
      step,
      unit,
      hideStepLabel,
      style,
      trackStyle,
      railStyle,
      activeDotStyle,
      handleStyle
    } = this.props;
    const classnames = cx(`${config.prefixCls}slider-wrapper`);
    return (
      <div className={classnames} style={style}>
        <RcSlider
          trackStyle={trackStyle}
          railStyle={railStyle}
          activeDotStyle={activeDotStyle}
          marks={marks}
          handle={props =>
            handle(props, { unit: unit, hideStepLabel: hideStepLabel })
          }
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          step={step}
          handleStyle={handleStyle}
        />
      </div>
    );
  }
}

Slider.defaultProps = {
  defaultValue: 0,
  unit: '%',
  step: 1,
  hideStepLabel: false,
  style: {},
  trackStyle: { backgroundColor: '#ea3a3a', height: 3 },
  railStyle: { backgroundColor: '#d6dce7', height: 3 },
  activeDotStyle: { borderColor: '#ea3a3a' },
  handleStyle: {
    borderColor: '#ea3a3a',
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0)'
  },
  onChange: () => {}
};

Slider.propTypes = {
  /** 默认值 */
  defaultValue: PropTypes.number.isRequired,
  /** 当前值 */
  value: PropTypes.number.isRequired,
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
  /** 设置圆点左侧轨道样式 */
  trackStyle: PropTypes.object,
  /** 设置圆点右侧轨道样式 */
  railStyle: PropTypes.object,
  /** 设置标记的样式 */
  activeDotStyle: PropTypes.object,
  /** 设置滑动圆点的样式 */
  handleStyle: PropTypes.object
};

Slider.Range = Range;
