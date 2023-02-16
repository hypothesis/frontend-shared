import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import * as path from 'node:path';

import { format } from 'prettier';
import { optimize } from 'svgo';

const AUTO_GENERATED_COMMENT =
  '// This file was auto-generated using scripts/generate-icons.js';

/**
 * Convert a symbol name from kebab-case to PascalCase.
 *
 * @param {string} name
 */
function kebabCaseToPascalCase(name) {
  return name
    .split(/-+/)
    .map(token => token[0].toUpperCase() + token.slice(1))
    .join('');
}

/**
 * Generate source for a Preact icon component from its SVG source.
 *
 * @param {string} name - Name of the Preact component
 * @param {string} src - SVG source
 * @param {string} inputFileName - Name of the file that `src` comes from.
 *   This is used in documentation only.
 */
function generateIcon(name, src, inputFileName) {
  const optimized = optimize(src, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // View boxes are needed for some icons to be able to render
            // them at different sizes
            removeViewBox: false,
          },
        },
      },
    ],
  });

  // Take the body of the SVG and just treat it as JSX. This works because
  // SVG is XML (so all tags are closed) and SVG attribute names don't need
  // to be changed for Preact JSX.
  //
  // A caveat with this approach is that all attribute values will be strings.
  // We assume the performance cost of this is very minor.
  const content = optimized.data.replace(
    /<svg ([^>]+)>/,
    `<svg $1 data-component="${name}" {...props}>`
  );

  const jsx = `
${AUTO_GENERATED_COMMENT}
import type { JSX } from 'preact';

export type ${name}Props = JSX.SVGAttributes<SVGSVGElement>;

/**
 * Icon generated from ${inputFileName}
 */
export default function ${name}(props:${name}Props) {
  return ${content};
}
`;
  return format(jsx, {
    parser: 'babel',
    // Duplication of rules in package.json
    arrowParens: 'avoid',
    singleQuote: true,
  });
}

/**
 * Generate an icon component .js file from an SVG input file.
 *
 * The component name will be generated by pascal-casing the input file name
 * and appending "Icon". eg. "copy-file.svg" => `CopyFileIcon`.
 *
 * @param {string} inputFile - Input SVG file path
 * @param {string} outputDir - Output directory
 */
function generateIconFromFile(inputFile, outputDir) {
  const src = readFileSync(inputFile);
  const basename = path.basename(inputFile).replace(/\.svg/, '');

  const iconName = kebabCaseToPascalCase(basename);
  const componentName = iconName + 'Icon';

  const outputFile = `${outputDir}/${iconName}.tsx`;
  const outputSrc = generateIcon(componentName, src, basename + '.svg');

  writeFileSync(outputFile, outputSrc);
}

/**
 * Generate an index module for a set of (icon) component modules.
 * This will create an export for every file ending in `.js` in `componentDir`.
 * This assumes that every module has a single default export.
 *
 * @param {string} componentDir - Directory containing components
 */
function generateIconIndex(componentDir) {
  const iconComponents = readdirSync(componentDir).filter(
    file => file.endsWith('.tsx') && !file.includes('index')
  );
  let outputSrc = `${AUTO_GENERATED_COMMENT}\n`;
  for (let componentFile of iconComponents) {
    const componentModule = path.basename(componentFile, '.tsx');
    const componentName = `${componentModule}Icon`;
    outputSrc += `export { default as ${componentName} } from './${componentModule}';\n`;
  }
  const outputFile = `${componentDir}/index.ts`;

  writeFileSync(outputFile, outputSrc);
}

const inputDir = 'images/icons';
const outputDir = 'src/components/icons';

const svgFiles = readdirSync(inputDir).filter(file => file.endsWith('.svg'));
for (let file of svgFiles) {
  generateIconFromFile(`${inputDir}/${file}`, outputDir);
}

generateIconIndex(outputDir);
