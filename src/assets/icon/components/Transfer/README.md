#### 基本使用

```js
import { repeat } from 'lodash';
const dataSource = Array(10)
  .fill(1)
  .map((item, index) => ({
    label: repeat(index + 1, 5),
    value: index + 1
  }));

<Transfer
  defaultValue={[1, 5, 7]}
  dataSource={dataSource}
  withSearch
  onChange={console.log}
/>;
```
