# NEXUS NEWS

Protótipo editável de um zine universitário digital. A capa reúne o destaque editorial, a curiosidade semanal e as notícias. Cada uma das seis categorias tem uma página própria e a busca abrange toda a edição.

## Rodar localmente

Execute o comando abaixo na pasta que contém `index.html` e acesse **http://localhost:8000**. A página carrega o JSON e os módulos JavaScript via HTTP.

```sh
python -m http.server 8000
```

## Onde editar

| Arquivo ou pasta | O que controla |
| --- | --- |
| `index.html` | Estrutura e metadados da capa |
| `<categoria>/index.html` | Título, descrição e estrutura de cada categoria |
| `css/style.css` | Cores em `:root`, tipografia, grid e regras responsivas |
| `js/news.js` | Categorias, carregamento, ordenação e busca |
| `js/components.js` | Cards, destaque, curiosidade e seções de categoria |
| `js/main.js` | Menu, busca e estados da edição |
| `data/news.json` | Conteúdo da edição |
| `assets/` | Marca, ilustrações e fontes locais |

## Trocar a edição

O JSON tem três blocos de conteúdo. `hotNews` é o destaque, `weeklyCuriosity` é a curiosidade e `categories` agrupa as notícias pelos nomes das pastas. Use um `id` estável por notícia, uma data `publishedAt` em ISO 8601 e o endereço original em `sourceUrl`. Se o destaque também aparecer em uma categoria, use o mesmo identificador. Atualize `updatedAt` e defina `demo` como `false` ao publicar uma edição real. As datas da edição demonstrativa indicam a ordenação interna do protótipo. Os links levam a referências externas sobre os temas.

Coloque as imagens da edição em `assets/images/`, informe o caminho em `image` e descreva a ilustração em `imageAlt`. As imagens da edição demonstrativa são ilustrações geradas para o projeto. As licenças das fontes ficam em `assets/fonts/`.

## Publicar no GitHub Pages

1. Extraia o projeto na raiz de um repositório GitHub e envie os arquivos para a branch `main`, incluindo `.github/` e `.nojekyll`.
2. No repositório, abra **Settings → Pages** e selecione **GitHub Actions** em **Build and deployment → Source**.
3. Em **Actions → Publicar no GitHub Pages**, execute **Run workflow** para a primeira publicação. Novas alterações em `main` também disparam o workflow.
4. Abra a URL informada pela execução concluída. Os caminhos relativos do site funcionam com o prefixo do repositório.

O GitHub Pages serve o front-end e o JSON. Esta versão usa uma edição demonstrativa. Uma etapa posterior pode gerar o mesmo JSON automaticamente com Python e GitHub Actions.
