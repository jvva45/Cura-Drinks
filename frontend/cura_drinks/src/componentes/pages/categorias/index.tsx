import Button from "@/componentes/Botao";
import FormCategoria from "./formulario";
import { IoIosAdd } from "react-icons/io";
import Style from "@/componentes/pages/categorias/Categorias.module.css";
import { useEffect, useState } from "react";
import type { Categoria } from "@/tipos/planner";
import ListaProdutos from "../produtos/ListaProdutos";
import ListaCategorias from "./ListaCategorias";
import { createCategoria, updateCategoria, deleteCategoria, getCategoria } from "@/services/categoriaService";
export default function Categorias() {
  const [showForm, setShowForm] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState<Categoria | null>(null);

  async function AdicionarCategorias(novaCategoria: Categoria) {
    console.log(novaCategoria);
    
    const produtoCriado = await createCategoria(novaCategoria);

    setCategorias(prev => [...prev, novaCategoria]);
    setShowForm(false);
  }

  function AtualizarCategoria(categoriaAtualizada: Categoria) {
    setCategorias(prev =>
      prev.map(categoria =>
        categoria.id === categoriaAtualizada.id ? categoriaAtualizada : categoria
      )
    );
    setCategoriaEmEdicao(null);
    setShowForm(false);
  }

  function handleFecharFormulario() {
    setShowForm(false);
    setCategoriaEmEdicao(null);
  }

  function RemoverCategoria(id: number) {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      setCategorias(prev => prev.filter(categoria => categoria.id !== id));
    }
  } // <-- fechou RemoverCategoria corretamente

  function EditarCategoria(id: number) {
    const categoria = categorias.find(categoria => categoria.id === id);
    if (categoria) {
      setCategoriaEmEdicao(categoria);
      setShowForm(true);
    }
  }


    useEffect(() => {
      async function carregar() {
        const data = await getCategoria();
        setCategorias(data);
      }
      carregar();
    }, []);

  return (
    <div className={Style.paginaCategoria}>
      <div className={Style.containerCategoria}>
        <Button
          isSmall={false}
          onClick={() => {
            setCategoriaEmEdicao(null);
            setShowForm(s => !s);
          }}
        >
          <IoIosAdd /> Adicionar Categoria
        </Button>
      </div>

      {showForm && (
        <FormCategoria
          setMostrarForm={setShowForm}
          aoAdicionarCategoria={AdicionarCategorias}
          aoAtualizarCategoria={AtualizarCategoria}
          categoriaParaEditar={categoriaEmEdicao}
        />
      )}

      <ListaCategorias
        categoria={categorias}            // sugiro usar o nome 'categorias'
        removerCategoria={RemoverCategoria}
        editarCategoria={EditarCategoria}
      />
    </div>
  );
}
