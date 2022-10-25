import cx from 'classnames';
import { isArray, isFunction } from 'lodash';
import get from 'lodash/get';
import map from 'lodash/map';
import React from 'react';
import { Resizable } from 'react-resizable';
import { nfn } from '../../common';
import Icon from '../Icon';
import Item from '../Item';
import SearchInput from '../SearchInput';
import Select from '../Select';
import { withScrollHeight } from './helper';
import iconSort from './images/sort-arrow.svg';

function SortIcon({ column, handleSortChange, sortKey, sortFlag }) {
  const change = sort => () => handleSortChange(column.key, sort);
  const active = sort =>
    column.key === sortKey && sort === sortFlag ? 'table-active' : '';

  return (
    <div className="table-head-sort-button">
      <Icon
        link={iconSort}
        onClick={change('asc')}
        className={cx('table-head-sort-icon', 'asc', active('asc'))}
      />
      <Icon
        link={iconSort}
        onClick={change('desc')}
        className={cx('table-head-sort-icon', 'desc', active('desc'))}
      />
    </div>
  );
}

/**
 * 表头单元格
 */
function HeaderItem({
  column,
  index,
  defaultSearch,
  sortKey,
  sortFlag,
  handleSortChange,
  className,
  ...others
}) {
  const {
    title,
    width,
    key,
    sortable,
    isExpand,
    isSelect,
    titleClassName, // 可以单独为title定义className
    style = {},
    search, // Boolean, true时自带搜索的Input筛选控件
    onSearch, // Input筛选控件输入回调
    filter, // Array 筛选的options，有时则自带搜索的Select控件
    multi, // Boolean Select控件是否为多选
    onFilterChange, // Select控件回调
    placeholder = '搜索相关内容', // 可自定义搜索相关内容
    searchComp // 自定义的搜索控件
  } = column;
  const hidePdl = get(title, 'type.type') === 'select';
  const searchValue = defaultSearch[key];
  return (
    <th
      style={{
        maxWidth: width,
        ...style
      }}
      className={cx(
        className,
        'table-head-item',
        {
          center: column.align === 'center',
          pdl10: column.align !== 'center' && !hidePdl,
          pdr10: column.align !== 'center' && !hidePdl,
          expand: isExpand, // 是否是展开图标列
          'with-select': isSelect, // 是否是选中图标列
          'with-search': search || filter || searchComp // 是否包含筛选
        },
        titleClassName
      )}
      {...others}
    >
      <Item show={sortable}>
        <div className="table-head-sort">
          {title}
          <SortIcon
            column={column}
            handleSortChange={handleSortChange}
            sortKey={sortKey}
            sortFlag={sortFlag}
          />
        </div>
      </Item>
      <Item show={!sortable}>{title}</Item>
      <Item show={search || filter || searchComp}>
        <div className="table-head-item-search-wrap">
          <Item show={search}>
            <SearchInput
              className="table-head-item-search-input"
              placeholder={placeholder}
              onChange={isFunction(search) ? search : nfn}
              onSearch={onSearch}
              defaultValue={searchValue}
              mini
            />
          </Item>
          <Item show={filter && isArray(filter)}>
            {
              <Select
                options={filter}
                clearable
                mini
                background={false}
                multi={multi}
                placeholder={placeholder}
                defaultValue={searchValue}
                onChange={onFilterChange || nfn}
              />
            }
          </Item>
          {searchComp}
        </div>
      </Item>
    </th>
  );
}

function Header({
  columns,
  setColumns,
  resizeable,
  defaultSearch,
  handleResize,
  sortKey,
  sortFlag,
  handleSortChange,
  ...others
}) {
  // 是否包含二级标题
  const columnHasChild = column => get(column, 'children.length');

  // 二级标题
  const children = columns.reduce(
    (total, cur) => total.concat(cur.children || []),
    []
  );
  const hasChild = children.length;

  return (
    <thead className="table-head">
      <tr>
        {map(columns, (column, index) => {
          const { width } = column;

          const th = (
            <HeaderItem
              column={column}
              index={index}
              rowSpan={columnHasChild(column) ? 1 : 2}
              colSpan={columnHasChild(column) || 1}
              defaultSearch={defaultSearch}
              sortKey={sortKey}
              sortFlag={sortFlag}
              handleSortChange={handleSortChange}
              key={`table-header-${index}`}
            />
          );

          if (!resizeable) return th;

          return (
            <Resizable
              key={`risize-table-header-${index}`}
              width={width}
              onResize={(e, { size }) =>
                handleResize(index, size, columns, setColumns)
              }
            >
              {th}
            </Resizable>
          );
        })}
      </tr>
      {/* <Item show={hasChild}> */}
      {hasChild ? (
        <tr>
          {map(children, (column, index) => {
            return (
              <HeaderItem
                column={column}
                index={index}
                defaultSearch={defaultSearch}
                sortKey={sortKey}
                sortFlag={sortFlag}
                handleSortChange={handleSortChange}
                key={`table-header-child-${index}`}
                className="table-head-item"
              />
            );
          })}
        </tr>
      ) : (
        <></>
      )}
      {/* </Item> */}
    </thead>
  );
}

export default withScrollHeight(Header);
