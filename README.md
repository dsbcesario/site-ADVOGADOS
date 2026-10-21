# Moretti & Advogados Associados

Site institucional em HTML, CSS e JavaScript puro. Sem frameworks, sem build, sem instalação.

## Estrutura

    site ADVOGADOS/
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── img/
    │   ├── logo.png
    │   ├── favicon.png
    │   ├── capa.png
    │   └── dra-heloa.png
    └── README.md

## Como executar

**Opção 1 — Abrir direto no navegador**

Dê duplo clique no index.html. O site abre e funciona, mas sem recarregamento automático.

**Opção 2 — Live Server (recomendado)**

1. Abra a pasta do projeto no VS Code (File > Open Folder)
2. Instale a extensão Live Server
3. Clique com o botão direito no index.html e escolha Open with Live Server

A página abre em http://127.0.0.1:5500 e recarrega sozinha a cada salvamento.

**Opção 3 — Servidor local pelo terminal**

Dentro da pasta do projeto, rode:

    python -m http.server 8000

Depois abra http://localhost:8000 no navegador.

## Antes de rodar

Confirme que os arquivos existem na pasta img:

- logo.png — logo do cabeçalho
- favicon.png — ícone da aba
- capa.png — imagem de compartilhamento do link
- dra-heloa.png — foto da equipe
- dra-paola.png — foto da equipe
- dra-jair.png — foto da equipe
- dra-david.png — foto da equipe

Se algum faltar, o navegador mostra o ícone de imagem quebrada no lugar.

## Publicação

O site é estático e roda no GitHub Pages. Para publicar:

    git add .
    git commit -m "Atualização do site"
    git push origin main

No GitHub, vá em Settings > Pages, selecione a branch main e a pasta / (root). Em alguns minutos o site fica disponível em:

    https://dsbcesario.github.io/site-ADVOGADOS/

## Observações

- O formulário de contato envia por e-mail via FormSubmit. Na primeira mensagem, é preciso clicar no link de confirmação enviado para moretti.escritorio@gmail.com
- O número do WhatsApp fica nos links wa.me do index.html, no formato 55 + DDD + número
- As cores do site ficam nas variáveis do :root, no topo do css/style.css