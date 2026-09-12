/* Dream Campus — original content. Edit this registry before touching the engine. */
(function (root) {
  'use strict';
  const DC = root.DC = root.DC || {};
  DC.VERSION = '0.1.24';
  DC.RARITIES = [
    { name:'普通', color:'#c3d0c7', scale:1, price:28 },
    { name:'精良', color:'#80dba1', scale:1.10, price:42 },
    { name:'稀有', color:'#66d8d1', scale:1.22, price:60 },
    { name:'史诗', color:'#c69af4', scale:1.35, price:82 },
    { name:'传说', color:'#ffc86b', scale:1.50, price:108 },
    { name:'毕业限定', color:'#ff8d9d', scale:1.58, price:125 }
  ];
  const weapons = [
    // id, name, rarity, behavior, damage, interval, energy, speed, tag, icon, description, additional properties
    ['waterbook','水课课本',0,'shot',9,0.20,0,540,'water','book','知识没进脑子，水先喷出来了。稳定连射，命中附加潮湿。',{wet:2.0,spread:0.045,life:0.9}],
    ['pencil','自动铅笔',0,'shot',17,0.37,0,680,'study','pen','只有 0.5 毫米，却能穿过两只作业怪。',{pierce:1,life:1.0}],
    ['slipper','宿舍拖鞋',0,'boomerang',23,0.65,0,410,'daily','shoe','投出去还会回来，往返各算一次。',{life:1.3,range:275}],
    ['thermos','保温杯',0,'spread',7,0.44,1,400,'water','cup','枸杞三连喷；近距离尤其管用。',{pellets:3,spread:0.24,wet:2,life:0.65}],
    ['ruler','三角尺',0,'melee',39,0.55,0,0,'study','ruler','谁说几何没有杀伤力？扇形挥砍并击退。',{range:110,arc:1.6,knock:180}],
    ['noodles','泡面调料包',0,'lob',35,0.80,3,430,'food','noodle','撕开、抛出，炸出一片红烧牛肉味。',{radius:66,burn:2,life:0.68}],
    ['attendance','早八签到卡',0,'shot',12,0.24,0,720,'study','card','滴的一声完成签到。零耗能、高弹速，适合稳定点掉漏网的小怪。',{life:0.92,pierce:1,bulletStyle:'stamp'}],
    ['lastBalance','饭卡最后一块钱',0,'shot',13,0.26,0,720,'daily','card','余额只剩一块，飞出去却像最后一发子弹。零耗能快速直射。',{life:.9,pierce:1,bulletStyle:'coin'}],
    ['card','回旋校园卡',1,'boomerang',24,0.55,2,470,'daily','card','余额为零，但攻击不是。穿透后自动归位。',{range:330,life:1.4}],
    ['coffee','冰美式',1,'spread',6,0.34,2,540,'food','cup','把疲惫泼向敌人。五束咖啡令目标减速。',{pellets:5,spread:0.42,slow:1.5,life:0.7}],
    ['laser','老师的激光笔',1,'beam',11,0.19,3,0,'tech','laser','老师说“看这里”，这一整条线上都得看。',{range:750,width:4}],
    ['meal','拼好饭',1,'lob',47,0.78,5,410,'food','meal','一份主食，两份爆炸，三位同学拼团。',{radius:82,life:0.8,fragments:3}],
    ['duckrice','鸭腿饭',1,'lob',63,0.86,4,450,'food','meal','鸭腿先到，作业靠后。落地后炸出油亮的范围冲击，并分裂出三枚饭粒弹。',{radius:78,burn:3.4,life:0.72,fragments:3,bulletStyle:'food'}],
    ['chickenrice','鸡腿饭',1,'boomerang',38,0.58,2,570,'food','drumstick','鸡腿饭盒绕场一周，去程和回程都能命中；回程会自动找回你。',{range:350,life:1.55,bulletStyle:'drumstick'}],
    ['keyboard','机械键盘',1,'spread',6,0.40,3,620,'tech','keyboard','WASD 四键齐发，终于不用只负责逃跑。',{pellets:4,spread:0.25,life:0.8}],
    ['usedbook','二手教材砖',1,'boomerang',30,0.68,1,455,'study','book','知识很重，物理意义上也是。飞出去拍一遍，返程再补一遍。',{range:325,life:1.48,bulletStyle:'paper'}],
    ['overnightBoba','隔夜奶茶',1,'spread',8,0.42,2,500,'food','boba','四颗珍珠黏住前排目标。伤害普通，但能给后续输出争取空间。',{pellets:4,spread:0.34,slow:1.65,life:0.82,bulletStyle:'boba'}],
    ['courseLock','卡死的选课网站',2,'mine',76,1.18,6,0,'tech','laptop','鼠标转圈五分钟，敌人只要靠近就会触发崩溃爆炸。',{radius:104,arm:.6,duration:4.5,range:360,bulletStyle:'glitch'}],
    ['refreshQueue','抢课刷新器',2,'burst',14,0.52,3,780,'tech','keyboard','连续刷新四次，每一发都带着“请稍候”的残影。',{burst:4,delay:.06,spread:.06,life:.7,bulletStyle:'glitch'}],
    ['hammer','地质锤',1,'melee',49,0.59,1,0,'geo','hammer','敲开作业的岩壳。近战震击，附带击退。',{range:126,arc:1.9,knock:220,stun:0.30}],
    ['chalk','粉笔头',1,'burst',10,0.54,2,660,'study','chalk','一轮三发，精准点名；毕业多年也忘不掉。',{burst:3,delay:0.075,spread:0.05,life:0.95}],
    ['chalkMachine','粉笔机关枪',1,'burst',9,.48,2,760,'study','chalk','老师转身写板书的速度，终于被做成了四连发。',{burst:4,delay:.052,spread:.07,life:.85,bulletStyle:'chalk'}],
    ['mungSoup','冰镇绿豆汤',1,'wave',25,.52,3,450,'food','cup','一整碗清凉波浪推过走廊，使敌人潮湿并减速。',{size:18,pierce:5,slow:1.6,wet:2.5,life:1.0,bulletStyle:'frost'}],
    ['usb','祖传 U 盘',1,'homing',21,0.38,3,390,'tech','usb','里面有十届真题，会自己寻找知识盲区。',{turn:4.5,life:1.7}],
    ['stapler','重型订书机',2,'burst',16,0.65,4,720,'study','stapler','一键装订三连击；穿透第一页，也穿透第二页。',{burst:3,delay:0.085,pierce:1,life:0.95}],
    ['laptop','满血游戏本',2,'spread',7,0.31,5,610,'tech','laptop','风扇起飞，RGB 弹幕启动。近战全中很强，远射会散。',{pellets:5,spread:0.34,burn:0.8,life:0.85}],
    ['powerbank','共享充电宝',2,'chain',25,0.62,6,0,'electric','battery','押金退不了，电可以放。连锁电弧跳跃三次。',{range:430,jumps:3,jumpRange:145}],
    ['express','最后一公里快递',2,'homing',31,0.62,5,330,'daily','parcel','您的快递已到达怪物脸上。追踪命中小范围爆炸。',{turn:3.8,life:1.8,radius:48}],
    ['compass','地质罗盘',2,'orbit',14,1.65,10,0,'geo','compass','三枚磁针绕身守护，可挡下并反弹弹幕，偶尔发射追踪磁针。',{count:3,duration:6,range:94,blockRadius:19}],
    ['rockcore','取芯钻头',2,'shot',31,0.55,4,520,'geo','core','从作业表层，一路钻到知识内核。',{pierce:5,life:1.25,size:7}],
    ['soda','摇过的汽水',2,'wave',28,0.58,4,440,'water','bottle','宽幅汽水浪，穿透敌人，沿途留下潮湿。',{pierce:5,wet:3,life:0.95,size:15}],
    ['canteenstew','食堂大锅菜',2,'wave',33,0.60,4,440,'food','pot','一勺浑厚汤汁横扫前方，留下短暂蒸汽并让敌人减速。',{size:22,pierce:7,slow:1.2,life:1.1,bulletStyle:'steam'}],
    ['umbrella','八级风暴雨伞',2,'melee',52,0.67,4,0,'water','umbrella','开伞就是一圈反击。挥砍同时清除附近敌弹。',{range:148,arc:3.6,clear:true,knock:230}],
    ['wifi','满格校园网',2,'turret',12,3.0,13,0,'tech','router','部署路由炮台，自动向最近且可见的怪物发包。',{duration:11,rate:0.40,range:430}],
    ['mouse','电竞鼠标',2,'burst',12,0.43,4,780,'tech','mouse','三连点，物理级手速。',{burst:3,delay:0.055,spread:0.025,life:0.85}],
    ['broadcast','校园广播喇叭',2,'wave',34,0.64,4,485,'daily','alarm','下课通知形成宽幅声浪，穿透一排敌人并把它们向后推开。',{size:23,pierce:7,knock:175,life:1.1,bulletStyle:'sound'}],
    ['seatHolder','图书馆占座伞',2,'orbit',16,1.85,9,0,'study','umbrella','三把占座伞绕身巡逻，可挡下并反弹弹幕，部署后切走武器仍会工作。',{count:3,duration:7.4,range:106,blockRadius:20,bulletStyle:'paper'}],
    ['mosquitoCoil','宿舍蚊香阵',2,'orbit',15,1.8,9,0,'daily','coil','三圈烟雾绕身挡弹反射，并持续向附近敌人喷出烟团。',{count:3,duration:8,range:102,blockRadius:20,bulletStyle:'smoke'}],
    ['campusBus','末班校车',2,'shot',58,.78,5,920,'daily','ticket','末班车不等人，也不会为前排怪物停车。',{pierce:5,knock:220,life:1.0,size:9,bulletStyle:'ticket'}],
    ['hotpot','宿舍违禁小火锅',3,'lob',59,0.90,8,390,'food','pot','不鼓励违纪，只鼓励把梦里的作业煮熟。',{radius:100,burn:3.8,life:0.85}],
    ['ppt','八百页 PPT',3,'orbit',19,1.9,12,0,'study','slides','还没讲完，但已经把你围住了。四张幻灯片可反弹弹幕并自动发射辅助弹。',{count:4,duration:7,range:108,blockRadius:19}],
    ['deadline','DDL 倒计时',3,'mine',70,1.35,8,0,'study','clock','在准星附近留下倒计时。靠近触发，逾期自动爆炸。',{radius:108,arm:0.65,duration:4,range:340}],
    ['scholarship','奖学金申请表',3,'beam',27,0.40,6,0,'study','certificate','审核过长，激光也很长。直线穿透整排敌人。',{range:940,width:7}],
    ['microscope','偏光显微镜',3,'beam',17,0.25,5,0,'geo','scope','交叉偏光锁定晶体弱点，额外提高暴击率。',{range:760,width:6,crit:0.18}],
    ['seismic','地震检波器',3,'wave',42,0.68,6,400,'geo','sensor','发出宽幅穿透震波，震得作业当场停顿。',{size:21,pierce:8,stun:0.35,life:1.25}],
    ['fan','宿舍落地扇',3,'turret',8,3.2,15,0,'daily','fan','风扇三散射；最多同时保留两座炮台。',{duration:12,rate:0.55,pellets:3,range:440}],
    ['bubbletea','全糖加料奶茶',3,'spread',10,0.55,6,440,'food','boba','六颗珍珠扇形爆射，黏住目标。',{pellets:6,spread:0.55,slow:2,life:0.9}],
    ['report','小组作业·最终版',3,'boomerang',36,0.65,5,450,'study','report','最终版、最终版 2、真的最终版——总会回来。',{range:410,life:1.65}],
    ['gradeCurve','成绩曲线',3,'chain',32,0.58,7,0,'study','slides','先给最近的敌人打一个问号，再沿着成绩曲线弹跳四次。',{range:460,jumps:4,jumpRange:160,bulletStyle:'spark'}],
    ['drone','航拍测绘无人机',3,'turret',22,3.2,16,0,'geo','drone','原地悬停测绘，追踪弹自动标注地表异常。',{duration:11,rate:0.65,homing:true,range:500}],
    ['lint','滚筒洗衣机',3,'wave',39,0.58,7,460,'daily','washer','把知识拧干，洗涤波穿透并推开前方敌人。',{size:19,pierce:6,knock:180,wet:2,life:1.0}],
    ['mineral','矿物标本盒',3,'spread',15,0.78,7,540,'geo','mineral','石英、长石、云母齐射；每枚晶片可再穿一只。',{pellets:5,spread:0.46,pierce:1,life:0.9}],
    ['redPen','论文批注红笔',3,'burst',14,0.56,5,790,'study','pen','四连红字批注精准追责；最后一笔更容易打出暴击。',{burst:4,delay:0.055,spread:0.035,pierce:1,crit:0.12,life:0.92,bulletStyle:'ink'}],
    ['centrifuge','实验室离心机',3,'orbit',22,2.05,13,0,'tech','washer','四枚高速样品管可挡下并反弹弹幕，还会周期性发射高能扫描弹。',{count:4,duration:8.2,range:119,blockRadius:21,bulletStyle:'scan'}],
    ['unread99','辅导员未读消息',3,'homing',29,.44,6,450,'daily','phone','两条 99+ 消息自动追踪场上最不想回复的人。',{pellets:2,spread:.18,turn:5.2,life:1.8,slow:.8,bulletStyle:'notification'}],
    ['liquidNitrogen','实验室液氮喷壶',3,'spread',12,.55,7,520,'tech','bottle','五束低温雾流冻结走位，适合控制成群敌人。',{pellets:5,spread:.48,slow:2.3,life:.88,pierce:1,bulletStyle:'frost'}],
    ['quantum','量子游戏本',4,'burst',11,0.43,8,760,'tech','laptop','风扇变成涡轮。五发超频弹，强但吃专注值。',{burst:5,delay:0.045,pierce:1,life:1.0}],
    ['petrel','三维建模工作站',4,'turret',18,3.8,19,0,'geo','station','把敌人也纳入网格：双弹自动建模炮台。',{duration:13,rate:0.78,pellets:2,range:520}],
    ['steam','SAGD 蒸汽双井',4,'spread',15,0.47,7,480,'geo','pipe','双井并行，三束高温蒸汽同时开采梦境。',{pellets:3,spread:0.15,burn:2.2,wet:2,life:1.05,pierce:1}],
    ['fault','断层解释神器',4,'wave',64,0.86,9,530,'geo','fault','一道断层震波贯穿全场，让敌方计划发生错断。',{size:25,pierce:12,stun:0.42,life:1.5}],
    ['canteen','食堂无限续饭勺',4,'melee',93,0.76,4,0,'food','ladle','这一勺不手抖。超大扇形，清弹且重击。',{range:173,arc:2.5,knock:280,clear:true}],
    ['admission','保研通知书',4,'homing',25,0.48,7,440,'study','letter','两封追踪喜报自动寻找敌人；快乐可以分享。',{pellets:2,spread:0.2,turn:5,life:1.8}],
    ['thesis','论文查重粉碎机',4,'beam',31,0.34,7,0,'study','printer','重复率降下去了，沿线怪物也一起消失。',{range:1020,width:10}],
    ['rail','返乡高铁票',4,'shot',83,0.96,9,1100,'daily','ticket','没有什么能挡住放假回家的学生。',{pierce:10,life:1.0,size:9}],
    ['storm','实验室特斯拉线圈',4,'chain',41,0.66,8,0,'electric','coil','五次连锁电击；潮湿敌人会受到额外电伤。',{range:490,jumps:5,jumpRange:175}],
    ['meteor','野外实习陨石锤',4,'lob',87,1.06,10,380,'geo','meteor','野外捡来的标本，带一点天体级冲击力。',{radius:127,burn:2.5,life:0.92,fragments:5}],
    ['roommate','室友的起床气',4,'wave',65,0.85,9,400,'daily','alarm','不要惹早八室友。这道声浪让整排敌人短暂眩晕。',{pierce:10,size:26,stun:0.60,life:1.3}],
    ['registrarStamp','教务处万能章',4,'lob',94,0.96,9,490,'study','certificate','一章盖下，全场生效。大范围爆炸后飞出四枚红印碎片，并短暂打断敌人。',{radius:124,fragments:4,stun:0.28,life:0.88,bulletStyle:'stamp'}],
    ['finalFinalDraft','论文最终最终版',4,'boomerang',46,.72,8,540,'study','report','最终版飞出去，最终最终版飞回来，两次都带着公式残影。',{range:430,life:1.65,bulletStyle:'formula'}],
    ['diploma','毕业证发射器',5,'homing',29,0.35,5,520,'study','diploma','你已经醒来过一次。毕业证会追踪目标并穿透一次。',{turn:5.4,pierce:1,life:1.9,unlock:'win'}]
  ];
  DC.WEAPONS = Object.fromEntries(weapons.map(w => [w[0], Object.assign({id:w[0],name:w[1],rarity:w[2],type:w[3],damage:w[4],interval:w[5],energy:w[6],speed:w[7],tag:w[8],icon:w[9],description:w[10],life:1,spread:0,pellets:1,pierce:0,size:5}, w[11])]));
  DC.RELICS = [
    {id:'notes',name:'学霸的笔记',icon:'book',description:'所有伤害 +12%。笔迹清楚，逻辑也清楚。',mods:{damage:0.12}},
    {id:'coffeeCard',name:'咖啡月卡',icon:'cup',description:'攻击速度 +12%，专注恢复 +2/秒。',mods:{haste:0.12,regen:2}},
    {id:'sneakers',name:'体测神鞋',icon:'shoe',description:'移速 +12%，闪避冷却缩短 12%。',mods:{speed:0.12,dash:0.12}},
    {id:'helmet',name:'野外实习安全帽',icon:'helmet',description:'最大生命 +20，立即回复 20。',mods:{hp:20},heal:20},
    {id:'insurance',name:'大学生医保',icon:'heart',description:'每次清理战斗房回复 5 点生命。',mods:{roomHeal:5}},
    {id:'battery',name:'满电充电宝',icon:'battery',description:'专注上限 +25，专注恢复 +3/秒。',mods:{energy:25,regen:3}},
    {id:'goggles',name:'实验护目镜',icon:'goggles',description:'暴击率 +10%。暴击造成 1.7 倍伤害。',mods:{crit:0.10}},
    {id:'shield',name:'防破防耳机',icon:'headset',description:'护盾上限 +18，立即充满护盾。',mods:{shield:18},refillShield:true},
    {id:'coupon',name:'神券膨胀包',icon:'ticket',description:'此后商店价格降低 20%。',mods:{discount:0.20}},
    {id:'internship',name:'实习工资到账',icon:'coin',description:'立刻获得 45 学分币，后续清房奖励 +4。',mods:{roomCoins:4},coins:45},
    {id:'waterproof',name:'防水野簿',icon:'book',description:'水系伤害 +28%；所有潮湿目标再受伤时 +10%。',mods:{water:0.28,wetBonus:0.10}},
    {id:'extension',name:'万能插线板',icon:'coil',description:'电系伤害 +25%，电弧增加一次跳跃。',mods:{electric:0.25,chain:1}},
    {id:'fieldwork',name:'野外实习证',icon:'card',description:'地质武器伤害 +24%。',mods:{geo:0.24}},
    {id:'takeout',name:'外卖保温袋',icon:'meal',description:'食物武器伤害 +24%，爆炸范围 +15%。',mods:{food:0.24,blast:0.15}},
    {id:'overclock',name:'散热支架',icon:'laptop',description:'科技武器伤害 +24%，专注消耗降低 8%。',mods:{tech:0.24,efficiency:0.08}},
    {id:'bookmark',name:'考点书签',icon:'certificate',description:'学习武器伤害 +24%。',mods:{study:0.24}},
    {id:'resilience',name:'情绪稳定',icon:'heart',description:'受到伤害降低 12%，受伤无敌时间稍长。',mods:{armor:0.12,invuln:0.15}},
    {id:'scope',name:'标本放大镜',icon:'scope',description:'子弹尺寸 +20%，暴击率 +6%。',mods:{size:0.20,crit:0.06}},
    {id:'club',name:'社团招新传单',icon:'slides',description:'炮台持续时间 +35%，召唤物伤害 +15%。',mods:{duration:0.35,summon:0.15}},
    {id:'bargain',name:'二手群捡漏',icon:'parcel',description:'普通、精良武器伤害 +24%，专注恢复 +2/秒。',mods:{budget:0.24,regen:2}},
    {id:'deadlinePass',name:'DDL 延期申请',icon:'clock',description:'主动技能冷却缩短 22%。',mods:{skill:0.22}},
    {id:'lucky',name:'转发锦鲤',icon:'mineral',description:'清房武器掉落率 +15 个百分点，暴击率 +4%。',mods:{luck:0.15,crit:0.04}},
    {id:'shockproof',name:'防震样品箱',icon:'core',description:'护盾开始恢复的等待缩短 2 秒。',mods:{shieldDelay:2}},
    {id:'focus',name:'图书馆固定座位',icon:'chair',description:'专注消耗降低 18%，但移速降低 4%。',mods:{efficiency:0.18,speed:-0.04}},
    {id:'secondChance',name:'补考机会',icon:'letter',description:'本局首次倒下时复苏到 45% 生命，并清除敌弹。',mods:{revive:1}},
    {id:'thorn',name:'怼人表情包',icon:'phone',description:'受到伤害时，对附近敌人释放 50 点反击震波。',mods:{thorns:50}},
    {id:'mint',name:'薄荷糖',icon:'candy',description:'生命上限 +10，移动速度 +7%，立即回复 10。',mods:{hp:10,speed:0.07},heal:10},
    {id:'rubber',name:'降噪橡皮',icon:'eraser',description:'穿透型弹丸额外穿透 1 个敌人；护盾 +8。',mods:{pierce:1,shield:8}}
  ];
  DC.SYNERGIES = [
    {id:'wetCircuit',name:'水电不分家',tags:['water','electric'],description:'同时携带水系与电系：电弧额外跳跃 2 次。现实中请注意用电安全。',mods:{chain:2}},
    {id:'fieldTeam',name:'野外调查小队',tags:['geo','geo'],description:'双地质武器：地质伤害 +18%，最大护盾 +12。',mods:{geo:0.18,shield:12}},
    {id:'dorm',name:'宿舍快乐套餐',tags:['food','tech'],description:'食物 + 科技：专注恢复 +5/秒。',mods:{regen:5}},
    {id:'finalWeek',name:'期末复习周',tags:['study','study'],description:'双学习武器：暴击率 +10%，攻速 +8%。',mods:{crit:0.10,haste:0.08}},
    {id:'survival',name:'大学生生存指南',tags:['daily','food'],description:'日常 + 食物：每次清房回复 4 生命。',mods:{roomHeal:4}},
    {id:'steamLab',name:'蒸汽实验室',tags:['geo','water'],description:'地质 + 水系：潮湿目标额外受到 18% 伤害。',mods:{wetBonus:0.18}},
    {id:'network',name:'宿舍局域网',tags:['tech','tech'],description:'双科技武器：召唤物伤害 +20%，专注消耗降低 10%。',mods:{summon:0.20,efficiency:0.10}},
    {id:'applied',name:'理论联系实际',tags:['study','geo'],description:'学习 + 地质：全伤害 +10%，暴击率 +4%。',mods:{damage:0.10,crit:0.04}}
  ];
  DC.CHARACTERS = [
    {id:'geo',name:'地质实习生',subtitle:'岩层会说话，作业不会。',color:'#72d5b0',hp:42,energy:100,speed:224,regen:14,starter:'hammer',secondary:'waterbook',mods:{geo:0.12},passive:'地质伤害 +12% · 42 生命'},
    {id:'early',name:'早八幸存者',subtitle:'出勤率不高，求生欲很高。',color:'#ffc873',hp:40,energy:100,speed:240,regen:14,starter:'waterbook',secondary:'slipper',mods:{dash:0.18},passive:'移动更快 · 闪避冷却缩短 18%'},
    {id:'cram',name:'期末突击人',subtitle:'一晚一支笔，一个奇迹。',color:'#c5a2ed',hp:38,energy:125,speed:229,regen:17,starter:'pencil',secondary:'thermos',mods:{crit:0.07},passive:'125 专注 · 恢复更快 · 暴击 +7%'}
  ];
  DC.DIFFICULTIES = {
    chill:{name:'轻松旁听',description:'普通敌人生命 ×1.9125；Boss 生命在当前基准上 ×0.75，弹速 ×1.32、伤害 ×1.05。',enemyHp:1.9125,bossHp:.75,enemyDamage:1.05,bulletSpeed:1.32,bulletDensity:3.5,bulletWaves:2,reward:0.85},
    normal:{name:'正常修读',description:'普通敌人生命 ×2.25；Boss 生命在当前基准上 ×0.75，弹速与伤害 ×1.5。',enemyHp:2.25,bossHp:.75,enemyDamage:1.5,bulletSpeed:1.5,bulletDensity:1,bulletWaves:2,reward:1},
    nightmare:{name:'期末噩梦',description:'普通敌人生命 ×2.7；Boss 生命在当前基准上 ×0.75，弹速 ×1.65、伤害 ×1.83；最终 Boss 封顶 9000 生命。',enemyHp:2.7,bossHp:.75,finalBossCap:9000,enemyDamage:1.83,bulletSpeed:1.65,bulletDensity:1,bulletWaves:2,reward:1.25}
  };
  DC.FLOORS = [
    {name:'第一章 · 永无止境的早八',short:'教学楼',subtitle:'投影仪还在放第 1 页。你已经睡进第 36 页。',palette:['#263d37','#2d4740','#426456','#76bd96'],boss:'ta',bossName:'点名助教',bossQuote:'“这位同学，请回答一下！”',baseHp:1,baseDamage:1,bossHp:4620,mobs:['paper','slime','rollcall','charger','printer','elective']},
    {name:'第二章 · 饭点生存法则',short:'食堂 / 宿舍',subtitle:'取餐码失效了，阿姨的手却抖出了弹幕。',palette:['#423e32','#514b3c','#736248','#d9b074'],boss:'chef',bossName:'手抖阿姨 · 盛饭机甲',bossQuote:'“同学，少打一点也是为你好。”',baseHp:1.42,baseDamage:1.15,bossHp:9265,mobs:['paper','charger','printer','bomb','cleaner','mosquito','summoner','captcha']},
    {name:'第三章 · 学分尽头的高塔',short:'行政楼',subtitle:'公章盖过了现实，毕业只差最后一个同意。',palette:['#363545','#454052','#675b78','#b49acd'],boss:'principal',bossName:'梦境校长 · 学分之主',bossQuote:'“还差一个学分，就可以醒来了。”',baseHp:1.92,baseDamage:1.30,bossHp:18600,mobs:['rollcall','printer','ghost','proctor','slide','summoner','cleaner','bomb','queue']}
  ];
  // Infinite mode reuses the three boss bodies but gives each run a distinct identity and attack pool.
  DC.INFINITE_BOSSES = [
    {id:'巡回点名官',kind:'ta',name:'巡回点名官 · 走廊监察',quote:'“我点到谁，谁就别想下课。”',patterns:[0,1,2,4,5]},
    {id:'答辩投影师',kind:'ta',name:'答辩投影师 · 第 99 页',quote:'“这张图很简单，我们再看三十分钟。”',patterns:[1,2,3,4,5]},
    {id:'夜宵调度长',kind:'chef',name:'夜宵调度长 · 加餐警报',quote:'“再来一勺，看看你还能躲几次。”',patterns:[0,1,2,4,6]},
    {id:'取餐码审判官',kind:'chef',name:'取餐码审判官 · 过号重排',quote:'“你的号码已经过期，攻击也一样。”',patterns:[1,2,3,4,5,6]},
    {id:'教务终审官',kind:'principal',name:'教务终审官 · 红章无尽',quote:'“材料不全，重打；弹幕不够，再来。”',patterns:[0,1,2,4,5,7,8]},
    {id:'毕业延期体',kind:'principal',name:'毕业延期体 · 无限补交',quote:'“最后一个学分，永远是下一个。”',patterns:[0,2,3,5,6,7,8]}
  ];
  DC.ENEMIES = {
    paper:{name:'会跑的作业',hp:38,speed:93,r:15,color:'#eee3b6',cost:1,behavior:'chase',damage:10},
    slime:{name:'学分软泥',hp:48,speed:65,r:19,color:'#a1d99a',cost:1.2,behavior:'split',damage:10},
    mini:{name:'零点五学分',hp:16,speed:105,r:10,color:'#b5e997',cost:0.3,behavior:'chase',damage:6},
    rollcall:{name:'点名册',hp:42,speed:57,r:17,color:'#d68e84',cost:1.4,behavior:'shoot',damage:11},
    charger:{name:'内卷冲刺人',hp:62,speed:72,r:17,color:'#ecb572',cost:1.6,behavior:'charge',damage:13},
    printer:{name:'卡纸打印机',hp:68,speed:0,r:21,color:'#94b3b5',cost:1.8,behavior:'fan',damage:10},
    elective:{name:'卡死的选课网站',hp:86,speed:0,r:21,color:'#7fb8d8',cost:2.1,behavior:'fan',damage:12,bulletStyle:'glitch'},
    bomb:{name:'爆炸催缴单',hp:30,speed:108,r:15,color:'#ed8b85',cost:1.3,behavior:'bomb',damage:15},
    cleaner:{name:'扫地大魔王',hp:135,speed:64,r:24,color:'#afc7b9',cost:2.6,behavior:'slam',damage:15},
    mosquito:{name:'熄灯后蚊子',hp:34,speed:105,r:13,color:'#bea7d5',cost:1.3,behavior:'strafe',damage:9},
    summoner:{name:'小组甩锅王',hp:79,speed:47,r:20,color:'#d7a994',cost:2.4,behavior:'summon',damage:11},
    ghost:{name:'断线校园网',hp:63,speed:67,r:18,color:'#8bd4d1',cost:2.1,behavior:'teleport',damage:12},
    proctor:{name:'监考铁壁',hp:127,speed:62,r:23,color:'#9b9bae',cost:2.4,behavior:'guard',damage:14},
    slide:{name:'无限下一页',hp:81,speed:44,r:21,color:'#bfa2d2',cost:2.2,behavior:'radial',damage:11},
    captcha:{name:'验证码循环框',hp:54,speed:80,r:16,color:'#e1a5d3',cost:1.7,behavior:'radial',damage:12,bulletStyle:'glitch'},
    queue:{name:'排队进度条',hp:72,speed:88,r:18,color:'#8cc8a6',cost:1.9,behavior:'shoot',damage:13,bulletStyle:'spark'}
  };
  DC.EVENTS = [
    {id:'nap',title:'自习室的空沙发',text:'一张没有人占座的沙发，简直像个陷阱。不过你真的有点困。',choices:[{text:'眯五分钟',detail:'回复 32 生命',heal:32},{text:'继续奋斗',detail:'获得 24 学分币',coins:24}]},
    {id:'corebox',title:'无人认领的岩芯箱',text:'箱盖上写着“珍贵样品，请轻拿轻放”。里面也许藏着一整段地质史。',choices:[{text:'认真鉴定',detail:'获得一件地质武器',weaponTag:'geo'},{text:'归还实验室',detail:'回复 18 生命 + 18 学分币',heal:18,coins:18}]},
    {id:'deal',title:'二手群神秘学长',text:'“九成新，仅拆封，毕业带不走。”这句熟悉的话让你产生了亲切感。',choices:[{text:'以旧换梦',detail:'花费 28 学分币，获得稀有以上武器',cost:28,weaponTier:2},{text:'婉拒并领红包',detail:'获得 12 学分币',coins:12}]},
    {id:'group',title:'小组作业群（99+）',text:'消息 1：“在吗？”消息 99：“那你一个人做一下吧。”',choices:[{text:'拒绝内耗',detail:'回复 20 生命，专注回满',heal:20,refill:true},{text:'按贡献分工',detail:'获得一件随机遗物',relic:true}]},
    {id:'vending',title:'不收现金的贩卖机',text:'机器上贴着一张便利贴：“今日接受烦恼支付。”',choices:[{text:'投进一点压力',detail:'付出 12 生命（不会致死），获得 40 学分币',hurt:12,coins:40},{text:'接杯温水',detail:'回复 15 生命',heal:15}]},
    {id:'library',title:'图书馆的隐藏书架',text:'这层书架没有教材，只有“如何在截止日期前保持清醒”。',choices:[{text:'借一本回去',detail:'获得一件学习武器',weaponTag:'study'},{text:'安静阅读',detail:'获得一件随机遗物',relic:true}]},
    {id:'rain',title:'突如其来的校园阵雨',text:'梦里的天气预报也不准。有人把一把伞放在了你手里。',choices:[{text:'收下雨伞',detail:'获得「八级风暴雨伞」',weapon:'umbrella'},{text:'把伞留给别人',detail:'回复 25 生命 + 12 学分币',heal:25,coins:12}]},
    {id:'office',title:'导师的办公室',text:'“模型只是表达，预测要有依据。”老师递给你一张野外实习证。',choices:[{text:'认真做记录',detail:'获得「野外实习证」；已有则获得其他遗物',specificRelic:'fieldwork'},{text:'请教实验方法',detail:'获得一件地质武器',weaponTag:'geo'}]}
  ];
  DC.STORY = [
    {speaker:'08:01 · 周一 · 第一排靠窗',text:'老师把课件翻到了第三页。你努力睁着眼，笔记本上却只写下了一个字：困。'},
    {speaker:'投影仪',text:'“这一部分很简单，我们直接看下一张。”\n下一张，下一张，下一张……窗外的云停住了。'},
    {speaker:'你',text:'再醒来时，水课课本正在漏水。作业长出了腿。门口贴着一张通知：\n「取得最后一个学分，即可离开梦境。」'},
    {speaker:'一张没有署名的便签',text:'清理房间后，走向发光的门。留意地面的红色预警。\n你可以拒绝内卷，也可以用一把地质锤敲开它。'}
  ];
  DC.TIPS = ['炮台、环绕物部署后，换另一把武器也会继续工作。','空格闪避有短暂无敌，但不能穿墙。','武器的稀有度不是等级：同稀有度也有不同射程和耗能。','R 喝水会短暂停火，回复专注；危险时先找掩体。','水系让敌人潮湿，电弧对潮湿目标伤害 +35%。','门锁会在清完敌人后解除。已清房间不会再次刷怪。','精英房是可选挑战；进入前看看生命和地图。','Q「拒绝内卷」能清除敌弹，还能打断附近敌人。','一件遗物只会取得一次；双武器的标签可以激活羁绊。','不需要联网、不需要账号；进度只存在当前浏览器。','暂停菜单可以查看本局装备、遗物和已经激活的羁绊。'];
})(typeof window !== 'undefined' ? window : globalThis);
