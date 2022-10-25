import Modal from './Modal';
import confirm from './confirm';
import warnIcon from './images/warn.svg';
import * as M from '@ebay/nice-modal-react';

console.log(M);
const top = 100;

Modal.alert = (msg, config = {}) =>
  confirm({
    body: msg,
    isAlert: true,
    top,
    ...config
  });

Modal.confirm = (msg, config = {}) =>
  confirm({
    body: msg,
    top,
    ...config
  });

Modal.success = (msg, config = {}) =>
  confirm({
    body: msg,
    bodyIcon: 'success',
    top,
    ...config
  });

Modal.error = (msg, config = {}) =>
  confirm({
    body: msg,
    bodyIcon: 'error',
    top,
    ...config
  });

Modal.warning = (msg, config = {}) =>
  confirm({
    body: msg,
    titleIcon: warnIcon,
    top,
    ...config
  });

Modal.prompt = (bodyRender, config = {}) =>
  confirm({
    body: bodyRender,
    isModalInput: true,
    top,
    ...config
  });

Object.keys(M).forEach(key => {
  Modal[key] = M[key];
});

const { Provider } = M;

export { Provider };

export default Modal;
