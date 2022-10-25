import React, { memo } from 'react';
import cx from 'classnames';
import { nfn } from '../../common';
import { omit, get } from 'lodash';
const isDataEmpty = data => !data && data !== 0;
export function Column({
  data,
  index,
  rowIndex,
  open,
  lineHeight,
  checked,
  config = {},
  columnEmptyLabel
}) {
  const {
    key,
    render,
    align,
    limit,
    width,
    emptyLabel,
    colSpanFn,
    rowSpanFn,
    style = {},
    className
  } = config;
  const cls = cx('table-row-item', className, {
    pdl10: true,
    pdr10: true,
    limit
  });
  // 数据为空时当前显示的组件，column中传入的优先级>table传入的
  const emptyShowLabel = emptyLabel || columnEmptyLabel;
  const columnData = get(data, key);
  const columnShow = isDataEmpty(columnData) ? emptyShowLabel : columnData;
  const content = render
    ? render(columnData, data, {
        rowIndex,
        columnIndex: index,
        expandShow: open,
        checked,
        emptyLabel: emptyShowLabel
      })
    : columnShow;
  let colSpan = 1;
  let rowSpan = 1;

  if (colSpanFn) {
    colSpan = colSpanFn(columnData, data, {
      rowIndex,
      columnIndex: index,
      expandShow: open,
      checked,
      emptyLabel: emptyShowLabel
    });
  }

  if (rowSpanFn) {
    rowSpan = rowSpanFn(columnData, data, {
      rowIndex,
      columnIndex: index,
      expandShow: open,
      checked,
      emptyLabel: emptyShowLabel
    });
  }

  if (content === null) {
    return '';
  }

  // 当rowSpan = 0 时，视为合并
  if (rowSpan === 0) {
    return '';
  }

  return (
    <td
      className={cls}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{
        height: lineHeight,
        textAlign: align || 'center',
        maxWidth: width,
        ...style
      }}
      // valign={isExpand ? 'center' : undefined}
    >
      {content}
    </td>
  );
}

function Row({
  columns,
  data,
  index,
  active,
  open,
  className,
  lineHeight,
  striped,
  onClick,
  checked,
  setRowClassFn,
  totalData,
  draggable,
  style,
  selectRowBgColor,
  columnEmptyLabel,
  ...others
}) {
  const cls = cx(
    'table-body-row',
    className,
    {
      active,
      striped,
      checked
    },
    setRowClassFn ? setRowClassFn(data) : false
  );
  const onRowClick = () => onClick(data, index, totalData);
  const columnProps = {
    data,
    rowIndex: index,
    lineHeight,
    open
  };

  return (
    <tr
      className={cls}
      draggable={draggable}
      onClick={onRowClick}
      style={{
        height: lineHeight,
        backgroundColor: checked && selectRowBgColor,
        ...style
      }}
      {...omit(others, ['flatColumns'])}
    >
      {columns.map((column, i) => (
        <Column
          key={`table-row-item-${index}-${i}`}
          {...columnProps}
          config={column}
          checked={checked}
          columnEmptyLabel={columnEmptyLabel}
          index={i}
        />
      ))}
    </tr>
  );
}

Row.defaultProps = {
  onClick: nfn
};

export default memo(Row);
