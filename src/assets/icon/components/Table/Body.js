import React, { memo } from 'react';
import map from 'lodash/map';
import includes from 'lodash/includes';
import compose from 'lodash/fp/compose';

import BaseRow from './Row';

import { withScrollHeight, withExpandRow, withDragRow } from './helper';

const Row = compose(withExpandRow, withDragRow, memo)(BaseRow);

function Body({
  columns,
  data,
  lineHeight,
  hasMore,
  showMore,
  checkboxType,
  activeIndex,
  CustomMoreComp,
  selected,
  ...others
}) {
  return (
    <tbody className="table-body">
      {map(data, (row, index) => (
        <Row
          key={`table-row-${index}`}
          columns={columns}
          index={index}
          data={row}
          totalData={data}
          lineHeight={lineHeight}
          checked={includes(selected, row)}
          active={activeIndex === index}
          {...others}
        />
      ))}
      {hasMore ? (
        <tr
          className="table-body-row table-show-more"
          onClick={showMore}
          style={{
            height: lineHeight
          }}
        >
          <td
            colSpan={columns.length}
            style={{
              height: lineHeight
            }}
          >
            {CustomMoreComp ? <CustomMoreComp /> : '显示更多'}
          </td>
        </tr>
      ) : (
        <></>
      )}
    </tbody>
  );
}

export default withScrollHeight(Body, false);
