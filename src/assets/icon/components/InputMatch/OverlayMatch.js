/*
 * @LastEditTime: 2021-09-27 16:42:35
 * @LastEditors: jinxiaojian
 */
import React, { useEffect, useState, useCallback, Fragment } from 'react';
import Input from '../Input';
import Button from '../Button';
import Tab from '../Tab';
import SearchInput from '../SearchInput';
import Radio, { RadioGroup } from '../Radio';
// import { config } from '../../common/config';
import Checkbox from '../Checkbox';
import { map } from 'lodash';
import classNames from 'classnames';
const { CheckboxGroup } = Checkbox;
const { TabPanel } = Tab;
// 设置默认显示的子节点的 defaultValue
const mapDefaultToValue = (type, childrenType, props) => {
  const { childrenTypeOptions } = props;
  const children = childrenTypeOptions[type] || [];
  return children.filter(item => item.value === childrenType).length > 0
    ? childrenType
    : children[0]?.value;
};
export default function OverlayMatch(props) {
  const {
    ensureFn,
    name,
    type,
    typeOptions,
    value = [],
    hideDropdown,
    placeholder,
    select,
    selectOption,
    visible,
    prefix,
    childrenType,
    childrenTypeShow,
    childrenTypeOptions
  } = props;
  const [radioType, setRadioType] = useState(type || 'fuzzy');
  const [inputVal, setInputVal] = useState(value.join('\n'));
  const [selectVal, setSelectVal] = useState(value);
  const [searchVal, setSearchVal] = useState('');
  /**子节点类型 */
  const [childrenRadioType, setChildrenRadioType] = useState(
    childrenType || 'equal'
  );
  useEffect(() => {
    if (visible) {
      setRadioType(type || 'fuzzy');
      if (childrenTypeShow) {
        setChildrenRadioType(mapDefaultToValue(type, childrenType, props));
      }
      setInputVal(value.join('\n'));
      setSelectVal(value);
      setSearchVal('');
    }
  }, [visible]);
  useEffect(() => {
    if (childrenTypeShow) {
      setChildrenRadioType(
        mapDefaultToValue(radioType, childrenRadioType, props)
      );
    }
  }, [radioType]);

  const stopPropagation = e => {
    e.stopPropagation();
  };
  useEffect(() => {
    setInputVal(value.join('\n'));
  }, [value]);
  // 确定按钮
  const ensureCallback = e => {
    stopPropagation(e);
    hideDropdown();
    const params = {
      name,
      type: radioType,
      value: select
        ? selectVal
        : inputVal.split('\n').filter(i => i.trim() !== '')
    };
    if (childrenTypeShow) params.childrenType = childrenRadioType;
    ensureFn(params);
  };
  // 取消按钮
  const cancelCallback = useCallback(
    e => {
      stopPropagation(e);
      hideDropdown();
      setInputVal(value.join('\n'));
      setSelectVal(value);
    },
    [value]
  );
  // 全选按钮
  const checkAllCallback = useCallback(e => {
    stopPropagation(e);
    setSelectVal(selectOption?.map(item => item.value) || []);
  }, []);
  // 清空按钮
  const clearCallback = useCallback(e => {
    stopPropagation(e);
    setInputVal('');
    setSelectVal([]);
  }, []);
  return (
    <div
      className={`${prefix}input-match-overlay`}
      onClick={e => e.stopPropagation()}
    >
      {select ? (
        <Fragment>
          <div className="input-head">
            <SearchInput
              defaultValue={searchVal}
              onChange={setSearchVal}
              placeholder={'查找选择条件'}
              mini
            />
          </div>
          <div className="select-box">
            <CheckboxGroup defaultValue={selectVal} onChange={setSelectVal}>
              {map(
                selectOption.filter(
                  x =>
                    !searchVal ||
                    x.label?.indexOf(searchVal) >= 0 ||
                    String(x.value)?.indexOf(searchVal) >= 0
                ),
                (item, index) => (
                  <Checkbox
                    key={`${item.label}-${index}`}
                    label={item.label}
                    value={item.value}
                  />
                )
              )}
            </CheckboxGroup>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div
            className={classNames('input-head', {
              'input-head-border': childrenTypeShow
            })}
          >
            <Tab
              defaultActiveKey={radioType}
              onChange={setRadioType}
              theme="title"
            >
              {typeOptions.map((item, index) => (
                <TabPanel
                  header={item.label}
                  keys={item.value}
                  key={item.value}
                ></TabPanel>
              ))}
            </Tab>
          </div>
          {childrenTypeShow ? (
            <div className="radio-group-box">
              <RadioGroup
                defaultValue={childrenRadioType}
                onChange={setChildrenRadioType}
              >
                {(childrenTypeOptions[radioType] || []).map((item, index) => (
                  <Radio
                    label={item.label}
                    value={item.value}
                    key={item.value}
                  />
                ))}
              </RadioGroup>
            </div>
          ) : null}
          <div className="input-box">
            <Input
              type="textarea"
              placeholder={placeholder}
              defaultValue={inputVal}
              onChange={setInputVal}
              onClick={stopPropagation}
            />
          </div>
        </Fragment>
      )}
      <div className="oper">
        <div>
          {select && (
            <Button
              type="text"
              className="mgr10"
              mini
              onClick={checkAllCallback}
            >
              全选
            </Button>
          )}
          <Button type="link" mini onClick={clearCallback}>
            清空
          </Button>
        </div>
        <div>
          <Button type="white" mini className="mgr10" onClick={cancelCallback}>
            取消
          </Button>
          <Button type="primary" mini onClick={ensureCallback}>
            确定
          </Button>
        </div>
      </div>
    </div>
  );
}
