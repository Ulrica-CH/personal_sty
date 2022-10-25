import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function getTextSize(options) {
  const { text, style = {}, el } = options;
  console.log(el, text, 'elele');
  var width = 0;
  var height = 0;
  var div = document.createElement('div');
  div.className = 'getTextSize';
  div.innerText = text;
  var cssText = '';
  for (let key in style) {
    cssText += `${key}: ${style[key]}; `;
  }
  cssText += 'display: inline-block;';
  cssText += 'word-break: break-all;';
  div.style.cssText = cssText;
  el.current.appendChild(div);
  width = document.querySelector('.getTextSize').offsetWidth;
  height = document.querySelector('.getTextSize').offsetHeight;
  document.querySelector('.getTextSize').remove();

  var lineHeighDiv = document.createElement('div');
  var lineHeight = 0;
  lineHeighDiv.className = 'getLineHeight';
  lineHeighDiv.innerText = '糖';
  el.current.appendChild(lineHeighDiv);
  lineHeight = document.querySelector('.getLineHeight').offsetHeight;
  document.querySelector('.getLineHeight').remove();

  var textSpan = document.createElement('span');
  var textWidth = 0;
  textSpan.className = 'getTextWidth';
  textSpan.innerText = text;
  document.querySelector('body').appendChild(textSpan);
  textWidth = document.querySelector('.getTextWidth').offsetWidth;
  document.querySelector('.getTextWidth').remove();

  return {
    width,
    height,
    lineHeight,
    textWidth
  };
}

export default function Truncate(props) {
  const {
    children,
    less = '收起',
    more = '展开',
    defaultExpand = false,
    canReadMore = true,
    line = 999
  } = props;

  const [isShow, setIsShow] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [textWrapperWidth, setTextWrapperWidth] = useState(0);
  const boxWrapper = useRef();

  useEffect(() => {
    canReadMore && setIsShow(defaultExpand);
  }, [defaultExpand]);

  useEffect(() => {
    if (boxWrapper.current !== undefined && children) {
      const boxWrapperWidth = boxWrapper.current.offsetWidth;
      console.log(boxWrapperWidth, 'wrapperWidthwrapperWidth');
      const { width, height, lineHeight, textWidth } = getTextSize({
        text: children,
        style: {},
        el: boxWrapper
      });
      if (height <= line * lineHeight) {
        // setMaxHeight(height);
        setIsComplete(true);
      } else {
        setIsComplete(false);
      }
      if (line === 1 && textWidth <= boxWrapperWidth) {
        setTextWrapperWidth(textWidth);
      } else {
        setTextWrapperWidth(boxWrapperWidth);
      }
    }
  }, [boxWrapper, children]);

  return (
    <>
      <div className="wrapper" ref={boxWrapper}>
        <div
          className="text"
          style={{
            WebkitLineClamp: isShow || isComplete ? 999 : line,
            width: textWrapperWidth
          }}
        >
          {!isComplete && canReadMore ? (
            <div className="moreBtn" onClick={() => setIsShow(!isShow)}>
              {isShow ? less : more}
            </div>
          ) : (
            ''
          )}
          {children}
        </div>
      </div>
    </>
  );
}

Truncate.propTypes = {
  /** 是否默认展开 */
  defaultExpand: PropTypes.bool,
  /** 超过多少行开始截断 */
  line: PropTypes.number,
  /** 展开的提示 */
  more: PropTypes.node,
  /** 收起的提示 */
  less: PropTypes.node,
  /** 是否可以展开收起 */
  canReadMore: PropTypes.bool
};
Truncate.defaultProps = {
  line: 1,
  more: '展开',
  less: '收起',
  canReadMore: true,
  defaultExpand: false
};
