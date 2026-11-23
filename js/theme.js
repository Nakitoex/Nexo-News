/* NEXUS NEWS — alternância de tema claro/escuro.
   O tema inicial já foi aplicado por um script inline no <head> (evita flash).
   Este arquivo cuida do botão, da persistência e da sincronização. */
(function () {
  'use strict';

  var KEY = 'nexus-theme';
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  var status = document.getElementById('theme-status');
  var systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timer;

  function saved() {
    try {
      var value = localStorage.getItem(KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (e) { return null; }
  }

  function store(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) { /* armazenamento indisponível */ }
  }

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function render(theme) {
    var dark = theme === 'dark';
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-checked', String(dark));
    button.title = dark ? 'Mudar para o modo claro' : 'Mudar para o modo escuro';
    if (status) status.textContent = dark ? 'Tema atual: escuro.' : 'Tema atual: claro.';
  }

  function apply(theme, animate) {
    if (animate && !motionQuery.matches) {
      root.classList.add('theme-transition');
      clearTimeout(timer);
      timer = setTimeout(function () { root.classList.remove('theme-transition'); }, 450);
    }
    render(theme);
  }

  button.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    store(next);
    apply(next, true);
  });

  // Sem preferência salva, acompanha o sistema operacional.
  function onSystemChange(event) {
    if (!saved()) apply(event.matches ? 'dark' : 'light', true);
  }
  if (systemQuery.addEventListener) systemQuery.addEventListener('change', onSystemChange);
  else if (systemQuery.addListener) systemQuery.addListener(onSystemChange);

  // Mantém várias abas sincronizadas.
  window.addEventListener('storage', function (event) {
    if (event.key === KEY && (event.newValue === 'dark' || event.newValue === 'light')) {
      apply(event.newValue, true);
    }
  });

  render(current());
})();
