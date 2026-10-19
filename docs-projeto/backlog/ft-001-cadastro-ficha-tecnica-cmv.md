Excelente escolha unificar a stack com Node.js (TypeScript). Isso acelera o desenvolvimento, reduz a carga cognitiva da equipe e casa perfeitamente com o ecossistema do Next.js e Supabase.
Como Product Manager (PM) e UX Designer, estruturei a Feature 1.1: Cadastro de Ficha Técnica Dinâmica (CMV) focando na simplicidade. O dono de hamburgueria não tem tempo para preencher planilhas complexas. A experiência precisa ser fluida e intuitiva. [1] 
------------------------------
## 📋 User Story: Cadastro de Ficha Técnica (CMV)
Como dono de uma hamburgueria cadastrado no sistema,
Quero cadastrar meus insumos brutos e associá-los aos itens do meu cardápio com suas respectivas quantidades,
Para que o sistema calcule o Custo de Mercadoria Vendida (CMV) automaticamente e eu saiba minha margem de lucro real.
## Critérios de Aceite (Regras de Negócio):

   1. Unidades de Medida Padronizadas: O sistema deve aceitar apenas gramas (g), mililitros (ml) e unidades (un).
   2. Cálculo Automático de Custo Proporcional: Se o dono paga R$ 40,00 por um pacote de 1kg de bacon e usa 30g no hambúrguer, o sistema deve calcular automaticamente o custo dessa porção (R$ 40,00 / 1000 × 30 = R$ 1,20).
   3. Atualização em Cascata: Se o preço do quilo do bacon for atualizado no cadastro de insumos, o custo de todos os hambúrgueres que levam bacon deve ser recalculado instantaneamente.
   4. Alerta de Margem Crítica: O sistema não pode permitir salvar uma ficha técnica onde o custo total dos insumos seja maior ou igual ao preço de venda do hambúrguer, emitindo um aviso visual impeditivo.

------------------------------
## 🗺️ Fluxo de Telas (UX Flow)
Para esta feature, o usuário passará por duas telas principais dentro do painel administrativo.
## Tela 1: O Almoxarifado (Cadastro de Insumos Brutos)
Antes de montar o hambúrguer, o dono precisa dizer ao sistema o que ele compra dos fornecedores e quanto paga.

* Ação do Usuário: Clica em "Adicionar Insumo".
* Campos do Formulário:
1. Nome do Insumo: (ex: Pão Brioche, Blend de Costela 150g, Queijo Cheddar Fatiado)
   2. Unidade de Medida: Dropdown [ Unidade | Gramas | Mililitros ]
   3. Quantidade da Embalagem Fechada: (ex: 1000 para 1kg de queijo, ou 12 para um pacote com 12 pães)
   4. Preço Pago na Embalagem: (ex: R$ 50,00)
* Cálculo em tempo real no banco: O sistema salva e mostra o "Custo por Unidade de Medida" (ex: R$ 0,05 por grama de cheddar).

## Tela 2: A Cozinha / Cardápio (Montagem da Ficha Técnica)
Aqui o usuário vincula os insumos criados na Tela 1 a um produto final do e-commerce.

* Ação do Usuário: Vai até a lista de produtos do cardápio, seleciona "Smash Burger" e clica em "Editar Ficha Técnica".
* O Componente de Montagem (UX Repetidor):
* O usuário vê uma linha com dois campos: um buscador do insumo e a quantidade utilizada.
   * Exemplo de preenchimento:
   * Linha 1: [ Selecionar: Pão Brioche ] ➔ Quantidade: [ 1 ] un (Sistema calcula: R$ 1,20)
      * Linha 2: [ Selecionar: Blend Carne ] ➔ Quantidade: [ 150 ] g (Sistema calcula: R$ 4,50)
      * Linha 3: [ Selecionar: Queijo Cheddar ] ➔ Quantidade: [ 30 ] g (Sistema calcula: R$ 1,50)
   * O Rodapé Dinâmico (Feedback Visual Instantâneo):
Conforme o usuário adiciona linhas, o rodapé da tela atualiza os seguintes blocos sem precisar salvar:
* Preço de Venda: R$ 25,00 (Puxado do cadastro do produto)
   * Custo de Produção (CMV): R$ 7,20 🟡 (Soma das linhas)
   * Margem Bruta Comercial: R$ 17,80 (71,2% de lucro bruto)

------------------------------
## Próximo Passo Estratégico
Com as regras de negócio e a experiência do usuário desenhadas para a Feature 1.1, estamos prontos para tangibilizar isso na engenharia de software utilizando a stack escolhida (Node.js + Supabase).
Se você estiver de acordo com esse fluxo, podemos:

* Montar a Arquitetura do Banco de Dados (Schema PostgreSQL/Supabase) para essa feature, definindo como as tabelas de insumos, produtos e ficha_tecnica se conectam.
* Criar o esqueleto do código em Node.js (TypeScript) para a rota de criação e cálculo dessa ficha técnica.

Como você prefere seguir?

[1] [https://pt.linkedin.com](https://pt.linkedin.com/pulse/chega-de-tarefas-manuais-idiotas-ia-automa%C3%A7%C3%A3o-com-n8n-sayuri-valente-f8q5f)
