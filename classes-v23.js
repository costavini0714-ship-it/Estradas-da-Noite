/* Oito Entradas v23.0 — especializações, habilidades e equipamentos de classe. */
(()=> {
 'use strict';
 if(window.__OITO_V23_INSTALLED__)return;
 const API=window.__OITO_V19,bridge=window.__OITO_V23_BRIDGE__;
 if(!API||!Array.isArray(API.classes)||!bridge){console.error('[v23] As APIs do jogo não estão disponíveis.');return;}
 window.__OITO_V23_INSTALLED__=true;
 const classes=API.classes;
 const definitions=[
  {id:'locksmith',name:'Chaveiro',icon:'🗝️',price:390,desc:'Especialista em fechaduras comuns e tecnológicas. É o único que fabrica fechaduras.',bonus:'Chave Mestra: destranca portas e mecanismos próximos.'},
  {id:'mason',name:'Pedreiro',icon:'🧱',price:250,desc:'Especialista em tijolos, pedra, massa e estruturas resistentes.',bonus:'Constrói e repara alvenaria com 30% menos material.'},
  {id:'citizen',name:'Cidadão',icon:'🧑‍🌾',price:90,desc:'Pessoa comum com conhecimentos práticos e custo acessível.',bonus:'Sem especialização extrema; melhora pequenas tarefas de sobrevivência.'},
  {id:'cartographer',name:'Cartógrafo',icon:'🗺️',price:420,desc:'Mapeia regiões, estruturas, rotas e pontos de interesse.',bonus:'Carta Viva revela áreas e registra setores explorados.'},
  {id:'navigator',name:'Navegador',icon:'🧭',price:480,desc:'Especialista em travessias por mar, oceano, rios e lagos.',bonus:'Melhora navegação e segurança nas travessias aquáticas.'},
  {id:'commander',name:'Comandante',icon:'🎖️',price:950,desc:'Coordena equipes e dá ordens táticas. Só pode haver um por equipe.',bonus:'Aumenta a coordenação e a resposta dos aliados.'},
  {id:'mayor',name:'Prefeito',icon:'🏛️',price:1400,desc:'Administra a cidade local. Só pode haver um por equipe/cidade.',bonus:'Melhora a organização, comércio e serviços da cidade.'},
  {id:'tourist',name:'Turista',icon:'🎒',price:130,desc:'Viajante que registra locais, encontra rotas e observa pontos de interesse.',bonus:'Melhora descobertas durante a exploração.'},
  {id:'hybrid',name:'Híbrido',icon:'🌘',price:2500,desc:'Linhagem rara com herança sobrenatural. Desbloqueio exige conquistas.',bonus:'Velocidade superior e invisibilidade temporária; pode consumir sangue ou comida.',requiresAchievements:['farm_escape','first_night']},
  {id:'hybrid_vampire',name:'Híbrido Vampiro',icon:'🦇',price:4500,desc:'Variante vampírica: invisibilidade, velocidade elevada e visão noturna.',bonus:'Pode se alimentar de sangue ou comida; mordida de vampiro completa a transformação.',requiresAchievements:['vampire_region','military_base']},
  {id:'hybrid_werewolf',name:'Híbrido Lobisomem',icon:'🐺',price:4500,desc:'Variante lupina: faro apurado, garras, presas, escalada e visão noturna.',bonus:'Mais velocidade e dano corpo a corpo; mordida de lobisomem completa a transformação.',requiresAchievements:['werewolf_region','first_night']}
 ];
 const byId=id=>classes.find(c=>c.id===id);
 for(const c of classes){
  if(c.id==='survivor'){c.desc='Pessoa comum, sem especialização. Começa com atributos comuns.';c.bonus='Sem bônus ou penalidades.';}
  if(c.id==='soldier'){c.desc='Treinado para combate e proteção do grupo.';c.bonus='+18% de dano e +5% de vida máxima. Mantém Golpe Sísmico; arma exclusiva com 10% de chance de aparecer.';}
  if(c.id==='medic'){c.desc='Começa com kit médico. Procedimentos têm 50% de chance de erro; puzzles médicos 20% mais fáceis.';c.bonus='Mantém a recuperação médica existente. Vacina: 60% menos dano por 15s; recarga 60s.';}
  if(c.id==='rescuer'){c.desc='Tem 90% dos atributos médicos, 60% de chance de erro, mais velocidade e puzzles 50% mais fáceis.';c.bonus='Setas mostram aliados e sobreviventes recrutados abaixo de 30% de vida. Estado de Emergência: 80% de acerto por 2s; recarga 50s.';}
  if(c.id==='explorer'){c.desc='Mais rápido, inicia com bússola e equipamentos de navegação e tem capacidade de mochila dobrada.';c.bonus='+12% de velocidade e +15% de estamina máxima. Coleta Seletiva revela itens de uma estrutura ou de todas.';}
  if(c.id==='scout'){c.name='Batedor';c.icon='🚓';c.price=320;c.desc='Policial de reconhecimento e resposta rápida. Recebe uma moto policial.';c.bonus='+10% de velocidade e 15% menos estamina ao vasculhar. Arma policial: 10% em postos policiais e 50% em bases militares.';}
  if(c.id==='engineer'){c.desc='Começa com bancada e projetos de construção e engenharia liberados.';c.bonus='Construções começam com +20% de integridade e custam 30% menos material.';}
  if(c.id==='carpenter'){c.desc='Começa com bancada de nível 2 e acesso à carpintaria.';c.bonus='+1 madeira por coleta e 30% menos madeira em trabalhos de carpintaria.';}
  if(c.id==='mechanic'){c.desc='Começa com bancada mecânica e reduz o custo de produção e manutenção de veículos.';c.bonus='+1 sucata e +1 componente por saque correspondente; 30% menos materiais mecânicos.';}
  if(c.id==='farmer'){c.desc='Começa com ferramentas agrícolas e rifle de pressão; aumenta a produção de alimentos.';c.bonus='+25% de comida obtida em saques; colheitas crescem mais rápido e rendem mais.';}
  if(c.id==='hunter'){c.desc='Rastreador silencioso com rifle de caça e modo de caça pela mira.';c.bonus='Punhos causam +10% de dano e ataque recarrega 8% mais rápido. Camuflagem temporária.';}
  if(c.id==='watchman'){c.name='Segurança';c.icon='🛡️';c.price=280;c.desc='Protege o grupo, usa lanterna na mão livre (tecla L) e possui arma exclusiva rara.';c.bonus='Mantém 18% menos dano durante a noite. Defesa Imbatível: +50% de dano por 5s; recarga 60s.';}
  if(c.id==='cook'){c.desc='Começa com panela e equipamentos de cozinha; pode preparar refeições fora do abrigo.';c.bonus='Mantém o bônus atual de 35% de saciedade e permite cozinhar folhas e frutas.';}
  if(c.id==='scientist'){c.desc='Pesquisa vírus, remédios e curas. É a única classe que desenvolve curas completas.';c.bonus='Mantém a vantagem existente nos puzzles e acelera pesquisas e análises.';}
 }
 const leader=classes.findIndex(c=>c.id==='leader');if(leader>=0)classes.splice(leader,1);
 for(const c of definitions)if(!byId(c.id))classes.push(c);
 const classPrices={survivor:0,soldier:180,medic:220,rescuer:240,explorer:260,scout:320,engineer:420,carpenter:240,mechanic:300,farmer:220,hunter:360,watchman:280,cook:190,scientist:480,locksmith:390,mason:250,citizen:90,cartographer:420,navigator:480,commander:950,mayor:1400,tourist:130,hybrid:2500,hybrid_vampire:4500,hybrid_werewolf:4500};
 for(const c of classes)if(classPrices[c.id]!==undefined)c.price=classPrices[c.id];
 const ids=classes.map(c=>c.id);API.migrateClassCatalog?.(ids);
 const profile=()=>API.profile?.()||{owned:['survivor'],selected:'survivor',coins:0};
 const selected=()=>String(profile().selected||'survivor'),own=id=>profile().owned?.includes(id)||false;
 const achievementList=()=>window.__OITO_V191?.profile?.().unlocked||[];
 const hasRequirements=c=>(c.requiresAchievements||[]).every(id=>achievementList().includes(id));
 const $=id=>document.getElementById(id);
 const state=()=>bridge.getState();
 const notify=msg=>bridge.getFn('say')?.(msg);
 // Stop the legacy menu handler before it spends coins on an achievement-gated hybrid.
 document.addEventListener('click',ev=>{
  const card=ev.target.closest?.('#v19ClassGrid .v19-class-card');if(!card)return;
  const idx=Array.from($('v19ClassGrid')?.children||[]).indexOf(card),c=classes[idx];
  if(c?.requiresAchievements&&!own(c.id)&&!hasRequirements(c)){ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();notify('Esta classe exige as conquistas indicadas na descrição.');}
 },true);
 // Paid class upgrades: three ordered levels, persistent across sessions.
 const upgradePrice=(c,n)=>Math.max(35,Math.round((Number(c.price)||0)*[0,.45,.75,1.15][n]));
 function renderUpgradePanel(){
  const shop=$('v19ClassShop');if(!shop)return;
  let panel=$('v23ClassUpgrades');
  if(!panel){panel=document.createElement('section');panel.id='v23ClassUpgrades';panel.style.cssText='margin-top:10px;padding:10px;border:1px solid #596d64;border-radius:10px;background:#111f26';const foot=shop.querySelector('.v19-foot');shop.insertBefore(panel,foot||null);}
  const c=byId(selected())||classes[0],level=API.getClassUpgradeLevel?.(c.id)||0,owned=own(c.id);
  panel.innerHTML='<div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><b>Melhorias da classe: '+c.name+'</b><b style="color:#e8cf8b">'+level+'/3</b></div><p style="font-size:10px;color:#b9c9c7;margin:5px 0 8px">Três melhorias pagas, em ordem. Cada nível fortalece a especialidade sem apagar os atributos antigos.</p><div id="v23UpgradeButtons" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px"></div>';
  const box=$('v23UpgradeButtons');
  for(let n=1;n<=3;n++){const b=document.createElement('button');b.type='button';b.className='btn '+(n<=level?'alt':'gold');b.disabled=!owned||n!==level+1||profile().coins<upgradePrice(c,n);b.textContent=n<=level?'Nível '+n+' · adquirido':'Nível '+n+' · 🪙 '+upgradePrice(c,n);b.addEventListener('click',()=>{const ok=API.buyClassUpgrade?.(c.id,n);notify(ok?'Melhoria de nível '+n+' comprada.':'Moedas insuficientes ou compre os níveis em ordem.');API.renderClassMenu?.();renderUpgradePanel();});box.append(b);}
 }
 const originalClassMenu=API.renderClassMenu;
 if(typeof originalClassMenu==='function'){API.renderClassMenu=()=>{const result=originalClassMenu();renderUpgradePanel();return result;};API.renderClassMenu();}
 const skills={
  medic:{name:'Vacina',description:'Escolha alguém: 60% menos dano por 15s.',cooldown:60000},
  rescuer:{name:'Estado de Emergência',description:'80% de acerto por 2s.',cooldown:50000},
  explorer:{name:'Coleta Seletiva',description:'Revela itens desta estrutura ou de todas.',cooldown:60000},
  scout:{name:'Golpe Tático',description:'Impacto policial aprimorado em área.',cooldown:38000},
  engineer:{name:'Reparação de Campo',description:'Repara estruturas e o amuleto.',cooldown:55000},
  carpenter:{name:'Reforço de Madeira',description:'Fortalece uma estrutura de madeira.',cooldown:48000},
  mechanic:{name:'Solda',description:'Repara mecanismos e melhora o veículo equipado.',cooldown:55000},
  farmer:{name:'Reserva Agrícola',description:'Gera alimentos e acelera as hortas.',cooldown:65000},
  hunter:{name:'Camuflagem',description:'Fica oculto durante alguns segundos.',cooldown:55000},
  watchman:{name:'Defesa Imbatível',description:'+50% de dano por 5s.',cooldown:60000},
  cook:{name:'Cozinha de Campo',description:'Ativa a cozinha portátil.',cooldown:60000},
  scientist:{name:'Análise Acelerada',description:'Acelera pesquisas e progresso de cura.',cooldown:70000},
  locksmith:{name:'Chave Mestra',description:'Destranca uma porta próxima.',cooldown:45000},
  mason:{name:'Reforço Estrutural',description:'Fortalece paredes e barreiras.',cooldown:55000},
  citizen:{name:'Improviso',description:'Recupera vida e estamina.',cooldown:55000},
  cartographer:{name:'Carta Viva',description:'Registra e revela o setor atual.',cooldown:65000},
  navigator:{name:'Travessia Segura',description:'Prepara você para uma travessia aquática.',cooldown:65000},
  commander:{name:'Comando Tático',description:'Reúne e fortalece seus aliados.',cooldown:75000},
  mayor:{name:'Serviço Municipal',description:'Ativa serviços e suprimentos da cidade.',cooldown:90000},
  tourist:{name:'Registro de Campo',description:'Marca locais e pontos de interesse.',cooldown:60000},
  hybrid:{name:'Invisibilidade',description:'Fica invisível e mais rápido.',cooldown:70000},
  hybrid_vampire:{name:'Predador Noturno',description:'Invisibilidade, velocidade e visão noturna.',cooldown:75000},
  hybrid_werewolf:{name:'Forma Lupina',description:'Garras, velocidade e sentidos ampliados.',cooldown:75000}
 };
 const skillCooldown=id=>skills[id]?.cooldown||55000;
 function setCooldown(ms){const p=state()?.player;if(p)p.v20AbilityReadyAt=Date.now()+ms;}
 function openChooser(title,description,targets,onChoose){
  $('v23ClassTargetChooser')?.remove();
  const root=document.createElement('div');root.id='v23ClassTargetChooser';root.style.cssText='position:fixed;inset:0;z-index:950;background:#071017ed;display:flex;align-items:center;justify-content:center;padding:14px';
  const card=document.createElement('section');card.style.cssText='width:min(520px,96vw);max-height:85vh;overflow:auto;background:#172c35;border:1px solid #e4c77c;border-radius:14px;padding:16px;color:#f3f6ed';
  const h=document.createElement('h2');h.textContent=title;h.style.margin='0 0 5px';const p=document.createElement('p');p.textContent=description;p.style.cssText='color:#c2d0cc;font-size:12px';const list=document.createElement('div');list.style.cssText='display:grid;gap:7px';
  for(const t of targets){const b=document.createElement('button');b.type='button';b.textContent=t.label;b.style.cssText='padding:11px;border-radius:9px;border:1px solid #55716f;background:#203a40;color:#fff;text-align:left;font-weight:800';b.addEventListener('click',()=>{onChoose(t.actor);root.remove();});list.append(b);}
  const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Cancelar';cancel.style.cssText='margin-top:10px;padding:8px 12px;border-radius:8px;background:#31424a;color:#fff;border:1px solid #61747a';cancel.addEventListener('click',()=>root.remove());
  card.append(h,p,list,cancel);root.append(card);document.body.append(root);
 }
 function allCharacters(){const s=state();if(!s)return [];return [{actor:s.player,label:'Você'},...(s.aiCompanions||[]).map(a=>({actor:a,label:a.name||'Sobrevivente aliado'})),...(s.recruitedSurvivors||[]).map(a=>({actor:a,label:a.name||'Sobrevivente recrutado'})),...(s.remotePlayers||[]).map(a=>({actor:a,label:a.name||'Jogador'}))].filter(v=>v.actor);}
 function scanBuildings(mode){
  const s=state();if(!s)return 0;
  const current=bridge.getFn('findCurrentBuilding')?.()||s.currentBuilding||null,buildings=mode==='current'?(current?[current]:[]):(s.outsideMap?.buildings||[]);
  let count=0;
  for(const b of buildings){b.v23Scanned=true;for(const f of b.floors||[])for(const item of f.loot||[]){item.v23Revealed=true;count++;}for(const item of b.loot||[]){item.v23Revealed=true;count++;}}
  if(s.mode==='interior')for(const item of bridge.getFn('currentBuildingFloor')?.()?.loot||[]){item.v23Revealed=true;count++;}
  s.v23ScanUntil=Date.now()+30000;return count;
 }
 function customAbility(id){
  const s=state(),p=s?.player;if(!s?.gameStarted||!p||['title','prologue','gameover','win'].includes(s.mode)){notify('A habilidade fica disponível depois de chegar ao abrigo.');return false;}
  if(Number(p.v20AbilityReadyAt)>Date.now()){notify('Recarga: '+Math.ceil((p.v20AbilityReadyAt-Date.now())/1000)+'s.');return false;}
  const enemies=['scavenge','interior'].includes(s.mode)?(s.exploreMonsters||[]):(s.enemies||[]);
  if(id==='medic'){
   openChooser('Vacina · escolher personagem','O alvo recebe 60% de redução do dano por 15 segundos.',allCharacters().map(v=>({actor:v.actor,label:v.label+' · '+Math.round(100*(v.actor.hp||0)/(v.actor.maxHp||100))+'% de vida'})),target=>{target.v23VaccineUntil=Date.now()+15000;setCooldown(60000);notify('Vacina aplicada por 15 segundos.');bridge.getFn('saveGame')?.(false);});
   return true;
  }
  if(id==='explorer'){
   const root=document.createElement('div');root.style.cssText='position:fixed;inset:0;z-index:950;background:#071017ed;display:flex;align-items:center;justify-content:center;padding:14px';const box=document.createElement('section');box.style.cssText='width:min(470px,96vw);background:#172c35;border:1px solid #8de0c0;border-radius:14px;padding:16px;color:#f3f6ed';const h=document.createElement('h2');h.textContent='Coleta Seletiva';const p=document.createElement('p');p.textContent='Escolha o alcance da busca por itens.';box.append(h,p);
   for(const [mode,label] of [['current','Esta estrutura'],['all','Todas as estruturas descobertas']]){const b=document.createElement('button');b.textContent=label;b.style.cssText='display:block;width:100%;margin:7px 0;padding:12px;border-radius:9px;background:#24453e;color:#fff;border:1px solid #8de0c0';b.onclick=()=>{const n=scanBuildings(mode);setCooldown(skillCooldown(id));notify('Busca concluída: '+n+' itens revelados.');bridge.getFn('saveGame')?.(false);root.remove();};box.append(b);}
   const cancel=document.createElement('button');cancel.textContent='Cancelar';cancel.onclick=()=>root.remove();box.append(cancel);root.append(box);document.body.append(root);return true;
  }
  if(id==='rescuer'){
   p.v23EmergencyUntil=Date.now()+2000;p.v23ProcedureSuccess=.8;
   for(const a of s.aiCompanions||[]){if(a.hp<=0){a.hp=Math.round((a.maxHp||110)*.7);a.respawnTimer=0;a.invuln=2;}else a.hp=Math.min(a.maxHp||100,a.hp+40);}
   for(const a of s.recruitedSurvivors||[])if(a.hp<=0){a.hp=Math.round((a.maxHp||100)*.65);a.respawnTimer=0;a.invuln=2;}
   for(const a of s.remotePlayers||[])if(a.hp<=0){a.hp=Math.round((a.maxHp||100)*.65);a.invuln=2;}
   setCooldown(50000);notify('Estado de Emergência: 80% de acerto por 2 segundos.');
  } else if(id==='scout'){
   for(const e of enemies)if(Math.hypot(e.x-p.x,e.y-p.y)<180){e.hp-=Math.round(90*(window.__OITO_V20_CONFIG__?.().abilityPower||1));e.flash=.35;}
   s.v20RevealUntil=Date.now()+18000;setCooldown(38000);notify('Golpe Tático executado.');
  } else if(id==='watchman'){p.v23DamageBoostUntil=Date.now()+5000;setCooldown(60000);notify('Defesa Imbatível: +50% de dano por 5 segundos.');}
  else if(id==='hunter'){p.v23CamouflageUntil=Date.now()+12000;p.huntingMode=true;setCooldown(55000);notify('Camuflagem ativada. Modo de caça ligado.');}
  else if(id==='locksmith'){const near=bridge.getFn('findNearbyObject')?.(),door=near?.kind==='building'?near.obj:null;if(!door){notify('Aproxime-se de uma porta trancada.');return false;}door.locked=false;door.lockUnlocked=true;door.doorOpen=true;setCooldown(45000);notify('Fechadura destrancada.');}
  else if(id==='engineer'){for(const b of s.builds||[])b.hp=Math.min(b.maxHp||200,(b.hp||0)+45);if(s.case)s.case.hp=Math.min(s.case.maxHp||100,s.case.hp+25);setCooldown(55000);notify('Reparação de campo concluída.');}
  else if(id==='mechanic'){for(const b of s.builds||[])if((b.hp||0)<(b.maxHp||0))b.hp=Math.min(b.maxHp||100,b.hp+80);p.v23VehicleUpgradeLevel=Math.min(3,(p.v23VehicleUpgradeLevel||0)+1);setCooldown(55000);notify('Solda concluída. Nível de melhoria do veículo: '+p.v23VehicleUpgradeLevel+'/3.');}
  else if(id==='carpenter'){const b=(s.builds||[]).filter(v=>['barricade','wall','reinforcedGate','wallSegment'].includes(v.type)).sort((a,b)=>(a.hp||0)-(b.hp||0))[0];if(b)b.hp=Math.min(b.maxHp||200,(b.hp||0)+95);else s.wood=Math.min(999,(s.wood||0)+6);setCooldown(48000);notify('Reforço de madeira aplicado.');}
  else if(id==='farmer'){s.food=Math.min(99,(s.food||0)+8);s.hunger=Math.min(100,(s.hunger||0)+12);for(const farm of s.builds||[])if(farm.type==='farm')farm.v23GrowthBoostUntil=Date.now()+60000;setCooldown(65000);notify('Reserva agrícola preparada; hortas receberam impulso temporário.');}
  else if(id==='scientist'){s.v20CureResearch=Math.min(100,(s.v20CureResearch||0)+28);if(p.infection){p.infection.progress=Math.min(100,(p.infection.progress||0)+30);if(p.infection.progress>=100)p.infection=null;}setCooldown(70000);notify('Pesquisa científica acelerada.');}
  else if(id==='mason'){for(const b of s.builds||[])if(['wall','reinforcedGate','barricade','wallSegment'].includes(b.type))b.hp=Math.min(b.maxHp||200,(b.hp||0)+75);setCooldown(55000);notify('Alvenaria reforçada.');}
  else if(id==='citizen'){p.hp=Math.min(p.maxHp||100,p.hp+24);p.stamina=p.maxStamina;setCooldown(55000);notify('Improviso de sobrevivência concluído.');}
  else if(id==='cartographer'){s.v23MapRecorded=Array.from(new Set([...(s.v23MapRecorded||[]),String(s.outsideSectorX||0)+','+String(s.outsideSectorY||0)]));s.v23MapRevealUntil=Date.now()+60000;setCooldown(65000);notify('Setor registrado no mapa.');}
  else if(id==='navigator'){p.v23NavigationUntil=Date.now()+30000;p.v23BoatSafety=1;s.fuel=Math.min(999,(s.fuel||0)+8);setCooldown(65000);notify('Equipamento de navegação preparado para travessias.');}
  else if(id==='commander'){p.v23RallyUntil=Date.now()+15000;for(const a of [...(s.aiCompanions||[]),...(s.recruitedSurvivors||[])]){a.v23RallyUntil=Date.now()+15000;a.hp=Math.min(a.maxHp||100,(a.hp||0)+22);}setCooldown(75000);notify('Comando tático: equipe reunida.');}
  else if(id==='mayor'){s.v23CityServiceUntil=Date.now()+60000;s.scrap=Math.min(9999,(s.scrap||0)+5);s.food=Math.min(99,(s.food||0)+4);setCooldown(90000);notify('Serviços municipais ativados.');}
  else if(id==='tourist'){s.v23ScanUntil=Date.now()+30000;for(const n of s.outsideMap?.gatherNodes||[])n.v23Revealed=true;for(const b of s.outsideMap?.buildings||[])b.v23Scanned=true;setCooldown(60000);notify('Pontos de interesse registrados.');}
  else if(id==='cook'){p.v23FieldKitchenUntil=Date.now()+90000;s.tools=s.tools||{};s.tools.cookingPot=1;setCooldown(60000);notify('Cozinha portátil preparada.');}
  else if(id==='hybrid'){p.v23InvisibleUntil=Date.now()+10000;p.v23SpeedUntil=Date.now()+10000;setCooldown(70000);}
  else if(id==='hybrid_vampire'){p.v23InvisibleUntil=Date.now()+12000;p.v23SpeedUntil=Date.now()+14000;p.v23NightVisionUntil=Date.now()+30000;setCooldown(75000);}
  else if(id==='hybrid_werewolf'){p.v23ClawsUntil=Date.now()+14000;p.v23SpeedUntil=Date.now()+14000;p.v23NightVisionUntil=Date.now()+30000;setCooldown(75000);}
  else return null;
  bridge.getFn('updateUI')?.();bridge.getFn('saveGame')?.(false);return true;
 }
 function abilityEvent(ev){
  const click=ev.type==='click'&&ev.target.closest?.('#v20ClassAbility');
  const key=ev.type==='keydown'&&ev.code==='KeyQ'&&!ev.repeat&&!ev.target.closest?.('input,textarea,select,button');
  if(!click&&!key)return;
  const handled=customAbility(selected());
  if(handled===null)return;
  ev.preventDefault();ev.stopPropagation();ev.stopImmediatePropagation();
 }
 window.addEventListener('click',abilityEvent,true);
 window.addEventListener('keydown',abilityEvent,true);
 // Preserve every previous bonus and layer in only the new status effects.
 bridge.wrap('damagePlayer',old=>function(d){const p=state()?.player;if(p?.v23VaccineUntil>Date.now())d*=.4;return old(d);});
 // The Rescuer retains 90% of the Medic's existing treatment benefit.
 bridge.wrap('useMedicine',old=>function(){const s=state(),p=s?.player;if(selected()==='rescuer'&&s?.medicine>0&&p&&p.hp<p.maxHp){s.medicine--;const amount=Math.min(48,p.maxHp-p.hp);p.hp+=amount;notify('Atendimento do Socorrista: +'+amount+' de vida.');bridge.getFn('updateUI')?.();bridge.getFn('saveGame')?.(false);return;}return old();});
 bridge.wrap('damageCompanion',old=>function(a,d){if(a?.v23VaccineUntil>Date.now())d*=.4;return old(a,d);});
 bridge.wrap('weaponDamage',old=>function(){let d=old(),s=state(),id=selected();if(s?.player?.v23DamageBoostUntil>Date.now())d*=1.5;if(id==='scout'||id==='watchman')d*=1.1;if(id==='hybrid_werewolf'&&s?.player?.v23ClawsUntil>Date.now())d*=1.35;if(id==='hybrid_vampire')d*=1.08;if(id==='commander'&&s?.player?.v23RallyUntil>Date.now())d*=1.12;return Math.round(d);});
 bridge.wrap('movePlayer',old=>function(dt){const p=state()?.player;if(!p)return old(dt);const speed=p.speed;let m=1;if(selected()==='rescuer')m*=1.12;if(selected()==='hunter')m*=1.08;if(['hybrid','hybrid_vampire','hybrid_werewolf'].includes(selected()))m*=1.18;if(p.v23SpeedUntil>Date.now())m*=1.35;if(selected()==='hybrid_werewolf'&&p.v23ClawsUntil>Date.now())m*=1.2;p.speed=speed*m;try{return old(dt);}finally{p.speed=speed;}});
 bridge.wrap('v16Capacity',old=>function(){return old()*(selected()==='explorer'?2:1);});
 // Mechanic upgrades the selected vehicle's travel speed using the Welding skill.
 bridge.wrap('getVehicle',old=>function(id){const v=old(id),p=state()?.player,level=selected()==='mechanic'?(p?.v23VehicleUpgradeLevel||0):0;return level?{...v,speed:Math.round(v.speed*(1+level*.08))}:v;});
 bridge.wrap('puzzleSettings',old=>function(){const r={...old()},id=selected(),p=state()?.player;if(id==='medic'){r.window=Math.min(.55,r.window*1.2);r.speed*=.8;}if(id==='rescuer'){r.window=Math.min(.62,r.window*1.5);r.speed*=.5;r.rounds=Math.max(1,r.rounds-1);}if(p?.v23EmergencyUntil>Date.now()){r.window=Math.min(.7,r.window*1.8);r.speed*=.2;}return r;});
 bridge.wrap('freshState',old=>function(){const s=old(),id=s.player?.classId||selected();s.tools=s.tools||{};s.player.ownedWeapons=s.player.ownedWeapons||['club'];
  if(id==='medic'){s.tools.medkit=1;s.medicine=Math.max(1,Number(s.medicine)||0);s.player.v23MedicalErrorChance=.5;}
  if(id==='rescuer'){s.player.v23MedicalErrorChance=.6;s.player.v23MedicalSkill=.9;}
  if(id==='explorer'){s.tools.compass=1;s.tools.locator=1;s.tools.map=Math.max(1,Number(s.tools.map)||0);s.player.v23CarryMultiplier=2;}
  if(id==='scout'){s.player.ownedVehicles=s.player.ownedVehicles||[];if(!s.player.ownedVehicles.includes('policeBike'))s.player.ownedVehicles.push('policeBike');s.player.vehicleId='policeBike';}
  if(id==='engineer'){s.hasKnowledgeBook=true;s.benchTier=8;s.tools.engineeringBench=1;}
  if(id==='carpenter'){s.benchTier=Math.max(2,s.benchTier||1);s.tools.carpentryBench=1;}
  if(id==='mechanic'){s.benchTier=Math.max(2,s.benchTier||1);s.tools.mechanicsBench=1;}
  if(id==='farmer'){s.tools.axe=Math.max(1,Number(s.tools.axe)||0);s.tools.seeds=Math.max(1,Number(s.tools.seeds)||0);s.tools.farmingMachete=1;s.tools.pelletRifle=1;s.player.ownedWeapons.push('farmer_pellet_rifle');}
  if(id==='hunter'){s.player.ownedWeapons.push('hunter_rifle');s.player.weaponId='hunter_rifle';s.player.huntingMode=false;}
  if(id==='watchman')s.tools.flashlight=1;
  if(id==='cook'){s.tools.cookingPot=1;s.player.hasCookingPot=true;}
  if(id==='locksmith')s.tools.lockpickKit=Math.max(1,Number(s.tools.lockpickKit)||0);
  if(id==='cartographer'||id==='navigator')s.tools.compass=Math.max(1,Number(s.tools.compass)||0);
  if(id==='navigator')s.tools.boatKit=1;
  return s;});
 // Farmer's crops grow faster and yield 25% more food when a harvest succeeds.
 bridge.wrap('advanceNight',old=>function(...args){
  const s=state(),farmer=selected()==='farmer',beforeFood=Number(s?.food)||0;
  if(farmer)for(const farm of s?.builds||[])if(farm.type==='farm'&&farm.watered)farm.growth=(farm.growth||0)+1;
  const result=old(...args);
  if(farmer&&s){const harvested=Math.max(0,(Number(s.food)||0)-beforeFood);if(harvested>0)s.food=Math.min(99,(Number(s.food)||0)+Math.ceil(harvested*.25));}
  return result;
 });
 // Mechanic receives a 30% price reduction on vehicles in the vehicle selection panel.
 const vehicleBasePrices=new Map();
 bridge.wrap('renderVehicles',old=>function(...args){
  const vehicles=bridge.getVehicles(),mechanic=selected()==='mechanic';
  for(const v of vehicles){if(!vehicleBasePrices.has(v.id))vehicleBasePrices.set(v.id,Number(v.cost)||0);const base=vehicleBasePrices.get(v.id);v.cost=mechanic?Math.ceil(base*.7):base;}
  return old(...args);
 });
 // Class-exclusive weapon definitions.
 const weaponDefs=[
  {id:'soldier_exclusive',name:'Fuzil de Combate',kind:'ranged',cost:999999,damage:35,cooldown:.36,range:720,description:'Arma exclusiva do Soldado · achado raro',speed:760,pellets:1,spread:.02,classOnly:true},
  {id:'police_exclusive',name:'Carabina Policial',kind:'ranged',cost:999999,damage:29,cooldown:.3,range:670,description:'Arma exclusiva do Batedor policial · achado raro',speed:730,pellets:1,spread:.03,classOnly:true},
  {id:'security_exclusive',name:'Bastão de Segurança',kind:'melee',cost:999999,damage:31,cooldown:.48,range:68,description:'Equipamento exclusivo da Segurança · achado raro',speed:0,pellets:1,spread:0,classOnly:true},
  {id:'hunter_rifle',name:'Rifle de Caça',kind:'ranged',cost:999999,damage:43,cooldown:.62,range:850,description:'Rifle especial do Caçador',speed:880,pellets:1,spread:0,classOnly:true},
  {id:'farmer_pellet_rifle',name:'Rifle de Pressão',kind:'ranged',cost:999999,damage:12,cooldown:.7,range:390,description:'Equipamento do Agricultor',speed:520,pellets:1,spread:.06,classOnly:true}
 ];
 const weapons=bridge.getWeapons();for(const w of weaponDefs)if(!weapons.some(x=>x.id===w.id))weapons.push(w);
 const vehicles=bridge.getVehicles();if(!vehicles.some(v=>v.id==='policeBike'))vehicles.push({id:'policeBike',name:'Moto policial',cost:999999,speed:260,description:'Motocicleta exclusiva do Batedor policial.'});
 function grantWeapon(id){const s=state(),p=s?.player;if(!p)return false;p.ownedWeapons=p.ownedWeapons||['club'];if(p.ownedWeapons.includes(id))return false;p.ownedWeapons.push(id);p.weaponId=id;const w=weaponDefs.find(v=>v.id===id);notify((w?.name||id)+' encontrada!');bridge.getFn('renderArsenal')?.();bridge.getFn('updateUI')?.();bridge.getFn('saveGame')?.(false);return true;}
 bridge.wrap('enterBuilding',old=>function(b){const r=old(b),s=state(),id=selected(),label=String(b?.title||b?.name||b?.type||'').toLowerCase(),mil=/milit|base|aeroporto|heliponto/.test(label),pol=/pol[ií]cia|police|delegacia|posto policial/.test(label),key=String(b?.id||label);if(s&&s.mode==='interior'&&s.currentBuildingId===b?.id){s.v23WeaponLootSites=s.v23WeaponLootSites||[];if(!s.v23WeaponLootSites.includes(key)){let chance=0,weapon='';if(mil){if(id==='soldier'){chance=.1;weapon='soldier_exclusive';}else if(id==='scout'){chance=.5;weapon=Math.random()<.5?'police_exclusive':'soldier_exclusive';}else if(id==='watchman'){chance=.5;weapon=Math.random()<.5?'security_exclusive':'police_exclusive';}}else if(pol){chance=.1;if(id==='scout')weapon='police_exclusive';else if(id==='watchman')weapon='security_exclusive';else if(id==='soldier')weapon='soldier_exclusive';}if(weapon){s.v23WeaponLootSites.push(key);if(Math.random()<chance)grantWeapon(weapon);}}}return r;});
 // Item/material discount at construction time, without mutating shared class recipes.
 bridge.wrap('placeBuild',old=>function(...args){
  const s=state(),id=selected(),buildId=bridge.getSelectedBuild?.(),costs=API.buildCost?.(buildId)||{},before={};
  for(const key of Object.keys(costs))before[key]=Number(s?.[key])||0;
  const count=s?.builds?.length||0,result=old(...args);
  if(s&&(s.builds?.length||0)>count){
   const current=String(s.builds[s.builds.length-1]?.type||'').toLowerCase();
   const eligible=id==='engineer'||(id==='carpenter'&&/wood|wall|shelter|farm|greenhouse|barricade/.test(current))||(id==='mechanic'&&/generator|radio|lamp|turret|garage|vehicle/.test(current))||(id==='mason'&&/wall|brick|stone|mortar|gate|reinforced/.test(current));
   if(eligible)for(const key of Object.keys(before)){const used=Math.max(0,before[key]-(Number(s[key])||0));if(used>0)s[key]=Math.min(99999,(Number(s[key])||0)+Math.floor(used*.3));}
  }
  return result;
 });
 // Apply the editor's weapon statistics to the actual equipped weapon as well as its art.
 bridge.wrap('getWeapon',old=>function(id){const base=old(id),override=bridge.getEditorConfig()?.weaponOverrides?.[id];return override?{...base,...override,id:base.id}:base;});
 // Pixel weapon icon drawn in hand at the class + animation-pose offset configured in the editor.
 const imageCache=new Map();function getImage(url){let img=imageCache.get(url);if(!img){img=new Image();img.src=url;imageCache.set(url,img);}return img;}
 bridge.wrap('drawPlayer',old=>function(){const s=state(),p=s?.player;if(p&&((selected()==='hunter'&&p.v23CamouflageUntil>Date.now())||(['hybrid','hybrid_vampire'].includes(selected())&&p.v23InvisibleUntil>Date.now())))return;const result=old();if(!p)return result;const cfg=bridge.getEditorConfig(),w=bridge.getFn('getWeapon')?.(p.weaponId),url=cfg?.weaponOverrides?.[w?.id]?.iconImage;if(!url)return result;const img=getImage(url);if(!img.complete||!img.naturalWidth)return result;const id=selected(),pose=p.attackUntil>performance.now()?'attack':(Math.abs(p.vx||0)+Math.abs(p.vy||0)>.2?'walk':'idle'),rig=cfg?.universalRig?.itemOffsets?.[id]?.[w?.id]?.[pose]||cfg?.universalRig?.itemOffsets?.[id]?.[w?.id]?.idle||cfg?.universalRig?.classOffsets?.[id]?.[pose]||cfg?.universalRig?.classOffsets?.[id]?.idle||{},ctx=bridge.getCanvasContext(),x=Number(rig.x??13),y=Number(rig.y??-10),scale=Math.max(.35,Math.min(2.5,Number(rig.scale)||.75)),angle=(Number(rig.angle)||0)*Math.PI/180;if(!ctx)return result;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Number(p.attackAngle)||0);ctx.translate(x,y);ctx.rotate(angle);ctx.imageSmoothingEnabled=false;ctx.drawImage(img,-16*scale,-16*scale,32*scale,32*scale);ctx.restore();return result;});
 // Rescue pointers: only your AI companions/recruited survivors, and actual teammates.
 const rescue=document.createElement('div');rescue.id='v23RescueDirections';rescue.style.cssText='position:fixed;left:12px;top:118px;z-index:50;max-width:min(340px,82vw);padding:8px 10px;border:1px solid #e7c67c;border-radius:9px;background:#091820dc;color:#fff0c9;font:700 11px system-ui;pointer-events:none;display:none';document.body.append(rescue);
 function refreshRescue(){const s=state(),p=s?.player;if(selected()!=='rescuer'||!s?.gameStarted||!p){rescue.style.display='none';return;}const people=[...(s.aiCompanions||[]),...(s.recruitedSurvivors||[]),...(s.remotePlayers||[])].filter(a=>a&&a!==p&&a.hp>0&&a.hp/(a.maxHp||100)<=.3);if(!people.length){rescue.style.display='none';return;}rescue.style.display='block';rescue.textContent=people.map(a=>{const dx=(a.x||0)-(p.x||0),dy=(a.y||0)-(p.y||0),dir=Math.abs(dx)>Math.abs(dy)?(dx>0?'→':'←'):(dy>0?'↓':'↑');return dir+' '+(a.name||'Aliado')+' · '+Math.round(100*a.hp/(a.maxHp||100))+'%';}).join('  |  ');}
 bridge.wrap('update',old=>function(dt){const r=old(dt),s=state(),p=s?.player,id=selected();if(p){p.v23MedicalErrorChance=id==='medic'?.5:id==='rescuer'?.6:.8;if(p.v23EmergencyUntil>Date.now())p.v23ProcedureSuccess=.8;if(id==='rescuer')refreshRescue();else rescue.style.display='none';const cfg=bridge.getEditorConfig(),weapons=bridge.getWeapons();for(const w of weapons){const o=cfg?.weaponOverrides?.[w.id];if(o)Object.assign(w,o,{id:w.id});}}return r;});
 // Lantern toggle for Segurança (L key). The glow is drawn over the world canvas.
 document.addEventListener('keydown',ev=>{if(ev.code==='KeyL'&&!ev.repeat&&!ev.target.closest?.('input,textarea,select')){if(selected()!=='watchman')return;const p=state()?.player;if(!p)return;p.v23LanternOn=!p.v23LanternOn;notify(p.v23LanternOn?'Lanterna ligada.':'Lanterna desligada.');}},true);
 bridge.wrap('render',old=>function(){const result=old(),p=state()?.player,ctx=bridge.getCanvasContext();if(p?.v23LanternOn&&selected()==='watchman'&&ctx){ctx.save();const grad=ctx.createRadialGradient(p.x,p.y,12,p.x,p.y,230);grad.addColorStop(0,'#fff2b522');grad.addColorStop(1,'#fff2b500');ctx.fillStyle=grad;ctx.fillRect(p.x-230,p.y-230,460,460);ctx.restore();}const b=$('v20ClassAbility'),sk=skills[selected()];if(b&&sk){const title=b.querySelector('.v20-skill-copy b'),sub=b.querySelector('.v20-skill-copy small');if(title)title.textContent=sk.name;if(sub)sub.textContent=sk.description;}return result;});
 window.__OITO_V23_RULES__={medic:{medicalError:.5,vaccineDamageReduction:.6,vaccineSeconds:15,cooldown:60,puzzleEase:.2},rescuer:{medicalError:.6,medicalSkill:.9,emergencyAccuracy:.8,emergencySeconds:2,cooldown:50,puzzleEase:.5},soldier:{rareWeaponChance:.1},police:{policePostChance:.1,militaryBaseChance:.5},watchman:{damageBonus:.5,damageSeconds:5,cooldown:60},classes:ids};
 console.info('[Oito Entradas] v23.0: classes adicionais e especializações carregadas.');
})();