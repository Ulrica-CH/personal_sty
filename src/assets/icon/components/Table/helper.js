import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import cx from 'classnames';
import update from 'immutability-helper';
import ColGroup from './ColGroup';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import Button from '../Button';
import Item from '../Item';
import iconArrow from './images/expand-arrow.svg';

import { slice, filter, includes, xor, first, nth, forEach } from 'lodash';
import { useUpdateEffect } from '../../common/hooks';
import { config } from '../../common/config';

import { nfn } from '../../common';

/**
 * 固定头部的处理，将header,body包裹为table
 */
export const withScrollHeight = (Children, header = true) => props => {
  const { scrollHeight, columns, flatColumns, body, ...others } = props;

  if (!scrollHeight)
    return <Children columns={columns} flatColumns={flatColumns} {...others} />;

  const cls = cx({
    'table-body-wrap': body,
    'table-header-wrap': header
  });

  console.log(flatColumns);
  return (
    <div
      className={cls}
      style={{
        maxHeight: scrollHeight,
        paddingRight: scrollHeight && header ? 6 : 0
      }}
    >
      <table>
        <ColGroup columns={flatColumns || columns} />
        <Children columns={columns} flatColumns={flatColumns} {...others} />
      </table>
    </div>
  );
};

/**
 * 带静态分页的表格
 */
export const withLimit = Children => ({ data, pageLimit, ...others }) => {
  if (!pageLimit) return <Children data={data} {...others} />;

  const getListByPage = page => {
    return slice(data, 0, pageLimit * page);
  };

  const [page, setPage] = useState(1);
  const [list, setList] = useState(getListByPage(1));

  useUpdateEffect(() => {
    setPage(1);
    setList(getListByPage(1));
  }, [data]);

  const hasMore = data.length > list.length;
  const showMore = useCallback(() => {
    setPage(page + 1);
    setList(getListByPage(page + 1));
  }, [page, data]);

  console.log(hasMore);
  return (
    <Children data={list} hasMore={hasMore} showMore={showMore} {...others} />
  );
};

export const withExpand = Children => ({
  data,
  expandRowRender,
  defaultRenderExpand,
  expandOnly,
  defaultRenderExpandIndex,
  columns,
  handleExpandChange: baseExpandChange = nfn,
  hideExpandIcon,
  ...others
}) => {
  if (!expandRowRender)
    return <Children data={data} columns={columns} {...others} />;

  const getDefaultExpand = () => {
    if (defaultRenderExpand) {
      return [first(data)];
    }
    if (
      !defaultRenderExpand &&
      defaultRenderExpandIndex >= 0 &&
      defaultRenderExpandIndex < data.length
    ) {
      return [nth(data, defaultRenderExpandIndex)];
    }
    return [];
  };
  const [expandRow, setExpandRow] = useState(getDefaultExpand());
  /*
  useEffect(() => {
    if (defaultRenderExpandIndex !== undefined) {
      setExpandRow(getDefaultExpand());
    }
  }, [defaultRenderExpandIndex]);
  */

  // defaultRenderExpandIndex变化时重新展开
  useEffect(() => {
    if (
      defaultRenderExpandIndex !== undefined &&
      defaultRenderExpandIndex >= 0
    ) {
      setExpandRow([nth(data, defaultRenderExpandIndex)]);
    }
  }, [defaultRenderExpandIndex, data]);

  const handleExpandChange = useCallback(
    (row, open) => {
      baseExpandChange(row, open);
      if (expandOnly) {
        return setExpandRow(open ? [row] : []);
      }
      if (open) {
        setExpandRow(expandRow => [...expandRow, row]);
      } else {
        setExpandRow(expandRow =>
          filter(expandRow, rowData => row !== rowData)
        );
      }
    },
    [expandOnly]
  );

  const withExpandColumns = useMemo(() => {
    if (hideExpandIcon) return columns;
    return [
      {
        width: 20,
        render: (d, row, { expandShow }) => {
          return (
            <Icon
              className={cx('table-body-expand-row-icon', {
                expand: expandShow
              })}
              link={iconArrow}
            />
          );
        },
        isExpand: true // 用于标注是expand列
      }
    ].concat(columns);
  }, [columns]);

  return (
    <Children
      data={data}
      columns={withExpandColumns}
      expandRowRender={expandRowRender}
      expandRow={expandRow}
      handleExpandChange={handleExpandChange}
      {...others}
    />
  );
};

const defaultCanRowExpand = () => true;

export const withExpandRow = Children => ({
  data,
  index,
  columns,
  expandRowRender,
  expandRow,
  handleExpandChange,
  canRowExpand = defaultCanRowExpand,
  className,
  onClick,
  ...others
}) => {
  if (!expandRowRender)
    return (
      <Children
        columns={columns}
        index={index}
        data={data}
        onClick={onClick}
        {...others}
      />
    );

  const showExpand = includes(expandRow, data);
  const canExpand = canRowExpand(data, index);

  const handleRowClick = useCallback(
    (rowData, index, totalData) => {
      if (!canExpand) return;
      expandRowRender && handleExpandChange(rowData, !showExpand);
      onClick && onClick(rowData, index, showExpand, totalData);
    },
    [showExpand, canExpand, onClick, handleExpandChange]
  );

  const cls = cx(
    {
      'has-expand': expandRowRender,
      'show-expand': showExpand,
      disabled: !canExpand
    },
    className
  );

  return (
    <Fragment>
      <Children
        columns={columns}
        className={cls}
        index={index}
        data={data}
        open={showExpand}
        onClick={handleRowClick}
        {...others}
      />
      {showExpand && canExpand ? (
        <tr className="table-body-expand-row" key={`expand-row-${index}`}>
          <td colSpan={columns.length}>
            <div className="table-body-expand-row-wrap">
              {expandRowRender(data, index, columns, showExpand)}
            </div>
          </td>
        </tr>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

/**
 * 单选表格
 */
export const withClick = Children => ({
  clickable,
  defaultClick = true,
  handleRowClick,
  activeRowIndex,
  data,
  setRowClassFn,
  ...others
}) => {
  if (!clickable)
    return <Children data={data} setRowClassFn={setRowClassFn} {...others} />;

  const [activeIndex, setActive] = useState(defaultClick ? 0 : null);

  useEffect(() => {
    if (defaultClick && data[0]) {
      handleRowClick && handleRowClick(data[0], 0);
    }
  }, [data, defaultClick, handleRowClick]);

  const onClick = useCallback(
    (rowData, index) => {
      setActive(index);
      handleRowClick && handleRowClick(rowData, index);
    },
    [handleRowClick]
  );

  const rowClassFn = useCallback(
    cls => {
      return cx(cls, 'clickable');
    },
    [setRowClassFn]
  );

  return (
    <Children
      data={data}
      {...others}
      activeIndex={activeRowIndex != null ? activeRowIndex : activeIndex}
      setRowClassFn={rowClassFn}
      onClick={onClick}
    />
  );
};

const defaultRowCanSelected = () => true;
/**
 * 带多选的表格
 */
export const withSelect = Children => ({
  select,
  data,
  checkboxType,
  columns,
  handleSelectChanged = nfn,
  canRowSelected = defaultRowCanSelected,
  withSelectFooter,
  selectFooterRender,
  selectFooterClassName,
  selectFooterSticky,
  selectFooterStyle,
  selected: initSelected,
  ...others
}) => {
  if (!select) return <Children columns={columns} data={data} {...others} />;

  const [selected, setSelect] = useState(initSelected || []);
  const [showFooter, setFooterShow] = useState(false);

  const setSelected = useCallback(
    arr => {
      // 需要过滤不可选中的行
      const result = filter(arr, canRowSelected);
      setSelect(result);
      handleSelectChanged(result);
      setFooterShow(true);
    },
    [handleSelectChanged]
  );

  // 数据发生变动时，清空选中
  useEffect(() => {
    setSelected(initSelected || []);
  }, [data]);

  const handleSelectAll = useCallback(
    checked => {
      if (checked) {
        setSelected(data);
      } else {
        setSelected([]);
      }
    },
    [setSelected, data]
  );

  const handleSelectRow = useCallback(
    (checked, row) => {
      // const selected = seectRef.current;
      if (checked) {
        setSelected([...selected, row]);
      } else {
        setSelected(filter(selected, item => item !== row));
      }
    },
    [setSelected, selected]
  );

  const withSelectColumns = useMemo(
    () => [
      {
        key: '',
        title: (
          <Checkbox
            className={`${config.prefixCls}table-select-check`}
            type={checkboxType}
            defaultChecked={
              selected.length > 0 &&
              selected.length === data.length &&
              xor(selected, data).length === 0
            }
            onChange={handleSelectAll}
          />
        ),
        align: 'left',
        isSelect: true,
        width: 16,
        render: (item, row, others) => {
          const { checked, rowIndex } = others;
          const disabled = !canRowSelected(row, rowIndex);
          return (
            <Checkbox
              className={`${config.prefixCls}table-select-check`}
              type={checkboxType}
              defaultChecked={checked}
              disabled={disabled}
              onChange={checked => handleSelectRow(checked, row)}
            />
          );
        }
      },
      ...columns
    ],
    [selected, data, columns, handleSelectAll, handleSelectRow]
  );

  if (!withSelectFooter || !selected?.length)
    return (
      <Children
        selected={selected}
        columns={withSelectColumns}
        data={data}
        {...others}
      />
    );

  return (
    <div className="table-with-footer">
      <Children
        selected={selected}
        columns={withSelectColumns}
        data={data}
        {...others}
      />
      <Item show={showFooter}>
        <div
          className={cx('table-with-footer-select', selectFooterClassName, {
            'table-with-footer-sticky': selectFooterSticky
          })}
          style={selectFooterStyle}
        >
          <Icon type="success" mini className="mgr10" />
          <span className="table-with-footer-select-info">
            已选中{selected?.length}项
          </span>
          <div className="table-with-footer-select-content">
            {selectFooterRender ? selectFooterRender(selected) : null}
            <Button
              className="table-with-footer-select-exit-btn"
              type="white"
              mini
              onClick={() => setFooterShow(false)}
            >
              退出
            </Button>
          </div>
        </div>
      </Item>
    </div>
  );
};

const transfer = {
  data: new Map(),
  set(key, data) {
    this.data.set(key, data);
  },
  get(key) {
    return this.data.get(key);
  },
  clear() {
    this.data.clear();
  }
};

const getParantRow = (item, tag = 'TR') => {
  if (!item) return false;

  const tagName = item.tagName;
  if (tagName === tag) {
    return item;
  }
  return getParantRow(item.parentNode, tag);
};

// 带拖拽的行
export const withDragRow = Row => ({
  draggable,
  index,
  data,
  totalData,
  setData,
  handleDragChange,
  ...others
}) => {
  if (!draggable || (draggable && index === totalData.length))
    return <Row index={index} data={data} totalData={totalData} {...others} />;

  const onDragStart = useCallback(
    e => {
      const row = getParantRow(e.target);
      e.dataTransfer.effectAllowed = 'move';
      transfer.set('data', data);
      transfer.set('index', index);
      transfer.set('baseStyle', getComputedStyle(row));
      transfer.set('baseIndex', index);
      row.style.background = '#F9FAFC';
      row.style.border = '2px solid #8EB6FB';
    },
    [data, index]
  );
  const onDragEnd = useCallback(
    e => {
      const body = getParantRow(e.target, 'TBODY');
      const rows = Array.from(body.querySelectorAll('.table-body-row'));

      const from = data;
      const fromIndex = index;
      const target = transfer.get('data');
      const targetIndex = transfer.get('index');

      forEach(rows, (row, rowIndex) => {
        row.style = transfer.get('baseStyle');

        if (rowIndex === targetIndex) {
          row.style.backgroundColor = '#f6f6f9';
        }
      });

      if (target && fromIndex !== targetIndex) {
        const resultData = update(totalData, {
          $splice: [
            [fromIndex, 1],
            [targetIndex, 0, from]
          ]
        });
        setData(resultData);
        handleDragChange(resultData, fromIndex, targetIndex);
      }
      transfer.clear();
    },
    [handleDragChange, index, setData, totalData]
  );

  const onDragEnter = useCallback(
    e => {
      const parentRow = getParantRow(e.target);
      if (parentRow && transfer.get('baseIndex') !== index) {
        parentRow.style.borderBottom = '2px solid #3A7EEA';
      }
      transfer.set('index', index);
      transfer.set('data', data);
      e.preventDefault();
    },
    [index, data]
  );

  const onDragLeave = useCallback(
    e => {
      const parentRow = getParantRow(e.target);

      // if (transfer.get('index') === index) {
      //   console.log(1);
      //   transfer.set('index', transfer.get('baseIndex'));
      // }

      if (parentRow && transfer.get('baseIndex') !== index) {
        parentRow.style.borderBottom = '1px solid #dbdde2';
      }
      e.preventDefault();
    },
    [index]
  );
  return (
    <Row
      draggable={true}
      data={data}
      index={index}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      {...others}
    />
  );
};
