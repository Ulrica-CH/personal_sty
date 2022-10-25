#### 基本使用

```js
import Checkbox, { CheckboxGroup } from '../Checkbox';
const options = ['time_range', 'machine_type', 'severity', 'direction'];

const valueObj = {
  time_range: 'thirty_days',
  machine_type: [],
  severity: [],
  direction: [],
  custom: []
};

<QuickFilter
  options={options}
  valueObj={valueObj}
  optionConfig={{
    severity: { doubleColumn: true },
    direction: { showChildren: true }
  }}
  customOptions={[
    {
      label: '自定义',
      value: 'custom',
      render: () => (
        <div>
          <CheckboxGroup onChange={console.log}>
            <Checkbox value="1" label="是" />
            <Checkbox value="0" label="否" />
          </CheckboxGroup>
        </div>
      )
    }
  ]}
  optionFilters={[
    {
      type: 'direction',
      fn: d => {
        if (d.value === 'out') {
          return false;
        }
        return true;
      }
    }
  ]}
  onChangeItem={console.log}
  customOptionsSelectedFn={val => console.log(val)}
  onSubmit={console.log}
/>;
```

#### changelog

##### 2019-10-23 新增 QuickFilter 组件
