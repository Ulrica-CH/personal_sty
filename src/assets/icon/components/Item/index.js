/*
 * @LastEditTime: 2021-10-29 10:37:42
 * @LastEditors: jinxiaojian
 */
import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { isString, map } from 'lodash';

export default function Item({
  show,
  children,
  default: defaultContent = null,
  ...others
}) {
  if (isEmpty(others)) {
    return <Fragment>{show ? children : defaultContent}</Fragment>;
  }
  if (show && children) {
    if (children.length > 1) {
      return (
        <Fragment>
          {map(children, (ele, i) => {
            if (isString(ele)) return <Fragment>{ele}</Fragment>;
            return (
              <Fragment key={i}> {React.cloneElement(ele, others)}</Fragment>
            );
          })}
        </Fragment>
      );
    } else {
      if (isString(children)) return <Fragment>{children}</Fragment>;
      return <Fragment>{React.cloneElement(children, others)}</Fragment>;
    }
  } else {
    return defaultContent;
  }
}

Item.defaultProps = {
  children: '',
  default: ''
};

Item.propTypes = {
  /**是否展示内容 */
  show: PropTypes.any,
  /**要展示的内容 */
  children: PropTypes.element,
  /**默认内容 */
  default: PropTypes.any
};
