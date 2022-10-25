import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useControlledInputs } from '../../common/hooks';
import Button from '../Button';
import { nfn } from '../../common';
import Icon from '../Icon';
import success from './images/success.svg';
import error from './images/error.svg';
import loading from './images/loading.svg';

const mapDefaultToValue = v => ({ name: v });
const mapValuetoValue = e => e.target.files[0];

/**
 * 文件上传模块
 */
export default function FileUpload({
  defaultValue,
  onChange,
  hasError,
  className,
  style,
  status,
  onSubmit,
  buttonRender
}) {
  const inputRef = useRef(null);
  const { value, handleChange } = useControlledInputs({
    defaultValue,
    onChange,
    mapDefaultToValue,
    mapValuetoValue
  });

  const selectFiles = () => {
    inputRef.current.click();
  };

  const classes = classNames('file-upload', className);
  const inputClasses = classNames('input file-name', {
    active: value && value.name,
    error: hasError
  });
  return (
    <div className={classes} style={style}>
      <div className="file">
        <input
          type="file"
          ref={inputRef}
          onChange={e => {
            // 避免取消清空文件
            if (e.target.value) {
              handleChange(e);
            }
            // 选择相同文件不触发的问题
            e.target.value = '';
          }}
          className="file-hide"
        />
        <div className={inputClasses} onClick={selectFiles}>
          {(value && value.name) || ''}
        </div>
        <div onClick={onSubmit}>
          {buttonRender || (
            <Button type="primary" className="file-upload-button">
              上传文件
            </Button>
          )}
        </div>
      </div>
      <div className="file-status">
        {status === 'success' && (
          <span className="file-success icon-box">
            <Icon link={success}></Icon>
            文件上传成功
          </span>
        )}
        {status === 'loading' && (
          <span className="file-loading icon-box">
            <Icon link={loading}></Icon>
            文件上传中...
          </span>
        )}
        {status === 'error' && (
          <span className="file-error icon-box">
            <Icon link={error}></Icon>
            文件上传失败
          </span>
        )}
      </div>
    </div>
  );
}

FileUpload.defaultProps = {
  onChange: nfn
};
FileUpload.propTypes = {
  /** 事件回调 */
  onChange: PropTypes.func,
  /** 默认值 */
  defaultValue: PropTypes.any,
  /** 是否Error, 自带error样式 */
  hasError: PropTypes.bool,
  /**上传状态 success、loading、error*/
  status: PropTypes.string,
  /**上传文件到服务器 */
  onSubmit: PropTypes.func,
  /** 自定义按钮render */
  buttonRender: PropTypes.func
};
