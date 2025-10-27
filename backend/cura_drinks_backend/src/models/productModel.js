/* 
Este arquivo é como o "manual de instruções" para o nosso "caderno de produtos" no banco de dados 📘.
Ele sabe como "falar" com o banco para guardar, buscar, mudar e apagar informações dos produtos.
*/

const connection = require("../config/db"); // 🔑 Pega a conexão com o banco

const Product = {
  // 🏗️ Cria a tabela se ela ainda não existir
  createTable: (callback) => {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,                     -- Um número único pra cada produto
        nome VARCHAR(255) NOT NULL,                             -- Nome do produto
        categoria VARCHAR(100),                                 -- Categoria (ex: bebida, alimento)
        unidade VARCHAR(50) NOT NULL,                           -- Unidade de medida (ml, L, g, Kg, Un)
        embalagem VARCHAR(100),                                 -- Descrição da embalagem (ex: 1L, 500g)
        custo DECIMAL(10,2) NOT NULL,                           -- Custo por embalagem
        codigo_barras VARCHAR(50),                              -- Código de barras (opcional)
        imagem TEXT,                                            -- Imagem em base64 (opcional)
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP            -- Quando o produto foi cadastrado
      )
    `;
    connection.query(createTableSql, callback);
  },

  // ➕ Adiciona um novo produto
  create: (produtoData, callback) => {
    const { nome, categoria, unidade, embalagem, custo, codigoBarras, imagem } =
      produtoData;
    const sql = `
  INSERT INTO produtos (nome, categoria, unidade, embalagem, custo, codigo_barras, imagem)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    connection.query(
      sql,
      [nome, categoria, unidade, embalagem, custo, codigoBarras, imagem],
      callback
    );
  },

  // 🔍 Busca todos os produtos
  findAll: (callback) => {
    const sql = "SELECT * FROM produtos ORDER BY id DESC";
    connection.query(sql, callback);
  },

  // 🔎 Busca um produto específico pelo id
  findById: (id, callback) => {
    const sql = "SELECT * FROM produtos WHERE id = ?";
    connection.query(sql, [id], callback);
  },

  // ✏️ Atualiza os dados de um produto
  update: (id, productData, callback) => {
    const { nome, categoria, unidade, embalagem, custo, codigoBarras, imagem } =
      productData;
    const sql = `
      UPDATE produtos
      SET nome = ?, categoria = ?, unidade = ?, embalagem = ?, custo = ?, codigo_barras = ?, imagem = ?
      WHERE id = ?
    `;
    connection.query(
      sql,
      [nome, categoria, unidade, embalagem, custo, codigoBarras, imagem, id],
      callback
    );
  },

  // 🗑️ Apaga um produto do banco
  delete: (id, callback) => {
    const sql = "DELETE FROM produtos WHERE id = ?";
    connection.query(sql, [id], callback);
  },
};

module.exports = Product;
