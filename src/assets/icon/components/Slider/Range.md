#### 默认值

```js
import { useState } from 'react';

function Wrapper() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range defaultValue={[0, 10]} onChange={e => setValue(e)} value={value} />
  );
}

<Wrapper />;
```

#### 设定单位

```js
import { useState } from 'react';

function Wrapper() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      defaultValue={[0, 0]}
      onChange={e => setValue(e)}
      value={value}
      unit="米"
    />
  );
}

<Wrapper />;
```

#### 隐藏 Label

```js
import { useState } from 'react';

function Wrapper() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      defaultValue={[0, 0]}
      onChange={e => setValue(e)}
      value={value}
      hideStepLabel={true}
    />
  );
}

<Wrapper />;
```

#### 设定标记

```js
import { useState } from 'react';

function Wrapper() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      defaultValue={[0, 0]}
      onChange={e => setValue(e)}
      value={value}
      marks={{ '50': 'hahaha' }}
    />
  );
}

<Wrapper />;
```

#### 设定步数

```js
import { useState } from 'react';

function Wrapper() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      defaultValue={[0, 0]}
      onChange={e => setValue(e)}
      value={value}
      step={10}
    />
  );
}

<Wrapper />;
```

#### 设定 pushable

pushable 可以设置为 true，以便在移动手柄时推动周围的手柄。当设置为数字时，数字将是手柄之间的最小保证距离

```js
import { useState } from 'react';
function RangeTest() {
  const [value, setValue] = useState([10, 20]);

  return <Range value={value} onChange={setValue} pushable={true} />;
}
<RangeTest />;
```

#### 设置圆点之间轨道样式

```js
import { useState } from 'react';
function RangeTest() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      value={value}
      onChange={setValue}
      trackStyle={[
        { backgroundColor: 'red', height: 4 },
        { backgroundColor: 'blue', height: 4 }
      ]}
    />
  );
}
<RangeTest />;
```

#### 设置圆点两边轨道样式

```js
import { useState } from 'react';
function RangeTest() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      value={value}
      onChange={setValue}
      railStyle={{ backgroundColor: '#ffeeee', height: 4 }}
    />
  );
}
<RangeTest />;
```

#### 设置标记的样式

```js
import { useState } from 'react';
function RangeTest() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      value={value}
      onChange={setValue}
      activeDotStyle={{ borderColor: 'red' }}
      marks={{ '50': 'hahaha' }}
    />
  );
}
<RangeTest />;
```

#### 设置滑动圆点的样式

```js
import { useState } from 'react';
function RangeTest() {
  const [value, setValue] = useState([10, 20]);

  return (
    <Range
      value={value}
      onChange={setValue}
      handleStyle={[
        {
          borderColor: 'green',
          height: 14,
          width: 14,
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0)'
        },
        {
          borderColor: 'pink',
          height: 14,
          width: 14,
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0)'
        }
      ]}
    />
  );
}
<RangeTest />;
```
