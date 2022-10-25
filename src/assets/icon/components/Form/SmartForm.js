/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:00:25
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-08-06 19:43:21
 */
import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';

import forEach from 'lodash/forEach';
import debounce from 'lodash/debounce';
import set from 'lodash/set';
import isFunction from 'lodash/isFunction';

import { Collector } from './validators';
import { getResultValue } from '../../common';

/**
 * 表单封装
 * 包含默认样式，表单验证的功能
 */
export default class SmartForm extends Component {
  collector = new Collector();

  state = {
    dataMap: {}
  };

  componentDidMount() {
    this.hasChange = false;
    this.initData();
  }

  componentWillUnmount() {
    this.hasChange = false;
  }

  initData() {
    const { data } = this.props;
    let dataMap = {};

    forEach(data, (item = {}, key) => {
      set(dataMap, key, item.value);
    });

    this.setState({
      dataMap
    });
  }
  /**
   * 验证当前内容并返回表单的值
   * @public
   */
  validateAndSubmit() {
    const { dataMap } = this.state;
    const isOk = this.collector.validate();
    return isOk ? dataMap : false;
  }
  /**
   * 验证当前内容
   * @public
   */
  validate() {
    return this.collector.validate();
  }
  /**
   * 直接返回表单的值，不做验证
   * @public
   */
  submit() {
    return this.dataMap.get();
  }
  /**
   * 重新初始化表单
   * @public
   */
  reset() {
    this.initData();
    this.collector.reset();
    this.hasChange = false;
  }
  /**
   * 对部分表单进行验证
   * @param {Array} fields 需要检验的field
   * @public
   */
  validateFields(fields) {
    return this.collector.validateFields(fields);
  }
  /**
   * 对部分表单项的验证结果进行清除
   * @param {Array} fields 需要清除的field,如果不传，则清除全部
   * @public
   */
  clearValidate(fields) {
    this.collector.clearValidate(fields);
  }
  /**
   * 获取表单字段是否已被变更
   * @public
   */
  getChanged() {
    return this.hasChange;
  }
  renderItem = (children, others) => {
    const {
      data,
      showInfo,
      labelWidth,
      hasColon,
      mini,
      bold,
      showRequired,
      align,
      vAlign
    } = this.props;
    const { dataMap } = this.state;
    const { field, onChange, value } = children.props;
    const childProps = children.props;
    const fieldData = data[field] || {};
    return cloneElement(children, {
      key: field,
      data: dataMap,
      showInfo,
      collector: this.collector,
      defaultValue: fieldData.value,
      value: getResultValue(value, dataMap[field]),
      validators: fieldData.validators || [],
      onChange: debounce(val => {
        this.setState(state => ({
          dataMap: {
            ...state.dataMap,
            [field]: val
          }
        }));
        this.hasChange = true;
        onChange && onChange(val);
      }, 300),
      // 用于集成，优先子节点的配置
      labelWidth: getResultValue(childProps.labelWidth, labelWidth),
      hasColon: getResultValue(childProps.hasColon, hasColon),
      mini: getResultValue(childProps.mini, mini),
      bold: getResultValue(childProps.bold, bold),
      showRequired: getResultValue(childProps.showRequired, showRequired),
      align: getResultValue(childProps.align, align),
      vAlign: getResultValue(childProps.vAlign, vAlign),
      ...others
    });
  };
  setValue = (field, val) => {
    this.setState(state => ({
      dataMap: {
        ...state.dataMap,
        [field]: val
      }
    }));
  };
  render() {
    const { children, className, style } = this.props;
    const { dataMap } = this.state;

    if (!isFunction(children)) {
      throw new Error('children必须为函数');
    }

    return (
      <div className={className} style={style}>
        {children(dataMap, this.renderItem, this.setValue)}
      </div>
    );
  }
}
SmartForm.propTypes = {
  /**
   * 表单对应的数据
   * 针对该数据会生成最终的表单数据
   */
  data: PropTypes.object.isRequired,
  /** 以信息形式展示表单 */
  showInfo: PropTypes.bool,
  /** 标签宽度 */
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 标签是否有冒号 */
  hasColon: PropTypes.bool,
  /** 标签小版 */
  mini: PropTypes.bool,
  /** 标签是否加粗 */
  bold: PropTypes.bool,
  /** 标签必填时，是否展示必填提示 */
  showRequired: PropTypes.bool,
  /** 标签文字水平居中方式 */
  align: PropTypes.oneOf(['left', 'right']),
  /** 标签文字垂直居中方式 */
  vAlign: PropTypes.oneOf(['base', 'top', 'center', 'bottom'])
};
