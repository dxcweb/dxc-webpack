import { join } from "path";
import excapeRegExp from "lodash.escaperegexp";

export default function(babel, opts) {
  const { cwd } = opts;
  const files = [
    ".roadhogrc.mock.js",
    ".webpackrc.js",
    "webpack.config.js",
    "mock",
    "src"
  ].map(file => {
    return excapeRegExp(join(cwd, file));
  });
  const only = [new RegExp(`(${files.join("|")})`)];
  process.env.BABEL_DISABLE_CACHE = 1;
  require("@babel/register")({
    ...babel,
    only,
    babelrc: false,
    cache: false
  });
}
