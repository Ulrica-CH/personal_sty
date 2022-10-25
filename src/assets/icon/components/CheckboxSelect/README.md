#### 基本使用

```js
const listItems = [
  {
    label: "修改密码",
    value: "editedite",
  },
  {
    label: "删除",
    value: "delete",
  },
  {
    label: "不删除",
    value: "dddddddddddddd",
  },
];

<CheckboxSelect
  defaultValue={["delete"]}
  onChange={console.log}
  title="事件类型"
  options={listItems}
  className="mgb20"
/>;
```

#### 筛选 listItems

```js
const listItems = [
  {
    label: "修改密码",
    value: "editedite",
  },
  {
    label: "删除",
    value: "delete",
  },
  {
    label: "不删除",
    value: "dddddddddddddd",
  },
];

<CheckboxSelect
  withSearch
  defaultValue={["delete"]}
  onChange={console.log}
  title="事件类型"
  options={listItems}
  className="mgb20"
/>;
```

#### 筛选 listItems

- mini 控制小类型
- 可不输入 title
- sortable 控制已选择的选项在最上面
- getValueString 格式化选中的描述

```js
const listItems = [
  {
    label: "修改密码",
    value: "editedite",
  },
  {
    label: "删除",
    value: "delete",
  },
  {
    label: "不删除",
    value: "dddddddddddddd",
  },
];

<CheckboxSelect
  withSearch
  mini
  sortable
  getValueString={(value, options) => {
    if (value.length < 1) return "全部业务组";

    return options
      .filter((option) => value.includes(option.value))
      .map((item) => item.label)
      .join();
  }}
  defaultValue={["delete"]}
  onChange={console.log}
  options={listItems}
  className="mgb20"
/>;
```
#### 块状展示 labelTip

```js
const listItems = [
  {
    label: "修改密码",
    value: "editedite",
  },
  {
    label: "删除",
    value: "delete",
  },
  {
    label: "不删除",
    value: "dddddddddddddd",
  },
];

<CheckboxSelect
  className="mgb10"
  defaultValue={["delete"]}
  options={listItems}
  onChange={console.log}
  onOk={console.log}
  withFooter
  labelTip
  maxDropWidth={500}
  inline
/>
```
#### 滚动加载 scrollLoad
```js
const getOptions = () => {
    const res = [];
    for (let i = 0; i < 433; i++) {
      res.push({
        label: 'label' + i,
        value: i
      });
    }
    return res;
  }
const options = getOptions()

<CheckboxSelect
  className="mgb10"
  sortable
  scrollLoad
  searchLower={true}
  defaultValue={[156, 432]}
  options={options}
  onChange={console.log}
  title="进程/文件路径："
  withFooter
  onDelete={() => {}}
  isLink
/>
```