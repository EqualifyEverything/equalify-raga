// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

var webpack = require('webpack'),
  path = require('path'),
  fs = require('fs'),
  config = require('../webpack.config'),
  ZipPlugin = require('zip-webpack-plugin');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

var packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const filename = `${packageInfo.name}-${packageInfo.version}.zip`;
const zipPath = path.join(__dirname, '../', 'zip');

console.log('Creating a production build...');
console.log('Creating a zip package...');
console.log('Zip file:', filename);
console.log('Zip path:', zipPath);

config.plugins = (config.plugins || []).concat(
  new ZipPlugin({
    filename,
    path: zipPath,
  })
);

webpack(config, function (err) {
  if (err) throw err;
});
