# Работа с изображениями и иконками

## 📁 Структура папок

```
src/
├── icons/               # SVG иконки для спрайта
│   └── logo.svg
├── assets/
│   └── images/         # Изображения для импорта в коде (WebP конвертация)
│
public/
├── fonts/              # Шрифты
└── images/             # Статические изображения (без обработки)
```

## 🎨 SVG Спрайт

### Где хранить

Все SVG иконки храните в **`src/icons/`**

### Подготовка SVG

1. Удалите атрибуты `fill`, `stroke` и `color` из SVG (если хотите управлять цветом через CSS)
2. Сохраните файл с понятным именем: `arrow.svg`, `cart.svg`, `user.svg`

### Использование в HTML

```html
<!-- Вариант 1: через <use> -->
<svg class="icon">
  <use xlink:href="#icon-logo"></use>
</svg>

<!-- Вариант 2: с размерами -->
<svg width="24" height="24">
  <use xlink:href="#icon-arrow"></use>
</svg>
```

### Использование в SCSS

```scss
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor; // Цвет иконки = цвет текста

  &:hover {
    fill: red;
  }
}
```

### ID иконок в спрайте

Формат: `icon-{имя-файла}`

- `logo.svg` → `#icon-logo`
- `cart.svg` → `#icon-cart`
- `arrow-right.svg` → `#icon-arrow-right`

---

## 🖼️ Изображения с обработкой (WebP)

### Где хранить

**`src/assets/images/`** — для изображений, которые нужно оптимизировать

### Использование в Vue/TypeScript

```typescript
// Обычный импорт (без обработки)
import photo from '@images/photo.jpg';

// Конвертация в WebP
import photoWebp from '@images/photo.jpg?format=webp';

// С настройкой качества
import photoOptimized from '@images/photo.jpg?format=webp&quality=80';

// Несколько форматов
import photoAvif from '@images/photo.jpg?format=avif';
```

### Использование в HTML

```html
<!-- Поддержка WebP с fallback -->
<picture>
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="Photo" />
</picture>
```

### Дополнительные параметры

```typescript
// Изменение размера + WebP
import thumb from '@images/photo.jpg?w=300&format=webp';

// Несколько размеров для srcset
import responsive from '@images/photo.jpg?w=300;600;900&format=webp';
```

---

## 📦 Статические изображения (без обработки)

### Где хранить

**`public/images/`** — для изображений, которые не нужно обрабатывать

### 🚀 Автоматическая конвертация в WebP

Проект поддерживает автоматическую конвертацию JPG/PNG в WebP!

#### Запуск с автоконвертацией

```bash
# Dev сервер + автоматическая конвертация изображений
npm run dev:watch

# Только конвертация (единоразово все файлы)
npm run images:convert

# Только watch режим для изображений
npm run images:watch

# Production сборка (с конвертацией перед билдом)
npm run build
```

#### Как работает

1. **Добавьте изображение** JPG/PNG в `public/images/`
2. **Скрипт автоматически создаст** `.webp` версию рядом
3. **Используйте WebP** в вашем HTML: `<img src="/images/photo.webp">`

**Преимущества:**

- ✅ Работает как в Gulp - добавил файл, получил WebP
- ✅ Автоматический watch в dev режиме
- ✅ Конвертация перед production билдом
- ✅ До 70% экономии размера файлов
- ✅ Показывает статистику сжатия

### Использование в HTML

```html
<!-- Только WebP (современные браузеры) -->
<img src="/images/banner.webp" alt="Banner" />

<!-- С fallback для старых браузеров -->
<picture>
  <source srcset="/images/banner.webp" type="image/webp" />
  <img src="/images/banner.jpg" alt="Banner" />
</picture>

<!-- В CSS -->
<style>
  .hero {
    background-image: url('/images/background.webp');
  }
</style>
```

### Когда использовать

- Большие изображения, которые редко меняются
- Изображения, уже оптимизированные вручную
- Файлы, на которые нужны прямые ссылки (SEO, соцсети)

---

## 🚀 Примеры использования

### Пример 1: Иконка в кнопке

```html
<button class="btn">
  <svg class="btn__icon">
    <use xlink:href="#icon-cart"></use>
  </svg>
  Добавить в корзину
</button>
```

```scss
.btn {
  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    fill: currentColor;
  }
}
```

### Пример 2: Адаптивное изображение с WebP

```html
<picture>
  <source
    srcset="product-300.webp 300w, product-600.webp 600w, product-900.webp 900w"
    type="image/webp"
  />
  <img src="product.jpg" alt="Product" loading="lazy" />
</picture>
```

### Пример 3: Фоновое изображение в SCSS

```scss
// Для обработанных изображений
.hero {
  background-image: url('@images/hero.jpg?format=webp');
  background-size: cover;
}

// Для статических
.banner {
  background-image: url('/images/banner.jpg');
}
```

---

## ⚙️ Настройка качества WebP

По умолчанию: **quality = 80**

Изменить можно в `vite.config.ts`:

```typescript
imagetools({
  defaultDirectives: (url) => {
    if (url.searchParams.has('webp')) {
      return new URLSearchParams({
        format: 'webp',
        quality: '85', // ← изменить здесь
      });
    }
    return new URLSearchParams();
  },
});
```

---

## 📋 Checklist

- [ ] SVG иконки → `src/icons/`
- [ ] Изображения для обработки → `src/assets/images/`
- [ ] Статические изображения → `public/images/`
- [ ] Шрифты → `public/fonts/`
- [ ] Используйте `@images` алиас в импортах
- [ ] Используйте `#icon-{name}` для SVG спрайта
- [ ] Добавьте `?format=webp` для конвертации в WebP

---

## 🔧 Полезные команды

```bash
# Запуск dev сервера с автоматической конвертацией изображений
npm run dev:watch

# Стандартный dev сервер (без автоконвертации)
npm run dev

# Конвертировать все изображения в WebP
npm run images:convert

# Запустить watch для автоконвертации
npm run images:watch

# Production сборка (автоматически конвертирует изображения)
npm run build
```
