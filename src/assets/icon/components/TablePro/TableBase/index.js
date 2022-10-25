/*
 * @LastEditTime: 2022-07-11 17:27:20
 * @LastEditors: jinxiaojian
 */
import { TablePro as Table } from '../index';
// 调试中兼容模式待定

import React, { memo, useMemo, useState, useEffect } from 'react';
import { compose } from 'lodash/fp';
import { connect } from '@common/easy';
import { errorDecorator } from '@common/highErrorBoundary';
import { map, cloneDeep, pull, find } from 'lodash';
import cx from 'classnames';
import SortIcon from './SortIcon';
import Checkbox from '../../Checkbox';
import NoResult from '../../NoResult';
// import './index.cssmodule.styl';
function TableBase({ ...arg }) {
  const {
    data: preData,
    columns: preColumns,
    /** 前端分页，用于限制一次展示多少条 */
    pageLimit,
    /** 是否带边框 */
    border = true,
    /** 是否带有hover样式 */
    hover,
    // 是否可排序(无用已废弃)
    sortable,
    /** 带筛选框时 选中行带自定义背景色 */
    selectRowBgColor,
    /** 自定义无数据图标 */
    emptyIcon,
    /** 无数据提示 */
    noDataTip,
    /** 是否带有背景色 */
    background,
    /** 是否隔行换色 */
    striped,
    showHeader,
    /** 是否行可点击 */
    clickable,
    /** 是否为多选表格 */
    select,
    /** 用于初始化列筛选的值，格式为： {[对应列的key]: 默认值} */
    defaultSearch,
    /** 多选更改时的回调 */
    handleSelectChanged,
    /** 判定行是否可以被选中，不能选中则禁用 */
    canRowSelected,
    /** 点击行的回调 */
    handleRowClick,
    /** 每行的高度 */
    lineHeight,
    expandRowRender,
    canRowExpand: preCanRowExpand,
    expandOnly,
    /** 默认展开第一行 */
    defaultRenderExpand,
    /** 隐藏展开图标 */
    hideExpandIcon,
    /** 改变排序时的回调 */
    handleSortChange,
    /** 当前排序的key */
    sortKey,
    /** 当前排序的顺序 */
    sortFlag,
    /** 是否可改变宽度 */
    resizeable,
    /** 拖拽参数 */
    drag,
    /** 自定义行类名 */
    setRowClassFn,
    /** 是否展示小的暂无数据 */
    miniEmpty,
    /** 自定义查看给更多 */
    CustomMoreComp,
    /** 自定义整个table  column字段数据为空时的显示， 默认为 --- ，column继承该值，也可以通过column的emptyLabel属性自定义该列显示的内容*/
    columnEmptyLabel,
    // 类名
    className,
    // 加载状态
    loading,
    // 滚动距离
    scrollWidth,
    // 去除thead分割线
    deleteTheadSplitLine
  } = arg;
  const cls = cx(className, {
    border,
    hover,
    background: background && !striped,
    striped,
    resizeable,
    deleteTheadSplitLine
  });

  const [keys, setKeys] = useState(defaultRenderExpand ? ['table0'] : []);
  const [selectS, setSelectS] = useState([]);
  const canRowExpand = (e, r) => {
    if (expandOnly) {
      if (e) {
        setKeys([r.key]);
      } else {
        setKeys([]);
      }
    }
    preCanRowExpand && preCanRowExpand(e, r);
  };
  const expandable = {
    expandedRowKeys: keys,
    onExpand: canRowExpand,
    expandedRowRender: expandRowRender,
    expandedRowClassName: (record, i) => `tbfe-expand-row-${i}`,
    expandRowByClick: true
  };
  var data = useMemo(
    () =>
      map(preData, (x, i) => ({
        ...x,
        key: `table${i}`
      })),
    [preData]
  );

  function getTitle(column) {
    if (column.sortable) {
      return (
        <div className="flexStart">
          <div className="">{column.title}</div>

          <SortIcon
            {...{
              column,
              sortKey,
              sortFlag,
              handleSortChange
            }}
          ></SortIcon>
        </div>
      );
    }
    return column.title;
  }
  const columns = useMemo(() => {
    function getNewColumns(arr, f = '') {
      const newColumns = map(arr, (x, i) => {
        const obj = {
          width: x.width || 200,
          fixed: x.fixed,
          dataIndex: x.key,
          oldKey: x.key,
          title: getTitle(x),
          key: `${f}col${i}`,
          render: x.render,
          ellipsis: x.limit,
          children: x.children
            ? getNewColumns(x.children, `${f}col${i}`)
            : undefined
        };
        return obj;
      });
      if (select && !f) {
        const obj = {
          dataIndex: 'select',
          width: 50,
          title: (
            <Checkbox
              defaultChecked={false}
              label=""
              value={'all'}
              onChange={val => {
                if (val) {
                  const dataS = [];
                  for (let i = 0; i < data.length; i++) {
                    if (canRowSelected) {
                      if (canRowSelected(data[i], i)) dataS.push(data[i].key);
                    } else {
                      dataS.push(data[i].key);
                    }
                  }
                  setSelectS(dataS);
                } else {
                  setSelectS([]);
                }
              }}
            />
          ),
          key: 'column' + 'select',
          render: (val, row, i) => (
            <Checkbox
              key={JSON.stringify(selectS)}
              defaultChecked={selectS?.indexOf(row.key) > -1}
              label=""
              disabled={canRowSelected ? !canRowSelected(row, i) : false}
              value={row.key}
              onChange={val => {
                const oldSelectS = cloneDeep(selectS);
                if (val) {
                  setSelectS([...oldSelectS, row.key]);
                } else {
                  setSelectS([...pull(oldSelectS, row.key)]);
                }
              }}
            />
          )
        };
        newColumns.unshift(obj);
      }
      return newColumns;
    }
    return getNewColumns(preColumns);
  }, [preColumns, data, selectS]);
  useEffect(() => {
    const SelectSData = map(selectS, x => find(data, { key: x }));
    handleSelectChanged && handleSelectChanged(SelectSData);
  }, [selectS]);

  const emptyText = useMemo(() => {
    if (emptyIcon || noDataTip) {
      return (
        <div className="">
          <div className="">{emptyIcon}</div>
          <div className="">{noDataTip}</div>
        </div>
      );
    }
    return (
      <NoResult
        type={loading ? 'net' : undefined}
        desc={loading ? '加载中...' : undefined}
      />
    );
  }, [loading]);
  return (
    <Table
      // sticky={true}
      scroll={{ x: scrollWidth, y: null }}
      className={cls}
      data={data}
      columns={columns}
      emptyText={emptyText || <NoResult />}
      expandable={expandable}
      showHeader={showHeader}
      onRow={(record, index) => ({
        onClick: handleRowClick?.bind(null, record, index)
      })}
    ></Table>
  );
}
export default compose(
  errorDecorator(),
  connect(),
  // (state, mapState) => mapState(state.Name, [

  // ]),
  // (dispatch, mapActions) => mapActions(actions, [

  // ])

  memo
)(TableBase);
