// import app from './App.js'; // Ele já está sendo exportado e executado ao mesmo tempo.

// const port = 3306;

// app.listen(port, () => {
//   console.log(`O App está rodando na porta ${port}...`);
// });

import serverless from 'serverless-http';
import app from './App.js'; // Ele já está sendo exportado e executado ao mesmo tempo.

// 1) Exporta o handler para o Vercel
export const handler = serverless(app);

const port = 3306;

app.listen(port, () => {
  console.log(`O App está rodando na porta ${port}...`);
});