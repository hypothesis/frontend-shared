const baseConfig = require('./.babelrc');

// Override base config to produce CommonJS instead of ESM output.
const config = { ...baseConfig };
const presetEnvConfig = config.presets.find(
  ([name]) => name === '@babel/preset-env'
)[1];
presetEnvConfig.modules = 'cjs';

module.exports = config;
