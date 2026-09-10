# Arcade Archive

一个无需构建工具、可持续加入新作品的静态游戏库。根目录 `index.html` 是游戏目录页；每个游戏使用自己的子目录和 `index.html` 入口。

## 目录结构

```text
.
|-- index.html             # 游戏目录页
`-- games/
    `-- tetra/
        `-- index.html     # 俄罗斯方块
```

## 新增游戏

1. 在 `games/` 下新建游戏目录，例如 `games/my-game/`。
2. 将该游戏的入口页面命名为 `index.html`。
3. 在根目录 `index.html` 的 `.game-grid` 内，复制一张游戏卡片并将链接替换成 `games/my-game/`。

## 本地运行

直接双击根目录 `index.html`，或在项目目录启动任意静态文件服务器。游戏页面可通过目录页进入。
