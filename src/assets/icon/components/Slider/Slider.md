#### 默认值

```js
import { useState } from 'react';
const [value, setValue] = useState(10);
<Slider value={value} onChange={setValue} />;
```

#### 设定 label 单位

```js
import { useState } from 'react';
const [value, setValue] = useState(10);
<Slider value={value} unit="米" onChange={setValue} />;
```

#### 隐藏 label

```js
import { useState } from 'react';
const [value, setValue] = useState(10);
<Slider value={value} hideStepLabel onChange={setValue} />;
```

#### 设定标记

```js
import { useState } from 'react';
const [value, setValue] = useState(10);
<Slider value={value} marks={{ '50': 'hahaha' }} onChange={setValue} />;
```

#### 设定步数

```js
import { useState } from 'react';
const [value, setValue] = useState(10);
<Slider value={value} step={10} onChange={setValue} />;
```

#### 设置样式

```js
import { useState } from 'react';
const [value, setValue] = useState(10);
<Slider
  value={value}
  activeDotStyle={{ borderColor: 'blue' }}
  trackStyle={{ backgroundColor: 'blue', height: 4 }}
  railStyle={{ backgroundColor: 'green', height: 4 }}
  handleStyle={{
    borderColor: 'green',
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0)'
  }}
  onChange={setValue}
/>;
```
