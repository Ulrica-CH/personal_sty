import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Tooltip, Icon } from '@';
import { config } from '../../common/config';
import cx from 'classnames';

/**
 * Popover懒人版, 内容默认为图标
 * 默认带两个图标，info和help
 * 可针对图标做解释性展示的mini版本
 * 多余的Props可参考Tooltip
 */
export default function Tips(props) {
  const {
    content,
    type,
    children,
    activeColor,
    theme,
    maxWidth,
    maxHeight,
    mini,
    withArrow,
    position,
    className,
    style,
    onVisibleChange: onVisibleChangeFn,
    ...other
  } = props;
  const [hover, setHover] = useState(false);

  const onVisibleChange = useCallback(visible => {
    setHover(visible);
    onVisibleChangeFn && onVisibleChangeFn(visible);
  }, []);

  const getTipsContent = () => {
    if (!children) {
      return (
        <Icon
          type={type}
          mini
          className="tips-icon icon-fill-default"
          fill={hover ? activeColor : undefined}
        />
      );
    } else {
      if (typeof children === 'function') {
        return children(hover);
      }

      return children;
    }
  };

  const cls = cx(`${config.prefixCls}tips`, className);

  // 两个版本的主题
  const Comp = theme === 'dark' ? Tooltip : Popover;
  const popoverCls = mini ? `${config.prefixCls}tips-mini` : undefined;
  // mini情况下默认不带箭头
  const hasArrow = mini
    ? withArrow !== undefined
      ? withArrow
      : false
    : withArrow;
  const resultPlacement = mini
    ? position !== undefined
      ? position
      : 'top'
    : position;

  return (
    <div className={cls} style={style}>
      <Comp
        content={
          <div
            className="text-wrap"
            style={{ maxWidth, maxHeight, overflow: 'auto' }}
          >
            {content}
          </div>
        }
        visible={hover}
        // onMouseEnter={() => setHover(true)}
        // onMouseLeave={() => setHover(false)}
        onVisibleChange={onVisibleChange}
        overlayClassName={popoverCls}
        withArrow={hasArrow}
        position={resultPlacement}
        {...other}
      >
        {getTipsContent()}
      </Comp>
    </div>
  );
}

Tips.defaultProps = {
  type: 'info',
  maxWidth: 300,
  maxHeight: 300
};
Tips.propTypes = {
  /** 提示内容 */
  content: PropTypes.any,
  /** 提示位置 */
  position: PropTypes.string,
  /** 控制图标的类型, 默认可以选择info,help两种类型，或者你可以选择提供的IconList的type来随意填充 */
  type: PropTypes.oneOf(['info', 'help']),
  /** 设置提示内容的最大宽度 */
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 设置提示内容的最大高度 */
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 小的提示内容，用于图标的解释性说明 */
  mini: PropTypes.bool,
  /** 内容 */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  /** hover时的颜色,可配 */
  activeColor: PropTypes.string,
  /**提示的背景色 dark 、white两种，默认是white */
  theme: PropTypes.string,
  /** 显示隐藏的回调 */
  onVisibleChange: PropTypes.func
};
