# 📋 ACELERA_FOOD - DOSSIÊ DE TRANSIÇÃO E ENTREGA TÉCNICA
> Copie e cole este bloco completo no início da nossa próxima sessão de chat.

## 1. Visão Geral do Contexto e Arquitetura
Um ecossistema multi-inquilino (multi-tenant) de vendas para delivery, focado nos nichos de Hambúrguer e Açaí. Desenvolvido em Next.js 15+ (App Router, Turbopack) rodando localmente no MacBook Air M5, utilizando Supabase (PostgreSQL) e Stripe (Modo de Teste) para processamento real de pagamentos.

### Design System Rígido (Warm Minimalism / Bento Grid)
* Interface limpa, corporativa e de nível empresarial. Não é permitido o uso de emojis nos painéis administrativos.
* Paleta fosca macia: Fundos (#F8F8F8, #F3F3F3, #E1E1E1), texto em Preto Carbono e realces de conversão na cor Coral Terracota (#E16349).
* Motor Camaleão B2C: Adapta dinamicamente os tokens de cores e estilos de acordo com o nicho do restaurante (ex: tons pastéis de luxo #3B0D2C para o slug `/acelera-acai` e coral terracota para as hamburguerias).

---

## 2. Marcos Concluídos e 100% Funcionais
1. **Checkout B2C Inteligente:** Modularizado em subcomponentes atômicos (`AbasCheckout.tsx`, `FormularioEndereco.tsx`, `AbaCep.tsx`, `AbaGps.tsx`, `AbaRetirada.tsx`) na pasta `components/ecommerce/`. Implementa autocomplete de CEP via ViaCEP e geolocalização por GPS integrada através de uma Rota de API servidora (`app/api/geocode/route.ts`) que consome o OpenStreetMap (Nominatim API) para evitar bloqueios de CORS no navegador ou problemas de filtros de links no chat.
2. **Webhook e Baixa Automática:** O túnel local da Stripe CLI escuta e envia eventos com sucesso (`200 OK`) para `app/api/webhooks/pagamentos/route.ts`, processando as baixas de estoque de forma atômica no banco de dados via stored procedure em PL/pgSQL (`deduzir_estoque_insumo`), calculando o CMV real.
3. **Monitor Realtime da Cozinha (Kanban):** Painel mestre estruturado em `app/(dashboard)/admin/cozinha/page.tsx` e desacoplado em um hook customizado (`useCozinha.ts`) para escutar o barramento de eventos (`INSERT` / `UPDATE`) do Supabase Realtime, garantindo que os pedidos brotem na tela assim que o webhook da Stripe muda o status para `PAGO`.

---

## 3. Configuração Atual dos Arquivos de Infraestrutura
Para resolver de forma definitiva o tráfego de sessões entre componentes de servidor e cliente usando Cookies no lugar do LocalStorage, instalamos o pacote oficial `@supabase/ssr`. As credenciais e arquivos de conexão atuais são:

```typescript
// lib/supabaseClient.ts
import { createBrowserClient } from '@supabase/ssr';

export const supabaseClient = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
```

```typescript
// Referência de Credenciais do seu arquivo .env.local
NEXT_PUBLIC_SUPABASE_URL=https://supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_cqrFpQK2mqVAbqB7mjuEaA_nLZsc4nW
SUPABASE_SECRET_KEY=***REMOVIDO***
STRIPE_SECRET_KEY=***REMOVIDO***
STRIPE_PUBLISHABLE_KEY=pk_test_51TorQ71KB57HswMwEA2HKFSlWdnDJlUFaAbD3gCdt8mA1mbJEh1mNSOyBotaeb02UyB38QuPralUwmDOXVeAg3oK00dqgsW7ZO
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=***REMOVIDO***
```

---

## 4. Gargalos Atuais e Pendências Técnicas (Onde Paramos)
* **Erro de Depreciação no `lib/supabase.ts`:** A assinatura do construtor de servidor `createServerClient` gerou alertas de código obsoleto no compilador TypeScript devido ao mapeamento dos métodos de cookies. Precisamos reescrever essa factory de forma definitiva seguindo o padrão estável e atualizado de `getAll` e `setAll` assíncronos do Next.js 15, eliminando de vez qualquer remendo ou aviso visual.
* **Arquitetura de Autenticação e Autorização:** O sistema precisa gerenciar múltiplos gestores (pessoas físicas com e-mail/senha próprios) administrando o mesmo `restaurante_id` corporativo. Criamos a modelagem da tabela `perfis_admin` no banco, e agora precisamos implementar a segurança de linha (RLS) no Postgres e a rota de login no front-end.
* **Trava do Alerta Sonoro:** O sintetizador de áudio nativo da cozinha sofre bloqueios intermitentes por conta das diretivas de *Autoplay* dos navegadores modernos (Safari/Chrome), exigindo uma solução de ativação por clique em um botão Bento elegante.

## 5. Próximos Passos Imediatos para a Nova Sessão
1. **Consertar de vez o `lib/supabase.ts`** com o padrão assíncrono oficial e não depreciado de cookies para o Next.js 15.
2. **Criar o arquivo `middleware.ts` oficial** do projeto usando o `@supabase/ssr` para renovar os tokens nos cookies das rotas protegidas `/admin/*`.
3. **Construir a Tela de Login Corporativa** (`app/login/page.tsx`) integrada às Server Actions para dar início à autenticação física de múltiplos gestores.
