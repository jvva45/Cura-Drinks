// src/services/productService.js

// URL base do backend (ajuste se necessário)
const API_URL = "http://localhost:3000/api/categorias";

/**
 * Busca todos os produtos do banco de dados.
 */
export async function getCategoria() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }
  return await response.json();
}

/**
 * Adiciona um novo produto.
 * @param {Object} categoria - Dados do produto a ser criado.
 */
export async function createCategoria(categoria) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar categoria");
  }

  return await response.json();
}

/**
 * Atualiza um produto existente.
 * @param {number} id - ID do produto.
 * @param {Object} categoria - Dados atualizados.
 */
export async function updateCategoria(id, categoria) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoria),
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
export async function deleteCategoria(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir categoria");
  }

  return await response.json();
}
