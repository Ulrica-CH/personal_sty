#### 基本使用

```js
<div>
  文件名：
  <FileUpload onSubmit={() => console.log(1)} onChange={() => console.log(2)} />
</div>
```
#### 状态

```js
<div>
  文件名：
  <FileUpload status="loading" />
</div>
<div>
  文件名：
  <FileUpload status="success" />
</div>
<div>
  文件名：
  <FileUpload status="error" />
</div>
```

#### 默认值

```js
<FileUpload defaultValue="1111" />
```

#### 带有error 样式

```js
<FileUpload hasError={true} />
```