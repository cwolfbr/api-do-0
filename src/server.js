import serverless from 'serverless-http';
import app from './App.js'; // Ele já está sendo exportado e executado ao mesmo tempo.

// 1) Exporta o handler para o Vercel
export const handler = serverless(app);

// No vercel não é necessário realizar a ligação da API.
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3306;
  app.listen(port, () =>
    console.log(`App rodando em http://localhost:${port}`)
  );
}