#### 基本使用

- 可使用 showQuickJumper 配置快速跳转

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1
    };
  }
  handlePageChange(current) {
    this.setState({
      current
    });
  }
  render() {
    const { current } = this.state;

    return (
      <Pagination
        current={current}
        showQuickJumper
        onChange={this.handlePageChange.bind(this)}
        total={100}
      />
    );
  }
}
<Demo />;
```

#### 控制颜色

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1
    };
  }
  handlePageChange(current) {
    this.setState({
      current
    });
  }
  render() {
    const { current } = this.state;

    return (
      <Pagination
        current={current}
        onChange={this.handlePageChange.bind(this)}
        total={100}
      />
    );
  }
}
<Demo />;
```

#### 控制每页可以显示的条数

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1
    };
  }
  handlePageChange(current) {
    this.setState({
      current
    });
  }
  render() {
    const { current } = this.state;

    return (
      <Pagination
        current={current}
        onChange={this.handlePageChange.bind(this)}
        total={100}
        pageSizeOptions={[20, 30, 40, 50]}
      />
    );
  }
}
<Demo />;
```

#### 是否展示 pageSize 切换器

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1
    };
  }
  handlePageChange(current) {
    this.setState({
      current
    });
  }
  render() {
    const { current } = this.state;

    return (
      <Pagination
        current={current}
        onChange={this.handlePageChange.bind(this)}
        total={100}
        pageSizeOptions={[20, 30, 40, 50]}
        showSizeChanger={true}
      />
    );
  }
}
<Demo />;
```

#### pageSize 变化的回调

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1
    };
  }
  handlePageChange(current) {
    this.setState({
      current
    });
  }
  render() {
    const { current } = this.state;

    return (
      <Pagination
        current={current}
        onChange={this.handlePageChange.bind(this)}
        total={100}
        pageSizeOptions={[20, 30, 40, 50]}
        showSizeChanger={true}
        onShowSizeChange={e => cosnole.log(e)}
      />
    );
  }
}
<Demo />;
```

#### 显示上一页、下一页

```js
class Demo extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 1
    };
  }
  handlePageChange(current) {
    this.setState({
      current
    });
  }
  render() {
    const { current } = this.state;

    return (
      <Pagination
        current={current}
        onChange={this.handlePageChange.bind(this)}
        total={0}
      />
    );
  }
}
<Demo />;
```
