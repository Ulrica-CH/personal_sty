import { Icon, Popover, Tooltip } from '@';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Label from '../Label';
import React, { useState, useRef, useEffect, Fragment } from 'react';
import ContainerDimensions from 'react-container-dimensions';
// import { icons } from './svg'
import { map, drop, slice, isEmpty } from 'lodash';
import { config } from '../../common/config';

export default function TruncateTip(props) {
  const {
    list,
    ItemRender,
    hasOne,
    trigger,
    className = '',
    prefixCls,
    emptyContent,
    afterContent
  } = props;
  const prefix = prefixCls || config.prefixCls;

  // if (!list || isEmpty(list)) {
  //   return (
  //     <div className="">
  //       {emptyContent}
  //       {afterContent}
  //     </div>
  //   );
  // }

  const computerRef = useRef(null);
  const [computerChild, setComputerChild] = useState([]);
  useEffect(() => {
    if (computerRef?.current?.childNodes) {
      let arr = [];
      computerRef?.current?.childNodes.forEach(x => {
        arr.push(x.offsetLeft + x.offsetWidth);
      });
      setComputerChild(arr);
    }
  }, [list]);

  return (
    <div className={`${prefix}truncate-tip ${className}`}>
      <ContainerDimensions>
        {arg => {
          let showNum = 0;
          for (let i = 0; i < computerChild.length; i++) {
            if (
              arg.width - (computerChild.length === 1 ? 0 : 40) >
              computerChild[i]
            ) {
              showNum = i + 1;
            } else {
              break;
            }
          }
          if (hasOne && !showNum) showNum = 1;
          return (
            <Fragment>
              {!list || isEmpty(list) ? emptyContent : null}
              {map(slice(list, 0, showNum), (item, index) => (
                <ItemRender
                  key={JSON.stringify(item) || index}
                  index={index}
                  item={item}
                />
              ))}
              {list[showNum] ? (
                <Popover
                  trigger={trigger}
                  content={
                    <div className="pop-box">
                      {map(drop(list, showNum), (item, index) => (
                        <ItemRender
                          key={JSON.stringify(item) || index}
                          index={index}
                          item={item}
                        />
                      ))}
                    </div>
                  }
                >
                  <div className={`${prefix}has-num`}>
                    +{computerChild.length - showNum}
                  </div>
                </Popover>
              ) : null}
              {afterContent}
            </Fragment>
          );
        }}
      </ContainerDimensions>
      <div className="computer-width" ref={computerRef}>
        {map(list, (item, index) => (
          <ItemRender
            key={JSON.stringify(item) || index}
            index={index}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

TruncateTip.defaultProps = {
  ItemRender: props => (
    <Label className="mgr5" mini>
      {props.item}
    </Label>
  ),
  hasOne: false,
  trigger: 'hover'
};
TruncateTip.propTypes = {
  /** 需要展示的数组 */
  list: PropTypes.any,
  /** 展示收起部分的触发方式 */
  trigger: PropTypes.oneOf(['hover', 'click']),
  /** 是否始终保底显示一个 */
  hasOne: PropTypes.bool,
  /**子项元素结构 */
  ItemRender: PropTypes.any,
  /** 数据为空时的内容 */
  emptyContent: PropTypes.element
};
