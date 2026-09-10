# Arcade Archive

一个无需构建工具、可持续加入新作品的静态游戏库。根目录 `index.html` 是游戏目录页；每个游戏使用自己的子目录和 `index.html` 入口。

## 目录结构

```text
.
|-- index.html             # 游戏目录页
|-- assets/
|   `-- reaction-cover.png # 反应速度封面
`-- games/
    `-- 2048/
        `-- index.html     # 2048
    `-- breakout/
        `-- index.html     # 打砖块
    `-- snake/
        `-- index.html     # 贪吃蛇
    `-- tetra/
        `-- index.html     # 俄罗斯方块
    `-- reaction/
        `-- index.html     # 反应速度测试
```

当前单人游戏包括俄罗斯方块、2048、贪吃蛇和打砖块；游戏页面都支持桌面操作，并针对手机触屏做了响应式适配。

## 新增游戏

1. 在 `games/` 下新建游戏目录，例如 `games/my-game/`。
2. 将该游戏的入口页面命名为 `index.html`。
3. 在根目录 `index.html` 的 `.game-grid` 内，复制一张游戏卡片并将链接替换成 `games/my-game/`。

## 本地运行

直接双击根目录 `index.html`，或在项目目录启动任意静态文件服务器。游戏页面可通过目录页进入。

## 登录和排行榜

项目使用 Supabase Auth 和数据库保存账号与最高分。首次配置时，在 Supabase SQL Editor 运行根目录的 `supabase-setup.sql`，然后在 Authentication 设置中将站点地址配置为 GitHub Pages 地址。

俄罗斯方块使用 `tetris` 作为 `game_slug`。新增游戏时，为排行榜请求使用新的 slug，并复用 `submit_score` RPC。

反应速度测试目前将最近 20 次成绩保存在浏览器本机，后续可以接入同一套 Supabase 排行榜。
