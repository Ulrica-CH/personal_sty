/*
 * @LastEditTime: 2022-07-11 18:03:05
 * @LastEditors: jinxiaojian
 */
import React from 'react';
import cx from 'classnames';
import iconSort from './svg/sort-arrow.svg';
import Icon from '../../Icon';
// import './index.cssmodule.styl';
export default function SortIcon({
  column,
  handleSortChange,
  sortKey,
  sortFlag
}) {
  const change = sort => () => handleSortChange(column.key, sort);
  const active = sort =>
    column.key === sortKey && sort === sortFlag ? 'table-active' : '';
  return (
    <div className="table-head-sort-button">
      <Icon
        link={iconSort}
        onClick={change('asc')}
        className={cx('table-head-sort-icon', 'asc', active('asc'))}
      />
      <Icon
        link={iconSort}
        onClick={change('desc')}
        className={cx('table-head-sort-icon', 'desc', active('desc'))}
      />
    </div>
  );
}
