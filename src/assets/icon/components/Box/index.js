import React, { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import iconOpen from './images/open.svg';
import iconClose from './images/close.svg';

import Icon from '../Icon';
import Loading from '../Loading';
import NoResult from '../NoResult';
import Item from '../Item';
import { config } from '../../common/config';

import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import { nfn } from '../../common';

function getContent({
  show,
  loading,
  error,
  children,
  emptyDesc,
  emptyHide,
  emptyIcon,
  miniEmpty,
  loadingIcon,
  prefix
}) {
  if (error) {
    return (
      <NoResult
        mini={miniEmpty}
        icon={emptyIcon}
        desc={config.errorResolver(error)}
      />
    );
  }
  if (loading) {
    return (
      <Loading className={`${prefix}-loading`} size="md" icon={loadingIcon} />
    );
  }
  if (show) {
    return children;
  }
  if (emptyHide) {
    return '';
  }
  return <NoResult mini={miniEmpty} icon={emptyIcon} desc={emptyDesc} />;
}

function Title({ title, collapse, toggleRender, open, setOpen, prefix }) {
  const onOpen = e => {
    if (!collapse) return;
    e.stopPropagation();
    setOpen(!open);
  };
  return (
    <div
      className={`${prefix}-title`}
      test-role="time-content"
      onClick={onOpen}
    >
      {title}
      <Item show={collapse}>
        <div className={`${prefix}-title-toggle`} onClick={onOpen}>
          {toggleRender ? (
            toggleRender(open)
          ) : (
            <Fragment>
              <Icon
                className={`${prefix}-title-toggle-icon`}
                link={open ? iconClose : iconOpen}
              />
              {open ? '收起' : '展开'}
            </Fragment>
          )}
        </div>
      </Item>
    </div>
  );
}

/**
 * 基本的盒子，用于组成页面的各个小容器
 * 可设置标题，自带Loading样式，自身可判断是否有数据而进行展示/隐藏
 */
function Box({
  title,
  data,
  className,
  border,
  padding,
  radius,
  withBg,
  background,
  emptyIcon,
  collapse,
  defaultOpen,
  error,
  isLoading,
  children,
  emptyDesc,
  emptyHide,
  miniEmpty,
  contentHeight,
  style,
  onToggle,
  toggleRender,
  prefixCls,
  shadow,
  loadingIcon
}) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    if (defaultOpen !== open) {
      setOpen(defaultOpen);
    }
  }, [defaultOpen]);

  const prefix = `${prefixCls || config.prefixCls}box`;

  const classes = classNames(prefix, className, {
    'with-bg': withBg || background,
    border,
    collapse,
    open,
    radius,
    shadow
  });

  const isBoxShow = data => {
    // 正在加载时，展示Box
    if (Array.isArray(data)) {
      return data.length;
    } else if (isObject(data)) {
      return !isEmpty(data);
    } else {
      return data && data !== 0;
    }
  };
  const show = isBoxShow(data);

  const onToggleClick = useCallback(() => {
    setOpen(!open);
    onToggle(!open);
  }, [open, onToggle]);

  return (
    <div
      className={classes}
      style={{
        padding: padding === undefined ? '' : padding,
        ...style
      }}
    >
      <Item show={title}>
        <Title
          title={title}
          collapse={collapse}
          toggleRender={toggleRender}
          open={open}
          setOpentitle={title}
          setOpen={onToggleClick}
          prefix={prefix}
        />
      </Item>
      {open ? (
        <div
          className={`${prefix}-content`}
          style={{
            height: contentHeight
          }}
        >
          {getContent({
            show,
            loading: isLoading,
            error,
            children,
            emptyDesc,
            emptyHide,
            emptyIcon,
            miniEmpty,
            prefix,
            loadingIcon
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
Box.defaultProps = {
  isLoading: false,
  defaultOpen: true,
  radius: true,
  emptyHide: false,
  miniEmpty: true,
  onToggle: nfn
};
Box.propTypes = {
  /** 盒子的标题，可以省略 */
  title: PropTypes.any,
  /** 盒子依赖的数据，会根据是否有该数据而判断是否展示数据为空, 当data为boolean的时候，直接判断是否展示盒子依赖的数据 */
  data: PropTypes.any,
  /** 数据为空时展示的描述 */
  emptyDesc: PropTypes.string,
  /** 是否圆角 */
  radius: PropTypes.bool,
  /** 是否带阴影 */
  shadow: PropTypes.bool,
  /** 数据为空时，展示小版本暂无数据 */
  miniEmpty: PropTypes.bool,
  /** 数据为空时是否隐藏 */
  emptyHide: PropTypes.bool,
  /** 是否正在Loading, 是的话会自带Loading样式 */
  isLoading: PropTypes.bool,
  /** 是否带border */
  border: PropTypes.bool,
  /** 自定义样式 */
  style: PropTypes.object,
  /** 内边距 */
  padding: PropTypes.number,
  /** 标题是否带background */
  background: PropTypes.bool,
  /** 是否可以折叠 */
  collapse: PropTypes.bool,
  /** 可以折叠时，是否默认展开 */
  defaultOpen: PropTypes.bool,
  /** 自定义折叠按钮 */
  toggleRender: PropTypes.func,
  /** 自定义盒子内容高度 */
  contentHeight: PropTypes.number,
  /** 自定义loading的icon */
  loadingIcon: PropTypes.string
};

export default Box;
