// src/services/productService.js

// URL base do backend (ajuste se necessário)
const API_URL = "http://localhost:3000/api/produtos";

/**
 * Busca todos os produtos do banco de dados.
 */
export async function getProdutos() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }
  return await response.json();
}

/**
 * Adiciona um novo produto.
 * @param {Object} produto - Dados do produto a ser criado.
 */
export async function createProduto(produto) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }

  return await response.json();
}

/**
 * Atualiza um produto existente.
 * @param {number} id - ID do produto.
 * @param {Object} produto - Dados atualizados.
 */
export async function updateProduto(id, produto) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }

  return await response.json();
}

/**
 * Exclui um produto.
 * @param {number} id - ID do produto.
 */
export async function deleteProduto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir produto");
  }

  return await response.json();
}
