/*
 * @Author: wangweixin
 * @Date: 2017-11-30 15:11:38
 * @Last Modified by: lujing
 * @Last Modified time: 2022-02-16 16:45:02
 */
import React, { cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import successIcon from './images/success.svg';
import errorIcon from './images/error.svg';
import warningIcon from './images/warn.svg';
import messageIcon from './images/message.svg';
import closeIcon from './images/close1.svg';
import infoIcon from './images/info1.svg';
import { config } from '../../common/config';
import { nfn } from '../../common';

const typeMap = {
  success: successIcon,
  error: errorIcon,
  warning: warningIcon,
  info: infoIcon
};

/**
 * 基本的消息提示
 * 目前用于表单提示后的信息
 * 注： 目前只封装了success, error, warning三种样式，待设计完善
 */
function Alert(props) {
  const [show, setShow] = useState(true);
  const {
    message,
    type,
    className,
    style,
    mini,
    icon,
    closable,
    onClose,
    showIcon,
    showBorder,
    description
  } = props;

  const classes = classNames(
    {
      [`${config.prefixCls}base-alert`]: true,
      mini: mini,
      'no-border': !showBorder
    },
    `base-alert-${type}`,
    className
  );

  const getIcon = () => {
    if (showIcon) {
      if (icon) {
        return cloneElement(icon, {
          className: 'base-alert-icon',
          key: 'div'
        });
      }
      return typeMap[type] ? (
        <Icon className="base-alert-icon" link={typeMap[type]} />
      ) : null;
    }
    return '';
  };
  return show ? (
    <div
      className={classes}
      style={showBorder ? style : { ...style, border: 'none' }}
    >
      {getIcon()}
      <div className="base-alert-content">
        <div className="base-alert-text">{message}</div>
        <div className="base-alert-description">{description}</div>
      </div>
      {closable ? (
        <Icon
          link={closeIcon}
          className="base-alert-icon-close"
          onClick={() => {
            setShow(false);
            onClose();
          }}
        />
      ) : (
        ''
      )}
    </div>
  ) : (
    ''
  );
}
Alert.defaultProps = {
  type: 'success',
  mini: false,
  closable: false,
  showIcon: true,
  showBorder: true,
  onClose: nfn,
  style: {}
};
Alert.propTypes = {
  /** 提示内容 */
  message: PropTypes.string,
  /** 提示类型 */
  type: PropTypes.oneOf(['success', 'error', 'warning', 'loading', 'info']),
  /** 是否mini显示 */
  mini: PropTypes.bool,
  /** 自定义图标, 需要传入图标组件 */
  icon: PropTypes.node,
  /** 是否显示关闭按钮，默认不显示 */
  closable: PropTypes.bool,
  /** 关闭时的回调函数 */
  onClose: PropTypes.func,
  /** 是否显示图标，默认为显示 */
  showIcon: PropTypes.bool,
  /** 是否显示边框 */
  showBorder: PropTypes.bool
};

export default Alert;
