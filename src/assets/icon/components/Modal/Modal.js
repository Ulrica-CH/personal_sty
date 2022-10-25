/*
 * @Author: wangweixin
 * @Date: 2017-11-28 15:30:27
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-11-22 19:19:36
 */
import React, { cloneElement, useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { merge, get, isString } from 'lodash';
import Button from '../Button';
import Item from '../Item';
import Icon from '../Icon';
import Loading from '../Loading';
import closeIcon from './images/close-modal.svg';
import { CSSTransition } from 'react-transition-group';
import { nfn } from '../../common';
import { config } from '../../common/config';

const baseModalStyle = {
  overlay: {},
  content: {}
};

// triky way to generate the doc
// https://react-styleguidist.js.org/docs/thirdparties/#how-styleguidist-works
export function Modal(props) {
  const {
    title,
    children,
    footer,
    handleCancel,
    handleEnsure,
    btnCancelTxt,
    btnEnsureTxt,
    showCancel,
    showEnsure,
    style,
    closable,
    width,
    className,
    isOpen,
    size,
    containerUtil,
    btnMini,
    loading,
    loadingDesc,
    titleIcon,
    bodyIcon,
    top,
    minHeight,
    preventHandleCancelOnClickOverlay,
    ...other
  } = props;

  // 用于控制内部动画开启时，父节点已经渲染
  const [innerOpen, setInnerOpen] = useState(false);

  useEffect(() => {
    const onClose = e => {
      // wwx 只有当模态框打开时，才出发关闭事件
      if (e.keyCode === 27 && isOpen) {
        handleCancel();
      }
    };
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, []);

  const cls = classNames(className, `${config.prefixCls}modal`);
  const classes = classNames(className, 'modal-content');
  const ref = useRef();

  containerUtil.getContainer = () => {
    return ref.current;
  };

  // 合并样式
  // 若传入top, 则弹框内容为距离顶部top的距离，否则为垂直居中
  const styles = merge({}, baseModalStyle, style, {
    overlay: {
      alignItems: top ? 'flex-start' : 'center'
    },
    content: {
      top,
      minHeight
    }
  });

  // 若传入top，则最大高度为减去top和底部边距100, 否则为总体减202
  const maxHeight = top
    ? window.innerHeight - (top + 100)
    : window.innerHeight - 202;

  const sizeWidth = {
    mini: 300,
    normal: 400,
    large: 800
  }[size];

  styles.content.width = get(style, 'content.width') || width || sizeWidth;

  const getIcon = (icon, cls) => {
    if (!icon) return null;
    if (isString(icon)) {
      return <Icon link={icon} type={icon} className={cls} />;
    }
    return cloneElement(icon, {
      className: classNames(icon?.props?.className, cls)
    });
  };
  return (
    <CSSTransition
      unmountOnExit
      timeout={0}
      in={isOpen}
      className={cls}
      classNames="modal-fade-in"
      onEnter={() => setInnerOpen(true)}
      onExited={() => setInnerOpen(false)}
    >
      <div
        style={styles.overlay}
        onClick={
          preventHandleCancelOnClickOverlay ? void 0 : () => handleCancel(false)
        }
      >
        <CSSTransition
          timeout={300}
          in={innerOpen}
          className={classes}
          classNames="modal-zoom-up"
        >
          <div
            style={styles.content}
            onClick={e => e.stopPropagation()}
            {...other}
          >
            <Item show={title}>
              <div className="modal-header">
                <div>
                  {getIcon(titleIcon, 'mgr5')}
                  {title}
                </div>

                <Item show={closable}>
                  <Icon
                    mini
                    className="close-icon"
                    onClick={() => handleCancel(false)}
                    link={closeIcon}
                  />
                </Item>
              </div>
            </Item>
            <div className="modal-body" ref={ref} style={{ maxHeight }}>
              {getIcon(bodyIcon, 'modal-body-icon')}
              {children}
            </div>
            <div className="modal-footer">
              {footer || (
                <div className="footer-btn-wrap">
                  <Item show={showCancel}>
                    <Button
                      type="white"
                      hasWave
                      mini={btnMini}
                      onClick={() => handleCancel(true)}
                    >
                      {btnCancelTxt}
                    </Button>
                  </Item>
                  <Item show={showEnsure}>
                    <Button
                      type="primary"
                      hasWave
                      mini={btnMini}
                      onClick={handleEnsure}
                    >
                      {btnEnsureTxt}
                    </Button>
                  </Item>
                </div>
              )}
            </div>
            <Item show={loading}>
              <div className="loading-wrap">
                <Loading type="box">
                  <span>{loadingDesc}</span>
                </Loading>
              </div>
            </Item>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}

export default props => {
  return ReactDom.createPortal(<Modal {...props} />, document.body);
};

Modal.defaultProps = {
  closable: true,
  btnCancelTxt: '取消',
  btnEnsureTxt: '确定',
  showCancel: true,
  showEnsure: true,
  btnMini: true,
  size: 'large',
  containerUtil: {},
  handleCancel: nfn,
  loading: false,
  loadingDesc: '提交中...',
  minHeight: 80,
  preventHandleCancelOnClickOverlay: true
};
Modal.propTypes = {
  /** 弹框标题，可以是string, 也可以是节点 */
  title: PropTypes.any,
  /** 自定义底部按钮，假设进行自定义，需要手动为按钮绑定回调事件 */
  footer: PropTypes.any,
  /** 顶部的Icon */
  titleIcon: PropTypes.any,
  /** Body内部的Icon */
  bodyIcon: PropTypes.any,
  /** 是否在loading状态，loading状态会展示遮罩 */
  loading: PropTypes.bool,
  /** loading状态的描述 */
  loadingDesc: PropTypes.any,
  /** 是否展示关闭按钮 */
  closable: PropTypes.bool,
  /** 是否显示图标，值为true或false， 默认false*/
  hasWarningIcon: PropTypes.bool,
  /** 控制弹窗的展示状态 */
  isOpen: PropTypes.bool,
  /** 取消的回调事件, 会回传一个参数，如果是主动点击了取消按钮，则为true 否则为false */
  handleCancel: PropTypes.func,
  /** 确定的回调事件 */
  handleEnsure: PropTypes.func,
  /** 控制取消按钮的展示 */
  showCancel: PropTypes.bool,
  /** 控制确定按钮的展示 */
  showEnsure: PropTypes.bool,
  /** 修改取消按钮的内容 */
  btnCancelTxt: PropTypes.any,
  /** 修改确定按钮的内容 */
  btnEnsureTxt: PropTypes.any,
  /** 按钮是否是mini形式 */
  btnMini: PropTypes.bool,
  /** 支持自定义巨顶部距离，不传则默认居中 */
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** 自定义宽度 */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** 支持自定义内容的最小高度 */
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** 三种大小的弹框, 300px, 450px, 800px */
  size: PropTypes.oneOf(['mini', 'normal', 'large']),
  /**
   * 样式设定
   * {
   *   overlay: 蒙版,
   *   content: 内容
   * }
   */
  style: PropTypes.object,
  /** 传入一个对象，会默认注入getContainer方法 */
  containerUtil: PropTypes.object,
  /** 点击背景时，阻止模态框执行handleCancel */
  preventHandleCancelOnClickOverlay: PropTypes.bool
};
