import React, { Component, useCallback, useRef } from 'react';
import { proxy } from 'valtio';
import { watch } from 'valtio/utils';
import { nfn, getResultValue } from '../../common';
import { cloneDeep, get, join, set, split, uniq as uniqFn, trim } from 'lodash';
import { Collector } from '../Form';

/**
 * Setter组件，会监听传入data的改变，并在每次改变后返回新的值，
 * 可用于处理深层次，复杂的表单
 */
export default class Setter extends Component {
  state = {
    draft: false,
    result: {}
  };

  static useSetter({ config = {} }) {
    const setterRef = useRef(new Collector());

    const helper = useCallback(
      (field, defaultValue, { transformArr = false, uniq = false } = {}) => {
        const { draft, value, origin } = setterRef.current.__getSetter();
        const formatArr = uniq ? uniqFn : d => d;

        // transformArr支持将array转成textarea的字符形式，回车换行为一条
        const getValue = v => (transformArr ? join(v, '\n') : v);
        const getResult = v =>
          transformArr
            ? formatArr(split(v, '\n')).filter(d => trim(d) !== '')
            : v;

        return {
          collector: setterRef.current,
          value: getValue(getResultValue(get(value, field), defaultValue)),
          defaultValue: getValue(
            getResultValue(get(origin, field), defaultValue)
          ),
          onChange: v => {
            set(draft, field, getResult(v));
          }
        };
      },
      []
    );

    return {
      config: {
        ...config,
        collector: setterRef.current
      },
      helper,
      collector: setterRef.current
    };
  }

  componentDidMount = () => {
    this.initData();
  };

  componentWillUnmount = () => {
    this.clearData();
    this.draft = false;
    this.stop = undefined;
  };

  handleDataChange = getFn => {
    const { draft } = this.state;
    const { onChange = nfn, collector } = this.props;

    const result = cloneDeep(getFn(this.draft));

    if (collector) {
      collector.__setSetter(draft, result);
    }
    this.setState({
      result
    });

    if (this.stop) {
      onChange(draft, result);
    }
  };

  initData() {
    const { data, collector } = this.props;
    const draft = proxy(data);

    this.draft = draft;

    this.stop = watch(this.handleDataChange);

    if (collector) {
      collector.__setSetter(draft, data, cloneDeep(data));
    }

    this.setState({
      draft,
      result: data
    });
  }

  clearData() {
    this.stop && this.stop();
  }

  getResult() {
    return this.state.result;
  }

  render() {
    const { data, children, ...others } = this.props;
    const { draft, result } = this.state;
    return draft ? children(draft, result, others) : '';
  }
}
