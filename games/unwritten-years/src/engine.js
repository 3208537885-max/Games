(function(root,factory){
  const api=factory(typeof module==='object'&&module.exports?require('./content.js'):root.FourYearsContent);
  if(typeof module==='object'&&module.exports)module.exports=api;else root.FourYearsEngine=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(C){
  'use strict';
  const clamp=(n,a=0,b=100)=>Math.min(b,Math.max(a,n));
  const round=n=>Math.round(n*10)/10;
  const clone=o=>JSON.parse(JSON.stringify(o));
  const index=xs=>Object.fromEntries(xs.map(x=>[x.id,x]));
  const actions=index(C.ACTIONS),projects=index(C.PROJECTS),npcs=index(C.NPCS),events=index(C.EVENTS);
  const byId=(xs,id)=>xs.find(x=>x.id===id);
  const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  const KEY_SKILLS=['knowledge','research','tech','art','fame','explore','business','exam','civic','sport','gaming','service','language'];
  const FAIL={ok:false};
  function hash(text){let h=2166136261;for(let i=0;i<String(text).length;i++){h^=String(text).charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0||1;}
  function random(s){let x=s.rng>>>0;x^=x<<13;x^=x>>>17;x^=x<<5;s.rng=x>>>0||1;return s.rng/4294967296;}
  function roll(s,a,b){return a+random(s)*(b-a);}
  function stat(s,k){return s.stats[k]||0;}
  function flag(s,k){return s.flags[k]||0;}
  function count(s,k){return s.counts[k]||0;}
  function school(s){return C.SCHOOLS[0];}
  function difficulty(s){return byId(C.DIFFICULTIES,s.profile.difficulty)||C.DIFFICULTIES[1];}
  function family(s){return byId(C.FAMILIES,s.profile.family);}
  function hasTalent(s,id){return s.profile.talents.includes(id);}
  function increase(s,key,value=1){s.flags[key]=(s.flags[key]||0)+value;}
  function log(s,text,type='normal'){s.monthLog.push({text,type});}
  function applyStats(s,effects,mult=1){
    for(const [k,v]of Object.entries(effects||{})){
      if(k==='money'){s.money=Math.max(0,Math.round(s.money+v));continue;}
      if(Object.hasOwn(C.STATS,k))s.stats[k]=round(clamp(s.stats[k]+v*(v>0?mult:1)));
    }
  }
  function pay(s,amount){if(amount>s.money)throw new Error('余额不足，行动没有执行。');s.money=Math.round(s.money-amount);s.spent+=amount;}
  function earn(s,amount){s.money+=Math.round(amount);s.earned+=Math.round(amount);}
  function reqReason(s,obj){
    if(obj.minMonth&&s.month<obj.minMonth)return `第${obj.minMonth}月开放`;
    if(obj.maxMonth&&s.month>obj.maxMonth)return '已错过开放时间';
    if(obj.school&&obj.school!==s.profile.school)return '仅对应学校起点开放';
    for(const[k,v]of Object.entries(obj.req||{}))if(stat(s,k)<v)return `${C.STATS[k]?.[0]||k}需达到${v}`;
    return '';
  }
  function createGame(options={}){
    const sid='shu';
    const fid=byId(C.FAMILIES,options.family)?options.family:'ordinary';
    const talents=[...new Set(Array.isArray(options.talents)?options.talents:['curious','listener'])].filter(x=>byId(C.TALENTS,x)).slice(0,2);
    const seed=String(options.seed||'上大-四年').slice(0,100);
    const s={schemaVersion:C.SCHEMA_VERSION,rulesVersion:C.RULES_VERSION,gameId:'unwritten-years',
      runId:options.runId||`uy-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`,
      createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),seed,rng:hash(seed),month:1,phase:'planning',
      profile:{name:String(options.name||'上大小新').trim().slice(0,16)||'上大小新',school:sid,difficulty:byId(C.DIFFICULTIES,options.difficulty)?options.difficulty:'balanced',family:fid,talents,
        gender:['female','male','other'].includes(options.gender)?options.gender:'male',
        romance:['women','men','all','none'].includes(options.romance)?options.romance:'women'},
      focus:byId(C.ROUTES,options.focus)?options.focus:'balanced',
      stats:{iq:36,eq:30,charm:34,health:82,mood:72,stress:15,discipline:34,knowledge:25,research:4,tech:12,art:10,fame:5,explore:8,business:5,exam:3,civic:5,sport:10,gaming:10,service:4,language:12},
      money:0,earned:0,spent:0,flags:{},counts:{},cooldowns:{},plan:[],pending:[],monthLog:[],reports:[],history:[],
      grades:[],semesterStudy:0,failedCourses:0,activeProject:null,projectProgress:{},projectStarts:{},projectCompletions:{},
      relations:{},partner:null,places:[],memories:[],eventSeen:{},eventCounts:{},achievements:[],
      applications:{},offers:{},admission:null,jobAccepted:false,civilAccepted:false,examResult:null,
      recovery:false,recoveryMonths:0,stressMonths:0,result:null,revision:0,imported:false};
    initialiseV2(s,options);
    const f=family(s);s.money=Math.max(0,f.money+difficulty(s).money);applyStats(s,f.bonus);
    for(const t of talents)applyStats(s,byId(C.TALENTS,t).stats);
    for(const n of C.NPCS)s.relations[n.id]={known:false,affection:8,trust:6,months:0,memories:0,lastContact:0,lastConfess:-99,rejectedUntil:0,chapter:0,lastArc:-99};
    const starters=s.profile.romance==='men'?['gu','zhou']:['lin','su'];
    for(const id of starters)s.relations[id].known=true;
    s.history.push({type:'start',options:{...clone(s.profile),seed,focus:s.focus,runId:s.runId}});
    return s;
  }
  function romanceAllowed(s,id){const n=npcs[id];return Boolean(n&&n.age>=18&&s.profile.romance!=='none'&&(s.profile.romance==='all'||(s.profile.romance==='women'&&n.gender==='female')||(s.profile.romance==='men'&&n.gender==='male')));}
  function confessionChance(s,id){const r=s.relations[id];if(!r||!r.known||!romanceAllowed(s,id))return 0;return round(clamp(16+r.affection*.34+r.trust*.26+stat(s,'charm')*.15+stat(s,'eq')*.1,10,95));}
  function projectReason(s,id){const p=projects[id];if(!p)return '项目不存在';const reason=reqReason(s,p);if(reason)return reason;if((s.projectCompletions[id]||0)>=(p.repeat||1))return '该项目已完成';return '';}
  function incomeFor(s,a){let n=a.income||0;if(a.id==='freelance')n+=Math.floor(stat(s,'tech')*3);if(hasTalent(s,'merchant'))n*=1.15;return Math.floor(n);}
  function projectExtraCost(s,planned){if(!s.activeProject)return 0;const p=projects[s.activeProject];return !s.projectStarts[p.id]&&!planned.some(x=>x.id==='project')?p.cost:0;}
  function availableMoney(s,plan=s.plan){let balance=s.money,started=!!s.projectStarts[s.activeProject];for(const item of plan){const a=actions[item.id];if(!a)continue;balance-=a.cost;balance+=incomeFor(s,a);if(a.special==='project'&&!started&&s.activeProject){balance-=projects[s.activeProject].cost;started=true;}}return balance;}
  function actionReason(s,id,target,plan=s.plan){
    if(s.phase!=='planning')return '请先完成本月结算';const a=actions[id];if(!a)return '行动不存在';
    if(plan.length>=4)return '本月四个时段已排满';
    if(plan.filter(x=>x.id===id).length>=a.maxRepeat)return `同一行动每月最多${a.maxRepeat}次`;
    const req=reqReason(s,a);if(req)return req;
    if(['certificate','esport','sportmatch','artshow'].includes(a.special)&&s.cooldowns[a.special]&&s.month-s.cooldowns[a.special]<6)return `第${s.cooldowns[a.special]+6}月可再次参加`;
    if(a.special==='project'){
      if(!s.activeProject)return '先在「长期项目」中选择一个项目';
      const pr=projectReason(s,s.activeProject);if(pr)return pr;
    }
    if(a.target){
      const r=s.relations[target];if(!r?.known)return '先选择一位认识的人';
      if(a.mode==='date'&&r.affection<20)return '亲近度达到20后可约会';
      if(['date','confess'].includes(a.mode)&&!romanceAllowed(s,target))return '该角色不在本局恋爱偏好中；仍可成为好友';
      if(['date','confess'].includes(a.mode)&&s.partner&&s.partner!==target)return '已有伴侣；请先坦诚处理当前关系';
      if(a.mode==='confess'){
        if(s.partner===target)return '你们已经在一起了';
        if(s.partner)return '请先处理当前关系';
        if(r.affection<55||r.trust<25)return '需要亲近度55、信任25';
        if(s.month-r.lastConfess<3||s.month<r.rejectedUntil)return '给彼此一点空间，稍后再表达';
      }
      if(a.mode==='breakup'&&s.partner!==target)return '请选中当前伴侣';
    }
    const extra=a.special==='project'?projectExtraCost(s,plan):0;
    if(availableMoney(s,plan)<a.cost+extra)return `预计余额不足，需要¥${a.cost+extra}（可先安排勤工助学）`;
    if(s.recovery&&!['rest','home','run'].includes(id)&&plan.filter(x=>!['rest','home','run'].includes(x.id)).length>=2)return '恢复月需至少安排两次休息／回家／慢跑';
    return '';
  }
  function queueAction(s,id,target){const reason=actionReason(s,id,target);if(reason)return {...FAIL,reason};s.plan.push({id,...(target?{target}:{} )});return {ok:true};}
  function removeAction(s,indexValue){if(s.phase!=='planning')return {...FAIL,reason:'请先完成本月结算'};s.plan.splice(indexValue,1);return {ok:true};}
  function moveAction(s,i,delta){if(s.phase!=='planning')return;const j=i+delta;if(i<0||j<0||i>=s.plan.length||j>=s.plan.length)return;[s.plan[i],s.plan[j]]=[s.plan[j],s.plan[i]];}
  function chooseProject(s,id){if(s.phase!=='planning')return {...FAIL,reason:'请先完成本月结算'};if(s.plan.some(x=>x.id==='project'))return {...FAIL,reason:'先移除计划中的项目行动，再切换项目'};const reason=projectReason(s,id);if(reason)return {...FAIL,reason};s.activeProject=id;s.history.push({type:'project',month:s.month,id});return {ok:true};}
  function changeFocus(s,id){if(s.phase!=='planning'||!byId(C.ROUTES,id))return {...FAIL,reason:'当前不能更换方向'};s.focus=id;s.history.push({type:'focus',month:s.month,id});return {ok:true};}
  function growthMultiplier(s,a,repeat){
    let m=1;if(a.tags.includes('study'))m*=.84+stat(s,'iq')*.006;
    if(a.tags.includes('study'))m*=school(s).resource*difficulty(s).resource;
    for(const id of s.profile.talents){const t=byId(C.TALENTS,id);if(t.tags?.some(x=>a.tags.includes(x)))m*=1+t.boost;}
    if(stat(s,'stress')>80)m*=.75;if(stat(s,'health')<30)m*=.72;
    if(repeat)m*=hasTalent(s,'planner')?.80:.65;
    return m*v2Growth(s,a);
  }
  function applyGrowth(s,a,m){for(const[k,v]of Object.entries(a.stats)){let gain=v;if(v>0&&!['health','mood','stress'].includes(k)){gain*=m;if(stat(s,k)>=90)gain*=.55;else if(stat(s,k)>=70)gain*=.8;}applyStats(s,{[k]:gain});}}
  function meet(s,id){const n=npcs[id],r=s.relations[id];if(!n||!r||(n.rich&&s.month<7))return;if(!r.known){r.known=true;r.lastContact=s.month;log(s,`认识了${n.name}：${n.role}。`,'relationship');s.memories.push({month:s.month,title:`初见 · ${n.name}`,text:n.intro});}}
  function meetThrough(s,a){
    if(!a.meet?.length)return;
    const eligible=a.meet.filter(id=>!npcs[id].rich||s.month>=7);
    const unknown=eligible.filter(id=>!s.relations[id].known);
    if(unknown.length&&random(s)<.82){meet(s,unknown[Math.floor(random(s)*unknown.length)]);return;}
    const known=eligible.filter(id=>s.relations[id].known);if(known.length){const id=known[Math.floor(random(s)*known.length)];const r=s.relations[id];r.affection=round(clamp(r.affection+1.5+stat(s,'charm')/80));r.trust=round(clamp(r.trust+1.4));r.lastContact=s.month;}
  }
  function place(s){const unseen=C.PLACES.filter(x=>!s.places.includes(x));if(unseen.length){const p=unseen[Math.floor(random(s)*unseen.length)];s.places.push(p);s.memories.push({month:s.month,title:'旅行记忆',text:p});log(s,`旅行记忆 +1：${p}。`,'achievement');}else{applyStats(s,{explore:1,art:1});}}
  function relationAction(s,a,id,m){
    const n=npcs[id],r=s.relations[id];if(!n||!r?.known)return;
    const trustBase=4+stat(s,'eq')/50+(hasTalent(s,'listener')?1:0);
    const fit=stat(s,n.affinity)/60;
    let affection=0,trust=0;
    if(a.mode==='listen'){affection=(4+fit)*(.85+stat(s,'charm')/140)*m;trust=trustBase;}
    if(a.mode==='date'){affection=(7+fit)*(.85+stat(s,'charm')/140)*m;trust=trustBase+1;r.memories++;s.memories.push({month:s.month,title:`和${n.name}一起`,text:['沿湖散步时聊起了未来。','发现一家便宜又好吃的小店。','一起看完了礼堂里的演出。','各自讲了一件最近真正开心的事。'][Math.floor(random(s)*4)]});}
    if(a.mode==='gift'){affection=6*(.9+stat(s,'charm')/200)*m;trust=.7;}
    if(a.mode==='confess'){
      r.lastConfess=s.month;const p=confessionChance(s,id);
      if(!s.partner&&romanceAllowed(s,id)&&random(s)*100<p){s.partner=id;r.months=0;trust=7;affection=7;increase(s,'relationships');log(s,`${n.name}接受了你的心意。你们决定认真试着在一起。`,'relationship');s.memories.push({month:s.month,title:'关系的新一页',text:`和${n.name}确认了彼此的心意。`});}
      else{applyStats(s,{mood:-4,eq:2});r.rejectedUntil=s.month+3;log(s,`${n.name}暂时没有接受。你尊重了答案，仍保留体面的空间。`,'relationship');}
    }
    if(a.mode==='breakup'&&s.partner===id){s.partner=null;r.months=0;affection=-10;trust=-5;log(s,`你与${n.name}坦诚告别，各自保留了继续生活的空间。`,'relationship');}
    r.affection=round(clamp(r.affection+affection));r.trust=round(clamp(r.trust+trust));r.lastContact=s.month;
    if(affection>0||trust>0)log(s,`${n.name}：亲近度 +${round(affection)}，信任 +${round(trust)}。`,'relationship');
  }
  function advanceProject(s,m){
    const id=s.activeProject,p=projects[id];if(!p){log(s,'项目已完成，剩余项目时段用于整理复盘。');applyStats(s,{discipline:2,tech:1});return;}
    if(!s.projectStarts[id]){pay(s,p.cost);s.projectStarts[id]=true;log(s,`启动「${p.name}」，投入¥${p.cost}。`,'project');}
    const old=s.projectProgress[id]||0,gain=(1.2+stat(s,'iq')/130+projectTeamBonus(s,p))*Math.max(.65,m);
    s.projectProgress[id]=round(Math.min(p.steps,old+gain));
    log(s,`${p.name}：${s.projectProgress[id]} / ${p.steps}。`,'project');
    if(s.projectProgress[id]>=p.steps){
      applyStats(s,p.reward);increase(s,p.flag);projectCompletedV2(s,p);if(p.income)earn(s,p.income*(hasTalent(s,'merchant')?1.15:1));
      s.projectCompletions[id]=(s.projectCompletions[id]||0)+1;s.projectStarts[id]=false;s.projectProgress[id]=0;s.activeProject=null;
      s.memories.push({month:s.month,title:`完成 · ${p.name}`,text:'从开始到完成，这是属于你的真实成果。'});
      log(s,`完成项目「${p.name}」！${p.income?`收到¥${p.income}项目收入。`:''}`,'achievement');
    }
  }
  function executeAction(s,item,repeat){
    const a=effectiveAction(s,actions[item.id]),m=growthMultiplier(s,a,repeat);
    s.monthActivity=s.monthActivity||[];s.monthActivity.push({id:a.id,location:a.location,tags:a.tags});if(a.id==='project')s.lastProjectLocation=a.location;
    pay(s,a.cost);applyGrowth(s,a,m);if(a.income)earn(s,incomeFor(s,a));
    s.counts[a.id]=(s.counts[a.id]||0)+1;
    if(a.cat==='study')s.semesterStudy++;
    if(a.special==='relationship')relationAction(s,a,item.target,repeat?.72:1);
    if(a.special==='project')advanceProject(s,m);
    if(a.special==='remedial'&&s.failedCourses>0){s.failedCourses--;log(s,'补修通过：待补课程 -1。','achievement');}
    if(a.special==='place')place(s);
    if(a.special==='intern')increase(s,'internships');
    if(a.special==='freelance')increase(s,'commissions');
    if(a.special==='nightgame')increase(s,'lateNights');
    if(a.special==='home')increase(s,'familyMemories');
    if(a.special==='pitch'){
      const strength=stat(s,'business')*.48+stat(s,'tech')*.2+stat(s,'eq')*.22+stat(s,'iq')*.1;
      if(flag(s,'products')>0&&strength+roll(s,-8,8)>=60&&flag(s,'funded')<3){increase(s,'funded');earn(s,2200+flag(s,'products')*600);log(s,'路演获得了合作支持。支持不是无限提款：每局最多三次。','achievement');}
      else log(s,flag(s,'products')?'这次没有新增资金，路演反馈变成了下一步的改进清单。':'对方建议先做出真实产品，再继续谈支持。','project');
    }
    if(['certificate','esport','sportmatch','artshow'].includes(a.special)){
      if(s.cooldowns[a.special]&&s.month-s.cooldowns[a.special]<6){log(s,'赛事仍在冷却期，本时段改作赛后复盘。');return;}
      s.cooldowns[a.special]=s.month;
      let strength,key,threshold=65;
      if(a.special==='certificate'){strength=stat(s,'tech')*.8+stat(s,'discipline')*.2;key='certificates';threshold=58;}
      if(a.special==='esport'){strength=stat(s,'gaming')*.7+stat(s,'discipline')*.2+stat(s,'eq')*.1;key='esportMedals';}
      if(a.special==='sportmatch'){strength=stat(s,'sport')*.7+stat(s,'health')*.2+stat(s,'discipline')*.1;key='sportMedals';}
      if(a.special==='artshow'){strength=stat(s,'art')*.75+stat(s,'fame')*.25;key='artAwards';threshold=60;}
      if(strength+roll(s,-5,5)>=threshold){increase(s,key);applyStats(s,{fame:6,mood:5});earn(s,350);log(s,`${a.name}取得认可，获得一枚成果徽章及¥350奖励。`,'achievement');}
      else{applyStats(s,{discipline:2});log(s,`${a.name}还没有获奖。复盘留下了经验，六个月后可以再试。`);}
    }
    meetThrough(s,a);actionCompletedV2(s,a);
    if([4,12,24].includes(count(s,a.id))){s.achievements.push({id:`habit-${a.id}-${count(s,a.id)}`,title:`${a.name} · ${count(s,a.id)}次`,month:s.month});log(s,`习惯徽章：${a.name}累计${count(s,a.id)}次。`,'achievement');}
  }
  function synergy(s,plan){const set=new Set(plan.map(x=>x.id));const pairs=[
    ['library','run','身体和脑子一起转',{exam:3,iq:1}],['studygroup','seminar','把知识讲明白',{research:3,eq:1}],
    ['product','interview','先听需求，再做产品',{business:4}],['code','project','做出来，比想明白再多一步',{tech:3}],
    ['vlog','travel','把远方变成作品',{art:4,fame:2}],['train','review','训练与复盘闭环',{gaming:4,discipline:2}],
    ['listen','date','陪伴也需要沟通',{eq:3,mood:3}],['exam','hike','换个环境，思路更清楚',{exam:3,iq:2}],
    ['volunteer','policy','把纸面知识放进现实',{civic:4,service:2}],['gym','style','健康与气质的联动',{charm:3}]
    ];pairs.push(...C.EXTRA_SYNERGIES);for(const[a,b,title,effects]of pairs)if(set.has(a)&&set.has(b)){applyStats(s,effects);log(s,`行动联动：${title}。`,'synergy');increase(s,'synergies');}}
  function gradeAverage(s){if(s.grades.length)return round(mean(s.grades.map(x=>x.grade)));return round(clamp(53+stat(s,'knowledge')*.34+stat(s,'discipline')*.12-difficulty(s).gradePenalty-stat(s,'stress')*.06));}
  function semesterGrade(s){return round(clamp(53+stat(s,'knowledge')*.34+Math.min(12,s.semesterStudy)*.7+stat(s,'discipline')*.12-stat(s,'stress')*.06-difficulty(s).gradePenalty+roll(s,-2,2)));}
  function maintenance(s){
    applyStats(s,{knowledge:.55,iq:.12,health:-.8,stress:1.5});
    if(hasTalent(s,'resilient'))applyStats(s,{stress:-2});
    const stipend=family(s).stipend;earn(s,stipend);pay(s,800);
    log(s,`生活费 +¥${stipend}，基本生活开销 -¥800。`,'money');
    for(const[id,r]of Object.entries(s.relations)){
      if(!r.known)continue;
      if(s.partner===id){r.months++;if(s.month-r.lastContact>=2){r.affection=round(clamp(r.affection-2));r.trust=round(clamp(r.trust-1.5));if(s.month-r.lastContact===3)log(s,`${npcs[id].name}想找时间和你好好聊聊。长期关系也需要被安排进日历。`,'relationship');}else applyStats(s,{mood:1.5,stress:-1});}
      else if(s.month-r.lastContact>5)r.affection=round(clamp(r.affection-.4));
    }
    if(stat(s,'stress')>85){s.stressMonths++;applyStats(s,{health:-3,mood:-2});}else s.stressMonths=Math.max(0,s.stressMonths-1);
    s.recovery=stat(s,'health')<22||stat(s,'stress')>=96;if(s.recovery){s.recoveryMonths++;log(s,'下个月为恢复月：至少安排两次休息、回家或慢跑。','warning');}
    if(academicPeriod(s).grade){const grade=semesterGrade(s);s.grades.push({month:s.month,grade});s.semesterStudy=0;if(grade<60)s.failedCourses++;log(s,`本学期均分 ${grade}，累计均分 ${gradeAverage(s)}。${grade<60?'有1门课程需要补修。':''}`,'academic');if(grade>=88){earn(s,500);log(s,'本学期表现优秀，获得¥500游戏内奖学金。','achievement');}}
  }
  function examReadiness(s){return round(clamp(stat(s,'exam')*.60+stat(s,'knowledge')*.12+stat(s,'iq')*.10+stat(s,'discipline')*.12+stat(s,'language')*.06+stat(s,'explore')*.035));}
  function recommendationReason(s){const sc=school(s);if(gradeAverage(s)<sc.recommendation)return `累计均分需${sc.recommendation}`;if(stat(s,'research')<55)return '科研需55';if(!flag(s,'papers'))return '至少完成1篇研究论文';if(s.failedCourses)return '仍有待补课程';return '';}
  function studyEligibility(s){return s.profile.school==='shu';}
  function dynamic(s,id,title,text,options,extra={}){s.pending.push({kind:'dynamic',event:{id,title,text,options,...extra}});}
  const op=(label,extra={})=>({label,stats:{},...extra});
  function milestones(s){
    const m=s.month;
    if([12,24].includes(m))dynamic(s,`letter-${m}`,m===12?'第一年，已收藏':'四年过半，依然可以转弯',m===12?'当初觉得陌生的路，如今闭着眼也能走到。你想把哪一种习惯带进下一年？':'不需要被最初的选择困住。那些已经学会的东西，都可以成为下一段路的起点。',[op('继续保持好奇',{stats:{iq:4,explore:3}}),op('珍惜关系，也照顾自己',{stats:{eq:4,health:3,mood:4}}),op('认真做完一件事',{stats:{discipline:5,tech:2}})]);
    if(m===36){const reason=recommendationReason(s);dynamic(s,'recommendation-apply','推免夏令营 · 选择申请',`本作门槛：均分${school(s).recommendation??'—'}、科研55、论文1篇、无待补课程。当前均分${gradeAverage(s)}。${reason?'尚未满足：'+reason+'。':'你已满足申请条件。'}结果在第37月公布。`,[
      op('冲刺顶尖研究平台',{effect:'recommend-apply',target:'top',disabled:!!reason,reason}),
      op('申请匹配研究平台',{effect:'recommend-apply',target:'strong',disabled:!!reason,reason}),
      op('把选择留给考研或其他路线',{stats:{discipline:2,exam:3}})
    ]);}
    if(m===37){
      if(s.applications.baoyan){const tier=s.offers.baoyan;dynamic(s,'recommendation-result','推免结果已送达',tier?`你获得了${tier==='top'?'顶尖':'匹配'}研究平台的录取邀请。接受后，本作不再允许重复报名另一条升学通道。`:'本次冲刺没有收到录取。第38月仍可报名考研，也可以选择已经积累的其他道路。',[
        op('接受录取，继续研究',{effect:'accept-academic',path:'baoyan',tier,disabled:!tier,reason:'尚未获得录取'}),
        op(tier?'婉拒，按自己的计划走':'整理经验，准备下一步',{stats:{exam:4,discipline:2}})
      ]);}
      dynamic(s,'thesis-open','毕业设计，现在开始','最后一年还需要完成毕业论文／毕业设计项目。它需要若干次「推进长期项目」，不要等到最后一个月。',[op('收到，预留项目时间',{stats:{discipline:2}}),op('先和同学讨论选题',{stats:{eq:2,knowledge:2}})]);
    }
    if(m===38){let reason=!studyEligibility(s)?'当前身份不可报名':s.admission?'已接受另一条升学录取':'';dynamic(s,'exam-signup','考研报名 · 选一段坡度',`当前备考综合值 ${examReadiness(s)}。初试在第40月，复试在第43月。档位为游戏抽象，不对应真实学校分数。`,[
      ...[['top','冲刺顶尖平台',80],['excellent','冲刺985平台',72],['strong','申请211平台',64],['general','申请普通研究平台',55]].map(([target,label,line])=>op(`${label} · 初试线${line}`,{effect:'exam-apply',target,line,cost:150,disabled:!!reason,reason})),
      op('不报名，继续其他方向',{stats:{discipline:2}})
    ]);}
    if(m===39){
      dynamic(s,'job-signup','秋招 · 把作品递出去','可以保留一份就业选择，不必因为准备考研就把所有退路关上。',[
        op('投递实习与正式岗位',{effect:'job-apply'}),op('暂不投递',{stats:{mood:1}})]);
      dynamic(s,'civil-signup','公共岗位 · 是否报考','第44月揭晓结果。本作以公共事务、学业、情商、自律综合结算。',[
        op('报名参加选拔',{effect:'civil-apply',cost:150}),op('不报名，专注当前计划',{stats:{discipline:1}})]);
      const reason=s.admission?'已经接受其他升学录取':!studyEligibility(s)?'需先完成升学衔接':'';
      dynamic(s,'overseas-signup','远方来信 · 申请窗口','语言、成绩、科研或作品，共同组成你的申请。申请费为游戏内支出；优秀能力可获得游戏内奖学金。',[
        op('提交申请材料',{effect:'overseas-apply',cost:1200,disabled:!!reason,reason}),op('这次不申请',{stats:{mood:1}})]);
    }
    if(m===40&&s.applications.exam){
      const app=s.applications.exam;const score=round(clamp(examReadiness(s)+roll(s,-8,8)-Math.max(0,stat(s,'stress')-50)*.05-(stat(s,'health')<30?4:0)));
      s.examResult={score,line:app.line,target:app.target,passed:score>=app.line,interview:null,admitted:false};
      dynamic(s,'exam-written','走出考场的下午',`游戏内初试结果：${score} / 100，所选档位分数线${app.line}。${score>=app.line?'进入复试；接下来表达与研究准备也很重要。':'未过所选档位线。第43月会检查是否存在普通档调剂机会。'}`, [op('先休息一下，再安排后面的事',{stats:{mood:5,stress:-10}}),op('整理复试或转向计划',{stats:{eq:3,discipline:3}})]);
    }
    if(m===41&&s.applications.job){const quality=stat(s,'tech')*.65+stat(s,'eq')*.15+stat(s,'discipline')*.2;s.offers.job=quality>=55&&flag(s,'internships')>=2?'offer':null;dynamic(s,'job-result','招聘结果 · 新的开始',s.offers.job?'你收到了录用邀请。它可以暂时作为升学之外的备选，不会强迫你取消考试。':'这次没有拿到录用。继续做作品、实习或接单，四年之外仍有很多招聘窗口。',[
      op('接受录用',{effect:'accept-job',disabled:!s.offers.job,reason:'尚未获得录用'}),op(s.offers.job?'婉拒，继续其他计划':'整理作品，继续积累',{stats:{tech:3,discipline:2}})]);}
    if(m===43&&s.examResult){const er=s.examResult;er.interview=round(clamp(er.score*.58+stat(s,'eq')*.22+stat(s,'language')*.1+stat(s,'research')*.1+roll(s,-4,4)));
      const interviewLine={top:66,excellent:59,strong:52,general:45}[er.target];const pass=er.passed&&er.interview>=interviewLine;
      const transfer=!pass&&er.score>=55&&er.interview>=45;
      dynamic(s,'exam-result','复试之后 · 收到答案',`初试${er.score}，复试综合${er.interview}。${pass?'你获得了所报档位录取。':transfer?'原目标未录取，但获得普通研究平台调剂机会。':'这次没有获得录取。备考留下的能力仍会进入其他方向评分。'}`,[
        op('接受所报档位录取',{effect:'accept-academic',path:'kaoyan',tier:er.target,disabled:!pass||!!s.admission,reason:s.admission?'已接受其他升学录取':'未获得该档录取'}),
        op('接受普通档调剂',{effect:'accept-academic',path:'kaoyan',tier:'general',disabled:!transfer||!!s.admission,reason:'没有可接受的调剂机会'}),
        op(pass||transfer?'不接受，按其他计划走':'把经历留给下一步',{stats:{mood:4,discipline:3}})
      ]);
    }
    if(m===44){
      if(s.applications.civil){const score=stat(s,'civic')*.5+stat(s,'knowledge')*.25+stat(s,'eq')*.15+stat(s,'discipline')*.1+roll(s,-6,6);s.offers.civil=score>=68;dynamic(s,'civil-result','公共岗位 · 选拔结果',s.offers.civil?'你获得了一份公共岗位录用邀请。':'这次未获录用。学习到的公共知识和表达能力并没有失去价值。',[
        op('接受录用',{effect:'accept-civil',disabled:!s.offers.civil,reason:'尚未获得录用'}),op('继续其他方向',{stats:{eq:2}})]);}
      if(s.applications.overseas){const score=stat(s,'language')*.5+gradeAverage(s)*.18+stat(s,'research')*.17+stat(s,'art')*.15;s.offers.overseas=score+roll(s,-4,4)>=65;const scholarship=score>=80&&stat(s,'language')>=85;
        dynamic(s,'overseas-result','来自远方的申请结果',s.offers.overseas?`你获得了录取。${scholarship?'同时获得游戏内奖学金支持。':'这是一条新路，也需要继续认真安排资源。'}`:'本次申请未获录取。你仍可以用语言和作品打开其他机会。',[
          op('接受录取',{effect:'accept-academic',path:'overseas',tier:scholarship?'scholarship':'regular',disabled:!s.offers.overseas||!!s.admission,reason:s.admission?'已接受其他升学录取':'尚未获得录取'}),
          op('留在原来的计划上',{stats:{mood:2}})]);
      }
    }
    if(m===47&&!flag(s,'thesis'))dynamic(s,'thesis-warning','毕业设计 · 最后提醒','你还有本月之后的最后一个月。选择毕业设计项目，安排足够的推进次数；只有文字计划不会自动变成成品。',[
      op('留出时间，把它做完整',{stats:{discipline:3}}),op('请老师帮助缩小选题',{stats:{knowledge:2,eq:2}})]);
    if(m===48)dynamic(s,'final-letter','第48个月 · 把这一页留住','不是每一个愿望都实现了。但你已经不是刚入校门时，那个不知道往哪走的人。',[op('谢谢自己，也谢谢相遇的人',{stats:{mood:4,eq:1}}),op('下一段人生，继续保持好奇',{stats:{iq:2,explore:2}}),op('带着没有做完的事，继续向前',{stats:{discipline:3}})]);
  }
  function queueRandomEvent(s){
    const fixed=C.EVENTS.find(e=>e.fixed===s.month);if(fixed){s.pending.push({kind:'event',id:fixed.id});return;}
    const season=((s.month-1)%12)+1;
    let pool=C.EVENTS.filter(e=>!e.fixed&&!e.calendarMonth&&!reqReason(s,e)&&(!e.season||e.season.includes(season))&&!(e.once&&s.eventCounts[e.id])&&(!s.eventSeen[e.id]||s.month-s.eventSeen[e.id]>=e.cooldown));
    const fresh=pool.filter(e=>!s.eventCounts[e.id]);if(fresh.length)pool=fresh;
    if(pool.length)s.pending.push({kind:'event',id:pool[Math.floor(random(s)*pool.length)].id});
  }
  function queueRelations(s){
    const candidates=C.NPCS.filter(n=>{const r=s.relations[n.id];return r.known&&r.chapter<3&&r.affection>=[25,55,80][r.chapter]&&r.trust>=[12,30,55][r.chapter]&&s.month-r.lastArc>=3;}).sort((a,b)=>s.relations[b.id].affection-s.relations[a.id].affection);
    if(candidates.length){const n=candidates[0],r=s.relations[n.id],ch=n.chapters[r.chapter];dynamic(s,`arc-${n.id}-${r.chapter}`,`${n.name} · ${ch[0]}`,ch[1],[
      op(ch[2],{effect:'arc',npc:n.id,stats:{[ch[3]]:3},affection:5,trust:6}),
      op('坦诚说出自己的想法，一起寻找可行的办法',{effect:'arc',npc:n.id,stats:{eq:3},affection:4,trust:6})
    ],{npc:n.id});}
    if(!s.partner){const admirers=C.NPCS.filter(n=>{const r=s.relations[n.id];return r.known&&romanceAllowed(s,n.id)&&r.affection>=60&&r.trust>=35&&s.month>=r.rejectedUntil;});if(admirers.length&&random(s)<.04+stat(s,'charm')*.0035){const n=admirers.sort((a,b)=>s.relations[b.id].affection-s.relations[a.id].affection)[0];dynamic(s,`approach-${n.id}`,`${n.name}发来了一条长消息`,'“最近总会想起和你一起做的事。如果你也愿意，我们可不可以认真试着在一起？”',[
      op('我也想认真试试',{effect:'approach-accept',npc:n.id}),op('谢谢你的坦诚，我更希望保持朋友关系',{effect:'approach-decline',npc:n.id,stats:{eq:2}})
    ],{npc:n.id});}}
  }
  function currentEvent(s){if(!s.pending.length)return null;const q=s.pending[0];return q.kind==='event'?events[q.id]:q.event;}
  function optionReason(s,opt){if(!opt)return '选项不存在';if(opt.disabled)return opt.reason||'尚不符合条件';if(opt.cost&&opt.cost>s.money)return `余额不足：需要¥${opt.cost}`;if(opt.effect==='accept-academic'&&s.admission)return '已接受另一条升学录取';return '';}
  function executeOption(s,opt){
    if(opt.cost)pay(s,opt.cost);if(opt.money)earn(s,opt.money);applyStats(s,opt.stats);if(opt.flag)increase(s,opt.flag);if(opt.meet)meet(s,opt.meet);if(opt.place)place(s);
    if(opt.check){const c=opt.check,success=stat(s,c.stat)+roll(s,-5,5)>=c.threshold;applyStats(s,success?c.success:c.failure);log(s,success?c.successText:c.failureText,success?'achievement':'normal');}
    switch(opt.effect){
      case'recommend-apply':{s.applications.baoyan=opt.target;const score=gradeAverage(s)*.40+stat(s,'research')*.35+stat(s,'knowledge')*.10+stat(s,'language')*.08+stat(s,'iq')*.07+roll(s,-4,4);s.offers.baoyan=opt.target==='top'?(score>=83?'top':null):'strong';break;}
      case'accept-academic':s.admission={path:opt.path,tier:opt.tier};if(opt.path==='kaoyan'&&s.examResult)s.examResult.admitted=true;log(s,`已接受${{baoyan:'推免',kaoyan:'考研',overseas:'海外申请'}[opt.path]}录取。`,'achievement');break;
      case'exam-apply':s.applications.exam={target:opt.target,line:opt.line};break;
      case'job-apply':s.applications.job=true;break;
      case'civil-apply':s.applications.civil=true;break;
      case'overseas-apply':s.applications.overseas=true;break;
      case'accept-job':s.jobAccepted=true;break;
      case'accept-civil':s.civilAccepted=true;break;
      case'arc':{const r=s.relations[opt.npc];r.affection=round(clamp(r.affection+opt.affection));r.trust=round(clamp(r.trust+opt.trust));r.chapter=Math.min(3,r.chapter+1);r.lastArc=s.month;r.lastContact=s.month;r.memories++;s.memories.push({month:s.month,title:`${npcs[opt.npc].name} · 关系第${r.chapter}章`,text:opt.label});break;}
      case'approach-accept':if(!s.partner&&romanceAllowed(s,opt.npc)){s.partner=opt.npc;const r=s.relations[opt.npc];r.months=0;r.trust=clamp(r.trust+6);r.lastContact=s.month;increase(s,'relationships');s.memories.push({month:s.month,title:'一条双向奔赴的消息',text:`${npcs[opt.npc].name}主动表白，你们确认了心意。`});log(s,`你们决定认真在一起。`,'relationship');}break;
      case'approach-decline':s.relations[opt.npc].rejectedUntil=s.month+8;break;
    }
  }
  function resolveMonth(s){
    if(s.phase!=='planning')return {...FAIL,reason:'本月已经结算，请完成事件或报告'};
    if(s.plan.length!==4)return {...FAIL,reason:'请先安排四个时段'};
    const tmp=clone(s),plan=clone(s.plan);tmp.plan=[];
    // Validate every slot before any mutation. A removed income action cannot create negative money.
    for(const item of plan){const reason=actionReason(tmp,item.id,item.target,tmp.plan);if(reason)return {...FAIL,reason};tmp.plan.push(item);}
    if(s.recovery&&plan.filter(x=>['rest','home','run'].includes(x.id)).length<2)return {...FAIL,reason:'恢复月至少需要两次恢复行动'};
    tmp.phase='resolving';tmp.monthActivity=[];tmp.lastProjectLocation=null;tmp.monthLog=[];tmp.pending=[];tmp.beforeMonth={stats:clone(s.stats),money:s.money};
    const repeats={};for(const item of plan){executeAction(tmp,item,!!repeats[item.id]);repeats[item.id]=true;}
    synergy(tmp,plan);maintenance(tmp);maintainV2(tmp);settleShuTasks(tmp);milestones(tmp);queueShuAgenda(tmp);queueRandomEvent(tmp);queueRelations(tmp);
    tmp.history.push({type:'month',month:tmp.month,plan});tmp.phase='events';tmp.updatedAt=new Date().toISOString();tmp.revision++;
    for(const key of Object.keys(s))delete s[key];Object.assign(s,tmp);
    if(!s.pending.length)finishMonth(s);
    return {ok:true};
  }
  function chooseOption(s,i){
    if(s.phase!=='events')return {...FAIL,reason:'当前没有待处理事件'};const e=currentEvent(s),opt=e?.options[i],reason=optionReason(s,opt);if(reason)return {...FAIL,reason};
    executeOption(s,opt);const activity=s.shu.agenda.find(a=>a.eventId===e.id&&a.month===s.month);if(activity)activity.choice=i;s.eventSeen[e.id]=s.month;s.eventCounts[e.id]=(s.eventCounts[e.id]||0)+1;
    log(s,`${e.title}：${opt.label}`,'event');s.history.push({type:'choice',month:s.month,eventId:e.id,index:i});s.pending.shift();s.revision++;s.updatedAt=new Date().toISOString();if(!s.pending.length)finishMonth(s);return {ok:true};
  }
  function graduate(s){return flag(s,'thesis')>0&&s.failedCourses===0&&gradeAverage(s)>=60;}
  function routeScores(s,final=false){
    const v=k=>stat(s,k),f=k=>flag(s,k),p=s.partner?s.relations[s.partner]:null;const avg=gradeAverage(s);
    let baoyan=avg*.36+v('research')*.34+v('knowledge')*.10+v('language')*.10+v('iq')*.10;
    if(s.admission?.path==='baoyan')baoyan=clamp(baoyan+10+(s.admission.tier==='top'?7:0));
    else baoyan=Math.min(baoyan,final?35:86);
    let kaoyan=examReadiness(s);
    if(s.admission?.path==='kaoyan')kaoyan=clamp(kaoyan+({top:15,excellent:11,strong:7,general:3}[s.admission.tier]||0));
    else if(final)kaoyan=Math.min(kaoyan,s.examResult?55:35);
    let startup=v('business')*.45+v('tech')*.20+v('eq')*.15+v('fame')*.10+v('discipline')*.10;
    if(!f('products'))startup=Math.min(startup,55);else startup=clamp(startup+Math.min(8,f('products')*4));
    if(s.venture.profitableMonths<3)startup=Math.min(startup,82);else startup=clamp(startup+Math.min(5,s.venture.profitableMonths));
    let love=p?p.affection*.42+p.trust*.36+Math.min(100,p.months/12*100)*.16+Math.min(100,p.memories/8*100)*.06:0;
    let richlove=p&&npcs[s.partner].rich?love*.86+Math.max(v('business'),v('tech'))*.14:0;
    if(p&&npcs[s.partner].rich)richlove=clamp(richlove+2);
    let career=v('tech')*.48+v('discipline')*.17+v('eq')*.15+Math.min(100,f('internships')/6*100)*.20;
    if(!f('portfolios'))career=Math.min(career,72);if(final&&!s.jobAccepted)career=Math.min(career,65);else if(s.jobAccepted)career=clamp(career+8);
    let civil=v('civic')*.52+v('knowledge')*.20+v('eq')*.16+v('discipline')*.12;
    if(s.civilAccepted)civil=clamp(civil+10);else if(final)civil=Math.min(civil,62);
    let creator=v('art')*.50+v('fame')*.30+v('eq')*.10+v('discipline')*.10;
    if(!f('works')&&!f('indieGames'))creator=Math.min(creator,65);else creator=clamp(creator+Math.min(10,f('works')*4+f('indieGames')*6));
    let esports=v('gaming')*.60+v('discipline')*.20+v('eq')*.10+v('health')*.10;
    if(!f('esportMedals')||!f('teams'))esports=Math.min(esports,72);else esports=clamp(esports+8);
    let sport=v('sport')*.65+v('health')*.20+v('discipline')*.15;
    if(!f('sportMedals')&&!f('marathons'))sport=Math.min(sport,75);else sport=clamp(sport+6);
    let service=v('service')*.60+v('eq')*.20+v('fame')*.10+v('health')*.10;
    if(!f('charities')&&!f('hometowns'))service=Math.min(service,72);else service=clamp(service+8);
    let travel=v('explore')*.55+v('art')*.15+v('eq')*.15+v('mood')*.15;
    if(!f('expeditions')||s.places.length<6)travel=Math.min(travel,75);else travel=clamp(travel+6);
    let overseas=v('language')*.45+v('research')*.20+avg*.15+v('art')*.10+v('eq')*.10;
    if(s.admission?.path==='overseas')overseas=clamp(overseas+12);else if(final)overseas=Math.min(overseas,35);
    let craft=v('tech')*.58+v('discipline')*.25+v('knowledge')*.10+v('eq')*.07;
    if(!f('certificates')||!(f('portfolios')||f('patents')))craft=Math.min(craft,70);else craft=clamp(craft+9);
    let freelance=v('tech')*.4+v('art')*.25+v('business')*.2+v('discipline')*.15;
    if(f('commissions')<6)freelance=Math.min(freelance,65);else freelance=clamp(freelance+8);
    const diverse=KEY_SKILLS.map(k=>v(k)).sort((a,b)=>b-a);
    const breadth=clamp(Object.keys(s.counts).length/24*100);
    let balanced=mean(diverse.slice(0,8))*.40+v('health')*.22+v('mood')*.23+breadth*.15;
    if(Object.keys(s.counts).length<18)balanced=Math.min(balanced,70);
    const out={baoyan,kaoyan,startup,love,richlove,career,civil,creator,esports,sport,service,travel,overseas,craft,freelance,balanced};
    for(const r of C.ROUTES)if(r.proof)out[r.id]=newRouteScore(s,r);
    for(const id of Object.keys(out))out[id]=round(clamp(out[id]));return out;
  }
  function qualifyingEndings(s){
    const v=k=>stat(s,k),f=k=>flag(s,k),p=s.partner?s.relations[s.partner]:null;const grad=graduate(s),ad=s.admission;
    const tests={
      baoyan_top:ad?.path==='baoyan'&&ad.tier==='top'&&v('research')>=75&&f('papers')>=1,
      baoyan_regular:ad?.path==='baoyan',kaoyan_top:ad?.path==='kaoyan'&&ad.tier==='top',kaoyan_up:ad?.path==='kaoyan',
      kaoyan_again:!!s.examResult&&!s.examResult.admitted&&v('exam')>=45&&!ad,
      startup_legend:v('business')>=85&&f('products')>=2&&f('funded')>=1&&s.money>=3000&&s.venture.profitableMonths>=3,
      startup_studio:v('business')>=65&&f('products')>=1&&s.money>=1200,
      love_lifetime:p&&p.months>=12&&p.affection>=90&&p.trust>=85&&p.memories>=8,
      love_story:p&&p.affection>=70&&p.trust>=60,
      richlove:p&&npcs[s.partner].rich&&p.months>=10&&p.affection>=90&&p.trust>=85&&(v('business')>=50||v('tech')>=60),
      job_top:v('tech')>=80&&f('portfolios')>=1&&f('internships')>=4&&s.jobAccepted,
      freelancer:f('commissions')>=6&&v('tech')>=65&&v('art')>=45&&(f('portfolios')||f('works')||f('indieGames')),
      civil_servant:v('civic')>=75&&s.civilAccepted,
      creator_star:v('art')>=85&&v('fame')>=75&&(f('works')>=2||f('indieGames')>=1),
      creator_indie:v('art')>=65&&(f('works')||f('indieGames')),
      esports_champion:v('gaming')>=85&&f('esportMedals')>=1&&f('teams')>=1&&v('discipline')>=55,
      sports_athlete:v('sport')>=85&&(f('sportMedals')||f('marathons'))&&v('health')>=65,
      volunteer_light:v('service')>=85&&f('charities')>=1&&v('eq')>=60,
      traveler:v('explore')>=85&&s.places.length>=6&&f('expeditions')>=1,
      overseas_scholar:ad?.path==='overseas'&&v('language')>=80,
      craft_master:v('tech')>=85&&v('discipline')>=65&&f('certificates')>=1&&(f('portfolios')||f('patents')),
      bridge_rebirth:f('bridge')>0&&['kaoyan','overseas'].includes(ad?.path),
      allrounder:KEY_SKILLS.filter(k=>v(k)>=55).length>=8&&v('health')>=65&&v('mood')>=65,
      steady_life:v('health')>=70&&v('mood')>=75&&Object.keys(s.counts).length>=18,
      hometown:f('hometowns')&&v('business')>=55&&v('service')>=60,
      social_leader:v('fame')>=80&&v('eq')>=75&&f('festivals'),teacher:v('service')>=70&&v('knowledge')>=65&&count(s,'teach')>=6,
      gapyear:v('explore')>=65&&s.money>=3000&&v('discipline')>=50&&!ad&&!s.jobAccepted&&!s.civilAccepted,
      late_bloom:!grad,reset:(v('health')<25||s.stressMonths>=4),gaming_drift:f('lateNights')>=18,
      ordinary:grad
    };
    const scores=routeScores(s,true);
    for(const r of C.ROUTES.filter(r=>r.proof)){const effort=r.actions.filter(id=>id!=='project').reduce((n,id)=>n+count(s,id),0);
      tests[r.id+'_a']=flag(s,r.proof)>=1&&stat(s,r.skill)>=60&&scores[r.id]>=60&&effort>=6;
      tests[r.id+'_s']=(r.id!=='socialbiz'||s.venture.profitableMonths>=3)&&flag(s,r.proof)>=(r.id.startsWith('shu_')?2:1)&&stat(s,r.skill)>=80&&stat(s,r.secondary)>=50&&scores[r.id]>=80&&effort>=12&&stat(s,'health')>=45;
    }
    let matched=C.ENDINGS.filter(e=>tests[e.id]&&(grad||['late_bloom','reset','gaming_drift'].includes(e.id)));
    const mature=matched.some(e=>['S','A'].includes(e.tier));if(mature)matched=matched.filter(e=>!['reset','gaming_drift','ordinary'].includes(e.id));
    if(matched.length>1)matched=matched.filter(e=>e.id!=='ordinary');return matched;
  }
  function calculateResult(s){
    const scores=routeScores(s,true),groups={};for(const route of C.ROUTES){const candidate={id:route.id,group:route.group,score:scores[route.id]};if(!groups[route.group]||candidate.score>groups[route.group].score)groups[route.group]=candidate;}
    const ranked=Object.values(groups).sort((a,b)=>b.score-a.score);const best=ranked[0],second=ranked[1],third=ranked[2];
    const life=clamp(stat(s,'health')*.40+stat(s,'mood')*.40+(100-stat(s,'stress'))*.20);
    const experience=clamp(Object.keys(s.counts).length/25*65+s.places.length/12*15+Object.values(s.relations).filter(r=>r.known&&r.trust>=35).length/6*20);
    const parts={specialty:Math.round(best.score*70),secondary:Math.round((second.score+third.score)*7.5),life:Math.round(life*10),experience:Math.round(experience*5)};
    let baseScore=Object.values(parts).reduce((a,b)=>a+b,0);
    const graduationPenalty=graduate(s)?0:Math.round(baseScore*.18);baseScore-=graduationPenalty;
    const rankScore=Math.round(baseScore*difficulty(s).multiplier);
    let unlocked=qualifyingEndings(s);const priority={S:30,A:15,B:0,C:-5};
    unlocked=unlocked.sort((a,b)=>((scores[b.route]+priority[b.tier]+(b.route===s.focus?5:0))- (scores[a.route]+priority[a.tier]+(a.route===s.focus?5:0))));
    const primary=unlocked[0]||byId(C.ENDINGS,'late_bloom');
    return {gameId:s.gameId,runId:s.runId,rulesVersion:C.RULES_VERSION,endedAt:new Date().toISOString(),
      month:48,school:s.profile.school,difficulty:s.profile.difficulty,family:s.profile.family,name:s.profile.name,campusMode:s.profile.campusMode,major:s.profile.major,systems:{shuTasks:s.shu.completed.length,shuActivities:s.shu.agenda.length,skills:s.skills.unlocked.length,campusFootprints:s.campus.visited.length,completedCourses:s.curriculum.records.filter(r=>r.completed).length,projectQuality:clone(s.projectQuality),profitableMonths:s.venture.profitableMonths},baseScore,rankScore,multiplier:difficulty(s).multiplier,
      parts,graduationPenalty,graduated:graduate(s),primaryEnding:primary.id,endings:unlocked.map(e=>e.id),routeScores:scores,
      rankedRoutes:ranked,gradeAverage:gradeAverage(s),partner:s.partner?{id:s.partner,name:npcs[s.partner].name,...clone(s.relations[s.partner])}:null,
      admission:clone(s.admission),verified:false,stats:clone(s.stats),flags:clone(s.flags),uniqueActions:Object.keys(s.counts).length,
      places:s.places.length,money:s.money,imported:s.imported};
  }
  function finishMonth(s){
    settleShuTasks(s);
    const before=s.beforeMonth||{stats:clone(s.stats),money:s.money};const delta={};for(const k of Object.keys(C.STATS))delta[k]=round(s.stats[k]-before.stats[k]);
    s.reports.push({month:s.month,plan:clone(s.plan),delta,moneyDelta:s.money-before.money,log:clone(s.monthLog),grade:gradeAverage(s),focus:s.focus});
    delete s.beforeMonth;delete s.monthActivity;delete s.lastProjectLocation;s.phase=s.month===48?'ended':'report';s.revision++;if(s.month===48)s.result=calculateResult(s);
  }
  function nextMonth(s){if(s.phase!=='report')return {...FAIL,reason:'请先完成本月事件'};if(s.month>=48)return {...FAIL,reason:'本局已结束'};s.month++;afterNextMonthV2(s);s.phase='planning';s.plan=[];s.monthLog=[];s.history.push({type:'next',month:s.month});s.revision++;return {ok:true};}
  function dateInfo(s){const month=((s.month+7)%12)+1;return {year:Math.floor((s.month-1)/12)+1,month,label:`${['大一','大二','大三','大四'][Math.floor((s.month-1)/12)]} · ${month}月`,season:[12,1,2].includes(month)?'winter':[3,4,5].includes(month)?'spring':[6,7,8].includes(month)?'summer':'autumn'};}
  function validateSave(input){
    if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('不是有效的存档对象');
    if(input.schemaVersion!==C.SCHEMA_VERSION||input.rulesVersion!==C.RULES_VERSION)throw new Error('存档版本不匹配；请使用对应版本游戏');
    if(input.gameId!=='unwritten-years')throw new Error('不是本游戏的存档');
    if(!Number.isInteger(input.month)||input.month<1||input.month>48)throw new Error('月份不合法');
    if(!['planning','events','report','ended'].includes(input.phase))throw new Error('存档阶段不合法');
    if(!byId(C.SCHOOLS,input.profile?.school)||!byId(C.FAMILIES,input.profile?.family)||typeof input.profile.name!=='string'||input.profile.name.length>16)throw new Error('人物信息不合法');
    if(!['female','male','other'].includes(input.profile.gender)||!['women','men','all','none'].includes(input.profile.romance))throw new Error('人物偏好不合法');
    if(!Array.isArray(input.profile.talents)||input.profile.talents.length>2||new Set(input.profile.talents).size!==input.profile.talents.length||input.profile.talents.some(x=>!byId(C.TALENTS,x)))throw new Error('天赋信息不合法');
    for(const k of Object.keys(C.STATS))if(!Number.isFinite(input.stats?.[k])||input.stats[k]<0||input.stats[k]>100)throw new Error(`属性不合法：${k}`);
    for(const k of ['money','earned','spent','failedCourses','revision','recoveryMonths','stressMonths'])if(!Number.isFinite(input[k])||input[k]<0||input[k]>1e9)throw new Error(`数值不合法：${k}`);
    if(!Number.isInteger(input.rng)||input.rng<1||input.rng>4294967295)throw new Error('随机种子状态不合法');
    if(typeof input.runId!=='string'||!/^[-A-Za-z0-9_]{1,100}$/.test(input.runId)||typeof input.seed!=='string'||input.seed.length>100)throw new Error('存档标识不合法');
    if(!byId(C.ROUTES,input.focus))throw new Error('方向不合法');
    if(!Array.isArray(input.plan)||input.plan.length>4||input.plan.some(x=>!actions[x.id]||(x.target&&!npcs[x.target])))throw new Error('行动计划不合法');
    for(const k of ['grades','reports','history','pending','places','memories','achievements'])if(!Array.isArray(input[k])||input[k].length>3000)throw new Error(`记录不合法：${k}`);
    if(input.pending.length>12)throw new Error('待处理事件过多');
    for(const k of ['flags','counts','cooldowns','projectProgress','projectStarts','projectCompletions','relations','eventSeen','eventCounts','applications','offers'])if(!input[k]||typeof input[k]!=='object'||Array.isArray(input[k]))throw new Error(`字段不合法：${k}`);
    for(const k of ['flags','counts','cooldowns','projectProgress','projectCompletions','eventSeen','eventCounts'])for(const v of Object.values(input[k]))if(!Number.isFinite(v)||v<0||v>10000)throw new Error(`记录数值不合法：${k}`);
    for(const n of C.NPCS){const r=input.relations[n.id];if(!r||typeof r.known!=='boolean')throw new Error('角色记录不完整');for(const k of ['affection','trust'])if(!Number.isFinite(r[k])||r[k]<0||r[k]>100)throw new Error('关系数值不合法');for(const k of ['months','memories','chapter','lastContact','lastArc','lastConfess','rejectedUntil'])if(!Number.isFinite(r[k])||r[k]<-100||r[k]>200)throw new Error('关系时间不合法');if(r.chapter>3)throw new Error('角色章节不合法');}
    if(input.partner!==null&&!npcs[input.partner])throw new Error('伴侣记录不合法');
    if(input.activeProject!==null&&!projects[input.activeProject])throw new Error('项目记录不合法');
    if(input.phase==='events'&&!input.pending.length)throw new Error('事件存档缺少事件');
    if(input.phase==='ended'&&input.month!==48)throw new Error('毕业月份不合法');
    for(const q of input.pending){if(q.kind==='event'){if(!events[q.id])throw new Error('未知事件');}else if(q.kind==='dynamic'){if(!q.event||typeof q.event.id!=='string'||typeof q.event.title!=='string'||typeof q.event.text!=='string'||!Array.isArray(q.event.options)||q.event.options.length>8||q.event.options.length<1)throw new Error('动态事件不完整');for(const o of q.event.options){if(typeof o.label!=='string')throw new Error('事件选项不合法');}}else throw new Error('事件类别不合法');}
    if(input.history.length>1200||input.reports.length>48)throw new Error('历史记录过长');
    validateV2(input);validateShu(input);
    return true;
  }
  function restore(input,{imported=false}={}){validateSave(input);const s=clone(input);s.imported=s.imported||imported;if(s.phase==='ended')s.result=calculateResult(s);return s;}
  function replay(history){
    if(!Array.isArray(history)||history[0]?.type!=='start')throw new Error('回放缺少开局记录');
    const s=createGame(history[0].options);
    for(const step of history.slice(1)){
      let result={ok:true};
      if(step.type==='project')result=chooseProject(s,step.id);
      else if(step.type==='focus')result=changeFocus(s,step.id);
      else if(step.type==='skill-unlock')result=unlockSkill(s,step.id);
      else if(step.type==='skill-equip')result=equipSkill(s,step.id);
      else if(step.type==='club')result=joinClub(s,step.id);
      else if(step.type==='course')result=selectCourse(s,step.id);
      else if(step.type==='collaborator')result=setCollaborator(s,step.id);
      else if(step.type==='dorm')result=setDormPact(s,step.id);
      else if(step.type==='venture')result=setVentureMode(s,step.id);
      else if(step.type==='month'){s.plan=[];for(const a of step.plan){result=queueAction(s,a.id,a.target);if(!result.ok)throw new Error(`回放行动错误：${result.reason}`);}result=resolveMonth(s);}
      else if(step.type==='choice'){if(currentEvent(s)?.id!==step.eventId)throw new Error('回放事件顺序不一致');result=chooseOption(s,step.index);}
      else if(step.type==='next')result=nextMonth(s);
      else throw new Error('未知回放步骤');
      if(!result.ok)throw new Error(`回放失败：${result.reason}`);
    }
    return s;
  }
  // v2 systems: all changes go through deterministic, replayable choices.
  const skillIndex=index(C.SKILL_NODES), clubIndex=index(C.CLUBS), courseIndex=index(C.COURSES), locationIndex=index(C.LOCATIONS);
  function initialiseV2(s,options){
    s.profile.campusMode='shu';
    s.shu={completed:[],agenda:[],locationCounts:{}};
    s.profile.homeCampus=byId(C.HOME_CAMPUSES,options.homeCampus)?options.homeCampus:'baoshan';
    s.profile.major=byId(C.MAJORS,options.major)?options.major:'general';
    for(const k of Object.keys(C.STATS))if(!Number.isFinite(s.stats[k]))s.stats[k]=8;
    applyStats(s,byId(C.MAJORS,s.profile.major).stats||byId(C.MAJORS,s.profile.major).bonus||{});
    s.skills={points:2,earned:2,unlocked:[],equipped:[]};
    s.campus={visited:[],crossings:0};
    s.curriculum={active:null,progress:0,periodKey:academicPeriod(s).key,selected:false,records:[]};
    s.club={id:null,memberships:{},lastChanged:-99};
    s.dorm={pact:'balanced',harmony:65,lastChanged:-99};
    s.collaborator=null;s.projectQuality={};s.completedProjects=[];
    s.venture={mode:'off',customers:0,satisfaction:60,lastModeMonth:-99,revenue:0,cost:0,net:0,profitableMonths:0,totalRevenue:0,records:[]};
  }
  function academicPeriod(s){
    const m=(s.month-1)%12+1,year=Math.floor((s.month-1)/12)+1;
    const part=m<=5?'autumn':m<=10?'spring':'summer';
    return {part,year,key:`${year}-${part}`,name:part==='autumn'?'秋季学期':part==='spring'?'春季学期':'夏季实践',
      end:m===5||m===10||m===12,grade:m===5||m===10,summer:part==='summer'};
  }
  function recordChoice(s,type,id){s.history.push({type,month:s.month,id});s.revision++;return {ok:true};}
  function planningCheck(s){return s.phase==='planning'?'':'请先完成本月事件与报告';}
  function skillReason(s,id){const n=skillIndex[id];if(!n)return '技能不存在';if(s.skills.unlocked.includes(id))return '已经掌握';
    if(s.skills.points<n.cost)return `需要${n.cost}个技能点`;
    if(n.prerequisite&&!s.skills.unlocked.includes(n.prerequisite))return '先掌握本分支的基础技能';
    if(n.parent&&!s.skills.unlocked.includes(n.parent))return '先掌握本分支的基础技能';
    if(stat(s,n.stat)<n.req)return `${C.STATS[n.stat][0]}需达到${n.req}`;return '';}
  function unlockSkill(s,id){const reason=planningCheck(s)||skillReason(s,id);if(reason)return {...FAIL,reason};const n=skillIndex[id];s.skills.points-=n.cost;s.skills.unlocked.push(id);return recordChoice(s,'skill-unlock',id);}
  function equipSkill(s,id){const reason=planningCheck(s);if(reason)return {...FAIL,reason};if(!s.skills.unlocked.includes(id))return {...FAIL,reason:'先掌握这项技能'};
    const at=s.skills.equipped.indexOf(id);if(at>=0)s.skills.equipped.splice(at,1);
    else{if(s.skills.equipped.length>=3)return {...FAIL,reason:'只有3个技能槽，请先卸下一个技能'};s.skills.equipped.push(id);}return recordChoice(s,'skill-equip',id);}
  function joinClub(s,id){const reason=planningCheck(s);if(reason)return {...FAIL,reason};if(id!=='none'&&!clubIndex[id])return {...FAIL,reason:'社团不存在'};
    if(s.club.id===(id==='none'?null:id))return {...FAIL,reason:'当前已经加入该社团'};
    if(s.month-s.club.lastChanged<3)return {...FAIL,reason:'加入后至少投入3个月，再决定是否转换社团'};
    s.club.id=id==='none'?null:id;s.club.lastChanged=s.month;
    if(s.club.id&&!s.club.memberships[id])s.club.memberships[id]={contribution:0,level:0};return recordChoice(s,'club',id);}
  function selectCourse(s,id){const reason=planningCheck(s);if(reason)return {...FAIL,reason};if(!courseIndex[id])return {...FAIL,reason:'课程不存在'};
    if(academicPeriod(s).summer)return {...FAIL,reason:'夏季以实践为主，下一个长学期再选课'};
    if(s.curriculum.selected)return {...FAIL,reason:'本学期已确认课程，不可反复选课刷奖励'};
    s.curriculum.active=id;s.curriculum.progress=0;s.curriculum.selected=true;return recordChoice(s,'course',id);}
  function setCollaborator(s,id){const reason=planningCheck(s);if(reason)return {...FAIL,reason};
    if(id!=='none'&&(!s.relations[id]?.known||s.relations[id].trust<20))return {...FAIL,reason:'先认识对方，并积累20点信任'};
    s.collaborator=id==='none'?null:id;return recordChoice(s,'collaborator',id);}
  function setDormPact(s,id){const reason=planningCheck(s);if(reason)return {...FAIL,reason};if(!['balanced','quiet','creative'].includes(id))return {...FAIL,reason:'约定不存在'};
    if(s.dorm.pact===id)return {...FAIL,reason:'当前已经采用这份约定'};
    if(s.month===s.dorm.lastChanged)return {...FAIL,reason:'本月已经协商过，下一月再调整'};
    s.dorm.pact=id;s.dorm.lastChanged=s.month;return recordChoice(s,'dorm',id);}
  function setVentureMode(s,id){const reason=planningCheck(s);if(reason)return {...FAIL,reason};if(!['off','lean','growth'].includes(id))return {...FAIL,reason:'经营方式不存在'};
    if(s.venture.mode===id)return {...FAIL,reason:'已经采用该经营方式'};
    if(s.venture.lastModeMonth===s.month)return {...FAIL,reason:'本月经营方式已确认，下月可以再调整'};
    if(id!=='off'&&(!(flag(s,'products')||flag(s,'socialVentures'))||stat(s,'business')<30))return {...FAIL,reason:'需要完成产品或社会企业项目，经营达到30'};
    s.venture.mode=id;s.venture.lastModeMonth=s.month;return recordChoice(s,'venture',id);}
  function effectiveAction(s,a){if(a.id!=='project')return a;if(!s.activeProject)return s.lastProjectLocation?{...a,location:s.lastProjectLocation}:a;const p=projects[s.activeProject];return {...a,location:p.location||a.location,tags:[...new Set([...a.tags,...(p.tags||[])])]};}
  function v2Growth(s,a){
    let bonus=0;const branches={};
    for(const id of s.skills.equipped){const n=skillIndex[id];if(n.tags.some(t=>a.tags.includes(t)))branches[n.branch]=Math.max(branches[n.branch]||0,n.boost);}
    bonus+=Math.min(.44,Object.values(branches).reduce((x,y)=>x+y,0));
    const cl=clubIndex[s.club.id],membership=s.club.memberships[s.club.id];if(cl&&cl.tags.some(t=>a.tags.includes(t)))bonus+=(membership?.level||0)*.03;
    if(s.dorm.harmony>=45&&((s.dorm.pact==='quiet'&&a.tags.includes('study'))||(s.dorm.pact==='creative'&&a.tags.some(t=>['film','stage','design','art','humanity'].includes(t)))))bonus+=.05;
    if(academicPeriod(s).summer&&(a.summer||a.id==='project'||a.tags.includes('practice')))bonus+=.15;
    const month=dateInfo(s).month;if((a.id==='jufestival'&&[10,11].includes(month))||(a.id==='springconcert'&&[3,4].includes(month)))bonus+=.20;
    return 1+bonus;
  }
  function planPreview(s,plan=s.plan){return travelSummary(s,plan.map(item=>actions[item.id]&&effectiveAction(s,actions[item.id]).location).filter(Boolean));}
  function travelSummary(s,stops){let previous=s.profile.homeCampus,crossings=0;
    for(const id of stops){const loc=locationIndex[id];if(!loc)continue;if(loc.campus!==previous){crossings++;previous=loc.campus;}}
    // Abstract travel burden, not real campus travel time or fares.
    const stress=round(Math.min(6,crossings*1.5)*(1-stat(s,'planning')/180));return {crossings,stress,stops};
  }
  function actionPreview(s,id){const base=actions[id];if(!base)return {};const a=effectiveAction(s,base);const m=growthMultiplier(s,a,s.plan.some(x=>x.id===id));const effects={};
    for(const[k,v]of Object.entries(a.stats))effects[k]=round(v>0&&!['health','mood','stress'].includes(k)?v*m*(stat(s,k)>=90?.55:stat(s,k)>=70?.8:1):v);
    return {effects,multiplier:round(m),location:locationIndex[a.location]||null};}
  function projectTeamBonus(s,p){let bonus=academicPeriod(s).summer?.1:0;if(s.collaborator){const n=npcs[s.collaborator],r=s.relations[n.id];if(r.known&&r.trust>=20)bonus+=.12+r.trust*.0012+(Object.hasOwn(p.reward,n.affinity)? .10:0);}return bonus;}
  function projectCompletedV2(s,p){
    const keys=p.domains||Object.keys(p.req||{});const ability=keys.length?mean(keys.map(k=>stat(s,k))):mean([stat(s,'knowledge'),stat(s,'discipline')]);
    const r=s.collaborator?s.relations[s.collaborator]:null;
    const quality=round(clamp(25+ability*.5+stat(s,'planning')*.12+stat(s,'teamwork')*.08+(r&&r.trust>=20?8:0),25,100));
    s.projectQuality[p.id]=Math.max(s.projectQuality[p.id]||0,quality);s.completedProjects.push({id:p.id,month:s.month,quality,collaborator:s.collaborator});
    if(r&&r.trust>=20){r.trust=round(clamp(r.trust+4));r.affection=round(clamp(r.affection+2));r.lastContact=s.month;r.memories++;}
    const aliases={shucollab:'portfolios',shumemory:'works',shuexhibit:'works',shugreen:'works',shustage:'works',shuservice:'products',shuyearbook:'works',materialpaper:'papers',film:'works',play:'works',investigation:'works',archive:'works',socialbiz:'products',datatool:'portfolios',robot:'portfolios',accessdesign:'portfolios',foodbook:'works'};
    if(aliases[p.id])increase(s,aliases[p.id]);
    log(s,`成果质量 ${quality}/100${s.collaborator?' · 与'+npcs[s.collaborator].name+'合作完成':''}。质量会影响新方向评分。`,'project');
  }
  function actionCompletedV2(s,a){
    const loc=locationIndex[a.location];if(loc)s.shu.locationCounts[loc.id]=(s.shu.locationCounts[loc.id]||0)+1;if(loc&&!s.campus.visited.includes(loc.id)){s.campus.visited.push(loc.id);log(s,`校园足迹：${loc.name}。`,'achievement');}
    const cr=courseIndex[s.curriculum.active];if(cr&&cr.tags.some(t=>a.tags.includes(t)))s.curriculum.progress=Math.min(cr.need||4,s.curriculum.progress+1);
    const cl=clubIndex[s.club.id];if(cl&&(['club','cluboffice'].includes(a.id)||cl.tags.some(t=>a.tags.includes(t)))){const mem=s.club.memberships[cl.id];mem.contribution+=a.id==='cluboffice'?2:1;const level=mem.contribution>=30?3:mem.contribution>=16?2:mem.contribution>=6?1:0;if(level>mem.level){mem.level=level;applyStats(s,{[cl.stat]:3,leadership:2});log(s,`${cl.name}：贡献等级提升至${level}，相关行动增益${level*3}%。`,'achievement');}}
    if(a.id==='nightgame')s.dorm.harmony=clamp(s.dorm.harmony-8);
    if(a.id==='roommeeting')s.dorm.harmony=clamp(s.dorm.harmony+12);
    if(['rest','cook','home','repairtalk'].includes(a.id))s.dorm.harmony=clamp(s.dorm.harmony+3);
    if(a.id==='partnerproject'&&s.plan){/* The concrete target was handled by relationAction; no extra phantom NPC. */}
  }
  function ventureForecast(s){const active=s.venture.mode!=='off';return {active,cost:active?(s.venture.mode==='growth'?900:300):0,reserve:800,eligible:(flag(s,'products')>0||flag(s,'socialVentures')>0)&&stat(s,'business')>=30};}
  function ventureMonth(s){const v=s.venture;if(v.mode==='off'){v.revenue=0;v.cost=0;v.net=0;return;}
    const cost=ventureForecast(s).cost;if(s.money<cost+800){v.mode='off';v.revenue=0;v.cost=0;v.net=0;log(s,'现金流保护：扣除运营费后不足¥800生活储备，已暂停经营；不会自动借款。','warning');return;}
    const attention=(s.monthActivity||[]).filter(a=>a.tags.includes('business')).length;
    v.satisfaction=round(clamp(v.satisfaction+(attention?attention*2: -5)+(stat(s,'finance')-50)*.015,10,100));
    const acquisition=attention*(v.mode==='growth'?8:4)*(0.7+stat(s,'business')/100);v.customers=round(clamp(v.customers*.90+acquisition,0,250));
    const market=roll(s,.82,1.18);const revenue=Math.round(v.customers*(6+stat(s,'negotiation')*.08)*v.satisfaction/100*market);
    pay(s,cost);earn(s,revenue);v.cost=cost;v.revenue=revenue;v.net=revenue-cost;v.totalRevenue+=revenue;if(v.net>0)v.profitableMonths++;
    v.records.push({month:s.month,mode:v.mode,customers:v.customers,revenue,cost,net:v.net,satisfaction:v.satisfaction});
    log(s,`经营月报：收入¥${revenue} − 运营¥${cost} = ${v.net>=0?'+':''}¥${v.net}；留存客户${v.customers}。`,'money');
  }
  function maintainV2(s){
    const pp=travelSummary(s,(s.monthActivity||[]).map(a=>a.location));s.campus.crossings+=pp.crossings;if(pp.crossings){applyStats(s,{stress:pp.stress});log(s,`本月跨生活圈${pp.crossings}次，通勤压力 +${pp.stress}；调整行动顺序可减少来回。`,'normal');}
    s.dorm.harmony=round(clamp(s.dorm.harmony-(stat(s,'stress')>80?2: .3)));if(s.dorm.harmony>=75)applyStats(s,{stress:-2,mood:1});else if(s.dorm.harmony<30){applyStats(s,{stress:3,mood:-2});log(s,'宿舍氛围紧张：可以安排室友沟通，重新协商作息。','warning');}
    if(s.month%3===0){s.skills.points++;s.skills.earned++;log(s,'阶段复盘：获得1个技能点，可在技能树中学习。','achievement');}
    const period=academicPeriod(s);if(period.end){const cr=courseIndex[s.curriculum.active];if(cr){const completed=s.curriculum.progress>=(cr.need||4);s.curriculum.records.push({id:cr.id,period:period.key,month:s.month,completed,progress:s.curriculum.progress});if(completed){applyStats(s,cr.reward);log(s,`修完「${cr.name}」：专题能力已计入属性。`,'academic');}else log(s,`「${cr.name}」实践不足：未领取专题奖励，不额外制造挂科。`,'academic');}}
    ventureMonth(s);
    s.recovery=stat(s,'health')<22||stat(s,'stress')>=96;
  }
  function afterNextMonthV2(s){const key=academicPeriod(s).key;if(s.curriculum.periodKey!==key){s.curriculum.active=null;s.curriculum.progress=0;s.curriculum.selected=false;s.curriculum.periodKey=key;}}
  function newRouteScore(s,r){const proof=flag(s,r.proof);let score=stat(s,r.skill)*.62+stat(s,r.secondary)*.23+stat(s,'planning')*.08+stat(s,'teamwork')*.07;
    if(!proof)return Math.min(score,55);
    const relevant=C.PROJECTS.filter(p=>p.flag===r.proof);const quality=Math.max(0,...relevant.map(p=>s.projectQuality[p.id]||0));
    score+=Math.min(8,proof*4)+quality*.08;return clamp(score);
  }
  function validateV2(s){
    if(!byId(C.CAMPUS_PROFILES,s.profile.campusMode)||!byId(C.HOME_CAMPUSES,s.profile.homeCampus)||!byId(C.MAJORS,s.profile.major))throw new Error('校园设定不合法');
    const sk=s.skills;if(!sk||!Number.isInteger(sk.points)||sk.points<0||sk.points>18||!Number.isInteger(sk.earned)||sk.earned<2||sk.earned>18||!Array.isArray(sk.unlocked)||!Array.isArray(sk.equipped)||sk.equipped.length>3)throw new Error('技能点或技能槽不合法');
    if(new Set(sk.unlocked).size!==sk.unlocked.length||new Set(sk.equipped).size!==sk.equipped.length||sk.unlocked.some(id=>!skillIndex[id])||sk.equipped.some(id=>!sk.unlocked.includes(id)))throw new Error('技能记录不合法');
    const used=sk.unlocked.reduce((n,id)=>n+skillIndex[id].cost,0);if(used+sk.points!==sk.earned)throw new Error('技能点总账不一致');
    for(const id of sk.unlocked){const n=skillIndex[id];if((n.prerequisite&&!sk.unlocked.includes(n.prerequisite))||(n.parent&&!sk.unlocked.includes(n.parent)))throw new Error('技能前置缺失');}
    if(!s.campus||!Array.isArray(s.campus.visited)||new Set(s.campus.visited).size!==s.campus.visited.length||s.campus.visited.some(id=>!locationIndex[id])||!Number.isFinite(s.campus.crossings)||s.campus.crossings<0)throw new Error('校园足迹不合法');
    if(!s.curriculum||!Array.isArray(s.curriculum.records)||s.curriculum.records.length>8||(s.curriculum.active&&!courseIndex[s.curriculum.active])||!Number.isFinite(s.curriculum.progress)||s.curriculum.progress<0||s.curriculum.progress>4)throw new Error('课程记录不合法');
    if(!s.club||!s.club.memberships||(s.club.id&&!clubIndex[s.club.id]))throw new Error('社团记录不合法');for(const[id,m]of Object.entries(s.club.memberships)){if(!clubIndex[id]||!Number.isFinite(m.contribution)||m.contribution<0||m.contribution>400||![0,1,2,3].includes(m.level))throw new Error('社团贡献不合法');}
    if(!s.dorm||!['balanced','quiet','creative'].includes(s.dorm.pact)||!Number.isFinite(s.dorm.harmony)||s.dorm.harmony<0||s.dorm.harmony>100)throw new Error('宿舍状态不合法');
    if(s.collaborator!==null&&!npcs[s.collaborator])throw new Error('合作伙伴不合法');if(!s.projectQuality||!Array.isArray(s.completedProjects)||s.completedProjects.length>100)throw new Error('成果质量记录不合法');for(const[id,v]of Object.entries(s.projectQuality))if(!projects[id]||!Number.isFinite(v)||v<0||v>100)throw new Error('成果质量不合法');
    if(!s.venture||!['off','lean','growth'].includes(s.venture.mode)||!Array.isArray(s.venture.records)||s.venture.records.length>48)throw new Error('经营记录不合法');for(const k of ['customers','satisfaction','revenue','cost','net','profitableMonths','totalRevenue'])if(!Number.isFinite(s.venture[k])||Math.abs(s.venture[k])>1e8)throw new Error('经营数值不合法');
    const uniquePeriods=new Set();for(const r of s.curriculum.records){if(!r||!courseIndex[r.id]||typeof r.period!=='string'||uniquePeriods.has(r.period)||typeof r.completed!=='boolean'||!Number.isInteger(r.month)||r.month<1||r.month>48||!Number.isInteger(r.progress)||r.progress<0||r.progress>4)throw new Error('专题结课记录不合法');uniquePeriods.add(r.period);}
    for(const r of s.completedProjects)if(!r||!projects[r.id]||!Number.isInteger(r.month)||r.month<1||r.month>48||!Number.isFinite(r.quality)||r.quality<0||r.quality>100||(r.collaborator!==null&&!npcs[r.collaborator]))throw new Error('项目成果条目不合法');
    let total=0,profits=0,lastMonth=0;for(const r of s.venture.records){if(!r||!['lean','growth'].includes(r.mode)||!Number.isInteger(r.month)||r.month<=lastMonth||r.month>48||!Number.isFinite(r.customers)||r.customers<0||r.customers>250||!Number.isInteger(r.revenue)||r.revenue<0||![300,900].includes(r.cost)||r.cost!==(r.mode==='lean'?300:900)||r.net!==r.revenue-r.cost||!Number.isFinite(r.satisfaction)||r.satisfaction<10||r.satisfaction>100)throw new Error('经营月报条目不合法');lastMonth=r.month;total+=r.revenue;if(r.net>0)profits++;}
    if(s.venture.totalRevenue!==total||s.venture.profitableMonths!==profits||s.venture.satisfaction<10||s.venture.satisfaction>100||s.venture.customers<0||s.venture.customers>250)throw new Error('经营总账不一致');

  }


  // SHU chapter evidence is accumulated by real actions, not switches or map clicks.
  function shuGoalValue(s,g){
    if(g.kind==='counts')return (g.ids||[]).reduce((n,id)=>n+count(s,id),0);
    if(g.kind==='visited')return s.campus.visited.length;
    if(g.kind==='courses')return s.curriculum.records.filter(r=>r.completed).length;
    if(g.kind==='friends')return Object.values(s.relations).filter(r=>r.known&&r.trust>=20).length;
    if(g.kind==='trusted')return Object.values(s.relations).filter(r=>r.known&&r.trust>=45).length;
    if(g.kind==='collabProjects')return s.completedProjects.filter(p=>p.collaborator).length;
    if(g.kind==='projects')return s.completedProjects.length;
    if(g.kind==='skills')return s.skills.unlocked.length;
    if(g.kind==='quality')return Math.max(0,...Object.values(s.projectQuality));
    if(g.kind==='flag')return flag(s,g.id);
    if(g.kind==='health')return stat(s,'health');
    if(g.kind==='areas')return new Set(s.campus.visited.map(id=>locationIndex[id].campus).filter(id=>id!=='city')).size;
    return 0;
  }
  function campusTaskStatus(s){return C.SHU_TASKS.map(t=>{
    const record=s.shu.completed.find(r=>r.id===t.id),unlocked=s.month>=(t.chapter-1)*12+1;
    const goals=t.goals.map(g=>({...clone(g),value:round(shuGoalValue(s,g))}));
    return {...clone(t),unlocked,completed:!!record,completedMonth:record?.month||null,goals,
      progress:round(goals.reduce((n,g)=>n+Math.min(1,g.value/g.target),0)/goals.length*100),
      ready:unlocked&&!record&&goals.every(g=>g.value>=g.target)};
  });}
  function settleShuTasks(s){for(const t of campusTaskStatus(s))if(t.ready){
    s.shu.completed.push({id:t.id,month:s.month});applyStats(s,t.reward);if(t.money)earn(s,t.money);
    log(s,`上大手帐：完成「${t.name}」${t.money?'，获得¥'+t.money+'游戏内支持':''}。`,'achievement');
    s.memories.push({month:s.month,title:'上大篇章 · '+t.name,text:t.text});
  }}
  function campusAgenda(s){const date=dateInfo(s),a=C.SHU_AGENDA.find(x=>x.month===date.month);
    return {...clone(a),year:date.year,participated:s.shu.agenda.some(x=>x.year===date.year&&x.id===a.id),
      planned:s.plan.some(x=>a.actions.includes(x.id)),possibleActions:a.actions.map(id=>({id,name:actions[id].name}))};
  }
  function queueShuAgenda(s){const a=campusAgenda(s);if(a.participated||!(s.monthActivity||[]).some(x=>a.actions.includes(x.id)))return;
    s.shu.agenda.push({id:a.id,eventId:a.eventId,year:a.year,month:s.month,choice:null});
    s.pending.push({kind:'event',id:a.eventId});
  }
  function validateShu(s){
    if(s.profile.school!=='shu'||s.profile.campusMode!=='shu'||!byId(C.DIFFICULTIES,s.profile.difficulty))throw new Error('本版本仅包含上海大学；挑战设定无效');
    const x=s.shu;if(!x||!Array.isArray(x.completed)||x.completed.length>C.SHU_TASKS.length||!Array.isArray(x.agenda)||x.agenda.length>48||!x.locationCounts||Array.isArray(x.locationCounts))throw new Error('上大篇章记录不完整');
    const ids=new Set();for(const r of x.completed){const t=byId(C.SHU_TASKS,r?.id);if(!t||ids.has(r.id)||!Number.isInteger(r.month)||r.month<(t.chapter-1)*12+1||r.month>s.month)throw new Error('篇章奖励记录无效');ids.add(r.id);}
    const periods=new Set();for(const r of x.agenda){const a=byId(C.SHU_AGENDA,r?.id);if(!a||r.eventId!==a.eventId||!Number.isInteger(r.month)||r.month<1||r.month>s.month||r.year!==Math.floor((r.month-1)/12)+1||((r.month+7)%12)+1!==a.month||periods.has(r.month)||(r.choice!==null&&(!Number.isInteger(r.choice)||r.choice<0||r.choice>2)))throw new Error('校园活动记录无效');periods.add(r.month);
      if(r.choice===null&&!(s.phase==='events'&&s.pending.some(q=>q.id===r.eventId)))throw new Error('活动尚未选择但缺失待处理事件');
    }
    for(const[id,n]of Object.entries(x.locationCounts))if(!locationIndex[id]||!Number.isInteger(n)||n<1||n>192||!s.campus.visited.includes(id))throw new Error('行动地点记录无效');
    if(s.campus.visited.some(id=>!x.locationCounts[id]))throw new Error('校园足迹缺少实际行动记录');
    const actionTotal=Object.values(s.counts).reduce((n,v)=>n+v,0),locationTotal=Object.values(x.locationCounts).reduce((n,v)=>n+v,0);
    if(locationTotal!==actionTotal)throw new Error('校园行动总账不一致');
  }

  return {difficulty,campusTaskStatus,campusAgenda,academicPeriod,skillReason,unlockSkill,equipSkill,joinClub,selectCourse,setCollaborator,setDormPact,setVentureMode,planPreview,actionPreview,ventureForecast,
    createGame,queueAction,removeAction,moveAction,chooseProject,changeFocus,resolveMonth,chooseOption,nextMonth,
    currentEvent,optionReason,actionReason,projectReason,availableMoney,romanceAllowed,confessionChance,
    gradeAverage,examReadiness,recommendationReason,routeScores,qualifyingEndings,calculateResult,graduate,
    validateSave,restore,replay,dateInfo,hash,clone,clamp,actions,projects,npcs,KEY_SKILLS};
});
