// src/server.js
import app from './App.js';

// Só em LOCAL (npm start) eu quero dar listen:
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`App rodando em http://localhost:${port}`)
  );
}

// **NÃO** chame listen em produção
// **Exporte o app** como default para o Vercel usar como handler
export default app;
