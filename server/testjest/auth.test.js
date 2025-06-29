const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());
app.post('/api/auth/register', (req, res) => {
  // Simula respuesta simple para la prueba inicial
  res.status(201).json({ message: 'Usuario registrado correctamente' });
});

describe('Auth API', () => {
  it('debería registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'test', email: 'test@email.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Usuario registrado correctamente');
  });
});
