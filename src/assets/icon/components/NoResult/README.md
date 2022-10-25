<!--
 * @LastEditTime: 2020-06-17 10:57:42
 * @LastEditors: jinxiaojian
-->

#### 基本使用

```js
<div>
  <NoResult />
  <NoResult mini={true} />
  <NoResult desc="不好意思，真的没有数据" />
</div>
```

#### 提供四种 type

```js
<div>
  <NoResult />
  <NoResult type="net" />
  <NoResult type="error" />
  <NoResult type="auth" />
</div>
```

#### changeLog

- 提供四种 type 供选择
