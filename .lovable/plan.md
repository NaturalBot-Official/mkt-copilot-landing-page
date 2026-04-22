
# Landing Page — NaturalBot (réplica)

Réplica visual fiel da LP `materiais.naturalbot.com.br/cadastro-para-teste-teste-o-copiloto`, com formulário funcional gravando leads no Lovable Cloud.

## Estrutura da página

**1. Header**
- Faixa branca centralizada com a logo NaturalBot (texto estilizado "NATURAL BOT" com mark colorido, replicando o lockup original).

**2. Hero / Formulário (seção principal)**
Layout de duas colunas dentro de um bloco laranja vibrante, com bordas laterais em rosa magenta (faixas full-bleed que enquadram o bloco central — exatamente como na referência).

- **Coluna esquerda (texto):**
  - Título em branco, bold, tipografia generosa: *"Se você é dono de Restaurante, Preencha o formulário, faça um teste com o Nosso Copiloto de vendas com IA no WhatsApp."*
  - Subtítulo: *"Descubra porque somos a nova geração de chatbot."*

- **Coluna direita (formulário, card branco com sombra suave):**
  - Nome*
  - Email*
  - Celular* (com selector de bandeira BR à esquerda, máscara `(00) 00000-0000`)
  - Select: *Trabalha, gerencia ou é dono de uma operação de restaurante?* (Sim / Não)
  - Radio: *Trabalha com delivery?* (Sim / Não)
  - Select: *Segmento de atuação* (Açaí/Sorvetes, Culinária oriental, Esfiharia/Árabe, Hamburgueria, Lanches/Saladas, Marmitas/Prato feito, Padaria/Confeitaria, Pizzaria, Outro)
  - Captcha matemático simples (ex.: `11 + 9 = ?`) gerado aleatoriamente
  - Checkbox de consentimento LGPD
  - Texto fino de privacidade
  - Botão CTA roxo gradiente: **"TESTAR COPILOTO"** (full width, uppercase, bold)

**3. Seção de vídeo**
- Fundo branco, título centralizado: *"Conheça a nova geração de chatbot para WhatsApp que ajuda no atendimento a delivery"*
- Embed YouTube responsivo (placeholder com ID configurável).

**4. Seção de benefícios**
- Título: *"Somos o 1° Copiloto de Vendas com IA para restaurantes do Brasil!"*
- Subtítulo: *"Tenha um atendimento automatizado dos seus pedidos e com uma linguagem mais natural."*
- Grid de 4 cards (2x2 desktop, 1 coluna mobile) com ícone + título + descrição:
  1. **Inteligência Artificial** — automação do atendimento à cobrança
  2. **Atendimento Multilíngue** — +60 línguas
  3. **Integração com Monitores** — KDS na cozinha
  4. **Linguagem Personalizada** — tom de voz e arquétipo da marca
- Ícones via lucide-react (Brain, Languages, Monitor, MessageSquareText) em círculos coloridos.

**5. Footer**
- Faixa escura simples com nome da marca e copyright.

## Comportamento do formulário

- Validação client-side com **zod** + react-hook-form (limites de caracteres, e-mail válido, celular obrigatório, captcha correto, consentimento marcado).
- Ao enviar:
  1. Insere o lead na tabela `leads` do Lovable Cloud.
  2. Mostra toast de sucesso e tela de "Obrigado! Em breve entraremos em contato."
  3. Em caso de erro, toast vermelho com mensagem.
- Sem painel admin (consulta dos leads feita via banco depois, conforme escolhido).

## Backend (Lovable Cloud)

Tabela `leads`:
- `id` uuid PK
- `nome`, `email`, `celular`, `segmento` text
- `gerencia_restaurante` boolean
- `trabalha_delivery` boolean
- `consentimento` boolean
- `created_at` timestamptz default now()

RLS: insert público permitido (formulário anônimo); select restrito (apenas via service role / banco — sem painel exposto).

## Identidade visual

- **Cores:** rosa magenta `#EC008C`, laranja `#FF8A00`, roxo CTA `#5B3FDB` → branco, e cinza-escuro para texto secundário (todas via tokens HSL no `index.css`).
- **Tipografia:** Inter (Google Fonts), pesos 400/600/800 — títulos bem encorpados como na referência.
- **Responsivo:** mobile-first; em telas pequenas as colunas do hero empilham (texto em cima, form embaixo) e as faixas laterais rosas viram fundo total.
