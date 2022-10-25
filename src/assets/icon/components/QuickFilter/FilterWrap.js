import React, { PureComponent, Fragment } from 'react';

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

export default function(WrappedComponent) {
  return class HOC extends PureComponent {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
    constructor(props) {
      super(props);

      this.state = {
        defaultValue: this.props.defaultValue
      };
    }
    clear = () => {
      const { dataKey } = this.props;
      this.setState(() => ({
        defaultValue: []
      }));
      this.props.onChange(dataKey, []);
    };
    selectAll = () => {
      const { dataKey, options } = this.props;
      this.setState(() => ({
        defaultValue: options.map(item => item.value)
      }));
      this.props.onChange(
        dataKey,
        options.map(item => item.value)
      );
    };
    render() {
      return (
        <Fragment>
          <div className="quick-filter-comp-group">
            {this.props.noTitle || !this.props.label ? null : (
              <div className="group-title">
                <div className="title">{this.props.label}</div>
                <div>
                  <span className="clear" onClick={this.clear}>
                    清空
                  </span>
                  <span className="all" onClick={this.selectAll}>
                    全选
                  </span>
                </div>
              </div>
            )}
            <WrappedComponent {...this.state} {...this.props} />
          </div>
        </Fragment>
      );
    }
  };
}
