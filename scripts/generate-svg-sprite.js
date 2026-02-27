import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.resolve(__dirname, '../src/icons');
const outputFile = path.resolve(__dirname, '../partials/svg-sprite.hbs');

console.log('🎨 Generating SVG Sprite...\n');

// Функция оптимизации SVG
function optimizeSvg(content) {
  let optimized = content;

  // Заменяем fill на currentColor (кроме fill="none" и fill="transparent")
  optimized = optimized.replace(
    /fill=["'](?!none|transparent)[^"']*["']/gi,
    'fill="currentColor"',
  );

  // Заменяем stroke на currentColor (кроме stroke="none" и stroke="transparent")
  optimized = optimized.replace(
    /stroke=["'](?!none|transparent)[^"']*["']/gi,
    'stroke="currentColor"',
  );

  // Удаляем дубликаты currentColor (если уже был)
  optimized = optimized.replace(
    /fill="currentColor"\s+fill="currentColor"/gi,
    'fill="currentColor"',
  );
  optimized = optimized.replace(
    /stroke="currentColor"\s+stroke="currentColor"/gi,
    'stroke="currentColor"',
  );

  // Удаляем лишние пробелы и переносы
  optimized = optimized.replace(/\s+/g, ' ').trim();

  return optimized;
}

// Читаем все SVG файлы
const svgFiles = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith('.svg'));

if (svgFiles.length === 0) {
  console.log('⚠️  No SVG files found in src/icons/');
  process.exit(0);
}

// Генерируем спрайт
let spriteContent = `<svg id="svg-sprite" style="position: absolute; width: 0; height: 0; overflow: hidden;" aria-hidden="true">\n`;

svgFiles.forEach((file) => {
  const filePath = path.join(iconsDir, file);
  const svgContent = fs.readFileSync(filePath, 'utf-8');
  const name = path.basename(file, '.svg');

  // Извлекаем содержимое SVG (без тега <svg>)
  const match = svgContent.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
  if (match) {
    let innerContent = match[1].trim();

    // Оптимизируем SVG
    innerContent = optimizeSvg(innerContent);

    // Извлекаем viewBox из исходного SVG
    const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    spriteContent += `  <symbol id="icon-${name}" viewBox="${viewBox}">\n`;
    spriteContent += `    ${innerContent}\n`;
    spriteContent += `  </symbol>\n`;

    console.log(`✓ Added icon-${name}`);
  }
});

spriteContent += `</svg>`;

// Сохраняем partial
fs.writeFileSync(outputFile, spriteContent);

console.log(`\n✨ SVG Sprite generated: ${outputFile}`);
console.log(`📦 Total icons: ${svgFiles.length}`);
