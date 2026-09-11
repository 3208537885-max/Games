'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');const path=require('node:path');
const {D,MemoryStorage,game,step,dummy,choose}=require('./helpers.cjs');
const tests=[];let assertions=0;const check=(v,m)=>{assertions++;assert.ok(v,m);};
function test(name,fn){const start=performance.now();try{fn();tests.push({name,pass:true,ms:Math.round(performance.now()-start)});console.log('PASS',name);}catch(e){tests.push({name,pass:false,error:e.stack});console.error('FAIL',name,e.stack);}}
test('Content: 70 unique weapons, 28 relics, 8 synergies, 13 attack behaviors',()=>{
  check(Object.keys(D.WEAPONS).length===70);check(D.RELICS.length===28);check(D.SYNERGIES.length===8);check(new Set(Object.values(D.WEAPONS).map(w=>w.type)).size===13);
  for(const w of Object.values(D.WEAPONS)){check(w.id&&w.name&&w.description);for(const k of ['damage','interval','speed','energy'])check(Number.isFinite(w[k])&&w[k]>=0,w.id+' '+k);check(w.interval>=.07&&D.RARITIES[w.rarity]);const p=D.weaponProfile(w,0,{});check(Number.isInteger(p.score)&&p.score>=1&&p.score<=100,w.id+' score');check(['S','A','B','C','D'].includes(p.grade)&&p.role&&Object.values(p.axes).every(Number.isFinite),w.id+' profile');}
  const tierScores=[0,1,2,3,4].map(t=>{const scores=Object.values(D.WEAPONS).filter(w=>w.rarity===t).map(w=>D.weaponProfile(w,0,{}).score);return scores.reduce((a,b)=>a+b,0)/scores.length;});
  for(let i=1;i<tierScores.length;i++)check(tierScores[i]>tierScores[i-1],`weapon score tier ${i} should exceed tier ${i-1}`);
});
test('Seeded maps: 1,500 floors, unique cells, connected graph, guaranteed special rooms',()=>{
  for(let seed=0;seed<500;seed++)for(let f=0;f<3;f++){
    const map=D.generateFloor('QA-'+seed,f),rooms=map.rooms;check(rooms.length===11+f);check(new Set(rooms.map(r=>r.x+','+r.y)).size===rooms.length);
    check(JSON.stringify(map)===JSON.stringify(D.generateFloor('QA-'+seed,f)));
    for(const type of ['start','boss','treasure','shop','rest','event','elite'])check(rooms.filter(r=>r.type===type).length===1,type);
    const visited=new Set([0]),q=[0];for(let i=0;i<q.length;i++)for(const [dir,id] of Object.entries(rooms[q[i]].doors)){const dst=rooms[id],v=D.DIRECTIONS[dir];check(!!dst);check(dst.doors[v.opposite]===q[i]);check(dst.x===rooms[q[i]].x+v.dx&&dst.y===rooms[q[i]].y+v.dy);if(!visited.has(id)){visited.add(id);q.push(id);}}
    check(visited.size===rooms.length);check(rooms[map.bossId].type==='boss');check(rooms[map.bossId].depth===5+f);
    for(const r of rooms.filter(r=>['shop','rest','treasure','event','elite'].includes(r.type)))check(Object.values(r.doors).every(id=>id<map.bossId));
  }
});
test('Interior navigation: 450 generated layouts preserve a connected walkable field',()=>{
  for(let i=0;i<150;i++)for(let f=0;f<3;f++){
    const map=D.generateFloor(i+'',f),r=map.rooms[1],o=D.makeObstacles(i+'',f,r),flow=new D.FlowField(o,20);flow.update(D.W/2,D.H/2);
    for(let j=0;j<flow.blocked.length;j++)if(!flow.blocked[j])check(flow.cost[j]>=0,`unreachable cell ${i}/${f}/${j}`);
    for(const v of Object.values(D.DIRECTIONS))check(D.isFree(v.x-v.dx*42,v.y-v.dy*42,20,o));
    check(JSON.stringify(o)===JSON.stringify(D.makeObstacles(i+'',f,r)));
  }
});
test('Movement and rays: dash cannot tunnel through a thin prop; room bounds clip rays',()=>{
  const obs=[{x:400,y:250,w:15,h:200,hp:55}],p={x:340,y:350,r:16};D.moveEntity(p,200,0,obs);check(p.x<=384);check(D.isFree(p.x,p.y,p.r,obs));
  check(D.lineEnd(300,350,1000,350,obs).x===400);check(D.lineEnd(300,350,2000,350,[]).x===D.W-D.PAD);check(D.segmentCircle(0,0,1000,0,500,0,1));check(!D.los({x:300,y:350},{x:600,y:350},obs));
});
test('Loot: deterministic pools; graduation weapon stays locked until a win',()=>{
  const a=new D.RNG('loot'),b=new D.RNG('loot');for(let i=0;i<3000;i++){const w=D.rollWeapon(a,i%3,0,null,false);check(w.id===D.rollWeapon(b,i%3,0,null,false).id);check(w.id!=='diploma');}
  const rng=new D.RNG('unlocked');check(Array.from({length:1000},()=>D.rollWeapon(rng,2,0,null,true).id).includes('diploma'));
});
test('Synergies require two separate tags; stat ceilings and +3 upgrade ceiling',()=>{
  check(!D.activeSynergies([{id:'hammer'},{id:'waterbook'}]).some(s=>s.id==='fieldTeam'));
  check(D.activeSynergies([{id:'hammer'},{id:'rockcore'}]).some(s=>s.id==='fieldTeam'));
  const s=D.makeStats('cram',Array(30).fill('goggles').concat(Array(20).fill('resilience'),Array(20).fill('focus')),[{id:'pencil'},{id:'chalk'}]);check(s.crit<=.65&&s.armor<=.45&&s.efficiency<=.5);
  check(D.weaponDamage(D.WEAPONS.waterbook,9,s)===D.weaponDamage(D.WEAPONS.waterbook,3,s));
});
test('Pause freezes all gameplay clocks and player coordinates',()=>{const g=game();g.pause();const before=JSON.stringify(g.snapshot());step(g,2,{mx:1,my:0,fire:true});check(JSON.stringify(g.snapshot())===before);g.resume();step(g,.1,{mx:1,my:0});check(g.player.x>576);});
test('Focus recovery, drinking, dash immunity, and per-slot fire cooldowns',()=>{
  const g=game();g.player.energy=0;step(g,1);check(g.player.energy>13);g.player.energy=0;step(g,1,{mx:0,my:0,drink:true});check(g.player.energy>=60);
  g.player.invuln=0;g.update(1/60,{mx:1,my:0,dash:true});const hp=g.player.hp;check(!g.hitPlayer(100,{x:1,y:1}));check(g.player.hp===hp);
  g.player.cooldowns=[0,0];g.fire();const cd=g.player.cooldowns[0];g.swap(1);g.swap(0);g.fire();check(g.player.cooldowns[0]===cd);
});
test('Orbit weapons block and reflect enemy bullets, then fire auxiliary shots',()=>{
  const g=game();g.run.inventory[0]={id:'compass',level:0};g.recompute();g.player.x=576;g.player.y=360;
  g.executeWeapon({...D.WEAPONS.compass,damage:14},g.player,0,{x:900,y:360});g.updateSummons(0);
  check(g.orbits.length===3&&g.orbits.every(o=>o.blockRadius>=18),'orbit guard field is deployed');
  g.enemyBullet({x:760,y:360,r:12,damage:10,bulletStyle:'orb'},Math.PI,800);g.updateProjectiles(.10);
  check(g.bullets.some(b=>b.friendly&&b.reflected&&b.w.bulletStyle==='orbit'),'enemy bullet is reflected into friendly orbit fire');
  const target=dummy(g,730,360);g.updateSummons(1.1);
  check(g.bullets.some(b=>b.friendly&&b.w.bulletStyle==='orbit'&&b.w.type==='homing'),'orbit emits a periodic auxiliary projectile');
});
test('All 70 weapons create real damage with their actual engine behavior',()=>{
  for(const w of Object.values(D.WEAPONS)){
    const g=game();g.run.inventory[0]={id:w.id,level:0};g.recompute();g.stats.crit=0;g.player.x=350;g.player.y=360;g.player.invuln=999;
    const d=w.type==='orbit'?w.range:w.type==='melee'?80:100,e=dummy(g,350+d,360);g.input={mx:0,my:0,aimX:e.x,aimY:e.y,fire:true};
    for(let i=0;i<360;i++){e.x=350+d;e.y=360;g.update(1/60,g.input);}
    check(e.hp<1e9,'no damage: '+w.id);check(Number.isFinite(e.hp)&&Number.isFinite(g.player.energy),w.id+' finite');
  }
});
test('Weapon hits and enemy deaths emit bounded combat feedback effects',()=>{
  const g=game(),e=dummy(g,700,360);g.stats.crit=0;g.hitEnemy(e,10,{tag:'study',type:'shot',bulletStyle:'chalk',crit:0},g.player);
  check(g.effects.some(v=>v.type==='impact'&&v.style==='chalk'));
  e.hp=1;g.hitEnemy(e,10,{tag:'daily',type:'shot',bulletStyle:'ticket',crit:0},g.player);
  check(g.effects.some(v=>v.type==='enemyDeath'&&v.style===e.behavior));
  for(let i=0;i<160;i++)g.fx('impact',{x:0,y:0,r:10,color:'#fff'},.1);check(g.effects.length<=100);
});
test('Beam and very fast projectiles hit front targets but not through cover',()=>{
  for(const id of ['laser','rail']){
    const g=game();g.run.inventory[0]={id,level:0};g.recompute();g.player.x=280;g.player.y=360;g.obstacles=[{x:520,y:250,w:35,h:200,hp:1e9,kind:'plant'}];g.flow.rebuild(g.obstacles);
    const a=dummy(g,410,360),b=dummy(g,640,360);step(g,1,{mx:0,my:0,aimX:900,aimY:360,fire:true});check(a.hp<1e9,id+' front');check(b.hp===1e9,id+' cover');
  }
});
test('Water/electric interaction applies 35% bonus; boss stun has a short cap',()=>{
  const g=game();g.stats.crit=0;const e=dummy(g,700,360);e.wet=2;g.hitEnemy(e,100,{tag:'electric',crit:0},g.player);check(Math.abs(e.hp-(1e9-135))<.01);
  const b=g.spawnBoss('ta');b.spawnTime=0;g.hitEnemy(b,1,{stun:4},g.player);check(b.stun<=.13);
});
test('Visual settings do not alter combat RNG or critical damage',()=>{
  const a=game(),b=game();b.meta.settings.particles=true;
  const da=dummy(a,760,360),db=dummy(b,760,360);for(let i=0;i<200;i++){a.hitEnemy(da,1,{crit:.25},a.player);b.hitEnemy(db,1,{crit:.25},b.player);}
  check(da.hp===db.hp);check(a.rng.state===b.rng.state);
});
test('Treasure pickup is transactional and cannot be claimed twice',()=>{
  const g=game(),r=g.run.floors[0].rooms.find(r=>r.type==='treasure');g.enterRoom(r.id,null);g.interact();check(r.interacted&&g.run.pending?.type==='weapon');const id=g.run.pending.weapon.id;
  const restored=new D.Game({storage:g.storage});check(restored.load());check(restored.mode==='choice'&&restored.run.pending.weapon.id===id);check(restored.chooseReward(0));check(!restored.chooseReward(0));check(restored.room.interacted);restored.interact();check(!restored.run.pending);
});
test('Shops do not charge for full-health healing; sold items and upgrade cap persist',()=>{
  const g=game();g.enterRoom(g.run.floors[0].rooms.find(r=>r.type==='shop').id,null);g.run.coins=500;g.openShop();check(!g.buy(2));check(g.run.coins===500);g.player.hp-=50;check(g.buy(2));check(!g.buy(2));
  for(let i=0;i<3;i++)check(g.upgrade(0));check(!g.upgrade(0));const spent=g.run.coins;check(g.run.inventory[0].level===3);check(g.buy(0));choose(g);g.openShop();check(!g.buy(0));check(g.run.coins<spent);
});
test('All eight event branches execute; costs and HP payments stay valid',()=>{
  for(const event of D.EVENTS)for(let choice=0;choice<event.choices.length;choice++){
    const g=game();g.enterRoom(g.run.floors[0].rooms.find(r=>r.type==='event').id,null);g.room.eventId=event.id;g.run.coins=200;g.player.hp=5;g.openEvent();check(g.chooseEvent(choice),event.id);check(g.room.interacted&&g.player.hp>=1);check(!g.chooseEvent(choice));choose(g);check(g.mode==='playing');
  }
});
test('Room-boundary save rolls an unfinished battle back; cleared rooms do not respawn',()=>{
  const storage=new MemoryStorage(),g=game({storage});g.enterRoom(1,'W');const savedHP=g.player.hp;g.player.hp=20;g.player.x=400;
  const loaded=new D.Game({storage});check(loaded.load());check(loaded.player.hp===savedHP);check(!loaded.room.cleared);loaded.clearRoom();choose(loaded);check(loaded.room.cleared);const coins=loaded.run.coins;loaded.clearRoom();check(loaded.run.coins===coins);loaded.enterRoom(1,null);check(!loaded.combatStarted);check(loaded.enemies.length===0);
});
test('Meta upgrades are snapshotted per run, not retroactively added to an old checkpoint',()=>{
  const storage=new MemoryStorage(),g=game({storage});const hp=g.stats.maxHp;g.meta.inspiration=100;g.returnToMenu();check(g.buyMeta('health'));check(g.load());check(g.stats.maxHp===hp);g.start({character:'early',skipStory:true});check(g.stats.maxHp===hp+5);
});
test('Malformed metadata is sanitized; malformed checkpoints fail safely',()=>{
  const storage=new MemoryStorage();storage.write('meta',{schema:1,runs:-99,wins:'x',upgrades:{health:999,focus:-5},settings:{volume:200},discovered:['waterbook','waterbook','missing'],history:[null,{seed:'x',score:'bad'}]});const m=storage.loadMeta();check(m.runs===0&&m.wins===0&&m.upgrades.health===3&&m.upgrades.focus===0&&m.settings.volume===1&&m.discovered.length===1&&m.history.length===0);
  storage.write('run',{schema:1,player:{hp:20},floors:[]});const g=new D.Game({storage});check(!g.load());
});
test('Each boss executes all three phases without non-finite entities',()=>{
  for(let f=0;f<3;f++){
    const g=game();g.run.floor=f;g.enterRoom(g.run.floors[f].bossId,null);g.player.invuln=999;const b=g.boss;
    for(let stage=1;stage<=3;stage++){b.hp=b.maxHp*([0,.9,.6,.3][stage]);step(g,18,{mx:0,my:0,fire:false});check(b.stage===stage);for(const e of [...g.enemies,...g.bullets])check(Number.isFinite(e.x)&&Number.isFinite(e.y));check(g.bullets.length<521&&g.enemies.length<=26);}
  }
});
test('Summon and particle limits hold in a 90-second stress simulation',()=>{
  const g=game();g.run.floor=2;g.enterRoom(1,null);g.player.invuln=999;g.meta.settings.particles=true;g.run.inventory[0]={id:'petrel',level:3};g.recompute();
  for(let i=0;i<90*60;i++){g.update(1/60,{mx:0,my:0,aimX:900,aimY:360,fire:true});choose(g);if(i%180===0){for(let n=0;n<8;n++){const p=g.pointFarFromPlayer();g.spawn('summoner',p.x,p.y);}}check(g.enemies.length<=26&&g.turrets.length<=2&&g.orbits.length<=7&&g.mines.length<=6&&g.particles.length<=450);}
});
test('Complete seeded campaigns: doors, 3 bosses, portals, final cinematic, once-only rewards',()=>{
  for(const seed of ['FULL-1','FULL-2','FULL-3']){
    const g=game({seed});let ended=0;g.on('run:end',()=>ended++);g.player.invuln=999;
    for(let f=0;f<3;f++){
      const bossId=g.run.floors[f].bossId;
      for(let id=1;id<=bossId;id++){
        const direction=Object.keys(g.room.doors).find(d=>g.room.doors[d]===id);check(!!direction);g.transition=0;g.transitionRoom(direction);check(g.run.roomId===id);g.player.invuln=999;
        for(let frame=0;frame<1200&&!g.room.cleared&&g.mode!=='winning';frame++){g.update(1/60,{mx:0,my:0,fire:false});for(const e of [...g.enemies])if(e.spawnTime<=0)g.killEnemy(e);choose(g);}
        check(g.room.cleared||g.mode==='winning');choose(g);
      }
      if(f<2){check(g.portal);g.player.x=D.W/2;g.player.y=D.H/2;g.interact();check(g.run.floor===f+1);}
    }
    check(g.mode==='winning');step(g,3);check(g.mode==='victory'&&g.run.won&&g.run.bosses===3);check(g.meta.wins===1&&g.meta.discovered.includes('diploma')&&ended===1);check(!g.hasSave());const reward=g.meta.inspiration;g.finish(true);check(g.meta.inspiration===reward&&ended===1);
  }
});
test('Infinite mode scales each layer, randomizes boss attacks, and continues after a boss',()=>{
  const g=game({mode:'infinite',difficulty:'normal',seed:'INFINITE-QA'});check(g.run.mode==='infinite'&&g.run.infiniteLayer===1);
  const first=g.spawn('paper',320,240,{spawnTime:0});const hp1=first.maxHp;g.run.infiniteLayer=2;const second=g.spawn('paper',320,240,{spawnTime:0});check(Math.abs(second.maxHp/hp1-1.1)<.0001,'enemy HP grows by 10% per layer');
  g.resetTransient();g.run.floor=0;g.run.infiniteLayer=1;const b1=g.spawnBoss('ta',g.infiniteBossConfig()),bossHp1=b1.maxHp;g.resetTransient();g.run.infiniteLayer=2;const b2=g.spawnBoss('ta',g.infiniteBossConfig());check(Math.abs(b2.maxHp/bossHp1-1.2)<.0001,'boss HP grows by 20% per layer');check(b2.patternOrder.length>=5&&new Set(b2.patternOrder).size===b2.patternOrder.length,'boss attack pool is shuffled');
  g.run.floor=2;g.run.infiniteLayer=1;g.run.floors[2]=D.generateFloor('INFINITE-QA/infinite/1',2);g.enterRoom(g.run.floors[2].bossId,null);const boss=g.boss;g.killEnemy(boss);check(g.mode==='winning'&&g.run.mode==='infinite');step(g,2.4);check(g.mode==='playing'&&g.run.infiniteLayer===2&&g.run.floor===0&&g.room.type==='start','infinite mode advances instead of ending');
});
test('Death, one-time revive, and capped permanent upgrades are consistent',()=>{
  const g=game();g.run.relics.push('secondChance');g.recompute();g.player.hp=1;g.player.shield=0;g.player.invuln=0;g.hitPlayer(999);check(g.run.usedRevive&&!g.run.ended);g.player.invuln=0;g.hitPlayer(999);check(g.mode==='dead'&&!g.run.won&&g.meta.runs===1&&g.meta.wins===0);g.returnToMenu();g.meta.inspiration=1000;for(let i=0;i<3;i++)check(g.buyMeta('focus'));check(!g.buyMeta('focus'));
});
const out={suite:'core and simulation',date:new Date().toISOString(),passed:tests.filter(t=>t.pass).length,failed:tests.filter(t=>!t.pass).length,assertions,tests};
fs.mkdirSync(path.join(__dirname,'artifacts'),{recursive:true});fs.writeFileSync(path.join(__dirname,'artifacts/core-results.json'),JSON.stringify(out,null,2));
console.log(`\n${out.passed} passed / ${out.failed} failed; ${assertions.toLocaleString()} assertions`);if(out.failed)process.exitCode=1;
