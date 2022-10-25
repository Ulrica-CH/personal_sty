import React, { cloneElement, Component } from 'react';
import cx from 'classnames';
import Loading from '../Loading';
import Icon from '../Icon';
import alertIcon from './images/warning.svg';
import errorIcon from './images/fail.svg';
import cloIcon from './images/notice-close.svg';
import successIcon from './images/success.svg';
import loadingIcon from './images/loading.svg';
import { config } from '../../common/config';

const typeMap = {
  success: successIcon,
  error: errorIcon,
  warning: alertIcon,
  loading: loadingIcon
};

export default class Notice extends Component {
  componentDidMount = () => {
    const { onEnd, time = 3000 } = this.props;
    if (time) {
      this.timer = setTimeout(onEnd, time);
    }
  };

  onMouseEnter = () => {
    clearTimeout(this.timer);
  };

  onMouseLeave = () => {
    const { onEnd, time = 3000 } = this.props;
    if (time) {
      this.timer = setTimeout(onEnd, time);
    }
  };

  render() {
    const { type = 'warning', content, onEnd } = this.props;
    const icon = typeMap[type];
    const cls = cx(`${config.prefixCls}notice`, type);
    if (type === 'global') {
      return <Loading type={type}>{content}</Loading>;
    }
    return (
      // <div>
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={cls}
      >
        <div className="notice-content">
          {type === 'loading' ? (
            <Loading size="sm" showLabel={false} />
          ) : icon ? (
            <Icon link={icon} className="notice-icon" />
          ) : (
            cloneElement(type, {
              className: cx(type?.props?.className, 'notice-icon')
            })
          )}
          {content}
        </div>
        <div className="notice-icon-close-wrap">
          <div className="notice-icon-close">
            <Icon onClick={onEnd} link={cloIcon} />
          </div>
        </div>
      </div>
      // </div>
    );
  }
}
