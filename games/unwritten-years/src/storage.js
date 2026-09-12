(function(root){
  'use strict';
  const E=root.FourYearsEngine,C=root.FourYearsContent,config=root.FOUR_YEARS_CONFIG;
  const memory=new Map();let durable=true,lastError='';
  try{localStorage.setItem(config.storagePrefix+':test','1');localStorage.removeItem(config.storagePrefix+':test');}catch(e){durable=false;lastError='浏览器禁止本地存储；当前只在内存保留，请导出存档。';}
  function get(key){try{return durable?localStorage.getItem(config.storagePrefix+':'+key):memory.get(key)||null;}catch(e){lastError='本地存储读取失败，请使用导入／导出。';return null;}}
  function put(key,value){const text=JSON.stringify(value);memory.set(key,text);if(durable){try{localStorage.setItem(config.storagePrefix+':'+key,text);}catch(e){durable=false;lastError='本地存储写入失败；请立即导出存档。';}}return {durable,error:lastError};}
  function parse(key,fallback){const str=get(key);if(!str)return fallback;try{return JSON.parse(str);}catch(e){lastError='发现损坏的本地记录，已保留原记录；可导入备份恢复。';return fallback;}}
  function envelope(state){return {format:'four-years-save',schemaVersion:C.SCHEMA_VERSION,exportedAt:new Date().toISOString(),state:E.clone(state)};}
  function save(state,slot='auto'){if(!['auto','1','2','3'].includes(String(slot)))throw new Error('存档位不存在');E.validateSave(state);return put('save:'+slot,envelope(state));}
  function load(slot='auto'){const env=parse('save:'+slot,null);if(!env)return null;return importObject(env,false);}
  function importObject(env,imported=true){if(env?.format!=='four-years-save')throw new Error('不是本游戏导出的存档');if(env.schemaVersion!==C.SCHEMA_VERSION)throw new Error('存档格式版本不匹配');return E.restore(env.state,{imported});}
  function fromText(text){if(typeof text!=='string'||text.length>1500000)throw new Error('存档过大；限制为1.5MB');let parsed;try{parsed=JSON.parse(text);}catch(e){throw new Error('文件不是有效的JSON存档');}return importObject(parsed);}
  function slots(){return ['auto','1','2','3'].map(id=>{const env=parse('save:'+id,null);const s=env?.state;return {id,exists:!!s,name:s?.profile?.name||'',month:s?.month||0,phase:s?.phase||'',school:s?.profile?.school||'',date:env?.exportedAt||''};});}
  function collection(){const c=parse('collection',{endings:{},best:0,runs:0,runIds:[]});if(!c||typeof c!=='object'||!c.endings||!Array.isArray(c.runIds))return {endings:{},best:0,runs:0,runIds:[]};return c;}
  function leaderboard(){const rows=parse('leaderboard',[]);return Array.isArray(rows)?rows.filter(r=>r&&typeof r.name==='string'&&Number.isFinite(r.rankScore)).slice(0,100):[];}
  function recordResult(result){const book=collection();if(!book.runIds.includes(result.runId)){book.runs++;book.runIds.push(result.runId);book.runIds=book.runIds.slice(-500);}
    for(const id of result.endings){if(!C.ENDINGS.some(e=>e.id===id))continue;const old=book.endings[id];book.endings[id]={firstAt:old?.firstAt||result.endedAt,best:Math.max(old?.best||0,result.rankScore),count:(old?.count||0)+(!old||!old.runIds?.includes(result.runId)?1:0),runIds:[...new Set([...(old?.runIds||[]),result.runId])].slice(-50)};}
    book.best=Math.max(book.best,result.rankScore);put('collection',book);
    const rows=leaderboard().filter(x=>x.runId!==result.runId);rows.push({runId:result.runId,name:result.name,school:result.school,difficulty:result.difficulty,family:result.family,rankScore:result.rankScore,baseScore:result.baseScore,primaryEnding:result.primaryEnding,endedAt:result.endedAt,verified:false});rows.sort((a,b)=>b.rankScore-a.rankScore);put('leaderboard',rows.slice(0,100));return book;
  }
  function exportCollection(){return {format:'four-years-collection',schemaVersion:C.SCHEMA_VERSION,rulesVersion:C.RULES_VERSION,collection:collection(),leaderboard:leaderboard()};}
  function importCollection(obj){if(obj?.format!=='four-years-collection'||obj.schemaVersion!==C.SCHEMA_VERSION||obj.rulesVersion!==C.RULES_VERSION||!obj.collection?.endings||!Array.isArray(obj.leaderboard))throw new Error('图鉴备份格式不正确');const c=collection();for(const[id,x]of Object.entries(obj.collection.endings)){if(C.ENDINGS.some(e=>e.id===id)&&x&&Number.isFinite(x.best))c.endings[id]={firstAt:String(x.firstAt||''),best:Math.max(c.endings[id]?.best||0,E.clamp(x.best,0,11400)),count:Number.isFinite(x.count)?Math.max(1,Math.min(500,x.count)):1,runIds:Array.isArray(x.runIds)?x.runIds.filter(y=>typeof y==='string').slice(0,50):[]};}c.best=Math.max(c.best,...Object.values(c.endings).map(x=>x.best),0);const ids=Array.isArray(obj.collection.runIds)?obj.collection.runIds.filter(x=>typeof x==='string'):[];c.runIds=[...new Set([...c.runIds,...ids])].slice(-500);c.runs=c.runIds.length;put('collection',c);
    const rows=leaderboard();for(const r of obj.leaderboard){if(r&&typeof r.runId==='string'&&typeof r.name==='string'&&Number.isFinite(r.rankScore)&&r.rankScore>=0&&r.rankScore<=11400&&!rows.some(x=>x.runId===r.runId))rows.push({...r,name:r.name.slice(0,16),verified:false});}rows.sort((a,b)=>b.rankScore-a.rankScore);put('leaderboard',rows.slice(0,100));return c;}
  root.FourYearsStorage={save,load,slots,envelope,fromText,importObject,collection,recordResult,leaderboard,exportCollection,importCollection,status:()=>({durable,error:lastError}),get,put};
})(window);
