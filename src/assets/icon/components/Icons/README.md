常用 icon 的封装

#### 基本使用

##### 引用组件

```js
const Icons = require('./index.js');

<Icons.IconDashboard />;
```

##### 引用 svg

使用前须配置合适的 loader

实际的引用路径: tdp-ui/build/static/svg/xxx.svg

```js
const iconLink = require('../../images/svg/dashboard.svg');

<Icon link={iconLink} />;
```
