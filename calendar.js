var monthes = new Array('Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');
var CalDate;
var target_el;
var TargetDate;

function cal_drow() {
	var calendar1=document.getElementById("calendar");
  if (!calendar1.innerHTML) {    var s=''
    s=s+'<a id=closebtn onclick="hide_calendar()">x</a>';
    s=s+'<table cellpadding=0 cellspacing=0>';
    s=s+'<tr>';
    s=s+'<td class=tdarrow><a class=aarrow title="Предыдущий год" href="javascript: cal_drow_month(-1, 0);">&lt;&lt;</a>&nbsp;';
    s=s+'<a class=aarrow  title="Предыдущий месяц" href="javascript: cal_drow_month(0, -1);">&lt;</a></td>';
    s=s+'<td id=cal_text></td>';
    s=s+'<td class=tdarrow  title="Следующий месяц" style="text-align: right;"><a class=aarrow href="javascript: cal_drow_month(0, 1);">&gt;</a>&nbsp;';
    s=s+'<a class=aarrow  title="Следующий год" href="javascript: cal_drow_month(1, 0);">&gt;&gt;</a></td>';
    s=s+'</tr>';
    s=s+'</table>';

    s=s+'  <table id=datetable cellpadding=0 cellspacing=1 border=0>';
    s=s+'<tr>';
    s=s+'<td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td>';
    s=s+'</tr>';
    s=s+'</table>';
    calendar1.innerHTML=s;
  }
}

function cal_drow_month(year, month) {  var newR, newC, WeekDay;
  CalDate = new Date(CalDate.getFullYear()+year, CalDate.getMonth()+month,1);
  year=CalDate.getFullYear();
  month=CalDate.getMonth();
  var TBody = document.getElementById("datetable");
  // очистка существующих строк таблицы
  while (TBody.rows.length > 1) {
    TBody.deleteRow(1);
  }
  // создаем новую строку в конце таблицы
  newR = TBody.insertRow(TBody.rows.length);
  WeekDay=getFirstDay(year, month);
  var CurDate= new Date();
  // заполняем пустые клетки перед первым днем
  for (i=1; i<WeekDay; i++) {    newC = newR.insertCell(newR.cells.length);  }  // перебираем дни месяца
  DayCount=getMonthLen(year, month)+1;
  for (i=1; i<DayCount; i++) {
    if (WeekDay==8) {      WeekDay=1;      newR = TBody.insertRow(TBody.rows.length);
    }
    newC = newR.insertCell(newR.cells.length);
    newC.innerHTML='<a href="javascript: return_date('+i+');">'+i+'</a>';
    if ((year==TargetDate.getFullYear()) && (month==TargetDate.getMonth()) && (i==TargetDate.getDate())) {      newC.style.backgroundColor='yellow';
    } else
    if ((year==CurDate.getFullYear()) && (month==CurDate.getMonth()) && (i==CurDate.getDate())) {
      newC.style.backgroundColor='cyan';
    }
    WeekDay++;
  }
  // заполняем пустые клетки после последнего дня
  for (i=WeekDay; i<8; i++) {
    newC = newR.insertCell(newR.cells.length);
  }
  document.getElementById("cal_text").innerHTML=monthes[month]+' '+year;
}

// день недели первого дня месяца
function getFirstDay(theYear, theMonth){
    var firstDate = new Date(theYear,theMonth,1);
    return (firstDate.getDay())?firstDate.getDay():7;
//    return firstDate.getDay();
}
// число дней в месяце
function getMonthLen(theYear, theMonth) {
    var nextMonth = new Date(theYear, theMonth + 1, 1);
    nextMonth.setHours(nextMonth.getHours() - 3);
    return nextMonth.getDate();
}

function return_date(day) {  if (target_el) {
    var year;
    year=''+CalDate.getFullYear();
    month=''+(CalDate.getMonth()+1);
    day=parseInt(day);
    s=(day<10)?'0'+day:day;
    s=s+'.'+((month<10)?('0'+(month)):(month))+'.'+year.substring(2,4);
    target_el.value=s;
    if ($(target_el).filter('[oldval]').length>0) {
      $(target_el).trigger('blur');
      $(target_el).trigger('keyup');
    }
  }	hide_calendar();
}

function show_calendar(target) {
  target_el=document.getElementById(target);
  if (!target_el.disabled) {
    cal_drow();
    if (!cal_check_date(target_el, false)) CalDate=new Date(); else CalDate=TargetDate;
    cal_drow_month(0, 0);
    var calendar=document.getElementById('calendar');
    
    $(calendar).css('left', $(target_el).offset().left);
    $(calendar).css('top', $(target_el).offset().top+$(target_el).height()+6);
  //  calendar.style.left=Math.round((brw_width-180)/2)+'px';
//    calendar.style.top=Math.round((brw_height-120)/2)+'px';
    calendar.style.display="block";
    $('#calendarbackground').height($(window).height());
    $('#calendarbackground').css("display", "block");
  }
}

function cal_check_date(target, showmessage) {
//  target=document.getElementById(target);
  res=false;
  //console.log("r"+target.value);
  TargetDate=new Date();
  if (target && target.value) {    s=target.value;
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
        while (s.substring(0, 1)=='0') {        	s=s.substring(1, 10)        }
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
  } else {    res=(target && !target.value);
  }
  return res;
}

function hide_calendar() {
  $('#calendar').css('display', 'none');
  $('#calendarbackground').css('display', 'none');    
}

$(document).ready(function() {
  var inp = document.createElement('div');
  inp.id='calendar';
  $('body')[0].appendChild(inp);
  inp = document.createElement('div');  
  inp.id='calendarbackground';
  inp.onclick=hide_calendar;
  $('body')[0].appendChild(inp);
});


