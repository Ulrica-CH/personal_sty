import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useMemo } from 'react';
import { useControlledInputs } from '../../common/hooks';
import Button from '../Button';
import Popover from '../Popover';
import Icon from '../Icon';
import { map } from 'lodash';
import Item from '../Item';
import Progress from '../Progress';

/** 单文件数据映射 */
const mapDefaultToValue = v => v;
/** 单选时返回的时一个file对象，多选返回一个数组包含选中的所有file对象 */
const mapValuetoValue = (e, props) => {
  if (!e) {
    return null;
  }
  const fileMap = e.target.files;
  if (!props?.multi) return fileMap[0];
  const resArr = [];
  for (let i = 0; i < fileMap.length; i++) {
    resArr.push(fileMap[i]);
  }
  return resArr;
};

/**
 * 文件上传模块
 */
export default function Uploader({
  defaultValue,
  onChange,
  hasError,
  buttonRender,
  type,
  progress,
  showProgress,
  success,
  error,
  errorMsg,
  className,
  style,
  mini,
  deletable = false,
  multi,
  positionByPop = 'right',
  ...others
}) {
  const inputRef = useRef(null);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue,
    props: { multi }
  });

  /** 选择一个文件时展示文件名，选择多个时展示第一个文件名... hover展示所有文件名 */
  const fileName = useMemo(() => {
    const name = multi ? value?.[0]?.name : value?.name;
    if (value?.length > 1) {
      const allName = map(value, file => <p>{file.name}</p>);
      return (
        <Popover position={positionByPop} content={<div>{allName}</div>}>
          {name}...
        </Popover>
      );
    }
    return name;
  }, [value, positionByPop]);
  // 触发文件选择的按钮
  const selectFiles = useCallback(() => {
    inputRef.current.click();
  }, []);

  const onFileDelete = useCallback(() => {
    inputRef.current.value = null;
    handleChange(null);
  }, []);
  // 样式
  const classes = classNames('uploader', className);
  const inputClasses = classNames('input file-name', {
    error: hasError,
    mini
  });

  return (
    <div className={classes} style={style}>
      <div className="file">
        <input
          type="file"
          ref={inputRef}
          multiple={multi}
          onChange={e => {
            // 避免取消清空文件
            if (mapValuetoValue(e, { multi })) {
              handleChange(e);
            }
            // 选择相同文件不触发的问题
            e.target.value = '';
          }}
          className="file-hide"
        />
        <Item show={type === 'input'}>
          <>
            <div className={inputClasses} onClick={selectFiles}>
              {fileName}
            </div>
            <div onClick={selectFiles}>
              {buttonRender || (
                <Button type="primary" mini={mini}>
                  选择文件
                </Button>
              )}
            </div>
          </>
        </Item>
        {/* button类型 */}
        <Item show={type === 'button'}>
          <div className="button-wrap" onClick={selectFiles}>
            {buttonRender || (
              <Button type="primary" className="upload-btn" mini={mini}>
                <Icon type="upload" className="upload-icon" />
                选择文件
              </Button>
            )}
            <Item show={value}>
              <div className="file-item">
                <div className="file-name">
                  <Icon type="fileLink" className="mgr5" mini fill="#3E4043" />
                  {fileName}
                  {/* 状态 */}
                  <Item show={success}>
                    <span className="success status">上传成功</span>
                  </Item>
                  <Item show={error}>
                    <span className="error status">上传失败 {errorMsg}</span>
                  </Item>
                </div>
                {/* 删除按钮 */}
                {deletable ? (
                  <Icon
                    onClick={onFileDelete}
                    type="deleteAll"
                    className="delete-btn mgr5"
                    mini
                  />
                ) : null}
              </div>
            </Item>
          </div>
        </Item>
      </div>
      <Item show={showProgress}>
        <Progress
          percent={progress}
          {...others}
          status={error ? 'exception' : ''}
          strokeColor={error ? '#ff4d4f' : ''}
          strokeWidth={3}
        />
      </Item>
    </div>
  );
}

Uploader.defaultProps = {
  onChange: v => v,
  type: 'input',
  showProgress: false,
  success: false,
  error: false
};
Uploader.propTypes = {
  /** 事件回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 是否Error, 自带error样式 */
  hasError: PropTypes.bool,
  /** 自定义文件上传的class */
  className: PropTypes.string,
  /** 自定义选择文件的触发按钮 */
  buttonRender: PropTypes.any,
  /** 默认提供两种类型的文件上传 */
  type: PropTypes.oneOf(['input', 'button']),
  /** 当前上传进度 */
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** 展示进度 */
  showProgress: PropTypes.bool,
  /** 文件上传成功 */
  success: PropTypes.bool,
  /** 文件上传失败 */
  error: PropTypes.bool,
  /** mini版 */
  mini: PropTypes.bool,
  /** 是否可删除 */
  deletable: PropTypes.bool,
  /** 是否可多选 */
  multi: PropTypes.bool,
  /** 当选择多个文件时展示的Pop位置，值与Popover的position对应 */
  positionByPop: PropTypes.string
};
