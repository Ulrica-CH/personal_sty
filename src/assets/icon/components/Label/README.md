#### 基本使用

```js
<div>
  <Label className="mgr10" type="info">
    info
  </Label>
  <Label className="mgr10" type="success">
    success
  </Label>
  <Label className="mgr10" type="warning">
    warning
  </Label>
  <Label className="mgr10" type="error">
    error
  </Label>
  <Label className="mgr10" type="failed">
    failed
  </Label>
  <Label className="mgr10" type="pink">
    pink
  </Label>
  <Label className="mgr10" type="cavity">
    cavity
  </Label>
  <Label className="mgr10" type="danger">
    danger
  </Label>
  <Label className="mgr10" type="alarm">
    alarm
  </Label>
  <Label className="mgr10" type="dark">
    dark
  </Label>
</div>
```

##### weak 版

```js
<div>
  <Label className="mgr10" weak type="info">
    info
  </Label>
  <Label className="mgr10" weak type="success">
    success
  </Label>
  <Label className="mgr10" weak type="warning">
    warning
  </Label>
  <Label className="mgr10" weak type="error">
    error
  </Label>
  <Label className="mgr10" weak type="failed">
    failed
  </Label>
  <Label className="mgr10" weak type="pink">
    pink
  </Label>
  <Label className="mgr10" weak type="cavity">
    cavity
  </Label>
</div>
```

##### light 版

```js
<div>
  <Label className="mgr10" light type="info">
    info
  </Label>
  <Label className="mgr10" light type="success">
    success
  </Label>
  <Label className="mgr10" light type="warning">
    warning
  </Label>
  <Label className="mgr10" light type="error">
    error
  </Label>
  <Label className="mgr10" light type="failed">
    failed
  </Label>
  <Label className="mgr10" light type="pink">
    pink
  </Label>
  <Label className="mgr10" light type="alarm">
    alarm
  </Label>
  <Label className="mgr10" light type="dark">
    dark
  </Label>
</div>
```

##### weak && light 版

```js
<div>
  <Label className="mgr10" light weak type="info">
    info
  </Label>
  <Label className="mgr10" light weak type="success">
    success
  </Label>
  <Label className="mgr10" light weak type="warning">
    warning
  </Label>
  <Label className="mgr10" light weak type="error">
    error
  </Label>
  <Label className="mgr10" light weak type="failed">
    failed
  </Label>
  <Label className="mgr10" light weak type="pink">
    pink
  </Label>
</div>
```

##### 设置最大宽度

```js
import iconClose from './images/error1.svg';
<div>
  <Label maxWidth={90} light type="info">
    特别长特别长的内容特别长特别长的内容
  </Label>
  <Label maxWidth={90} icon={iconClose} className="mgl10" type="info">
    特别长特别长的内容特别长特别长的内容
  </Label>
  <Label maxWidth={90} light icon={iconClose} className="mgl10" type="info">
    特别长特别长的内容特别长特别长的内容
  </Label>
  <Label maxWidth={90} weak icon={iconClose} className="mgl10" type="info">
    特别长特别长的内容特别长特别长的内容
  </Label>
  <Label
    maxWidth={90}
    weak
    icon={iconClose}
    className="mgl10"
    closable
    type="info"
  >
    特别长特别长的内容特别长特别长的内容
  </Label>
</div>;
```

##### 带关闭的

```js
<div>
  <Label
    closable
    type="info"
    className="mgr10"
    onClose={() => alert('我最美呀')}
  >
    可关闭
  </Label>
  <Label
    closable
    light
    type="info"
    className="mgr10"
    onClose={() => alert('我最美呀')}
  >
    可关闭
  </Label>
  <Label
    closable
    weak
    type="info"
    className="mgr10"
    onClose={() => alert('我最美呀')}
  >
    可关闭
  </Label>
  <Label
    closable
    weak
    light
    type="info"
    className="mgr10"
    onClose={() => alert('我最美呀')}
  >
    可关闭
  </Label>
</div>
```

##### 自定义圆角尺寸

这样可以简单的设置一些圆角，但是针对一些 label 的样式暂时不支持, 且边距需要手动修改

```js
import iconError from './images/error1.svg';

<div>
  <Label className="mgr10" type="info" borderRadius={10}>
    自定义圆角尺寸
  </Label>
  <Label className="mgr10" icon={iconError} type="info" borderRadius={10}>
    自定义圆角尺寸
  </Label>
  <Label className="mgr10" light icon={iconError} type="info" borderRadius={10}>
    自定义圆角尺寸
  </Label>
  <Label className="mgr10" weak icon={iconError} type="info" borderRadius={10}>
    自定义圆角尺寸
  </Label>
</div>;
```

##### 提供圆形标签

不需要进行特定的修改，兼容更多模式

```js
import iconError from './images/error1.svg';

<div>
  <Label className="mgr10" type="info" circle>
    自定义圆角尺寸
  </Label>
  <Label className="mgr10" icon={iconError} type="info" circle>
    自定义圆角尺寸
  </Label>
  <Label className="mgr10" light icon={iconError} type="info" circle>
    自定义圆角尺寸
  </Label>
  <Label className="mgr10" weak icon={iconError} type="info" circle>
    自定义圆角尺寸
  </Label>
  <Label className="mgr10" maxWidth={80} type="info" circle>
    自定义圆角尺寸
  </Label>
  <Label
    className="mgr10"
    light
    maxWidth={80}
    icon={iconError}
    type="info"
    circle
  >
    自定义圆角尺寸
  </Label>
</div>;
```

##### 自定义图标

会根据固定的 type 显示图标颜色

```js
import iconError from './images/error1.svg';
<div>
  <div className="mgb10">
    <Label className="mgr10" icon={iconError} type="info">
      info
    </Label>
    <Label className="mgr10" icon={iconError} type="success">
      success
    </Label>
    <Label className="mgr10" icon={iconError} type="warning">
      warning
    </Label>
    <Label className="mgr10" icon={iconError} type="error">
      error
    </Label>
    <Label className="mgr10" icon={iconError} type="failed">
      failed
    </Label>
    <Label className="mgr10" icon={iconError} type="pink">
      pink
    </Label>
  </div>
  <div className="mgb10">
    <Label className="mgr10" weak icon={iconError} type="info">
      info
    </Label>
    <Label className="mgr10" weak icon={iconError} type="success">
      success
    </Label>
    <Label className="mgr10" weak icon={iconError} type="warning">
      warning
    </Label>
    <Label className="mgr10" weak icon={iconError} type="error">
      error
    </Label>
    <Label className="mgr10" weak icon={iconError} type="failed">
      failed
    </Label>
    <Label className="mgr10" weak icon={iconError} type="pink">
      pink
    </Label>
  </div>
  <div className="mgb10">
    <Label className="mgr10" light icon={iconError} type="info">
      info
    </Label>
    <Label className="mgr10" light icon={iconError} type="success">
      success
    </Label>
    <Label className="mgr10" light icon={iconError} type="warning">
      warning
    </Label>
    <Label className="mgr10" light icon={iconError} type="error">
      error
    </Label>
    <Label className="mgr10" light icon={iconError} type="failed">
      failed
    </Label>
    <Label className="mgr10" light icon={iconError} type="pink">
      pink
    </Label>
  </div>
</div>;
```

#### changeLog

- 新增了 type = pink 类型的标签
- 新增可传入 icon,显示带 Icon 的标签，icon 为对应的 link
- circle 原型标签
- borderRadius 方便自定义圆角
