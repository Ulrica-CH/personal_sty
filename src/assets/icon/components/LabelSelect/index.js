import classNames from 'classnames';
import filter from 'lodash/filter';
import get from 'lodash/get';
import includes from 'lodash/includes';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { config } from '../../common/config';
import { useControlledInputs } from '../../common/hooks';
import Item from '../Item';
import Label from '../Label';

const mapDefaultToValue = (v, { options, multi, showAll }) => {
  if (v !== undefined) return v;

  if (multi) {
    return [];
  }

  return showAll ? '' : get(options[0], 'value');
};
const mapValuetoValue = v => v;
/**
 * 标签选择控件
 */
export default function LabelSelect({
  defaultValue,
  onChange,
  options,
  multi,
  mini,
  type,
  disabled,
  showAll,
  className,
  style
}) {
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    props: {
      options,
      multi,
      showAll
    }
  });
  const isAllSelected = value => {
    if (multi) {
      return !value.length || value.length === options.length;
    }

    return value === undefined || value === '';
  };
  const isItemSelected = item => {
    if (multi) return includes(value, item.value);

    return isEqual(value, item.value);
  };
  const isItemDisabled = item => {
    return disabled || item.disabled;
  };

  const getLabelType = active => (active ? type : '');

  const selectAll = useCallback(() => {
    if (disabled) return;
    handleChange(multi ? [] : '');
  }, [disabled, handleChange, multi]);

  const handleSelectChange = item => {
    if (disabled || item.disabled) return;
    if (multi) {
      const active = includes(value, item.value);
      let result = active
        ? filter(value, v => !isEqual(v, item.value))
        : [...value, item.value];

      handleChange(result);
    } else {
      handleChange(item.value);
    }
  };

  const classes = classNames(
    `${config.prefixCls}label-select`,
    {
      disabled,
      mini
    },
    className
  );

  return (
    <div className={classes} style={style}>
      <Item show={showAll}>
        <Label
          className={classNames(`${config.prefixCls}label-select-item`, {
            active: isAllSelected(value),
            disabled: disabled
          })}
          onClick={selectAll}
          key="all"
          type={getLabelType(isAllSelected(value))}
        >
          全部
        </Label>
      </Item>
      {map(options, item => {
        const active = isItemSelected(item);
        const disabled = isItemDisabled(item);

        return (
          <Label
            key={item.value}
            type={getLabelType(active)}
            closable={active && multi}
            onClick={() => handleSelectChange(item, active)}
            className={classNames(`${config.prefixCls}label-select-item`, {
              active,
              disabled
            })}
          >
            {item.label}
          </Label>
        );
      })}
    </div>
  );
}
LabelSelect.defaultProps = {
  showAll: true,
  multi: false,
  locale: 'zh_CN',
  type: 'failed'
};
LabelSelect.propTypes = {
  /** 值改变时的回调 */
  onChange: PropTypes.func,
  /** 默认值，多选的时候是数组形式 */
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
  /** 选项列表, 遵循各种选项的格式 { value, label } */
  options: PropTypes.array,
  /** 是否多选 */
  multi: PropTypes.bool,
  /** 是否自动展示 “全部” 标签 */
  showAll: PropTypes.bool,
  /** 国际化 */
  locale: PropTypes.string,
  /** 定义label的类型 */
  type: PropTypes.string,
  /** 自定义容器样式 */
  style: PropTypes.object
};
