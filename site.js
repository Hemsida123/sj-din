'use strict';
const menu=document.querySelector('.mobile-menu'), menuButton=document.querySelector('.menu-toggle');
menuButton?.addEventListener('click',()=>{menu.showModal();menuButton.setAttribute('aria-expanded','true')});
document.querySelector('.menu-close')?.addEventListener('click',()=>menu.close());
menu?.addEventListener('close',()=>{menuButton.setAttribute('aria-expanded','false');menuButton.focus()});
const hero=document.querySelector('.hero');
if(hero){
 const slides=[...hero.querySelectorAll('.hero-slide')],dots=[...hero.querySelectorAll('[data-slide]')],pause=hero.querySelector('.slide-pause');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let current=0,paused=reduced.matches,timer;
 function show(i){current=(i+slides.length)%slides.length;slides.forEach((s,n)=>{s.classList.toggle('is-active',n===current);s.setAttribute('aria-hidden',String(n!==current));dots[n].classList.toggle('active',n===current);dots[n].setAttribute('aria-pressed',String(n===current))});const s=slides[current];document.querySelector('#hero-category').textContent=s.dataset.category;const a=document.querySelector('#hero-project-link');a.textContent=s.dataset.title+' ↗';a.href=s.dataset.href;}
 function schedule(){clearInterval(timer);if(!paused&&!document.hidden)timer=setInterval(()=>show(current+1),7500);hero.classList.toggle('paused',paused);pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Spela bildspelet':'Pausa bildspelet');pause.innerHTML='<span aria-hidden="true">'+(paused?'▶':'Ⅱ')+'</span>';}
 dots.forEach((b,i)=>b.addEventListener('click',()=>{show(i);paused=true;schedule()}));pause.addEventListener('click',()=>{paused=!paused;schedule()});document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>{paused=reduced.matches;schedule()});schedule();
}
const filters=[...document.querySelectorAll('[data-filter]')];
if(filters.length){
 const cards=[...document.querySelectorAll('.archive-grid [data-category]')];
 function filter(category,write=false){if(!filters.some(f=>f.dataset.filter===category))category='all';let count=0;cards.forEach(c=>{c.hidden=category!=='all'&&c.dataset.category!==category;if(!c.hidden)count++});filters.forEach(f=>{const active=f.dataset.filter===category;f.classList.toggle('active',active);f.setAttribute('aria-pressed',String(active))});document.querySelector('#filter-count').textContent=count+' projekt';if(write){const u=new URL(location.href);if(category==='all')u.searchParams.delete('kategori');else u.searchParams.set('kategori',category);history.pushState({},'',u)}}
 filters.forEach(f=>f.addEventListener('click',()=>filter(f.dataset.filter,true)));window.addEventListener('popstate',()=>filter(new URL(location.href).searchParams.get('kategori')||'all'));filter(new URL(location.href).searchParams.get('kategori')||'all');
}
const lightbox=document.querySelector('.lightbox');
if(lightbox){
 const buttons=[...document.querySelectorAll('.gallery-open')],image=lightbox.querySelector('img'),caption=lightbox.querySelector('figcaption');let index=0,lastButton;
 function show(i){index=(i+buttons.length)%buttons.length;const b=buttons[index];image.src=b.dataset.full;image.alt=b.dataset.caption;caption.textContent=(index+1)+' / '+buttons.length+' — '+b.dataset.caption+(b.dataset.credit?' · Foto: '+b.dataset.credit:'');}
 buttons.forEach((b,i)=>b.addEventListener('click',()=>{lastButton=b;show(i);lightbox.showModal()}));lightbox.querySelector('.lightbox-close').addEventListener('click',()=>lightbox.close());lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>show(index-1));lightbox.querySelector('.lightbox-next').addEventListener('click',()=>show(index+1));lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(index+1)}if(e.key==='ArrowLeft'){e.preventDefault();show(index-1)}});lightbox.addEventListener('close',()=>lastButton?.focus());if(buttons.length===1){lightbox.querySelector('.lightbox-prev').hidden=true;lightbox.querySelector('.lightbox-next').hidden=true;}
}
const form=document.querySelector('#inquiry-form');
if(form){
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const subject='Projektförfrågan: '+d.get('project');const body='Hej Susanna!\n\n'+d.get('message').trim()+'\n\nProjekt: '+d.get('project')+'\nPlats: '+(d.get('location').trim()||'Inte angivet')+'\n\nVänliga hälsningar\n'+d.get('name').trim()+'\n'+d.get('email').trim();document.querySelector('#mail-copy').value=body;document.querySelector('#mail-open').href='mailto:susanna@sjodinab.se?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);const result=document.querySelector('#mail-result');result.hidden=false;result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'center'});document.querySelector('#mail-open').focus({preventScroll:true});document.querySelector('#copy-status').textContent='';});
 document.querySelector('#copy-mail').addEventListener('click',async()=>{const area=document.querySelector('#mail-copy');try{await navigator.clipboard.writeText(area.value);document.querySelector('#copy-status').textContent='Texten är kopierad.'}catch{area.focus();area.select();document.querySelector('#copy-status').textContent='Texten är markerad. Kopiera med Ctrl+C eller ⌘C.'}});
}
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion:reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}})},{threshold:.08});document.querySelectorAll('.project-card,.drawing-board,.studio-portrait,.principles>div,.process-grid>div').forEach(el=>observer.observe(el));}
