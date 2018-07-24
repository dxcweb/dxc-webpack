const debug = require('debug')('dxc-webpack:send');

export const COMPILING = '编译';
export const DONE = '完成';
export const STARTING = '启动';
export const RESTART = '重新启动';
export const OPEN_FILE = '打开文件';

export default function send(message) {
  if (process.send) {
    debug(`send ${JSON.stringify(message)}`);
    process.send(message);
  }
}
