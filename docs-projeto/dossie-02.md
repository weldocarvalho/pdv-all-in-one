# 🚀 ACELERA_FOOD - DOSSIÊ DE TRANSIÇÃO OPERACIONAL (MVP)
> COPIE E COLE ESTE BLOCO NOVO NO INÍCIO DA PRÓXIMA SESSÃO

## 1. Status Atual do Sistema (Onde Paramos hoje)
O ecossistema multi-tenant está com a esteira crítica de vendas de ponta a ponta 100% funcional localmente.
- O checkout com Stripe (Modo Teste) abre, valida preços direto no banco e processa compras sem erros de Pix.
- O Webhook da Stripe intercepta o pagamento com sucesso (`200 OK`) através do túnel da Stripe CLI.
- O banco PostgreSQL cria o pedido, seus itens e executa a RPC atômica `deduzir_estoque_insumo` via Ficha Técnica (CMV).
- O Monitor de Produção (Cozinha) atualiza em Tempo Real via Supabase Realtime estruturado em colunas Kanban, com áudio nativo.
- O e-commerce público (Catálogo B2C) foi refatorado e separado em dois fluxos dedicados por nicho (LojaBurger e LojaAcai), aplicando o efeito visual "Folha de Papel" pastéis com alto contraste de marca na loja de açaí.

## 2. Alerta de Infraestrutura Local (Obrigatório ao Ligar o Mac)
Toda vez que o computador for ligado ou reiniciado, o túnel da Stripe CLI é desfeito. Para o webhook processar pedidos e enviá-los à cozinha, execute no terminal:
$ stripe listen --forward-to localhost:3000/api/webhooks/pagamentos

(Nota: Certifique-se de que o 'signing secret whsec_...' impresso no terminal confere com a chave 'STRIPE_WEBHOOK_SECRET' no seu .env.local).

## 3. Estado Atual do Banco de Dados (Supabase / Postgres)
As tabelas base (`restaurantes`, `insumos`, `itens_cardapio`, `composicao_produto`, `pedidos`, `itens_pedido`, `metricas_funil`) estão ativas. Rodamos e validamos duas expansões de schema cruciais:
1. `pedidos.created_at`: Substituiu o antigo 'criado_em', alinhando a API do Supabase com a coluna nativa.
2. Integração Meta Ads: Adicionamos as colunas `meta_access_token` e `meta_ad_account_id` em `restaurantes`, e `custo_meta_ads`, `cliques_anuncio`, `impressoes_anuncio` em `metricas_funil`.
3. Massa de Testes: Executamos o script de simulação para o slug 'acelera-acai', limpando testes órfãos em cascata e gerando 180 visitas, 42 checkouts e 9 pedidos pagos de açaí com CMV real calculando 5.0% de conversão.

## 4. Arquivos e Componentes Consolidados (TypeScript Estrito)
- `app/api/checkout/route.ts`: Checkout Session com `automatic_payment_methods` omitido para herdar Pix/Cartão dinâmicos do Dashboard Stripe Connect.
- `app/api/webhooks/pagamentos/route.ts`: Webhook ultra-protegido que salva o pedido mestre, resolve preços vigentes na tabela, roda as baixas de estoque via RPC e incrementa as compras no funil diário.
- `actions/checkout.ts`: Action de checkout manual/offline desvinculada do fluxo automático da Stripe para evitar dupla baixa de insumos.
- `actions/adminMetricas.ts`: Server Action de Growth que calcula visitas, checkouts, faturamento, custos acumulados de receitas e lucro bruto operacional.
- `app/[slug]/page.tsx`: Roteador mestre do servidor que despacha a interface B2C baseada no tipo do restaurante (ACAI ou BURGER).
- `app/(dashboard)/admin/cozinha/page.tsx`: Maestro da Cozinha Realtime que organiza a esteira em Kanban e aloja a rotina de autocura/reconciliação de rede ("Sincronizar").
- `components/cozinha/` ➔ `BarraNavegacaoCozinha.tsx` (Menu Bento sem o botão de sincronizar), `ColunaEsteiraCozinha.tsx` (Kanban separado) e `CardPedidoCozinha.tsx` (Cards brancos foscos com botões mudando de cor por nível de urgência).
- `components/ecommerce/` ➔ `ComponenteLojaBurger.tsx`, `ComponenteLojaAcai.tsx` (Efeito folha de papel flutuante em fundo `#FAFAFA` com cabeçalho AceleraFood Tech), `CardItemBurger.tsx` (Ícones puristas em SVG, sem emojis) e `CardItemAcai.tsx` (Estilo pastéis suaves baseado na referência do smartphone).

## 5. Próximos Passos Operacionais
Vou te informar agora.