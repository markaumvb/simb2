// tsconfig-paths-bootstrap.js
const tsConfig = require('./tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = './'; // Either absolute or relative path. If relative it's resolved from cwd
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths || {},
});
