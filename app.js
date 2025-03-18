const express = require('express'); // Importar Express
const app = express(); // Crear una instancia de Express
const path = require('path'); // Importar el módulo 'path' para manejar rutas de archivos
const userRoutes = require('./routes/userRoutes'); // Importar las rutas de la API

// Middleware para parsear JSON (permite leer el cuerpo de las solicitudes en formato JSON)
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    // Enviar el archivo index.html cuando se acceda a la raíz
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Usar las rutas de la API bajo el prefijo "/api"
app.use('/api', userRoutes);

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('API running on http://localhost:3000');
});