#### 基本使用

```js
import Icon from '../Icon';
import Button from '../Button';
<div>
  <Button
    className="mgr10"
    onClick={() => Message.warning('这是一个warning提示')}
  >
    warning
  </Button>
  <Button
    className="mgr10"
    onClick={() => Message.success('这是一个success提示')}
  >
    success
  </Button>
  <Button className="mgr10" onClick={() => Message.error('这是一个error提示')}>
    error
  </Button>
  <Button
    className="mgr10"
    onClick={() => Message.loading('这是一个loading提示')}
  >
    loading
  </Button>
  <div>自定义图标</div>
  <Button
    className="mgr10"
    onClick={() =>
      Message.alert(
        '这是自定义图标提示这是自定义图标提示这是自定义图标提示这是自定义图标提示这是自定义图标提示这是自定义图标提示',
        <Icon type="tip" fill="yellow" className="mgb20" />,
        1000
      )
    }
  >
    自定义图标
  </Button>
</div>;
```

#### 修改提示时间

- 默认关闭时间 3 秒
- 错误提示默认关闭时间 8 秒
- 可接受回调主动控制提示关闭

```js
import Button from '../Button';
let close = () => {};

<div>
  <Button
    className="mgr10"
    onClick={() => Message.warning('这是一个warning提示', 1000)}
  >
    1秒关闭
  </Button>
  <Button
    className="mgr10"
    onClick={() => {
      close = Message.warning('这是一个warning提示这是一个warning提示', 0);
    }}
  >
    提示
  </Button>
  <Button
    className="mgr10"
    onClick={() => {
      close();
    }}
  >
    关闭提示
  </Button>
</div>;
```

#### 修改提示位置

- 默认全局提示，可修改提示的容器

```js
import Button from '../Button';
<div>
  <Button
    className="mgr10"
    onClick={() =>
      Message.warning(
        '这是一个warning提示',
        3000,
        document.querySelector('.rsg--sidebar-4')
      )
    }
  >
    以sidebar为容器
  </Button>
</div>;
```
