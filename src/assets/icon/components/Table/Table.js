import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import compose from 'lodash/fp/compose';

import { debounce, isEmpty } from 'lodash';
import { withLimit, withExpand, withClick, withSelect } from './helper';

import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import NoResult from '../NoResult';
import { useDefault } from '../../common/hooks';
import { nfn } from '../../common';

const handleResize = debounce((columnIndex, size, columns, setColumns) => {
  const nextColumns = [...columns];
  // 当前列
  const curColumn = columns[columnIndex];
  // 下一列
  const nextColumn = columns[columnIndex + 1];

  if (!curColumn || !nextColumn) return;

  // 改变的宽度
  const changed = curColumn.width - size.width;

  nextColumns[columnIndex] = {
    ...curColumn,
    width: size.width
  };
  nextColumns[columnIndex + 1] = {
    ...nextColumn,
    width: nextColumn.width + changed
  };

  setColumns(nextColumns);
}, 300);

function TableWrap({ scrollHeight, children, columns, className }) {
  return scrollHeight ? (
    <div className={className}>{children}</div>
  ) : (
    <table className={className}>
      <ColGroup columns={columns} />
      {children}
    </table>
  );
}

function Table({
  columns,
  data,
  border,
  dark,
  hover,
  background,
  striped,
  noDataTip,
  emptyIcon,
  showHeader,
  scrollHeight,
  sortFlag,
  sortKey,
  lineHeight,
  className,
  handleSortChange,
  hasMore,
  showMore,
  expandRowRender,
  expandRow,
  canRowExpand,
  handleExpandChange,
  activeIndex,
  onClick,
  selected,
  checkboxType,
  resizeable,
  draggable,
  setRowClassFn,
  handleDragChange,
  miniEmpty,
  defaultSearch,
  CustomMoreComp,
  selectRowBgColor,
  columnEmptyLabel
}) {
  const [innerColumns, setColumns] = useDefault(columns);
  const [resultData, setData] = useDefault(data);
  const cls = cx('table', className, {
    border,
    hover,
    background: background && !striped,
    striped,
    resizeable,
    dark
  });

  // 拍平columns
  const formatColumns = columns => {
    return columns.reduce(
      (total, cur) => total.concat(cur.children || cur),
      []
    );
  };

  const flatColumns = useMemo(() => formatColumns(innerColumns), [
    innerColumns
  ]);

  const bodyProps = {
    columns: flatColumns,
    data: resultData,
    setData,
    scrollHeight,
    lineHeight,
    hasMore,
    showMore,
    expandRow,
    expandRowRender,
    canRowExpand,
    activeIndex,
    onClick,
    handleExpandChange,
    selected,
    checkboxType,
    setRowClassFn,
    draggable,
    handleDragChange,
    CustomMoreComp,
    selectRowBgColor,
    columnEmptyLabel
  };

  const noData = (
    <tbody className="table-body">
      <tr>
        <td colSpan={flatColumns.length}>
          <NoResult mini={miniEmpty} desc={noDataTip} icon={emptyIcon} />
        </td>
      </tr>
    </tbody>
  );

  return (
    <TableWrap
      className={cls}
      scrollHeight={scrollHeight}
      columns={innerColumns}
      flatColumns={flatColumns}
      selectRowBgColor={selectRowBgColor}
    >
      {showHeader ? (
        <Header
          resizeable={resizeable}
          scrollHeight={scrollHeight}
          columns={innerColumns}
          flatColumns={flatColumns}
          sortFlag={sortFlag}
          sortKey={sortKey}
          handleSortChange={handleSortChange}
          handleResize={handleResize}
          setColumns={setColumns}
          defaultSearch={defaultSearch}
        />
      ) : (
        <></>
      )}
      {isEmpty(data) ? (
        scrollHeight ? (
          <table>{noData}</table>
        ) : (
          noData
        )
      ) : (
        <Body body {...bodyProps} />
      )}
    </TableWrap>
  );
}

Table.defaultProps = {
  data: [],
  columns: [],
  border: true,
  hover: true,
  striped: false,
  background: false,
  showHeader: true,
  defaultRenderExpand: false,
  expandOnly: false,
  selectRowBgColor: '#fff',
  noDataTip: '暂无数据',
  handleDragChange: nfn,
  handleRowClick: nfn,
  handleSelectChanged: nfn,
  handleExpandChange: nfn,
  handleSortChange: nfn,
  canRowSelected: () => true,
  miniEmpty: true,
  defaultSearch: {},
  columnEmptyLabel: <span className="table-row-item-empty-label">---</span>
};

Table.propTypes = {
  /** 内容数据 */
  data: PropTypes.array,
  /**
   * 列的规则
   * {
   *   title: '列标题',
   *   key: '字段',
   *   render: '渲染函数，可进行自定义渲染',
   *   width: '设置宽度',
   *   align: '对齐',
   *   limit: '设置是否单元格不换行处理'
   * }
   */
  columns: PropTypes.array,
  /** 前端分页，用于限制一次展示多少条 */
  pageLimit: PropTypes.number,
  /** 是否带边框 */
  border: PropTypes.bool,
  /** 是否带有hover样式 */
  hover: PropTypes.bool,
  sortable: PropTypes.bool,
  /** 带筛选框时 选中行带自定义背景色 */
  selectRowBgColor: PropTypes.string,
  /** 自定义无数据图标 */
  emptyIcon: PropTypes.any,
  /** 无数据提示 */
  noDataTip: PropTypes.string,
  /** 是否带有背景色 */
  background: PropTypes.bool,
  /** 是否隔行换色 */
  striped: PropTypes.bool,
  /** 是否展示头 */
  showHeader: PropTypes.bool,
  /** 是否行可点击 */
  clickable: PropTypes.bool,
  /** 是否为多选表格 */
  select: PropTypes.bool,
  /** 用于初始化列筛选的值，格式为： {[对应列的key]: 默认值} */
  defaultSearch: PropTypes.object,
  /** 多选更改时的回调 */
  handleSelectChanged: PropTypes.func,
  /** 判定行是否可以被选中，不能选中则禁用 */
  canRowSelected: PropTypes.func,
  /** 点击行的回调 */
  handleRowClick: PropTypes.func,
  /** 每行的高度 */
  lineHeight: PropTypes.number,
  /** 可展开表格的渲染 */
  expandRowRender: PropTypes.func,
  /** 是否可以展开行, 会回传data,index参数 */
  canRowExpand: PropTypes.func,
  /** 是否只能展开第一行 */
  expandOnly: PropTypes.bool,
  /** 默认展开第一行 */
  defaultRenderExpand: PropTypes.bool,
  /** 隐藏展开图标 */
  hideExpandIcon: PropTypes.bool,
  /** 改变排序时的回调 */
  handleSortChange: PropTypes.func,
  /** 当前排序的key */
  sortKey: PropTypes.string,
  /** 当前排序的顺序 */
  sortFlag: PropTypes.oneOf(['asc', 'desc']),
  /** 是否可改变宽度 */
  resizeable: PropTypes.bool,
  /** 是否可拖拽 */
  // draggable: PropTypes.bool,
  /** 拖拽回调 */
  // handleDragChange: PropTypes.func,
  /** 自定义行类名 */
  setRowClassFn: PropTypes.func,
  /** 是否展示小的暂无数据 */
  miniEmpty: PropTypes.bool,
  /** 自定义查看给更多 */
  CustomMoreComp: PropTypes.element,
  /** 自定义整个table  column字段数据为空时的显示， 默认为 --- ，column继承该值，也可以通过column的emptyLabel属性自定义该列显示的内容*/
  columnEmptyLabel: PropTypes.any
};

export default compose(
  withSelect,
  withClick,
  withExpand,
  withLimit,
  memo
)(Table);
