   function sortGrid( filterType ) {
        var table,
            tableRowGreen,tableRowYellow,tableRowRed,tableRowYellowGreen,
            tableOrigRowGreen,tableOrigRowYellowGreen,tableOrigRowYellow,tableOrigRowRed,// товары, найденные через сравнительные номера
            rowsArrGreen,rowsArrYellow,rowsArrRed,rowsArrYellowGreen,
            rowsOrigArrGreen,rowsOrigArrYellow,rowsOrigArrYellowGreen,rowsOrigArrRed,rowOrig,// товары, найденные через сравнительные номера
            resultTable = [],
            tbody;


          // fun sorter
        var compare = function(rowA, rowB) {
          // var rowA, rowB;

          if( filterType === 'name' ) {
            rowA = $(rowA).find('.col-discription .title').text();
            rowB = $(rowB).find('.col-discription .title').text();
          } else {
            rowA = $(rowA).find('.cost:not(.hide)').text().replace(' ', '');
            rowB = $(rowB).find('.cost:not(.hide)').text().replace(' ', '');
          }

          // console.log(parseFloat(rowACost) - parseFloat(rowBCost));

          switch (filterType) {
            case 'asc':
              return parseFloat(rowA) - parseFloat(rowB);
              break;
            case 'decs':
            return parseFloat(rowB) - parseFloat(rowA);
              break;
            case 'name':
            return rowA  >  rowB ? 1 : -1 ;
              break;
          }
        };
        
        table = $('#search-table');
        tbody = table.find('tbody')[0];
        // Составить массив из table-row
        tableRowGreen = table.find('.table-row.green');
        tableRowYellow = table.find('.table-row.yellow');
        tableRowYellowGreen = table.find('.table-row.yellow-green');
        tableRowRed = table.find('.table-row.red');
        tableRowNoCost = table.find('.table-row.no-cost');
        tableRowOrigNum = table.find('.table-row.orig-num');
        if ($("tr.table-row.orig-num-str").length){
          tableOrigRowGreen = table.find('.table-row-second-group.green');
          tableOrigRowYellowGreen = table.find('.table-row-second-group.yellow-green');    
          tableOrigRowYellow = table.find('.table-row-second-group.yellow');
          tableOrigRowRed = table.find('.table-row-second-group.red');  
          rowOrig=table.find('tr.table-row.orig-num-str');      
          rowsOrigArrGreen = [].slice.call(tableOrigRowGreen);
          rowsOrigArrYellowGreen = [].slice.call(tableOrigRowYellowGreen);  
          rowsOrigArrYellow = [].slice.call(tableOrigRowYellow);
          rowsOrigArrRed = [].slice.call(tableOrigRowRed); 
          rowsOrigArrGreen.sort(compare);
          rowsOrigArrYellowGreen.sort(compare);  
          rowsOrigArrYellow.sort(compare);
          rowsOrigArrRed.sort(compare);    
        }
        rowsArrGreen = [].slice.call(tableRowGreen);
        rowsArrYellowGreen = [].slice.call(tableRowYellowGreen);
        rowsArrYellow = [].slice.call(tableRowYellow);
        rowsArrRed = [].slice.call(tableRowRed);
        rowsArrNoCost = [].slice.call(tableRowNoCost);
        rowsArrOrigNum = [].slice.call(tableRowOrigNum);
        // сортировать
        rowsArrGreen.sort(compare);
        rowsArrYellowGreen.sort(compare);
        rowsArrYellow.sort(compare);
        rowsArrRed.sort(compare);
        rowsArrNoCost.sort(compare);
        if( filterType === 'name' ) {
          rowsArrOrigNum.sort(compare);
        }
        // console.log(rowsArr);

        // найдем вложеные таблицы по атрибуту data и отсортируем их запихнем в resultTable
        for (var i = 0; i < rowsArrGreen.length; i++) {
          resultTable.push(rowsArrGreen[i]);
          var id = $(rowsArrGreen[i]).attr('id');
          // Составить массив из вложеных таблиц
          var subRow = $('[data = ' + id + '-green]');
          var subRowArrGreen = [].slice.call(subRow);
            
          subRow = $('[data = ' + id + '-yellow-green]');    
          var subRowArrYellowGreen = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-yellow]');    
          var subRowArrYellow = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-red]');  
          var subRowArrRed = [].slice.call(subRow);
          if (subRowArrGreen.length) {
            // сортировать
            subRowArrGreen.sort(compare);
            for (var j = 0; j < subRowArrGreen.length; j++) {
              resultTable.push(subRowArrGreen[j]);
            }
          }
          if (subRowArrYellowGreen.length) {
            // сортировать
            subRowArrYellowGreen.sort(compare);
            for (var j = 0; j < subRowArrYellowGreen.length; j++) {
              resultTable.push(subRowArrYellowGreen[j]);
            }
          }    
          if (subRowArrYellow.length) {
            // сортировать
            subRowArrYellow.sort(compare);
            for (var j = 0; j < subRowArrYellow.length; j++) {
              resultTable.push(subRowArrYellow[j]);
            }
          }
          if (subRowArrRed.length) {
            // сортировать
            subRowArrRed.sort(compare);
            for (var j = 0; j < subRowArrRed.length; j++) {
              resultTable.push(subRowArrRed[j]);
            }
          }
        }
        for (var i = 0; i < rowsArrYellowGreen.length; i++) {
          resultTable.push(rowsArrYellowGreen[i]);
          var id = $(rowsArrYellowGreen[i]).attr('id');
          // Составить массив из вложеных таблиц
          var subRow = $('[data = ' + id + '-green]');
          var subRowArrGreen = [].slice.call(subRow);
            
          subRow = $('[data = ' + id + '-yellow-green]');    
          var subRowArrYellowGreen = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-yellow]');    
          var subRowArrYellow = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-red]');  
          var subRowArrRed = [].slice.call(subRow);
          if (subRowArrGreen.length) {
            // сортировать
            subRowArrGreen.sort(compare);
            for (var j = 0; j < subRowArrGreen.length; j++) {
              resultTable.push(subRowArrGreen[j]);
            }
          }
          if (subRowArrYellowGreen.length) {
            // сортировать
            subRowArrYellowGreen.sort(compare);
            for (var j = 0; j < subRowArrYellowGreen.length; j++) {
              resultTable.push(subRowArrYellowGreen[j]);
            }
          }    
          if (subRowArrYellow.length) {
            // сортировать
            subRowArrYellow.sort(compare);
            for (var j = 0; j < subRowArrYellow.length; j++) {
              resultTable.push(subRowArrYellow[j]);
            }
          }
          if (subRowArrRed.length) {
            // сортировать
            subRowArrRed.sort(compare);
            for (var j = 0; j < subRowArrRed.length; j++) {
              resultTable.push(subRowArrRed[j]);
            }
          }
        }
        for (var i = 0; i < rowsArrYellow.length; i++) {
          resultTable.push(rowsArrYellow[i]);
          var id = $(rowsArrYellow[i]).attr('id');
          var subRow = $('[data = ' + id + '-green]');
          var subRowArrGreen = [].slice.call(subRow);
            
          subRow = $('[data = ' + id + '-yellow-green]');    
          var subRowArrYellowGreen = [].slice.call(subRow);

          subRow = $('[data = ' + id + '-yellow]');    
          var subRowArrYellow = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-red]');  
          var subRowArrRed = [].slice.call(subRow);
          if (subRowArrGreen.length) {
            // сортировать
            subRowArrGreen.sort(compare);
            for (var j = 0; j < subRowArrGreen.length; j++) {
              resultTable.push(subRowArrGreen[j]);
            }
          }
          if (subRowArrYellowGreen.length) {
            // сортировать
            subRowArrYellowGreen.sort(compare);
            for (var j = 0; j < subRowArrYellowGreen.length; j++) {
              resultTable.push(subRowArrYellowGreen[j]);
            }
          }    
          if (subRowArrYellow.length) {
            // сортировать
            subRowArrYellow.sort(compare);
            for (var j = 0; j < subRowArrYellow.length; j++) {
              resultTable.push(subRowArrYellow[j]);
            }
          }
          if (subRowArrRed.length) {
            // сортировать
            subRowArrRed.sort(compare);
            for (var j = 0; j < subRowArrRed.length; j++) {
              resultTable.push(subRowArrRed[j]);
            }
          }
    
        }
        for (var i = 0; i < rowsArrRed.length; i++) {
          resultTable.push(rowsArrRed[i]);
          var id = $(rowsArrRed[i]).attr('id');
          var subRow = $('[data = ' + id + '-green]');
          var subRowArrGreen = [].slice.call(subRow);
            
          subRow = $('[data = ' + id + '-yellow-green]');    
          var subRowArrYellowGreen = [].slice.call(subRow);  
          
          subRow = $('[data = ' + id + '-yellow]');    
          var subRowArrYellow = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-red]');  
          var subRowArrRed = [].slice.call(subRow);
          if (subRowArrGreen.length) {
            // сортировать
            subRowArrGreen.sort(compare);
            for (var j = 0; j < subRowArrGreen.length; j++) {
              resultTable.push(subRowArrGreen[j]);
            }
          }
          if (subRowArrYellowGreen.length) {
            // сортировать
            subRowArrYellowGreen.sort(compare);
            for (var j = 0; j < subRowArrYellowGreen.length; j++) {
              resultTable.push(subRowArrYellowGreen[j]);
            }
          }   
          if (subRowArrYellowGreen.length) {
            // сортировать
            subRowArrYellowGreen.sort(compare);
            for (var j = 0; j < subRowArrYellowGreen.length; j++) {
              resultTable.push(subRowArrYellowGreen[j]);
            }
          }    
          if (subRowArrYellow.length) {
            // сортировать
            subRowArrYellow.sort(compare);
            for (var j = 0; j < subRowArrYellow.length; j++) {
              resultTable.push(subRowArrYellow[j]);
            }
          }
          if (subRowArrRed.length) {
            // сортировать
            subRowArrRed.sort(compare);
            for (var j = 0; j < subRowArrRed.length; j++) {
              resultTable.push(subRowArrRed[j]);
            }
          }
    
        }
       
        for (var i = 0; i < rowsArrNoCost.length; i++) {
          resultTable.push(rowsArrNoCost[i]);
          var id = $(rowsArrNoCost[i]).attr('id');
          var subRow = $('[data = ' + id + '-green]');
          var subRowArrGreen = [].slice.call(subRow);
            
          subRow = $('[data = ' + id + '-yellow-green]');    
          var subRowArrYellowGreen = [].slice.call(subRow);  
          
          subRow = $('[data = ' + id + '-yellow]');    
          var subRowArrYellow = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-red]');  
          var subRowArrRed = [].slice.call(subRow);
          if (subRowArrGreen.length) {
            // сортировать
            subRowArrGreen.sort(compare);
            for (var j = 0; j < subRowArrGreen.length; j++) {
              resultTable.push(subRowArrGreen[j]);
            }
          }
          if (subRowArrYellowGreen.length) {
            // сортировать
            subRowArrYellowGreen.sort(compare);
            for (var j = 0; j < subRowArrYellowGreen.length; j++) {
              resultTable.push(subRowArrYellowGreen[j]);
            }
          }    
          if (subRowArrYellow.length) {
            // сортировать
            subRowArrYellow.sort(compare);
            for (var j = 0; j < subRowArrYellow.length; j++) {
              resultTable.push(subRowArrYellow[j]);
            }
          }
          if (subRowArrRed.length) {
            // сортировать
            subRowArrRed.sort(compare);
            for (var j = 0; j < subRowArrRed.length; j++) {
              resultTable.push(subRowArrRed[j]);
            }
          }
    
        }
        
        for (var i = 0; i < rowsArrOrigNum.length; i++) {
          resultTable.push(rowsArrOrigNum[i]);
          var id = $(rowsArrOrigNum[i]).attr('id');
          var subRow = $('[data = ' + id + '-green]');
          var subRowArrGreen = [].slice.call(subRow);
            
          subRow = $('[data = ' + id + '-yellow-green]');    
          var subRowArrYellowGreen = [].slice.call(subRow);   
          
          subRow = $('[data = ' + id + '-yellow]');    
          var subRowArrYellow = [].slice.call(subRow);
          
          subRow = $('[data = ' + id + '-red]');  
          var subRowArrRed = [].slice.call(subRow);
          if (subRowArrGreen.length) {
            // сортировать
            subRowArrGreen.sort(compare);
            for (var j = 0; j < subRowArrGreen.length; j++) {
              resultTable.push(subRowArrGreen[j]);
            }
          }
          if (subRowArrYellowGreen.length) {
            // сортировать
            subRowArrYellowGreen.sort(compare);
            for (var j = 0; j < subRowArrYellowGreen.length; j++) {
              resultTable.push(subRowArrYellowGreen[j]);
            }
          }    
          if (subRowArrYellow.length) {
            // сортировать
            subRowArrYellow.sort(compare);
            for (var j = 0; j < subRowArrYellow.length; j++) {
              resultTable.push(subRowArrYellow[j]);
            }
          }
          if (subRowArrRed.length) {
            // сортировать
            subRowArrRed.sort(compare);
            for (var j = 0; j < subRowArrRed.length; j++) {
              resultTable.push(subRowArrRed[j]);
            }
          }
    
        }
       
        if ($("tr.table-row.orig-num-str").length){
          resultTable.push(rowOrig);    
          resultTable.push(rowsOrigArrGreen[i]);    
          for (var i = 0; i < rowsOrigArrGreen.length; i++) {
            resultTable.push(rowsOrigArrGreen[i]);
          }
          for (var i = 0; i < rowsOrigArrYellow.length; i++) {
            resultTable.push(rowsOrigArrYellow[i]);
          }
          for (var i = 0; i < rowsOrigArrRed.length; i++) {
            resultTable.push(rowsOrigArrRed[i]);
          }
        }


        // debugger;
        // Убрать table из большого DOM документа для лучшей производительности

        // $(tbody).remove();
        $(tbody).empty();
        // добавить результат в нужном порядке в TBODY
        // они автоматически будут убраны со старых мест и вставлены в правильном порядке
        for (var i = 0; i < resultTable.length; i++) {
          $(tbody).append(resultTable[i]);
        }
        table.append(tbody);
      };

$( function() {

    var currentSorterType =  null;
 


    //$( "#search-tree-container" ).draggable();
    $( "#search-tree-container" ).draggable({ handle:'.search-tree-header', cursor:'pointer',containment: 'document' });
    //$( "#popup-calendar-container" ).draggable();
    $( "#popup-calendar-container" ).draggable({ handle:'.search-tree-header', cursor:'pointer',containment: 'document'});
    //$( "#info-tree-container" ).draggable();
    $( "#info-tree-container" ).draggable({ handle:'.info-tree-header', cursor:'pointer',containment: 'document' });
    //$( "#delivery-info-container").draggable();
    $( "#delivery-info-container" ).draggable({ handle:'.info-tree-header', cursor:'pointer',containment: 'document' });
    //$( "#sheduler-info-container").draggable();
    $( "#sheduler-info-container" ).draggable({ handle:'.info-tree-header', cursor:'pointer',containment: 'document' });
    $( "#ware-info-container" ).draggable({ handle:'.info-tree-header', cursor:'pointer',containment: 'document' });
    $( "#motul-podbor-container" ).draggable({ handle:'.info-tree-header', cursor:'pointer',containment: 'document' });
    // plugins
    $( document ).tooltip();
    
    $(window).resize(function() {
            if (!$("#search-result").hasClass("hide")){
              checkListWaresForFind();
            }
        });
   
    
    var from = $( "#popup-datepicker-from" ).datepicker({
      language: 'ru',
      format: 'dd.mm.yyyy',
      todayHighlight: true,
      orientation: "bottom ",
      multidateSeparator: ".",
      autoclose: true
    })
    .on('show', function(e) {
      //console.log('show');
      setTimeout(function(){
        $('#popup-datepicker-from .input-img').addClass('active');
      }, 100);
    })
    .on('hide', function(e) {
     // console.log('hide');
      setTimeout(function(){
        $('#popup-datepicker-from .input-img').removeClass('active');
      }, 100);
    });

    var to =  $( "#popup-datepicker-to" ).datepicker({
      language: 'ru',
      format: 'dd.mm.yyyy',
      todayHighlight: true,
      orientation: "bottom",
      multidateSeparator: ".",
      autoclose: true
    })
    .on('show', function(e) {
      //console.log('show');
      setTimeout(function(){
        $('#popup-datepicker-to .input-img').addClass('active');
      }, 100);
    })
    .on('hide', function(e) {
      //console.log('hide');
      setTimeout(function(){
        $('#popup-datepicker-to .input-img').removeClass('active');
      }, 100);
    });
    
    var balance_from= $( ".balance-datepiker-from" ).datepicker({
      language: 'ru',
      format: 'dd.mm.yyyy',
      todayHighlight: true,
      orientation: "bottom ",
      multidateSeparator: ".",
      autoclose: true
    })
    .on('show', function(e) {
      //console.log('show');
      setTimeout(function(){
        $(".balance-datepiker-from span").addClass('active');
      }, 100);
    })
    .on('hide', function(e) {
      //console.log('hide');
      setTimeout(function(){
        $('.balance-datepiker-from span').removeClass('active');
      }, 100);
    });

    var balance_to= $( ".balance-datepiker-to" ).datepicker({
      language: 'ru',
      format: 'dd.mm.yyyy',
      todayHighlight: true,
      orientation: "bottom ",
      multidateSeparator: ".",
      autoclose: true
    })
    .on('show', function(e) {
      //console.log('show');
      setTimeout(function(){
        $(".balance-datepiker-to span").addClass('active');
      }, 100);
    })
    .on('hide', function(e) {
      //console.log('hide');
      setTimeout(function(){
        $('.balance-datepiker-to span').removeClass('active');
      }, 100);
    });


    
    
    $( "#search-tree-tabs, #info-tabs").tabs();
    //$("#tabs-1").tabs();
    $("#tabs-1").tabs({
      activate: function(event, ui) {tunelogo('true');}
    });

     
    $( "#warranty-accordion" ).accordion({
      collapsible: true,
      heightStyle: "content"
    });
    
    $( '#search-table' ).tooltip({
      items: "[title]",
      content: function() {
        var element = $( this );
        if ( (element.is( "[title]" )) && (element.hasClass('col-cost'))) {
          var titleVal = element.attr('title').split('/');

          return '<div class="cost-tooltip">' +
            //'<p class="title">След., грн</p>' +
            //'<p>' + titleVal[0] + '</p>' +
            '<p class="title">Unit</p>' +
            '<p>' + titleVal[1] + '</p>' +
          '</div>';
        }
      }
    });

    $("#tabs-1 div#origprogs,#tabs-1 div#origprogs-cv , #tabs-2, #tabs-3, #tabs-4, #tabs-5,  #tabs-6 ,  #tabs-7,#search-body, #order-table-body-wrap, #order-for-gift-table-body-wrap, #reserv-tab,#wares-tab, #contracts-table-body-wrap, #orders-table-body-wrap, #order-unit-table-body-wrap, #list-category, #contract-choice-body-wrap , #deliveryshedulerdiv, #debt-bonus-table-body-wrap, #order-in-uah-table-body-wrap, .debt-table-body-wrap, #viewsearchingwarediv,#viewsearchingwarediv, #motul-podbor-table-body-wrap").mCustomScrollbar({
      alwaysShowScrollbar: 1
    });
    
     $("#order-table-body-wrap, #search-body").resizable({
        handles: 'e, w, se',
        // Remove height style
        resize: function(event, ui) {
            $(this).css("width", '');
        }
    });

    $("#search-tree-container").resizable({
      resize: function( event, container ) {
        setCookie_('podbortabs_width', container.size.width, getExpDate_(3650,0,0),'/',0,0);
        setCookie_('podbortabs_height', container.size.height, getExpDate_(3650,0,0),'/',0,0);
        var minHeightTab = $('#search-tree-body').css('min-height');
        var marginTop = $('#search-tree-body').css('margin-top');
        var popupHeader = $('div.search-tree-header').css('min-height');
        var tabsHeader = $('ul.search-tree-tabs-header').height();
        //console.log(container);
        var height = container.size.height - (parseInt(marginTop,10) + parseInt(popupHeader,10) + tabsHeader);
        //$('#search-tree-tabs #tabs-1').css('height', container.size.height-105);
        $('#search-tree-tabs #tabs-1 #origprogs').css('height', container.size.height-115);
        $('#search-tree-tabs #tabs-1 #origprogs-cv').css('height', container.size.height-115);
        $('#search-tree-tabs #tabs-2').css('height', container.size.height-105);
        $('#search-tree-tabs #tabs-3').css('height', container.size.height-105);
        $('#search-tree-tabs #tabs-4').css('height', container.size.height-105);
        $('#search-tree-tabs #tabs-5').css('height', container.size.height-105);
        $('#search-tree-tabs #tabs-6').css('height', container.size.height-105);  
        $('#search-tree-tabs #tabs-7').css('height', container.size.height-105);  
        //if(height>parseInt(minHeightTab,10)) {
        //  $('#search-tree-tabs #tabs-1').css('height', height);
       // }
        if ($("#search-tree-tabs").tabs( "option", "active" )==0){
          tunelogo('true');
        }
        if ( ($("#search-tree-tabs").tabs( "option", "active" )>0) && ($("#search-tree-tabs").tabs( "option", "active" )<4)){  
          var ActiveTab=$("#search-tree-tabs").tabs( "option", "active" )+1;
          var MaxHeight=parseInt($("#tabs-"+ActiveTab).css("max-height"));
         // console.log(parseInt(MaxHeight));                
          if (container.size.height>MaxHeight){
            $("#tabs-"+ActiveTab).css("max-height",(container.size.height-105)+"px");  
          }
          else{
            $("#tabs-"+ActiveTab).css("max-height","550px");  
          }    

        }  
      }
    });
    
    $("#motul-podbor-container").resizable({
      resize: function( event, container ) {
        $("#motul-podbor-table-body-wrap").css('height', container.size.height-200+"px");           
      }
    });
    
    
    /*$("#popup-calendar-container").resizable({
      resize: function( event, container ) {

        var minHeightTab = $('#popup-calendar-body').css('min-height');
        var marginTop = $('#popup-calendar-body').css('margin-top');
        var popupHeader = $('div.popup-calendar-header').css('min-height');
        //ar tabsHeader = $('ul.search-tree-tabs-header').height();

        var height = container.size.height - (parseInt(marginTop,10) + parseInt(popupHeader,10) );

        if(height>parseInt(minHeightTab,10)) {
          //$('#search-tree-tabs #tabs-1').css('height', height);
        }
      }
    });*/

    /*$("#info-tree-container").resizable({
      resize: function( event, container ) {
        var minHeightTab = $('#info-tree-body').css('min-height');
        var marginTop = $('#info-tree-body').css('margin-top');
        var popupHeader = $('div.info-tree-header').css('min-height');
        //var tabsHeader = $('ul.search-tree-tabs-header').height();

        var height = container.size.height - (parseInt(marginTop,10) + parseInt(popupHeader,10));

        if(height>parseInt(minHeightTab,10)) {
          //$('#search-tree-tabs #tabs-1').css('height', height);
        }
        if ( $("#check-ware-table-header").length){
          synqcols(document.getElementById("tablecontent2"), document.getElementById("check-ware-table-header"), document.getElementById("check-ware-table-body"), $("#check-ware-table-header").width(), true,410); 
        }     
      }
    });*/
    
    /*$("#delivery-info-container").resizable({
      resize: function( event, container ) {

        var minHeightTab = $('#delivery-info-body').css('min-height');
        var marginTop = $('#delivery-info-body').css('margin-top');
        var popupHeader = $('div.info-tree-header').css('min-height');
        //var tabsHeader = $('ul.search-tree-tabs-header').height();

        var height = container.size.height - (parseInt(marginTop,10) + parseInt(popupHeader,10));

        if(height>parseInt(minHeightTab,10)) {
          //$('#search-tree-tabs #tabs-1').css('height', height);
        }
      }
    });*/
    
    $("#ware-info-container").resizable({
      resize: function( event, container ) {

        var minHeightTab = $('#ware-info-body').css('min-height');
        var marginTop = $('#ware-info-body').css('margin-top');
        var popupHeader = $('div.info-tree-header').css('min-height');
        var height = container.size.height - (parseInt(marginTop,10) + parseInt(popupHeader,10));

      }
    });
    
    
    
    /*$("#sheduler-info-container").resizable({
      resize: function( event, container ) {

        var minHeightTab = $('#sheduler-info-body').css('min-height');
        var marginTop = $('#sheduler-info-body').css('margin-top');
        var popupHeader = $('div.info-tree-header').css('min-height');
        //var tabsHeader = $('ul.search-tree-tabs-header').height();

        var height = container.size.height - (parseInt(marginTop,10) + parseInt(popupHeader,10));

      }
    });*/

    
    $("#table-sort").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        //console.log(selectVal);
        currentSorterType = selectVal;
        sortGrid(currentSorterType);
      }
    });
    
    $("#_ttdefaultselect").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        //console.log(selectVal);
        //currentSorterType = selectVal;
        //sortGrid(currentSorterType);
      }
    });
    
     $("#delivery-date-select").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        //console.log(selectVal);
        checkWareOnStorage(); 
        changeDataDelivery();  
      }
    });
    
    $("#ful").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
      }
    });
    
     $("#meet-person-select").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        //console.log(selectVal);
        checkWareOnStorage(); 
        changeMeetPerson(this);  
      }
    });
    
     $("#_tt-order-select").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        checkWareOnStorage(); 
        changeTTDelivery(this);
      }
    });
    
    $("#manuflistauto").selectmenu({
      change: function( event, ui ) {
        var constIsAuto = 1;
        var selectVal = ui.item.value;
        if (selectVal !=-1){  
          loadmodellinelist(this, "modellisttableauto", "modellinelistauto",  constIsAuto);
        }
      }
    });
    
    $("#modellinelistauto").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        //console.log(selectVal);  
        //console.log(this);  
        var constIsAuto = 1;
        if (selectVal !=-1){
          loadmodelslist(this, "modellisttableauto", constIsAuto);
        }
      }
    });   
    
    $("#manuflistmoto").selectmenu({
      change: function( event, ui ) {
        var constIsMoto = 2;
        var selectVal = ui.item.value;
        if (selectVal !=-1){  
          loadmodellinelist(this, "modellisttablemoto", "modellinelistmoto", constIsMoto);
        }
      }
    });
    
    $("#modellinelistmoto").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        var constIsMoto = 2;
        if (selectVal !=-1){  
          loadmodelslist(this, "modellisttablemoto", constIsMoto);
        }
      }
    });   
    
    $("#manuflistautoengine").selectmenu({
      change: function( event, ui ) {
        var constIsMoto = 2;
        var selectVal = ui.item.value;
        $("#listautoengine")[0].options.length=0; 
        if (this.value!=-1) ec("loadengines", "id="+this.value, "abj");
      }
    });
    
    $("#manuflistcv").selectmenu({
      change: function( event, ui ) {
        var constIsCV  = 4;
        var selectVal = ui.item.value;
        if (selectVal !=-1){  
          loadmodellinelist(this, "modellisttablecv", "modellinelistcv",  constIsCV);
        }
      }
    });
    
    $("#modellinelistcv").selectmenu({
      change: function( event, ui ) {
        var constIsCV  = 4;
        var selectVal = ui.item.value;
        if (selectVal !=-1){  
          loadmodelslist(this, "modellisttablecv", constIsCV);
        }
      }
    });
    
    $("#manuflistax").selectmenu({
      change: function( event, ui ) {
        var constIsAX  = 5;
        var selectVal = ui.item.value;
        if (selectVal !=-1){  
          loadmodellinelist(this, "modellisttableax", "modellinelistax",  constIsAX);
        }
      }
    });
    
    $("#modellinelistax").selectmenu({
      change: function( event, ui ) {
        var constIsAX  = 5;
        var selectVal = ui.item.value;
        if (selectVal !=-1){  
          loadmodelslist(this, "modellisttableax", constIsAX);
        }
      }
    });

    
    $("#region-sort, #firmtype-sort,#region-uber-sort").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;

      }
    });   
	
    $("#listautoengine").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        
      }
    });   

    
     $("#pick-up-time-select").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        //console.log(selectVal);
        changeTimeDelivery(this);  
      }
    });
    
    $("#reclfilterstate").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        if ($("select#reclfilterstate").val()=="4"){
          $("#reclfilterres").removeAttr("disabled");
          $("#reclfilterres-button").removeClass("ui-selectmenu-disabled ui-state-disabled");    
          $("#reclfilterres [value='-1']").attr("selected", "selected");
          $("#reclfilterres").attr('title','');  
        }
        else{
          $("#reclfilterres").attr("disabled","disabled");
          $("#reclfilterres-button").addClass("ui-selectmenu-disabled ui-state-disabled");    
          $("#reclfilterres").attr('title','Выберите состояние "Исполнен"');  
        }
        $("#reclfilterres [value='-1']").attr("selected", "selected");
        setFilterTableReclam(1);
      }
    });
    
    $("#reclfilterres").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
        setFilterTableReclam(2);
      }
    });
    
    $("#acccontractlist").selectmenu({
      change: function( event, ui ) {
        var selectVal = ui.item.value;
      }
    });
    
    
    // events
    $(document).on('click', userDataPopupHandler );
    $('.search-result').on('click', searchHandler );
    $('#order').on('click', orderHandler);
    $('#popup-search-tree').on('click', popupSearchTreeHandler);
    $('#general-info-tree').on('click', infoGeneralTreeHandler);
    $('#motul-podbor-tree').on('click', MotulPodborTreeHandler);
    $('#popup-calendar').on('click', popupСalendarHandler);
    $('#delivery-info-tree').on('click', DeliveryInfoTreeHandler);
    $('#sheduler-info-tree').on('click', ShedulerInfoTreeHandler);
    $("#popup-newcontactpersonorder").on('click', NewContactPersonOrderHandler);
    $("#motul-podbor-tree").on('click', PodborMotulHandler);
    $("#viewsearchingwarediv").on('click',WareInfoHandler);
    $('#enter-ware-list').on('click', EnterwarelistHandler);
    // close popup
    $(document).on('keydown', closePopupHandler );
    // cup off long text footer
    $(".main-footer .promotion .media-body p").each(function() {
        var $this = $(this);
        var maxLength = 70;

        if($this.closest('div.gift-img').length) {
          maxLength = 50;
        }

        var text = $this.text();
        if (text.length > maxLength) {
            $this.prop('title', text);
            $this.text(text.substr(0, maxLength) + "...");
        }
    });

    // cup off long text gift title
    $(".gift .gift-body .items .item .title").each(function() {
        var $this = $(this);
        var maxLength = 80;
        var text = $this.text();
        if (text.length > maxLength) {
            $this.prop('title', text);
            $this.text(text.substr(0, maxLength) + "...");
        }
    });




    // close popup
    function closePopupHandler(event) {
      if (event.keyCode == 27) {
        if ($("#jqdialog").css("display")=="block") {
           $("#jqdialog").parent().css("display",'none');
         }
         else{
           $('.popup-box').addClass('hide');
         }
         if ($('#viewsearchingwarediv').parent().css("display")=='block'){
           $('#viewsearchingwarediv').parent().css("display",'none');  
         } 
      }
          
    }

    function userDataPopupHandler(event) { // user-data-popup
      var target = $(event.target);
      var checkDataPopup = $('.user-data-btn').hasClass('active');
      //console.log('click to -->',target );

      // show-hide user-data-popup in header
      if(target.hasClass('user-data-btn')) {
        target.toggleClass('active');
        $('.user-data-popup').toggleClass('hide');
        return;
      }
      if(checkDataPopup){
        $('.user-data-btn').toggleClass('active');
        $('.user-data-popup').toggleClass('hide');
      }

      if ( (target.hasClass('magnifier-search-all')) || (target.hasClass('podbor-motul-inline')) || (target.hasClass('podbor-search-all-with-motul')) ) {
        $('#popup-search-tree').toggleClass('hide');
        maximizedialogmin();  
        if ($("#search-tree-tabs").tabs("option", "active")==0) { 
          tunelogo('true');
        }
      }

 
    };
    
    function PodborMotulHandler(event) { // motul podbor result container
      // change cost -> retail or wholesale
      var target = $(event.target);    
      if(target.hasClass('show-retail')||target.hasClass('show-wholesale')) {
        $('table#motul-podbor-table-header .wholesale').toggleClass('hide');
        $('table#motul-podbor-table-header .retail').toggleClass('hide');
        $('table.podbor-motul-info-grup-table .wholesale').toggleClass('hide');
        $('table.podbor-motul-info-grup-table .retail').toggleClass('hide');  
        if ($('table#motul-podbor-table-header .retail').hasClass('hide')) {
          setCookie_('kindofprice','1', getExpDate_(365,0,0),'/',0,0);  
        }
        if ($('table#motul-podbor-table-header .wholesale').hasClass('hide')){
          setCookie_('kindofprice','0', getExpDate_(365,0,0),'/',0,0);  
        }
        return;
      }  
    };

    function searchHandler(event) { // search result container
      var target = $(event.target);
      // debugger;
      if(target.hasClass('product-order')) {
        al_redisign($(target).attr('data'),target);       
      }
        
      if(target.hasClass('analogues')) {
        var rowId = target.parents('tr.table-row').attr('id');
        var subRowArr = $('#search-table').find($('[data ^= ' + rowId + ']'));
        var code=rowId.substr(rowId.indexOf('-')+1,rowId.length);
        code=code.substr(code.indexOf('-')+1,code.length);
        if (target.hasClass('fadeIn')){
          target.toggleClass('fadeIn');
          subRowArr.toggleClass('hide');  
          //console.log(code+'--');     
        }
        else{
          if(subRowArr.length) {
            subRowArr.toggleClass('hide');  
            target.toggleClass('fadeIn');
          }
          else{
            if (target.hasClass('is_on')){
              ga_redisign(code,1,0,"abj");
              target.toggleClass('fadeIn');   
            }else{        
              ga_redisign(code,0,0,"abj");
              target.toggleClass('fadeIn');
            }
          }    
        }  
        //target.toggleClass('fadeIn');
        return;
      }
      // close btn -> close section id="search-result"
      if(target.hasClass('close')||target.parent().hasClass('close')) {
        $('#search-result').toggleClass('hide');
        if ( !$(".right-sidebar").hasClass("hide") ){
           $(".right-sidebar").css("top","181px");
           $(".right-sidebar").css("height","64%");
           showhiderate2(30,100);
         }
  
        return;
      }
      // change cost -> retail or wholesale
      if(target.hasClass('show-retail')||target.hasClass('show-wholesale')) {
        $('.wholesale').toggleClass('hide');
        $('.retail').toggleClass('hide');
        if ($('div.search-header-table span.cost.retail').hasClass('hide')) {
          setCookie_('kindofprice','1', getExpDate_(365,0,0),'/',0,0);  
        }
        if ($('div.search-header-table span.cost.wholesale').hasClass('hide')){
          setCookie_('kindofprice','0', getExpDate_(365,0,0),'/',0,0);  
        }
        return;
      }
    };

    function popupSearchTreeHandler(event) {
      var target = $(event.target);

      // btn close
      if(target.hasClass('close')||target.parent().hasClass('close')) {
        $('#popup-search-tree').toggleClass('hide');
        return;
      }

      if(target.hasClass('sub-list')) {
        target.toggleClass('closed');
        return;
      } else if (target.parent().hasClass('sub-list')) {
        target.parent().toggleClass('closed');
      }

    }
    
    function EnterwarelistHandler(event) {
      var target = $(event.target);
      // btn close
      if(target.hasClass('close')||target.parent().hasClass('close')) {
        $('#enter-ware-list').toggleClass('hide');
        return;
      }

    }
    
   
    function WareInfoHandler(event) {
      var target = $(event.target);
      // btn close
      if(target.hasClass('info-close') || target.hasClass('close')||target.parent().hasClass('close')) {
        $('#ware-info-tree').toggleClass('hide');
        return;
      }
      if(target.hasClass('show-retail')||target.hasClass('show-wholesale')) {
        /*$('span.price-info-header-span .wholesale').toggleClass('hide');
        $('span.price-info-header-span .retail').toggleClass('hide');
        $('span.price-info-cost-span .wholesale').toggleClass('hide');
        $('span.price-info-cost-span .retail').toggleClass('hide');
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
        }*/
        $("span.cost.wholesale").toggleClass("hide");
        $("span.cost.retail").toggleClass("hide");    
        if ($('span.price-info-header-span .retail').hasClass('hide')) {
          setCookie_('kindofprice','1', getExpDate_(365,0,0),'/',0,0);  
        }
        if ($('span.price-info-header-span .wholesale').hasClass('hide')){
          setCookie_('kindofprice','0', getExpDate_(365,0,0),'/',0,0);  
        }
        return;
      }      
     }
    
     function infoGeneralTreeHandler(event) {
      var target = $(event.target);
      // btn close
        
      if ((target.hasClass('info-close')) || (target.hasClass('close')) || (target.parent().hasClass('close'))) {
        $('#general-info-tree').addClass('hide');
        if (!$('#search-result').hasClass('hide')){
          //$('#search-result').toggleClass('hide');
        }
        $(".info-tree-container").css("top","2%");
        $(".info-tree-container").css("min-height","450px");
        $(".info-tree-container").css("width","50%");
        $("#delivery-info-container").css("width","80%");
          
        return;
      }
  
     }
    
    
     function MotulPodborTreeHandler(event) {
      var target = $(event.target);
      // btn close
        
      if ((target.hasClass('info-close')) || (target.hasClass('close')) || (target.parent().hasClass('close'))) {
        $('#motul-podbor-tree').addClass('hide');
        return;
      }
  
    }
 
 
    

    function  DeliveryInfoTreeHandler(event) {
      var target = $(event.target);

      // btn close
      if(target.hasClass('close') || target.parent().hasClass('close')) {
        $('#delivery-info-tree').toggleClass('hide');
        clearAllInput();  
        return;
      }

    }
    
    function  ShedulerInfoTreeHandler(event) {
      var target = $(event.target);
      //console.log(target);
      // btn close
      if(target.hasClass('close') || target.parent().hasClass('close') ) {
        $('#sheduler-info-tree').toggleClass('hide');
        return;
      }

    }
    
    function  NewContactPersonOrderHandler(event) {
      var target = $(event.target);
      //console.log(target);
      // btn close
      if(target.hasClass('close') || target.parent().hasClass('close') ) {
        $('#popup-newcontactpersonorder').toggleClass('hide');
        return;
      }

    }

    
    function popupСalendarHandler(event) {
      var target = $(event.target);

      // btn close
      if(target.hasClass('close')||target.parent().hasClass('close')) {
        $('#popup-calendar').toggleClass('hide');
        return;
      }

      if(target.hasClass('input-img') && target.hasClass('active')) {
        //
        // to.datepicker('hide');
        // from.datepicker('hide');
        return;
      }
    }
    
    
 
      function orderHandler(event) {
        var target = $(event.target);

        // order order-select-all btn
        if(target.hasClass('order-select-all')) {
          var selectAll = $('#order-select-all');
          var checkboxs = $('#order-table-boby input[type="checkbox"]');

          if (selectAll.is(':checked')) {
              checkboxs.prop('checked', false);
              selectAll.prop('checked', false);
          } else {
              checkboxs.prop('checked', true);
              selectAll.prop('checked', true);
          }
          return;
        }
      };




  } );
