import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import filter from 'lodash/filter';
import Notice from './Notice';
import { loading, loadingGloabl } from './Loading';
import { config } from '../../common/config';

let seed = 0;

class AlertGroup extends React.Component {
  state = {
    alerts: []
  };

  onEnd = key => {
    const { alerts } = this.state;
    this.setState({
      alerts: filter(alerts, alert => alert.key !== key)
    });
  };

  addAlert = a => {
    if (!a.key) {
      seed++;
      a.key = String(seed);
    }
    this.setState({
      alerts: [a].concat(this.state.alerts)
    });

    return () => this.onEnd(a.key);
  };

  render() {
    const { alerts } = this.state;
    const children = alerts.map(a => {
      return (
        <CSSTransition
          timeout={500}
          classNames={`${config.prefixCls}item`}
          key={a.key}
        >
          <div style={{ position: 'relative', transition: 'all .3s linear' }}>
            <Notice {...a} onEnd={() => this.onEnd(a.key)} />
          </div>
        </CSSTransition>
      );
    });

    return <TransitionGroup>{children}</TransitionGroup>;
  }
}

const alertGroup = new Map();

const a = {
  fn: () => {}
};

function alert(content, time, type, target = document.body, closable) {
  let group = alertGroup.get(target);
  // let cancel = () => {};
  let cancel = () => {
    a.fn();
  };
  const add = group =>
    group.addAlert({
      content,
      time,
      type,
      closable
    });

  if (!group) {
    const div = document.createElement('div');

    div.setAttribute('class', `${config.prefixCls}notice-group`);

    // body容器下 默认为fix
    if (target === document.body) {
      div.style.position = 'fixed';
    }

    target.appendChild(div);
    const ref = createRef();
    ReactDOM.render(<AlertGroup ref={ref} />, div, () => {
      group = ref.current;
      alertGroup.set(target, group);
      // 这里是异步的，如果直接赋值会使cancel函数为空函数，所以选择修改ａ的引用，同时cancel指向ａ的引用
      a.fn = add(group);
    });
  } else {
    a.fn = add(group);
  }

  return cancel;
}

export default {
  success: (info, time = 3000, target, closable) =>
    alert(info, time, 'success', target, closable),
  error: (info, time = 9000, target, closable) =>
    alert(info, time, 'error', target, closable),
  warning: (info, time = 3000, target, closable) =>
    alert(info, time, 'warning', target, closable),
  // 基本的图标配置
  alert: (info, icon, time = 3000, target, closable) =>
    alert(info, time, icon, target, closable),
  loading: (info, time = 0, target) => loading(info, time, 'loading', target),
  global: (info, time = 0, target) =>
    loadingGloabl(info, time, 'global', target)
};
