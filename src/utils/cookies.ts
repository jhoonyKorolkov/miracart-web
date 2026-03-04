/**
 * Утилита для работы с cookies
 */
export const Cookie = {
  /**
   * Установить cookie
   */
  set(name: string, value: string, days = 365): void {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expires}; path=/`;
  },

  /**
   * Получить значение cookie
   */
  get(name: string): string | null {
    const key = `${encodeURIComponent(name)}=`;
    const parts = document.cookie.split(';');

    for (let c of parts) {
      c = c.trim();
      if (c.indexOf(key) === 0) {
        return decodeURIComponent(c.substring(key.length));
      }
    }

    return null;
  },

  /**
   * Проверить существование cookie
   */
  has(name: string): boolean {
    return this.get(name) !== null;
  },

  /**
   * Удалить cookie
   */
  del(name: string): void {
    this.set(name, '', -1);
  },
};
