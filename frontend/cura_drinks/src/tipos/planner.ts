// Tipo separado para unidade de medida


// Interface do produto
export interface Produto {
 id?: number; 
  nome: string;
  categoria: string;
  unidade: string;           // Unidade de medida padrão (ml, L, g, Kg, Un)
  embalagem: string;          // NOVO CAMPO: Descrição da embalagem (1L, 500g, dúzia)
  custo: number;              // Custo por embalagem
  codigoBarras?: string;
  imagem?: string;            // DataURL da imagem
  imagemFile?: File;          // Arquivo de imagem original
}


export interface Categoria {
 id?: number; 
nome: string;

}