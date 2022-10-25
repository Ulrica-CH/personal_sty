import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@';
import on from './images/on.svg';
import off from './images/off.svg';
import { useControlledInputs } from '../../common/hooks';
import { config } from '../../common/config';
import { nfn } from '../../common';

const defaultMap = [
  {
    label: '关闭',
    value: false
  },
  {
    label: '开启',
    value: true
  }
];

const mapDefaultToValue = v => v;
const mapValuetoValue = v => v;

/**
 * 开关
 */
export default function Switch(props) {
  const {
    defaultValue,
    onChange,
    beforeChange,
    itemMap = defaultMap,
    className,
    disabled,
    style
  } = props;
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue
  });
  const classes = classNames([`${config.prefixCls}switch`], className, {
    active: value,
    disabled
  });
  const changValue = val => {
    if (typeof beforeChange === 'function') {
      const canChange = beforeChange(val);
      if (canChange != null) {
        if (typeof canChange.then === 'function') {
          canChange.then(res => {
            if (res !== false) {
              handleChange(val);
            }
          });
        } else if (canChange !== false) {
          handleChange(val);
        }
      } else {
        handleChange(val);
      }
    } else {
      handleChange(val);
    }
  };
  return (
    <div
      style={style}
      className={classes}
      onClick={() => !disabled && changValue(!value)}
      title={itemMap.find(item => item.value === value)?.label}
    >
      <Icon link={value ? on : off} />
    </div>
  );
}

Switch.defaultProps = {
  defaultValue: false,
  onChange: nfn
};
Switch.propTypes = {
  /** 开关对应的Item和值 [{label,value}, {}] */
  itemMap: PropTypes.array,
  /** 变化回调 */
  onChange: PropTypes.func,
  /** 变化之前调用，可异步, return false表示不改变 */
  beforeChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.bool,
  /** 是否失效 */
  disabled: PropTypes.bool
};
