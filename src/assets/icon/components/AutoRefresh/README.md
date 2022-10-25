#### 基本使用

```js
class Test extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      interval: 15,
      timeRange: "today"
    };
    this.changeRefresh = this.changeRefresh.bind(this);
  }
  changeRefresh(val) {
    console.log(val);
  }
  render() {
    const {interval, timeRange, timeFrom, timeTo} = this.state;
    return <AutoRefresh
      interval={interval}
      timeRange={timeRange}
      timeFrom={timeFrom}
      timeTo={timeTo}
      onChange={this.changeRefresh}
    />
  }
}
<Test/>

```
#### changelog

##### 2020-07-30 新增AutoRefresh组件
