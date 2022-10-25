import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { getDefaultPortalSelector } from '../../common/portalHelpers';
import { useDropdownPosition } from '../../common/hooks';
import { nfn } from '../../common';
import Options from './Options';
import { debounce } from 'lodash';
import * as sqlParser from 'syntax-parser/dist/main/demo/sql-parser';

import {
  keyOptions,
  getOperatorContent,
  connectOptions,
  nullOptions,
  opeartionOptions
} from './keyOptions';
import {
  get,
  toLower,
  toUpper,
  split,
  first,
  isString,
  last,
  every,
  findLastIndex,
  findIndex,
  find,
  filter
} from 'lodash';
import Item from '../Item';

// 判断括号是否匹配
const bracesStatus = string => {
  string = string.replace(/[^\(\)\[\]\{\}]/g, '');
  while (/\(\)|\[\]|\{\}/.test(string)) {
    string = string.replace(/\(\)|\[\]|\{\}/g, '');
  }
  return string === '';
};
const optionFilter = filter => option => {
  if (!isString(option.value) || !isString(filter)) return true;

  if (split(filter, '').length <= 2) {
    return (
      toLower(option.value).indexOf(toLower(filter)) === 0 ||
      toLower(option.label).indexOf(toLower(filter)) === 0
    );
  }
  return (
    toLower(option.value).indexOf(toLower(filter)) >= 0 ||
    toLower(option.label).indexOf(toLower(filter)) >= 0
  );
};
const getNextFilterType = type => {
  if (type === 'value') return '';

  const baseType = ['key', 'operator', 'value', 'connect'];
  const index = baseType.indexOf(type);
  const next = baseType[index + 1];

  return next || baseType[0];
};

const getOptionsByFilter = (currentFilter, keyOptions, opeartionOptions) => {
  const { type, value, options } = currentFilter;
  if (type === 'key') return keyOptions.filter(optionFilter(value));
  if (type === 'operator') return opeartionOptions.filter(optionFilter(value));
  if (type === 'value')
    return options ? options.filter(optionFilter(value)) : null;

  if (type === 'connect') return connectOptions.filter(optionFilter(value));

  return options;
};

const getFilterPosition = (
  value = '',
  inputRef,
  signal = [' ', "'", '%', '(', ')']
) => {
  const input = inputRef.current;
  const caretIndex = input.getCaret();

  // 从光标位置向左右遍历，碰到signal则停下，中间的值就是当前输入的值
  const left = value.slice(0, caretIndex);
  const right = value.slice(caretIndex);

  let leftIndex = findLastIndex(left.split(''), item => signal.includes(item));
  let rightIndex = findIndex(right.split(''), item => signal.includes(item));
  // 左侧光标需要去除signal
  if (leftIndex === -1) {
    leftIndex = 0;
  } else {
    leftIndex += 1;
  }
  if (rightIndex === -1) rightIndex = value.length - caretIndex;

  return [leftIndex, rightIndex];
};

const getFilterValue = (value = '', inputRef, all = false) => {
  if (value === '') return '';
  const input = inputRef.current;
  const caretIndex = input.getCaret();
  const position = getFilterPosition(value, inputRef);
  const leftIndex = position[0];
  const rightIndex = position[1];
  //获取光标的值
  const filterValue = all
    ? value.slice(leftIndex, rightIndex + caretIndex)
    : value.slice(leftIndex, caretIndex);

  return filterValue;
};

const getSentencePosition = (value = '', caretIndex) => {
  // 从光标位置向左右遍历，碰到signal则停下，中间的值就是当前输入的值
  const left = value.slice(0, caretIndex);
  const right = value.slice(caretIndex);

  const signal = ['AND', 'OR'];

  let leftIndex = findLastIndex(left.split(' '), item =>
    signal.includes(toUpper(item))
  );

  let rightIndex = findIndex(right.split(' '), item =>
    signal.includes(toUpper(item))
  );

  if (leftIndex === -1) {
    leftIndex = 0;
  } else {
    leftIndex = left
      .split(' ')
      .slice(0, leftIndex)
      .join(' ').length;
  }

  if (rightIndex === -1) {
    rightIndex = value.length - caretIndex;
  } else {
    rightIndex = right
      .split(' ')
      .slice(0, rightIndex)
      .join(' ').length;
  }

  return [leftIndex, rightIndex];
};

const getOptionsBySentence = (sentence, operation, filterValue, keyOptions) => {
  const key = sentence.split(new RegExp(` ${operation} `, 'i'))[0].trim();
  const options = find(keyOptions, item => item.value === key)?.options;

  if (['is', 'is not'].includes(operation)) {
    return nullOptions;
  }

  return options;
};

const getFilter = ({
  value,
  inputRef,
  keyOptions,
  index,
  opeartionOptions
}) => {
  let type = '';
  const input = inputRef.current;
  const caretIndex = index || input.getCaret();
  const valueArr = split(value, '');
  const filterValue = !index ? getFilterValue(value, inputRef) : '';

  const KEY_TYPE = {
    type: 'key',
    options: keyOptions,
    value: filterValue
  };

  const OPERATOR_TYPE = {
    type: 'operator',
    options: opeartionOptions,
    value: filterValue
  };

  const CONNECT_TYPE = {
    type: 'connect',
    options: connectOptions,
    value: filterValue
  };

  if (value === '') return KEY_TYPE;

  const sentencePosition = getSentencePosition(value, caretIndex);
  const leftIndex = sentencePosition[0];
  // const rightIndex = sentencePosition[1];
  const sentence = value
    .slice(leftIndex, caretIndex)
    .replace(/ and /i, '')
    .replace(/ and/i, '')
    .replace(/ or /i, '')
    .replace(/ or/i, '');

  const sentenceArr = sentence.split(' ');

  // 匹配操作符， 若同时匹配NOT IN 和IN,则按NOT IN处理
  let operation;
  const operations = filter(opeartionOptions, operation => {
    return new RegExp(` ${operation.value}`, 'i').test(sentence);
  });

  if (operations.length > 1) {
    operation = operations[1]?.value;
    // 如果局子中的key中包含操作符，则取另一个操作符
    if (operation && new RegExp(`${operation}`, 'i').test(sentenceArr[0])) {
      operation = operations[0]?.value;
    }
  } else {
    operation = operations[0]?.value;
  }

  const sentenceNum = sentence.split('');

  // 如果不包含操作符，则可能是key或者整在输入操作符
  if (!operation) {
    // 什么都没输入，且当前不是第一个语句，则可能是要输入新的key,
    if (sentence === '') {
      if (leftIndex !== 0) {
        if (last(valueArr) === ' ') {
          type = 'key';
        } else {
          type = 'connect';
        }
      } else {
        type = '';
      }
    } else if (
      !every(sentenceNum, item => item === ' ') &&
      sentenceNum.includes(' ')
    ) {
      // 包含空格的时候，则是操作符
      type = 'operator';
    } else {
      type = 'key';
    }
  } else {
    // 如果包含操作符，且光标在操作符旁边，则也是正在输入操作符
    if (
      toUpper(sentence).indexOf(toUpper(operation)) + operation.length ===
      sentence.length
    ) {
      type = 'operator';
    } else {
      // 光标在单引号里面是value, 在单引号外面，并且空格在最末尾的时候，是在输入连接符
      const quo = sentenceNum.filter(item => ["'", '"'].includes(item));

      if (quo.length % 2 === 0) {
        if (quo.length) {
          // 两种状态说明正在输入连接符, 最后一位是空格，最后几位包含连接符的关键字
          if (
            findLastIndex(sentenceNum, item => item === ' ') ===
            sentenceNum.length - 1
          ) {
            // 如果是IN/NOT IN操作符,需要判断括号是否结束，如果没结束，则还是在输入value
            if (['IN', 'NOT IN'].includes(operation)) {
              const valueStr = sentence.split(
                new RegExp(` ${toLower(operation)} `, 'i')
              );

              // 如果括号匹配，则是连接符
              if (bracesStatus(valueStr[1])) {
                type = 'connect';
              }
            } else {
              type = 'connect';
            }
          }
          // 如果正在输入连接符，也是连接符
          if (
            ['A', 'AN', 'AND', 'O', 'OR'].includes(toUpper(last(sentenceArr)))
          ) {
            type = 'connect';
          }
        }

        // 针对is做特殊处理
        if (['is', 'is not'].includes(operation)) {
          const valueStr = sentence.split(new RegExp(` ${operation} `, 'i'))[1];
          const others = split(valueStr, ' ');

          // 如果只包含空格和is,则要输入value
          if (others.length < 2) {
            type = 'value';
          } else {
            if (others.every(item => item === ' ')) {
              type = 'value';
            } else {
              type = 'connect';
            }
          }
        }
      } else if (quo.length % 2 === 1) {
        type = 'value';
      } else {
        type = '';
      }
    }
  }

  if (type === 'key') return KEY_TYPE;
  if (type === 'operator') return OPERATOR_TYPE;
  if (type === 'connect') return CONNECT_TYPE;

  const valueOptions = getOptionsBySentence(
    sentence,
    operation,
    filterValue,
    keyOptions
  );

  if (type === 'value') {
    return {
      type: 'value',
      value: filterValue,
      options: valueOptions
    };
  }

  return {
    type: '',
    value: filterValue,
    options: null
  };
};

/** 根据不同的类型获取最终值 */
const getResultStr = (currentFilter, str, item, inputRef) => {
  const { type, value } = currentFilter;
  let changedValue = item.value;
  let index = 0;
  const input = inputRef.current;

  const replace = (str, from, target) => {
    const position = getFilterPosition(str, inputRef);
    const left = str.slice(0, position[0]);
    const right = str.slice(position[0]).replace(from, target);

    return left + right;
  };

  if (type === 'key') {
    const filterValue = getFilterValue(str, inputRef, true);
    const baseFilterValue = getFilterValue(str, inputRef, false);
    const value = replace(str, filterValue, changedValue) + ' ';
    index = input.getCaret() - baseFilterValue.length + changedValue.length + 1;

    return {
      value,
      index
    };
  }
  if (type === 'operator') {
    const content = getOperatorContent(item.value);
    changedValue += content.value;
    index = content.index;

    return {
      value: replace(str, value, changedValue),
      index: input.getCaret() - value.length + changedValue.length + index
    };
  }
  if (type === 'value') {
    const filterValue = getFilterValue(str, inputRef, true);
    const baseFilterValue = getFilterValue(str, inputRef, false);
    const value = replace(str, filterValue, changedValue);
    return {
      value,
      index: input.getCaret() - baseFilterValue.length + changedValue.length
    };
  }

  // 未输入值时，直接拼接
  return {
    value:
      value === ''
        ? str + changedValue + ' '
        : replace(str, value, changedValue + ' '),
    index
  };
};

/**
 * 记录值的改变
 * 1. 记录整个值str
 * 2. 记录已经匹配好的映射 filters
 * 3. 记录当前配置的filter
 * 4. 记录当前映射的type: key/operator/value 三种type按顺序进行
 * 5. 每个filter记录各个type的起始位置，用于追踪
 * @param {*} param0
 */
function useValueChange({
  setOptionsShow,
  setFocusItem,
  inputRef,
  keyOptions,
  defaultValue,
  onChange,
  opeartionOptions
}) {
  const [str, setStr] = useState('');
  const [options, setOptions] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    value: '',
    type: 'key',
    position: 0
  });
  const [cursorIndex, setCursorIndex] = useState(0);

  useEffect(() => {
    setStr(defaultValue);
  }, [defaultValue]);

  const onInputChange = useCallback(
    value => {
      setStr(value);
      const filter = getFilter({
        value,
        inputRef,
        keyOptions,
        opeartionOptions
      });
      const netFilter = {
        ...currentFilter,
        ...filter
      };

      setCurrentFilter(netFilter);
      const { value: filterValue } = netFilter;

      const options = getOptionsByFilter(
        netFilter,
        keyOptions,
        opeartionOptions
      );

      setOptions(options);

      if (filterValue !== '' && first(options)) {
        setFocusItem(first(options));
      }

      if (options) {
        setOptionsShow(true);
      } else {
        setOptionsShow(false);
        setFocusItem(undefined);
      }
      onChange(value, netFilter);
    },
    [
      currentFilter,
      inputRef,
      keyOptions,
      onChange,
      setFocusItem,
      setOptionsShow
    ]
  );

  // 一个选项被选中的时候
  const onItemFinish = useCallback(
    item => {
      const { value, type, ...others } = currentFilter;

      const result = getResultStr(currentFilter, str, item, inputRef);
      const resultStr = result.value;
      const input = inputRef.current;

      const nextFilter = {
        ...others,
        type: getNextFilterType(type),
        value: '',
        position: resultStr.length
      };

      let options;

      if (type === 'key') {
        nextFilter.keyOptions = item.options;
        options = opeartionOptions;
      }
      if (type === 'operator') {
        nextFilter.operator = item.value;
        if (['is', 'is not'].includes(item.value)) {
          options = nullOptions;
        } else {
          options = nextFilter.keyOptions;
        }
      }
      if (type === 'value') {
        options = null;
      }
      if (type === 'connect') {
        options = keyOptions;
      }

      setCurrentFilter(nextFilter);

      setStr(resultStr);
      setOptions(options);

      if (options) {
        setOptionsShow(true);
      } else {
        setOptionsShow(false);
      }

      setFocusItem(undefined);
      const target = result.index;

      if (result.index) {
        input.updateCaret(target, target);
      }
      onChange(resultStr, nextFilter);
    },
    [
      currentFilter,
      inputRef,
      keyOptions,
      onChange,
      setFocusItem,
      setOptionsShow,
      str
    ]
  );

  return {
    value: str,
    options,
    onInputChange,
    currentFilter,
    onItemFinish,
    cursorIndex,
    setCursorIndex
  };
}

/**
 * 语法检查
 */
const checkValueValid = debounce(
  (value, keyOptions, opeartionOptions, setValid) => {
    if (value === '') return setValid(true);

    const valid = (function() {
      try {
        const result = sqlParser.mysqlParser(
          'select * from dual where ' + value
        );
        // 去除末尾的空格
        const str = value.replace(/(\s*$)/g, '');
        const filter = getFilter({
          value,
          inputRef: {},
          keyOptions,
          index: str.length,
          opeartionOptions
        });
        const { type } = filter;

        // 针对.的错误 不算错误
        let valid =
          result.success ||
          (get(result, 'error.token.type') === 'special' &&
            get(result, 'error.token.value') === '.');

        // 末尾是操作符，key, connect，则语法不正确
        if (['key', 'operator', 'connect'].includes(type)) {
          valid = false;
        }
        return valid;
      } catch (error) {
        return false;
      }
    })();

    setValid(valid);
  },
  200
);

/**
 * 控制选项相关
 * @param {Function} onBlur
 * @param {Function} setFocus
 */
function useOptions({ customGetContainer, onBlur, setFocus, overlayRef }) {
  // 是否展示选项
  const [showOption, setShow] = useState(false);

  // 获取dropdownPosition
  const dropDownRef = useRef();
  const getContainer = customGetContainer || getDefaultPortalSelector();
  const [position, updatePosition] = useDropdownPosition(
    dropDownRef,
    getContainer,
    overlayRef
  );

  const onWindowClick = useCallback(() => {
    setShow(false);
    setFocus(false);
    onBlur();
  }, [onBlur, setFocus]);

  const setOptionsShow = useCallback(show => {
    if (show) {
      updatePosition(show);
    }
    setShow(show);
  }, []);

  useEffect(() => {
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  }, []);

  return {
    showOption,
    dropDownRef,
    position,
    setOptionsShow: setOptionsShow,
    getContainer
  };
}

function SmartInput({
  defaultValue,
  keyOptions,
  onBlur,
  getContainer: customGetContainer,
  onChange,
  onSearch,
  onStatusChange,
  opeartionOptions
}) {
  // 当前focus的选项，用户回车时，会选中该选项
  const [focusItem, setFocusItem] = useState(undefined);
  // console.log('opeartionOptions', opeartionOptions);
  // 是否focus
  const [isFocus, setFocus] = useState(false);
  const inputRef = useRef();
  const overlayRef = useRef();

  // 是否经过语法校验
  const [valid, setValid] = useState(true);

  const {
    showOption,
    dropDownRef,
    position,
    setOptionsShow,
    getContainer
  } = useOptions({
    customGetContainer,
    onBlur,
    setFocus,
    overlayRef
  });

  const onValueChange = useCallback(
    v => {
      checkValueValid(v, keyOptions, opeartionOptions, valid => {
        setValid(valid);
        onStatusChange(valid);
      });

      onChange(v);
    },
    [keyOptions, onChange, onStatusChange]
  );

  const {
    value,
    cursorIndex,
    options,
    currentFilter,
    onInputChange,
    setCursorIndex,
    onItemFinish
  } = useValueChange({
    setOptionsShow,
    setFocusItem,
    inputRef,
    defaultValue,
    keyOptions,
    onChange: onValueChange,
    opeartionOptions
  });

  const handleOptionsClick = useCallback(
    option => {
      onItemFinish(option);
      inputRef.current.focus();
    },
    [onItemFinish]
  );

  return (
    <div className="smart-input" ref={dropDownRef}>
      <Input
        ref={inputRef}
        showOption={showOption}
        cursorIndex={cursorIndex}
        setCursorIndex={setCursorIndex}
        options={options}
        isFocus={isFocus}
        currentValue={value}
        onInputChange={onInputChange}
        setFocus={setFocus}
        focusItem={focusItem}
        valid={valid}
        setFocusItem={setFocusItem}
        onItemFinish={onItemFinish}
        onSearch={onSearch}
      />
      <Item show={options}>
        <Options
          getContainer={getContainer}
          position={position}
          value={value}
          overlayRef={overlayRef}
          show={showOption}
          currentFilter={currentFilter}
          handleItemClick={handleOptionsClick}
          focusItem={focusItem}
          options={options}
          setFocusItem={setFocusItem}
          opeartionOptions={opeartionOptions}
        />
      </Item>
    </div>
  );
}

SmartInput.defaultProps = {
  onBlur: nfn,
  onChange: nfn,
  onSearch: nfn,
  onStatusChange: nfn,
  keyOptions: keyOptions,
  opeartionOptions: opeartionOptions,
  connectOptions: connectOptions
};

SmartInput.propTypes = {
  onBlur: PropTypes.func,
  keyOptions: PropTypes.array,
  opeartionOptions: PropTypes.array,
  connectOptions: PropTypes.array
};

export default memo(SmartInput);
