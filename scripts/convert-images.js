import path from 'path';
import fs from 'fs';
import { watch } from 'fs';
import { fileURLToPath } from 'url';

// Проверка наличия sharp
try {
  await import('sharp');
} catch (error) {
  console.error('❌ Ошибка: пакет "sharp" не установлен.');
  console.error('📦 Установите его командой: npm install sharp');
  process.exit(1);
}

const sharp = (await import('sharp')).default;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.resolve(__dirname, '../public/images');

// Поддерживаемые форматы
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// Настройки конвертации
const WEBP_QUALITY = 80;

/**
 * Конвертирует изображение в WebP
 */
async function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (!SUPPORTED_FORMATS.includes(ext)) {
    return;
  }

  const fileName = path.basename(filePath, ext);
  const outputPath = path.join(path.dirname(filePath), `${fileName}.webp`);

  // Пропускаем, если WebP уже существует и новее исходника
  if (fs.existsSync(outputPath)) {
    const sourceStats = fs.statSync(filePath);
    const outputStats = fs.statSync(outputPath);

    if (outputStats.mtime > sourceStats.mtime) {
      console.log(`⏭️  Пропуск: ${fileName}.webp уже существует`);
      return;
    }
  }

  try {
    const startTime = Date.now();

    await sharp(filePath).webp({ quality: WEBP_QUALITY }).toFile(outputPath);

    const sourceSize = fs.statSync(filePath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savedPercent = Math.round(
      ((sourceSize - outputSize) / sourceSize) * 100,
    );
    const duration = Date.now() - startTime;

    console.log(
      `✅ ${fileName}${ext} → ${fileName}.webp (${formatBytes(outputSize)}, -${savedPercent}%, ${duration}ms)`,
    );
  } catch (error) {
    console.error(`❌ Ошибка конвертации ${filePath}:`, error.message);
  }
}

/**
 * Конвертирует все изображения в директории
 */
async function convertAllImages() {
  if (!fs.existsSync(imagesDir)) {
    console.log(`📁 Создаю директорию: ${imagesDir}`);
    fs.mkdirSync(imagesDir, { recursive: true });
    return;
  }

  console.log(`🔍 Сканирование: ${imagesDir}\n`);

  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_FORMATS.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('📭 Нет изображений для конвертации');
    return;
  }

  console.log(`📦 Найдено изображений: ${imageFiles.length}\n`);

  for (const file of imageFiles) {
    await convertToWebP(path.join(imagesDir, file));
  }

  console.log(`\n✨ Готово! Обработано файлов: ${imageFiles.length}`);
}

/**
 * Запускает watch режим
 */
function startWatchMode() {
  console.log(`👀 Watch режим запущен для: ${imagesDir}\n`);
  console.log(
    '💡 Добавьте JPG/PNG в public/images/ для автоматической конвертации\n',
  );

  // Создаем директорию, если её нет
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Следим за изменениями
  watch(imagesDir, { recursive: false }, async (eventType, filename) => {
    if (!filename) return;

    const ext = path.extname(filename).toLowerCase();
    if (!SUPPORTED_FORMATS.includes(ext)) return;

    const filePath = path.join(imagesDir, filename);

    // Проверяем, что файл существует (не был удален)
    if (!fs.existsSync(filePath)) return;

    if (eventType === 'rename' || eventType === 'change') {
      console.log(`\n📸 Обнаружен: ${filename}`);
      await convertToWebP(filePath);
    }
  });

  // Обрабатываем существующие файлы при запуске
  convertAllImages();
}

/**
 * Форматирует размер файла
 */
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Запуск
const args = process.argv.slice(2);
const watchMode = args.includes('--watch') || args.includes('-w');

console.log('🎨 WebP Image Converter\n');

if (watchMode) {
  startWatchMode();
} else {
  convertAllImages();
}
