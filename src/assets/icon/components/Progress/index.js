import { Progress as AntProgress } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
/**
 * 进度模块
 * @see https://ant.design/components/progress-cn/
 */
export default function Progress({
  circle,
  width,
  type,
  percent,
  strokeWidth,
  trailWidth,
  height,
  strokeColor,
  style,
  ...props
}) {
  const baseWidth = () => {
    if (circle || type === 'circle') {
      return {
        strokeWidth: strokeWidth || 8,
        trailWidth: trailWidth || 8,
        width: width,
        height: height || width
      };
    }
    return {
      strokeWidth: strokeWidth || 5,
      trailWidth: trailWidth || 0,
      width: width || '100%',
      height: height || 5
    };
  };
  const progressProps = baseWidth();

  const resultType = circle ? 'circle' : type;

  return (
    <AntProgress
      percent={percent}
      type={resultType}
      strokeColor={strokeColor}
      strokeWidth={progressProps.strokeWidth}
      trailWidth={progressProps.trailWidth}
      showInfo={false}
      style={{
        width: progressProps.width,
        height: progressProps.height,
        ...style
      }}
      {...props}
    ></AntProgress>
  );
}

Progress.defaultProps = {
  strokeColor: '#62B929',
  style: {},
  type: 'line'
};
Progress.propTypes = {
  /** 圆形进度条 */
  circle: PropTypes.bool,
  /** 进度条stroke的高度 */
  strokeWidth: PropTypes.number,
  /** 进度条颜色 */
  strokeColor: PropTypes.string,
  /** 进度, 百分进制 */
  percent: PropTypes.number,
  /** 进度条样式 */
  style: PropTypes.object,
  /** 进度条的宽度 */
  width: PropTypes.number,
  /** 进度条的高度 */
  height: PropTypes.number
};
