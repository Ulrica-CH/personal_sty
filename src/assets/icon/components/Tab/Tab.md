#### 基本使用

最单纯的 Tab,可以切换各选项卡的内容

```js
import TabPanel from './TabPanel';
<Tab>
  <TabPanel header="告警明细" keys="1">
    111
  </TabPanel>
  <TabPanel header="告警不明细" keys="2">
    222
  </TabPanel>
</Tab>;
```

#### 基本主题

提供 title 版本主题

```js
import TabPanel from './TabPanel';
<Tab defaultActiveKey="2" theme="title">
  <TabPanel header="告警明细" keys="1">
    111
  </TabPanel>
  <TabPanel header="告警不明细" keys="2">
    222
  </TabPanel>
</Tab>;
```

#### 控制切换

- defaultActiveKey 控制显示那个 tab
- beforeChange 控制切换

```js
import TabPanel from './TabPanel';
const beforeChange = () => {
  return confirm('确定切换吗？取消则不会切换');
};
<Tab defaultActiveKey="2" theme="title" beforeChange={beforeChange}>
  <TabPanel header="告警明细" keys="1">
    111
  </TabPanel>
  <TabPanel header="告警不明细" keys="2">
    222
  </TabPanel>
</Tab>;
```

#### 单 Tab 禁用

- disabled 控制显示单个 tab 禁用

```js
import TabPanel from './TabPanel';
<div>
  <Tab>
    <TabPanel disabled header="告警明细" keys="1">
      111
    </TabPanel>
    <TabPanel header="告警不明细" keys="2">
      222
    </TabPanel>
  </Tab>
  <Tab theme="title">
    <TabPanel disabled header="告警明细" keys="1">
      111
    </TabPanel>
    <TabPanel header="告警不明细" keys="2">
      222
    </TabPanel>
  </Tab>
</div>;
```
