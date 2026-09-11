/* Runtime simulation. No DOM dependency: also executed by the headless tests. */
(function(root){
  'use strict';
  const D=root.DC,{W,H,PAD,TAU,clamp,dist,RNG}=D;
  const noop=()=>{};
  class Game{
    constructor(options={}){
      this.storage=options.storage||new D.Storage(options.storagePrefix);
      this.meta=this.storage.loadMeta();this.ui=options.ui||{};this.sound=options.sound||{play:noop,update:noop};
      this.mode='menu';this.run=null;this.time=0;this.clock=0;this.listeners=new Map();this.rng=new RNG('menu');this.visualRng=new RNG('visual');
      this.uid=0;this.input={mx:0,my:0,aimX:W*.75,aimY:H*.5,fire:false};this.resetTransient();
    }
    call(name,...args){return typeof this.ui[name]==='function'?this.ui[name](...args):undefined;}
    on(name,fn){if(!this.listeners.has(name))this.listeners.set(name,new Set());this.listeners.get(name).add(fn);return()=>this.listeners.get(name)?.delete(fn);}
    emit(name,detail={}){for(const f of this.listeners.get(name)||[]){try{f(detail);}catch(e){console.warn('DreamCampus listener:',e);}}}
    resetTransient(){this.enemies=[];this.bullets=[];this.particles=[];this.effects=[];this.floating=[];this.hazards=[];this.jobs=[];this.turrets=[];this.orbits=[];this.mines=[];this.pickups=[];this.obstacles=[];this.boss=null;this.wave=0;this.totalWaves=0;this.waveWait=0;this.combatStarted=false;this.shake=0;this.hitFlash=0;this.roomTime=0;this.roomDamage=0;this.transition=0.65;this.flowTimer=0;this.portal=false;}
    start(options={}){
      const seed=String(options.seed||`DREAM-${Date.now().toString(36)}`).trim().slice(0,40)||'DREAM';
      const character=D.CHARACTERS.find(c=>c.id===options.character)||D.CHARACTERS[0];
      const difficulty=D.DIFFICULTIES[options.difficulty]?options.difficulty:'normal';
      const inventory=[{id:character.starter,level:0},{id:character.secondary,level:0}];
      if(options.graduate&&this.meta.wins>0)inventory[0]={id:'diploma',level:0};
      const stats=D.makeStats(character.id,[],inventory,this.meta.upgrades);
      this.run={schema:1,version:D.VERSION,seed,character:character.id,difficulty,metaUpgrades:{...this.meta.upgrades},floor:0,roomId:0,floors:[0,1,2].map(f=>D.generateFloor(seed,f)),inventory,relics:[],selected:0,coins:15,score:0,kills:0,clears:0,bosses:0,elapsed:0,pending:null,usedRevive:false,ended:false,
        player:{x:W/2,y:H/2,r:16,hp:stats.maxHp,shield:stats.maxShield,energy:stats.maxEnergy,invuln:0,hitAgo:9,dashTime:0,dashCd:0,skillCd:0,drinkTime:0,drinkCd:0,cooldowns:[0,0],a:0,dx:0,dy:0}};
      this.stats=stats;this.rng=new RNG(seed+'/combat');this.visualRng=new RNG(seed+'/visual');this.mode='story';this.resetTransient();this.call('close');
      for(const w of inventory)this.discover(w.id);
      this.emit('run:start',{seed,character:character.id,difficulty});
      if(options.skipStory||!this.ui.story)this.beginFloor();
      else this.call('story',D.STORY,()=>this.beginFloor());
      return this.snapshot();
    }
    beginFloor(){this.mode='playing';this.enterRoom(0,null);const f=D.FLOORS[this.run.floor];this.call('banner',f.name,f.subtitle);this.emit('floor:enter',{floor:this.run.floor+1,name:f.short});}
    get room(){return this.run?.floors[this.run.floor].rooms[this.run.roomId];}
    get player(){return this.run?.player;}
    get weapon(){return this.run?D.WEAPONS[this.run.inventory[this.run.selected].id]:D.WEAPONS.waterbook;}
    get difficulty(){return D.DIFFICULTIES[this.run?.difficulty||'normal'];}
    recompute(){if(!this.run)return;this.stats=D.makeStats(this.run.character,this.run.relics,this.run.inventory,this.run.metaUpgrades||{});const p=this.player;p.hp=Math.min(p.hp,this.stats.maxHp);p.shield=Math.min(p.shield,this.stats.maxShield);p.energy=Math.min(p.energy,this.stats.maxEnergy);}
    discover(id){if(!this.meta.discovered.includes(id)){this.meta.discovered.push(id);this.storage.write('meta',this.meta);}}
    save(){if(this.run&&!this.run.ended){this.run.checkpoint='room-boundary';return this.storage.write('run',this.run);}return false;}
    hasSave(){const r=this.storage.read('run',null);return !!(r&&r.schema===1&&!r.ended&&r.floors?.length===3&&r.player);}
    load(){
      const r=this.storage.read('run',null);
      try{
        if(!r||r.schema!==1||r.ended||!Array.isArray(r.floors)||r.floors.length!==3||!D.CHARACTERS.some(c=>c.id===r.character)||!D.DIFFICULTIES[r.difficulty]||!Array.isArray(r.inventory)||r.inventory.length!==2||r.inventory.some(w=>!D.WEAPONS[w.id])||!r.player||!Number.isFinite(r.player.hp)||r.player.hp<=0||!r.floors[r.floor]?.rooms[r.roomId])throw Error('无效或不兼容的房间存档');
        if(r.floors.some(f=>!Array.isArray(f.rooms)||f.rooms.some(x=>!x.doors)))throw Error('地图数据不完整');
        if(typeof r.seed!=='string'||r.seed.length>40||![0,1,2].includes(r.floor)||![0,1].includes(r.selected)||!Number.isInteger(r.roomId))throw Error('存档基本字段无效');
        for(const k of ['shield','energy','hitAgo','dashCd','skillCd','drinkCd'])if(!Number.isFinite(r.player[k])||r.player[k]<0)throw Error('角色状态无效');
        for(const k of ['coins','score','kills','clears','bosses','elapsed'])if(!Number.isFinite(r[k])||r[k]<0||r[k]>1e9)throw Error('进度数值无效');
        if(r.inventory.some(w=>!Number.isInteger(w.level)||w.level<0||w.level>3))throw Error('武器等级无效');
        const roomTypes=['start','combat','elite','boss','treasure','rest','shop','event'];
        for(const f of r.floors){
          if(f.rooms.length<2||f.rooms.length>64||!Number.isInteger(f.bossId)||f.rooms[f.bossId]?.type!=='boss')throw Error('楼层结构无效');
          for(let i=0;i<f.rooms.length;i++){const room=f.rooms[i];
            if(room.id!==i||!roomTypes.includes(room.type)||![room.x,room.y,room.depth].every(Number.isFinite))throw Error('房间结构无效');
            for(const [dir,id] of Object.entries(room.doors))if(!Object.hasOwn(D.DIRECTIONS,dir)||!Number.isInteger(id)||f.rooms[id]?.doors?.[D.DIRECTIONS[dir].opposite]!==i)throw Error('门连接不完整');
            if(room.loot&&(!Object.hasOwn(D.WEAPONS,room.loot.id)||![room.loot.x,room.loot.y].every(Number.isFinite)))throw Error('掉落物无效');
            if(room.eventId&&!D.EVENTS.some(e=>e.id===room.eventId))throw Error('奇遇数据无效');
            if(room.shop&&(!Array.isArray(room.shop)||room.shop.length>4||room.shop.some(v=>!['weapon','heal','relic'].includes(v.type)||(v.type==='weapon'&&!Object.hasOwn(D.WEAPONS,v.id)))))throw Error('商店数据无效');
          }
        }
        if(r.pending){const p=r.pending;if(p.type==='relic'){if(!Array.isArray(p.options)||p.options.length<1||p.options.length>3||p.options.some(id=>!D.RELICS.some(v=>v.id===id)))throw Error('遗物选择无效');}else if(p.type==='weapon'){if(!p.weapon||!Object.hasOwn(D.WEAPONS,p.weapon.id)||!Number.isInteger(p.weapon.level)||p.weapon.level<0||p.weapon.level>3)throw Error('武器选择无效');}else throw Error('待领取奖励无效');}
        this.run=r;this.run.relics=(r.relics||[]).filter(id=>D.RELICS.some(v=>v.id===id));this.rng=new RNG(r.seed+'/combat/reload');this.visualRng=new RNG(r.seed+'/visual/reload');this.recompute();
        this.run.player.cooldowns=[0,0];this.run.player.dashTime=0;this.run.player.drinkTime=0;this.call('close');this.mode='playing';this.enterRoom(r.roomId,r.entryDirection||null,true);this.call('toast','已回到最近的房间检查点。');return true;
      }catch(e){this.call('toast',`${e.message}。可开始一场新梦境。`);return false;}
    }
    enterRoom(id,from,loading=false){
      this.resetTransient();this.run.roomId=id;const r=this.room;r.visited=true;this.run.entryDirection=from;
      this.obstacles=D.makeObstacles(this.run.seed,this.run.floor,r).map((o,i)=>({...o,id:i})).filter(o=>!(r.destroyed||[]).includes(o.id));
      const p=this.player;const entry=from?D.DIRECTIONS[from]:null;
      p.x=entry?entry.x-entry.dx*42:W/2;p.y=entry?entry.y-entry.dy*42:H/2;p.invuln=1.1;p.hitAgo=Math.max(p.hitAgo,3);p.dashTime=0;p.drinkTime=0;
      this.flow=new D.FlowField(this.obstacles);this.flow.update(p.x,p.y);
      if(r.cleared){this.portal=r.type==='boss';}
      else if(['combat','elite'].includes(r.type)){
        this.totalWaves=r.type==='elite'?2:(this.run.floor===0?1:2);this.waveWait=1.15;this.combatStarted=true;
        this.call('banner',r.type==='elite'?'选修挑战 · 精英房':'梦境封锁',r.type==='elite'?'危险更高，遗物与武器奖励也更好。':'清理敌人后，出口会重新开启。');
      }else if(r.type==='boss'){
        this.combatStarted=true;this.totalWaves=1;this.wave=1;
        this.spawnBoss(D.FLOORS[this.run.floor].boss);
      }else r.cleared=true;
      this.mode='playing';
      if(!loading)this.save();
      this.emit('room:enter',{floor:this.run.floor+1,roomId:id,type:r.type});
      this.call('update');
      if(this.run.pending)this.showPending();
      else if(r.type==='boss'&&!r.cleared&&this.ui.bossIntro){this.mode='bossIntro';this.call('bossIntro',D.FLOORS[this.run.floor],()=>{this.mode='playing';this.call('close');});}
    }
    transitionRoom(direction){if(this.mode!=='playing'||!this.room.cleared||this.transition>0)return;const id=this.room.doors[direction];if(id===undefined)return;this.save();this.enterRoom(id,D.DIRECTIONS[direction].opposite);this.sound.play('door');}
    pointFarFromPlayer(radius=22,minDistance=240){
      for(let i=0;i<100;i++){const x=this.rng.int(115,W-115),y=this.rng.int(115,H-115);if(D.isFree(x,y,radius,this.obstacles)&&Math.hypot(x-this.player.x,y-this.player.y)>minDistance&&!this.enemies.some(e=>!e.dead&&Math.hypot(x-e.x,y-e.y)<radius+e.r+14))return{x,y};}
      for(const pos of [{x:W/2,y:125},{x:W/2,y:H-125},{x:130,y:H/2},{x:W-130,y:H/2}])if(dist(pos,this.player)>minDistance)return pos;
      return{x:W/2,y:130};
    }
    spawn(kind,x,y,extra={}){
      const def=D.ENEMIES[kind];if(!def||this.enemies.filter(e=>!e.dead).length>=26)return null;
      const hp=def.hp*D.FLOORS[this.run.floor].baseHp*this.difficulty.enemyHp*(extra.elite?1.75:1);
      const e={id:++this.uid,kind,...def,x,y,hp,maxHp:hp,a:0,age:0,spawnTime:.80,cooldown:this.rng.next()*1.0+1.5,stun:0,slow:0,wet:0,burn:0,burnDps:0,burnTick:0,flash:0,summons:0,bounty:true,windup:0,chargeTime:0,...extra};
      this.enemies.push(e);return e;
    }
    spawnWave(){
      this.wave++;const f=this.run.floor,r=this.room;
      let budget=(3.3+f*2.0+r.depth*.35)*(r.type==='elite'?1.25:1);
      let n=0;while(budget>.6&&n<8){const pool=D.FLOORS[f].mobs.filter(k=>D.ENEMIES[k].cost<=budget+.2);const kind=this.rng.pick(pool.length?pool:['paper']),pos=this.pointFarFromPlayer(D.ENEMIES[kind].r,260);const elite=r.type==='elite'&&n===0;this.spawn(kind,pos.x,pos.y,{elite});budget-=D.ENEMIES[kind].cost*(elite?1.5:1);n++;}
      this.call('toast',`第 ${this.wave} / ${this.totalWaves} 波 · 先躲预警，再找输出机会`);this.sound.play('wave');
    }
    spawnBoss(kind){
      const hp=D.FLOORS[this.run.floor].bossHp*this.difficulty.enemyHp;
      const e={id:++this.uid,kind,boss:true,x:W/2,y:280,r:kind==='principal'?37:34,hp,maxHp:hp,a:Math.PI/2,age:0,spawnTime:1,cooldown:2.2,stage:1,pattern:0,stun:0,slow:0,wet:0,burn:0,burnDps:0,burnTick:0,flash:0,windup:0,bounty:true,phasePause:0,damage:18,color:kind==='ta'?'#d1afdf':kind==='chef'?'#efc780':'#eb9db5'};
      this.enemies.push(e);this.boss=e;return e;
    }
    schedule(delay,fn,owner=null,friendly=false){this.jobs.push({t:delay,fn,owner,friendly});}
    particle(x,y,color,count=8,speed=130){
      if(!this.meta.settings.particles)return;
      const n=Math.min(count,450-this.particles.length);for(let i=0;i<n;i++){const a=this.visualRng.next()*TAU,s=speed*(.3+this.visualRng.next()*.7),life=.3+this.visualRng.next()*.4;this.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,color,size:2+this.visualRng.next()*4,t:life,max:life});}
    }
    text(x,y,text,color='#fff0cd',size=15){this.floating.push({x,y,text,color,size,t:.85,max:.85});if(this.floating.length>55)this.floating.shift();}
    fx(type,props,life=.3){this.effects.push({type,t:life,max:life,...props});if(this.effects.length>100)this.effects.shift();}
    updateEffects(dt){
      for(const p of this.particles){p.t-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=Math.exp(-4*dt);p.vy*=Math.exp(-4*dt);}
      this.particles=this.particles.filter(p=>p.t>0);for(const e of this.effects)e.t-=dt;this.effects=this.effects.filter(e=>e.t>0);
      for(const t of this.floating){t.t-=dt;t.y-=24*dt;}this.floating=this.floating.filter(t=>t.t>0);this.shake=Math.max(0,this.shake-dt*28);this.hitFlash=Math.max(0,this.hitFlash-dt*3.5);
    }
    update(dt,input=this.input){
      dt=clamp(dt,0,1/30);this.clock+=dt;
      if(this.mode==='winning'){this.updateEffects(dt);this.cinematicTime-=dt;if(this.cinematicTime<=0)this.finish(true);return;}
      if(this.mode!=='playing')return;
      this.input=input;this.time+=dt;this.run.elapsed+=dt;this.roomTime+=dt;this.transition=Math.max(0,this.transition-dt);this.updateEffects(dt);
      this.updatePlayer(dt,input);
      if(this.mode!=='playing')return;
      const jobs=this.jobs;this.jobs=[];for(const j of jobs){j.t-=dt;if(j.owner?.dead)continue;if(j.t<=0)j.fn();else this.jobs.push(j);}
      this.flowTimer-=dt;if(this.flowTimer<=0){this.flow.update(this.player.x,this.player.y);this.flowTimer=.32;}
      for(const e of [...this.enemies])if(!e.dead)this.updateEnemy(e,dt);
      for(let i=0;i<this.enemies.length;i++)for(let j=i+1;j<this.enemies.length;j++){
        const a=this.enemies[i],b=this.enemies[j];if(a.dead||b.dead||a.boss||b.boss)continue;let d=dist(a,b),min=a.r+b.r+2;
        if(d<min&&d>.01){const push=(min-d)*.12,dx=(a.x-b.x)/d*push,dy=(a.y-b.y)/d*push;D.moveEntity(a,dx,dy,this.obstacles);D.moveEntity(b,-dx,-dy,this.obstacles);}
      }
      this.updateProjectiles(dt);this.updateSummons(dt);this.updateHazards(dt);this.updatePickups(dt);
      this.enemies=this.enemies.filter(e=>!e.dead);
      if(this.mode!=='playing')return;
      if(this.combatStarted&&!this.room.cleared&&this.enemies.length===0){
        if(this.wave<this.totalWaves){this.waveWait-=dt;if(this.waveWait<=0){this.spawnWave();this.waveWait=1.0;}}
        else this.clearRoom();
      }
      if(input.interact){input.interact=false;this.interact();}
      this.checkDoors(input);
    }
    updatePlayer(dt,input){
      const p=this.player,s=this.stats;
      for(const key of ['invuln','dashCd','skillCd','drinkCd'])p[key]=Math.max(0,(p[key]||0)-dt);
      p.hitAgo+=dt;p.cooldowns=p.cooldowns.map(t=>Math.max(0,t-dt));
      if(p.hitAgo>Math.max(2,6-(s.shieldDelay||0)))p.shield=Math.min(s.maxShield,p.shield+5*dt);
      p.energy=Math.min(s.maxEnergy,p.energy+s.energyRegen*dt);
      let mx=clamp(Number(input.mx)||0,-1,1),my=clamp(Number(input.my)||0,-1,1),len=Math.hypot(mx,my);
      if(len>1){mx/=len;my/=len;}
      if(Number.isFinite(input.aimX)&&Number.isFinite(input.aimY))p.a=Math.atan2(input.aimY-p.y,input.aimX-p.x);
      if(input.swap!==undefined&&input.swap!==null){this.swap(input.swap);input.swap=null;}
      if(input.dash){input.dash=false;if(p.dashCd<=0){const a=len>.05?Math.atan2(my,mx):p.a;p.dx=Math.cos(a);p.dy=Math.sin(a);p.dashTime=.19;p.dashCd=s.dashCooldown;p.invuln=Math.max(p.invuln,.26);this.sound.play('dash');this.fx('dash',{x:p.x,y:p.y,a},.22);}}
      if(input.skill){input.skill=false;this.skill();}
      if(input.drink){input.drink=false;if(p.drinkCd<=0&&p.energy<s.maxEnergy-8){p.drinkTime=.82;p.drinkCd=6.5;this.sound.play('drink');this.call('toast','喝水回专注：短暂停火，仍可移动。');}}
      if(p.drinkTime>0){p.drinkTime-=dt;if(p.drinkTime<=0){p.energy=Math.min(s.maxEnergy,p.energy+48);this.text(p.x,p.y-30,'专注 +48','#85e1dc');this.particle(p.x,p.y,'#92deda',15);}}
      if(p.dashTime>0){p.dashTime-=dt;D.moveEntity(p,p.dx*710*dt,p.dy*710*dt,this.obstacles);if(this.visualRng.next()<.55)this.fx('afterimage',{x:p.x,y:p.y,a:p.a},.16);}
      else D.moveEntity(p,mx*s.moveSpeed*dt,my*s.moveSpeed*dt,this.obstacles);
      p.moving=len>.06;
      const auto=!!(input.autoAim||this.meta.settings.autoFire);let fire=input.fire||this.meta.settings.autoFire;
      if(auto||this.meta.settings.aimAssist){
        const candidates=this.enemies.filter(e=>!e.dead&&e.spawnTime<=0&&D.los(p,e,this.obstacles));
        let nearest=null,best=1e9;for(const e of candidates){const d=dist(p,e);if(d<best){best=d;nearest=e;}}
        if(nearest&&(auto||fire)){p.a=Math.atan2(nearest.y-p.y,nearest.x-p.x);this.aimTarget=nearest;if(auto)fire=true;}
        else if(auto)fire=false;
      }else this.aimTarget=null;
      if(fire&&p.dashTime<=0&&p.drinkTime<=0)this.fire();
    }
    swap(slot){if(!this.run)return;const next=typeof slot==='number'&&slot>=0&&slot<2?slot:1-this.run.selected;if(next!==this.run.selected){this.run.selected=next;this.sound.play('swap');this.call('update');}}
    skill(){const p=this.player;if(!p||p.skillCd>0)return;p.skillCd=this.stats.skillCooldown;this.bullets=this.bullets.filter(b=>b.friendly);this.fx('pulse',{x:p.x,y:p.y,r:260,color:'#a7f5da'},.55);this.particle(p.x,p.y,'#b3f6d9',42,310);this.sound.play('skill');this.shake=7;
      for(const e of this.enemies)if(!e.dead&&dist(p,e)<240){this.hitEnemy(e,50+18*this.run.floor,{tag:'skill',stun:.65},p);}
      this.text(p.x,p.y-40,'拒绝内卷！','#c7ffe8',22);
    }
    fire(){
      const p=this.player,slot=this.run.selected,w=this.weapon,held=this.run.inventory[slot],s=this.stats;if(p.cooldowns[slot]>0)return;
      if(w.type==='orbit'&&this.orbits.some(o=>o.weapon===w.id&&o.life>1)){p.cooldowns[slot]=.2;return;}
      const cost=w.energy*(1-s.efficiency);if(p.energy+1e-8<cost){p.cooldowns[slot]=.12;if((this.emptyToast||0)<this.time){this.call('toast','专注不足：换零耗能武器，或按 R 喝水。');this.emptyToast=this.time+4;}return;}
      p.energy=Math.max(0,p.energy-cost);p.cooldowns[slot]=w.interval/(1+s.haste);
      const spec={...w,damage:D.weaponDamage(w,held.level,s),size:w.size*(1+(s.size||0)),crit:s.crit+(w.crit||0),pierce:w.pierce+(w.pierce>0?(s.pierce||0):0),radius:(w.radius||0)*(1+(s.blast||0)),duration:(w.duration||0)*(1+(s.duration||0))};
      const a=p.a;const origin={x:p.x+Math.cos(a)*22,y:p.y+Math.sin(a)*22};
      const aim=this.aimTarget||{x:this.input.aimX||p.x+Math.cos(a)*450,y:this.input.aimY||p.y+Math.sin(a)*450};
      this.executeWeapon(spec,origin,a,aim);
      this.sound.play(w.type==='beam'?'laser':w.type==='melee'?'swing':w.type==='lob'||w.type==='mine'?'lob':w.tag==='water'?'water':'shoot',w.rarity);
      this.fx('muzzle',{x:origin.x,y:origin.y,a,color:this.weaponColor(w)},.08);
    }
    weaponColor(w){return ({water:'#80e1e4',food:'#ffc574',geo:'#abdeb0',study:'#ece5b0',tech:'#c4a1f1',daily:'#f7b3c2',electric:'#f7e681',skill:'#c7ffe9'})[w.tag]||'#ffffff';}
    executeWeapon(w,o,a,aim){
      if(D.CUSTOM_BEHAVIORS?.[w.type])return D.CUSTOM_BEHAVIORS[w.type]({game:this,weapon:w,origin:o,angle:a,aim});
      const p=this.player,color=this.weaponColor(w);
      switch(w.type){
        case 'beam':{
          const end=D.lineEnd(o.x,o.y,o.x+Math.cos(a)*w.range,o.y+Math.sin(a)*w.range,this.obstacles);
          this.fx('beam',{x:o.x,y:o.y,x2:end.x,y2:end.y,width:w.width,color},.15);
          for(const e of this.enemies)if(!e.dead&&D.segmentActor(o.x,o.y,end.x,end.y,e,w.width/2))this.hitEnemy(e,w.damage,w,o);
          if(end.hit&&!end.hit.boundary)this.damageProp(end.hit,w.damage*.6);this.particle(end.x,end.y,color,5,90);break;
        }
        case 'chain':{
          const targets=this.enemies.filter(e=>!e.dead&&e.spawnTime<=0&&dist(o,e)<w.range&&D.los(o,e,this.obstacles)).sort((x,y)=>Math.abs(Math.atan2(Math.sin(Math.atan2(x.y-o.y,x.x-o.x)-a),Math.cos(Math.atan2(x.y-o.y,x.x-o.x)-a)))-Math.abs(Math.atan2(Math.sin(Math.atan2(y.y-o.y,y.x-o.x)-a),Math.cos(Math.atan2(y.y-o.y,y.x-o.x)-a))));
          let cur=o,target=targets[0],hit=new Set(),n=w.jumps+(this.stats.chain||0);
          for(let i=0;i<n&&target;i++){
            this.fx('lightning',{x:cur.x,y:cur.y,x2:target.x,y2:target.y,color,seed:this.visualRng.int(0,999)},.22);hit.add(target.id);this.hitEnemy(target,w.damage*Math.pow(.88,i),w,cur);cur=target;
            target=this.enemies.filter(e=>!e.dead&&!hit.has(e.id)&&dist(cur,e)<w.jumpRange&&D.los(cur,e,this.obstacles)).sort((x,y)=>dist(cur,x)-dist(cur,y))[0];
          }
          if(!hit.size)this.fx('lightning',{x:o.x,y:o.y,x2:o.x+Math.cos(a)*130,y2:o.y+Math.sin(a)*130,color,seed:1},.15);break;
        }
        case 'melee':{
          this.fx('slash',{x:p.x,y:p.y,a,arc:w.arc,r:w.range,color},.23);
          for(const e of this.enemies){if(e.dead)continue;const d=dist(p,e),ea=Math.atan2(e.y-p.y,e.x-p.x),da=Math.atan2(Math.sin(ea-a),Math.cos(ea-a));if(d<w.range+e.r&&Math.abs(da)<w.arc/2&&D.los(p,e,this.obstacles))this.hitEnemy(e,w.damage,w,p);}
          for(const ob of [...this.obstacles]){const c={x:ob.x+ob.w/2,y:ob.y+ob.h/2},da=Math.atan2(Math.sin(Math.atan2(c.y-p.y,c.x-p.x)-a),Math.cos(Math.atan2(c.y-p.y,c.x-p.x)-a));if(dist(p,c)<w.range&&Math.abs(da)<w.arc/2)this.damageProp(ob,w.damage);}
          if(w.clear)this.bullets=this.bullets.filter(b=>b.friendly||dist(p,b)>w.range);break;
        }
        case 'orbit':{
          this.orbits=this.orbits.filter(v=>v.weapon!==w.id);
          for(let i=0;i<w.count;i++)this.orbits.push({weapon:w.id,w:{...w,damage:w.damage*(1+(this.stats.summon||0))},phase:TAU*i/w.count,life:w.duration,hits:{},color,x:p.x,y:p.y});
          if(this.orbits.length>7)this.orbits.splice(0,this.orbits.length-7);break;
        }
        case 'turret':{
          if(this.turrets.length>=2)this.turrets.shift();
          this.turrets.push({id:++this.uid,x:p.x,y:p.y,w:{...w,damage:w.damage*(1+(this.stats.summon||0))},life:w.duration,cooldown:.25,a,color});this.particle(p.x,p.y,color,10);break;
        }
        case 'mine':{
          const d=Math.min(w.range,dist(p,aim)),end=D.lineEnd(p.x,p.y,p.x+Math.cos(a)*d,p.y+Math.sin(a)*d,this.obstacles,12);
          this.mines.push({x:end.x-Math.cos(a)*10,y:end.y-Math.sin(a)*10,w,age:0,life:w.duration,color});if(this.mines.length>6){const old=this.mines.shift();this.explode(old.x,old.y,old.w);}break;
        }
        case 'burst':{
          for(let i=0;i<w.burst;i++)this.schedule(i*w.delay,()=>{this.createBullet(w,o,a+(this.rng.next()-.5)*w.spread);if(i)this.sound.play('shoot',w.rarity);},null,true);break;
        }
        default:{
          const count=w.pellets||1;for(let i=0;i<count;i++){const da=count>1?(i-(count-1)/2)*(w.spread/Math.max(1,count-1)):(this.rng.next()-.5)*w.spread;
            const b=this.createBullet(w,o,a+da);if(w.type==='lob')b.life=b.maxLife=clamp(dist(o,aim)/w.speed,.23,w.life);}
        }
      }
    }
    createBullet(w,o,a,extra={}){
      if(this.bullets.length>520){const index=this.bullets.findIndex(b=>b.friendly);if(index>=0)this.bullets.splice(index,1);else return {life:0};}
      const b={id:++this.uid,x:o.x,y:o.y,px:o.x,py:o.y,vx:Math.cos(a)*w.speed,vy:Math.sin(a)*w.speed,a,r:w.size||5,life:w.life||1,maxLife:w.life||1,age:0,friendly:true,w:{...w},damage:w.damage,hits:new Set(),pierce:w.pierce||0,color:this.weaponColor(w),returning:false,...extra};this.bullets.push(b);return b;
    }
    enemyBullet(e,a,speed=185,props={}){
      if(this.bullets.filter(b=>!b.friendly).length>=240)return;
      const v=speed*this.difficulty.bulletSpeed;
      const base={x:e.x+Math.cos(a)*(e.r+7),y:e.y+Math.sin(a)*(e.r+7),r:6,age:0,life:5,maxLife:5,friendly:false,damage:(e.damage||11)*D.FLOORS[this.run.floor].baseDamage*this.difficulty.enemyDamage,color:'#fa897f',...props};
      const density=Math.max(1,Number(this.difficulty.bulletDensity)||1),count=Math.floor(density)+(this.rng.next()<density%1?1:0);
      // 轻松旁听增加同一轮弹幕的数量，并用小角度散开，避免只靠提高速度制造难度。
      for(let i=0;i<count;i++){
        if(this.bullets.filter(b=>!b.friendly).length>=240)break;
        const offset=i===0?0:(i%2===1?Math.ceil(i/2):-Math.ceil(i/2))*.065,angle=a+offset;
        this.bullets.push({id:++this.uid,...base,a:angle,vx:Math.cos(angle)*v,vy:Math.sin(angle)*v});
      }
    }
    warnCircle(x,y,r,delay,damage,owner=null){this.hazards.push({kind:'circle',x,y,r,t:delay,delay,life:.38,active:false,damage,owner,hit:false});}
    warnLine(x,y,x2,y2,width,delay,damage,owner=null,duration=.48){this.hazards.push({kind:'line',x,y,x2,y2,width,t:delay,delay,life:duration,active:false,damage,owner,hit:false});}
    enemyWindup(e,delay,fn){e.windup=delay;this.schedule(delay,()=>{if(!e.dead&&e.stun<=0){e.windup=0;fn();}},e);}
    updateEnemy(e,dt){
      e.age+=dt;e.spawnTime=Math.max(0,e.spawnTime-dt);e.flash=Math.max(0,e.flash-dt);e.wet=Math.max(0,e.wet-dt);e.slow=Math.max(0,e.slow-dt);e.stun=Math.max(0,e.stun-dt);e.windup=Math.max(0,e.windup-dt);
      if(e.burn>0){e.burn-=dt;e.burnTick-=dt;if(e.burnTick<=0){e.burnTick=.4;this.hitEnemy(e,e.burnDps*.4,{tag:'dot',dot:true},this.player);}}
      if(e.dead||e.spawnTime>0)return;
      if(e.boss){this.updateBoss(e,dt);return;}
      if(e.stun>0)return;
      const p=this.player,d=dist(e,p);e.a=Math.atan2(p.y-e.y,p.x-e.x);e.cooldown-=dt;
      if(e.chargeTime>0){e.chargeTime-=dt;const ox=e.x,oy=e.y;D.moveEntity(e,e.chargeX*335*dt,e.chargeY*335*dt,this.obstacles);if(Math.hypot(e.x-ox,e.y-oy)<dt*100){e.chargeTime=0;e.stun=.75;}if(e.chargeTime<=0)e.stun=.45;}
      else if(e.windup<=0){
        let speed=e.speed*(e.slow>0?.55:1),v=this.flow.direction(e,p);
        if(['shoot','fan','summon','radial','teleport'].includes(e.behavior)&&D.los(e,p,this.obstacles)){if(d<205){v.x*=-1;v.y*=-1;speed*=.8;}else if(d<330)speed=0;}
        if(e.behavior==='strafe'&&D.los(e,p,this.obstacles)){const a=e.a+Math.PI/2,radial=d>310?1:d<210?-1:0;v={x:Math.cos(a)*.8+Math.cos(e.a)*radial*.6,y:Math.sin(a)*.8+Math.sin(e.a)*radial*.6};}
        D.moveEntity(e,v.x*speed*dt,v.y*speed*dt,this.obstacles);
      }
      if(d<p.r+e.r+3&&e.behavior!=='bomb')this.hitPlayer(e.damage*D.FLOORS[this.run.floor].baseDamage*this.difficulty.enemyDamage,e);
      if(e.cooldown>0||e.windup>0||e.chargeTime>0)return;
      switch(e.behavior){
        case 'shoot':case 'fan':case 'strafe':case 'guard':{
          if(!D.los(e,p,this.obstacles)){e.cooldown=.4;break;}
          const a=e.a,n=e.behavior==='fan'?5:e.behavior==='guard'?3:1;e.cooldown=e.behavior==='fan'?2.8:2.2;
          this.enemyWindup(e,.57,()=>{for(let i=0;i<n;i++)this.enemyBullet(e,a+(i-(n-1)/2)*.19,e.behavior==='strafe'?205:185);});break;
        }
        case 'charge':{
          if(d>490||!D.los(e,p,this.obstacles)){e.cooldown=.5;break;}const a=e.a;e.cooldown=3.2;
          this.fx('warningLine',{x:e.x,y:e.y,x2:e.x+Math.cos(a)*270,y2:e.y+Math.sin(a)*270},.7);
          this.enemyWindup(e,.70,()=>{e.chargeTime=.62;e.chargeX=Math.cos(a);e.chargeY=Math.sin(a);this.sound.play('charge');});break;
        }
        case 'slam':{
          if(d>165){e.cooldown=.35;break;}e.cooldown=3.0;this.warnCircle(e.x,e.y,126,.85,e.damage*D.FLOORS[this.run.floor].baseDamage*this.difficulty.enemyDamage,e);this.enemyWindup(e,.85,()=>this.sound.play('impact'));break;
        }
        case 'bomb':{
          if(d>108){e.cooldown=.15;break;}e.cooldown=10;this.warnCircle(e.x,e.y,114,.80,e.damage*D.FLOORS[this.run.floor].baseDamage*this.difficulty.enemyDamage,null);this.enemyWindup(e,.78,()=>this.killEnemy(e));break;
        }
        case 'summon':{
          e.cooldown=4.9;if(e.summons<4&&this.enemies.length<14){this.enemyWindup(e,.9,()=>{for(let i=0;i<2;i++){const pos=this.pointFarFromPlayer(15,170);this.spawn('paper',pos.x,pos.y,{bounty:false});e.summons++;}});}
          else{const a=e.a;this.enemyWindup(e,.65,()=>this.enemyBullet(e,a));}break;
        }
        case 'teleport':{
          e.cooldown=4.0;const pos=this.pointFarFromPlayer(19,230);this.fx('spawn',{x:pos.x,y:pos.y,r:28,color:'#92dfdc'},.9);
          this.enemyWindup(e,.9,()=>{this.particle(e.x,e.y,'#89dddd',12);e.x=pos.x;e.y=pos.y;const a=Math.atan2(p.y-e.y,p.x-e.x);for(let i=-1;i<=1;i++)this.enemyBullet(e,a+i*.2,180);});break;
        }
        case 'radial':{
          e.cooldown=3.6;this.enemyWindup(e,.8,()=>{const phase=this.rng.next()*TAU;for(let i=0;i<10;i++)this.enemyBullet(e,phase+i*TAU/10,157);});break;
        }
        default:e.cooldown=1;
      }
    }
    updateBoss(e,dt){
      const p=this.player,f=this.run.floor;e.a=Math.atan2(p.y-e.y,p.x-e.x);
      const targetStage=e.hp/e.maxHp<.32?3:e.hp/e.maxHp<.66?2:1;
      if(targetStage>e.stage){
        e.stage=targetStage;e.phasePause=1.3;e.cooldown=1.8;this.bullets=this.bullets.filter(b=>b.friendly);this.hazards=[];this.jobs=this.jobs.filter(j=>j.friendly);this.shake=9;
        this.fx('pulse',{x:e.x,y:e.y,r:260,color:e.color},.7);this.call('banner',`${D.FLOORS[f].bossName} · 第 ${e.stage} 阶段`,e.kind==='principal'?['','正式答辩','绩点评估 · 注意盖章预警','毕业审判 · 环形弹幕有缺口'][e.stage]:'换题了。别慌，攻击前仍然会给出预警。');this.sound.play('phase');
      }
      if(e.phasePause>0){e.phasePause-=dt;return;}if(e.stun>0)return;
      const tx=W/2+Math.sin(e.age*.42)*210,ty=292+Math.sin(e.age*.61)*30,d=Math.hypot(tx-e.x,ty-e.y)||1;
      if(e.windup<=0)D.moveEntity(e,(tx-e.x)/d*42*dt,(ty-e.y)/d*42*dt,this.obstacles);
      if(dist(e,p)<e.r+p.r+4)this.hitPlayer(18*this.difficulty.enemyDamage,e);
      e.cooldown-=dt;if(e.cooldown>0)return;e.cooldown=Math.max(1.5,2.6-.25*e.stage);const pattern=e.pattern++;
      const damage=(14+f*2)*this.difficulty.enemyDamage,baseA=e.a;
      const ring=(n,speed,phase,gap=2)=>{for(let i=0;i<n;i++)if(i>=gap)this.enemyBullet(e,phase+i*TAU/n,speed,{r:6});};
      if(e.kind==='ta'){
        switch(pattern%3){
          case 0:this.enemyWindup(e,.75,()=>{for(let i=-2-e.stage;i<=2+e.stage;i++)this.enemyBullet(e,baseA+i*.14,184);});break;
          case 1:{for(let i=0;i<2+e.stage;i++){const a=TAU*i/(2+e.stage),x=clamp(p.x+Math.cos(a)*55,PAD+90,W-PAD-90),y=clamp(p.y+Math.sin(a)*55,PAD+90,H-PAD-90);this.warnCircle(x,y,61,.95+i*.18,damage,e);}e.windup=.8;break;}
          case 2:this.enemyWindup(e,.9,()=>ring(14+e.stage*2,150,this.rng.next()*TAU,3));break;
        }
      }else if(e.kind==='chef'){
        switch(pattern%4){
          case 0:this.enemyWindup(e,.75,()=>{for(let j=0;j<3;j++)this.schedule(j*.25,()=>{for(let i=-3;i<=3;i++)this.enemyBullet(e,baseA+i*.16+(j-1)*.065,175+j*18,{r:7});},e);});break;
          case 1:for(let i=0;i<3+e.stage;i++){const pos=i===0?{x:p.x,y:p.y}:this.pointFarFromPlayer(10,0);this.warnCircle(pos.x,pos.y,75,1.0+i*.12,damage+2,e);}e.windup=.9;break;
          case 2:this.enemyWindup(e,.9,()=>ring(17+e.stage,165,this.rng.next()*TAU,3));break;
          case 3:{const x=clamp(p.x,160,W-160);this.warnLine(x,PAD+5,x,H-PAD-5,62,1.0,damage,e,.55);if(e.stage>=2)this.warnLine(PAD+5,p.y,W-PAD-5,p.y,42,1.35,damage,e,.50);e.windup=1.0;break;}
        }
      }else{
        switch(pattern%5){
          case 0:{const phase=this.rng.next()*TAU;this.enemyWindup(e,.85,()=>{ring(18+e.stage*2,170,phase,4);if(e.stage>=2)this.schedule(.5,()=>ring(18+e.stage*2,155,phase+.13,4),e);});break;}
          case 1:{this.warnCircle(p.x,p.y,90,1.05,damage+3,e);for(let i=1;i<e.stage+2;i++){const pos=this.pointFarFromPlayer(20,70);this.warnCircle(pos.x,pos.y,78,1.10+i*.18,damage,e);}e.windup=.9;break;}
          case 2:{const a=baseA;for(let i=0;i<e.stage+1;i++){const ra=a+(i-(e.stage)/2)*.33;this.warnLine(e.x,e.y,e.x+Math.cos(ra)*1200,e.y+Math.sin(ra)*1200,19,1.10,damage,e,.70);}e.windup=1.1;break;}
          case 3:{this.enemyWindup(e,.85,()=>{if(this.enemies.filter(x=>!x.boss).length<4){for(let i=0;i<2;i++){const pos=this.pointFarFromPlayer(18,250);this.spawn(e.stage===3?'rollcall':'paper',pos.x,pos.y,{bounty:false});}}for(let i=-3;i<=3;i++)this.enemyBullet(e,baseA+i*.15,205);});break;}
          case 4:{const safe=this.rng.int(1,4),lane=(W-2*PAD)/6;for(let i=0;i<6;i++)if(i!==safe&&i!==safe-1)this.warnLine(PAD+lane*(i+.5),PAD,PAD+lane*(i+.5),H-PAD,70,1.2,damage,e,.65);this.enemyWindup(e,1.0,()=>{for(let i=-2;i<=2;i++)this.enemyBullet(e,baseA+i*.18,175);});break;}
        }
      }
    }
    updateProjectiles(dt){
      for(const b of [...this.bullets]){
        if(b.dead)continue;b.age+=dt;b.life-=dt;const oldX=b.x,oldY=b.y;b.px=oldX;b.py=oldY;
        if(b.friendly){
          const w=b.w;
          if(w.type==='homing'){
            const target=this.enemies.filter(e=>!e.dead&&e.spawnTime<=0&&!b.hits.has(e.id)&&dist(e,b)<520&&D.los(b,e,this.obstacles)).sort((a,c)=>dist(a,b)-dist(c,b))[0];
            if(target){const ta=Math.atan2(target.y-b.y,target.x-b.x),delta=Math.atan2(Math.sin(ta-b.a),Math.cos(ta-b.a));b.a+=clamp(delta,-w.turn*dt,w.turn*dt);b.vx=Math.cos(b.a)*w.speed;b.vy=Math.sin(b.a)*w.speed;}
          }
          if(w.type==='boomerang'){
            if(!b.returning&&b.age>b.maxLife*.43){b.returning=true;b.hits.clear();}
            if(b.returning){b.a=Math.atan2(this.player.y-b.y,this.player.x-b.x);b.vx=Math.cos(b.a)*w.speed*1.35;b.vy=Math.sin(b.a)*w.speed*1.35;if(dist(b,this.player)<23){b.dead=true;continue;}}
          }
        }
        const nx=b.x+b.vx*dt,ny=b.y+b.vy*dt,end=D.lineEnd(b.x,b.y,nx,ny,this.obstacles,b.r*.55);
        b.x=end.x;b.y=end.y;
        if(b.friendly){
          const hits=this.enemies.filter(e=>!e.dead&&e.spawnTime<=0&&!b.hits.has(e.id)&&D.segmentActor(oldX,oldY,b.x,b.y,e,b.r)).sort((a,c)=>Math.hypot(a.x-oldX,a.y-oldY)-Math.hypot(c.x-oldX,c.y-oldY));
          for(const e of hits){
            b.hits.add(e.id);
            if(b.w.radius>0){this.explode(b.x,b.y,b.w);b.dead=true;break;}
            this.hitEnemy(e,b.damage,b.w,{x:oldX,y:oldY});
            if(b.w.type!=='boomerang'){if(b.pierce<=0){b.dead=true;break;}b.pierce--;}
          }
        }else if(D.segmentCircle(oldX,oldY,b.x,b.y,this.player.x,this.player.y,b.r+this.player.r-3)){
          if(this.player.dashTime<=0){this.hitPlayer(b.damage,b);b.dead=true;}
        }
        if(!b.dead&&end.hit){if(b.friendly&&b.w.radius>0)this.explode(b.x,b.y,b.w);else if(b.friendly&&!end.hit.boundary)this.damageProp(end.hit,b.damage*.6);this.particle(b.x,b.y,b.color,3,65);b.dead=true;}
        if(!b.dead&&b.life<=0){if(b.friendly&&b.w.radius>0)this.explode(b.x,b.y,b.w);b.dead=true;}
      }
      this.bullets=this.bullets.filter(b=>!b.dead&&Number.isFinite(b.x)&&Number.isFinite(b.y));
    }
    updateSummons(dt){
      for(const t of this.turrets){
        t.life-=dt;t.cooldown-=dt;
        if(t.cooldown<=0){const e=this.enemies.filter(e=>!e.dead&&e.spawnTime<=0&&dist(t,e)<t.w.range&&D.los(t,e,this.obstacles)).sort((a,b)=>dist(t,a)-dist(t,b))[0];
          if(e){t.a=Math.atan2(e.y-t.y,e.x-t.x);const count=t.w.pellets||1;for(let i=0;i<count;i++)this.createBullet({...t.w,type:t.w.homing?'homing':'shot',turn:4,speed:490,life:1.4,size:4,pierce:0},t,t.a+(i-(count-1)/2)*.14);t.cooldown=t.w.rate;this.sound.play('turret');}else t.cooldown=.12;
        }
      }this.turrets=this.turrets.filter(t=>t.life>0);
      for(const o of this.orbits){o.life-=dt;const angle=this.time*2.8+o.phase;o.x=this.player.x+Math.cos(angle)*o.w.range;o.y=this.player.y+Math.sin(angle)*o.w.range;
        for(const e of this.enemies)if(!e.dead&&dist(o,e)<e.r+13&&(o.hits[e.id]||0)<this.time&&D.los(this.player,e,this.obstacles)){o.hits[e.id]=this.time+.55;this.hitEnemy(e,o.w.damage,o.w,this.player);}
      }this.orbits=this.orbits.filter(o=>o.life>0);
      for(const m of this.mines){m.life-=dt;m.age+=dt;if(m.age>m.w.arm&&(m.life<=0||this.enemies.some(e=>!e.dead&&dist(m,e)<55+e.r))){this.explode(m.x,m.y,m.w);m.dead=true;}}
      this.mines=this.mines.filter(m=>!m.dead);
    }
    updateHazards(dt){
      for(const h of this.hazards){
        if(h.owner?.dead){h.dead=true;continue;}
        if(!h.active){h.t-=dt;if(h.t<=0){h.active=true;this.shake=Math.max(this.shake,4);this.sound.play('impact');if(h.kind==='circle'){this.fx('blast',{x:h.x,y:h.y,r:h.r,color:'#fb9984'},.35);this.particle(h.x,h.y,'#eda284',14,220);}}}
        if(h.active){h.life-=dt;const p=this.player,inside=h.kind==='circle'?dist(p,h)<h.r+p.r-4:D.segmentCircle(h.x,h.y,h.x2,h.y2,p.x,p.y,h.width/2+p.r-3);
          if(inside&&!h.hit&&p.dashTime<=0){const hit=this.hitPlayer(h.damage,h);if(hit)h.hit=true;}if(h.life<=0)h.dead=true;}
      }this.hazards=this.hazards.filter(h=>!h.dead);
    }
    updatePickups(dt){
      for(const c of this.pickups){c.age+=dt;const d=dist(c,this.player);if(d<185||this.room.cleared){const s=400*dt;c.x+=(this.player.x-c.x)/Math.max(1,d)*Math.min(s,d);c.y+=(this.player.y-c.y)/Math.max(1,d)*Math.min(s,d);}
        if(d<23){this.run.coins+=c.value;c.dead=true;this.sound.play('coin');}}
      this.pickups=this.pickups.filter(c=>!c.dead);
    }
    explode(x,y,w){
      const r=w.radius||70,blastHits=new Set();this.fx('blast',{x,y,r,color:this.weaponColor(w)},.38);this.particle(x,y,this.weaponColor(w),23,260);this.shake=Math.max(this.shake,5);this.sound.play('explode');
      for(const e of this.enemies){const d=Math.hypot(e.x-x,e.y-y);if(!e.dead&&d<r+e.r&&D.los({x,y},e,this.obstacles)){blastHits.add(e.id);this.hitEnemy(e,w.damage*(.60+.40*(1-clamp(d/r,0,1))),w,{x,y});}}
      for(const o of [...this.obstacles])if(Math.hypot(o.x+o.w/2-x,o.y+o.h/2-y)<r+20)this.damageProp(o,w.damage);
      if(w.fragments)for(let i=0;i<w.fragments;i++)this.createBullet({...w,type:'shot',damage:w.damage*.17,radius:0,fragments:0,speed:370,size:4,life:.55,pierce:0},{x,y},i*TAU/w.fragments,{hits:new Set(blastHits)}); // Shrapnel cannot hit the same target twice through the main blast.
    }
    damageProp(o,amount){if(o.boundary||o.kind==='plant'||!Number.isFinite(o.hp))return;o.hp=Math.max(0,o.hp-amount);if(o.hp===0){this.particle(o.x+o.w/2,o.y+o.h/2,'#b9aa80',12);this.obstacles=this.obstacles.filter(p=>p.hp>0);this.flow.rebuild(this.obstacles);this.flow.update(this.player.x,this.player.y);this.room.destroyed=this.room.destroyed||[];if(!this.room.destroyed.includes(o.id))this.room.destroyed.push(o.id);}}
    hitEnemy(e,base,w={},source=this.player){
      if(e.dead||e.spawnTime>0||e.phasePause>0)return;
      let damage=base,crit=false;
      if(!w.dot){
        if(this.rng.next()<(w.crit===undefined?this.stats.crit:w.crit)){damage*=1.7;crit=true;}
        if(e.wet>0){if(w.tag==='electric')damage*=1.35;damage*=1+(this.stats.wetBonus||0);}
        if(e.behavior==='guard'&&w.type!=='melee'&&source){const a=Math.atan2(source.y-e.y,source.x-e.x),diff=Math.abs(Math.atan2(Math.sin(a-e.a),Math.cos(a-e.a)));if(diff<1.05){damage*=.38;this.fx('guard',{x:e.x,y:e.y,a:e.a,r:e.r+9,color:'#c9d6ed'},.15);}}
      }
      e.hp-=damage;e.flash=.09;
      if(w.wet)e.wet=Math.max(e.wet,w.wet);if(w.slow)e.slow=Math.max(e.slow,e.boss?w.slow*.45:w.slow);
      if(w.stun)e.stun=Math.max(e.stun,e.boss?Math.min(w.stun,.13):w.stun);
      if(w.burn){e.burn=Math.max(e.burn,w.burn);e.burnDps=Math.max(e.burnDps,base*.16);}
      if(w.knock&&!e.boss&&source){const d=dist(e,source)||1;D.moveEntity(e,(e.x-source.x)/d*w.knock*.15,(e.y-source.y)/d*w.knock*.15,this.obstacles);}
      this.text(e.x+(this.visualRng.next()-.5)*18,e.y-e.r-8,`${crit?'✦ ':''}${Math.max(1,Math.round(damage))}`,crit?'#ffdb8d':w.dot?'#f3ad80':'#f7f1d4',crit?20:14);
      this.particle(e.x,e.y,this.weaponColor(w),crit?6:3,95);this.sound.play('hit');
      if(e.hp<=0)this.killEnemy(e);
    }
    killEnemy(e){
      if(e.dead)return;e.dead=true;this.run.kills++;this.run.score+=e.boss?500:e.elite?45:e.bounty?12:4;
      this.particle(e.x,e.y,e.color||'#c9ddae',e.boss?100:e.elite?24:13,e.boss?370:180);this.fx('poof',{x:e.x,y:e.y,r:e.r*1.9,color:e.color||'#c7dbaf'},.32);this.sound.play(e.boss?'bossDeath':'kill');
      if(e.bounty&&!e.boss)this.pickups.push({x:e.x,y:e.y,value:e.elite?6:1+this.rng.int(0,1),age:0});
      if(e.behavior==='split'){
        for(let i=0;i<2;i++){let x=e.x+(i?24:-24),y=e.y;if(!D.isFree(x,y,10,this.obstacles)){x=e.x;y=e.y;}this.spawn('mini',x,y,{bounty:false,spawnTime:.55});}
      }
      if(e.boss){
        this.run.bosses++;this.room.bossDown=true;for(const other of this.enemies)if(other!==e)other.dead=true;this.bullets=[];this.hazards=[];this.jobs=[];this.turrets=[];this.orbits=[];this.mines=[];this.boss=null;this.shake=15;
        this.emit('boss:defeated',{boss:e.kind,floor:this.run.floor+1});
        if(this.run.floor===2){this.room.cleared=true;this.run.clears++;this.mode='winning';this.cinematicTime=2.2;this.fx('victory',{x:e.x,y:e.y,r:1400,color:'#ffe6a1'},2.2);this.call('banner','最后一个学分 · 已取得','梦正在散去。下课铃终于响了。');}
      }
    }
    hitPlayer(amount,source){
      const p=this.player;if(!p||this.mode!=='playing'||p.invuln>0||p.dashTime>0)return false;
      let damage=Math.max(1,amount*(1-this.stats.armor));const shieldHit=Math.min(p.shield,damage);p.shield-=shieldHit;damage-=shieldHit;p.hp=Math.max(0,p.hp-damage);p.invuln=.72+(this.stats.invuln||0);p.hitAgo=0;this.roomDamage+=amount;
      this.hitFlash=.45;this.shake=7;this.sound.play('hurt');this.text(p.x,p.y-30,`−${Math.round(amount*(1-this.stats.armor))}`,shieldHit>=amount?'#9bdcd4':'#ffada2',19);this.particle(p.x,p.y,damage?'#efa095':'#a5dad4',15);
      if(this.stats.thorns){for(const e of this.enemies)if(!e.dead&&dist(p,e)<145)this.hitEnemy(e,this.stats.thorns,{tag:'skill'},p);this.fx('pulse',{x:p.x,y:p.y,r:145,color:'#efa9bb'},.35);}
      if(p.hp<=0){
        if(this.stats.revive&&!this.run.usedRevive){this.run.usedRevive=true;p.hp=Math.ceil(this.stats.maxHp*.45);p.invuln=3;this.bullets=this.bullets.filter(b=>b.friendly);this.hazards=[];this.fx('pulse',{x:p.x,y:p.y,r:350,color:'#d9f6b3'},1);this.call('banner','补考机会生效','这一次，再给自己一个机会。');this.sound.play('skill');}
        else if(this.mode!=='winning')this.finish(false); // Final-boss mutual KO resolves as a victory.
      }
      return true;
    }
    clearRoom(){
      if(this.room.cleared)return;const r=this.room;r.cleared=true;this.combatStarted=false;this.run.clears++;this.bullets=[];this.hazards=[];this.jobs=this.jobs.filter(j=>j.friendly);
      let coins=12+this.run.floor*5+Math.floor(r.depth*.7)+(this.stats.roomCoins||0)+(this.roomDamage===0?5:0);
      if(r.type==='elite')coins+=12;if(r.type==='boss')coins+=28;coins+=this.pickups.reduce((s,c)=>s+c.value,0);this.pickups=[];this.run.coins+=coins;
      this.run.score+=60+(this.roomDamage===0?35:0);
      let heal=(this.stats.roomHeal||0)+(this.player.hp<this.stats.maxHp*.40?10:0);if(r.type==='boss')heal+=22;this.heal(heal);this.player.energy=Math.min(this.stats.maxEnergy,this.player.energy+30);
      const rng=new RNG(`${this.run.seed}/${this.run.floor}/${r.id}/clear`);
      if(r.type==='elite'||r.type==='boss'||rng.next()<.31+(this.stats.luck||0)){
        const w=D.rollWeapon(rng,this.run.floor,r.type==='elite'?Math.min(3,this.run.floor+1):0,null,this.meta.wins>0);r.loot={id:w.id,level:0,x:W/2+115,y:H/2+75};
      }
      this.portal=r.type==='boss';this.sound.play('clear');this.call('banner',r.type==='boss'?'章节完成':this.roomDamage===0?'漂亮！无伤清房':'房间已清理',`+${coins} 学分币${heal?` · 回复 ${heal} 生命`:''} · 出口已经开启`);this.emit('room:clear',{floor:this.run.floor+1,roomId:r.id,perfect:this.roomDamage===0,coins});
      if(r.type==='boss'||r.type==='elite'||this.run.clears%3===0)this.offerRelics('清房奖励',rng);else this.save();
    }
    heal(amount){if(!amount)return;const before=this.player.hp;this.player.hp=Math.min(this.stats.maxHp,this.player.hp+amount);if(this.player.hp>before)this.text(this.player.x,this.player.y-40,`+${Math.round(this.player.hp-before)}`,'#9aefb9',18);}
    offerRelics(source,rng=new RNG(`${this.run.seed}/${this.run.floor}/${this.room.id}/relic/${source}`),specific=null){
      let options=rng.shuffle(D.RELICS.filter(r=>!this.run.relics.includes(r.id))).slice(0,3).map(r=>r.id);
      if(specific&&!this.run.relics.includes(specific))options=[specific];
      if(!options.length){this.run.coins+=30;this.call('toast','遗物已收集齐：转为 30 学分币。');this.run.pending=null;this.save();return;}
      this.run.pending={type:'relic',options,source};this.save();this.showPending();
    }
    offerWeapon(id,level=0,source='梦境掉落'){
      if(!D.WEAPONS[id])return;this.run.pending={type:'weapon',weapon:{id,level:clamp(level,0,3)},source};this.discover(id);this.save();this.showPending();
    }
    showPending(){const p=this.run.pending;if(!p)return;this.mode='choice';this.call('choice',p);}
    chooseReward(choice){
      const pending=this.run?.pending;if(!pending||this.mode!=='choice')return false;
      if(pending.type==='relic'){
        if(!pending.options.includes(choice))return false;const r=D.RELICS.find(v=>v.id===choice);if(!r||this.run.relics.includes(r.id))return false;
        this.run.relics.push(r.id);this.recompute();this.heal(r.heal||0);if(r.refillShield)this.player.shield=this.stats.maxShield;if(r.coins)this.run.coins+=r.coins;
        this.call('toast',`获得遗物：${r.name}`);this.emit('relic:acquired',{id:r.id});
      }else if(pending.type==='weapon'){
        if(choice==='salvage'){const w=D.WEAPONS[pending.weapon.id],coins=8+w.rarity*4;this.run.coins+=coins;this.call('toast',`已拆解为 ${coins} 学分币。`);}
        else if(choice===0||choice===1){this.run.inventory[choice]={...pending.weapon};this.run.selected=choice;this.player.cooldowns[choice]=.2;this.recompute();this.call('toast',`已装备 ${D.WEAPONS[pending.weapon.id].name}`);this.emit('weapon:equipped',{...pending.weapon,slot:choice});}
        else return false;
      }else return false;
      this.run.pending=null;this.mode='playing';this.call('close');this.sound.play('reward');this.save();return true;
    }
    nearbyInteraction(){
      if(!this.run||!this.room.cleared)return null;const r=this.room,p=this.player;
      const objects=[];
      if(r.loot)objects.push({type:'loot',x:r.loot.x,y:r.loot.y,label:`拾取 ${D.WEAPONS[r.loot.id].name}`,range:76});
      if(r.type==='treasure'&&!r.interacted)objects.push({type:'chest',x:W/2,y:H/2,label:'打开失物招领箱',range:100});
      if(r.type==='shop')objects.push({type:'shop',x:W/2,y:H/2-15,label:'校园二手交易 / 武器升级',range:140});
      if(r.type==='rest'&&!r.interacted)objects.push({type:'rest',x:W/2,y:H/2,label:'休息：回复 40 生命，护盾和专注回满',range:135});
      if(r.type==='event'&&!r.interacted)objects.push({type:'event',x:W/2,y:H/2,label:'查看校园奇遇',range:135});
      if(r.type==='boss'&&this.portal&&this.run.floor<2)objects.push({type:'portal',x:W/2,y:H/2,label:'进入下一段梦境',range:95});
      if(r.type==='start')objects.push({type:'notice',x:W/2,y:H/2-105,label:'查看便签：操作与探索提示',range:85});
      return objects.filter(o=>dist(o,p)<o.range).sort((a,b)=>dist(a,p)-dist(b,p))[0]||null;
    }
    interact(){
      if(this.mode!=='playing')return;const action=this.nearbyInteraction();if(!action)return;const r=this.room;
      switch(action.type){
        case 'loot':{const item=r.loot;r.loot=null;this.offerWeapon(item.id,item.level,'战利品');break;}
        case 'chest':{r.interacted=true;const w=D.rollWeapon(new RNG(`${this.run.seed}/${this.run.floor}/${r.id}/chest`),this.run.floor,Math.min(3,this.run.floor+1),null,this.meta.wins>0);this.sound.play('chest');this.particle(W/2,H/2,'#efc778',35);this.offerWeapon(w.id,0,'失物招领箱');break;}
        case 'shop':this.openShop();break;
        case 'rest':r.interacted=true;this.heal(40);this.player.energy=this.stats.maxEnergy;this.player.shield=this.stats.maxShield;this.player.skillCd=0;this.sound.play('heal');this.fx('pulse',{x:W/2,y:H/2,r:220,color:'#8de3b7'},.7);this.call('toast','充电完毕。别忘了对自己好一点。');this.save();break;
        case 'event':this.openEvent();break;
        case 'portal':this.nextFloor();break;
        case 'notice':this.pause('help');break;
      }
    }
    checkDoors(input){
      if(!this.room.cleared||this.transition>0||this.mode!=='playing')return;const p=this.player;
      if(p.y<PAD+45&&Math.abs(p.x-W/2)<68&&input.my<-.1)this.transitionRoom('N');
      else if(p.y>H-PAD-45&&Math.abs(p.x-W/2)<68&&input.my>.1)this.transitionRoom('S');
      else if(p.x<PAD+45&&Math.abs(p.y-H/2)<68&&input.mx<-.1)this.transitionRoom('W');
      else if(p.x>W-PAD-45&&Math.abs(p.y-H/2)<68&&input.mx>.1)this.transitionRoom('E');
    }
    nextFloor(){if(!this.portal||this.run.floor>=2||this.mode!=='playing')return;this.run.floor++;this.run.roomId=0;this.player.energy=this.stats.maxEnergy;this.player.shield=this.stats.maxShield;this.beginFloor();this.sound.play('portal');}
    getShop(){
      const r=this.room;if(!r.shop){const rng=new RNG(`${this.run.seed}/${this.run.floor}/${r.id}/shop`);const a=D.rollWeapon(rng,this.run.floor,1,null,this.meta.wins>0),b=D.rollWeapon(rng,this.run.floor,Math.min(3,this.run.floor+2),null,this.meta.wins>0);r.shop=[{type:'weapon',id:a.id,sold:false},{type:'weapon',id:b.id,sold:false},{type:'heal',sold:false},{type:'relic',sold:false}];}
      return r.shop.map((item,index)=>({...item,index,price:this.shopPrice(item)}));
    }
    shopPrice(item){const base=item.type==='weapon'?D.RARITIES[D.WEAPONS[item.id].rarity].price:item.type==='heal'?20:54;return Math.max(1,Math.round(base*(1-Math.min(.45,this.stats.discount||0))));}
    upgradePrice(slot){const w=this.run.inventory[slot];return Math.round((30+w.level*24)*(1-Math.min(.45,this.stats.discount||0)));}
    openShop(){this.getShop();this.save();this.mode='shop';this.call('shop');}
    buy(index){
      if(this.mode!=='shop')return false;const item=this.room.shop[index];if(!item||item.sold)return false;const cost=this.shopPrice(item);if(this.run.coins<cost){this.call('toast','学分币不够，学长暂时不接受画饼。');return false;}
      if(item.type==='heal'&&this.player.hp>=this.stats.maxHp){this.call('toast','生命已满，先把钱留着吧。');return false;}
      this.run.coins-=cost;item.sold=true;this.sound.play('buy');
      if(item.type==='weapon')this.offerWeapon(item.id,0,'二手群交易');
      else if(item.type==='relic')this.offerRelics('神秘遗物');
      else{this.heal(35);this.save();this.call('shop');}
      return true;
    }
    upgrade(slot){
      if(this.mode!=='shop'||![0,1].includes(slot))return false;const w=this.run.inventory[slot],price=this.upgradePrice(slot);
      if(w.level>=3){this.call('toast','已升级至 +3 上限。');return false;}if(this.run.coins<price){this.call('toast','升级所需学分币不足。');return false;}
      this.run.coins-=price;w.level++;this.sound.play('reward');this.save();this.call('shop');return true;
    }
    getEvent(){const r=this.room;if(!r.eventId)r.eventId=new RNG(`${this.run.seed}/${this.run.floor}/${r.id}/event`).pick(D.EVENTS).id;return D.EVENTS.find(e=>e.id===r.eventId);}
    openEvent(){this.getEvent();this.save();this.mode='event';this.call('event',this.getEvent());}
    chooseEvent(index){
      if(this.mode!=='event'||this.room.interacted)return false;const choice=this.getEvent().choices[index];if(!choice)return false;
      if(choice.cost&&this.run.coins<choice.cost){this.call('toast','学分币不足，可选择另一项。');return false;}
      this.room.interacted=true;this.run.coins+= (choice.coins||0)-(choice.cost||0);this.heal(choice.heal||0);if(choice.hurt)this.player.hp=Math.max(1,this.player.hp-choice.hurt);if(choice.refill)this.player.energy=this.stats.maxEnergy;
      this.mode='playing';this.call('close');this.sound.play('reward');
      if(choice.relic||choice.specificRelic)this.offerRelics('校园奇遇',undefined,choice.specificRelic);
      else if(choice.weapon||choice.weaponTag||choice.weaponTier){const id=choice.weapon||D.rollWeapon(new RNG(`${this.run.seed}/${this.run.floor}/${this.room.id}/event-reward`),this.run.floor,choice.weaponTier||1,choice.weaponTag||null,this.meta.wins>0).id;this.offerWeapon(id,0,'校园奇遇');}
      else this.save();return true;
    }
    closePanel(){if(['paused','map','inventory','shop','event'].includes(this.mode)){this.mode='playing';this.call('close');}}
    pause(panel='pause'){if(this.mode==='playing'){this.mode=panel==='map'?'map':panel==='inventory'?'inventory':'paused';this.call(panel==='map'?'map':panel==='inventory'?'inventory':panel==='help'?'help':'pause');this.emit('pause',{});}return this.mode;}
    resume(){this.closePanel();}
    returnToMenu(){this.mode='menu';this.call('close');this.call('menu');this.emit('menu',{});}
    finish(won){
      if(!this.run||this.run.ended)return;this.run.ended=true;this.run.won=won;this.mode=won?'victory':'dead';
      const bonus=won?Math.max(0,Math.round(900-this.run.elapsed*.3)):0;this.run.score=Math.round((this.run.score+this.run.coins+bonus)*this.difficulty.reward);
      const inspiration=Math.round((this.run.clears*2+this.run.bosses*6+(won?25:3))*this.difficulty.reward);this.run.inspiration=inspiration;
      this.meta.runs++;if(won)this.meta.wins++;this.meta.best=Math.max(this.meta.best,this.run.score);this.meta.inspiration+=inspiration;
      this.meta.history.unshift({won,score:this.run.score,seed:this.run.seed,difficulty:this.run.difficulty,character:this.run.character,elapsed:Math.round(this.run.elapsed),date:new Date().toISOString()});this.meta.history=this.meta.history.slice(0,10);
      if(won)this.discover('diploma');this.storage.write('meta',this.meta);this.storage.remove('run');this.call('close');this.call(won?'victory':'gameOver');this.emit('run:end',{won,score:this.run.score,inspiration,seed:this.run.seed,seconds:Math.round(this.run.elapsed),difficulty:this.run.difficulty});
    }
    buyMeta(type){if(!['health','focus','shield'].includes(type)||this.mode!=='menu')return false;const level=this.meta.upgrades[type]||0,price=18+level*16;if(level>=3||this.meta.inspiration<price)return false;this.meta.inspiration-=price;this.meta.upgrades[type]=level+1;this.storage.write('meta',this.meta);this.sound.play('reward');return true;}
    setSetting(key,value){if(!Object.hasOwn(this.meta.settings,key))return false;if(key==='volume')value=clamp(Number(value)||0,0,1);else value=!!value;this.meta.settings[key]=value;this.storage.write('meta',this.meta);return true;}
    snapshot(){return this.run?JSON.parse(JSON.stringify({mode:this.mode,seed:this.run.seed,difficulty:this.run.difficulty,character:this.run.character,floor:this.run.floor+1,roomId:this.run.roomId,roomType:this.room.type,cleared:this.room.cleared,player:this.player,stats:this.stats,inventory:this.run.inventory,relics:this.run.relics,synergies:D.activeSynergies(this.run.inventory).map(s=>s.id),coins:this.run.coins,score:this.run.score,kills:this.run.kills,clears:this.run.clears,elapsed:this.run.elapsed,enemyCount:this.enemies.filter(e=>!e.dead).length,boss:this.boss?{kind:this.boss.kind,hp:this.boss.hp,maxHp:this.boss.maxHp,stage:this.boss.stage}:null,ended:this.run.ended})): {mode:this.mode,version:D.VERSION};}
  }
  D.Game=Game;
})(typeof window!=='undefined'?window:globalThis);
