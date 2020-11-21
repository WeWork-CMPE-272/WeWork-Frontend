// requires
const _ = require('lodash');

// module variables
const configFile = require('./config.json');

// Uncomment depending on what env you want to deploy to
// const environment = 'development';
const environment = 'production';
const config = configFile[environment];

export default config;
