/*
 * @Author: wangweixin
 * @Date: 2017-12-07 17:12:42
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-07-05 19:43:14
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import Ripples from './RippleWrapper';
import Loading from '../Loading';
import { config } from '../../common/config';
import { waveBtnStyle, waveStyle } from './reset';
function Base({
  classes,
  disabled,
  loading,
  style,
  width,
  prefix,
  children,
  type,
  ...others
}) {
  return (
    <button
      className={classes}
      disabled={disabled}
      {...others}
      style={{
        width: isNumber(width) ? width : width + 'px',
        ...style
      }}
    >
      {loading ? (
        <Loading
          className={`${prefix}-loading ${
            children ? '' : `${prefix}-loading-no-text`
          }`}
          size="sm"
          loadingColor={['text', 'white'].indexOf(type) >= 0 ? '#999' : '#fff'}
          showLabel={false}
        />
      ) : null}
      {children}
    </button>
  );
}

/**
 * 最基本的Button组件，使用时请以此组件为基准
 */
export default function Button({
  type,
  mini,
  radius,
  children,
  width,
  className,
  hasWave,
  waveClassName,
  waveColor,
  loading,
  style = {},
  disabled,
  prefixCls,
  ...others
}) {
  const prefix = `${prefixCls || config.prefixCls}btn`;

  const classes = classNames(prefix, `${prefix}-${type}`, className, {
    mini,
    radius,
    loading
  });

  const props = {
    classes,
    disabled,
    loading,
    style,
    width,
    prefix,
    children,
    type,
    ...others
  };

  if (hasWave) {
    return (
      <div
        className={`${classes}  ${prefix}-${type}-wave ${waveClassName}`}
        style={{
          ...style,
          ...waveStyle
        }}
      >
        <Ripples style={style} color={waveColor}>
          <Base
            {...props}
            style={{
              ...style,
              ...waveBtnStyle
            }}
          />
        </Ripples>
      </div>
    );
  } else {
    return <Base {...props} />;
  }
}
Button.displayName = 'Button';

Button.defaultProps = {
  type: 'primary',
  mini: false,
  radius: true,
  hasWave: false,
  className: '',
  waveClassName: '',
  loading: false
};

Button.propTypes = {
  /** 按钮类型：默认类型, primary, return, secondary, reset, link, text(text-red,text-blue),blue, white, dark, danger */
  type: PropTypes.string,
  /** 是否是小型按钮 */
  mini: PropTypes.bool,
  /** 是否带圆角 */
  radius: PropTypes.bool,
  /** 支持直接传宽度属性, 传200这样的，不要带单位 */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 样式 */
  style: PropTypes.object,
  /** 是否有点击波纹 */
  hasWave: PropTypes.bool,
  /** 点击波纹容器class */
  waveClassName: PropTypes.string,
  /** 点击波纹颜色 */
  waveColor: PropTypes.string,
  /** 是否处于加载状态 */
  loading: PropTypes.bool
};
