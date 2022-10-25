#### 单独使用

可以单独使用它的样式

```js
import Input from '../Input';

<FormItem label="姓名" onChange={console.log} defaultValue="wwx">
  <Input />
</FormItem>;
```

#### 配合 Collector 进行验证

- 在 validators 里添加 msg 字段，填入错误提示信息

```js
import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { Collector } from '../Form';
const collector = new Collector();

function Wrap() {
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const onClick = () => {
    const ok = collector.validate();

    if (!ok) {
      console.log('验证不通过!');
    } else {
      console.log(name, age);
    }
  };
  return (
    <div>
      <div>
        <FormItem
          className="mgb20"
          label="姓名"
          onChange={val => setName(val)}
          collector={collector}
          validators={[
            {
              required: true,
              msg: '姓名必填'
            },
            {
              length: [1, 20],
              msg: '长度需要在1-20之间'
            }
          ]}
        >
          <Input placeholder="请输入姓名，必填，长度20" />
        </FormItem>
        <FormItem
          label="年龄"
          onChange={val => setAge(val)}
          collector={collector}
          validators={[
            {
              required: true,
              msg: '年龄必填'
            },
            {
              fn(num) {
                return num < 20;
              },
              msg: '年龄需小于20'
            }
          ]}
        >
          <Input placeholder="请输入年龄，必填，必须小于20" />
        </FormItem>
        <Button onClick={onClick}>提交</Button>
      </div>
    </div>
  );
}
<Wrap />;
```

#### 标签宽度

```js
import Input from '../Input';
<div>
  <FormItem labelWidth="200px" label="标签">
    <Input placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
  <div>可以控制标签颜色</div>
  <FormItem labelStyle={{ color: 'red' }} label="标签">
    <Input placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
  <div>快速设置提示内容</div>
  <FormItem labelTip="用于快速进行提示" label="标签">
    <Input placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
  <div>可以控制标签颜色</div>
  <FormItem
    labelTip="用于快速进行提示，可以设置提示的图标类型"
    labelTipType="help"
    label="标签"
  >
    <Input placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
</div>;
```

#### 整体禁用

```js
import Input from '../Input';
<FormItem disabled label="标签">
  <Input placeholder="请输入年龄，必填，必须小于20" />
</FormItem>;
```

#### 子组件的默认值

```js
import Input from '../Input';
<FormItem defaultValue="1111" label="标签">
  <Input placeholder="请输入年龄，必填，必须小于20" />
</FormItem>;
```

#### 控制对齐

```js
import Input from '../Input';
<div>
  默认会和上放有7向素的距离，左对齐
  <FormItem label="标签">
    <Input type="textarea" placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
  align设置右对齐
  <FormItem align="right" label="标签">
    <Input type="textarea" placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
  vAlign设置上下对齐
  <FormItem vAlign="top" label="标签">
    <Input type="textarea" placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
  <FormItem vAlign="center" label="标签">
    <Input type="textarea" placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
  <FormItem vAlign="bottom" label="标签">
    <Input type="textarea" placeholder="请输入年龄，必填，必须小于20" />
  </FormItem>
</div>;
```

#### changeLog

- 增加了必填的判断，当 validators 里包含{required: true}时，会展示必填星号，可使用 showRequired 关闭
- 增加了错误信息的提示，每个 validator 可以添加 msg 信息, 目前必填项和长度的验证有默认的 msg
- 可以使用 disabled 控制整体都禁用的样式
- mini 默认改为 true 了
- 增加了 labelTip，用于快捷进行提示
- 增加了 resetValidateStatus，用于清除验证状态
