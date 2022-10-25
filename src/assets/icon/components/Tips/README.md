#### 基本用法

```js
<Tips content="这是提示内容" className="mgr5"/>
<Tips content="这是提示内容" type="help"/>
```

#### 提供暗色主题

```js
<Tips content="这是提示内容" theme="dark" />
```

#### mini 版本，用于针对图标的属性说明

```js
<Tips type="success" content="成功" mini/>
<Tips type="error" content="失败" mini/>
```

#### 丰富的内容自定义方式

```js
import Icon from '../Icon';
<div>
  <Tips content="自定义内容">
    <Icon type="success" />
  </Tips>
  <Tips content="可自定义内容展现">
    {hover => (
      <Icon
        style={{
          transform: hover ? 'rotate(90deg)' : '',
          transition: 'transform'
        }}
        type="success"
      />
    )}
  </Tips>
</div>;
```
