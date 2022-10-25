import { Icon } from '@';
import classNames from 'classnames';
import get from 'lodash/get';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useRefs, useTouchMove } from '../../common/hooks';
import LeftArrow from './images/leftArrow.svg';
import RightArrow from './images/rightArrow.svg';
import Item from '../Item';

export default function TabHeader({
  prefixCls,
  activeKey,
  childPanels,
  onTitleClick,
  theme
}) {
  const navWrapperRef = useRef(null);
  const navInnerRef = useRef(null);
  const [getItemRef] = useRefs(null);
  const [transformLeft, setTransformLeft] = useState(0);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [showArrow, setShowArrow] = useState(false);
  // const [showRightArrow, setShowRightArrow] = useState(false);
  const [activeItemWidth, setActiveItemWidth] = useState(0);
  const [activeItemLeft, setActiveItemLeft] = useState(0);
  const [tabSizes, setTabSizes] = useState(new Map());
  let transformMin = 0;
  let transformMax = 0;
  transformMin = Math.min(0, wrapperWidth - innerWidth);
  transformMax = Math.max(0, wrapperWidth - innerWidth);

  useTouchMove(navWrapperRef, offsetX => {
    function doMove(setState, offset) {
      setState(value => {
        const newValue = alignInRange(value + offset);
        return newValue;
      });
    }
    // no enough space
    if (wrapperWidth >= innerWidth) {
      return false;
    }
    doMove(setTransformLeft, offsetX);
    return true;
  });

  function alignInRange(value) {
    if (value < transformMin) {
      return transformMin;
    }
    if (value > transformMax) {
      return transformMax;
    }
    return value;
  }

  const onListHolderResize = () => {
    const offsetWidth = navWrapperRef.current?.offsetWidth || 0;
    const innerWidth = navInnerRef.current?.offsetWidth || 0;
    setWrapperWidth(offsetWidth);
    setInnerWidth(innerWidth);
    const itemSize = new Map();
    childPanels.forEach(({ props = {} }) => {
      const { keys } = props;
      const item = getItemRef(keys).current;
      // 获取inner的大小

      if (item) {
        const itemInner = item.firstChild;

        itemSize.set(keys, {
          width: itemInner.offsetWidth,
          left: item.offsetLeft + itemInner.offsetLeft
        });
      }
    });
    setTabSizes(itemSize);
  };

  // 监听外部容器变化
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      onListHolderResize();
    });
    resizeObserver.observe(navWrapperRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 监听内容长度变化
  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      onListHolderResize();
    });
    resizeObserver.observe(navInnerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    onListHolderResize();
  }, [activeKey, childPanels.map(tab => tab.key).join('-')]);

  const moveLinkBar = () => {
    setActiveItemWidth(tabSizes.get(activeKey)?.width);
    setActiveItemLeft(tabSizes.get(activeKey)?.left);
  };

  useEffect(() => {
    moveLinkBar();
  }, [activeKey, tabSizes]);

  useEffect(() => {
    if (innerWidth > wrapperWidth) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  }, [transformLeft, innerWidth, wrapperWidth]);

  const handleScrollLeft = () => {
    setTransformLeft(0);
  };

  const handleScrollRight = () => {
    setTransformLeft(wrapperWidth - innerWidth);
  };

  const handleNavItemClick = (e, keys, disabled) => {
    onTitleClick(keys, disabled);
  };

  return (
    <div className={`${prefixCls}tab-header`}>
      {showArrow ? (
        <div
          className={`${prefixCls}tab-header-arrow`}
          onClick={handleScrollLeft}
        >
          <Icon link={LeftArrow} />
        </div>
      ) : null}
      <div className={`${prefixCls}tab-header-wrapper`} ref={navWrapperRef}>
        <div
          className={`${prefixCls}tab-header-list`}
          ref={navInnerRef}
          style={{ transform: `translate(${transformLeft}px,0px)` }}
        >
          {React.Children.map(childPanels, child => {
            if (!child) return null;
            const childProps = get(child, 'props') || {};
            const { keys, header, disabled } = childProps;
            const active = keys === activeKey;
            const classes = classNames(`${prefixCls}tab-header-item`, {
              active,
              disabled,
              showArrow
            });
            return (
              <div
                className={classes}
                onClick={e => handleNavItemClick(e, keys, disabled)}
                key={keys}
                ref={getItemRef(keys)}
              >
                <div className={`${prefixCls}tab-header-inner`}>{header}</div>
              </div>
            );
          })}
          <Item show={theme !== 'card'}>
            <div
              className={`${prefixCls}tab-header-link-bar`}
              style={{
                width: `${activeItemWidth}px`,
                left: `${activeItemLeft}px`
              }}
            ></div>
          </Item>
        </div>
      </div>
      {showArrow ? (
        <div
          className={`${prefixCls}tab-header-arrow arrow-right`}
          onClick={handleScrollRight}
        >
          <Icon link={RightArrow} />
        </div>
      ) : null}
    </div>
  );
}
