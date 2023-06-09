import { generateManifest } from '@hypothesis/frontend-build';
import fs from 'fs';

const templateMap = [
  ['{{ css_bundle }}', 'styles/pattern-library.css'],
  ['{{ js_bundle }}', 'scripts/pattern-library.bundle.js'],
];

export async function buildPatternLibraryIndex() {
  const manifest = await generateManifest({
    pattern: 'build/{scripts,styles}/pattern-library*.{css,js}',
  });
  const templateContent = fs
    .readFileSync('templates/index.template.html')
    .toString();

  const processedTemplateContent = templateMap.reduce(
    (content, [pattern, fileName]) => {
      return content.replace(pattern, manifest[fileName] ?? pattern);
    },
    templateContent
  );

  fs.writeFileSync('build/index.html', processedTemplateContent);
}
