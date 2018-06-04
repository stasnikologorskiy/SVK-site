var InitMediaFlag=false;
var InitMediaFlagUber=false;
var InputselectColor= '#ff65d2';
var InputbackColor= '#00cb63';
var first20 = false;
var IsUberClient= false;
var scriptname ='';
var allowbonuses=false;
var arrBonusInOrder=new Array();//масив для хранения товаров, которые есть в заказе, и подсвечиваются
var arrBonusInOrderQv=new Array();//масив для хранения к-ва товаров, которые есть в заказе, и подсвечиваются
var arrBonusAttr = [];  //массив трехмерный для заполнения атрибутами подаркорв
var arrBonusWareResAttr = [];  //массив двухмерный для заполнения выбранными атрибутами 
var arrBonusWareResAttrCopy = [];  //массив двухмерный для заполнения выбранными атрибутами , для копиррования
var BonusPair= [];
var BonusPairCopy= [];
var BonusPairCopyVirtual= [];  //для цифор в скобочках
var CurrNodeInSearch = -1;
var CurrTemplInSearch = '';
var TempIconInSearch = false;
var page;                 // текущая страница
var curmotoattrgroupname;
var arrMediaBlock = [];  //массив для медиа блоков
var arrMediaBlockSameStat = [];  //массив для медиа блоков статический обычные клиенты
var arrMediaBlockSameStatUber = [];  //массив для медиа блоков статический обычные клиенты
var intervalID1=-1;
var intervalID2=-1;
var intervalID3=-1;

var arrRateCol = [];  //массив объектов для описания ячеек скидок
var checkColection = new Object(); // объект для проверок в различных функциях
var arrTextAll= new Array();  // массив для всех строк скидки
var RateDirectTitle=-1; //переменная для направлений скидок при показе подсказки
var bjauthdivDialogId=0;
var arrPodborMotul = [];  //массив  объектов для мотуль подбора
var TStream={};// аналог стрима для обработки в функциях
var TStream_={};// аналог стрима для обработки в функциях



function ecfull(command, data, action, type, asynq, question) {
  if ((!question) || confirm(question)) {
    $.ajax({
      url: scriptname+"/"+action,
      type: type,
      asynq: asynq,
      data: "act="+command+"&"+data,
      complete: function(obj, stat) {
  //      if (command=='aemodel') alert(obj.responseText);
      },
      dataType: "script"
    });
  }
}


function quit() {
  deleteCookie_('sid','/');
  deleteCookie_('showrateanimation','/');
  s=document.location.href;
  if ((i=s.indexOf('#'))!=-1) s=s.substring(0, i);
  if ((i=s.indexOf('/order?'))!=-1) s=s.substring(0, i);
  document.location.href=s;
}

function initialize(mess) { //функция для гугл мапс
  var mapOptions = {
    zoom: 17,
    center: positionreal,
    mapMaker: true
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  var infowindow = new google.maps.InfoWindow;
   infowindow.setContent('<b>'+mess+'</b>');
 
   var marker = new google.maps.Marker({map: map, position: positionreal});
   marker.addListener('click', function() {
     infowindow.open(map, marker);
   });
 
}

  
 
function checklogin() {
	 login=mtrim(document.getElementById('login').value);
	 if (login.length<5) {
	  	jqswMessageError('Логин должен быть не короче 5 символов.');
	 } else {
	 	 ec('checklogin', 'login='+login, 'nabj');
	 }
}

function theRotator() {
  //CurNumBlock1=0;
  //CurNumBlock2=0;
  //CurNumBlock3=0;
 arrMediaBlock[0].CurNumBlock=arrMediaBlock[1].CurNumBlock=arrMediaBlock[2].CurNumBlock=0;
 //Вызываем функцию rotate для запуска слайдшоу, 5000 = смена картинок происходит раз в 5 секунд
 //if (arrMediaBlock[1].length){
   //if ( intervalID==-1){
        //intervalID=setInterval('rotate()',500);
 //      clearTimeout(intervalID1);
 //      clearTimeout(intervalID2);
 //}
 //else{
 //      intervalID3=setInterval('rotate()',30000);
 for (i=0; i<arrMediaBlock.length; i++)   {
   $(".promotion.num-"+(i+1)).html('');
 }
 rotatenew();
 intervalID3=setInterval('rotatenew()',30000);
 //}
 //}}
}

function setDIVHTML(text,num) {	
  $(".promotion.num-"+num+" div.media").html('');
  $(".promotion.num-"+num+" div.media").html(text);
  //$("#promotion-num-"+num+"-1-container1").css("left","-500px");
  //$("#promotion-num-"+num+"-1-container1").animate({left: 0}, 500);
  $("#promotion-num-"+num+"-1-container1").css("bottom","-500px");
  $("#promotion-num-"+num+"-1-container1").animate({bottom: 0}, 500);
  $(".promotion.num-"+num+" div.media").animate({opacity: 1.0}, 500);
}

function rotatenew() {
	var inner,div,CurBlock,CurNumBlock,i,j=0,StyleStr;
  for (i=0; (i<arrMediaBlock.length)&&(arrMediaBlock[i].Data.length); i++)   {
    CurNumBlock=arrMediaBlock[i].CurNumBlock;
    CurBlock=arrMediaBlock[i].Data[CurNumBlock];
    // сначала прячем текущий 
    if (CurNumBlock) {
     // $(".promotion.num-"+(i+1)+">div[num='"+CurNumBlock+"']").animate({left: -500}, 500);
      $(".promotion.num-"+(i+1)+">div[num='"+CurNumBlock+"']").animate({bottom: -500}, 500);
    }

    // вычисляем следующий
    if ((arrMediaBlock[i].CurNumBlock=++CurNumBlock)>arrMediaBlock[i].Data.length) {
      arrMediaBlock[i].CurNumBlock=CurNumBlock=1;
    }

    // смотрим есть ли следующий див? если нет = добавляем
    if (!(div=$(".promotion.num-"+(i+1)+">div[num='"+CurNumBlock+"']")).length) {
      div=$(document.createElement('DIV'));
      $(".promotion.num-"+(i+1)).append(div);
      div.addClass('pointer');
      if (CurBlock.Type==3){
        div.attr('num', CurNumBlock).attr('blocktype', CurBlock.Type).attr('link', CurBlock.Link+'?&wcode='+CurBlock.WareCode);
      }
      else{
        div.attr('num', CurNumBlock).attr('blocktype', CurBlock.Type).attr('link', CurBlock.Link);
      }
      div.attr('title', CurBlock.Hint);
      //console.log(CurBlock.Type);
      if ((CurBlock.Link=='') && ((CurBlock.Type==1) || (CurBlock.Type==3))) {
        div.bind('click', function(e){return viewWareSearchDialog(this);});
        if (CurBlock.Type==3){
          if (CurBlock.ActionCode==-1){
            div.attr("hren", descrurl+'/wareinfo?warecode='+CurBlock.WareCode+'&model=&node=&eng=&filter=&isNew=new&bonus=true');
          } else  if (CurBlock.ActionCode==-2){
            div.attr("hren", descrurl+'/wareinfo?warecode='+CurBlock.WareCode+'&model=&node=&eng=&filter=&isNew=catch&bonus=true');
          }else{
            div.attr("hren", descrurl+'/wareinfo?warecode='+CurBlock.WareCode+'&model=&node=&eng=&filter=&bonus=true');
          }
        }
        else
          div.attr("hren", descrurl+'/wareinfo?warecode='+CurBlock.WareCode+'&model=&node=&eng=&filter=&bonus=false');
      }
      else{
        //console.log('aaa='+CurBlock.Type);
        div.bind('click', function(e){openLinkFromMediaBlockNew($(this));});
      }
      
      if ( (CurBlock.Type==1) || CurBlock.Type==3) {
        CurBlock.StyleAStr='width: 80px;';
        CurBlock.StyleImgStr='max-height: 100px; max-width: 80px;';
        if (CurBlock.Type==3)
          CurBlock.StyleAStr+=' display: table-cell;';
      }
      else{
       CurBlock.StyleAStr=''; 
       CurBlock.StyleImgStr=' width: 205px; height: 100px;'; 
      }

      inner='';
      inner+='    <div class="media-left media-middle">';
      inner+='       <a _bonus="false" style="'+CurBlock.StyleAStr+
                   '" class="image-wrap" >';
      inner+='               <img id="image_1" style="'+CurBlock.StyleImgStr+
                   '" src="'+CurBlock.ImageName+'" alt="'+CurBlock.WareName+'">'
           +'       </a>' 
           +'   </div>'
           +'   <div class="media-body" style="width: auto;">';
      StyleStr='';
      if (CurBlock.ActionCode !=0){
        inner+=' <p class="action-media-icon" title="'+CurBlock.ActionTitle+'">';
        if (CurBlock.ActionCode>0){
          inner+='   <a target="_blank" onclick="openActionLinkFromMediaBlock('+CurBlock.ActionCode+'); event.stopPropagation(); return false;" class="abANewAction" '+
          'style="background-image: url('+CurBlock.ActionImagePath+');" href="/app/orders.cgi/info?actioncode='+CurBlock.ActionCode+'">'+
          '</a>';
        }
        if (CurBlock.ActionCode==-1){
          inner+='<img src="/wareimages/loyality_small/new-gift-media.png" >';
          StyleStr=' style="margin-top: 0px;" ';
        }
        if (CurBlock.ActionCode==-2){
          inner+='<img src="/wareimages/loyality_small/25-percent-media.png" >';
          StyleStr=' style="margin-top: 15px;" ';
        }
        inner+='</p>';
      }
      inner+='      <p class="mediablock-name-p" '+StyleStr+'>'+CurBlock.WareName+'</p>'
           +'   </div>'
           +'</div>';
      div.html(inner);
      //div.css('position', 'absolute').css('left', '-500px');
      div.css('position', 'absolute').css('left', '10px').css('bottom', '-500px');

    }
    // теперь следующий див показываем
   div.delay(600).animate({bottom: 10}, 500);
    //div.delay(600).animate({left: 10}, 500);
  }

}

function rotate() {	
 //console.log('123532521352135');
 //console.log('Второй массив='+CurNumBlock2);
 //console.log('Третий массив='+CurNumBlock3);
 var i,j=0;
 for (i=0; i<arrMediaBlock.length; i++) {
 //for (i=0; i<1; i++) {
   if ( arrMediaBlock[i].Data.length>0) /* && (i==2))*/ {
     if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Link==''){
        if ( (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Type==1) || arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Type==3) {
         arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ClickStr='onclick="return viewWareSearchDialog(this);"'
         if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Type==3){
           if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode==-1){
             arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=descrurl+'/wareinfo?warecode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'&model=&node=&eng=&filter=&isNew=new&bonus=true';
           }else  if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode==-2){
                   arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=descrurl+'/wareinfo?warecode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'&model=&node=&eng=&filter=&isNew=catch&bonus=true';
                 }else{
                   arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=descrurl+'/wareinfo?warecode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'&model=&node=&eng=&filter=&bonus=true';
                 }
          }
         else
           arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=descrurl+'/wareinfo?warecode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'&model=&node=&eng=&filter=&bonus=false';
         //arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleStr='width: 89px;';
        }
     }
     else{
        //arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr='http://'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Link;
        //arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=' onclick="openLinkFromMediaBlock('+i+','+arrMediaBlock[i].CurNumBlock+');"';
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr='';
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ClickStr=' onclick="openLinkFromMediaBlock('+i+','+arrMediaBlock[i].CurNumBlock+');"';
      }
      if ( (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Type==1) || arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Type==3) {
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleAStr='width: 80px;';
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleImgStr='max-height: 100px; max-width: 80px;';
        if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Type==3)
          arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleAStr+=' display: table-cell;';
      }
      else{
       arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleAStr=''; 
       arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleImgStr=' width: 205px; height: 100px;'; 
      }
      if (arrMediaBlock[i].Data.length==1){
        arrMediaBlock[i].CurNumBlockNext=arrMediaBlock[i].CurNumBlock;
        //arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleStr=' width: 232px;';
      }
      else{
        if (arrMediaBlock[i].FlagBlock==1){
          arrMediaBlock[i].CurNumBlockNext=arrMediaBlock[i].CurNumBlock+1;
        } 
        else{
          arrMediaBlock[i].CurNumBlockNext=arrMediaBlock[i].CurNumBlock-1; 
        }
      }
      //onclick="window.open('''+scriptname+'/showdoc?type='+Stream.ReadStr+'&id='+Stream.ReadStr+'&isorders=true'');
      //console.log(arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr);
      arrMediaBlock[i].img='<div _bonus="false" hren="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr+'" warecode="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'" '+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ClickStr+
      ' class="pointer" title="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].Hint+'" id="promotion-num-'+(i+1)+'-1-container1" style="left: -500px; position: relative; display: block;">';
      arrMediaBlock[i].img+='    <div class="media-left media-middle">';
      arrMediaBlock[i].img+='       <a _bonus="false" style="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleAStr+
                   '" class="image-wrap" >';
      arrMediaBlock[i].img+='               <img id="image_1" style="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleImgStr+
                   '" src="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ImageName+'" alt="footer img">'
           +'       </a>' 
           +'   </div>'
           +'   <div class="media-body">';
      if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode !=0){
        arrMediaBlock[i].img+=' <p class="action-media-icon" title="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionTitle+'">';
        if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode>0){
          arrMediaBlock[i].img+='   <a target="_blank" onclick="openActionLinkFromMediaBlock('+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode+'); event.stopPropagation(); return false;" class="abANewAction" '+
          'style="background-image: url('+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionImagePath+');" href="/app/orders.cgi/info?actioncode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode+'">'+
          '</a>';
        }
        if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode==-1){
          arrMediaBlock[i].img+='<img src="/wareimages/loyality_small/new-gift-media.png" >';
        }
        if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode==-2)
          arrMediaBlock[i].img+='<img src="/wareimages/loyality_small/25-percent-media.png" >';
        arrMediaBlock[i].img+='</p>';
      }
      arrMediaBlock[i].img+='      <p class="mediablock-name-p">'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareName+'</p>'
           +'   </div>'
           +'</div>';
     //второй блок заполняем
     if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Link==''){
        if ( (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Type==1) || arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Type==3) {
         arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ClickStr=' onclick="return viewWareSearchDialog(this);"'
         if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Type==3)
          if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode==-1){
            arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=descrurl+'/wareinfo?warecode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'&model=&node=&eng=&filter=&isNew=new&bonus=true';
          }else  if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ActionCode==-2){
                  arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=descrurl+'/wareinfo?warecode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'&model=&node=&eng=&filter=&isNew=catch&bonus=true';
                }else{
                  arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].HrefStr=descrurl+'/wareinfo?warecode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].WareCode+'&model=&node=&eng=&filter=&bonus=true';
                }
        }
      }
      else{
        //arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].HrefStr='http://'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Link;
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].ClickStr=' onclick="openLinkFromMediaBlock('+i+','+arrMediaBlock[i].CurNumBlockNext+');"';
        //arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].HrefStr=' onclick="openLinkFromMediaBlock('+i+','+arrMediaBlock[i].CurNumBlockNext+');"';
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].HrefStr='';
      }
      if ( (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Type==1) || arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Type==3) {
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].StyleAStr='width: 80px;  ';
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlock].StyleImgStr='max-height: 100px; max-width: 80px;';
        if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Type==3)
          arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].StyleAStr+=' display: table-cell;';
      }
      else{
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].StyleAStr=''; 
        arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].StyleImgStr=' width: 205px; height: 100px;'; 
      }
      //console.log(arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].HrefStr);
      arrMediaBlock[i].img+='<div  _bonus="false" hren="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].HrefStr+'" warecode="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].WareCode+'" class="pointer img-hide"'+
      ' title="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].Hint+'"'+
      ' '+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ClickStr+' id="promotion-num-'+(i+1)+'-2-container2" style="left: -500px; position: relative;">';
      arrMediaBlock[i].img+='    <div class="media-left media-middle">';
      arrMediaBlock[i].img+='       <a  style="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].StyleAStr+
                   '" class="image-wrap" >';
      arrMediaBlock[i].img+='               <img id="image_1" style="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].StyleImgStr+
                   '" src="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ImageName+'" alt="footer img">'
           +'       </a>' 
           +'   </div>'
           +'   <div class="media-body">';
           if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionCode !=0){
             arrMediaBlock[i].img+=' <p class="action-media-icon" title="'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionTitle+'">';
             if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionCode>0){
               arrMediaBlock[i].img+='   <a target="_blank" onclick="openActionLinkFromMediaBlock('+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionCode+'); event.stopPropagation(); return false;" class="abANewAction" '+
               'style="background-image: url('+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionImagePath+');" href="/app/orders.cgi/info?actioncode='+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionCode+'">'+
               '</a>';
             }
             if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionCode==-1){
               arrMediaBlock[i].img+='<img src="/wareimages/loyality_small/new-gift-media.png" >';
             }
             if (arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].ActionCode==-2)
               arrMediaBlock[i].img+='<img src="/wareimages/loyality_small/25-percent-media.png" >';
             arrMediaBlock[i].img+='</p>';
          }
           arrMediaBlock[i].img+='      <p class="mediablock-name-p" >'+arrMediaBlock[i].Data[arrMediaBlock[i].CurNumBlockNext].WareName+'</p>'
           +'   </div>'
           +'</div>';
     /* $(".promotion.num-"+(i+1)+" div.media").css("opacity","1.0"); 
      $("#promotion-num-"+(i+1)+"-1-container1").css("left","0");
      $("#promotion-num-"+(i+1)+"-1-container1").animate({left: -500}, 500);
      $(".promotion.num-"+(i+1)+" div.media").animate({opacity: 0.0}, 500);*/
      $(".promotion.num-"+(i+1)+" div.media").css("opacity","1.0").animate({opacity: 0.0}, 500);
      $("#promotion-num-"+(i+1)+"-1-container1").css("left","0").animate({left: -500}, 500);
      //console.log(arrMediaBlock[i].img);
      setTimeout("setDIVHTML('"+arrMediaBlock[i].img+"',"+(i+1)+")", 600);
      //clearTimeout(intervalID);
      if (arrMediaBlock[i].Data.length>1){
        if ( (arrMediaBlock[i].CurNumBlock==(arrMediaBlock[i].Data.length-2)) && (arrMediaBlock[i].FlagBlock==1) ){
          arrMediaBlock[i].CurNumBlock=arrMediaBlock[i].Data.length;
          arrMediaBlock[i].FlagBlock=0;
        }
        else if ( (arrMediaBlock[i].CurNumBlock==1) && (arrMediaBlock[i].FlagBlock==0) ){
          arrMediaBlock[i].CurNumBlock=-1;
          arrMediaBlock[i].FlagBlock=1;
        }
        if (arrMediaBlock[i].FlagBlock==1) { arrMediaBlock[i].CurNumBlock++; } 
        if (arrMediaBlock[i].FlagBlock==0) {arrMediaBlock[i].CurNumBlock--; }
      }
   }
 }
};


function openLinkFromMediaBlock(i,DataNum){
  //console.log(i);
  //console.log(DataNum);
  window.open(''+arrMediaBlock[i].Data[DataNum].Link+'');
  //event.stopPropagation(); 
  return false;
}

function openLinkFromMediaBlockNew(el){
  //console.log(el.attr('blocktype'));
  //console.log(i);
  //console.log(DataNum);
  ///if (el.attr('blocktype')==3){
  //  location.href=""+el.attr('link')+"";
  //}
  //else {
  if (el.attr('link')!=''){
    window.open(''+el.attr('link')+'');
  }
  //}
  //event.stopPropagation(); 
  return false;
}


function openDefaultLinkFromMediaBlock(elem){
  window.open(''+$(elem).attr("_link")+'');
  //event.stopPropagation(); 
  return false;
}

function openActionLinkFromMediaBlock(ActionCode){
  window.open("/app/orders.cgi/info?actioncode="+ActionCode);
  //event.stopPropagation(); 
  return false;
}

function synqcolsNew(header,content,dh,dc) {
  if (content.rows.length>0){
    arrWidth= new Array();
    for (i=0; i<header.rows[0].cells.length; i++) {
      if ($(header.rows[0].cells[i]).width()> $(content.rows[0].cells[i]).width()) {
     // $(content.rows[0].cells[i]).width($(header.rows[0].cells[i]).width());
        arrWidth[i]=$(header.rows[0].cells[i]).width();
      //console.log(arrWidth[i]+'+');
      }
      else{
     // $(header.rows[0].cells[i]).width($(content.rows[0].cells[i]).width());
        arrWidth[i]=$(content.rows[0].cells[i]).width();
      // console.log(arrWidth[i]+'-');
      } 
    }
    for (i=0; i<header.rows[0].cells.length; i++) {
    //console.log(arrWidth[i]+'!!');
      if ((dh===undefined) && (dc===undefined)) {
        $(content.rows[0].cells[i]).width(arrWidth[i]-17+'px');
        $(header.rows[0].cells[i]).width(arrWidth[i]-20+'px');
      } else{
        $(content.rows[0].cells[i]).width(arrWidth[i]-dc+'px');
        $(header.rows[0].cells[i]).width(arrWidth[i]-dh+'px');
      }
    }
  }
}

function synqcolsNew2(beg,header,content,dh,dc) {
  arrWidth= new Array();
  if (content.rows.length>0){
    for (i=beg; i<header.rows[0].cells.length-1; i++) {
      if ($(header.rows[0].cells[i]).width()> $(content.rows[0].cells[i]).width()) {
     // $(content.rows[0].cells[i]).width($(header.rows[0].cells[i]).width());
        arrWidth[i]=$(header.rows[0].cells[i]).width();
      //console.log(arrWidth[i]+'+');
      }
      else{
     // $(header.rows[0].cells[i]).width($(content.rows[0].cells[i]).width());
        arrWidth[i]=$(content.rows[0].cells[i]).width();
      // console.log(arrWidth[i]+'-');
      } 
    }
    for (i=beg; i<header.rows[0].cells.length-1; i++) {
     //console.log(arrWidth[i]+'!!');
      if ((dh===undefined) && (dc===undefined)) {
        $(content.rows[0].cells[i]).width(arrWidth[i]-10+'px');
        $(header.rows[0].cells[i]).width(arrWidth[i]-25+'px');
      } else{
        $(content.rows[0].cells[i]).width(arrWidth[i]-dc+'px');
        $(header.rows[0].cells[i]).width(arrWidth[i]-dh+'px');
    }
  }
 }
}

function jqswConfirmSaleBlock(text) { //для замены окна Отгрузка закпрещена
  $('#jqdialog').html('<div style="align: center; vertical-align: center; margin: 10px;">'+text+'</div>');
  $('#jqdialog').dialog({
    modal:true,
    show: "fade",
    hide: "fade",
    title: "Информация",
    zIndex: 1100,
    width:"auto",
    position: "center",
    height:"auto",
    close: function(event, ui) { $('#jqdialog').dialog('destroy');},
    buttons: {"Да" : function()  { location.href=scriptname+'/debt' ; $('#jqdialog').dialog('destroy');} ,
              "Нет" : function() {$('#jqdialog').dialog('destroy');}
    }
  });
   $('#jqdialog').dialog('open');
}

// al-AddLine добавить строку с товаром с кодом code в текущий заказ
function al_redisign(code, self) {
  //self.onclick=null;
   var val=$(self).parent().parent().prev().find("input").val();
   //console.log(val);
   if (val>0){
    if ($('#addlines', top.document).length) { 
       if ($('#addlines', top.document).attr('value')) {
         s='act=linefromsearchtoorder';
         //s='act=linefromsearchtoorder'; 
         s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
          //val=self.nextSibling.elements[0].value;
          s=s+'&warecode='+code+'&wareqty='+(isNaN(val)?'1':val);
          $.ajax({
            url: scriptname+"/abj",
            type: "post",
            data: s,
            dataType: "script"
         });
       } 
       else {
         s='act=getlistopenorders';
         //s='act=linefromsearchtoorder'; 
         s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
          //val=self.nextSibling.elements[0].value;
          s=s+'&warecode='+code+'&wareqty='+(isNaN(val)?'1':val);
          s=s+'&contract='+$('#contract').val()+'&dialogname=';
          $.ajax({
            url: scriptname+"/newbj",
            type: "post",
            data: s,
            dataType: "script"
         });

       }
     }
   }
   else{
     jqswMessage('Введите количество товара');
   }

}

function al_redisignMotul(code, self) {
  //self.onclick=null;
   var val=$(self).parent().parent().find("input:text").val();
   if (val>0){
    if ($('#addlines', top.document).length) { 
       if ($('#addlines', top.document).attr('value')) {
         s='act=linefromsearchtoorder';
         //s='act=linefromsearchtoorder'; 
         s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
          //val=self.nextSibling.elements[0].value;
          s=s+'&warecode='+code+'&wareqty='+(isNaN(val)?'1':val);
          $.ajax({
            url: scriptname+"/abj",
            type: "post",
            data: s,
            dataType: "script"
         });
       } 
       else {
         s='act=getlistopenorders';
         //s='act=linefromsearchtoorder'; 
         s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
          //val=self.nextSibling.elements[0].value;
          s=s+'&warecode='+code+'&wareqty='+(isNaN(val)?'1':val);
          s=s+'&contract='+$('#contract').val()+'&dialogname=';
          $.ajax({
            url: scriptname+"/newbj",
            type: "post",
            data: s,
            dataType: "script"
         });

       }
     }
   }
   else{
     jqswMessage('Введите количество товара');
   }

}

// al-AddLine добавить товар по ентеру
function al_redisignEnter(code, self) {
  //self.onclick=null;
   var val=$(self).val();
   //console.log(val);
   if (val>0){
    if ($('#addlines', top.document).length) { 
       if ($('#addlines', top.document).attr('value')) {
         s='act=linefromsearchtoorder';
         //s='act=linefromsearchtoorder'; 
         s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
          //val=self.nextSibling.elements[0].value;
          s=s+'&warecode='+code+'&wareqty='+(isNaN(val)?'1':val);
          $.ajax({
            url: scriptname+"/abj",
            type: "post",
            data: s,
            dataType: "script"
         });
       } 
       else {
         s='act=getlistopenorders';
         //s='act=linefromsearchtoorder'; 
         s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
          //val=self.nextSibling.elements[0].value;
          s=s+'&warecode='+code+'&wareqty='+(isNaN(val)?'1':val);
          s=s+'&contract='+$('#contract').val()+'&dialogname=';
          $.ajax({
            url: scriptname+"/newbj",
            type: "post",
            data: s,
            dataType: "script"
         });

       }
     }
   }
   else{
     jqswMessage('Введите количество товара');
   }

}

function checkAll(checked){
  var j=$('#orders-table-body tr').length;
  for (i=0; i<j; i++) {
		if ($("#cb"+i).length){
      el=document.getElementById("cb"+i);
      if (!el.disabled) el.checked=checked;
    }    
	}
  edb();
}

function checkAllOrder(checked){
  //alert(checked);
  var elems=$('#order-table-body tr td.col-checkbox input');
  elems.each(function (e) {
   this.checked=!checked;
  });
  
  /*var j=$('#order-table-body tr').length;
  for (i=0; i<j; i++) {
		if ($("#cb"+i).length){
      el=document.getElementById("cb"+i);
      if (!el.disabled) el.checked=!checked;
    }    
	}*/
}

function checkAllBonus(checked){
  var elems=$('#order-for-gift-table-body tr td.col-checkbox input');
  elems.each(function (e) {
   this.checked=checked;
  });
  /*var j=$('#order-for-gift-table-body tr').length;
  for (i=0; i<j; i++) {
		if ($("#cb"+i).length){
      el=document.getElementById("cb"+i);
      if (!el.disabled) el.checked=checked;
    }    
	}*/
}


// управляет доступностью кнопок создания/объединения заказов по отмеченным
// edb - enable/disable buttons
function edb() {
  var btobm = false;
  var count = 0;
  var btjm = true;
  var s = new String('');
  var j=$('#orders-table-body tr').length;
	for (i=0; i<j; i++) {
		if ($("#cb"+i).length){
      btobm=btobm || document.getElementById("cb"+i).checked;
 		  if (document.getElementById("cb"+i).checked && document.getElementById("db"+document.getElementById("cb"+i).name.substring(2, 100))) count++;
		  btjm = btjm && !(document.getElementById("cb"+i).checked && !document.getElementById("db"+document.getElementById("cb"+i).name.substring(2, 100)))
    }
  }
 
    im=document.getElementById("btim_unorders");
	if (im) {
		im.style.cursor=((count<2) || !btjm)?"default":"pointer";
		$("#btim_unorders").attr("disable",(((count<1) || !btjm)?"disable":"enable"));
	}
    im=document.getElementById("btim_delorders");
	if (im) {
		im.style.cursor=((count<1) || !btjm)?"default":"pointer";
    $("#btim_delorders").attr("disable",(((count<1) || !btjm)?"disable":"enable"));
	}
    im=document.getElementById("btim_nobc");
	
  /*if (im) {
		im.style.cursor=(!btobm)?"default":"pointer";
		$("#btim_nobc").attr("disable",(((count<1) || !btjm)?"disable":"enable"));
	}*/
}


// отправляет команду удаления отмеченных заказов
function del_orders() {
  //if (document.getElementById("btim_delorders").style.cursor=='default') {
  // 	return;
  //}
  jConfirm('Вы действительно хотите удалить отмеченные заказы?', 'Да','Нет',function get(res){
     if (res){  
       var s='';
       var j=$('#orders-table-body tr').length;
       for (i=0; i<j; i++) {
         if ($("#cb"+i).length){
           if (document.getElementById("cb"+i).checked) {
             s+=document.getElementById("cb"+i).name.substring(2, 100)+',';
           }
         }  
       }
       ec("delorders", "ordercodes="+s, "abj");
     }
  });

  /*if (confirm('Вы действительно хотите удалить отмеченные заказы?')) {
    var s='';
    var j=$('#orders-table-body tr').length;
    for (i=0; i<j; i++) {
      if ($("#cb"+i).length){
    		if (document.getElementById("cb"+i).checked) {
      	  s+=document.getElementById("cb"+i).name.substring(2, 100)+',';
  		  }
      }  
  	}
    ec("delorders", "ordercodes="+s, "abj");
  }*/
}

function del_ordersNew() {
  //if (document.getElementById("btim_delorders").style.cursor=='default') {
  // 	return;
  //}
  jConfirm('Вы действительно хотите удалить отмеченные заказы?', 'Да','Нет',function get(res){
     if (res){  
       var s='';
       var j=$('#orders-table-body tr').length;
       for (i=0; i<j; i++) {
         if ($("#cb"+i).length){
           if (document.getElementById("cb"+i).checked) {
             s+=document.getElementById("cb"+i).name.substring(2, 100)+',';
           }
         }  
       }
       ec("delorders", "ordercodes="+s, "newbj");
     }
  });
}

// отправляет команду удаления отмеченных позиций в заказе конкретном
function del_order() {
 if (document.getElementById("addlines")) {
   var elems=$("#order-table-body input[type='checkbox']:checked");
   if (elems.length>0){
    jConfirm('Вы действительно хотите удалить отмеченные товары?', 'Да','Нет',function get(res){
       if (res){  
         var s='';
         elems.each(function(i,elem) { 
           s+=this.name.substring(2, 100)+',';
         }); 
         ec('dlRedisign', 'line='+s+'&ordr='+document.getElementById("addlines").value);  
       }
    });
   }
   else{
    jqswMessageError('Не выбран ни один товар');
   }
  //console.log('line='+s+'&ordr='+document.getElementById("addlines").value);
 }
}

// отправляет команду обновления цен в неотправленных заказах
// rpio - RefreshPriceInOrders
function rpio() {
  if (confirm('Вы действительно хотите обновить цены в неотправленных заказах?')) {
    ec("refresh_prices", "", "abj");
/*
    document.getElementById("act").value='refresh_prices';
  	form=document.getElementById("neworderform");
    form.action=scriptname+'/orders'; //отправляем не на "order" а на "orders"
    form.submit();
*/
  }
}

function rpioNew() {
 jConfirm('Вы действительно хотите обновить цены в неотправленных заказах?', 'Ок','Отмена',function get(res){
   if (res){  
     ec("refresh_prices", "", "newbj");
   }
 });
}


function checkBonusOrder(){
  var balans=$("#user-unit-limit").text();
  var reserv=$("#user-unit-reserv").text();
  var sum=balans-reserv;
  var ordsum=$("#sumcellbonus").attr('ordsum_').replace(',','.');
  if (sum>=ordsum){
    return true;
  }
  else{
    if (balans>=parseInt(ordsum)) {jqswMessage('У Вас недостаточно свободных '+BallsName+' для этого заказа. Если приобретение  именно этого подарка крайне важно для Вас, отмените предыдущую заявку');return false;}
    else { jqswMessage('У Вас недостаточно '+BallsName+' для этого заказа.'); return false;}     
  }
}


// отображает окно фильтра заказов
function showorderfilter() {
  $("#popup-calendar").toggleClass('hide');
  /*var s='<div class="contracts-body" id="filters-body" >';
  s=s+'<table id="filters-choice-table" class="table table-header left"> ';
  s=s+'<tr style="font-size: 14px;"><td rowspan=7 style="width: 50%;"></td><td colspan=2 ><nobr>Показывать заказы со статусами:</nobr></td><td rowspan=7 style="width: 50%;"></td></tr>';
  s=s+'<tr><td><input type=checkbox id="cbForming" name="cbForming"><label for="cbForming" ></label>&nbsp;&nbsp;&nbsp;Формируется</td><td><input type=checkbox id="cbClosed" name="cbClosed"><label for="cbClosed" ></label>&nbsp;&nbsp;&nbsp;Закрыт</td></tr>';
  s=s+'<tr><td><input type=checkbox id="cbProcessing" name="cbProcessing"><label for="cbProcessing" ></label>&nbsp;&nbsp;&nbsp;На обработке</td><td><input type=checkbox id="cbAnulated" name="cbAnulated"><label for="cbAnulated" ></label>&nbsp;&nbsp;&nbsp;Аннулирован</td></tr>';
  s=s+'<tr><td><input type=checkbox id="cbAccepted" name="cbAccepted"><label for="cbAccepted" ></label>&nbsp;&nbsp;&nbsp;Принят</td><td><input type=checkbox id="cbAll" onClick=sfcaa(this.checked)><label for="cbAll" ></label>&nbsp;&nbsp;&nbsp;Все</td></tr>';
  s=s+'<tr style="font-size: 14px;"><td colspan=2 align=center>за период:</td></tr>';
  s=s+'<tr><td><nobr>с&nbsp;<input type=text id=dataFrom name=dataFrom maxlength=8 size=8><img id="imgfrom" src="/images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onclick="show_calendar(\'dataFrom\');"></nobr></td>';
  s=s+'<td><nobr>по&nbsp;<input type=text id=dataTo name=dataTo maxlength=8 size=8><img src="/images/calendar.png" style="margin: -3px 2px; cursor: pointer; width: 17px; height: 17px;" onclick="show_calendar(\'dataTo\');"></nobr></td></tr>';
  s=s+'<tr><td colspan=2 style="text-align: center;"><a class="apply-btn btn info-close" onclick="sof(); ">Применить</a>&nbsp;&nbsp;&nbsp;<a class="close-btn btn info-close" onclick="closefilter();">Закрыть</a></td></tr>';
  s=s+'</table>';
  s=s+'';
  s=s+'';
  s=s+'</div>';

  jqswfillInfo(s,"Окно фильтров заказов",20,250,2);
  */
  document.getElementById("cbForming").checked=(getCookie1('ofForming')==1);
  document.getElementById("cbClosed").checked=(getCookie1('ofClosed')==1);
  document.getElementById("cbProcessing").checked=(getCookie1('ofProcessing')==1);
  document.getElementById("cbAnulated").checked=(getCookie1('ofAnulated')==1);
  document.getElementById("cbAccepted").checked=(getCookie1('ofAccepted')==1);
  document.getElementById("dataFrom").value=getCookie1('ofDataFrom');
  if (document.getElementById("dataFrom").value=='null') document.getElementById("dataFrom").value='';
  document.getElementById("dataTo").value=getCookie1('ofDataTo');
  if (document.getElementById("dataTo").value=='null') document.getElementById("dataTo").value='';

}

// проверяет окно фильтра заказов на предмент все ли заполнено
function checkOrdersFilterCookie() {
  var res=0; 
  if (getCookie1('ofForming')==1){
    res=1;
    return res;
  }
  if (getCookie1("cbProcessing")==1){
    res=1;
    return res;
  }    
  if (getCookie1("cbAnulated")==1){
    res=1;
    return res;
  }
  if (getCookie1("cbAccepted")==1){
    res=1;
    return res;
  }    
  if (getCookie1("ofClosed")==1){
    res=1;
    return res;
  }
  if (getCookie1("ofClosed")==1){
    res=1;
    return res;
  }
  if (getCookie1("dataFrom")==1){
   res=1;
   return res;  
  }
  if (getCookie1("dataTo")==1){
    res=1;
    return res; 
  }
  return res;
}

// проверяет окно фильтра заказов на предмент все ли заполнено
function checkordersfilter() {
  var res=0; 
  if (document.getElementById("cbForming").checked){
    res=1;
    return res;
  }
  if (document.getElementById("cbProcessing").checked){
    res=1;
    return res;
  }    
  if (document.getElementById("cbAnulated").checked){
    res=1;
    return res;
  }
  if (document.getElementById("cbAccepted").checked){
    res=1;
    return res;
  }    
  if (document.getElementById("ofClosed").checked){
    res=1;
    return res;
  }
  if (document.getElementById("ofClosed").checked){
    res=1;
    return res;
  }
  if (document.getElementById("dataFrom").value==''){
   res=1;
   return res;  
  }
  if (document.getElementById("dataTo").value==''){
    res=1;
    return res; 
  }
  return res;
}

// вызывается при подтверждении фильтра заказов
// sof - SubmitOrderFilter
function sof() {
  var res;
  res=cal_check_date(document.getElementById("dataFrom"), true);
 // console.log(res);
  if (res) {
    res=cal_check_date(document.getElementById("dataTo"), true);
    if (res) {
      setCookie_('ofForming', ((document.getElementById("cbForming").checked)?'1':'0'), getExpDate_(360,0,0),'/',0,0);
      setCookie_('ofClosed', ((document.getElementById("cbClosed").checked)?'1':'0'), getExpDate_(360,0,0),'/',0,0);
      setCookie_('ofProcessing', ((document.getElementById("cbProcessing").checked)?'1':'0'), getExpDate_(360,0,0),'/',0,0);
      setCookie_('ofAnulated', ((document.getElementById("cbAnulated").checked)?'1':'0'), getExpDate_(360,0,0),'/',0,0);
      setCookie_('ofAccepted', ((document.getElementById("cbAccepted").checked)?'1':'0'), getExpDate_(360,0,0),'/',0,0);
      setCookie_('ofDataFrom', document.getElementById("dataFrom").value, getExpDate_(360,0,0),'/',0,0);
      setCookie_('ofDataTo', document.getElementById("dataTo").value, getExpDate_(360,0,0),'/',0,0);
    } else {
      document.getElementById("dataTo").focus();
    }
  } else {
    document.getElementById("dataFrom").focus();
  }

  if (res) {
    location.replace(document.location.href);
    reloadpage();
    /*if (checkordersfilter()==1){
      if( !$(".orders-filter").hasClass('set')) {
           $(".orders-filter").toggleClass("set");
      }
    }*/
    $("#popup-calendar").toggleClass('hide');
  }
}


$(document).ready(function() {		
  if ($("#infosection").css("display")=='block'){
    if ($("div#tablecontentdiv ul li a[href^='#infodiv7']").length){
     $("div#tablecontentdiv ul li a[href^='#infodiv7']").attr("title","Условия использования сайта");
    }
  }
  // Запускаем слайдшоу
  if (!IsUberClient){
    if (InitMediaFlag){
      // alert(IsUberClient);
      if ($(".main-footer").length){
        //intervalID1=setInterval('rotate()',500);
        //intervalID2=setInterval( 'theRotator()',1000);
        theRotator(); 
      }
    } 
    else{
      $(".main-footer div.promotion-wrap").css("border","1px solid #d4d9e3").css("border-radius","5px");
      $(".main-footer .promotion-wrap div.promotion").css("border-right","3px solid #d4d9e3");
      var text='';
      for(i=0;i<arrMediaBlockSameStat.length;i++){
        text='<img _link="'+arrMediaBlockSameStat[i].Data[0].Link+'" onclick="openDefaultLinkFromMediaBlock(this);" class="promotion-image" src="'+arrMediaBlockSameStat[i].Data[0].ImageName+'" >';
        $(".promotion.num-"+(i+1)).html(text);
      }
    }
  }
  else {
    if (InitMediaFlagUber){
      $(".main-footer div.promotion-wrap").css("border","1px solid #d4d9e3").css("border-radius","5px");
      $(".main-footer .promotion-wrap div.promotion").css("border-right","3px solid #d4d9e3");
      var text='';
      for(i=0;i<arrMediaBlockSameStatUber.length;i++){
        text='<img _link="'+arrMediaBlockSameStatUber[i].Data[0].Link+'" onclick="openDefaultLinkFromMediaBlock(this);" class="promotion-image" src="'+arrMediaBlockSameStatUber[i].Data[0].ImageName+'" >';
        $(".promotion.num-"+(i+1)).html(text);
      }
    } 
    else{
      $(".main-footer div.promotion-wrap").css("border","0px");
      $(".main-footer .promotion-wrap div.promotion").css("border-right","0px");
    }
  }
 $('a[data-toggle=tooltip]').tooltip();
 deleteCookie_("firstenter", "/", "");
 $("div.bootstrap-select").click(function () { 
   setJoinFilter(); 
 }); 
 

  
 if (window.screen.height<=768){
    $("#main-content").css("min-height","600px").css("padding-bottom","160px"); 
    $(".order-table-body-wrap").css("max-height","250px").css("min-height","250px");
    $("#debt-tab-div .debt-table-body-wrap").css("max-height","210px").css("min-height","210px");
    $("#debt-tab-check-div .debt-table-body-wrap").css("max-height","150px").css("min-height","150px");
    $("#debt-tab-acc-div .debt-table-body-wrap").css("max-height","210px").css("min-height","210px");
    $("#debt-tab-recl-div .debt-table-body-wrap").css("max-height","190px").css("min-height","190px");
    $("#reserv-table-body-wrap.order-table-body-wrap").css("max-height","160px").css("min-height","160px");
    $("section#contracts").css("max-height","360px").css("min-height","360px");
    $("section#reserv").css("min-height","350px");
    $(".debt.right-bar").css("min-height","340px");   
    $("section#infosection #tablecontentdiv").css("min-height","360px");
 }
 if ((window.screen.height>768) && (window.screen.height<=900)){
    $("#main-content").css("min-height","770px").css("padding-bottom","160px"); 
    $(".order-table-body-wrap").css("max-height","370px").css("min-height","370px");
    $("section#contracts").css("max-height","360px").css("min-height","360px");
    $("#debt-tab-div .debt-table-body-wrap").css("max-height","340px").css("min-height","340px");
    $("#debt-tab-check-div .debt-table-body-wrap").css("max-height","290px").css("min-height","290px");
    $("#debt-tab-acc-div .debt-table-body-wrap").css("max-height","340px").css("min-height","340px");
    $("#debt-tab-recl-div .debt-table-body-wrap").css("max-height","320px").css("min-height","320px");
    $(".debt.right-bar").css("min-height","450px"); 
    //
   //
   //$("#reserv-table-body-wrap.order-table-body-wrap").css("max-height","160px").css("min-height","160px");
    //$("section#reserv").css("min-height","350px");
    //$(".debt.right-bar").css("min-height","340px");
 }
});

// сохраняет значение флажка "игнорировать спецсимволы"
// isc - IgnoreSpecialClick
function isc(cb) {
  setCookie_('ignorspec', ((cb.checked)?'checked':'unchecked'), getExpDate_(360,0,0),'/',0,0);
//  setCookie_('ignorspec', cb.value, getExpDate_(3600,0,0),'/',0,0);
}


function getVersionPrice(){  //для страницы Настройки. Возращает тип прайса для загрузки
 var chkAuto=$("#load_auto_mode").prop("checked");
 var chkMoto=$("#load_moto_mode").prop("checked");
 var chkMotul=$("#load_motul_mode").prop("checked");
 var chkHD=$("#load_hd_mode").prop("checked");
 if ((chkAuto==true) && (chkMoto==true) && (chkMotul==true) && (chkHD==true)){
  return 0; 
 }
 else if ((chkAuto==false) && (chkMoto==false) && (chkMotul==false)  && (chkHD==false)){
  return 0;
 }else{
   if ((chkAuto==true) && (chkMoto==false) && (chkMotul==false)  && (chkHD==false)){
     return 1;  
   } 
   if ((chkAuto==false) && (chkMoto==true) && (chkMotul==false)  && (chkHD==false)){
     return 2;  
   } 
   if ((chkAuto==false) && (chkMoto==false) && (chkMotul==true)  && (chkHD==false)){
     return 3;  
   }
   if ((chkAuto==true) && (chkMoto==true) && (chkMotul==false)  && (chkHD==false)){
     return 4;  
   } 
   if ((chkAuto==true) && (chkMoto==false) && (chkMotul==true)  && (chkHD==false)){
     return 5;  
   }
   if ((chkAuto==false) && (chkMoto==true) && (chkMotul==true)  && (chkHD==false)){
     return 6;  
   } 
   if ((chkAuto==false) && (chkMoto==false) && (chkMotul==false)  && (chkHD=true)){
     return 7;  
   } 
   if ((chkAuto==true) && (chkMoto==false) && (chkMotul==false)  && (chkHD=true)){
     return 8;  
   } 
   if ((chkAuto==false) && (chkMoto==true) && (chkMotul==false)  && (chkHD=true)){
     return 9;  
   } 
   if ((chkAuto==false) && (chkMoto==false) && (chkMotul==true)  && (chkHD=true)){
     return 10;  
   }
   if ((chkAuto==true) && (chkMoto==true) && (chkMotul==false)  && (chkHD=true)){
     return 11;  
   }
   if ((chkAuto==true) && (chkMoto==false) && (chkMotul==true)  && (chkHD=true)){
     return 12;  
   }
   if ((chkAuto==false) && (chkMoto==true) && (chkMotul==true)  && (chkHD=true)){
     return 13;  
   }
   if ((chkAuto==true) && (chkMoto==true) && (chkMotul==true)  && (chkHD=false)){
     return 14;  
   }

  }
}


function addtochangedataorder(a, type, act, num) {
  var s=res='';
  var i;
  var tbl=$('#changedataordertable')[0];
  var tr;
  var cell;

  switch (act) {
    case 'add':
      switch (type) {
        case 'phone':
            jPrompt('Введите номер телефона для добавления', '', 'Ок','Отмена',function get(result){
              if (result){  
                res='Добавить номер телефона '+result;
                if ((num>-1) && (tr=$('#changedataordertable tr.'+type+num)).length) {
                  tr=tr[0];
                } else {
                  tr=tbl.insertRow(tbl.rows.length-1);
                  tr.className=type+num;
                  tr.insertCell(0);
                  cell=tr.insertCell(1);
                  cell.innerHTML='<button onclick="delrowfromchangedataordertable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
                } 
                $(tr).attr('emailcounter', type+act);
                tr.cells[0].innerHTML='&bull;  '+res;
                tbl.style.display="block";
              }
            });
            //res=prompt('Введите номер телефона для добавления', '');
            //if (res) res='Добавить номер телефона '+res;       
            break
        case 'email':
            jPrompt('Введите email для добавления', '', 'Ок','Отмена',function get(result){
              if (result){  
                res='Добавить email '+result; 
                if ((num>-1) && (tr=$('#changedataordertable tr.'+type+num)).length) {
                  tr=tr[0];
                } else {
                  tr=tbl.insertRow(tbl.rows.length-1);
                  tr.className=type+num;
                  tr.insertCell(0);
                  cell=tr.insertCell(1);
                  cell.innerHTML='<button onclick="delrowfromchangedataordertable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
                } 
                $(tr).attr('emailcounter', type+act);
                tr.cells[0].innerHTML='&bull;  '+res;
                tbl.style.display="block";

              }
            });
            //res=prompt('Введите email для добавления', '');
            //if (res) res='Добавить email '+res;       
            break
        case 'invoice':
          res=$(a).text();       
          break

      } //switch (type) {
      break
    case 'edit':
      switch (type) {
        case 'fio':
          jPrompt('Заменить ФИО на', '', 'Ок','Отмена',function get(result){
            if (result){  
              res='Заменить ФИО на '+result;
              if ((num>-1) && (tr=$('#changedataordertable tr.'+type+num)).length) {
                tr=tr[0];
              } else {
                tr=tbl.insertRow(tbl.rows.length-1);
                tr.className=type+num;
                tr.insertCell(0);
                cell=tr.insertCell(1);
                cell.innerHTML='<button onclick="delrowfromchangedataordertable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
              } 
              $(tr).attr('emailcounter', type+act);
              tr.cells[0].innerHTML='&bull;  '+res;
              tbl.style.display="block";
            }
          });
          //res=prompt('Заменить ФИО на', '');
         // if (result) res='Заменить ФИО на '+res;       
          break
        case 'post':
          jPrompt('Заменить должность на', '', 'Ок','Отмена',function get(result){
            if (result){  
              res='Заменить должность на '+result;  
              if ((num>-1) && (tr=$('#changedataordertable tr.'+type+num)).length) {
                tr=tr[0];
              } else {
                tr=tbl.insertRow(tbl.rows.length-1);
                tr.className=type+num;
                tr.insertCell(0);
                cell=tr.insertCell(1);
                cell.innerHTML='<button onclick="delrowfromchangedataordertable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
              } 
              $(tr).attr('emailcounter', type+act);
              tr.cells[0].innerHTML='&bull;  '+res;
              tbl.style.display="block";
            }
          });
          //res=prompt('Заменить должность на ', '');
          //if (result) res='Заменить должность на '+res;       
          break
        case 'phone':
          s=a.parentNode.parentNode.cells[1].innerHTML;
          jPrompt('Заменить телефон '+s+' на ', '', 'Ок','Отмена',function get(result){
            if (result){  
              res='Заменить телефон '+s+' на '+result;
              if ((num>-1) && (tr=$('#changedataordertable tr.'+type+num)).length) {
                tr=tr[0];
              } else {
                tr=tbl.insertRow(tbl.rows.length-1);
                tr.className=type+num;
                tr.insertCell(0);
                cell=tr.insertCell(1);
                cell.innerHTML='<button onclick="delrowfromchangedataordertable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
              } 
              $(tr).attr('emailcounter', type+act);
              tr.cells[0].innerHTML='&bull;  '+res;
              tbl.style.display="block";
            }
          });
          //res=prompt('Заменить телефон '+s+' на ', '');
          //if (result) res='Заменить телефон '+s+' на '+res;       
          break
        case 'email':
          s=a.parentNode.parentNode.cells[1].innerHTML;
          jPrompt('Заменить email '+s+' на ', '', 'Ок','Отмена',function get(result){
            if (result){  
              res='Заменить email '+s+' на '+result;
              if ((num>-1) && (tr=$('#changedataordertable tr.'+type+num)).length) {
                tr=tr[0];
              } else {
                tr=tbl.insertRow(tbl.rows.length-1);
                tr.className=type+num;
                tr.insertCell(0);
                cell=tr.insertCell(1);
                cell.innerHTML='<button onclick="delrowfromchangedataordertable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
              } 
              $(tr).attr('emailcounter', type+act);
              tr.cells[0].innerHTML='&bull;  '+res;
              tbl.style.display="block";
            }
          });
          //res=prompt('Заменить email '+s+' на ', '');
          //if (result) res='Заменить email '+s+' на '+res;       
          break;
      } //switch (type) {
      break
    case 'del':
      switch (type) {
        case 'phone':
          s=a.parentNode.parentNode.cells[1].innerHTML;
          res='Удалить номер телефона '+s;       
          break
        case 'email':
          s=a.parentNode.parentNode.cells[1].innerHTML;
          res='Удалить email '+s;       
          break
      } //switch (type) {
      break
  } //switch (act) {
  
  if (res) {
   if ((num>-1) && (tr=$('#changedataordertable tr.'+type+num)).length) {
      tr=tr[0];
    } else {
      tr=tbl.insertRow(tbl.rows.length-1);
      tr.className=type+num;
      tr.insertCell(0);
      cell=tr.insertCell(1);
      cell.innerHTML='<button onclick="delrowfromchangedataordertable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
    } 
    $(tr).attr('emailcounter', type+act);
    tr.cells[0].innerHTML='&bull;  '+res;
    tbl.style.display="block";
  }
}

function delrowfromchangedataordertable(a) {
  var tbl=$('#changedataordertable')[0];
  tbl.deleteRow(a.parentNode.parentNode.rowIndex);
  if (tbl.rows.length<3) tbl.style.display="none";
  $("#"+$(a).attr("aria-describedby")).detach();
}


function sendorderfornewcontactadd(form) {
  //var form;
  var el;
  console.log('привет');
 // form=$('#popup-newcontactpersonorder form')[0];

  el=$(form).find('input[name^="fio"]')[0];
  el.value=mtrim(el.value);
  if (!el.value) {
    jqswMessageError("Вы не указали ФИО сотрудника");
    el.focus();
    return false;
  }

  el=$(form).find('input[name^="post"]')[0];
  el.value=mtrim(el.value);
  /*if (!el.value) {
    alert("Вы не указали должность сотрудника");
    el.focus();
    return false;
  }*/
  
  el=$(form).find('textarea[name^="email"]')[0];
  el.value=mtrim(el.value);
  if (!el.value) {
    jqswMessageError("Вы не указали email сотрудника");
    el.focus();
    return false;
  }
  
  return sfba(form);
  
}

// отправляет команду создания нового заказа по отмеченным
// obm - OrderByMarket
function obmaj(obmtype) {
  jConfirm('Вы действительно хотите '+((obmtype=='obm')?'создать новый заказ по отмеченным':'объединить отмеченные заказы')+'?', 'Ок','Отмена',function get(res){
   if (res){  
     var newinput;
   	 form=document.getElementById("neworderform");
   	 j=0;
     var contrel=$("#contract");
     data="contract="+((contrel.length)?contrel.val():"");
     var j=$('#orders-table-body tr').length;
     var k=0;
     for (i=0; i<j; i++) {
       if ($("#cb"+i).length){
         if (document.getElementById("cb"+i).checked) {
  	  	    data=data+'&name'+(k++)+'='+document.getElementById("cb"+i).name.substring(2, 100);
      	}
      }  
     }
   ec(obmtype, data, 'abj');
   }
  });
}

// отправляет команду создания нового заказа по отмеченным
// obm - OrderByMarket
function obmajNew(obmtype) {
  jConfirm('Вы действительно хотите '+((obmtype=='obm')?'создать новый заказ по отмеченным':'объединить отмеченные заказы')+'?', 'Ок','Отмена',function get(res){
   if (res){  
     var newinput;
   	 form=document.getElementById("neworderform");
   	 j=0;
     var contrel=$("#contract");
     data="contract="+((contrel.length)?contrel.val():"");
     var j=$('#orders-table-body tr').length;
     var k=0;
     for (i=0; i<j; i++) {
       if ($("#cb"+i).length){
         if (document.getElementById("cb"+i).checked) {
  	  	    data=data+'&name'+(k++)+'='+document.getElementById("cb"+i).name.substring(2, 100);
      	}
      }  
     }
   ec(obmtype, data, 'newbj');
   }
  });
}
 
 // инициирует создание нового заказа
 // cno - CreateNewOrder
 function cno() {
   jConfirm('Вы действительно хотите создать новый заказ?', 'Ок','Отмена',function get(res){
     if (res){  
       var contrel=$("#contract");
       ec('new_order', "contract="+((contrel.length)?contrel.val():""), 'abj');
     }
   });
 }
 
 function cnoNew() {
   jConfirm('Вы действительно хотите создать новый заказ?', 'Ок','Отмена',function get(res){
     if (res){  
       var contrel=$("#contract");
       ec('new_order', "contract="+((contrel.length)?contrel.val():""), 'newbj');
     }
   });
 }

function inputSetColor(inp,curwarecode,keycode){ //для закраска инпута ввода к-ва товаров
 if(keycode==27){
   $(inp).val($(inp).attr('oldvalue_'));
   $(inp).css('border','1px solid '+InputbackColor);
 }
 else{
  $('#wareqty'+curwarecode).val($(inp).val()); 
  if ($(inp).attr('oldvalue_') != $(inp).val()){ 
    $(inp).css('border','1px solid '+InputselectColor); 
  }
  else{
    $(inp).css('border','1px solid '+InputbackColor);
  }
 }
}

function elNew(inp) {
  
  if (!inp) {
  		jqswMessage('Не нашел строку ввода');
    return;
  }
  inp.value=parseFloat(inp.value);
  if (isNaN(inp.value)) {
    inp.value=0;
  }
  $(inp).attr('oldvalue_',inp.value);
  ec('el', "warecode="+inp.id+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'')+"&qty="+inp.value);
}

function elBonus(inp,ordercode) {
  if (!inp) {
  		jqswMessage('Не нашел строку ввода');
    return;
  }
  inp.value=parseFloat(inp.value);
  if (isNaN(inp.value)) {
    inp.value=0;
  }
  $(inp).attr('oldvalue_',inp.value);
  ec('el', "warecode="+inp.id+'&ordr='+ordercode+"&qty="+inp.value);
}


function alBonus(code, wareqty,ordercode) {  //функция для отправки бонусных товаров в заказ, переделанный аналог из поиска
  //self.onclick=null;
	 var shortwarecode=code.substring(0,code.indexOf('_'));
   if ($("li a.gifts.active").length){
     s='act=linefrombonustoorder';
     if (ordercode==''){
       if ($("#cur-bonus-order-code").length){
         ordercode=$("#cur-bonus-order-code").val();
       }
     }
	   s=s+'&ordr='+ordercode;
	  // val=self.nextSibling.elements[0].value;
     s=s+'&warecode='+shortwarecode+'&wareqty='+(isNaN(wareqty)?'1':wareqty);
     $.ajax({
       url: scriptname+"/abj",
       type: "post",
       data: s,
       dataType: "script"
    });
   }
   else{
     window.open(descrurl+'/loyalty?&contract='+$("#contract").val()+'&wcode='+shortwarecode);
   }
}

function dlBonus(warecode,code,ordercode) { //функция для удаления бонусных товаров из заказа, переделанный аналог из поиска
  if (document.getElementById("addlines")) {
    jConfirm('Вы действительно хотите удалить строку из заказа?', 'Да','Нет',function get(res){
      if (res){  
        addBlueBorderBonus(2,warecode);
        ec('dlbonus', 'line='+code+'&ordr='+ordercode);
      }
    }); 
    
    
    /*if (confirm('Вы действительно хотите удалить строку из заказа?')) {
      addBlueBorderBonus(2,warecode);
     	ec('dlbonus', 'line='+code+'&ordr='+ordercode);
   	}*/
 	}
}

function del_orderBonus(ordercode) {
  var elems=$("#order-for-gift-table-body input[type='checkbox']:checked");
  if (elems.length>0){
    jConfirm('Вы действительно хотите удалить отмеченные товары?', 'Да','Нет',function get(res){
      if (res){  
        var s='';
        var i=0; 
        elems.each(function(i,elem) { 
          if (i==0){
            s+=this.name.substring(2, 100);
          }
          else{
           s+=','+this.name.substring(2, 100); 
          }
          addBlueBorderBonus(2,$(this).attr('warecode_'));
          i++;
        }); 
        ec('dlbonusRedisign', 'line='+s+'&ordr='+ordercode);  
      }
    });
  }
  else{
    jqswMessageError('Не выбран ни один товар');
  }
  //console.log('line='+s+'&ordr='+document.getElementById("addlines").value);
}


function addBlueBorderBonus(mode,code,Qty)//фугнкция добавляет синюю полоску к товарам , которые есть в заказе
{
  if (mode==1){
    for(i=0;i<arrBonusInOrder.length;i++){
      $(''+'#square'+arrBonusInOrder[i]+'').css('border','2px solid #2c80c9');
      $(''+'#square'+arrBonusInOrder[i]+'').attr("title",$(''+'#square'+arrBonusInOrder[i]+'').attr("title")+" (есть в заказе)");
 
      $(''+'#bonuswareQv'+arrBonusInOrder[i]+'').val(''+arrBonusInOrderQv[i]+'');
      if ($("#wareinorder"+arrBonusInOrder[i]).length){
        document.getElementById("wareinorder"+arrBonusInOrder[i]).onclick=function(e){ setFuncOnBonusBtn(1,this); e.stopPropagation(); return false; }
        document.getElementById("bonuswareQv"+arrBonusInOrder[i]).onkeyup=function(e){if(e.keyCode==13){ setFuncOnBonusBtn(1,this);} }
      }  
    }
  }
  else if (mode==3){
         var shortwarecode=code.substring(0,code.indexOf('_'));
         var i=arrBonusInOrder.indexOf(''+shortwarecode+'');
         arrBonusInOrderQv[i]=''+Qty+''; 
         if ($('#square'+shortwarecode).length){
           if ($("#bonuswareQv"+shortwarecode).length){
             $("#bonuswareQv"+shortwarecode).val(''+Qty+'');
           }
         }
       }
       else{
        var i=arrBonusInOrder.indexOf(''+code+'');
        arrBonusInOrder.splice(arrBonusInOrder.indexOf(''+code+''), 1);
        arrBonusInOrderQv.splice(i, 1);
        if ($('#square'+code).length){
          $(''+'#square'+code+'').css('border','1px solid #d4d9e3');
          $(''+'#square'+code+'').attr("title",$(''+'#square'+code+'').attr("title").substr(0, $(''+'#square'+code+'').attr("title").indexOf("(")));
          $(''+'#bonuswareQv'+code+'').val('');
          if ($("#wareinorder"+code).length){
            document.getElementById("wareinorder"+code).onclick=function(e){setFuncOnBonusBtn(2,this); e.stopPropagation(); return false; }
            document.getElementById("bonuswareQv"+code).onkeyup=function(e){if(e.keyCode==13){ setFuncOnBonusBtn(2,this);}}
          }
        }
      }  
}

function setFuncOnBonusBtn(mode,el)//фугнкция устанавливает обработчик для кнопки Заказать
{
  //console.log(el);
  //console.log(mode);
  var warecode=$(el).attr("warecode_");
  var shortwarecode=warecode.substring(0,warecode.indexOf('_'));
  if (mode==1){
    if ($('#bonuswareQv'+shortwarecode).val()>0){
     elBonuslist($('#bonuswareQv'+shortwarecode).val(),$("#wareinorder"+shortwarecode).attr("ordercode_"),warecode);
     }
    else {jqswMessage('Введите количество товара');}
  }
  if (mode==2){
    if ($('#bonuswareQv'+shortwarecode).val()>0){
     alBonus(warecode, $('#bonuswareQv'+shortwarecode).val(),$("#wareinorder"+shortwarecode).attr("ordercode_"));
    }
    else {jqswMessage('Введите количество товара');}
 
  }  
}   


function elBonuslist(val_,ordercode,warecode) { //вызывается для измения кол-ва бонус. товаров, выделенных в списке
  var inp=$("#"+warecode);
  inp.attr('oldvalue_',val_);
  ec('el', "warecode="+warecode+'&ordr='+ordercode+"&qty="+val_);
}

function checkwareqty(id, elem,IsFromWareSearch,ordercode) {
  var qty=0.00;
  if (elem.tagName=='SPAN'){
    id=elem.dataset.warecode;
    qty=elem.dataset.qty;
  }
  if (elem.tagName=='A'){
    if ($(elem).hasClass('check-ware-qv')){
      id=elem.dataset.warecode;
      qty=$(elem).prev().find("input").val();
    }
    else{
      qty=$(elem).parent().next().find("input").val();
    }
  }
  if (elem.tagName=='BUTTON'){
   if ($(elem).hasClass('check-ware-qv')){
     id=elem.dataset.warecode;  
     qty=$(elem).prev().find("input").val();
   }    
   else{
     qty=$("#requestqty").val();
   }
  }
  if (isNaN(qty)) {
  	 jqswMessageError('Значение количества должно быть числовым!');
  	 return false;
  }
  if (!(parseFloat(qty)>0)) {
  	 jqswMessageError('Значение количества должно быть больше нуля!');
  	 return false;
  }
  var contrel=$("#contract");
  var data="contract="+((contrel.length)?contrel.val():"");
  data+="&isfromwaresearch="+IsFromWareSearch;
  data+="&warecode="+id+'&wareqty='+qty;
  if (ordercode===undefined){
    contrel=$("#addlines");
    data+=((contrel.length)?"&ordr="+contrel.val()+"&bonus=false&id="+id:"&bonus=false&id="+id);
  }
  else{
    if (ordercode=="-100")
      data+=((contrel.length)?"&ordr=&bonus=false&id="+id:"&bonus=false&id="+id);
    else if ($("#cur_order_code").length){
           data+=((contrel.length)?"&ordr="+ordercode+"&bonus=false&id="+id:"&bonus=false&id="+id);
         }
         else{
           data+=((contrel.length)?"&ordr="+ordercode+"&bonus=true&id="+id:"&bonus=true&id="+id);
         }
  }
  ec('getqtybyanalogsandstorages', data, fnIfStr(flNewModeCGI,'newbj','abj'));
  return false;
}

function cwq(inp) {
	 if (inp.value=='') {inp.value='0';}
	 inp.style.border='1px solid '+((inp.value=='0')?'#d4d9e3':InputbackColor);
	 var val=parseFloat(inp.value);
	 if (isNaN(val)) {
	 	 jqswMessageError('Неверно введено количество');
	 } else {
	 	 calctotalqty();
	 }
}


//DrawWareWithAnalogTableHeader
function dwwath(Unit, RequestQty, WareCode,ordercode) {
 var s1,s2; 
 if (ordercode=='-100'){
    var s='<div><span class="form-checkwareqty-span" >Запрошено кол-во:  </span><input type=text id="requestqty"  maxlength="5" size="5" class="svkinput" value='+RequestQty+'>'+
         '<button class="btn blue-btn" style="margin-left: 15px;" onclick="checkwareqty('+WareCode+', this,\'false\','+ordercode+');" title="Проверить наличие товара">Проверить</button><span class="form-checkwareqty-span" style="margin-left: 20px;">Набрано для заказа:  </span><span id=toorderspan>'+ordercode+'</span></div>';
  } 
  else{
    var s='<form onSubmit="return false;"><span class="form-checkwareqty-span" >Запрошено кол-во: </span><input type=text maxlength="5" id="requestqty" size="5" class="svkinput" value='+RequestQty+'>'+
    '<button class="btn blue-btn" style="margin-left: 15px;" onclick="checkwareqty('+WareCode+', this,\'false\','+ordercode+');" title="Проверить наличие товара">Проверить</button><span class="form-checkwareqty-span" style="margin-left: 20px;"> Набрано для заказа: </span><span id="toorderspan">0</span></form>';
  }  
  s=s+'<form id="of">';
  s=s+'<div class="contracts-body" id="check-ware-body" ><table id="check-ware-table-header" class="table table-header"><thead><tr>';
  s=s+'<th class="col-discription" >Наименование</th>'; 
  if (Unit !=BallsName){
    if (qvColPrice>0){
      for (var i = 0; i<qvColPrice-1 ; i++){  //!!!!!!!
        s=s+"<th class='col center' style='width: 60px;' title='"+arColHeadersTitle[i]+"'>"+arColHeaders[i]+", "+Unit+"</th>";
      }
    }
    else{
      s=s+"<th class='col center' style='width: 60px;' title='Розничная цена'>Розн.,"+Unit+"</th>";
      s=s+"<th class='col center' style='width: 60px;' title='Входная цена'>Вход.,"+Unit+"</th>";
    }
  }
  s=s+"<th class='col center' style='width: 60px;'>Ед.изм.</th>";
  //s=s+"<th class='col center'></th>";
  var arg=4;// с какого аргумента начинаются названия складов
  for (var i=0; i<Storages.length ;i++) {
    //s=s+"<th class='col center' "+((Storages[i][0])?" style='text-align: left;' colspan=2":"")+" title='"+dwwath.arguments[arg+i*2]+"'>"+dwwath.arguments[arg+i*2+1]+"</th>";
     //<span style='width: 75px;word-wrap: break-word; display: block;'></span>
     if (Storages.length<3){
       if (i==Storages.length-1){
         if (Storages.length==1){
           s=s+"<th class='col center' "+((Storages[i][0])?" style='text-align: center;width: 60px;' colspan=1":"style='width: 60px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+dwwath.arguments[arg+i*2+1]+"</th>";
           s=s+"<th class='col center' style='width: 70px;'></th>";
          } 
         else{
           s=s+"<th class='col center' style='width: 70px;'></th>";
           s1=dwwath.arguments[arg+i*2+1];
           s2=s1.substr(s1,s1.indexOf('после'));
           s1=s1.substr(s1.indexOf('после')+5,s1.length);
           s1=s2+'<span>после</span>'+s1
          // console.log(s1);
           s=s+"<th class='col center' "+((Storages[i][0])?" style='text-align: center;width: 85px;' colspan=1":"style='width: 85px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+s1+"</th>";
         }
        }
       else
          s=s+"<th class='col center'"+((Storages[i][0])?" style='text-align: center;width: 60px;' colspan=1":"style='width: 60px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+dwwath.arguments[arg+i*2+1]+"</th>";
     }
     if (Storages.length>=3){
      if (i==1){
        s=s+"<th class='col center' style='width: 70px;'></th>";
        s1=dwwath.arguments[arg+i*2+1];
        s2=s1.substr(s1,s1.indexOf('после'));
        s1=s1.substr(s1.indexOf('после')+5,s1.length);
        s1=s2+'<span>после</span>'+s1
        //console.log('2='+s1);
        s=s+"<th class='col center' "+((Storages[i][0])?" style='width: 85px; text-align: center;' colspan=1":"style='width: 85px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+s1+"</th>";
       }
      else
         if (i==0){
           s=s+"<th class='col center' "+((Storages[i][0])?" style='width: 60px; text-align: center;' colspan=1":"style='width: 60px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+dwwath.arguments[arg+i*2+1]+"</th>";
         }
         else{
           s1=dwwath.arguments[arg+i*2+1];
           s2=s1.substr(s1,s1.indexOf('после'));
           s1=s1.substr(s1.indexOf('после')+5,s1.length);
           s1=s2+'<span>после</span>'+s1
           //console.log('3='+s1);
           s=s+"<th class='col center' "+((Storages[i][0])?" style='width: 85px; text-align: center;' colspan=1":"style='width: 85px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+s1+"</th>";
         }
     }
  }
  s=s+"<th class='col center' style='width: 16px;'></th>";
  s=s+"</tr></thead>";
  s=s+"<tbody>";
  s=s+'</table>';
  return s;
}


//DrawWareWithAnalogTableHeader
function dwwathWareSearch(Unit, RequestQty, WareCode,ordercode) {
 var s1,s2; 
 if (ordercode=='-100'){
    var s='<div><span class="form-checkwareqty-span" >Запрошено кол-во:  </span><input type=text id="requestqty"  maxlength="5" size="5" class="svkinput" storage="'+Storages[0][1]+'" ware-code="'+WareCode+'" value='+RequestQty+'>'+
         '<button class="btn blue-btn" style="margin-left: 15px;" onclick="checkwareqty('+WareCode+', this,\'true\','+ordercode+');" title="Проверить наличие товара">Проверить</button><span class="form-checkwareqty-span hide" style="margin-left: 20px;">Набрано для заказа:  </span><span class="hide" id="toorderspan">'+ordercode+'</span></div>';
  } 
  else{
    var s='<form onSubmit="return false;"><span class="form-checkwareqty-span" >Запрошено кол-во: </span><input maxlength="5" type=text id="requestqty" size="5" class="svkinput" storage="'+Storages[0][1]+'" ware-code="'+WareCode+'" value='+RequestQty+'>'+
    '<button class="btn blue-btn" style="margin-left: 15px;" onclick="checkwareqty('+WareCode+', this,\'true\','+ordercode+');" title="Проверить наличие товара">Проверить</button><span class="form-checkwareqty-span hide" style="margin-left: 20px;"> Набрано для заказа: </span><span class="hide" id="toorderspan">0</span></form>';
  }  
  s=s+'<form id="of">';
  s=s+'<div class="contracts-body" id="check-ware-body" ><table id="check-ware-table-header" class="table table-header"><thead><tr>';
  s=s+'<th class="col-discription" >Наименование</th>'; 
  /*if (Unit !=BallsName){
    if (qvColPrice>0){
      for (var i = 0; i<qvColPrice-1 ; i++){  //Чтоб не было розничной
        s=s+"<th class='col center' style='width: 60px;' title='"+arColHeadersTitle[i]+"'>"+arColHeaders[i]+", "+Unit+"</th>";
      }
    }
    else{
      s=s+"<th class='col center' style='width: 60px;' title='Розничная цена'>Розн.,"+Unit+"</th>";
      s=s+"<th class='col center' style='width: 60px;' title='Входная цена'>Вход.,"+Unit+"</th>";
    }
  }*/
  //s=s+"<th class='col center' style='width: 60px;'>Ед.изм.</th>";
  var arg=4;// с какого аргумента начинаются названия складов
  var i=0; 
  s1='Доступен, '+'\n';
  s2=dwwathWareSearch.arguments[arg+i*2];//берем подсказку, а не сам склад
  //s1=s1+s2.substr(s2.indexOf(',')+1,s2.length);
  s1=s1+s2;
  s=s+"<th class='col center' title='' style='width: 200px; white-space: pre;'>"+s1+"</th>";
  s=s+"<th class='col center' style='width: 60px;'>Кол-во</th>";

  /*for (var i=0; i<Storages.length ;i++) {
     if (Storages.length<3){
       if (i==Storages.length-1){
         if (Storages.length==1){
           s=s+"<th class='col center' "+((Storages[i][0])?" style='text-align: center;width: 60px;' colspan=1":"style='width: 60px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+dwwath.arguments[arg+i*2+1]+"</th>";
           s=s+"<th class='col center' style='width: 70px;'></th>";
          } 
         else{
           s=s+"<th class='col center' style='width: 70px;'></th>";
           s1=dwwath.arguments[arg+i*2+1];
           s2=s1.substr(s1,s1.indexOf('после'));
           s1=s1.substr(s1.indexOf('после')+5,s1.length);
           s1=s2+'<span>после</span>'+s1
          // console.log(s1);
           s=s+"<th class='col center' "+((Storages[i][0])?" style='text-align: center;width: 85px;' colspan=1":"style='width: 85px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+s1+"</th>";
         }
        }
       else
          s=s+"<th class='col center'"+((Storages[i][0])?" style='text-align: center;width: 60px;' colspan=1":"style='width: 60px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+dwwath.arguments[arg+i*2+1]+"</th>";
     }
     if (Storages.length>=3){
      if (i==1){
        s=s+"<th class='col center' style='width: 70px;'></th>";
        s1=dwwath.arguments[arg+i*2+1];
        s2=s1.substr(s1,s1.indexOf('после'));
        s1=s1.substr(s1.indexOf('после')+5,s1.length);
        s1=s2+'<span>после</span>'+s1
        //console.log('2='+s1);
        s=s+"<th class='col center' "+((Storages[i][0])?" style='width: 85px; text-align: center;' colspan=1":"style='width: 85px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+s1+"</th>";
       }
      else
         if (i==0){
           s=s+"<th class='col center' "+((Storages[i][0])?" style='width: 60px; text-align: center;' colspan=1":"style='width: 60px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+dwwath.arguments[arg+i*2+1]+"</th>";
         }
         else{
           s1=dwwath.arguments[arg+i*2+1];
           s2=s1.substr(s1,s1.indexOf('после'));
           s1=s1.substr(s1.indexOf('после')+5,s1.length);
           s1=s2+'<span>после</span>'+s1
           //console.log('3='+s1);
           s=s+"<th class='col center' "+((Storages[i][0])?" style='width: 85px; text-align: center;' colspan=1":"style='width: 85px;'")+" title='"+dwwath.arguments[arg+i*2]+"'>"+s1+"</th>";
         }
     }
  }*/
  s=s+"<th class='col center' style='width: 16px;'></th>";
  s=s+"</tr></thead>";
  s=s+"<tbody>";
  s=s+'</table>';
  return s;
}

//DrawWareWithAnalogTableBody
function dwwatb(Warecode, FontColor, /*KindOfAnalog,*/ Brand, Warename, Sale, NonReturned, CutPrice,ActionCode,ActionImagePath,ActionTitle,ActionText,CutPriceReason, PriceR, PriceO, Unit,CurrencyName,subrow,MainRowCode) {
  var s1='';
  var s2='';
  if (subrow==0){
    s1=s1+'<tr class="table-row" id="product-id-'+Warecode+'" style="background-color: #ffffff;">';
  }   
  else{
    s1=s1+'<tr class="sub-table-row" data="product-id-'+MainRowCode+'">'; 
  }
  s1=s1+'<td class="col-discription" style="border-right: 1px solid #d4d9e3; text-align: left;">';
  altrow=!altrow;
//  s1=s1+"<span title='"+Brand+", "+((KindOfAnalog==0)?"аналог найден через совпадение оригинальных номеров":"аналог найден через прямое указание артикула")+"' style='color: "+FontColor+";'>"+Warename+"</span>"+((Sale)?'&nbsp;<img align=top title=\'Распродажа\' src=\'/images/orders/  sal.png\'>':'')+'</nobr></td>'; //наименование товара
  if (ActionImagePath==""){
    //s2=descrimageurl+'/images/action16.png';
    s2='';
  }
  else{
    s2=ActionImagePath;
  }
  s1=s1 +"<span title='"+Brand+"' style='color: "+FontColor+"; float: left;'>"+Warename+"</span>"
       +((Sale)?'&nbsp;<a class=\'abANewAction\' title=\'Распродажа\' style=\'background-image: url('+descrimageurl+'/images/sal.png);\'></a>':'')
//       +((CutPrice)?'&nbsp;<a class=\'abANewAction\' title=\''+((CutPriceReason)?CutPriceReason:'Уцененный товар')+'\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
       +((CutPrice)?'&nbsp;<a class=\'abANewAction\' title=\'Уцененный товар\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
       +((NonReturned)?'&nbsp;<img align=top title=\'Возврату не подлежит\' src=\''+descrimageurl+'/images/denyback.png\'>':'');
        if (!IsUberClient){
          ((ActionCode>0)?'&nbsp;<div style=\"float: left;\"><a target=\"_blank\" class=\"abQtyByAnalogsAndStorages\" title=\''+ActionTitle+'\n'+ActionText+'\' style=\'background-image: url('+s2+');\' href=\"'+scriptname+'/info?actioncode='+ActionCode+'\"></a></div>':'')
        } 
        +'</td>'; //наименование товара
   if (CurrencyName !=BallsName){
     if (qvColPrice>0){
       for (var i = 0; i<qvColPrice-1 ; i++){//////!!!
         s1=s1+'<td class="col with-border" style="width: 60px;">'+PriceR[i]+'</td>';     
       } 
     }
     else{
      s1=s1+'<td class="col with-border" style="width: 60px;">'+PriceR+'</td>';          // цена
      s1=s1+'<td class="col with-border" style="width: 60px;">'+PriceO+'</td>';          // цена
     } 
   }
  s1=s1+'<td class="col with-border" style="width: 60px;">'+Unit+'</td>';            // ед.изм.
  var arg=17;
  var val,temp;
  var tovalue=dwwatb.arguments[arg++];
  for (var i=0;i<Storages.length;i++) {
    val=dwwatb.arguments[arg++];
    temp=val.substr(val.indexOf('>')+1,100);
    temp=temp.substr(0,temp.indexOf('<'));
    if (val.indexOf('есть')>0){
      val=WareRequestQty;  
    }
    if ((!isNaN(temp)) && (i>0) && (temp!='0')){
      s1=s1+"<td class='col with-border' style='width: 85px;' title='Кол-во товара на складе "+Storages[i][2]+"'>"+val+"</td>";
    }
    else{
      if (i>0){
        s1=s1+"<td class='col with-border' style='width: 85px;' title='Кол-во товара на складе "+Storages[i][2]+"'>"+val+"</td>";
      }
      else{
        s1=s1+"<td class='col with-border' style='width: 60px;' title='Кол-во товара на складе "+Storages[i][2]+"'>"+val+"</td>";
      }
    }
    if (Storages[i][0]) { // если склад доступен для резервирования, то добавляем строку ввода
      s2=Storages[i][2];
      s2=(((ii=s2.indexOf(','))==-1)?s2:s2.substring(0,ii));
      s1=s1+'<td class="col with-border" style="width: 70px;"><input '+(( (!dwwatb.arguments[arg]) || (dwwatb.arguments[arg]=='0'))?'style="border: 1px solid #d4d9e3;"':'style="border: 1px solid'+InputbackColor+';"')
           +' id="'+Warecode+'_'+Storages[i][1]+'" name=wareqty size=3 maxlength=5 title="Введите количество товара для заказа со склада '+s2
           +'" value='+dwwatb.arguments[arg]+' onChange="cwq(this);"></td>';
//      s1=s1+'<td><input '+((tovalue)?'style="background: '+InputbackColor+';"':'')+' id="'+Warecode+'_'+Storages[i][1]+'" name=wareqty size=3 maxlength=5 title="Введите количество товара для заказа со склада '+Storages[i][2]+'" value='+tovalue+' onChange="cwq(this);"></td>';
      tovalue=0;
      arg++;
    }
  }
  s1=s1+'</tr>';
  return s1;
}

//DrawWareWithAnalogTableBody
function dwwatbWareSearch(Warecode, FontColor, /*KindOfAnalog,*/ Brand, Warename, Sale, NonReturned, CutPrice,ActionCode,ActionImagePath,ActionTitle,ActionText,CutPriceReason, PriceR, PriceO, Unit,CurrencyName,subrow,MainRowCode) {
  var s1='';
  var s2='';
  if (subrow==0){
    s1=s1+'<tr class="table-row" id="product-id-'+Warecode+'" style="background-color: #ffffff;">';
  }   
  else{
    s1=s1+'<tr class="sub-table-row" data="product-id-'+MainRowCode+'">'; 
  }
  s1=s1+'<td class="col-discription" style="border-right: 1px solid #d4d9e3; text-align: left;">';
  altrow=!altrow;
//  s1=s1+"<span title='"+Brand+", "+((KindOfAnalog==0)?"аналог найден через совпадение оригинальных номеров":"аналог найден через прямое указание артикула")+"' style='color: "+FontColor+";'>"+Warename+"</span>"+((Sale)?'&nbsp;<img align=top title=\'Распродажа\' src=\'/images/orders/  sal.png\'>':'')+'</nobr></td>'; //наименование товара
  if (ActionImagePath==""){
    //s2=descrimageurl+'/images/action16.png';
    s2='';
  }
  else{
    s2=ActionImagePath;
  }
  s1=s1 +"<span title='"+Brand+"' style='color: "+FontColor+"; float: left;'>"+Warename+"</span>"
       +((Sale)?'&nbsp;<a class=\'abANewAction\' title=\'Распродажа\' style=\'background-image: url('+descrimageurl+'/images/sal.png);\'></a>':'')
//       +((CutPrice)?'&nbsp;<a class=\'abANewAction\' title=\''+((CutPriceReason)?CutPriceReason:'Уцененный товар')+'\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
       +((CutPrice)?'&nbsp;<a class=\'abANewAction\' title=\'Уцененный товар\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
       +((NonReturned)?'&nbsp;<img align=top title=\'Возврату не подлежит\' src=\''+descrimageurl+'/images/denyback.png\'>':'');
        if (!IsUberClient){
          ((ActionCode>0)?'&nbsp;<div style=\"float: left;\"><a target=\"_blank\" class=\"abQtyByAnalogsAndStorages\" title=\''+ActionTitle+'\n'+ActionText+'\' style=\'background-image: url('+s2+');\' href=\"'+scriptname+'/info?actioncode='+ActionCode+'\"></a></div>':'')
        } 
        +'</td>'; //наименование товара
   if (CurrencyName !=BallsName){
     /*if (qvColPrice>0){
       for (var i = 0; i<qvColPrice-1 ; i++){//////Чтобы не было розничной
         s1=s1+'<td class="col with-border" style="width: 60px;">'+PriceR[i]+'</td>';     
       } 
     }
     else{
      s1=s1+'<td class="col with-border" style="width: 60px;">'+PriceR+'</td>';          // цена
      s1=s1+'<td class="col with-border" style="width: 60px;">'+PriceO+'</td>';          // цена
     }*/ 
   }
  //s1=s1+'<td class="col with-border" style="width: 60px;">'+Unit+'</td>';            // ед.изм.
  var arg=17;
  var val,temp,s3,s2;
  var isnull=false;
  var tovalue=dwwatbWareSearch.arguments[arg++];
  for (var i=0;i<Storages.length;i++) {
    val=dwwatbWareSearch.arguments[arg++];
    temp=val.substr(val.indexOf('>')+1,100);
    temp=temp.substr(0,temp.indexOf('<'));
    if (val.indexOf('есть')>0){
      val=WareRequestQty;  
    }
    if (val.indexOf('red')>0){
      temp=val.substr(val.indexOf('>')+1,val.length);
      temp=temp.substr(0,temp.indexOf('<'));
    }    
    if (i==0){
      if (temp !='0'){
        s3=Storages[i][3];   
        s2=s3.substr(0,s3.indexOf(','));
        s1=s1+"<td class='col with-border' style='width: 200px; text-align: left;' title=''><b>"+s2+"</b></td>";
        s1=s1+"<td class='col with-border' style='width: 60px;' title=''>"+val+"</td>";
        s1=s1+'</tr>';
      }
      else{
        //s1=s1+"<td class='col with-border' colspan='2'></td>";
        //s1=s1+'</tr>';
        isnull=true;
      }
    }
    else{
     if (temp !='0'){
       s3=Storages[i][3];   
       s2=s3.substr(s3,s3.indexOf('после'));
       s3=s3.substr(s3.indexOf('после')+5,s3.length);
       s3=s2+'<span>после</span>'+s3;
       if (!isnull){  //если на основном складе не 0
         s1=s1+'<tr class="sub-table-row" id="" >';
         s1=s1+"<td class='col with-border' colspan='1'></td>"; 
       }
       s1=s1+"<td class='col with-border' style='width: 200px; text-align: left;' title=''><b>"+s3+"</b></td>";
       s1=s1+"<td class='col with-border' style='width: 60px;' title=''>"+val+"</td>";
       s1=s1+'</tr>';
       isnull=false;
     }
    }
    if (Storages[i][0]) { // если склад доступен для резервирования, то добавляем строку ввода
     arg++;
    }
  }

  return s1;
}


function calctotalqty() {
	 var form=document.getElementById("of");
	 var val=0;
	 if (!form) {
	 	 jqswMessageError('Не найдены данные для рассчета');
	 	 return false;
	 }
	 var total=0;
  for (var i=0; i<form.elements.length; i++){
    val=parseFloat(form.elements[i].value);
    total=total+(isNaN(val)?'0':val);
  }
  document.getElementById("toorderspan").innerHTML=total;
}

function linestoorder(fromwaresearch) {
  form=document.getElementById("of");
  var contrel=$("#contract");
  s="contract="+((contrel.length)?contrel.val():"");
  if ( $("#cur-bonus-order-code").length){
    s=s+'&ordr='+$("#cur-bonus-order-code").val();
    if (fromwaresearch=='true'){
       s=s+'&'+$("#requestqty").attr("ware-code")+'_'+$("#requestqty").attr("storage")+'='+$("#requestqty").val();
    }
    else{
      for (var i=0; i<form.elements.length; i++){
        val=parseFloat(form.elements[i].value);
        s=s+'&'+form.elements[i].id+'='+(isNaN(val)?'0':val);
      }
    }  
    ec('linestoorder', s, fnIfStr(flNewModeCGI,'newbj','abj'));
  }
  else{
    if ($('#addlines', top.document).length) {
      if ($('#addlines', top.document).attr('value')) {
        s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
        if (fromwaresearch=='true'){
          s=s+'&'+$("#requestqty").attr("ware-code")+'_'+$("#requestqty").attr("storage")+'='+$("#requestqty").val();
        }
        else{
          for (var i=0; i<form.elements.length; i++){
            val=parseFloat(form.elements[i].value);
            s=s+'&'+form.elements[i].id+'='+(isNaN(val)?'0':val);
          }
        }
        ec('linestoorder', s,fnIfStr(flNewModeCGI,'newbj','abj'));
      }
      else{
        s='act=getlistopenordersformcheckqty'+"&contract="+((contrel.length)?contrel.val():"");
        //s='act=linefromsearchtoorder'; 
        s=s+'&ordr='+((document.getElementById("addlines"))?document.getElementById("addlines").value:'');
        if (fromwaresearch=='true'){
           s=s+'&'+$("#requestqty").attr("ware-code")+'_'+$("#requestqty").attr("storage")+'='+$("#requestqty").val();
        }
        else{
          for (var i=0; i<form.elements.length; i++){
            val=parseFloat(form.elements[i].value);
            s=s+'&'+form.elements[i].id+'='+(isNaN(val)?'0':val);
          }
        }

        // console.log(s);
         $.ajax({
           url: scriptname+"/newbj",
           type: "post",
           data: s,
           dataType: "script"
        });
        $("#wareanalogdialog").dialog("close");
      }
    }  
  }  
}

//alsto - AddLinesToOrder - Добавляет строки в заказ "по новому"
function alsto(CurLine, CurWareCode, Analogue, Brand, WareName, Qty, Unit, Price, Sum, Balls) {

var tbl=document.getElementById('order-table-body');
if (tbl.rows.length==0){
  $("#order-body div.table-header-wrap").css("display","block"); 
  $("#order-body div.order-table-body-wrap").css("display","block");
  $("#order div.no-wares-div").css("display","none");
}

if (tbl) {
  var newrow = tbl.insertRow(-1);
  newrow.id='line'+CurLine;

  var newcell=newrow.insertCell(-1);   //Наименование
  $(newcell).toggleClass('col-checkbox with-border');
  newcell.innerHTML='<input type="checkbox" class="search-checkbox" name="cb'+CurLine+'" id="cb'+CurLine+'" >'+
                    '<label for="cb'+CurLine+'"></label>';
  
  newcell=newrow.insertCell(-1);
  $(newcell).toggleClass('col-discription');
  newcell.id='td'+CurWareCode;
  s1='<a href="'+scriptname+'/wareinfo?warecode='+CurWareCode+'&model=&node=&eng=&filter=&btnout=true&bonus='+
            'false"  style="color: #000;" target="_blank" warecode="'+CurWareCode+'" title="'+Brand+'" onclick="return viewWareSearchDialog(this);">';
  s1+='<span class="title">'+WareName+'</span>';
  s1+='</a>';    
  newcell.innerHTML=s1;  
  
  newcell=newrow.insertCell(-1);
  $(newcell).toggleClass('col to-order with-border');
  s1='<a href="#" onclick="checkwareqty('+CurWareCode+', this);" class="btn" title="Проверить наличие товара">';
  s1+='<span >Проверить</span>';
  s1+='</a>'; 
  newcell.innerHTML=s1;
 
  if (Storages.length>1) {
    newcell=newrow.insertCell(-1);
    newcell.innerHTML = Qty;   // кол-во товара
  }
  
  var arg=10;
  for (var i=0;i<Storages.length;i++) {
    newcell=newrow.insertCell(-1);
    $(newcell).toggleClass('col with-border');
    if (Storages[i][0]) {
      new_input = document.createElement("input");
      new_input.setAttribute('type', 'text');
      new_input.setAttribute('id', CurWareCode+'_'+Storages[i][1]);
      new_input.setAttribute('size', '3');
      new_input.setAttribute('maxlength', '5');
      new_input.setAttribute('oldvalue_', Qty);
      new_input.setAttribute('autocomplete','off');
      new_input.setAttribute('title', 'Текущее количество заказа со склада '+Storages[i][3]);
      //new_input.setAttribute('value', alsto.arguments[arg++]);
      new_input.setAttribute('value', ''+Qty+'');
      new_input.style.border=((parseFloat(new_input.value))?'1px solid '+InputbackColor:'1px solid #d4d9e3;');
      new_input.onchange=function(e){
        if (this.value>0) { elNew(this);}
        else { jqswMessageError('Количество не может быть отрицательным');}
      };
      new_input.onkeyup=function(e){inputSetColor(this,CurWareCode,e.keyCode);};
// строка снизу - для варианта с отображением количеств на складах
//        newcell.firstChild.rows[0].cells[1].appendChild(new_input);
//а эта вместо нее
      newcell.appendChild(new_input);
    }
    
    newcell=newrow.insertCell(-1); //ед.изм
    $(newcell).toggleClass('col with-border');
    s1='<span class="quantity-type">';
    s1+=Unit;
    s1+='</span>'; 
    newcell.innerHTML =s1;   
   
    newcell=newrow.insertCell(-1); //цена
    $(newcell).toggleClass('col with-border');
    s1='<span class="price">';
    s1+=Price;
    s1+='</span>'; 
    newcell.innerHTML =s1;

    newcell=newrow.insertCell(-1); //сумма
    $(newcell).toggleClass('col cost with-border');
    newcell.id = "lnsum"+CurLine; 
    s1='<span class="sumsinrow">';
    s1+=Sum;
    s1+='</span>'; 
    newcell.innerHTML =s1;

    
    if (allowbonuses) {
      if ( !IsUberClient){
        newcell=newrow.insertCell(-1); //баллы
        newcell.innerHTML = Balls;
        newcell.id = "lnsumballs"+CurLine;  //id ячейки суммы
        $(newcell).toggleClass('col cost with-border ballsinrow');
      }
    }
    
  }
 }

}

//alsto - AddLinesToOrder - Добавляет строки в заказ "по новому"
function alstoBonus(CurLine, CurWareCode, Analogue, Brand, WareName, Qty, Unit, Price, Sum, Balls,BallsName,OrderCode) {
  var tbl=document.getElementById('order-for-gift-table-body');
  if (tbl.rows.length==0){
    $("#order-for-gift-body div.table-header-wrap").css("display","block"); 
    $("#order-for-gift-body div.order-table-body-wrap").css("display","block");
    $("#order-for-gift div.no-wares-div").css("display","none");
  }

  if (tbl) {
      var newrow = tbl.insertRow(-1);
      newrow.id='line'+CurLine;
      arrBonusInOrder[arrBonusInOrder.length]=''+CurWareCode+'';
      arrBonusInOrderQv[arrBonusInOrderQv.length]=''+ Qty+''; 
      var newcell=newrow.insertCell(-1);   //Наименование
      $(newcell).toggleClass('col-checkbox with-border');
      newcell.innerHTML='<input warecode_="'+CurWareCode+'" type="checkbox" class="search-checkbox" name="cb'+CurLine+'" id="cb'+CurLine+'" >'+
                        '<label for="cb'+CurLine+'"></label>';
      
      newcell=newrow.insertCell(-1);
      $(newcell).toggleClass('col-discription');
      s1='<a href="'+scriptname+'/wareinfo?warecode='+CurWareCode+'&model=&node=&eng=&filter=&btnout=false&price='+Price+'&bonus='+
                'true"  style="color: #000;" target="_blank" warecode="'+CurWareCode+'" title="'+Brand+'" onclick="return viewWareSearchDialog(this);">';
      s1+='<span class="title">'+WareName+'</span>';
      s1+='</a>';    
      newcell.innerHTML=s1;  
      
      newcell=newrow.insertCell(-1);
      $(newcell).toggleClass('col to-order with-border');
      s1='<a href="#" onclick="checkwareqty('+CurWareCode+', this,'+OrderCode+');" class="btn" title="Проверить наличие товара">';
      s1+='<span >Проверить</span>';
      s1+='</a>'; 
      newcell.innerHTML=s1;
      
      newcell=newrow.insertCell(-1);
      $(newcell).toggleClass('col with-border');
      var new_input = document.createElement("input");
      new_input.setAttribute('type', 'text');
      new_input.setAttribute('id', CurWareCode+'_'+$("#cur-code-storage").val());
      new_input.setAttribute('size', '3');
      new_input.setAttribute('maxlength', '5');
      //new_input.setAttribute('oldvalue_', Qty);
      new_input.setAttribute('title', 'Текущее количество заказа');
      new_input.setAttribute('value', ''+Qty+'');
      new_input.setAttribute('autocomplete','off');
      new_input.style.border=((parseFloat(new_input.value))?'1px solid '+InputbackColor:'1px solid #d4d9e3;');
      new_input.onchange=function(e){
        if (this.value>0) { elBonus(this,OrderCode);}
        else { jqswMessageError('Количество не может быть отрицательным');}

        
      };
      //new_input.onkeyup=function(e){inputSetColor(this,CurWareCode,e.keyCode);};
      // строка снизу - для варианта с отображением количеств на складах
      //        newcell.firstChild.rows[0].cells[1].appendChild(new_input);
      newcell.appendChild(new_input);
     
      /*if (Storages.length>1) {
        newcell=newrow.insertCell(-1);
        newcell.innerHTML = Qty;   // кол-во товара
      }
      
      var arg=10;
      for (var i=0;i<Storages.length;i++) {
        newcell=newrow.insertCell(-1);
        $(newcell).toggleClass('col with-border');
        if (Storages[i][0]) {
          new_input = document.createElement("input");
          new_input.setAttribute('type', 'text');
          new_input.setAttribute('id', CurWareCode+'_'+Storages[i][1]);
          new_input.setAttribute('size', '3');
          new_input.setAttribute('maxlength', '5');
          new_input.setAttribute('oldvalue_', Qty);
          new_input.setAttribute('title', 'Текущее количество заказа со склада '+Storages[i][3]);
          //new_input.setAttribute('value', alsto.arguments[arg++]);
          new_input.setAttribute('value', '3');
          new_input.style.border=((parseFloat(new_input.value))?'1px solid '+InputbackColor:'1px solid #d4d9e3;');
          new_input.onchange=function(e){elNew(this);};
          new_input.onkeyup=function(e){inputSetColor(this,CurWareCode,e.keyCode);};
    // строка снизу - для варианта с отображением количеств на складах
    //        newcell.firstChild.rows[0].cells[1].appendChild(new_input);
    //а эта вместо нее
          newcell.appendChild(new_input);
        }*/
        
        newcell=newrow.insertCell(-1); //ед.изм
        $(newcell).toggleClass('col with-border');
        s1='<span class="quantity-type">';
        s1+=Unit;
        s1+='</span>'; 
        newcell.innerHTML =s1;   
       
        newcell=newrow.insertCell(-1); //цена
        $(newcell).toggleClass('col with-border');
        s1='<span class="price">';
        s1+=Price;
        s1+='</span>'; 
        newcell.innerHTML =s1;
    
        newcell=newrow.insertCell(-1); //сумма
        $(newcell).toggleClass('col cost with-border');
        newcell.id = "lnsum"+CurLine; 
        s1='<span class="sumsinrow">';
        s1+=Sum;
        s1+='</span>'; 
        newcell.innerHTML =s1;
    
        
        /*if (allowbonuses) {
          newcell=newrow.insertCell(-1); //баллы
          newcell.innerHTML = Balls;
          newcell.id = "lnsumballs"+CurLine;  //id ячейки суммы
          $(newcell).toggleClass('col cost with-border ballsinrow');
        }*/
   $(tbl).prepend(newrow);
  }
}



// EditLineInOrder - актуализирует строку таблицы заказа
function elio(CurLine, Qty, Unit, Price, Sum, Balls) {
	 var line=document.getElementById('line'+CurLine);
	 if (!line) {
	 	 jqswMessageError('Не найдена строка для редактирования!');
	 	 return false;
	 }
//	 line.cells[0].childNodes[1].childNodes[1].value=Qty;
  var shift=$(line.cells[3]).find('input').length;
  //console.log($(line).find(".sumsinrow"));
  if ( $(line.cells[3]).find('input').length) {
    $(line.cells[3]).find('input').attr('value',Qty);
    $(line.cells[3]).find('input').attr('oldvalue_',Qty);
    $(line.cells[3]).find('input').val(Qty);   
  } 
  
  if (!shift) {
    line.cells[3].innerHTML=Qty;
  }
  
  $(line).find(".quantity-type").html(Unit);
  $(line).find(".price").html(Price);
  $(line).find(".sumsinrow").html(Sum);
  $(line).find(".ballsinrow").html(Balls);
  
  var arg=6;
  for (var i=0;i<Storages.length;i++) {
    if (Storages[i][0]) {
      val=arg++;
      line.cells[4-shift+i].firstChild.value=elio.arguments[val];
      line.cells[4-shift+i].firstChild.style.border=((parseFloat(line.cells[2-shift+i].firstChild.value))?'1px solid '+InputbackColor:'1px solid #d4d9e3;');
    } else {
       line.cells[4-shift+i].firstChild.value=elio.arguments[arg++];
     }
  }
  $(line.cells[3]).find('input').trigger("change");
}

//DelLineFromOrder - удаляет строку из таблицы заказа
function dlfo(CurWareCode) {
	 var td=document.getElementById('td'+CurWareCode);
	 if (td) {
    td.parentNode.parentNode.deleteRow(td.parentNode.rowIndex);
	 }
}

function mkt(tbl) {
  tbl=document.getElementById(tbl);
  if (!tbl) tbl=parent.document.getElementById('.table.table-body'); // для заказа из фрейма с описание товара
  if (tbl) {
   var id=$(tbl).attr('id');
   var tbl_name=id.substring(0,id.indexOf('-'));
   for (var i=0; i<tbl.rows.length; i++) {
      if (tbl.rows[i].id.substring(0, 2)!="an") {
         tbl.rows[i].className=(i%2==0)?'':tbl_name+'-tr current';
      }
    }
  }
  //sow($("#maindiv").width()-16);
}

function prcnioc() {
	 if (document.getElementById("ordercomment") &&  document.getElementById("symleft")) {
	   document.getElementById("symleft").innerHTML=150-document.getElementById("ordercomment").value.length;
	 }
}

function jqswConfirmOrderComplete(text) { //для окна подтверждения отправки  заказа на обработку
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
    buttons: {"Ок" : function()  {$('#jqdialog').dialog('destroy'); reloadpage();} ,
    }
  });
   $('#jqdialog').dialog('open');
}

function setFilterTableReclam(mode){
  //$("#debt-table-body tr").css('display', 'none');
  $("#debt-table-body tr").hide();
  if ($("select#reclfilterstate").val()=="-2"){
    $("#debt-table-body tr").toggle(); 
  }  
  else if ($("select#reclfilterstate").val()=="4"){
    if (mode==1){
      $("#debt-table-body tr[code^='tr_"+$("select#reclfilterstate").val()+"']").toggle();
    } 
    if (mode==2){
       if ($("select#reclfilterres").val()==-2){
         $("#debt-table-body tr[code^='tr_"+$("select#reclfilterstate").val()+"']").toggle();
       }
       else{
         $("#debt-table-body tr[code^='tr_"+$("select#reclfilterstate").val()+"_"+$("select#reclfilterres").val()+"']").toggle();
       }
    }   
  }
  else{
   $("#debt-table-body tr[code^='tr_"+$("select#reclfilterstate").val()+"']").toggle();
    
  }  

}

function showrate(delay1, delay2,margintable,betweencols,isanimate) {

var timeanimate=getCookie1('showrateanimation'); 
 if ( (checkColection.showrate==1) && (arrRateCol.length)){
  checkColection.showrate=0;
  //console.log(checkColection.showrate);
  if (isanimate==2) {
    if  (timeanimate !=1) {
        setCookie_('showrateanimation', '1', getExpDate_(0,2,0),'/',0,0);
      //console.log('Я зашел в 2-1');
      }
  }
  
  initTextArrInfoRate ();
  var arrRateMaxCur= new Array();  //для текущего уровня, отмечаем звездой
  var arrRateMax= new Array();  //для ближайшего уровня, отмечаем поломками
  var arrID=['a','b','c'];
  var defaultIndent=3;
  var levelIndent=5;
  var defaultDivCount=4;
  var defaultDivHeight=7;
  var defaultDivWidth=45;
  var defaultTableTRHeight=31;
  var defaultTableCellWidth=58;
  var defaultTableMargin=10;
  var defaultDivBorder=1;
  var curActionsdivWidth=margintable*2+5+betweencols*(arrRateCol.length-1)+(arrRateCol.length)*defaultDivWidth+'px'; //вычисляем текущую тишину дива
  var maxIndex=0; 
    
  var maxLevel=arrRateCol[0][1];
  for (i=1; i<arrRateCol.length; i++){ //считает общие максимальные уровни
   if (maxLevel<arrRateCol[i][1]){
      maxLevel=arrRateCol[i][1];
    }  
  }
  
  $('#actionsdiv').empty();
  //$('#actionsdiv').css('background-image','url("/images/mainmenu/middle-window-wide2.png")');
  $('#actionsdiv').width(curActionsdivWidth);
  
  
  var a1=document.createElement('a');//рисуем ссылку кнопки Свернуть
  a1.setAttribute('id','rightpanelbutton');
  a1.setAttribute('class','rightmenuitem');
  $(a1).attr('title', 'Свернуть панель');
  $(a1).attr('text', 'Свернуть панель');
  $(a1).css('background-image','url("/images/right_blue.gif")');
  $('#actionsdiv').append(a1); 
  $(a1).bind('click', function(e){
           right_block_expand=0;
           var str=getCookie1('left_block_expand');
           left_block_expand=str.substr(0, 1);
           writeMegaCooka(left_block_expand,right_block_expand,num_col_rate);
           showhiderate(30,100,num_col_rate);
        });
  //var img1=document.createElement('img');// для добавления верха и низа
  //img1.src='/images/mainmenu/top-window-right.png';
  //img1.setAttribute('id','lefttopmenuimgright');
  //$('#actionsdiv').append(img1);
  var a1=document.createElement('a');
 // a1.target='_blank';
  a1.setAttribute('id','rightbottommenuimgright');
  //a1.href='http://www.motul.de';
  a1.href='#';
  $(a1).css('cursor','default');
  //var img2=document.createElement('img');
  //var img3=document.createElement('img');
 // img2.src='/images/mainmenu/bottom-window-right-motul.png';
  //img2.src='/images/mainmenu/bottom-window-right.png';
  
  //$(a1).append(img2);
  $('#actionsdiv').append(a1); // для добавления верха и низа
  //$('#actionsdiv').append(img1); 

   //формируем картинку с подсказкой
   /*$(img3).addClass('tooltip');
   img3.src='/images/help_2022.png';
   $(img3).tooltipster({
            content: $('<ul  style=\'padding-left: 10px; list-style-type: circle;\'>'+
                  '<li class=\'rateleveldescrtool\'>Три шкалы - три направления:'+
                  '<li style=\'color: transparent;\'> <ul style=\'padding-left: 10px; list-style-type: disc; \'>'+
                            '<li class=\'rateleveldescrtool\'>AUTO - товары для автомобилей'+
                            '<li class=\'rateleveldescrtool\'>MOTO - товары для мотоциклов'+
                            '<li class=\'rateleveldescrtool\'>MOTUL - вся продукция бренда'+
                       '</ul>'+
                '<li class=\'rateleveldescrtool\'>нумерация шкал соответствует уровню пакета скидок, пакет №10 - максимальная скидка;'+
                '<li class=\'rateleveldescrtool\'>звездочкой отмечен текущий (действующий на этот месяц) пакет скидок;'+
                '<li class=\'rateleveldescrtool\'>степень заливки - объем закупок с первого числа текущего месяца;'+
                '<li class=\'rateleveldescrtool\'>при наведении курсора на одну из шкал отображается дополнительная информация:'+
                '<li style=\'color: transparent;\' > <ul style=\'padding-left: 10px; list-style-type: disc; \'>'+
                            '<li class=\'rateleveldescrtool\'>номер текущего пакета скидок и объем закупок, который необходимо выполнить для подтверждения действующего уровня;'+
                            '<li class=\'rateleveldescrtool\'>объем закупок за текущий месяц;'+
                            '<li class=\'rateleveldescrtool\'>номер и объем закупок следующего пакета скидок (от выполненного объема закупок);'+
                        '</ul>'+
                        
                '<li class=\'rateleveldescrtool\'>также значком (автомобиль, мотоцикл) отмечены позиции в строке результатов поиска;'+
                '<li class=\'rateleveldescrtool\'>добавлена дополнительная колонка цены - цена товара следующего (после действующего) пакета скидок;'+
               '</ul>')
           });
   $(img3).css('position','absolute').css('top', '5px').css('right','10px');
   img3.setAttribute('id','infoimg_0');
   $('#actionsdiv').append(img3);
   //$(img3).easyTooltip();
   $(img3).tooltipster();
  */
  
  var div,div1,div2,div3,div4;
  var tbl_=document.createElement('table'); //формируем таблицу для иконок и описания колонок
  tbl_.style.width=$('#actionsdiv').width()-10;
  //tbl_.style.bottom= $(a1).height()-10+'px';//послезамены картинок опускаем вниз
  tbl_.style.bottom=10+'px';
  tbl_.style.marginLeft=parseInt(margintable-0.2*defaultDivWidth)-9+'px';
  $(tbl_).addClass('tablelevel'); 
  newrow=tbl_.insertRow(-1);
  newrow.style.backgroundColor='transparent';
  newrow.style.height=defaultTableTRHeight+'px';
  newcell=newrow.insertCell(-1);
  $(newcell).addClass('oldcell');
  if (arrRateCol[0][7]<=0){
    newcell.innerHTML='<a onMouseover="getLevelInfo(1,1);" href="#" onMouseout="getLevelInfo(0,1);" class="rate-info-auto"></a>';
  }  
  else{
    newcell.innerHTML='<a onMouseover="getLevelInfo(1,1);" href="#" onMouseout="getLevelInfo(0,1);" class="rate-info-auto"></a>';
  }  
  newcell.style.width=defaultTableCellWidth+(betweencols-10)+'px';
  newcell.style.height=defaultTableTRHeight+'px';
  newcell=newrow.insertCell(-1);
  $(newcell).addClass('oldcell');
  if (arrRateCol[1][7]<=0){
    newcell.innerHTML='<a onMouseover="getLevelInfo(1,2);" href="#" onMouseout="getLevelInfo(0,2);" class="reserve"></a>';
  }  
  else{
    newcell.innerHTML='<a onMouseover="getLevelInfo(1,2);" href="#" onMouseout="getLevelInfo(0,2);" class="reserve"></a>';
  }  
  newcell.style.width=defaultTableCellWidth+(betweencols-10)+'px';
  newcell.style.height=defaultTableTRHeight+'px';
  newcell=newrow.insertCell(-1);
  $(newcell).addClass('oldcell');
  if (arrRateCol[2][7]<=0){
    newcell.innerHTML='<a onMouseover="getLevelInfo(1,3);" href="#" onMouseout="getLevelInfo(0,3);" class="reserve"></a>';
  }  
  else{
    newcell.innerHTML='<a onMouseover="getLevelInfo(1,3);" href="#" onMouseout="getLevelInfo(0,3);" class="reserve"></a>';
  }  
  newcell.style.width=defaultTableCellWidth+parseInt(betweencols*0.66)+'px';
  newcell.style.height=defaultTableTRHeight+'px';
  newrow=tbl_.insertRow(-1);
  newcell=newrow.insertCell(-1);
  $(newcell).addClass('oldcell');
  newcell.style.textAlign='left';
  newcell.colSpan=3;
  $(newcell).css('border-top-width', '0px');
  newcell.onmouseover = function(event){
    getLevelInfo(1,RateDirectTitle);
  };
  newcell.onmouseout = function(event){
    getLevelInfo(0,RateDirectTitle);
  };

  var leftDescrLevelTable=margintable-defaultDivWidth;
  var s1='<ul id="descrleveltable" style="margin-left: 5px; color:  #81DC84; list-style-type: none; ">'+
         '<li><span class="rateleveldescr">Уровень скидок - <span id="rateleveldescr1_1" class="rateleveldescrnumber">8</span> (объем закупок <span class="rateleveldescrnumber" id="rateleveldescr1_2">80000</span>)</span>'+
  '<li><span class="rateleveldescr">Текущий объем закупок </span><span id="rateleveldescr2_1" class="rateleveldescrnumber">50000</span>'+
  '<li id="descrleveltable3"><span class="rateleveldescr">Ближайший пакет скидок - <span id="rateleveldescr3_1"  class="rateleveldescrnumber">7</span> (объем закупок <span class="rateleveldescrnumber" id="rateleveldescr3_2" >60000</span>)</span>'+
  '</ul>';
  
  
  var s1='<table id="descrleveltable2" style="margin-left: 5px; color:  #81DC84; text-align: left; ">'+
         '<tr id="rateleveldescr1_0" > '+
            '<td class="rateleveldescr" style="text-align: right; padding-right: 15px;" id="rateleveldescr1_1">Объем</td>'+
            '<td class="rateleveldescr" style="text-align: left;" id="rateleveldescr1_2"></td>'+
            '<td class="rateleveldescr" style="text-align: right;width: 16px;" id="rateleveldescr1_3"><img src="/images/star.png"></td>'+
            '<td style="text-align: left;" class="rateleveldescr" id="rateleveldescr1_4">Вход.</td>'+ 
         '<tr> '+
         '<tr id="rateleveldescr2_0"> '+
            '<td class="rateleveldescr" style="text-align: right; padding-right: 15px;" id="rateleveldescr2_1"> Объем</td>'+
            '<td id="rateleveldescr2_2" class="rateleveldescrnumber" style="text-align: left;">Объем</td>'+
            '<td style="text-align: right;width: 16px; " id="rateleveldescr2_3"></td>'+
            '<td  style="text-align: left;" class="rateleveldescrnumber" id="rateleveldescr2_4">80000</td>'+
         '<tr> '+
         '<tr id="rateleveldescr3_0"> '+
            '<td class="rateleveldescr" style="text-align: right; padding-right: 15px;" id="rateleveldescr3_1">Объем</td>'+
            '<td id="rateleveldescr3_2"  class="rateleveldescrnumber" style="text-align: left;"></td>'+
            '<td style="text-align: right;width: 16px; " id="rateleveldescr3_3"></td>'+
            '<td  style="text-align: left;" id="rateleveldescr3_4" >Закупки</td>'+
         '<tr> '+
      '</table>';

  newcell.innerHTML=s1;
  $('#actionsdiv').append(tbl_); 
  var heightTableDescr=$(tbl_).height();
  var heightLowCell=$(newcell).height();

  // цикл проверки высоты таблицы и переноса строк
  for (j=1; j<=arrRateCol.length; j++){ //цикл перебора значений
     getLevelInfo(1,j);
     if ($(tbl_).height()>heightTableDescr) {
       heightTableDescr=$(tbl_).height(); 
       heightLowCell=$(newcell).height();
     }
     getLevelInfo(0,j);
    }
   $(newcell).height(heightLowCell);
   //heightTableDescr=heightTableDescr+$(a1).height()-10;// учли нижний мотуль
   heightTableDescr=heightTableDescr+10;//не учли нижний мотуль после его удаления
 
 
 

  var maxHeight=$('#actionsdiv').height()-(heightTableDescr)-(2*maxLevel)-defaultTableMargin-(defaultDivHeight+defaultIndent)-14-$('#rightpanelbutton').height();
  var countDivLevel=parseInt((maxHeight/maxLevel)/(defaultIndent+defaultDivHeight+defaultDivBorder*2)); //к-во дивов в одном блоке
  var countAllDiv=maxLevel*countDivLevel; //общее количество дивоов в столбце
  for (i=0; i<arrRateCol.length; i++){
   arrRateMaxCur[i]=countDivLevel*arrRateCol[i][2]; // для звезды
   if (arrRateCol[i][4]==0){
     arrRateMax[i]=maxLevel*countDivLevel; 
   }else{
     arrRateMax[i]=countDivLevel*(arrRateCol[i][4]-1)+parseInt(((100-arrRateCol[i][6])/100)*countDivLevel); //  для полосок
   }  
  }
 
  
  if ( (timeanimate !=1) && (isanimate==2) ){
   for (j=0; j<arrRateCol.length; j++){ // рисуем заполненные прямоугольники
     var curBottomValue=heightTableDescr+defaultTableMargin;   //текущее значение отступа от низа
     for (i=1; i<=countAllDiv; i++){
       div=document.createElement('div');
       $('#actionsdiv').append(div);
       div1=document.createElement('div');//вложенный див
       $('#actionsdiv').append(div1);
       div.setAttribute('id',''+arrID[j]+i+'');
       div1.setAttribute('id',''+arrID[j]+i+'_'+i+'');
       $(div).addClass('rateemptydiv');
       $(div1).addClass('ratedeepdiv');
       $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+'px').css('bottom', curBottomValue+'px');
       $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
      // 
       if (i%countDivLevel==0) {
           curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2)+2; 
       }
       else{
           curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2); 
        }
      }
     // if (arrRateCol[j][4]==0){
        div=document.createElement('div');
        $('#actionsdiv').append(div);
        //$('#ColDiv'+(j+1)+'').append(div);
        div1=document.createElement('div');//вложенный див
        $('#actionsdiv').append(div1);
        div.setAttribute('id',''+arrID[j]+i+'');
        div1.setAttribute('id',''+arrID[j]+i+'_'+i+'');
        $(div).addClass('rateemptydiv');
        $(div1).addClass('ratedeepdiv');
        $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+'px').css('bottom', curBottomValue+'px');
        $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
     // }
    }
   
    
      for (j=0; j<arrRateCol.length; j++){ //цикл постепенного накатывания вверх
        for (i=0; i<=countAllDiv; i++){
          div=document.getElementById(''+arrID[j]+i+'_'+i+'');
          $(div).delay((i)*(delay1/3)).animate({opacity: 1},(delay2/3));
        }
        if (arrRateCol[j][4]==0){
          div=document.getElementById(''+arrID[j]+i+'_'+i+'');
          $(div).delay((i)*delay1).animate({opacity: 1},delay2);
        } 
      }
        
      for (j=0; j<arrRateCol.length; j++){ //цикл постепенного скатывания вниз
        for (i=countAllDiv; i>0; i--){
          if (i>arrRateMax[j]){
            div=document.getElementById(''+arrID[j]+i+'_'+i+'');
            $(div).delay((countAllDiv-i)*2*delay1).animate({opacity: 0},delay2);
          } 
        }
      }
    }
    else{
      for (j=0; j<arrRateCol.length; j++){ // рисуем заполненные прямоугольники
        var curBottomValue=heightTableDescr+defaultTableMargin;   //текущее значение отступа от низа
        for (i=1; i<=countAllDiv; i++){
          div=document.createElement('div');
          $('#actionsdiv').append(div);
          div1=document.createElement('div');//вложенный див
          $('#actionsdiv').append(div1);
          div.setAttribute('id',''+arrID[j]+i+'');
          div1.setAttribute('id',''+arrID[j]+i+'_'+i+'');
          $(div).addClass('rateemptydiv');
          $(div1).addClass('ratedeepdiv');
          $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+'px').css('bottom', curBottomValue+'px');
          if (i<=arrRateMax[j]){
            $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','1');
          }
          else{
            $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
          }
       // 
          if (i%countDivLevel==0) {
            curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2)+2; 
          }
          else{
              curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2); 
          }
        }
      // if (arrRateCol[j][4]==0){
         div=document.createElement('div');
         $('#actionsdiv').append(div);
         div1=document.createElement('div');//вложенный див
         $('#actionsdiv').append(div1);
         div.setAttribute('id',''+arrID[j]+i+'');
         div1.setAttribute('id',''+arrID[j]+i+'_'+i+'');
         $(div).addClass('rateemptydiv');
         $(div1).addClass('ratedeepdiv');
         $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+'px').css('bottom', curBottomValue+'px');
         if (arrRateCol[j][4]==0){
           $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','1');
         }
         else{
           $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',(betweencols*j)+defaultDivWidth*j+margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
         }
      }
    }     
   
   var curHeightLine,curLeftLine;// высота полоски с треугольником, отступ ее же
   var heightRateMax;  //значение текущей достигнеутой высоты для столдца  
   var heightRateMaxCur;  //значение текущей достигнеутой высоты для звезды  
   var flag;
   
   for (j=0; j<arrRateCol.length; j++){
     
     if (arrRateMaxCur[j] !=0){
       heightRateMaxCur=defaultTableMargin+heightTableDescr+arrRateMaxCur[j]*(defaultIndent+defaultDivHeight+defaultDivBorder*2); //для звезды
       flag=0;
     }
     else{
       flag=1;
     }
     heightRateMax=defaultTableMargin+heightTableDescr+arrRateMax[j]*(defaultIndent+defaultDivHeight+defaultDivBorder*2)+(2*parseInt(arrRateMax[j]/countDivLevel)); //для полосок
     for (i=1; i<=maxLevel; i++){ //расставляет метки
       div=document.createElement('div');
       $('#actionsdiv').append(div);
       div1=document.createElement('div');//див для цифр
       div2=document.createElement('div');//звезда
       div1.innerHTML=i;
       curHeightLine=defaultTableMargin+heightTableDescr+(i*(defaultIndent+defaultDivHeight+defaultDivBorder*2)*countDivLevel)+((i-1)*2);
       if (curHeightLine<heightRateMax){
         $(div).addClass('ratelevel blue');
         $(div1).addClass('levelnumbercurrent');
         if (i !=maxLevel){
           $('#actionsdiv').append(div1);
         }  
       }
       else{
         $(div1).addClass('levelnumber'); 
         $(div).addClass('ratelevel');
         $('#actionsdiv').append(div1);    
       }
       if ( ((curHeightLine==heightRateMaxCur) || (curHeightLine>heightRateMaxCur)) && (flag==0) ){
        $(div1).remove(); 
         $(div).addClass('ratelevelcurrent');
         $(div).removeClass('blue');
         flag++;
         $(div2).addClass('levelnumbertnext');
         $(div2).css('background-image','url("/images/starlevel.png")');
         $(div2).css('text-align','center');
         if (i>9){
           div2.innerHTML=i;
         }else{
            div2.innerHTML=i;
          }
         $('#actionsdiv').append(div2);   
       }
       curLeftLine=parseInt( (betweencols*j+defaultDivWidth*j+margintable)-0.2*defaultDivWidth);
       $(div).css('width',parseInt(defaultDivWidth*1.2)+'px').css('left',curLeftLine+'px').css('bottom',curHeightLine-1+'px');
       $(div1).css('left',curLeftLine-9+'px').css('bottom',curHeightLine+'px');
       $(div2).css('left',curLeftLine-16+'px').css('bottom',curHeightLine+'px');
             
     } 
     if (flag==0){
         $(div).addClass('ratelevelcurrent');
         //$(div).toggleClass('blue');
         $(div2).addClass('levelnumbertnext');
         $(div2).css('background-image','url("/images/star.png")');
         $(div2).css('text-align','center');
         if (i>9){
          div2.innerHTML=maxLevel;
         }else{
           div2.innerHTML=maxLevel;
         }
         $('#actionsdiv').append(div2);     
         $(div2).css('left',curLeftLine-16+'px').css('bottom',curHeightLine+'px');
     }
    }
    
   for (i=0; i<arrRateCol.length; i++){ //ставит большие дживы с блоками
      var curBottomValue=heightTableDescr+defaultTableMargin;   //текущее значение отступа от низа
      var curBlockHeight=((defaultIndent+defaultDivHeight+defaultDivBorder*2)*countAllDiv)+maxLevel*2;
      div=document.createElement('div');
      $('#actionsdiv').append(div);
      div.innerHTML='<div id=ColDiv'+(i+1)+' OnMouseOver="getLevelInfo(1,'+(i+1)+');" OnMouseOut="getLevelInfo(0,'+(i+1)+');" style="width: 100%; height: 100%;"></div>';
      $(div).css('color', 'transparent').css('width',defaultDivWidth+'px').css('height',curBlockHeight+'px').css('left',(betweencols*i)+defaultDivWidth*i+margintable+1+'px').css('bottom',curBottomValue+ 'px').css('position', 'absolute');
    } 
    checkColection.showrate=1;
 }   
}

function showhiderate(margintable,DivWidth,ColNum) { // функция для показа сверннутого окна рейтинга скидок

 if ( (checkColection.showrate==1) && (arrRateCol.length)){
  checkColection.showrate=0;
  
  var arrRateMaxCur= new Array();  //для текущего уровня, отмечаем звездой
  var arrRateMax= new Array();  //для ближайшего уровня, отмечаем поломками
  var defaultIndent=3;
  var levelIndent=5;
  var defaultDivCount=4;
  var defaultDivHeight=7;
  var defaultDivWidth=45;
  var defaultTableTRHeight=31;
  var defaultTableCellWidth=58;
  var defaultTableMargin=10;
  var defaultDivBorder=1;
  //var curActionsdivWidth=DivWidth+'px'; //вычисляем текущую тишину дива
  var curActionsdivWidth='356px'; //вычисляем текущую тишину дива
  var maxIndex=0; 
  var arrImageSrcG=['/images/auto-G.png','/images/moto-G.png','/images/motul-G.png'];
  var arrImageSrcW=['/images/auto-W.png','/images/moto-W.png','/images/motul-W.png'];
  var arrSmallIcon=['/images/autoG-32x16.png','/images/motoG-32x16.png','/images/motulG-32x16.png'];  
  var maxLevel=arrRateCol[0][1];
  for (i=1; i<arrRateCol.length; i++){
    if (maxLevel<arrRateCol[i][1]){
      maxLevel=arrRateCol[i][1];
    }  
  }
  
  $('#actionsdiv').empty();
  $('#actionsdiv').width(curActionsdivWidth);
  //$('#actionsdiv').css('background-image','url("/images/mainmenu/middle-window-short100.png")');
  
  var a1=document.createElement('a');//рисуем ссылку кнопки Свернуть
  a1.setAttribute('id','rightpanelbutton');
  a1.setAttribute('class','rightmenuitem');
  $(a1).attr('title', 'Развернуть панель');
  $(a1).attr('text', 'Развернуть панель');
  $('#actionsdiv').append(a1); 
  $(a1).css('background-image','url("/images/left_blue.gif")');
  $(a1).bind('click', function(e){
           right_block_expand=1;
           var str=getCookie1('left_block_expand');
           left_block_expand=str.substr(0, 1);
           writeMegaCooka(left_block_expand,right_block_expand,num_col_rate);
           showrate(100,100,30,30,1);
        });
  
  //var img1=document.createElement('img');// для добавления верха и низа
  //img1.src='/images/mainmenu/top-window-right100.png';
  //img1.setAttribute('id','lefttopmenuimgright');
  //$(img1).width(DivWidth);
  //$('#actionsdiv').append(img1);
  var a1=document.createElement('a');
  a1.target='_blank';
  a1.setAttribute('id','rightbottommenuimgright');
  //a1.href='http://www.motul.de';
  a1.href='#';
  //var img2=document.createElement('img');
  //var img3=document.createElement('img');
  // img2.src='/images/mainmenu/bottom-window-right-motul100.png';
  //img2.src='/images/mainmenu/bottom-window-right100.png'
  $(a1).width(DivWidth);
  //$(a1).append(img2);
  $('#actionsdiv').append(a1); // для добавления верха и низа
  //$('#actionsdiv').append(img1);
  
  
  
  //формируем картинку с подсказкой
  /*$(img3).addClass('tooltip');
  img3.src='/images/help_2022.png';
  $(img3).tooltipster({
            content: $('<ul  style=\'padding-left: 10px; list-style-type: circle;\'>'+
                  '<li class=\'rateleveldescrtool\'>Три шкалы - три направления:'+
                  '<li style=\'color: transparent;\'> <ul style=\'padding-left: 10px; list-style-type: disc; \'>'+
                            '<li class=\'rateleveldescrtool\'>AUTO - товары для автомобилей'+
                            '<li class=\'rateleveldescrtool\'>MOTO - товары для мотоциклов'+
                            '<li class=\'rateleveldescrtool\'>MOTUL - вся продукция бренда'+
                       '</ul>'+
                '<li class=\'rateleveldescrtool\'>нумерация шкал соответствует уровню пакета скидок, пакет №10 - максимальная скидка;'+
                '<li class=\'rateleveldescrtool\'>звездочкой отмечен текущий (действующий на этот месяц) пакет скидок;'+
                '<li class=\'rateleveldescrtool\'>степень заливки - объем закупок с первого числа текущего месяца;'+
                '<li class=\'rateleveldescrtool\'>при наведении курсора на одну из шкал отображается дополнительная информация:'+
                '<li style=\'color: transparent;\' > <ul style=\'padding-left: 10px; list-style-type: disc; \'>'+
                            '<li class=\'rateleveldescrtool\'>номер текущего пакета скидок и объем закупок, который необходимо выполнить для подтверждения действующего уровня;'+
                            '<li class=\'rateleveldescrtool\'>объем закупок за текущий месяц;'+
                            '<li class=\'rateleveldescrtool\'>номер и объем закупок следующего пакета скидок (от выполненного объема закупок);'+
                        '</ul>'+
                        
                '<li class=\'rateleveldescrtool\'>также значком (автомобиль, мотоцикл) отмечены позиции в строке результатов поиска;'+
                '<li class=\'rateleveldescrtool\'>добавлена дополнительная колонка цены - цена товара следующего (после действующего) пакета скидок;'+
               '</ul>')
           });
  $(img3).css('position','absolute').css('top', '5px').css('right','10px');
  img3.setAttribute('id','infoimg_0');
  $('#actionsdiv').append(img3);
  $(img3).tooltipster();
  */
 
  var tbl_=document.createElement('table'); //формируем таблицу для иконок и описания колонок
  tbl_.style.width=$('#actionsdiv').width()-10;
  tbl_.style.bottom= $(a1).height()-10+'px';
  tbl_.style.marginLeft=parseInt(margintable-0.2*defaultDivWidth)-9+'px';
  $(tbl_).addClass('tablelevel'); 
  newrow=tbl_.insertRow(-1);
  newrow.style.backgroundColor='transparent';
  newrow.style.height=defaultTableTRHeight+'px';
  newcell=newrow.insertCell(-1);
  if (arrRateCol[ColNum][7]==0){
    newcell.innerHTML='<img  src="'+arrImageSrcG[ColNum]+'">';
  }  
  else{
    newcell.innerHTML='<img  src="'+arrImageSrcW[ColNum]+'">';
  }  
  newcell.style.width=defaultTableCellWidth+20+'px';
  newcell.style.height=defaultTableTRHeight+'px';
  newcell.colSpan=2;
  newrow=tbl_.insertRow(-1);
  newrow.style.backgroundColor='transparent';
  newrow.style.height='16px';
  newrow.setAttribute('id','smallrateicontd');
  for (i=0; i<arrRateCol.length; i++){
    if (i !=ColNum){
      newcell=newrow.insertCell(-1);
      newcell.innerHTML='<img  onClick="num_col_rate='+i+';  writeMegaCooka(left_block_expand,right_block_expand,num_col_rate); showhiderate(30,100,'+i+'); "  src="'+arrSmallIcon[i]+'">';
      newcell.style.width='32px';
      newcell.style.height='16px';
      newcell.style.cursor='pointer';
    } 
  }
  
  
  
  $('#actionsdiv').append(tbl_); 
  var heightTableDescr=$(tbl_).height();
  var div,div1,div2,div3,div4;
  var heightLowCell=0;
  heightTableDescr=heightTableDescr+$(a1).height()-10;// учли нижний мотуль
 
  var maxHeight=$('#actionsdiv').height()-(heightTableDescr)-(2*maxLevel)-defaultTableMargin-(defaultDivHeight+defaultIndent)-14-$('#rightpanelbutton').height();
  var countDivLevel=parseInt((maxHeight/maxLevel)/(defaultIndent+defaultDivHeight+defaultDivBorder*2)); //к-во дивов в одном блоке
  var countAllDiv=maxLevel*countDivLevel; //общее количество дивоов в столбце
  for (i=0; i<arrRateCol.length; i++){
   arrRateMaxCur[i]=countDivLevel*arrRateCol[i][2]; // для звезды
   if (arrRateCol[i][4]==0){
     arrRateMax[i]=maxLevel*countDivLevel; 
   }else{
     arrRateMax[i]=countDivLevel*(arrRateCol[i][4]-1)+parseInt(((100-arrRateCol[i][6])/100)*countDivLevel); //  для полосок
   }  
  }
 
  // рисуем заполненные прямоугольники
  var j=ColNum;
  var curBottomValue=heightTableDescr+defaultTableMargin;   //текущее значение отступа от низа
  for (i=1; i<=countAllDiv; i++){
    div=document.createElement('div');
    $('#actionsdiv').append(div);
    div1=document.createElement('div');//вложенный див
    $('#actionsdiv').append(div1);
    $(div).addClass('rateemptydiv');
    $(div1).addClass('ratedeepdiv');
    $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+'px').css('bottom', curBottomValue+'px');
    if (i<=arrRateMax[j]){
       $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','1');
    }
    else{
      $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
    }
    if (i%countDivLevel==0) {
      curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2)+2; 
    }
    else{
      curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2); 
    }
  }
  div=document.createElement('div');
  $('#actionsdiv').append(div);
  div1=document.createElement('div');//вложенный див
  $('#actionsdiv').append(div1);
  $(div).addClass('rateemptydiv');
  $(div1).addClass('ratedeepdiv');
  $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+'px').css('bottom', curBottomValue+'px');
  if (arrRateCol[j][4]==0){
    $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','1');
  }
  else{
    $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
  }
      
  
  
  var curHeightLine,curLeftLine;// высота полоски с треугольником, отступ ее же
  var heightRateMax;  //значение текущей достигнеутой высоты для столдца  
  var heightRateMaxCur;  //значение текущей достигнеутой высоты для звезды  
  var flag;
  if (arrRateMaxCur[j] !=0){
    heightRateMaxCur=defaultTableMargin+heightTableDescr+arrRateMaxCur[j]*(defaultIndent+defaultDivHeight+defaultDivBorder*2); //для звезды
     flag=0;
  }
  else{
    flag=1;
  }
  heightRateMax=defaultTableMargin+heightTableDescr+arrRateMax[j]*(defaultIndent+defaultDivHeight+defaultDivBorder*2)+(2*parseInt(arrRateMax[j]/countDivLevel)); //для полосок
  for (i=1; i<=maxLevel; i++){ //расставляет метки
     div=document.createElement('div');
     $('#actionsdiv').append(div);
     div1=document.createElement('div');//див для цифр
     div2=document.createElement('div');//звезда
     div1.innerHTML=i;
     curHeightLine=defaultTableMargin+heightTableDescr+(i*(defaultIndent+defaultDivHeight+defaultDivBorder*2)*countDivLevel)+((i-1)*2);
     if (curHeightLine<heightRateMax){
       $(div).addClass('ratelevel blue');
       $(div1).addClass('levelnumbercurrent');
       if (i !=maxLevel){
         $('#actionsdiv').append(div1);
       }  
     }
     else{
       $(div1).addClass('levelnumber'); 
       $(div).addClass('ratelevel');
       $('#actionsdiv').append(div1);    
     }
     if ( ((curHeightLine==heightRateMaxCur) || (curHeightLine>heightRateMaxCur)) && (flag==0) ){
       $(div1).remove(); 
       $(div).addClass('ratelevelcurrent');
       $(div).removeClass('blue');
       flag++;
       $(div2).addClass('levelnumbertnext');
       $(div2).css('background-image','url("/images/starlevel.png")');
       $(div2).css('text-align','center');
       if (i>9){
         div2.innerHTML=i;
       }else{
          div2.innerHTML=i;
        }
       $('#actionsdiv').append(div2);   
     }
     curLeftLine=parseInt(margintable-0.2*defaultDivWidth);
     $(div).css('width',parseInt(defaultDivWidth*1.2)+'px').css('left',curLeftLine+'px').css('bottom',curHeightLine-1+'px');
     $(div1).css('left',curLeftLine-9+'px').css('bottom',curHeightLine+'px');
     $(div2).css('left',curLeftLine-16+'px').css('bottom',curHeightLine+'px');
   } 
   if (flag==0){
       $(div).addClass('ratelevelcurrent');
       //$(div).toggleClass('blue');
       $(div2).addClass('levelnumbertnext');
       $(div2).css('background-image','url("/images/star.png")');
       $(div2).css('text-align','center');
       if (i>9){
        div2.innerHTML=maxLevel;
       }else{
         div2.innerHTML=maxLevel;
       }
       $('#actionsdiv').append(div2);     
       $(div2).css('left',curLeftLine-16+'px').css('bottom',curHeightLine+'px');
     }
    
    left_block_expand=(getCookie1('left_block_expand').indexOf(0)==0)?0:1;
    checkColection.showrate=1;
 }   
}


function getLevelInfo(mode,cellnum){  // функция для отображения информации об уровне скидки
if (cellnum==-2) cellnum=RateDirectTitle; else RateDirectTitle=cellnum;
  cellnum=cellnum-1;
  var Cells = $('.tablelevel td.oldcell');
  // Все вытираем
  Cells.css('border-bottom-color','transparent').css('border-top-color','transparent').css('border-right-color','transparent');
  $('.tablelevel tr td:first-child').css('border-left-color','transparent');
  $('#descrleveltable2').css('visibility', ((mode)?'visible':'hidden'));  
  if (mode==1){ // закрашиваем, если надо
    $(Cells[cellnum]).css('border-top-color','#2c80c9').css('border-right-color','#2c80c9');
    // если это первая ячейка, то закрашиваем ее левую рамку,  в остальных случаях - правую рамку предыдущей ячейки
    if (cellnum) {
      $(Cells[cellnum-1]).css('border-right-color','#2c80c9');
    } else {
      $(Cells[cellnum]).css('border-left-color','#2c80c9');
    }
    // теперь закрашиваем нижние стороны
    for (i=0; i<(Cells.length-1); i++) {
      if (i!=cellnum) $(Cells[i]).css('border-bottom-color','#2c80c9');
    }
    // И, наконец, закрашиваем нижнюю ячейку
    $(Cells[Cells.length-1]).css('border-bottom-color','#2c80c9').css('border-right-color','#2c80c9').css('border-left-color','#2c80c9');
  }
 
  setTextArrInfoRate (cellnum);
 }


function setTextArrInfoRate (direct){   //расставляет строки по убыванию
 var img1=document.createElement('img');// для добавления верха и низа
 img1.src='/images/starlevel.png';
 $(img1).css('height','16px');
 for (i=0; i<arrRateCol.length; i++){ //цикл перебора значений
    $('#rateleveldescr'+(i+1)+'_0').attr('title', arrTextAll[direct][i].title);
    $('#rateleveldescr'+(i+1)+'_1').attr('title', arrTextAll[direct][i].title);
    $('#rateleveldescr'+(i+1)+'_2').attr('title', arrTextAll[direct][i].title);
    $('#rateleveldescr'+(i+1)+'_3').attr('title', arrTextAll[direct][i].title);
    $('#rateleveldescr'+(i+1)+'_4').attr('title', arrTextAll[direct][i].title);
    var s =String(arrTextAll[direct][i].v);
    s = ((s.length>3)?(s.substr(0, s.length-3)+' '+s.substr(s.length-3)):s);
    $('#rateleveldescr'+(i+1)+'_1').text(s);
    $('#rateleveldescr'+(i+1)+'_2').text(arrTextAll[direct][i].ps);
    $('#rateleveldescr'+(i+1)+'_3').find('img').remove();
    if (arrTextAll[direct][i].img){
      $('#rateleveldescr'+(i+1)+'_3').append(img1); 
    }
    else{
       $('#rateleveldescr'+(i+1)+'_3').find('img').remove();     
     }
   $('#rateleveldescr'+(i+1)+'_4').text(arrTextAll[direct][i].text);
  }
 
 //RateDirectTitle=direct;
 return true;
}

function initTextArrInfoRate (){   //инициализирует массивы строками для скидок
  var _vhod, _next;
 
  for (i=0; i<arrRateCol.length; i++){ //проверяет отрицательный баланс
   if (arrRateCol[i][7]<0){
      maxLevel=arrRateCol[i][1]=0;
      maxLevel=arrRateCol[i][6]=100;
      maxLevel=arrRateCol[i][4]=1;
      maxLevel=arrRateCol[i][5]=10;
    }  
   }
  
  
  
  for (iii=0; iii<arrRateCol.length; iii++){ //цикл перебора значений
// по сути у строки со звездочкой два положения - в начале или в конце
// поэтому сортировка не нужна, а мы просто определяем, где у нас будет эта строка
    if (arrRateCol[iii][3]<arrRateCol[iii][5]) {
      _vhod=2;
      _next=0;
    } else {
      _vhod=0;
      _next=1;
    }
    
    arrTextAll[iii]= new Array();
    arrTextAll[iii][_vhod]=new Object;
    arrTextAll[iii][_vhod].v=arrRateCol[iii][3];
    arrTextAll[iii][_vhod].ps='ПС '+arrRateCol[iii][2];
    arrTextAll[iii][_vhod].img=true;
    arrTextAll[iii][_vhod].text='Вход.';
    arrTextAll[iii][_vhod].title='Эта строка отображает номер и объем закупок полученного вами по результатам прошлого периода пакета скидок, который формирует вашу текущую входную цену.';
    arrTextAll[iii][_next]=new Object;
    arrTextAll[iii][_next].v=arrRateCol[iii][5];
    arrTextAll[iii][_next].ps='ПС '+arrRateCol[iii][4];
    arrTextAll[iii][_next].img=false;
    arrTextAll[iii][_next].text='';
    arrTextAll[iii][_next].title='Эта строка отображает номер и объем закупок пакета скидок, ближайшего к вашему показателю закупок текущего месяца.';
    arrTextAll[iii][_next+1]=new Object;
    arrTextAll[iii][_next+1].v=arrRateCol[iii][7];
    arrTextAll[iii][_next+1].ps='';
    if (arrRateCol[iii][4]!=0){
      if (arrRateCol[iii][4]>0){
        arrTextAll[iii][_next+1].ps='ПС '+(arrRateCol[iii][4]-1);
      }  
    }
    else{
      arrTextAll[iii][_next+1].ps='ПС 10';
    }
    arrTextAll[iii][_next+1].img=false;
    arrTextAll[iii][_next+1].text='Закупки';
    arrTextAll[iii][_next+1].title='Эта строка отображает объем закупок текущего месяца и номер пакета скидок, который вы уже заработали на следующий период.';
  }
  
  
 return true;
  
}

function setShowRate(){
  var str=getCookie1('left_block_expand');
  right_block_expand=str.substr(1, 1);
  if (right_block_expand==''){right_block_expand=1;}
  num_col_rate=str.substr(2, 1);
  if (num_col_rate==''){num_col_rate=0;}
  else{ showhiderate(30,100,0);}
  if (right_block_expand==1){showrate(100,100,30,30,1);} 
  else{ showhiderate(30,100,num_col_rate);}
}

function showhiderate2(margintable,DivWidth) { // функция для показа сверннутого окна рейтинга скидок//Новый эквалайзер

 if ( (checkColection.showrate==1) && (arrRateCol.length)){
  checkColection.showrate=0;
  var ColNum=2;
  var arrRateMaxCur= new Array();  //для текущего уровня, отмечаем звездой
  var arrRateMax= new Array();  //для ближайшего уровня, отмечаем поломками
  var defaultIndent=3;
  var levelIndent=5;
  var defaultDivCount=4;
  var defaultDivHeight=7;
  var defaultDivWidth=45;
  var defaultTableTRHeight=31;
  var defaultTableCellWidth=58;
  var defaultTableMargin=10;
  var defaultDivBorder=1;
  var curActionsdivWidth=DivWidth+'px'; //вычисляем текущую тишину дива
  var maxIndex=0; 
  var arrImageSrcG='/images/motul-G.png';
  var arrImageSrcW='/images/motul-W.png';
  //var arrSmallIcon='/images/motulG-32x16.png';  
  var maxLevel=arrRateCol[0][1];
  for (i=1; i<arrRateCol.length; i++){
    if (maxLevel<arrRateCol[i][1]){
      maxLevel=arrRateCol[i][1];
    }  
  }
  
  $('#actionsdiv').empty();
  $('#actionsdiv').width(curActionsdivWidth);
  var a1=document.createElement('a');
  $(a1).addClass('rate-info-help tooltip');
  $(a1).tooltipster({
            content: $('<ul  class="rate-level-descr-tool-ul">'+
                  '<li class=\'rateleveldescrtool\'>шкала бренда MOTUL - вся продукция бренда;'+
                  '<li class=\'rateleveldescrtool\'>нумерация шкалы соответствует уровню пакета скидок, пакет №10 - максимальная скидка;'+ 
                  '<li class=\'rateleveldescrtool\'>звездочкой отмечен текущий (действующий на этот месяц) пакет скидок;'+
                  '<li class=\'rateleveldescrtool\'>степень заливки - объем закупок с первого числа текущего месяца;'+
                  '<li class=\'rateleveldescrtool\'>при наведении курсора на шкалу отображается дополнительная информация:'+
                  '<li style=\'color: transparent;\' > <ul style="padding-left: 10px; list-style-type: disc; ">'+
                            '<li class=\'rateleveldescrtool\'>номер текущего пакета скидок и объем закупок, который необходимо выполнить для подтверждения действующего уровня;'+
                            '<li class=\'rateleveldescrtool\'>объем закупок за текущий месяц;'+
                            '<li class=\'rateleveldescrtool\'>номер и объем закупок следующего пакета скидок (от выполненного объема закупок);'+
                        '</ul>'+           
               '</ul>')
           });
  $(a1).css('position','absolute').css('top', '5px').css('right','10px');
  a1.setAttribute('id','infoimg_0');
  $('#actionsdiv').append(a1);
  //$(a1).tooltipster();

  
  
  
  
  var tbl_=document.createElement('table'); //формируем таблицу для иконок и описания колонок
  tbl_.style.width=$('#actionsdiv').width()-10;
  //tbl_.style.bottom= $(a1).height()-10+'px';
  tbl_.style.bottom=10+'px';
  tbl_.style.marginLeft=parseInt(margintable-0.2*defaultDivWidth)-9+'px';
  $(tbl_).addClass('tablelevel'); 
  newrow=tbl_.insertRow(-1);
  newrow.style.backgroundColor='transparent';
  newrow.style.height=defaultTableTRHeight+'px';
  newcell=newrow.insertCell(-1);
  if (arrRateCol[ColNum][7]==0){
    newcell.innerHTML='<a href="#"  class="rate-info-motul"></a>';
  }  
  else{
    newcell.innerHTML='<a href="#" class="rate-info-motul-active"></a>';
  }  
  newcell.style.width=defaultTableCellWidth+20+'px';
  newcell.style.height=defaultTableTRHeight+'px';
  newcell.colSpan=2;
   
  $('#actionsdiv').append(tbl_); 
  var heightTableDescr=$(tbl_).height();
  var div,div1,div2,div3,div4;
  var heightLowCell=0;
  //heightTableDescr=heightTableDescr+$(a1).height()-10;// учли нижний мотуль
  heightTableDescr=heightTableDescr+10;// учли нижний мотуль
   
  var maxHeight=$('#actionsdiv').height()-(heightTableDescr)-(2*maxLevel)-defaultTableMargin-(defaultDivHeight+defaultIndent)-$("#infoimg_0").height();  // 24 бывшая кнопка сворачивания
  var countDivLevel=parseInt((maxHeight/maxLevel)/(defaultIndent+defaultDivHeight+defaultDivBorder*2)); //к-во дивов в одном блоке
  var countAllDiv=maxLevel*countDivLevel; //общее количество дивоов в столбце
  for (i=0; i<arrRateCol.length; i++){
   arrRateMaxCur[i]=countDivLevel*arrRateCol[i][2]; // для звезды
   if (arrRateCol[i][4]==0){
     arrRateMax[i]=maxLevel*countDivLevel; 
   }else{
     arrRateMax[i]=countDivLevel*(arrRateCol[i][4]-1)+parseInt(((100-arrRateCol[i][6])/100)*countDivLevel); //  для полосок
   }  
  }
  
  var div=document.createElement('div');
  var cur_level=0;
  if (arrRateCol[ColNum][4]>0) {
    cur_level=arrRateCol[ColNum][4]-1;
  } 
  $(div).addClass('tooltip');
  $(div).tooltipster({
             content: $('<ul  class="fin-info-div-tooltip" >'+
                   '<li class=\'rateleveldescrnew\'>Ваш текущий Пакет Скидок по итогам прошлого месяца - <span  class=\'rateleveldescrnewspanlevel\'>'+arrRateCol[ColNum][2]+'</span> (оборот > <span  class=\'rateleveldescrnewspansum\'>'+arrRateCol[ColNum][3]+'</span>)'+
                   '<li class=\'rateleveldescrnew\'>Оборот текущего месяца - <span  class=\'rateleveldescrnewspansum\'>'+arrRateCol[ColNum][7]+'</span>, соответствует уровню <span  class=\'rateleveldescrnewspanlevel\'>'+cur_level+'</span>'+
                   '<li class=\'rateleveldescrnew\'>До следующего уровня нужно набрать <span  class=\'rateleveldescrnewspansum\'>'+(arrRateCol[ColNum][5]-arrRateCol[ColNum][7])+'</span>'+
                '</ul>')
            });

   var curBottomValue=heightTableDescr+defaultTableMargin;   //текущее значение отступа от низа
   $(div).css('position','absolute').css('bottom',curBottomValue+'px'). css('width',$('#actionsdiv').width()/2)
   .css('height',(countAllDiv+1)*(defaultDivHeight+ defaultIndent+defaultDivBorder*2)+countDivLevel*levelIndent).css('left',margintable-3+'px').css('z-index','30');
   div.setAttribute('id','infodiv_0');
   $('#actionsdiv').append(div);
   //$(div).tooltipster();

 
  // рисуем заполненные прямоугольники
  var j=ColNum;
  for (i=1; i<=countAllDiv; i++){
    div=document.createElement('div');
    $('#actionsdiv').append(div);
    div1=document.createElement('div');//вложенный див
    $('#actionsdiv').append(div1);
    $(div).addClass('rateemptydiv');
    $(div1).addClass('ratedeepdiv');
    $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+'px').css('bottom', curBottomValue+'px');
    if (i<=arrRateMax[j]){
       $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','1');
    }
    else{
      $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
    }
    if (i%countDivLevel==0) {
      curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2)+2; 
    }
    else{
      curBottomValue+=(defaultIndent+defaultDivHeight+defaultDivBorder*2); 
    }
  }
  div=document.createElement('div');
  $('#actionsdiv').append(div);
  div1=document.createElement('div');//вложенный див
  $('#actionsdiv').append(div1);
  $(div).addClass('rateemptydiv');
  $(div1).addClass('ratedeepdiv');
  $(div).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+'px').css('bottom', curBottomValue+'px');
  if (arrRateCol[j][4]==0){
    $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','1');
  }
  else{
    $(div1).css('width',defaultDivWidth).css('height', defaultDivHeight).css('left',margintable+1+'px').css('bottom', curBottomValue+1+'px').css('opacity','0');
  }
      
  
  
  var curHeightLine,curLeftLine;// высота полоски с треугольником, отступ ее же
  var heightRateMax;  //значение текущей достигнеутой высоты для столдца  
  var heightRateMaxCur;  //значение текущей достигнеутой высоты для звезды  
  var flag;
  if (arrRateMaxCur[j] !=0){
    heightRateMaxCur=defaultTableMargin+heightTableDescr+arrRateMaxCur[j]*(defaultIndent+defaultDivHeight+defaultDivBorder*2); //для звезды
     flag=0;
  }
  else{
    flag=1;
  }
  heightRateMax=defaultTableMargin+heightTableDescr+arrRateMax[j]*(defaultIndent+defaultDivHeight+defaultDivBorder*2)+(2*parseInt(arrRateMax[j]/countDivLevel)); //для полосок
  for (i=1; i<=maxLevel; i++){ //расставляет метки
     div=document.createElement('div');
     $('#actionsdiv').append(div);
     div1=document.createElement('div');//див для цифр
     div2=document.createElement('div');//звезда
     div1.innerHTML=i;
     curHeightLine=defaultTableMargin+heightTableDescr+(i*(defaultIndent+defaultDivHeight+defaultDivBorder*2)*countDivLevel)+((i-1)*2);
     if (curHeightLine<heightRateMax){
       $(div).addClass('ratelevel blue');
       $(div1).addClass('levelnumbercurrent');
       if (i !=maxLevel){
         $('#actionsdiv').append(div1);
       }  
     }
     else{
       $(div1).addClass('levelnumber'); 
       $(div).addClass('ratelevel');
       $('#actionsdiv').append(div1);    
     }
     if ( ((curHeightLine==heightRateMaxCur) || (curHeightLine>heightRateMaxCur)) && (flag==0) ){
       $(div1).remove(); 
       $(div).addClass('ratelevelcurrent');
       flag++;
       $(div).removeClass('blue');
       $(div2).addClass('levelnumbertnext');
       $(div2).css('background-image','url("/images/starlevel.png")');
       $(div2).css('text-align','center');
       if (i>9){
         div2.innerHTML=i;
       }else{
          div2.innerHTML=i;
        }
       $('#actionsdiv').append(div2);   
     }
     curLeftLine=parseInt(margintable-0.2*defaultDivWidth);
     $(div).css('width',parseInt(defaultDivWidth*1.2)+'px').css('left',curLeftLine+'px').css('bottom',curHeightLine-1+'px');
     $(div1).css('left',curLeftLine-9+'px').css('bottom',curHeightLine+'px');
     $(div2).css('left',curLeftLine-16+'px').css('bottom',curHeightLine+'px');
   } 
   if (flag==0){
       $(div).addClass('ratelevelcurrent');
       $(div2).addClass('levelnumbertnext');
       $(div2).css('background-image','url("/images/star.png")');
       $(div2).css('text-align','center');
       if (i>9){
        div2.innerHTML=maxLevel;
       }else{
         div2.innerHTML=maxLevel;
       }
       $('#actionsdiv').append(div2);     
       $(div2).css('left',curLeftLine-16+'px').css('bottom',curHeightLine+'px');
     }
    
    left_block_expand=(getCookie1('left_block_expand').indexOf(0)==0)?0:1;
    checkColection.showrate=1;
 }   
}

function fillPodborWindow(sys){
  if (sys=='auto') {
    $("#selbymodeldivauto").addClass('currentdiv');
    if ($("#manuflistauto")[0].options.length<1){
     ecfull('getmanufacturerlist', 'selname=manuflistauto&sys=11', 'abj', 'post', false, '');
     ec('gettop10', 'id=-1&objdiv=autotop10', 'abj');
    }
  }
 if (sys=='moto') {
    $("#selbymodeldivauto").addClass('currentdiv');
    if ($("#manuflistmoto")[0].options.length<1){
      ecfull('getmanufacturerlist', 'selname=manuflistmoto&sys=12', 'abj', 'post', false, '');
      ec('gettop10', 'id=-1&objdiv=mototop10', 'abj'); 
    }
  }
  if (sys=='cv') {
    $("#selbymodeldivcv").addClass('currentdiv');
    if ($("#manuflistcv")[0].options.length<1){
      ecfull('getmanufacturerlist', 'selname=manuflistcv&sys=4', 'abj', 'post', false, '');
      ec('gettop10', 'id=-1&objdiv=cvtop10', 'abj'); 
    }
  }
if (sys=='ax') {
    $("#selbymodeldivax").addClass('currentdiv');
    if ($("#manuflistax")[0].options.length<1){
      ecfull('getmanufacturerlist', 'selname=manuflistax&sys=5', 'abj', 'post', false, '');
      ec('gettop10', 'id=-1&objdiv=axtop10', 'abj'); 
    }
  }
  if (sys=='engine') {
    $("#selbymodeldivauto").addClass('currentdiv');
    if ($("#manuflistautoengine")[0].options.length<1){
      ecfull('getmanufacturerlist', 'selname=manuflistautoengine&sys=31', 'abj', 'post', false, '');
      ec('gettop10', 'id=-1&objdiv=auentop10', 'abj');
    }
  }
}

function loadmodellinelist(list, tablename, modellinelistname, sys) {
  var tbl=$('#'+tablename)[0];
  $(tbl).empty();
  $('#'+modellinelistname).empty();
   if (list.value!=-1) ec("loadmodellinelist", "id="+list.value+"&select="+modellinelistname+"&sys="+sys,fnIfStr(flNewModeCGI,"newbj","abj"));
}

// загружает список моделей, но сначала чистит окошко
function loadmodelslist(list, tablename, sys) {
  var tbl=$('#'+tablename)[0];
  $(tbl).empty();
  //console.log(list);
  if (list.value!=-1) ec("loadmodellist", "id="+list.value+"&sys="+sys,fnIfStr(flNewModeCGI,"newbj","abj"));
}

function addmodelrowforselect(_id, _candel, _name, _vis, _top, _title, _objdiv, _treediv, _pref, _codeformotosite) {
  var row=tbl.insertRow(-1);

  row.id='modeltr'+_id;
  row.name=_id;
  row.className=(altrow?'tr-current':'tr-');
  //console.log(altrow);
  //console.log(row.className);
  row.onclick=function(){showmodtree(_id, _objdiv, _treediv, _pref);}
  altrow=!altrow;
  var newcell=row.insertCell(-1);
  newcell.className="col with-border";
  newcell.style.textAlign='left';
  if (_top) newcell.style.fontWeight='bold';

  var s='';

  if ((_pref=='sel_auto') || (_pref=='sel_cv') || (_pref=='sel_ax'))  {
    s+='<a class="find-zoom-img pointer" href="#" onclick="ec(\'loadmodeldatatext\', \'model='+_id+'\'); event.stopPropagation(); return false;"></a>';
    s+='<a href=# onclick="showmodtree('+_id+', \''+_objdiv+'\', \''+_treediv+'\', \''+_pref+'\'); event.stopPropagation(); return false;">'+_name+'</a>';
    newcell.innerHTML=s;

    newcell=row.insertCell(-1);
    newcell.className="col with-border";
    newcell.style.textAlign='left';
    if (_top) newcell.style.fontWeight='bold';
    newcell.innerHTML=_title;
   
    if ((_pref=='sel_auto') || !(_pref) || (_pref=='sel_cv')){
      newcell=row.insertCell(-1);
      newcell.className="col with-border";
      newcell.style.textAlign='center';
      if (_top) newcell.style.fontWeight='bold';
      newcell.innerHTML=power+' лс';
    
      if (tonna){
        newcell=row.insertCell(-1);
        newcell.className="col with-border";
        newcell.style.textAlign='center';
        newcell.innerHTML=tonna;
      }

      newcell=row.insertCell(-1);
      newcell.className="col";
      newcell.style.textAlign='left';
      if (_top) newcell.style.fontWeight='bold';
      newcell.innerHTML=engines;
    }
    if (_pref=='sel_ax'){
      newcell=row.insertCell(-1);
      newcell.className="col with-border";
      newcell.style.textAlign='center';
      if (_top) newcell.style.fontWeight='bold';
      newcell.innerHTML=power;
    
      newcell=row.insertCell(-1);
      newcell.className="col";
      newcell.style.textAlign='left';
      if (_top) newcell.style.fontWeight='bold';
      newcell.innerHTML=engines;
    }
  } else {
    if (_codeformotosite) {
      //s+='<a href="http://ride.ua/models/model/id/'+_codeformotosite+'" target=_blank title="Эта модель на сайте ride.ua"><img src="/images/rideico.png"></a>'
      s+='<img src="/images/tr.gif" style="width: 16px;">'
    } else (
      s+='<img src="/images/tr.gif" style="width: 16px;">'
    )
    s+=' <a href=# onclick="showmodtree('+_id+', \''+_objdiv+'\', \''+_treediv+'\', \''+_pref+'\'); event.stopPropagation(); return false;">'+_name+_title+'</a>';
    newcell.innerHTML=s;
  }

}

function zebratable(tbl) {
  $(tbl).find('tr:even').removeClass('debt-tr current');
  $(tbl).find('tr:odd').addClass('debt-tr current');
}


// рисует строку таблицы с двигателями
function drawenginesrow(Code, Name, Capacity, kW, HP, Cylinder) {
  var list=$("#listautoengine")[0];
  list.options[list.options.length]= new Option(Name+" . . . "+Capacity+' . . . '+kW+' . . . '+HP+' . . . '+Cylinder, Code, false, false);
}

// сворачивает/разворачивает ветку дерева
function UnHide( eThis ){
    var li =eThis.parentNode;
    //$(li).toggleClass('closed');
    //console.log(li);
    /*if( eThis.innerHTML.charCodeAt(0) == 9658 ){
        eThis.parentNode.parentNode.parentNode.className = 'sub-list';
    }else{
        if (eThis.parentNode.parentNode.parentNode.className !='tree-view'){
          eThis.parentNode.parentNode.parentNode.className = 'sub-list closed';
        }
    }*/
    return false;
}

function setViSibleDebtRate(){
 if ( $(".right-sidebar").length ){ 
  if ( !$(".right-sidebar").hasClass("hide") ){
    if ($('#debt-body').length){
      $(".right-sidebar").css("top",$('#debt-body').position().top+"px");
      if ($("#debt-tab-div").length){
       // $(".right-sidebar").css("height",$("#debt-tab-div").height()+140+"px");
      } else{
         // $(".right-sidebar").css("height",$("#debt").height()-60); 
      }
    }
    else{
      $(".right-sidebar").css("top",$('#debt-tab-div').position().top+"px");
      //$(".right-sidebar").css("height",$("#debt").height()-40);
    }
  
   showhiderate2(30,100);
  }
 }
}


function selbyattr() {
  vals=$("select[name^='attr']");
  var contrel=$("#contract");
  if (vals.length) {
    var s='';
    for (i=0; i<vals.length; i++) {
      if (vals[i].value !='0'){
        s+='&'+vals[i].name.substring(4)+'='+vals[i].value;
      }
    }
    if (s==''){jqswMessageError('Вы не выбрали ни одного значения');}
    else {
      ec('getwaresbyattr', s+"&forfirmid="+$("#forfirmid").val()+"&contract="+((contrel.length)?contrel.val():""), 'abj');
    }
  } else {
    jqswMessageError('Вы не выбрали ни одного значения');
  }
}

function drawattrseltitle() {
  var s='';
  var vals=$("select[name^='attr']");
  if (vals.length) {
    for (i=0; i<vals.length; i++) {
      if (vals[i].value !='0'){
        s+=((s)?', ':'');
        s+='<span class="vin-find-catalog-note">'+vals[i].parentNode.parentNode.firstChild.innerHTML+'</span>'+' - <span style="color: blue;">'+$(vals[i]).find('option[value='+vals[i].value+']').html()+'</span>';
      }  
    }
  }
  attributestr=s;
  $(".search-title").html('<span class="title">Результаты подбора по группе <span class="vin-find-catalog-note" style="">'+curmotoattrgroupname+' </span> по значениям: '+s);
}

//omf - OpenMessageForm
// открывает форму для отправки сообщения менеджеру.
function omf() {
  if (usermail) {
    var s='<div class="ware-info-text" id="email-text-div">';
    var s1=''; 
    var s2='';  
    if ($(".navigation-list.right li a.active").length){
      if ($(".navigation-list.right li a.active").attr("title")=='Финансовая информация'){
        s1='Вопрос со страницы '+$(".navigation-list.right li a.active").attr("title")+': '+$("#tabs ul li a.active").text();
      }
      else{
        s1='Вопрос со страницы '+$(".navigation-list.right li a.active").attr("title");
      }
    }else if ($(".navigation-list.left li a.active").length){
            s1='Вопрос со страницы '+$(".navigation-list.left li a.active").text();  
          }
          else{
            if ($('#ordernumh1').length) {
              s2=document.getElementById('ordernumh1').innerText;  
              s2=s2.substring(0,s2.indexOf(','));
              s1='Вопрос по документу '+s2;
            }
            else{
              s1='Вопрос по документу '+$("#specheader .ware-info-name-span").text();  
            }  
          } 
      
    s=s+'Ваше сообщение будет отправлено от имени <b>'+$(".user-name").text()
      +'</b>. Ответ будет направлен на Ваш email <b>'+usermail
      +'</b>.Если эта информация не является корректной, отправьте заявку на изменение данных либо обратитесь В Службу Поддержки';
    s=s+'<textarea class="login-input" id="messagetext" name=messagetext >'+s1+'</textarea>';
    var contrel=$("#contract");
    s=s+'<br><input type=button class="blue-btn btn" value="Отправить сообщение" onclick=\'ec("sm2m", $("#messagetext").serialize()+"&contract='+((contrel.length)?contrel.val():"")+'");\'>';
    s=s+'</div>';
    jqswfillInfo(s,"",5,0,20);
  } else {
  	jqswMessageError('Отправка сообщения невозможна - Вашего email нет в базе данных. Для внесения еmail в базу сообщите свои логин и email торговому представителю Компании.');
    location.href=scriptname+"/options?tab=optionpersondatadiv";
  } 
}

function remindpass() {
  var el=$('#autdiv_ord input[name^="psw"]');
  if (el.length) res=el[0].value;
  jPrompt('Введите логин или e-mail для напоминания пароля', '', 'Ок','Отмена',function get(res){
    if (res){  
      ec('remindpass', 'login='+res, "nabj");
    }
  });
}

function setActiveIcon(elem){
 $(".navigation-list.left li a").removeClass('active');
 $(".navigation-list.right li a").removeClass('active');
 $(".navigation-list."+elem).addClass('active');
}

function sendchangesdataorder() {
  var tbl=$('#changedataordertable')[0];
  if (tbl.rows.length<3) {
    jqswMessageError('Отправка пустого набора изменений не имеет смысла');
    return false;
  } 
  if (($('.emailcell').length-$(tbl).find('[emailcounter^="emaildel"]').length+$(tbl).find('[emailcounter^="emailadd"]').length)<1) {
    jqswMessageError('В данных должен присутствовать хотя бы один email');
    return false;
  }
  
  if (($('.phonecell').length-$(tbl).find('[emailcounter^="phonedel"]').length+$(tbl).find('[emailcounter^="phoneadd"]').length)<1) {
    jqswMessageError('В данных должен присутствовать хотя бы один телефон');
    return false;
  }
  var data='tablename=changedataordertable';
  for (var i=0; i<(tbl.rows.length-2); i++) {
    if (tbl.rows[i+1].cells[0].childNodes.length>1){
     data+='&part'+i+'='+'Добавить номер телефона'+tbl.rows[i+1].cells[0].childNodes[1].innerHTML; 
    }
    else{
     data+='&part'+i+'='+tbl.rows[i+1].cells[0].innerHTML;    
    }
  } 
  //console.log(data);
  ec('sendorderforchangepersondata', data, 'abj');
}

function check_reg_form_Uber(form) {
      if (document.getElementById('client-uber2').checked){
        el=document.getElementById('firm');
        el.value=mtrim(el.value);
	      if (!el.value) {
	      	 jqswMessageError('Вы не указали название организации.');
	      	 el.focus();
           setTimeout(function (){
              $("#jqdialog").parent().css("top","90%");
           }, 300);
 	      	 return false;
	      }

       el=document.getElementById('region-sort');
       el.value=mtrim(el.value);
 	      if (!parseInt(el.value)) {
	      	 jqswMessageError('Вы не указали регион.');
	      	 el.focus();
           setTimeout(function (){
             $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }

       el=document.getElementById('fio');
       el.value=mtrim(el.value);
	      if (!el.value) {
	      	 jqswMessageError('Вы не указали ФИО Главного пользователя.');
	      	 el.focus();
           setTimeout(function (){
             $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }

       el=document.getElementById('fpost');
       el.value=mtrim(el.value);
	      if (!el.value) {
	      	 jqswMessageError('Вы не указали должность Главного пользователя.');
	      	 el.focus();
           setTimeout(function (){
             $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }

       el=document.getElementById('login');
       el.value=mtrim(el.value);
	      if (!el.value) {
	      	 jqswMessageError('Вы не указали желаемый логин.');
	      	 el.focus();
           setTimeout(function (){
              $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }

       //if (document.getElementById('client2').checked) {
         el=document.getElementById('city');
         el.value=mtrim(el.value);
      	  if (!el.value) {
      	  	 jqswMessageError('Вы не указали город/ПГТ.');
      	  	 el.focus();
             setTimeout(function (){
                $("#jqdialog").parent().css("top","90%");
             }, 300);
      	  	 return false;
      	  }
      
         el=document.getElementById('address');
         el.value=mtrim(el.value);
          if (!el.value) {
             jqswMessageError('не указали адрес.');
             el.focus();
             setTimeout(function (){
                $("#jqdialog").parent().css("top","90%");
             }, 300);
             return false;
          }

         el=document.getElementById('phones');
         el.value=mtrim(el.value);
      	  if (!el.value) {
      	  	 jqswMessageError('Вы не указали телефоны.');
      	  	 el.focus();
             setTimeout(function (){
                $("#jqdialog").parent().css("top","90%");
             }, 300);
      	  	 return false;
      	  }

         el=document.getElementById('email');
         el.value=mtrim(el.value);
      	  if (!el.value) {
      	  	 jqswMessageError('Вы не указали email.');
      	  	 el.focus();
             setTimeout(function (){
                $("#jqdialog").parent().css("top","90%");
             }, 300);
      	  	 return false;
      	  }
      }
      if (document.getElementById('client-uber1').checked){
        el=document.getElementById('number-card-uber');
        el.value=mtrim(el.value);
	      if (!el.value) {
	      	 jqswMessageError('Вы не указали Номер карты UBER.');
	      	 el.focus();
           setTimeout(function (){
              $("#jqdialog").parent().css("top","90%");
           }, 300);
 	      	 return false;
	      }

        el=document.getElementById('fio-user-uber');
        el.value=mtrim(el.value);
 	      if (!el.value) {
	      	 jqswMessageError('Вы не указали ФИО.');
	      	 el.focus();
           setTimeout(function (){
             $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }

        el=document.getElementById('email-user-uber');
        el.value=mtrim(el.value);
	      if (!el.value) {
	      	 jqswMessageError('Вы не указали E-mail.');
	      	 el.focus();
           setTimeout(function (){
             $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }

        el=document.getElementById('tel-user-uber');
        el.value=mtrim(el.value);
	      if (!el.value) {
	      	 jqswMessageError('Вы не указали Телефон.');
	      	 el.focus();
           setTimeout(function (){
             $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }

        el=document.getElementById('region-uber-sort');
	      if (el.value==0) {
	      	 jqswMessageError('Вы не указали Город.');
	      	 el.focus();
           setTimeout(function (){
              $("#jqdialog").parent().css("top","90%");
           }, 300);
	      	 return false;
	      }
      }
	sfba($("#registrform"), 'nabj');
}

function check_reg_form(form) {
  el=document.getElementById('firm');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали название организации.');
     el.focus();
     setTimeout(function (){
        $("#jqdialog").parent().css("top","90%");
     }, 300);
     return false;
  }

  el=document.getElementById('region-sort');
  el.value=mtrim(el.value);
  if (!parseInt(el.value)) {
     jqswMessageError('Вы не указали регион.');
     el.focus();
     setTimeout(function (){
       $("#jqdialog").parent().css("top","90%");
     }, 300);
     return false;
  }

  el=document.getElementById('fio');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали ФИО Главного пользователя.');
     el.focus();
     setTimeout(function (){
       $("#jqdialog").parent().css("top","90%");
     }, 300);
     return false;
  }

  el=document.getElementById('fpost');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали должность Главного пользователя.');
     el.focus();
     setTimeout(function (){
       $("#jqdialog").parent().css("top","90%");
     }, 300);
     return false;
  }

  el=document.getElementById('login');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали желаемый логин.');
     el.focus();
     setTimeout(function (){
        $("#jqdialog").parent().css("top","90%");
     }, 300);
     return false;
  }

 //if (document.getElementById('client2').checked) {
    el=document.getElementById('city');
    el.value=mtrim(el.value);
    if (!el.value) {
       jqswMessageError('Вы не указали город/ПГТ.');
       el.focus();
       setTimeout(function (){
          $("#jqdialog").parent().css("top","90%");
       }, 300);
       return false;
    }

    el=document.getElementById('address');
    el.value=mtrim(el.value);
    if (!el.value) {
       jqswMessageError('не указали адрес.');
       el.focus();
       setTimeout(function (){
          $("#jqdialog").parent().css("top","90%");
       }, 300);
       return false;
    }

    el=document.getElementById('phones');
    el.value=mtrim(el.value);
    if (!el.value) {
       jqswMessageError('Вы не указали телефоны.');
       el.focus();
       setTimeout(function (){
          $("#jqdialog").parent().css("top","90%");
       }, 300);
       return false;
    }

    el=document.getElementById('email');
    el.value=mtrim(el.value);
    if (!el.value) {
       jqswMessageError('Вы не указали email.');
       el.focus();
       setTimeout(function (){
          $("#jqdialog").parent().css("top","90%");
       }, 300);
       return false;
    } 
  sfba($("#registrform"), 'nabj');
}

function dwsth_(CurName) {
  $(".search-header-table span.cost,retail").text('Розн., '+CurName);
  $(".search-header-table span.cost.wholesale").text("Вход., "+CurName);
}

// сохраняет значение текущей сортировки и перезагружает страницу
function set_sort(nam, val) {
  setCookie_(nam, val, getExpDate_(360,0,0),'/',0,0);
  location.replace(location.href);
}

function call_linefromsearchtoorder(WareCode,Waredivis,ContractId){ //добавляет товар в заказ из рез. поиска и из результатов сравнения
  if ($('#addlines', top.document).length) { 
    if ($('#addlines', top.document).attr('value')) {
      ec("linefromsearchtoorder", "ordr="+$("#addlines", top.document).attr('value')+'&warecode='+WareCode+'&wareqty='+Waredivis+'&inline=false&contract='+ContractId);
    } 
    else {
      ec('getlistopenorders', 'ordr='+$('#addlines', top.document).attr('value')+'&warecode='+WareCode+'&wareqty='+Waredivis+'&inline=false&contract='+ContractId+'&dialogname=jqdialog','newbj');
    }
  }
}

//делает одинаковыми по ширине колонки таблицы-заголовка и таблицы-содержимого
function synqcols(source, header, content, contentwidth, first20,FirstRowWidth) {
  if (source==null){
    return false;
  }
  var d=parseInt($(header).css('margin-left'));
	contentwidth-=(isNaN(d)?0:d);
  source.style.width=contentwidth+'px';

  newrow = source.insertRow(-1);
  for (i=0; i<header.rows[0].cells.length; i++) {
  	  newCell=newrow.insertCell(-1);
  	  newCell.innerHTML=header.rows[0].cells[i].innerHTML;
  }

  for (j=0; j<content.rows.length; j++) {
  newrow = source.insertRow(-1);
    for (i=0; i<content.rows[j].cells.length; i++) {
    	  newCell=newrow.insertCell(-1);
    	  newCell.innerHTML=content.rows[j].cells[i].innerHTML;
    	  newCell.colSpan=content.rows[j].cells[i].colSpan;
    	  newCell.rowSpan=content.rows[j].cells[i].rowSpan;
    }
  }



  if (first20) {
    for (i=0; i<source.rows.length; i++) {
      if (FirstRowWidth !==undefined){
       source.rows[i].cells[0].style.width=FirstRowWidth+'px'; 
      }
      else{
        source.rows[i].cells[0].style.width='20px';
      }
    }
  }
  header.style.width='';
  content.style.width='';
  window.title=0;
  var totalwidth =0;
  var newtotalwidth =0;
  var newwidth =0;
  for (i=0; i<source.rows[0].cells.length; i++) {
  	totalwidth+=$(source.rows[0].cells[i]).outerWidth();
  }
  for (i=0; i<source.rows[0].cells.length; i++) {
  	if (i!=source.rows[0].cells.length) {
  	  newwidth=Math.round(($(source.rows[0].cells[i]).outerWidth()-3)*contentwidth/totalwidth);
   } else {
  	  newwidth=contentwidth-newtotalwidth;
   }
  	header.rows[0].cells[i].style.width=(newwidth)+((i==source.rows[0].cells.length-1)?16:0)+'px';
  	if (content.rows.length>0){
      if (i<content.rows[0].cells.length) {
        content.rows[0].cells[i].style.width=(newwidth)+'px';  
      }
    }  
    newtotalwidth+=newwidth;
  }

  content.style.width=(contentwidth)+'px';
  header.style.width=(contentwidth+16)+'px';
  while (source.rows[0]) source.deleteRow(0);
}

function sfcaa(checked) {
  document.getElementById("cbForming").checked=checked;
  document.getElementById("cbClosed").checked=checked;
  document.getElementById("cbProcessing").checked=checked;
  document.getElementById("cbAnulated").checked=checked;
  document.getElementById("cbAccepted").checked=checked;
}

function openInformationPage(actioncode){
  $("#tablecontentdiv ul.ui-tabs-nav").find('li:first a').trigger('click');
  el=document.getElementById("action"+actioncode);
  var firstid=$("#tablecontentdiv div#infodiv0 div.ui-accordion.ui-widget h3:first a").attr("id");
  if (firstid !=$(el).attr("id")){
    el.click();
  }
}

function openInformationPageAction(actionscode){
  //$("#news-link-a").trigger('click');
  var elems=$("div [catalog-name-data^='action-catalog'] h3 a");
  var i=1;
  elems.each(function (e) {
    if (actionscode==i){
      if (actionscode !=1)
        this.click();
    }
    i++;
  });
 }
 
 function openInformationPageNews(newscode){
   $("#news-link-a").trigger('click');
   var elems=$("div [catalog-name-data^='news'] h3 a");
   var i=1;
   elems.each(function (e) {
     if (newscode==i){
       if (newscode !=1)
         this.click();
     }
     i++;
   });
 
 }

function cal_check_date(target, showmessage) {
//  target=document.getElementById(target);
  res=false;
  //console.log("r"+target.value);
  TargetDate=new Date();
  if (target && target.value) {
    s=target.value;
    i=s.indexOf(".");
    d=s.substring(0, i);
    while (d.substring(0, 1)=='0') {
    	d=d.substring(1, 10);
    }
    d=parseInt(d);
    s=s.substring(i+1, 10);
    // сначала вычисляю день
    if (((i==1)||(i==2)) && (!isNaN(d)) && (d>0) && (d<32)) {
    // потом месяц
      i=s.indexOf(".");
      m=s.substring(0, i);
      while (m.substring(0, 1)=='0') {
      	m=m.substring(1, 10);
      }
      d=parseInt(d);
      s=s.substring(i+1, 10);
      if (((i==1)||(i==2)) && (!isNaN(m)) && (m>0) && (m<13)) {
      // потом год
        while (s.substring(0, 1)=='0') {
        	s=s.substring(1, 10)
        }
        y=parseInt(s);

        if (!isNaN(y) && (y<21)) { y=2000+y };
        if ((!isNaN(y)) && ((y>1900) && (y<2100))) {
          TargetDate=new Date(y, m-1, d);
          res=true;
        }
      }
    }
    if (!res && showmessage) {
      alert('Неверно введена дата - '+target.value);
      target.focused;
    }
  } else {
    res=(target && !target.value);
  }
  return res;
}

function setKindOfPrice(){
  if (getCookie1('kindofprice') !=null){
    if (getCookie1('kindofprice')=='1'){
      $("span.cost.wholesale").removeClass("hide");
      $("span.cost.retail").addClass("hide");  
    } 
    if (getCookie1('kindofprice')=='0'){
      $("span.cost.retail").removeClass("hide");
      $("span.cost.wholesale").addClass("hide");  
    } 
  }
  else{
    setCookie_('kindofprice','1', getExpDate_(365,0,0),'/',0,0); 
    $("span.cost.wholesale").removeClass("hide");
    $("span.cost.retail").addClass("hide");  
  } 
}

function setKindOfPriceMotul(){
  if (getCookie1('kindofprice') !=null){
    if (getCookie1('kindofprice')=='1'){
      $('table#motul-podbor-table-header .wholesale').removeClass("hide");
      $('table#motul-podbor-table-header .retail').addClass("hide");  
      $('table.podbor-motul-info-grup-table .wholesale').removeClass("hide");
      $('table.podbor-motul-info-grup-table .retail').addClass("hide");  
    } 
    if (getCookie1('kindofprice')=='0'){
      $('table#motul-podbor-table-header .wholesale').addClass("hide");
      $('table#motul-podbor-table-header .retail').removeClass("hide");  
      $('table.podbor-motul-info-grup-table .retail').removeClass("hide");
      $('table.podbor-motul-info-grup-table .wholesale').addClass("hide");  
    } 
  }
  else{
    setCookie_('kindofprice','1', getExpDate_(365,0,0),'/',0,0);  
    $('table#motul-podbor-table-header .wholesale').removeClass("hide");
    $('table#motul-podbor-table-header .retail').addClass("hide");  
    $('table.podbor-motul-info-grup-table .wholesale').removeClass("hide");
    $('table.podbor-motul-info-grup-table .retail').addClass("hide");  
  }
}

/*function setKindOfPriceWareInfo(){
  if (getCookie1('kindofprice') !=null){
    if (getCookie1('kindofprice')=='1'){
      $('span.price-info-header-span .wholesale').removeClass("hide");
      $('span.price-info-header-span .retail').addClass("hide");  
      $('span.price-info-cost-span .wholesale').removeClass("hide");
      $('span.price-info-cost-span .retail').addClass("hide"); 
      if (!("#motul-podbor-tree").hasClass('hide')){
        $('table#motul-podbor-table-header .wholesale').removeClass("hide");
        $('table#motul-podbor-table-header .retail').addClass("hide");  
        $('table.podbor-motul-info-grup-table .wholesale').removeClass("hide");
        $('table.podbor-motul-info-grup-table .retail').addClass("hide");  
      }
    } 
    if (getCookie1('kindofprice')=='0'){
      $('span.price-info-header-span .wholesale').addClass("hide");
      $('span.price-info-header-span .retail').removeClass("hide");  
      $('span.price-info-cost-span .retail').removeClass("hide");
      $('span.price-info-cost-span .wholesale').addClass("hide");  
      if (!("#motul-podbor-tree").hasClass('hide')){
        $('table#motul-podbor-table-header .wholesale').addClass("hide");
        $('table#motul-podbor-table-header .retail').removeClass("hide");  
        $('table.podbor-motul-info-grup-table .retail').removeClass("hide");
        $('table.podbor-motul-info-grup-table .wholesale').addClass("hide");  
      }
    } 
  }
  else{
    setCookie_('kindofprice','1', getExpDate_(365,0,0),'/',0,0);  
    $('span.price-info-header-span .wholesale').removeClass("hide");
    $('span.price-info-header-span .retail').addClass("hide");  
    $('span.price-info-cost-span .wholesale').removeClass("hide");
    $('span.price-info-cost-span .retail').addClass("hide");
    if (!("#motul-podbor-tree").hasClass('hide')){
      $('table#motul-podbor-table-header .wholesale').removeClass("hide");
      $('table#motul-podbor-table-header .retail').addClass("hide");  
      $('table.podbor-motul-info-grup-table .wholesale').removeClass("hide");
      $('table.podbor-motul-info-grup-table .retail').addClass("hide");  
    }
    if (!("#search-result").hasClass('hide')){
      $('table#motul-podbor-table-header .wholesale').removeClass("hide");
      $('table#motul-podbor-table-header .retail').addClass("hide");  
      $('table.podbor-motul-info-grup-table .wholesale').removeClass("hide");
      $('table.podbor-motul-info-grup-table .retail').addClass("hide");  
    }
  }
}*/


function checkListWaresForFind(){
  var MaxSpanTitleWidth=$("#search-table td.col-discription span").width();
  var RealSpanTitleWidth=$("#search-table").width()-565-$("#search-table td.col-companis-logo").width();
  //console.log(MaxSpanTitleWidth);
  //console.log(RealSpanTitleWidth);
  if (MaxSpanTitleWidth>RealSpanTitleWidth){
    $("#search-table td.col-discription span.title").css("width",RealSpanTitleWidth+"px");
    $("#search-table td.col-discription").css("width",RealSpanTitleWidth+50+"px");
    $("#search-table td.col-discription").css("width",RealSpanTitleWidth+50+"px");
  }
  $("#search-table td.col-discription p.discription").css("max-width",RealSpanTitleWidth-30+"px");
}

function ResizeSVK(){
 if ($("#orders-tree-tabs").length){
    $("#orders-table-body").width($("#neworderform").width());
    synqcols(document.getElementById('tablecontent2'), document.getElementById('orders-table-header'), document.getElementById('orders-table-body'), $("#orders-table-body").width(), false); 
  }
}

function BlockedDeliveryForUber(){
  if (IsUberClient) {
    var el=document.getElementById("getting2");
    if (!el.checked) { 
      document.getElementById("getting2").click();
    //document.getElementById("client-uber2").click();
    };
    document.getElementById("getting1").disabled=true;
    document.getElementById("getting3").disabled=true;
  } else{
    document.getElementById("getting1").disabled=false;
    document.getElementById("getting3").disabled=false;
  }
}

function setPositionbjauthdivDialog() {
  $('#bjauthdiv').parent().css("left","40%").css("top","30%").css("width","500px");
  clearTimeout(bjauthdivDialogId);
} 

function setFilterMotul(elem){
  if ($(elem).hasClass('cl')) {
    $("div#gift-body ul li[_warebrandcode!='58']").removeClass('hide');
    $("p.available-motul.cl").attr("title","Купить MOTUL за unit");
    $("p.available-motul a").attr("title","Купить MOTUL за unit");
    $("p.available-motul img").attr("title","Купить MOTUL за unit");
  }
  else{
    $("div#gift-body ul li[_warebrandcode^='58']").removeClass('hide');
    $("div#gift-body ul li[_warebrandcode!='58']").addClass('hide');
    $("p.available-motul").attr("title","Показать все подарки");
    $("p.available-motul a").attr("title","Показать все подарки");
    $("p.available-motul img").attr("title","Показать все подарки");
    var arr=$('.selectpicker').selectpicker('val');
    if (arr !=null){
      arr.remove('3');
      arr.remove('4');
      $('.selectpicker').selectpicker('val',arr);
      ArrChoiceValFilter=arr;
    }
  }  
  $(elem).toggleClass('cl');
}


function setOrderClientInfoSpanWidth(){  //в просмотре заказа выровнять по ширине справа спаны
  var maxSpanWidth=$("div.order-header div.col-xs-7 span.data:first").width();
  $("div.order-header div.col-xs-7 span.data").each(function(i,elem) {
    if (maxSpanWidth<$(this).width()){
      maxSpanWidth=$(this).width();
    }  
  }); 
  $("div.order-header div.col-xs-7 span.data").width(maxSpanWidth+"px");
}

Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}

function addButtonMotul(_pref,_modelname,_modelid,_nodeid,_contract){
 var li=document.createElement("LI");
 var ul=document.getElementById(_pref+"_ul_0");
 var s1=''
 s1+='<div class="podbor-by-motul">';
 s1+=' <p class="podbor-motul" onmouseover="$(\'p.podbor-motul a\').css(\'color\',\'#ffffff\');" onmouseout="$(\'p.podbor-motul a\').css(\'color\',\'\');" '+
 'onclick="showAllPodborMotul(\''+_modelname+'\','+_modelid+','+_nodeid+','+_contract+')" title="">';
 s1+='  <a class="podbor-motul" href="#" title="" style="">Подобрать</a>';
 s1+='  <img title="" onmouseover="$(\'p.podbor-motul a\').css(\'color\',\'#ffffff\');" onmouseout="$(\'p.podbor-motul a\').css(\'color\',\'\');" src="/images/motul-55x15.jpg" alt="motul-55x15" height="15" width="55">';
 s1+=' </p>';
 s1+='</div>';
 li.innerHTML=s1;
 $(li).addClass('motul');
 li.id=_pref+"_li_motul";
 ul.appendChild(li);
 return true;
}

function showAllPodborMotul(_modelname,_modelid,_nodeid,_contract){
  ec('getnodewaresmotul', 'node='+_nodeid+'&modelname="'+_modelname+'"&model='+_modelid+'&contract='+_contract+'', 'newbj');
}

function createPodborMotulTableHeader(){
  if (arrPodborMotul.length){
    $("#motul-model-header-text").html('<span onclick="ec(\'loadmodeldatatext\', \'model='+arrPodborMotul[arrPodborMotul.length-1].ModelCode+'\', \'abj\');"><b>'+arrPodborMotul[arrPodborMotul.length-1].ModelName+'</b></span>');
  }
  var tbl=document.getElementById("motul-podbor-table-header");
  tbody = $(tbl).find('tbody')[0];
  $(tbody).empty(); 
  var row;
  var newcell;
  row=tbl.insertRow(-1);
  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col');

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border compare');
  //newcell.colSpan=2;
  newcell.innerHTML='<div style="text-align: center;"><button id="compare-btn-motul" class="compare-btn pointer"'+ 
                  'onclick="warecompareMotul(this);" title=" ">Сравнить'+
                  '</button></div>';

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border cost');
  newcell.innerHTML='<button class="slider-btn left show-retail" type="button" name="button"></button>'+
                  '<span class="cost retail hide">Розн., '+arrPodborMotul[arrPodborMotul.length-1].CurencyName+'</span>'+
                  '<span class="cost wholesale">Вход., '+arrPodborMotul[arrPodborMotul.length-1].CurencyName+'</span>'+
                  '<button class="slider-btn right show-wholesale" type="button" name="button"></button>';

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border cost');
  newcell.innerHTML='Цена за литр, '+arrPodborMotul[arrPodborMotul.length-1].CurencyName;

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border type');

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col with-border qv');
  newcell.innerHTML='Количество'

  newcell=row.insertCell(-1);
  $(newcell).toggleClass('col');
}

function loadPodborMotulIcon(){
  /*if (arrPodborMotul.length){
    var li;
    var a1;
    var ul=document.getElementById("motul-podbor-list-icon");
    $(ul).empty();
    li=document.createElement("LI");
    a1=document.createElement('a');
    a1.href='#';
    $(a1).css('cursor','pointer');
    a1.setAttribute('class','motul-podbor-icon');
    $(a1).css("background-image", "url(/PodborMotulIcon/ALL.png)");
    $(a1).attr("title","Все узлы");
    $(a1).attr("_code",0);
    $(a1).attr("_i",0);
    $(li).append(a1); 
    ul.appendChild(li);
    $(a1).bind('click', function(event) {
      callPodborMotulIconFunc("ALL");
    });
    for (i=0; i<arrPodborMotul[arrPodborMotul.length-1].IconNames.length; i++) {
      li=document.createElement("LI");
      a1=document.createElement('a');
      a1.href='#';
      $(a1).css('cursor','pointer');
      a1.setAttribute('class','motul-podbor-icon');
      $(a1).css("background-image", "url(/PodborMotulIcon/"+arrPodborMotul[arrPodborMotul.length-1].IconNames[i].Code+".png)");
      $(a1).attr("title",arrPodborMotul[arrPodborMotul.length-1].IconNames[i].Hint);
      $(a1).attr("_code",arrPodborMotul[arrPodborMotul.length-1].IconNames[i].Code);
      $(a1).attr("_i",i);
      $(li).append(a1); 
      ul.appendChild(li);
      $(a1).bind('click', function(event) {
        callPodborMotulIconFunc($(this).attr("_i"));
      });
    }
    if (arrPodborMotul[arrPodborMotul.length-1].CurrentNode>=0){
      $("div#motul-model-icon-div a[_code='"+arrPodborMotul[arrPodborMotul.length-1].CurrentNode+"']").css("box-shadow","0 0 5px 5px #333");
    }
    else{
      $("div#motul-model-icon-div a[_code='"+arrPodborMotul[arrPodborMotul.length-1].MainTableData[0].NodeID+"']").css("box-shadow","0 0 5px 5px #333");
    }
  }*/
  if (arrPodborMotul.length){
    var li;
    var img1;
    var ul=document.getElementById("motul-podbor-list-icon");
    $(ul).empty();
    li=document.createElement("LI");
    img1=document.createElement('img');
    $(img1).css('cursor','pointer');
    img1.setAttribute('class','motul-podbor-icon');
    img1.src=descrimageurl+"/PodborMotulIcon/ALL.jpg";
    $(img1).attr("title","Все узлы");
    $(img1).attr("_code",0);
    $(img1).attr("_i",0);
    $(li).append(img1); 
    ul.appendChild(li);
    $(img1).bind('click', function(event) {
      callPodborMotulIconFunc("ALL");
    });
    for (i=0; i<arrPodborMotul[arrPodborMotul.length-1].IconNames.length; i++) {
      li=document.createElement("LI");
      img1=document.createElement('img');
      $(img1).css('cursor','pointer');
      $(img1).css('cursor','pointer');
      img1.setAttribute('class','motul-podbor-icon');
      img1.src=descrimageurl+"/PodborMotulIcon/"+arrPodborMotul[arrPodborMotul.length-1].IconNames[i].Code+".jpg"
      $(img1).attr("title",arrPodborMotul[arrPodborMotul.length-1].IconNames[i].Hint);
      $(img1).attr("_code",arrPodborMotul[arrPodborMotul.length-1].IconNames[i].Code);
      $(img1).attr("_i",i);
      $(li).append(img1); 
      ul.appendChild(li);
      $(img1).bind('click', function(event) {
        callPodborMotulIconFunc($(this).attr("_i"));
      });
    }
    if (arrPodborMotul[arrPodborMotul.length-1].CurrentNode>=0){
       $("div#motul-model-icon-div img[_code='"+arrPodborMotul[arrPodborMotul.length-1].CurrentNode+"']").css("box-shadow","0 0 5px 5px #333").css("opacity","1");
     }
    else{
       $("div#motul-model-icon-div img[_code='"+arrPodborMotul[arrPodborMotul.length-1].MainTableData[0].NodeID+"']").css("box-shadow","0 0 5px 5px #333").css("opacity","1");
     }
  }
}

function callPodborMotulIconFunc(z){
  if (z =='ALL'){
    ec('getnodewaresmotul', 'node=0&model='+arrPodborMotul[arrPodborMotul.length-1].ModelCode+'&contract='+arrPodborMotul[arrPodborMotul.length-1].Contract+'', 'newbj');
  }
  else{
    ec('getnodewaresmotul', 'node='+arrPodborMotul[arrPodborMotul.length-1].IconNames[z].Code+'&model='+arrPodborMotul[arrPodborMotul.length-1].ModelCode+'&contract='+arrPodborMotul[arrPodborMotul.length-1].Contract+'', 'newbj');
  }
} 

function callPodborMotulLitleIconFunc(z){
   ec('getnodewaresmotul', 'node='+z+'&model='+arrPodborMotul[arrPodborMotul.length-1].ModelCode+'&contract='+arrPodborMotul[arrPodborMotul.length-1].Contract+'', 'newbj');
} 


function loadPodborMotulData(){
  $("#motul-podbor-tree").removeClass('hide');
  var tbl=document.getElementById("motul-podbor-table-body");
  var tbody = $(tbl).find('tbody')[0];
  $(tbody).empty(); 
  var row,rowGrp;
  var newcell,newcellGrp;
  var tblInfoGrp;
  var s3,s4;
  for (i=0; i<arrPodborMotul[arrPodborMotul.length-1].MainTableData.length; i++) {
    row=tbl.insertRow(-1);//основная картинка
    newcell=row.insertCell(-1);
    $(newcell).addClass('col');
    newcell.innerHTML='<img class="ware-image-podbor-motul" src="data:image/'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].ImageExt+';base64,'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].Image+'" '+
    //'style=" width: '+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].Width+'px; height: '+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].Height+'px;">';
    '>';
    tblInfoGrp=document.createElement('table');
    $(tblInfoGrp).addClass("podbor-motul-info-grup-table");
    $(tblInfoGrp).css("border-spacing","5px 10px");
    rowGrp=tblInfoGrp.insertRow(-1);
    newcellGrp=rowGrp.insertCell(-1);
    newcellGrp.innerHTML='<img onclick="callPodborMotulLitleIconFunc('+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].NodeID+');" title="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].NodeHint+'" src="'+descrimageurl+'/PodborMotulIcon/'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].NodeID+'.jpg" style=" '+
                    'max-height: 20px;max-width: 20px; cursor: pointer;">'; 
    newcellGrp=rowGrp.insertCell(-1);
    newcellGrp.innerHTML='<span style="color: #303030;"><b>'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineName+'</b></span> '; 
    newcellGrp.colSpan=2;
    newcellGrp=rowGrp.insertCell(-1);
    newcellGrp.innerHTML='<span style="color: #2c80c9;">'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineComm+' </span> '; 
    $(newcellGrp).css("text-align","right");
    newcellGrp.colSpan=7;
    rowGrp=tblInfoGrp.insertRow(-1);
    newcellGrp=rowGrp.insertCell(-1);
    
    if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineLitr !=''){
      s3='<span style="color: #303030;"><b>Объем заливки - '+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineLitr+'</b></span> ';
    }
    else{
      s3='';
    }     
    s3+='<span class="discription" id="product-id-'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[0].WareCode+'"  style="max-width: 491px;">';
    if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineiHint !=''){
      s3=s3+   '<div class="nodedescr tooltip tooltipstered" _bonus="false">i</div>';
    }
    else{
      s3=s3+   '';
    }
    s3=s3+ '</span>';   
    newcellGrp.innerHTML=s3;
    $(newcellGrp).css("text-align","left");
    newcellGrp.colSpan=11;
    for (j=0; j<arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData.length; j++) {
      rowGrp=tblInfoGrp.insertRow(-1);
      newcellGrp=rowGrp.insertCell(-1);
      $(newcellGrp).toggleClass('col-checkbox compare');
      newcellGrp.innerHTML='<input type="checkbox" name="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].GroupCode+'" class="podbor-motul-checkbox" id="attrgr'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'" onclick="checkcomparebtnenabl_Motul(this);">'+
                    '<label for="attrgr'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'"></label>';
      newcellGrp=rowGrp.insertCell(-1);
     var modelid=($('#modelnodesearch_model').length?'&model='+$('#modelnodesearch_model').attr('_code'):'&model=');
     var nodeid=($('#modelnodesearch_node').length?'&node='+$('#modelnodesearch_node').attr('_code'):'&node=');
     var engine=($('#modelnodesearch_engine').length?'&eng='+$('#modelnodesearch_engine').attr('_code'):'&eng=');
     var filterid=($('#modelnodesearch_filter').length?'&filter='+$('#modelnodesearch_filter').attr('_code'):'&filter=');
    
     s1='<a class="litr" _bonus="false" onclick="return viewWareSearchDialog(this);" href="'+descrurl+'/wareinfo?warecode='+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'&model='+arrPodborMotul[arrPodborMotul.length-1].ModelCode+'&node=-'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].NodeID+'&eng=&filter=&bonus=false">'
                          +'<span >'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].LitrCount+' л. </span> '
                          +'</a>';
      s1+='<span class="status stock">'  
        +((arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].IsSale)?'&nbsp;<a class=\'abANewAction\' title=\'Распродажа\' style=\'background-image: url('+descrimageurl+'/images/sal.png);\'></a>':'')
        +((arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].IsCutPrice)?'&nbsp;<a _bonus="false" onclick="return viewWareSearchDialog(this);" href="'+descrurl+fnIfStr(flNewModeCGI,'/Universal?act=wareinfo&?warecode=','/wareinfo?warecode=')+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+modelid+nodeid+engine+filterid+'&bonus=false" class=\'abANewAction \' title=\'Щелкните для просмотра\' style=\'background-image: url('+descrimageurl+'/images/catprice.png);\' ></a>':'')
        +((arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].IsNotReturn)?'&nbsp;<img align=top title=\'Возврату не подлежит\' src=\''+descrimageurl+'/images/denyback.png\'>':'');
      if (!IsUberClient){
          //s1+=((arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionCode>0)?'<a target="_blank" class="abANewAction tooltip" title="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionTitle+'" '+ ((arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionImage !='')?'style="background-image: url('+ActionImagePath+');"':'')+
        var imgpath=descrimageurl+'/app/actionicons/'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionCode+'.png';
        s1+=((arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionCode>0)?'<a target="_blank" class="abANewAction tooltip" title="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionTitle+'" '+ ((arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionCode>0)?'style="background-image: url('+imgpath+');"':'')+
          ' href="'+scriptname+'/info?actioncode='+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].ActionCode+'" ></a>':'');
      }
      
      s1+='</span>';
      newcellGrp.innerHTML=s1;
      

      $(newcellGrp).addClass('col compare');
      
      newcellGrp=rowGrp.insertCell(-1);
      newcellGrp.innerHTML='<span class="cost retail">'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Prices[0]+'</span>'+
                           '<span class="cost wholesale hide">'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Prices[1]+'</span>'; 
      $(newcellGrp).addClass('col with-border cost');
      newcellGrp=rowGrp.insertCell(-1);
      newcellGrp.innerHTML='<span class="cost litr retail">'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].PricesLitr[0]+'</span>'+
                           '<span class="cost litr wholesale hide">'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].PricesLitr[1]+'</span>'; 
      $(newcellGrp).addClass('col with-border cost');
 
      newcellGrp=rowGrp.insertCell(-1);
      $(newcellGrp).toggleClass('col-type');
      if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].IsAuto){ 
        newcellGrp.innerHTML='<span  class="type-auto" onclick="ec(\'showmodelswhereused\', \'wareid='+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'&systype=1\');"></span>';
      }
      
      newcellGrp=rowGrp.insertCell(-1);
      $(newcellGrp).toggleClass('col-type');
      if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].IsMoto){
        newcellGrp.innerHTML='<span class="type-moto"  onclick="ec(\'showmodelswhereused\', \'wareid='+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'&systype=2\');"></span>';
      } 
    
      newcellGrp=rowGrp.insertCell(-1);
      $(newcellGrp).toggleClass('col-type');
      if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].IsCV){ 
        newcellGrp.innerHTML='<span  class="type-cv" onclick="ec(\'showmodelswhereused\', \'wareid='+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'&systype=4\');"></span>';
      } 
    
      newcellGrp=rowGrp.insertCell(-1);
      $(newcellGrp).toggleClass('col-type');
      if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].IsAux){ 
       newcellGrp.innerHTML='<span  class="type-ax" onclick="ec(\'showmodelswhereused\', \'wareid='+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'&systype=5\');"></span>';
      } 
      
      s3='';
      s4='';
      switch (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Semafor){
        case 1: s3='yellow'; 
                s4='title="Доступен под заказ, проверяйте срок поставки в заказе"';
        case 3: s3='yellow-green'; 
                s4='title="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].yellow_greenHint+'"';
                break;
        case 2: s3='green'; 
                s4='title="Доступен сегодня"';
                break;
        case 0: s3='red';
                s4='title="Нет в наличии"';
                break;
        case -1: s3='no-cost';
               //s4='title="Нет в наличии"';
                break;
      }  
     
      newcellGrp=rowGrp.insertCell(-1);
      $(newcellGrp).toggleClass('col with-border qv');
      if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Prices[0] !='0,00') {
        newcellGrp.innerHTML='<span class="quantity-input green">'+
            '<input onkeyup="if(event.keyCode==13){ al_redisignEnter('+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+',this); }"  maxlength="5" onfocus="this.select();" type="text" value="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Divis+'">'+
            '</span>'+
            //'<a data-warecode="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'" data-qty="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Divis+'" title="Проверить наличие товара" class="check-ware-qv hide"></a>'; 
           '<button data-warecode="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'" data-qty="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Divis+'" title="Проверить наличие товара" class="check-ware-qv '+s3+' hide">Пр.</button>';
      }
      
      newcellGrp=rowGrp.insertCell(-1);
      $(newcellGrp).toggleClass('col to-order');
      if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Prices[0] !='0,00') {
          newcellGrp.innerHTML='<a litrag="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].LitrCount+'" warecode="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'" '+
        s4+' href="#" class="btn" onmouseout="cleanPodborMotulTitle(this);" onclick="al_redisignMotul($(this).children(\'span.product-order\').attr(\'data\'),this);" codeline="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].NodeID+'"  plinecode="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineCode+'">'+
                          '<span class="product-status '+s3+'" data-warecode="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'" data-qty="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].Divis+'"></span>'+
                          '<span class="product-order" data="'+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[j].WareCode+'">Заказать</span>'+
                          ' </a>';
      }

    }

    newcell=row.insertCell(-1); 
    $(newcell).addClass('col ');
    newcell.appendChild(tblInfoGrp);
  }
  
  for (i=0; i<arrPodborMotul[arrPodborMotul.length-1].MainTableData.length; i++) {
    if (arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineiHint !=''){
      $("#product-id-"+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].WaresTableData[0].WareCode+" div.nodedescr").tooltipster({
                position: "top",
                content: $("<span style=\'font-weight: bold;\'>"+arrPodborMotul[arrPodborMotul.length-1].MainTableData[i].PLineiHint+"</span>")
      });
    }
  }
  $("table.podbor-motul-info-grup-table td div.tooltip").tooltipster();
}

function resizePodborMotulHeaderTable(){
   var tbl1=$("#motul-podbor-table-header");
   var tbl2=$("#motul-podbor-table-body");
   tbl1.css("width",tbl2.width()+'px');
   tbl1=$("#motul-podbor-table-header td:first");
   tbl2=$("#motul-podbor-table-body td:first");
   tbl1.css("width",tbl2.width()+19+'px');
   tbl1=$("#motul-podbor-table-header td.compare");
   tbl2=$(".podbor-motul-info-grup-table tr:nth-child(3):first td.compare");
   var width=0;
   tbl2.each(function(i) {
     width+=$(this).width();
   });
   tbl1.css("width",width+16+'px');
   tbl1=$("#motul-podbor-table-header td.cost");
   tbl2=$(".podbor-motul-info-grup-table tr:nth-child(3):first td.cost");
   tbl1.each(function(i) {
     $(this).width($(tbl2).width()-16+"px");
   });
   tbl1=$("#motul-podbor-table-header td.type");
   tbl2=$(".podbor-motul-info-grup-table tr:nth-child(3):first td.col-type");
   width=0;
   tbl2.each(function(i) {
     width+=$(this).width()+8;
   });
   tbl1.css("width",width+9+'px');
   tbl1=$("#motul-podbor-table-header td.qv");
   tbl2=$(".podbor-motul-info-grup-table tr:nth-child(3):first td.qv");
   tbl1.css("width",tbl2.width()+'px');
  
  setcomparebtnvis_Motul();
  setKindOfPriceMotul();
  $("#popup-search-tree").addClass("hide");
  clearTimeout(intervalID2); 
}

function checkcomparebtnenabl_Motul(el) {
  //console.log(el);
  var btn = document.getElementById('compare-btn-motul');
  if (el.checked) {
    $('.podbor-motul-checkbox[name!="'+el.name+'"]:visible').attr('disabled', true);
  } else{
      $('.podbor-motul-checkbox[name!="'+el.name+'"]:visible').attr('disabled', false);
   }

  if ($('.podbor-motul-checkbox[name="'+el.name+'"]:checked:visible').length>1) {
    btn.disabled =false;
    $(btn).addClass('pointer');
    $(btn).attr('title',' ');
  } else {
    btn.disabled=true;
    $(btn).removeClass('pointer');
    $(btn).attr('title','Отметьте два или более товара для сравнения');
  }
}

function setcomparebtnvis_Motul() {
  var btn = document.getElementById('compare-btn-motul');
  
  if ($("table.podbor-motul-info-grup-table td.col-checkbox input[type='checkbox']").length) { 
    $(btn).css('display', 'inline');
  }
  else{
    $(btn).css('display', 'none');
  }
  
  if ($("table.podbor-motul-info-grup-table td.col-checkbox input[type='checkbox']:checked").length>1) { 
   btn.disabled =false;
   $(btn).addClass('pointer');
  }
  else{
    btn.disabled = true;
    $(btn).removeClass('pointer');
  }

}

function warecompareMotul(el) {
 //if (el.className=="disabledslide enabled"){
   var numbers = new Array();
   var qties   = new Array();
   var boxes=$('.podbor-motul-checkbox[name!=0]:checked:visible');
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
       s+='    <td><a class="tablabel" href=# onclick="showwarecompareMotul('+numbers[j]+');">'+$('#grattrlink'+numbers[j]).html()+'</a></td>';
       s+='  </tr>';
     }
     s+='</table></div>';
     //sw(s, false)
     jqswInfo("",s,2,100,90);
 
   } else {
     showwarecompareMotul(numbers[0]);
   }
//  }
//  $("#WSRwrapper h1").html("Результаты подбора по группе <span>"+curmotoattrgroupname+"</span> по значениям:"+s);
}


function showwarecompareMotul(attrgrnum) {
  var data='';
  var boxes=$('.podbor-motul-checkbox[name='+attrgrnum+']:checked');
  for (i=0; i<boxes.length; i++) {
    data+=(data?"&":"")+'wareid'+i+'='+boxes[i].id.substring(6)
  }
//alert(data);
  var contrel=$("#contract");
  ec('showwarecompare', data+"&contract="+((contrel.length)?contrel.val():""), 'abj');
}

function setPodborMotulQvHint(){
 if ( !$('#motul-podbor-tree').hasClass('hide')){
   var elems=$("table#motul-podbor-table-body").find("a.btn");
   var arrMotulHint={pline:{group:new Array(),code:new Array()},qv:new Array()};
   elems.each(function (i) {
     if ($("table#order-table-body").find("input[id^="+$(this).attr("warecode")+"_]").length){
       qv=$("table#order-table-body").find("input[id^="+$(this).attr("warecode")+"_]").val()*$(this).attr("litrag");
       code=$(this).attr("plinecode");
       group=$(this).attr("codeline");
       if (arrMotulHint.pline.group.length==0){
         arrMotulHint.pline.group.push(group);
         arrMotulHint.pline.code.push(code);
         arrMotulHint.qv.push(qv);
       }
       else{
         var flag=false;
         for (j=0; j<arrMotulHint.pline.group.length; j++) {
           if ((arrMotulHint.pline.group[j]==group) && (arrMotulHint.pline.code[j]==code)){
             flag=true;
             break;
           }  
         }
         if (flag){
           qv=qv+arrMotulHint.qv[j];
           arrMotulHint.qv[j]=qv;
         }
         else{
           arrMotulHint.pline.group.push(group);
           arrMotulHint.pline.code.push(code);
           arrMotulHint.qv.push(qv);
         }  
       }
     }  
   });
 
   for (j=0; j<arrMotulHint.pline.group.length; j++) {
     elems=$("table#motul-podbor-table-body a.btn[plinecode='"+arrMotulHint.pline.code[j]+"'][codeline='"+arrMotulHint.pline.group[j]+"']");
     elems.each(function (i) {
       $(this).addClass("tooltip");
       var sem=$(this).find("span.product-status");
       if (sem.hasClass("green")) {title='Доступен сегодня'; }
       if (sem.hasClass("yellow")) {title='Доступен под заказ, проверяйте срок поставки в заказе'; }
       if (sem.hasClass("red")) {title='Нет в наличии'; }
       if (sem.hasClass("yellow-green")) {title=$(this).attr("title"); }
       $(this).tooltipster({
         position: "top",
         multiple: true,
         content: $("<span style=\'font-weight: bold;\'>"
                 +"<p>"+title+"</p>" 
                 +"<p style=\'text-align: center;'\>Сейчас в заказе "+arrMotulHint.qv[j]+" л.</p>"  
                  +"</span>")
       });
     }); 
   }
   $("table#motul-podbor-table-body").find("a.btn.tooltip").tooltipster();
 }
}

function cleanPodborMotulTitle(elem){
  if ($(elem).hasClass('tooltipstered')){
    //console.log( $(elem).attr("title"));
    $(elem).attr("title","");
    var id=$(elem).attr("aria-describedby");
   $("#"+id).remove();
 }
}

function addOptionsPageNewUser(user_code,user_login,user_position){
  var tbl=$("div#optionusersdiv table.mono");
  if (tbl.length){
    var s1='';
    var contract;
    var fio=$("span#ful-button span.ui-selectmenu-text").text().replace(/[\s{2,}]+/g, ' ');
    s1+='<tr>';
    s1+='  <td>'+fio+'</td>';
    s1+='  <td>'+user_position+'</td>';
    s1+='  <td id="login'+user_code+'">'+user_login+'</td>';
    ContractCount=tbl.find('tr:nth-child(2) td').length-6;
    for (i=0; i<ContractCount; i++) { 
      ContractCode=tbl.find("th:nth-child("+i+4+")").attr("code");
      s1+='<td class="center">'+
          ' <input id="uc_'+user_code+'_'+ContractCode+'" user="'+user_code+'" contract="'+ContractCode+'" type="checkbox">'+
          ' <label for="uc_'+user_code+'_'+ContractCode+'"></label>'
         +'</td>';
    
    }  
    s1+='<td>'+
        '  <button class="spritebtn makemain" title="Сделать пользователя Главным" '+
        //'onclick="alert(\'+fio+\');" >'+
        'onclick="jqswConfirmFromOrder(\'Вы действительно хотите сделать Главным пользователя '+fio+'?\', \'act=smu&usercode='+user_code+'\');" >'+
        '   </button>'+
        '</td>';
    s1+='<td>'+
        '  <button class="spritebtn changepsw" title="Сменить пароль" '+
        'onclick="jqswConfirmFromOrder(\'Вы действительно хотите назначить новый пароль пользователю '+fio+'?\', \'act=rp&usercode='+user_code+'\');">'+
        '   </button>'+
        '</td>';
    s1+='<td>'+
        '  <button class="btn redtr-btn" title="Отправить заявку на удаление" '+
        'onclick="jqswConfirmFromOrder(\'Вы действительно хотите отправить заявку на удаление пользователя '+fio+'?\', \'act=fndeluserstatement&usercode='+user_code+'\');">'+
        'Удалить</button>'+
        '</td>';
   
    s1+='</tr>';
    tbl.append(s1); 
    $("#newlogin").val('');
    $("span#ful-button span.ui-selectmenu-text").text('');
    $("#ful [value='"+user_code+"']").remove();
    $("#ful").selectmenu("refresh");
  }  
}

function sendExcelWarelist(){
  if ($("#enter-ware-list textarea").val() !=''){
    ec('getexcelwarelist','data='+$("#enter-ware-list textarea").val()+'&contract='+(($("#contract").length)?$("#contract").val():''),'abj');
  }
}

function getClipboardExcelText(elem){
  if ( $("section#enter-ware-list textarea").val()!=''){
    $("section#enter-ware-list textarea").height('1px');
    var s=$("#enter-ware-list textarea").val();
    var arrayOfStrings=s.split('\n');
    var arrResultStrings=[];
    arrResultStrings.Name=new Array();
    arrResultStrings.Qv=new Array();
    var temp;
    for (i=0; i<arrayOfStrings.length; i++) { 
      temp=arrayOfStrings[i].split('\t');
      if (temp.length>0){
        arrResultStrings.Name[arrResultStrings.Name.length]=temp[0];
        if (temp.length>1){
          if (!isNaN(temp[1])){
            arrResultStrings.Qv[arrResultStrings.Qv.length]=temp[1]; 
          }
          else{
            arrResultStrings.Qv[arrResultStrings.Qv.length]='';
          }  
        }
        else{
          arrResultStrings.Qv[arrResultStrings.Qv.length]='';
        }  
      }    
    }
    $("#ware-list-table-header").removeClass('hide');
    var tbl=document.getElementById("ware-list-table-body");
    var tbody = $(tbl).find('tbody')[0];
    $(tbody).empty(); 
    var row;
    var newcell;
    for (i=0; i<arrResultStrings.Name.length-1; i++) {
      row=tbl.insertRow(-1);//основная картинка
      newcell=row.insertCell(-1);
      $(newcell).addClass('col with-border');
      newcell.innerHTML=arrResultStrings.Name[i];
      newcell=row.insertCell(-1);
      $(newcell).addClass('col');
      newcell.innerHTML=arrResultStrings.Qv[i];
      $(newcell).css("width","81px").css("text-align","center");
      if ((arrResultStrings.Qv[i]=='') || (arrResultStrings.Qv[i]=='0')){
        $(row).css("border","2px solid #d9534f"); 
      }
    }
    $("#ware-list-table-body-wrap").mCustomScrollbar({
          alwaysShowScrollbar: 1
        });
    $("#ware-list-table-header").width($("#ware-list-table-body").width());
  }  
}

function clearAllWareListExcel(){
 $("#ware-list-table-header").addClass('hide');
 $("section#enter-ware-list textarea").height('350px');
 var tbl=document.getElementById("ware-list-table-body");
 var tbody = $(tbl).find('tbody')[0];
 $(tbody).empty(); 
 $('#enter-ware-list textarea').val('');
}

function setSemaforCheckWareFunc(){
  var elems= $('table.table .col button.check-ware-qv');
  if ($("#cur_order_code").length){
    var OrderCode=$("#cur_order_code").val();
    $('table.table .col button.check-ware-qv').click(function(){checkwareqty(-100,this,'true', OrderCode);});
    $('table.table .col button.check-ware-qv').removeClass('hide');
  }
  else{
    $('table.table .col button.check-ware-qv').click(function(){checkwareqty(-100,this,'true');});
    $('table.table .col button.check-ware-qv').removeClass('hide');
  }
  TempIconInSearch = true;
}

function New_getContractListWindow(){

  s='';
  s=s+'   <div class="contracts-body" id="contract-list-body" >';
  s=s+'     <table id="contract-choice-table-header" class="table table-header"  ';
  s=s+'      <tr style="font-size: 14px;" >';
  s=s+'        <td class="col">№</td>';
  s=s+'        <td class="col">Форма оплаты</td>';
  s=s+'        <td class="col">Склад</td>';
  s=s+'        <td class="col">Сумма кредита</td>';
  s=s+'        <td class="col">Отсрочка, дн.</td>';
  if (flCredProfile) {
    s=s+'           <td class="col" >Общий долг</td>';
  }  
  s=s+'        <td class="col">Долг/перепл.</td>';
  s=s+'        <td class="col">Резерв</td>';
  s=s+'        <td class="col">Статус</td>';
  s=s+'        <td class="col">Просрочено</td>';
  s=s+'        <td class="col">Истекает срок</td>';
  s=s+'        <td class="col">'+cTitleLegal+'</td>';
  s=s+'        <td class="col">Комментарий</td>';
  s=s+'      </tr>';
  s=s+'   </table>';
  s=s+' <div class="order-table-body-wrap" id="contract-choice-body-wrap" data-mcs-theme="inset-dark"> ';
  s=s+'   <table class="table table-body" id="contract-choice-table-body"> ';
  if (TStream.arrtable.length>0){
    if (flCredProfile){
      for (i=0; i<TStream.BlockCount; i++) {
        for (j=0; j<TStream.arrtable[i].Count;j++){
          if (edit !=''){
            s=s+'<tr code="'+TStream.arrtable[i].RowData[j].CurrentContractCode+'">'
          }
          else{
            s=s+'<tr code='+TStream.arrtable[i].RowData[j].CurrentContractCode+fnIfStr(TStream.ContractId==TStream.arrtable[i].RowData[j].CurrentContractCode, ' class="contract-choice-tr current"', ' class="pointer"')+'>';
          } 
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].CurrentContractNum+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].PayForm+'</td>';
          s=s+'<td class="col with-border" title="'+TStream.arrtable[i].RowData[j].deprtName+'">'+TStream.arrtable[i].RowData[j].deprtShortName+'</td>';
          if (TStream.arrtable[i].RowData[j].deprtShortName !=''){
            if (j==0) {
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts">'+TStream.arrtable[i].RowData[j].CreditContractSum;
              s=s+' '+TStream.arrtable[i].RowData[j].CurrencyContractName+'</td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts">'+TStream.arrtable[i].RowData[j].ReprieveContract+'</td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts">'+TStream.arrtable[i].RowData[j].ProfDebtAll+'</td>';
            }
            s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].DebtContract+'</td>';
          }
          else {
            if (j==0) {
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts"></td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts"></td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts"></td>';
            }
            s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].DebtContract+'</td>';
          }
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].ContractOrderSum+'</td>';   //резерв
          s=s+'<td class="col with-border" style="padding: 0 10px 0 10px; background-color: '+TStream.arrtable[i].RowData[j].BKColor+'; color: '+TStream.arrtable[i].RowData[j].Color+'; text-align: center; font-weight: bold;" title="'+TStream.arrtable[i].RowData[j].stemp+'">'+TStream.arrtable[i].RowData[j].ContStatusNames+'</td>';
          s=s+'<td class="col with-border" style="color: red;font-weight: bold;">'+TStream.arrtable[i].RowData[j].ContractRedSum+'</td>';
          s=s+'<td class="col with-border" style="color: #f0f;font-weight: bold;">'+TStream.arrtable[i].RowData[j].ContractVioletSum+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].FirmName+'</td>';
          s=s+'<td class="col"><span class="contractcommentspan" title="'+TStream.arrtable[i].RowData[j].SelfCommentary+'">'+TStream.arrtable[i].RowData[j].temp+'</span></td>';
          s=s+'</tr>';
        }
      }
    }
    else{
      for (i=0; i<TStream.arlen; i++) {
        if (edit !=''){
          s=s+'<tr code="'+TStream.arrtable[i].CurrentContractCode+'">'
        }
        else{
          s=s+'<tr code='+TStream.arrtable[i].CurrentContractCode+fnIfStr(TStream.ContractId==TStream.arrtable[i].CurrentContractCode, ' class="contract-choice-tr current"', ' class="pointer"')+'>';
        } 
        s=s+'<td class="col with-border">'+TStream.arrtable[i].CurrentContractNum+'</td>';
        s=s+'<td class="col with-border">'+TStream.arrtable[i].PayForm+'</td>';
        s=s+'<td class="col with-border" title="'+TStream.arrtable[i].deprtName+'">'+TStream.arrtable[i].deprtShortName+'</td>';
         if (TStream.arrtable[i].deprtShortName !=''){
          s=s+'<td class="col with-border">'+TStream.arrtable[i].CreditContractSum;
          s=s+' '+TStream.arrtable[i].CurrencyContractName+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].ReprieveContract+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].DebtContract+'</td>';
         }
        else {
          s=s+'<td class="col with-border"></td>';
          s=s+'<td class="col with-border"></td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].DebtContract+'</td>';
        }
        s=s+'<td class="col with-border">'+TStream.arrtable[i].ContractOrderSum+'</td>';   //резерв
        s=s+'<td class="col with-border" style="padding: 0 10px 0 10px; background-color: '+TStream.arrtable[i].BKColor+'; color: '+TStream.arrtable[i].Color+'; text-align: center; font-weight: bold;" title="'+TStream.arrtable[i].stemp+'">'+TStream.arrtable[i].ContStatusNames+'</td>';
        s=s+'<td class="col with-border" style="color: red;font-weight: bold;">'+TStream.arrtable[i].ContractRedSum+'</td>';
        s=s+'<td class="col with-border" style="color: #f0f;font-weight: bold;">'+TStream.arrtable[i].ContractVioletSum+'</td>';

        s=s+'<td class="col with-border">'+TStream.arrtable[i].FirmName+'</td>';
        s=s+'<td class="col"><span class="contractcommentspan" title="'+TStream.arrtable[i].SelfCommentary+'">'+TStream.arrtable[i].temp+'</span></td>';
        s=s+'</tr>';
      }
    }
    s=s+'     </table> ';
    s=s+'     <table class="table table-body" cellspacing=0 id="tablecontent2" ></table>';
    s=s+'   </div> ';
    jqswfillInfo(''+s+'',"Выберите контракт",20,0,90,-10,"1");
    synqcols(document.getElementById('tablecontent2'), document.getElementById('contract-choice-table-header'), document.getElementById('contract-choice-table-body'), $("#contract-choice-table-body").width(), false);
    $("#contract-choice-table-body tr.pointer").bind("click", function(event) { 
       if ($("a.toggle-view.blocks-view").length) {
         ecq("changecontractbonus", "newcontr="+$(this).attr("code")+"&ordercode="+$("#cur-bonus-order-code").val(), "newbj", "Вы действительно хотите сменить контракт?");
       }
       else {
         var order=$("#addlines"); 
         ecq("changecontract", "newcontr="+$(this).attr("code")+"&ordercode="+((order.length)?order.val():""), "newbj", "Вы действительно хотите сменить контракт?");
       }
    });
    $("#contract-choice-body-wrap").mCustomScrollbar({
            alwaysShowScrollbar: 1 
    });
  } 

}

function New_getContractListPage(){
  s='';
  s=s+'   <div class="contracts-body" id="order-body" >';
  s=s+'       <table id="contract-table-header" class="table table-header"> ';
  s=s+'         <tr>';
  s=s+'           <td class="col" >№</td>';
  s=s+'           <td class="col" >'+cTitleLegal+'</td>';
  s=s+'           <td class="col" >Форма оплаты</td>';
  s=s+'           <td class="col" >Склад отгрузки</td>';
  s=s+'           <td class="col" >Сумма кредита</td>';
  s=s+'           <td class="col" >Отсрочка, дн.</td>';
  if (flCredProfile) {
    s=s+'           <td class="col" >Общий долг</td>';
  }  
  s=s+'           <td class="col" >Долг/перепл.</td>';
  s=s+'           <td class="col" >Резерв</td>';
  s=s+'           <td class="col" >Статус</td>';
  s=s+'           <td class="col" >Просрочено</td>';
  s=s+'           <td class="col" >Истекает срок</td>';
  s=s+'           <td class="col" >Комментарий</td>';
  s=s+'         </tr>';
  s=s+'       </table>';
  s=s+'     <div class="order-table-body-wrap" id="contracts-table-body-wrap" data-mcs-theme="inset-dark"> ';
  s=s+'       <table class="table table-body" id="contracts-table-body"> ';
  if (TStream.arrtable.length>0){
    if (flCredProfile){
      for (i=0; i<TStream.BlockCount; i++) {
        for (j=0; j<TStream.arrtable[i].Count;j++){
          s=s+'<tr code='+TStream.arrtable[i].RowData[j].CurrentContractCode+fnIfStr(TStream.ContractId==TStream.arrtable[i].RowData[j].CurrentContractCode, ' class="contract-tr current"', ' class="contract-tr another"')+'>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].CurrentContractNum+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].FirmName+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].PayForm+'</td>';
          s=s+'<td class="col with-border" title="'+TStream.arrtable[i].RowData[j].deprtName+'">'+TStream.arrtable[i].RowData[j].deprtShortName+'</td>';
          if (TStream.arrtable[i].RowData[j].deprtShortName !=''){
            if (j==0) {
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts">'+TStream.arrtable[i].RowData[j].CreditContractSum;
              s=s+' '+TStream.arrtable[i].RowData[j].CurrencyContractName+'</td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts">'+TStream.arrtable[i].RowData[j].ReprieveContract+'</td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts">'+TStream.arrtable[i].RowData[j].ProfDebtAll+'</td>';
            }
            s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].DebtContract+'</td>';
          }
          else {
            if (j==0) {
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts"></td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts"></td>';
              s=s+'<td rowspan="'+TStream.arrtable[i].Count+'" class="col with-border united-cell-contracts"></td>';
            }
            s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].DebtContract+'</td>';
          }
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].ContractOrderSum+'</td>';   //резерв
          s=s+'<td class="col with-border" style="color: '+TStream.arrtable[i].RowData[j].Color+'; text-align: center; " title="'+TStream.arrtable[i].RowData[j].stemp+'">'+TStream.arrtable[i].RowData[j].ContStatusNames+'</td>';
          s=s+'<td class="col with-border over" >'+TStream.arrtable[i].RowData[j].ContractRedSum+'</td>';
          s=s+'<td class="col with-border deadline" >'+TStream.arrtable[i].RowData[j].ContractVioletSum+'</td>';
          s=s+'<td class="col"><span class="contractcommentspan" title="'+TStream.arrtable[i].RowData[j].SelfCommentary+'">'+TStream.arrtable[i].RowData[j].temp+'</span></td>';
          s=s+'</tr>';
        }
      }
      s=s+'<tr class="contact-tr all"> ';
      s=s+'  <td colspan="4" class="desr-cell col with-border">Итого:</td> ';
      s=s+'  <td class="desr-cell col with-border center">'+TStream.SumCreditContract+'</td> ';
      s=s+'  <td class="col with-border"></td> ';
      s=s+'  <td  class="desr-cell col with-border center">'+TStream.SumProfDebtAll+'</td> ';
      s=s+'  <td  colspan="6" class="col"></td> ';
      s=s+'</tr> ';
    }
    else{
      for (i=0; i<TStream.arlen; i++) {
        s=s+'<tr code="'+TStream.arrtable[i].CurrentContractCode+'" class="contract-tr '+fnIfStr(ContractId=CurrentContractCode, ' current', 'another')+'" >';
        s=s+'<td class="col with-border">'+TStream.arrtable[i].CurrentContractNum+'</td>';
        s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[j].FirmName+'</td>';
        s=s+'<td class="col with-border">'+TStream.arrtable[i].PayForm+'</td>';
        s=s+'<td class="col with-border" title="'+TStream.arrtable[i].deprtName+'">'+TStream.arrtable[i].deprtShortName+'</td>';
         if (TStream.arrtable[i].deprtShortName !=''){
          s=s+'<td class="col with-border">'+TStream.arrtable[i].CreditContractSum+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].ReprieveContract+'</td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].DebtContract+'</td>';
         }
        else {
          s=s+'<td class="col with-border"></td>';
          s=s+'<td class="col with-border"></td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].DebtContract+'</td>';
        }
        s=s+'<td class="col with-border">'+TStream.arrtable[i].ContractOrderSum+'</td>';   //резерв
        s=s+'<td class="col with-border" style="color: '+TStream.arrtable[i].Color+'; text-align: center; " title="'+TStream.arrtable[i].stemp+'">'+TStream.arrtable[i].ContStatusNames+'</td>';
        s=s+'<td class="col with-border" style="color: red;font-weight: bold;">'+TStream.arrtable[i].ContractRedSum+'</td>';
        s=s+'<td class="col with-border" style="color: #f0f;font-weight: bold;">'+TStream.arrtable[i].ContractVioletSum+'</td>';
        s=s+'<td class="col"><span class="contractcommentspan" title="'+TStream.arrtable[i].SelfCommentary+'">'+TStream.arrtable[i].temp+'</span></td>';
        s=s+'</tr>';
      }
    }
    s=s+'     </table> ';
    s=s+'     <table class="table table-body" cellspacing=0 id="tablecontent2" ></table>';
    s=s+'   </div> ';
    s=s+' </div> ';
    var sec=$('section#contracts');
    if (sec.length){
      $(sec).html(''); 
    }
    else{
      sec = document.createElement('section');
      sec.id='contracts';
      var main=document.getElementById("main-content");
      main.appendChild(sec);
    }
    $(sec).html(s);
    $("#contracts-table-body tr.contract-tr.another").bind("click", function(event) {
      var order=$("#addlines");
      ec("changecontract", "newcontr="+$(this).attr("code")+"&ordercode="+((order.length)?order.val():""), "newbj");
    });
    synqcols(document.getElementById('tablecontent2'), document.getElementById('contract-table-header'), document.getElementById('contracts-table-body'), $("#contracts-table-body").width(), false); 
    $("#contract-choice-body-wrap").mCustomScrollbar({
      alwaysShowScrollbar: 1
    });
    
  } 

}

function fnDrawTitleForSortingRedisign2(OrderField, OrderDesc, CookieOrderName, CookieDescName, FieldName, HeaderText)
{
  var s='';
  s+='<a class="sort-column-arrow" href=\'javascript: set_sort("'
      +fnIfStr(OrderField==FieldName, CookieDescName, CookieOrderName)+'", "'
      +fnIfStr(OrderField==FieldName, fnIfStr(OrderDesc=='desc', '', 'desc'), FieldName)+'");\'>'+HeaderText+'</a>';
  if (OrderField==FieldName) {
    s=s+'&nbsp;<span class="arrow-name-sort">'
      +fnIfStr(OrderDesc=='desc', '&#8593;', '&#8595;')+
      '</span>';
  }
  return s;
}

function New_getOrdersListPage(){
  s='';
  s=s+'   <div class="order-container">';
  s=s+'       <div class="order-header">';
  s=s+'         <div class="header-title row">';
  s=s+'           <div class="col-xs-5">';
  s=s+'             <ul class="order-list-btn">';
  s=s+'               <li><a disable="disable" id="btim_nobc" href="#" onclick=" obmajNew(\'obm\');" class="orders-check" title="Создать новый заказ по отмеченным"></a></li>';
  s=s+'               <li><a href="#" id="btim_neworder" onclick="cnoNew();" class="orders-add" title="Создать новый заказ"></a></li>';
  s=s+'               <li><a href="#" disable="disable" id="btim_unorders" onclick="if ($(this).attr(\'disable\')==\'enable\'){ obmajNew(\'jm\'); }" class="orders-join" title="Объединить отмеченные заказы"></a></li>' ;
  s=s+'               <li><a href="#" id="btim_filter" onclick="showorderfilter();" class="orders-filter" title="Фильтр заказов"></a></li>';
  s=s+'               <li><a href="#" id="btim_refrprice" onclick="rpioNew();" class="orders-update" title="Обновить цены в неотправленных заказах"></a></li>' ;
  s=s+'               <li><a href="#" disable="disable" id="btim_delorders" onclick="if ($(this).attr(\'disable\')==\'enable\'){ del_ordersNew(); }" class="orders-del" title="Удалить отмеченные заказы"></a></li>';
  if (flGetExcelWareList) {
       s=s+'               <li><a href="#" id="btim_enter-warelist" onclick="$(\'section#enter-ware-list textarea\').css(\'height\',\'350px\'); $(\'#enter-ware-list\').removeClass(\'hide\');" class="orders-enter-warelist" title="Импорт заказа"></a></li>';
  }
  s=s+'             </ul>  ';
  s=s+'           </div> ';
  s=s+'         </div> ';
  s=s+'       </div> ';
  s=s+'   <div id="orders-tree-tabs" class="orders-body">';
  if (TStream.OrdersCount>0){
    s=s+'<table id="orders-table-header" class="table table-header">';
    s=s+'<tr>';
    s=s+'<td class="col-checkbox" ><input title="Отметить все/снять отметку" type="checkbox" id="checkbox-orders-checkall" onClick="checkAll(this.checked)">'+
                                               '<label for="checkbox-orders-checkall"></label></td>';
    s=s+'<td class="col pointer" >';
    s=s+fnDrawTitleForSortingRedisign2(TStream.SortOrder, TStream.SortDesc, 'ordersorder', 'ordersdesc', 'ORDRDATE', 'Дата&nbsp;заказа');
    s=s+'</td>';
    s=s+'           <td class="col" >';
    s=s+fnDrawTitleForSortingRedisign2(TStream.SortOrder, TStream.SortDesc, 'ordersorder', 'ordersdesc', 'ORDRNUM', 'Номер&nbsp;заказа');
    s=s+'</td>';
    if (TStream.ContractsCount>1) {
      s=s+'         <td class="col" >Контракт</td>';
    }
      s=s+'           <td class="col" >';
      s=s+fnDrawTitleForSortingRedisign2(TStream.SortOrder, TStream.SortDesc, 'ordersorder', 'ordersdesc', 'ORDRSUMORDER', 'Сумма');
      s=s+'</td>';
      s=s+'           <td class="col" >';
      s=s+fnDrawTitleForSortingRedisign2(TStream.SortOrder, TStream.SortDesc, 'ordersorder', 'ordersdesc', 'ORDRCURRENCY', 'Валюта');
      s=s+'</td>';
      s=s+'           <td class="col" >';
      s=s+fnDrawTitleForSortingRedisign2(TStream.SortOrder, TStream.SortDesc, 'ordersorder', 'ordersdesc', 'ORDRSTATUS', 'Статус');
      s=s+'</td>';
      s=s+'           <td class="col" >Тип док.</td>';
      s=s+'           <td class="col" >№ док.</td>';
      s=s+'           <td class="col" >Сумма док.</td>';
      s=s+'           <td class="col" >Валюта док.</td>';
      s=s+'           <td class="col" >Дата док.</td>';
      s=s+'           <td class="col" >Пометка</td>';
      s=s+'         </tr>';
      s=s+'       </table>';
      s=s+'     <div class="order-table-body-wrap" id="orders-table-body-wrap" data-mcs-theme="inset-dark">' ;
      s=s+'       <form method=post id="neworderform" action='+scriptname+'/order onSubmit="return check_neworder();">';
      s=s+'       <input type=hidden name=contract value="'+TStream.ContractID+'">';
      s=s+'       <table class="table table-body pointer" id="orders-table-body">' ;
      for (i=0; i<TStream.OrdersCount; i++) {
        if ((TStream.arrtable[i].StatusName==arOrderStatusNames[orstForming]) && (TStream.arrtable[i].orderCurrency==TStream.ballsName)) { //для страницы лоялити
          s=s+'<tr id="tr'+TStream.arrtable[i].CurOrderID+'" class="orders-tr '+fnIfStr((i%2)==0, '', ' current')+'"  onclick="location.href=\''+scriptname+'/loyalty?&contract='+TStream.arrtable[i].CurContractID+'&bonus=true\'">'
        }
        else if (TStream.arrtable[i].orderCurrency==TStream.ballsName) {
               s=s+'<tr id="tr'+TStream.arrtable[i].CurOrderID+'" class="orders-tr '+fnIfStr((i%2)==0, '', ' current')+'" onclick="location.href=\''+scriptname+'/order?order='+TStream.arrtable[i].CurOrderID+'&contract='+TStream.arrtable[i].CurContractID+'&bonus=true\'">'
             }
             else{
               s=s+'<tr id="tr'+TStream.arrtable[i].CurOrderID+'" class="orders-tr '+fnIfStr((i%2)==0, '', ' current')+'" onclick="location.href=\''+scriptname+'/order?order='+TStream.arrtable[i].CurOrderID+'&contract='+TStream.arrtable[i].CurContractID+'&bonus=false\'">';
             }
        if (TStream.arrtable[i].orderCurrency==TStream.ballsName) {
          s=s+'<td class="col-checkbox with-border" '+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+'></td>' //Дата заказа
        }
        else {
          s=s+'<td class="col-checkbox with-border" '+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+' ><input type=checkbox name="cb'+TStream.arrtable[i].CurOrderID+'" id="cb'+i+'"  '+
          fnIfStr(TStream.arrtable[i].CurContractID==TStream.ContractID, 'onClick="edb(); event.stopPropagation();"', 'onClick="event.stopPropagation();" disabled')+'><label for="cb'+i+'" '+
          fnIfStr(TStream.arrtable[i].CurContractID=TStream.ContractID, 'onClick="edb(); event.stopPropagation();"', 'onClick="event.stopPropagation();" disabled')+'></label></td>'; //Дата заказа
        }
        s=s+'<td class="col with-border" '+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+'>'+TStream.arrtable[i].orderDate+'</td>'; //Дата заказа
        s=s+'<td class="col with-border" '+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+'>'+TStream.arrtable[i].orderNum+'</td>'; //Номер заказа
        if (TStream.ContractsCount>1) {
          s=s+'<td class="col with-border" '+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+' title="">'+TStream.arrtable[i].CurContractName+'</td>';
        }
        s=s+'<td class="col with-border" title="'+fnIfStr(TStream.arrtable[i].ComentSum !='', TStream.arrtable[i].ComentSum, '')+'" style="'+fnIfStr(TStream.arrtable[i].ComentSum !='','color: red; font-weight: bold;', '')+
            ' "'+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+'>'+TStream.arrtable[i].orderSum+'</td>'; //Сумма заказа
        s=s+'<td class="col with-border" '+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+'>'+fnIfStr(TStream.arrtable[i].orderCurrency==TStream.ballsName,'<a class="bonus-cell"></a>',TStream.arrtable[i].orderCurrency)+'</td>'; //Валюта заказа
        s=s+'<td class="col with-border" '+fnIfStr(TStream.arrtable[i].RowCount>1, ' rowspan='+TStream.arrtable[i].RowCount, '')+'> <span style=\'color: '+TStream.arrtable[i].OrderStatusColor+'\'>'+TStream.arrtable[i].StatusName+'</span>'+TStream.arrtable[i].OrderStatus; //Статус заказа
        if (TStream.arrtable[i].StatusName=arOrderStatusNames[orstForming]){ 
          s=s+'<input id="db'+TStream.arrtable[i].CurOrderID+'" type=hidden >'; // это для работы функций, управляющих доступнностью кнопок удаления, объединения и копирования заказов.
        }
        s=s+'</td>'; //Статус заказа
        if (TStream.arrtable[i].RowCount==0) {
          s=s+'<td class="col with-border">&nbsp;</td>'+
              '<td class="col with-border">&nbsp;</td>'+
              '<td class="col with-border">&nbsp;</td>'+
              '<td class="col with-border">&nbsp;</td>'+
              '<td class="col with-border">&nbsp;</td>';
        }
        for (ii=0; ii<TStream.arrtable[i].RowCount; ii++) {
          if (ii>0) {
            s=s+'<tr class="'+fnIfStr((i%2)==0, ' current', '')+'">';
          }
          if (TStream.arrtable[i].RowData[ii][ii].b>0) {
            s=s+'<td class="col with-border" title="">'+TStream.arrtable[i].RowData[ii][ii].OrderType+'</td>'; //Тип документа
          } else {
              s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[ii][ii].OrderType+'</td>'; //Тип документа
          }
          s=s+'<td  class="col with-border"><span style="white-space: nowrap;" ><a target="_blank"  '+
          'onclick="window.open(\''+scriptname+'/showdoc?type='+TStream.arrtable[i].RowData[ii][ii].DocType+'&id='+TStream.arrtable[i].RowData[ii][ii].DocId+'&isorders=true\'); event.stopPropagation(); return false;" href="#" '+
          'title="Склад документа - '+TStream.arrtable[i].RowData[ii][ii].OrderStore+'">'+TStream.arrtable[i].RowData[ii][ii].DocNum+'</a>';//Номер документа
          if (TStream.arrtable[i].RowData[ii][ii].Commentary !='') {
            s=s+'<img style="cursor: pointer;" title="'+TStream.arrtable[i].RowData[ii][ii].Commentary+'" onClick=\'jqswfillInfo("'+TStream.arrtable[i].RowData[ii][ii].Commentary+'","Комментарий",20,150,10); '+
            'event.stopPropagation(); return false;\' src="/images/orders/com.png">'; //Комментарий
          }
          s=s+'</span></td>';
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[ii][ii].SumDoc+'</td>'; //Сумма док.
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[ii][ii].CurrencyDoc+'</td>'; //Валюта док.
          s=s+'<td class="col with-border">'+TStream.arrtable[i].RowData[ii][ii].DateDoc+'</td>'; //Дата  док.
          if (ii>0) {
            //s=s+'<td class="col"></td>; //Комментарий
            //s=s+'</tr>';
          }
        }
  
        s=s+'<td class="col" title="'+TStream.arrtable[i].SelfCommentary+'">'+TStream.arrtable[i].temp+'</td>'; //Собственный комментарий заказа
        s=s+'</tr>';
      }
      if (TStream.Commentary2 !='') {
        jqswMessage(TStream.Commentary2);
      }
      s=s+'       </table>';
      s=s+'<table class="table table-body" cellspacing=0 id="tablecontent2" >';
      s=s+'</table>';
      s=s+'     </form>';
      s=s+'     </div>';
      s=s+'    </div>';
      s=s+'   </div>';
    }
    else {
     s=s+'   <div class="no-wares-div">';
     s=s+'   Не найдено заказов, отвечающих текущим настройкам фильтра.';
     s=s+'   </div>';
     s=s+'   </div>';
    }
    var sec=$('section#orders');
    if (sec.length){
      $(sec).html(''); 
    }
    else{
      sec = document.createElement('section');
      sec.id='orders';
      sec.className='order';
      var main=document.getElementById("main-content");
      main.appendChild(sec);
      $(sec).html(''); 
    }
    $(sec).html(s); 
    synqcols(document.getElementById('tablecontent2'), document.getElementById('orders-table-header'), document.getElementById('orders-table-body'), $("#orders-table-body").width(), false); 
    if (checkOrdersFilterCookie()==1){
      if ( !$(".orders-filter").hasClass("set")) {
        $(".orders-filter").toggleClass("set");
      }
    }
    if (TStream.IsWareListImport) {
      $("a#btim_enter-warelist").removeClass("hide");
    }
    else{
      $("a#btim_enter-warelist").addClass("hide");
    }
}

function addtochangeTT(act, num) {  //добавляет, удаляет торговые точки
  var s=res='';
  var s1;
  var tbl=$('#changeTTtable')[0];
  var tr;
  var cell;
   var RowIndex;
  switch (act) {
    case 'add':
        jPromptTT('Введите торговую точку для добавления', '', 'Ок','Отмена',function get(result){
          if (result){  
            s1=result.substr(result,result.indexOf("***"));
            s=result.substr(result.indexOf("***")+3);
            res='<span>Добавить торговую точку:</span>\n<span class="new-tt-name bold">"'+s1+'"</span>';
            if (s !=''){
              res=res+'\n <span class="new-tt-comment">Примечание: '+s+'</span>';
            }
            tr=tbl.insertRow(tbl.rows.length-1);
            RowIndex=tr.rowIndex;
            $(tr).attr("id",'promptTT-table-tr-'+RowIndex);
            tr.insertCell(0);
            cell=tr.insertCell(1);
            cell.innerHTML='<button onclick="editrowfromchangeTTtable('+RowIndex+',this);" title="Редактировать строку" class="btn white-btn">Редактировать</button>'
            //cell=tr.insertCell(2);
            +'<button onclick="delrowfromchangeTTtable(this);" title="Удалить строку" class="btn redtr-btn float">Удалить</button>';
            $(tr).attr('act', act);
            $(tr).attr('oldPoint', '');
            $(tr).attr('index', RowIndex);            tr.cells[0].innerHTML='&bull;  '+res;
            tbl.style.display="block";
          }
        });
    break
    case 'correct': //заготовка а кнопку Редактировать
      $('#_ttdefaultselect option').each(function(){
        tr=tbl.insertRow(tbl.rows.length-1);
        tr.insertCell(0);
        if ($(this).text()!=''){
          res=$(this).text();
          cell=tr.insertCell(1);
          cell.innerHTML='<button onclick="" title=""Добавить в заявку на изменение данных" class="btn white-btn">Редактировать</button>';
          cell=tr.insertCell(2);
          cell.innerHTML='<button onclick="" title="Добавить в заявку на Удаление" class="btn redtr-btn">Удалить</button>';
        } 
      });
      $(tr).attr('act', act);
      tr.cells[0].innerHTML='&bull;  '+res;
      tbl.style.display="block";
    break;
    case 'edit':
      if ($("#_ttdefaultselect option:selected").val() !=0) {
         jPromptTT('Редактировать торговую точку: '+$("#_ttdefaultselect option:selected").text(), $("#_ttdefaultselect option:selected").text(), 'Ок','Отмена',function get(result){
           if (result){ 
             s1=result.substr(result,result.indexOf("***"));
             s=result.substr(result.indexOf("***")+3);
             res='<span class="new-tt-name bold">"'+s1+'"</span>';
             if (s !=''){
               res=res+'\n <span class="new-tt-comment">Примечание: '+s+'</span>';
             }
             res='<span>Заменить торговую точку</span>\n<span class="old-tt-name bold">"'+$("#_ttdefaultselect option:selected").text()+'"</span> <span>\nна\n</span>'+res;
             tr=tbl.insertRow(tbl.rows.length-1);
             RowIndex=tr.rowIndex;
             $(tr).attr("id",'promptTT-table-tr-'+RowIndex);
             tr.insertCell(0);
             cell=tr.insertCell(1);
             cell.innerHTML='<button onclick="editrowfromchangeTTtable('+RowIndex+',this);" title="Редактировать строку" class="btn white-btn">Редактировать</button>'+
             //cell=tr.insertCell(2);
             '<button onclick="delrowfromchangeTTtable(this);" title="Удалить строку" class="btn redtr-btn float">Удалить</button>';
             $(tr).attr('act', act);
             $(tr).attr('oldPoint', $("#_ttdefaultselect option:selected").text());
             $(tr).attr('index', RowIndex);            
             tr.cells[0].innerHTML='&bull;  '+res;
             tbl.style.display="block";
           }
         });
      }
      else{
       jqswMessageError("Не выбрана торговая точка"); 
      }
    break
    case 'del':
      if ($("#_ttdefaultselect option:selected").val() !=0) {
         jConfirm('Удалить торговую точку: '+$("#_ttdefaultselect option:selected").text()+' ?', 'Ок','Отмена',function get(result){
           if (result){ 
             res='<span>Удалить торговую точку: </span>\n"<span class="new-tt-name bold">'+$("#_ttdefaultselect option:selected").text()+'"</span>';
             tr=tbl.insertRow(tbl.rows.length-1);
             RowIndex=tr.rowIndex;
             tr.insertCell(0);
             cell=tr.insertCell(1);
             cell.innerHTML='<button onclick="delrowfromchangeTTtable(this);" title="Удалить строку" class="btn redtr-btn">Удалить</button>';
             $(tr).attr('act', act);
             $(tr).attr('oldPoint', '');
             $(tr).attr('index', RowIndex);            tr.cells[0].innerHTML='&bull;  '+res;
             tr.cells[0].innerHTML='&bull;  '+res;
             tbl.style.display="block";
           }
         });
      }
      else{
       jqswMessageError("Не выбрана торговая точка"); 
      }

    break
  } //switch (act) {
}

function delrowfromchangeTTtable(a) {
  jConfirm('Удалить строку ?', 'Ок','Отмена',function get(result){
    if (result){ 
      var tbl=$('#changeTTtable')[0];
      tbl.deleteRow(a.parentNode.parentNode.rowIndex);
      if (tbl.rows.length<3) tbl.style.display="none";
      $("#"+$(a).attr("aria-describedby")).detach();
    }
  });
}

function changerowfromchangeTTtable(a) {  //Торговые точки кнопка Редактировать
  var s=$(a).parent().prev().text();
  s1='Торговую точку';
  s=s.substr(s.indexOf(s1)+s1.length+1);
  s1=s.substr(s.indexOf(' - ')+3);
  s=s.substr(0,s.indexOf(' - '))
}

function sendchangesTT() {
  var tbl=$('#changeTTtable')[0];
  var elem;
  if (tbl.rows.length<3) {
    jqswMessageError('Отправка пустого набора изменений не имеет смысла');
    return false;
  } 
  var data='tablename=changeTTtable';
  for (var i=0; i<(tbl.rows.length-2); i++) {
    if (tbl.rows[i+1].cells[0].childNodes.length>1){
     elem=tbl.rows[i+1].cells[0]; 
     data+='&part'+i+'='+$(elem).text(); 
    }
    else{
     data+='&part'+i+'='+tbl.rows[i+1].cells[0].innerHTML;    
    }
  }
  //console.log(data);
  while (data.indexOf('\n')>0){
   data=data.replace('\n',' ');
  }
  while (data.indexOf('"')>0){
    data=data.replace('"','\'');
  }
  ec('sendorderforchangepersondata', data, 'abj');
}



function fillSelectsTTtable(){
  if (TStream.arrArea.length>0){
     $("select#new-tt-area").empty(); 
     for (i=0; i<TStream.arrArea.length; i++) { 
       $("select#new-tt-area").append( $('<option value="'+TStream.arrArea[i].AreaCode+'">'+TStream.arrArea[i].AreaName+'</option>'));
     }
    $("select#new-tt-area").selectmenu("refresh"); 
  }
  if (TStream.arrCity.length>0){
     $("select#new-tt-city-type").empty(); 
     for (i=0; i<TStream.arrCity.length; i++) { 
       $("select#new-tt-city-type").append( $('<option shortname="'+TStream.arrCity[i].CityShortName+'" value="'+TStream.arrCity[i].CityCode+'">'+TStream.arrCity[i].CityName+'</option>'));
     }
    $("select#new-tt-city-type").selectmenu("refresh"); 
  }
  if (TStream.arrType.length>0){
    $("select#new-tt-street-type").empty(); 
    for (i=0; i<TStream.arrType.length; i++) { 
      $("select#new-tt-street-type").append( $('<option shortname="'+TStream.arrType[i].TypeShortName+'" value="'+TStream.arrType[i].TypeCode+'">'+TStream.arrType[i].TypeName+'</option>'));
    }
    $("select#new-tt-street-type").selectmenu("refresh"); 
  }
}

function checkTTTable() { //проверяет на заполнение инпута ввода Торговой точки
  el=document.getElementById('popup_prompt_name');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали название.');
     el.focus();
     return false;
  }

  el=document.getElementById('popup_prompt_city_name');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали название населенного пункта.');
     el.focus();
     return false;
  }

  el=document.getElementById('popup_prompt_street_name');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали название улицы.');
     el.focus();
     return false;
  }

  el=document.getElementById('popup_prompt_house_num');
  el.value=mtrim(el.value);
  if (!el.value) {
     jqswMessageError('Вы не указали номер дома.');
     el.focus();
     return false;
  }
  return true;
}

function editrowfromchangeTTtable(id,elem){
  var tr=$("#promptTT-table-tr-"+id);
  var s=tr.find("span.new-tt-name").text();
  s=s.replace('"','');
  s=s.replace('"','');
  var s1=tr.find("span.new-tt-comment").text();
  s1=s1.substr(s1.indexOf('Примечание')+'Примечание'.length+1,s1.length).trim();
  if (tr.attr("act")=="add"){
    jPromptTT('Изменение торговой точки для добавления',s+','+s1, 'Ок','Отмена',function get(result){
      if (result){  
        s1=result.substr(result,result.indexOf("***"));
        s=result.substr(result.indexOf("***")+3);
        res='<span>Добавить торговую точку:</span>\n"<span class="new-tt-name bold">'+s1+'"</span>';
        if (s !=''){
          res=res+'\n <span class="new-tt-comment">Примечание: '+s+'</span>';
        }
        tr.find("td:first").html(res); 
      }
    });
  }
  if (tr.attr("act")=="edit"){
    jPromptTT('Изменение торговой точки для редактирования',s+','+s1, 'Ок','Отмена',function get(result){
      if (result){ 
        var old_tt_name=tr.find("span.old-tt-name").text();
        s1=result.substr(result,result.indexOf("***"));
        s=result.substr(result.indexOf("***")+3);
        res='<span class="new-tt-name bold">"'+s1+'"</span>';
        if (s !=''){
          res=res+'\n <span class="new-tt-comment">Примечание: '+s+'</span>';
        }
        res='<span>Заменить торговую точку</span>\n<span class="old-tt-name bold">'+old_tt_name+'</span> <span>\nна\n</span>'+res;
        tr.find("td:first").html(res); 
      }
    });
  }
}

