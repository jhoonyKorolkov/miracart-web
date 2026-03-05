# Miracart Website

Лендинг для компании Miracart - профессиональный подбор материалов для ремонта. Построен на **Vite** с использованием **Vue Islands**, **SCSS** и **Handlebars**.

## 🚀 Технологии

- **Vite 7** - быстрая сборка
- **Vue 3** - прогрессивный фреймворк
- **TypeScript** - типизация
- **SCSS** - препроцессор стилей
- **Handlebars** - шаблонизатор HTML
- **SVG Sprite** - автоматическая сборка иконок
- **Image Tools** - оптимизация и конвертация в WebP

## � Технологии

- **Vite 7** - быстрая сборка и HMR
- **Vue 3** - интерактивные формы (Vue Islands)
- **TypeScript** - типизация
- **SCSS** - модульная архитектура стилей
- **Handlebars** - шаблонизатор HTML
- **SVG Sprite** - автоматическая сборка иконок
- **Sharp** - конвертация изображений в WebP

## 📁 Структура проекта

```
miracart_web/
├── pages/              # Дополнительные страницы
│   └── about.html
├── partials/           # Handlebars компоненты
│   ├── layout/         # Layout элементы
│   │   ├── head.hbs
│   │   ├── header.hbs
│   │   ├── footer.hbs
│   │   ├── scripts.hbs
│   │   ├── modal-cookies.hbs
│   │   └── svg-sprite.hbs
│   └── sections/       # Секции лендинга
│       ├── advantages.hbs
│       ├── audience.hbs
│       ├── contacts.hbs
│       ├── faq.hbs
│       ├── materials.hbs
│       ├── roadmap.hbs
│       ├── save-money.hbs
│       ├── slogan.hbs
│       └── why.hbs
├── src/
│   ├── components/     # Vue компоненты
│   │   ├── BigForm.vue        # Большая форма калькулятора
│   │   ├── SmallForm.vue      # Компактная форма
│   │   ├── RepairForm.vue     # Форма для ремонта
│   │   └── SuccessModal.vue   # Модальное окно успеха
│   ├── islands/        # Vue Islands адаптеры
│   │   ├── BigForm.ts
│   │   ├── SmallForm.ts
│   │   └── RepairForm.ts
│   ├── composables/    # Переиспользуемая логика
│   │   ├── useForm.ts         # Работа с формами
│   │   ├── useModal.ts        # Управление модальными окнами
│   │   └── usePhoneMask.ts    # Маска телефона
│   ├── icons/          # SVG иконки для спрайта
│   ├── assets/         # Assets для обработки
│   │   └── images/
│   ├── styles/         # SCSS архитектура
│   │   ├── abstracts/  # Переменные, миксины, функции
│   │   ├── animations/ # Анимации
│   │   ├── base/       # Базовые стили, reset, шрифты
│   │   ├── components/ # Компоненты и секции
│   │   └── app.scss
│   ├── utils/          # Утилиты
│   ├── config/         # Конфигурация API
│   ├── data/           # Mock данные
│   └── main.ts
├── public/             # Статические файлы
│   ├── fonts/          # Шрифты
│   └── images/         # Изображения (автоконвертация в WebP)
├── scripts/            # Build скрипты
│   ├── generate-svg-sprite.js
│   └── convert-images.js
├── examples/           # Демо-страницы компонентов
├── docs/               # Документация
├── index.html          # Главная страница
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🏝️ Vue Islands

Vue Islands позволяет использовать интерактивные Vue компоненты на статическом HTML лендинге.

### Формы в проекте:

**BigForm** - Полный калькулятор стоимости материалов:

```html
<div
  data-vue-island="BigForm"
  data-props='{"apiUrl":"/api/calculate","policyUrl":"/policy"}'
></div>
```

**SmallForm** - Компактная форма заявки:

```html
<div data-vue-island="SmallForm" data-props='{"apiUrl":"/api/contact"}'></div>
```

**RepairForm** - Форма для заявки на ремонт:

```html
<div data-vue-island="RepairForm" data-props='{"apiUrl":"/api/repair"}'></div>
```

## 📦 Установка

```bash
npm install
```

## 🛠️ Разработка

```bash
npm run dev
```

Сервер запустится на `http://localhost:3001/` (или другом свободном порту)

**Что происходит при запуске:**

- ✅ Автоматическая генерация SVG спрайта из `src/icons/`
- ✅ Watch за изменениями SVG иконок
- ✅ Автоматическая конвертация JPG/PNG → WebP из `public/images/`
- ✅ Watch за новыми изображениями
- ✅ Hot Module Replacement (HMR) для Vue и стилей

### Доступные команды:

```bash
npm run dev          # Dev-сервер с watch за всем (рекомендуется)
npm run dev:once     # Dev-сервер с единоразовой сборкой
npm run build        # Production сборка
npm run preview      # Превью production сборки
npm run format       # Форматирование кода (Prettier)
```

### 🖼️ Автоматическая конвертация изображений в WebP

При `npm run dev` автоматически запускается watch за изображениями в `public/images/`.

**Как работает:**

1. Положите JPG/PNG в `public/images/`
2. Скрипт автоматически создаст `.webp` версию
3. При изменении исходника `.webp` обновится автоматически

```bash
# Запуск dev-сервера с watch (рекомендуется)
npm run dev

# Только конвертация всех изображений
npm run images:convert

# Только watch для изображений
npm run images:watch

# Только генерация SVG спрайта
npm run svg:generate

# Watch за SVG иконками
npm run svg:watch
```

**Преимущества:**

- ✅ До 70% экономии размера файлов
- ✅ Автоматический watch режим
- ✅ Статистика сжатия для каждого файла
- ✅ Пропуск уже существующих WebP
- ✅ Автоматическая конвертация перед production билдом

## 🏗️ Production сборка

```bash
npm run build
```

Результат в папке `dist/`

**Автоматически выполняется:**

- ✅ Генерация SVG спрайта
- ✅ Конвертация всех JPG/PNG → WebP
- ✅ Минификация HTML через Lightning CSS
- ✅ Минификация и tree-shaking CSS/JS
- ✅ Оптимизация изображений
- ✅ Форматирование HTML в dist/

## 👀 Превью production сборки

```bash
npm run preview
```

## 🎨 SCSS архитектура

Проект использует модульную архитектуру стилей с функциями и миксинами.

### Структура

```
src/styles/
├── abstracts/          # Система дизайна
│   ├── _variables.scss # Цвета, spacing, breakpoints
│   ├── _functions.scss # Функции для доступа к переменным
│   ├── _mixins.scss    # Переиспользуемые миксины
│   └── _component-mixins.scss
├── base/               # Базовые стили
│   ├── _reset.scss
│   ├── _base.scss
│   └── _fonts.scss
├── components/         # UI компоненты
│   ├── _modal.scss
│   ├── _cards.scss
│   ├── _spinner.scss
│   └── sections/       # Секции лендинга
│       ├── _advantages.scss
│       ├── _contacts.scss
│       ├── _faq.scss
│       └── ...
├── animations/
│   └── _animations.scss
└── app.scss            # Главный файл
```

### Примеры использования

**Функции дизайн-системы:**

```scss
.element {
  color: color('primary'); // Цвета из палитры
  padding: spacing(4); // Spacing из системы
  border-radius: radius('md'); // Радиусы
  font-weight: font-weight('bold'); // Веса шрифтов
  @include type(16, 24); // Размер и высота строки
}
```

**Адаптивные миксины:**

```scss
.box {
  @include flex-center; // display: flex + центрирование
  @include grid(12, spacing(4)); // 12-колоночный grid

  @include respond-max('tablet') {
    // Media query для tablet
    @include flex-column;
  }

  @include respond-to('md') {
    // Breakpoint md и выше
    padding: spacing(8);
  }
}
```

**Grid система:**

````scss
.container {
  @include grid(12, spacing(6));     // 12 колонок с gap
}

.item {
  @include col-span(1, 8);           // Занимает колонки от 1 до 8
}

📚 **Документация:** [docs/SCSS_SNIPPETS_CHEATSHEET.md](docs/SCSS_SNIPPETS_CHEATSHEET.md)

## 🎨 SVG Sprite и иконки

Все SVG иконки из `src/icons/` автоматически собираются в спрайт при `npm run dev`.

**Использование в HTML:**

```html
<svg width="24" height="24">
  <use href="#icon-cart" fill="currentColor"></use>
</svg>
````

**Доступные иконки:**

- icon-logo
- icon-cart
- icon-phone
- icon-mail
- icon-arrow-right
- icon-close
- icon-check
- icon-drop
- icon-max
- icon-not
- и другие...

**При изменении иконок:**

- В dev режиме спрайт автоматически пересобирается
- Создается inline partial `svg-sprite.hbs` для вставки в HTML
- Генерируется файл `public/images/sprite.svg`

## 📸 Изображения

### Структура и использование

**Статические изображения:** `public/images/`

```html
<img src="/images/photo.webp" alt="Photo" loading="lazy" />
```

**Picture элемент для адаптивности:**

```html
<picture>
  <source
    srcset="/images/banner-mob@2x.webp 2x, /images/banner-mob.webp 1x"
    media="(max-width: 1240px)"
    type="image/webp"
  />
  <source
    srcset="/images/banner@2x.webp 2x, /images/banner.webp 1x"
    type="image/webp"
  />
  <img src="/images/banner.webp" alt="Banner" loading="lazy" />
</picture>
```

### Конвенция именования:

- `image.webp` - обычная версия
- `image@2x.webp` - retina версия (2x)
- `image-mob.webp` - мобильная версия
- `image-mob@2x.webp` - мобильная retina

📚 **Документация:** [docs/IMAGES_CHEATSHEET.md](docs/IMAGES_CHEATSHEET.md)

## 📄 Handlebars шаблоны

Проект использует Handlebars для разделения HTML на переиспользуемые компоненты.

### Layout компоненты

```handlebars
{{!-- index.html --}}
<!DOCTYPE html>
<html lang="ru">
  {{> layout/head title="Miracart - Подбор материалов для ремонта"}}
  <body>
    {{> layout/svg-sprite}}
    {{> layout/header}}

    <main>
      {{> sections/slogan}}
      {{> sections/advantages}}
      {{> sections/materials}}
      {{> sections/save-money}}
      {{> sections/roadmap}}
      {{> sections/why}}
      {{> sections/audience}}
      {{> sections/faq}}
      {{> sections/contacts}}
    </main>

    {{> layout/footer}}
    {{> layout/modal-cookies}}
    {{> layout/scripts}}
  </body>
</html>
```

### Передача данных в partials

```handlebars
{{> layout/head
  title="Заголовок страницы"
  description="Описание"
}}
```

## 🧩 Composables

Переиспользуемая логика для Vue компонентов:

### useForm

Управление состоянием формы, валидация, отправка:

```typescript
const { formData, state, errors, handleSubmit } = useForm({
  name: '',
  phone: '+7',
  email: '',
});
```

### useModal

Управление модальными окнами с анимациями:

```typescript
const { isOpen, isShown, isClosing, open, close } = useModal();
```

### usePhoneMask

Маска для телефонного номера:

```typescript
const { phone, handleInput, isValid, getDigits } = usePhoneMask('+7');
```

## 📚 Документация

- [SCSS Snippets Cheatsheet](docs/SCSS_SNIPPETS_CHEATSHEET.md) - Готовые SCSS сниппеты
- [HTML Snippets Cheatsheet](docs/HTML_SNIPPETS_CHEATSHEET.md) - Готовые HTML компоненты
- [Images Cheatsheet](docs/IMAGES_CHEATSHEET.md) - Работа с изображениями
- [Utilities Guide](docs/UTILITIES_GUIDE.md) - Утилитарные классы
- [Floating Inputs](docs/FLOATING_INPUTS.md) - Floating label инпуты

## 🌐 Примеры компонентов

Запустите dev-сервер и откройте:

- `/examples/` - Список всех примеров
- `/examples/forms.html` - Формы
- `/examples/images.html` - Изображения
- `/examples/modal.html` - Модальные окна
- `/examples/utilities.html` - Утилитарные классы

## 📝 Лицензия

ISC
