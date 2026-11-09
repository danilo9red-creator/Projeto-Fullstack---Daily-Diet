
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const refeicaoRoutes = require('./routes/refeicaoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Daily Diet funcionando!'
  });
});

app.use('/usuarios', usuarioRoutes);
app.use('/refeicoes', refeicaoRoutes);

module.exports = app;
