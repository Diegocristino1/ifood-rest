# eFood - Site de Delivery de Comida (React + Styled Components)

Site de delivery de comida desenvolvido com React, Styled Components e React Router, seguindo o layout do Figma fornecido.

## 🚀 Funcionalidades

- **Listagem de Restaurantes**: Exibe todos os restaurantes disponíveis carregados da API
- **Página de Detalhes do Restaurante**: Mostra o cardápio completo de cada restaurante
- **Modal de Produto**: Ao clicar em "Adicionar ao carrinho", abre uma modal com detalhes completos do produto
- **Carrinho Lateral**: Sidebar vermelha com todos os itens adicionados
- **Checkout Completo**: Fluxo de entrega, pagamento e confirmação
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela
- **Carregamento Dinâmico**: Dados carregados via AJAX da API

## 📋 Estrutura do Projeto

```
IFOOD/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductModal.jsx
│   │   └── Cart.jsx
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.jsx
│   │   ├── RestaurantDetail.jsx
│   │   ├── Delivery.jsx
│   │   ├── Payment.jsx
│   │   └── Confirmation.jsx
│   ├── contexts/           # Context API
│   │   └── CartContext.jsx
│   ├── styles/             # Estilos globais
│   │   └── GlobalStyle.js
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # CSS base
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design

O layout foi desenvolvido seguindo o design do Figma:
- **Cores principais**: Vermelho (#E66767) e Bege (#FFEBD9)
- **Cards com efeito hover**: Animações suaves
- **Modal animada**: Fade-in e slide-in
- **Carrinho lateral**: Sidebar vermelha deslizante
- **Layout responsivo**: Mobile-first approach

## 🔌 API Utilizada

A aplicação consome dados da seguinte API:
```
https://api-ebac.vercel.app/api/efood/restaurantes
```

A API retorna um array de restaurantes, cada um contendo:
- Informações do restaurante (id, titulo, descricao, avaliacao, capa)
- Cardápio com produtos (id, nome, descricao, preco, foto, porcao)

## 🛠️ Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para construção de interfaces
- **React Router DOM**: Roteamento de páginas
- **Styled Components**: CSS-in-JS para estilização
- **Vite**: Build tool e dev server
- **Context API**: Gerenciamento de estado global (carrinho)

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:5173
```

## 🎯 Funcionalidades Implementadas

### Página Inicial (Home)
- Hero section com título principal
- Grid de restaurantes carregados da API
- Cards clicáveis que redirecionam para detalhes

### Página de Detalhes do Restaurante
- Banner com imagem do restaurante
- Informações do restaurante
- Grid de produtos do cardápio
- Botão "Adicionar ao carrinho" em cada produto

### Modal de Produto
- Exibe imagem, nome e descrição do produto
- Mostra restaurante de origem
- Exibe preço formatado
- Mostra porção (se disponível)
- Botões para adicionar ao carrinho ou continuar comprando
- Fecha ao clicar no X, fora da modal ou pressionar ESC

### Carrinho Lateral
- Sidebar vermelha deslizante
- Lista de itens com imagem, nome e preço
- Controle de quantidade (+/-)
- Botão para remover item
- Total do pedido
- Botão para continuar com a entrega

### Fluxo de Checkout
1. **Entrega**: Formulário com dados de entrega
2. **Pagamento**: Formulário com dados do cartão
3. **Confirmação**: Mensagem de sucesso com resumo do pedido

## 📱 Responsividade

O site é totalmente responsivo e funciona bem em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔧 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria a build de produção
- `npm run preview`: Preview da build de produção

## 📝 Notas

- O site utiliza tratamento de erros para imagens que não carregam
- Formatação de preços em Real brasileiro (R$)
- Loading states durante carregamento dos dados
- Mensagens de erro caso a API não responda
- Context API para gerenciamento do estado do carrinho
- Persistência dos dados durante o fluxo de checkout
