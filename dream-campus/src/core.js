(function(root){
  'use strict';
  const DC = root.DC = root.DC || {};
  const W = 1152, H = 720, PAD = 55, TAU = Math.PI * 2;
  const clamp = (v,a,b) => Math.max(a,Math.min(b,v));
  const dist = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
  function hash(s){ let h=2166136261; for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);} return h>>>0; }
  class RNG {
    constructor(seed){this.state=typeof seed==='number'?seed>>>0:hash(seed);}
    next(){let t=this.state+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
    int(a,b){return a+Math.floor(this.next()*(b-a+1));}
    pick(a){return a[this.int(0,a.length-1)];}
    shuffle(a){const b=a.slice();for(let i=b.length-1;i>0;i--){const j=this.int(0,i);[b[i],b[j]]=[b[j],b[i]];}return b;}
  }
  function circleRect(x,y,r,o){return (x-clamp(x,o.x,o.x+o.w))**2+(y-clamp(y,o.y,o.y+o.h))**2 < r*r;}
  function isFree(x,y,r,obstacles){return x-r>=PAD&&x+r<=W-PAD&&y-r>=PAD&&y+r<=H-PAD&&!obstacles.some(o=>o.hp!==0&&circleRect(x,y,r,o));}
  function moveEntity(e,dx,dy,obstacles){
    const n=Math.max(1,Math.ceil(Math.max(Math.abs(dx),Math.abs(dy))/6));
    for(let i=0;i<n;i++){
      const nx=clamp(e.x+dx/n,PAD+e.r,W-PAD-e.r);
      if(!obstacles.some(o=>o.hp!==0&&circleRect(nx,e.y,e.r,o)))e.x=nx;
      const ny=clamp(e.y+dy/n,PAD+e.r,H-PAD-e.r);
      if(!obstacles.some(o=>o.hp!==0&&circleRect(e.x,ny,e.r,o)))e.y=ny;
    }
  }
  function segmentCircle(ax,ay,bx,by,cx,cy,r){
    const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;
    const t=l?clamp(((cx-ax)*dx+(cy-ay)*dy)/l,0,1):0;
    return (ax+dx*t-cx)**2+(ay+dy*t-cy)**2<=r*r;
  }
  // A generous vertical capsule follows the visible 2.5D torso, not just the feet.
  // Player collision remains a small floor circle for readable, forgiving dodges.
  function segmentActor(ax,ay,bx,by,e,pad=0){
    const height=e.boss?78:e.kind==='mini'?10:22,r=e.r+pad;
    return [0,height*.5,height].some(h=>segmentCircle(ax,ay,bx,by,e.x,e.y-h,r));
  }
  function rayRect(ax,ay,bx,by,o,pad=0){
    let t0=0,t1=1; const dx=bx-ax,dy=by-ay;
    for(const [p,q] of [[-dx,ax-o.x+pad],[dx,o.x+o.w+pad-ax],[-dy,ay-o.y+pad],[dy,o.y+o.h+pad-ay]]){
      if(Math.abs(p)<1e-8){if(q<0)return null;}
      else{const r=q/p;if(p<0){if(r>t1)return null;t0=Math.max(t0,r);}else{if(r<t0)return null;t1=Math.min(t1,r);}}
    }
    return t0;
  }
  function lineEnd(ax,ay,bx,by,obstacles,pad=0){
    let t=1, hit=null;
    for(const o of obstacles){if(o.hp===0)continue;const r=rayRect(ax,ay,bx,by,o,pad);if(r!==null&&r<t){t=r;hit=o;}}
    // Boundary intersection works even when no prop lies on the ray.
    const dx=bx-ax,dy=by-ay;
    for(const v of [dx>0?(W-PAD-ax)/dx:dx<0?(PAD-ax)/dx:Infinity,dy>0?(H-PAD-ay)/dy:dy<0?(PAD-ay)/dy:Infinity])if(v>=0&&v<t){t=v;hit={boundary:true};}
    return {x:ax+(bx-ax)*t,y:ay+(by-ay)*t,t,hit};
  }
  function los(a,b,obstacles){return !obstacles.some(o=>o.hp!==0&&rayRect(a.x,a.y,b.x,b.y,o)!==null);}
  const DIRECTIONS={N:{dx:0,dy:-1,opposite:'S',x:W/2,y:PAD+24},E:{dx:1,dy:0,opposite:'W',x:W-PAD-24,y:H/2},S:{dx:0,dy:1,opposite:'N',x:W/2,y:H-PAD-24},W:{dx:-1,dy:0,opposite:'E',x:PAD+24,y:H/2}};
  function generateFloor(seed,floor){
    const rng=new RNG(`${seed}/floor/${floor}`),rooms=[],used=new Set();
    function add(x,y,type){const r={id:rooms.length,x,y,type,doors:{},visited:false,cleared:false,interacted:false,loot:null};rooms.push(r);used.add(`${x},${y}`);return r;}
    function link(a,b,d){a.doors[d]=b.id;b.doors[DIRECTIONS[d].opposite]=a.id;}
    let cur=add(0,0,'start');cur.cleared=true;
    const mainCount=6+floor; // entrance + 4/5/6 combat rooms + boss
    for(let i=1;i<mainCount;i++){
      // Prefer a monotone direction: guarantees an unblocked route without rejection loops.
      const ds=rng.shuffle(['E','N','S']).filter(d=>!used.has(`${cur.x+DIRECTIONS[d].dx},${cur.y+DIRECTIONS[d].dy}`));
      const d=ds[0]||'E',v=DIRECTIONS[d];
      const next=add(cur.x+v.dx,cur.y+v.dy,i===mainCount-1?'boss':'combat');link(cur,next,d);cur=next;
    }
    for(const type of rng.shuffle(['treasure','shop','rest','event','elite'])){
      const candidates=rng.shuffle(rooms.slice(0,mainCount-1));
      let added=false;
      for(const a of candidates){
        for(const d of rng.shuffle(Object.keys(DIRECTIONS))){const v=DIRECTIONS[d],x=a.x+v.dx,y=a.y+v.dy;
          if(!used.has(`${x},${y}`)){const b=add(x,y,type);link(a,b,d);added=true;break;}}
        if(added)break;
      }
    }
    const queue=[0],depth={0:0};
    for(let i=0;i<queue.length;i++){const r=rooms[queue[i]];r.depth=depth[r.id];for(const id of Object.values(r.doors))if(depth[id]===undefined){depth[id]=depth[r.id]+1;queue.push(id);}}
    return {floor,rooms,bossId:mainCount-1};
  }
  function makeObstacles(seed,floor,room){
    if(['start','boss','shop','rest','event','treasure'].includes(room.type))return [];
    const rng=new RNG(`${seed}/${floor}/${room.id}/layout`),out=[];
    const slots=rng.shuffle([[235,180],[365,190],[755,180],[900,195],[250,510],[385,525],[755,515],[905,500],[170,270],[940,260],[175,425],[945,420]]);
    for(const [x,y] of slots.slice(0,rng.int(5,8))){
      const kind=rng.pick(['desk','desk','plant','crate']);
      const w=kind==='desk'?rng.int(70,100):42,h=kind==='desk'?40:42;
      const o={x:x-w/2+rng.int(-14,14),y:y-h/2+rng.int(-10,10),w,h,kind,hp:kind==='plant'?Infinity:55,maxHp:55};
      if(!out.some(p=>Math.abs(p.x-o.x)<(p.w+o.w)/2+45&&Math.abs(p.y-o.y)<(p.h+o.h)/2+45))out.push(o);
    }
    return out;
  }
  class FlowField{
    constructor(obstacles,radius=20){this.cell=28;this.cols=Math.ceil(W/this.cell);this.rows=Math.ceil(H/this.cell);this.radius=radius;this.rebuild(obstacles);}
    rebuild(obstacles){this.obstacles=obstacles;this.blocked=new Uint8Array(this.cols*this.rows);for(let y=0;y<this.rows;y++)for(let x=0;x<this.cols;x++)this.blocked[y*this.cols+x]=isFree((x+.5)*this.cell,(y+.5)*this.cell,this.radius,obstacles)?0:1;this.cost=new Int16Array(this.blocked.length).fill(-1);}
    update(tx,ty){
      this.cost.fill(-1);let x=clamp(Math.floor(tx/this.cell),0,this.cols-1),y=clamp(Math.floor(ty/this.cell),0,this.rows-1),idx=y*this.cols+x;
      if(this.blocked[idx]){let best=1e9;for(let i=0;i<this.blocked.length;i++)if(!this.blocked[i]){const d=((i%this.cols)-x)**2+(Math.floor(i/this.cols)-y)**2;if(d<best){best=d;idx=i;}}}
      const q=new Int32Array(this.cost.length);let head=0,tail=1;q[0]=idx;this.cost[idx]=0;
      while(head<tail){const n=q[head++],cx=n%this.cols,cy=Math.floor(n/this.cols);
        for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy,j=ny*this.cols+nx;if(nx>=0&&nx<this.cols&&ny>=0&&ny<this.rows&&!this.blocked[j]&&this.cost[j]===-1){this.cost[j]=this.cost[n]+1;q[tail++]=j;}}
      }
    }
    direction(e,target){
      if(!this.obstacles.some(o=>o.hp!==0&&rayRect(e.x,e.y,target.x,target.y,o,e.r+.5)!==null)){const d=dist(e,target)||1;return{x:(target.x-e.x)/d,y:(target.y-e.y)/d};}
      const x=clamp(Math.floor(e.x/this.cell),0,this.cols-1),y=clamp(Math.floor(e.y/this.cell),0,this.rows-1);
      let bx=x,by=y,best=1e9;
      for(const [dx,dy]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,idx=ny*this.cols+nx,c=this.cost[idx];if(nx>=0&&ny>=0&&nx<this.cols&&ny<this.rows&&c>=0&&c<best){best=c;bx=nx;by=ny;}}
      const tx=(bx+.5)*this.cell,ty=(by+.5)*this.cell,d=Math.hypot(tx-e.x,ty-e.y)||1;
      return{x:(tx-e.x)/d,y:(ty-e.y)/d};
    }
  }
  function activeSynergies(inventory){const tags=inventory.map(w=>DC.WEAPONS[w.id].tag);return DC.SYNERGIES.filter(s=>{const copy=tags.slice();return s.tags.every(t=>{const i=copy.indexOf(t);if(i===-1)return false;copy.splice(i,1);return true;});});}
  function makeStats(character,relicIds,inventory,meta={}){
    const c=DC.CHARACTERS.find(v=>v.id===character)||DC.CHARACTERS[0];
    const mods={damage:0,haste:0,speed:0,crit:0.05,regen:0,hp:0,shield:0,energy:0,armor:0,efficiency:0,dash:0,skill:0};
    const add=m=>{for(const[k,v]of Object.entries(m||{}))mods[k]=(mods[k]||0)+v;};
    add(c.mods);for(const id of relicIds){const r=DC.RELICS.find(v=>v.id===id);if(r)add(r.mods);}for(const s of activeSynergies(inventory))add(s.mods);
    // 生命值基础值保持在接近护盾的规模；保留原有体能成长规则。
    mods.hp+=(clamp(Number(meta.health)||0,0,3)*5);mods.regen+=clamp(Number(meta.focus)||0,0,3);mods.shield+=clamp(Number(meta.shield)||0,0,3)*3;
    return Object.assign(mods,{maxHp:c.hp+mods.hp,maxEnergy:c.energy+mods.energy,maxShield:28+mods.shield,moveSpeed:c.speed*(1+mods.speed),energyRegen:c.regen+mods.regen,
      crit:clamp(mods.crit,0,.65),armor:clamp(mods.armor,0,.45),efficiency:clamp(mods.efficiency,0,.5),dashCooldown:1.10*Math.max(.55,1-mods.dash),skillCooldown:12*Math.max(.5,1-mods.skill)});
  }
  function weaponDamage(w,level,stats){return w.damage*DC.RARITIES[w.rarity].scale*(1+.14*clamp(level||0,0,3))*(1+stats.damage+(stats[w.tag]||0)+(w.rarity<=1?(stats.budget||0):0));}
  function weaponProfile(w,level=0,stats={}){
    const s=Object.assign({damage:0,haste:0,crit:.05,efficiency:0,energyRegen:14},stats||{}),damage=weaponDamage(w,level,s);
    let hits=1;
    if(w.type==='spread')hits=1+Math.max(0,(w.pellets||1)-1)*.62;
    else if(w.type==='burst')hits=Math.max(1,w.burst||1)*.93;
    else if(w.type==='boomerang')hits=1.72;
    else if(w.type==='homing')hits=Math.max(1,w.pellets||1)*.96;
    let dps=damage*hits*(1+s.haste)/Math.max(.1,w.interval||1);
    if(w.type==='turret')dps=damage*Math.max(1,w.pellets||1)*1.7/Math.max(.2,w.rate||1);
    if(w.type==='orbit')dps=damage*Math.max(1,w.count||1)*.72/.55;
    dps*=1+Math.max(0,(w.crit||0))*.7;
    const output=clamp(Math.round(18+Math.sqrt(Math.max(0,dps))*5.35),12,100);
    const control=clamp(Math.round(10+(w.pierce||0)*5+(w.jumps||0)*7+(w.radius||0)*.16+(w.slow?16:0)+(w.stun||0)*38+(w.knock||0)*.055+(w.clear?24:0)+(w.wet?6:0)),8,100);
    const reach=w.range||((w.speed||0)*(w.life||1));
    const safety=clamp(Math.round(20+Math.min(34,reach/18)+(w.type==='homing'?15:0)+(w.type==='turret'?18:0)+(w.type==='orbit'?14:0)+(w.clear?18:0)-(w.type==='melee'?13:0)),8,100);
    const drain=(w.energy||0)/Math.max(.15,w.interval||1),sustain=clamp(Math.round(100-drain*2.8+(w.energy===0?8:0)),12,100);
    const tactical=output*.50+control*.22+safety*.17+sustain*.11;
    const score=clamp(Math.round(tactical*1.32),1,100);
    const grade=score>=90?'S':score>=80?'A':score>=70?'B':score>=60?'C':'D';
    const axes={output,control,safety,sustain},labels={output:'输出',control:'控场',safety:'安全',sustain:'续航'};
    const role=labels[Object.entries(axes).sort((a,b)=>b[1]-a[1])[0][0]];
    return{score,grade,role,axes,dps:Math.round(dps)};
  }
  function rollWeapon(rng,floor,minTier=0,tag=null,unlocked=false){
    const pools=[[[0,30],[1,40],[2,23],[3,6],[4,1]],[[0,8],[1,25],[2,40],[3,23],[4,4]],[[1,8],[2,35],[3,40],[4,17]]];
    let entries=pools[clamp(floor,0,2)].filter(x=>x[0]>=minTier),total=entries.reduce((s,v)=>s+v[1],0),roll=rng.next()*total,tier=minTier;
    for(const [t,weight]of entries){roll-=weight;if(roll<=0){tier=t;break;}}
    let candidates=Object.values(DC.WEAPONS).filter(w=>w.rarity===tier&&(!tag||w.tag===tag)&&(!w.unlock||unlocked));
    if(!candidates.length)candidates=Object.values(DC.WEAPONS).filter(w=>w.rarity>=minTier&&w.rarity<=4&&(!tag||w.tag===tag));
    if(unlocked&&minTier<=4&&rng.next()<.035&&!tag)return DC.WEAPONS.diploma;
    return rng.pick(candidates)||DC.WEAPONS.waterbook;
  }
  const safeText = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const defaultMeta=()=>({schema:1,runs:0,wins:0,best:0,inspiration:0,upgrades:{health:0,focus:0,shield:0},discovered:['waterbook','pencil','slipper','hammer','thermos'],history:[],settings:{volume:0.35,music:true,shake:true,particles:true,aimAssist:false,autoFire:false}});
  class Storage{
    constructor(prefix='dream-campus-v1'){this.prefix=prefix;this.available=true;this.error=null;}
    read(key,fallback){try{const s=root.localStorage?.getItem(`${this.prefix}:${key}`);return s?JSON.parse(s):fallback;}catch(e){this.available=false;this.error=e.message;return fallback;}}
    write(key,value){try{if(!root.localStorage)throw Error('Storage unavailable');root.localStorage.setItem(`${this.prefix}:${key}`,JSON.stringify(value));return true;}catch(e){this.available=false;this.error=e.message;return false;}}
    remove(key){try{root.localStorage?.removeItem(`${this.prefix}:${key}`);}catch(e){this.available=false;}}
    loadMeta(){
      const d=defaultMeta(),m=this.read('meta',null);if(!m||m.schema!==1)return d;
      const whole=(v,max=100000000)=>clamp(Math.floor(Number(v)||0),0,max);
      for(const k of ['runs','wins','best','inspiration'])d[k]=whole(m[k]);d.wins=Math.min(d.wins,d.runs);
      for(const k of Object.keys(d.upgrades))d.upgrades[k]=whole(m.upgrades?.[k],3);
      for(const k of Object.keys(d.settings))if(m.settings&&Object.hasOwn(m.settings,k))d.settings[k]=k==='volume'?clamp(Number(m.settings[k])||0,0,1):!!m.settings[k];
      if(Array.isArray(m.discovered))d.discovered=[...new Set(m.discovered.filter(id=>Object.hasOwn(DC.WEAPONS,id)))];
      if(Array.isArray(m.history))d.history=m.history.filter(r=>r&&typeof r.seed==='string'&&Number.isFinite(r.score)&&Number.isFinite(r.elapsed)).slice(0,10).map(r=>({won:!!r.won,score:whole(r.score),seed:r.seed.slice(0,40),difficulty:DC.DIFFICULTIES[r.difficulty]?r.difficulty:'normal',elapsed:whole(r.elapsed),date:typeof r.date==='string'?r.date.slice(0,30):''}));
      return d;
    }
  }
  Object.assign(DC,{W,H,PAD,TAU,clamp,dist,hash,RNG,circleRect,isFree,moveEntity,segmentCircle,segmentActor,rayRect,lineEnd,los,DIRECTIONS,generateFloor,makeObstacles,FlowField,activeSynergies,makeStats,weaponDamage,weaponProfile,rollWeapon,safeText,Storage,defaultMeta});
})(typeof window!=='undefined'?window:globalThis);
