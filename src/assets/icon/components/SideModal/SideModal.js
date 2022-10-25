import { Drawer } from 'antd';
import classNames from 'classnames';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactDom from 'react-dom';
import { config } from '../../common/config';
import Button from '../Button';
import Item from '../Item';
import Loading from '../Loading';

const baseModalStyle = {
  overlay: {},
  content: {}
};

// triky way to generate the doc
// https://react-styleguidist.js.org/docs/thirdparties/#how-styleguidist-works
export function SideModal(props) {
  const {
    title,
    children,
    footer,
    handleCancel,
    handleEnsure,
    btnCancelTxt,
    btnEnsureTxt,
    style,
    closable,
    width,
    className,
    isOpen,
    size,
    btnMini,
    containerUtil,
    loading,
    loadingDesc,
    ...other
  } = props;
  const cls = classNames(className, `${config.prefixCls}side-modal`);
  const styles = merge({}, baseModalStyle, style);
  const ref = useRef();

  containerUtil.getContainer = () => {
    return ref.current;
  };

  const sizeWidth = {
    mini: 300,
    normal: 450,
    large: 750
  }[size];

  const resultWidth = styles?.content?.width || width || sizeWidth;

  // styles.content.width = resultWidth - 30;
  // styles.content.width = resultWidth - 30;

  return (
    <Drawer
      title={title}
      visible={isOpen}
      width={resultWidth}
      className={cls}
      closable={closable}
      onClose={handleCancel}
      destroyOnClose
      bodyStyle={styles.content}
      maskStyle={styles.overlay}
      footer={
        footer === undefined ? (
          <div className="footer-btn-wrap">
            <Button type="white" mini={btnMini} onClick={handleCancel}>
              {btnCancelTxt}
            </Button>
            <Button
              type="primary"
              mini={btnMini}
              disabled={loading}
              onClick={handleEnsure}
            >
              {btnEnsureTxt}
            </Button>
          </div>
        ) : (
          footer
        )
      }
      {...other}
    >
      <div className="side-modal-body" ref={ref}>
        {children}
      </div>
      <Item show={loading}>
        <div className="loading-wrap">
          <Loading type="box">
            <span>{loadingDesc}</span>
          </Loading>
        </div>
      </Item>
    </Drawer>
  );
}

export default props => {
  return ReactDom.createPortal(<SideModal {...props} />, document.body);
};

SideModal.defaultProps = {
  closable: true,
  btnCancelTxt: '取消',
  btnEnsureTxt: '确定',
  btnMini: true,
  size: 'large',
  containerUtil: {}
};
SideModal.propTypes = {
  /** 弹框标题，可以是string, 也可以是节点 */
  title: PropTypes.any,
  /** 自定义底部按钮，假设进行自定义，需要手动为按钮绑定回调事件 */
  footer: PropTypes.any,
  /** 是否展示关闭按钮 */
  closable: PropTypes.bool,
  /** 控制弹窗的展示状态 */
  isOpen: PropTypes.bool,
  /** 取消的回调事件 */
  handleCancel: PropTypes.func,
  /** 确定的回调事件 */
  handleEnsure: PropTypes.func,
  /** 修改取消按钮的内容 */
  btnCancelTxt: PropTypes.any,
  /** 修改确定按钮的内容 */
  btnEnsureTxt: PropTypes.any,
  /** 按钮是否是mini形式 */
  btnMini: PropTypes.bool,
  /** 自定义宽度 */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** 三种大小的弹框, 300px, 450px, 750px */
  size: PropTypes.oneOf(['mini', 'normal', 'large']),
  /**
   * 样式设定
   * {
   *   overlay: 蒙版,
   *   content: 内容
   * }
   */
  style: PropTypes.object,
  /**传入一个对象，会默认注入getContainer方法 */
  containerUtil: PropTypes.object
};
