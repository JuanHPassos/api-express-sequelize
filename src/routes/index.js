// Ponto de acesso para todas as rotas
const express = require('express');
const pessoas = require('./pessoasRoute.js');
const categorias = require('./categoriasRoute.js');
const cursos = require('./cursosRoute.js');

module.exports = app => {
  // Recebe middlewares.
  app.use(
    // converte para JSON os dados que vem como string.
    express.json(), 
    pessoas, // Todas rotas de pessoas.
    categorias,
    cursos
  );
};
