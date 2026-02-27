# Utility Классы - Краткая справка

## 🎯 Display

```html
<div class="d-none">Скрыто</div>
<div class="d-block">Блок</div>
<div class="d-flex">Flex контейнер</div>
<div class="d-grid">Grid контейнер</div>
<div class="d-inline-block">Inline блок</div>
```

## 📦 Flexbox

```html
<!-- Направление -->
<div class="d-flex flex-row">Горизонтально</div>
<div class="d-flex flex-column">Вертикально</div>

<!-- Выравнивание -->
<div class="d-flex justify-center align-center">По центру</div>
<div class="d-flex justify-between">Space between</div>
<div class="d-flex justify-around">Space around</div>
<div class="d-flex align-start">Вверху</div>

<!-- Обертка -->
<div class="d-flex flex-wrap">С переносом</div>
<div class="d-flex flex-nowrap">Без переноса</div>
```

## 📏 Spacing (Margin & Padding)

Доступные значения: **0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20**

```html
<!-- Padding -->
<div class="p-4">Padding: 16px со всех сторон</div>
<div class="pt-6">Padding-top: 24px</div>
<div class="px-8">Padding left/right: 32px</div>
<div class="py-3">Padding top/bottom: 12px</div>

<!-- Margin -->
<div class="m-6">Margin: 24px</div>
<div class="mt-8">Margin-top: 32px</div>
<div class="mb-4">Margin-bottom: 16px</div>
<div class="mx-auto">Центрирование по горизонтали</div>

<!-- Комбинирование -->
<div class="mt-8 mb-6 px-4">
  margin-top: 32px, margin-bottom: 24px, padding: 0 16px
</div>
```

### Таблица spacing значений:

| Класс | Значение | Пиксели |
| ----- | -------- | ------- |
| 0     | 0        | 0px     |
| 1     | 0.25rem  | 4px     |
| 2     | 0.5rem   | 8px     |
| 3     | 0.75rem  | 12px    |
| 4     | 1rem     | 16px    |
| 5     | 1.25rem  | 20px    |
| 6     | 1.5rem   | 24px    |
| 8     | 2rem     | 32px    |
| 10    | 2.5rem   | 40px    |
| 12    | 3rem     | 48px    |
| 16    | 4rem     | 64px    |
| 20    | 5rem     | 80px    |

## 📝 Text

```html
<!-- Выравнивание -->
<p class="text-left">Слева</p>
<p class="text-center">По центру</p>
<p class="text-right">Справа</p>
<p class="text-justify">По ширине</p>

<!-- Трансформация -->
<p class="text-uppercase">ВЕРХНИЙ РЕГИСТР</p>
<p class="text-lowercase">нижний регистр</p>
<p class="text-capitalize">Каждое Слово С Большой</p>

<!-- Обрезка -->
<p class="text-truncate">Длинный текст с многоточием...</p>

<!-- Размеры (12px → 48px) -->
<p class="fs-xs">12px</p>
<p class="fs-sm">14px</p>
<p class="fs-base">16px</p>
<p class="fs-lg">18px</p>
<p class="fs-xl">20px</p>
<p class="fs-2xl">24px</p>
<p class="fs-3xl">30px</p>
<p class="fs-4xl">36px</p>
<p class="fs-5xl">48px</p>

<!-- Вес (300 → 800) -->
<p class="fw-light">300</p>
<p class="fw-normal">400</p>
<p class="fw-medium">500</p>
<p class="fw-bold">600</p>
<p class="fw-bold">700</p>
<p class="fw-extrabold">800</p>
```

## 🎨 Colors

```html
<!-- Цвет текста -->
<p class="text-primary">Основной</p>
<p class="text-secondary">Вторичный</p>
<p class="text-success">Успех</p>
<p class="text-danger">Ошибка</p>
<p class="text-warning">Предупреждение</p>
<p class="text-info">Информация</p>

<!-- Цвет фона -->
<div class="bg-primary">Основной фон</div>
<div class="bg-light">Светлый фон</div>
<div class="bg-dark">Темный фон</div>

<!-- Оттенки серого -->
<div class="bg-gray-100">Самый светлый</div>
<div class="bg-gray-500">Средний</div>
<div class="bg-gray-900">Самый темный</div>
<p class="text-gray-600">Серый текст</p>

<!-- Комбинирование -->
<div class="bg-primary text-white">Белый текст на синем фоне</div>
```

## 🔲 Border & Rounded

```html
<!-- Border -->
<div class="border">Со всех сторон</div>
<div class="border-top">Только сверху</div>
<div class="border-bottom">Только снизу</div>
<div class="border-0">Без бордера</div>

<!-- Радиусы скругления -->
<div class="rounded-none">0px - без скругления</div>
<div class="rounded-sm">2px</div>
<div class="rounded-base">4px</div>
<div class="rounded-md">6px</div>
<div class="rounded-lg">8px</div>
<div class="rounded-xl">12px</div>
<div class="rounded-2xl">16px</div>
<div class="rounded-3xl">24px</div>
<div class="rounded-full">9999px - круг</div>
```

## 💫 Shadow

```html
<div class="shadow-sm">Маленькая тень</div>
<div class="shadow-base">Базовая тень</div>
<div class="shadow-md">Средняя тень</div>
<div class="shadow-lg">Большая тень</div>
<div class="shadow-xl">Очень большая</div>
<div class="shadow-2xl">Максимальная</div>
<div class="shadow-inner">Внутренняя</div>
<div class="shadow-none">Без тени</div>
```

## 📍 Position

```html
<div class="position-static">Static</div>
<div class="position-relative">Relative</div>
<div class="position-absolute">Absolute</div>
<div class="position-fixed">Fixed</div>
<div class="position-sticky">Sticky</div>
```

## 📐 Width & Height

```html
<div class="w-25">Ширина 25%</div>
<div class="w-50">Ширина 50%</div>
<div class="w-75">Ширина 75%</div>
<div class="w-100">Ширина 100%</div>
<div class="w-auto">Ширина auto</div>

<div class="h-25">Высота 25%</div>
<div class="h-50">Высота 50%</div>
<div class="h-75">Высота 75%</div>
<div class="h-100">Высота 100%</div>
<div class="h-auto">Высота auto</div>
```

## 🌊 Overflow

```html
<div class="overflow-auto">Auto - скролл при необходимости</div>
<div class="overflow-hidden">Hidden - обрезка</div>
<div class="overflow-visible">Visible - видно всё</div>
<div class="overflow-scroll">Scroll - всегда со скроллом</div>
```

## 👁️ Visibility

```html
<div class="visible">Видимый</div>
<div class="invisible">Невидимый, но занимает место</div>
<div class="visually-hidden">Скрыт для глаз, виден для screen readers</div>
```

## 🖱️ Cursor

```html
<button class="cursor-pointer">Рука - кликабельный</button>
<button class="cursor-default">Стрелка - обычный</button>
<button class="cursor-not-allowed">Запрещено - недоступный</button>
```

## 📱 Адаптивные утилиты

Breakpoints: **xs, sm, phone, md, lg, xl, tablet, xxl**

```html
<!-- Скрыть на мобильных, показать на планшетах+ -->
<div class="d-none d-md-block">Виден с md и выше</div>

<!-- Flex на десктопе, блок на мобильных -->
<div class="d-block d-lg-flex">Flex только на больших экранах</div>

<!-- Показать только на мобильных -->
<div class="d-block d-md-none">Только на маленьких экранах</div>

<!-- Grid на планшетах и выше -->
<div class="d-block d-tablet-grid">Grid с tablet breakpoint</div>
```

### Breakpoint значения:

| Breakpoint | Значение | Описание             |
| ---------- | -------- | -------------------- |
| xs         | 0px      | Все устройства       |
| sm         | 576px    | Маленькие мобильные  |
| phone      | 767px    | Телефоны             |
| md         | 768px    | Планшеты             |
| lg         | 992px    | Ноутбуки             |
| xl         | 1200px   | Большие экраны       |
| tablet     | 1240px   | Планшеты landscape   |
| xxl        | 1400px   | Очень большие экраны |

## 🎯 Практические примеры

### Карточка с центрированным содержимым

```html
<div class="p-6 bg-white shadow-lg rounded-xl">
  <h3 class="fs-xl fw-bold mb-2">Заголовок</h3>
  <p class="text-gray-600 fs-sm mb-4">Описание</p>
  <button class="btn">Кнопка</button>
</div>
```

### Flex контейнер с выравниванием

```html
<div class="d-flex justify-between align-center p-4 bg-light rounded-lg">
  <span class="fw-bold">Название</span>
  <span class="text-primary fs-lg">$99</span>
</div>
```

### Grid галерея

```html
<div class="d-grid" style="grid-template-columns: repeat(3, 1fr); gap: 16px;">
  <div class="p-4 bg-primary text-white text-center rounded-md">1</div>
  <div class="p-4 bg-primary text-white text-center rounded-md">2</div>
  <div class="p-4 bg-primary text-white text-center rounded-md">3</div>
</div>
```

### Адаптивный контейнер

```html
<div class="container mx-auto px-4 py-8">
  <h1 class="mb-6 text-center">Заголовок страницы</h1>
  <div class="d-block d-md-flex justify-between">
    <div class="w-100 d-md-block" style="max-width: 300px;">Sidebar</div>
    <div class="flex-1 ml-md-6">Основной контент</div>
  </div>
</div>
```

### Модальное окно

```html
<div
  class="position-fixed d-flex justify-center align-center"
  style="top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5);"
>
  <div class="bg-white p-6 rounded-xl shadow-2xl" style="max-width: 500px;">
    <h2 class="fs-2xl fw-bold mb-4">Модальное окно</h2>
    <p class="text-gray-600 mb-6">Содержимое</p>
    <div class="d-flex justify-end">
      <button class="btn">Закрыть</button>
    </div>
  </div>
</div>
```

## 💡 Советы

1. **Комбинируйте классы** - utility классы созданы для комбинирования
2. **Используйте spacing систему** - не задавайте inline стили для отступов
3. **Адаптивность** - используйте breakpoint префиксы для отзывчивого дизайна
4. **Консистентность** - придерживайтесь системы цветов и размеров
5. **!important** - все utility классы имеют !important для гарантированного применения

## 📚 Документация

- Полные примеры: `/utilities.html`
- Система дизайна: `src/styles/abstracts/_variables.scss`
- Все utility классы: `src/styles/utilities/_utilities.scss`

## 🔗 Полезные комбинации

```html
<!-- Кнопка с иконкой -->
<button
  class="d-inline-flex align-center px-6 py-3 bg-primary text-white rounded-lg"
>
  <span class="mr-2">🚀</span>
  Запустить
</button>

<!-- Аватар -->
<div
  class="d-inline-flex align-center justify-center rounded-full bg-gray-200"
  style="width: 40px; height: 40px;"
>
  <span class="fw-bold">AB</span>
</div>

<!-- Badge -->
<span
  class="d-inline-block px-3 py-1 bg-success text-white fs-xs fw-bold rounded-full"
>
  Новое
</span>

<!-- Alert -->
<div class="p-4 bg-warning text-dark border rounded-lg d-flex align-center">
  <span class="mr-3 fs-xl">⚠️</span>
  <span>Внимание! Это важное сообщение.</span>
</div>
```

---

**Tip:** Откройте `/utilities.html` в браузере для живых примеров всех классов!
