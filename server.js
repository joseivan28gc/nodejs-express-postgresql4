const express = require('express');
const app = express();

const cors = require('cors');
const db = require('./app/config/db.config.js');

// Sincronizar la base de datos (¡Usa esto con cuidado!)
db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada correctamente');
});

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware para interpretar JSON (reemplaza body-parser)
app.use(express.json());

// Importar rutas
let router = require('./app/routes/router.js');
app.use('/', router);

// Ruta principal de prueba
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Crear un servidor
const server = app.listen(8080, function () {
  let port = server.address().port;
  console.log(`App listening at http://localhost:${port}`);
});
