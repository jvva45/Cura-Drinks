// ListaProdutos.tsx
import { useState, useEffect } from "react";
import styles from "./ListaProdutos.module.css";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import type { Produto } from "@/tipos/planner";
import Button from "@/componentes/Botao";
import Campo from "@/componentes/Campo";

interface ProdutosListProps {
  produtos?: Produto[];
  removerProdutos?: (id: number) => void;
  editarProduto?: (id: number) => void;
}

function ProductImage({ produto }: { produto: Produto }) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!produto) return;

    if (typeof produto.imagem === "string" && produto.imagem.startsWith("data:")) {
      setObjectUrl(produto.imagem);
      return;
    }

    if (produto.imagemFile instanceof File) {
      const url = URL.createObjectURL(produto.imagemFile);
      setObjectUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }

    setObjectUrl(null);

    return () => {
      if (objectUrl && objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [produto, objectUrl]);

  if (!objectUrl) {
    return (
      <div className={styles.imagemProdutoPlaceholder}>
        <FaRegUser size={24} />
      </div>
    );
  }

  return (
    <img
      src={objectUrl}
      alt={produto.nome}
      className={styles.imagemProdutoPreview}
      style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 4 }}
    />
  );
}

export default function ListaProdutos({
  produtos = [],
  removerProdutos = () => {},
  editarProduto = () => {}
}: ProdutosListProps) {
  const [consulta, setConsulta] = useState("");

  // Filtrar produtos com base na consulta
  const produtosFiltrados = produtos.filter((produto) => {
    if (!consulta.trim()) return true;

    const termoBusca = consulta.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(termoBusca) ||
      produto.categoria?.toLowerCase().includes(termoBusca) ||
      produto.codigoBarras?.toLowerCase().includes(termoBusca)
    );
  });

  const handleConsultaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsulta(event.target.value);
  };

  return (
    <div className={styles.containerProdutos}>
      <h1>Consulta de Produtos</h1>

      <div className={styles.consultaContainer}>
        <Campo 
          placeholder="Consulte o Produto por nome, categoria ou código de barras"
          name="consulta"
          value={consulta}
          onChange={handleConsultaChange}
        />
      </div>

      {produtos.length === 0 ? (
        <div className={styles.emptyState}>
          <FaRegUser size={60} color="#007bff" />
          <p>Nenhum produto cadastrado.</p>
          <p>Cadastre um produto para que ele apareça aqui.</p>
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className={styles.emptyState}>
          <FaRegUser size={60} color="#007bff" />
          <p>Nenhum produto encontrado com "{consulta}".</p>
          <p>Tente buscar por outro termo.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Embalagem</th>
              <th>Unidade</th>
              <th>Custo</th>
              <th>Código de Barras</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((produto) => (
              <tr key={produto.id ?? Math.random()} className={styles.produtoRow}>
                <td>
                  <ProductImage produto={produto} />
                </td>
                <td>{produto.nome}</td>
                <td>{produto.categoria || '-'}</td>
                <td>{produto.embalagem || '-'}</td>
                <td>{produto.unidade}</td>
                <td>R$ {Number(produto.custo).toFixed(2)}</td>
                <td>{produto.codigoBarras || '-'}</td>
                <td>
                  {produto.id !== undefined && (
                    <>
                      <Button
                        className={styles.acaoButton}
                        onClick={() => editarProduto(produto.id!)}
                      >
                        <FaPencilAlt size={20} />
                      </Button>
                      <Button
                        className={styles.acaoButton}
                        onClick={() => removerProdutos(produto.id!)}
                      >
                        <IoMdCloseCircle size={20} color="red" />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
