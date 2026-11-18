# 📰 Nexo News

### Portal de Notícias Universitárias

O **Nexo News** é uma plataforma web de notícias universitárias desenvolvida para conectar a comunidade acadêmica por meio da informação, promovendo a divulgação de acontecimentos, projetos, pesquisas, eventos e atividades relacionadas ao ambiente universitário.

O portal reúne seis áreas de conhecimento em um único ambiente digital, oferecendo uma experiência de navegação intuitiva, organizada e acessível.

---

## 🎯 Objetivo do Projeto

Desenvolver um portal de comunicação universitária que facilite o acesso às informações acadêmicas, permitindo que estudantes, professores e demais integrantes da comunidade universitária acompanhem notícias relevantes de suas respectivas áreas.

O projeto busca unir tecnologia, comunicação e experiência do usuário em uma plataforma moderna e escalável.

## 📚 Seções do Portal

O Nexo News contempla seis categorias principais:

| Categoria | Conteúdo |
|---|---|
| 🩺 Medicina | Saúde, pesquisas científicas e novidades médicas. |
| ⚖️ Direito | Legislação, debates jurídicos e acontecimentos da área. |
| 💻 ADS | Tecnologia, programação e inovação digital. |
| 🏗️ Engenharia Civil | Construção, infraestrutura e sustentabilidade. |
| 🎬 Cinema | Produções audiovisuais, cultura e entretenimento. |
| 🏃 Educação Física | Esportes, saúde e atividades físicas. |

## 🎨 Identidade Visual

A interface utiliza uma identidade visual minimalista e editorial, baseada em tons neutros e contrastes estratégicos.

**Paleta de cores:**

| Cor | Código | Aplicação |
|---|---|---|
| Bege | `#E8E0D2` | Fundos e elementos visuais. |
| Bege claro | `#F5F1E9` | Fundo principal. |
| Preto suave | `#20221F` | Textos e títulos. |
| Branco | `#FFFFFF` | Cartões e áreas de conteúdo. |
| Verde sálvia | `#91A58C` | Destaques e elementos interativos. |
| Verde escuro | `#526B50` | Botões, links e indicadores. |

A proposta visual prioriza legibilidade, organização das informações e valorização das imagens.

## ⚙️ Funcionalidades

### Portal público
- Página inicial com notícias em destaque.
- Navegação entre as seis categorias acadêmicas.
- Pesquisa de notícias por palavras-chave.
- Filtros por categoria.
- Visualização individual de notícias.
- Exibição de título, imagem, autor e data de publicação.
- Notícias relacionadas.
- Compartilhamento de publicações.
- Interface responsiva para diferentes dispositivos.

### Painel administrativo
- Autenticação de usuários administrativos.
- Cadastro de notícias.
- Edição e exclusão de publicações.
- Gerenciamento de categorias.
- Upload e gerenciamento de imagens.
- Controle de publicação de notícias.

## 🛠️ Tecnologias Utilizadas

### Front-end
- React
- TypeScript
- Tailwind CSS
- HTML5
- CSS3

### Back-end
- Node.js
- Express
- TypeScript

### Infraestrutura e ferramentas
- Docker e Docker Compose
- Git e GitHub
- API REST
- Testes automatizados

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma arquitetura modular, separando as responsabilidades entre cliente, servidor, banco de dados e documentação.

```text
campus-news/
│
├── README.md
├── docker-compose.yml
├── .env.example
│
├── docs/
│   ├── arquitetura/
│   ├── api/
│   ├── admin/
│   └── testes/
│
├── client/
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   │   ├── news/
│   │   │   ├── categories/
│   │   │   ├── search/
│   │   │   ├── auth/
│   │   │   └── admin/
│   │   ├── pages/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   └── layout/
│   │   ├── lib/
│   │   ├── config/
│   │   ├── styles/
│   │   └── assets/
│   └── tests/
│
└── server/
    ├── prisma/
    │   ├── schema.prisma
    │   ├── migrations/
    │   └── seed.ts
    ├── uploads/
    ├── tests/
    └── src/
        ├── app.ts
        ├── server.ts
        ├── config/
        ├── middlewares/
        ├── lib/
        └── modules/
            ├── auth/
            ├── articles/
            ├── categories/
            ├── images/
            └── search/
```

### Organização arquitetural

**Client:** responsável pela interface, navegação, componentes visuais e interação com o usuário.

**Server:** responsável pelas regras de negócio, autenticação, validações, gerenciamento de notícias e disponibilização da API REST.

**Prisma:** responsável pelo mapeamento objeto-relacional (ORM) e pela comunicação com o PostgreSQL.

**Docs:** centraliza a documentação técnica, arquitetura, API, orientações administrativas e registros de testes.

## 🧠 UI/UX e Usabilidade

O desenvolvimento do Nexo News considera as dez heurísticas de usabilidade de Jakob Nielsen:

1. Visibilidade do status do sistema.
2. Correspondência entre o sistema e o mundo real.
3. Controle e liberdade do usuário.
4. Consistência e padronização.
5. Prevenção de erros.
6. Reconhecimento em vez de memorização.
7. Flexibilidade e eficiência de uso.
8. Estética e design minimalista.
9. Ajuda para reconhecer, diagnosticar e recuperar erros.
10. Ajuda e documentação.

Também são considerados:

- Design responsivo.
- Acessibilidade digital.
- Hierarquia visual.
- Arquitetura da informação.
- Feedback visual.
- Consistência dos componentes.
- Legibilidade e contraste.
- Design centrado no usuário.

## 🚀 Instalação e Execução

### Pré-requisitos

Antes de iniciar, certifique-se de possuir:

- Node.js (versão LTS).
- npm.
- Docker e Docker Compose.
- Git.

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/nexo-news.git
```

### 2. Acessar o projeto

```bash
cd nexo-news
```

### 3. Configurar as variáveis de ambiente

Crie os arquivos `.env` necessários a partir do `.env.example`, conforme as instruções de cada aplicação.

```bash
cp .env.example .env
```

Configure as credenciais locais do banco de dados e demais variáveis exigidas pelo projeto.

**Importante:** nunca compartilhe arquivos `.env` com credenciais reais.

### 5. Instalar as dependências

No diretório do servidor:

```bash
cd server
npm install
```

No diretório do cliente:

```bash
cd ../client
npm install
```

### 6. Configurar o banco de dados

No diretório `server`, execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

Para carregar os dados demonstrativos:

```bash
npx prisma db seed
```

### 7. Executar o projeto

Inicie o servidor:

```bash
cd server
npm run dev
```

Em outro terminal, inicie o cliente:

```bash
cd client
npm run dev
```

Os endereços de acesso dependerão das portas configuradas no projeto.

> Observação: os comandos acima pressupõem que os respectivos scripts estejam configurados nos arquivos `package.json` e que as variáveis de ambiente estejam corretamente definidas.

## 🔐 Segurança

O projeto considera boas práticas de segurança, incluindo:

- Autenticação e autorização de usuários.
- Validação dos dados recebidos pela API.
- Sanitização de entradas.
- Proteção contra requisições excessivas (Rate Limiting).
- Configuração de cabeçalhos HTTP com Helmet.
- Controle de CORS.
- Gerenciamento seguro de cookies.
- Validação de arquivos enviados.
- Proteção de rotas administrativas.
- Separação entre variáveis públicas e informações sensíveis.

## 🧪 Testes e Qualidade

O projeto possui diretórios específicos para testes no cliente e no servidor.

A validação deverá contemplar:

- Testes de funcionalidades.
- Testes de integração.
- Testes de API.
- Testes de autenticação.
- Testes de operações CRUD.
- Testes de responsividade.
- Verificações de acessibilidade.
- Avaliação das heurísticas de Nielsen.

## 📖 Documentação

A documentação técnica do projeto está organizada no diretório `docs/`.

| Diretório | Descrição |
|---|---|
| `docs/arquitetura/` | Arquitetura e organização do sistema. |
| `docs/api/` | Documentação dos endpoints da API. |
| `docs/admin/` | Orientações para utilização do painel administrativo. |
| `docs/testes/` | Estratégias e registros de testes. |

## 👥 Contribuição

Contribuições são bem-vindas!

Para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade.
3. Realize as alterações necessárias.
4. Execute os testes.
5. Envie um Pull Request descrevendo suas modificações.

## 📌 Status do Projeto

**Em desenvolvimento.**

O Nexo News é um projeto acadêmico voltado à aplicação prática de conceitos de Engenharia de Software, desenvolvimento web, banco de dados, UI/UX e arquitetura de sistemas.

## 📄 Licença

A licença do projeto deverá ser definida pelos responsáveis pelo repositório antes de sua distribuição pública.

---

**Nexo News — Conectando conhecimento, informação e universidade.**
