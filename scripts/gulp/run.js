/* eslint-env node */

'use strict';

const { spawn } = require('child_process');

/**
 * Run a command and return a promise for when it completes.
 *
 * Output and environment is forwarded as if running a CLI command in the terminal
 * or make.
 *
 * This function is useful for running CLI tools as part of a gulp command.
 *
 * @param {string} cmd - Command to run
 * @param {string[]} args - Command arguments
 * @param {object} options - Options to forward to `spawn`
 * @return {Promise<string>}
 */
function run(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const stdout = [];
    const stderr = [];
    const cp = spawn(cmd, args, { env: process.env, ...options });
    cp.on('exit', code => {
      if (code === 0) {
        resolve(stdout.join(''));
      } else {
        reject(
          new Error(`${cmd} exited with status ${code}. \n${stderr.join('')}`)
        );
      }
    });
    cp.stdout.on('data', data => {
      stdout.push(data.toString());
    });
    cp.stderr.on('data', data => {
      stderr.push(data.toString());
    });
  });
}

module.exports = { run };
