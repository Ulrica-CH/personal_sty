import React, { useEffect, useRef, memo } from 'react';
import cx from 'classnames';
import map from 'lodash/map';
import { findIndex, isEmpty, isEqual, find } from 'lodash';
import { nfn } from '../../common';
import 'element.scrollintoviewifneeded-polyfill';
import Item from '../Item';
import { createPortal } from 'react-dom';

function Options({
  position,
  value: currentValue,
  options,
  show,
  filterItem,
  handleItemClick,
  focusItem,
  setFocusItem,
  getContainer,
  overlayRef,
  opeartionOptions
}) {
  // const getOptions = () => {
  //   return filter(options, (item) => item.value.indexOf(value) === 0);
  // };

  // 鼠标下移时，让focusItem跟随滚动
  useEffect(() => {
    const wrap = overlayRef.current;
    const inner = wrap.querySelector('.select-option-content');
    const items = Array.from(wrap.querySelectorAll('.select-option-item'));

    if (!wrap || !inner) return nfn;

    const focusIndex = findIndex(options, item => item === focusItem);
    const item = items[focusIndex];

    item && item.scrollIntoViewIfNeeded(false);
  }, [focusItem, options]);

  const filteredOptions = options;

  const noFilterResult = isEmpty(filteredOptions);
  const cls = cx('select-option-wrap smart-input', {
    show
  });
  const content = noFilterResult ? (
    <div className="select-no-result">未找到该选项</div>
  ) : (
    <ul className="select-option-content" onClick={e => e.stopPropagation()}>
      {map(filteredOptions, (option = {}) => {
        const { label, value, disabled } = option;
        const active = isEqual(option, currentValue);
        const focus = isEqual(option, focusItem);

        const cls = cx('select-option-item ', {
          active,
          focus,
          disabled
        });
        return (
          <li
            key={'select' + label + value}
            className={cls}
            title={label}
            onClick={e => {
              if (!disabled) {
                handleItemClick(option);
              } else {
                e.stopPropagation();
              }
            }}
            onMouseEnter={() => setFocusItem(option)}
          >
            {value}
            <Item
              show={
                !find(opeartionOptions, item => item.value === option.value)
              }
            >
              &nbsp;- {label}
            </Item>
          </li>
        );
      })}
    </ul>
  );

  return createPortal(
    <div
      className={cls}
      ref={overlayRef}
      style={{
        ...position,
        top: typeof position.top === 'string' ? position.top : position.top + 2
      }}
    >
      {content}
    </div>,
    getContainer()
  );
}

export default memo(Options);
