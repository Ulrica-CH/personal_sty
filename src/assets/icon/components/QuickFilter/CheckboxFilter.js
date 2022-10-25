import React, { PureComponent } from 'react';
import FilterWrap from './FilterWrap.js';
import Checkbox from '../Checkbox';

const CheckboxGroup = Checkbox.CheckboxGroup;

class CheckboxFilter extends PureComponent {
  render() {
    const { defaultValue, dataKey, onChange, config = {} } = this.props;
    return (
      <CheckboxGroup
        defaultValue={defaultValue || []}
        className={config.doubleColumn ? 'double-column' : ''}
        onChange={val => onChange(dataKey, val)}
      >
        {this.props.options.map((item, index) => {
          if (!item.parent) {
            return (
              <Checkbox
                label={item.label}
                key={index}
                value={item.value}
                style={item.style}
                defaultChecked={defaultValue.includes(item.value)}
              />
            );
          } else {
            if (config.showChildren) {
              return (
                <Checkbox
                  label={item.label}
                  key={index}
                  value={item.value}
                  style={{ ...item.style, marginLeft: '10px' }}
                  disabled={!defaultValue.includes(item.parent)}
                  defaultChecked={defaultValue.includes(item.value)}
                />
              );
            } else {
              return null;
            }
          }
        })}
      </CheckboxGroup>
    );
  }
}

export default FilterWrap(CheckboxFilter);
