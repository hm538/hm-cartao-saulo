# Cartão digital · Saulo Rocha

Cartão digital do Saulo Rocha, corretor de imóveis, feito pela HM Digital.

Abertura que monta a logo "Chave-casa": a casa é desenhada, a chave entra girando e destranca a porta, a porta abre com luz,
e a chave se encaixa na lateral da casa (a casa vira a cabeça da chave). Depois aparecem o "SR", o nome e o CRECI.

## Editar os dados

Tudo fica em `assets/js/perfil.js`:

- `HM_PROFILE`: nome, cargo, texto, WhatsApp, Instagram e **CRECI** (`creci: "12345"` faz o número aparecer na abertura e no cartão).
- `HM_INTENTS`: botões "Quero comprar / vender / investir", cada um com a mensagem pronta do WhatsApp.
- `HM_PROJECTS`: **catálogo de empreendimentos**. Cada um mostra fotos deslizando (toque abre em tela cheia),
  status, bairro, quartos, metragem, vagas, valor "a partir de", diferenciais e o botão "Quero saber mais" (WhatsApp).
  Campos vazios não aparecem; sem fotos, aparece "Fotos em breve".

## Colocar fotos de um empreendimento

1. Crie a pasta `assets/img/empreendimentos/<nome>/` (ex.: `urban-garden`).
2. Coloque as fotos como `01.jpg`, `02.jpg`… (de preferência na horizontal, 4:3, com até ~1600 px de largura e menos de 400 KB cada).
3. Em `assets/js/perfil.js`, liste em `photos`: `["/assets/img/empreendimentos/urban-garden/01.jpg", …]`.
   A primeira foto é a capa.

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Publicar na Vercel

Site estático, sem build: **Add New → Project → importar este repositório → Deploy** (Framework Preset: *Other*).
Domínio sugerido: `saulocorretor.hmdigitalgo.com` (já usado na prévia do link em `index.html`).
