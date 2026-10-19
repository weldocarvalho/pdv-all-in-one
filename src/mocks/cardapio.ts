export interface ProdutoCardapio {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  idImagem: 'smash' | 'cheddar' | 'fritas' | 'refri' | 'suco'; // Mapeia o vetor SVG
  categoria: 'burgers' | 'bebidas' | 'porcoes';
}

export const CARDAPIO_MOCK: ProdutoCardapio[] = [
  {
    id: 'p1',
    nome: 'Smash Bacon Burger',
    descricao: 'Pão brioche, blend de carne de 150g, queijo cheddar fatiado derretido e muito bacon crocante.',
    preco: 29.90,
    idImagem: 'smash',
    categoria: 'burgers'
  },
  {
    id: 'p2',
    nome: 'Cheddar Bomb',
    descricao: 'Pão brioche, dois blends de 150g e uma injeção absurda de queijo cheddar cremoso.',
    preco: 34.90,
    idImagem: 'cheddar',
    categoria: 'burgers'
  },
  {
    id: 'p3',
    nome: 'Batata Frita Rústica',
    descricao: 'Porção de batatas fritas crocantes com sal e alecrim acompanhadas de maionese da casa.',
    preco: 16.00,
    idImagem: 'fritas',
    categoria: 'porcoes'
  },
  {
    id: 'p4',
    nome: 'Refrigerante em Lata',
    descricao: 'Lata de 350ml trincando de gelada. Escolha o sabor nas opções.',
    preco: 6.00,
    idImagem: 'refri',
    categoria: 'bebidas'
  },
  {
    id: 'p5',
    nome: 'Suco de Laranja Natural',
    descricao: 'Suco de laranja puro da fruta, extraído na hora. Copo de 400ml.',
    preco: 9.00,
    idImagem: 'suco',
    categoria: 'bebidas'
  }
];
