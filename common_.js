var isWA;
var BallsName="UNIT";
var flNewModeCGI=false;
var flNewOrderMode=false;
var flRedesign=false;
var DeltaDate = new Date();
var IsEmptySheduler=true;

var TStream1={};// аналог стрима для обработки в функциях
var TStream2={};// аналог стрима для обработки в функциях
var TStream3={};// аналог стрима для обработки в функциях
var TStream4={};// аналог стрима для обработки в функциях
var TStream5={};// аналог стрима для обработки в функциях
var TStream6={};// аналог стрима для обработки в функциях
var ismobile=(/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
var selectTreeColor='#CC0000';
var mindist=2; 
var maxdist=50;
var intervalID4=-1;//viewdialog
var InfoWindowHeightDefault=400;//окно информации открывается, и  мы туда пишем эти размеры , чтоб оно не сворачивалось меньше
var InfoWindowWidhtDefault=400;
var viewdvornikdivId=0;
var descrimageurl='';
var intervalID5=-1;

//awstl - AddWareSearchTableLine - Рисует строку таблицы с результатами поиска товара


// cwc - код товара
function awstl_redisign(maintbl_, cwc, AttrGr, Brand, BrandWWW, BrandAdrWWW, Analogue, HasSatellites, WareName, Unit, Sale, NonReturned, CutPrice,directname,ActionCode,ActionImagePath,ActionTitle,ActionText,IsHas,IsAuto,IsMoto,IsCV,IsAx,CutPriceReason, PriceR, PriceO, PriceM, PriceB, Desc, emt,ispoddovari,divisible,yellow_greenHint) {
  var s1,s2,s3,s4;
  //var tbl=$("#search-table");
  var row;
  var newcell;
  s3='';
  s4='';
  
  switch (IsHas){
    case '1': s3='yellow'; 
              s4='title="Доступен под заказ, проверяйте срок поставки в заказе"';
              break;
    case '3': s3='yellow-green'; 
              s4='title="'+yellow_greenHint+'"';
              break;
    case '2': s3='green'; 
              s4='title="Доступен сегодня"';
              break;
    case '0': s3='red';
              s4='title="Нет в наличии"';
              break;
    case '-1': s3='no-cost';
            //s4='title="Нет в наличии"';
            break;
  }


  
  var modelid=($('#modelnodesearch_model').length?'&model='+$('#modelnodesearch_model').attr('_code'):'&model=');
  var nodeid=($('#modelnodesearch_node').length?'&node='+$('#modelnodesearch_node').attr('_code'):'&node=');
  var engine=($('#modelnodesearch_engine').length?'&eng='+$('#modelnodesearch_engine').attr('_code'):'&eng=');
  var filterid=($('#modelnodesearch_filter').length?'&filter='+$('#modelnodesearch_filter').attr('_code'):'&filter=');
  if ($('.table-row.orig-num-str').length){
    s2='table-row-second-group ';
  }
  else{
    s2='table-row ';
  }  
  row=maintbl_.insertRow(-1);
  $(row).toggleClass(s2+s3);
  $(row).attr('id','product-id-'+cwc);
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-checkbox');
  
  if (AttrGr){
    if ( $('.compare-btn').hasClass('hide')){ 
      $('.compare-btn').toggleClass('hide');
    }
    newcell.innerHTML='<input type="checkbox" name="'+AttrGr+'" class="search-checkbox" id="attrgr'+cwc+( (AttrGr)?'" onclick="checkcomparebtnenabl(this)"':'"')+'>'+
                '<label for="attrgr'+cwc+'"></label>';
  } 
  else{
    //$(newcell).css('width',0+'px'); 
  }
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-discription');
  s1='<a  _bonus="false" onclick="return viewWareSearchDialog(this);" href="'+descrurl+fnIfStr(flNewModeCGI,'/Universal?act=wareinfo&?warecode=','/wareinfo?warecode=')+cwc+modelid+nodeid+engine+filterid+'&bonus=false" class="name">';
  s1+='<span class="title">'+WareName+'</span>';
  s1+='<span class="status stock">'  
    +((Sale)?'&nbsp;<a class=\'abANewAction\' title=\'Распродажа\' style=\'background-image: url('+descrimageurl+'/images/sal.png);\'></a>':'')
    //+((CutPrice)?'&nbsp;<a id="tooltip-id-'+cwc+'" class=\'abANewAction \' title=\''+((CutPriceReason)?CutPriceReason:'Уцененный товар')+'\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
    +((CutPrice)?'&nbsp;<a _bonus="false" onclick="return viewWareSearchDialog(this);" href="'+descrurl+fnIfStr(flNewModeCGI,'/Universal?act=wareinfo&?warecode=','/wareinfo?warecode=')+cwc+modelid+nodeid+engine+filterid+'&bonus=false" class=\'abANewAction \' title=\'Щелкните для просмотра\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
    +((NonReturned)?'&nbsp;<img align=top title=\'Возврату не подлежит\' src=\''+descrimageurl+'/images/denyback.png\'>':'');
    if (!IsUberClient){
    // +((ActionCode>0)?'<a target="_blank" class="abANewAction tooltip" title="'+ActionTitle+'" '+ ((ActionImagePath !='')?'style="background-image: url('+ActionImagePath+');"':'style="background-image: url('+descrimageurl+'/images/action16.png);"')+
      s1+=((ActionCode>0)?'<a target="_blank" class="abANewAction tooltip" title="'+ActionTitle+'" '+ ((ActionImagePath !='')?'style="background-image: url('+ActionImagePath+');"':'')+
      ' href="'+scriptname+'/info?actioncode='+ActionCode+'" ></a>':'');
    }
  
  s1+='</span>';
  //alert(s1);
  s1+='</a>';    
  s1+='<p class="discription">'; 
  s1+=Desc; 
  s1+='</p>';
  //alert(s1);   
  newcell.innerHTML=s1;   
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-companis-logo');
  if (BrandAdrWWW !='') {
    s2='"http://www.vladislav.ua/images/logo/'+replacestr(BrandWWW, ' ', '')+'.png"';
    s1='<img src='+s2+' onclick="window.open(\'http://'+BrandAdrWWW+'\');" class="companis-logo" title="'+Brand+'" alt="companis logo img">';
  } 
  else{
      //s1='<img class="companis-logo" title="'+Brand+'" alt="companis logo img">';
     s1=' '+Brand;
    $(newcell).css('padding','0px');

  }
  newcell.innerHTML=s1;
 
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-analogues');
  if (Analogue>0){
    newcell.innerHTML='<span class="analogues">a</span>';
  } 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsCV){ 
   newcell.innerHTML='<span  class="type-cv" onclick=\'ec("showmodelswhereused", "wareid='+cwc+'&systype=4");\'></span>';
  } 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsAx){ 
   newcell.innerHTML='<span  class="type-ax" onclick=\'ec("showmodelswhereused", "wareid='+cwc+'&systype=5");\'></span>';
  } 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsAuto){ 
   newcell.innerHTML='<span  class="type-auto" onclick=\'ec("showmodelswhereused", "wareid='+cwc+'&systype=1");\'></span>';
  }
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsMoto){
    newcell.innerHTML='<span class="type-moto" onclick=\'ec("showmodelswhereused", "wareid='+cwc+'&systype=2");\' ></span>';
  } 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col col-cost');
  if (!IsUberClient){
    $(newcell).attr('title','/'+PriceB);
  }
  newcell.innerHTML='<span class="cost retail">'+PriceR[0]+'</span>'+
                    '<span class="cost wholesale hide">'+PriceR[1]+'</span>'; 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border quantity-type');
  newcell.innerHTML='<span class="quantity-type">'+Unit+'</span>'; 
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border quantity-input');
  if (PriceR[0] !='0,00') {
    newcell.innerHTML='<span class="quantity-input green">'+
                    '<input onkeyup="if(event.keyCode==13){ al_redisignEnter('+cwc+',this); }" onfocus="this.select();" maxlength="5" type="text" value="'+divisible+'">'+
                    '</span>'+
                    //'<a data-warecode="'+cwc+'" data-qty="'+divisible+'" title="Проверить наличие товара" class="check-ware-qv hide"></a>';
                    '<button data-warecode="'+cwc+'" data-qty="'+divisible+'" title="Проверить наличие товара" class="check-ware-qv '+s3+' hide">Пр.</button>';
  }
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col to-order');
  if (PriceR[0] !='0,00') {
    newcell.innerHTML='<a '+s4+' href="#" class="btn">'+
                    //<!-- border color change class : red , green , yellow -->
                    '<span class="product-status '+s3+'" data-warecode="'+cwc+'" data-qty="'+divisible+'" ></span>'+
                    '<span class="product-order" data="'+cwc+'">Заказать</span>'+
                    ' </a>';
  }
} //awstl_redisign


function aal_redisign(MainWareCode,CurWareCode, AttrGr, Brand, BrandWWW, BrandAdrWWW, WareName, Unit, sale, NonReturned, CutPrice,directname,ActionCode,ActionImagePath,ActionTitle,ActionText,IsHas,IsAuto,IsMoto,IsCV,IsAx,CutPriceReason, PriceR, PriceO, PriceM, PriceB, Desc, FontColor, rowtype,divisible,yellow_greenHint) {
  var s1,s2,s3,s4;
  var tbl=document.getElementById("search-table");
  var row;
  var newcell;
  var rowNum=$("#product-id-"+MainWareCode).index();
  var subRowNum=$("tr.sub-table-row[data^='product-id-"+MainWareCode+"']").length;
  if (subRowNum>0){
    rowNum+=subRowNum;  
  }
  
  s3='';
  s4='';
  switch (IsHas){
    case '1': s3='yellow'; 
              s4='title="Доступен под заказ, проверяйте срок поставки в заказе"';
              break;
    case '3': s3='yellow-green'; 
              s4='title="'+yellow_greenHint+'"';
              break;
    case '2': s3='green'; 
              s4='title="Доступен сегодня"';
              break;
    case '0': s3='red';
              s4='title="Нет в наличии"';
              break;
    case '-1': s3='no-cost';
        //s4='title="Нет в наличии"';
        break;
  }
  
  if (ActionImagePath==""){
    //s2=descrimageurl+'/images/action16.png';
    s2='';
  }
  else{
    s2=ActionImagePath;
  }
  //row=tbl.insertRow(rowNum-1);
  row=tbl.insertRow(rowNum+1);
  $(row).toggleClass('sub-table-row');
  $(row).attr('data','product-id-'+MainWareCode+'-'+s3);
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-checkbox');
  if (AttrGr){
    if ($('.compare-btn').hasClass('hide')){ 
      $('.compare-btn').toggleClass('hide');
    }
    newcell.innerHTML='<input type="checkbox" name="'+AttrGr+'" class="search-checkbox" id="attrgr'+CurWareCode+( (AttrGr)?'" onclick="checkcomparebtnenabl(this)"':'"')+'>'+
                    '<label for="attrgr'+CurWareCode+'"></label>';
  } 
  else{
    //$(newcell).css('width',0+'px'); 
  }
  var modelid=($('#modelnodesearch_model').length?'&model='+$('#modelnodesearch_model').attr('_code'):'&model=');
  var nodeid=($('#modelnodesearch_node').length?'&node='+$('#modelnodesearch_node').attr('_code'):'&node=');
  var engine=($('#modelnodesearch_engine').length?'&eng='+$('#modelnodesearch_engine').attr('_code'):'&eng=');
  var filterid=($('#modelnodesearch_filter').length?'&filter='+$('#modelnodesearch_filter').attr('_code'):'&filter=');
 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-discription');
  s1='<a _bonus="false" onclick="return viewWareSearchDialog(this);" href="'+descrurl+fnIfStr(flNewModeCGI,'/Universal?act=wareinfo&?warecode=','/wareinfo?warecode=')+CurWareCode+modelid+nodeid+engine+filterid+'&bonus=false" class="name">';
  s1+='<span class="title">'+WareName+'</span>';
  s1+='<span class="status stock">'  
    +((sale)?'&nbsp;<a class=\'abANewAction\' title=\'Распродажа\' style=\'background-image: url('+descrimageurl+'/images/sal.png);\'></a>':'')
    //+((CutPrice)?'&nbsp;<a class=\'abANewAction\' title=\''+((CutPriceReason)?CutPriceReason:'Уцененный товар')+'\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
    +((CutPrice)?'&nbsp;<a _bonus="false" href="'+descrurl+fnIfStr(flNewModeCGI,'/Universal?act=wareinfo&?warecode=','/wareinfo?warecode=')+CurWareCode+modelid+nodeid+engine+filterid+'&bonus=false" onclick="return viewWareSearchDialog(this);" class=\'abANewAction\' title=\'Щелкните для просмотра\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
    +((NonReturned)?'&nbsp;<img align=top title=\'Возврату не подлежит\' src=\''+descrimageurl+'/images/denyback.png\'>':'');
    if (!IsUberClient){
     // s1+=((ActionCode>0)?'&nbsp;<a target=\"_blank\" class=\"abANewAction\" title=\''+ActionTitle+'\' style=\'background-image: url('+s2+');\' href=\"'+scriptname+'/info?actioncode='+ActionCode+'\"></a>':'');
      s1+=((ActionCode>0)?'<a target="_blank" class="abANewAction tooltip" title="'+ActionTitle+'" '+ ((ActionImagePath !='')?'style="background-image: url('+ActionImagePath+');"':'')+
      ' href="'+scriptname+'/info?actioncode='+ActionCode+'" ></a>':'');
    }
  s1+='</span>';
  s1+='</a>';    
  s1+='<p class="discription">'; 
  s1+=Desc; 
  s1+='</p>';     
  newcell.innerHTML=s1;   
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-companis-logo');
  if (BrandAdrWWW !='') {
    s2='"http://www.vladislav.ua/images/logo/'+replacestr(BrandWWW, ' ', '')+'.png"';
    s1='<img src='+s2+' onclick="window.open(\'http://'+BrandAdrWWW+'\');" class="companis-logo" title="'+Brand+'" alt="companis logo img">';
  } 
  else{
     //s1='<img class="companis-logo" title="'+Brand+'" alt="companis logo img">';
    s1=' '+Brand;
    $(newcell).css('padding','0px');
  }
  newcell.innerHTML=s1;
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-analogues');
  //if (Analogue>0){
    newcell.innerHTML='<span class="analogues fadeIn">a</span>';
  //} 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsCV){
    newcell.innerHTML='<span  class="type-cv" onclick=\'ec("showmodelswhereused", "wareid='+CurWareCode+'&systype=4");\'></span>';
  } //awstl_redi
 
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsAx){
    newcell.innerHTML='<span  class="type-ax" onclick=\'ec("showmodelswhereused", "wareid='+CurWareCode+'&systype=5");\'></span>';
  } //awstl_redi
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsAuto){
    newcell.innerHTML='<span  class="type-auto" onclick=\'ec("showmodelswhereused", "wareid='+CurWareCode+'&systype=1");\'></span>';
  } //awstl_redisign

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  if (IsMoto){
    newcell.innerHTML='<span class="type-moto" onclick=\'ec("showmodelswhereused", "wareid='+CurWareCode+'&systype=2");\'></span>';
  }

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col col-cost');
  if (!IsUberClient){
    $(newcell).attr('title','/'+PriceB);
  }
  newcell.innerHTML='<span class="cost retail">'+PriceR[0]+'</span>'+
                    '<span class="cost wholesale hide">'+PriceR[1]+'</span>'; 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border quantity-type');
  newcell.innerHTML='<span class="quantity-type">'+Unit+'</span>'; 
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border quantity-input');
   if (PriceR[0] !='0,00') {
    newcell.innerHTML='<span class="quantity-input green" >'+
                    '<input onkeyup="if(event.keyCode==13){ al_redisignEnter('+CurWareCode+',this); }" onfocus="this.select();" type="text"  maxlength="5" value="'+divisible+'">'+
                    '</span>'+
                   // '<a data-warecode="'+CurWareCode+'" data-qty="'+divisible+'" title="Проверить наличие товара" class="check-ware-qv hide"></a>'; 
                    '<button data-warecode="'+CurWareCode+'" data-qty="'+divisible+'" title="Проверить наличие товара" class="check-ware-qv '+s3+' hide">Пр.</button>';  
   } 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col to-order');
  
  if (PriceR[0] !='0,00') {
    newcell.innerHTML='<a '+s4+' href="#" class="btn">'+
                    //<!-- border color change class : red , green , yellow -->
                    '<span class="product-status '+s3+'" data-warecode="'+CurWareCode+'" data-qty="'+divisible+'"></span>'+
                    '<span class="product-order" data="'+CurWareCode+'">Заказать</span>'+
                    ' </a>';
  }
}

function ga_redisign(code, is_on, acctype, addr) {
  var contrel=$("#contract");
  var sortmode=getLoyaltyCookie(2);
  sortmode='0';
  ec('getanalogs', 'id='+code+"&is_on="+is_on+"&sortmode="+sortmode+((isWA)?"&forfirmid="+$("#forfirmid").val():"")+"&contract="+((contrel.length)?contrel.val():""), addr);
}

function awstl_on(cwc, ManufID, ManufName, Name, _type) {
  var s1,s2;
  var tbl=document.getElementById("search-table");
  var row;
  var newcell;
  row=tbl.insertRow(-1);
  $(row).toggleClass('table-row orig-num');
  $(row).attr('id','product-id-'+cwc);
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-checkbox');


  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-discription');
  var s1=''
  s1+='<span class="title">'+Name+'&nbsp;&nbsp;</span>';
  s1+='<span class="discription">'; 
  s1+=ManufName; 
  s1+='</span>';     
  s1+='<span class="discription">('; 
  s1+=_type; 
  s1+=')</span>';     
  newcell.innerHTML=s1;   
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-companis-logo');
  s1='';
  newcell.innerHTML=s1;
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-analogues');
  newcell.innerHTML='<span class="analogues is_on">a</span>';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col col-cost');
  newcell.innerHTML=''; 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border');
  newcell.innerHTML=''; 
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border');
  newcell.innerHTML=''; 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col to-order');
  newcell.innerHTML='';

}  // awst_on

function awstl_on_str(str) {
  var tbl=document.getElementById("search-table");
  var row;
  var newcell;
  row=tbl.insertRow(-1);
  $(row).toggleClass('table-row orig-num-str');
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-checkbox');


  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-discription');
  var s1=''
  s1+='<span class="title">'+str+'&nbsp;&nbsp;</span>';
  newcell.innerHTML=s1;   
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-companis-logo');
  s1='';
  newcell.innerHTML=s1;
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-analogues');
  newcell.innerHTML='<span class=""></span>';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col-type');
  newcell.innerHTML='';

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col col-cost');
  newcell.innerHTML=''; 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border');
  newcell.innerHTML=''; 
  
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border');
  newcell.innerHTML=''; 

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col to-order');
  newcell.innerHTML='';

}  // awst_on

function ws() {
  var el=($('#waresearch'));
  //console.log($('#waresearch').val());
  var resStr=checkWareNameNZ($('#waresearch').val());
  //console.log(resStr);
  if ( resStr !=$('#waresearch').val() ){
    $('#waresearch').val(resStr);
  }
  if ( ($('#search-result').attr('lastwaresearch')==$('#waresearch').val()) && (el.val()!='')) {
    if ($('#search-result').hasClass('hide') ){
      $('#search-result').toggleClass('hide');
    }
    $('#searchslider').css('display', "block");
    savesearchhistory('#waresearch', $('#waresearch').val(), 'waresearchhistory', 20);
    return false;
  }
  if ((el.val()==$('#waresearch').attr('insearchtext')) || (el.val()=='')) {
  } else {
 	    //if ($('#search-result').hasClass('hide') ){
        //$('#search-result').toggleClass('hide');
      //}
      
      if ((el.val()!='РАСПРОДАЖА') && (el.val()!='УЦЕНКА')) {  
        if ($('#waresearch').val().indexOf('&')>-1){
          ec("waresearch","waresearch="+encodeURIComponent($('#waresearch').val())+"&forfirmid="+$('#forfirmid').val()+"&addlines="+$('#addlines').val()+"&contract="+$('#contract').val());
        }
        else{
          ec("waresearch","waresearch="+$('#waresearch').val()+"&forfirmid="+$('#forfirmid').val()+"&addlines="+$('#addlines').val()+"&contract="+$('#contract').val());
        }
        savesearchhistory('#waresearch', $('#waresearch').val(), 'waresearchhistory', 20);
      }
      else{
        ec("waresearch","waresearch="+$('#waresearch').val()+"&forfirmid="+$('#forfirmid').val()+"&addlines="+$('#addlines').val()+"&contract="+$('#contract').val()); 
      }
    //if ($("#waresearch").attr("opened")=="true") {$("#waresearch").autocomplete("close")}
  }
  return false;
}

function vs(form, icon, cat) {
   var input= $(form).find("input:text");
  //console.log(input.val());
  if ( (input.val()==input.attr('insearchtext')) || (input.val()=='')) {
    return false;
  } else if (input.val().length!=17) {
    jqswMessageError('VIN-код должен состоять из 17 символов');
    return false;
  } else {
    if (icon==undefined){
      icon=''
    }  
    if (cat==undefined){
      cat=''
    }
    ec('FindByVIN', 'icon='+icon+"&vin="+input.val()+"&cat="+cat+"&inputid="+input[0].id,"abj"); 
//    if ((input[0].id=='vin') or (input[0].id=='vinsearch')) 
    savesearchhistory('#vinsearch, #vin', input.val(), 'vinsearchhistory', 10);
    if (input.attr("opened")=="true") {input.autocomplete("close")}
  }
  return false;
}


function savesearchhistory(objects, text, cookiename, maxqty) {
  //console.log($(objects));
  if (!$(objects).length) return false; 
  var s=getCookie1(cookiename);
  var pos;
  if (s==null) s='';
  var ar=s.split('-|-');

  if (text) {
    pos=-1;
    for (var i=0; ((i<ar.length)&&(pos==-1)); i++) {
      if (ar[i]==text) {
        pos=i; 
        ar.splice(pos, 1);
      } 
    }
//    if ((pos=ar.indexOf(text))!=-1) ar.splice(pos, 1);
    ar.splice(0, 0, text);
    ar.splice(maxqty, 1000);
    setCookie_(cookiename, ar.join('-|-'), getExpDate_(3650,0,0),'/',0,0); 
  }
  if (cookiename=='waresearchhistory') {
    ar.splice(ar.length, 0, 'РАСПРОДАЖА');
    ar.splice(ar.length, 0, 'УЦЕНКА');
  }

  $(objects).autocomplete({ source:ar});
}

function checkWareNameNZ(val) {  // проверяет частный случай шаблона VR хх-ххххх-хх, если да - меняет VR на NZ
  if (val.length==14){
   var str=val.toLowerCase();
   var flag=0;
   var i=0;
   while ((i<str.length) && (!flag)){
     if (i==0) {if (str[i] !='v') {flag=1;}   }
     if (i==1) {if (str[i] !='r') {flag=1;}   }
     if (i==2) {if (str[i] !=' ') {flag=1;}   }
     if ((i==5) || (i==11)) {if (str[i] !='-') {flag=1;}   }
     if ((i>2) && (i!=5) && (i!=11)) {if (!(str[i] in ['0','1','2','3','4','5','6','7','8','9'])) {flag=1;}   }
     i++;
   }
   if (flag==1){
     return val;
   }
   else{
     var str2=str.replace('vr','RZ');
     return str2;
   }
 }
 else{
   return val;
 }
}

// ec - execute command
function ec(command, data, action) {
  if (action==undefined) {
    action='abj';
  }
  data="act="+command+"&"+(data);
  var frame=$('#downloadframe');
  if (action=='ifbj') {
    if (frame.length) {
      var src=scriptname+"/"+action+"?"+data;
      frame[0].src=src;
    }
    return false;
  }
  startLoadingAnimation();
  $.ajax({
    url: scriptname+"/"+action,
    type: "post",
    data: data,
    complete: function(obj, stat) {
      stopLoadingAnimation();
    },
    dataType: "script"
  });
  
}

// ecq - execute command with question
function ecq(command, data, action, question) {
  jConfirm(question, 'Да','Нет',function get(res){
    if (res){  
     $.ajax({
          url: scriptname+"/"+action,
          type: "post",
          data: "act="+command+"&"+data,
      //    complete: function(obj, stat) {alert(obj.responseText);},
          dataType: "script"
     });
    }
  });

  /*if (confirm(question)) {
    $.ajax({
      url: scriptname+"/"+action,
      type: "post",
      data: "act="+command+"&"+data,
  //    complete: function(obj, stat) {alert(obj.responseText);},
      dataType: "script"
    });
  }*/
}


// sfba -  send formbyajax
function sfba(form, thread) {
//alert('$(form).serialize()');
  if (!thread) thread="abj";
  startLoadingAnimation();
  $.ajax({
    url: ((form.action)?form.action:scriptname+"/"+thread),
    type: "post",
    data: $(form).serialize(),
    complete: function(obj, stat) {
        stopLoadingAnimation();
      //if (command=='senderrormessage') alert(obj.responseText);
    },
    dataType: "script"
  });

  return false;
}

// где, что, на что
function replacestr(s1, s2, s3) {
if (!s1) return s1;
if (!s2) return s1;
  var s = ''; // обработанная часть строки
  while (true) {
   i = s1.indexOf(s2) // индекс вхождения s2 в si
      if (i >= 0) {
      s = s + s1.substr(0, i) + s3 // обработанная часть строки
      s1 = s1.substr(i + s2.length) // оставшаяся часть строки
    } else break;
  }
  return s + s1;
}

function reloadpage() {
  s=document.location.href;
  if ((i=s.indexOf('#'))!=-1) s=s.substring(0, i);
  document.location.href=s;
}

// окно поверх стандартного фансибокса
function jqsw(winid, winwidth, wintitle) {
  $(function() {
    $(winid).dialog({
      autoOpen: true,
      show: 'fade',
      draggable: true,
      hide: 'fade',
      zIndex: '1010',
      width: winwidth,
      title: wintitle,
      buttons: {
        "Закрыть окно" : function() {
          $(this).dialog("close");
        }
      }
    });
  });
}

function jqswConfirmFromOrder(quest, data_) { //для замены окна подтверждения 
  $('#jqdialog').html('<div style="align: center; vertical-align: center; margin: 10px;">'+quest+'</div>');
  $('#jqdialog').dialog({
    modal:true,
    show: "fade",
    hide: "fade",
    title: "Подтверждение",
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Да" : function()  {$.ajax({
      url: scriptname+"/abj",
      type: "post",
      data: data_,
      dataType: "script"
    });$('#jqdialog').dialog('destroy');} ,
              "Нет" : function() {$('#jqdialog').dialog('destroy');}
    }
  });
   $('#jqdialog').dialog('open');
}

function jqswConfirmFromWebArm(quest, data_) { //для замены окна подтверждения Новая схема 
  $('#jqdialog').html('<div style="align: center; vertical-align: center; margin: 10px;">'+quest+'</div>');
  $('#jqdialog').dialog({
    modal:true,
    show: "fade",
    hide: "fade",
    title: "Подтверждение",
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Да" : function()  {$.ajax({
      url: scriptname+"/newbj",
      type: "post",
      data: data_,
      dataType: "script"
    });$('#jqdialog').dialog('destroy');} ,
              "Нет" : function() {$('#jqdialog').dialog('destroy');}
    }
  });
   $('#jqdialog').dialog('open');
}

// окно поверх стандартного фансибокса
function jqswtext(title, text) {
  $('#jqdialog').html(text);
  $('#jqdialog').dialog({
    modal:true,
    title: title,
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) {$('#jqdialog').dialog('destroy')}
  })
}

function jqswMessage(text) { //просто для сообщений
  $('#jqdialog').html('<div style="align: center; vertical-align: center; margin: 10px;">'+text+'</div>');
  $('#jqdialog').dialog({
    show: "fade",
    hide: "fade",
    modal: true,
    title: "Информация",
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Ok" : function()  {$('#jqdialog').dialog('destroy');} 
    }
  });
   $('#jqdialog').dialog('open');
   $("#jqdialog").next().children().children().toggleClass('blue-btn');
   var btn=$("#jqdialog").parent().find("button.ui-dialog-titlebar-close");
   if (btn.html()==''){
     var s1='<span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span>';
     btn.html(s1);
     $(btn).toggleClass("ui-button ui-corner-all ui-widget ui-button-icon-only");
   }
   intervalID5=setTimeout(setPositionInfoDialogEngine, 1000);
}

function jqswInfo(title_,text,pos_,width_,height_) { //просто для сообщений
  if (width_===undefined){
    width_="auto";
    height_="auto";
  } 
  //var curwidth=$(window).width()-50;
  $('#jqdialog').html('<div style="align: center; vertical-align: center;">'+text+'</div>');
  $('#jqdialog').dialog({
    show: "fade",
    hide: "fade",
    modal: true,
    position:pos_,
    title: title_,
    zIndex: 1100,
    width: width_,
    height:height_,
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Ok" : function()  {$('#jqdialog').dialog('destroy');} 
    }
  });
     $('#jqdialog').dialog('open');
     $("#jqdialog").next().children().children().toggleClass('blue-btn');
   setTimeout(setPositionInfoDialog, 1000);
}

function jqswInfoEngine(title_,text,pos_,width_,height_) { //просто для сообщений
  if (width_===undefined){
    width_="auto";
    height_="auto";
  } 
  //var curwidth=$(window).width()-50;
  $('#jqdialog').html('<div style="align: center; vertical-align: center;">'+text+'</div>');
  $('#jqdialog').dialog({
    show: "fade",
    hide: "fade",
    modal: true,
   // position:'center',
    title: title_,
    zIndex: 1100,
    width: width_,
    height:height_,
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Ok" : function()  {$('#jqdialog').dialog('destroy');} 
    }
  });
     $('#jqdialog').dialog('open');
     $("#jqdialog").next().children().children().toggleClass('blue-btn');
   setTimeout(setPositionInfoDialogEngine, 1000);
   $("#jqdialog").css("overflow", "hidden");
   $('#jqdialog').dialog('option', 'position', 'center');
   $("#enginedata-table-body-wrap").mCustomScrollbar({
        alwaysShowScrollbar: 1 
   });
   
}

function setPositionInfoDialog() {
 if ( ($('#jqdialog').height()>$(window).height()) || ($('#jqdialog').parent().height()>$(window).height())) {  //подстраиваем окно под высота экрана
    $('#jqdialog').dialog('option', 'position', 'top'); 
    $('#jqdialog').dialog({ height: $(window).height() }); 
  }
  else{ 
    $('#jqdialog').dialog('option', 'position', 'center');
  } 
  if ( ($('#jqdialog').width()>$(window).width()) || ($('#jqdialog').parent().width()>$(window).width())) {  //подстраиваем окно под высота экрана
    $('#jqdialog').dialog({ width: $(window).width()-25 });
    $('#jqdialog').dialog('option', 'position', '[10]');
    
  }
  else{ 
    $('#jqdialog').dialog('option', 'position', 'center');
  } 
}


function setPositionInfoDialogEngine(){
  $("#jqdialog").parent().css('z-index','202');
  clearInterval(intervalID5)
}

function setPositionInfoDialoginfo() {
 if ( ($('#jqdialoginfo').height()>$(window).height()) || ($('#jqdialoginfo').parent().height()>$(window).height())) {  //подстраиваем окно под высота экрана
    $('#jqdialoginfo').dialog('option', 'position', 'top'); 
    $('#jqdialoginfo').dialog({ height: $(window).height() }); 
  }
  else{ 
    $('#jqdialoginfo').dialog('option', 'position', 'center');
  } 
  if ( ($('#jqdialoginfo').width()>$(window).width()) || ($('#jqdialoginfo').parent().width()>$(window).width())) {  //подстраиваем окно под высота экрана
    $('#jqdialoginfo').dialog({ width: $(window).width()-25 });
    $('#jqdialoginfo').dialog('option', 'position', '[10]');
    
  }
  else{ 
    $('#jqdialoginfo').dialog('option', 'position', 'center');
  } 
}

function jqswInfoOutOk(title_,text,pos_) { //просто для сообщений
  //if 
  //var curwidth=$(window).width()-50;
  $('#jqdialog').html('<div style="align: center; vertical-align: center;">'+text+'</div>');
  $('#jqdialog').dialog({
    show: "fade",
    hide: "fade",
    modal: true,
    position:pos_,
    title: title_,
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Закрыть" : function()  {$('#jqdialog').dialog('destroy');} 
    }
  });
     $('#jqdialog').dialog('open');
     $("#jqdialog").next().children().children().toggleClass('blue-btn');
   setTimeout(setPositionInfoDialog, 1000);
}

/*function jqswInfoAccordionCreate(title_,text,pos_) { //просто для баянов создание
  $('#jqdialoginfocreate').html('<div style="align: center; vertical-align: center;">'+text+'</div>');
  $('#jqdialoginfocreate').dialog({
    show: "fade",
    hide: "fade",
    modal: true,
    position:pos_,
    title: title_,
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $('#jqdialoginfocreate').dialog('destroy');},
    buttons: {"Сохранить" :function() {saveAccordionParametr(); $('#jqdialoginfocreate').dialog('destroy');},
              "Закрыть" : function()  {$('#jqdialoginfocreate').dialog('destroy');} }
  });
     $('#jqdialoginfocreate').dialog('open');
   setTimeout(setPositionInfoDialoginfo, 1000);
}*/

function jqswInfoImg(title_,text,pos_) { //просто для сообщений
  //if 
  //var curwidth=$(window).width()-50;
  $('#lampimgdialog').html('<div style="align: center; vertical-align: center; margin: 10px;">'+text+'</div>');
  $('#lampimgdialog').dialog({
    show: "fade",
    hide: "fade",
    position:pos_,
    title: title_,
    zIndex: 1100,
    width:"auto",
    height:"auto",
    open:function() {
      $(this).parents(".ui-dialog:first").find(".ui-dialog-titlebar-close").remove();
    }
    //close: function(event, ui) { $('#lampimgdialog').dialog('destroy');},
  });
  $('#lampimgdialog').dialog('open');
}

function jqswMessageError(text,mode) { //просто для сообщений
  if (mode=== undefined){
    $('#jqdialog').html('<div style="align: center; vertical-align: center; margin: 10px;">'+text+'</div>');
    $('#jqdialog').dialog({
      modal:true,
      show: "fade",  
      hide: "fade",
      title: "Ошибка",
      zIndex: 1100,  
      width:"auto",
      height:"auto",
      close: function(event, ui) { $('#jqdialog').dialog('destroy');},
      buttons: {"Ok" : function()  {$('#jqdialog').dialog('destroy');} ,
      }
    });
    $('#jqdialog').dialog('open');
    $("#jqdialog").next().children().children().toggleClass('blue-btn');
    setTimeout(setPositionInfoDialogEngine, 1000);
    var btn=$("#jqdialog").parent().find("button.ui-dialog-titlebar-close");
    if (btn.html()==''){
      var s1='<span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span>';
      btn.html(s1);
      $(btn).toggleClass("ui-button ui-corner-all ui-widget ui-button-icon-only");
    }

  }
}

function jqswMessageErrorNew(text) { //просто для сообщений
 var div=document.createElement('div');
 $(div).addClass('unikalniy_class');
 $(div).html('<div style="align: center; vertical-align: center; margin: 10px;">'+text+'</div>');
 $(div).dialog({
    modal:true,
    show: "fade",
    hide: "fade",
    title: "Ошибка",
    zIndex: 10,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $(div).dialog('destroy');$(div).detach();},
    buttons: {"Ok" : function()  {$(div).dialog('destroy');$(div).detach();} ,
    }
  });
  $(div).dialog('open');
}

function jqswMessageErrorCreate(text){
var line=window.parent.document.getElementById('jqdialog');
$(line).html(text);
$(line).trigger('click');
}


// окно поверх стандартного фансибокса
function jqswtext1(title, text, restart) {
  if (restart==undefined) {
    restart='';
  }

  $('#jqdialog').html(text);
  $('#jqdialog').dialog({
    modal:true,
    title: title,
    zIndex: 'auto',
    close: function(event, ui) {
    if (restart) {
      reloadpage();
    } else  
      $('#jqdialog').dialog('destroy');
    }
  })
}


function jqswfillInfo(text,title,top,min_height,width,left,border,mode) { //просто для сообщений
  if ($('#general-info-tree').hasClass('hide')){
   $("#general-info-tree").toggleClass("hide");
  }
  //$('#info-tree-tabs').html(text);
  $('#info-tree-body').html(text);
  if (title !=''){
   $("#info-tree-container h3").text(title);
  }
  if (left !==undefined){
    $("#info-tree-container").css("left",left+"%");   
  }
  if (border !==undefined){
    $("#info-tree-container").css("border","1px solid #d4d9e3");   
  }
  
  $("#info-tree-body").css("height","auto");
  var h=$(document).scrollTop();
  var WindowBodyHeight=$("#info-tree-body").height();
  var RealclientHeight=document.documentElement.clientHeight;
  //console.log(WindowBodyHeight);
  //console.log($("#info-tree-container").height());
  //console.log($("#waregrouplistdiv").css("height"))
  //console.log(RealclientHeight);
  //$("#info-tree-container").css("top",top+"%");

  if (WindowBodyHeight<(RealclientHeight-60)){
     //if (WindowBodyHeight<(min_height-10)) {
       $("#info-tree-container").css("min-height",WindowBodyHeight+60+"px");
       $("#info-tree-container").css("height",WindowBodyHeight+60+"px");
      if ($("#info-tree-body form#of").length){
        $("#info-tree-body form#of").css("height",WindowBodyHeight-80+"px"); 
        $("#check-ware-body").css("height",WindowBodyHeight-70+"px");
        $("#check-ware-body-wrap").css("height",WindowBodyHeight-110+"px");
//       console.log('33');
       //8console.log($("#waregrouplistdiv").css("height"));
    }

       //$("#info-tree-body").css("height",document.documentElement.clientHeight-60+"px");
       //if ($("#waregrouplistdiv").length){
        //$("#waregrouplistdiv").css("height",document.documentElement.clientHeight-160+"px"); 
         //8console.log($("#waregrouplistdiv").css("height"));
       //}
      // console.log('1');
     //}
     //else{
       //$("#info-tree-container").css("min-height",min_height+"px");
//       console.log('2');
    // }
     //$("#info-tree-container").css("top",h);
  }
  else {
    if (WindowBodyHeight>=RealclientHeight) {
      $("#info-tree-container").css("min-height",RealclientHeight-20+"px");
      $("#info-tree-container").css("height",RealclientHeight-20+"px");
      //$("#info-tree-body").css("height",document.documentElement.clientHeight-60+"px");
      if ($("#info-tree-body form#of").length){
        $("#info-tree-body form#of").css("height",RealclientHeight-150+"px"); 
        $("#check-ware-body").css("height",RealclientHeight-140+"px");
        $("#check-ware-body-wrap").css("height",RealclientHeight-200+"px");
        
         //console.log('3');
         //8console.log($("#waregrouplistdiv").css("height"));
      }
      if ($("#waregrouplistdiv").length){
       $("#waregrouplistdiv").css("height",document.documentElement.clientHeight-160+"px"); 
        //console.log('3');
        //8console.log($("#waregrouplistdiv").css("height"));
      }
      if ($("#orders-choice-body-wrap").length){
        $('#orders-choice-body-wrap').css("height",$("#info-tree-container").height()-45);
        //console.log('3');
        //8console.log($("#waregrouplistdiv").css("height"));
      }
//      console.log('3');
      $("#info-tree-body").css("height","auto");
    }
    else{
     //console.log($("#info-tree-body").height()); 
     //$("#info-tree-container").css("min-height",$("#info-tree-body").height()+10+"px");
     $("#info-tree-container").css("min-height",RealclientHeight-50+"px");
     $("#info-tree-container").css("height",RealclientHeight-50+"px");
     if ($("#info-tree-body form#of").length){
       $("#info-tree-body form#of").css("height",RealclientHeight-190+"px"); 
       $("#check-ware-body").css("height",RealclientHeight-180+"px");
       $("#check-ware-body-wrap").css("height",RealclientHeight-220+"px");
       
        //console.log('3');
        //8console.log($("#waregrouplistdiv").css("height"));
     }
//     console.log('4');
   }
   
  }
  //$("#info-tree-container").css("min-height","none"); 
  
  
  if (width=="auto"){
     $("#info-tree-container").css("width","auto");
  }
  else{
    $("#info-tree-container").css("width",width+"%");
  } 
  if (mode ===undefined){
    var MarginLeft=parseInt((100-width)/2);
    $("#info-tree-container").css("left",MarginLeft+"%");
    //var MarginTop=parseInt(($("#general-info-tree").height()/2)-($("#info-tree-container").height()/2));
    MarginTop=parseInt((document.documentElement.clientHeight/2)-($("#info-tree-container").height()/2));        
    //console.log
    if (MarginTop>0){
      $("#info-tree-container").css("top", MarginTop+"px");
    }
 
    $("#info-tree-container").css("position","fixed");
  }
  var left=parseInt(100*(1-($("#info-tree-container").width()/document.documentElement.clientWidth))/2);
  $("#info-tree-container").css("left",left+"%");
  $("#info-tree-body").css("overflow","hidden");
  $("#info-tree-container").css("min-width","600px");
}




function searchwaresbygroup() {
  var groups=$("#waregrouplistdiv input:checked");
  if (!groups.length) {
    jqswMessageError('Вы должны выбрать хотя бы 1 тип.');
    return 0;
  }
  var s='';
  groups.each(function (i) {
    s+=','+this.value;
  });
  $("#general-info-tree").toggleClass("hide");
  var contrel=$("#contract");
  if (flNewModeCGI){
   ec('waresearch', 'waresearch='+$('#waresearch').val()+'&groups='+s+((isWA)?"&forfirmid="+$("#forfirmid").val():"")+"&contract="+((contrel.length)?contrel.val():""), 'newbj'); 
  }
  else{
    ec('waresearch', 'waresearch='+$('#waresearch').val()+'&groups='+s+((isWA)?"&forfirmid="+$("#forfirmid").val():"")+"&contract="+((contrel.length)?contrel.val():""), 'abj');  
  }
}

function searchautocompleteinit(selector) {
  if (!$(selector).length) return false;
  $(selector).autocomplete({
    minLength:0,
    open: function(event, ui) {
      $(event.target).attr('opened', 'true');
    },
    close: function(event, ui) {
      $(event.target).attr('opened', 'false');
    },
    select: function(event, ui) {
      event.target.value=ui.item.value;
      $(event.target).parents('form').submit();
    }
  });
}

function mtrim(s)
{
  while (s.length && s.charAt(0)==' ')
      {s=s.substr(1, s.length-1);}
  while (s.length && s.charAt(s.length-1)==' ')
      {s=s.substr(0, s.length-1);}
      return s;
}

function reloadpage() {
  s=document.location.href;
  if ((i=s.indexOf('#'))!=-1) s=s.substring(0, i);
  document.location.href=s;
}

function fnIfStr(Cond, sTrue, sFalse){   //аналог из делфи
  if (Cond) { 
    return sTrue; 
  }
  else{
    return sFalse;  
  }
}

function changeDataDelivery(){
 var tt=$('#fillheaderbeforeprocessingdiv [name^="tt"]').val();  
 if (IsEmptySheduler){
   $('#deliverykind').empty(); 
   $('#deliverytimeout').empty(); 
   $('#deliverytimein').empty();  
   $('#shedulercode').val('0');
 }
 var deliverydate=$('#fillheaderbeforeprocessingdiv select[name^="deliverydate"] option:selected').text();  
 var v=$('#fillheaderbeforeprocessingdiv input[name^="typeofgetting"]:checked').val(); 
 $('#deliverydatetext').val(deliverydate.substring(0,10)); 
 if (v==2){ 
   if ($('#pickuptimespan select[name^="pickuptime"]').attr("_OldTime")==""){
      ec('getTimeListSelfDelivery','date='+deliverydate.substring(0,10)+'&OldTime=null&contract='+$('#contract').val(),fnIfStr(flNewModeCGI,'newbj','abj'));
    }
   else{
     ec('getTimeListSelfDelivery','date='+deliverydate.substring(0,10)+'&OldTime='+$('#pickuptimespan select[name^="pickuptime"]').attr("_OldTime")+'&contract='+$('#contract').val(),fnIfStr(flNewModeCGI,'newbj','abj'));
    }
 } 
 if ( IsEmptySheduler){  // чтобы при заполнении не вычищало
   fillHelpDesk(); 
 }
 $("#pick-up-time-select").selectmenu("refresh");
}

function changeTimeDelivery(elem){
 //console.log('Привет');
 var deliverydate=$('#fillheaderbeforeprocessingdiv select[name^="deliverydate"] option:selected').text(); 
 if (deliverydate !=''){
   $(elem).attr("_OldTime",$('#pickuptimespan select[name^="pickuptime"] option:selected').val());
   //elem.style.backgroundColor=elem.options[this.selectedIndex].style.backgroundColor;
   //$("#pick-up-time-select-button .ui-selectmenu-text").css("background-color",elem.options[this.selectedIndex].style.backgroundColor);
   //for(var i = 1; i < this.options.length; i++){ 
    //elem.options[i].style.backgroundColor='#FFFFFF'; 
   //} 
 }
 if ( IsEmptySheduler){  // чтобы при заполнении не вычищало
    fillHelpDesk(); 
  }
}

function changeMeetPerson(elem){
 var meettext=$('#fillheaderbeforeprocessingdiv select[name^="meet-person"] option:selected').text(); 
 var btn = document.getElementById('showdeliveriesbtn'); 
 if ((elem.value !=0) && (meettext !='')) { 
   btn.disabled = false;
 }
 else { if (!btn.disabled) { btn.disabled = true; } 
 }
 if ( IsEmptySheduler){  // чтобы при заполнении не вычищало
   fillHelpDesk(); 
 }
}

function changeTTDelivery(elem){
 if (IsEmptySheduler){
   $('#deliverykind').empty(); 
   $('#deliverytimeout').empty(); 
   $('#deliverytimein').empty();  
   $('#shedulercode').val('0');
 }
 var deliverydate=$('#fillheaderbeforeprocessingdiv select[name^="deliverydate"] option:selected').text(); 
 var btn = document.getElementById('showdeliveriesbtn'); 
 if ((elem.value !=0) && (deliverydate !='')) { 
   btn.disabled = false;
 }
 else { if (!btn.disabled) { btn.disabled = true; } 
 }
 if ( IsEmptySheduler){  // чтобы при заполнении не вычищало
   fillHelpDesk(); 
 }
}

function clickDeliveryBtn(elem){
 if (!elem.disabled) {
   var tt=$('#fillheaderbeforeprocessingdiv [name^="tt"]').val();
   var deliverydate=$('#fillheaderbeforeprocessingdiv select[name^="deliverydate"] option:selected').text(); 
   var shedulercode=$('#shedulercode').val(); 
   if ( ($('#deliveryshedulerdiv').attr('tt')!=tt) || ($('#deliveryshedulerdiv').attr('deliverydate')!=deliverydate.substring(0,10)) ){ 
     ec('filldeliverysheduler', '_tt='+tt+'&_deliverydate='+deliverydate.substring(0,10)+'&_shedulercode='+shedulercode+'&contractid='+$('#curcontract').val(),fnIfStr(flNewOrderMode,'newbj','abj'));
   }
   else { $('#deliveryshedulerdiv').dialog('open');
   }
 }
}

function fillDelivetyField(){//заполняет поля для списка расписаний
   $("#deliverykind").text(this.childNodes[2].innerHTML);
   $("#deliverytimeout").text(this.childNodes[1].innerHTML);
   var elem=this.childNodes[3];
   $("#deliverytimein").text($(elem).text());
   $("#shedulercode").val(this.childNodes[0].innerHTML);
   $('#sheduler-info-tree').toggleClass('hide');
   fillHelpDesk();
   checkWareOnStorage();
  //$(this.childNodes[1]).css("font-weight", "bold");
}

function clickDeliveryRadioButton (){
  var v=$("#fillheaderbeforeprocessingdiv input[name^='typeofgetting']:checked").val();
  checkWareOnStorage();
  if (v==0) {
    $("#fillheaderbeforeprocessingdiv div[name^='datetimediv']").css('display', 'block');
    $("#pickuptimespan").css('display', 'none');
    $("#deliverychoicediv").css('display', 'block');
    $("#datetimediv_field").css('display', 'block');
    //$("#fillheaderbeforeprocessingdiv [name^='tt']").css('display', 'block');
    $("#showdeliveriesbtn").css('display', 'block');
    $("#ttCaption").css('display', 'block');
    $("#_tt-order-select-button").css("display","table-cell");

  }
  if (v==1) {
    $("#fillheaderbeforeprocessingdiv div[name^='datetimediv']").css('display', 'none');
    $("#pickuptimespan").css('display', 'none');
    $("#deliverychoicediv").css('display', 'none');
    $("#datetimediv_field").css('display', 'none');
  }
  if (v==2) {
    $("#fillheaderbeforeprocessingdiv div[name^='datetimediv']").css('display', 'block');
    $("#fillheaderbeforeprocessingdiv [name^='tt']").css('display', 'none');
    $("#_tt-order-select-button").css("display","none");
    $("#showdeliveriesbtn").css('display', 'none');
    $("#ttCaption").css('display', 'none');
    $("#pickuptimespan").css('display', 'inline');
    var deliverydate=$("#fillheaderbeforeprocessingdiv select[name^='deliverydate'] option:selected").text(); 
    if (deliverydate!=''){ 
      ec("getTimeListSelfDelivery","date="+deliverydate.substring(0,10)+"&OldTime="+$("#pickuptimespan select[name^='pickuptime']").val()+
      "&contract="+$("#contract").val(),fnIfStr(flNewModeCGI,"newbj","abj"));
    } 
    else { 
      $('#pickuptimespan select[name^="pickuptime"]')[0].options.length=0;
    }  
    $("#deliverychoicediv").css('display', 'none');
    $("#datetimediv_field").css('display', 'block');
  }
  if ( IsEmptySheduler){  // чтобы при заполнении не вычищало
    fillHelpDesk(); 
  }
}

function fillHelpDesk(){//для окна выболра доставки , заполняем строку-подсказку
 var resultStr='';
 var v=$("#fillheaderbeforeprocessingdiv input[name^='typeofgetting']:checked").val();
 var btn = document.getElementById('showdeliveriesbtn');
  btn.disabled = false;
 if ( ($("#delivery-date-select-button .ui-selectmenu-text").text()=='') && (v !=1)){
  btn.disabled = true;
  resultStr+='Выберите Дату';
  $("#deliverykind").empty();
  $("#deliverytimeout").empty();
  $("#deliverytimein").empty();
  $("#shedulercode").val('0');
 }
 
 if ( ($("#pick-up-time-select").val()==null) && (v==2)){
  if (resultStr!=''){resultStr+=' , выберите Время';  }
  else{resultStr+='Выберите Время';}
 }
 
 if ( ($("#_tt-order-select-button .ui-selectmenu-text").text()=='') && (v==0)) {
  btn.disabled = true;
  if (resultStr!=''){resultStr+=' , выберите Торговую точку';  }
  else{resultStr+='Выберите Торговую точку';}
    $("#deliverykind").empty();
    $("#deliverytimeout").empty();
    $("#deliverytimein").empty();
    $("#shedulercode").val('0');
 }
 
 //if ( ($("#meet-person-select-button .ui-selectmenu-text").text()=='') && (v !=1)) {
 if (($("#fillheaderbeforeprocessingdiv [name^='meet-person']").val()==0) && (v !=1)) {
   btn.disabled = true;
  if (resultStr!=''){resultStr+=' , выберите Встречающего';  }
  else{resultStr+='Выберите Встречающего';}
    $("#deliverykind").empty();
    $("#deliverytimeout").empty();
    $("#deliverytimein").empty();
    $("#shedulercode").val('0');
 }
 
 if ( ($("#shedulercode").val()=='0') && (v==0)) {
  if (resultStr!=''){resultStr+=' , выберите Расписание';  }
  else{resultStr+='Выберите Расписание';}
 }
 
 $("#helpdesk").text(resultStr);
}


function checkWareOnStorage(){//для окна выболра доставки , заполняем строку-подсказку
 var resultStr='';
 var isHaveDate=true;
 $("#deliverycommentdiv").css("display","block"); 
 var v=$("#fillheaderbeforeprocessingdiv input[name^='typeofgetting']:checked").val();
 var deliverydate=$("#fillheaderbeforeprocessingdiv select[name^='deliverydate'] option:selected").text();
  if ( ($("#fillheaderbeforeprocessingdiv select[name^='deliverydate'] option:selected").text()=='') && (v !=1)){
    resultStr+='Выберите Дату';
    isHaveDate=false;
  }
  
 if ( ($("#pick-up-time-select").val()==null) && (v==2)){
   resultStr+='Выберите Время';
  }
 
 if ( ($("#fillheaderbeforeprocessingdiv [name^='tt']").val()==null) && (v==0)) {
  resultStr+=' , Выберите Торговую точку';  
 }

 if (($("#fillheaderbeforeprocessingdiv [name^='meet-person']").val()==0) && (v !=1)) {
  resultStr+=' , Выберите Встречающего';  
 }
 
 if ( ($("#shedulercode").val()=='0') && (v==0)) {
    if(resultStr ==''){
      resultStr+='Выберите Расписание';
    }
    else{
      resultStr+=' , Выберите Расписание';
    }  
  }
 
 

 if ((resultStr=='') && (!$("#invoicenum").length) && ($("forcheckorder").val!='1') ) {
    if (document.getElementById("addlines")) {
      var v=$("#fillheaderbeforeprocessingdiv input[name^='typeofgetting']:checked").val();
      if (v==1){
        $("#deliverycommentdiv").css("display","none");
        if ( $("#gift").length){
          var OrderCode=$("#gift").attr("_ordr");
          ec('checkorderwarerests', 'shipdate=0&ordr='+OrderCode+'&deliverykind='+v,fnIfStr(flNewOrderMode,"newbj","abj")); 
        }
        else{
          ec('checkorderwarerests', 'shipdate=0&ordr='+document.getElementById('addlines').value+'&deliverykind='+v,fnIfStr(flNewOrderMode,"newbj","abj")); 
        }
        
      }
      else{
        if ( $("#gift").length){
          var OrderCode=$("#gift").attr("_ordr");
          ec('checkorderwarerests', 'shipdate='+deliverydate.substr(0,10)+'&ordr='+OrderCode+'&deliverykind='+v,fnIfStr(flNewOrderMode,"newbj","abj"));
        }
        else{
          ec('checkorderwarerests', 'shipdate='+deliverydate.substr(0,10)+'&ordr='+document.getElementById('addlines').value+'&deliverykind='+v,fnIfStr(flNewOrderMode,"newbj","abj"));
        }
        
      }  
   }
 
 }
 else {
  if (isHaveDate) {
     if ( $("#gift").length){
       ec('checkorderwarerests', 'shipdate='+deliverydate.substr(0,10)+'&ordr='+$("#gift").attr("_ordr")+'&deliverykind='+v,fnIfStr(flNewOrderMode,"newbj","abj"));   
     }
     else{
       ec('checkorderwarerests', 'shipdate='+deliverydate.substr(0,10)+'&ordr='+document.getElementById('addlines').value+'&deliverykind='+v,fnIfStr(flNewOrderMode,"newbj","abj")); 
     }
  }else{
    $("#warningwarestr").text('');
  }
 }
}

function fillFormOrders(){//заполняет все  поля формы заказа при ее открытии
//alert();
 if ( $("#gift").length){
   var OrderCode=$("#gift").attr("_ordr");
    ec("fillparametrsallorder","ordercode="+OrderCode,"abj");
   //alert('1');
 }
 else if ($("#invoicenum").length){
    var OrderCode=$("#invoicecode").val();
    var forfirmid=$("#forfirmid").val();  
    //alert(forfirmid);
    ec("fillparametrsallorder","accid="+OrderCode+"&forfirmid="+forfirmid,"abj");
   } 
   else{
     var OrderCode=document.getElementById('addlines').value;
     //alert('3');
     ec("fillparametrsallorder","ordercode="+OrderCode,"abj");
   }

}//fillFormOrders

function fillFormOrdersNew(){//заполняет все  поля формы заказа при ее открытии
//alert();
 if ( $("#gift").length){
   var OrderCode=$("#gift").attr("_ordr");
    ec("fillparametrsallorder","ordercode="+OrderCode,"newbj");
   //alert('1');
 }
 else if ($("#invoicenum").length){
    var OrderCode=$("#invoicecode").val();
    var forfirmid=$("#forfirmid").val();  
    //alert(forfirmid);
    ec("fillparametrsallorder","accid="+OrderCode+"&forfirmid="+forfirmid,"newbj");
   } 
   else{
     var OrderCode=document.getElementById('addlines').value;
     //alert('3');
     ec("fillparametrsallorder","ordercode="+OrderCode,"newbj");
   }

}

function jqswConfirmOrder(text) { //для замены окна подтверждения , в частности заказа
  $('#jqdialog').html('<div style="align: center; vertical-align: center; margin: 10px;">'+text+'</div>');
  $('#jqdialog').dialog({
    modal:true,
    show: "fade",
    hide: "fade",
    title: "Подтверждение",
    zIndex: 1100,
    width:"auto",
    height:"auto",
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Да" : function()  { sendAllData();$('#jqdialog').dialog('destroy');} ,
              "Нет" : function() {$('#jqdialog').dialog('destroy');}
    }
  });
   $('#jqdialog').dialog('open');
}

function sendAllData(){  //сохраняет все параметры  формы Отправки и отправляет заказ
 //console.log(elem);
//if (confirm('Вы действительно хотите отправить заказ на обработку?')) {
 startLoadingAnimation(); 
 var joinacc=false;
 var meettext='';
 if ( $("#gift").length){
   $("#ordr").val($("#gift").attr("_ordr"));
   $("#sendordermark").val('3');
   ec("saveparametrsfromorder", $("#fillheaderbeforeprocessingdiv form").serialize()+'&joinacc='+joinacc,fnIfStr(flNewOrderMode,"newbj","abj"));
  }
 else if ($("#invoicenum").length){
       $("#ordr").val(document.getElementById('invoicecode').value);
       $("#forfirmiddeliv").val(document.getElementById('forfirmid').value);  
        //alert(forfirmid);
        ec("saveparametrsfromorder", $("#fillheaderbeforeprocessingdiv form").serialize()+'&joinacc='+joinacc,fnIfStr(flNewOrderMode,"newbj","abj"));  
          }
      else{
       $("#ordr").val(document.getElementById('addlines').value);
       $("#sendordermark").val('3');
       //alert($("#joinaccountcheck").prop("checked"));
       if ($("#joinaccountcheck").prop("checked")) {joinacc=true;}
       meettext=$("#meet-person-select-button .ui-selectmenu-text").text();
       ec("saveparametrsfromorder", $("#fillheaderbeforeprocessingdiv form").serialize()+'&joinacc='+joinacc+'&meet-text='+meettext,fnIfStr(flNewOrderMode,"newbj","abj"));
      }
 //} 
}  


function clearAllInput(){//очищает формы Отправки доставки при закрытии ее
  $("#warrantperson").val("");
  $("#warrantnum").val("");
  $("#ordercomment").val(""); 
  $("#deliverykind").val("");
  $("#deliverytimeout").val("");
  $("#deliverytimein").val("");
  $("#shedulercode").val("");
  $("#helpdesk").empty();
  $("#warningwarestr").empty();
  $("#deliverydatetext").val("");
  $("#fillheaderbeforeprocessingdiv [name^='warrantdate']").val(""); 
  var list=$("#pickuptimespan select[name^='pickuptime']")[0];  //переменная списка
  list.options.length=0;
  var list=$("#fillheaderbeforeprocessingdiv select[name^='deliverydate']")[0];  //переменная списка
  list.options.length=0;
  list=$("#fillheaderbeforeprocessingdiv select[name^='tt']")[0];  //переменная списка
  list.options.length=0;
  var btn = document.getElementById('showdeliveriesbtn');
  if (!btn.disabled){btn.disabled = true;}
  $("#delivery-date-select-button .ui-selectmenu-text").text('');
  $("#_tt-order-select-button .ui-selectmenu-text").text('');
  $("#meet-person-select-button .ui-selectmenu-text").text('');
} 

function saveAllData(){  //сохраняет все параметры  формы Отправки
 //console.log(elem);
 var joinacc=false;
 var meettext='';
  if ( $("#gift").length){
   $("#ordr").val($("#gift").attr("_ordr"));
   $("#sendordermark").val('3');
   ec("saveparametrsfromorder", $("#fillheaderbeforeprocessingdiv form").serialize()+'&joinacc='+joinacc,fnIfStr(flNewOrderMode,"newbj","abj"));
  }
 else if ($("#invoicenum").length){
       $("#ordr").val(document.getElementById('invoicecode').value);
       $("#forfirmiddeliv").val(document.getElementById('forfirmid').value);  
        //alert(forfirmid);
        ec("saveparametrsfromorder", $("#fillheaderbeforeprocessingdiv form").serialize()+'&joinacc='+joinacc,fnIfStr(flNewOrderMode,"newbj","abj"));  
          }
      else{
       $("#ordr").val(document.getElementById('addlines').value);
       $("#sendordermark").val('3');
       if ($("#joinaccountcheck").prop("checked")) {joinacc=true;}
       meettext=$("#meet-person-select-button .ui-selectmenu-text").text();
       ec("saveparametrsfromorder", $("#fillheaderbeforeprocessingdiv form").serialize()+'&joinacc='+joinacc+'&meet-text='+meettext,fnIfStr(flNewOrderMode,"newbj","abj"));
      
      }
  
} 

function viewWareSearchDialog(a){
 //console.log($(a).attr("_bonus"));
 var modelid=($('#modelnodesearch_model').length?$('#modelnodesearch_model').attr('code'):'');
 var nodeid=($('#modelnodesearch_node').length?$('#modelnodesearch_node').attr('code'):'');
 var widialog=$('#viewsearchingwarediv'); 
 if ( (widialog.attr('_oldcodeproduct') !=$(a).attr("warecode")) || (widialog.attr('_node') !=nodeid) || (widialog.attr('_model') !=modelid) ) {
   if ($("#viewsearchingwarediv").parent().css('display') !='block'){
     widialog.html('').dialog({ height: 'auto'}); 
	 setCSSviewWareSearchDialog2($(a).attr("_bonus"));
    if (a.tagName=='A'){
       widialog.load(a.href+'&win=UI');
     }
     if (a.tagName=='DIV'){
       widialog.load($(a).attr("hren")+'&win=UI');
     } 
    if (a.tagName=='LI'){
       widialog.load($(a).attr("hren")+'&win=UI');
     } 
     $("#viewsearchingwarediv").parent().css('display','block');
//     setTimeout(setCSSviewWareSearchDialog($(a).attr("_bonus")), 1000);
   }
   else{
     setCSSviewWareSearchDialog2($(a).attr("_bonus"));
     if (a.tagName=='A'){
       widialog.load(a.href+'&win=UI');
     }
     if (a.tagName=='DIV'){
       widialog.load($(a).attr("hren")+'&win=UI');
     }
    if (a.tagName=='LI'){
       widialog.load($(a).attr("hren")+'&win=UI');
     }
//     setTimeout(setCSSviewWareSearchDialog($(a).attr("_bonus")), 1000);
   }
 }
 else{
   $("#viewsearchingwarediv").parent().css('display','block');
   //$("#main-banner").removeClass('hide');
   $("#viewsearchingwarediv").parent().removeClass("hide");

 }
 
 $("#viewsearchingwarediv").parent().css('z-index',"102");
 return false;
}

function setCSSviewWareSearchDialog(bonus) {
 if (bonus=='true'){
   $("#viewsearchingwarediv").parent().css('left', '25%')/*.css('top',h)*/.css('max-height',"700px").css('min-height',"auto").css('min-width',"950px").css('width',$("#wareinfodiv").width()); 
   $("#viewsearchingwarediv").css('max-height',"670px").css('overflow','hidden');
   $("#wareinfodivWrap").css("max-height","650px").css('overflow','auto').css('height','100%');
   $("#viewsearchingwarediv").css('min-height',"auto");
   if ($(".viewdescriptiondiv span").height()>19){
     
   }
  }
  else{
    $("#viewsearchingwarediv").parent().css('left', '25%')/*.css('top',h)*/.css('max-height',"700px").css('min-height',"auto").css('min-width',"820px").css('width',$("#wareinfodiv").width());
    $("#viewsearchingwarediv").css('max-height',"670px").css('overflow','hidden');
    $("#wareinfodivWrap").css("max-height","650px").css('overflow','auto').css('height','100%');
    $("#viewsearchingwarediv").css('min-height',"auto");
  }
  $("#viewsearchingwarediv").parent().find('button').bind("click", function(event) {
      $("#viewsearchingwarediv").parent().css("display",'none');
    });
  var btn=$("#viewsearchingwarediv").parent().find("button.ui-dialog-titlebar-close");
  btn.bind('click', function(event) {
    $("#main-banner").addClass("hide");
  });
  if (btn.html()==''){
    var s1='<span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span>';
    btn.html(s1);
    $(btn).toggleClass("ui-button ui-corner-all ui-widget ui-button-icon-only");
  }
  $("#viewsearchingwarediv").parent().css('position', 'absolute');
 
//  $("#main-banner").toggleClass('hide');

  $(".ui-dialog").each(function (e) {
    if ($(this).css('display')=='block'){
     $(this).resizable({
        resize: function( event, container ) {
          //if ($(this).height()>450){
            $("#viewsearchingwarediv").css("height",$(this).height()-30+"px");
            //$("#wareinfodivWrap").css("height",$(this).height()-20+"px");
          //} 
          //console.log($(this).height());
          //if ($(this).width()>450){
          $("#viewsearchingwarediv").css("width","100%"); 
          //setPositionviewWareSearchDialog(bonus);
        }
     });  
    }
  });
  intervalID4=setInterval('setPositionviewWareSearchDialog('+bonus+')', 2000);
  
}

function setCSSviewWareSearchDialog2(bonus) {
  var widialog=$('#viewsearchingwarediv'); 
  var br=$(".main-content").offset();
  widialog.html('').dialog({ height: 'auto'});     
  $("#viewsearchingwarediv").parent().css('display','block').css('left',br.left+parseInt($(".main-content").width()*0.13)+'px').css('min-width','900px')
  .css("top","15%").css('height',parseInt(document.documentElement.clientHeight*0.70)+'px').css('min-height','400px').css('max-width','1200px'); 
  $("#viewsearchingwarediv").parent().css('position', 'absolute').css("visibility","hidden");
  $("#viewsearchingwarediv").css('height',parseInt(document.documentElement.clientHeight*0.70)-30+'px').css('min-height','370px').css('min-width','100%').css('max-width','1200px');  
  var btn=$("#viewsearchingwarediv").parent().find("button.ui-dialog-titlebar-close");
  btn.bind('click', function(event) {
    $("#viewsearchingwarediv").parent().css('display','none');
  });
  if (btn.html()==''){
    var s1='<span class="ui-button-icon ui-icon ui-icon-closethick"></span><span class="ui-button-icon-space"> </span>';
    btn.html(s1);
    $(btn).toggleClass("ui-button ui-corner-all ui-widget ui-button-icon-only");
  }
  var h=$(document).scrollTop();
  $("#viewsearchingwarediv").parent().css("top",h+parseInt(document.documentElement.clientHeight*0.15)+"px");

  intervalID4=setInterval('setScrollviewWareSearchDialog('+bonus+')', 2000);
}

function setScrollviewWareSearchDialog(bonus) {
   $("#wareinfodivWrap").mCustomScrollbar({
     alwaysShowScrollbar: 0
   });
   clearInterval(intervalID4);
   $("#viewsearchingwarediv").parent().css("visibility","visible");
   $("#viewsearchingwarediv").parent().resizable({
      resize: function( event, container ) {
       var left1=(document.documentElement.clientWidth-$("main.main-content").width())/2;
       var left2=$("#viewsearchingwarediv").parent().position().left;
       var right1=left1+$("main.main-content").width();
       var right2=$("#viewsearchingwarediv").parent().position().left+$("#viewsearchingwarediv").parent().width();
       if (left2 <left1){$("#viewsearchingwarediv").parent().css("left",left1+"px");}
       if (right2>right1){$("#viewsearchingwarediv").parent().css("left",$("#viewsearchingwarediv").parent().position().left-(right2-right1+5)+"px");}
       var bottom1=document.documentElement.clientHeight;
       var bottom2=$("#viewsearchingwarediv").parent().position().top+$("#viewsearchingwarediv").parent().height();
       if (bottom1<bottom2){
         $("#viewsearchingwarediv").parent().css("height",document.documentElement.clientHeight-$("#viewsearchingwarediv").parent().position().top+"px");
         $("#viewsearchingwarediv").css('height',document.documentElement.clientHeight-$("#viewsearchingwarediv").parent().position().top-30+'px');
       }
      }
    });
    $("#viewsearchingwarediv").parent().draggable({ drag:function(event, ui){
      //console.log(ui.position.left);
      //console.log(ui.position.top);
      /*var left1=(document.documentElement.clientWidth-$("main.main-content").width())/2;
      var left2=$("#viewsearchingwarediv").parent().position().left;
      console.log(left1);
      console.log(left2);
      var right1=left1+$("main.main-content").width();
      var right2=$("#viewsearchingwarediv").parent().position().left+$("#viewsearchingwarediv").parent().width();
      if (left2 <left1){
        //$("#viewsearchingwarediv").parent().css("left",left1+"px");
        ui.position.left = left1;
      }
      if (right2>right1){
        //$("#viewsearchingwarediv").parent().css("left",$("#viewsearchingwarediv").parent().position().left-(right2-right1+5)+"px");
        ui.position.left=$("#viewsearchingwarediv").parent().position().left-(right2-right1+5);
      }*/
      var bottom1=document.documentElement.clientHeight;
      var bottom2=$("#viewsearchingwarediv").parent().position().top+$("#viewsearchingwarediv").parent().height();
      if (bottom1<bottom2){
        ui.position.top=document.documentElement.clientHeight-$("#viewsearchingwarediv").parent().height()-1;
        //$("#viewsearchingwarediv").parent().css("height",document.documentElement.clientHeight-$("#viewsearchingwarediv").parent().position().top+"px");
      }
      //containment:"#main-content" 

    },
    
   containment: '#main-content' 
  });

}

function setPositionviewWareSearchDialog(bonus) {
  h=$(document).scrollTop();
  //console.log($("#viewsearchingwarediv").parent().height()); 
  //console.log(document.documentElement.clientHeight);
  //console.log(bonus);
  if ($("#viewsearchingwarediv").parent().height()>document.documentElement.clientHeight){
    $("#viewsearchingwarediv").css('max-height',document.documentElement.clientHeight-45+"px").css('height',document.documentElement.clientHeight-45+"px");
    //if (bonus !='true'){
    $("#wareinfodivWrap").css('max-height',document.documentElement.clientHeight-50+"px").css('height',document.documentElement.clientHeight-50+"px");
    //}
    $("#viewsearchingwarediv").parent().css('max-height',document.documentElement.clientHeight-10+"px").css('height',document.documentElement.clientHeight-10+"px");
    $("#viewsearchingwarediv").parent().css("top",h+5+"px");
  }
  else{
    var MarginTop=parseInt((document.documentElement.clientHeight/2)-($("#viewsearchingwarediv").parent().height()/2)); 
    if (MarginTop>0){
      if (h>document.documentElement.clientHeight){
        $("#viewsearchingwarediv").parent().css("top", h+MarginTop+"px");
      }
      else{
         $("#viewsearchingwarediv").parent().css("top", MarginTop+"px");
      }
    } 
     $("#wareinfodivWrap").css('max-height',$("#viewsearchingwarediv").parent().height()-35+"px").css('height',$("#viewsearchingwarediv").parent().height()-35+"px");
  }
  clearInterval(intervalID4);
  if (bonus !='true'){
   /* $("#wareinfodivWrap").mCustomScrollbar({
      alwaysShowScrollbar: 0
    });*/
  }
  var left=parseInt(100*(1-($("#viewsearchingwarediv").width()/document.documentElement.clientWidth))/2);
  $("#viewsearchingwarediv").parent().css("left",left+"%");
} 

function setPositionWindowDialog(elem_id) {
  if ($("#"+elem_id).height()>document.documentElement.clientHeight){
    $("#"+elem_id).css('max-height',document.documentElement.clientHeight-10+"px").css('height',document.documentElement.clientHeight-10+"px");
     h=$(document).scrollTop();
    $("#"+elem_id).css("top",h+5+"px");
  }
  else{
    var MarginTop=parseInt((document.documentElement.clientHeight/2)-($("#"+elem_id).height()/2)); 
    if (MarginTop>0){
      $("#"+elem_id).css("top", MarginTop+"px");
    } 
  }
} 

function fillAccountParametr(Stream1,Stream2){
  var title_='Создание счета на оплату';
  var text='<div class="debt-container">';
  text+='<input type=hidden name=code value="">';
  text+='<table class="table-body debt-table-body table-left" id="new-acc-table">';
  text+='<tr><td class="col">Контракт:</td><td class="col">*</td><td class="col"><select class="login-input new-acc" name="contId" id="acccontractlist" >';
  var i;
  var listCount=Stream1.arlen;
  for (i=0; i<listCount; i++){  
    text+='<option value='+Stream1.artable[i][0]+'>'+Stream1.artable[i][1]+'</option>';
  }
  text+='</select></td></tr>';
  text+='<tr><td class="col">Плательщик:</td><td class="col">*</td><td class="col"><select class="login-input new-acc" name="persID" onChange="fillSumLimitAcc(); " id="accpaylist" >';
  listCount=Stream2.arlen;
  for (i=0; i<listCount; i++){  
    text+='<option _index="'+i+'" _sum="'+Stream2.artable[i][2]+'" value='+Stream2.artable[i][0]+'>'+Stream2.artable[i][1]+'</option>';
   }
  text+='</select></td></tr>';
  text+='<tr><td class="col">Телефон:</td><td class="col">*</td><td class="col"><select class="login-input new-acc" name="phone" id="acctellist" ></select></td></tr>';
  text+='<tr><td class="col">E-mail:</td><td class="col"></td><td class="col"><select class="login-input new-acc" name="email" id="accemaillist" ></select></td></tr>';
  text+='<tr><td class="col">Сумма:</td><td class="col">*</td><td class="col"><input class="svkinput" type=text name="sum" id="accsum" value=""><span id="accsumlimitspan"></td></tr>'
  text+='<tr class="no-padding"><td class="col"></td><td class="col">*</td><td class="col"> - Обязательное поле для заполнения</td></tr>'
  text+='<tr class="no-padding"><td class="col"></td><td class="col"></td><td class="col"> &nbsp; &nbsp;Cчет действителен в течение дня</td></tr>'
  text+='</table>';
  text+='</div>';
  text+='<div class="text-right">';
  text+='<a class="apply-btn btn" onclick="saveNewAcc();">Сохранить</a>';
  text+='<a class="close-btn btn info-close" onclick="">Отменить</a>';
  text+='</div>';
  jqswfillInfo(text, title_,2,450,20);
  fillSumLimitAcc();

  $("#acccontractlist").selectmenu({
    change: function( event, ui ) {
      var selectVal = ui.item.value;
    }
  });   

  $("#accpaylist").selectmenu({
    change: function( event, ui ) {
      var selectVal = ui.item.value;
      fillSumLimitAcc2();
    }
  });   

  $("#acctellist").selectmenu({
    change: function( event, ui ) {
      var selectVal = ui.item.value;
    }
  });   

  $("#accemaillist").selectmenu({
    change: function( event, ui ) {
      var selectVal = ui.item.value;
    }
  }); 
  
  $("#acccontractlist-menu").parent().css('z-index','220');
  $("#acctellist-menu").parent().css('z-index','220');
  $("#accemaillist-menu").parent().css('z-index','220');
  $("#accpaylist-menu").parent().css('z-index','220');
  $("#info-tree-body").css("height",$("#info-tree-container").height()-40+"px").css("overflow","auto");
}
 
 function fillSumLimitAcc(){
  if ( $("#accpaylist :selected").text() !='') {
     $("#accsumlimitspan").text("Не более "+$("#accpaylist :selected").attr('_sum')+"грн.");
     $("#acctellist").empty();
     $("#accemaillist").empty();  
     var j=$("#accpaylist :selected").attr('_index');
     var listCount=TStream2.artable[j][3]; 
     for (i=0; i<listCount; i++){  
       $("#acctellist").append( $('<option>'+TStream2.artable[j][4][i]+'</option>'));
     }
     var listCount=TStream2.artable[j][5]; 
     for (i=0; i<listCount; i++){  
       $("#accemaillist").append( $('<option >'+TStream2.artable[j][6][i]+'</option>'));
     }
   }
 }
 
 function fillSumLimitAcc2(){
  if ( $("#accpaylist :selected").text() !='') {
     $("#accsumlimitspan").text("Не более "+$("#accpaylist :selected").attr('_sum')+"грн.");
     $("#acctellist").empty();
     $("#accemaillist").empty();  
     var j=$("#accpaylist :selected").attr('_index');
     var listCount=TStream2.artable[j][3]; 
     for (i=0; i<listCount; i++){  
       $("#acctellist").append( $('<option>'+TStream2.artable[j][4][i]+'</option>'));
     }
     var listCount=TStream2.artable[j][5]; 
     for (i=0; i<listCount; i++){  
       $("#accemaillist").append( $('<option >'+TStream2.artable[j][6][i]+'</option>'));
     }
     $("#acctellist").selectmenu("refresh");
     $("#accemaillist").selectmenu("refresh");

   }
 }

function saveNewAcc(){
if ( ($("#acccontractlist :selected").text() =='') || ($("#acctellist :selected").text() =='') || ($("#accpaylist :selected").text() =='')
             || ($("#accsum").val() =='') ){
             jqswMessageError("Не заполнено одно из обязательных полей.");
             setTimeout(setPositionInfoDialogEngine, 2000);
            }
          else {
            saveNewAccountParametr();
          }
}


function saveNewAccountParametr()
{
  if (!$("a#acclink").hasClass('active') && (!$("#debt").hasClass('hide'))){
   ec("savenewacc",$("#acccontractlist").serialize()+"&"+$("#accpaylist").serialize()+"&"+$("#acctellist").serialize()+"&email="+$("#accemaillist :selected").text()+"&"+$("#accsum").serialize()+"&isfrominfo=true","newbj");
   //document.location.href=scriptname+"/debt?act=acc&isfrominfo=true";
   //document.location.href=scriptname+"/debt?act=acc&mode=2&"+$('#acccontractlist').serialize()+"&"+$('#accpaylist').serialize()+"&"+$('#acctellist').serialize()+"&email="+$('#accemaillist :selected').text()+"&"+$('#accsum').serialize();
  }
  else{
    ec("savenewacc",$("#acccontractlist").serialize()+"&"+$("#accpaylist").serialize()+"&"+$("#acctellist").serialize()+"&email="+$("#accemaillist :selected").text()+"&"+$("#accsum").serialize(),"newbj");
  }
}

function addrowacc(Stream1){  // добавляет строчку в таблицу Финангсы/счета
  if (Stream1.artable.length>0){
    var newrow;
    var newcell;
    var tbl=$("#debt-table-body")[0];
    newrow=tbl.insertRow(-1);
    newcell=newrow.insertCell(-1);
    $(newcell).toggleClass('col with-border');
    newcell.innerHTML=''+Stream1.artable[0][1]+'';
    newcell=newrow.insertCell(-1);
    $(newcell).toggleClass('col with-border');
    newcell.innerHTML=''+Stream1.artable[0][2]+'';
    newcell=newrow.insertCell(-1); 
    $(newcell).toggleClass('col with-border');
    newcell.innerHTML=''+Stream1.artable[0][3]+'';
    newcell=newrow.insertCell(-1);
    $(newcell).toggleClass('col with-border');
    newcell.innerHTML=''+Stream1.artable[0][4]+'';
    newcell=newrow.insertCell(-1);
    $(newcell).toggleClass('col with-border');
    newcell.innerHTML=''+Stream1.artable[0][5]+'';
    newcell=newrow.insertCell(-1);
    $(newcell).toggleClass('col with-border');
    newcell.innerHTML='<button code_= "'+Stream1.artable[0][0]+'" class="btn white-btn" onClick="$(\'#downloadframe\')[0].src=\''+scriptname+'/newbj?act=getfile&doc_type=bankaccountfile&baccid='+Stream1.artable[0][0]+'\';">Печать</button>' ;
    newcell=newrow.insertCell(-1);
    $(newcell).toggleClass('col with-border');
    newcell.innerHTML='<button  id="btn'+Stream1.artable[0][0]+'" class="btn white-btn" onClick="ec(\'sendsmsfrombankaccount\',\'baccid='+Stream1.artable[0][0]+'\',\'newbj\');">Отправить SMS</button>'; 
    var btn = document.getElementById("btn"+Stream1.artable[0][0]);
    if (Stream1.artable[0][6] !='0') {
      btn.disabled = true;
      $(btn).attr("title","SMS сообщение с данными по счету уже отправлено");
    }
    else{
      $(btn).attr("title","Отправить данные по счету в SMS сообщении");
    }
    $('#general-info-tree').toggleClass('hide');
    mkt(tbl);
  }
}

function showmodtree(modid, _treediv, _objdiv, _pref) {
  if ($("#popup-search-tree").hasClass('hide')){
    $("#popup-search-tree").toggleClass("hide");
  }
  var _parent=$($('#'+_treediv)[0].parentNode);
  //console.log(_parent);
  if (modid!=_parent.attr('modelcode')) {
    if (flNewModeCGI){
      ec('gettop10', 'id='+modid+'&objdiv='+_parent.find('.top10tbl').attr('id'), 'newbj'); 
    }
    else{
      ec('gettop10', 'id='+modid+'&objdiv='+_parent.find('.top10tbl').attr('id'), 'abj');
    }
    if (flNewModeCGI){
      ec('loadmodeltree', 'id='+modid+'&pref='+_pref+'&objdiv='+_treediv, 'newbj');
    }
    else{
       ec('loadmodeltree', 'id='+modid+'&pref='+_pref+'&objdiv='+_treediv, 'abj');
    }
  } else {
    //showseldiv(_treediv, _objdiv);
    setpodborsubdiv(1, 1);
  }
}

function showmodtree_search(modid, _treediv, _objdiv, _pref) {
  if ($("#popup-search-tree").hasClass('hide')){
    $("#popup-search-tree").toggleClass("hide");
  }
  var _parent=$($('#'+_treediv)[0].parentNode);
  //console.log(_parent);
  if (modid!=_parent.attr('modelcode')) {
    if (flNewModeCGI){
      ec('gettop10', 'id='+modid+'&objdiv='+_parent.find('.top10tbl').attr('id'), 'newbj'); 
    }
    else{
      ec('gettop10', 'id='+modid+'&objdiv='+_parent.find('.top10tbl').attr('id'), 'abj');
    }
    if (flNewModeCGI){
      ec('loadmodeltree', 'id='+modid+'&pref='+_pref+'&objdiv='+_treediv, 'newbj');
    }
    else{
       ec('loadmodeltree', 'id='+modid+'&pref='+_pref+'&objdiv='+_treediv, 'abj');
    }
  } else {
    //showseldiv(_treediv, _objdiv);
    setpodborsubdiv(1, 2);
  }
}

function showseldiv(div, varname) {
  var _parent=$($('#'+div)[0].parentNode);
  _parent.find('>div').css('display', 'none');
  $('#'+div).css('display', 'block');
//  eval(varname+"=$('#"+div+"')");
//  $.fancybox.open($('#'+div), {'modal' : false, 'padding': 0});
}

function setpodborsubdiv(num, direct, text) {
  var oldnum;
  var newnum;
// определяем текущую вкладку   
   var tabsnav=$('#search-tree-tabs ul.ui-tabs-nav');
//console.log(tabsnav);   
   var selected = $("#search-tree-tabs").tabs("option", "active");
//console.log(selected);   
   var panel=$($(tabsnav.find('li')[selected]).find('a').attr('href'));
   var tn;
//console.log(direct);
	if (selected=='0'){ //vv --------------------
	  if (($('#search-tree-tabs').attr('avto')=='pc') || ($('#search-tree-tabs').attr('avto')=='cv')){
		  if ($('#search-tree-tabs').attr('avto')=='pc') {panel=($('#origprogs'));tn='0'}
		  if ($('#search-tree-tabs').attr('avto')=='cv') {panel=($('#origprogs-cv'));tn='1'}
	  }
	  else {
	//console.log(text);  
	     if (text.indexOf("-cv")==-1) {panel=($('#origprogs'));tn='0'} 
	     if (text.indexOf("-cv")!=-1) {panel=($('#origprogs-cv'));tn='1'}
	  }
	  //$($(panel).parent().parent().parent()).tabs("option", "active", tn);
	} //vv -------------------- 
//console.log(panel);  
   if (direct !=2){
     if (selected==1) {
       if ($("#selbymodeldivauto").hasClass('hide')){
         $("#selbymodeldivauto").removeClass('hide');
         $("#automodelheaderdiv").css("display","none"); 
         $("#selbymodeltreedivauto").addClass('hide');
       }
       else{
         $("#selbymodeldivauto").addClass('hide');
         $("#automodelheaderdiv").css("display","block");
         $("#selbymodeltreedivauto").removeClass('hide');
       }
     return false;
     }
     if (selected==3){
       if ($("#selbymodeldivcv").hasClass('hide')){
         $("#selbymodeldivcv").removeClass('hide');
         $("#cvmodelheaderdiv").css("display","none"); 
         //$("#sel_auto_ul_0").empty();
         $("#selbymodeltreedivcv").addClass('hide');
       }
       else{
         $("#selbymodeldivcv").addClass('hide');
         $("#cvmodelheaderdiv").css("display","block");
         $("#selbymodeltreedivcv").removeClass('hide');
       }
       return false;
     }
     if (selected==4){
       if ($("#selbymodeldivax").hasClass('hide')){
         $("#selbymodeldivax").removeClass('hide');
         $("#axmodelheaderdiv").css("display","none"); 
         //$("#sel_auto_ul_0").empty();
          $("#selbymodeltreedivax").addClass('hide');
       }
       else{
         $("#selbymodeldivax").addClass('hide');
         $("#axmodelheaderdiv").css("display","block");
         $("#selbymodeltreedivax").removeClass('hide');
         return false;
       }
       return false;
     }
     if (selected==5){
       if ($("#selectbymodelmotodiv").hasClass('hide')){
         $("#selectbymodelmotodiv").removeClass('hide');
         $("#motomodelheaderdiv").css("display","none"); 
         //$("#sel_auto_ul_0").empty();
         $("#selbymodeltreediv").addClass('hide');
       }
       else{
         $("#selectbymodelmotodiv").addClass('hide');
         $("#motomodelheaderdiv").css("display","block");
         $("#selbymodeltreediv").removeClass('hide');
       }
       return false;
     }
   }else if (direct==2){//вызвали из заголовка результатов поиска
           $("#selectbymodelmotodiv").addClass('hide');
           $("#motomodelheaderdiv").css("display","block");
           $("#selbymodeltreediv").removeClass('hide');
           return false;
         }
   if (selected==2){
     if ($("#selbyenginedivauto").hasClass('hide')){
       $("#selbyenginedivauto").removeClass('hide');
       $("#engineheaderdiv").css("display","none"); 
       //$("#sel_auen_ul_0").empty();
       $("#selbymodeltreedivautoengine").addClass('hide');
       return false;
     }
     else{
       $("#selbyenginedivauto").addClass('hide');
       $("#engineheaderdiv").css("display","block");
       $("#selbymodeltreedivautoengine").removeClass('hide');
       return false;
     }
   }
   if  ((selected==6) && ( (direct==0) || (direct==1)) ){
     if ($("#selbyattrdiv").hasClass('hide')){
       $("#selbyattrdiv").removeClass('hide');
       $("#motoattrheaderdiv").css("display","none"); 
       $("#selmotobyattrdiv").css("display","none"); 
     }
     else{
       $("#selbyattrdiv").addClass('hide');
       $("#motoattrheaderdiv").css("display","block");
       $("#selmotobyattrdiv").css("display","block");
     }
     return false;
   }
   
   var curblock;
   var OtherBlocks;
   var ta;
   if  (selected==0){
     curblock=panel.find('.selectpartsdiv[number='+num+']');	 
	   OtherBlocks=panel.find('.selectpartsdiv[number!='+num+']');
     if (num==0) { //начальная страница
       if (direct==1){
	       if ($("#search-tree-tabs").attr("avto")=='pc') {$("#origprogsheader").css("display","none");};  //vv
		     if ($("#search-tree-tabs").attr("avto")=='cv') {$("#origprogsheader-cv").css("display","none");};//vv 
         if (text !== undefined){
           curblock.html(text);
         }
         else{
           intervalID5=setTimeout(function(e){
            clearInterval(intervalID4);
            tunelogo('true');
           }, 1000);
         }
       }
       else{
         if ($("#search-tree-tabs").attr("avto")=='pc') {$("#origprogsheader").css("display","none");};  //vv
		     if ($("#search-tree-tabs").attr("avto")=='cv') {$("#origprogsheader-cv").css("display","none");};//vv	 
       }
     }
     else{
       if (direct==0){
        curblock=$("#tabs-1 .selectpartsdiv[number="+(num-1)+"]");
        OtherBlocks=$("#tabs-1 .selectpartsdiv[number!="+(num-1)+"]");
        if ((curblock.html()=='') && (num==1)){ 
          ec('laximostartpage', 'avto='+$("#search-tree-tabs").attr("avto"), 'abj'); //vv
        }
        if ($("#search-tree-tabs").attr("avto")=='pc') {ta=''};  //vv
        if ($("#search-tree-tabs").attr("avto")=='cv') {ta='-cv'};//vv	
        $("#origprogsheader"+ta+" .header-link .back-btn").bind( "click", function() {
           setpodborsubdiv(num-1, 0);
        });
       }
       if (direct==1){
	       curblock.html(text);
		     if ($("#search-tree-tabs").attr("avto")=='pc') {$("#origprogsheader").css("display","block");};  //vv
		     if ($("#search-tree-tabs").attr("avto")=='cv') {$("#origprogsheader-cv").css("display","block");};//vv
         if (num>0){
           if ($("#search-tree-tabs").attr("avto")=='pc') {ta=''};  //vv
           if ($("#search-tree-tabs").attr("avto")=='cv') {ta='-cv'};//vv	
           $("#origprogsheader .header-link .back-btn, #origprogsheader-cv .header-link .back-btn").bind( "click", function() {
             setpodborsubdiv(num-1,1);
           });
         }
         else{
		       if ($("#search-tree-tabs").attr("avto")=='pc') {$("#origprogsheader").css("display","none");}; //vv
		       if ($("#search-tree-tabs").attr("avto")=='cv') {$("#origprogsheader-cv").css("display","none");};//vv
           ec('laximostartpage', 'avto='+$("#search-tree-tabs").attr("avto"), 'abj'); //vv
         }
       }
     }

     OtherBlocks.css("display","none");
     curblock.css("display","block");
  }
}


function prepareImage(img){
  var imgPrep = img;
  var width = img.width();
  var height = img.height();
	var hkoef = height/600;
	var wkoef = width/471;
	var koef = hkoef;
	img.attr('owidth', width).attr('oheight', height);
	if ((height>600) || (width>471)) {
	  if (hkoef>wkoef) { 
	    koef = hkoef;
	  }
	  else {
	    koef = wkoef;
	  }
	}
	img.height(height/koef).width(width/koef);
	
	if($(img[0].parentNode).height()>img.height()){
	  var margtopleft=($(img[0].parentNode).height()-img.height())/2;
	  img.css('margin-top', margtopleft+'px');
	}
	if($(img[0].parentNode).width()>img.width()){
	  var margtopleft=($(img[0].parentNode).width()-img.width())/2;
	  img.css('margin-left', margtopleft+'px');
	}
//	  $(img[0].parentNode).width(width/koef);
	
	  rescaleImage(imgPrep, 0);

}

function rescaleImage(imgPrep, delta) {
  var img =imgPrep;
  //var img = $("#viewport img");
  var width = img.width();
    var height = img.height(); 
  img.width(img.width()+(10*delta));
  var margtop = parseFloat($(img).css('margin-top'));
  var margleft = parseFloat($(img).css('margin-left'));
  var koef=parseFloat(img.attr('owidth'))/img.width();
  
  if (delta != 0) {
    if (img.width()>=img.attr('owidth')) {
      koef=1;
      img.width(img.attr('owidth'));
      img.height(img.attr('oheight'));
    } else {
      img.height(parseFloat(img.attr('oheight')/koef));
      if (img.height()>=img.attr('oheight')) {
        img.width(img.attr('owidth'));
        img.height(img.attr('oheight')); 
        koef=1;
      }
    }
  
    if  ((img.width()+(2*margleft)<471)||(img.height()+(2*margtop)<600)) {
      var width =img.attr('owidth');
      var height =img.attr('oheight');
      var hkoef = height/600;
      var wkoef = width/471;
      var koef = hkoef;
      if (hkoef>wkoef) { 
        koef = hkoef;
      } else {
        koef = wkoef;
      }
      img.height(height/koef).width(width/koef);
    }
    if($(img[0].parentNode).height()>img.height()){
        var margtopleft=($(img[0].parentNode).height()-img.height())/2;
        img.css('margin-top', margtopleft+'px');
      }
    else {
      img.css('margin-top', '0px');
    }
  
    if($(img[0].parentNode).width()>img.width()){
      var margtopleft=($(img[0].parentNode).width()-img.width())/2;
      img.css('margin-left', margtopleft+'px');
    }
    else {
      img.css('margin-left', '0px');
    }
  }	
  margtop = parseFloat($(img).css('margin-top'));
  margleft = parseFloat($(img).css('margin-left'));
  img.parent().find('div.pointerdiv').each(function (idx) {
    var el = jQuery(this);
    el.width(parseFloat(el.attr('owidth'))/koef).height(parseFloat(el.attr('oheight'))/koef).css('left',(margleft +parseFloat(el.attr('oleft'))/koef)+'px').css('top',margtop+ parseFloat(el.attr('otop')/koef)+'px');
//	$("#el1").position({my: "left top",  at: "left top",  offset: parseInt(el.attr('oleft'))/koef+" "+parseInt(el.attr('otop'))/koef,  of: img});
  });
}

function rescaleImage2(imgPrep) {
  var img = imgPrep;
  var width = img.width();
  var height = img.height(); 
 // img.width(img.width()+(10*delta));
  var margtop = parseFloat($(img).css('margin-top'));
  var margleft = parseFloat($(img).css('margin-left'));
  var koef=parseFloat(img.attr('owidth'))/img.width();
  
  /*if (delta != 0) {
    if (img.width()>=img.attr('owidth')) {
      koef=1;
      img.width(img.attr('owidth'));
      img.height(img.attr('oheight'));
    } else {
      img.height(parseFloat(img.attr('oheight')/koef));
      if (img.height()>=img.attr('oheight')) {
        img.width(img.attr('owidth'));
        img.height(img.attr('oheight')); 
        koef=1;
      }
    }
  
    if  ((img.width()+(2*margleft)<471)||(img.height()+(2*margtop)<600)) {
      var width =img.attr('owidth');
      var height =img.attr('oheight');
      var hkoef = height/600;
      var wkoef = width/471;
      var koef = hkoef;
      if (hkoef>wkoef) { 
        koef = hkoef;
      } else {
        koef = wkoef;
      }
      img.height(height/koef).width(width/koef);
    }*/
    if($(img[0].parentNode).height()>img.height()){
        var margtopleft=($(img[0].parentNode).height()-img.height())/2;
        img.css('margin-top', margtopleft+'px');
      }
    else {
      img.css('margin-top', '0px');
    }
  
    if($(img[0].parentNode).width()>img.width()){
      var margtopleft=($(img[0].parentNode).width()-img.width())/2;
      img.css('margin-left', margtopleft+'px');
    }
    else {
      img.css('margin-left', '0px');
    }
 //}	
  margtop = parseFloat($(img).css('margin-top'));
  margleft = parseFloat($(img).css('margin-left'));
  //$('div.pointerdiv').each(function (idx) {
  img.parent().find('div.pointerdiv').each(function (idx) {
    var el = jQuery(this);
    el.width(parseFloat(el.attr('owidth'))/koef).height(parseFloat(el.attr('oheight'))/koef).css('left',(margleft +parseFloat(el.attr('oleft'))/koef)+'px').css('top',margtop+ parseFloat(el.attr('otop')/koef)+'px');
//	$("#el1").position({my: "left top",  at: "left top",  offset: parseInt(el.attr('oleft'))/koef+" "+parseInt(el.attr('otop'))/koef,  of: img});
  });
}

function search_node2(nodepref, treediv, nodesearch) {
  var s='';
  var preflen=nodepref.length+4;
  var i=0;
  var elems;

  s=mtrim($('#'+nodesearch).val()).toLowerCase();


  if (CurrTemplInSearch!=s) {
    CurrTemplInSearch=s;
    CurrNodeInSearch=-1;
  }
 
  $("h3[id^='"+nodepref+"_a2_']").each(function() {
  //console.log($(this).text().toLowerCase());
  if( $(this).text().toLowerCase().indexOf(CurrTemplInSearch)!=-1){
    this.style.color=selectTreeColor;
    i++;
   
    elems=$(this).parents('li.sub-list');
    //console.log(elems);
    elems.each(function() {
      if ($(this).hasClass('closed')){
        $(this).trigger('click');
       // this.style.color=selectTreeColor;
      }
    });
    
  }
  else {
    this.style.color="inherit";
    if (this.parentNode.className=="sub-list" ) {
      $(this).trigger('click');
    }
  }  
 });


  

  if (i==0) {
    jqswMessage('Текст "'+CurrTemplInSearch+'" в названиях узлов не найден.');
    CurrNodeInSearch=-1;
    return false;
  }
  
   return false;
}



function podborwinresize(event, ui) {
console.log('podborwinresize');
  var tabsnav=$('#search-tree-tabs ul.ui-tabs-nav');
  var selected = $("#search-tree-tabs").tabs("option", "active");
console.log('selected');  
  selected=$(tabsnav.find('li')[selected]).find('a').attr('href');
  
  var div= $(selected+' .currentdiv');
//  var div= $(selected);

  var wintitle=$($('#search-tree-tabs')[0].parentNode).find('.ui-dialog-titlebar');
  var wintitleheight=parseInt(wintitle.css('padding-top'))+parseInt(wintitle.css('padding-bottom'))+parseInt(wintitle.height());
  var top=2;
  if (div.attr('headerdiv')) {
    top+=parseInt($('#'+div.attr('headerdiv')).height());
  }
  
  div.css('top', top+'px');
  div.height($("#search-tree-tabs").dialog('widget').height()-wintitleheight-top-tabsnav.height()-8);
  div.width($("#search-tree-tabs").dialog('widget').width()-2);
  if ($("#search-tree-tabs").dialog( "option", "resizable")) {
    setCookie_('search-tree-tabs_width', $("#search-tree-tabs").dialog('widget').width(), getExpDate_(3650,0,0),'/',0,0);
    setCookie_('search-tree-tabs_height', $("#search-tree-tabs").dialog('widget').height(), getExpDate_(3650,0,0),'/',0,0);
  }
  
  if (($("#search-tree-tabs").tabs("option", "active")==0) && (div.attr('number')=='0')) {
console.log('number=0');  
    tunelogo();
  }

  if (div.find('#vin').length) $("#vin").autocomplete("close");
//  $('#podbortabs .currentdiv').height(ui.size.height-parseInt($('#podbortabs .currentdiv').css('top'))-45);
//  $('#podbortabs .currentdiv').width(ui.size.width-4);
}

function tunelogo() {
console.log('tunelogo');
  var dist;
  var vdist;
  var count;
  var left;
  if (maxdist==undefined) maxdist=2;
  if (mindist==undefined) mindist=2;
  if (mindist>maxdist) maxdist=mindist;
  var curdiv;  //vv---------------
  
  if($("#search-tree-tabs").attr("avto")=='pc') {curdiv=$("#origprogs .selectpartsdiv.currentdiv");}
  if($("#search-tree-tabs").attr("avto")=='cv') {curdiv=$("#origprogs-cv .selectpartsdiv.currentdiv");}
  //vv var curdiv=$("#origprogs .selectpartsdiv.currentdiv");
//  curdiv=$(curdiv.find('.abgslide')[0].parentNode);
var i=0;
while (i<2){
      if (i==0)  {
//console.log('i0='+i);	  
        curdiv=$("#origprogs .selectpartsdiv.currentdiv");
      }; 
	  if (i==1) {
//console.log('i1='+i);	  
        curdiv=$("#origprogs-cv .selectpartsdiv.currentdiv");
      };
console.log(i);
console.log(curdiv);

  if (!curdiv.find('div').length) return false;
  var top=curdiv.find('div').position().top;
  var rowcount=0;
  while (curdiv.find('.abgslide[row="'+rowcount+'"]').length) {
    rowcount++;
  }
  vdist=(curdiv.height()-top)/rowcount-82; // 82 - высота логотипа
  if (vdist<2) vdist=2;
  top=vdist/2;
  


  fullwidth=curdiv.width();

  var currow=0;
  while (count=curdiv.find('.abgslide[row="'+currow+'"]').length) {
    dist=fullwidth/count-82; // 82 - ширина логотипа
    if (dist<mindist) dist=mindist;
    if (dist>maxdist) dist=maxdist;
    left=(fullwidth-(82+dist)*count+dist)/2;
    if (left<0) left=0;
    curdiv.find('.abgslide[row="'+currow+'"]').each(function (i) {
      $(this).css('left', left+i*(82+dist)+'px').css('top', top+currow*(82+vdist)+'px');
    });
    currow++;
  }
i=i+1;
}
}

function drawenginestop10header() {
  var tbl=$('#auentop10')[0];
  var row=tbl.insertRow(-1);
  $(row).addClass('auentop10-tr-header');
  var cell;

  cell=row.insertCell(-1);
  cell.innerHTML='Производитель';

  cell=row.insertCell(-1);
  cell.innerHTML='Двигатель';

  cell=row.insertCell(-1);
  cell.innerHTML='Объем';

  cell=row.insertCell(-1);
  cell.innerHTML='кВт';

  cell=row.insertCell(-1);
  cell.innerHTML='л.с.';

  cell=row.insertCell(-1);
  cell.innerHTML='К-во цилиндров';
}

// рисует строку таблицы с двигателями
function drawenginestop10row(Code, Manufacturer, Name, Capacity, kW, HP, Cylinder) {
  var tbl=$('#auentop10')[0];
  var row=tbl.insertRow(-1);
  var cell;

  row.className=(altrow?'auentop10-tr':'auentop10-tr current');
  altrow=!altrow;

  cell=row.insertCell(-1);
  cell.className=('col with-border');
  cell.innerHTML=Manufacturer;
 
  var s='';
    s+='<a class="find-zoom-img pointer" href="#" onclick="ec(\'showengineoptions\', \'engineid='+Code+'\', \'abj\');"></a>';
    s+='<a href=# onclick="showmodtree('+Code+', \''+_objdiv+'\', \''+_treediv+'\', \''+_pref+'\');">'+Name+'</a>';
//    s+=Name;
  cell=row.insertCell(-1);
  cell.className=('col with-border');
  cell.innerHTML=s;
  cell.style.textAlign='left';

  cell=row.insertCell(-1);
  cell.className=('col with-border');
  cell.innerHTML=Capacity;

  cell=row.insertCell(-1);
  cell.className=('col with-border'); 
  cell.innerHTML=kW;

  cell=row.insertCell(-1);
  cell.className=('col with-border');
  cell.innerHTML=HP;

  cell=row.insertCell(-1);
  cell.className=('col');
  cell.innerHTML=Cylinder;
}

// добавляет узел в дерево для подбора
function addbranchsel(_id, _master, _name, _qty, _pref, _drawfilter, _motul,_model_id,_contract,haswares) {
  var li;
  var ul=document.getElementById(_pref+"_ul_"+_master);
  if (!ul) {
    li=document.getElementById(_pref+"_li_"+_master);
    if (li) {
      ul=document.createElement("UL");
      ul.id=_pref+"_ul_"+_master;
      li.appendChild(ul);
    } else {
             jqswMessageError('Не найдена мастер-ветка с кодом '+_master+'('+_pref+"_ul_"+_master+')');
             return false;
    }
  }
  var li=document.createElement("LI");
 
  li.innerHTML='<h3  haswares='+haswares+' code='+_id+' id='+_pref+'_a2_'+_id+((_qty)?' title="Кол-во, необходимое для модели - '+_qty+'"':'')+' >'
              +_name+((_qty)?' ['+_qty+']':'')+'</h3>'
              +((ismobile)   ?(' <img id='+_pref+'_selimg_'+_id+' code='+_id+' title="Показать результат подбора" src="/images/forward.png" align=middle style="position: relative; top: -4px; cursor: pointer;" code='+_id+'>'):'')
              +((_drawfilter)?(' <a id='+_pref+'_filimg_'+_id+' code='+_id+' title="Выбор места установки" class="install"></a>'):'')
              +((_motul)?(' <img  onclick="ec(\'getnodewaresmotul\', \'node=-'+_id+'&model='+_model_id+'&contract='+_contract+'\', \'newbj\');" src="/images/motul-55x15.jpg" class="podbor-motul-inline-li" title="">'):'');
  //li.className='sub-list closed';
  li.id=_pref+"_li_"+_id;
  ul.appendChild(li);
  return true;
}


function addbranchseloe(_id, _master, _name, _qty, _pref, _link) {
  var li;
  var ul=document.getElementById(_pref+"_ul_"+_master);
  if (!ul) {
    li=document.getElementById(_pref+"_li_"+_master);
    if (li) {
      ul=document.createElement("UL");
      ul.id=_pref+"_ul_"+_master;
      li.appendChild(ul);
    } else {
             jqswMessageError('Не найдена мастер-ветка с кодом '+_master+'('+_pref+"_ul_"+_master+')');
             return false;
    }
  }
  var li=document.createElement("LI");
  li.innerHTML='<h3 code='+_id+' id='+_pref+'_a2_'+_id+((_link)?' style="color:blue;"':'')+' link="'+_link+'" >'
            +_name+((_qty)?' ['+_qty+']':'')+'</h3>'
              +((ismobile)   ?(' <img id='+_pref+'_selimg_'+_id+' code='+_id+' title="Показать результат подбора" src="/images/forward.png" align=middle style="position: relative; top: -4px; cursor: pointer;" code='+_id+'>'):'')
              +'';

  li.id=_pref+"_li_"+_id;
  ul.appendChild(li);
  return true;
}



function showmodelfromwarelist(link, _manufacturer, _modelline, _model, _sys,isShowModels) {
  modelbywarename=$(link).html();
  modid=_model;
  var objdiv;
  var selbymodeltreediv;
  var _parent=$('#'+$('#podbortabs').attr('curpanel'));
  switch(_sys) {
    case 1:  // if (x === 'value1')
      objdiv='auto';
      selbymodeltreediv='selbymodeltreediv'+'auto';
      break;
    case 2:  // if (x === 'value2')
      objdiv='moto';
      selbymodeltreediv='selbymodeltreediv';
      break;
    case 4:  // if (x === 'value2')
      objdiv='cv';
      selbymodeltreediv='selbymodeltreedivcv';
      break;
    case 5:  // if (x === 'value2')
     objdiv='ax';
     selbymodeltreediv='selbymodeltreedivax';
     break;
  }
  if (modid!=_parent.attr('modelcode')) {
    if (flNewModeCGI){ 
      ec('gettop10', 'id='+modid+'&objdiv='+objdiv+'top10', 'newbj');
    }
    else{
      ec('gettop10', 'id='+modid+'&objdiv='+objdiv+'top10', 'abj');
    }
    if (flNewModeCGI){
        ec('loadmodeltree', 'id='+modid+'&pref=sel_'+objdiv+'&objdiv='+selbymodeltreediv+fnIfStr(isShowModels==1,'&showwhereused=true',''), 'newbj');
    } else{
        ec('loadmodeltree', 'id='+modid+'&pref=sel_'+objdiv+'&objdiv='+selbymodeltreediv+fnIfStr(isShowModels==1,'&showwhereused=true',''), 'abj');
    }
    if (isShowModels==1){
      $('#general-info-tree').toggleClass('hide');
      //$('#popup-search-tree').removeClass('hide');
     //$("#search-tree-tabs").tabs({active:_sys});
    }
  } 
  else {
    setpodborsubdiv(-1, 1);
  }
}

function changeSizeImage(im,mode) {
    if (mode==1){
      $('#viewdvornikdiv').dialog({width: 750, title:"Типы креплений для передних дворников" }); 
      var s1='<div id="viewdvornikdiv-container" data-mcs-theme="inset-dark" style="width: 732px;" >'+
               '<img style="width: 712px; height: 1352px;" src="'+descrimageurl+'/images/Fixing_wipersForward.png" onclick="changeSizeImage(this);" class="" title="К списку групп аттрибутов">'+
             '</div>';
    }
    if (mode==2){
      $('#viewdvornikdiv').dialog({ width: 500, title:"Типы креплений для задних дворников" }); 
      var s1='<div id="viewdvornikdiv-container" data-mcs-theme="inset-dark" style="width: 484px;" >'+
       '<img style="width: 464px; height: 1917px;" src="'+descrimageurl+'/images/Fixing_wipersBack.png" onclick="changeSizeImage(this);" class="" title="К списку групп аттрибутов">'+
      '</div>';
    }
    $('#viewdvornikdiv').html(s1);
    $('#viewdvornikdiv').dialog('open');
    $("#viewdvornikdiv-container").mCustomScrollbar({
      alwaysShowScrollbar: 1
    });
    $('#viewdvornikdiv').css("max-height","670px");
    setTimeout( setPositionviewdvornikdivIdDialog, 1000);
}

function LoadAtrrBySelect(elem,groupId){
  var vals=$("select[name^='attr']");
  if (vals.length) {
    var s='&';
    for (i=0; i<vals.length; i++) {
      if (i==0){
        s+=vals[i].name.substring(4)+'='+vals[i].value;
      }
      else{
        s+='&'+vals[i].name.substring(4)+'='+vals[i].value; 
      }
      if (vals[i].value != 0){
        $(vals[i]).attr('selectval_',vals[i].options[vals[i].selectedIndex].value);
      }
      else{
        $(vals[i]).attr('selectval_','');
      }
    }
  }
  ec('getattrlistselected', 'selectname='+$(elem).attr("name")+'&groupid='+groupId+'&count='+vals.length+s+'',fnIfStr(flNewModeCGI,"newbj","abj"));
}

function LoadAtrrAll(groupId){
  var vals=$("select[name^='attr']");
  if (vals.length) {
    var s='&';
    for (i=0; i<vals.length; i++) {
      if (i==0){
        s+=vals[i].name.substring(4)+'='+vals[i].value;
      }
      else{
        s+='&'+vals[i].name.substring(4)+'='+vals[i].value; 
      }
      if (vals[i].value != 0){
        $(vals[i]).attr('selectval_',vals[i].options[vals[i].selectedIndex].value);
      }
      else{
        $(vals[i]).attr('selectval_','');
      }
    }
  }
  ec('fillattrlistselected', 'selectname=all&groupid='+groupId+'&count=0'+s+'',fnIfStr(flNewModeCGI,"newbj","abj"));
}

function setcomparebtnvis() {
   var btn = document.getElementById('compare-btn');
 /* $('.attrgr[name!=0]').each(function() {
    this.style.visibility=( ($('.attrgr[name="'+this.name+'"]').length<2) ?"hidden":"visible");
  });
  if ($('.attrgr[name!=0]:visible').length) $('#warecomparebtn').css('display', 'block');

  if ($('.attrgr:checked').length) checkcomparebtnenabl($('.attrgr:checked')[0]); // это для аналогов и сопутствующих, чтобы сразу дизейблились если надо */
  
  if ($("#search-table td.col-checkbox input[type='checkbox']").length) { 
    $(".compare-btn").css('display', 'block');
  }
  else{
    $(".compare-btn").css('display', 'none');
  }
  
  if ($("#search-table td.col-checkbox input[type='checkbox']:checked").length>1) { 
   btn.disabled =false;
   $(btn).addClass('pointer');
  }
  else{
    btn.disabled = true;
    $(btn).removeClass('pointer');
  }

}

function warecompare(el) {
 //if (el.className=="disabledslide enabled"){
   var numbers = new Array();
   var qties   = new Array();
   var boxes=$('.search-checkbox[name!=0]:checked:visible');
   for (i=0; i<boxes.length; i++) {
     for (j=0; j<numbers.length; j++) {
       if (boxes[i].name==numbers[j]) {
         qties[j]++;
         j=numbers.length+1;
       }
     }
     if (j<(numbers.length+1)) {
       numbers[j]=boxes[i].name;
       qties[j]=1;
     }
   }

// если в результатах всего 1 товар данной группы аттрибутов то сравноивать его не с чем, выкидываем.
   for (j=0; j<numbers.length; j++) {
     if (qties[j]==1) {
       numbers.remove(j);
       qties.remove(j);
     }
   }

   if (numbers.length==0) {
// Если после чистки "одиночек" групп не осталось, значит товары входили в разные группы.
     jqswMessageError('Выбранные Вами товары относятся к разным группам и не могут сравниваться друг с другом ');
   } else
   if (numbers.length>1) {
// Если после чистки "одиночек" осталось больше одной группы, то даем человеку выбор.
     s='';
     s+='<div style="font-size: 12px; position: relative;"><h1 style="margin: 0px;" class="grayline" >Выберите группу для сравнения</h1><table>';
     for (j=0; j<numbers.length; j++) {
       s+='  <tr>';
       s+='    <td><a class=tablabel href=# onclick="showwarecompare('+numbers[j]+');">'+$('#grattrlink'+numbers[j]).html()+'</a></td>';
       s+='  </tr>';
     }
     s+='</table></div>';
     //sw(s, false)
     jqswInfo("",s,2,100,90);
 
   } else {
     showwarecompare(numbers[0]);
   }
//  }
//  $("#WSRwrapper h1").html("Результаты подбора по группе <span>"+curmotoattrgroupname+"</span> по значениям:"+s);
}


function showwarecompare(attrgrnum) {
  var data='';
  var boxes=$('.search-checkbox[name='+attrgrnum+']:checked');
  for (i=0; i<boxes.length; i++) {
    data+=(data?"&":"")+'wareid'+i+'='+boxes[i].id.substring(6)
  }
//alert(data);
  var contrel=$("#contract");
  ec('showwarecompare', data+"&contract="+((contrel.length)?contrel.val():""), 'abj');
}


function search_nodeoe(nodepref, treediv, nodesearch) {
  var s='';
  var preflen=nodepref.length+4;

var len = 0;
var currid = 0;


   s=mtrim($('#'+nodesearch).val()).toLowerCase();


  if (CurrTemplInSearch!=s) {
    CurrTemplInSearch=s;
    CurrNodeInSearch=-1;
  }

  $("h3[id^='"+nodepref+"_a2_']").each(function() {
    //console.log($(this).text().toLowerCase());
     if( $(this).text().toLowerCase().indexOf(CurrTemplInSearch)!=-1){
       this.style.color=selectTreeColor;
       i++;
       if (this.parentNode.className=="sub-list closed" ) {
         $(this).trigger('click');
       }
     }
    });
  
    
  
    if (i==0) {
      jqswMessage('Текст "'+CurrTemplInSearch+'" в названиях узлов не найден.');
      CurrNodeInSearch=-1;
      return false;
    }
    
   return false;
}

function blocknone(input){
  if($('table[detaile="'+$(input).attr('detaile')+'"] tr.otherdet').css('display')=='table-row') {
//    $('.otherdet[detaile="'+$(input).attr('detaile')+'"]').css('display','none');
	   $('table[detaile="'+$(input).attr('detaile')+'"] tr.otherdet').css('display','none');
  } else {
//    $('.otherdet[detaile="'+$(input).attr('detaile')+'"]').css('display','table-row');
	$('table[detaile="'+$(input).attr('detaile')+'"] tr.otherdet').css('display','table-row');
  }
}


function checkcomparebtnenabl(el) {
  //console.log(el);
  var btn = document.getElementById('compare-btn');
  if (el.checked) {
    $('.search-checkbox[name!="'+el.name+'"]:visible').attr('disabled', true);
  } else{
      $('.search-checkbox[name!="'+el.name+'"]:visible').attr('disabled', false);
   }

  if ($('.search-checkbox[name="'+el.name+'"]:checked:visible').length>1) {
    btn.disabled =false;
    $(btn).addClass('pointer');
    $(btn).attr('title',' ');
  } else {
    btn.disabled=true;
    $(btn).removeClass('pointer');
    $(btn).attr('title','Отметьте два или более товара для сравнения');
  }

}

function startLoadingAnimation() {// - функция запуска анимации
  $("#animation").removeClass('hide');
}

function stopLoadingAnimation() {// - функция останавливающая анимацию
  $("#animation").addClass('hide');
}

function ShowAllSchedulerDelivery(){
  var content=document.getElementById("deliveryshedulerdiv_table");
   for (j=0; j<content.rows.length; j++) {
     content.rows[j].style.display='block';
     $(content.rows[j].cells[0]).css("width",'28px');
     $(content.rows[j].cells[1]).css("width",'129px');
     $(content.rows[j].cells[2]).css("width",'203px');
     $(content.rows[j].cells[3]).css("width",'136px');
   }
  $("#deliveryshedulerdiv_caption").css('display', 'none');
  $("#deliverysheduler_viewall").css('display', 'none');
}

function waresearchfocus(e) {
  if (e.value==$(e).attr('insearchtext')) {
    $(e).val('').css('color', '#000');
  } else {
    e.select();
  }
}

function tunelogo(isResize) {
  var dist;
  var vdist;
  var count;
  var left;
  if ($("#tabs-1").tabs( "option", "active" )==0){
   var curdiv=$("#origprogs .selectpartsdiv.currentdiv"); 
   var maindiv=$("#origprogs");
  }
  else{
   var curdiv=$("#origprogs-cv .selectpartsdiv.currentdiv");  
   var maindiv=$("#origprogs-cv");
  }
  if (maxdist==undefined) maxdist=2;
  if (mindist==undefined) mindist=2;
  if (mindist>maxdist) maxdist=mindist;

  if (!curdiv.find('div:last').length) return false;
  var topt=curdiv.find('div:last').position().top;
  var rowcount=0;
  while (curdiv.find('.abgslide[row="'+rowcount+'"]').length) {
    rowcount++;
  }
  vdist=(maindiv.height()-70)/rowcount-82; // 82 - высота логотипа
  //vdist=(fullheight-top)/rowcount-82; // 82 - высота логотипа
  if (vdist<2) vdist=2;
  topt=vdist/2;
  //console.log(fullwidth);
  var currow=0;
  var fullwidth=curdiv.width();
  while (count=curdiv.find('.abgslide[row="'+currow+'"]').length) {
    dist=fullwidth/count-82; // 82 - ширина логотипа
    if (dist<mindist) dist=mindist;
    if (dist>maxdist) dist=maxdist;
    //if (vdist>maxdist) vdist=maxdist; //vv
    left=(fullwidth-(82+dist)*count+dist)/2;
    if (left<0) left=0;
    curdiv.find('.abgslide[row="'+currow+'"]').each(function (i) {
       $(this).css('left', left+i*(82+dist)+'px').css('top', topt+currow*(82+vdist)+'px');
    });
    currow++;
  }
  if ($("#tabs-1").tabs( "option", "active" )==1){
    curdiv.css("height",parseInt((currow)*(82+dist))+70+"px"); 
  }
  if (isResize=='true'){
    if ($("#tabs-1").tabs( "option", "active" )==0){
      curdiv.css("height",parseInt((currow)*(82+vdist))+70+"px");
    }
    else{
      curdiv.css("height",parseInt((currow)*(82+vdist))+70+20+"px");
    }
  }
  else{
    curdiv.css("height",parseInt((currow)*(82+vdist))+41+"px");
  }
 }


function waresearchblur(e) {
  if (e.value=='') {
    $(e).val($(e).attr('insearchtext')).css('color', '#bbb');
  }
}

function delTitleClose(){
  var id=$("#jqdialog").parents().children(":first").find("span.ui-dialog-title").attr("id");
  id=id.substring(id.indexOf('id'),id.length);
  id=parseInt(id.substring(id.indexOf('-')+1,id.length))+1;
  $("#ui-id-"+id).remove();
}

//--------------------------------------------------cookie.js
// Вспомогатльная функция для формирования даты окончания действия
// в нужном формате. Три целочисленных параметра означают число дней,
// часов и минут, через которые истечёт срок действия cookie. Все параметры
// обязательные, поэтому используйте нули там, где это нужно.
function getExpDate_(days, hours, minutes) {
    var expDate = new Date();
    if (typeof days == "number" && typeof hours == "number" && typeof hours == "number") {
        expDate.setDate(expDate.getDate() + parseInt(days));
        expDate.setHours(expDate.getHours() + parseInt(hours));
        expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
        return expDate.toGMTString();
    }
}

// Вспомогательная функция, используемая функцией getCookie()
function getCookieVal_(offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}

// Основная функция для определения знаячения cookie по имени
function getCookie1(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal_(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

// Сохраниние значения cookie и некоторых дополнительных параметров
function setCookie_(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

// Уничтожение cookie путем установки ему прошедшего срока истечения
function deleteCookie_(name,path,domain) {
    if (getCookie1(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

// функция для записи  куки бонусов
function setLoyaltyCookie(viewmode,sortmode,findresmode) {
  if (findresmode===undefined ){
    var s=getLoyaltyCookie(2);
    if (s==''){
      setCookie_('loyalty',String(viewmode)+String(sortmode)+'0', getExpDate_(365,0,0),'/',0,0);
    }
    else{
      setCookie_('loyalty',String(viewmode)+String(sortmode)+s, getExpDate_(365,0,0),'/',0,0);
    }
  }else{
    setCookie_('loyalty',String(viewmode)+String(sortmode), getExpDate_(365,0,0),'/',0,0); 
  }
}

function setLoyaltyCookieSort(findresmode) {//это для добавления в куку Loyalty последнего бита сортировки в поиске
    var s0=getLoyaltyCookie(0);
    var s1=getLoyaltyCookie(1);
    if (s0=='') s0='0';
    if (s1=='') s0='1';
    setCookie_('loyalty',s0+s1+findresmode, getExpDate_(365,0,0),'/',0,0); 
}

// функция для чтения  куки бонусов
function getLoyaltyCookie(numbit) {
 var s=getCookie1('loyalty');
 if (s==null) {
   setLoyaltyCookie('0','0','0');
   return 0;
 }else{
   return s.substr(numbit,1);
 }
}


function maximizedialog(elem) {
  if ((getCookie1("podbortabs_maximize")==null) || ((getCookie1("podbortabs_maximize")=="false")) ){
    setCookie_('podbortabs_maximize', true, getExpDate_(3650,0,0),'/',0,0);
    var h=document.documentElement.clientHeight;
    var w=document.documentElement.clientWidth;
    $("#search-tree-container").css("height",h+"px").css("width",w+"px").css("top","0");
    $("#popup-search-tree").css("position","fixed").css("height",h+"px").css("width",w+"px");
    $(elem).css('border-width', '0px');
    $(elem).css('border-bottom-width', '3px');
    setPodborWindowTabSize();
  }
  else{
     if (getCookie1("podbortabs_maximize")=="true") { 
       setCookie_('podbortabs_maximize', false, getExpDate_(3650,0,0),'/',0,0);
       var container=$("#search-tree-container");
       if ((getCookie1("podbortabs_width")!=null)  && (getCookie1("podbortabs_height")!=null)){
         var h=getCookie1("podbortabs_height");
         var w=getCookie1("podbortabs_width");
         container.css('height', h+"px").css('width', w+"px");     
       }
       else{
         $("#popup-search-tree").css("position","absolute").css("height","100%").css("width","100%");
         $("#search-tree-container").css("width","81%").css("top","5%");
         setCookie_('podbortabs_width', container.width(), getExpDate_(3650,0,0),'/',0,0);
         setCookie_('podbortabs_height', container.height(), getExpDate_(3650,0,0),'/',0,0);
       }       
       $(elem).css('border-width', '3px');
     }
  }
  setPodborWindowTabSize();
}

function maximizedialogmin(elem) { //при открытии окна
  var elem=$("div.maximize");
  if (getCookie1("podbortabs_maximize")==null){
    setCookie_('podbortabs_maximize', false, getExpDate_(3650,0,0),'/',0,0);
  }
  else{
    if (getCookie1("podbortabs_maximize")=="true") { 
      var h=document.documentElement.clientHeight;
      var w=document.documentElement.clientWidth;
      $("#search-tree-container").css("height",h+"px").css("width",w+"px").css("top","0");
      $("#popup-search-tree").css("position","fixed").css("height",h+"px").css("width",w+"px");
      elem.css('border-width', '0px');
      elem.css('border-bottom-width', '3px');
   }
   if (getCookie1("podbortabs_maximize")=="false"){
      if ((getCookie1("podbortabs_width")!=null)  && (getCookie1("podbortabs_height")!=null)){
        var h=getCookie1("podbortabs_height");
        var w=getCookie1("podbortabs_width");
        $("#search-tree-container").css('height', h+"px").css('width', w+"px");     
      }
      else{
        $("#popup-search-tree").css("position","absolute").css("height","100%").css("width","100%");
        $("#search-tree-container").css("width","81%").css("top","5%");
      } 
      elem.css('border-width', '3px');
    }
  }
  setPodborWindowTabSize();
  $('#search-tree-container div.search-tree-header').bind("dblclick",function(event) {
      maximizedialog($('#search-tree-container div.search-tree-header div.maximize'));
      event.preventDefault();
    });

}

function setPodborWindowTabSize() { //при открытии окна
  var container=$("#search-tree-container");
  $('#search-tree-tabs #tabs-1').css('height', container.height()-105);
  $('#search-tree-tabs #tabs-1 #origprogs').css('height', container.height()-115);
  $('#search-tree-tabs #tabs-1 #origprogs-cv').css('height', container.height()-115);
  $('#search-tree-tabs #tabs-2').css('height', container.height()-105);
  $('#search-tree-tabs #tabs-3').css('height', container.height()-105);
  $('#search-tree-tabs #tabs-4').css('height', container.height()-105);
  $('#search-tree-tabs #tabs-5').css('height', container.height()-105);
  $('#search-tree-tabs #tabs-6').css('height', container.height()-105);
  $('#search-tree-tabs #tabs-7').css('height', container.height()-105);
  if ($("#search-tree-tabs").tabs( "option", "active" )==0){  
    tunelogo('true');
  }
  if ( ($("#search-tree-tabs").tabs( "option", "active" )>0) && ($("#search-tree-tabs").tabs( "option", "active" )<4)){  
    var ActiveTab=$("#search-tree-tabs").tabs( "option", "active" )+1;
    var MaxHeight=parseInt($("#tabs-"+ActiveTab).css("max-height"));
    $("#tabs-"+ActiveTab).css("max-height",(container.height()-105)+"px");  
  }
  
  //if ($("#popup-search-tree").width()=<$("#search-tree-container").width()){
    if (getCookie1("podbortabs_maximize")=="true"){
      $("#search-tree-container").css("left","0%");  
    }
    else{
      var left=parseInt(100* (1-($("#search-tree-container").width()/document.documentElement.clientWidth))/2);
      var sectionpercent=parseInt(100* (1-($("#popup-search-tree").width()/document.documentElement.clientWidth))/2);
      $("#search-tree-container").css("left",left-sectionpercent+"%");
    }
 // }
 if ($("#search-tree-container").height()<document.documentElement.clientHeight){
    if (getCookie1("podbortabs_maximize")=="true"){
      $("#search-tree-container").css("top","0%");  
    }
    else{
      var top=parseInt(100* (1-($("#search-tree-container").height()/document.documentElement.clientHeight))/2);
      $("#search-tree-container").css("top",top+"%");
    }
  }


}


function setSizePodborPicture(){
  if ($("div#orignums-table-div table.orignumstable:visible").length){
    var maintable=$("div.selectpartsdiv:visible table:first");
    var img=$("#viewport img");
    maintable.css("width","100%");
    var oldwidth=$("#viewport img").width();
    var oldheight=$("#viewport img").height();
    var koef=oldwidth/oldheight;
    var curwidth=$("div.selectpartsdiv:visible table:first td:first").width();
    //var curheight=$("div.selectpartsdiv:visible table:first td:first").height();
    $("#viewport").width(curwidth);
    $("#viewport").height(parseInt(curwidth/koef)+"px");
    img.width(curwidth-20);
    img.height(parseInt(curwidth/koef)-20+"px");
    //rescaleImage2($("#viewport"));
  }
}

function setVisibleobjdiv(objdiv){
  if (!$("#"+objdiv+"").hasClass('hide')){
    maximizedialogmin();
    setpodborsubdiv(1, 1);////????
  }
  else{
    setpodborsubdiv(1, 1);
    maximizedialogmin();
  }
}

function setPositionviewdvornikdivIdDialog() {
   $('#viewdvornikdiv').parent().css("left","35%").css("top","5%");
   clearTimeout(viewdvornikdivId);
} 

