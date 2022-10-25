/*
 * @LastEditTime: 2022-02-08 16:42:34
 * @LastEditors: jinxiaojian
 */
import React, { Fragment } from 'react';
import cx from 'classnames';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import filter from 'lodash/filter';
import selectIcon from './images/selected.svg';
import Icon from '../Icon';
export function getOption({
  option,
  options,
  currentValue,
  getMultiSelected,
  focusItem,
  multi,
  handleItemClick,
  setFocusItem
}) {
  const { label, value, disabled } = option;
  let active;
  if (value === 'tbfeSelectAll') {
    active = currentValue?.length >= options?.length - 1;
  } else {
    active = !Array.isArray(currentValue)
      ? isEqual(option, currentValue)
      : getMultiSelected(currentValue, option);
  }
  const focus = isEqual(option, focusItem);
  const cls = cx('select-option-item', {
    active,
    focus,
    multi,
    disabled
  });
  return (
    <li
      key={'select' + label + value}
      className={cls}
      title={label}
      onClick={e => {
        if (!disabled) {
          handleItemClick(option, active, !multi);
        } else {
          e.stopPropagation();
        }
      }}
      onMouseEnter={() => setFocusItem(option)}
    >
      <div className="text-box">
        {multi && active ? <Icon link={selectIcon} /> : null}
        <div className="text">{label}</div>
      </div>
    </li>
  );
}

export function getGroupOptions({
  options,
  arg,
  selectAll,
  groupArr,
  groupRender
}) {
  let key = 0;
  let eleArr = [];
  if (selectAll) {
    key++;
    map(
      filter(options, x => x.value === 'tbfeSelectAll'),
      (option = {}) => {
        eleArr.push(getOption({ option, ...arg }));
      }
    );
  }
  if (!isEmpty(filter(options, x => !x.group))) {
    if (groupRender) {
      eleArr.push(
        <Fragment key={'group' + key}>{groupRender('未分组', key)}</Fragment>
      );
    } else {
      if (key) {
        eleArr.push(<div className="select-line" key={'line' + key}></div>);
      }
    }
    key++;
    map(
      filter(options, x => !x.group),
      (option = {}) => {
        eleArr.push(getOption({ option, ...arg }));
      }
    );
  }
  if (!isEmpty(groupArr)) {
    map(groupArr, g => {
      if (groupRender) {
        eleArr.push(
          <Fragment key={'group' + key}>{groupRender(g, key)}</Fragment>
        );
      } else {
        if (key) {
          eleArr.push(<div className="select-line" key={'line' + key}></div>);
        }
      }
      key++;
      map(
        filter(options, x => x.group === g),
        (option = {}) => {
          eleArr.push(getOption({ option, ...arg }));
        }
      );
    });
  }
  return eleArr;
}
