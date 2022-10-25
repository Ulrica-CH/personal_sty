import React, { useRef, useCallback } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Message from '../Message';
import Item from '../Item';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import Tips from '../Tips';
import cx from 'classnames';
import { config } from '../../common/config';

function Copy(props) {
  const {
    txt,
    children,
    icon = true,
    tip,
    white,
    pos,
    type,
    tipType,
    hoverText,
    position = 'right'
  } = props;

  const cls = cx(`${config.prefixCls}copy-click-zone`);
  const iconRef = useRef(null);
  const copyCallback = useCallback(e => {
    if (tipType === 'global') {
      Message.success(tip);
    } else {
      Message.success(tip, 3000, iconRef.current);
    }
  });
  return (
    <CopyToClipboard text={txt} onCopy={copyCallback}>
      <Tips
        mini
        type="success"
        content={hoverText}
        trigger="hover"
        position={position}
      >
        <div
          style={{ display: type }}
          className={cls}
          onClick={e => e.stopPropagation()}
        >
          <Item show={pos === 'prepend' && icon === true}>
            <span ref={iconRef} style={{ display: 'inline-flex' }}>
              <Icon
                type="copy"
                className={`${
                  white ? 'icon-copy-white mgr5' : 'icon-copy mgr5'
                } copy-icon`}
              />
            </span>
          </Item>
          {children || ''}
          <Item show={pos === 'append' && icon === true}>
            <span ref={iconRef} style={{ display: 'inline-flex' }}>
              <Icon type="copy" className="icon-copy mgl5 copy-icon" />
            </span>
          </Item>
        </div>
      </Tips>
    </CopyToClipboard>
  );
}

Copy.defaultProps = {
  tip: '已复制',
  pos: 'append',
  hoverText: '复制',
  white: false,
  type: 'inline-flex',
  icon: true,
  tipType: 'global'
};
Copy.propTypes = {
  /** 要复制的内容 */
  txt: PropTypes.string,
  /** 复制成功时的文案 */
  tip: PropTypes.string,
  /** 是否显示复制图标 */
  icon: PropTypes.bool,
  /** 展示的方式display, 默认是inline-flex*/
  type: PropTypes.string,
  /** 提示挂载位置 near: 图标旁边 global :全局 */
  tipType: PropTypes.oneOf(['global', 'near']),
  /** 图标显示的位置， prepend、append之一*/
  pos: PropTypes.oneOf(['prepend', 'append']),
  /** pos为prepend时，icon的颜色会否为白色，默认为false*/
  white: PropTypes.bool,
  /** hover时的提示文案 */
  hoverText: PropTypes.string
};

export default Copy;
