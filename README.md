# 小游戏大合集

一个无需构建工具、可持续加入新作品的静态游戏库。根目录 `index.html` 是游戏目录页；每个游戏使用自己的子目录和 `index.html` 入口。

## 目录结构

```text
.
|-- index.html             # 游戏目录页
|-- changelog/
|   `-- index.html         # 横向时间线更新日志
|-- matches/
|   `-- index.html         # 联机对局记录
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
    `-- 2048-versus/
        `-- index.html     # 双人 2048 限时竞速
    `-- dream-campus/
        `-- index.html     # 水课梦魇
    `-- unwritten-years/
        `-- index.html     # 未完的四年 · 上大
```

当前单人游戏包括俄罗斯方块、2048、贪吃蛇、打砖块、水课梦魇和未完的四年 · 上大；游戏页面都支持桌面操作，并针对手机触屏做了响应式适配。

多人游戏目前提供双人 2048 限时竞速。登录玩家创建房间后会获得一个可分享链接；另一位玩家打开链接并填写显示名称即可匿名加入。双方就绪后由房主开始 90 秒比赛，棋盘、成绩和结束状态会同步。结束后的双方得分与胜负会保存在 `matches/` 对局记录页。

## 新增游戏

1. 在 `games/` 下新建游戏目录，例如 `games/my-game/`。
2. 将该游戏的入口页面命名为 `index.html`。
3. 在根目录 `index.html` 的 `.game-grid` 内，复制一张游戏卡片并将链接替换成 `games/my-game/`。

## 本地运行

直接双击根目录 `index.html`，或在项目目录启动任意静态文件服务器。游戏页面可通过目录页进入。

## 登录和排行榜

项目使用 Supabase Auth 和数据库保存账号与最高分。玩家只填写用户名和密码：页面会在后台将用户名映射为内部登录标识，邮箱不会显示、收集或用于登录。首次配置时，在 Supabase SQL Editor 运行根目录的 `supabase-setup.sql`，然后在 Authentication 设置中将站点地址配置为 GitHub Pages 地址。

在 Supabase Dashboard 依次打开 `Authentication`、`Providers`、`Email`，关闭 `Confirm email` 和 `Secure email change`。前者让用户名注册后可立即登录，后者让改用户名时不需要确认内部邮箱。

启用联机功能后，也需要重新运行最新版 `supabase-setup.sql`。其中会创建联机房间和玩家表，并将它们加入 Supabase Realtime publication；若 SQL Editor 提示没有权限修改 publication，请在 Database 的 Replication 页面手动勾选 `multiplayer_rooms` 和 `multiplayer_players`。

俄罗斯方块使用 `tetris` 作为 `game_slug`；水课梦魇剧情模式仅供练习，无限模式使用 `difficulty = 'infinite'` 进入专属排行榜和首页总积分榜。新增游戏时，为排行榜请求使用新的 slug，并复用 `submit_score` RPC。修改 `supabase-setup.sql` 后需要在 Supabase SQL Editor 重新运行一次，才能启用无限模式成绩。

反应速度测试在浏览器本机保留最近成绩；只有完成一组五次平均才会进入其排行榜。首页总积分榜统计俄罗斯方块、2048、打砖块、水课梦魇的标准难度与贪吃蛇高速成绩：每项当前第一名为 100 分，其余玩家按自己的分数与第一名分数的比例换算并累计；反应速度不参与总积分。已登录玩家每完成一局游戏，主页的累计完成局数会加一。

## 版本规则

当前版本线从 `0.1` 开始。日常功能与体验更新只递增 `0.1.n` 的末位数字，例如 `0.1.1`、`0.1.2`；升级到 `0.2` 或更高版本必须由项目所有者决定。
