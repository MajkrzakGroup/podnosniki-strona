// Ekran powitalny: wirujące logo przez 2 s, potem strona wyostrza się z rozmycia
(function () {
  var html = document.documentElement;
  if (!html.classList.contains('intro')) return;
  setTimeout(function () {
    html.classList.add('intro-out');
    setTimeout(function () { html.classList.remove('intro', 'intro-out'); }, 1100);
  }, 2000);
})();

// Podświetlanie zakładki w menu dla sekcji, która jest na ekranie
(function () {
  var links = [].slice.call(document.querySelectorAll('nav a'));
  var pageLink = document.querySelector('nav a.active');
  var here = location.pathname.replace(/\/$/, '/index.html').split('/').pop() || 'index.html';
  var targets = [];
  links.forEach(function (a) {
    var href = a.getAttribute('href'), i = href.indexOf('#');
    if (i < 0) return;
    var file = href.slice(0, i).split('/').pop();
    if (file && file !== here) return;
    var el = document.getElementById(href.slice(i + 1));
    if (el) targets.push({ a: a, el: el });
  });
  if (!targets.length) return;
  function setActive(a) {
    links.forEach(function (l) { l.classList.toggle('active', l === a); });
  }
  function spy() {
    var line = document.querySelector('header').offsetHeight + 60, cur = pageLink;
    targets.forEach(function (t) {
      if (t.el.getBoundingClientRect().top <= line) cur = t.a;
    });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = targets[targets.length - 1].a;
    setActive(cur);
  }
  window.addEventListener('scroll', spy, { passive: true });
  window.addEventListener('load', spy);
  spy();
})();

// Ikony zastosowań: wysięgnik podnosi się, gdy karta pojawia się na ekranie
(function () {
  var cards = document.querySelectorAll('.svc');
  if (!cards.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var i = [].indexOf.call(cards, e.target);
      setTimeout(function () { e.target.classList.add('on'); }, (i % 3) * 150);
      io.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  cards.forEach(function (c) { io.observe(c); });
})();
