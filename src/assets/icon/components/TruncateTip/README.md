<!--
 * @LastEditTime: 2021-05-30 22:34:09
 * @LastEditors: jinxiaojian
-->

#### 基本用法

```js
const list = ['11111', '4444', '5555555555', '2222', '3333333333'];
<div style={{ width: '10vw' }}>
  <TruncateTip list={list}></TruncateTip>
</div>;
```

#### 丰富的内容自定义方式

```js
import Label from '../Label';
const list = ['11111', '4444', '5555555555', '2222', '3333333333'];
<div>
  <div style={{ width: '10vw' }}>
    <TruncateTip
      list={list}
      ItemRender={props => (
        <div className="colorBlack2 pd1 mgr5">{props.item}</div>
      )}
    ></TruncateTip>
  </div>
  <div style={{ width: '10vw' }}>
    <TruncateTip
      list={list}
      ItemRender={props => <Label>{props.item}</Label>}
    ></TruncateTip>
  </div>
</div>;
```
