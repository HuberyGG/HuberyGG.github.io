(() => {
'use strict';
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const data=window.PORTFOLIO;
const canvas=$('#world'),ctx=canvas.getContext('2d'),view=$('#play');
const dialog=$('#detail-dialog');
let W=0,H=0,dpr=1,camera=0,current=0,coinsTaken=0,gameMode=true,paused=false,active=true,lastTime=0,elapsed=0,toastTimer,detailOpener=null;
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const keys=new Set(),visited=new Set([0]);
const worldWidth=5300,stationX=[440,1490,2540,3590,4640];
const player={x:350,y:0,vx:0,vy:0,w:25,h:39,grounded:false,face:1};
const coins=[],sparks=[];let platforms=[],floor=0;
for(let s=0;s<5;s++){for(let c=0;c<4;c++)coins.push({x:stationX[s]+120+c*130,level:c===1||c===2?1:0,taken:false,phase:(s*4+c)*.8});}
function resize(){W=view.clientWidth;H=view.clientHeight;dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);floor=H-(W<=800?235:202);platforms=[];for(let i=0;i<5;i++){platforms.push({x:stationX[i]+212,y:floor-77,w:185});}player.y=Math.min(player.y||floor-player.h,floor-player.h);camera=clamp(player.x-W*.57,0,worldWidth-W);}
function clamp(v,a,b){return Math.max(a,Math.min(Math.max(a,b),v));}
function toast(text){$('#game-toast').textContent=text;$('#game-toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#game-toast').classList.remove('show'),3200);}
function station(n,teleport=false){
 if(teleport){player.x=stationX[n]-80;player.y=floor-player.h;player.vx=0;player.vy=0;camera=clamp(player.x-W*.57,0,worldWidth-W);keys.clear();}
 const changed=current!==n;current=n;visited.add(n);$('#player-profile').hidden=n!==0;const d=data.stations[n];
 $('#station-eyebrow').textContent=d.eye;$('#station-title').innerHTML=d.title;$('#station-subtitle').textContent=d.subtitle;$('#station-description').innerHTML=d.description;$('#station-tags').innerHTML=d.tags.map(t=>`<span>${t}</span>`).join('');$('#story-action').innerHTML=`${d.action}<span aria-hidden="true">[ E ]</span>`;$('#story-panel').classList.toggle('compact',n!==0);
 $$('[data-station]').forEach((b,i)=>{b.classList.toggle('active',i===n);b.classList.toggle('visited',visited.has(i));if(i===n)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 $('#visited-count').textContent=`EXPLORED ${String(visited.size).padStart(2,'0')} / 05`;
 if(changed&&!teleport)toast(`${String(n+1).padStart(2,'0')} · ${['关于我','人机交互实验室','语音与 AI 实验室','游戏工作室','保持联系'][n]}`);
}
function detail(id){const d=data.details[id];if(!d)return;keys.clear();detailOpener=document.activeElement;$('#detail-eyebrow').textContent=d.eye;$('#detail-body').innerHTML=`${id==='about'?'<img class="detail-photo" src="assets/hubery.jpg" alt="朱果 Hubery 的个人照片" width="100" height="100">':''}<h2 id="detail-title">${d.title}</h2>${d.html}`;dialog.showModal();$('#close-dialog').focus();}
function closeDetail(){dialog.close();if(detailOpener?.isConnected)detailOpener.focus();}
$('#close-dialog').onclick=closeDetail;$('#continue-game').onclick=closeDetail;
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDetail();}});
dialog.addEventListener('close',()=>{keys.clear();lastTime=0;});
$('#story-action').onclick=()=>detail(data.stations[current].detail);
$$('[data-station]').forEach(b=>b.onclick=()=>station(Number(b.dataset.station),true));
function toggleMode(mode,focus=true){gameMode=mode;$('#play').hidden=!mode;$('#resume').hidden=mode;$('#mode-label').textContent=mode?'一键看简历':'回到游戏';keys.clear();if(mode){resize();if(focus)canvas.focus({preventScroll:true});}else if(focus){$('#resume').focus({preventScroll:true});}window.scrollTo(0,0);}
$('#mode-toggle').onclick=()=>{location.hash=gameMode?'resume':'play';};
$('#skip-link').onclick=()=>toggleMode(false);
addEventListener('hashchange',()=>toggleMode(location.hash!=='#resume'));

$('#resume-content').addEventListener('click',async e=>{const d=e.target.closest('[data-detail]');if(d)detail(d.dataset.detail);const b=e.target.closest('[data-copy]');if(b){try{await navigator.clipboard.writeText(b.dataset.copy);b.textContent='已复制';setTimeout(()=>b.textContent='复制邮箱',2200);}catch{b.textContent='请选中邮箱复制';}}});
function jump(){if(player.grounded&&!paused&&!dialog.open){player.vy=-530;player.grounded=false;}}
function isGameKey(k){return ['ArrowLeft','ArrowRight','ArrowUp',' ','a','d','w','e','A','D','W','E'].includes(k);}
addEventListener('keydown',e=>{if(!gameMode||dialog.open||e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t instanceof HTMLElement&&t.matches('input,textarea,select'))return;if(t instanceof HTMLElement&&t.closest('button,a')&&(e.key===' '||e.key==='Enter'))return;if(isGameKey(e.key)){e.preventDefault();if(!e.repeat){if([' ','ArrowUp','w','W'].includes(e.key))jump();if(['e','E'].includes(e.key))detail(data.stations[current].detail);}keys.add(e.key.toLowerCase());}});
addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));addEventListener('blur',()=>keys.clear());
document.addEventListener('visibilitychange',()=>{active=!document.hidden;keys.clear();lastTime=0;});
$$('[data-control]').forEach(b=>{const k=b.dataset.control==='left'?'arrowleft':'arrowright';b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);if(b.dataset.control==='jump')jump();else keys.add(k);});if(b.dataset.control!=='jump')for(const type of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(type,()=>keys.delete(k));});
$('#pause-game').onclick=()=>{paused=!paused;keys.clear();$('#pause-game').textContent=paused?'继续':'暂停';$('#pause-game').setAttribute('aria-label',paused?'继续游戏':'暂停游戏');if(paused)toast('探索已暂停，仍可查看经历与简历');};
$('#restart').onclick=()=>{coins.forEach(c=>c.taken=false);coinsTaken=0;$('#coin-count').textContent='00';visited.clear();station(0,true);paused=false;$('#pause-game').textContent='暂停';$('#pause-game').setAttribute('aria-label','暂停游戏');toast('新的旅程，出发！');};
$('#coin-total').textContent=String(coins.length);
function tick(dt){elapsed+=dt;let direction=(keys.has('arrowright')||keys.has('d')?1:0)-(keys.has('arrowleft')||keys.has('a')?1:0);player.vx=direction*265;if(direction)player.face=direction;const oldBottom=player.y+player.h;player.x=clamp(player.x+player.vx*dt,30,worldWidth-80);player.vy+=1400*dt;player.y+=player.vy*dt;player.grounded=false;
 if(player.y+player.h>=floor){player.y=floor-player.h;player.vy=0;player.grounded=true;}
 for(const p of platforms)if(player.vy>=0&&oldBottom<=p.y+2&&player.y+player.h>=p.y&&player.x+player.w>p.x&&player.x<p.x+p.w){player.y=p.y-player.h;player.vy=0;player.grounded=true;}
 const nearest=clamp(Math.round((player.x-440)/1050),0,4);if(nearest!==current)station(nearest);
 const target=clamp(player.x-W*(W<=800?.48:.60),0,worldWidth-W);camera+= (target-camera)*Math.min(1,dt*7);
 for(const c of coins){const cy=floor-(c.level?113:39);if(!c.taken&&Math.abs(player.x+player.w/2-c.x)<28&&Math.abs(player.y+player.h/2-cy)<33){c.taken=true;coinsTaken++;$('#coin-count').textContent=String(coinsTaken).padStart(2,'0');if(!reduceMotion)for(let k=0;k<8;k++)sparks.push({x:c.x,y:cy,vx:Math.cos(k)*65,vy:Math.sin(k)*65,life:.55});if(coinsTaken===1)toast('灵感 +1 · 沿途的站点里，藏着我的经历');if(coinsTaken===coins.length)toast('20 / 20 灵感收集完成 · 谢谢探索，期待与你一起创造！');}}
 for(let i=sparks.length-1;i>=0;i--){let p=sparks[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;if(p.life<=0)sparks.splice(i,1);}
}
function rect(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),w,h);}
function draw(){ctx.clearRect(0,0,W,H);
 // The game geometry remains separate from the landscape artwork.
 const fade=ctx.createLinearGradient(0,0,W,0);fade.addColorStop(0,'#10151fd9');fade.addColorStop(W<=800?.68:.36,'#10151f91');fade.addColorStop(1,'#10151f00');ctx.fillStyle=fade;ctx.fillRect(0,0,W,floor-100);
 ctx.save();ctx.translate(-camera,0);
 // Ground, one-way jump platforms, and five interactive beacons.
 rect(camera,floor,W,H-floor,'#111f28');rect(camera,floor,W,3,'#729296');rect(camera,floor+3,W,12,'#263c43');
 for(let x=Math.floor(camera/48)*48;x<camera+W;x+=48){rect(x,floor+14,1,32,'#29404a');rect(x+13,floor+26,13,2,'#203640');}rect(camera,floor+48,W,1,'#29404a');
 for(let i=0;i<5;i++){const sx=stationX[i],color=data.stations[i].color;if(sx<camera-200||sx>camera+W+200)continue;
 const beaconY=floor-62;rect(sx-5,beaconY,10,62,'#435a65');rect(sx-21,beaconY-40,42,41,'#182a36');rect(sx-19,beaconY-38,38,35,color+'55');rect(sx-14,beaconY-33,28,24,'#1c3442');
 ctx.strokeStyle=color;ctx.lineWidth=1;ctx.strokeRect(sx-20.5,beaconY-39.5,41,39);ctx.font='500 11px "Space Grotesk", sans-serif';ctx.textAlign='center';ctx.fillStyle=color;ctx.fillText(String(i+1).padStart(2,'0'),sx,beaconY-16);
 rect(sx-29,floor-7,58,7,'#3a5961');ctx.font='500 10px "Space Grotesk", sans-serif';ctx.fillStyle=color;ctx.fillText(data.stations[i].label,sx,floor-125);
 if(i===current){ctx.globalAlpha=reduceMotion?.65:.55+Math.sin(elapsed*2)*.15;const glow=ctx.createRadialGradient(sx,floor-5,0,sx,floor-5,85);glow.addColorStop(0,color+'35');glow.addColorStop(1,color+'00');ctx.fillStyle=glow;ctx.fillRect(sx-85,floor-95,170,100);ctx.globalAlpha=1;}
 }
 for(const p of platforms){if(p.x+p.w<camera||p.x>camera+W)continue;rect(p.x,p.y,p.w,3,'#83adae');rect(p.x,p.y+3,p.w,12,'#2c444c');rect(p.x+7,p.y+15,p.w-14,3,'#14262f');for(let x=p.x+12;x<p.x+p.w-10;x+=24)rect(x,p.y+7,9,2,'#50737a');}
 for(const c of coins){if(c.taken||c.x<camera-20||c.x>camera+W+20)continue;let y=floor-(c.level?113:39)+(reduceMotion?0:Math.sin(elapsed*2+c.phase)*3);let width=reduceMotion?11:7+Math.abs(Math.cos(elapsed*1.5+c.phase))*5;rect(c.x-width/2-2,y-10,width+4,20,'#80692f');rect(c.x-width/2,y-11,width,20,'#eac66f');rect(c.x-width/2+2,y-7,2,11,'#fff0b7');}
 for(const p of sparks){ctx.globalAlpha=p.life/.55;rect(p.x,p.y,3,3,'#f4d987');}ctx.globalAlpha=1;
 const px=Math.round(player.x),py=Math.round(player.y),stride=player.grounded&&Math.abs(player.vx)>0&&!reduceMotion?Math.sin(elapsed*16)*3:0;
 // Original little explorer: a functional pixel sprite drawn on the game canvas.
 ctx.fillStyle='#0005';ctx.beginPath();ctx.ellipse(px+13,floor+3,23,5,0,0,Math.PI*2);ctx.fill();
 rect(px+1,py+16,23,16,'#c5e8c2');rect(px+5,py+2,18,19,'#daeed3');rect(px+2,py+5,24,13,'#daeed3');rect(px+(player.face>0?9:4),py+7,15,8,'#243c42');rect(px+(player.face>0?17:7),py+9,3,3,'#bdfa95');rect(px-3,py+19,6,12,'#758e81');rect(px+23,py+20,5,9,'#759287');rect(px+4,py+30,7,8+stride,'#a8bda9');rect(px+17,py+30,7,8-stride,'#a8bda9');rect(px+4,py+36+stride,8,3,'#728985');rect(px+17,py+36-stride,9,3,'#728985');rect(px+10,py-3,3,5,'#aacdba');rect(px+8,py-5,7,3,'#c1f99a');
 ctx.textAlign='center';ctx.font='9px "Space Grotesk",sans-serif';ctx.fillStyle='#d9e5d3';ctx.fillText('YOU',px+13,py-19);ctx.restore();
}
function loop(t){if(!lastTime)lastTime=t;const dt=Math.min((t-lastTime)/1000,.033);lastTime=t;if(gameMode&&active){if(!paused&&!dialog.open)tick(dt);draw();}requestAnimationFrame(loop);}
addEventListener('resize',()=>{if(gameMode)resize();});resize();player.x=stationX[0]-80;player.y=floor-player.h;station(0);toggleMode(location.hash!=='#resume',false);requestAnimationFrame(loop);
})();
