# 部署与宿主项目接入

## 推荐发布哪个目录

`dist/` 已经包含发布所需的全部多文件资源。把它作为静态站点的根目录即可，不需要生产后端或运行 Python。

有个人项目时，优先把 `dist/` 的内容放进现有项目的静态资源子目录，例如 `public/games/dream-campus/`。让现有托管和构建流程原样继续使用；不要为了这一个游戏重建全站。

发布内容只有：`index.html`、`styles.css`、`config.js`、`src/`、`assets/`。测试、文档、示例组件、开发服务器不属于运行依赖。

## 直接链接 vs iframe

直接链接最省事，游戏可以使用整个视口，适合在个人作品页加“开始游戏”。iframe 适合保留个人站导航，不会让游戏 CSS 与宿主全局样式互相污染。

```html
<a href="/games/dream-campus/index.html">进入水课梦魇</a>
<!-- 或者 -->
<iframe src="/games/dream-campus/index.html" title="水课梦魇"
  style="display:block;width:100%;height:calc(100dvh - 72px);min-height:420px;border:0"
  allow="autoplay"></iframe>
```

上面的根路径是假定宿主部署在域名根。项目有子路径时，使用已有的 basePath / BASE_URL 生成该路径，不要盲目复制绝对路径。

## 常见集成问题

**打开游戏只有封面或黑屏：** 检查 `src/*.js` 是否真的返回 JavaScript。部分 SPA 回退会把不存在的文件路径返回为宿主首页 HTML，此时 HTTP 200 也不代表资源正确。

**点击入口弹出下载：** 检查托管的 HTML Content-Type 与 Content-Disposition；本地则保存文件后用浏览器打开，不要在编辑器的纯文本预览里玩。

**静音：** 音频要先有用户点击/触摸；游戏已在按钮和射击输入中尝试解锁 AudioContext。也检查设置里的音量和音乐开关。没有依赖远程 mp3。

**iframe 内按键不响应：** 先点击游戏画布，让键盘焦点进入 iframe；不要让宿主在全局拦截 WASD、空格或 Tab。

**存档丢失：** 协议、域名、端口、浏览器配置和存储前缀可能形成不同的本地存储空间。`file://` 即玩版和线上站点不要假定自动共享存档；用设置中的导出/导入迁移。隐私窗口、清理站点数据、第三方 iframe 存储限制等环境不能承诺持久保存。

**修改后还是旧内容：** 先重新执行 `python tools/build.py`，再发布 `dist/`；检查托管缓存。不要只改源文件而上传旧构建目录。

## CSP 与资源约束

运行期没有 fetch、XHR、WebSocket、外部字体、远程图片和远程音乐。小图标由内嵌 SVG 转为 data URL；证书导出使用 Blob URL。宿主的严格 CSP 至少要允许游戏自身脚本、样式和 `img-src 'self' data:`，并允许本游戏动态样式。单文件版含内联脚本/样式，极严格禁止 inline 的 CSP 下不适合作为发布版本。

不要为了游戏把整个站的安全策略全部关闭。严格 CSP 项目应使用多文件版，并由宿主工程师按其规则配置 nonce / hash 或重构必要动态样式。本版不声称已适配所有严格 CSP 部署。

## 可选跨窗口结算通知

默认不发送跨窗口消息。`config.js` 的 `parentOrigin` 必须是明确的精确 origin，例如你自己站点的协议+域名+可选端口，不接受 `*`。父窗口同时校验 `event.origin`、`event.source` 和 `data.game`。

这只是一种 UI 通知，不是可信的服务器成绩。不要把浏览器发来的分数当成防作弊凭据。

## 真实发布的停止条件

本包已经构建、可本地运行，但尚未替你发布到个人项目。宿主没有提供时，最多只能交付文件和集成参考。Codex 应在具备真实仓库和发布权限后，复用你的现有部署流程，并报告实际线上路径和验证结果。
