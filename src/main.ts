import { initFaqAccordion } from './utils/faq';
import { initModalCookies } from './utils/modalCookies';

interface Island {
  mount: (el: HTMLElement) => void;
}

const islands = import.meta.glob<Island>('./islands/*.ts', { eager: true });

document.addEventListener('DOMContentLoaded', () => {
  // Монтируем Vue islands
  document.querySelectorAll<HTMLElement>('[data-vue-island]').forEach((el) => {
    const name = el.dataset.vueIsland;
    if (!name) return;

    const island = islands[`./islands/${name}.ts`];
    if (island?.mount) {
      island.mount(el);
    }
  });

  // Инициализируем FAQ аккордеон
  initFaqAccordion();

  // Инициализируем модальное окно cookies
  initModalCookies();
});
