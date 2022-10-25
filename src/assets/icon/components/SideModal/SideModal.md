#### 基本使用

- btnCancelTxt/btnEnsureTxt 可以设置底部的按钮的文字
- size 可以设置大小

```jsx
import Button from '../Button';
import Radio from '../Radio';
const { RadioButton } = Radio;
class BaseModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      size: 'mini'
    };
  }
  showModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  render() {
    const { showModal, size } = this.state;
    return (
      <div>
        <div className="row mgb20">
          <RadioButton
            options={[
              {
                label: '小',
                value: 'mini'
              },
              {
                label: '中',
                value: 'normal'
              },
              {
                label: '大',
                value: 'large'
              }
            ]}
            defaultValue={size}
            onChange={size =>
              this.setState({
                size
              })
            }
            className="mgb20"
          />
        </div>
        <Button onClick={this.showModal.bind(this)} type="primary">
          点我显示{size}Modal
        </Button>
        <SideModal
          appElement={document.querySelector('#app')}
          isOpen={showModal}
          title="测试Modal"
          size={size}
          handleEnsure={this.closeModal.bind(this)}
          handleCancel={this.closeModal.bind(this)}
          btnCancelTxt="关闭"
          btnEnsureTxt="上传"
          contentLabel="TestModal"
        >
          <div>这是Modal里面的内容</div>
        </SideModal>
      </div>
    );
  }
}
<BaseModal />;
```

#### 自定义底部按钮

- 通过 footer 自定义底部内容和事件
- 不想要 footer footer 传 false

```js
import Button from '../Button';
class BaseModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showModal2: false
    };
  }
  showModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  renderFooter() {
    return <Button onClick={this.closeModal.bind(this)}>确定</Button>;
  }
  render() {
    const { showModal, showModal2 } = this.state;
    return (
      <div className="row mgb20">
        <Button onClick={this.showModal.bind(this)} type="secondary">
          只有一个按钮的Modal
        </Button>
        <SideModal
          appElement={document.querySelector('#app')}
          isOpen={showModal}
          title="测试Modal"
          footer={this.renderFooter()}
          handleCancel={this.closeModal.bind(this)}
        >
          <div>这是Modal里面的内容</div>
        </SideModal>
        <Button
          onClick={() =>
            this.setState({
              showModal2: true
            })
          }
          type="secondary"
        >
          没有按钮的Modal
        </Button>
        <SideModal
          appElement={document.querySelector('#app')}
          isOpen={showModal2}
          title="测试Modal"
          footer={false}
          handleCancel={() =>
            this.setState({
              showModal2: false
            })
          }
        >
          <div>这是Modal里面的内容</div>
        </SideModal>
      </div>
    );
  }
}
<BaseModal />;
```

#### 通过 loading, 配合 Form 在提交时展示遮罩

```js
import Button from '../Button';
import Icon from '../Icon';
class BaseModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }
  showModal() {
    this.setState({
      showModal: true
    });
  }
  closeModal() {
    this.setState({
      showModal: false
    });
  }
  render() {
    const { showModal } = this.state;
    return (
      <div className="row mgb20">
        <Button onClick={this.showModal.bind(this)} type="primary">
          loading状态的Modal
        </Button>
        <SideModal
          isOpen={showModal}
          title="正在提交"
          loading
          minHeight={300}
          handleCancel={this.closeModal.bind(this)}
        >
          这是Modal里面的内容
        </SideModal>
      </div>
    );
  }
}
<BaseModal />;
```

#### changLog

- 增加默认的 modal 样式，如果没有传入 className 则默认使用 modal-content 的样式
- 修改 getResultStyle 当 isOpen 为 false 的时候，返回{}, 2018-7-16

#### changLog 3.0

- 增加 Modal.success/error/warning 方法，自带图标
- 增加 titleIcon，和 bodyIcon 设置,Modal.alert 和 Modal.confirm 方法都支持配置传入
- 支持可以传入 top，配置模态框距顶部距离,Modal.\*的方法都支持配置
- 支持传入 minHeight，控制内容的最小高度，以保证美观。Modal.\*的方法都支持配置
