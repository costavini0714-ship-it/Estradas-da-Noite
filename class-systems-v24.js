/* Oito Entradas v24.0 — ecossistema, agropecuária, campo, cozinha e procedimentos.
   Extensão aditiva: preserva as APIs e os atributos das versões anteriores. */
(()=>{
'use strict';
if(window.__OITO_V24_INSTALLED__)return;
const API=window.__OITO_V19,bridge=window.__OITO_V23_BRIDGE__;
if(!API||!bridge){console.error('[v24] APIs principais indisponíveis.');return;}
window.__OITO_V24_INSTALLED__=true;
const $=id=>document.getElementById(id),state=()=>bridge.getState();
const profile=()=>API.profile?.()||{selected:'survivor'};
const role=()=>String(profile().selected||state()?.player?.classId||'survivor');
const upgradeLevel=()=>clamp(Number(API.getClassUpgradeLevel?.(role()))||0,0,3);
const say=m=>bridge.getFn('say')?.(m);
const save=()=>{bridge.getFn('updateUI')?.();bridge.getFn('saveGame')?.(false);};
const now=()=>Date.now();
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const species=[
 ['Veado-catingueiro','🦌','herbivore',1.1,'folhas'],['Veado-mateiro','🦌','herbivore',1.2,'folhas'],['Anta','🐾','herbivore',.65,'frutas'],['Capivara','🦫','herbivore',1.0,'folhas'],['Tamanduá-bandeira','🐾','shy',.7,'insetos'],['Tamanduá-mirim','🐾','shy',1.1,'insetos'],['Lobo-guará','🐺','shy',1.3,'frutas'],['Raposa-do-campo','🦊','shy',1.5,'frutas'],['Quati','🦝','social',1.2,'frutas'],['Tatu-galinha','🐾','shy',.8,'insetos'],['Paca','🐾','herbivore',.9,'frutas'],['Cutia','🐿️','herbivore',1.6,'frutas'],['Ouriço-cacheiro','🦔','shy',.6,'frutas'],['Gambá','🐾','shy',1.0,'frutas'],['Sagui','🐒','social',1.7,'frutas'],['Bugio','🐒','social',1.0,'folhas'],['Macaco-prego','🐒','social',1.5,'frutas'],['Preguiça','🦥','herbivore',.35,'folhas'],['Esquilo','🐿️','shy',1.8,'frutas'],['Jaguatirica','🐆','predator',1.6,'carne'],['Onça-parda','🐆','predator',1.3,'carne'],['Gato-do-mato','🐈','predator',1.7,'carne'],['Queixada','🐗','herbivore',1.1,'frutas'],['Cateto','🐗','herbivore',1.2,'frutas'],['Cavalo selvagem','🐎','herbivore',1.8,'folhas'],['Burro selvagem','🫏','herbivore',1.3,'folhas'],['Coelho-do-mato','🐇','herbivore',2.0,'folhas'],['Cachorro-do-mato','🐕','social',1.5,'frutas'],['Cervo-do-pantanal','🦌','herbivore',1.0,'folhas'],['Arara-vermelha','🦜','bird',2.2,'frutas'],['Tucano','🦜','bird',1.7,'frutas'],['Papagaio-verdadeiro','🦜','bird',1.9,'frutas'],['Coruja-buraqueira','🦉','bird',1.4,'insetos'],['Gavião-carijó','🦅','bird',2.3,'carne'],['Seriema','🐦','bird',1.5,'insetos'],['Pica-pau','🐦','bird',1.8,'insetos'],['Sabiá-laranjeira','🐦','bird',1.9,'frutas'],['Beija-flor','🐦','bird',2.7,'néctar'],['Pato-do-mato','🦆','bird',1.2,'sementes'],['Ganso-selvagem','🪿','bird',1.1,'folhas'],['Garça-branca','🪶','bird',1.3,'peixes'],['Martim-pescador','🐦','bird',2.1,'peixes'],['Sapo-cururu','🐸','amphibian',.8,'insetos'],['Perereca-verde','🐸','amphibian',1.4,'insetos'],['Jabuti-piranga','🐢','reptile',.4,'folhas'],['Cágado','🐢','reptile',.7,'peixes'],['Teiú','🦎','reptile',1.2,'insetos'],['Iguana-verde','🦎','reptile',1.0,'folhas'],['Jiboia','🐍','reptile',.8,'roedores'],['Cobra-coral','🐍','reptile',1.0,'roedores'],['Cascavel','🐍','reptile',.9,'roedores'],['Lagartixa','🦎','reptile',2.0,'insetos'],['Borboleta-azul','🦋','insect',2.8,'néctar'],['Abelha-jataí','🐝','insect',2.4,'néctar'],['Formiga-saúva','🐜','insect',1.4,'folhas'],['Louva-a-deus','🦗','insect',1.3,'insetos'],['Libélula','🪰','insect',2.8,'insetos'],['Grilo-do-campo','🦗','insect',2.1,'folhas'],['Cigarra','🪲','insect',1.8,'seiva'],['Lontra-neotropical','🦦','aquatic',1.8,'peixes'],['Ariranha','🦦','aquatic',1.9,'peixes']
].map((v,i)=>({id:'fauna_'+i,name:v[0],icon:v[1],kind:v[2],speed:v[3],food:v[4],mountable:v[0].includes('Cavalo')||v[0].includes('Burro'),tameChance:(v[2]==='predator'||v[2]==='reptile')?.28:v[2]==='herbivore'?.86:.62,produce:v[0].includes('Pato')||v[0].includes('Ganso')?'eggs':v[0].includes('Cavalo')||v[0].includes('Burro')?'travel':v[2]==='herbivore'?'food':v[2]==='bird'?'feathers':'craft'}));
window.__OITO_V24_FAUNA__=species;
const forageDefs=[
 {id:'berries',name:'Frutas silvestres',icon:'🍒',yield:'berries',qty:2},
 {id:'fruit',name:'Frutas maduras',icon:'🍎',yield:'fruit',qty:2},
 {id:'leaves',name:'Folhas comestíveis',icon:'🌿',yield:'leaves',qty:2},
 {id:'herbs',name:'Ervas medicinais',icon:'🌱',yield:'herbs',qty:1},
 {id:'mushrooms',name:'Cogumelos',icon:'🍄',yield:'mushrooms',qty:1},
 {id:'seeds',name:'Sementes',icon:'🌾',yield:'seeds',qty:2},
 {id:'antiviral',name:'Planta de pesquisa rara',icon:'🧬',yield:'sample',qty:1}
];
const gatherClasses=new Set(['explorer','farmer','cook','scientist']);
function randPoint(map){
 let x=50+Math.random()*900,y=55+Math.random()*485;
 for(let k=0;k<24;k++){
  const road=(map.roads||[]).some(r=>{
   const vx=r.x2-r.x1,vy=r.y2-r.y1,l=vx*vx+vy*vy||1,t=clamp(((x-r.x1)*vx+(y-r.y1)*vy)/l,0,1);
   return Math.hypot(x-r.x1-t*vx,y-r.y1-t*vy)<(r.w||30)*.65;
  });
  const building=(map.buildings||[]).some(b=>Math.abs(x-b.x)<(b.w||80)*.6+20&&Math.abs(y-b.y)<(b.h||70)*.6+20);
  if(!road&&!building)return {x,y};
  x=50+Math.random()*900;y=55+Math.random()*485;
 }
 return {x,y};
}
function ensureWorld(s){
 const map=s?.outsideMap;if(!map)return;
 if(!map.waterway){
  const roll=Math.random(),kind=map.reality==='fishing'?'ocean':roll<.36?'river':roll<.60?'lake':'none';
  if(kind==='river')map.waterway={type:'river',x:480,width:58,bridgeY:325};
  else if(kind==='lake')map.waterway={type:'lake',x:745,y:180,rx:104,ry:70};
  else if(kind==='ocean')map.waterway={type:'ocean',y:300,height:150};
  else map.waterway={type:'none'};
 }
 if(!Array.isArray(map.wildlife)){
  map.wildlife=[];
  const count=8+Math.floor(Math.random()*5),pool=species.filter(a=>a.kind!=='aquatic');
  for(let i=0;i<count;i++){
   const sp=pool[Math.floor(Math.random()*pool.length)],pt=randPoint(map);
   map.wildlife.push({id:sp.id+'_'+map.seed+'_'+i,speciesId:sp.id,name:sp.name,icon:sp.icon,kind:sp.kind,x:pt.x,y:pt.y,hp:100,tamed:false,roam:0,targetX:pt.x,targetY:pt.y,alert:0,produce:sp.produce});
  }
 }
 if(!Array.isArray(map.forageNodes)){
  map.forageNodes=[];
  for(let i=0;i<10;i++){
   const d=forageDefs[Math.floor(Math.random()*forageDefs.length)],pt=randPoint(map);
   map.forageNodes.push({id:d.id+'_'+map.seed+'_'+i,kind:d.id,name:d.name,icon:d.icon,x:pt.x,y:pt.y,amount:d.qty+Math.floor(Math.random()*2),collected:false});
  }
 }
 map.fieldStructures=Array.isArray(map.fieldStructures)?map.fieldStructures:[];
 s.v24FarmAnimals=Array.isArray(s.v24FarmAnimals)?s.v24FarmAnimals:[];
 s.v24CookIngredients=s.v24CookIngredients||{berries:0,fruit:0,leaves:0,herbs:0,mushrooms:0,seeds:0};
 s.v24CuredViruses=Number(s.v24CuredViruses)||0;
}
function speciesFor(a){return species.find(v=>v.id===a?.speciesId)||species[0];}
function nearestWorldThing(s){
 const map=s?.outsideMap,p=s?.player;if(!map||!p||s.mode!=='scavenge')return null;
 const options=[];
 for(const a of map.wildlife||[]){if(a.tamed)continue;const d=Math.hypot(p.x-a.x,p.y-a.y);if(d<50)options.push({kind:'v24Animal',obj:a,d});}
 for(const n of map.forageNodes||[]){if(n.collected||n.amount<=0)continue;const d=Math.hypot(p.x-n.x,p.y-n.y);if(d<46)options.push({kind:'v24Forage',obj:n,d});}
 const w=map.waterway;
 if(w?.type==='river'){const d=Math.min(Math.abs(p.x-(w.x-w.width/2)),Math.abs(p.x-(w.x+w.width/2)));if(d<44)options.push({kind:'v24Water',obj:w,d});}
 else if(w?.type==='lake'){const nx=(p.x-w.x)/(w.rx||1),ny=(p.y-w.y)/(w.ry||1),d=Math.abs(Math.sqrt(nx*nx+ny*ny)-1)*Math.min(w.rx,w.ry);if(d<42)options.push({kind:'v24Water',obj:w,d});}
 else if(w?.type==='ocean'){const d=Math.abs(p.y-(w.y+w.height/2));if(d<42)options.push({kind:'v24Water',obj:w,d});}
 return options.sort((a,b)=>a.d-b.d)[0]||null;
}
function farmList(s){s.v24FarmAnimals=Array.isArray(s.v24FarmAnimals)?s.v24FarmAnimals:[];return s.v24FarmAnimals;}
function onAnimal(a){
 const s=state(),sp=speciesFor(a);if(!s||!a)return;
 if(role()!=='farmer'){say(sp.name+' observado. O Agricultor pode tentar domesticar animais da floresta.');return;}
 if((Number(s.food)||0)<1){say('É preciso 1 porção de comida para atrair o animal.');return;}
 s.food--;
 if(Math.random()>Math.min(.98,sp.tameChance+upgradeLevel()*.04)){a.alert=8;a.targetX=clamp(a.x+(Math.random()-.5)*180,40,960);a.targetY=clamp(a.y+(Math.random()-.5)*150,40,560);say(sp.name+' se afastou. Tente novamente com calma.');save();return;}
 farmList(s).push({id:a.id,name:sp.name,icon:sp.icon,speciesId:sp.id,produce:sp.produce,mountable:sp.mountable||false,level:1,trust:100});
 a.tamed=true;
 if(sp.mountable){s.player.v24MountedAnimal=a.id;s.player.v24MountSpeed=1.25;say(sp.name+' domesticado! Você pode montá-lo para viajar mais rápido.');}
 else say(sp.name+' domesticado e adicionado à sua agropecuária.');
 save();
}
function forage(n){
 const s=state();if(!s||!n)return;
 if(!gatherClasses.has(role())){say('A coleta de plantas silvestres é exclusiva do Explorador, Agricultor, Cozinheiro e Cientista.');return;}
 const item=forageDefs.find(x=>x.id===n.kind);if(!item)return;
 const amount=Math.min(n.amount,item.qty);
 n.amount-=amount;if(n.amount<=0)n.collected=true;
 const inv=s.v24CookIngredients||(s.v24CookIngredients={});
 if(item.yield==='sample'){s.tools=s.tools||{};s.tools.antiviralSample=(s.tools.antiviralSample||0)+1;s.v24ResearchPoints=(s.v24ResearchPoints||0)+8+upgradeLevel()*2;say('Amostra vegetal rara coletada para pesquisas do Cientista.');}
 else{inv[item.yield]=(Number(inv[item.yield])||0)+amount;say('Coleta: '+item.name+' ×'+amount+'.');}
 if(role()==='farmer'&&item.yield==='seeds')s.tools.seeds=(s.tools.seeds||0)+1;
 save();
}
function handleNear(){
 const s=state();if(!s||s.uiPanelOpen||s.activePuzzle)return false;
 const near=nearestWorldThing(s);if(!near)return false;
 if(near.kind==='v24Animal')onAnimal(near.obj);
 else if(near.kind==='v24Forage')forage(near.obj);
 else if(near.kind==='v24Water')crossWater(near.obj);
 return true;
}
function crossWater(w){
 const s=state(),p=s?.player;if(!s||!p)return;
 if(role()!=='navigator'||!p.ownedVehicles?.includes('boat')||!s.tools?.boatKit){say('Esta travessia exige um Navegador com barco e kit de navegação.');return;}
 if(w.type==='river')p.x=p.x<w.x?w.x+w.width/2+32:w.x-w.width/2-32;
 else if(w.type==='lake')p.x=p.x<w.x?w.x+w.rx+28:w.x-w.rx-28;
 else if(w.type==='ocean')p.y=p.y<w.y?w.y+w.height/2+28:w.y-w.height/2-28;
 p.v24CrossingAt=now()+900;say('Travessia concluída com o barco.');save();
}
function sameRegion(s,obj){
 const region=s?.mode==='base'?'base_'+(s.stage||0):'map_'+(s?.outsideMap?.seed||0);
 return obj.region===region;
}
function regionId(s){return s?.mode==='base'?'base_'+(s.stage||0):'map_'+(s?.outsideMap?.seed||0);}
function activeStructures(s){
 if(['scavenge','interior'].includes(s?.mode)&&s.outsideMap)return s.outsideMap.fieldStructures||(s.outsideMap.fieldStructures=[]);
 s.v24BaseStructures=Array.isArray(s.v24BaseStructures)?s.v24BaseStructures:[];
 return s.v24BaseStructures;
}
const BLUEPRINTS=[
 {id:'wood_wall',label:'Parede de madeira',icon:'🪵',cost:{wood:4},group:'wood'},
 {id:'wood_gate',label:'Portão de madeira',icon:'🚪',cost:{wood:6,bolts:1},group:'wood'},
 {id:'wood_shelter',label:'Abrigo de madeira',icon:'🏕️',cost:{wood:12,stone:2},group:'wood'},
 {id:'wood_bridge',label:'Ponte curta',icon:'🌉',cost:{wood:9,branch:2},group:'wood'},
 {id:'wood_platform',label:'Plataforma elevada',icon:'🪜',cost:{wood:7,bolts:1},group:'wood'},
 {id:'wood_storage',label:'Depósito de madeira',icon:'📦',cost:{wood:5},group:'wood'},
 {id:'wood_watch',label:'Torre de observação',icon:'🗼',cost:{wood:10,bolts:2},group:'wood'},
 {id:'wood_fence',label:'Cerca de proteção',icon:'🚧',cost:{wood:5},group:'wood'},
 {id:'field_trap',label:'Armadilha de animais',icon:'🪤',cost:{wood:3,branch:2},group:'engineer'},
 {id:'listening_post',label:'Escuta de campo',icon:'📡',cost:{wood:3,parts:2,battery:1},group:'engineer'},
 {id:'field_bench',label:'Bancada portátil',icon:'🧰',cost:{wood:5,bolts:2},group:'engineer'},
 {id:'field_lamp',label:'Luminária de campo',icon:'🔦',cost:{wood:2,parts:1,battery:1},group:'engineer'}
];
function haveCost(s,cost){return Object.entries(cost).every(([k,v])=>(Number(s[k])||0)>=v);}
function payCost(s,cost){for(const [k,v] of Object.entries(cost))s[k]=Math.max(0,(Number(s[k])||0)-v);}
function fieldPanel(){
 const s=state(),id=role();if(!s)return;
 const isEngineer=id==='engineer',isCarpenter=id==='carpenter';
 if(!isEngineer&&!isCarpenter){say('Construção fora do abrigo: Engenheiro ou Carpinteiro.');return;}
 const root=document.createElement('div');root.id='v24FieldPanel';root.style.cssText='position:fixed;inset:0;z-index:980;background:#071017ed;display:flex;align-items:center;justify-content:center;padding:12px';
 const box=document.createElement('section');box.style.cssText='width:min(620px,97vw);max-height:88vh;overflow:auto;background:#14252d;border:1px solid #8de0c0;border-radius:14px;padding:16px;color:#edf5ef';
 const title=document.createElement('h2');title.textContent=isEngineer?'Oficina de campo · Engenheiro':'Assistente de carpintaria';title.style.margin='0 0 5px';
 const desc=document.createElement('p');desc.textContent=isEngineer?'Escolha uma estrutura, armadilha, escuta ou bancada. Depois clique no terreno para posicionar.':'Escolha um projeto de madeira. O assistente organiza os materiais e prepara a estrutura para posicionamento.';desc.style.cssText='font-size:12px;color:#b9cbc5';
 const grid=document.createElement('div');grid.style.cssText='display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px';
 const list=BLUEPRINTS.filter(b=>isEngineer||b.group==='wood');
 for(const bp of list){
  const btn=document.createElement('button');btn.type='button';btn.style.cssText='text-align:left;padding:11px;border-radius:9px;background:#1c3940;color:#fff;border:1px solid #55766d';
  btn.textContent=bp.icon+' '+bp.label+' · '+Object.entries(bp.cost).map(([k,v])=>v+' '+({wood:'madeira',stone:'pedra',bolts:'parafusos',branch:'galhos',parts:'componentes',battery:'bateria'}[k]||k)).join(', ');
  btn.onclick=()=>{root.remove();window.__OITO_V24_PENDING_BUILD__=bp.id;say('Projeto '+bp.label+' pronto. Clique em um ponto livre do terreno para construir.');};
  grid.append(btn);
 }
 const close=document.createElement('button');close.type='button';close.textContent='Fechar';close.className='btn alt';close.style.marginTop='12px';close.onclick=()=>root.remove();
 box.append(title,desc,grid,close);root.append(box);document.body.append(root);
}
function buildAt(x,y){
 const s=state(),id=role(),bp=BLUEPRINTS.find(v=>v.id===window.__OITO_V24_PENDING_BUILD__);
 if(!s||!bp)return false;
 if(s.mode!=='scavenge'){say('As estruturas de campo são posicionadas durante a exploração.');return false;}
 if(bp.group==='wood'&&id!=='carpenter'||bp.group!=='wood'&&id!=='engineer'){say('Esta classe não pode construir esse projeto.');return false;}
 if(!haveCost(s,bp.cost)){say('Materiais insuficientes para '+bp.label+'.');return false;}
 if((s.outsideMap.buildings||[]).some(b=>Math.abs(x-b.x)<(b.w||80)*.55+30&&Math.abs(y-b.y)<(b.h||70)*.55+30)){say('Escolha um terreno livre, longe das construções.');return false;}
 if(activeStructures(s).some(o=>Math.hypot(o.x-x,o.y-y)<48)){say('Há outra estrutura muito próxima.');return false;}
 payCost(s,bp.cost);
 const item={id:'v24_'+bp.id+'_'+now(),type:bp.id,x,y,hp:bp.id==='wood_shelter'?260:120,maxHp:bp.id==='wood_shelter'?260:120,region:regionId(s),createdAt:now(),readyAt:now()+45000};
 activeStructures(s).push(item);window.__OITO_V24_PENDING_BUILD__=null;say(bp.label+' construído.');save();return true;
}
const vehicles=bridge.getVehicles();if(!vehicles.some(v=>v.id==='boat'))vehicles.push({id:'boat',name:'Barco de travessia',cost:999999,speed:245,description:'Embarcação do Navegador · travessia de rios, lagos e mar.'});
bridge.wrap('getVehicle',old=>function(id){const v=old(id),p=state()?.player;if(id==='boat'&&role()==='navigator'){const skill=p?.v23NavigationUntil>Date.now()?1.25:1;return {...v,speed:Math.round(v.speed*skill*(1+upgradeLevel()*.04))};}return v;});
const canvas=bridge.getCanvasContext()?.canvas;
if(canvas){
 canvas.addEventListener('pointerdown',ev=>{
  if(ev.button!==0||!window.__OITO_V24_PENDING_BUILD__)return;
  const r=canvas.getBoundingClientRect(),x=(ev.clientX-r.left)*canvas.width/r.width,y=(ev.clientY-r.top)*canvas.height/r.height;
  if(buildAt(x,y)){ev.preventDefault();ev.stopImmediatePropagation();}
 },true);
 canvas.addEventListener('pointermove',()=>{if(!window.__OITO_V24_PENDING_BUILD__)canvas.style.cursor='';else canvas.style.cursor='crosshair';});
}
function addFieldCampfire(s){
 const structures=activeStructures(s),region=regionId(s);
 if(structures.some(v=>v.type==='campfire'&&v.region===region))return true;
 if((Number(s.wood)||0)<2||(Number(s.stone)||0)<1){say('Para acender uma fogueira portátil, use 2 madeiras e 1 pedra.');return false;}
 s.wood-=2;s.stone-=1;const p=s.player;
 structures.push({id:'v24_campfire_'+now(),type:'campfire',x:p.x+20,y:p.y+18,hp:80,maxHp:80,region,createdAt:now()});
 return true;
}
function cookPanel(){
 const s=state();if(!s||role()!=='cook'){say('Somente o Cozinheiro pode usar a cozinha portátil.');return;}
 if(!addFieldCampfire(s))return;
 const inv=s.v24CookIngredients||(s.v24CookIngredients={});
 const root=document.createElement('div');root.id='v24CookPanel';root.style.cssText='position:fixed;inset:0;z-index:980;background:#071017ed;display:flex;align-items:center;justify-content:center;padding:12px';
 const box=document.createElement('section');box.style.cssText='width:min(520px,96vw);background:#172d32;border:1px solid #e2bd71;border-radius:14px;padding:16px;color:#fff';
 const h=document.createElement('h2');h.textContent='Cozinha de campo';h.style.margin='0 0 5px';
 const p=document.createElement('p');p.textContent='Fogueira acesa. As refeições do Cozinheiro saciam 20% mais que uma porção comum.';p.style.cssText='color:#c4d2cc;font-size:12px';
 const info=document.createElement('p');info.textContent='Frutas: '+(inv.fruit||0)+' · Frutas silvestres: '+(inv.berries||0)+' · Folhas: '+(inv.leaves||0)+' · Ervas: '+(inv.herbs||0)+' · Cogumelos: '+(inv.mushrooms||0)+' · Comida: '+(s.food||0);
 const grid=document.createElement('div');grid.style.cssText='display:grid;gap:8px';
 const recipes=[
  {name:'Ensopado de folhas',need:{leaves:2,food:1},text:'2 folhas + 1 porção de comida',meal:1},
  {name:'Frutas assadas',need:{fruit:2},text:'2 frutas maduras',meal:1},
  {name:'Caldo de cogumelos',need:{mushrooms:2,leaves:1},text:'2 cogumelos + 1 folha',meal:1},
  {name:'Chá de ervas',need:{herbs:2},text:'2 ervas · melhora a recuperação',tea:1}
 ];
 for(const rec of recipes){
  const b=document.createElement('button');b.type='button';b.style.cssText='padding:10px;border-radius:8px;text-align:left;background:#23433b;color:#fff;border:1px solid #719a82';
  b.textContent=rec.name+' · '+rec.text;
  b.disabled=Object.entries(rec.need).some(([k,v])=>(k==='food'?s.food:inv[k]||0)<v);
  b.onclick=()=>{for(const [k,v] of Object.entries(rec.need)){if(k==='food')s.food-=v;else inv[k]-=v;}if(rec.meal)s.v24CookedMeals=(s.v24CookedMeals||0)+rec.meal;if(rec.tea){s.v24CookedMeals=(s.v24CookedMeals||0)+1;s.player.hp=Math.min(s.player.maxHp,s.player.hp+8);}say(rec.name+' preparado. Refeições guardadas: '+(s.v24CookedMeals||0)+'.');save();root.remove();};
  grid.append(b);
 }
 const close=document.createElement('button');close.textContent='Fechar';close.className='btn alt';close.onclick=()=>root.remove();box.append(h,p,info,grid,close);root.append(box);document.body.append(root);
}
function researchPanel(){
 const s=state();if(!s||role()!=='scientist'){say('A pesquisa de curas é exclusiva do Cientista.');return;}
 const root=document.createElement('div');root.id='v24ResearchPanel';root.style.cssText='position:fixed;inset:0;z-index:980;background:#071017ed;display:flex;align-items:center;justify-content:center;padding:12px';
 const box=document.createElement('section');box.style.cssText='width:min(520px,96vw);background:#162b35;border:1px solid #8de0c0;border-radius:14px;padding:16px;color:#fff';
 const h=document.createElement('h2');h.textContent='Laboratório portátil';h.style.margin='0 0 5px';
 const p=document.createElement('p');p.textContent='Amostras da floresta, componentes e medicamentos podem ser analisados para desenvolver a cura fictícia do jogo.';p.style.cssText='font-size:12px;color:#c0d0cb';
 const points=Number(s.v24ResearchPoints)||0,sample=Number(s.tools?.antiviralSample)||0,parts=Number(s.parts)||0,medicine=Number(s.medicine)||0,researchCost=Math.max(85,100-upgradeLevel()*5),partsCost=Math.max(2,3-Math.floor(upgradeLevel()/2));
 const info=document.createElement('p');info.textContent='Pesquisa: '+points+'/100 · Amostras: '+sample+' · Componentes: '+parts+' · Medicamentos: '+medicine;
 const grid=document.createElement('div');grid.style.cssText='display:grid;gap:8px';
 const study=document.createElement('button');study.textContent='Estudar amostra · +20 pesquisa';study.className='btn';study.disabled=sample<1;study.onclick=()=>{s.tools.antiviralSample--;s.v24ResearchPoints=Math.min(100,(s.v24ResearchPoints||0)+20);say('Amostra analisada. Pesquisa: '+s.v24ResearchPoints+'/100.');save();root.remove();};
 const cure=document.createElement('button');cure.textContent='Desenvolver cura antiviral · '+researchCost+' pesquisa, 1 amostra, '+partsCost+' componentes e 1 medicamento';cure.className='btn gold';cure.disabled=points<researchCost||sample<1||parts<partsCost||medicine<1;cure.onclick=()=>{s.v24ResearchPoints-=researchCost;s.tools.antiviralSample--;s.parts-=partsCost;s.medicine--;if(s.player.infection)s.player.infection=null;s.v24CuredViruses=(s.v24CuredViruses||0)+1;say('Cura antiviral desenvolvida e aplicada.');save();root.remove();};
 const close=document.createElement('button');close.textContent='Fechar';close.className='btn alt';close.onclick=()=>root.remove();grid.append(study,cure);box.append(h,p,info,grid,close);root.append(box);document.body.append(root);
}
function farmPanel(){
 const s=state();if(!s||role()!=='farmer'){say('A agropecuária é administrada pelo Agricultor.');return;}
 const animals=farmList(s),root=document.createElement('div');root.id='v24FarmPanel';root.style.cssText='position:fixed;inset:0;z-index:980;background:#071017ed;display:flex;align-items:center;justify-content:center;padding:12px';
 const box=document.createElement('section');box.style.cssText='width:min(540px,96vw);max-height:85vh;overflow:auto;background:#193027;border:1px solid #9bc58a;border-radius:14px;padding:16px;color:#fff';
 const h=document.createElement('h2');h.textContent='Agropecuária';h.style.margin='0 0 8px';const desc=document.createElement('p');desc.textContent='Animais domesticados produzem recursos ao longo das noites. Cavalos e burros podem ser montados.';desc.style.cssText='font-size:12px;color:#c7d9c4';
 const list=document.createElement('div');list.style.cssText='display:grid;gap:6px';
 if(!animals.length){const empty=document.createElement('p');empty.textContent='Nenhum animal domesticado. Explore a floresta e aproxime-se de um animal para oferecer comida.';list.append(empty);}
 for(const a of animals){const row=document.createElement('div');row.style.cssText='padding:9px;border:1px solid #63826a;border-radius:8px;background:#213e30';row.textContent=a.icon+' '+a.name+' · vínculo '+a.trust+'%'+(a.mountable?' · montável':'');list.append(row);}
 const close=document.createElement('button');close.textContent='Fechar';close.className='btn alt';close.onclick=()=>root.remove();box.append(h,desc,list,close);root.append(box);document.body.append(root);
}
function drawField(ctx,s){
 const entries=[...(s.v24BaseStructures||[]),...(s.outsideMap?.fieldStructures||[])].filter(o=>sameRegion(s,o));
 for(const o of entries){
  ctx.save();ctx.translate(o.x,o.y);
  const ico=o.type==='campfire'?'🔥':o.type==='field_trap'?'🪤':o.type==='listening_post'?'📡':o.type==='field_bench'?'🧰':o.type==='field_lamp'?'🔦':o.type==='wood_bridge'?'🌉':o.type==='wood_shelter'?'🏕️':o.type==='wood_watch'?'🗼':o.type==='wood_storage'?'📦':'🪵';
  ctx.fillStyle='#07120dbb';ctx.beginPath();ctx.ellipse(0,9,17,7,0,0,Math.PI*2);ctx.fill();ctx.font='23px system-ui';ctx.textAlign='center';ctx.fillText(ico,0,5);
  if(o.type==='listening_post'&&o.scanUntil>now()){ctx.strokeStyle='#8de0c0aa';ctx.beginPath();ctx.arc(0,0,45,0,Math.PI*2);ctx.stroke();}
  ctx.restore();
 }
}
function drawWaterway(ctx,map){
 const w=map?.waterway;if(!w||w.type==='none')return;ctx.save();
 if(w.type==='river'){
  ctx.fillStyle='#286b83e8';ctx.fillRect(w.x-w.width/2,0,w.width,620);
  ctx.strokeStyle='#9bd2d6';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(w.x-w.width/2,0);ctx.lineTo(w.x-w.width/2,620);ctx.moveTo(w.x+w.width/2,0);ctx.lineTo(w.x+w.width/2,620);ctx.stroke();
  ctx.fillStyle='#6b5438';ctx.fillRect(w.x-55,w.bridgeY-15,110,30);ctx.fillStyle='#b59a70';ctx.fillRect(w.x-55,w.bridgeY-11,110,22);ctx.fillStyle='#604a34';for(let x=w.x-45;x<w.x+50;x+=18)ctx.fillRect(x,w.bridgeY-15,4,30);
 }else if(w.type==='lake'){
  ctx.fillStyle='#286b83e8';ctx.beginPath();ctx.ellipse(w.x,w.y,w.rx,w.ry,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#9bd2d6';ctx.lineWidth=4;ctx.stroke();
  ctx.strokeStyle='#b7e4e0aa';ctx.lineWidth=2;for(let y=-24;y<30;y+=24){ctx.beginPath();ctx.ellipse(w.x,w.y+y,w.rx*.58,w.ry*.38,0,0,Math.PI*2);ctx.stroke();}
 }else if(w.type==='ocean'){
  ctx.fillStyle='#205f7ae8';ctx.fillRect(0,w.y-w.height/2,1000,w.height);ctx.strokeStyle='#a4d8df';ctx.lineWidth=2;
  for(let y=w.y-w.height/2+22;y<w.y+w.height/2;y+=32){ctx.beginPath();for(let x=0;x<=1000;x+=30){const yy=y+Math.sin((x+y)/38)*5;if(x===0)ctx.moveTo(x,yy);else ctx.lineTo(x,yy);}ctx.stroke();}
 }
 ctx.restore();
}
function drawWildlife(ctx,s){
 if(s.mode!=='scavenge'||!s.outsideMap)return;
 drawWaterway(ctx,s.outsideMap);
 for(const a of s.outsideMap.wildlife||[]){if(a.tamed)continue;ctx.save();ctx.translate(a.x,a.y);ctx.fillStyle='#07130b99';ctx.beginPath();ctx.ellipse(0,9,13,5,0,0,Math.PI*2);ctx.fill();ctx.font='20px system-ui';ctx.textAlign='center';ctx.fillText(a.icon||'🐾',0,4);if(Math.hypot(s.player.x-a.x,s.player.y-a.y)<70){ctx.font='bold 9px system-ui';ctx.fillStyle='#fff3cf';ctx.fillText(a.name,0,-18);}ctx.restore();}
 for(const n of s.outsideMap.forageNodes||[]){if(n.collected||n.amount<=0)continue;ctx.save();ctx.translate(n.x,n.y);ctx.font='18px system-ui';ctx.textAlign='center';ctx.fillText(n.icon||'🌿',0,5);ctx.restore();}
}
function updateWorld(dt,s){
 if(!s)return;
 if(s.mode==='scavenge'&&s.outsideMap){
  ensureWorld(s);
  const water=s.outsideMap.waterway;if(water&&water.type!=='none'&&!s.outsideMap.wildlife.some(a=>a.kind==='aquatic')){const aquatic=species.filter(a=>a.kind==='aquatic');for(let i=0;i<2;i++){const sp=aquatic[i],x=water.type==='river'?water.x:water.type==='lake'?water.x-water.rx*.3+i*water.rx*.6:500+i*80,y=water.type==='river'?150+i*260:water.type==='lake'?water.y+(i?15:-15):water.y; s.outsideMap.wildlife.push({id:sp.id+'_'+s.outsideMap.seed+'_'+i,speciesId:sp.id,name:sp.name,icon:sp.icon,kind:sp.kind,x,y,hp:100,tamed:false,targetX:x,targetY:y,roam:0});}}
  for(const a of s.outsideMap.wildlife||[]){
   if(a.tamed)continue;a.roam=(a.roam||0)-dt;
   const d=Math.hypot(s.player.x-a.x,s.player.y-a.y);
   if(d<105&&a.kind!=='predator'){a.alert=2;a.targetX=clamp(a.x+(a.x-s.player.x)*1.4,30,970);a.targetY=clamp(a.y+(a.y-s.player.y)*1.4,30,570);}
   else if(a.roam<=0){const pt=randPoint(s.outsideMap);a.targetX=pt.x;a.targetY=pt.y;a.roam=2+Math.random()*5;}
   const dx=a.targetX-a.x,dy=a.targetY-a.y,len=Math.hypot(dx,dy)||1,step=(a.speed||1)*13*dt;
   if(len>5){a.x+=dx/len*Math.min(step,len);a.y+=dy/len*Math.min(step,len);}
  }
  for(const o of s.outsideMap.fieldStructures||[])if(o.type==='field_trap'&&now()>(o.readyAt||Infinity)){o.readyAt=now()+90000;o.caught=(o.caught||0)+1;s.food=Math.min(99,(s.food||0)+1);say('Uma armadilha de campo encontrou alimento.');}
  for(const o of s.outsideMap.fieldStructures||[])if(o.type==='listening_post')o.scanUntil=now()+5000;
 }
}
let lastProductNight=-1;
function applyFarmProduction(s){
 const night=Number(s.nightsSurvived)||0;if(night<=lastProductNight)return;lastProductNight=night;
 const animals=farmList(s);if(!animals.length)return;
 let food=0,eggs=0,feathers=0;
 for(const a of animals){if(a.produce==='food')food+=.35;else if(a.produce==='eggs')eggs+=1;else if(a.produce==='feathers')feathers+=1;}
 s.v24FarmProducts=s.v24FarmProducts||{eggs:0,feathers:0,foodRemainder:0};
 const total=Number(s.v24FarmProducts.foodRemainder||0)+food,whole=Math.floor(total);
 s.food=Math.min(99,(s.food||0)+whole);s.v24FarmProducts.foodRemainder=total-whole;
 s.v24FarmProducts.eggs=(s.v24FarmProducts.eggs||0)+eggs;s.v24FarmProducts.feathers=(s.v24FarmProducts.feathers||0)+feathers;
}
bridge.wrap('freshState',old=>function(...args){
 const s=old(...args),id=role();s.v24FarmAnimals=[];s.v24CookIngredients={berries:0,fruit:0,leaves:0,herbs:0,mushrooms:0,seeds:0};s.v24CookedMeals=0;s.v24ResearchPoints=0;s.v24CuredViruses=0;s.v24FarmProducts={eggs:0,feathers:0};s.v24BaseStructures=s.v24BaseStructures||[];
 if(s.player){s.player.classId=id;s.player.v24MountedAnimal=null;}
 if(['engineer','carpenter','mechanic'].includes(id)){
  const level=id==='engineer'?8:2;s.benchTier=Math.max(s.benchTier||1,level);
  if(!s.builds.some(b=>b.type==='bench'))s.builds.push({id:'v24_class_bench',type:'bench',x:500,y:392,c:Math.floor(500/50),r:Math.floor(392/50),hp:180,maxHp:180,cool:0,level});
  else for(const b of s.builds.filter(b=>b.type==='bench'))b.level=Math.max(b.level||1,level);
 }
 if(id==='medic'){s.medicine=Math.max(1,Number(s.medicine)||0);s.tools=s.tools||{};s.tools.medkit=1;}
 if(id==='navigator'){s.tools=s.tools||{};s.tools.boatKit=1;s.player.ownedVehicles=s.player.ownedVehicles||['foot'];if(!s.player.ownedVehicles.includes('boat'))s.player.ownedVehicles.push('boat');s.player.vehicleId='boat';}
 if(id==='cook'){s.tools=s.tools||{};s.tools.cookingPot=1;s.player.hasCookingPot=true;}
 if(id==='farmer'){s.tools=s.tools||{};s.tools.farmingMachete=1;s.tools.pelletRifle=1;s.player.ownedWeapons=s.player.ownedWeapons||['fist'];if(!s.player.ownedWeapons.includes('farmer_pellet_rifle'))s.player.ownedWeapons.push('farmer_pellet_rifle');if(!s.player.weaponId||s.player.weaponId==='club'||s.player.weaponId==='fist')s.player.weaponId='farmer_pellet_rifle';}
 if(id==='hunter'){s.player.huntingMode=false;s.player.v24Scoped=false;}
 return s;
});
bridge.wrap('useMedicine',old=>function(...args){
 const s=state(),p=s?.player;if(!s||!p)return old(...args);
 if((s.medicine||0)<1||p.hp>=p.maxHp)return old(...args);
 const id=role(),base=id==='medic'?.5:id==='rescuer'?.6:.8;
 const severity=(p.hp/p.maxHp<.25?.08:0)+(p.infection?.progress>60?.07:0),error=clamp(base+severity,0,.95);
 if(Math.random()<error){s.medicine=Math.max(0,s.medicine-1);say('Procedimento não concluído. O problema exigiu uma nova tentativa. Medicamentos restantes: '+s.medicine+'.');save();return false;}
 if(id==='rescuer'){
  s.medicine=Math.max(0,s.medicine-1);
  const amount=Math.min(Math.round(37.8*(1+upgradeLevel()*.03)),p.maxHp-p.hp);p.hp+=amount;
  say('Socorrista: procedimento concluído com 90% do benefício médico · +'+amount+' de vida.');
  save();return true;
 }
 const before=p.hp,result=old(...args);
 if(id==='medic'&&p.hp>before)p.hp=Math.min(p.maxHp,before+Math.round((p.hp-before)*(.2+upgradeLevel()*.03)));
 save();return result;
});
bridge.wrap('weaponDamage',old=>function(...args){const d=Number(old(...args))||0;return Math.round(d*(role()==='soldier'?1.18+upgradeLevel()*.04:role()==='watchman'?1+upgradeLevel()*.025:1));});
bridge.wrap('movePlayer',old=>function(dt,...args){
 const s=state(),p=s?.player;if(!p)return old(dt,...args);
 const speed=p.speed,mounted=!!p.v24MountedAnimal;
 if(mounted&&role()==='farmer')p.speed=speed*(1.25+upgradeLevel()*.015);
 const before={x:p.x,y:p.y},crossing=p.v24CrossingAt>Date.now();
 try{
  const result=old(dt,...args),w=s.mode==='scavenge'?s.outsideMap?.waterway:null;
  if(w&&!crossing){
   if(w.type==='river'&&p.x>w.x-w.width/2&&p.x<w.x+w.width/2&&Math.abs(p.y-w.bridgeY)>42){p.x=before.x;p.y=before.y;}
   else if(w.type==='lake'&&((p.x-w.x)/(w.rx||1))**2+((p.y-w.y)/(w.ry||1))**2<1){p.x=before.x;p.y=before.y;}
   else if(w.type==='ocean'&&Math.abs(p.y-w.y)<w.height/2){p.x=before.x;p.y=before.y;}
  }
  return result;
 }finally{p.speed=speed;}
});
bridge.wrap('update',old=>function(dt,...args){const result=old(dt,...args),s=state();updateWorld(dt,s);return result;});
bridge.wrap('render',old=>function(...args){
 const result=old(...args),s=state(),ctx=bridge.getCanvasContext();if(ctx&&s){drawWildlife(ctx,s);drawField(ctx,s);}
 if(ctx&&s?.mode==='travel'&&s.player?.vehicleId==='boat'){
  const p=s.player;ctx.save();ctx.fillStyle='#1b6786e8';ctx.fillRect(0,ctx.canvas.height/2-72,ctx.canvas.width,144);
  ctx.strokeStyle='#a5d8e1';ctx.lineWidth=2;
  for(let y=ctx.canvas.height/2-55;y<ctx.canvas.height/2+62;y+=27){ctx.beginPath();for(let x=0;x<=ctx.canvas.width;x+=26){const yy=y+Math.sin((x+y+performance.now()/35)/35)*4;if(x===0)ctx.moveTo(x,yy);else ctx.lineTo(x,yy);}ctx.stroke();}
  ctx.font='26px system-ui';ctx.textAlign='center';ctx.fillText('⛵',p.x,p.y+32);ctx.font='bold 11px system-ui';ctx.fillStyle='#e8f5f5';ctx.fillText('TRAVESSIA AQUÁTICA',ctx.canvas.width/2,ctx.canvas.height/2-82);ctx.restore();
 }
 if(ctx&&s?.player&&role()==='watchman'&&s.player.v23LanternOn){ctx.save();ctx.font='18px system-ui';ctx.textAlign='center';ctx.fillText('🔦',s.player.x+18,s.player.y+13);ctx.restore();}
 return result;
});
bridge.wrap('advanceNight',old=>function(...args){const s=state(),before=Number(s?.nightsSurvived)||0,result=old(...args);if(s&&(Number(s.nightsSurvived)||0)>before)applyFarmProduction(s);return result;});
function updatePrompt(){
 const s=state(),el=$('interactionPrompt'),near=nearestWorldThing(s);if(!el||!near||s?.uiPanelOpen)return;
 el.hidden=false;
 if(near.kind==='v24Animal')el.textContent=role()==='farmer'?'E · DOMESTICAR '+near.obj.name.toUpperCase()+' (1 COMIDA)':'E · OBSERVAR '+near.obj.name.toUpperCase();
 else if(near.kind==='v24Water')el.textContent=role()==='navigator'?'E · ATRAVESSAR DE BARCO':'ÁGUA · EXIGE NAVEGADOR E BARCO';
 else el.textContent=gatherClasses.has(role())?'E · COLETAR '+near.obj.name.toUpperCase():'E · EXPLORAR '+near.obj.name.toUpperCase()+' · CLASSE ESPECIALIZADA';
}
bridge.wrap('update',old=>function(dt,...args){const r=old(dt,...args);updatePrompt();return r;});
document.addEventListener('keydown',ev=>{
 const s=state(),target=ev.target;if(!s?.gameStarted||target&&(target.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(target.tagName)))return;
 if(ev.repeat)return;
 const key=ev.key.toLowerCase(),id=role();
 if(key==='e'&&nearestWorldThing(s)){ev.preventDefault();ev.stopImmediatePropagation();handleNear();return;}
 if(key==='m'&&id==='farmer'){ev.preventDefault();ev.stopImmediatePropagation();const p=s.player,animals=farmList(s).filter(a=>a.mountable);if(p.v24MountedAnimal){p.v24MountedAnimal=null;say('Você desmontou.');}else if(animals.length){p.v24MountedAnimal=animals[0].id;say('Você montou '+animals[0].name+'.');}else say('Domestique um cavalo ou burro primeiro.');save();return;}
 if(key==='b'&&s.mode==='scavenge'&&['engineer','carpenter'].includes(id)){ev.preventDefault();ev.stopImmediatePropagation();fieldPanel();return;}
 if(key==='c'&&id==='cook'&&!s.uiPanelOpen){ev.preventDefault();ev.stopImmediatePropagation();cookPanel();return;}
 if(key==='x'&&id==='scientist'&&!s.uiPanelOpen){ev.preventDefault();ev.stopImmediatePropagation();researchPanel();return;}
 if(key==='j'&&id==='farmer'&&!s.uiPanelOpen){ev.preventDefault();ev.stopImmediatePropagation();farmPanel();return;}
 if(key==='f'&&id==='cook'&&(s.v24CookedMeals||0)>0&&s.hunger<99){ev.preventDefault();ev.stopImmediatePropagation();s.v24CookedMeals--;s.hunger=Math.min(100,s.hunger+Math.round(45*(1.2+upgradeLevel()*.04)));say('Refeição preparada consumida. Saciedade +20%. Restam '+s.v24CookedMeals+'.');save();return;}
 if(key==='z'&&id==='hunter'){ev.preventDefault();ev.stopImmediatePropagation();s.player.v24Scoped=!s.player.v24Scoped;say(s.player.v24Scoped?'Mira de caça ativada. Mire antes de disparar.':'Mira de caça desativada.');return;}
},true);
if(canvas){
 let aim={x:canvas.width/2,y:canvas.height/2};
 canvas.addEventListener('pointermove',ev=>{const r=canvas.getBoundingClientRect();aim.x=(ev.clientX-r.left)*canvas.width/r.width;aim.y=(ev.clientY-r.top)*canvas.height/r.height;});
 canvas.addEventListener('pointerdown',ev=>{
  const p=state()?.player;if(role()!=='hunter'||!p?.v24Scoped||ev.button!==2)return;
  p.v24AimPoint={x:aim.x,y:aim.y};
 },true);
 bridge.wrap('render',old=>function(...args){
  const r=old(...args),s=state(),ctx=bridge.getCanvasContext(),p=s?.player;
  if(role()==='hunter'&&p?.v24Scoped&&ctx){
   const w=ctx.canvas.width,h=ctx.canvas.height,x=p.v24AimPoint?.x??w/2,y=p.v24AimPoint?.y??h/2;
   ctx.save();ctx.fillStyle='#0008';ctx.beginPath();ctx.rect(0,0,w,h);ctx.arc(x,y,Math.min(w,h)*.34,0,Math.PI*2,true);ctx.fill('evenodd');
   ctx.strokeStyle='#d9e5d4';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,Math.min(w,h)*.34,0,Math.PI*2);ctx.stroke();
   ctx.strokeStyle='#e5e8d9';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x-28,y);ctx.lineTo(x+28,y);ctx.moveTo(x,y-28);ctx.lineTo(x,y+28);ctx.stroke();ctx.restore();
  }
  return r;
 });
}

const v24HandImages=new Map();
function v24Image(url){let img=v24HandImages.get(url);if(!img){img=new Image();img.src=url;img.onload=()=>{};v24HandImages.set(url,img);}return img;}
bridge.wrap('drawPlayer',old=>function(...args){
 const result=old(...args),s=state(),p=s?.player;if(!p)return result;
 const cfg=bridge.getEditorConfig(),id=role(),hand=cfg?.universalRig?.handItems?.[id];if(!hand||!['customItem','lootItem'].includes(hand.kind))return result;
 const entry=hand.kind==='customItem'?cfg?.customItems?.[hand.id]:cfg?.itemOverrides?.[hand.id],url=entry?.iconImage;
 if(!url)return result;
 const img=v24Image(url);if(!img.complete||!img.naturalWidth)return result;
 const pose=p.attackUntil>performance.now()?'attack':(Math.abs(p.vx||0)+Math.abs(p.vy||0)>.2?'walk':'idle');
 const key=hand.kind+'::'+hand.id,rig=cfg?.universalRig?.itemOffsets?.[id]?.[key]?.[pose]||cfg?.universalRig?.itemOffsets?.[id]?.[key]?.idle||cfg?.universalRig?.classOffsets?.[id]?.[pose]||cfg?.universalRig?.classOffsets?.[id]?.idle||{};
 const ctx=bridge.getCanvasContext();if(!ctx)return result;
 const scale=clamp(Number(rig.scale)||.75,.35,2.5),angle=(Number(rig.angle)||0)*Math.PI/180;
 ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Number(p.attackAngle)||0);ctx.translate(Number(rig.x??13),Number(rig.y??-10));ctx.rotate(angle);ctx.imageSmoothingEnabled=false;ctx.drawImage(img,-16*scale,-16*scale,32*scale,32*scale);ctx.restore();
 return result;
});

window.__OITO_V24_SYSTEMS__={
 fauna:species.map(v=>({id:v.id,name:v.name,kind:v.kind})),
 forage:forageDefs.map(v=>({id:v.id,name:v.name})),
 blueprints:BLUEPRINTS.map(v=>({id:v.id,label:v.label})),
 classes:{medic:{procedureError:.5},rescuer:{procedureError:.6,medicalSkill:.9},other:{procedureError:.8},soldier:{damageBonus:.18}},
 openFieldBuilder:fieldPanel,openCooking:cookPanel,openResearch:researchPanel,openFarm:farmPanel
};
console.info('[Oito Entradas] v24.1: fauna, agropecuária, coleta, cozinha, pesquisa, construção de campo, barco e itens equipáveis no manequim.');
})();