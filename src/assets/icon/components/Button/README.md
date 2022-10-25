<!--
 * @LastEditTime: 2021-02-23 14:34:47
 * @LastEditors: jinxiaojian
-->

#### 基本使用

```js
const handleClick = () => {
  alert(1);
};
<Button onClick={handleClick}>点我</Button>;
```

#### 样式展示

```js
// const Icon = require('../Icon').default;
import Icon from '../Icon';
<div>
  <div className="row">
    <div className="col-2">
      <Button className="mgr20" type="primary">
        深色按钮 primary
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="gray">
        灰色按钮 gray
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="danger">
        红色按钮 danger
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="white">
        线框按钮 white
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="text">
        字体块按钮 text
      </Button>
    </div>
  </div>
  <p>带图标</p>
  <div className="row">
    <div className="col-2">
      <Button className="mgr20" type="primary">
        <Icon type="tip" />
        primary
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="gray">
        <Icon type="tip" />
        gray
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="danger">
        <Icon type="tip" />
        danger
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="white">
        <Icon type="tip" />
        white
      </Button>
    </div>
    <div className="col-2">
      <Button className="mgr20" type="text">
        <Icon type="tip" />
        text
      </Button>
    </div>
  </div>
  <div className="row">
    <Button width="200">设置了宽度</Button>
  </div>
  <div className="row">
    <Button loading>loading状态</Button>
    <Button className="mgl20">
      <Icon type="success" />
      带图标
    </Button>
  </div>
  <p>老按钮</p>
  <Button className="mgr20" type="return">
    return
  </Button>
  <Button className="mgr20" type="secondary">
    secondary
  </Button>
  <Button className="mgr20" type="reset">
    reset
  </Button>
  <Button className="mgr20" type="link">
    link
  </Button>
  <Button className="mgr20" type="dark">
    dark
  </Button>
</div>;
```

#### 波纹

```js
<div>
  <Button waveClassName="mgr20" hasWave>
    默认
  </Button>
  <Button waveClassName="mgr20" hasWave width="200">
    默认设宽
  </Button>
  <Button waveClassName="mgr20" hasWave type="dark">
    深色
  </Button>
  <Button waveClassName="mgr20" hasWave type="white">
    浅色
  </Button>
  <Button waveClassName="mgr20" hasWave type="text">
    文字
  </Button>
</div>
```

#### mini

```js
<div>
  <Button className="mgr20 mgb10" mini>
    默认按钮
  </Button>
  <Button className="mgr20" type="primary" mini>
    primary
  </Button>
  <Button className="mgr20" type="return" mini>
    return
  </Button>
  <Button className="mgr20" type="secondary" mini>
    secondary
  </Button>
  <Button className="mgr20" type="reset" mini>
    reset
  </Button>
  <Button className="mgr20" type="link" mini>
    link
  </Button>
  <Button className="mgr20" type="text" mini>
    text
  </Button>
  <Button className="mgr20" type="white" mini>
    white
  </Button>
  <Button className="mgr20" type="dark" mini>
    dark
  </Button>
  <Button className="mgr20" type="danger" mini>
    danger
  </Button>
  <Button width="200" mini>
    设置了宽度
  </Button>
</div>
```
