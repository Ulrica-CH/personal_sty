#### 基本使用

默认使用 antd 的 DatePicker 组件，可以通过 setConfig 来进行替换

```text
安装tbfe-time-picker组件
yarn add tbfe-time-picker

引入组件及对应样式，通过setConfig进行配置
import { SemiRangePicker } from 'tbfe-time-picker';
require('tbfe-time-picker/build/static/css/index.css');

setConfig({
  setRangePicker: () => SemiRangePicker
});

可在项目中对主题颜色进行覆盖，与tbfe-ui覆盖方式一致
index.js
  require('tbfe-time-picker/es/styles/compact');
global.scss
  $color:red;
  @import "tbfe-time-picker/es/styles/compact.scss";

```

```jsx
import React from 'react';
import { SemiRangePicker } from 'tbfe-time-picker';
import { DatePicker } from 'antd';
import 'tbfe-time-picker/es/styles/index';
<div>
  TbfeRangePicker
  <div className="mgb20">
    <RangePicker
      defaultValue="today"
      onChange={console.log}
      onOk={val => {
        console.log('onOk', val);
      }}
      format="YYYY/MM/DD HH:mm"
    />
  </div>
  <div className="mgb20">
    <RangePicker
      showTime={false}
      defaultValue="today"
      onChange={console.log}
      onOk={val => {
        console.log('onOk', val);
      }}
      format="YYYY/MM/DD HH:mm"
    />
  </div>
  <div className="mgb20">
    <RangePicker
      mini
      defaultValue="today"
      onChange={console.log}
      onOk={val => {
        console.log('onOk', val);
      }}
      format="YYYY/MM/DD HH:mm"
    />
  </div>
  SemiRangePicker
  <div className="mgb20">
    <SemiRangePicker
      defaultValue="today"
      onChange={() => console.log(222)}
      onOk={() => {
        console.log(111);
      }}
    />
  </div>
  <div className="mgb20">
    <SemiRangePicker
      defaultValue="today"
      onChange={() => console.log(222)}
      onOk={() => {
        console.log(111);
      }}
      showTime={false}
    />
  </div>
  AntdRangePicker
  <div>
    <DatePicker.RangePicker />
  </div>
</div>;
```
