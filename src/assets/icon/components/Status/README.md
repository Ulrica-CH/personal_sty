<!--
 * @LastEditTime: 2021-04-28 17:09:57
 * @LastEditors: jinxiaojian
-->

#### 基本使用

```js
<div className="row">
  <div className="col-1">
    <Status className="mgt10" type="event" value="0"></Status>
    <Status className="mgt10" type="event" value="1"></Status>
    <Status className="mgt10" type="event" value="2"></Status>
    <Status className="mgt10" type="event" value="3"></Status>
  </div>
  <div className="col-1">
    <Status className="mgt10" type="event" mini value="0"></Status>
    <Status className="mgt10" type="event" mini value="1"></Status>
    <Status className="mgt10" type="event" mini value="2"></Status>
    <Status className="mgt10" type="event" mini value="3"></Status>
  </div>
  <div className="col-1">
    <Status className="mgt10" type="threat" value="0"></Status>
    <Status className="mgt10" type="threat" value="1"></Status>
    <Status className="mgt10" type="threat" value="2"></Status>
    <Status className="mgt10" type="threat" value="3"></Status>
    <Status className="mgt10" type="threat" value="4"></Status>
  </div>
  <div className="col-1">
    <Status
      className="mgt10"
      type="threat"
      mini
      labelHasColor
      value="0"
    ></Status>
    <Status
      className="mgt10"
      type="threat"
      mini
      labelHasColor
      value="1"
    ></Status>
    <Status
      className="mgt10"
      type="threat"
      mini
      labelHasColor
      value="2"
    ></Status>
    <Status
      className="mgt10"
      type="threat"
      mini
      labelHasColor
      value="3"
    ></Status>
    <Status
      className="mgt10"
      type="threat"
      mini
      labelHasColor
      value="4"
    ></Status>
  </div>
  <div className="col-1">
    <Status className="mgt10" type="host" value="0" column></Status>
    <Status className="mgt10" type="host" value="1" column></Status>
    <Status className="mgt10" type="host" value="2" column></Status>
    <Status className="mgt10" type="host" value="3" column></Status>
    <Status className="mgt10" type="host" value="4" column></Status>
  </div>
</div>
```
