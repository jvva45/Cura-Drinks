// Produtos.tsx (REFATORADO)
import Button from "@/componentes/Botao";
import { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import FormProduto from "@/componentes/pages/produtos/formulario";
import Style from "./Produtos.module.css";
import type { Produto } from "@/tipos/planner";
import ListaProdutos from "./ListaProdutos";
import { createProduto, updateProduto, deleteProduto, getProdutos } from "@/services/productService";
export default function Produtos() {
  const [showForm, setShowForm] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null);

  async function AdicionarProdutos(NovoProduto: Produto) {
    console.log(NovoProduto);
    
    const produtoCriado = await createProduto(NovoProduto);

    setProdutos(prev => [...prev, NovoProduto]);
    setShowForm(false);
  }

  function AtualizarProduto(produtoAtualizado: Produto) {
    setProdutos(prev =>
      prev.map(produto =>
        produto.id === produtoAtualizado.id ? produtoAtualizado : produto
      )
    );
    setProdutoEmEdicao(null);
    setShowForm(false);
  }

  function RemoverProduto(id: number) {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(prev => prev.filter(produto => produto.id !== id));
    }
  }

  function EditarProduto(id: number) {
    const produto = produtos.find(produto => produto.id === id);
    if (produto) {
      setProdutoEmEdicao(produto);
      setShowForm(true);
    }
  }

  function handleFecharFormulario() {
    setShowForm(false);
    setProdutoEmEdicao(null);
  }


  useEffect(() => {
    async function carregar() {
      const data = await getProdutos();
      setProdutos(data);
    }
    carregar();
  }, []);
  return (
    <div className={Style.paginaProdutos}>
      <div className={Style.containerProdutos}>
        <Button
          isSmall={false}
          onClick={() => {
            setProdutoEmEdicao(null);
            setShowForm(s => !s);
          }}
        >
          <IoIosAdd /> Adicionar Produto
        </Button>
      </div>

      {showForm && (
        <FormProduto
          setMostrarForm={handleFecharFormulario}
          aoAdicionarProduto={AdicionarProdutos}
          aoAtualizarProduto={AtualizarProduto}
          produtoParaEditar={produtoEmEdicao}
        />
      )}

      <ListaProdutos
        produtos={produtos}
        removerProdutos={RemoverProduto}
        editarProduto={EditarProduto}
      />
    </div>
  );
}

