/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:00:25
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-08-06 19:42:27
 */
import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import FormItem from './FormItem';
import DataMap from './formDataMap';
import { Collector } from './validators';
import { getResultValue } from '../../common';

/**
 * 表单封装
 * 包含默认样式，表单验证的功能
 */
export default class Form extends Component {
  collector = new Collector();
  dataMap = new DataMap();

  componentWillMount() {
    this.initData();
    this.hasChange = false;
  }

  componentWillUnmount() {
    this.hasChange = false;
  }

  initData() {
    const { data } = this.props;

    forEach(data, (item = {}, key) => {
      this.dataMap.set(key, item.value);
    });
  }
  /**
   * 验证当前内容并返回表单的值
   * @public
   */
  validateAndSubmit() {
    const isOk = this.collector.validate();
    return isOk ? this.dataMap.get() : false;
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
  isFormItem(children) {
    const name = get(children, 'type.displayName');

    return name === FormItem.displayName;
  }
  renderChildrens = children => {
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

    if (Array.isArray(children)) {
      return Children.map(children, child => {
        return this.renderChildrens(child);
      });
    }
    // 遇到FormItem,则绑定id
    if (this.isFormItem(children)) {
      const { field, onChange, value } = children.props;
      const childProps = children.props;
      const fieldData = data[field] || {};
      const dataMap = this.dataMap.get();
      return cloneElement(children, {
        data: dataMap,
        showInfo,
        collector: this.collector,
        defaultValue: fieldData.value,
        value: getResultValue(value, dataMap[field]),
        validators: fieldData.validators || [],
        onChange: val => {
          this.dataMap.set(field, val);
          this.hasChange = true;
          onChange && onChange(val, field);
        },
        // 用于集成，优先子节点的配置
        labelWidth: getResultValue(childProps.labelWidth, labelWidth),
        hasColon: getResultValue(childProps.hasColon, hasColon),
        mini: getResultValue(childProps.mini, mini),
        bold: getResultValue(childProps.bold, bold),
        showRequired: getResultValue(childProps.showRequired, showRequired),
        align: getResultValue(childProps.align, align),
        vAlign: getResultValue(childProps.vAlign, vAlign)
      });
    }

    // 循环处理
    if (children.props && children.props.children) {
      const props = Object.assign({}, children.props, {
        children: this.renderChildrens(children.props.children)
      });
      return Object.assign({}, children, {
        props
      });
    }
    return children;
  };
  render() {
    const { children, className, style } = this.props;
    return (
      <div className={className} style={style}>
        {this.renderChildrens(children)}
      </div>
    );
  }
}
Form.propTypes = {
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
