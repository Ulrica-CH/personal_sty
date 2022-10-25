import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { nfn } from '../../common';
import last from 'lodash/last';
import head from 'lodash/head';
import isNumber from 'lodash/isNumber';
import { config } from '../../common/config';
import rightIcon from './images/left.svg';
import Icon from '../Icon';
import Select from '../Select';
import SearchInput from '../SearchInput';

const getTotalPage = (total, pageSize) => {
  return Math.ceil(total / pageSize);
};

// 获取start开始的total个数的数组
const getArraysWithIndex = (total, start = 0) => {
  return Array(total)
    .fill(1)
    .map((item, index) => start + index + 1);
};
// 获取一个current周围的5个数
const getPageSurround = (total, current, surround) => {
  if (current < surround - 1) {
    return getArraysWithIndex(surround);
  }
  if (current > total - (surround - 2)) {
    return getArraysWithIndex(surround, total - surround);
  }
  return getArraysWithIndex(surround, current - (surround - 2));
};
const getPages = (pageNum, current, surround) => {
  // 页数 < 7 不需要快速跳转
  if (pageNum <= 7) return getArraysWithIndex(pageNum);

  const nums = getPageSurround(pageNum, current, surround);
  const prev = head(nums) === 1 ? [] : head(nums) === 2 ? [1] : [1, 'jumpPrev'];
  const next =
    last(nums) === pageNum
      ? []
      : last(nums) === pageNum - 1
      ? [pageNum]
      : ['jumpNext', pageNum];
  return [...prev, ...nums, ...next].filter(Boolean);
};

const disabledPrev = current => current <= 1;
const disabledNext = (current, total) => current >= total;

const onPrev = (page, setPage) => {
  return () => {
    if (disabledPrev(page)) return;
    setPage(page - 1);
  };
};

const onNext = (page, setPage, total) => {
  return () => {
    if (disabledNext(page, total)) return;
    setPage(page + 1);
  };
};

const isJump = num => {
  if (isNumber(num)) return false;

  return num.indexOf('jump') >= 0;
};

const isJumpPrev = num => {
  if (!isJump(num)) return false;

  return num === 'jumpPrev';
};

const isJumpNext = num => {
  if (!isJump(num)) return false;

  return num === 'jumpNext';
};

function Basic(props) {
  const {
    itemNum,
    current,
    pageSize,
    style,
    className,
    onChange,
    radius
  } = props;
  const hasPrev = current > 1;
  const hasNext = itemNum === pageSize;
  const onClick = next => {
    return () => {
      if (next < 0 && !hasPrev) {
        return;
      }
      if (next > 0 && !hasNext) {
        return;
      }
      onChange(current + next);
    };
  };
  const cls = cx(
    {
      [`${config.prefixCls}pagination`]: true,
      radius
    },
    className
  );
  const prevCls = cx({
    'pagination-disabled': !hasPrev,
    'pagination-prev': true,
    'pagination-prev-btn': true
  });
  const nextCls = cx({
    'pagination-disabled': !hasNext,
    'pagination-next': true,
    'pagination-next-btn': true
  });
  // wwx 当前页面没有数据时，需要展示分页
  if (!hasPrev && !hasNext && itemNum) {
    return '';
  }
  return (
    <ul className={cls} style={style} unselectable="unselectable">
      <li
        onClick={onClick(-1)}
        title="上一页"
        className={`${prevCls} pagination-basic-pre`}
      >
        <Icon link={rightIcon} className="pagination-icon-arrow" />
        <span>上一页</span>
      </li>
      <li
        onClick={onClick(1)}
        title="下一页"
        className={`${nextCls} pagination-basic-next`}
      >
        <span>下一页</span>
        <Icon link={rightIcon} className="pagination-icon-arrow" />
      </li>
    </ul>
  );
}

/**
 * 分页组件
 */
function Pagination(props) {
  const {
    current,
    total,
    radius,
    onChange,
    className,
    style,
    pageSizeOptions,
    showSizeChanger,
    surround,
    onShowSizeChange,
    showQuickJumper
  } = props;
  let { pageSize } = props;
  const [page, setPage] = useState(current);
  const [jumpNum, setJumpNumber] = useState();

  pageSize = pageSize || pageSizeOptions[0] || 10;
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  useEffect(() => {
    setPage(current);
  }, [current]);
  useEffect(() => {
    setCurrentPageSize(pageSize);
  }, [pageSize]);

  if (total < 1) {
    return <Basic {...props} current={current} />;
  }

  // 当内容小于一页的时候，不展示分页
  if (total < currentPageSize) {
    if (!showSizeChanger) return '';
  }

  const pagesNum = getTotalPage(total, currentPageSize);
  const pages = getPages(pagesNum, page, surround);

  const cls = cx(`${config.prefixCls}pagination`, className, 'clearfix', {
    radius
  });
  const prevCls = cx('pagination-prev', {
    'pagination-disabled': disabledPrev(page)
  });
  const nextCls = cx('pagination-next', {
    'pagination-disabled': disabledNext(page, pagesNum)
  });

  // const prevDisabledImgCls = cx('link-img', {
  //   'disabled-img': disabledPrev(page)
  // });
  // const nextDisabledImgCls = cx('link-img', 'right-link-img', {
  //   'disabled-img': disabledNext(page, pagesNum)
  // });

  const onPageChange = page => {
    if (page < 1) {
      page = 1;
    }
    if (page > pagesNum) {
      page = pagesNum;
    }
    setPage(page);
    onChange(page);
  };

  const pageSizeOptionsList = pageSizeOptions.map(value => {
    return { label: `每页/${value}条`, value };
  });

  console.log(jumpNum);

  return (
    <ul className={cls} style={style}>
      <li className="pagination-total">
        共有<span className="pagination-total-num">{total}</span>条信息
      </li>
      <li
        title="上一页"
        onClick={onPrev(page, onPageChange)}
        className={prevCls}
      >
        <Icon link={rightIcon} className="pagination-icon-arrow" />
      </li>
      {pages.map(num => {
        const itemCls = cx('pagination-item', {
          'pagination-item-active': page === num,
          'pagination-jump-prev': isJumpPrev(num),
          'pagination-jump-next': isJumpNext(num)
        });
        return (
          <li
            key={'pagination' + num}
            className={itemCls}
            onClick={() => {
              if (isJumpPrev(num)) {
                return onPageChange(page - 5);
              }
              if (isJumpNext(num)) {
                return onPageChange(page + 5);
              }
              return onPageChange(num);
            }}
          >
            {isJump(num) ? '···' : num}
          </li>
        );
      })}
      <li
        title="下一页"
        onClick={onNext(page, onPageChange, pagesNum)}
        className={nextCls}
      >
        <Icon link={rightIcon} className="pagination-icon-arrow" />
      </li>
      {showSizeChanger && (
        <li>
          <Select
            stopPressBack
            options={pageSizeOptionsList}
            className="pagination-options-size-changer"
            clearable={false}
            mini
            background={false}
            defaultValue={currentPageSize}
            onChange={e => {
              setCurrentPageSize(e);
              setPage(1);
              onShowSizeChange(e);
              onPageChange(1);
            }}
          />
        </li>
      )}
      {showQuickJumper && (
        <span className="quick-jumper">
          跳至
          <SearchInput
            mini
            defaultValue={jumpNum}
            clearable={false}
            showSearchIcon={false}
            onChange={setJumpNumber}
            onSearch={page => {
              if (isNaN(Number(page))) {
                return setJumpNumber('');
              }
              onPageChange(Number(page));
              setJumpNumber('');
            }}
            inputWidth={40}
          />
          页
        </span>
      )}
    </ul>
  );
}

Pagination.defaultProps = {
  current: 1,
  radius: true,
  onChange: nfn,
  pageSizeOptions: [10, 20, 50, 100],
  showSizeChanger: false,
  onShowSizeChange: nfn,
  surround: 5,
  showQuickJumper: false
};

Pagination.propTypes = {
  /** 当前的在第几页，比如一共5页面，current=1，则显示当前在第一页 */
  current: PropTypes.number.isRequired,
  /** 点击切换分页的时候，调用的函数 */
  onChange: PropTypes.func.isRequired,
  /** 当前分页所有的总数目 */
  total: PropTypes.number.isRequired,
  /** 每页显示多少条数据，默认是10 */
  pageSize: PropTypes.number,
  /** 是否圆角 */
  radius: PropTypes.bool,
  /**指定每页可以显示多少条 */
  pageSizeOptions: PropTypes.arrayOf(
    PropTypes.number,
    PropTypes.number,
    PropTypes.number,
    PropTypes.number
  ),
  /**是否展示pageSize切换器 */
  showSizeChanger: PropTypes.bool,
  /**pageSize 变化的回调 */
  onShowSizeChange: PropTypes.func,
  /** 是否可以快速跳转到某页 */
  showQuickJumper: PropTypes.bool
};

export default Pagination;
