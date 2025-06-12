import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

import cors from 'cors';
import express from 'express';

// Rotas
import CadastroOnline from '../src/routes/RotasOnline.js';
import CadastroOffline from '../src/routes/RotasOffline.js';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/cadastro/online/', CadastroOnline);
    this.app.use('/cadastro/offline/', CadastroOffline);
  }
}

export default new App().app;