#### 基本使用

new 提供了 useSetter，提供了以下功能

1. 自动提供 collector，不必再去创建实例
2. 统一的配置中心，可一起配置 align, mini 这种属性
3. helper，自动传入三个值 value, defaultValue, 和 onChange 和统一的 draft, value 进行绑定
4. helper 支持传入参数 transformArr 会将 textarea 的输入 默认转成数组
5. helper 支持传入参数 uniq，控制数组值不重复

需要注意的是，需要将 collector 传入 Setter

```js
const data = {
  user: {
    name: "wwx",
    sex: "male",
  },
  job: {
    type: "工程师",
    workTime: 9,
  },
};

const sexOptions = [
  {
    label: "男",
    value: "male",
  },
  {
    label: "女",
    value: "female",
  },
];

import Form from "../Form";
import { useRef, useState, Fragment } from "react";
import Input from "../Input";
import Item from "../Item";
import Select from "../Select";
import Button from "../Button";

const { Item: FormItem } = Form;

function Wrap() {
  const setterRef = useRef();
  const { config, helper, collector } = Setter.useSetter({
    config: {
      align: "right",
      bold: true,
      className: "mgb20",
    },
  });

  const onSubmit = () => {
    const isOk = collector.validate();

    if (isOk) {
      const result = setterRef.current.getResult();
      console.log(result);
    } else {
      console.log("验证失败！");
    }
  };

  return (
    <Setter data={data} collector={collector} ref={setterRef}>
      {(draft, value) => {
        const isMale = value.user.sex === "male";
        console.log(isMale);
        return (
          <div>
            <FormItem
              label="姓名"
              validators={[
                {
                  requires: true,
                },
                {
                  length: [3, 6],
                },
              ]}
              collector={collector}
              // onChange={name => (draft.user.name = name)}
              {...config}
              {...helper("user.name")}
            >
              <Input />
            </FormItem>
            <FormItem label="性别" {...config} {...helper("user.sex")}>
              <Select options={sexOptions} />
            </FormItem>
            <Item show={isMale}>
              <FormItem label="工作" {...config} {...helper("job.type")}>
                <Input />
              </FormItem>
            </Item>
            <Item show={!isMale}>
              <FormItem
                label="工作年限"
                {...config}
                {...helper("job.workTime")}
                // value={value.job.workTime}
                // onChange={workTime => (draft.job.workTime = workTime)}
              >
                <Input />
              </FormItem>
            </Item>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
<Wrap />;
```

针对于深层次的表单输入

```js
const data = {
  user: {
    name: "wwx",
    sex: "male",
  },
  job: {
    type: "engineer",
    workTime: 9,
  },
};

import Form from "../Form";
import { useRef, useState, Fragment } from "react";
import Input from "../Input";
import Button from "../Button";
const FormItem = Form.Item;

function Wrap() {
  const setterRef = useRef();

  const onSubmit = () => {
    const result = setterRef.current.getResult();
    console.log(result);
  };

  return (
    <Setter data={data} ref={setterRef}>
      {(draft, value) => {
        return (
          <div>
            <FormItem
              label="姓名"
              value={value.user.name}
              onChange={(name) => (draft.user.name = name)}
            >
              <Input />
            </FormItem>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
<Wrap />;
```

实时获取内容，进行级联处理

性别改变时，选项也会进行改变

```js
const data = {
  user: {
    name: "wwx",
    sex: "male",
  },
  job: {
    type: "工程师",
    workTime: 9,
  },
};

const sexOptions = [
  {
    label: "男",
    value: "male",
  },
  {
    label: "女",
    value: "female",
  },
];

import Form from "../Form";
import { useRef, useState, Fragment } from "react";
import Input from "../Input";
import Select from "../Select";
import Item from "../Item";
import Button from "../Button";
const FormItem = Form.Item;

function Wrap() {
  const setterRef = useRef();

  const onSubmit = () => {
    const result = setterRef.current.getResult();
    console.log(result);
  };

  return (
    <Setter data={data} ref={setterRef}>
      {(draft, value) => {
        const isMale = value.user.sex === "male";
        return (
          <div>
            <FormItem
              label="姓名"
              value={value.user.name}
              onChange={(name) => (draft.user.name = name)}
              className="mgb20"
            >
              <Input />
            </FormItem>
            <FormItem
              label="性别"
              value={value.user.sex}
              className="mgb20"
              onChange={(sex) => (draft.user.sex = sex)}
            >
              <Select options={sexOptions} />
            </FormItem>
            <Item show={isMale}>
              <FormItem
                label="工作"
                className="mgb20"
                value={value.job.type}
                onChange={(type) => (draft.job.type = type)}
              >
                <Input />
              </FormItem>
            </Item>
            <Item show={!isMale}>
              <FormItem
                className="mgb20"
                label="工作年限"
                value={value.job.workTime}
                onChange={(workTime) => (draft.job.workTime = workTime)}
              >
                <Input />
              </FormItem>
            </Item>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
<Wrap />;
```

配合 Collector 进行验证

```js
const data = {
  user: {
    name: "wwx",
    sex: "male",
  },
  job: {
    type: "工程师",
    workTime: 9,
  },
};

const sexOptions = [
  {
    label: "男",
    value: "male",
  },
  {
    label: "女",
    value: "female",
  },
];

import Form from "../Form";
import { useRef, useState, Fragment } from "react";
import Input from "../Input";
import Item from "../Item";
import Select from "../Select";
import Button from "../Button";

const { Collector, Item: FormItem } = Form;

const collector = new Collector();

function Wrap() {
  const setterRef = useRef();

  const onSubmit = () => {
    const isOk = collector.validate();

    if (isOk) {
      const result = setterRef.current.getResult();
      console.log(result);
    } else {
      console.log("验证失败！");
    }
  };

  return (
    <Setter data={data} ref={setterRef}>
      {(draft, value) => {
        const isMale = value.user.sex === "male";
        return (
          <div>
            <FormItem
              label="姓名"
              value={value.user.name}
              className="mgb20"
              validators={[
                {
                  requires: true,
                },
                {
                  length: [3, 6],
                },
              ]}
              collector={collector}
              onChange={(name) => (draft.user.name = name)}
            >
              <Input />
            </FormItem>
            <FormItem
              label="性别"
              value={value.user.sex}
              className="mgb20"
              onChange={(sex) => (draft.user.sex = sex)}
            >
              <Select options={sexOptions} />
            </FormItem>
            <Item show={isMale}>
              <FormItem
                className="mgb20"
                label="工作"
                value={value.job.type}
                onChange={(type) => (draft.job.type = type)}
              >
                <Input />
              </FormItem>
            </Item>
            <Item show={!isMale}>
              <FormItem
                className="mgb20"
                label="工作年限"
                value={value.job.workTime}
                onChange={(workTime) => (draft.job.workTime = workTime)}
              >
                <Input />
              </FormItem>
            </Item>
            <Button onClick={onSubmit}>提交</Button>
          </div>
        );
      }}
    </Setter>
  );
}
<Wrap />;
```

#### changelog

##### 2022-03-31 1.增加过滤空行 2.修复在某些条件下 value 为 undefined
