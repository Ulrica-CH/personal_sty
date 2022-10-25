import React, { useState, useCallback } from 'react';
import { isFunction } from 'lodash';
import Button from '../Button';
import { Modal } from './Modal';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

/**
 * 用于控制在初始渲染时，Modal是不渲染的，来保证动画的运行
 * @returns
 */
function Dialog({
  body,
  isModalInput,
  handleEnsure,
  isAlert,
  validate,
  ...others
}) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const modal = useModal();

  // prompt方法用来传值
  const ensure = useCallback(async () => {
    setLoading(true);

    try {
      const ok = await validate(value);
      console.log(ok);
      setLoading(false);
      if (ok) {
        modal.resolve(value);
        modal.hide();
        modal.remove();
      }
    } catch (error) {
      setLoading(false);
    }
  }, [value]);

  const cancel = useCallback(isClickButton => {
    if (isAlert) {
      modal.resolve(value);
    } else {
      modal.reject(isClickButton);
      modal.hide();
    }
    modal.remove();
  }, []);

  const footer = isAlert ? (
    <Button type="dark" width="60" mini onClick={ensure}>
      确定
    </Button>
  ) : (
    undefined
  );

  return (
    <Modal
      isOpen={modal.visible}
      handleEnsure={ensure}
      handleCancel={cancel}
      footer={footer}
      loading={loading}
      {...others}
    >
      {isModalInput && isFunction(body) ? body({ value, setValue }) : body}
    </Modal>
  );
}

Dialog.defaultProps = {
  validate: v => true
};

const ConfirmDialog = NiceModal.create(Dialog);

/**
 * 通用的confirm方法
 * @param {Object} config 配置信息
 */
export default function confirm(config) {
  const {
    title = '提示',
    cancelTxt = '取消',
    ensureTxt = '确定',
    body = '',
    isAlert = false,
    titleIcon,
    bodyIcon,
    width = 300,
    ...others
  } = config;
  const style = {
    overlay: {
      zIndex: 1020 // 弹窗的z-index高于当前
    }
  };
  return NiceModal.show(ConfirmDialog, {
    title,
    titleIcon,
    body,
    bodyIcon,
    style,
    btnCancelTxt: cancelTxt,
    btnEnsureTxt: ensureTxt,
    isAlert,
    width,
    ...others
  });
}
