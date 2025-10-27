
// Este é o arquivo principal do nosso "brinquedo" backend!
// Pense nele como o "maestro" da orquestra ou o "cérebro" que junta todas as partes.

// 1. Importamos o "Express": É como um super-herói que nos ajuda a criar as "estradas" (rotas) para o nosso backend.
const express = require("express");
const cors = require("cors");      
// 2. Importamos as "Rotas de Produto": São as "regras de trânsito" específicas para os nossos produtos.
// Elas dizem como lidar com pedidos para adicionar, ver, atualizar ou apagar produtos.
const productRoutes = require("./routes/productRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
// 3. Importamos a "Conexão com o Banco de Dados": É a "ponte" que liga nosso backend ao nosso "caderno mágico" (banco de dados MySQL).
// Assim, podemos guardar e buscar informações sobre os produtos.
const connection = require("./config/db"); // Importa a conexão para garantir que ela seja estabelecida


// 4. Criamos nosso aplicativo Express: É como montar o "carro" principal do nosso brinquedo.
const app = express();
app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
// 5. Definimos a "Porta": É como o "endereço" onde nosso brinquedo vai "morar" na internet.
// Se ninguém disser um endereço, ele vai morar na porta 3000.
const PORT = process.env.PORT || 3000;

// 6. Dizemos ao Express para entender mensagens em formato JSON:
// É como ensinar nosso brinquedo a entender uma linguagem especial que os outros brinquedos (aplicativos) falam.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 7. Conectamos as "Regras de Trânsito" dos produtos ao nosso "carro" principal:
// Agora, quando alguém pedir algo sobre produtos, o carro sabe para onde direcionar.
// O "/api" é como um "portão de entrada" para todas as nossas rotas de API.
app.use("/api/produtos", productRoutes);
app.use("/api/categorias", categoriaRoutes);

// 8. Ligamos o servidor: É como "dar a partida" no nosso brinquedo!
// Ele começa a funcionar e a esperar por pedidos.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

