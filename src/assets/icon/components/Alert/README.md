#### 基本使用

```js
<div>
  <Alert
    className="mgb20"
    message="这是个消息"
    description="22222"
    type="success"
  />
  <Alert
    className="mgb20"
    message="这是个消息"
    description="333"
    type="error"
  />
  <Alert className="mgb20" message="这是个消息" type="warning" />
  <Alert className="mgb20" message="这是个消息" type="info" />
</div>
```

#### mini 属性

```js
<div>
  <Alert className="mgb20" message="这是个消息" type="success" mini />
</div>
```

#### 关闭按钮

```js
<div>
  <Alert
    className="mgb20"
    message="这是个消息"
    type="success"
    closable={true}
    onClose={() => console.log('我关闭alert了')}
  />
</div>
```

#### icon 自定义图标

将替换为传入的 Icon 图标，在 showIcon 为 true 时显示

```js
import Icon from '../Icon';
<div>
  <Alert
    className="mgb20"
    message="这是个消息"
    type="success"
    closable={true}
    icon={<Icon type="watch" fill="blue" />}
  />
</div>;
```

#### 不显示图标

```js
<div>
  <Alert
    className="mgb20"
    message="这是个消息"
    type="success"
    showIcon={false}
  />
</div>
```

#### 不显示边框

```js
<div>
  <Alert
    className="mgb20"
    message="这是个消息"
    type="info"
    showBorder={false}
  />
</div>
```

#### changLog 3.0

- 增加 mini 属性
- 增加 closable 属性，用于关闭 alter
- 增加 icon，自定义图标，如果没有自定义，则按照 type 的类型显示默认图标
- 增加 onClose 关闭之后的调用函数
- 增加 showIcon 属性，用于是否显示图标
- 增加 showBorder 属性，用于是否显示边框
- 增加 type = 'info' 类型
- 删除 description 属性
