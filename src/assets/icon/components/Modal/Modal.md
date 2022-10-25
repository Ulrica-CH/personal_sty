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
        <Button onClick={this.showModal.bind(this)} type="secondary">
          点我显示{size}Modal
        </Button>
        <Modal
          appElement={document.querySelector('#app')}
          isOpen={showModal}
          title="测试Modal"
          size={size}
          handleEnsure={this.closeModal.bind(this)}
          handleCancel={this.closeModal.bind(this)}
          btnCancelTxt="关闭"
          btnEnsureTxt="上传"
        >
          <div>这是Modal里面的内容</div>
        </Modal>
      </div>
    );
  }
}
<BaseModal />;
```

#### 自定义底部按钮

- 通过 footer 自定义底部内容和事件
- 不想要 footer footer 传一个空节点

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
        <Modal
          appElement={document.querySelector('#app')}
          isOpen={showModal}
          title="测试Modal"
          footer={this.renderFooter()}
          handleCancel={this.closeModal.bind(this)}
        >
          <div>这是Modal里面的内容</div>
        </Modal>
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
        <Modal
          appElement={document.querySelector('#app')}
          isOpen={showModal2}
          title="测试Modal"
          footer={<div></div>}
          handleCancel={() =>
            this.setState({
              showModal2: false
            })
          }
        >
          <div>这是Modal里面的内容</div>
        </Modal>
      </div>
    );
  }
}
<BaseModal />;
```

#### 全局提示

```js
import Button from '../Button';
// import Modal from '../index';
<div>
  <Button className="mgr20" onClick={() => Modal.alert('测试！！！！')}>
    alert
  </Button>
  <Button
    className="mgr20"
    onClick={() =>
      Modal.confirm('测试！！！！', {
        title: '标题',
        ensureTxt: '哦了',
        cancelTxt: '不能'
      })
        .then(() => {
          alert('哦了！！');
        })
        .catch(() => {
          alert('呸！');
        })
    }
  >
    confirm
  </Button>
  <Button className="mgr20" onClick={() => Modal.success('成功')}>
    success
  </Button>
  <Button className="mgr20" onClick={() => Modal.error('失败')}>
    error
  </Button>
  <Button className="mgr20" onClick={() => Modal.warning('警告')}>
    warning
  </Button>
  <Button
    className="mgr20"
    onClick={() =>
      Modal.alert('自定义内容', {
        titleIcon: 'error',
        bodyIcon: 'list'
      })
    }
  >
    自定义titleIcon, BodyIcon
  </Button>
  <Button
    className="mgr20"
    onClick={() =>
      Modal.alert('高度贴顶', {
        top: 20
      })
    }
  >
    自定义高度
  </Button>
</div>;
```

#### 特殊的全局提示

- 可以通过 prompt 方法，获取弹框的输入，输入类型可以是任意
- 支持校验
- 支持异步校验和 loading

```jsx
import Form from '../Form';
import Button from '../Button';
const { Collector } = Form;

const collector = new Collector();
const testNameOk = value =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value >= 50) {
        Message.error('必须小于50');
        reject(false);
      }
      resolve(true);
    }, 2000);
  });
<div>
  <Button
    onClick={() =>
      Modal.prompt(({ setValue }) => (
        <div>
          请输入需要填入的值
          <Input onChange={setValue} />
        </div>
      )).then(value => console.log(value))
    }
  >
    prompt
  </Button>

  <p>可以配合FormItem,合Collector进行验证</p>
  <Button
    onClick={() =>
      Modal.prompt(
        ({ setValue }) => (
          <div>
            可以配合FormItem,合Collector进行验证
            <FormItem
              onChange={setValue}
              validators={[
                {
                  fn(value) {
                    return value < 50;
                  },
                  msg: '值必须小于50'
                }
              ]}
              collector={collector}
            >
              <Input />
            </FormItem>
          </div>
        ),
        {
          validate: v => {
            return collector.validate();
          }
        }
      ).then(value => console.log(value))
    }
  >
    prompt带验证
  </Button>
  <p>可以进行异步验证，请求等。自带loading状态</p>
  <Button
    onClick={() =>
      Modal.prompt(
        ({ setValue }) => (
          <div>
            请输入需要填入的值，值必须小于50
            <Input onChange={setValue} />
          </div>
        ),
        {
          validate: testNameOk
        }
      ).then(value => console.log(value))
    }
  >
    prompt带异步请求
  </Button>
</div>;
```

#### Modal 也支持上述的参数

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
        <Button onClick={this.showModal.bind(this)} type="secondary">
          自定义一系列
        </Button>
        <Modal
          isOpen={showModal}
          title="测试Modal"
          titleIcon={<Icon type="list" fill="white" />}
          bodyIcon={<Icon type="list" fill="black" />}
          handleCancel={this.closeModal.bind(this)}
        >
          这是Modal里面的内容
        </Modal>
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
        <Button onClick={this.showModal.bind(this)} type="secondary">
          loading状态的Modal
        </Button>
        <Modal
          isOpen={showModal}
          title="正在提交"
          loading
          minHeight={300}
          handleCancel={this.closeModal.bind(this)}
        >
          这是Modal里面的内容
        </Modal>
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
