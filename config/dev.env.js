'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const Dotenv = require('dotenv-webpack');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  plugins: [
    new Dotenv()
  ]
})
