# VipVeículos - Site Institucional

Site institucional da VipVeículos, uma empresa com mais de 15 anos de experiência no mercado automobilístico brasileiro, fundada em janeiro de 2008.

## 🚗 Sobre o Projeto

Este é o site oficial da VipVeículos, desenvolvido com tecnologias modernas para proporcionar uma experiência de usuário excepcional. O site apresenta a empresa, seus valores, localização e catálogo de veículos.

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React para produção
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS v4** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis e não estilizados
- **Shadcn/ui** - Biblioteca de componentes baseada em Radix
- **Lucide React** - Ícones SVG
- **PNPM** - Gerenciador de pacotes

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18.0.0 ou superior)
- **PNPM** (versão 8.0.0 ou superior)

### Instalação do Node.js

```bash
# Baixe e instale a partir do site oficial
https://nodejs.org/

# Ou usando winget (Windows)
winget install OpenJS.NodeJS

# Verifique a instalação
node --version
npm --version
```

### Instalação do PNPM

```bash
# Via npm
npm install -g pnpm

# Ou via PowerShell (Windows)
iwr https://get.pnpm.io/install.ps1 -useb | iex

# Verifique a instalação
pnpm --version
```

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/thgularte/site-vip-veiculos.git
cd site-vip-veiculos
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Execute o projeto em modo de desenvolvimento

```bash
pnpm dev
```

O servidor será iniciado em `http://localhost:3000`

### 4. Outros comandos disponíveis

```bash
# Construir para produção
pnpm build

# Iniciar servidor de produção (após build)
pnpm start

# Executar linting
pnpm lint
```

## 📁 Estrutura do Projeto

```
site-vip-veiculos/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais e variáveis CSS
│   ├── layout.tsx         # Layout raiz da aplicação
│   ├── page.tsx           # Página inicial
│   ├── about/             # Página sobre a empresa
│   └── vehicles/          # Página de veículos
├── components/            # Componentes React reutilizáveis
│   ├── ui/               # Componentes da biblioteca Shadcn/ui
│   ├── navigation.tsx    # Componente de navegação
│   └── theme-provider.tsx # Provedor de tema
├── hooks/                # React Hooks customizados
├── lib/                  # Utilitários e configurações
├── public/               # Arquivos estáticos
├── styles/               # Estilos adicionais
├── components.json       # Configuração do Shadcn/ui
├── next.config.mjs       # Configuração do Next.js
├── package.json          # Dependências e scripts
├── postcss.config.mjs    # Configuração do PostCSS
├── tailwind.config.js    # Configuração do Tailwind CSS
└── tsconfig.json         # Configuração do TypeScript
```

## 🎨 Design System

O projeto utiliza um design system personalizado com as cores da marca VipVeículos:

- **Navy**: `#323062` - Cor primária da marca
- **Red**: `#D60404` - Cor de destaque
- **Purple**: `#2A1770` - Cor secundária
- **Dark Red**: `#A81818` - Variação do vermelho
- **Dark Blue**: `#03045E` - Azul escuro
- **Gray**: `#B9B9B9` - Cor neutra

### Classes utilitárias disponíveis:

```css
/* Backgrounds */
.bg-vip-navy, .bg-vip-red, .bg-vip-purple, etc.

/* Text colors */
.text-vip-navy, .text-vip-red, .text-vip-purple, etc.

/* Border colors */
.border-vip-navy, .border-vip-red, .border-vip-purple, etc.;
```

## 🔧 Configurações

### Tailwind CSS v4

O projeto utiliza a versão mais recente do Tailwind CSS com configuração inline no arquivo `globals.css`.

### TypeScript

Configurado com paths absolutos para importações mais limpas:

```typescript
import { Component } from "@/components/ui/component";
import { utility } from "@/lib/utils";
```

### Next.js

Configurado com:

- Ignorar erros de TypeScript e ESLint durante build
- Suporte a imagens SVG
- Otimizações de imagem desabilitadas para desenvolvimento

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instale a Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Build Manual

```bash
# Gerar build de produção
pnpm build

# Os arquivos gerados estarão na pasta .next/
```

## 📝 Funcionalidades

- ✅ Página inicial com apresentação da empresa
- ✅ Seção sobre a empresa e sua história
- ✅ Página de veículos (em desenvolvimento)
- ✅ Design responsivo
- ✅ Otimizado para SEO
- ✅ Componentes acessíveis
- ✅ Performance otimizada

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e pertence à VipVeículos.

## 📞 Contato

**VipVeículos**

- Fundação: Janeiro de 2008
- Experiência: Mais de 15 anos no mercado automobilístico
- Foco: Veículos de qualidade com atendimento personalizado

---

Desenvolvido com ❤️ para VipVeículos
