import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import express from 'express';

// Rotas
import CadastroOnline from './routes/RotasOnline.js';

function sanitize(body = {}) {
  const { email, telefone, ...rest } = body;
  return rest;
}

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/cadastro/online/', CadastroOnline);
  }

  errorHandler() {
    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => {
      console.error('Unhandled error', {
        error: err.message,
        body: sanitize(req.body),
      });
      res.status(err.status || 500).json({ msg: 'Erro interno do servidor' });
    });
  }
}

export default new App().app;

