import serverless from 'serverless-http';
import app       from './App.js';
import dotenv from 'dotenv';

dotenv.config();

export const handler = serverless(app);

// — Só faz listen em dev/local, nunca em produção
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3306;
  app.listen(port, () =>
    console.log(`App rodando em http://localhost:${port}`)
  );
}