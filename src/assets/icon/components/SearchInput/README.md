<!--
 * @LastEditTime: 2020-06-18 15:05:08
 * @LastEditors: jinxiaojian
-->

#### changelog

- 添加了 mini 状态下 withButton 属性，可以显示按钮
- 添加了 inputWidth 属性，可以直接设置输入框宽度
- 添加了 background 属性，可以控制 input 输入框带背景
- 添加了 buttonType 属性，可以控制搜索按钮的 type

#### 基本使用

最基本的输入框

```js
<SearchInput
  onChange={console.log}
  onSearch={result => {
    console.log('search result:', result);
  }}
/>
```

定制化

```js
<SearchInput
  onChange={console.log}
  onSearch={() => {
    console.log('search');
  }}
  mini={true}
  clearable={false}
  background
/>
<SearchInput
  onChange={console.log}
  onSearch={() => {
    console.log('search');
  }}
  mini={true}
  withButton
/>
```

其他定制项

```js
import Button from '../Button';
<SearchInput
  defaultValue="123"
  placeholder="search"
  addon={<Button onClick={console.log}>来玩呀</Button>}
  onChange={console.log}
  onSearch={() => {
    console.log('search');
  }}
/>;
```
