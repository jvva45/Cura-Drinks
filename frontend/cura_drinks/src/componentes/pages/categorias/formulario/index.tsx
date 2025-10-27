import { IoMdCloseCircle } from "react-icons/io";
import Campo from "@/componentes/Campo";
import Style from "./Formulario.module.css";
import { useState, useEffect, useRef } from "react";
import type { Categoria } from "@/tipos/planner";

interface FormCategoriaProps {
  setMostrarForm: (mostrar: boolean) => void;
  aoAdicionarCategoria: (categoria: Categoria) => void;
  aoAtualizarCategoria?: (categoria: Categoria) => void;
  categoriaParaEditar?: Categoria | null;
}

export default function FormCategoria({
  setMostrarForm,
  aoAdicionarCategoria,
  aoAtualizarCategoria,
  categoriaParaEditar = null,
}: FormCategoriaProps) {
  const [dados, setDados] = useState({
    nome: "",
  });

  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [isClosing, setIsClosing] = useState(false); 
  const formRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    setIsClosing(false); 
    if (categoriaParaEditar) {
      setDados({
        nome: categoriaParaEditar.nome || "",
      });
    } else {
      setDados({
        nome: "",
      });
      setImagemArquivo(null);
    }
  }, [categoriaParaEditar?.id]); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDados(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dados.nome.trim()) {
      alert("Por favor, informe o nome do produto.");
      return;
    }

    const categoriaData = {
      nome: dados.nome.trim(),
    };

    if (categoriaParaEditar && aoAtualizarCategoria) {
      aoAtualizarCategoria(categoriaData);
    } else if (aoAdicionarCategoria) {
      aoAdicionarCategoria(categoriaData);
    }
  };

  const handleFechar = () => {
    setIsClosing(true); 
    setTimeout(() => {
      setMostrarForm(false);
    }, 300); 
  };

  return (
    <div ref={formRef} className={`${Style.formContainer} ${isClosing ? Style.closing : ''}`}>
      <div className={Style.formHeader}>
        <h1>{categoriaParaEditar ? "Editar Produto" : "Nova Categoria"}</h1>
        <IoMdCloseCircle className={Style.closeIcon} onClick={handleFechar} />
      </div>

      <form id="produtoForm" onSubmit={handleSubmit}>
        <div className={Style.formGrid}>
          <div className={Style.formGroup}>
            <Campo
              label="Nome da Categoria *"
              type="text"
              name="nome"
              placeholder="Digite o nome da Categoria"
              value={dados.nome}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={Style.formActions}>
          <button type="submit" className={Style.saveButton}>
            {categoriaParaEditar ? "Atualizar Categoria" : "Salvar Categoria"}
          </button>
        </div>
      </form>
    </div>
  );
}
