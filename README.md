# Frontend Project Template

Шаблон фронтенд-проекта на **Vite** с использованием **Vue Islands**, **SCSS** и **Handlebars**.

## 🚀 Технологии

- **Vite 7** - быстрая сборка
- **Vue 3** - прогрессивный фреймворк
- **TypeScript** - типизация
- **SCSS** - препроцессор стилей
- **Handlebars** - шаблонизатор HTML
- **SVG Sprite** - автоматическая сборка иконок
- **Image Tools** - оптимизация и конвертация в WebP

## 📁 Структура проекта

```
frontend/
├── pages/              # HTML страницы (multi-page app)
│   └── about.html
├── partials/           # Handlebars шаблоны (компоненты HTML)
│   ├── head.hbs
│   ├── header.hbs
│   ├── footer.hbs
│   └── scripts.hbs
├── src/
│   ├── components/     # Vue компоненты
│   │   ├── Counter.vue
│   │   └── LoginForm.vue
│   ├── islands/        # Адаптеры для монтирования Vue в HTML
│   │   ├── Counter.ts
│   │   └── LoginForm.ts
│   ├── icons/          # SVG иконки для спрайта
│   │   ├── logo.svg
│   │   ├── cart.svg
│   │   └── arrow-right.svg
│   ├── assets/         # Assets для обработки
│   │   └── images/     # Изображения для WebP конвертации
│   ├── styles/         # SCSS стили
│   │   ├── _variables.scss
│   │   ├── _reset.scss
│   │   ├── _base.scss
│   │   ├── _components.scss
│   │   └── app.scss
│   ├── main.ts         # Точка входа
│   └── vite-env.d.ts   # TypeScript декларации
├── public/             # Статические файлы
│   ├── fonts/          # Шрифты
│   └── images/         # Статические изображения
├── index.html          # Главная страница
├── vite.config.ts      # Конфигурация Vite
├── tsconfig.json       # Конфигурация TypeScript
└── package.json

```

## 🏝️ Vue Islands

Vue Islands позволяет использовать Vue компоненты на статических HTML страницах без необходимости SPA.

### Как использовать:

1. Создайте Vue компонент в `src/components/`
2. Создайте island-адаптер в `src/islands/`
3. Используйте в HTML через data-атрибуты:

```html
<div data-vue-island="Counter" data-props='{"start":5}'></div>
```

## 📦 Установка

```bash
npm install
cp .env.example .env.local  # Настройте переменные окружения
```

## 🛠️ Разработка

```bash
# Стандартный dev сервер
npm run dev

# Dev сервер + автоматическая конвертация изображений в WebP
npm run dev:watch
```

Откроется на [http://localhost:3000](http://localhost:3000)

**Dev режим использует моки** - не нужен работающий Laravel сервер!

### 🖼️ Автоматическая конвертация изображений в WebP

Проект автоматически конвертирует JPG/PNG в WebP (как в Gulp):

```bash
# Dev с автоконвертацией (рекомендуется)
npm run dev:watch

# Конвертировать все изображения единоразово
npm run images:convert

# Только watch для изображений
npm run images:watch
```

**Как использовать:**

1. Положите JPG/PNG в `public/images/`
2. Скрипт автоматически создаст `.webp` версию
3. Используйте в HTML: `<img src="/images/photo.webp">`

**Преимущества:**

- ✅ До 70% экономии размера
- ✅ Автоматический watch как в Gulp
- ✅ Показывает статистику сжатия
- ✅ Конвертация перед production билдом

## 📡 Работа с API и Laravel

Проект настроен для работы с Laravel API:

- **Development**: Используются mock данные (без Laravel)
- **Production**: Реальный Laravel API

### Быстрый старт с API:

1. **Настройте `.env.local`:**

   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

2. **Используйте в компонентах:**

   ```typescript
   import { authApi } from './services/api';

   const response = await authApi.login({ email, password });
   ```

3. **Или используйте composable:**

   ```typescript
   import { useForm } from './composables/useForm';

   const { formData, handleSubmit } = useForm({ email: '', password: '' });
   ```

📚 **Полная документация:** [docs/API-INTEGRATION.md](docs/API-INTEGRATION.md)

## 🏗️ Сборка

```bash
npm install
```

## 🛠️ Разработка

```bash
npm run dev
```

Откроется на [http://localhost:3000](http://localhost:3000)

## 🏗️ Сборка

```bash
npm run build
```

Результат в папке `dist/`

**Автоматически выполняется:**

- ✅ Конвертация всех JPG/PNG → WebP
- ✅ Минификация HTML, CSS, JS
- ✅ Оптимизация изображений
- ✅ Сборка SVG спрайта

## 👀 Превью продакшн сборки

```bash
npm run preview
```

## 🎨 Продвинутая SCSS архитектура

Проект использует мощную модульную систему стилей:

### Структура

```
src/styles/
├── _variables.scss   # Дизайн-система (цвета, spacing, breakpoints)
├── _functions.scss   # SCSS функции для получения значений
├── _mixins.scss      # Переиспользуемые миксины
├── _reset.scss       # CSS Reset
├── _base.scss        # Базовые стили
├── _components.scss  # Компоненты
├── _utilities.scss   # Утилитарные классы
├── _animations.scss  # Анимации
└── app.scss          # Главный файл
```

### Быстрые примеры

**Использование функций:**

```scss
.element {
  color: color('primary');
  padding: spacing(4);
  border-radius: radius('md');
}
```

**Миксины:**

```scss
.box {
  @include flex-center;
  @include card-shadow;

  @include respond-to('md') {
    padding: spacing(8);
  }
}
```

**Утилиты в HTML:**

```html
<div class="d-flex justify-between p-4 shadow-md rounded-lg"></div>
```

📚 **Полная документация:** [docs/SCSS-GUIDE.md](docs/SCSS-GUIDE.md)
🚀 **Быстрый старт:** [docs/SCSS-QUICKSTART.md](docs/SCSS-QUICKSTART.md)

## 🎨 Изображения и иконки

### SVG Спрайт

Все SVG иконки из `src/icons/` автоматически собираются в спрайт:

```html
<!-- В HTML -->
<svg class="icon">
  <use xlink:href="#icon-cart"></use>
</svg>

<!-- В SCSS -->
.icon { width: 24px; height: 24px; fill: currentColor; }
```

### Оптимизация изображений (WebP)

**Для обработки:** `src/assets/images/` → импорт в коде

```typescript
import photo from '@images/photo.jpg?format=webp&quality=80';
```

**Статические:** `public/images/` → прямой путь

```html
<img src="/images/banner.jpg" alt="Banner" />
```

### Структура

```
src/
├── icons/            # SVG иконки → спрайт
└── assets/
    └── images/       # Изображения для обработки (WebP)

public/
├── fonts/            # Шрифты
└── images/           # Статические изображения
```

📚 **Полная документация:** [docs/IMAGES_AND_ICONS.md](docs/IMAGES_AND_ICONS.md)
🎨 **Примеры:** [http://localhost:3002/examples/images.html](http://localhost:3002/examples/images.html)

## 📄 Шаблоны Handlebars

Используйте partials для переиспользуемых частей HTML:

```handlebars
{{> head title="Заголовок страницы"}}
{{> header}}
{{> footer}}
{{> scripts}}
```

## 📝 Лицензия

ISC
