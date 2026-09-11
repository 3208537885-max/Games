# 架构与后续扩展接口

## 不依赖宿主框架的边界

游戏本体是顺序加载的经典脚本，统一挂在 `window.DC` 命名空间。`window.DreamCampus` 是建议宿主使用的只读接口对象。页面不需要 npm、CDN 或打包器；这样双击本地文件与复制静态目录都能工作。

脚本顺序：`config.js → data.js → core.js → game.js → art.js → renderer.js → audio.js → ui.js → main.js`。新增源文件应明确加入 `index.html`；打包器按实际 script 顺序自动内嵌。

游戏模拟与 DOM 分开：`Game` 在 Node 下也能实例化；UI 通过回调显示对话框；Renderer 读取模拟状态绘制，不决定奖励和伤害。程序音频单独管理，首次手势后启动。

主循环为 requestAnimationFrame 渲染 + 固定 1/60 秒模拟步长。长帧最多消化 9 步，避免页面恢复后无界追赶。隐藏标签页和失去焦点会暂停。画布逻辑坐标固定为 1152×720，CSS 尺寸与设备像素比由渲染层处理。

## 主要文件职责

| 文件 | 修改范围 |
|---|---|
| `data.js` | 武器、品质、角色、遗物、羁绊、敌人、章节与奇遇文案/数值 |
| `core.js` | RNG、房间图、障碍布局、碰撞、流场、属性计算、存储 |
| `game.js` | 玩家、敌人、Boss、攻击行为、交易、掉落、状态转换、持久化 |
| `art.js` | SVG 图标和 Canvas 角色造型 |
| `renderer.js` | 场景缓存、绘制顺序、特效、房间交互物、迷你地图 |
| `audio.js` | 合成器音效与分章节节奏 |
| `ui.js` | 所有 HTML 面板、设置、图鉴、结局、导入导出 |
| `main.js` | 输入、触屏、生命周期、对外 API 和精确 origin 事件 |

## 内容修改：优先走数据表

武器表当前采用紧凑数组声明，再展开为对象。不要改变各列位置：

```js
// id, 名称, 品质(0..5), 行为, 单发基数, 开火间隔秒,
// 每次开火耗能, 弹速, 标签, 图标 id, 描述, 额外参数
['waterbook','水课课本',0,'shot',9,0.20,0,540,'water','book',
 '知识没进脑子，水先喷出来了。',{wet:2,spread:0.045,life:0.9}]
```

品质倍率和升级倍率在伤害计算时应用，不要重复乘进 `damage`。散射的 damage 是每颗弹丸，不是整次扳机；连发同理。炮台的 damage 是炮台单发；环绕是一次接触伤害。CSV 木桩报告才是指定条件下的每秒伤害，不要把目录卡片的“基础伤害”当成 DPS。

默认支持 `shot / spread / burst / beam / homing / lob / boomerang / melee / wave / chain / orbit / turret / mine`。标签为 `water / food / geo / study / tech / daily / electric`。现有参数示例见 `data.js` 同类型条目。

添加遗物时，效果优先使用已有 mods 键；新键不会自动变成新机制，必须在模拟中消费它并补回归。羁绊按两个武器槽标签的多重集匹配，双地质必须真的有两个地质标签。

## 公开 API

页面加载后可访问：

```js
window.DreamCampus.version;
DreamCampus.start({seed:'MY-SEED',character:'geo',difficulty:'normal',skipStory:true});
DreamCampus.pause();
DreamCampus.resume();
const state = DreamCampus.getState(); // JSON 克隆，不是可变的引擎引用
const content = DreamCampus.getContent();
DreamCampus.setSetting('autoFire', true);
const unsubscribe = DreamCampus.on('run:end', result => console.log(result));
unsubscribe();
const backup = DreamCampus.exportSave();
// 仅主菜单可导入；不兼容文件会拒绝，失败时恢复原保存内容。
DreamCampus.importSave(backup);
// 页面销毁时使用。停止循环、监听、音频并清理资源，不会删除玩家存档。
DreamCampus.destroy();
```

`start()` 会开始新局；宿主直接调用它时应自行确认是否替换旧检查点。内置开始按钮已经有确认提示。`destroy()` 是终止而不是临时暂停，销毁后重新挂载请重新加载游戏页面。

状态包含模式、种子、难度、角色、章节、房间、生命/盾/专注、装备、遗物、羁绊、币、击败数、清房数和 Boss 摘要；不会交出游戏类的可变引用。

### 注册新武器

适用于宿主插件或开发实验。正式内容仍建议直接编辑 `data.js`，以保证读档前已注册。

```js
DreamCampus.registerWeapon({
  id:'library_watergun',name:'图书馆禁声水枪',rarity:2,type:'shot',
  damage:20,interval:0.35,energy:3,speed:600,
  tag:'water',icon:'book',description:'安静但不温柔。',wet:2,life:1,pierce:1
});
```

ID 不可重复，基础数值、标签、品质、弹丸数量和寿命会做边界检查。注册后会出现在对应随机池与图鉴。自定义武器存档需要下次加载时仍注册同一个 id，否则存档会拒绝该物品。

### 注册新的攻击行为

```js
DreamCampus.registerAttackBehavior('double_water',
  ({game,weapon,origin,angle,aim}) => {
    // weapon.damage 已含本次开火的品质/升级/属性倍率。
    // 此函数不应再次扣能量或重复乘全局伤害。
    game.createBullet({...weapon,type:'shot'}, origin, angle - 0.06);
    game.createBullet({...weapon,type:'shot'}, origin, angle + 0.06);
  }, '双束水流');
```

随后注册 `type:'double_water'` 的武器。基础开火调度负责耗能、冷却、音效和枪口效果；行为只实现这一发。异步发射使用 `game.schedule(delay, callback, owner, friendly)`，不要用真实时间 setTimeout 绕开暂停。新行为必须遵守弹丸/召唤物上限并在 Node 模拟中验证。

### 替换渲染，不动玩法

```js
const remove = DreamCampus.registerRenderer('player', (ctx, player, game, time) => {
  // 使用逻辑坐标绘制，返回 true 表示完全替代默认绘制。
  // 不替代时返回 false，默认绘制仍执行。
  return false;
});
remove();
```

支持 `player / enemy / bullet / prop`。hook 中自己平衡 `ctx.save()/restore()`，不要修改模拟状态；绘制异常会触发错误提示而停止主循环。不存在自动的图片替换加载器，新增资源需在自定义 hook 中实现加载与降级。

## 宿主事件

`run:start`、`run:end`、`room:enter`、`room:clear`、`floor:enter`、`boss:defeated`、`weapon:equipped`、`relic:acquired`、`pause`、`menu`。

例如结束载荷：

```js
{won:true, score:3500, inspiration:70, seed:'MY-SEED', seconds:800}
```

这里的数值仅为结构示例，不是本次真实测试成绩。

同一窗口可以用 `DreamCampus.on()`，或监听 DOM `dreamcampus:run:end`。配置的 `onEvent(name,payload)` 默认不启用。iframe 需要跨窗口消息时设置精确 `parentOrigin`；默认不发送。消息外壳为 `{game:'dream-campus',version:'1.0.0',event:'run:end',payload:{...}}`。

禁止把浏览器事件当成可信线上排行或支付证明。代码没有默认上传数据。

## 存档语义

存储键为 `storagePrefix + ':meta'` 与 `storagePrefix + ':run'`，默认前缀 `dream-campus-v1`。

`meta` 包含已结束局数、成功数、最高分、灵感、封顶成长、已发现武器、最近十局和设置。元数据读取会过滤无效物品、异常值与不正确历史条目。

`run` 包含三章房间图、已清房间、已开宝箱、商店售出标记、角色属性、装备、遗物、待选奖励和新局时的成长快照。入房、清房、奖励确认和交易会保存。未清房间加载时重新生成该房的敌人，不序列化正在飞行的弹丸、动画、闭包或召唤物；这就是“房间检查点”。

武器拾取在待选窗口出现前先移除地上物并保存 pending；确认后清空 pending 再保存。商店先记录售出/扣款再进入奖励选择，刷新不能重复购买奖励。最终结算 `run.ended` 防止重复发放，保存 meta 后删除 run。

修改存档结构时，应显式升级 schema 并写迁移，不要忽略不兼容后还声称能原地读档。

## 确定性与性能

地图、布局、商店、宝箱、事件、关键清房奖励用独立种子生成器；战斗 RNG 与视觉 RNG 分离。关掉粒子不改变暴击/刷怪的随机流。重进检查点会重新初始化房内战斗，所以不是录像式重放。

上限：普通敌人共 26，敌弹 240，总弹丸约 520，炮台 2，环绕物 7，地雷 6，粒子 450，飘字 55，短期绘制效果 100。简单场景纹理缓存，流场非逐帧重算。没有承诺在所有低端手机保持特定帧率。

## 开发验证

`node tests/core.test.cjs` 是无 DOM 的机械回归；`node tests/balance.cjs` 是实际引擎木桩实验；`tests/browser.test.py` 是 Chromium UI 路径测试。完整测试口径与限制见 `TEST_REPORT.md`。

开发用 `config.js` 的 `debug:true` 或 `?debug=1` 可访问 `window.__DC_DEBUG__`；正式入口不要启用。当前离线游戏不具备反作弊意义上的调试隔离。
