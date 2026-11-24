document.addEventListener('click', function (e) {
  var a = e.target.closest('a');
  if (!a || !a.getAttribute('href')) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || a.target === '_blank') return;
  var href = a.getAttribute('href');
  if (/^(mailto|tel):/i.test(href)) return;
  if (href.charAt(0) === '#') return;
  var url = new URL(a.href);
  var here = new URL(location.href);
  if (url.pathname.replace(/\\/g, '/') === here.pathname.replace(/\\/g, '/')) return;
  e.preventDefault();
  document.body.classList.add('page-exit');
  setTimeout(function () { location.href = a.href; }, 230);
});

document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('nav-toggle');
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { if (navToggle) navToggle.checked = false; });
  });
  var lb = document.querySelector('.lightbox');
  if (!lb) return;
  var img = lb.querySelector('img');
  document.querySelectorAll('.gallery figure').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var src = fig.querySelector('img');
      img.src = src.src;
      img.alt = src.alt;
      lb.classList.add('open');
      document.body.classList.add('no-scroll');
    });
  });
  lb.addEventListener('click', function () {
    lb.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      lb.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });
});
