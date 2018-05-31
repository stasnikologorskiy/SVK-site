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

