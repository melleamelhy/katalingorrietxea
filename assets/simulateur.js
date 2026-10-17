(function(){
  // Tarifs 2027. Périodes : [début, fin exclue, prix nuit du dimanche au jeudi, prix nuit vendredi et samedi]
  // Gîtes : chaque bloc de 7 nuits est au tarif semaine (7 × prix du dimanche au jeudi).
  var LOGEMENTS = {
    // Gîtes : [début, fin exclue, nuit dim.→jeu., nuit week-end, prix par nuit si semaine complète, (dates des nuits week-end si particulières)]
    ekilore: {
      nom: 'Gîte Ekilore', type: 'gite', contact: 'Ekilore', remise: true, spec: {'2027-05-08':115,'2027-03-28':98,'2027-05-14':115,'2027-05-15':115,'2027-05-16':115,'2027-10-29':110,'2027-10-30':110,'2027-10-31':110},
      periodes: [
        ['2027-01-02','2027-02-06',85,98,85],
        ['2027-02-06','2027-03-13',90,110,90],
        ['2027-03-13','2027-04-03',85,98,85],
        ['2027-04-03','2027-04-24',94,110,94],
        ['2027-04-24','2027-04-30',94,94,94],
        ['2027-04-30','2027-05-09',115,115,115],
        ['2027-05-09','2027-06-12',96,110,96],
        ['2027-06-12','2027-06-20',110,130,110],
        ['2027-06-20','2027-07-03',115,130,115],
        ['2027-07-03','2027-07-10',148,148,148],
        ['2027-07-10','2027-07-24',161,161,161],
        ['2027-07-24','2027-08-14',170,170,170],
        ['2027-08-14','2027-08-21',161,161,161],
        ['2027-08-21','2027-08-28',155,155,155],
        ['2027-08-28','2027-09-04',155,155,155],
        ['2027-09-04','2027-09-25',110,130,null],
        ['2027-09-25','2027-10-23',85,98,85],
        ['2027-10-23','2027-11-06',90,110,90],
        ['2027-11-06','2027-12-18',85,98,85],
        ['2027-12-18','2028-01-02',92,120,92,['2027-12-23','2027-12-24','2027-12-25','2027-12-30','2027-12-31','2028-01-01']]
      ]
    },
    poppy: {
      nom: 'Gîte Poppy', type: 'gite', contact: 'Poppy', spec: {'2027-03-28':85,'2027-05-14':95,'2027-05-15':95,'2027-05-16':95,'2027-10-29':80,'2027-10-30':80,'2027-10-31':80},
      periodes: [
        ['2027-01-02','2027-02-06',70,85,70],
        ['2027-02-06','2027-03-13',75,89,77],
        ['2027-03-13','2027-04-03',70,85,70],
        ['2027-04-03','2027-04-24',77,89,77],
        ['2027-04-24','2027-04-30',77,77,77],
        ['2027-04-30','2027-05-09',95,95,95],
        ['2027-05-09','2027-06-12',82,98,84],
        ['2027-06-12','2027-06-20',90,105,90],
        ['2027-06-20','2027-07-03',110,110,110],
        ['2027-07-03','2027-07-10',120,120,120],
        ['2027-07-10','2027-07-17',126,126,126],
        ['2027-07-17','2027-07-24',141,141,141],
        ['2027-07-24','2027-08-14',150,150,150],
        ['2027-08-14','2027-08-21',141,141,141],
        ['2027-08-21','2027-08-28',135,135,135],
        ['2027-08-28','2027-09-04',135,135,135],
        ['2027-09-04','2027-09-25',90,105,null],
        ['2027-09-25','2027-10-23',70,85,70],
        ['2027-10-23','2027-11-06',75,89,77],
        ['2027-11-06','2027-12-18',70,85,70],
        ['2027-12-18','2028-01-02',80,95,80,['2027-12-23','2027-12-24','2027-12-25','2027-12-30','2027-12-31','2028-01-01']]
      ]
    },    peonia: {
      nom: "Chambre d'hôtes Péonia", type: 'chambre', contact: 'Péonia',
      periodes: [
        ['2027-01-02','2027-06-19',96,96],
        ['2027-06-19','2027-07-03',96,96],
        ['2027-07-03','2027-09-04',106,106],
        ['2027-09-04','2027-09-25',90,90],
        ['2027-09-25','2028-01-01',96,96]
      ]
    },
    lilitsu: {
      nom: "Chambre d'hôtes Lilitsu", type: 'chambre', contact: 'Lilitsu',
      periodes: [
        ['2027-01-02','2027-06-19',110,110],
        ['2027-06-19','2027-07-03',110,110],
        ['2027-07-03','2027-09-04',120,120],
        ['2027-09-04','2027-09-25',105,105],
        ['2027-09-25','2028-01-01',110,110]
      ]
    }
  };
  var LINGE = 20;
  // Hors saison 2027 : prix fixes (sans hausse), semaine = 7 x prix du dimanche au jeudi
  var HS=[['2027-01-02','2027-02-06'],['2027-03-13','2027-04-03'],['2027-05-08','2027-06-19'],['2027-09-25','2027-10-23'],['2027-11-06','2027-12-18']]; // gîtes : draps pour 1 lit + 2 serviettes
  var JOURS = ['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'];
  function iso(d){return d.toISOString().slice(0,10)}
  function parse(s){var p=s.split('-');return new Date(Date.UTC(+p[0],p[1]-1,+p[2]))}
  function fr(d){return JOURS[d.getUTCDay()]+' '+d.getUTCDate()+'/'+String(d.getUTCMonth()+1).padStart(2,'0')}
  function eur(n){return n.toLocaleString('fr-FR')+' €'}
  function nuit(L,d){
    var k=iso(d);
    for(var i=0;i<L.periodes.length;i++){
      var p=L.periodes[i];
      if(k>=p[0]&&k<p[1]){
        var j=d.getUTCDay(),we=p[5]?p[5].indexOf(k)>=0:(j===5||j===6);
        var sp=!!(L.spec&&L.spec[k]!=null);
        return {date:new Date(d),base:(p[4]!=null?p[4]:(we?p[3]:p[2])),prix:sp?L.spec[k]:(we?p[3]:p[2]),we:sp||(we&&p[3]!==p[2]),sp:sp};
      }
    }
    return null;
  }

  var f=document.getElementById('simu');
  if(!f)return;
  var out=document.getElementById('simu-result'),lingeRow=document.getElementById('simu-linge'),menageRow=document.getElementById('simu-menage');
  f.arrivee.min='2027-01-02';f.arrivee.max='2028-01-01';
  f.depart.min='2027-01-03';f.depart.max='2028-01-02';
  f.arrivee.addEventListener('change',function(){if(f.arrivee.value){var d=parse(f.arrivee.value);d.setUTCDate(d.getUTCDate()+1);f.depart.min=iso(d);if(!f.depart.value||f.depart.value<=f.arrivee.value){d.setUTCDate(d.getUTCDate()+6);f.depart.value=iso(d)}}calc()});
  f.addEventListener('input',calc);
  f.addEventListener('change',calc);

  function calc(){
    var L=LOGEMENTS[f.logement.value],gite=L.type==='gite';
    lingeRow.hidden=!gite;menageRow.hidden=!gite;
    if(!f.arrivee.value||!f.depart.value){out.innerHTML='<p class="muted">Choisissez vos dates d\'arrivée et de départ.</p>';return}
    var a=parse(f.arrivee.value),b=parse(f.depart.value);
    if(b<=a){out.innerHTML='<p class="simu-warn">La date de départ doit être après la date d\'arrivée.</p>';return}
    var nuits=[],d=new Date(a),ete=false;
    while(d<b){
      var n=nuit(L,d);
      if(!n){out.innerHTML='<p class="simu-warn">'+'Le simulateur couvre les séjours du 2 janvier 2027 au 2 janvier 2028.'+'</p><a class="btn" href="contact.html?logement='+encodeURIComponent(L.contact)+'&arrivee='+f.arrivee.value+'&depart='+f.depart.value+'#reserver">Demander un tarif</a>';return}
      var m=d.getUTCMonth();if(m>=5&&m<=8)ete=true;
      nuits.push(n);d.setUTCDate(d.getUTCDate()+1);
    }
    var warn='';
    if(gite&&ete&&(a.getUTCDay()!==6||b.getUTCDay()!==6||nuits.length%7))warn='<p class="simu-warn">De juin à septembre, les gîtes se louent à la semaine, du samedi au samedi.</p>';
    else if(nuits.length<2)warn='<p class="simu-warn">Le séjour minimum est de 2 nuits.</p>';
    var semaines=gite?Math.floor(nuits.length/7):0,total=0,nbwe=0,eco=0;
    // semaine complète : les nuits à prix fixe gardent leur prix, les autres nuits de ce bloc ont 2 € de remise
    nuits.forEach(function(n,i){if(i<semaines*7){var blk=nuits.slice(Math.floor(i/7)*7,Math.floor(i/7)*7+7),has=blk.some(function(x){return x.sp});n.sem=true;n.wk=n.sp?n.prix:n.base-(has&&L.remise?2:0);total+=n.wk;eco+=n.prix-n.wk}else{total+=n.prix;if(n.we)nbwe++}});
    var kits=gite?Math.max(0,parseInt(f.linge.value,10)||0):0,linge=kits*LINGE,menage=gite&&f.menage.checked?50:0;
    var lignes=nuits.map(function(n){return '<li><span>'+fr(n.date)+(!n.sem&&n.we?' <em>week-end</em>':'')+'</span><span>'+eur(n.sem?n.wk:n.prix)+'</span></li>'}).join('');
    out.innerHTML=warn+
      '<div class="simu-total"><span>'+nuits.length+' nuit'+(nuits.length>1?'s':'')+' · '+L.nom+'</span><strong>'+eur(total+linge+menage)+'</strong></div>'+
      (semaines?'<p class="simu-ok">Tarif semaine appliqué'+(semaines>1?' ('+semaines+' semaines)':'')+(eco>0?' : '+eur(eco)+' d\'économie sur les week-ends':'')+'.</p>':'')+
      (nbwe?'<p class="muted small">Dont '+nbwe+' nuit'+(nbwe>1?'s':'')+' au tarif week-end.</p>':'')+
      ((linge||menage)?'<p class="muted small">Hébergement '+eur(total)+(linge?' + linge '+eur(linge)+' ('+kits+' lit'+(kits>1?'s':'')+')':'')+(menage?' + ménage '+eur(menage):'')+'.</p>':'')+
      (!gite?'<p class="simu-ok">Tout compris : petit-déjeuner et linge inclus.</p>':'')+
      '<details class="simu-detail"><summary>Voir le détail nuit par nuit</summary><ul>'+lignes+'</ul></details>'+
      '<p class="muted small">Taxe de séjour non incluse dans ce prix : elle est à régler à part, à l\'arrivée.</p>'+
      (gite?'<p class="muted small">Nous demandons une attestation d’assurance villégiature couvrant les dates du séjour. La plupart des assurances habitation l’incluent déjà : il suffit de demander l’attestation à votre assureur.</p>':'')+
      '<a class="btn" href="contact.html?logement='+encodeURIComponent(L.contact)+'&arrivee='+f.arrivee.value+'&depart='+f.depart.value+'#reserver">Demander cette réservation</a>';
  }
  calc();
})();