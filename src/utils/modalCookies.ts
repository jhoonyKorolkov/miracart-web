import { Cookie } from './cookies';

const COOKIE_NAME = 'cookies-accepted';

/**
 * Инициализация модального окна с cookie
 */
export function initModalCookies(): void {
  // Проверяем, было ли уже согласие
  if (Cookie.has(COOKIE_NAME)) {
    return;
  }

  const modal = document.querySelector<HTMLElement>('.modal-cookies');
  if (!modal) return;

  // Показываем модальное окно
  modal.style.display = 'block';

  // Добавляем плавное появление
  setTimeout(() => {
    modal.classList.add('show');
  }, 100);

  // Кнопка "Понятно"
  const actionBtn = modal.querySelector<HTMLElement>('.modal-cookies__action');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      acceptCookies(modal);
    });
  }

  // Кнопка закрытия
  const closeBtn = modal.querySelector<HTMLElement>('.modal-cookies__close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      acceptCookies(modal);
    });
  }
}

/**
 * Принять cookies и закрыть модальное окно
 */
function acceptCookies(modal: HTMLElement): void {
  // Сохраняем согласие в cookie на год
  Cookie.set(COOKIE_NAME, 'true', 365);

  // Плавно скрываем модальное окно
  modal.classList.remove('show');
  modal.classList.add('hide');

  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}
