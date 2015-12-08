function hasClass(el, className) {
  if (el.classList)
    el.classList.contains(className);
  else
    new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className);
  else
    el.className += ' ' + className;
}

var sections = [];

[].forEach.call(document.querySelectorAll('.js-section'), function(element, i) {
  // Calculating the element's distance from top
  var offsetTop = 0;
  var nEl = element;

  while(nEl != null) {
    offsetTop += nEl.offsetTop;
    nEl = nEl.offsetParent;
  }

  element.style.transition = 'all ease 1s';

  sections.push({
    node: element,
    top: offsetTop
  });
});

var happyScrollEvent = function() {
  var currentPos = (document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight;
  
  // A delay for the event (in px)
  var offset = 200;

  sections.forEach(function(el, i) {
    if(hasClass(el.node, 'js-section-visible'))
      return;

    if(currentPos < (el.top + offset))
      return;

    el.node.style.opacity = 1;
    el.node.style.visibility = 'visible';
    addClass(el.node, 'js-section-visible');
  });
};

happyScrollEvent();
window.onscroll = happyScrollEvent;
