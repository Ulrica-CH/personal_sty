#### 基本使用

##### 默认 Loading

```js
<div>
  <Loading size="lg" />
  <Loading />
  <Loading size="sm" />
</div>
```

##### horizontal

```js
<div>
  <Loading size="lg" align="horizontal" />
  <p />
  <Loading align="horizontal" />
  <p />
  <Loading size="sm" align="horizontal" />
  <p />
</div>
```

##### 带内容的 Loading

用于展示提交状态, ps: 白色背景看不清楚

```js
const successIcon = require('../Alert/images/success.svg');

<Loading type="box">
  <span>自定义内容</span>
</Loading>;
```

##### loading 条

只支持 className 和 style 属性

```js
<Loading type="bar" />
```

##### changeLog

1, 修改<Loading></Loading> 的动画颜色（20180910, zsj）
