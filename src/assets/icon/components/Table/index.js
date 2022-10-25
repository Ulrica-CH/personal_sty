import React, { useState, memo } from 'react';
import BaseTable from './Table';
import { get } from 'lodash';
import cx from 'classnames';

export function HeaderItem({ children, ...others }) {
  const [focus, setFocus] = useState(false);
  const cls = cx('table-header-select-item', {
    focus
  });
  return (
    <div className={cls} {...others}>
      {children({ focus, setFocus })}
    </div>
  );
}

HeaderItem.type = 'select';

BaseTable.HeaderItem = HeaderItem;

// 自动获取每行的rowSpan
BaseTable.autoGetRowSpan = (list, key) => {
  const rowSpans = [];
  let prev = get(list[0], key);
  let sameCount = 0;
  let startIndex = 0;

  for (let i = 1; i < list.length; i++) {
    const item = get(list[i], key);

    // 如果相同，则当前行的rowSpan为0
    if (item === prev) {
      sameCount += 1;
      rowSpans[i] = 0;
    } else {
      // 如果不同，则重置startIndex, 设置第一次相同的行的rowSpan为相同的个数 + 1
      rowSpans[startIndex] = sameCount + 1;
      startIndex = i;
      prev = item;
      sameCount = 0;
    }
  }

  // 最后相同的区间
  rowSpans[startIndex] = sameCount + 1;

  return rowSpans;
};

export default BaseTable;
