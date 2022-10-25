import React, { cloneElement, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { map, pick } from 'lodash';
import { nfn } from '../../common';
import { useDropdownPosition, useUpdateEffect } from '../../common/hooks';
import { getDefaultPortalSelector } from '../../common/portalHelpers';
import { useClickAway } from 'react-use';

/** * 基本的Dropdown组件，可在其上针对业务逻辑进行封装
 */
function Dropdown(props) {
  const {
    children,
    defaultOpen,
    disabled,
    trigger,
    className,
    overlayClassName,
    style,
    overlay,
    visible,
    align = 'left',
    inline,
    maxWidth,
    stopPropagation,
    onVisibleChange,
    getContainer: customGetContainer,
    shouldCloseWhenClickAway,
    space
  } = props;
  if (defaultOpen) {
    console.warn(
      `
       defaultOpen已废弃，请使用visible进行控制
       `
    );
  }
  const [show, setShow] = useState(visible);
  const [awayKey] = useState('awayKey' + Math.random());
  const visibleRef = useRef();
  useClickAway(visibleRef, e => {
    // 增加这个项目主要是避免外部显隐控制与内部控制冲突
    let path = map(e.path, 'className').join('');
    if (path.indexOf(awayKey) > -1) {
      return;
    }
    if (shouldCloseWhenClickAway(e)) {
      setShow(false);
      onVisibleChange(false);
    }
  });
  const ref = useRef();

  const getContainer = customGetContainer || getDefaultPortalSelector();
  const [position, updatePosition] = useDropdownPosition(
    ref,
    getContainer,
    visibleRef,
    align,
    space
  );

  const changeVisible = show => {
    if (show) {
      updatePosition();
    }
    setShow(show);
    onVisibleChange(show);
  };
  const onMouseEnter =
    trigger === 'hover' && !disabled ? () => changeVisible(true) : null;
  const onMouseLeave =
    trigger === 'hover' && !disabled ? () => changeVisible(false) : null;

  useUpdateEffect(() => {
    if (show) {
      updatePosition();
    }
    setShow(visible);
  }, [visible]);

  const classes = classNames('dropdown', awayKey, className, {
    open: show,
    disabled
  });

  const overlayCls = classNames('dropdown-overlay', overlayClassName, {
    open: show,
    inline: inline
  });
  const container = getContainer(ref.currrent) || document.body;
  return (
    <div
      className={classes}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref}
      onClick={e => {
        stopPropagation && e.stopPropagation();
      }}
    >
      {cloneElement(children, {
        onClick:
          trigger === 'click' && !disabled
            ? e => {
                stopPropagation && e.stopPropagation();
                changeVisible(!show);
              }
            : null
      })}
      {inline ? (
        <div
          ref={visibleRef}
          className={overlayCls}
          style={{ maxWidth: maxWidth }}
        >
          {overlay}
        </div>
      ) : (
        createPortal(
          <div
            ref={visibleRef}
            className={overlayCls}
            style={{
              left: position.left,
              top: position.top,
              bottom: position.bottom,
              minWidth: position.width,
              maxWidth: maxWidth
            }}
          >
            {overlay}
          </div>,
          container
        )
      )}
    </div>
  );
}

Dropdown.defaultProps = {
  trigger: 'click',
  stopPropagation: true,
  onVisibleChange: nfn,
  shouldCloseWhenClickAway: () => true
};
Dropdown.propTypes = {
  /** dropdown展示的内容 */
  overlay: PropTypes.any,
  /** 触发展示的方式 */
  trigger: PropTypes.oneOf(['click', 'hover']),
  /** 增加下拉功能的元素 */
  children: PropTypes.element,
  /** 是否默认展开, 已废弃，推荐用visible */
  defaultOpen: PropTypes.bool,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 浮层自定义class */
  overlayClassName: PropTypes.string,
  /** 自定义样式 */
  style: PropTypes.object,
  /** 是否显示下拉内容 */
  visible: PropTypes.bool,
  /** 显示/印象下拉内容的回调钩子 */
  onVisibleChange: PropTypes.func,
  /** 弹出overlay组件作为子组件而非portal */
  inline: PropTypes.bool,
  /** 下拉内容定位参照元素, 默认参照body **/
  getContainer: PropTypes.func,
  /** 阻止点击冒泡 */
  stopPropagation: PropTypes.bool,
  /** 最大宽度 */
  maxWidth: PropTypes.number,
  /**展示的内容的对齐方式 默认左对齐*/
  align: PropTypes.string
};

export default Dropdown;
