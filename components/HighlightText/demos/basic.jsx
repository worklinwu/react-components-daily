import React, { useCallback, useState } from 'react'
import HighlightText from '../index';

export default function Basic() {
    const [, forceUpdate] = useState();
    const clickFn = useCallback(() => {
        forceUpdate({});
    }, [])
    return (
        <>
            <button onClick={clickFn}>强制刷新页面, 测试 HighlightText 组件会不会被刷新</button>
            <ul>
                <li>
                    <HighlightText keywords={['1', 'a']}>匹配不到文本的情况正常显示</HighlightText>
                </li>
                <li>
                    <HighlightText keywords={['foo', 'bar']}>多关键字匹配, 例如 xxxfooxxxbar</HighlightText>
                </li>
                <li>
                    <HighlightText keywords={['a', 'c']}>忽略大小写, 例如 ABCDabcd</HighlightText>
                </li>
                <li>
                    <HighlightText keywords={['^', ']']}>正则测试: ^\$.\*+-?=!:|\/()[]{}</HighlightText>
                </li>
                <li>
                    <HighlightText
                        keywords="样式"
                        highlightStyle={{ color: '#f55', backgroundColor: 'rgba(0,0,0,.1)' }}
                    >
                        自定义高亮样式
                    </HighlightText>
                </li>
                <li>
                    <HighlightText keywords="ron">
                        多层级
                        <div>
                            div
                            <strong>strong</strong>
                        </div>
                    </HighlightText>
                </li>
            </ul>
        </>
    );
}
