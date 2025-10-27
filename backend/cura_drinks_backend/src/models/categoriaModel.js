const connection = require("../config/db"); // conexão com o banco

const Categoria = {
  // Testa conexão com o DB
  testConnection: (callback) => {
    // Uma verificação simples que funciona com mysql / mysql2
    connection.query("SELECT 1", (err, result) => {
      callback(err, result);
    });
  },

  // Cria a tabela se não existir
  createTable: (callback) => {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS categoria (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    connection.query(createTableSql, callback);
  },

  // Adiciona uma nova categoria
  create: (categoriaData, callback) => {
    const { nome } = categoriaData;
    const sql = `INSERT INTO categoria (nome) VALUES (?)`;
    connection.query(sql, [nome], callback);
  },

  // Busca todas as categorias
  findAll: (callback) => {
    const sql = "SELECT * FROM categoria ORDER BY id DESC";
    connection.query(sql, callback);
  },

  // Busca categoria por id
  findById: (id, callback) => {
    const sql = "SELECT * FROM categoria WHERE id = ?";
    connection.query(sql, [id], callback);
  },

  // Atualiza categoria
  update: (id, categoriaData, callback) => {
    const { nome } = categoriaData;
    const sql = `UPDATE categoria SET nome = ? WHERE id = ?`;
    connection.query(sql, [nome, id], callback);
  },

  // Deleta categoria
  delete: (id, callback) => {
    const sql = "DELETE FROM categoria WHERE id = ?";
    connection.query(sql, [id], callback);
  },
};

module.exports = Categoria;
