const template = (variables, { tpl }) => {
  const componentName = `${variables.componentName.replace('Svg', '')}Icon`;
  const exports = `export default ${componentName}`;
  return tpl`
${variables.imports};

${variables.interfaces};

const ${componentName} = (${variables.props}) => (
  ${variables.jsx}
);

${exports};
`;
};

module.exports = template;
