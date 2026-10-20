(function(){
  // menu mobile
  var t=document.querySelector('.menu-toggle'),n=document.getElementById('nav');
  if(t&&n)t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)});

  // galeries : construites depuis la liste d'identifiants Wix
  function wurl(id,w,h,m){if(/^(https?:|\/|assets\/)/.test(id))return id;id=id.indexOf('http')===0||id.indexOf('_')===6&&id.indexOf('296fe6')===0?id:'296fe6_'+id;return 'https://static.wixstatic.com/media/'+id+'/v1/'+(m||'fill')+'/w_'+w+',h_'+h+',al_c,q_85,enc_auto/'+id}
  document.querySelectorAll('.gallery[data-ids]').forEach(function(g){
    g.dataset.ids.split(' ').forEach(function(id,k){var a=document.createElement('a');a.className='g-item';a.href=wurl(id,1800,1800,'fit');var im=new Image();im.src=wurl(id,640,480);im.alt=g.dataset.alt+' '+(k+1);im.loading='lazy';a.appendChild(im);g.appendChild(a)});
  });
  // galerie plein écran
  var lb=document.querySelector('.lightbox');
  if(lb){
    var img=lb.querySelector('img'),cnt=lb.querySelector('.lb-count'),list=[],i=0;
    function show(k){i=(k+list.length)%list.length;img.src=list[i].href;img.alt=list[i].querySelector('img').alt;cnt.textContent=(i+1)+' / '+list.length}
    document.querySelectorAll('.gallery').forEach(function(g){
      var items=[].slice.call(g.querySelectorAll('.g-item'));
      items.forEach(function(a,k){a.addEventListener('click',function(ev){ev.preventDefault();list=items;show(k);lb.hidden=false;document.body.style.overflow='hidden'})});
    });
    function close(){lb.hidden=true;img.src='';document.body.style.overflow=''}
    lb.querySelector('.lb-close').onclick=close;
    lb.querySelector('.lb-prev').onclick=function(){show(i-1)};
    lb.querySelector('.lb-next').onclick=function(){show(i+1)};
    lb.addEventListener('click',function(ev){if(ev.target===lb)close()});
    document.addEventListener('keydown',function(ev){if(lb.hidden)return;if(ev.key==='Escape')close();if(ev.key==='ArrowLeft')show(i-1);if(ev.key==='ArrowRight')show(i+1)});
  }

  // formulaire de demande → e-mail prérempli
  var f=document.getElementById('booking');
  if(f){
    var q=new URLSearchParams(location.search).get('logement');
    if(q){[].forEach.call(f.logement.options,function(o){if(o.text.indexOf(q)>-1)o.selected=true})}
    var today=new Date().toISOString().slice(0,10);f.arrivee.min=today;f.depart.min=today;
    var qs=new URLSearchParams(location.search);if(qs.get('arrivee'))f.arrivee.value=qs.get('arrivee');if(qs.get('depart'))f.depart.value=qs.get('depart');if(qs.get('linge'))f.linge.value=qs.get('linge');if(qs.get('menage')==='1')f.menage.checked=true;var og=document.getElementById('opt-gite');function tg(){if(og)og.hidden=!/^Gîte/.test(f.logement.value)}f.logement.addEventListener('change',tg);tg();
    f.arrivee.addEventListener('change',function(){f.depart.min=f.arrivee.value});
        function est(){if(!window.KGE_estimer)return null;var v=f.logement.value.toLowerCase(),k=/ekilore/.test(v)?'ekilore':/poppy/.test(v)?'poppy':/p.onia/.test(v)?'peonia':/lilitsu/.test(v)?'lilitsu':'';if(!k)return null;return window.KGE_estimer(k,f.arrivee.value,f.depart.value,parseInt(f.linge.value,10)||0,f.menage.checked)}function e2(n){return n.toLocaleString('fr-FR')+' €'}var ep=document.getElementById('estim');function showE(){if(!ep)return;var e=est();ep.hidden=!e;if(e)ep.textContent='Prix estimé : '+e2(e.total)+' pour '+e.nuits+' nuit'+(e.nuits>1?'s':'')+(e.linge||e.menage?' (hébergement '+e2(e.heb)+(e.linge?' + linge '+e2(e.linge):'')+(e.menage?' + ménage '+e2(e.menage):'')+')':'')+', taxe de séjour en plus.'}f.addEventListener('input',showE);f.addEventListener('change',showE);showE();
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var d=function(v){return v?v.split('-').reverse().join('/'):''};
      var g=/^Gîte/.test(f.logement.value),nl=Math.max(0,parseInt(f.linge.value,10)||0),opt=g?'\nLocation de linge : '+(nl?nl+' lit'+(nl>1?'s':'')+' × 20 € = '+(nl*20)+' €':'non')+'\nMénage de fin de séjour : '+(f.menage.checked?'oui (50 €)':'non'):'';
      var body='Bonjour,\n\nJe souhaite des informations pour : '+f.logement.value+
        '\nArrivée : '+d(f.arrivee.value)+'\nDépart : '+d(f.depart.value)+
        '\nAdultes : '+f.adultes.value+' — Enfants : '+f.enfants.value+opt+(function(){var e=est();return e?'\nPrix estimé par le simulateur : '+e2(e.total)+' pour '+e.nuits+' nuit'+(e.nuits>1?'s':'')+(e.linge||e.menage?' (hébergement '+e2(e.heb)+(e.linge?' + linge '+e2(e.linge):'')+(e.menage?' + ménage '+e2(e.menage):'')+')':'')+', taxe de séjour en plus':''})()+
        (f.curiste.checked?'\nSéjour de cure à Cambo-les-Bains':'')+
        (f.message.value?'\n\n'+f.message.value:'')+
        '\n\n'+f.nom.value+(f.tel.value?'\n'+f.tel.value:'');
      location.href='mailto:'+f.dataset.email+'?subject='+encodeURIComponent('Demande d’information — '+f.logement.value)+'&body='+encodeURIComponent(body);
    });
  }
})();