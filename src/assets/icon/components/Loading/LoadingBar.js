/*
 * @LastEditTime: 2021-07-25 18:38:27
 * @LastEditors: jinxiaojian
 */
import React from 'react';
import PropTypes from 'prop-types';
import { config } from '../../common/config';

export default function LoadingBar(props) {
  const { className, style, loadingColor, prefixCls } = props;
  const prefix = prefixCls || config.prefixCls;
  return (
    <div className={` ${prefix}loading-bar  ${className}`} style={style}>
      <div className="loading-bar-background" />
      <div
        className="loading-bar-foreground"
        style={{ backgroundColor: loadingColor }}
      />
    </div>
  );
}

LoadingBar.propTypes = {
  className: PropTypes.string
};
