// testConnection.js
const connection = require('./src/config/db');

// só pra manter o processo vivo o tempo de testar
connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
  if (err) {
    console.error('Erro ao executar teste:', err);
    return;
  }
  console.log('Conexão OK! Resultado do teste:', results[0].resultado);
  connection.end();
});
