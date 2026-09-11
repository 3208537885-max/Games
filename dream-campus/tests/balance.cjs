'use strict';
/* Stationary-target laboratory, NOT a human difficulty or clear-rate estimate.
   Target range is measured from player center. Knockback is reset after every tick.
   Uses the real simulation, projectile travel, status effects, resource limits,
   independent cooldowns, turret count limits and geometric spread misses.
*/
const fs=require('node:fs'),path=require('node:path');
const {D,game,dummy}=require('./helpers.cjs');
function measure(w,range,seconds=30){
  const g=game({seed:'BALANCE-1'});g.run.inventory=[{id:w.id,level:0},{id:'waterbook',level:0}];g.recompute();
  // Neutral test character: no relic, synergy, meta or character damage boosts.
  g.stats={damage:0,haste:0,speed:0,crit:0,regen:0,hp:0,shield:0,energy:0,armor:0,efficiency:0,maxHp:100,maxEnergy:100,maxShield:28,moveSpeed:230,energyRegen:14,dashCooldown:1.1,skillCooldown:12};
  g.player.x=300;g.player.y=360;g.player.hp=100;g.player.energy=100;g.player.invuln=99999;
  const e=dummy(g,300+range,360),input={mx:0,my:0,aimX:e.x,aimY:e.y,fire:true};let spent=0,firstDamage=null,maxBullets=0;
  for(let i=0;i<seconds*60;i++){
    const before=g.player.energy;e.x=300+range;e.y=360;g.update(1/60,input);
    spent+=Math.max(0,Math.min(100,before+14/60)-g.player.energy);maxBullets=Math.max(maxBullets,g.bullets.length);
    if(firstDamage===null&&e.hp<1e9)firstDamage=i/60;
  }
  const damage=1e9-e.hp;return {dps:+(damage/seconds).toFixed(2),spent:+spent.toFixed(2),firstDamage:firstDamage===null?null:+firstDamage.toFixed(3),maxBullets};
}
const weapons=Object.values(D.WEAPONS).map(w=>{const close=measure(w,95),far=measure(w,280);return {id:w.id,name:w.name,rarity:D.RARITIES[w.rarity].name,tier:w.rarity,behavior:w.type,baseDamage:w.damage,interval:w.interval,energy:w.energy,closeDPS:close.dps,farDPS:far.dps,spent30s:far.spent,firstFarHit:far.firstDamage,maxBullets:Math.max(close.maxBullets,far.maxBullets)};});
const report={generatedAt:new Date().toISOString(),method:'30-second continuous-fire stationary-target test; no character/relic/meta/synergy boosts; 100 initial focus +14/s regen; no drinking or skill; targets at95/280px; target knockback reset; inherent weapon crit retained.',weapons};
const out=path.join(__dirname,'artifacts');fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'balance-results.json'),JSON.stringify(report,null,2));
const keys=Object.keys(weapons[0]);fs.writeFileSync(path.join(out,'balance.csv'),'\uFEFF'+keys.join(',')+'\n'+weapons.map(r=>keys.map(k=>JSON.stringify(r[k]??'')).join(',')).join('\n'));
console.table(weapons.map(w=>({id:w.id,tier:w.tier,close:w.closeDPS,far:w.farDPS,energy30:w.spent30s})));
for(let tier=0;tier<=5;tier++){const arr=weapons.filter(w=>w.tier===tier).map(w=>Math.max(w.closeDPS,w.farDPS)).sort((a,b)=>a-b);console.log('tier',tier,'count',arr.length,'median best tested DPS',arr[Math.floor(arr.length/2)]);}
if(weapons.some(w=>!Number.isFinite(w.closeDPS)||!Number.isFinite(w.farDPS)||w.closeDPS<0||w.farDPS<0))process.exitCode=1;
