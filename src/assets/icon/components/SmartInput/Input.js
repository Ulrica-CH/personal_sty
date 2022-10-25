import React, { PureComponent } from 'react';
import iconRight from './images/smart-right.svg';
import iconError from './images/smart-error.svg';
import Icon from '../Icon';
import Item from '../Item';
import { get, trim } from 'lodash';
import clearIcon from '../Input/images/clear.svg';

// import delIcon from "./images/del_icon.svg";

export default class BaseInput extends PureComponent {
  getCaret = () => {
    return this.input.selectionStart;
  };
  updateCaret = (start, end) => {
    setTimeout(() => {
      this.input && this.input.setSelectionRange(start, end);
    }, 0);
  };
  focus() {
    this.input && this.input.focus();
  }
  onPressEnter = e => {
    e.preventDefault();
    const { onItemFinish, focusItem } = this.props;
    onItemFinish(focusItem);
  };
  onPressBack = () => {};
  onPressDown = () => {
    const { options, focusItem, setFocusItem } = this.props;

    if (!options) return;

    const currentIndex = focusItem
      ? options.findIndex(item => item.value === focusItem.value)
      : 0;

    if (currentIndex >= options.length - 1 && focusItem) return;

    const nextIndex = focusItem ? currentIndex + 1 : 0;
    const nextItem = options[nextIndex];

    this.updateCaret(this.getCaret(), this.getCaret());

    setFocusItem(nextItem);
  };
  onPressUp = () => {
    const { options, focusItem, setFocusItem } = this.props;

    if (!options) return;

    const currentIndex = focusItem
      ? options.findIndex(item => item.value === focusItem.value)
      : 0;

    if (currentIndex === 0) return;

    const prevItem = options[currentIndex - 1];

    this.updateCaret(this.getCaret(), this.getCaret());
    setFocusItem(prevItem);
  };
  onInputKeyDown = e => {
    const { showOption, focusItem } = this.props;
    e.stopPropagation();

    if (!showOption) {
      // 无选中内容时，回车等于搜索
      if (e.keyCode === 13) {
        this.props.onSearch();
        return e.preventDefault();
      }
      return;
    }

    if (e.keyCode === 13 || e.keyCode === 9) {
      // 无选中内容时，回车等于搜索
      if (!focusItem) {
        e.preventDefault();
        if (e.keyCode === 13) {
          this.props.onSearch();
        }
        return;
      }
      return this.onPressEnter(e);
    }
    if (e.keyCode === 8) {
      return this.onPressBack();
    }
    if (e.keyCode === 38) {
      e.preventDefault();
      return this.onPressUp();
    }
    if (e.keyCode === 40) {
      e.preventDefault();
      return this.onPressDown();
    }
  };
  onInputFocus = () => {
    const { setFocus } = this.props;
    setFocus(true);
  };

  onInputBlur = () => {
    const { setFocus } = this.props;
    setFocus(false);
  };

  clearValue = () => {
    console.log('clear');
  };

  handleChange = e => {
    const { onInputChange } = this.props;
    onInputChange(e.target.value);
    // setCursorIndex(0);
  };

  onClear = () => {
    this.props.onInputChange('');
    this.onInputFocus();
    this.props.setFocusItem(null);
  };

  onClick = e => {
    this.props.onInputChange(e.target.value);
  };

  getHeight = () => {
    const { currentValue } = this.props;
    const length = get(currentValue, 'length');
    if (!this.input || length < 100) return 32;

    const fontSize = '14px';
    const fontFamily = 'Arial';
    const width = window.getComputedStyle(this.input).width;

    var span = document.createElement('span');

    // span.style.visibility = "hidden";
    span.style.fontSize = fontSize;
    span.style.fontFamily = fontFamily;
    span.style.display = 'block';
    span.style.width = parseInt(width) - 38 - 48 + 'px';
    span.style.lineHeight = '20px';

    document.body.appendChild(span);
    if (typeof span.textContent != 'undefined') {
      span.textContent = currentValue;
    } else {
      span.innerText = currentValue;
    }
    const height = parseFloat(window.getComputedStyle(span).height);

    span.remove();

    return height + 12;
  };

  render() {
    const { currentValue, valid } = this.props;

    const height = this.getHeight();
    const hasValue = trim(currentValue);

    return (
      <div className="smart-input-value">
        <Icon
          className="smart-input-status"
          link={valid ? iconRight : iconError}
        />
        <textarea
          style={{ height }}
          className="input textarea"
          type="textarea"
          ref={input => (this.input = input)}
          value={currentValue}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          onChange={this.handleChange}
          onKeyDown={this.onInputKeyDown}
        />
        <Item show={hasValue}>
          <Icon
            fill="#d6d6d6"
            onClick={this.onClear}
            className="clear-icon"
            link={clearIcon}
          />
        </Item>
      </div>
    );
  }
}
