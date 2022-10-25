import React, { useState, useRef, useEffect, Fragment } from 'react';
import get from 'lodash/get';
import map from 'lodash/map';

import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import AutoSizeInput from 'react-input-autosize';

import { nfn } from '../../common';
import Item from '../Item';
import Icon from '../Icon';
import delIcon from '../Input/images/clear.svg';
import arrowIconMini from './images/arrow-down-mini.svg';
import TruncateTip from '../TruncateTip';
import Label from '../Label';

import removeIcon from './images/remove-one.svg';

import cx from 'classnames';

export default function Input({
  disabled,
  showOption,
  isFocus,
  currentValue = [],
  filter,
  onFocus = nfn,
  onBlur,
  onChange,
  onInputChange,
  label,
  multi,
  placeholder = '请选择',
  clearable,
  options,
  onPressEnter,
  onPressBack,
  setShow,
  setFocus,
  inputProps,
  inputMatch,
  ItemRender,
  itemLabel,
  itemLabelType,
  mini,
  iconId,
  prefix,
  selectAll,
  fRef,
  contentRenderFn
}) {
  if (!itemLabel && itemLabelType) itemLabel = true;
  const { offsetWidth = 100 } = fRef?.current || {};
  const inputRef = useRef(null);
  const [input, setInput] = useState(false);
  // 当currentValue改变时，认定为用户选中了选项，更改输入状态为false
  useEffect(() => {
    if (!multi) {
      setInput(false);
    }
    // 保持focus状态
    if (multi && isFocus) {
      inputRef.current?.focus();
    }
  }, [currentValue]);

  const triggerFocus = e => {
    if (disabled) return;
    e.stopPropagation();
    if (showOption) {
      setShow(false);
    } else {
      onFocus();
      inputRef.current?.focus();
    }
  };

  // 点击箭头
  const handleArrowClick = e => {
    if (showOption) {
      setShow(false);
      setFocus(false);
    } else {
      triggerFocus(e);
    }
  };

  // filter改变的时候
  const handleValueChange = v => {
    const value = v.target.value;
    setInput(value === '' ? false : true);
    if (!showOption) {
      onFocus();
    }
    onInputChange(value);
  };

  // 清除值
  const clearValue = e => {
    if (disabled) return;
    onChange({});
    inputRef.current?.focus();
  };
  const handleKeyDown = e => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      return onPressEnter && onPressEnter();
    }

    if (e.keyCode === 188) {
      e.preventDefault();
      return onPressEnter && onPressEnter();
    }
    if (e.keyCode === 8) {
      if (filter === '') {
        return onPressBack();
      }
    }
  };
  const hasValue = filter !== '' || !isEmpty(currentValue);

  function handleDetele(p) {
    if (disabled) return;
    onChange(p, true);
    inputRef.current?.focus();
  }
  let isSelectAll =
    currentValue?.length >= options?.length - 1 && currentValue.length !== 0;
  return (
    <div className="Select-control">
      {label && <div className="Select-label">{label}</div>}
      <div className="Select-value-zone">
        <div
          className="Select-input"
          style={{ maxWidth: fRef ? offsetWidth - 30 : '' }}
          onClick={triggerFocus}
        >
          <Item show={!hasValue} onClick={triggerFocus}>
            <div className="Select-placeholder">{placeholder}</div>
          </Item>
          <Item show={!multi && !input}>
            <div className="select-value text-overflow">
              {get(currentValue, 'label')}
            </div>
          </Item>
          <Item show={multi}>
            <Fragment>
              <Item show={selectAll && isSelectAll}>
                <div className="select-value">全部</div>
              </Item>
              <Item show={!selectAll || !isSelectAll}>
                {!contentRenderFn ? (
                  <Fragment>
                    <Item show={!!(itemLabel || ItemRender)}>
                      <TruncateTip
                        list={currentValue}
                        ItemRender={props => {
                          return ItemRender ? (
                            <div
                              style={{ lineHeight: 0 }}
                              onClick={e => {
                                e?.stopPropagation();
                                if (e.target && e.target.dataset.delete) {
                                  handleDetele(props.item);
                                }
                              }}
                            >
                              <ItemRender {...props} disabled></ItemRender>
                            </div>
                          ) : (
                            <Label
                              disabled
                              type="selectTag"
                              weak
                              className="mgr5"
                            >
                              <div
                                className="flexBetween"
                                style={{ height: 18 }}
                              >
                                <div className="">{props.item.label}</div>
                                <Icon
                                  link={removeIcon}
                                  className="remove-icon mgl5 mgt1"
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleDetele(props.item);
                                  }}
                                />
                              </div>
                            </Label>
                          );
                        }}
                        afterContent={
                          <AutoSizeInput
                            style={{
                              verticalAlign: 'top',
                              marginLeft: currentValue.length ? '5px' : 0
                            }}
                            className="select-input-dom"
                            value={filter}
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            onChange={handleValueChange}
                            {...inputProps}
                          />
                        }
                      ></TruncateTip>
                    </Item>
                    <Item show={!(ItemRender || itemLabel)}>
                      <div className="select-value text-overflow">
                        {map(currentValue, 'label').join('、')}
                      </div>
                    </Item>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Item show={hasValue}>{contentRenderFn(currentValue)}</Item>
                  </Fragment>
                )}
              </Item>
            </Fragment>
          </Item>

          <Item show={!multi || !(itemLabel || ItemRender)}>
            <AutoSizeInput
              style={{
                verticalAlign: 'top',
                marginLeft: currentValue.length ? '5px' : 0
              }}
              className="select-input-dom"
              value={filter}
              ref={inputRef}
              onKeyDown={handleKeyDown}
              onChange={handleValueChange}
              {...inputProps}
            />
          </Item>
        </div>
      </div>
      <div
        className={`control-zone  ${
          (clearable && hasValue) || !inputMatch ? 'zone-show' : ''
        }  ${clearable && hasValue && !inputMatch ? 'zone-hover-show' : ''}`}
      >
        <Item show={clearable && hasValue}>
          <span className="Select-clear-zone" onClick={clearValue}>
            <Icon className="del-icon" link={delIcon} />
          </span>
        </Item>
        <Item show={!inputMatch}>
          <span className="Select-arrow-zone" onClick={handleArrowClick}>
            <Icon
              link={iconId || arrowIconMini}
              className={cx('drop-down-icon', {
                mini,
                'rotate-180': showOption
              })}
            />
          </span>
        </Item>
      </div>
    </div>
  );
}
