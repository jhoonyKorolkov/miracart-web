// ============================================
// COMPOSABLE ДЛЯ МАСКИ ТЕЛЕФОНА
// ============================================

import { ref } from 'vue';

export function usePhoneMask(initialValue = '+7') {
  const phone = ref(initialValue);

  /**
   * Форматирует номер телефона по маске +7 (___) ___-__-__
   */
  function formatPhone(value: string): string {
    // Удаляем все нечисловые символы
    const digits = value.replace(/\D/g, '');

    // Берем только первые 11 цифр (7 + 10 цифр номера)
    let phoneDigits = digits.slice(0, 11);

    // Если начинается с 8, заменяем на 7
    if (phoneDigits.startsWith('8')) {
      phoneDigits = '7' + phoneDigits.slice(1);
    }

    // Если не начинается с 7, добавляем 7
    if (!phoneDigits.startsWith('7')) {
      phoneDigits = '7' + phoneDigits;
    }

    // Форматируем по маске +7 (___) ___-__-__
    let formatted = '+7';
    if (phoneDigits.length > 1) {
      formatted += ` (${phoneDigits.slice(1, 4)}`;
    }
    if (phoneDigits.length >= 4) {
      formatted += ')';
    }
    if (phoneDigits.length >= 5) {
      formatted += ` ${phoneDigits.slice(4, 7)}`;
    }
    if (phoneDigits.length >= 8) {
      formatted += `-${phoneDigits.slice(7, 9)}`;
    }
    if (phoneDigits.length >= 10) {
      formatted += `-${phoneDigits.slice(9, 11)}`;
    }

    return formatted;
  }

  /**
   * Обработчик ввода с сохранением позиции курсора
   */
  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    const oldValue = phone.value;
    const newValue = input.value;

    // Форматируем значение
    const formatted = formatPhone(newValue);
    phone.value = formatted;

    // Восстанавливаем позицию курсора
    setTimeout(() => {
      if (formatted.length < oldValue.length) {
        // При удалении
        input.setSelectionRange(cursorPosition, cursorPosition);
      } else {
        // При вводе - ставим курсор после введенной цифры
        const digitsBeforeCursor = newValue
          .slice(0, cursorPosition)
          .replace(/\D/g, '').length;
        let newCursorPos = 0;
        let digitCount = 0;
        for (let i = 0; i < formatted.length; i++) {
          if (/\d/.test(formatted[i])) digitCount++;
          if (digitCount >= digitsBeforeCursor) {
            newCursorPos = i + 1;
            break;
          }
        }
        input.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  }

  /**
   * Проверяет, является ли номер валидным
   */
  function isValid(): boolean {
    const digits = phone.value.replace(/\D/g, '');
    return digits.length === 11;
  }

  /**
   * Возвращает только цифры из номера
   */
  function getDigits(): string {
    return phone.value.replace(/\D/g, '');
  }

  /**
   * Сбрасывает значение к начальному
   */
  function reset() {
    phone.value = initialValue;
  }

  return {
    phone,
    formatPhone,
    handleInput,
    isValid,
    getDigits,
    reset,
  };
}
