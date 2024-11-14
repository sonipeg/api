// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Importar las rutas de audios
const audioRoutes = require('./routes/audio');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/audios', audioRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API REST de Visualizador de Audio está funcionando');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
