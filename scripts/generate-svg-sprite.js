import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { watch } from 'fs';
import svgstore from 'svgstore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.resolve(__dirname, '../src/icons');
const outputFile = path.resolve(__dirname, '../public/images/sprite.svg');
const partialFile = path.resolve(
  __dirname,
  '../partials/layout/svg-sprite.hbs',
);

/**
 * Генерирует SVG спрайт
 */
function generateSprite() {
  const sprites = svgstore({
    cleanDefs: true,
    cleanSymbols: true,
    svgAttrs: {
      'aria-hidden': 'true',
      style: 'position:absolute;width:0;height:0;overflow:hidden',
    },
  });

  const svgFiles = fs.readdirSync(iconsDir).filter((f) => f.endsWith('.svg'));

  if (!svgFiles.length) {
    console.log('⚠️  No SVG files found in src/icons/');
    return;
  }

  svgFiles.forEach((file) => {
    const name = `icon-${path.basename(file, '.svg')}`;
    const content = fs.readFileSync(path.join(iconsDir, file), 'utf-8');
    sprites.add(name, content);
    console.log(`✓ Added ${name}`);
  });

  // Получаем строку спрайта и заменяем все цвета на currentColor
  let spriteStr = sprites.toString({ inline: true });
  spriteStr = spriteStr.replace(
    /fill="(?!none|transparent)[^"]*"/g,
    'fill="currentColor"',
  );
  spriteStr = spriteStr.replace(
    /stroke="(?!none|transparent)[^"]*"/g,
    'stroke="currentColor"',
  );

  // Сохраняем SVG файл
  fs.writeFileSync(outputFile, spriteStr);

  // Сохраняем как Handlebars partial для инлайна в HTML
  fs.writeFileSync(partialFile, spriteStr);

  console.log(`\n✨ Sprite:  ${outputFile}`);
  console.log(`📄 Partial: ${partialFile}`);
  console.log(`📦 Total icons: ${svgFiles.length}\n`);
}

/**
 * Запускает watch режим
 */
function startWatchMode() {
  console.log(`👀 Watch режим запущен для: ${iconsDir}\n`);
  console.log(
    '💡 Добавьте SVG в src/icons/ для автоматического обновления спрайта\n',
  );

  // Создаем директорию, если её нет
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Следим за изменениями
  watch(iconsDir, { recursive: false }, async (eventType, filename) => {
    if (!filename || !filename.endsWith('.svg')) return;

    console.log(`\n🔄 Обнаружено изменение: ${filename}`);
    console.log('🎨 Regenerating SVG Sprite...\n');
    generateSprite();
  });

  // Генерируем спрайт при запуске
  console.log('🎨 Generating SVG Sprite...\n');
  generateSprite();
}

// Запуск
const args = process.argv.slice(2);
const watchMode = args.includes('--watch') || args.includes('-w');

if (watchMode) {
  startWatchMode();
} else {
  console.log('🎨 Generating SVG Sprite...\n');
  generateSprite();
}
