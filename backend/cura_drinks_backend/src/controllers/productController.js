const Product = require("../models/productModel"); // ajuste para seu model

module.exports = {
  // Teste de conexão com DB
  testDbConnection: (req, res) => {
    Product.testConnection((err) => {
      if (err)
        return res.status(500).json({ message: "Erro DB", error: err.message });
      res.json({ message: "Banco de dados conectado!" });
    });
  },

  // Criar tabela se não existir
  createTable: (req, res) => {
    Product.createTable((err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao criar tabela", error: err.message });
      res.json({ message: "Tabela criada com sucesso!" });
    });
  },

  // Adicionar produto
  addProduct: (req, res) => {
    const { nome, custo, embalagem, unidade, categoria, codigoBarras, imagem } =
      req.body;

    // Campos obrigatórios
    if (!nome || !custo || !unidade) {
      return res.status(400).json({
        message: "Campos obrigatórios: nome, custo e unidade",
      });
    }

    const produtoData = {
      nome, // exatamente o que o model espera
      categoria,
      unidade,
      embalagem,
      custo,
      codigoBarras,
      imagem,
    };


    
    Product.create(produtoData, (err, result) => {
      if (err) {
        console.error("Erro ao adicionar produto:", err);
        return res
          .status(500)
          .json({ message: "Erro ao adicionar produto", error: err.message });
      }
      res.status(201).json({
        message: "Produto adicionado com sucesso!",
        id_produto: result.insertId,
      });
    });
  },

  // Buscar todos os produtos
  // Buscar todos os produtos
  getAllProducts: (req, res) => {
    Product.findAll((err, results) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao buscar produtos", error: err.message });
      res.json(results);
    });
  },

  // Buscar produto por ID
  getProductById: (req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao buscar produto", error: err.message });
      res.json(result);
    });
  },

  // Atualizar produto
  updateProduct: (req, res) => {
    const id = req.params.id;
    const { nome, custo, embalagem, unidade, categoria, codigoBarras, imagem } =
      req.body;
    const produtoData = {
      nome_produto: nome,
      custo_unitario: custo,
      embalagem,
      unidade_medida: unidade,
      categoria,
      codigoBarras,
      imagem,
    };

    Product.update(id, produtoData, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao atualizar produto", error: err.message });
      res.json({ message: "Produto atualizado com sucesso!" });
    });
  },

  // Deletar produto
  deleteProduct: (req, res) => {
    const id = req.params.id;
    Product.delete(id, (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erro ao deletar produto", error: err.message });
      res.json({ message: "Produto deletado com sucesso!" });
    });
  },
};
