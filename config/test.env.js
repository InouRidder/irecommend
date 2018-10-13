'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')
const Dotenv = require('dotenv-webpack');

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  plugins: [
    new Dotenv()
  ]
})
