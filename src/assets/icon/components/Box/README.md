#### 基本使用

```js
<Box data border>
  这是一个小盒子
</Box>
```

#### 基本属性

- 使用 title 设置标题
- border 控制是否展示 border
- contentHeight 设置内容高度，用于展示图表
- padding 设置盒子内边距，建议已 5 为基本单位
- background 控制是否标题带背景
- error 控制错误展示错误信息
- config.errorResolver 配置错误信息的设置

```js
<div>
  <Box
    data
    border
    background
    title='这是盒子标题'
    padding={15}
    contentHeight={200}
    error='这里可以显示错误信息'
  >
    这是一个小盒子
  </Box>
</div>
```

#### 数据为空时，自动隐藏

会自动判断传入的数据，为空时隐藏盒子

- emptyDesc 控制数据为空时的描述
- emptyHide 控制数据为空时，盒子是否隐藏全部内容
- miniEmpty 小版本数据为空图标

```js
<div>
  <Box border data={[]}>
    这是一个小盒子
  </Box>
  <Box border data={{}} miniEmpty emptyDesc='自定义数据为空时的提示'>
    这是一个小盒子
  </Box>
  下面数据为空时，直接隐藏全部内容
  <Box border data={{}} emptyHide>
    这是一个小盒子
  </Box>
</div>
```

#### 带 Loading 的盒子

```js
<Box data border isLoading title='这是盒子标题'>
  这是一个小盒子
</Box>
```

#### 可折叠的盒子

```js
<Box data border collapse title='这是盒子标题'>
  这是一个小盒子
</Box>
```

设置折叠按钮

```js
<Box
  data
  collapse
  toggleRender={(open) => {
    return open ? '关闭！' : '打开！';
  }}
  title='这是盒子标题'
>
  这是一个小盒子
</Box>
```

#### changeLog

20180504

1.  修改当 data 为{}的时候，显示暂无数据
