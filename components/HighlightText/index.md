# HighlightText 文本高亮

## 说明

高亮文本

- 支持高亮多组文本
- 忽略大小写
- 可自定义高亮样式
- 支持简单的多层级文本高亮

## API

| Name           | Type                 | Default                                                              | Description        |
| :------------- | :------------------- | :------------------------------------------------------------------- | :----------------- |
| keywords       | String/Array(String) | ''                                                                   | 必填. 要高亮的文本 |
| highlightStyle | Object(StyleSheet)   | { color: '#ffa22d', backgroundColor: '#feffe6', padding: '0 0.2em' } | 高亮的样式         |
| ignoreCase     | Boolean              | true                                                                 | 忽略大小写         |
