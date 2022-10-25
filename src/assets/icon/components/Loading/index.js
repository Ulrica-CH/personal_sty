import PropTypes from 'prop-types';
import React from 'react';
import Circle from './Loading';
import Bar from './LoadingBar';
import Box from './LoadingBox';
import Global from './LoadingGlobal';

/**
 * 各种Loading样式
 */
export default function Loading(props) {
  const { type, ...others } = props;
  switch (type) {
    case 'bar':
      return <Bar {...others} />;
    case 'box':
      return <Box {...others} />;
    case 'global':
      return <Global {...others} />;
    default:
      return <Circle {...others} />;
  }
}
Loading.defaultProps = {
  type: 'default',
  size: 'md',
  label: '加载中...',
  showLabel: true,
  align: 'vertical'
};
Loading.propTypes = {
  /** loaing的不同样式 */
  type: PropTypes.oneOf(['default', 'box', 'bar', 'global']),
  /** lg: 80\*80，md: 40\*40，sm: 20\*2，仅在type="default" 时才生效 */
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  /** loading旁边的内容，仅在type='default' 时才生效 */
  label: PropTypes.string,
  /** 是否显示label，仅在type='default' 时才生效 */
  showLabel: PropTypes.oneOf([true, false]),
  /** 文本对齐方式，仅在type='default' 时才生效 */
  align: PropTypes.oneOf(['vertical', 'horizontal']),
  /** label 主色调 */
  loadingColor: PropTypes.string,
  /** 自定义loading的icon */
  icon: PropTypes.string
};
