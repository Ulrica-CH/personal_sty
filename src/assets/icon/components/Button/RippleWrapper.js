//水波纹效果盒
// RippleWrapper 是所有 Ripple 的容器，它内部会维护一个 state: { rippleArray: [] }。
// 未使用 onClick 防止button常用的触发bug

import * as React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Ripple from './Ripple';
class RippleWrapper extends React.Component {
  static defaultProps = {
    component: 'div',
    center: false,
    timeout: {
      enter: 500,
      exit: 500
    }
  };

  state = {
    rippleArray: [],
    nextKey: 0
  };
  startTimeout = undefined;
  startWrapper = () => {};
  ignoringMousedown = false;

  handleMouseDown = e => {
    this.start(e);
  };

  handleMouseUp = e => {
    this.stop(e);
  };

  handleMouseLeave = e => {
    this.stop(e);
  };

  handleTouchStart = e => {
    this.start(e);
  };

  handleTouchEnd = e => {
    this.stop(e);
  };

  handleTouchMove = e => {
    this.stop(e);
  };

  componentWillUnmount() {
    clearTimeout(this.startTimeout);
  }

  start(e) {
    if (e.type === 'mousedown' && this.ignoringMousedown) {
      this.ignoringMousedown = false;
      return;
    }
    if (e.type === 'touchstart') {
      this.ignoringMousedown = true;
    }

    const { center, timeout } = this.props;

    const element = ReactDOM.findDOMNode(this);
    const rect = element
      ? element.getBoundingClientRect()
      : {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };

    let rippleX, rippleY, rippleSize;
    // 计算触发坐标
    if (
      center ||
      (e.clientX === 0 && e.clientY === 0) ||
      (!e.clientX && !e.touches)
    ) {
      // place the ripple in the center of the rect
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const clientX = e.clientX ? e.clientX : e.touches[0].clientX;
      const clientY = e.clientY ? e.clientY : e.touches[0].clientY;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }

    // 计算触发区大小
    if (center) {
      rippleSize = Math.sqrt(
        (2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3
      );
    } else {
      const sizeX =
        Math.max(
          Math.abs((element ? element.clientWidth : 0) - rippleX),
          rippleX
        ) *
          2 +
        2;
      const sizeY =
        Math.max(
          Math.abs((element ? element.clientHeight : 0) - rippleY),
          rippleY
        ) *
          2 +
        2;
      rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
    }

    // 执行
    if (e.touches) {
      //延迟触摸设备的涟漪效应
      //因为touchend事件总是足够快地触发
      //用户甚至没有注意到涟漪效应
      this.startWrapper = () => {
        this.createRipple({ rippleX, rippleY, rippleSize, timeout });
      };
      //超时时间不能太长，否则会出现延迟
      this.startTimeout = setTimeout(() => {
        this.startWrapper();
        this.startWrapper = null;
      }, 80);
    } else {
      this.createRipple({ rippleX, rippleY, rippleSize, timeout });
    }
  }

  //创建波纹组件
  createRipple(params) {
    const { rippleX, rippleY, rippleSize, timeout } = params;
    let rippleArray = this.state.rippleArray;

    rippleArray = [
      ...rippleArray,
      <Ripple
        timeout={timeout}
        color={this.props.color}
        key={this.state.nextKey}
        rippleX={rippleX}
        rippleY={rippleY}
        rippleSize={rippleSize}
      />
    ];

    this.setState({
      rippleArray: rippleArray,
      nextKey: this.state.nextKey + 1
    });
  }

  stop(e) {
    clearTimeout(this.startTimeout);
    const { rippleArray } = this.state;

    if (e.type === 'touchend' && this.startWrapper) {
      //当touchend被触发
      //在' createRipple '被卸载之前
      //调用createRipple
      //和为停止事件安排时间表
      e.persist();
      this.startWrapper();
      this.startWrapper = null;
      this.startTimeout = setTimeout(() => {
        this.stop(e);
      }, 0);
      return;
    }

    this.startWrapper = null;

    if (rippleArray && rippleArray.length) {
      // 删除最早波纹
      this.setState({
        rippleArray: rippleArray.slice(1)
      });
    }
  }

  render() {
    const {
      className,
      center,
      component: Component,
      children,
      color,
      ...other
    } = this.props;

    return (
      <Component
        className={cn('rtr-root', className)}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        {...other}
      >
        {children}
        <TransitionGroup component="span" enter exit>
          {this.state.rippleArray}
        </TransitionGroup>
      </Component>
    );
  }
}

export default RippleWrapper;
