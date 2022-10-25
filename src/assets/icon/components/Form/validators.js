import _, { get, includes } from 'lodash';

const validators = {
  required(value) {
    if (Array.isArray(value)) {
      return value && !!value.length;
    }
    if (value === undefined || value === '') {
      return false;
    }
    return true;
  },
  length(value, range) {
    const len = Array.isArray(value) ? value.length : value.toString().length;
    let min = range[0] && range[0] !== 0 ? len >= range[0] : true;
    let max = range[1] && range[1] !== 0 ? len <= range[1] : true;
    return min && max;
  },
  phone(value) {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(value);
  },
  email(value) {
    const reg = /[\w!#$ %& '*+/=?^_`{|}~-]+(?:\.[\w!#$%&' * +/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
    return reg.test(value);
  },
  id(value) {
    const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    return reg.test(value);
  },
  url(value) {
    const reg = /[a-zA-z]+:\/\/[^\s]*/;
    return reg.test(value);
  }
};

export default function(value, rule, data) {
  if (rule.required) {
    return validators.required(value);
  }
  if (rule.length) {
    return validators.length(value, rule.length);
  }

  if (rule.type && Object.keys(validators).indexOf(rule.type) >= 0) {
    if (!value && value !== 0) {
      return true;
    }
    return validators[rule.type](value);
  }

  // 验证函数
  if (rule.fn) {
    return rule.fn(value, data);
  }

  // 正则
  if (rule.reg) {
    return rule.reg.test(value);
  }

  return true;
}

/**
 * 一些通用的错误提示
 * @param {Object} rule
 */
export const getDefaultMsgByRule = rule => {
  if (rule.required) {
    return '该项必填';
  }
  if (rule.length) {
    return `输入内容长度需要在${get(rule.length, 0)}-${get(
      rule.length,
      1
    )}之间`;
  }
};

export class Collector {
  // 元素集合
  list = [];

  // 错误信息
  msg = '';

  debug = {};

  // 用于存储setter的内部变量
  __setterDraft = {};
  __setterValue = {};
  __setterOriginValue = {};

  __setSetter(draft, value, origin) {
    this.__setterDraft = draft;
    this.__setterValue = value;
    this.__setterOriginValue = origin;
  }

  __getSetter() {
    return {
      draft: this.__setterDraft,
      value: this.__setterValue,
      origin: this.__setterOriginValue
    };
  }

  add(item) {
    this.list.push(item);
  }

  remove(item) {
    _.remove(this.list, item);
  }

  clear() {
    this.list = [];
  }

  validate() {
    this.setMessage('');
    this.debug = {};
    const failed = this.list.some(item => {
      const itemFail = !item.validate();

      const { msg } = item.props;
      if (itemFail) {
        item.scrollIntoView?.();
        this.setMessage(msg);
        this.debug = item;
      }
      return itemFail;
    });
    return !failed;
  }
  validateFields(fields) {
    this.setMessage('');
    this.debug = {};
    const failed = this.list
      .filter(d => includes(fields, d?.field))
      .some(item => {
        const itemFail = !item.validate();

        const { msg } = item.props;
        if (itemFail) {
          this.setMessage(msg);
          this.debug = item;
        }
        return itemFail;
      });

    return !failed;
  }
  clearValidate(fields) {
    this.setMessage('');

    const list = fields?.length
      ? this.list.filter(d => includes(fields, d?.field))
      : this.list;
    list.forEach(item => item.resetValidateStatus());
  }

  reset() {
    this.list.forEach(item => item.reset());
  }

  setMessage(msg) {
    this.msg = msg;
  }

  getMessage() {
    return this.msg;
  }

  getDebug() {
    return this.debug;
  }

  getValue() {
    const result = {};
    this.list.forEach(item => {
      const field = item.field;
      const value = item.state.value;

      result[field] = value;
    });

    return result;
  }
}
