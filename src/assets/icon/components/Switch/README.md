#### 基本使用

```js
<Switch onChange={console.log} defaultValue={false} />

禁用态
<Switch onChange={console.log} defaultValue={false} disabled/>
<Switch onChange={console.log} defaultValue={true} disabled/>
```

可 title 属性的更改文字

```js
const defaultMap = [
  {
    label: '错',
    value: false
  },
  {
    label: '对',
    value: true
  }
];

<Switch itemMap={defaultMap} onChange={console.log} />;
```

#### changelog 3.0

- itemMap 属性中的文案放在 title 中划入展示
