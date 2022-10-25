#### 基本使用

```js
import Button from '../Button';
<div>
  <Tooltip content="这是内容这是内容这是内容">
    <Button>Tooltip</Button>
  </Tooltip>
  <Tooltip content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容">
    <Button>控制内容的最大宽高</Button>
  </Tooltip>
</div>;
```

#### 控制触发方式

```js
import Button from '../Button';

<Tooltip content="这是内容这是内容这是内容" trigger="click">
  <Button>点击触发</Button>
</Tooltip>;
```

#### 控制位置

```js
import Button from '../Button';

<div>
  <div className="mgb20">
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="topLeft"
    >
      <Button>topLeft</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="top"
    >
      <Button>top</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="topRight"
    >
      <Button>topRight</Button>
    </Tooltip>
  </div>
  <div className="mgb20">
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="rightTop"
    >
      <Button>rightTop</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="right"
    >
      <Button>right</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="rightBottom"
    >
      <Button>rightBottom</Button>
    </Tooltip>
  </div>
  <div className="mgb20">
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="bottomLeft"
    >
      <Button>bottomLeft</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="bottom"
    >
      <Button>bottom</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="bottomRight"
    >
      <Button>bottomRight</Button>
    </Tooltip>
  </div>
  <div className="mgb20">
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="leftTop"
    >
      <Button>leftTop</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="left"
    >
      <Button>left</Button>
    </Tooltip>
    <Tooltip
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="leftBottom"
    >
      <Button>leftBottom</Button>
    </Tooltip>
  </div>
</div>;
```

#### changelog

- 添加 withArrow 可配是否带按钮
- 添加其他可选属性说明
