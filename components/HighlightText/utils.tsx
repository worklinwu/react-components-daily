import React, { CSSProperties, ReactNode } from 'react';

export type PropsIncludeChildren = {
  props: {
    children: [] | string | ReactNode;
  };
};

const regAtom = '^\\$.\\*+-?=!:|\\/()[]{}';

/**
 * 关键词高亮
 * @param {string} text 需要匹配的文本
 * @param {string|string[]} keywords 关键词
 * @param {object} highlightStyle 高亮样式
 * @param {boolean} ignoreCase 忽略大小写
 */
export const highlightText = (
  text: string,
  keywords: string | string[],
  highlightStyle?: CSSProperties,
  ignoreCase?: boolean
): string | ReactNode => {
  let keywordRegExp;
  if (!text) {
    return '';
  }
  // 把字符串类型的关键字转换成正则
  if (keywords) {
    if (keywords instanceof Array) {
      if (keywords.length === 0) {
        return text;
      }
      keywordRegExp = new RegExp(
        (keywords as string[])
          .filter(item => !!item)
          .map(item => (regAtom.includes(item) ? '\\' + item : item))
          .join('|'),
        ignoreCase ? 'ig' : 'g'
      );
    } else if (typeof keywords === 'string') {
      keywordRegExp = new RegExp(keywords, ignoreCase ? 'ig' : 'g');
    }
  }
  if (text && keywordRegExp) {
    const newData = text.split(keywordRegExp); //  通过关键字的位置开始截取，结果为一个数组
    // eslint-disable-next-line
    const matchWords = text.match(keywordRegExp); // 获取匹配的文本
    const len = newData.length;

    return (
      <>
        {newData.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            {item}
            {index !== len - 1 && <mark style={highlightStyle}>{matchWords?.[index]}</mark>}
          </React.Fragment>
        ))}
      </>
    );
  }
  return text;
};

// 递归子组件
export const highlightChildComponent = (
  item: PropsIncludeChildren,
  keywords: string | [],
  highlightStyle: CSSProperties,
  ignoreCase: boolean
) => {
  if (typeof item === 'string') {
    return highlightText(item, keywords, highlightStyle, ignoreCase);
  }
  // children 如果是文本, item.props.children 会等于 'string'
  if (item.props?.children && typeof item.props?.children === 'string') {
    const newItem = { ...item };
    newItem.props = {
      ...newItem.props,
      children: highlightText(newItem.props.children as string, keywords, highlightStyle, ignoreCase)
    };
    return newItem;
  }
  // 如果还有其他元素, 会返回一个数组, 遍历做判断
  if (item.props?.children && item.props?.children instanceof Array) {
    const newItem = { ...item };
    newItem.props = {
      ...newItem.props,
      children: item.props?.children.map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {highlightChildComponent(child as PropsIncludeChildren, keywords, highlightStyle, ignoreCase)}
        </React.Fragment>
      ))
    };
    return newItem;
  }
  return item;
};
