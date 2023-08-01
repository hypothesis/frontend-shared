import chalk from 'chalk';

/**
 * Defines a plop (https://plopjs.com/) generator to scaffold out new components
 *
 * Run with `yarn run plop` or `npm run plop`
 *
 * @param {import('plop').NodePlopAPI} plop
 */
export default function (plop) {
  plop.setGenerator('component', {
    description: 'Add a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name (e.g. Panel)',
      },
      {
        type: 'input',
        name: 'group',
        message: 'component group directory (e.g. layout)',
      },
      {
        type: 'list',
        name: 'category',
        message: 'component category',
        choices: ['presentational', 'composite', 'simple', 'transition'],
        default: 'presentational',
      },
      {
        type: 'confirm',
        name: 'addPatternLibraryPage',
        message: 'Add a pattern-library documentation page for this component?',
        default: false,
      },
    ],
    actions: data => {
      const actionList = [
        {
          type: 'add',
          path: 'src/components/{{group}}/{{name}}.tsx',
          templateFile: 'plop-templates/{{category}}-component.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{group}}/index.ts',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: 'src/components/{{group}}/index.ts',
          pattern: /\n\n*$/g,
          template: `\nexport { default as {{name}} } from './{{name}}';
${
  data.category !== 'transition'
    ? "export type { {{name}}Props } from './{{name}}';\n"
    : ''
}`,
        },
        {
          type: 'add',
          path: 'src/components/{{group}}/test/{{name}}-test.js',
          templateFile: 'plop-templates/{{category}}-component-test.hbs',
        },
        {
          type: 'modify',
          path: 'src/index.ts',
          pattern: /\n\n*$/g,
          template: `\nexport { {{name}} } from './components/{{group}}';
${
  data.category !== 'transition'
    ? "export type { {{name}}Props } from './components/{{group}}';\n"
    : ''
}`,
        },
      ];

      if (data.addPatternLibraryPage) {
        actionList.push({
          type: 'add',
          path: 'src/pattern-library/components/patterns/{{group}}/{{name}}Page.tsx',
          templateFile: 'plop-templates/pattern-library-page.hbs',
        });
      }
      actionList.push(`${chalk.green('✔')} ${chalk.bold('Next steps:')}

      - [ ] ${chalk.bold('implement')} the component
      - [ ] write ${chalk.bold('tests')} for the component
      - [ ] put ${chalk.bold('exports')} in the appropriate order in
          - \`src/components/${data.group}/index.ts\` and
          - \`src/index.ts\`
      - [ ] ${chalk.bold(
        'test',
      )} against an external application (client or lms)
      - [ ] add ${chalk.bold(
        'documentation',
      )} to a new or existing pattern-library page`);
      if (data.addPatternLibraryPage) {
        actionList.push(`          - Add route to \`src/pattern-library/routes.js\`, e.g.:
              {
                title: '${data.name}',
                group: '${data.group}',
                component: ${data.name}Page,
                route: '/${data.group}-${data.name.toLowerCase()}'
              }
  `);
      }

      return actionList;
    },
  });
}
