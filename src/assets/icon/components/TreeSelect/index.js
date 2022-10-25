/*
 * @LastEditTime: 2022-04-24 16:11:39
 * @LastEditors: duqiuliang
 */
import { TreeSelect as BaseTreeSelect } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import arrowIcon from '../CheckboxSelect/images/arrow-down-mini.svg';

/**
 * 树形选择
 */
export default function TreeSelect({ minWidth, width, style, ...props }) {
  return (
    <BaseTreeSelect
      className="tree-select"
      switcherIcon={<Icon link={arrowIcon} className={'drop-down-icon'} />}
      style={{ minWidth, width: minWidth ? 'auto' : width, ...style }}
      {...props}
    ></BaseTreeSelect>
  );
}

TreeSelect.propTypes = {
  /** 下拉框宽度 */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 最小宽度，做自适应 */
  minWidth: PropTypes.number
};

TreeSelect.defaultProps = {
  width: '100%',
  minWidth: 0
};
