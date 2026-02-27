# 🎨 Шпаргалка: Изображения и иконки

## SVG Иконки (Спрайт)

### 📂 Где хранить

```
src/icons/
├── logo.svg
├── cart.svg
└── arrow.svg
```

### 💻 Использование

```html
<svg class="icon">
  <use xlink:href="#icon-cart"></use>
</svg>
```

### 🎨 CSS

```scss
.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
```

**ID формат:** `#icon-{имя-файла}`

---

## Изображения с обработкой (WebP)

### 📂 Где хранить

```
src/assets/images/
```

### 💻 Использование

```typescript
// Базовый импорт
import photo from '@images/photo.jpg';

// WebP конвертация
import photoWebp from '@images/photo.jpg?format=webp';

// С настройками
import photoOptimized from '@images/photo.jpg?format=webp&quality=80';

// Ресайз
import thumb from '@images/photo.jpg?w=300&format=webp';
```

---

## Статические изображения

### 📂 Где хранить

```
public/images/
```

### � Автоматическая конвертация в WebP

```bash
# Запуск dev сервера с автоконвертацией
npm run dev:watch

# Только конвертация (единоразово)
npm run images:convert

# Watch режим (автоматическая конвертация при добавлении)
npm run images:watch
```

**Как работает:**

1. Добавьте JPG/PNG в `public/images/`
2. Скрипт автоматически создаст `.webp` версию
3. Используйте в HTML: `<img src="/images/photo.webp">`

### 💻 Использование

```html
<!-- HTML -->
<img src="/images/banner.webp" alt="Banner" />

<!-- С fallback для старых браузеров -->
<picture>
  <source srcset="/images/banner.webp" type="image/webp" />
  <img src="/images/banner.jpg" alt="Banner" />
</picture>

<!-- CSS -->
.hero { background: url('/images/bg.webp'); }
```

---

## Алиасы

```typescript
@images  → src/assets/images/
@icons   → src/icons/
```

---

## Примеры

### Кнопка с иконкой

```html
<button class="btn">
  <svg class="icon">
    <use xlink:href="#icon-cart"></use>
  </svg>
  В корзину
</button>
```

### Адаптивное изображение

```html
<picture>
  <source srcset="photo.webp" type="image/webp" />
  <img src="photo.jpg" alt="Photo" />
</picture>
```

### Vue компонент

```vue
<template>
  <img :src="photo" alt="Photo" />
</template>

<script setup>
import photo from '@images/photo.jpg?format=webp&quality=80';
</script>
```

---

📚 Полная документация: `docs/IMAGES_AND_ICONS.md`
