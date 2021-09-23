const baseConfig = require('./.babelrc');

const config = { ...baseConfig };
const presetEnvConfig = config.presets.find(
  ([name]) => name === '@babel/preset-env'
)[1];
presetEnvConfig.modules = 'cjs';

module.exports = config;
