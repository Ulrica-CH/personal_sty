#### 基本使用

最基本的单选，打开控制台看输出的值

```js
const options = [
  {
    label: '111',
    value: 1
  },
  {
    label: '1234132412342314',
    value: 2
  },
  {
    label: 'adfsa',
    value: 3
  }
];

<div>
  <p>单选</p>
  <div className="row">
    <div className="col-6">
      <Select
        style={{ width: 200 }}
        onChange={console.log}
        options={options}
        inline={true}
      />
    </div>
  </div>
  <p>多选</p>
  <div className="row">
    <div className="col-6 mgb20">
      <Select onChange={console.log} options={options} multi />
    </div>
  </div>
</div>;
```

#### 各种状态

禁用状态和错误状态

```js
const options = [
  {
    label: '111',
    value: '111'
  },
  {
    label: '222',
    value: '222'
  },
  {
    label: '333',
    value: '333'
  }
];

<div className="row">
  <div className="col-6 mgb20">
    <Select onChange={console.log} options={options} hasError />
  </div>
  <div className="col-6 mgb20">
    <Select onChange={console.log} options={options} disabled />
  </div>
</div>;
```

#### 默认值

为组件设置默认值

```js
const options = [
  {
    label: '111',
    value: 1
  },
  {
    label: '1234132412342314',
    value: 2
  },

  {
    label: 'adfsa',
    value: 3
  },

  {
    label: '111111111111111111111111111111111111111111112',
    value: 4
  },
  {
    label: '例子5',
    value: 5
  },
  {
    label: '例子6例子例子例子例子例子',
    value: 6
  },
  {
    label: '例子7例子例子例子例子例子',
    value: 7
  },
  {
    label: '例子8例子例子例子例子例子',
    value: 8
  },
  {
    label: '例子9例子例子例子例子例子',
    value: 9
  }
];

<div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        className="mgb10"
        defaultValue={5}
        options={options}
        onChange={console.log}
      />
    </div>
  </div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        className="mgb10"
        defaultValue={[1, 2]}
        options={options}
        onChange={console.log}
        multi
      />
    </div>
  </div>
</div>;
```

#### 多选时的标签化

在多选时可以选择 itemLabelType 或者传入结构 ItemRender

```js
import Label from '../Label';
const options = [
  {
    label: '111',
    value: 1
  },
  {
    label: '1234132412342314',
    value: 2
  },

  {
    label: 'adfsa',
    value: 3
  },

  {
    label: '111111111111111111111111111111111111111111112',
    value: 4
  },
  {
    label: '例子5',
    value: 5
  },
  {
    label: '例子6例子例子例子例子例子',
    value: 6
  },
  {
    label: '例子7例子例子例子例子例子',
    value: 7
  },
  {
    label: '例子8例子例子例子例子例子',
    value: 8
  },
  {
    label: '例子9例子例子例子例子例子',
    value: 9
  }
];
<div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        className="mgb10"
        defaultValue={[1, 2]}
        options={options}
        onChange={console.log}
        multi
        itemLabelType="success"
      />
    </div>
  </div>
  <div className="row">
    <div className="col-6 mgb20">
      <Select
        className="mgb10"
        defaultValue={[1, 2]}
        options={options}
        onChange={console.log}
        multi
        ItemRender={({ item, value = {}, valueColor, onRemove, disabled }) => (
          <Label className="mgr5">
            <div className="flexBetween">
              {item.label || item.value}
              <div
                className="mgl5"
                data-delete='true'
              >
                ×
              </div>
            </div>
          </Label>
        )}
      />
    </div>
  </div>
</div>;
```


#### 选项分组

可以传入group参数开启选项分组(option中需要group参数)
可以使用默认的样式与结构,也可以传入groupRender进行自定义,groupRender有两个参数group组名index序号

```js
const optionsGroup = [
  {
    label: '111',
    value: 1,
    group: 'edr1'
  },
  {
    label: '1234132412342314',
    value: 2,
    group: 'edr1'

  },
  {
    label: 'adfsa',
    value: 3,
    group: 'threat0'
  },

  {
    label: '111111111111111111111111111111111111111111112',
    value: 4,
    group: 'threat0'
  },
  {
    label: '例子5',
    value: 5,
    group: 'threat0'
  },
  {
    label: '例子6例子例子例子例子例子',
    value: 6,
    group: 'threat0'
  },
  {
    label: '例子7例子例子例子例子例子',
    value: 7,
    group: '组5'
  },
  {
    label: '例子8例子例子例子例子例子',
    value: 8,
    group: '组2'
  },
  {
    label: '例子9例子例子例子例子例子',
    value: 9,
    group: 'edr1'
  }
];

<Select
  className="mgb10"
  defaultValue={[]}
  onChange={console.log}
  itemLabelType="success"
  options={optionsGroup}
  group
  groupRender={(group, index) => (
    <div key={'group' + index} style={{ marginTop: index ? '10px' : 0, paddingTop: '5px', borderTop: index ? '1px solid #eee' : 0 }}>
      <div style={{ marginLeft: '15px', fontWeight: 'bold' }}>
        {group}
      </div>
    </div>
  )}
  multi
/>


```


#### changelog

2022-02-10
1. 加入group,可进行选项分组

2021-11-22

1. 预定废除 itemLabelType(string) 改为 itemLable(boolean)
2. 对自定义ItemRender中的X选项 删除传入onRemove的不方便方式 改为 使用标签中的data-delete='true'进行判断
3. 加入editable选项,使得选择框可以加入输入的新选项

2020-09-27

1. 对样式进行精细校对

2020-10-20

1. 新增 virtualList 参数，是否支持虚拟列表可选择，避免下拉闪烁
