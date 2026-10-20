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
    var qs=new URLSearchParams(location.search);if(qs.get('arrivee'))f.arrivee.value=qs.get('arrivee');if(qs.get('depart'))f.depart.value=qs.get('depart');
    f.arrivee.addEventListener('change',function(){f.depart.min=f.arrivee.value});
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var d=function(v){return v?v.split('-').reverse().join('/'):''};
      var body='Bonjour,\n\nJe souhaite des informations pour : '+f.logement.value+
        '\nArrivée : '+d(f.arrivee.value)+'\nDépart : '+d(f.depart.value)+
        '\nAdultes : '+f.adultes.value+' — Enfants : '+f.enfants.value+
        (f.curiste.checked?'\nSéjour de cure à Cambo-les-Bains':'')+
        (f.message.value?'\n\n'+f.message.value:'')+
        '\n\n'+f.nom.value+(f.tel.value?'\n'+f.tel.value:'');
      location.href='mailto:'+f.dataset.email+'?subject='+encodeURIComponent('Demande d’information — '+f.logement.value)+'&body='+encodeURIComponent(body);
    });
  }
})();