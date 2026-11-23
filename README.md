![Colagem em preto, lilás e verde-limão com a imagem de uma estudante de fones de ouvido](Images/Banner%20NEXUS.png)

# NEXUS NEWS

**Zine universitário digital com as notícias do momento, organizadas por curso.**

[![Ver o site](https://img.shields.io/badge/Ver%20o%20site-nakitoex.github.io%2FNexo--News-b791f4?style=for-the-badge&labelColor=161616)](https://nakitoex.github.io/Nexo-News/)

![HTML5](https://img.shields.io/badge/HTML5-161616?logo=html5&logoColor=c3ff44)
![CSS3](https://img.shields.io/badge/CSS3-161616?logo=css3&logoColor=b791f4)
![JavaScript](https://img.shields.io/badge/JavaScript-161616?logo=javascript&logoColor=c3ff44)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-161616?logo=github&logoColor=white)

---

## Sobre o projeto

O **NEXUS NEWS** é um projeto universitário: um portal de notícias que reúne, em um só lugar, o que está acontecendo agora em áreas que interessam a quem estuda. Em vez de cada estudante garimpar a informação em vários sites, o portal organiza as notícias por curso e sempre leva o leitor à **fonte original**.

A proposta é simples: notícia boa, de fonte confiável, fácil de achar e agradável de ler, com uma identidade visual própria de zine (colagens, papel rasgado, preto, lilás e verde-limão).

> **Edição demonstrativa.** As notícias desta versão são um exemplo para validar o design e o funcionamento do portal. Os links levam a referências externas sobre cada tema.

**Acesse:** https://nakitoex.github.io/Nexo-News/

## Equipe

Projeto desenvolvido na disciplina de **Desenvolvimento de Interfaces**, no curso de **Engenharia de Software (2º semestre)** do **UniCEUB**, sob orientação da professora **Adriana Falcomer**.

| Integrante | GitHub |
| --- | --- |
| Felipe Cezar | [@felipecezar13](https://github.com/felipecezar13) |
| Arthur Pozzetti | [@Nakitoex](https://github.com/Nakitoex) |
| Matheus Costa | _(adicionar link do GitHub)_ |

## O que você encontra no site

- **Destaque do dia (Hot News)**, com a matéria principal da edição.
- **Curiosidade da semana**, um texto curto para aprender algo novo.
- **Últimas notícias**, da mais recente para a mais antiga.
- **Busca** por título, assunto ou categoria em toda a edição.
- **Cards interativos**, com efeito 3D e sombra lilás ao passar o mouse, e o card inteiro é clicável.
- **Acessibilidade**: navegação por teclado, link "Ir para o conteúdo", foco visível e respeito à preferência de movimento reduzido.
- **Layout responsivo**: funciona em computador, tablet e celular.

### Categorias

| Categoria | Assuntos |
| --- | --- |
| Medicina | Pesquisa, saúde, formação médica e ciência clínica |
| Direito | Leis, direitos digitais e justiça no dia a dia |
| ADS | Análise e Desenvolvimento de Sistemas, software, IA e cultura digital |
| Engenharia Civil | Cidades, materiais, estruturas e infraestrutura |
| Cinema | Preservação, linguagem e história do audiovisual |
| Educação Física | Movimento, saúde e diretrizes de atividade física |

## Tecnologias

O site é estático e não precisa de servidor próprio nem de bibliotecas externas.

- **HTML5**, com uma página por categoria
- **CSS3** puro (Grid, Flexbox e variáveis CSS)
- **JavaScript** moderno com módulos ES, sem frameworks
- **JSON** como fonte de conteúdo (`data/news.json`)
- **GitHub Pages** e **GitHub Actions** para a publicação automática
- Fontes locais: *Archivo Black* e *Space Grotesk*

## Estrutura do repositório

```text
Nexo-News/
├── index.html              Capa do portal
├── medicina/               Páginas das categorias
├── direito/
├── ads/
├── engenharia-civil/
├── cinema/
├── educacao-fisica/
├── css/
│   └── style.css           Identidade visual e layout
├── js/
│   ├── main.js             Menu, busca e carregamento da edição
│   ├── components.js       Cards, destaque e seções
│   ├── news.js             Categorias, ordenação e busca
│   └── card-effects.js     Efeito 3D dos cards
├── data/
│   └── news.json           Conteúdo da edição
├── assets/                 Imagens, ícone e fontes
├── Images/                 Banners do projeto
└── .github/workflows/      Publicação no GitHub Pages
```

## Rodar localmente

O site carrega o JSON e os módulos JavaScript via HTTP, então abra-o por um servidor local. Clicar duas vezes no `index.html` não funciona.

```sh
git clone https://github.com/Nakitoex/Nexo-News.git
cd Nexo-News
python -m http.server 8000
```

Depois, acesse **http://localhost:8000**.

## Como atualizar as notícias

Todo o conteúdo fica em `data/news.json`, dividido em três blocos:

- `hotNews`: o destaque da edição
- `weeklyCuriosity`: a curiosidade da semana
- `categories`: as notícias agrupadas pelo nome de cada categoria

Cada notícia usa estes campos:

```json
{
  "id": "identificador-unico",
  "category": "ads",
  "title": "Título da notícia",
  "summary": "Resumo de uma ou duas frases.",
  "source": "Nome da fonte",
  "sourceUrl": "https://endereco-da-materia-original",
  "publishedAt": "2026-11-20T16:00:00Z",
  "image": "assets/images/nome-da-imagem.webp",
  "imageAlt": "Descrição da imagem para leitores de tela"
}
```

Dicas:

- Use um `id` único e estável para cada notícia. Se o destaque também aparecer numa categoria, use o mesmo `id`.
- Use a data em formato ISO 8601, pois ela define a ordem das notícias.
- Coloque as imagens em `assets/images/` e sempre preencha `imageAlt`.
- Ao publicar uma edição real, atualize `updatedAt` e defina `"demo": false`.

## Onde editar cada parte

| Arquivo ou pasta | O que controla |
| --- | --- |
| `index.html` | Estrutura e metadados da capa |
| `<categoria>/index.html` | Título, descrição e estrutura de cada categoria |
| `css/style.css` | Cores em `:root`, tipografia, grid e regras responsivas |
| `js/news.js` | Categorias, carregamento, ordenação e busca |
| `js/components.js` | Cards, destaque, curiosidade e seções de categoria |
| `js/main.js` | Menu, busca e estados da edição |
| `js/card-effects.js` | Inclinação 3D dos cards |
| `data/news.json` | Conteúdo da edição |

## Publicação

O site é publicado no **GitHub Pages** por um workflow em `.github/workflows/pages.yml`. A cada alteração enviada para a branch `main`, o GitHub publica a nova versão automaticamente. Acompanhe o andamento na aba **Actions**.

Para publicar em outro repositório, envie os arquivos para a `main` (incluindo `.github/` e `.nojekyll`), abra **Settings → Pages** e escolha **GitHub Actions** em **Build and deployment → Source**.

## Créditos

- As ilustrações da edição demonstrativa foram geradas para o projeto.
- As fontes *Archivo Black* e *Space Grotesk* seguem a licença SIL OFL. Os textos de licença estão em `assets/fonts/`.
- As notícias e os links pertencem às suas respectivas fontes, indicadas em cada card.
