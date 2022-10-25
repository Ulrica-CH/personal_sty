/*
 * @LastEditTime: 2021-02-19 17:44:45
 * @LastEditors: jinxiaojian
 */
// 水波纹效果组件
// Ripple 就是一个圆形，涟漪本身，它会接受 rippleX， rippleY 这样的坐标在相应位置渲染，以及 rippleSize 决定其大小。

import * as React from 'react';
import cn from 'classnames';
import Transition from 'react-transition-group/Transition';
class Ripple extends React.Component {
  state = {
    rippleEntering: false,
    wrapperExiting: false
  };

  handleEnter = () => {
    this.setState({
      rippleEntering: true
    });
  };

  handleExit = () => {
    this.setState({
      wrapperExiting: true
    });
  };

  render() {
    const {
      className,
      rippleX,
      rippleY,
      rippleSize,
      color,
      timeout,
      ...other
    } = this.props;
    const { wrapperExiting, rippleEntering } = this.state;
    return (
      <Transition
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        timeout={timeout}
        {...other}
      >
        <span
          className={cn(
            'rtr-ripple-wrapper',
            {
              'rtr-ripple-wrapper-exiting': wrapperExiting
            },
            className
          )}
          style={{ animationDuration: `${timeout.exit}ms` }}
        >
          <span
            className={cn('rtr-ripple', {
              'rtr-ripple-entering': rippleEntering
            })}
            style={{
              width: rippleSize,
              height: rippleSize,
              top: rippleY - rippleSize / 2,
              left: rippleX - rippleSize / 2,
              backgroundColor: color,
              animationDuration: `${timeout.enter}ms`
            }}
          />
        </span>
      </Transition>
    );
  }
}

export default Ripple;
