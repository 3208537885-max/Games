# 本次实际测试报告

这份报告只记录已执行的测试，不把开发捷径当成玩家通关。

## 环境与结果

- Python：3.13.5；Node：v22.16.0；实际运行浏览器为系统 Chromium（无头模式）。
- 无 DOM 核心/模拟：**22 组通过 / 0 组失败**，共 429,585 次断言。
- 真实浏览器 UI/输入：**48 项通过 / 0 项失败**，已测路径无未捕获 JavaScript 错误。
- 发布完整性与本地 HTTP：**59 项通过 / 0 项失败**。
- 伤害实验：48 件武器 × 两个距离 × 每场 30 秒；结果见 `BALANCE.md` 和 JSON/CSV。

## 口径，尤其是没有测到的内容

浏览器环境的管理策略阻止直接 URL 导航。因此浏览器用 Playwright `set_content` 读取本包真实 `standalone.html` 字节，执行相同的 JS/CSS/SVG，而不是只渲染截图。原生 DOM、Canvas、键盘、触屏输入与动画都真实运行。

存档交互测试用内存 Web Storage 替身，另有本地存储不可用时的降级用例；不能据此声称原生磁盘持久化、跨域 iframe 存储或实际个人站的路由已经全部验证。另通过本地 HTTP 逐一取回发布资源并检查字节及 JS MIME，但这不等于浏览器在用户域名上完成了上线验收。

“三次完整流程”由测试驱动正常房门、波次、章节传送和最终结局，但使用测试辅助清除敌人，不是报告三次无作弊的人类通关。Boss 三阶段还单独运行了实际攻击模拟。终局浏览器画面同样使用测试入口直达 Boss，以减少重复跑图，不证明首局正常难度体验已经经过玩家长测。

触屏在 390×844 与 844×390 两种 Chromium 视口中通过 CDP 发送真实触摸事件，验证摇杆改变位置和技能按钮触发冷却；不是 iPhone/Safari 或 Android 实机认证。React/Vue 容器是参考文件，没有用户宿主工程可供编译或发布。

## 核心与模拟测试详情

| 测试 | 结果 |
|---|---|
| Content: 48 unique weapons, 28 relics, 8 synergies, 13 attack behaviors | PASS |
| Seeded maps: 1,500 floors, unique cells, connected graph, guaranteed special rooms | PASS |
| Interior navigation: 450 generated layouts preserve a connected walkable field | PASS |
| Movement and rays: dash cannot tunnel through a thin prop; room bounds clip rays | PASS |
| Loot: deterministic pools; graduation weapon stays locked until a win | PASS |
| Synergies require two separate tags; stat ceilings and +3 upgrade ceiling | PASS |
| Pause freezes all gameplay clocks and player coordinates | PASS |
| Focus recovery, drinking, dash immunity, and per-slot fire cooldowns | PASS |
| All 48 weapons create real damage with their actual engine behavior | PASS |
| Beam and very fast projectiles hit front targets but not through cover | PASS |
| Water/electric interaction applies 35% bonus; boss stun has a short cap | PASS |
| Visual settings do not alter combat RNG or critical damage | PASS |
| Treasure pickup is transactional and cannot be claimed twice | PASS |
| Shops do not charge for full-health healing; sold items and upgrade cap persist | PASS |
| All eight event branches execute; costs and HP payments stay valid | PASS |
| Room-boundary save rolls an unfinished battle back; cleared rooms do not respawn | PASS |
| Meta upgrades are snapshotted per run, not retroactively added to an old checkpoint | PASS |
| Malformed metadata is sanitized; malformed checkpoints fail safely | PASS |
| Each boss executes all three phases without non-finite entities | PASS |
| Summon and particle limits hold in a 90-second stress simulation | PASS |
| Complete seeded campaigns: doors, 3 bosses, portals, final cinematic, once-only rewards | PASS |
| Death, one-time revive, and capped permanent upgrades are consistent | PASS |

地图批测使用 500 个种子 × 3 章 = 1,500 张楼层图，检查连通、坐标唯一、双向门、首领可达和五种支路。室内通路另测 150 个种子 × 3 章 = 450 个布局，检查流场中可通行格连通及入门点可用。随机批测是样本验证，不是假设穷尽全部种子。

## 浏览器测试详情

| 测试 | 结果 |
|---|---|
| No-storage fallback boots and offers a playable game | PASS |
| No-storage fallback renders the arena | PASS |
| Desktop home has no horizontal overflow | PASS |
| Original cover SVG is decoded | PASS |
| Start button enters the four-page prologue | PASS |
| Prologue ends in the first chapter | PASS |
| Keyboard WASD actually moves the character | PASS |
| Weapon hotkeys switch slots | PASS |
| Escape pauses simulation and opens a modal | PASS |
| Map hotkey opens the explored-room map | PASS |
| Inventory hotkey opens the build screen | PASS |
| Combat room actually spawns a wave | PASS |
| Autofire toggle creates real projectiles | PASS |
| Relic choice displays three unique options | PASS |
| Relic choice applies and resumes | PASS |
| Weapon replacement applies the selected item | PASS |
| Shop upgrade debits currency and persists +1 | PASS |
| Returning home exposes the checkpoint Continue button | PASS |
| Continue reloads the room and the upgraded weapon | PASS |
| Catalog initially contains all 48 implemented weapons | PASS |
| Catalog search filters actual content | PASS |
| Settings checkbox changes the live audio setting | PASS |
| Save export/import transaction keeps a valid checkpoint | PASS |
| Public weapon API accepts a new definition | PASS |
| Public API rejects invalid definitions | PASS |
| Principal encounter opens its own boss introduction | PASS |
| Principal changes into the third phase | PASS |
| Boss defeat starts an actual victory animation | PASS |
| Victory reaches the three-page return-to-reality epilogue | PASS |
| Results show score, inspiration and graduation reward | PASS |
| Graduation reward is unlocked exactly once | PASS |
| Certificate button generates a self-contained SVG | PASS |
| Ending returns to a working menu with graduation selection | PASS |
| Desktop final menu retains layout | PASS |
| Destroy API stops and removes debug instance | PASS |
| mobile-portrait home overflow | PASS |
| mobile-portrait displays both touch joysticks | PASS |
| mobile-portrait arena overflow | PASS |
| mobile-portrait touch joystick changes player position | PASS |
| mobile-portrait touch skill button actually fires | PASS |
| mobile-portrait reward buttons remain reachable | PASS |
| mobile-landscape home overflow | PASS |
| mobile-landscape displays both touch joysticks | PASS |
| mobile-landscape arena overflow | PASS |
| mobile-landscape touch joystick changes player position | PASS |
| mobile-landscape touch skill button actually fires | PASS |
| mobile-landscape reward buttons remain reachable | PASS |
| No uncaught JavaScript errors in tested browser paths | PASS |

## 过程中实际发现并修正的项

局外升级影响旧存档的问题改为新局成长快照；视觉随机流与战斗随机流隔离；全血购买治疗不扣款；奖励确认与商店售出保持幂等；原地爆炸碎片不再重复放大单目标伤害；搜索框聚焦时 Escape 现在能关闭图鉴；触屏控件移至画布外的空余区域；Boss 活动高度避开血条；敌人弹丸命中覆盖可见躯干，不只看脚下小圆。

## 如何复现

```bash
node tests/core.test.cjs
node tests/balance.cjs
python tools/build.py
python tests/browser.test.py
python tools/verify_delivery.py --base-url http://127.0.0.1:8787
```

最后一条需要本地 `tools/serve.py` 已启动。浏览器测试需要 QA 环境已有 Playwright 与 Chromium；源码中的浏览器路径为本次环境，可按自己的安装位置调整。游戏用户不需要这些测试依赖。

测试的 JSON、日志和实际浏览器截图在 `tests/artifacts/`。证书样本也在该目录，其成绩来自测试用例，不是玩家正式战绩。

## 尚未执行

没有进入用户个人项目，没有执行其构建命令，没有连接其托管账号，没有推送其仓库，没有公开上线。没有长期玩家留存或通关率数据，没有负载/联网安全测试，也没有真实手机性能矩阵。