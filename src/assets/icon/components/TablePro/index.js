/*
 * @LastEditTime: 2022-07-11 17:21:49
 * @LastEditors: jinxiaojian
 */
import React from 'react';
import Table from 'rc-table';
import PropTypes from 'prop-types';
import { config } from '../../common/config';
/**
 * 树形选择
 */
export default function TablePro({
  tableLayout,
  prefixCls,
  className,
  id,
  useFixedHeader,
  scroll,
  expandable,
  rowKey,
  rowClassName,
  rowRef,
  data,
  onRow,
  onHeaderRow,
  showHeader,
  title,
  footer,
  emptyText,
  columns,
  components,
  sticky
}) {
  return (
    <Table
      {...{
        tableLayout,
        prefixCls: prefixCls || config.prefixCls + 'tablePro',
        className,
        id,
        useFixedHeader,
        scroll,
        expandable,
        rowKey,
        rowClassName,
        rowRef,
        data,
        onRow,
        onHeaderRow,
        showHeader,
        title,
        footer,
        emptyText,
        columns,
        components,
        sticky
      }}
    ></Table>
  );
}

TablePro.propTypes = {
  /* table-layout CSS属性设置用于布局<table>单元格、行和列的算法。 */
  tableLayout: PropTypes.string,
  // prefixCls: PropTypes.string,
  className: PropTypes.string,
  /* 容器div的标识符 */
  id: PropTypes.string,
  /* 标题是否使用分隔表。 最好设置列的宽度  */
  useFixedHeader: PropTypes.bool,
  /* 表是否可以在x/y方向滚动，x或y可以是一个数字，表示表体的宽度和高度  */
  scroll: PropTypes.object,
  /*   展开配置请参见rc文档,包含:
   defaultExpandAllRows | defaultExpandedRowKeys | expandedRowKeys | expandedRowRender | expandedRowClassName | expandRowByClick | expandIconColumnIndex | expandIcon | indentSize | rowExpandable | onExpand | onExpandedRowsChange | fixed */
  expandable: PropTypes.object,
  /* 如果rowKey为字符串，则使用record[rowKey]作为键。 如果rowKey为function，则rowKey(record)的返回值将被用作键。 */
  rowKey: PropTypes.any,
  rowClassName: PropTypes.any,
  rowRef: PropTypes.any,
  /* 要呈现的数据记录数组 */
  data: PropTypes.array,
  /* 每行设置自定义道具。 */
  onRow: PropTypes.func,
  /* 为每个标题行设置自定义道具。 */
  onHeaderRow: PropTypes.func,
  showHeader: PropTypes.bool,
  /* 表标题渲染函数 */
  title: PropTypes.func,
  /* 表尾巴渲染函数 */
  footer: PropTypes.func,
  /* 当数据为空时显示文本 */
  emptyText: PropTypes.any,
  /* 表的列配置请参见rc文档,包含
  key | className | colSpan  | title | dataIndex | width | fixed | align | ellipsis | onCell | onHeaderCell | render
  */
  columns: PropTypes.array,
  /* 覆盖表元素，详见rc文档 */
  components: PropTypes.object,
  /* 保持标题和滚动条 */
  sticky: PropTypes.any
};

TablePro.defaultProps = {};
