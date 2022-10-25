import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import filter from 'lodash/filter';
import Notice from './Notice';
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
      alerts: this.state.alerts.concat(a)
    });
    return () => this.onEnd(a.key);
  };
  render() {
    const { alerts } = this.state;
    const children = alerts.map(a => {
      return <Notice {...a} onEnd={() => this.onEnd(a.key)} />;
    });
    return (
      <Animate transitionAppear transitionName="move-up" component="div">
        {children}
      </Animate>
    );
  }
}

const alertGroup = new Map();
export function loading(content, time, type, target = document.body) {
  let group = alertGroup.get(target);
  let cancel = () => {};
  const add = group =>
    group.addAlert({
      content,
      time,
      type
    });
  if (!group) {
    const div = document.createElement('div');
    div.setAttribute('class', `${config.prefixCls}message-group`);
    // body容器下 默认为fix
    if (target === document.body) {
      div.style.position = 'fixed';
    }
    target.appendChild(div);
    const ref = createRef();
    ReactDOM.render(<AlertGroup ref={ref} />, div, () => {
      group = ref.current;
      alertGroup.set(target, group);
      cancel = add(group);
    });
  } else {
    cancel = add(group);
  }
  return cancel;
}

const globalGroup = new Map();
export function loadingGloabl(content, time, type, target = document.body) {
  let group = globalGroup.get(target);
  let cancel = () => {};
  const add = group =>
    group.addAlert({
      content,
      time,
      type
    });
  if (!group) {
    const div = document.createElement('div');
    target.appendChild(div);
    const ref = createRef();
    ReactDOM.render(<AlertGroup ref={ref} />, div, () => {
      group = ref.current;
      globalGroup.set(target, group);
      cancel = add(group);
    });
  } else {
    cancel = add(group);
  }
  return cancel;
}
