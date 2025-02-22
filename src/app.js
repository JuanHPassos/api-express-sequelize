/* eslint-disable linebreak-style */
const express = require('express');
// Pega o index js por padrão
const routes = require('./routes');

const app = express();
routes(app);

module.exports = app;
