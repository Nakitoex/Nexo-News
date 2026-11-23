// Inclinação 3D discreta dos cards de notícia, acompanhando o cursor.
// Usa delegação de eventos, então funciona também nos cards criados depois (busca, categorias).
const MAX_TILT = 4; // graus
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let active = null;
let frame = 0;

function reset(card) {
  card.classList.remove('is-tilting');
  card.style.removeProperty('--rx');
  card.style.removeProperty('--ry');
}

document.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches) return;
  const card = event.target instanceof Element ? event.target.closest('.news-card') : null;
  if (active && active !== card) reset(active);
  active = card;
  if (!card) return;

  const { clientX, clientY } = event;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const box = card.getBoundingClientRect();
    const x = (clientX - box.left) / box.width - 0.5;
    const y = (clientY - box.top) / box.height - 0.5;
    card.classList.add('is-tilting');
    card.style.setProperty('--ry', `${(x * MAX_TILT * 2).toFixed(2)}deg`);
    card.style.setProperty('--rx', `${(-y * MAX_TILT * 2).toFixed(2)}deg`);
  });
});

document.addEventListener('pointerleave', () => { if (active) reset(active); active = null; });
document.addEventListener('pointerout', (event) => {
  if (active && !event.relatedTarget) { reset(active); active = null; }
});
