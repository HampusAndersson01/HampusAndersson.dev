function scrollfunction(target) {
  const element = document.getElementById(target);
  const offset = 65;
  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

//Active postion of the main
var getElementsInArea = (function (docElm) {
  const links = document.getElementById("navMainLinks");
  var viewportHeight = docElm.clientHeight;

  return function (e, opts) {
    var found = [],
      i;

    if (e && e.type == "resize") viewportHeight = docElm.clientHeight;

    for (i = opts.elements.length; i--; ) {
      var elm = opts.elements[i],
        pos = elm.getBoundingClientRect(),
        topPerc = (pos.top / viewportHeight) * 100,
        bottomPerc = (pos.bottom / viewportHeight) * 100,
        middle = (topPerc + bottomPerc) / 2,
        inViewport = middle > opts.zone[1] && middle < 100 - opts.zone[1];
      for (let i = 0; i < links.children.length; i++) {
        child = links.children[i];
        if (child.children[0].innerHTML.toLowerCase() == elm.id.toLowerCase()) {
          child.children[0].classList.toggle("activeNav", inViewport);
        }
      }

      if (inViewport) found.push(elm);
    }
  };
})(document.documentElement);

window.addEventListener("scroll", f);
window.addEventListener("resize", f);

function f(e) {
  getElementsInArea(e, {
    elements: document.querySelectorAll("div"),
    zone: [10, 10], // percentage distance from top & bottom
  });
}
