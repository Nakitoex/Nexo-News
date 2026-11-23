<div align="center"> <img src="Images/Banner%20NEXUS.png" alt="Colagem em preto, lilás e verde-limão com a imagem de uma estudante de fones de ouvido" width="100%">
NEXUS NEWS

Zine universitário digital com as notícias do momento, organizadas por curso.

Ver o site

Mostrar imagem Mostrar imagem Mostrar imagem Mostrar imagem

</div>
Sobre o projeto

O NEXUS NEWS é um projeto universitário: um portal de notícias que reúne, em um só lugar, o que está acontecendo agora em áreas que interessam a quem estuda. Em vez de cada estudante garimpar a informação em vários sites, o portal organiza as notícias por curso e sempre leva o leitor à fonte original.

A proposta é simples: notícia boa, de fonte confiável, fácil de achar e agradável de ler, com uma identidade visual própria de zine (colagens, papel rasgado, preto, lilás e verde-limão).

Edição demonstrativa. As notícias desta versão são um exemplo para validar o design e o funcionamento do portal. Os links levam a referências externas sobre cada tema.

Acesse: https://nakitoex.github.io/Nexo-News/

O que você encontra no site
Destaque do dia (Hot News), com a matéria principal da edição.
Curiosidade da semana, um texto curto para aprender algo novo.
Últimas notícias, em ordem da mais recente para a mais antiga.
Seis categorias, cada uma com página própria:
Categoria	Assuntos
Medicina	Pesquisa, saúde, formação médica e ciência clínica
Direito	Leis, direitos digitais e justiça no dia a dia
ADS	Análise e Desenvolvimento de Sistemas, software, IA e cultura digital
Engenharia Civil	Cidades, materiais, estruturas e infraestrutura
Cinema	Preservação, linguagem e história do audiovisual
Educação Física	Movimento, saúde e diretrizes de atividade física
Busca por título, assunto ou categoria em toda a edição.
Cards interativos: efeito 3D com sombra lilás ao passar o mouse, e o card inteiro é clicável.
Acessibilidade: navegação por teclado, link "Ir para o conteúdo", foco visível e respeito à preferência de movimento reduzido.
Responsivo: funciona em computador, tablet e celular.
Tecnologias

O site é estático e não precisa de servidor próprio nem de bibliotecas externas.

HTML5, com uma página por categoria
CSS3 puro (Grid, Flexbox e variáveis CSS)
JavaScript moderno com módulos ES, sem frameworks
JSON como fonte de conteúdo (data/news.json)
GitHub Pages e GitHub Actions para publicação automática
Fontes locais: Archivo Black e Space Grotesk (licença OFL)
Estrutura do repositório
Nexo-News/
├── index.html              # Capa do portal
├── medicina/ direito/ ads/
│   engenharia-civil/ cinema/
│   educacao-fisica/        # Uma página por categoria
├── css/style.css           # Identidade visual e layout
├── js/
│   ├── main.js             # Menu, busca e carregamento da edição
│   ├── components.js       # Cards, destaque e seções
│   ├── news.js             # Categorias, ordenação e busca
│   └── card-effects.js     # Efeito 3D dos cards
├── data/news.json          # Conteúdo da edição
├── assets/                 # Imagens, ícone e fontes
├── Images/                 # Banners do projeto
└── .github/workflows/      # Publicação no GitHub Pages
Rodar localmente

O site carrega o JSON e os módulos JavaScript via HTTP, então abra-o por um servidor local (clicar duas vezes no index.html não funciona).

sh
git clone https://github.com/Nakitoex/Nexo-News.git
cd Nexo-News
python -m http.server 8000

Depois acesse http://localhost:8000.

Como atualizar as notícias

Todo o conteúdo fica em data/news.json, com três blocos:

hotNews: o destaque da edição
weeklyCuriosity: a curiosidade da semana
categories: as notícias agrupadas pelo nome de cada categoria

Cada notícia usa estes campos:

json
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

Dicas:

Use um id único e estável para cada notícia. Se o destaque também aparecer numa categoria, use o mesmo id.
Use a data em formato ISO 8601; ela define a ordem das notícias.
Coloque as imagens em assets/images/ e sempre preencha imageAlt.
Ao publicar uma edição real, atualize updatedAt e defina "demo": false.
Onde editar cada parte
Arquivo ou pasta	O que controla
index.html	Estrutura e metadados da capa
<categoria>/index.html	Título, descrição e estrutura de cada categoria
css/style.css	Cores em :root, tipografia, grid e regras responsivas
js/news.js	Categorias, carregamento, ordenação e busca
js/components.js	Cards, destaque, curiosidade e seções de categoria
js/main.js	Menu, busca e estados da edição
js/card-effects.js	Inclinação 3D dos cards
data/news.json	Conteúdo da edição
Publicação

O site é publicado no GitHub Pages por um workflow em .github/workflows/pages.yml. A cada alteração enviada para a branch main, o GitHub publica a nova versão automaticamente. Acompanhe o andamento na aba Actions.

Para publicar em outro repositório: envie os arquivos para a main (incluindo .github/ e .nojekyll), abra Settings → Pages e escolha GitHub Actions em Build and deployment → Source.

Próximos passos
Gerar o news.json automaticamente a partir de fontes confiáveis, com Python e GitHub Actions.
Criar uma página interna para cada notícia.
Permitir que o leitor salve notícias para ler depois.
Equipe
<!-- Preencha com os nomes da equipe, a disciplina e o professor orientador. -->
Nome	Função
Seu nome	Desenvolvimento

Disciplina: nome da disciplina · Instituição: nome da faculdade

Créditos e licenças
As ilustrações da edição demonstrativa foram geradas para o projeto.
As fontes Archivo Black e Space Grotesk seguem a licença SIL OFL; os textos de licença estão em assets/fonts/.
As notícias e os links pertencem às suas respectivas fontes, que são sempre indicadas em cada card.
