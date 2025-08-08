import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import express from 'express';

// Rotas
import CadastroOnline from './routes/RotasOnline.js';
import CadastroOffline from './routes/RotasOffline.js';
import Ploomes from './routes/RotasPloomes.js';

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
    this.app.use('/ploomes/', Ploomes);
  }
}

export default new App().app;