(function(root){
  'use strict';const D=root.DC,{W,H,PAD,TAU,Art:A}=D;
  const TYPE={start:['起点','⌂'],combat:['战斗','·'],elite:['精英','!'],boss:['首领','B'],treasure:['宝箱','◇'],shop:['商店','$'],rest:['休息','+'],event:['奇遇','?']};
  D.ROOM_TYPES=TYPE;
  D.mapSVG=function(game,large=false){
    if(!game.run)return '';
    const rooms=game.run.floors[game.run.floor].rooms,minX=Math.min(...rooms.map(r=>r.x)),maxX=Math.max(...rooms.map(r=>r.x)),minY=Math.min(...rooms.map(r=>r.y)),maxY=Math.max(...rooms.map(r=>r.y));
    const cell=large?88:37,pad=large?52:22,ww=(maxX-minX)*cell+pad*2,hh=(maxY-minY)*cell+pad*2;
    const known=new Set();for(const r of rooms)if(r.visited){known.add(r.id);Object.values(r.doors).forEach(id=>known.add(id));}
    const pos=r=>({x:(r.x-minX)*cell+pad,y:(r.y-minY)*cell+pad});let out='';
    for(const r of rooms)for(const id of Object.values(r.doors))if(id>r.id){const a=pos(r),b=pos(rooms[id]);out+=`<path d="M${a.x} ${a.y}L${b.x} ${b.y}" stroke="${known.has(r.id)&&known.has(id)?'#75958a':'#354f45'}" stroke-width="${large?5:2}" ${known.has(r.id)&&known.has(id)?'':'stroke-dasharray="3 5"'}/>`;}
    for(const r of rooms){const p=pos(r),current=r.id===game.run.roomId,seen=known.has(r.id),size=large?43:21,fill=current?'#a6e4c2':r.cleared&&r.visited?'#64816b':seen?r.type==='boss'?'#b77782':r.type==='elite'?'#b29563':'#365b4d':'#203d32';
      out+=`<rect x="${p.x-size/2}" y="${p.y-size/2}" width="${size}" height="${size}" rx="${large?10:5}" fill="${fill}" stroke="${current?'#f7efd0':seen?'#a3b299':'#354d40'}" stroke-width="${current?3:1}"/><text x="${p.x}" y="${p.y+(large?6:4)}" text-anchor="middle" fill="${current?'#224132':'#f5ebcf'}" font-size="${large?20:12}" font-family="system-ui">${current?'●':seen?TYPE[r.type][1]:'?'}</text>`;
      if(large&&seen)out+=`<text x="${p.x}" y="${p.y+37}" text-anchor="middle" fill="#d9dec6" font-size="12" font-family="system-ui">${TYPE[r.type][0]}${r.cleared&&r.visited?' · 清':''}</text>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="本层房间地图，当前位置用实心圆表示" viewBox="0 0 ${ww} ${hh}" style="max-height:${large?'55vh':'130px'};width:100%">${out}</svg>`;
  };
  class Renderer{
    constructor(canvas,game){this.canvas=canvas;this.c=canvas.getContext('2d',{alpha:false});this.game=game;this.dpr=Math.min(root.devicePixelRatio||1,2);canvas.width=W*this.dpr;canvas.height=H*this.dpr;this.c.setTransform(this.dpr,0,0,this.dpr,0,0);this.floorCache=null;this.cacheKey='';this.now=0;}
    floor(){
      const g=this.game,key=`${g.run.floor}/${g.run.roomId}`;
      if(key===this.cacheKey&&this.floorCache)return this.floorCache;this.cacheKey=key;
      const cv=document.createElement('canvas');cv.width=W;cv.height=H;const c=cv.getContext('2d'),f=D.FLOORS[g.run.floor],pal=f.palette;
      c.fillStyle='#10271f';c.fillRect(0,0,W,H);
      A.box(c,34,32,W-68,H-64,'#111f1a',18,'#526b52',3);
      c.fillStyle=pal[0];c.fillRect(PAD,PAD,W-2*PAD,H-2*PAD);
      const rng=new D.RNG(`${g.run.seed}/${g.run.floor}/${g.run.roomId}/art`);
      for(let y=PAD;y<H-PAD;y+=48)for(let x=PAD;x<W-PAD;x+=48){c.fillStyle=rng.next()>.55?pal[1]:pal[0];c.fillRect(x+1,y+1,46,46);c.strokeStyle=pal[2]+'35';c.lineWidth=1;c.strokeRect(x,y,48,48);}
      // Restrained floor inlay makes this a physical room, not an empty arena.
      c.strokeStyle=pal[2]+'85';c.lineWidth=3;c.strokeRect(91,92,W-182,H-184);c.strokeStyle=pal[2]+'50';c.lineWidth=1;c.strokeRect(98,99,W-196,H-198);
      c.save();c.globalAlpha=.13;c.strokeStyle=pal[3];c.lineWidth=2;
      c.beginPath();c.arc(W/2,H/2,88,0,TAU);c.stroke();c.beginPath();c.arc(W/2,H/2,77,0,TAU);c.stroke();
      A.icon(c,'diploma',W/2,H/2,106,pal[3]);c.restore();
      // Original procedural scatter. Decorative marks do not affect collision.
      for(let i=0;i<20;i++){const x=rng.int(130,W-130),y=rng.int(130,H-130);c.save();c.translate(x,y);c.rotate(rng.next()*TAU);c.globalAlpha=.16;c.fillStyle='#ede6bf';c.fillRect(-7,-4,14,8);c.fillStyle=pal[0];c.fillRect(-4,-1,8,1);c.restore();}
      c.fillStyle='#142b23';c.fillRect(35,32,W-70,22);c.fillRect(35,H-54,W-70,21);
      c.fillStyle=pal[2];c.fillRect(48,54,W-96,7);c.fillRect(48,H-61,W-96,7);c.fillRect(43,48,12,H-96);c.fillRect(W-55,48,12,H-96);
      for(const x of [139,365,788,1013]){
        A.box(c,x-35,20,70,22,'#2b4031',5,'#91a784',1);A.box(c,x-21,24,42,9,'#e1dcb0',3,'transparent',0);
        const grad=c.createRadialGradient(x,52,0,x,52,110);grad.addColorStop(0,'#efd89413');grad.addColorStop(1,'#efd89400');c.fillStyle=grad;c.fillRect(x-110,52,220,130);
      }
      c.fillStyle='#9cac91';c.font='10px ui-monospace, monospace';c.textAlign='left';c.fillText(`DC  /  ${String(g.run.floor+1).padStart(2,'0')}.${String(g.run.roomId+1).padStart(2,'0')}   ·   NO CLASS IS FOREVER`,75,H-28);
      c.textAlign='right';c.fillText('DREAM CAMPUS',W-73,H-28);
      const vignette=c.createRadialGradient(W/2,H/2,200,W/2,H/2,650);vignette.addColorStop(0,'#05150a00');vignette.addColorStop(1,'#05150a36');c.fillStyle=vignette;c.fillRect(PAD,PAD,W-2*PAD,H-2*PAD);
      this.floorCache=cv;return cv;
    }
    render(now){
      const g=this.game,c=this.c;this.now=now;
      c.setTransform(this.dpr,0,0,this.dpr,0,0);c.fillStyle='#10271f';c.fillRect(0,0,W,H);if(!g.run)return;
      c.save();if(g.meta.settings.shake&&g.shake>0)c.translate(Math.sin(now*83)*g.shake*.45,Math.cos(now*69)*g.shake*.35);
      c.drawImage(this.floor(),0,0);this.drawDoors();this.drawRoomFurniture();this.drawHazards(false);
      for(const m of g.mines)this.drawMine(m);for(const t of g.turrets)this.drawTurret(t);
      for(const e of g.effects)if(['warningLine','spawn','dash','afterimage','pulse','slash','orbitReflect'].includes(e.type))this.drawEffect(e);
      for(const e of g.enemies)if(e.spawnTime>0){c.save();c.globalAlpha=.4+Math.sin(now*8)*.15;c.strokeStyle=e.boss?'#d8b0a3':'#f4c88d';c.lineWidth=2;c.setLineDash([5,5]);c.beginPath();c.ellipse(e.x,e.y+5,e.r+16,(e.r+16)*.65,0,0,TAU);c.stroke();c.restore();}
      const things=g.obstacles.map(o=>({y:o.y+o.h,kind:'prop',o})).concat(g.enemies.map(e=>({y:e.y,kind:'enemy',e})),[{y:g.player.y,kind:'player'}]);things.sort((a,b)=>a.y-b.y);
      for(const item of things){if(item.kind==='prop')this.drawProp(item.o);else if(item.kind==='enemy'){if(!D.renderHooks?.enemy?.(c,item.e,g,now))A.enemy(c,item.e,now);}else this.drawPlayer();}
      for(const b of g.bullets)this.drawBullet(b);
      for(const o of g.orbits){const w=D.WEAPONS[o.weapon],pulse=1+Math.sin(now*9+o.phase)*.08;c.save();c.translate(o.x,o.y-8);c.globalAlpha=Math.min(1,o.life);c.strokeStyle=o.color+'88';c.lineWidth=2;c.beginPath();c.arc(0,8,(o.blockRadius||18)+7*pulse,0,TAU);c.stroke();if(w.bulletStyle==='scan'){c.rotate(now*7+o.phase);c.strokeStyle='#c7b5ff';c.lineWidth=2;c.setLineDash([5,4]);c.beginPath();c.arc(0,0,22*pulse,0,TAU);c.stroke();c.setLineDash([]);}else if(w.bulletStyle==='paper'){c.rotate(Math.sin(now*5+o.phase)*.25);A.line(c,-20,13,20,13,'#f2e8bb55',3);}A.icon(c,w.icon,0,0,33*pulse,o.color);c.restore();}
      for(const e of g.effects)if(!['warningLine','spawn','dash','afterimage','pulse','slash','orbitReflect','victory'].includes(e.type))this.drawEffect(e);
      this.drawHazards(true);
      for(const coin of g.pickups){c.save();c.translate(coin.x,coin.y-7+Math.sin(coin.age*6)*3);A.ellipse(c,0,9,7,3,'#16322877');A.ellipse(c,0,0,5,7,'#efca80');A.line(c,0,-4,0,4,'#fff0b1',2);c.restore();}
      this.drawLoot();this.drawEnemyBars();
      for(const p of g.particles){c.globalAlpha=Math.max(0,p.t/p.max);c.fillStyle=p.color;c.fillRect(p.x-p.size/2,p.y-p.size/2,p.size,p.size);}c.globalAlpha=1;
      for(const t of g.floating){c.globalAlpha=Math.min(1,t.t*3);c.font=`700 ${t.size}px system-ui`;c.textAlign='center';c.lineWidth=3;c.strokeStyle='#142d27';c.strokeText(t.text,t.x,t.y);c.fillStyle=t.color;c.fillText(t.text,t.x,t.y);}c.globalAlpha=1;
      this.drawInteraction();if(g.mode==='playing')this.drawCrosshair();
      if(g.boss)this.drawBossBar();
      for(const e of g.effects)if(e.type==='victory')this.drawEffect(e);
      c.restore();
      if(g.hitFlash>0){c.fillStyle=`rgba(240,116,108,${g.hitFlash*.3})`;c.fillRect(0,0,W,H);}
    }
    drawDoors(){const g=this.game,c=this.c,r=g.room,rooms=g.run.floors[g.run.floor].rooms;
      for(const[d,id]of Object.entries(r.doors)){
        const v=D.DIRECTIONS[d],vertical=d==='E'||d==='W',x=d==='W'?47:d==='E'?W-47:W/2,y=d==='N'?49:d==='S'?H-49:H/2,open=r.cleared,color=open?'#a2dfaf':'#dca082';
        c.save();c.translate(x,y);if(vertical)c.rotate(Math.PI/2);
        A.box(c,-62,-24,124,47,'#162b23',7,'#91a080',2);
        if(open){c.fillStyle='#102119';c.fillRect(-46,-21,92,41);const grad=c.createLinearGradient(0,-18,0,29);grad.addColorStop(0,'#87e1b625');grad.addColorStop(.5,'#87e1b661');grad.addColorStop(1,'#87e1b608');c.fillStyle=grad;c.fillRect(-47,-20,94,50);A.line(c,-49,-18,-49,19,color,4);A.line(c,49,-18,49,19,color,4);}
        else{for(let i=-40;i<=40;i+=20)A.line(c,i,-18,i,19,'#936b50',6);A.box(c,-14,-13,28,25,'#d6b485',5);A.line(c,-5,-10,-5,-17,'#493f31',2);A.line(c,5,-10,5,-17,'#493f31',2);}
        c.restore();const nr=rooms[id],label=TYPE[nr.type][0];c.fillStyle=open?'#d8e4bb':'#d5b097';c.font='600 12px system-ui';c.textAlign='center';
        if(vertical)c.fillText(label,x+(d==='W'?38:-38),y-75);else c.fillText(`${label}${nr.visited&&nr.cleared?' ✓':''}`,x,y+(d==='N'?43:-33));
      }
    }
    drawRoomFurniture(){const g=this.game,c=this.c,r=g.room,t=this.now;
      c.save();
      if(r.type==='start'){
        A.box(c,W/2-121,H/2-185,242,124,'#243d2d',8,'#c2a977',6);c.textAlign='center';c.fillStyle='#d6e3bc';c.font='700 22px system-ui';c.fillText('欢迎来到梦境校园',W/2,H/2-143);c.font='13px system-ui';c.fillStyle='#abbf9d';c.fillText('WASD 移动 · 鼠标射击 · 空格闪避',W/2,H/2-111);c.fillText('走向发光的门，找回最后一个学分。',W/2,H/2-85);
        A.box(c,220,195,93,68,'#b4bd8e',4,'#52684c',3);A.icon(c,'compass',266,222,40,'#dac290');A.box(c,843,442,70,90,'#7b9771',4);A.icon(c,'book',878,477,45,'#bedaa9');
      }else if(r.type==='treasure'){
        const y=H/2;A.shadow(c,W/2,y+19,64);A.box(c,W/2-50,y-25,100,57,r.interacted?'#786e51':'#a98d50',8,'#493e29',3);A.box(c,W/2-52,y-45,104,32,r.interacted?'#6a634e':'#c0a769',9,'#514429',3);A.line(c,W/2-30,y-45,W/2-30,y+31,'#e2c17b',8);A.line(c,W/2+30,y-45,W/2+30,y+31,'#e2c17b',8);A.box(c,W/2-10,y-20,20,18,'#efd294',3);
        if(!r.interacted){c.globalAlpha=.4+Math.sin(t*3)*.12;A.ellipse(c,W/2,y-23,63,8,'#ffdf8544');c.globalAlpha=1;}this.worldLabel(W/2,y+58,r.interacted?'失物招领箱 · 已打开':'失物招领箱','#eed294');
      }else if(r.type==='shop'){
        A.box(c,W/2-168,H/2-105,336,174,'#253c2d',10,'#8caa7c',3);A.box(c,W/2-172,H/2-119,344,29,'#c8bc85',4);c.fillStyle='#344f3b';c.font='800 18px system-ui';c.textAlign='center';c.fillText('毕业甩卖 · 概不赊账',W/2,H/2-97);
        A.player(c,{x:W/2,y:H/2-15,a:.3,invuln:0,moving:false,dashTime:0},D.CHARACTERS[1],t);
        A.box(c,W/2-170,H/2-6,340,67,'#8a8560',4,'#47593b',4);A.box(c,W/2-180,H/2-16,360,24,'#c2aa76',4);A.icon(c,'parcel',W/2-117,H/2-27,60,'#d8ba7d');A.icon(c,'pot',W/2+122,H/2-33,52,'#c5ce9a');this.worldLabel(W/2,H/2+92,'学长的二手摊 · 武器 / 遗物 / 升级','#e4d79d');
      }else if(r.type==='rest'){
        A.shadow(c,W/2,H/2+20,112);A.box(c,W/2-100,H/2-65,200,85,'#829e78',15);A.box(c,W/2-98,H/2-17,196,57,'#a5b78b',12);A.box(c,W/2-111,H/2-42,30,89,'#74956c',12);A.box(c,W/2+81,H/2-42,30,89,'#74956c',12);A.line(c,W/2,H/2-13,W/2,H/2+35,'#6c8760',2);A.icon(c,'cup',W/2+162,H/2-1,48,'#e3cc93');this.worldLabel(W/2,H/2+82,r.interacted?'休息过了。愿你今晚好眠。':'空沙发 · 放下焦虑，充个电','#cce7b1');
      }else if(r.type==='event'){
        A.box(c,W/2-66,H/2-80,132,120,'#bb9e6e',5);A.box(c,W/2-59,H/2-73,118,105,'#e6d7ad',3);A.icon(c,r.interacted?'certificate':'letter',W/2,H/2-24,66,'#bdc78b');this.worldLabel(W/2,H/2+78,r.interacted?'一段小插曲 · 已完成':'校园奇遇 · 梦里也有选择','#ddd3a6');
      }else if(r.type==='boss'){
        c.globalAlpha=.20;c.strokeStyle='#d0b889';c.lineWidth=3;c.beginPath();c.ellipse(W/2,210,150,70,0,0,TAU);c.stroke();c.globalAlpha=1;
        if(g.portal){const y=H/2,grad=c.createRadialGradient(W/2,y,0,W/2,y,90);grad.addColorStop(0,'#c0ecd67a');grad.addColorStop(1,'#79cfb000');c.fillStyle=grad;c.fillRect(W/2-95,y-95,190,190);c.strokeStyle='#c6efc2';c.lineWidth=3;for(let i=0;i<3;i++){c.beginPath();c.ellipse(W/2,y,42+i*14,16+i*6,t*.25+i,0,TAU);c.stroke();}this.worldLabel(W/2,y+81,'醒来一点点 · 前往下一章','#ddedbd');}
      }
      c.restore();
    }
    worldLabel(x,y,text,color='#dae5bf'){const c=this.c;c.fillStyle=color;c.textAlign='center';c.font='600 14px system-ui';c.fillText(text,x,y);}
    drawProp(o){const c=this.c;if(D.renderHooks?.prop?.(c,o,this.game,this.now))return;A.ellipse(c,o.x+o.w/2,o.y+o.h+4,o.w*.58,10,'#11241860');
      if(o.kind==='desk'){A.box(c,o.x+8,o.y+19,9,o.h-10,'#596944',2);A.box(c,o.x+o.w-17,o.y+19,9,o.h-10,'#596944',2);A.box(c,o.x,o.y,o.w,o.h-7,'#9a9264',4,'#485b3f',3);A.box(c,o.x,o.y-6,o.w,25,'#b1a674',4,'#506044',2);A.box(c,o.x+10,o.y-5,24,17,'#d9d3ac',2,'#7c835b',1);A.line(c,o.x+14,o.y,o.x+29,o.y,'#8b916c',1);A.line(c,o.x+14,o.y+5,o.x+25,o.y+5,'#8b916c',1);A.line(c,o.x+o.w-23,o.y+5,o.x+o.w-9,o.y-1,'#6e8258',3);
        if(o.hp<o.maxHp*.6){A.line(c,o.x+o.w/2,o.y,o.x+o.w/2-6,o.y+13,'#5d6948',2);A.line(c,o.x+o.w/2-6,o.y+13,o.x+o.w/2+3,o.y+25,'#5d6948',2);}}
      else if(o.kind==='crate'){A.box(c,o.x,o.y,o.w,o.h,'#9e885e',4,'#4a5036',3);A.line(c,o.x+5,o.y+5,o.x+o.w-5,o.y+o.h-5,'#c2a576',5);A.line(c,o.x+o.w-5,o.y+5,o.x+5,o.y+o.h-5,'#c2a576',5);}
      else{const x=o.x+o.w/2,y=o.y+o.h/2;A.box(c,x-16,y-2,32,24,'#a68865',5);A.line(c,x,y+2,x,y-33,'#3d6650',4);for(let i=0;i<5;i++){c.save();c.translate(x,y-14);c.rotate(i*1.4);A.ellipse(c,0,-14,10,21,i%2?'#769a69':'#a1b67d');c.restore();}}
    }
    drawPlayer(){const g=this.game,c=this.c,p=g.player;if(D.renderHooks?.player?.(c,p,g,this.now))return;const char=D.CHARACTERS.find(v=>v.id===g.run.character);if(p.shield>0){c.save();c.globalAlpha=.13+.08*(p.shield/g.stats.maxShield);c.strokeStyle='#a6e6cc';c.lineWidth=2;c.beginPath();c.ellipse(p.x,p.y-23,29,40,0,0,TAU);c.stroke();c.restore();}
      A.player(c,p,char,this.now,{weaponIcon:g.weapon.icon,weaponColor:g.weaponColor(g.weapon),graduate:g.weapon.id==='diploma'});
      if(p.drinkTime>0){c.strokeStyle='#a5e9d4';c.lineWidth=4;c.beginPath();c.arc(p.x,p.y-73,12,-Math.PI/2,-Math.PI/2+(1-p.drinkTime/.82)*TAU);c.stroke();A.icon(c,'cup',p.x+27,p.y-55,21,'#bddeb3');}
    }
    drawBullet(b){const c=this.c;if(D.renderHooks?.bullet?.(c,b,this.game,this.now))return;c.save();c.translate(b.x,b.y);c.rotate(b.a);
      if(!b.friendly){const style=b.bulletStyle||'orb';if(style==='glitch'){c.globalAlpha=.78+.22*Math.sin(this.now*18+b.id);A.box(c,-b.r*1.15,-b.r*1.15,b.r*2.3,b.r*2.3,'#8ee7eb',2,'#d9fff0',1);A.box(c,-b.r*.45,-b.r*.45,b.r*.9,b.r*.9,'#29364b',1,'transparent',0);A.line(c,-b.r*2.8,0,-b.r*1.1,0,'#8ee7eb88',2);}else if(style==='spark'){c.fillStyle='#ffe29b';c.beginPath();c.moveTo(b.r*1.7,0);c.lineTo(0,b.r*.65);c.lineTo(-b.r*1.7,0);c.lineTo(0,-b.r*.65);c.closePath();c.fill();A.line(c,-b.r*2,0,-b.r*.8,0,'#fff4bd99',2);}else{A.ellipse(c,0,1,b.r+3,b.r+3,'#371e20');A.ellipse(c,0,0,b.r,b.r,'#e6837c');A.ellipse(c,-1,-1,b.r*.49,b.r*.49,'#ffdfa8');}}
      else if(b.w.bulletStyle==='food'){c.rotate(-b.a);A.ellipse(c,0,8,11,4,'#0d231950');const z=Math.sin(Math.min(1,b.age/b.maxLife)*Math.PI)*45;A.icon(c,b.w.icon,0,-z,30,b.color);}
      else if(b.w.bulletStyle==='drumstick'){c.rotate(this.now*9);A.icon(c,'drumstick',0,0,31,b.color);A.line(c,-18,0,-8,0,'#fff1bc88',3);}
      else if(b.w.bulletStyle==='glitch'){c.globalAlpha=.8+.2*Math.sin(this.now*15+b.id);A.box(c,-b.r*1.4,-b.r,b.r*2.8,b.r*2,b.color,2,'#eaf5d0',1);A.line(c,-b.r*3,0,-b.r*1.4,0,'#8ee7eb99',2);}
      else if(b.w.bulletStyle==='steam'){c.globalAlpha=.78;A.ellipse(c,0,0,b.r*1.8,b.r*.82,b.color);A.ellipse(c,-b.r*.8,-b.r*.9,b.r*.6,b.r*.3,'#f4e6bf88');}
      else if(b.w.bulletStyle==='spark'){c.rotate(this.now*8);c.fillStyle=b.color;c.beginPath();c.moveTo(b.r*1.8,0);c.lineTo(0,b.r*.75);c.lineTo(-b.r*1.8,0);c.lineTo(0,-b.r*.75);c.closePath();c.fill();}
      else if(b.w.bulletStyle==='stamp'){if(b.w.type==='lob'){c.rotate(-b.a);const z=Math.sin(Math.min(1,b.age/b.maxLife)*Math.PI)*46;c.translate(0,-z);}c.rotate(this.now*7+b.id);c.strokeStyle='#f08e91';c.lineWidth=3;c.beginPath();c.arc(0,0,b.r*1.45,0,TAU);c.stroke();A.line(c,-b.r*2.8,0,-b.r*1.5,0,'#f6b2a477',3);c.globalAlpha=.45;A.ellipse(c,0,0,b.r*.55,b.r*.55,'#fff0cb');}
      else if(b.w.bulletStyle==='paper'){c.rotate(this.now*10);A.box(c,-b.r*1.45,-b.r*.85,b.r*2.9,b.r*1.7,'#f4e7bd',1,'#7d936f',1);A.line(c,-b.r*.8,-1,b.r*.75,-1,'#a57b72',1);A.line(c,-b.r*.8,3,b.r*.35,3,'#a57b72',1);}
      else if(b.w.bulletStyle==='boba'){A.line(c,-b.r*3,0,-b.r*1.1,0,'#ddb1cf66',4);for(let i=0;i<3;i++)A.ellipse(c,(i-1)*b.r*.65,Math.sin(this.now*12+i)*2,b.r*.62,b.r*.62,i===1?'#59434d':'#7a5968');}
      else if(b.w.bulletStyle==='sound'){c.rotate(-b.a);c.strokeStyle=b.color;c.lineWidth=3;for(let i=0;i<3;i++){c.globalAlpha=.75-i*.18;c.beginPath();c.arc(-8,0,b.r*(.75+i*.48),-1.05,1.05);c.stroke();}A.ellipse(c,-11,0,3,3,'#fff0b7');}
      else if(b.w.bulletStyle==='ink'){A.line(c,-b.r*3,0,-b.r*.7,0,'#e06e7588',3);c.fillStyle='#ed8f91';c.beginPath();c.moveTo(b.r*1.7,0);c.lineTo(-b.r,-b.r*.65);c.lineTo(-b.r,b.r*.65);c.closePath();c.fill();A.ellipse(c,-b.r*.5,0,2,2,'#fff0ce');}
      else if(b.w.bulletStyle==='scan'){c.rotate(this.now*11);c.strokeStyle=b.color;c.lineWidth=2;c.beginPath();c.arc(0,0,b.r*1.5,0,TAU);c.stroke();A.line(c,-b.r*2.6,0,-b.r*1.4,0,'#cbb7ff66',2);A.ellipse(c,0,0,b.r*.55,b.r*.55,'#f0ddff');}
      else if(b.w.bulletStyle==='orbit'){c.rotate(this.now*12);c.strokeStyle=b.color;c.lineWidth=2;c.shadowBlur=8;c.shadowColor=b.color;c.beginPath();c.arc(0,0,b.r*1.7,0,TAU);c.stroke();c.shadowBlur=0;A.ellipse(c,0,0,b.r*.55,b.r*.55,'#fff4cf');A.line(c,-b.r*3,0,-b.r*1.5,0,b.color+'88',2);}
      else if(b.w.type==='lob'){c.rotate(-b.a);A.ellipse(c,0,7,9,4,'#0d231950');const z=Math.sin(Math.min(1,b.age/b.maxLife)*Math.PI)*44;A.icon(c,b.w.icon,0,-z,29,b.color);}
      else if(b.w.type==='boomerang'){c.rotate(this.now*12);A.icon(c,b.w.icon,0,0,29,b.color);}
      else if(b.w.type==='wave'){c.strokeStyle=b.color;c.lineWidth=5;c.beginPath();c.ellipse(-6,0,b.r*.7,b.r*1.45,0,-1.5,1.5);c.stroke();c.globalAlpha=.25;c.lineWidth=13;c.stroke();}
      else if(b.w.type==='homing'){c.fillStyle=b.color;c.beginPath();c.moveTo(12,0);c.lineTo(-8,-7);c.lineTo(-5,0);c.lineTo(-8,7);c.closePath();c.fill();A.line(c,-16,0,-7,0,b.color+'88',3);}
      else if(b.w.tag==='water'){A.ellipse(c,0,0,b.r*1.8,b.r,b.color);A.ellipse(c,2,-1,b.r*.8,b.r*.4,'#d5f3e8');}
      else{A.box(c,-b.r*1.4,-b.r,b.r*2.8,b.r*2,b.color,2,'#263f33',1);A.line(c,-b.r*3,0,-b.r*1.5,0,b.color+'70',2);}
      c.restore();
    }
    drawTurret(t){const c=this.c;A.shadow(c,t.x,t.y,25);A.box(c,t.x-20,t.y-7,40,18,'#486e58',6);A.icon(c,t.w.icon,t.x,t.y-23,43,t.color);c.save();c.translate(t.x,t.y-17);c.rotate(t.a);A.box(c,5,-5,25,10,'#a9cdae',3);c.restore();c.fillStyle='#cee7b0';c.fillRect(t.x-17,t.y+16,34*Math.min(1,t.life/t.w.duration),3);}
    drawMine(m){const c=this.c;const armed=m.age>m.w.arm;c.save();c.strokeStyle=armed?'#e4c688':'#8e9980';c.globalAlpha=.55;c.setLineDash([4,6]);c.beginPath();c.ellipse(m.x,m.y,49,31,0,0,TAU);c.stroke();c.restore();A.icon(c,m.w.icon,m.x,m.y-10,30,m.color);}
    drawEnemyBars(){const c=this.c;for(const e of this.game.enemies){if(e.boss||e.hp>=e.maxHp||e.dead)continue;const w=e.elite?49:34,y=e.y-(e.r*2)-20;A.box(c,e.x-w/2,y,w,5,'#182c2450',2,'transparent',0);A.box(c,e.x-w/2,y,w*Math.max(0,e.hp/e.maxHp),5,e.elite?'#e6bb6f':'#d38d7c',2,'transparent',0);}}
    drawBossBar(){const g=this.game,c=this.c,b=g.boss;const x=W/2-255,y=83,w=510;c.save();A.box(c,x-12,y-38,w+24,65,'#15251fe8',9,'#b2a684',1);c.textAlign='center';c.font='700 18px system-ui';c.fillStyle='#f0d9b0';c.fillText(D.FLOORS[g.run.floor].bossName,W/2,y-13);A.box(c,x,y,w,10,'#513f3b',4,'transparent',0);A.box(c,x,y,w*Math.max(0,b.hp/b.maxHp),10,'#d99596',4,'transparent',0);for(const mark of [.32,.66])A.line(c,x+w*mark,y-2,x+w*mark,y+12,'#edd5ab',2);c.font='11px ui-monospace,monospace';c.fillStyle='#ebd6b1';c.fillText(`PHASE 0${b.stage}   ·   ${Math.ceil(Math.max(0,b.hp))} / ${Math.round(b.maxHp)}`,W/2,y+24);c.restore();}
    drawHazards(active){const c=this.c;for(const h of this.game.hazards){if(h.active!==active)continue;c.save();const alpha=h.active?.20:(.10+.14*(1-h.t/h.delay));c.fillStyle=`rgba(243,113,99,${alpha})`;c.strokeStyle=h.active?'#ffdc9c':'#f19b89';c.lineWidth=h.active?5:2;
        if(h.kind==='circle'){c.beginPath();c.arc(h.x,h.y,h.r,0,TAU);c.fill();c.setLineDash(h.active?[]:[8,6]);c.stroke();if(!h.active){c.setLineDash([]);c.beginPath();c.arc(h.x,h.y,h.r,-Math.PI/2,-Math.PI/2+(1-h.t/h.delay)*TAU);c.lineWidth=5;c.stroke();c.textAlign='center';c.font='bold 20px system-ui';c.fillStyle='#f7c3a0';c.fillText('!',h.x,h.y+7);}}
        else{c.lineWidth=h.width;c.strokeStyle=`rgba(245,134,111,${h.active?.40:.18})`;c.beginPath();c.moveTo(h.x,h.y);c.lineTo(h.x2,h.y2);c.stroke();c.lineWidth=h.active?7:2;c.strokeStyle=h.active?'#ffe4ad':'#f3b79a';if(!h.active)c.setLineDash([10,12]);c.stroke();}c.restore();}}
    drawLoot(){const g=this.game,r=g.room,c=this.c;if(!r.loot)return;const w=D.WEAPONS[r.loot.id],col=D.RARITIES[w.rarity].color,x=r.loot.x,y=r.loot.y;A.ellipse(c,x,y+13,27,9,'#0d201560');c.save();c.strokeStyle=col;c.globalAlpha=.55;c.lineWidth=2;c.beginPath();c.ellipse(x,y+10,31,12,0,0,TAU);c.stroke();c.restore();A.icon(c,w.icon,x,y-13+Math.sin(this.now*3)*4,44,col);c.fillStyle=col;c.font='600 12px system-ui';c.textAlign='center';c.fillText(w.name,x,y+39);}
    drawInteraction(){const g=this.game,a=g.nearbyInteraction();if(!a||g.mode!=='playing')return;const c=this.c,text=`E  ${a.label}`,width=Math.min(560,Math.max(195,text.length*13+28)),y=H-105;A.box(c,W/2-width/2,y,width,37,'#122d23ef',8,'#b3ce96',1.5);c.fillStyle='#ecedcb';c.textAlign='center';c.font='600 14px system-ui';c.fillText(text,W/2,y+24);}
    drawCrosshair(){const g=this.game,c=this.c;if(g.input.autoAim||g.meta.settings.autoFire)return;const x=g.input.aimX,y=g.input.aimY;if(!Number.isFinite(x)||!Number.isFinite(y))return;c.save();c.strokeStyle='#eff0c9';c.globalAlpha=.8;c.lineWidth=1.5;c.beginPath();c.arc(x,y,7,0,TAU);c.stroke();for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]])A.line(c,x+dx*10,y+dy*10,x+dx*15,y+dy*15,'#dee9c1',1.5);c.restore();}
    drawEffect(e){const c=this.c,k=Math.max(0,e.t/e.max);c.save();
      switch(e.type){
        case 'beam':c.globalAlpha=k;c.shadowBlur=10;c.shadowColor=e.color;A.line(c,e.x,e.y,e.x2,e.y2,e.color,e.width*2.3);c.shadowBlur=0;A.line(c,e.x,e.y,e.x2,e.y2,'#fff9dd',e.width*.6);break;
        case 'lightning':{const rng=new D.RNG(e.seed),len=Math.hypot(e.x2-e.x,e.y2-e.y),n=Math.max(3,Math.ceil(len/23));c.globalAlpha=k;c.strokeStyle=e.color;c.lineWidth=3;c.beginPath();c.moveTo(e.x,e.y);for(let i=1;i<n;i++)c.lineTo(e.x+(e.x2-e.x)*i/n+(rng.next()-.5)*20,e.y+(e.y2-e.y)*i/n+(rng.next()-.5)*20);c.lineTo(e.x2,e.y2);c.stroke();break;}
        case 'blast':case 'poof':case 'pulse':{const r=e.r*(.2+.8*(1-k));c.globalAlpha=k*.65;c.fillStyle=e.color;c.strokeStyle=e.color;c.lineWidth=4;c.beginPath();c.arc(e.x,e.y,r,0,TAU);if(e.type==='poof')c.fill();else{c.stroke();c.globalAlpha=k*.12;c.fill();}break;}
        case 'slash':c.translate(e.x,e.y);c.rotate(e.a);c.globalAlpha=k*.4;c.fillStyle=e.color;c.strokeStyle=e.color;c.lineWidth=6;c.beginPath();c.moveTo(0,0);c.arc(0,0,e.r,-e.arc/2,e.arc/2);c.closePath();c.fill();c.globalAlpha=k;c.beginPath();c.arc(0,0,e.r,-e.arc/2,e.arc/2);c.stroke();break;
        case 'muzzle':c.translate(e.x,e.y);c.rotate(e.a);c.globalAlpha=k;c.fillStyle=e.color;c.beginPath();c.moveTo(0,-9);c.lineTo(22,0);c.lineTo(0,9);c.lineTo(7,0);c.fill();break;
        case 'dash':case 'afterimage':c.globalAlpha=k*.25;A.ellipse(c,e.x,e.y-24,15,29,'#c7f0d6');break;
        case 'spawn':c.globalAlpha=k;c.strokeStyle=e.color;c.lineWidth=2;c.beginPath();c.arc(e.x,e.y,e.r,0,TAU);c.stroke();break;
        case 'warningLine':c.globalAlpha=k*.7;c.setLineDash([7,8]);A.line(c,e.x,e.y,e.x2,e.y2,'#f5b98d',3);break;
        case 'orbitReflect':c.translate(e.x,e.y);c.globalAlpha=k;c.strokeStyle=e.color;c.lineWidth=3;c.beginPath();c.arc(0,0,e.r*(1.2+.8*(1-k)),e.a-1.15,e.a+1.15);c.stroke();c.globalAlpha=k*.55;c.beginPath();c.arc(0,0,e.r*(1.7+.6*(1-k)),e.a-.7,e.a+.7);c.stroke();break;
        case 'guard':c.globalAlpha=k;c.strokeStyle=e.color;c.lineWidth=4;c.beginPath();c.arc(e.x,e.y,e.r,e.a-1.0,e.a+1.0);c.stroke();break;
        case 'victory':{const r=60+(1-k)*e.r;c.globalAlpha=Math.sin((1-k)*Math.PI)*.75;c.fillStyle='#fff2ce';c.beginPath();c.arc(e.x,e.y,r,0,TAU);c.fill();break;}
      }
      c.restore();
    }
  }
  D.Renderer=Renderer;
})(typeof window!=='undefined'?window:globalThis);
