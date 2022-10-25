import classNames from 'classnames';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React from 'react';
import { nfn } from '../../common';
import { config } from '../../common/config';
import Icon from '../Icon';
import Item from '../Item';
import delIconCavity from '../Select/images/close-mini.svg';

/**
 * 标签组件，提供各种基本标签样式
 */
export default function Label({
  type,
  children,
  light,
  className,
  closable,
  maxWidth,
  weak,
  style,
  borderRadius,
  icon,
  onClose,
  circle,
  title,
  ...others
}) {
  const labelCls = `${config.prefixCls}label`;

  const classes = classNames(
    labelCls,
    `${labelCls}-${type}`,
    {
      light,
      weak,
      closable,
      circle,
      'max-width': maxWidth,
      'has-icon': icon
    },
    className
  );

  const retStyle = {
    ...style,
    borderRadius: borderRadius || style?.borderRadius
  };

  const getMaxWidth = () => {
    if (!maxWidth) return undefined;
    const padding = circle ? 20 : style?.padding * 2 || 10;
    const iconWidth = 15;
    const borderWidth = 2;
    const closeWidth = closable ? 16 : 0;
    if (icon)
      return Number(maxWidth) - padding - iconWidth - borderWidth - closeWidth;

    return Number(maxWidth) - padding - borderWidth - closeWidth;
  };

  return (
    <span
      className={classes}
      style={retStyle}
      {...others}
      title={title || (isString(children) ? children : '')}
    >
      <Item show={icon}>
        <Icon link={icon} className={`${labelCls}-icon`} />
      </Item>
      <span
        className={`${labelCls}-content`}
        style={{ maxWidth: maxWidth ? getMaxWidth() : undefined }}
      >
        {children}
      </span>
      <Item show={closable} onClick={onClose}>
        <Icon link={delIconCavity} className={`${labelCls}-icon-close`} />
      </Item>
    </span>
  );
}

Label.displayName = 'Label';

Label.defaultProps = {
  type: 'info',
  light: false,
  weak: false,
  closable: false,
  onClose: nfn
};

Label.propTypes = {
  /** 标签类型，info, success, warning, error, failed。 cavity, alarm, dark, danger 是为了兼容 */
  type: PropTypes.oneOf([
    'info',
    'success',
    'warning',
    'error',
    'failed',
    'cavity',
    'alarm',
    'dark',
    'danger',
    'pink'
  ]),
  /** light版 */
  light: PropTypes.bool,
  /** weak版，比light重 */
  weak: PropTypes.bool,
  /** 最大宽度，超出时会将内容以省略号显示 */
  maxWidth: PropTypes.number,
  /** 是否可关闭 */
  closable: PropTypes.bool,
  /** 关闭回调函数 */
  onClose: PropTypes.func,
  /** 自定义圆角尺寸 */
  borderRadius: PropTypes.number,
  /** 原型样式的标签 */
  circle: PropTypes.bool,
  /** 自定义图标，只支持普通label，light，weak */
  icon: PropTypes.string,
  /** 可手动传入title */
  title: PropTypes.string
};
