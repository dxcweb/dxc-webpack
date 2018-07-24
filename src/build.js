import { resolve } from 'path';
import build from './webpack/build';
import getConfig from './webpack/getUserConfig';
import getWebpackConfig from './getWebpackConfig';
import getPaths from './getPaths';
import registerBabel from "./registerBabel";
import babelBabel from "./babel.js";
const babel = babelBabel();
const debug = require('debug')('roadhog:build');

export default function(opts = {}) {
  const { cwd = process.cwd(), watch } = opts;

  const paths = getPaths(cwd);

  return new Promise(resolve => {
    // register babel for config files
    registerBabel(babel, {
      cwd,
      configOnly: true,
    });

    // get user config
    const { config } = getConfig({ cwd });
    debug(`user config: ${JSON.stringify(config)}`);

    // get webpack config
    const webpackConfig = getWebpackConfig({
      cwd,
      config,
      babel,
      paths,
    });

    build({
      webpackConfig,
      watch,
      success: resolve,
    });
  });
}
