const withPlugins = require('next-compose-plugins');
const withConfig = require('next-config');

module.exports = withPlugins([
  [withConfig],
  { target: 'serverless' },
]);
