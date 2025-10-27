// ListaProdutos.tsx
import { useState, useEffect } from "react";
import styles from "./ListaCategorias.module.css";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import type { Categoria } from "@/tipos/planner";
import Button from "@/componentes/Botao";
import Campo from "@/componentes/Campo";

interface CategiriaListProps {
  categoria?: Categoria[];
  removerCategoria?: (id: number) => void;
  editarCategoria?: (id: number) => void;
}


export default function ListaCategorias({
  categoria = [],
  removerCategoria = () => { },
  editarCategoria = () => { }
}: CategiriaListProps) {
  const [consulta, setConsulta] = useState("");

  // Filtrar produtos com base na consulta
  const produtosFiltrados = categoria.filter((categoria) => {
    if (!consulta.trim()) return true;

    const termoBusca = consulta.toLowerCase();
    return (
      categoria.nome.toLowerCase().includes(termoBusca)
    );
  });

  const handleConsultaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsulta(event.target.value);
  };

  return (
    <div className={styles.containerConsulta}>
      <h1>Consulta de Produtos</h1>

      <div className={styles.consultaContainer}>
        <Campo
          placeholder="Consulte categoria "
          name="consulta"
          value={consulta}
          onChange={handleConsultaChange}
        />
      </div>

      {categoria.length === 0 ? (
        <div className={styles.emptyState}>
          <FaRegUser size={60} color="#007bff" />
          <p>Nenhum produto cadastrado.</p>
          <p>Cadastre um produto para que ele apareça aqui.</p>
        </div>
      ) : produtosFiltrados.length === 0 ? (
        <div className={styles.emptyState}>
          <FaRegUser size={60} color="#007bff" />
          <p>Nenhuma categoria encontrada com "{consulta}".</p>
          <p>Tente buscar por outro termo.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th> {/* Adicionado para corresponder à coluna de ações */}
            </tr>
          </thead>
          <tbody>
            {produtosFiltrados.map((categoria) => (
              <tr key={categoria.id ?? Math.random()} className={styles.categoriaRow}>
                <td>{categoria.nome}</td>
                <td>
                  {categoria.id !== undefined && (
                    <>
                      <Button
                        className={styles.acaoButton}
                        onClick={() => editarCategoria(categoria.id!)}
                      >
                        <FaPencilAlt size={20} />
                      </Button>
                      <Button
                        className={styles.acaoButton}
                        onClick={() => removerCategoria(categoria.id!)}
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
