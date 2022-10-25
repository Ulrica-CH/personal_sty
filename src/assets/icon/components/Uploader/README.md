#### 基本使用(这里写 useUploadFile 报错了，所以注释了，使用时连注释一起带上)

```jsx inside Markdown
import Button from '../Button';
// const { file, setFile, percent, upload, error } = Uploader.useUploadFile({
//   url: 'https://yapi.threatbook-inc.cn/mock/209/v1/infos/list',
//   handleResponse： res => res.code === 0 ? res.data : throw(res),
//   handleError: res => res.verboseMsg
// });
<div style={{ width: '400px', border: '1px solid #ccc', padding: '20px' }}>
  <Uploader
    type="button"
    // deletable={true}
    // onChange={setFile}
    // showProgress={file}
    // progress={percent}
    // errorMsg={error}
  />
  <Button
  // onClick={() => {
  //   const params = new FormData();
  //   params.append('file', file);
  //   upload(params);
  // }}
  >
    上传
  </Button>
</div>;
```

#### changelog

1, 3.0 版本新增组件
2, 增加 multi 实现多选
