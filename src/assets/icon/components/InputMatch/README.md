<!--
 * @LastEditTime: 2021-09-27 17:24:28
 * @LastEditors: jinxiaojian
-->
#### 基本使用

```js


const options = [
  {
    label: '192.111.222.333',
    value: 'aaa'
  },
  {
    label: "例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子 例子",
    value: 'bbb'
  },
  {
    label: 'threat.name',
    value: 'ccc'
  },
  {
    label: 'example example example example example example example example example example example example example example example example example ',
    value: 'ddd'
  }
];



<div className="">
  <InputMatch
    key={'input'}
    title={'输入'}
    value={[]}
    name={'input box'}
    // type={'fuzzy'}
    // canDelete={true}
    onChange={console.log}
  />

  <InputMatch
    key={'select'}
    title={'选择'}
    value={[]}
    name={'select box'}
    // type={'fuzzy'}
    onChange={console.log}
    select
    selectOption={options}
  />
</div>


```

