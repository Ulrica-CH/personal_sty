/*
 * @LastEditTime: 2022-04-18 18:17:25
 * @LastEditors: jinxiaojian
 */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { useClickAway } from 'react-use';
import filter from 'lodash/filter';
import useVirtual from 'react-cool-virtual';
import { getGroupOptions, getOption } from './getOptions';
// import pick from 'lodash/pick';
export default function Options({
  position,
  value: currentValue,
  single,
  show,
  mini,
  options,
  optionsMaxHeight,
  optionsZIndex,
  filterItem,
  handleItemClick,
  focusItem,
  setFocusItem,
  getContainer,
  onClickAway,
  inline,
  multi,
  prefix,
  emptyDesc,
  virtualList,
  editAble,
  selectAll,
  group,
  groupList,
  groupRender,
  overlayRef
}) {
  console.log(overlayRef);
  const [size, setSize] = useState(0);
  const { outerRef, innerRef, items } = useVirtual({
    itemCount: size, // Provide the total number for the list items
    itemSize: 30, // The size of each item (default = 50)
    resetScroll: true
  });
  const innerRefNot = useRef(null);
  const groupArr = useMemo(() => {
    let arr = [];
    for (let i in groupList) {
      arr.push(i);
    }
    return arr;
  }, [groupList]);
  useEffect(() => {
    if (show) {
      setSize(options.length || 0);
    }
  }, [show, options.length]);

  useClickAway(outerRef, onClickAway);
  const noFilterResult = filterItem !== '' && isEmpty(options);
  const cls = cx(`${prefix}select-option-wrap`, {
    show,
    mini: mini,
    inline: inline
  });
  const container = (getContainer && getContainer()) || document.body;

  function getMultiSelected(selected, option) {
    return filter(selected, option).length ? true : false;
  }
  let arg = {
    options,
    currentValue,
    getMultiSelected,
    focusItem,
    multi,
    handleItemClick,
    setFocusItem
  };
  function getContent() {
    if (noFilterResult) {
      if (!editAble) {
        return <div className="select-no-result">未找到该选项</div>;
      } else {
        return <div className="select-no-result">按回车确定输入</div>;
      }
    }
    if (!virtualList || group || options?.length < 100) {
      return (
        <ul className="select-option-content" ref={innerRefNot}>
          {group
            ? getGroupOptions({
                options,
                arg,
                selectAll,
                groupArr,
                groupRender
              })
            : map(options, (option = {}) => {
                return getOption({ option, ...arg });
              })}
        </ul>
      );
    }
    return (
      <ul className="select-option-content virtual-list" ref={innerRef}>
        {map(items, ({ index }) => {
          let obj = options[index] || {};
          return getOption({ option: obj, ...arg });
        })}
      </ul>
    );
  }

  let content = getContent();

  // 选项为空时，展示空的内容
  if (isEmpty(options) && filterItem === '') {
    content = <div className="select-no-result">{emptyDesc}</div>;
  }
  if (inline) {
    return (
      <div className={cls} ref={overlayRef}>
        <div
          className="scroll-box"
          style={{ maxHeight: optionsMaxHeight }}
          ref={outerRef}
        >
          {content}
        </div>
      </div>
    );
  }
  return createPortal(
    <div
      className={cls}
      ref={overlayRef}
      style={{
        ...position,
        zIndex: optionsZIndex,
        top: typeof position.top === 'string' ? position.top : position.top + 2
      }}
    >
      <div
        className="scroll-box"
        style={{ maxHeight: optionsMaxHeight }}
        ref={outerRef}
      >
        {content}
      </div>
    </div>,
    container
  );
}
