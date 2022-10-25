/*
 * @LastEditTime: 2020-06-17 10:58:46
 * @LastEditors: jinxiaojian
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import jsonFormat from 'json-format';
import JSONPretty from 'react-json-view';
import map from 'lodash/map';
import isString from 'lodash/isString';
import { stringfy } from '../../common';

const getJson = d => {
  try {
    return JSON.parse(d);
  } catch (error) {
    return {};
  }
};
/**
 * 针对代码块的统一封装，提供table,json两种格式
 */
function Code(props) {
  const {
    data,
    type,
    theme,
    className,
    labelWidth,
    style,
    iconStyle,
    indentWidth,
    displayDataTypes,
    displayObjectSize
  } = props;
  const cls = classNames('code-wrap', className);

  if (type === 'json') {
    const json = jsonFormat(data);
    return (
      <div className={cls} style={style}>
        <JSONPretty
          src={getJson(json)}
          theme={theme}
          {...{ iconStyle, indentWidth, displayDataTypes, displayObjectSize }}
        />
      </div>
    );
  } else {
    return (
      <div className={cls} style={style}>
        <table className="code-table">
          <thead className="code-thead">
            <tr>
              <th className="key">KEY</th>
              <th className="value">VALUE</th>
            </tr>
          </thead>
          <tbody className="code-tbody">
            {map(data, (item, key) => {
              return (
                <tr className="code-tr-content" key={key}>
                  <td className="key" style={{ width: labelWidth }}>
                    {key}
                  </td>
                  <td className="value">
                    {isString(item) ? item : stringfy(item)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Code.defaultProps = {
  type: 'table',
  indentWidth: 2,
  theme: 'monokai',
  displayDataTypes: false,
  displayObjectSize: true
};
Code.propTypes = {
  /** 要展示的代码 */
  data: PropTypes.object,
  /** 展示的数据类型 */
  type: PropTypes.oneOf(['table', 'json']),
  /** 主题配色 */
  theme: PropTypes.oneOf([
    'apathy',
    'apathy:inverted',
    'ashes',
    'bespin',
    'brewer',
    'bright:inverted',
    'bright',
    'chalk',
    'codeschool',
    'colors',
    'eighties',
    'embers',
    'flat',
    'google',
    'grayscale',
    'grayscale:inverted',
    'greenscreen',
    'harmonic',
    'hopscotch',
    'isotope',
    'marrakesh',
    'mocha',
    'monokai',
    'ocean',
    'paraiso',
    'pop',
    'railscasts',
    'rjv-default',
    'shapeshifter',
    'shapeshifter:inverted',
    'solarized',
    'summerfruit',
    'summerfruit:inverted',
    'threezerotwofour',
    'tomorrow',
    'tube',
    'twilight'
  ]),
  /** 表格的标签宽度 */
  labelWidth: PropTypes.string,
  /** JSON 的展开图标  */
  iconStyle: PropTypes.oneOf(['circle', 'triangle', 'square']),
  /** JSON 的缩进 */
  indentWidth: PropTypes.number,
  /** JSON 是否展示类型 */
  displayDataTypes: PropTypes.bool,
  /** JSON 是否展示size */
  displayObjectSize: PropTypes.bool
};

export default Code;
