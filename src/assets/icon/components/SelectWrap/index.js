import React, {
  useState,
  useCallback,
  useMemo,
  Fragment,
  useEffect,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DropDown from '../Dropdown';
import Icon from '../Icon';
// import Input from '../Input';
import Item from '../Item';
import { useDefault } from '../../common/hooks';
import { nfn } from '../../common';
// import closeIcon from '../DropdownInput/images/close.svg';
import arrowIcon from '../CheckboxSelect/images/arrow-down-mini.svg';
import { config } from '../../common/config';
import deleteThis from '../CheckboxSelect/images/delete-this.svg';

const OverlayWrap = props => {
  return cloneElement(props.children, props);
};
function SelectWrap({
  defaultValue,
  defaultOpen,
  onChange,
  onClear,
  title,
  hasError,
  stopPropagation,
  mini,
  placeholder,
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
  prefixCls,
  maxDropWidth,
  maxWidth,
  emptyContent,
  align,
  overlay,
  onVisibleChange
}) {
  const prefix = prefixCls || config.prefixCls;
  const [value, setValue] = useDefault(defaultValue);
  const [oldValue, setOldValue] = useDefault(defaultValue);
  const [visible, setVisible] = useState(defaultOpen);
  useEffect(() => {
    if (visible) {
      setOldValue(value);
    }
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

  // const handleDetele = useCallback(
  //   val => {
  //     if (disabled) return;
  //     setValue(value.filter(x => x !== val));
  //     onChange(value.filter(x => x !== val));
  //   },
  //   [value, onChange, setValue]
  // );

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

  const valueStr = getValueString ? getValueString(value) : value.toString();

  const classes = classNames(
    `${prefix}checkbox-select-wrap`,
    onDelete ? className + ' can-delete' : className
  );
  const resultClasses = classNames(
    `${prefix}checkbox-select-result`,
    'radius',
    {
      background,
      mini,
      disabled,
      error: hasError
    }
  );

  return (
    <div className={classes} style={{ maxWidth: maxWidth, ...style }}>
      <DropDown
        visible={visible}
        onVisibleChange={val => {
          onVisibleChange && onVisibleChange(val);
          setVisible(val);
        }}
        inline={inline}
        disabled={disabled}
        stopPropagation={stopPropagation}
        defaultOpen={defaultOpen}
        getContainer={getContainer}
        maxWidth={inline ? undefined : maxDropWidth}
        control
        align={align}
        space={{ mgt: 5, mgb: 5 }}
        overlay={
          <OverlayWrap
            title={title}
            mini={mini}
            defaultValue={defaultValue}
            selectHeight={selectHeight}
            onEnsure={handleEnsure}
            onClose={() => setVisible(false)}
            onCancel={handleCancel}
            onClear={handleClear}
            onChange={handleSelectChange}
            prefix={prefix}
            maxDropWidth={maxDropWidth}
            emptyContent={emptyContent}
          >
            {overlay}
          </OverlayWrap>
        }
      >
        <div className={resultClasses}>
          <Fragment>
            <Item show={!!title}>
              <span className="checkbox-select-result-label">{title}</span>
            </Item>
            <p className="checkbox-select-result-value" title={valueStr}>
              {valueStr}
            </p>
            <Item show={!valueStr}>
              <div className="empty-result">{placeholder}</div>
            </Item>
          </Fragment>
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

SelectWrap.propTypes = {
  /** ?????????????????????label, value?????? */
  options: PropTypes.array,
  /** ?????? */
  title: PropTypes.string,
  /** ????????? */
  defaultValue: PropTypes.array,
  /** ??????????????????????????????*/
  defaultOpen: PropTypes.bool,
  /** change???????????? */
  onChange: PropTypes.func,
  /** ????????????????????? */
  onClear: PropTypes.func,
  /** ?????????????????? */
  onOk: PropTypes.func,
  /** ??????????????????????????? */
  getValueString: PropTypes.func,
  /** ????????? */
  mini: PropTypes.bool,
  /** ??????????????? */
  background: PropTypes.bool,
  /** ???????????? */
  onDelete: PropTypes.func,
  /** ?????????????????? */
  stopPropagation: PropTypes.bool,
  /** ?????????class */
  className: PropTypes.string,
  /** ????????? */
  placeholder: PropTypes.string,
  /** ??????????????? */
  style: PropTypes.object,
  /** ????????????????????????portal, ???Dropdown??????*/
  inline: PropTypes.bool,
  /** ?????????????????????????????????Dropdown??????*/
  getContainer: PropTypes.func,
  /** ????????????????????? */
  selectHeight: PropTypes.any,
  /** ????????????????????? */
  selectWidth: PropTypes.number,
  /** ???????????? */
  disabled: PropTypes.bool,
  /** ??????????????????????????? */
  emptyContent: PropTypes.string,
  /** ?????????????????????????????????????????? */
  align: PropTypes.string
};

SelectWrap.defaultProps = {
  onDelete: null,
  mini: false,
  background: false,
  stopPropagation: true,
  placeholder: '?????????',
  onClear: nfn,
  onChange: nfn,
  onOk: nfn,
  defaultValue: [],
  disabled: false,
  maxDropWidth: 300,
  emptyContent: '????????????!',
  overlay: <></>
};
export default SelectWrap;
