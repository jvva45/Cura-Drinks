
// Este arquivo é como a "chave" e o "mapa" para o nosso "caderno mágico" (banco de dados MySQL).
// Ele guarda as informações de como o nosso backend (o brinquedo) vai se conectar ao caderno.

// 1. Chamamos o "ajudante" que sabe falar com o MySQL.
const mysql = require("mysql2");

// 2. Criamos a "chave" da conexão com o caderno mágico.
const connection = mysql.createConnection({
  host: "localhost", // Onde o caderno mágico "mora" (geralmente no seu próprio computador)
  user: "root", // O "nome de usuário" para abrir o caderno (como o seu nome para entrar em casa)
  password: "Joaovieira45", // A "senha secreta" para o caderno (MUITO IMPORTANTE MUDAR ESTA SENHA!)
  database: "cura_drinks_db", // O "nome do caderno" que vamos usar (onde guardamos os produtos)
});

// 3. Tentamos "abrir" o caderno mágico.
connection.connect((err) => {
  if (err) {
    // Se der erro, é como se a chave não funcionasse ou a senha estivesse errada.
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  // Se tudo der certo, uhu! Conseguimos abrir o caderno!
  console.log("Conexão bem-sucedida ao banco de dados MySQL!");
});

// 4. Exportamos a "chave" para que outras partes do nosso brinquedo possam usá-la para falar com o caderno.
module.exports = connection;
