
------------------------------
## 📋 DOSSIÊ TÉCNICO
## 1. Resumo do Produto & Modelo de Negócios

Você quer construir um Ecossistema de Vendas de Alta Conversão com Centro de Inteligência Financeira Embutido.
Aqui está o mapeamento exato do que entendi sobre o seu produto ideal:

1. O Lado do Cliente (A Máquina de Vendas Reais) 
Você não quer apenas um painel de gerenciamento, você quer a plataforma que processa o dinheiro.
Catálogo Veloz (E-commerce): Uma página leve, focada em conversão, onde o cliente entra via anúncio do Meta Ads, escolhe o produto (seja um combo de hambúrguer ou um copo de açaí montado) e vai direto para o checkout. 
Checkout Integrado (Pix e Cartão): Uma página de pagamento real e funcional (integrando APIs como Stripe, Asaas ou Mercado Pago). O cliente paga e o dinheiro cai na sua conta. 
Rastreamento do Pedido: Uma tela limpa para o cliente final ver o status do pedido ("Recebido", "Em preparo", "Saiu para entrega") atualizada em tempo real via Supabase.

2. O Lado do Gestor (O Diagnóstico de Lucratividade) 
Aqui está o seu grande diferencial competitivo sobre qualquer plataforma de delivery genérica do mercado. Você quer um painel que responda a três perguntas cruciais: 
O Funil de Vendas: Quantas pessoas clicaram no anúncio do Meta Ads ➔ Quantas abriram o cardápio ➔ Quantas iniciaram o checkout ➔ Quantas abandonaram o carrinho ➔ Quantas de fato pagaram. 
O Lucro Líquido Real: O sistema vai pegar o dinheiro que entrou no checkout, subtrair o custo exato dos insumos daquele produto (CMV) e subtrair o custo do anúncio (CPA do Meta Ads). 
O Direcionador de Orçamento: O painel vai te apontar o caminho. Exemplo: "O produto Açaí Turbinado tem uma margem de 70% e o custo de anúncio está baixo. Invista mais R$ 50 aqui hoje. O produto Burger X está com custo de anúncio muito alto e margem espremida; pause essa campanha."

* Diferencial de Mercado: É um "Centro de Comando Financeiro" para o dono do restaurante. Ele cruza de forma 100% automatizada e atômica o CPA (Custo por Aquisição) das campanhas de tráfego pago do Meta Ads com o CMV (Custo de Mercadoria Vendida) da Ficha Técnica dos produtos.

## 2. Stack Tecnológica & Infraestrutura

* Front-End / Back-End: Next.js 15+ (App Router) rodando localmente no MacBook Air M5 via Turbopack (npm run dev).
* Banco de Dados: Supabase (PostgreSQL) com criptografia, restrições exclusivas de chaves estrangeiras e índices B-Tree otimizados para busca instantânea de URLs baseadas em slug.
* Estilo Visual (Design System): Bento Grid Neomórfico Suave (Warm Minimalism). Paleta focada em tons foscos macios (#F8F8F8, #F3F3F3, #E1E1E1) com preto carbono para textos e realces de conversão na cor Coral Terracota (#E16349). Sem emojis (visual corporativo enterprise limpo) e com portais React (createPortal) nativos para isolar profundidade tridimensional de modais.
* Camaleão B2C: O e-commerce do cliente final se adapta visualmente ao nicho cadastrado no banco. Na loja de açaí (/acelera-acai), ele herda uma paleta de luxo.
* ** Gateway de Pagamentos:** Stripe (Modo de Testes - Cartão de Crédito).

## 3. Arquitetura do Banco de Dados (Supabase / Postgres)
Possuímos as seguintes tabelas e regras ativas:

* restaurantes (id, nome, tipo, slug, meta_pixel_id, stripe_account_id) -> Slug indexado.
* insumos (id, restaurante_id, nome, unidade_medida, custo_unitario, estoque_atual, estoque_minimo) -> Possui restrição única para evitar nomes duplicados no mesmo restaurante.
* itens_cardapio (id, restaurante_id, nome, descricao, preco_venda, disponivel)
* composicao_produto (id, item_cardapio_id, insumo_id, quantidade_necessaria) -> Tabela que ancora a Ficha Técnica.
* pedidos (id, restaurante_id, status ['PENDENTE', 'PAGO', etc], valor_total, forma_pagamento, dados_cliente [JSON])
* itens_pedido (id, pedido_id, item_cardapio_id, quantidade, preco_unitario)
* metricas_funil (id, restaurante_id, data, visitas_cardapio, checkouts_iniciados, compras_concluidas) -> Possui uma trigger Postgres (trg_inicializar_metricas) que cria automaticamente uma linha zerada para o dia corrente assim que um restaurante é inserido.
* Função RPC Ativa (deduzir_estoque_insumo): Uma stored procedure em PL/pgSQL executada de forma atômica dentro do PostgreSQL para decrementar o estoque_atual da tabela insumos com base nas quantidades multiplicadas da ficha técnica do produto comprado, blindando o sistema contra bugs de concorrência.

## 4. Estrutura de Arquivos e Código Atual
O projeto está modularizado e fracionado em subcomponentes enxutos na seguinte árvore de diretórios:

* lib/supabase.ts -> Cliente privado de servidor Next.js que usa a SUPABASE_SECRET_KEY (service_role).
* lib/supabaseClient.ts -> Cliente público que usa a NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (anon), blindado contra vazamentos.
* actions/cardapio.ts -> Server Action que faz a busca cruzada dinâmica de produtos por inquilino usando params assíncronos do Next.js moderno (ex: await params).
* actions/admin.ts -> Server Actions administrativas protegidas por 'use server'. Contém as lógicas de listarProdutosComCMV() — que calcula o custo de produção, margem bruta e percentual de CMV em tempo real cruzando a tabela de insumos e composição sem salvar dados estáticos corrompíveis no banco —, além de criarProdutoComFichaTecnica() e alternarDisponibilidadeProduto().
* actions/adminInsumos.ts -> Server Actions para gerenciar a esteira de estoque (criarInsumoAdmin, excluirInsumosEmLote, atualizarCustoInsumoAdmin).
* actions/checkout.ts -> Server Action que recebe os itens validados do e-commerce, inicia o pedido mestre e chama as baixas de insumo.
* components/cardapio-admin/ -> Contém os subcomponentes fracionados BarraAcoesLote.tsx, CardProdutoAdmin.tsx, e o ModalNovoProduto.tsx (que lista os insumos dinamicamente para o gestor montar a receita ao criar o prato).
* components/insumos-admin/ -> Contém CardInsumoAdmin.tsx, ModalNovoInsumo.tsx e ModalEditarInsumo.tsx (modais isolados via createPortal e useEffect de hidratação).
* components/ecommerce/ -> Contém ContextoCarrinho.tsx (React Context do carrinho global), CardItemCardapio.tsx (card mobile com seletor +/- estilo iFood) e BarraCarrinhoFlutuante.tsx (sacola de checkout camaleão).
* app/[slug]/page.tsx -> Página pública de vendas B2C de alta velocidade baseada em roteamento multi-inquilino.
* app/(dashboard)/admin/produtos/page.tsx -> Painel do gestor de produtos ativo com abas superiores horizontais sem emojis e wordmark puro AceleraFood.
* app/(dashboard)/admin/insumos/page.tsx -> Painel de controle de custos de estoque integrado.
* app/api/checkout/route.ts -> API Endpoint que se comunica de forma ultra-segura com a Stripe. Configurada com automatic_payment_methods: { enabled: true } para renderizar o formulário de Cartão de Crédito de teste e receber os metadados do pedido de forma imutável.
* app/api/webhooks/pagamentos/route.ts -> Endpoint de escuta que intercepta o evento checkout.session.completed da Stripe, valida a assinatura digital e processa a efetivação e baixa física do pedido.
