function addCss(fileName) {

  var head = document.head
    , link = document.createElement('link')

  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = fileName

  head.appendChild(link)
}
if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)){
/*addCss('mobile-style.css');*/
addCss('style.css');
}
else {
addCss('style.css');
}

/*if( navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPod/i) ||
        ){
 addCss('style.css');
}
else {
    addCss('style.css');
}*/

function show(){
  if(document.getElementsByClassName('menu-nav')[0].style.visibility == 'visible')
document.getElementsByClassName('menu-nav')[0].style.visibility = 'hidden';
  else {
    document.getElementsByClassName('menu-nav')[0].style.visibility = 'visible';
  }
}
