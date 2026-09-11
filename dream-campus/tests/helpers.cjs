'use strict';
require('../src/data.js');
require('../src/core.js');
require('../src/game.js');
const D=globalThis.DC;
class MemoryStorage extends D.Storage {
  constructor(){super('test');this.values=new Map();}
  read(k,fallback){const v=this.values.get(k);return v===undefined?fallback:JSON.parse(v);}
  write(k,v){this.values.set(k,JSON.stringify(v));return true;}
  remove(k){this.values.delete(k);}
}
function game(options={}){const g=new D.Game({storage:options.storage||new MemoryStorage()});g.start({seed:'TEST-CAMPUS',character:'early',skipStory:true,...options});g.meta.settings.particles=false;return g;}
function step(g,seconds,input={mx:0,my:0,aimX:850,aimY:360,fire:false}){for(let i=0;i<Math.ceil(seconds*60);i++)g.update(1/60,input);}
function dummy(g,x,y){return g.spawn('paper',x,y,{spawnTime:0,speed:0,hp:1e9,maxHp:1e9,cooldown:1e9,behavior:'chase',r:20,bounty:false});}
function choose(g){if(g.run.pending)g.chooseReward(g.run.pending.type==='relic'?g.run.pending.options[0]:0);}
module.exports={D,MemoryStorage,game,step,dummy,choose};
