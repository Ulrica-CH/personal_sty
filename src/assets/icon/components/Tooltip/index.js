import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as BaseTooltip } from 'antd';
import { config } from '../../common/config';
import cx from 'classnames';
/**
 * 气泡卡片
 */
function Tooltip(props) {
  const {
    content,
    target,
    children,
    trigger,
    withArrow,
    position,
    overlayClassName,
    overlayMaxHeight,
    overlayMaxWidth,
    overlayInnerStyle,
    ...others
  } = props;
  return (
    <BaseTooltip
      prefixCls={`${config.prefixCls}tooltip`}
      trigger={trigger}
      title={content}
      placement={position}
      overlayClassName={cx(overlayClassName, {
        'text-wrap': true,
        [`${config.prefixCls}tooltip-with-arrow`]: withArrow
      })}
      overlayInnerStyle={{
        ...(overlayInnerStyle || {}),
        maxHeight: overlayMaxHeight,
        maxWidth: overlayMaxWidth
      }}
      destroyTooltipOnHide={{ keepParent: true }} // https://github.com/ant-design/ant-design/issues/19536
      {...others}
    >
      {target || children}
    </BaseTooltip>
  );
}
Tooltip.defaultProps = {
  trigger: 'hover',
  position: 'right',
  withArrow: true,
  arrowPointAtCenter: false
};
Tooltip.propTypes = {
  /** 气泡内容 */
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** 触发气泡的元素，默认为children */
  target: PropTypes.element,
  /** 触发方式 */
  trigger: PropTypes.oneOf(['hover', 'click']),
  /** 是否带箭头 */
  withArrow: PropTypes.bool,
  /** 内容的位置 */
  position: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left',
    'topLeft',
    'topRight',
    'rightTop',
    'rightBottom',
    'bottomLeft',
    'bottomRight',
    'leftTop',
    'leftBottom'
  ]),
  /** 箭头是否指向目标元素中心 */
  arrowPointAtCenter: PropTypes.bool,
  /** 默认是否显隐 */
  defaultVisible: PropTypes.bool,
  /** 卡片类名 */
  overlayClassName: PropTypes.string,
  /** 卡片最大高度 */
  overlayMaxHeight: PropTypes.string,
  /** 卡片最大宽度 */
  overlayMaxWidth: PropTypes.string,
  /** 卡片样 */
  overlayStyle: PropTypes.object,
  /** 用于手动控制浮层显隐 */
  visible: PropTypes.bool,
  /** 显示隐藏的回调 */
  onVisibleChange: PropTypes.func
};
export default Tooltip;
