/*
 * @Author: wangweixin
 * @Date: 2017-12-15 11:01:33
 * @Last Modified by: wangweixin
 * @Last Modified time: 2021-11-09 15:21:50
 */
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getResultValue } from '../../common';
import { config } from '../../common/config';
import Icon from '../Icon';
import Item from '../Item';
import Tips from '../Tips';
import validate, { getDefaultMsgByRule } from './validators';

/**
 * 单个表单元素
 * 自带样式，规则验证等
 * 直接填充表单组件的内容即可
 */
export default class FormItem extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      !isEqual(nextProps.value, prevState.prevValue) &&
      nextProps.value !== undefined
    ) {
      return {
        ...prevState,
        value: nextProps.value,
        prevValue: nextProps.value
      };
    }
    return null;
  }
  state = {
    hasError: false,
    errMsg: '',
    value: this.props.defaultValue
  };
  componentDidMount = () => {
    const { collector, field } = this.props;
    collector && collector.add(this);
    this.field = field;
  };
  componentWillUnmount = () => {
    const { collector } = this.props;
    collector && collector.remove(this);
  };
  /**
   * 重置值为defaultValue
   * @public
   */
  reset() {
    const { defaultValue } = this.props;
    this.setState({
      value: defaultValue,
      hasError: false
    });
  }
  /**
   * 清楚校验状态
   * @public
   */
  resetValidateStatus() {
    this.setState({
      hasError: false,
      errMsg: ''
    });
  }
  scrollIntoView() {
    this.dom &&
      this.dom.scrollIntoView?.({
        behavior: 'smooth'
      });
  }
  /**
   * validate方法，会在collector.validate调用时被自动调用
   */
  validate = currentValue => {
    const { validators, data, collector, msg } = this.props;
    const { value } = this.state;

    console.log(this.state, validators);

    const testValue = currentValue === undefined ? value : currentValue;
    if (isEmpty(validators)) return true;

    /**
     * 验证某一条规则，验证失败时，会将当前的errMsg设置为Msg
     * @param {*} rule
     */
    const validateRule = (testValue, rule, data) => {
      const failed = !validate(testValue, rule, data);

      if (failed) {
        this.setState({
          errMsg: rule.msg || msg || getDefaultMsgByRule(rule),
          hasError: true
        });
        collector.setMessage(rule.msg || msg || getDefaultMsgByRule(rule));
      }
      return failed;
    };

    const failed = validators.some(rule => {
      // 验证项是数组时，除去必填和长度限制，需要循环进行每项内容的验证
      if (Array.isArray(testValue)) {
        if (rule.required || rule.length) {
          return validateRule(testValue, rule, data);
        }

        return testValue.some(v => {
          return validateRule(v, rule, data);
        });
      }
      return validateRule(testValue, rule, data);
    });

    if (failed) {
      this.setState({
        hasError: true
      });
    } else {
      this.setState({
        hasError: false
      });
      collector.setMessage('');
    }
    return !failed;
  };
  handleInput = value => {
    const { onChange, trigger } = this.props;

    if (trigger === 'input') {
      this.validate(value);
    }

    this.setState({
      value
    });
    onChange && onChange(value);
  };
  renderChildren() {
    const { children, showInfo, placeholder, disabled } = this.props;
    const { hasError, value } = this.state;
    const prefixCls = this.props.prefixCls || config.prefixCls;

    if (showInfo) {
      return <div className={`${prefixCls}form-item-info`}>{value}</div>;
    }

    if (!children) return '';

    const { placeholder: childPlaceholder, disabled: childDisabled } =
      children?.props || {};

    // 优先使用children上的prop，再使用FormItem的prop
    return React.cloneElement(children, {
      onChange: this.handleInput,
      defaultValue: value,
      hasError,
      placeholder: getResultValue(childPlaceholder, placeholder),
      disabled: getResultValue(childDisabled, disabled)
    });
  }
  render() {
    const {
      label,
      labelWidth = '100px',
      labelStyle,
      className,
      align,
      vAlign,
      style,
      hasColon,
      hasLabel,
      mini,
      bold,
      disabled,
      validators,
      showRequired,
      labelTip,
      labelTipType,
      showErrorMsg
    } = this.props;
    const { hasError, errMsg } = this.state;
    const prefixCls = this.props.prefixCls || config.prefixCls;
    const lwidth =
      labelWidth.toString().indexOf('px') > 0 ? labelWidth : labelWidth + 'px';
    const classes = classNames(
      `${prefixCls}form-group ${prefixCls}form-item-group`,
      `${prefixCls}form-item`,
      className,
      {
        [`${prefixCls}form-item-mini`]: !!mini,
        [`${prefixCls}form-item-disabled`]: !!disabled
      }
    );
    const labelClasses = classNames(`${prefixCls}form-item-title-label`, {
      [`${prefixCls}form-item-${align}-title-label`]: true,
      [`${prefixCls}form-item-${vAlign}-title-label`]: true,
      [`${prefixCls}form-item-mini${'-' + vAlign}-title-label`]: !!mini,
      [`${prefixCls}form-item-bold-title-label`]: !!bold,
      [`${prefixCls}form-item-disabled-title-label`]: !!disabled
    });
    const inputCls = classNames(`${prefixCls}form-item-input`);

    // 包含required时，前面增加必填选项
    const hasRequiredRule = validators.some(rule => rule.required);

    return (
      <div className={classes} style={style} ref={dom => (this.dom = dom)}>
        <Item show={hasLabel}>
          <div
            className={labelClasses}
            style={{ flex: `0 0 ${lwidth}`, ...labelStyle }}
          >
            <Item show={labelTip}>
              <Tips content={labelTip} type={labelTipType} className="mgr5" />
            </Item>
            <Item show={showRequired && hasRequiredRule}>
              <span className={`${prefixCls}form-item-required`}>* </span>
            </Item>
            {label}
            {hasColon ? ' :' : ''}
          </div>
        </Item>
        <div className={inputCls}>
          {this.renderChildren()}
          <Item show={hasError && errMsg && showErrorMsg}>
            <p className={`${prefixCls}form-item-error-msg`}>
              <Icon
                type="warningRed"
                mini
                className={`${prefixCls}form-item-icon`}
              />
              {errMsg}
            </p>
          </Item>
        </div>
      </div>
    );
  }
}
FormItem.displayName = 'FormItem';
FormItem.defaultProps = {
  trigger: 'input',
  hasColon: true,
  hasLabel: true,
  showInfo: false,
  align: 'right',
  vAlign: 'base',
  bold: false,
  mini: true,
  showRequired: true,
  validators: [],
  labelTipType: 'info',
  showErrorMsg: true
};
FormItem.propTypes = {
  /** 表单元素的标签 */
  label: PropTypes.any,
  /** 表单元素的标签的提示，方便快速展示提示内容 */
  labelTip: PropTypes.any,
  /** 表单元素的标签的提示图标类型 */
  labelTipType: PropTypes.oneOf(['info', 'help']),
  /** 标签宽度 */
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 标签的特殊样式 */
  labelStyle: PropTypes.object,
  /** 是否包含标签 */
  hasLabel: PropTypes.bool,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 验证规则 */
  validators: PropTypes.array,
  /** 是否有冒号 */
  hasColon: PropTypes.bool,
  /** 小版 */
  mini: PropTypes.bool,
  /** Label是否加粗 */
  bold: PropTypes.bool,
  /** 是否以信息形式展示 */
  showInfo: PropTypes.bool,
  /** 必填时，是否展示必填提示 */
  showRequired: PropTypes.bool,
  /** 验证触发的时机 */
  trigger: PropTypes.oneOf(['input', 'blur']),
  /** 文字水平居中方式 */
  align: PropTypes.oneOf(['left', 'right']),
  /** 文字垂直居中方式 */
  vAlign: PropTypes.oneOf(['base', 'top', 'center', 'bottom']),
  /** Collector实例 */
  collector: PropTypes.any,
  /** value值，需要主动更新组件值的时候传入 */
  value: PropTypes.any,
  /** 是否展示错误提示 */
  showErrorMsg: PropTypes.bool
};
