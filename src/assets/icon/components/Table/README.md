### columns 中每一列的属性说明

- title // Any 标题
- width // Number 列的宽度，理论来说，每列都应该标注宽度，用于自适应等比缩放
- align // String.of(['left', 'right', 'center']) 对齐方式
- key // String 针对 data 的 getter
- render // Function 每列的渲染方法
- sortable // Boolean 此列是否可排序
- style = {} // Object 为整列追加样式
- className // String 为整列追加 className
- titleClassName, // String 可以单独为 title 定义 className
- search, // Boolean, true 时自带搜索的 Input 筛选控件
- onSearch, // Input 筛选控件输入回调
- filter, // Array 筛选的 options，有时则自带搜索的 Select 控件
- multi, // Boolean Select 控件是否为多选
- onFilterChange, // Select 控件回调
- placeholder = '搜索相关内容', // String 可自定义搜索 placeholder
- searchComp // Any 自定义的搜索控件
- limit // Boolean 当设置为 true 时，超出自动...
- colSpanFn
- rowSpanFn
- emptyLabel // Any 列为空时，自定义为空时的展示

### 针对 render 函数的参数说明

render (columnData, rowData, others)

- columnData 根据 key 属性获取的列的 data
- rowData 整行的 rowData
- others 其他属性
  - rowIndex 行编号
  - columnIndex 列编号
  - expandShow 当前行是否展开
  - checked 当前行是否被选中
  - emptyLabel 回传的数据空的展示
  - selectFooterSticky 批量操作常驻可视区

#### 基本使用

- 最基本的表格
- width 控制宽度
- render 控制自定义渲染
- className 控制列的 class
- align 控制对齐
- limit 设置超出省略号（需控制宽度）
- 操作自带 blue,red 两个 className，带有对应的表现
- emptyLabel 数据为空时的展示，会覆盖 table 的 columnEmptyLabel

```js
import { Fragment } from 'react';
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '3234234232342342次32342342次32342342次次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    },
    width: 200
  },
  {
    key: 'type',
    title: '文字中包含链接',
    render(item, row, { emptyLabel }) {
      if (!item) return emptyLabel;
      return <a>{item}</a>;
    },
    width: 80
  },
  {
    key: 'times',
    title: '3',
    width: 120,
    limit: true,
    sortable: true,
    width: 100
  },
  {
    title: '操作',
    render(item, row) {
      return (
        <Fragment>
          <p>
            <a className="blue">基本操作 blue</a>
          </p>
          <a className="red">谨慎操作 red</a>
        </Fragment>
      );
    },
    width: 80
  }
];
<div>
  浅色模式
  <Table
    className="mgb20"
    sortKey="times"
    sortFlag="desc"
    columns={columns}
    data={tableData}
  />
  深色模式
  <Table
    dark
    className="mgb20"
    background={false}
    columns={columns}
    data={tableData}
  />
  无线框模式
  <Table
    sortKey="times"
    sortFlag="desc"
    className="mgb20"
    border={false}
    striped
    columns={columns}
    data={tableData}
  />
  无线框模式深色
  <Table dark border={false} striped columns={columns} data={tableData} />
</div>;
```

#### ~~~带筛选选项(老版本)~~~

- 需要使用 dark 模式
- 配置 columns 中的 title，并使用 Table.HeaderItem 包裹

```js
import { HeaderItem } from './index.js';
import { Fragment } from 'react';
import Select from '../Select';
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '3234234232342342次32342342次32342342次次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];

const options = [
  {
    label: '已处理',
    value: 1
  },
  {
    label: '未处理',
    value: 0
  }
];
const columns = [
  {
    key: 'labels',
    title: (
      <HeaderItem>
        {({ setFocus }) => {
          return (
            <Fragment>
              处置状态:
              <Select
                style={{ width: 80 }}
                options={options}
                clearable={false}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onChange={val => console.log(val)}
              />
            </Fragment>
          );
        }}
      </HeaderItem>
    ),
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    },
    width: 200
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    },
    width: 80
  },
  {
    key: 'times',
    title: '3',
    width: 120,
    limit: true,
    sortable: true,
    width: 100
  },
  {
    title: '操作',
    render(item, row) {
      return <span>现在还没有操作</span>;
    },
    width: 80
  }
];
<div>
  暗色不带背景
  <Table dark columns={columns} data={tableData} />
</div>;
```

#### 带筛选选项(新版本)

- 通过 column 的 search 和 onSearch 属性来控制

```js
import { HeaderItem } from './index.js';
import { useState, Fragment } from 'react';
import Select from '../Select';
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '3234234232342342次32342342次32342342次次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];

const options = [
  {
    label: '已处理',
    value: 1
  },
  {
    label: '未处理',
    value: 0
  }
];

function TableTest() {
  const [search, setSearch] = useState('默认搜索的值');
  const [filter, setFilter] = useState(0);

  const columns = [
    {
      key: 'labels',
      title: '处置状态',
      search: true,
      onSearch: value => {
        window.alert('开始搜索' + value);
        setSearch(value);
      },
      render(items) {
        return items.map(item => {
          return (
            <label key={item.desc} className="label label-info mgr10">
              {item.desc}
            </label>
          );
        });
      },
      width: 200
    },
    {
      key: 'type',
      title: '2',
      filter: options,
      onFilterChange: value => {
        console.log(value);
        setFilter(value);
      },
      render(item) {
        return <span className="color-error">{item}</span>;
      },
      width: 80
    },
    {
      key: 'times',
      title: '3',
      width: 120,
      limit: true,
      sortable: true,
      width: 100
    },
    {
      title: '操作',
      render(item, row) {
        return <span>现在还没有操作</span>;
      },
      width: 80
    }
  ];
  return (
    <div>
      <Table
        columns={columns}
        className="mgb20"
        defaultSearch={{
          labels: search,
          type: filter
        }}
        data={tableData}
      />
      <Table dark columns={columns} data={tableData} />
    </div>
  );
}
<TableTest />;
```

##### 特殊效果

- 不带边框
- 不带 hover 效果
- 不带头
- 行高 30px

```js
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: 'times',
    title: '3'
  },
  {
    title: '操作',
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
<Table
  columns={columns}
  background={false}
  hover={false}
  border={false}
  showHeader={false}
  lineHeight={30}
  data={tableData}
/>;
```

#### 二级标题

添加二级标题渲染，column 添加 children

```js
import Label from '../Label';
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '3234234232342342次32342342次32342342次次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
const columns = [
  {
    title: '父标题',
    width: 270,
    children: [
      {
        title: '子标题1',
        width: 150,
        key: 'labels',
        render(items) {
          return items.map(item => {
            return (
              <Label className="mgr10" light key={item.desc} type={item.type}>
                {item.desc}
              </Label>
            );
          });
        }
      },
      {
        title: '子标题2',
        width: 120,
        key: 'ip'
      }
    ]
  },
  {
    title: '操作',
    render(item, row, { expandShow }) {
      return <span>{expandShow ? '收起' : '展开'}</span>;
    },
    width: 80
  }
];
<Table columns={columns} data={tableData} />;
```

##### 排序表格

- 配合后端进行排序
- 使用 sortable 控制某字段是否排序
- 需传入当前排序的 sortKey 和当前的顺序 sortFlag
- 排序更改时会自动调用 handleSortChange, 请求后端

```js
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    },
    sortable: true
  },
  {
    key: 'times',
    title: '3',
    sortable: true
  },
  {
    title: '操作',
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
class ExampleTable extends React.Component {
  constructor() {
    this.state = {
      sortKey: 'time',
      sortFlag: 'desc'
    };
  }
  handleSortChange(sortKey, sortFlag) {
    this.setState({
      sortKey,
      sortFlag
    });
  }
  render() {
    const { sortKey, sortFlag } = this.state;
    return (
      <Table
        striped
        columns={columns}
        sortKey={sortKey}
        sortFlag={sortFlag}
        handleSortChange={this.handleSortChange.bind(this)}
        data={tableData}
      />
    );
  }
}
<ExampleTable />;
```

##### 固定头部

- 通过 scrollHeight 设置底部最大高度，表头将自动固定
- 尽量设置每个单元格的宽度，以保证两端对齐

```js
let tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
tableData = tableData.concat(tableData, tableData);

const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    },
    width: 150
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    },
    width: 80
  },
  {
    key: 'times',
    title: '3',
    width: 120
  },
  {
    title: '操作',
    render(item, row, { expandShow }) {
      return <span>{expandShow ? '收起' : '展开'}</span>;
    },
    width: 90
  }
];
const expandRowRender = (row, index) => (
  <div>
    这是扩展的内容
    <p>这是第{index + 1}行的展开内容</p>
    <p>可以各种自定义</p>
  </div>
);
<Table
  columns={columns}
  expandRowRender={expandRowRender}
  defaultRenderExpand
  scrollHeight={250}
  data={tableData}
/>;
```

##### 前端分页

- pageLimit 设置前端分页，每次只添加多少条

```js
let tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
tableData = tableData.concat(tableData, tableData);

const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    },
    width: 150
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    },
    width: 80
  },
  {
    key: 'times',
    title: '3',
    width: 120
  },
  {
    title: '操作',
    render(item, row, { expandShow }) {
      return <span>{expandShow ? '收起' : '展开'}</span>;
    },
    width: 90
  }
];
<Table
  columns={columns}
  pageLimit={6}
  defaultRenderExpand
  scrollHeight={250}
  data={tableData}
/>;
```

##### 可展开

- expandRowRender 设置展开内容
- 带有展开的行会带有 has-expand class
- 在 column 的 render 会回传当前 row 是否展开，用于自定义操作状态
- defaultRenderExpand 设置是否默认展开第一行
- defaultRenderExpandIndex 设置是默认展开表格中的某一行, 取值范围大于等于 0,小于等于数组长度。(如果设置了该值，需要设置 defaultRenderExpand 为 false)
- expandOnly 用于控制是否只同时展开一行

```js
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: 'times',
    title: '3'
  },
  {
    title: '操作',
    render(item, row, { expandShow }) {
      return <span>{expandShow ? '收起' : '展开'}</span>;
    }
  }
];
const expandRowRender = (row, index) => (
  <div>
    这是扩展的内容
    <p>这是第{index + 1}行的展开内容</p>
    <p>可以各种自定义</p>
  </div>
);
<div>
  普通展开
  <Table
    columns={columns}
    className="mgb20"
    expandRowRender={expandRowRender}
    data={tableData}
  />
  默认展开第一行，且同时只能展开一行
  <Table
    columns={columns}
    className="mgb20"
    expandOnly
    expandRowRender={expandRowRender}
    defaultRenderExpand
    data={tableData}
  />
</div>;
```

##### ~~~带有 children 的行~~~

已移除

#### 单选表格

- 通过 clickable 设置每行可点击
- handleRowClick 点击回调
- 不可与展开，子行的表格同时使用

```js
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: 'times',
    title: '3'
  },
  {
    title: '操作',
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
<Table
  columns={columns}
  clickable
  striped
  handleRowClick={console.log}
  data={tableData}
/>;
```

#### 多选表格

- 通过 select 属性设置表格可选择
- handleSelectChanged 点击回调
- canRowSelected 设置哪行可以选中

```js
import { Fragment } from 'react';
import Button from '../Button';
const tableData = [
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  },
  {
    ip: '87.101.12.12',
    labels: [
      {
        type: 'error',
        desc: 'IDC机房'
      },
      {
        type: 'info',
        desc: '辣鸡邮件'
      }
    ],
    type: '阻断',
    times: '32342342次'
  }
];
const columns = [
  {
    key: 'labels',
    title: '1',
    render(items) {
      return items.map(item => {
        return (
          <label key={item.desc} className="label label-info mgr10">
            {item.desc}
          </label>
        );
      });
    }
  },
  {
    key: 'type',
    title: '2',
    render(item) {
      return <span className="color-error">{item}</span>;
    }
  },
  {
    key: 'times',
    title: '3'
  },
  {
    title: '操作',
    render(item, row) {
      return <span>现在还没有操作</span>;
    }
  }
];
<Table
  columns={columns}
  select
  striped
  handleSelectChanged={console.log}
  canRowSelected={(d, index) => index !== 2}
  data={tableData}
  withSelectFooter
  selectFooterRender={selected => (
    <Fragment>
      <Button
        mini
        onClick={() => window.alert(`删除选中的${selected.length || 0}个元素`)}
        type="dark"
      >
        批量删除
      </Button>
    </Fragment>
  )}
/>;
```

#### changLog

- background 默认改为 false
- 默认添加展开的图标，如果想不带这个图标，可通过 hideExpandIcon 控制
- 可通过 titleClassName 控制标题的样式
- 新增 withSelectFooter，可以显示选中项，并配置选中操作，配合 selectFooterRender,selectFooterRender,selectFooterClassName,selectFooterStyle 等进行内容展示
- 当 data 变化时，会自动清空 selected 元素
- hover 下统一了链接的颜色
- 当传入的 data 发生变化的时候, 会清空选中内容
- 添加无 render 下的字段为空的展示，统一 column 为空的展示使用 table 的 columnEmptyLabel，自定义一列可以在 column 中配置 emptyLabel，column 的 render 函数可接入当前显示的 emptyLabel 的值
