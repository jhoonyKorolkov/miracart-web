// ============================================
// COMPOSABLE ДЛЯ УПРАВЛЕНИЯ МОДАЛЬНЫМИ ОКНАМИ
// ============================================

import { ref } from 'vue';

export function useModal() {
  const isOpen = ref(false);
  const isShown = ref(false);
  const isClosing = ref(false);

  /**
   * Открывает модальное окно
   */
  function open() {
    isOpen.value = true;
    document.body.classList.add('modal-open');

    // Задержка для анимации появления
    setTimeout(() => {
      isShown.value = true;
    }, 10);
  }

  /**
   * Закрывает модальное окно с анимацией
   */
  function close() {
    isShown.value = false;
    isClosing.value = true;

    setTimeout(() => {
      isOpen.value = false;
      isClosing.value = false;
      document.body.classList.remove('modal-open');
    }, 300); // Длительность анимации
  }

  /**
   * Переключает состояние модального окна
   */
  function toggle() {
    if (isOpen.value) {
      close();
    } else {
      open();
    }
  }

  return {
    isOpen,
    isShown,
    isClosing,
    open,
    close,
    toggle,
  };
}
