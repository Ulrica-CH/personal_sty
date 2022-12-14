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
            <div>???{value.length}??????</div>
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
  /** ?????? */
  title: PropTypes.string,
  /** ???????????? */
  name: PropTypes.string,
  /** ?????????????????? */
  visible: PropTypes.bool,
  /** ????????????*/
  type: PropTypes.oneOf(['exact', 'fuzzy']),
  /** ????????????*/
  typeOptions: PropTypes.array,
  /** ?????? */
  value: PropTypes.array,
  /** ???????????? */
  onDelete: PropTypes.func,
  /** ?????????????????? */
  canDelete: PropTypes.bool,
  /** ?????????????????? */
  onChange: PropTypes.func,
  /** ?????????class */
  className: PropTypes.string,
  /** ????????? */
  defaultValue: PropTypes.string,
  /** ??????????????? */
  placeholder: PropTypes.string,
  /** ?????????????????? */
  select: PropTypes.bool,
  /** ??????????????????????????? */
  selectOption: PropTypes.array,
  /** ????????????????????? */
  hintText: PropTypes.string,
  /** ?????????????????????????????????Dropdown??????*/
  getContainer: PropTypes.func,
  /** ????????????????????? */
  inline: PropTypes.bool,
  /**??????????????????????????? */
  childrenTypeShow: PropTypes.bool,
  /** ?????????????????????*/
  childrenType: PropTypes.string,
  /** ??????????????? ?????????typeOptions???????????????*/
  childrenTypeOptions: PropTypes.object,
  /** ?????????????????????????????????????????? */
  align: PropTypes.string,
  /** ??????????????????????????? */
  space: PropTypes.shape({
    mgt: PropTypes.number,
    mgb: PropTypes.number
  })
};
InputMatch.defaultProps = {
  visible: false,
  canDelete: false,
  placeholder: '?????????????????????',
  type: 'exact',
  childrenType: 'equal',
  childrenTypeShow: false,
  typeOptions: [
    {
      label: '????????????',
      value: 'exact'
    },
    {
      label: '????????????',
      value: 'fuzzy'
    }
  ],
  childrenTypeOptions: {
    exact: [
      {
        label: '??????',
        value: 'equal'
      },
      {
        label: '?????????',
        value: 'unequal'
      }
    ],
    fuzzy: [
      {
        label: '??????',
        value: 'include'
      },
      {
        label: '?????????',
        value: 'exclusive'
      }
    ]
  },
  onChange: nfn,
  defaultValue: '??????',
  onDelete: nfn,
  maxDropWidth: 300
};
