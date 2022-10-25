<!--
 * @LastEditTime: 2022-04-19 15:18:24
 * @LastEditors: duqiuliang
-->
#### 基本使用
基于 DropDown Select自定义下拉内容容器 
onChange 主要用在 overlay 修改value
getValueString 来转换value值作为展示值
onVisibleChange 显示状态变更回调
```javascript
function overlay() {
  return <div>222</div>
}

<SelectWrap
  defaultValue={["delete"]}
  onChange={console.log}
  getValueString={() => '自定义'} 
  title="自定义"
  overlay={<overlay/>}
  className="mgb20"
/>;
```
