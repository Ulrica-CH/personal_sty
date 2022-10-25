/*
 * @LastEditTime: 2021-07-25 18:37:39
 * @LastEditors: jinxiaojian
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { config } from '../../common/config';

export default function Loading(props) {
  const {
    size,
    className,
    style,
    align,
    showLabel,
    label,
    loadingColor,
    icon,
    prefixCls
  } = props;
  const prefix = prefixCls || config.prefixCls;
  const classes = classNames('loading-circle', {
    [`loading-${size}`]: true
  });
  const wrapperClass = classNames(
    `${prefix}loading-wrapper`,
    {
      [`loading-wrapper-${align}`]: true
    },
    className
  );

  return (
    <div className={wrapperClass}>
      <div className={classes} style={style}>
        {icon || (
          <svg
            className="loading-spinner"
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              style={{
                stroke: loadingColor
              }}
              className="path"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
            ></circle>
          </svg>
        )}
      </div>
      {showLabel ? <div className="loading-txt">{label}</div> : null}
    </div>
  );
}

Loading.defaultProps = {
  size: 'md'
};
Loading.propTypes = {
  size: PropTypes.string
};
