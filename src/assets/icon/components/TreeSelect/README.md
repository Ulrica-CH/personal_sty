#### 基本使用

```js
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0'
      },
      {
        title: 'Child Node2',
        value: '0-0-1',
        key: '0-0-1'
      }
    ]
  }
  // {
  //   title: "Node2",
  //   value: "0-1",
  //   key: "0-1",
  //   children: [
  //     {
  //       title: "Child Node3",
  //       value: "0-1-0",
  //       key: "0-1-0"
  //     },
  //     {
  //       title: "Child Node4",
  //       value: "0-1-1",
  //       key: "0-1-1"
  //     },
  //     {
  //       title: "Child Node5",
  //       value: "0-1-2",
  //       key: "0-1-2"
  //     }
  //   ]
  // }
];
import { useState } from 'react';
const { SHOW_PARENT } = TreeSelect;
function Demo() {
  const [value, setValue] = useState('0-0-0');

  const tProps = {
    treeData,
    value: value,
    onChange: setValue,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: 'Please select'
  };
  return <TreeSelect {...tProps} />;
}
<Demo />;
```
