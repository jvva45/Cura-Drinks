import { IoMdCloseCircle } from "react-icons/io";
import Campo from "@/componentes/Campo";
import Style from "./Formulario.module.css";
import { useState, useEffect, useRef } from "react";
import type { Produto } from "@/tipos/planner";

interface FormProdutoProps {
  setMostrarForm: (mostrar: boolean) => void;
  aoAdicionarProduto: (produto: Produto) => void;
  aoAtualizarProduto?: (produto: Produto) => void;
  produtoParaEditar?: Produto | null;
  opcoesUnidade?: string[];
}

export default function FormProduto({
  setMostrarForm,
  aoAdicionarProduto,
  aoAtualizarProduto,
  produtoParaEditar = null,
  opcoesUnidade = ["ml", "L", "g", "Kg", "Un"]
}: FormProdutoProps) {
  const [dados, setDados] = useState({
    nome: "",
    categoria: "",
    unidade: opcoesUnidade[0],
    embalagem: "",
    custo: "",
    codigoBarras: "",
    imagem: ""
  });

  const [imagemArquivo, setImagemArquivo] = useState<File | null>(null);
  const [isClosing, setIsClosing] = useState(false); // Novo estado para controlar a animação de fechamento
  const formRef = useRef<HTMLDivElement>(null); // Ref para o container do formulário

  // CORREÇÃO: Adicionar dependências corretas e evitar loop infinito
  useEffect(() => {
    setIsClosing(false); // Resetar o estado de fechamento ao abrir/reabrir o formulário
    if (produtoParaEditar) {
      setDados({
        nome: produtoParaEditar.nome || "",
        categoria: produtoParaEditar.categoria || "",
        unidade: produtoParaEditar.unidade || opcoesUnidade[0],
        embalagem: produtoParaEditar.embalagem || "",
        custo: produtoParaEditar.custo?.toString() || "",
        codigoBarras: produtoParaEditar.codigoBarras || "",
        imagem: produtoParaEditar.imagem || ""
      });
    } else {
      // Limpar o formulário quando não estiver editando
      setDados({
        nome: "",
        categoria: "",
        unidade: opcoesUnidade[0],
        embalagem: "",
        custo: "",
        codigoBarras: "",
        imagem: ""
      });
      setImagemArquivo(null);
    }
  }, [produtoParaEditar?.id]); // IMPORTANTE: Usar apenas o ID como dependência

  const readFileAsDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagemArquivo(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setDados(prev => ({ ...prev, imagem: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDados(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!dados.nome.trim()) {
      alert("Por favor, informe o nome do produto.");
      return;
    }

    if (!dados.custo || Number(dados.custo) <= 0) {
      alert("Por favor, informe um custo válido para o produto.");
      return;
    }

    let imagemDataUrl = dados.imagem;
    if (!imagemDataUrl && imagemArquivo) {
      try {
        imagemDataUrl = await readFileAsDataURL(imagemArquivo);
      } catch (err) {
        console.error("Erro ao ler imagem:", err);
      }
    }

    const produtoData = {
  nome: dados.nome.trim(),
  categoria: dados.categoria.trim(),
  unidade: dados.unidade || opcoesUnidade[0],
  embalagem: dados.embalagem.trim(),
  custo: Number(dados.custo) || 0,
  codigoBarras: dados.codigoBarras.trim(),
  imagem: imagemDataUrl // só a string base64
};


    if (produtoParaEditar && aoAtualizarProduto) {
      aoAtualizarProduto(produtoData);
    } else {
      aoAdicionarProduto(produtoData);
    }

    // Não precisa limpar aqui, o useEffect fará isso quando produtoParaEditar mudar
  };

  const handleFechar = () => {
    setIsClosing(true); // Inicia a animação de fechamento
    // Espera a animação terminar antes de fechar o formulário
    setTimeout(() => {
      setMostrarForm(false);
    }, 300); // 300ms deve corresponder à duração da animação CSS
  };

  return (
    <div ref={formRef} className={`${Style.formContainer} ${isClosing ? Style.closing : ''}`}>
      <div className={Style.formHeader}>
        <h1>{produtoParaEditar ? "Editar Produto" : "Novo Produto"}</h1>
        <IoMdCloseCircle className={Style.closeIcon} onClick={handleFechar} />
      </div>

      <form id="produtoForm" onSubmit={handleSubmit}>
        <div className={Style.formGrid}>
          <div className={Style.formGroup}>
            <Campo
              label="Nome do Produto *"
              type="text"
              name="nome"
              placeholder="Digite o nome do produto"
              value={dados.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className={Style.formGroup}>
            <Campo
              label="Categoria"
              type="text"
              name="categoria"
              placeholder="Informe a categoria do produto"
              value={dados.categoria}
              onChange={handleChange}
            />
          </div>

          <div className={Style.formGroup}>
            <Campo
              label="Embalagem"
              type="text"
              name="embalagem"
              placeholder="Ex: 1L, 500g, dúzia"
              value={dados.embalagem}
              onChange={handleChange}
            />
            <small className={Style.helpText}>
              Descreva como o produto é comprado (ex: garrafa de 1L, pacote de 500g)
            </small>
          </div>
          <div className={Style.formGroup}>
            <label className={Style.label}>Unidade de Medida *</label>
            <select
              name="unidade"
              value={dados.unidade}
              onChange={handleChange}
              className={Style.select}
              required
            >
              {opcoesUnidade.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>



          <div className={Style.formGroup}>
            <Campo
              label="Custo (R$) *"
              type="number"
              name="custo"
              placeholder="Informe o custo do produto"
              value={dados.custo}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
            <small className={Style.helpText}>
              Custo por embalagem (ex: R$ 42,00 por garrafa de 1L)
            </small>
          </div>

          <div className={Style.formGroup}>
            <Campo
              label="Código de Barras"
              type="text"
              name="codigoBarras"
              placeholder="Informe o código de barras (opcional)"
              value={dados.codigoBarras}
              onChange={handleChange}
            />
          </div>

          <div className={Style.formGroup}>
            <label className={Style.label}>Imagem do Produto</label>
            <input
              type="file"
              name="imagem"
              accept="image/*"
              onChange={handleImageChange}
              className={Style.fileInput}
            />
            {dados.imagem && (
              <div className={Style.imagePreviewContainer}>
                <img src={dados.imagem} alt="Preview do Produto" className={Style.imagePreview} />
              </div>
            )}
          </div>
        </div>

        <div className={Style.formActions}>
          <button type="submit" className={Style.saveButton}>
            {produtoParaEditar ? "Atualizar Produto" : "Salvar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
}
