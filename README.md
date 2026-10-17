# Silva & Associados Advocacia

Landing page institucional para escritório de advocacia, construída em HTML, CSS e JavaScript puro, sem frameworks e sem dependências externas obrigatórias.

## Estrutura do projeto

meu-site/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/
    └── advogados/        (fotos da equipe)

- `index.html`: estrutura e conteúdo da página (seções comentadas)
- `css/style.css`: estilos, cores, responsividade e animações
- `js/script.js`: menu mobile, animações ao rolar e validação do formulário
- `img/advogados/`: fotos dos advogados (substitua os placeholders externos por arquivos locais)
- `README.md`: esta documentação

## Como executar

1. Abra a pasta `meu-site` no VS Code (File > Open Folder)
2. Opção rápida: dê duplo clique no `index.html` para abrir no navegador
3. Opção recomendada: instale a extensão **Live Server** no VS Code, clique com o botão direito no `index.html` e escolha "Open with Live Server". A página recarrega automaticamente a cada salvamento

## Personalização

### Cores e fontes

Todas as cores ficam nas variáveis do `:root`, no topo do `css/style.css`. Para trocar a identidade visual, altere apenas esses valores:

- `--accent`: cor de destaque (botões, títulos, ícones)
- `--accent-hover`: tom da cor de destaque ao passar o mouse
- `--text-main` e `--text-muted`: cores de texto
- `--font-family`: fonte do site (padrão: Inter, via Google Fonts)

### Conteúdo

Todo o texto está no `index.html`, organizado por seções comentadas: header, hero, áreas de atuação, diferenciais, equipe, contato e footer. Para adicionar uma nova área de atuação, copie um bloco `<article class="area-card">` e ajuste título, descrição e ícone.

### Fotos da equipe

Os cards da equipe usam imagens externas de placeholder. Para usar fotos reais, salve os arquivos em `img/advogados/` e troque o `src` de cada card, por exemplo:

<img src="img/advogados/ricardo-silva.jpg" alt="Dr. Ricardo Silva" loading="lazy">

### Formulário de contato

O envio é simulado (não entrega mensagens reais). Para receber os contatos:

- **Formspree**: crie uma conta em formspree.io, aponte o formulário para o endpoint gerado e remova a simulação no `js/script.js`
- **WhatsApp**: troque o link do botão `.whatsapp-btn` no `index.html` pelo número real, no formato `https://wa.me/55DDDNÚMERO`

### Dados fictícios a substituir

- Nome do escritório: Silva & Associados Advocacia
- Nomes, OAB e especialidades dos advogados
- Endereço, telefone, e-mail e horário de atendimento
- Número do WhatsApp (`551130000000`)
- Número de inscrição da sociedade no footer

## Publicação

O site é estático e pode ser hospedado gratuitamente em:

- **GitHub Pages**: suba os arquivos em um repositório e ative o Pages em Settings
- **Netlify / Vercel**: arraste a pasta no painel da plataforma e o site fica no ar em segundos

## Requisitos técnicos

- Nenhum build, npm ou instalação necessária
- Fonte Inter carregada via Google Fonts (com fallback do sistema se estiver offline)
- Compatível com navegadores modernos (Chrome, Edge, Firefox, Safari)
- Totalmente responsivo (desktop, tablet e mobile)