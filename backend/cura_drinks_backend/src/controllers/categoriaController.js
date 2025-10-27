const Categoria = require("../models/categoriaModel"); // agora está coerente

module.exports = {
  // Teste de conexão com DB
  testDbConnection: (req, res) => {
    Categoria.testConnection((err) => {
      if (err)
        return res.status(500).json({ message: "Erro DB", error: err.message });
      res.json({ message: "Banco de dados conectado!" });
    });
  },

  // Criar tabela se não existir
  createTable: (req, res) => {
    Categoria.createTable((err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao criar tabela", error: err.message });
      res.json({ message: "Tabela criada com sucesso!" });
    });
  },

  // Adicionar categoria
  addCategoria: (req, res) => {
    const { nome } = req.body;

    // Campos obrigatórios
    if (!nome) {
      return res.status(400).json({
        message: "Campos obrigatórios: nome",
      });
    }

    const categoriaData = { nome };

    Categoria.create(categoriaData, (err, result) => {
      if (err) {
        console.error("Erro ao adicionar categoria:", err);
        return res
          .status(500)
          .json({ message: "Erro ao adicionar categoria", error: err.message });
      }
      res.status(201).json({
        message: "Categoria adicionada com sucesso!",
        id_categoria: result.insertId,
      });
    });
  },

  // Buscar todas as categorias
  getAllCategorias: (req, res) => {
    Categoria.findAll((err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao buscar categorias", error: err.message });
      res.json(results);
    });
  },

  // Buscar categoria por ID
  getCategoriaById: (req, res) => {
    const id = req.params.id;
    Categoria.findById(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao buscar categoria", error: err.message });
      res.json(result);
    });
  },

  // Atualizar categoria
  updateCategoria: (req, res) => {
    const id = req.params.id;
    const { nome } = req.body;

    const categoriaData = { nome };

    Categoria.update(id, categoriaData, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao atualizar categoria", error: err.message });
      res.json({ message: "Categoria atualizada com sucesso!" });
    });
  },

  // Deletar categoria
  deleteCategoria: (req, res) => {
    const id = req.params.id;
    Categoria.delete(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao deletar categoria", error: err.message });
      res.json({ message: "Categoria deletada com sucesso!" });
    });
  },
};
