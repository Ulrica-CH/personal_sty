#### 基本使用

```js
import Button from '../Button';

<div>
  <Popover content="这是内容这是内容这是内容">
    <Button>Popover</Button>
  </Popover>
  <Popover content="这是不带箭头的内容" withArrow={false}>
    <Button>Popover with no arrow</Button>
  </Popover>
  <Popover content="这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容">
    <Button>控制内容的最大宽高</Button>
  </Popover>
</div>;
```

#### 控制触发方式

```js
// import { TRIGGER } from '@common/lib'
import Button from '../Button';

<Popover content="这是内容这是内容这是内容" trigger="click">
  <Button>Popover</Button>
</Popover>;
```

#### 控制位置

```js
// import { POSITION } from '@common/lib'
import Button from '../Button';

<div>
  <div className="mgb20">
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="topLeft"
    >
      <Button>topLeft</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="top"
    >
      <Button>top</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="topRight"
    >
      <Button>topRight</Button>
    </Popover>
  </div>
  <div className="mgb20">
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="rightTop"
    >
      <Button>rightTop</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="right"
    >
      <Button>right</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="rightBottom"
    >
      <Button>rightBottom</Button>
    </Popover>
  </div>
  <div className="mgb20">
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="bottomLeft"
    >
      <Button>bottomLeft</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="bottom"
    >
      <Button>bottom</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="bottomRight"
    >
      <Button>bottomRight</Button>
    </Popover>
  </div>
  <div className="mgb20">
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="leftTop"
    >
      <Button>leftTop</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="left"
    >
      <Button>left</Button>
    </Popover>
    <Popover
      content="这是内容这是内容这是内容"
      className="mgr20"
      position="leftBottom"
    >
      <Button>leftBottom</Button>
    </Popover>
  </div>
</div>;
```

#### changelog

- 添加 withArrow 可配是否带按钮
- 添加其他可选属性说明
