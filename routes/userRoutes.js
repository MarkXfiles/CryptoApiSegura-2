const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

let users = []; // Lista de usuarios (en memoria)

// Ruta para obtener todos los usuarios (GET)
router.get('/users', (req, res) => {
    res.json(users);
});

// Ruta para agregar un nuevo usuario (POST)
router.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

// Ruta para login (generar un token JWT)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar credenciales (en un caso real, consultarías una base de datos)
    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ username, role: 'user' }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Unauthorized');
    }
});

// Ruta protegida (requiere un token JWT válido)
router.get('/secure', (req, res) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).send('Access denied.');

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');
        res.send(`Hello ${decoded.username}`);
    });
});

module.exports = router;