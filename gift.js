$( function() {

  var minCost = $("#minCost").val(),
      maxCost = $("#maxCost").val(),
      generalMaxCost=$("#maxCost").val(),
      generalMinCost=$("#minCost").val(),
      clientUnit = $("#user-unit-limit").text(),
      selCategory = [];
      ArrChoiceValFilter=$(".selectpicker").val(); //массив для объединенного фильтра подарков
 var  currentTop=0;
 var  currentItem = $($('.gift .gift-body .items .item')[0]);    

  var sorter = new SortGift();
  if ($('#gift .gift-header').length){
    SetSortMode();    
  }
// plugins

  
  $("#slider").slider({
  	min: 0,
  	max: maxCost,
  	values: [minCost,maxCost],
  	range: true,
  	stop: function(event, ui) {

      minCost = $("#slider").slider("values",0);
      maxCost = $("#slider").slider("values",1);

      $("input#minCost").val(minCost);
    	$("input#maxCost").val(maxCost);

      sorter.byRange(minCost,maxCost);

    },
    slide: function(event, ui){
    		$("input#minCost").val($("#slider").slider("values",0));
    		$("input#maxCost").val($("#slider").slider("values",1));
    }
  });

  $("#gift-items-wrap").mCustomScrollbar({
      mouseWheel:{
        enable: true,
        scrollAmount: 50
      },
      callbacks:{
       //onTotalScrollBack:function(){
      //     scrollGiftContainer(this,"top");
       //},
       onScroll:function(){
           scrollGiftContainer(this,"bottom");
       }
      
      }
    
    });
    



// events

  //  Change gift view list or blocks
  $('#gift .gift-header').on('click', changeViewHandler );
  // sort by cost
  $('#gift .gift-header').on('click', sortByCostHandler );
  // sort by range after input value change
  $('#gift .gift-header .cost-slider input').on('change', sortByRangeInputHandler );
  // available gift
  $('#gift .gift-header .available').on('click', availableBtnHandler );
  
  if ($("#join-loyalty-filter").length){
    $("#join-loyalty-filter").on('change', setJoinFilterHandler) ;
  }
 
  $(document).on('click', categoryFilterHandler );


  // events haldler function
    // toggle view between list or blocks
    function changeViewHandler(event) {
      var target = $(event.target);
      var lastActive = $('.gift .gift-header .toggle-view.active');
      var giftBoxView = $('.gift .gift-body .items');
      //alert();
      if( target.hasClass('toggle-view') && !target.hasClass('active') ) {
        lastActive.removeClass('active');
        target.addClass('active');
        giftBoxView.removeClass('blocks').removeClass('list');

        if(target.hasClass('list-view')) {
          if (getCookie1('loyalty')==null){
            setLoyaltyCookie('0','1');  
          }
          else{
            setLoyaltyCookie('0',getLoyaltyCookie(1));
          }      
          giftBoxView.addClass('list');
          $("li.item img.sup-new-gift-catch").attr("src","/wareimages/loyality_small/25-percent-small.png");
          $("li.item img.sup-new-gift-new").attr("src","/wareimages/loyality_small/new-gift-small.png");  
          $("li.item img.sup-new-gift-catch").addClass("small-item");
          $("li.item img.sup-new-gift-new").addClass("small-item2"); 
          //$(".sup-new-gift-catch.small-item").css("left",$("li.item div.description").position().left-70+"px");     
          //$(".sup-new-gift-new.small-item2").css("left",$("li.item div.description").position().left-70+"px");    
        }
        if(target.hasClass('blocks-view')) {
          if (getCookie1('loyalty')==null){
            setLoyaltyCookie('1','1');  
          }
          else{
            setLoyaltyCookie('1',getLoyaltyCookie(1));
          }      
          giftBoxView.addClass('blocks');
          $("li.item img.sup-new-gift-catch").attr("src","/wareimages/loyality_big/25-percent-big.png");
          $("li.item img.sup-new-gift-new").attr("src","/wareimages/loyality_big/new-gift-big.png");  
          $("li.item img.sup-new-gift-catch").removeClass("small-item");
          $("li.item img.sup-new-gift-new").removeClass("small-item2");  
          $(".sup-new-gift-catch").css("left","");
          $(".sup-new-gift-new").css("left","");     
        }

      }
  }

    //  sort gifts by cost
    function sortByCostHandler(event) {
      var target,
          sortBtn,
          isDecsSort;

      target = $(event.target);

      if( target.parents().hasClass('cost-filter') ) {
         sortBtn = $('.gift .gift-header .cost-filter');
         isDecsSort  = sortBtn.hasClass('desc');

         if(isDecsSort) {
           sorter.asc();
           sortBtn.removeClass('desc').addClass('asc');
           if (getCookie1('loyalty')==null){
             setLoyaltyCookie('1','1');  
           }
           else{
             setLoyaltyCookie(getLoyaltyCookie(0),'1');
           }  
          } else {
          sorter.desc();
          sortBtn.removeClass('asc').addClass('desc');
          if (getCookie1('loyalty')==null){
            setLoyaltyCookie('1','0');  
          }
          else{
            setLoyaltyCookie(getLoyaltyCookie(0),'0');
          }       
         }
      }

    }
    
    function SetSortMode() {
      var sortBtn = $('.gift .gift-header .cost-filter');
      if (getCookie1('loyalty')!=null){
         if (getLoyaltyCookie(1)=='0'){
           sorter.desc(); 
           sortBtn.removeClass('asc').addClass('desc'); 
         }
         if (getLoyaltyCookie(1)=='1'){
           sorter.asc();
           sortBtn.removeClass('desc').addClass('asc'); 
         }
         if (getLoyaltyCookie(1)=='2'){  
           sorter. alpha();
         }     
         if (getCookie1('loyalty').length>1){ 
           var giftBoxView = $('.gift .gift-body .items');
           var block = $('.toggle-view.blocks-view'); 
           var list = $('.toggle-view.list-view'); 
             
           giftBoxView.removeClass('blocks').removeClass('list');
           
           if (getLoyaltyCookie(0)=='0'){
             block.removeClass('active');
             list.addClass('active');  
             giftBoxView.addClass('list');
             $("li.item img.sup-new-gift-catch").attr("src","/wareimages/loyality_small/25-percent-small.png");
             $("li.item img.sup-new-gift-new").attr("src","/wareimages/loyality_small/new-gift-small.png");  
             $("li.item img.sup-new-gift-catch").addClass("small-item");
             $("li.item img.sup-new-gift-new").addClass("small-item2"); 
            // $(".sup-new-gift-catch.small-item").css("left",$("li.item div.description").position().left-70+"px");     
            // $(".sup-new-gift-new.small-item2").css("left",$("li.item div.description").position().left-70+"px");    
           }
           else{
             list.removeClass('active');
             block.addClass('active');     
             giftBoxView.addClass('blocks'); 
             $("li.item img.sup-new-gift-catch").attr("src","/wareimages/loyality_big/25-percent-big.png");
             $("li.item img.sup-new-gift-new").attr("src","/wareimages/loyality_big/new-gift-big.png");  
             $("li.item img.sup-new-gift-catch").removeClass("small-item");
             $("li.item img.sup-new-gift-new").removeClass("small-item2");  
             $(".sup-new-gift-catch").css("left","");
             $(".sup-new-gift-new").css("left","");        
           }
         }
         
      }else{
           setLoyaltyCookie('1','1');
        }
        
       
        
        if (getCookie1('loyalty').length<3) {
          deleteCookie_('loyalty',"/");  
          setLoyaltyCookie('1','1');  
        }
      sorter.byRange(minCost,maxCost);      
    }

    // input change handler
    function sortByRangeInputHandler(event) {
      var min,
          max;
     
      min = parseFloat($("input#minCost").val());
      max = parseFloat($("input#maxCost").val());
        
      min = isNaN(min) ? minCost : min;
      max = isNaN(max) ? maxCost : max;
      
      min = min<generalMinCost ? generalMinCost : min;
      max = max>generalMaxCost ? generalMaxCost : max;   

      if(min > max){
        minCost = max;
        $("input#minCost").val(minCost);
      } else if (max > maxCost) {
        maxCost = max;
        $("input#maxCost").val(maxCost);
      } else if(min > max){
        maxCost = min;
        $("input#maxCost").val(maxCost);
    	} else {
        minCost = min;
        maxCost = max;
        $("input#minCost").val(minCost);
        $("input#maxCost").val(maxCost);
      }

      $("#slider").slider("values",0,minCost);
      $("#slider").slider("values",1,maxCost);

      sorter.byRange(minCost,maxCost);

    }

    // handler click -->  Доступные товары
    function availableBtnHandler(event) {
      var target,
          isAvailable,
          isAllWares;

      target = $(event.target);
      ///target.text('Все товары');
      //target.text('Доступные товары');   
      isAvailable = target.parents().hasClass('available');
      isAllWares = target.hasClass('all');  
      console.log("clientUnit --> ", minCost );

      if(isAvailable) {
        if (isAllWares){
          target.attr('title','Доступные товары');  
          target.text('Доступные товары');  
          $("input#minCost").val(minCost);
          $("input#maxCost").val(maxCost);
          
          $("#slider").slider("values",0,minCost);
          $("#slider").slider("values",1,maxCost);

          sorter.byRange(minCost,maxCost);
            
        } 
        else{  
          target.attr('title','Все товары');  
          target.text('Все товары');   
            
          $("input#minCost").val(minCost);
          $("input#maxCost").val(clientUnit);

          $("#slider").slider("values",0,minCost);
          $("#slider").slider("values",1,clientUnit);

          sorter.byRange(minCost,clientUnit);
        }
        target.toggleClass('all');  
          
      }

    }
    
    function setJoinFilterHandler(event) {

      var arr=$(".selectpicker").val();
      if (arr !=null){
        if (ArrChoiceValFilter==null){  // Нажатие впервые
          if (arr.indexOf('1')>-1){
            sorter.asc();
            if (getCookie1('loyalty')==null){
              setLoyaltyCookie('1','1');  
            }
            else{
              setLoyaltyCookie(getLoyaltyCookie(0),'1');
            }   
          }
          if (arr.indexOf('2')>-1){  
            sorter.desc();
            if (getCookie1('loyalty')==null){
              setLoyaltyCookie('1','0');  
            }
            else{
              setLoyaltyCookie(getLoyaltyCookie(0),'0');
            }       
          }
          if (arr.indexOf('5')>-1){  
            sorter.alpha();
            if (getCookie1('loyalty')==null){
              setLoyaltyCookie('1','2');  
            }
            else{
              setLoyaltyCookie(getLoyaltyCookie(0),'2');
            }         
          }    
          if (arr.indexOf('3')>-1){ 
            CheckMotulFilter(); 
            setSortRange('ClientUnit');
          }
          if (arr.indexOf('4')>-1){   
            CheckMotulFilter();     
            sorter.byNew(true,false);   
          }    
        }
        else{
            if ((arr.indexOf('3')<0) && (ArrChoiceValFilter.indexOf('3')>-1)){ //Сняли галочку доступные товары
             setSortRange('default');
           }
           if ((arr.indexOf('4')<0) && (ArrChoiceValFilter.indexOf('4')>-1)){ //Сняли галочку новинки
             sorter.byNew(false,false);  
           }
           if ((arr.indexOf('3')>-1) && (ArrChoiceValFilter.indexOf('3')<0)){ //Поставили галочку доступные товары
             CheckMotulFilter();
             setSortRange('ClientUnit');
           }
           if ((arr.indexOf('4')>-1) && (ArrChoiceValFilter.indexOf('4')<0)){ //Поставили галочку Новинки
             CheckMotulFilter();      
             sorter.byNew(true,false);  
             //arrFilterValue[arrFilterValue.length]='4';    
           }
 
           //console.log(arr) ;   
           //console.log(ArrChoiceValFilter) ;
           if (arr.indexOf('1')>-1){ //Поставили галочку От дешевых к дорогим
             if (!(ArrChoiceValFilter.indexOf('1')>-1)){
               sorter.asc();
               if (getCookie1('loyalty')==null){
                 setLoyaltyCookie('1','1');  
               }
               else{
                 setLoyaltyCookie(getLoyaltyCookie(0),'1');
               }
               setCurrentFilterValue(1,arr);       
             }
           }
           if (arr.indexOf('2')>-1){ //Поставили галочку От дорогим
             if (!(ArrChoiceValFilter.indexOf('2')>-1)){
               sorter.desc();
               if (getCookie1('loyalty')==null){
                 setLoyaltyCookie('1','0');  
               }
               else{
                 setLoyaltyCookie(getLoyaltyCookie(0),'0');
               }       
               setCurrentFilterValue(2,arr);         
             }
           }
           if (arr.indexOf('5')>-1){ //Поставили галочку По алфавиту
             if (!(ArrChoiceValFilter.indexOf('5')>-1)){
               sorter.alpha();
               if (getCookie1('loyalty')==null){
                 setLoyaltyCookie('1','2');  
               }
               else{
                 setLoyaltyCookie(getLoyaltyCookie(0),'2');
               }            
               setCurrentFilterValue(5,arr);     
             }
           } 
           if ((arr.indexOf('1')<0) && (arr.indexOf('2')<0) && (arr.indexOf('5')<0)){ //сняты все галочки сортировки
             if (ArrChoiceValFilter.indexOf('1')>-1){   
               setCurrentFilterValue(1,arr);  
             }
             if (ArrChoiceValFilter.indexOf('2')>-1){   
               setCurrentFilterValue(2,arr);       
             }
             if (ArrChoiceValFilter.indexOf('5')>-1){   
               setCurrentFilterValue(5,arr);  
             }
           }
        }
      }//arr !=null
      else{
        if (ArrChoiceValFilter !=null){
          if (ArrChoiceValFilter.indexOf('3')>-1){
            setSortRange('default');
          }  
          if (ArrChoiceValFilter.indexOf('4')>-1){
            sorter.byNew(false,true);
          }
          if (ArrChoiceValFilter.indexOf('1')>-1){
            $('.selectpicker').selectpicker('val',['1']);  
          }   
          if (ArrChoiceValFilter.indexOf('2')>-1){
            $('.selectpicker').selectpicker('val',['2']);  
          } 
          if (ArrChoiceValFilter.indexOf('5')>-1){
            $('.selectpicker').selectpicker('val',['5']);  
          }
        }
      }    
      ArrChoiceValFilter=$(".selectpicker").val();    
                     
    }

    function CheckMotulFilter(){
      var elem=$("p.available-motul");
      if (elem.hasClass('cl')) {
       setFilterMotul(elem);
      }
    }
    
    function setSortRange(mode){
      if (mode=="default"){
        $("input#minCost").val(minCost);
        $("input#maxCost").val(maxCost);
          
        $("#slider").slider("values",0,minCost);
        $("#slider").slider("values",1,maxCost);
 
        sorter.byRange(minCost,maxCost);
      }
      if (mode=="ClientUnit"){
        $("input#minCost").val(minCost);
        $("input#maxCost").val(clientUnit);
  
        $("#slider").slider("values",0,minCost);
        $("#slider").slider("values",1,clientUnit);

        sorter.byRange(minCost,clientUnit);   
      }
    }
    
    function scrollGiftContainer(el,direction){
        //$("#gift-items-wrap").mCustomScrollbar("scrollTo","#square448923");
        var OnTop=currentTop<el.mcs.top;
        console.log('cur='+currentTop);
        var delta,qv,i;
        //if (OnTop){delta=el.mcs.top-currentTop}
        //else{delta=el.mcs.top-currentTop}
        delta=el.mcs.top-currentTop
        qv=Math.abs(parseInt(delta/112));
        if (qv==0){qv=1;}
        currentTop=el.mcs.top;
        console.log('el='+el.mcs.top);
        console.log(OnTop);
        console.log('del='+delta);
        console.log('qv='+qv);
        var IsBlockVew=$("a.toggle-view.blocks-view").hasClass("active");
        if (IsBlockVew){
            
        }
        else{
           if (OnTop){ 
             if (currentItem.attr("id") != $($('.gift .gift-body .items .item')[0]).attr("id")){  
              //$("#gift-items-wrap").mCustomScrollbar("update");    
              i=0;
              while(i<qv){
                currentItem=currentItem.prev();   
                i++;  
              }     
            }
          }
          else{
            //$("#gift-items-wrap").mCustomScrollbar("scrollTo",currentItem.next());  
             i=0;
             while(i<qv){
               currentItem=currentItem.next();   
               i++;  
             }
         } 
         console.log(currentItem);   
         console.log('------------------------');
         $("#gift-items-wrap").mCustomScrollbar("scrollTo",currentItem); 
         setTimeout(function(){$("#gift-items-wrap").mCustomScrollbar("stop")}, 1000);
        
         //$("#gift-items-wrap").mCustomScrollbar("disable");
       }
         
     }        

    
    function setCurrentFilterValue(val,arr){
       var arrFilterValue=[];
       arrFilterValue[arrFilterValue.length]=val;
       if (arr.indexOf('3')>-1){    
         arrFilterValue[arrFilterValue.length]='3'; 
       }
       if (arr.indexOf('4')>-1){    
         arrFilterValue[arrFilterValue.length]='4'; 
       }
       $('.selectpicker').selectpicker('val',arrFilterValue);   
    }
    
    // category Filter Handler
    function categoryFilterHandler(event) {
      var target,
          isClosed,
          isMainList,
          isSubList,
          isChecked,
          targetInput,
          inputId,
          isClear,
          inputs,
          ul, li,
          clearBtn,
          isDeleteBtn;

      target = $(event.target);
      isClosed = target.hasClass('closed');
      isMainList = target.hasClass('title');
      isSubList = target.hasClass('category-name');
      isClear = target.hasClass('clear-btn');
      isApply = target.hasClass('apply-btn');
      clearBtn = $('#gift .gift-header .selected-category .clear-btn');
      isDeleteBtn = target.hasClass('del-btn');
          
        
      if( !target.parents('.filter-by-category').length && !$('#gift .gift-header .filter-by-category p.title').hasClass('closed')) {
        $('#gift .gift-header .filter-by-category p.title').toggleClass('closed');
      }

      // toggle Main List or Sub List
      if( isMainList || isSubList ) {
        target.toggleClass('closed');
        return;
      }
      // toggle inputs checkbox
      if(  target.hasClass('txt') ) {
        targetInput = target.parent('li').find('input');
        isChecked = targetInput.is(':checked');

          if( isChecked ) {
            targetInput.prop( "checked", false );
          } else {
            targetInput.prop( "checked", true );
          }
        return;
      }
      // clear all input in filter-by-category
      if( isClear ) {
        console.log('clear');
        $('#gift .gift-header .filter-by-category input:checkbox').prop( "checked", false );
        ul = $('#gift .gift-header .selected-category ul').remove();
        // clearBtn hide
        if( ul.length ) {
          clearBtn.toggleClass('hide');
        }
        sorter.clearByCategory();
        return;
      }

      // isApply
      if( isApply ) {
        selCategory = $('#gift .gift-header .filter-by-category input:checked').parent('li');
        if( !selCategory.length ) {
          return;
        }
        // close MainList
        $('#gift .gift-header .filter-by-category .title').toggleClass('closed');
        // remove old selected list
        ul = $('#gift .gift-header .selected-category ul').remove();
        // clearBtn hide
        if( ul.length ) {
          clearBtn.toggleClass('hide');
        }
        ul = $("<ul>");
        selCategory.each(function() {
          var clone = $(this).clone().append('<span class="del-btn">&times;</span>');
          ul.append(clone);
        })
        $('#gift .gift-header .selected-category').prepend(ul);
        clearBtn.toggleClass('hide');
        sorter.byCategory(selCategory);
      }

      // delete btn
      if( isDeleteBtn ) {

        targetInput = target.parent('li').find('input');
        inputId = targetInput.attr("id");


        $('#'+inputId).prop( "checked", false );
        target.parent('li').remove();
        li = $('#gift .gift-header .selected-category ul li');
        sorter.byCategory(li);

        if( !li.length ) {
          clearBtn.toggleClass('hide');
          $('#gift .gift-header .selected-category ul').remove();
          sorter.clearByCategory();
        }

      }
    }
  

    // Сортировка может проводиться по возрастанию (ASC) или по убыванию (DESC).
    // по умолчанию предполагается режим сортировки по возрастанию (ASC).

    function SortGift() {
      var itemsContainer,
          items,
          itemsArr,
          wrapContainer;

      wrapContainer = $('#gift-items-wrap ul');
      itemsContainer = $('.gift .gift-body .items');
      items = $('.gift .gift-body .items .item');

      init();
      this.asc = asc;
      this.desc = desc;
      this.alpha = alpha;
      this.byRange = byRange;
      this.byNew = byNew;
      this.byCategory = byCategory;
      this.clearByCategory = clearByCategory;

      function init() {

        byRange(minCost,maxCost);
        items.sort(dirASC);
        render(items);
       
        if (getCookie1('loyalty')!=null){
         if (getLoyaltyCookie(1)=='0'){
           ArrChoiceValFilter=['2']; 
         }
         if (getLoyaltyCookie(1)=='1'){
           ArrChoiceValFilter=['1']; 
         }
         if (getLoyaltyCookie(1)=='2'){  
           ArrChoiceValFilter=['5']; 
         }     
        }else{
          ArrChoiceValFilter=['1']; 
        }        
        $(".selectpicker").selectpicker("val",ArrChoiceValFilter);           
      };

      function asc() {
        items.sort(dirASC);
        render(items);

        return this;
      };

      function desc() {
        items.sort(dirDESC);
        render(items);

        return this;
      };
        
      function alpha() {
        items.sort(dirName);
        render(items);

        return this;
      };    

      function clearByCategory() {
        items.removeClass('hide');
        byRange(minCost,maxCost);


      }

      function byRange(min, max) {
        var self;
        var isnull;
        if (($(".selectpicker").length) && ($(".selectpicker").val()!=null)) {
          var arr=$(".selectpicker").val();
          if (arr.indexOf('4')>-1) {isnull=true;}
          else {isnull=false;}   
        } 
        else {isnull=false;} 
        $(".selectpicker").val();  
        $.each( items, function(){
          self = $(this);
          if (isnull){isRangeWithCheck(self, min, max); }   
          else{isRange(self, min, max);}

        });

      };
        
      function byNew(flag,isnull) {
        var self;
        $.each( items, function(){
          self = $(this);
          if (isnull){isNewNormal(self,flag);}
          else {isNewWithCheck(self,flag); }    
        });
      };
        
      function isRange(item, min, max) {
       var itemCost = item.attr('_val');
        //console.log('itemCost', min, max, itemCost );
        if ($("p.available-motul").hasClass('cl')){
          if( (parseInt(min) <= parseInt(itemCost)) && (parseInt(itemCost) <= parseInt(max)) && (item.attr('_warebrandcode')=='58') ){
            item.removeClass('hide');
            return true;
          } else {
            item.addClass('hide');
            //console.log('itemCoster', min, max, itemCost );    
            return false;
          }
        }
        else{  
          if( (parseInt(min) <= parseInt(itemCost)) && (parseInt(itemCost) <= parseInt(max)) ) {
            item.removeClass('hide');
            return true;
          } else {
            item.addClass('hide');
            //console.log('itemCoster', min, max, itemCost );    
            return false;
          }
        }
      };
        
      function isRangeWithCheck(item, min, max) {
       var itemCost = item.attr('_val');
       var isnew = item.attr('_isnew');      
        //console.log('itemCost', min, max, itemCost );
        if (isnew=='new') {
          if ($("p.available-motul").hasClass('cl')){
            if( (parseInt(min) <= parseInt(itemCost)) && (parseInt(itemCost) <= parseInt(max)) && (item.attr('_warebrandcode')=='58') ){
              item.removeClass('hide');
              return true;
            } else {
              item.addClass('hide');
              //console.log('itemCoster', min, max, itemCost );    
              return false;
            }
          }
          else{  
            if( (parseInt(min) <= parseInt(itemCost)) && (parseInt(itemCost) <= parseInt(max)) ) {
              item.removeClass('hide');
              return true;
            } else {
              item.addClass('hide');
              //console.log('itemCoster', min, max, itemCost );    
              return false;
            }
          }
        }
        else{ return false;}  
      };
    

    
      function isNewNormal(item,flag) {//если фильтр пустой
        var isnew = item.attr('_isnew');
        var arr=$(".selectpicker").val();
        if ( isRange(item,minCost,maxCost) ){
          if (isnew=='new') {
            if (flag){item.removeClass('hide');}
            else {/*item.addClass('hide');*/}    
            return flag    
          } 
          else {
            if (flag){item.addClass('hide');}
            else {item.removeClass('hide');}    
            return !flag;
          }
        }
      };
          
      function isNewWithCheck(item,flag) { //если фильтр не пустой
        var isnew = item.attr('_isnew');
        var arr=$(".selectpicker").val();
        if (arr.indexOf('3')>-1){   
          if ( isRange(item,minCost,clientUnit) ){
            if (isnew=='new') {
              if (flag){item.removeClass('hide');}
              else {/*item.addClass('hide');*/}    
              return flag    
            } 
            else {
              if (flag){item.addClass('hide');}
              else {item.removeClass('hide');}    
              return !flag;
            }
          }
        }
        else{
          if ( isRange(item,minCost,maxCost) ){
            if (isnew=='new') {
              if (flag){item.removeClass('hide');}
              else {/*item.addClass('hide');*/}    
              return flag    
            } 
            else {
              if (flag){item.addClass('hide');}
              else {item.removeClass('hide');}    
              return !flag;
            }
          }
        }
      };      
    

      // compare function
      function dirASC(itemA, itemB) {

        itemA = $(itemA).attr('_val');
        itemB = $(itemB).attr('_val');
        return parseFloat(itemA) - parseFloat(itemB);
      };

      function dirDESC(itemA, itemB) {

        itemA = $(itemA).attr('_val');
        itemB = $(itemB).attr('_val');
        return parseFloat(itemB) - parseFloat(itemA);
      };
        
      function dirName(itemA, itemB) {

        itemA = $(itemA).attr('title');
        itemB = $(itemB).attr('title');
        return itemA  >  itemB ? 1 : -1 ;  
      };

      function byCategory( categoryList ) {
        var resultArr,
            categoryFilter,
            itemAttr,
            li;

        items.addClass('hide');
        console.log('filter by category', categoryList);

        resultArr = [];
        giftList = [];
        categoryFilter = getCheckboxAttrArr(categoryList);
        console.log( 'categoryFilter', categoryFilter );




        // items.each(function() {
        $.each( items, function() {
          li = $(this);
          itemAttr = getGiftItemAttr( li );

          // console.log('GiftAttr -- ', itemAttr);

          categoryFilter.each(function(i,filterItem) {
              // console.log('FilterAttr -- ', filterItem);

              if( filterItem.attrgroup == itemAttr.attrgroup ) {
                if( itemAttr.codeattr.indexOf(filterItem.codeattr) === itemAttr.codeval.indexOf(filterItem.codeval)) {
                  console.log("filter ok -->", li);
                  if(isRange(li, minCost,maxCost)) {
                    resultArr.push(li);
                    li.removeClass('hide');
                  }

                }
              }
          })


        })

        console.log('resultArr --> ', resultArr);


        // sorter.byRange(minCost,maxCost);
      };

      function createCategoryFilter( node, filterAttr ) {
        var result = false;

        filterAttr.each(function(i,filterItem) {

            if( filterItem.attrgroup == itemAttr.attrgroup ) {
              debugger;
              if( itemAttr.codeattr.indexOf(filterItem.codeattr) === itemAttr.codeval.indexOf(filterItem.codeval)) {
                console.log("filter ok -->", node );
                if(isRange( node, minCost, maxCost )) {
                  resultArr.push(li);
                  li.removeClass('hide');
                  result = true;
                }

              }
            }
        })

      }

      function getCheckboxAttrArr(items) {
        return items.map(function(i, item) {
            var input = $(item).find('input');

          return {
              attrgroup: input.attr('groupcode_'),
              codeval: input.attr('secondgroupcode_'),
              codeattr: input.attr('secondgroupsubcode_')

            }
          })
      };

      function getGiftItemAttr(li) {
        return {
          attrgroup: li.attr('attrgroup_'),
          codeval: li.attr('codeval_') ,
          codeattr: li.attr('codeattr_')
        }
      };



      // render gifts list items
      function render(itemArr) {
      // remove itemsContainer
        wrapContainer.empty();

        $.each( itemArr, function( ){
          itemsContainer.append(this);
        });

        wrapContainer.append(itemsContainer);
      };

    };


})
