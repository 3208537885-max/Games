/* Host integration boundary. No network request occurs unless explicitly enabled/invoked. */
(function(root){
  'use strict';
  const config=root.FOUR_YEARS_CONFIG,E=root.FourYearsEngine,C=root.FourYearsContent;
  const listeners=new Map();let adapter=null,controller=null,cloudRevision=null,destroyed=false;
  const origin=config.parentOrigin&&config.parentOrigin!=='*'?config.parentOrigin:'';
  class IntegrationError extends Error{constructor(message,status=0,details=null){super(message);this.name='IntegrationError';this.status=status;this.details=details;}}
  function emit(type,payload){if(destroyed)return;const clean=payload===undefined?null:E.clone(payload);for(const cb of listeners.get(type)||[]){try{cb(clean);}catch(e){console.error('FourYears listener error',e);}}
    if(origin&&root.parent!==root){try{root.parent.postMessage({channel:'four-years:v1',gameId:config.gameId,type,payload:clean},origin);}catch(e){/* No wildcard fallback. */}}
  }
  function on(type,cb){if(typeof cb!=='function')throw new TypeError('Listener must be a function');if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(cb);return ()=>listeners.get(type)?.delete(cb);}
  async function request(path,options={}){
    if(!config.apiBaseUrl)throw new IntegrationError('尚未连接后端；本地存档和本机榜单正常可用。');
    const base=new URL(config.apiBaseUrl,root.location.href);if(!['http:','https:'].includes(base.protocol))throw new IntegrationError('API地址必须使用HTTP(S)');
    const ac=new AbortController(),timeout=setTimeout(()=>ac.abort(),config.requestTimeoutMs);
    const headers={'Content-Type':'application/json',...(config.apiToken?{'Authorization':'Bearer '+config.apiToken}:{}),...(options.headers||{})};
    try{const res=await fetch(base.href.replace(/\/$/,'')+path,{...options,headers,credentials:'omit',signal:ac.signal});let body;try{body=await res.json();}catch(e){throw new IntegrationError('后端返回的不是JSON',res.status);}
      if(!res.ok)throw new IntegrationError(body.message||`请求失败（${res.status}）`,res.status,body);return body;
    }catch(e){if(e.name==='AbortError')throw new IntegrationError('网络请求超时，本地进度没有丢失。');throw e;}finally{clearTimeout(timeout);}
  }
  function setAdapter(value){if(value!==null&&typeof value!=='object')throw new TypeError('Adapter must be an object or null');adapter=value;cloudRevision=null;emit('adapter:change',{connected:connected()});}
  function connected(){return !!adapter||!!config.apiBaseUrl;}
  function getState(){return controller?E.clone(controller.getState()):null;}
  async function submitScore(){const s=getState();if(!s?.result||s.phase!=='ended')throw new IntegrationError('请先完成48个月，再提交本局成绩。');
    const payload={gameId:config.gameId,rulesVersion:C.RULES_VERSION,runId:s.runId,result:s.result,replay:s.history};
    const result=adapter?.submitScore?await adapter.submitScore(payload):await request('/scores',{method:'POST',headers:{'Idempotency-Key':s.runId},body:JSON.stringify(payload)});
    emit('score:submitted',result);return result;
  }
  async function fetchLeaderboard(query={}){const clean={school:'shu',difficulty:String(query.difficulty||''),limit:Math.max(1,Math.min(100,Number(query.limit)||30)),rulesVersion:C.RULES_VERSION};if(adapter?.fetchLeaderboard)return adapter.fetchLeaderboard(clean);return request('/leaderboard?'+new URLSearchParams(clean).toString());}
  async function syncProgress(){const s=getState();if(!s)throw new IntegrationError('尚未开始游戏');const save=root.FourYearsStorage.envelope(s);
    const payload={gameId:config.gameId,expectedRevision:cloudRevision,save};
    const result=adapter?.saveProgress?await adapter.saveProgress(payload):await request('/progress',{method:'PUT',body:JSON.stringify(payload)});
    if(!Number.isInteger(result?.revision))throw new IntegrationError('后端未返回有效的进度版本号');cloudRevision=result.revision;emit('progress:synced',{revision:cloudRevision});return result;
  }
  async function loadProgress(){const data=adapter?.loadProgress?await adapter.loadProgress():await request('/progress');if(!data?.save)return null;if(!Number.isInteger(data.revision)||data.revision<1)throw new IntegrationError('后端未返回有效的云存档版本号');const state=root.FourYearsStorage.importObject(data.save,true);cloudRevision=data.revision;controller?.replaceState(state);emit('progress:loaded',{revision:cloudRevision,month:state.month});return {revision:cloudRevision,month:state.month};}
  const receive=event=>{if(!origin||event.origin!==origin||event.source!==root.parent||event.data?.channel!=='four-years:host:v1')return;if(event.data.type==='request-summary'){const s=getState();emit('summary',{month:s?.month||0,phase:s?.phase||'start',result:s?.result||null});}if(event.data.type==='save'&&controller)controller.save();};
  root.addEventListener('message',receive);
  root.FourYears={version:C.VERSION,rulesVersion:C.RULES_VERSION,on,setAdapter,getState,submitScore,fetchLeaderboard,syncProgress,loadProgress,connected,
    exportSave:()=>{const s=getState();return s?root.FourYearsStorage.envelope(s):null;},
    importSave:obj=>{const s=root.FourYearsStorage.importObject(obj,true);controller?.replaceState(s);return {ok:true,month:s.month};},
    save:()=>controller?.save(),load:slot=>controller?.load(slot),
    destroy:()=>{destroyed=true;listeners.clear();root.removeEventListener('message',receive);controller?.destroy();controller=null;adapter=null;},
    _bind:c=>{controller=c;},_emit:emit,IntegrationError};
})(window);
