import React, {
  useState,
  useCallback,
  useMemo,
  Fragment,
  useEffect,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import { debounce, toLower } from 'lodash';
import SearchInput from '../SearchInput';
import Checkbox from '../Checkbox';
import DropDown from '../Dropdown';
import Icon from '../Icon';
import Button from '../Button';
// import Input from '../Input';
import Label from '../Label';
import Item from '../Item';
import TruncateTip from '../TruncateTip';
import { useDefault, useOptionsMounted } from '../../common/hooks';
import { nfn } from '../../common';
// import closeIcon from '../DropdownInput/images/close.svg';
import arrowIcon from './images/arrow-down-mini.svg';
import removeIcon from './images/remove-one.svg';
import { find } from 'lodash';
import { config } from '../../common/config';
import deleteThis from './images/delete-this.svg';

const { CheckboxGroup } = Checkbox;

const Overlay = props => {
  const {
    options,
    onChange,
    onClear,
    onEnsure,
    defaultValue,
    withSearch,
    mini,
    sortable,
    searchTxt,
    withFooter,
    checkboxType,
    isSingle,
    selectHeight,
    onClose,
    onSearch,
    // placeholder,
    onCancel,
    prefix,
    emptyContent,
    loading,
    scrollLoad,
    scrollPageSize,
    searchLower
  } = props;

  const ref = useRef();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!scrollLoad || !ref.current) return;

    if (page * scrollPageSize >= options.length) {
      ref.current.onscroll = null;
      return;
    }
    ref.current.onscroll = ({ target }) => {
      // 提前100个像素加载数据，优化体验
      if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
        setPage(page + 1);
      }
    };
  }, [ref.current, page, options]);

  const getResultOptions = () => {
    const filtered =
      searchTxt === ''
        ? options
        : filter(options, item =>
            searchLower
              ? includes(toLower(item.label), toLower(searchTxt))
              : includes(item.label, searchTxt)
          );

    // 没有选中值或者options，直接返回，避免不必要的逻辑
    if (!sortable || !defaultValue?.length || !filtered?.length)
      return filtered;

    // 如果可排序，将已选中的放到前面

    const selected = filtered.filter(item =>
      includes(defaultValue, item.value)
    );
    const unSelected = filtered.filter(
      item => !includes(defaultValue, item.value)
    );

    return selected.concat(unSelected);
  };

  const selectSingleVal = val => {
    onChange([val]);
    onClose();
  };

  const resultOptions = useMemo(() => {
    const res = getResultOptions();
    if (searchTxt || !scrollLoad) return res;
    return res.slice(0, page * scrollPageSize);
  }, [
    searchTxt,
    options,
    sortable,
    defaultValue,
    page,
    scrollLoad,
    scrollPageSize,
    searchLower
  ]);

  const cls = classNames(`${prefix}checkbox-select-content`, {
    sortable
  });

  return (
    <div className={cls}>
      <Item show={withSearch}>
        <SearchInput
          mini
          placeholder={'查找选择条件'}
          onChange={debounce(onSearch, 500)}
          onSearch={onSearch}
          className="checkbox-select-search-input"
        />
      </Item>
      <Item show={!!resultOptions?.length}>
        <div
          ref={ref}
          className="checkbox-select-content-checkbox"
          style={{ maxHeight: selectHeight || 'auto' }}
        >
          <Item show={isSingle}>
            <ul>
              {map(resultOptions, (item, index) => (
                <li
                  key={item.value}
                  className={classNames('checkbox-label', { mini: mini })}
                  onClick={() => selectSingleVal(item.value, onEnsure)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </Item>
          <Item show={!isSingle}>
            <CheckboxGroup defaultValue={defaultValue} onChange={onChange}>
              {map(resultOptions, (item, index) => (
                <Checkbox
                  key={item.value}
                  type={checkboxType}
                  mini={mini}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </CheckboxGroup>
          </Item>
        </div>
      </Item>
      <Item show={!resultOptions?.length}>
        <div className="empty-content">
          {loading ? '数据加载中...' : emptyContent}
        </div>
      </Item>
      <Item show={withFooter}>
        <div className="checkbox-select-button-wrap">
          <Button type="text" mini className="" onClick={onClear}>
            清空
          </Button>

          <div className="">
            <Button type="white" mini className="cancel" onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" className="confirm" onClick={onEnsure} mini>
              确定
            </Button>
          </div>
        </div>
      </Item>
    </div>
  );
};
function CheckboxSelect({
  defaultValue,
  defaultOpen,
  withSearch,
  withFooter,
  onChange,
  onClear,
  title,
  sortable,
  stopPropagation,
  mini,
  options,
  isLink,
  isSingle,
  emptyLabel,
  onDelete,
  className,
  style,
  checkboxType,
  inline,
  getContainer,
  selectHeight,
  selectWidth,
  onOk,
  background,
  getValueString,
  disabled,
  itemLabelType,
  labelTip,
  prefixCls,
  maxDropWidth,
  emptyContent,
  align,
  scrollLoad,
  scrollPageSize,
  searchLower
}) {
  const prefix = prefixCls || config.prefixCls;

  const [value, setValue] = useDefault(defaultValue);
  const [oldValue, setOldValue] = useDefault(defaultValue);
  const [searchTxt, setSearchTxt] = useState('');
  const [visible, setVisible] = useState(defaultOpen);
  const { renderOptions, loading } = useOptionsMounted({
    visible,
    options
  });

  useEffect(() => {
    if (visible) setOldValue(value);
  }, [visible]);
  const handleEnsure = useCallback(() => {
    onChange(value);
    setVisible(false);
    onOk(value);
  }, [value, onChange]);

  const handleCancel = () => {
    setValue(oldValue);
    setVisible(false);
  };

  const handleDetele = useCallback(
    val => {
      if (disabled) return;
      setValue(value.filter(x => x !== val));
      onChange(value.filter(x => x !== val));
    },
    [value, onChange, setValue]
  );

  const handleSearch = useCallback(val => {
    setSearchTxt(val);
  }, []);

  const handleSelectChange = useCallback(
    v => {
      setValue(v);
      onChange(v);
    },
    [setValue, onChange]
  );

  const handleClear = useCallback(() => {
    handleSelectChange([]);
    onClear([]);
  }, [onChange, onClear]);

  const valueStr = getValueString
    ? getValueString(value, options)
    : filter(options, item => value.includes(item.value))
        .map(item => item.label)
        .join(',');
  const classes = classNames(
    `${prefix}checkbox-select-wrap`,
    { link: isLink },
    onDelete ? className + ' can-delete' : className
  );
  const resultClasses = classNames(
    `${prefix}checkbox-select-result`,
    'radius',
    {
      background,
      mini,
      disabled
    }
  );

  return (
    <div className={classes}>
      <DropDown
        visible={visible}
        onVisibleChange={setVisible}
        inline={inline}
        disabled={disabled}
        stopPropagation={stopPropagation}
        defaultOpen={defaultOpen}
        getContainer={getContainer}
        maxWidth={inline ? undefined : maxDropWidth}
        align={align}
        space={{ mgt: 5, mgb: 5 }}
        overlay={
          <Overlay
            sortable={sortable}
            options={renderOptions}
            title={title}
            defaultValue={value}
            isSingle={isSingle}
            mini={mini}
            selectHeight={selectHeight}
            checkboxType={checkboxType}
            withSearch={withSearch}
            withFooter={withFooter}
            searchTxt={searchTxt}
            onSearch={handleSearch}
            onEnsure={handleEnsure}
            onClose={() => setVisible(false)}
            onCancel={handleCancel}
            onClear={handleClear}
            onChange={handleSelectChange}
            prefix={prefix}
            emptyContent={emptyContent}
            loading={loading}
            scrollLoad={scrollLoad}
            scrollPageSize={scrollPageSize}
            searchLower={searchLower}
          />
        }
      >
        <div className={resultClasses}>
          {labelTip ? (
            <Fragment>
              <Item show={value && !!value.length}>
                <TruncateTip
                  list={value}
                  ItemRender={props => {
                    return (
                      <Label type={itemLabelType} className="mgr5">
                        <div className="flexBetween">
                          {find(options, { value: props.item }).label}
                          <Icon
                            link={removeIcon}
                            className="remove-icon mgl5"
                            onClick={e => {
                              e.stopPropagation();
                              handleDetele(props.item);
                            }}
                          />
                        </div>
                      </Label>
                    );
                  }}
                ></TruncateTip>
              </Item>
              <Item show={!value?.length}>
                <div className="empty-result">{emptyLabel}</div>
              </Item>
            </Fragment>
          ) : (
            <Fragment>
              <Item show={!!title}>
                <span className="checkbox-select-result-label">{title}</span>
              </Item>
              <p className="checkbox-select-result-value" title={valueStr}>
                {valueStr}
              </p>
              <Item show={!valueStr}>
                <div className="empty-result">{emptyLabel}</div>
              </Item>
            </Fragment>
          )}

          <div className="arrow-zone">
            <Icon
              link={arrowIcon}
              className={classNames('drop-down-icon', {
                mini,
                'rotate-180': visible
              })}
            />
          </div>
        </div>
      </DropDown>
      {onDelete ? (
        <Icon className="close-icon" link={deleteThis} onClick={onDelete} />
      ) : null}
    </div>
  );
}

CheckboxSelect.propTypes = {
  /** 选项列表，包含label, value字段 */
  options: PropTypes.array,
  /** 标题 */
  title: PropTypes.string,
  /** 默认值 */
  defaultValue: PropTypes.array,
  /** 是否默认展开下拉选项*/
  defaultOpen: PropTypes.bool,
  /** 已选中的默认放到前面 */
  sortable: PropTypes.bool,
  /** change回调事件 */
  onChange: PropTypes.func,
  /** 清除的回调事件 */
  onClear: PropTypes.func,
  /** 确定回调事件 */
  onOk: PropTypes.func,
  /** 映射选中值的字符串 */
  getValueString: PropTypes.func,
  /** 小样式 */
  mini: PropTypes.bool,
  /** 是否带背景 */
  background: PropTypes.bool,
  /** 是否是link样式 */
  isLink: PropTypes.bool,
  /** 支持搜索 */
  withSearch: PropTypes.bool,
  /** 是否包含底部按钮 */
  withFooter: PropTypes.bool,
  /** 删除回调 */
  onDelete: PropTypes.func,
  /** 是否阻止冒泡 */
  stopPropagation: PropTypes.bool,
  /** 自定义class */
  className: PropTypes.string,
  /** checkbox 类型 */
  checkboxType: PropTypes.oneOf(['safe', 'normal', 'red']),
  /** isSingle 是否单选 */
  isSingle: PropTypes.bool,
  /** 空提示 */
  emptyLabel: PropTypes.string,
  /** 自定义样式 */
  style: PropTypes.object,
  /** 下拉选项是否采用portal, 同Dropdown属性*/
  inline: PropTypes.bool,
  /** 下拉选项定位参照物，同Dropdown属性*/
  getContainer: PropTypes.func,
  /** 选择区域的高度 */
  selectHeight: PropTypes.any,
  /** 选择区域的宽度 */
  selectWidth: PropTypes.number,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 已选块的label样式 */
  itemLabelType: PropTypes.string,
  /** 是否开启已选项目的块状展示 */
  labelTip: PropTypes.bool,
  /** 数据为空时候的描述 */
  emptyContent: PropTypes.string,
  /** 选择区域对齐方式，默认左对齐 */
  align: PropTypes.string,
  /** 是否采用滚动加载 */
  scrollLoad: PropTypes.bool,
  /** 滚动加载，一页加载多少条 */
  scrollPageSize: PropTypes.number,
  /** 搜索是否兼容大小写，true兼容，默认false */
  searchLower: PropTypes.bool
};

CheckboxSelect.defaultProps = {
  withSearch: true,
  onDelete: null,
  isLink: false,
  isSingle: false,
  checkboxType: 'normal',
  mini: false,
  sortable: false,
  background: false,
  withFooter: true,
  stopPropagation: true,
  emptyLabel: '请选择查询条件',
  onClear: nfn,
  onChange: nfn,
  onOk: nfn,
  searchLower: false,
  defaultValue: [],
  disabled: false,
  itemLabelType: 'dark',
  maxDropWidth: 300,
  emptyContent: '暂无数据!',
  scrollLoad: false,
  scrollPageSize: 100
};
export default CheckboxSelect;
