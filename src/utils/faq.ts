/**
 * Инициализация FAQ аккордеона
 */
export function initFaqAccordion(): void {
  const headers = document.querySelectorAll<HTMLElement>('.faq__item-hdr');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.closest<HTMLElement>('.faq__item');

      if (!item) return;

      // Закрываем все остальные элементы (опционально - для режима "только один открыт")
      // const allItems = document.querySelectorAll('.faq__item');
      // allItems.forEach((otherItem) => {
      //   if (otherItem !== item) {
      //     otherItem.classList.remove('active');
      //   }
      // });

      // Переключаем текущий элемент
      item.classList.toggle('active');
    });
  });
}
