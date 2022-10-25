import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { nfn } from '../../common';
import Dropdown from '../Dropdown';
import OverlayMatch from './OverlayMatch';
import Icon from '../Icon';
import arrowIcon from '../CheckboxSelect/images/arrow-down-mini.svg';
import deleteIcon from './images/delete-this.svg';
import { config } from '../../common/config';
import { find } from 'lodash';

export default class InputMatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
    this.hideDropdown = this.hideDropdown.bind(this);
    this.changeVisible = this.changeVisible.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
    this.renderValue = this.renderValue.bind(this);
  }
  hideDropdown() {
    this.setState({
      visible: false
    });
  }
  changeVisible(visible) {
    if (visible !== this.state.visible) {
      this.setState({
        visible
      });
    }
  }

  renderOverlay({
    name,
    type,
    value,
    typeOptions,
    select,
    selectOption,
    visible,
    prefix,
    childrenType,
    childrenTypeShow,
    childrenTypeOptions
  }) {
    const { placeholder } = this.props;
    return (
      <OverlayMatch
        key={JSON.stringify(value || '')}
        ensureFn={this.props.onChange}
        placeholder={placeholder}
        typeOptions={typeOptions}
        name={name}
        type={type}
        value={value}
        select={select}
        selectOption={selectOption}
        visible={visible}
        hideDropdown={this.hideDropdown}
        prefix={prefix}
        childrenType={childrenType}
        childrenTypeShow={childrenTypeShow}
        childrenTypeOptions={childrenTypeOptions}
      />
    );
  }
  renderValue(value, selectOption) {
    const { defaultValue, hintText } = this.props;
    if (value.length > 0) {
      let showValue;
      if (selectOption) {
        showValue = find(selectOption, { value: value[0] })?.label || value[0];
      } else {
        showValue = value[0];
      }
      if (value.length > 1) {
        return (
          <div className="select-show-wrap">
            <div className="select-show-val">{showValue}</div>
            <div>等{value.length}个值</div>
          </div>
        );
      }

      return showValue;
    }
    if (hintText) {
      return <span className="input-Match-hint">{hintText}</span>;
    }
    return defaultValue;
  }
  render() {
    const { visible } = this.state;
    const {
      className,
      name,
      type,
      title,
      value,
      onDelete,
      canDelete,
      typeOptions,
      select,
      selectOption,
      maxDropWidth,
      prefixCls,
      getContainer,
      inline,
      childrenType,
      childrenTypeShow,
      childrenTypeOptions,
      align,
      space = { mgt: 5, mgb: 5 }
    } = this.props;
    const prefix = prefixCls || config.prefixCls;
    const classes = classNames(`${prefix}input-match-wrapper`, className);
    return (
      <div className={classes}>
        <Dropdown
          inline={inline}
          getContainer={getContainer}
          visible={visible}
          maxWidth={maxDropWidth}
          onVisibleChange={this.changeVisible}
          trigger="click"
          stopPropagation={false}
          align={align}
          space={space}
          overlay={this.renderOverlay({
            name,
            type,
            value,
            typeOptions,
            select,
            selectOption,
            visible,
            prefix,
            childrenType,
            childrenTypeShow,
            childrenTypeOptions
          })}
        >
          <div className="dropdown-value">
            {title ? (
              <Fragment>
                <span className="input-title" title={title}>
                  {title}
                </span>
                :
              </Fragment>
            ) : null}
            <div className="input-val">
              {this.renderValue(value, selectOption)}
            </div>
            <Icon
              link={arrowIcon}
              className={classNames('drop-down-icon', {
                'rotate-180': visible
              })}
            />
          </div>
        </Dropdown>
        {canDelete && onDelete ? (
          <Icon
            link={deleteIcon}
            className="delete-icon"
            onClick={() => onDelete({ name })}
          />
        ) : null}
      </div>
    );
  }
}

InputMatch.propTypes = {
  /** 标题 */
  title: PropTypes.string,
  /** 字段名称 */
  name: PropTypes.string,
  /** 下拉是否可见 */
  visible: PropTypes.bool,
  /** 匹配类型*/
  type: PropTypes.oneOf(['exact', 'fuzzy']),
  /** 类型选项*/
  typeOptions: PropTypes.array,
  /** 数值 */
  value: PropTypes.array,
  /** 删除回调 */
  onDelete: PropTypes.func,
  /** 是否支持删除 */
  canDelete: PropTypes.bool,
  /** 修改内容回调 */
  onChange: PropTypes.func,
  /** 自定义class */
  className: PropTypes.string,
  /** 默认值 */
  defaultValue: PropTypes.string,
  /** 占位提示语 */
  placeholder: PropTypes.string,
  /** 是否支持选项 */
  select: PropTypes.bool,
  /** 开启选择后选项列表 */
  selectOption: PropTypes.array,
  /** 外层占位提示语 */
  hintText: PropTypes.string,
  /** 下拉选项定位参照物，同Dropdown属性*/
  getContainer: PropTypes.func,
  /** 是否节点中显示 */
  inline: PropTypes.bool,
  /**是否支持子节点选项 */
  childrenTypeShow: PropTypes.bool,
  /** 子节点默认选项*/
  childrenType: PropTypes.string,
  /** 子节点选项 需要和typeOptions中一一对应*/
  childrenTypeOptions: PropTypes.object,
  /** 下拉选项对齐方式，默认左对齐 */
  align: PropTypes.string,
  /** 下拉框距输入框边距 */
  space: PropTypes.shape({
    mgt: PropTypes.number,
    mgb: PropTypes.number
  })
};
InputMatch.defaultProps = {
  visible: false,
  canDelete: false,
  placeholder: '每行输入一个值',
  type: 'exact',
  childrenType: 'equal',
  childrenTypeShow: false,
  typeOptions: [
    {
      label: '精确匹配',
      value: 'exact'
    },
    {
      label: '模糊匹配',
      value: 'fuzzy'
    }
  ],
  childrenTypeOptions: {
    exact: [
      {
        label: '等于',
        value: 'equal'
      },
      {
        label: '不等于',
        value: 'unequal'
      }
    ],
    fuzzy: [
      {
        label: '包含',
        value: 'include'
      },
      {
        label: '不包含',
        value: 'exclusive'
      }
    ]
  },
  onChange: nfn,
  defaultValue: '全部',
  onDelete: nfn,
  maxDropWidth: 300
};
